<?php

namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\TaskManagers\ImageSideloadTaskManager;
use NewfoldLabs\WP\Module\Onboarding\Tasks\ImageSideloadTask;

/**
 * SiteGenImageService for the onboarding module.
 *
 * Handles image processing and media library operations for the onboarding flow.
 */
class SiteGenImageService {

	/**
	 * Process homepage images immediately in background (non-blocking).
	 * This method dispatches an async request that doesn't block the main request.
	 *
	 * @param int    $post_id The post ID to process images for.
	 * @param string $content The content containing images.
	 */
	public static function process_homepage_images_immediate_async( $post_id, $content ) {
		// Extract image URLs from content
		$image_urls = self::extract_all_image_urls( $content );

		if ( empty( $image_urls ) ) {
			return;
		}

		// Create and add task to queue
		$task = new ImageSideloadTask( $post_id, $image_urls );
		ImageSideloadTaskManager::add_to_queue( $task );

		// Schedule a single event to process the queue (if not already scheduled)
		if ( ! wp_next_scheduled( 'nfd_process_image_sideload_queue' ) ) {
			wp_schedule_single_event( time(), 'nfd_process_image_sideload_queue' );
		}
	}

	/**
	 * Extract all image URLs from content specifically targeting Unsplash and patterns.hiive.cloud domains.
	 *
	 * @param string $content The content to extract image URLs from.
	 * @return array Array of unique image URLs.
	 */
	private static function extract_all_image_urls( $content ) {
		$image_urls = array();

		// Extract Unsplash images
		preg_match_all( '/https?:\/\/([^\/]+\.)?unsplash\.com\/[^\s"\'<>]+/i', $content, $matches );
		if ( isset( $matches[0] ) ) {
			$image_urls = array_merge( $image_urls, $matches[0] );
		}

		// Extract patterns.hiive.cloud images
		preg_match_all( '/https?:\/\/patterns\.hiive\.cloud\/[^\s"\'<>]+/i', $content, $matches );
		if ( isset( $matches[0] ) ) {
			$image_urls = array_merge( $image_urls, $matches[0] );
		}

		// Decode HTML entities in URLs to ensure proper replacement
		$image_urls = array_map( 'html_entity_decode', $image_urls );

		return array_values( array_unique( $image_urls ) );
	}

	/**
	 * Uploads images to the WordPress media library as attachments.
	 *
	 * This function takes an array of image URLs, downloads them, and
	 * uploads them to the WordPress media library, returning the URLs
	 * of the newly uploaded images.
	 *
	 * @param array $image_urls An array of image URLs to upload.
	 * @param int   $post_id The post ID to attach the images to.
	 * @return array|false An array of WordPress attachment URLs on success, false on failure.
	 * @throws Exception If there is an error during the upload process.
	 */
	public static function upload_images_to_wp_media_library( $image_urls, $post_id ) {
		require_once ABSPATH . 'wp-admin/includes/media.php';
		require_once ABSPATH . 'wp-admin/includes/image.php';

		global $wp_filesystem;
		self::connect_to_filesystem();

		$uploaded_image_urls = array();
		$total_images        = count( $image_urls );
		$successful_uploads  = 0;

		try {
			foreach ( $image_urls as $image_url ) {
				// Check if the URL is valid.
				if ( ! filter_var( $image_url, FILTER_VALIDATE_URL ) ) {
					continue;
				}

				// Fetch the image via remote get with timeout and a retry attempt.
				$attempt      = 0;
				$max_attempts = 2;
				while ( $attempt < $max_attempts ) {
					$response = wp_remote_get( $image_url, array( 'timeout' => 15 ) );
					if ( ! is_wp_error( $response ) && 200 === wp_remote_retrieve_response_code( $response ) ) {
						break;
					}
					++$attempt;
				}
				if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {
					continue;
				}
				// Reading the headers from the image url to determine.
				$headers      = wp_remote_retrieve_headers( $response );
				$content_type = $headers['content-type'] ?? '';
				$image_data   = wp_remote_retrieve_body( $response );
				if ( empty( $content_type ) || empty( $image_data ) ) {
					continue;
				}
				// Determine the file extension based on MIME type.
				$file_extension = '';
				switch ( $content_type ) {
					case 'image/jpeg':
						$file_extension = '.jpg';
						break;
					case 'image/png':
						$file_extension = '.png';
						break;
					case 'image/gif':
						$file_extension = '.gif';
						break;
					case 'image/webp':
						$file_extension = '.webp';
						break;
				}

				if ( '' === $file_extension ) {
					continue;
				}
				// create upload directory.
				$upload_dir = wp_upload_dir();
				// xtract a filename from the URL.
				$parsed_url = wp_parse_url( $image_url );
				$path_parts = pathinfo( $parsed_url['path'] );
				// filename to be added in directory.
				$original_filename = $path_parts['filename'] . $file_extension;

				// to ensure the filename is unique within the upload directory.
				$filename = wp_unique_filename( $upload_dir['path'], $original_filename );
				$filepath = $upload_dir['path'] . '/' . $filename;

				$wp_filesystem->put_contents( $filepath, $image_data );

				// Create an attachment post for the image, metadata needed for WordPress media library.
				// guid -for url, post_title for cleaned up name, post content is empty as this is an attachment.
				// post_status inherit is for visibility.
				$attachment = array(
					'guid'           => $upload_dir['url'] . '/' . $filename,
					'post_mime_type' => $content_type,
					'post_title'     => preg_replace( '/\.[^.]+$/', '', basename( $filename ) ),
					'post_content'   => '',
					'post_status'    => 'inherit',
					'post_parent'    => $post_id, // Attach to the specified post
				);
				$attach_id  = wp_insert_attachment( $attachment, $filepath );

				// Generate and assign metadata for the attachment.
				$attach_data = wp_generate_attachment_metadata( $attach_id, $filepath );
				wp_update_attachment_metadata( $attach_id, $attach_data );

				// Add the WordPress attachment URL to the list.
				if ( $attach_id ) {
					$attachment_url = wp_get_attachment_url( $attach_id );
					if ( ! $attachment_url ) {
						$attachment_url = null;
					}
					$uploaded_image_urls[ $image_url ] = $attachment_url;
					$successful_uploads++;
				}
			}
		} catch ( \Exception $e ) {
			// Log error silently
		}
		return $uploaded_image_urls;
	}

