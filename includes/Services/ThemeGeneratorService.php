<?php

namespace NewfoldLabs\WP\Module\Onboarding\Services;

/**
 * ThemeGeneratorService for the onboarding module.
 * 
 * Handles image processing and media library operations for the onboarding flow.
 */
class ThemeGeneratorService {

	/**
	 * Process homepage images immediately in background (non-blocking).
	 * This method dispatches an async request that doesn't block the main request.
	 *
	 * @param int    $post_id The post ID to process images for.
	 * @param string $content The content containing images.
	 */
	public static function process_homepage_images_immediate_async( $post_id, $content ) {
		// Use wp_remote_post to make an async request to the same site
		$admin_url = admin_url( 'admin-ajax.php' );
		$nonce     = wp_create_nonce( 'sitegen_async_images' );
		
		wp_remote_post(
			$admin_url,
			array(
				'timeout'   => 0.01, // Very short timeout to not block
				'blocking'  => false, // Non-blocking request
				'body'      => array(
					'action'   => 'sitegen_process_images_async',
					'post_id'  => $post_id,
					'content'  => $content,
					'nonce'    => $nonce,
				),
			)
		);
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
				}
			}
		} catch ( \Exception $e ) {
			// Log error.
		}

		return $uploaded_image_urls;
	}

	/**
	 * Extract image URLs from content and upload them to WordPress media library.
	 *
	 * This function extracts image URLs from img tags in the content, uploads the images
	 * to the WordPress media library, and then replaces the old image URLs in the content
	 * with the new ones.
	 *
	 * @param string $content The content containing img tags with image URLs.
	 * @param int    $post_id The post ID to attach the images to.
	 * @return string The updated content with new image URLs.
	 */
	public static function sideload_images_and_replace_grammar( $content, $post_id ) {
		// Extract image URLs from img tags in the content
		$image_urls = array();
		preg_match_all( '/<img[^>]+src=["\']([^"\']+)["\'][^>]*>/i', $content, $matches );

		if ( ! empty( $matches[1] ) ) {
			$image_urls = array_unique( $matches[1] );
		}

		if ( empty( $image_urls ) ) {
			return $content;
		}

		// Upload the images to WordPress media library.
		$url_mapping = self::upload_images_to_wp_media_library( $image_urls, $post_id );

		foreach ( $url_mapping as $old_url => $new_url ) {
			if ( null === $new_url ) {
				continue;
			}
			// escaping any special characters in the old URL to avoid breaking the regex.
			$escaped_old_url = preg_quote( $old_url, '/' );

			$escaped_old_url_regex_double_quote = '/"' . $escaped_old_url . '.*?"/m';
			$content                            = preg_replace( $escaped_old_url_regex_double_quote, '"' . $new_url . '"', $content );

			$escaped_old_url_regex_parenthesis = '/\(' . $escaped_old_url . '.*?\)/m';
			$content                           = preg_replace( $escaped_old_url_regex_parenthesis, '(' . $new_url . ')', $content );
		}

		// Update the content with new image URLs.
		return $content;
	}

	/**
	 * Register AJAX handlers for image processing.
	 * This should be called during plugin initialization.
	 */
	public static function register_ajax_handlers() {
		add_action( 'wp_ajax_sitegen_process_images_async', array( __CLASS__, 'handle_ajax_image_processing' ) );
		add_action( 'wp_ajax_nopriv_sitegen_process_images_async', array( __CLASS__, 'handle_ajax_image_processing' ) );
	}

	/**
	 * Handle AJAX request for immediate async image processing.
	 */
	public static function handle_ajax_image_processing() {
		// Verify nonce for security
		if ( ! wp_verify_nonce( $_POST['nonce'] ?? '', 'sitegen_async_images' ) ) {
			wp_die( 'Security check failed' );
		}
		
		$post_id = intval( $_POST['post_id'] ?? 0 );
		$content = sanitize_textarea_field( $_POST['content'] ?? '' );
		
		if ( ! $post_id || ! $content ) {
			wp_die( 'Invalid parameters' );
		}
		
		// Process images
		$updated_content = self::sideload_images_and_replace_grammar( $content, $post_id );
		if ( $updated_content !== $content ) {
			wp_update_post(
				array(
					'ID'           => $post_id,
					'post_content' => $updated_content,
				)
			);
		}
		
		wp_die( 'Success' );
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