<?php

namespace NewfoldLabs\WP\Module\Onboarding\Tasks;

use NewfoldLabs\WP\Module\Onboarding\Services\SiteGenImageService;

/**
 * Task for sideloading images to WordPress media library
 */
class ImageSideloadTask {

	/**
	 * The post ID to attach images to
	 *
	 * @var int
	 */
	private $post_id;

	/**
	 * Array of image URLs to sideload
	 *
	 * @var array
	 */
	private $image_urls;

	/**
	 * Constructor
	 *
	 * @param int   $post_id    The post ID to attach images to
	 * @param array $image_urls Array of image URLs to sideload
	 */
	public function __construct( $post_id, $image_urls ) {
		$this->post_id    = $post_id;
		$this->image_urls = $image_urls;
	}

	/**
	 * Execute the task
	 *
	 * @return bool|\WP_Error True on success, WP_Error on failure
	 */
	public function execute() {
		try {
			// Upload images to WordPress media library
			$result = SiteGenImageService::upload_images_to_wp_media_library( $this->image_urls, $this->post_id );

			if ( is_wp_error( $result ) ) {
				return $result;
			}

			if ( false === $result ) {
				return new \WP_Error( 'upload_failed', 'Image upload returned false' );
			}

			// Update post content with new image URLs
			if ( ! empty( $result ) ) {
				$content_updated = SiteGenImageService::update_post_content_with_new_image_urls( $this->post_id, $result );
				if ( ! $content_updated ) {
					return new \WP_Error( 'content_update_failed', 'Failed to update post content with new image URLs' );
				}
			}

			return true;
		} catch ( \Exception $e ) {
			return new \WP_Error( 'image_sideload_failed', $e->getMessage() );
		}
	}

	/**
	 * Get the post ID
	 *
	 * @return int
	 */
	public function get_post_id() {
		return $this->post_id;
	}

	/**
	 * Get the image URLs
	 *
	 * @return array
	 */
	public function get_image_urls() {
		return $this->image_urls;
	}

	/**
	 * Get a unique identifier for this task
	 *
	 * @return string
	 */
	public function get_id() {
		return 'image_sideload_' . $this->post_id . '_' . md5( maybe_serialize( $this->image_urls ) );
	}
}
