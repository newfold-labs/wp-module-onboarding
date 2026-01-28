<?php

namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;

/**
 * Class for generating snapshots.
 */
class PreviewsService {
	/**
	 * The API that processes block rendering.
	 *
	 * @var string
	 */
	protected static $screenshot_service_api = 'https://hiive.cloud/workers/screenshot-service/';

	/**
	 * Generate the snapshot.
	 * 
	 * @param string $content The content to render.
	 * @param string $slug The slug of the page.
	 * @param ?string $custom_styles The custom styles to apply to the page.
	 * @return array|\WP_Error
	 */
	public static function generate_snapshot( string $content, string $slug, ?string $custom_styles = null ): array | \WP_Error {
		if ( ! self::validate( $content ) ) {
			return new \WP_Error( 'invalid_pattern_content', 'Invalid pattern content.' );
		}

		// Initial response array.
		$response = [
			'screenshot' => null,
			'post_url'   => null,
			'post_id'    => null,
		];
		
		// Publish the page (to be crawled by the screenshot service or used as a fallback iframe).
		$post                 = self::publish_page( $content, $slug, $custom_styles );
		$response['post_url'] = $post['post_url'];
		$response['post_id']  = $post['post_id'];
		
		// Generate the screenshot.
		/**
		 * We'll be using the iframe as the main snapshot source.
		 * So we'll skip the screenshot generation for now.
		 */
		// $screenshot = self::capture_screenshot( url: $post['post_url'], key: $slug );
		// if ( ! is_wp_error( $screenshot ) ) {
		// 	$response['screenshot'] = $screenshot;
		// }

		return $response;
	}
	
	/**
	 * Validate the pattern content.
	 * 
	 * @param string $content The content to validate.
	 * @return bool
	 */
	private static function validate( string $content ): bool {
		$blocks_content = $content;

		try {
			// Parse and render the pattern.
			$parsed = parse_blocks( $blocks_content );
			if ( ! isset( $parsed[0] ) || empty($parsed[0] ) ) {
				throw new \Exception( 'Invalid pattern content.' );
			}
			render_block( $parsed[0] );

			return true;
		} catch ( \Exception $e ) {
			return false;
		}
	}

	/**
	 * Publish the page.
	 * 
	 * @param string $content The content to render.
	 * @param string $slug The slug of the page.
	 * @return array
	 */
	private static function publish_page( string $content, string $slug, $custom_styles = null ): array {
		// Inject custom styles if provided
		if ( $custom_styles ) {
			$styles = '<style>';
			// Disable cursor events.
			$styles .= 'body * { cursor: default !important; }';
			// Remove unintended content margin added by the style/script block.
			$styles .= '.entry-content > :not(style):not(script):first-of-type {margin-top: 0 !important;}';
			// Hide preview pages links from nav
			$styles .= '.wp-block-pages-list__item:has(a[href*="home-version"]) { display: none !important; }';
			$styles .= '.wp-block-pages-list__item:has(a[href*="home-homepage"]) { display: none !important; }';
			// Add custom styles
			$styles .= $custom_styles;
			$styles .= '</style>';
		}

		// Inject iframe script
		$iframe_script = '<script>
			document.addEventListener("DOMContentLoaded", function() {
				// Check if page is loaded in an iframe
				if (typeof window !== "undefined" && window.self !== window.top) {
					// Hide the admin bar
					const nfdOnboardingPreviewAdminBar = document.getElementById("wpadminbar");
					if (nfdOnboardingPreviewAdminBar) {
						nfdOnboardingPreviewAdminBar.style.display = "none";
						// Remove the admin bar reserved space
						document.documentElement.style.setProperty("margin-top", "0px", "important");
					}

					// Prevent click events
					document.addEventListener("click", function(e) {
						e.preventDefault();
						e.stopPropagation();
						return false;
					}, true);

					// Prevent context menu (right click)
					document.addEventListener("contextmenu", function(e) {
						e.preventDefault();
						return false;
					});
				}
			});
		</script>';

		// Remove hooks that can slow down the operation.
		remove_all_actions('wp_insert_post');
		remove_all_actions('save_post');
		// Insert the page.
		$post_id = wp_insert_post( array(
			'post_title'    => 'Home-' . $slug,
			'post_name'     => 'home-' . $slug,
			'post_content'  => $styles . $iframe_script . $content,
			'post_status'   => 'publish',
			'post_type'     => 'page',
			'page_template' => 'blank',
		) );
		$post_url = get_permalink( $post_id );

		// Add the preview page id to 'sitegen_previews' option to be cleaned up later
		$sitegen_previews = get_option( Options::get_option_name( 'sitegen_previews' ), array() );
		$sitegen_previews[] = $post_id;
		update_option( Options::get_option_name( 'sitegen_previews' ), $sitegen_previews );

		return [
			'post_url' => $post_url,
			'post_id' => $post_id,
		];
	}

	/**
	 * Generate the screenshot.
	 * 
	 * @link https://github.com/newfold-labs/cf-worker-screenshot-service — Documentation.
	 * @param string $url The URL of the page.
	 * @param string $key cache key.
	 * @return string|WP_Error
	 */
	public static function capture_screenshot( string $url, string $key ): string | \WP_Error {
		$body = array(
			'url'   => $url,
			'key'  => $key,
			'quality' => 50,
		);
		$args = array(
			'body'    => wp_json_encode( $body ),
			'headers' => array(
				'Content-Type' => 'application/json',
			),
			'timeout' => 30,
		);

		$response = wp_remote_post( self::$screenshot_service_api, $args );
		$status   = wp_remote_retrieve_response_code( $response );
		if ( 200 !== $status ) {
			return new \WP_Error(
				'nfd_onboarding_error',
				__( 'Unable to generate screenshot.', 'wp-module-onboarding-data' ),
				array(
					'status' => '500',
				)
			);
		}

		// Get the image data and convert it to base64.
		$img_binary = wp_remote_retrieve_body( $response );
		$img_base64 = base64_encode( $img_binary );
		$img        = 'data:image/webp;base64,' . $img_base64;
		return $img;
	}

	/**
	 * Trash the preview pages.
	 * 
	 * @return void
	 */
	public static function trash_preview_pages(): void {
		$sitegen_previews = get_option( Options::get_option_name( 'sitegen_previews' ), array() );
		foreach ( $sitegen_previews as $post_id ) {
			wp_delete_post( $post_id, true );
		}
		delete_option( Options::get_option_name( 'sitegen_previews' ) );
	}
}
