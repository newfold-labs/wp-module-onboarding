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



	/**
	 * WP-Cron hook name for processing a batch of pending images.
	 *
	 * @var string
	 */
	const CRON_HOOK = 'nfd_sideload_pending_images';

	/**
	 * Schedule the first batch to run immediately after onboarding completes.
	 *
	 * @return void
	 */
	public static function schedule_after_onboarding() {
		if ( ! wp_next_scheduled( self::CRON_HOOK ) ) {
			wp_schedule_single_event( time(), self::CRON_HOOK );
		}
	}

	/**
	 * Download images for posts that still have a pending URL meta, in batches.
	 *
	 * Processes up to $per_page posts per run and self-reschedules via WP-Cron
	 * when more pending posts remain. Always queries from offset 0 because each
	 * successful sideload removes the meta, naturally advancing the result set.
	 *
	 * media_handle_sideload() requires a user with upload_files capability.
	 * REST import and unauthenticated requests have no such user, so we
	 * temporarily switch to the first administrator for the sideload loop.
	 *
	 * @param int $per_page Number of posts to process per batch. Default 10.
	 * @return void
	 */
	public static function sideload_pending_images( $per_page = 10 ) {
		$per_page = max( 1, (int) $per_page );

		$posts = get_posts(
			array(
				'post_type'      => array( PostTypeService::SERVICE_POST_TYPE, 'post', 'product' ),
				'meta_key'       => PostTypeService::META_IMAGE_URL,
				'meta_compare'   => 'EXISTS',
				'post_status'    => 'publish',
				'posts_per_page' => $per_page,
				'fields'         => 'all',
			)
		);
		if ( empty( $posts ) ) {
			return;
		}

		$previous_user_id = get_current_user_id();
		$admins           = get_users(
			array(
				'role'   => 'administrator',
				'number' => 1,
			)
		);
		if ( ! empty( $admins ) ) {
			wp_set_current_user( (int) $admins[0]->ID );
		} else {
			wp_set_current_user( 1 );
		}

		if ( ! function_exists( 'media_handle_sideload' ) ) {
			require_once ABSPATH . 'wp-admin/includes/media.php';
			require_once ABSPATH . 'wp-admin/includes/file.php';
			require_once ABSPATH . 'wp-admin/includes/image.php';
		}

		foreach ( $posts as $post ) {
			if ( ! $post instanceof \WP_Post ) {
				continue;
			}

			$url = get_post_meta( $post->ID, PostTypeService::META_IMAGE_URL, true );
			if ( empty( $url ) || ! is_string( $url ) ) {
				continue;
			}

			$url = esc_url_raw( $url );
			$tmp = download_url( $url );

			if ( is_wp_error( $tmp ) ) {
				delete_post_meta( $post->ID, PostTypeService::META_IMAGE_URL );
				continue;
			}

			$file_array = array(
				'name'     => $post->post_name . '.jpg',
				'tmp_name' => $tmp,
			);

			$attachment_id = media_handle_sideload( $file_array, $post->ID, $post->post_title );

			if ( is_wp_error( $attachment_id ) ) {
				@unlink( $tmp );
				continue;
			}

			set_post_thumbnail( $post->ID, (int) $attachment_id );
			delete_post_meta( $post->ID, PostTypeService::META_IMAGE_URL );
		}

		wp_set_current_user( $previous_user_id );

		// If we filled the batch, there may be more posts — schedule the next run.
		if ( count( $posts ) >= $per_page && ! wp_next_scheduled( self::CRON_HOOK ) ) {
			wp_schedule_single_event( time() + 30, self::CRON_HOOK );
		}
	}
}
