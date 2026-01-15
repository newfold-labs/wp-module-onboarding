<?php

namespace NewfoldLabs\WP\Module\Onboarding\Services;

/**
 * Media Service Class
 *
 * Handles media operations.
 */
class MediaService {

	/**
	 * Imports an image from a URL to the media library.
	 *
	 * @param string $image_url The URL of the image.
	 * @param int $post_id The ID of the post.
	 * @return array|false Array of the attachment id and src url or false if the image fails to import.
	 */
	public static function import_image_from_url( string $image_url, int $post_id = 0 ) {
		if ( ! function_exists( 'media_handle_sideload' ) ) {
			require_once( ABSPATH . 'wp-admin/includes/media.php' );
			require_once( ABSPATH . 'wp-admin/includes/file.php' );
			require_once( ABSPATH . 'wp-admin/includes/image.php' );
		}

		$attachment_id = media_sideload_image( $image_url, $post_id, null, 'id' );
		if ( is_wp_error( $attachment_id ) ) {
			return false;
		}

		$attachment_src = wp_get_attachment_url( $attachment_id );
		if ( ! $attachment_src ) {
			return false;
		}

		return array( 'id' => $attachment_id, 'src' => $attachment_src );
	}
}
