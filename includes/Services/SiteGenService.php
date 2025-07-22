<?php

namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Services\SitePagesService;
use NewfoldLabs\WP\Module\Onboarding\Data\Services\SiteGenService as LegacySiteGenService;
use NewfoldLabs\WP\Module\Onboarding\Data\Services\ThemeGeneratorService;
use NewfoldLabs\WP\Module\Onboarding\Services\ReduxStateService;

/**
 * Class SiteGenService
 *
 * Handles the onboarding SiteGen flow for generating, publishing, and managing AI-generated homepages and related content.
 *
 * This service is designed to work with the onboarding module's Redux state and integrates with other onboarding services.
 *
 * @package NewfoldLabs\WP\Module\Onboarding\Services
 */
class SiteGenService {

	/**
	 * The Redux input object.
	 *
	 * @var array|null
	 */
	private $input_data = null;

	/**
	 * The Redux sitegen object.
	 *
	 * @var array|null
	 */
	private $sitegen_data = null;

	/**
	 * SiteGenService constructor.
	 *
	 * Initializes the service by loading the Redux input and sitegen data from the ReduxStateService.
	 */
	public function __construct() {
		$this->input_data   = ReduxStateService::get( 'input' );
		$this->sitegen_data = ReduxStateService::get( 'sitegen' );
		
		// Register AJAX handler for immediate async processing
		add_action( 'wp_ajax_sitegen_process_images_async', array( $this, 'handle_ajax_image_processing' ) );
		add_action( 'wp_ajax_nopriv_sitegen_process_images_async', array( $this, 'handle_ajax_image_processing' ) );
	}

	/**
	 * Handle AJAX request for immediate async image processing.
	 */
	public function handle_ajax_image_processing() {
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
	 * Process homepage images immediately in background (alternative to cron).
	 * This method dispatches an async request that doesn't block the main request.
	 *
	 * @param int    $post_id The post ID to process images for.
	 * @param string $content The content containing images.
	 */
	public function process_homepage_images_immediate_async( $post_id, $content ) {
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
	 * Publish the selected sitegen homepage.
	 *
	 * @param string $selected_sitegen_homepage The selected sitegen homepage to publish.
	 * @return int|\WP_Error
	 */
	public function publish_homepage( string $selected_sitegen_homepage ) {
		// Validate we have the selected homepage.
		if (
			! $this->sitegen_data ||
			! is_array( $this->sitegen_data['homepages'] ) ||
			! isset( $this->sitegen_data['homepages'][ $selected_sitegen_homepage ] )
		) {
			return new \WP_Error(
				'sitegen_homepage_publish_validation_error',
				'Error validating selected homepage.',
			);
		}

		$selected_homepage = $this->sitegen_data['homepages'][ $selected_sitegen_homepage ];
		$content           = $selected_homepage['content'];
		$title             = __( 'Home', 'wp-module-onboarding' );

		$post_id = SitePagesService::publish_page(
			$title,
			$content,
			true,
			array(
				'nf_dc_page' => 'home',
			)
		);
		if ( 0 === $post_id || is_wp_error( $post_id ) ) {
			return new \WP_Error(
				'sitegen_homepage_publish_error',
				'Error publishing homepage.',
			);
		}

		// Process images immediately in background (non-blocking)
		$this->process_homepage_images_immediate_async( $post_id, $content );

		// Add the homepage to the site navigation.
		$this->add_page_to_navigation( $post_id, $title, get_permalink( $post_id ) );

		// Change WordPress reading options to show static page as homepage.
		$wp_reading_homepage_option = get_option( 'show_on_front' );
		if ( 'page' !== $wp_reading_homepage_option ) {
			update_option( 'show_on_front', 'page' );
		}
		// Set the homepage as the front page.
		update_option( 'page_on_front', $post_id );

		return $post_id;
	}

	/**
	 * Get AI generated page title for a given slug (if found in sitemap).
	 *
	 * @param string $slug The slug of the page to get the title for.
	 * @return string|false The page title, or false if not found.
	 */
	public function get_sitemap_page_title( string $slug ) {
		$prompt    = $this->get_prompt();
		$locale    = $this->get_locale();
		$site_type = $this->get_site_type();
		if ( ! $prompt || ! $locale || ! $site_type ) {
			return false;
		}

		$sitemap = LegacySiteGenService::instantiate_site_meta( $prompt, 'sitemap', $site_type, $locale );
		if ( ! is_wp_error( $sitemap ) ) {
			foreach ( $sitemap as $page ) {
				if ( $slug === $page['slug'] ) {
					$title = $page['title'];
					return $title;
				}
			}
		}

		return false;
	}

	/**
	 * Add a page to the site navigation.
	 *
	 * @param int    $post_id The ID of the page to add to the navigation.
	 * @param string $page_title The title of the page.
	 * @param string $permalink The permalink of the page.
	 */
	public function add_page_to_navigation( int $post_id, string $page_title, string $permalink ): void {
		$id    = $post_id;
		$label = $page_title;
		$url   = $permalink;

		$nav_link_grammar = "<!-- wp:navigation-link {\"label\":\"$label\",\"type\":\"page\",\"id\":$id,\"url\":\"$url\",\"kind\":\"post-type\"} /-->";

		$navigation = new \WP_Query(
			array(
				'name'      => 'navigation',
				'post_type' => 'wp_navigation',
			)
		);
		if ( ! empty( $navigation->posts ) ) {
			wp_update_post(
				array(
					'ID'           => $navigation->posts[0]->ID,
					'post_content' => $nav_link_grammar . $navigation->posts[0]->post_content,
				)
			);
		}
	}

	/**
	 * Get the prompt entered during Onboarding.
	 *
	 * @return string|false
	 */
	public function get_prompt() {
		return ! empty( $this->input_data['prompt'] ) ? $this->input_data['prompt'] : false;
	}

	/**
	 * Get the site type entered during Onboarding.
	 *
	 * @return string
	 */
	public function get_site_type() {
		return ! empty( $this->input_data['siteType'] ) ? $this->input_data['siteType'] : 'business';
	}

	/**
	 * Get the locale entered during Onboarding.
	 *
	 * @return string
	 */
	public function get_locale() {
		return ! empty( $this->input_data['locale'] ) ? $this->input_data['locale'] : 'en_US';
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
		ThemeGeneratorService::connect_to_filesystem();

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
}