	/**
	 * Update post content by replacing original image URLs with WordPress media library URLs.
	 *
	 * @param int   $post_id The post ID to update.
	 * @param array $url_mapping Array mapping original URLs to new WordPress URLs.
	 * @return bool True on success, false on failure.
	 */
	public static function update_post_content_with_new_image_urls( $post_id, $url_mapping ) {
		// Get the current post content
		$post = get_post( $post_id );
		if ( ! $post ) {
			return false;
		}

		$content        = $post->post_content;
		$updated        = false;
		$replaced_count = 0;

		// Replace each original URL with the new WordPress URL
		foreach ( $url_mapping as $original_url => $new_url ) {
			if ( ! empty( $new_url ) ) {
				// Use str_replace for exact URL replacement
				$new_content = str_replace( $original_url, $new_url, $content );

				// If no replacement happened, try with HTML entity encoded version
				if ( $new_content === $content ) {
					$encoded_url = htmlspecialchars( $original_url, ENT_QUOTES | ENT_HTML5, 'UTF-8' );
					$new_content = str_replace( $encoded_url, $new_url, $content );
				}

				// If still no replacement, try with double-encoded version (common in WordPress)
				if ( $new_content === $content ) {
					$double_encoded_url = htmlspecialchars( htmlspecialchars( $original_url, ENT_QUOTES | ENT_HTML5, 'UTF-8' ), ENT_QUOTES | ENT_HTML5, 'UTF-8' );
					$new_content        = str_replace( $double_encoded_url, $new_url, $content );
				}

				if ( $new_content !== $content ) {
					$content = $new_content;
					$updated = true;
					$replaced_count++;
				}
			}
		}

		// Update the post if content changed
		if ( $updated ) {
			$update_result = wp_update_post(
				array(
					'ID'           => $post_id,
					'post_content' => $content,
				)
			);

			if ( is_wp_error( $update_result ) ) {
				return false;
			}

			return true;
		}

		return true; // No changes needed
	}

	/**
	 * Connect to the WordPress filesystem.
	 *
	 * @return boolean
	 */
	public static function connect_to_filesystem() {
		require_once ABSPATH . 'wp-admin/includes/file.php';

		// We want to ensure that the user has direct access to the filesystem.
		$access_type = \get_filesystem_method();
		if ( 'direct' !== $access_type ) {
			return false;
		}

		$creds = \request_filesystem_credentials( site_url() . '/wp-admin', '', false, false, array() );

		if ( ! \WP_Filesystem( $creds ) ) {
			return false;
		}

		return true;
	}
}
