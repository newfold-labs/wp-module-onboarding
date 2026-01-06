<?php
/**
 * Common site type service.
 *
 * @package NewfoldLabs\WP\Module\Onboarding\Services\SiteTypes
 */

namespace NewfoldLabs\WP\Module\Onboarding\Services\SiteTypes;

/**
 * Common site type service.
 */
class CommonSiteTypeService {

	/**
	 * Publishes a blog post.
	 *
	 * @param array $post The post.
	 * @return int|WP_Error The post ID.
	 */
	public static function publish_article( string $title, string $excerpt, string $content, string $image = '', array $categories = array()) {
		// Remove hooks that can slow down the operation.
		remove_all_actions('wp_insert_post');
		remove_all_actions('save_post');

		$post_data = array(
			'post_title'   => $title,
			'post_content' => $content,
			'post_excerpt' => $excerpt,
			'post_status'  => 'publish',
			'post_type'    => 'post',
			'post_author'  => get_current_user_id() ?: 1,
		);
		// Insert post.
		$post_id = wp_insert_post( $post_data );
		// Validate post was created successfully.
		if ( is_wp_error( $post_id ) || !$post_id ) {
			return new \WP_Error( 'error_publishing_blog_post', 'Failed to create post' );
		}
		// Post categories.
		if ( ! empty( $categories ) ) {
			$category_ids = array();
			foreach ( $categories as $category ) {
				$category_ids[] = self::create_blog_category( $category );
			}
			wp_set_post_terms( $post_id, $category_ids, 'category' );
		}
		// Featured image.
		if ( ! empty( $image ) ) {
			self::set_featured_image_from_url( $image, $post_id );
		}

		return $post_id;
	}

	/**
	 * Sets the featured image for a blog post.
	 *
	 * @param string $image_url The URL of the image.
	 * @param int $post_id The ID of the post.
	 * @return void
	 */
	private static function set_featured_image_from_url( string $image_url, int $post_id ): void {
		$image_id = self::import_image_from_url( $image_url, $post_id );
		if ( $image_id ) {
			update_post_meta( $post_id, '_thumbnail_id', $image_id );
		}
	}

	/**
	 * Imports an image from a URL.
	 *
	 * @param string $image_url The URL of the image.
	 * @param int $post_id The ID of the post.
	 * @return int The ID of the attachment.
	 */
	private static function import_image_from_url( string $image_url, int $post_id ): int {
		if ( ! function_exists( 'media_handle_sideload' ) ) {
			require_once( ABSPATH . 'wp-admin/includes/media.php' );
			require_once( ABSPATH . 'wp-admin/includes/file.php' );
			require_once( ABSPATH . 'wp-admin/includes/image.php' );
		}

		// Add an arbitrary extension to the image URL to trick media_sideload_image to download the image.
		$image_url     = $image_url . '?ext=.jpeg';
		$attachment_id = media_sideload_image( $image_url, $post_id, null, 'id' );
		if ( is_wp_error( $attachment_id ) ) {
			return 0;
		}

		return $attachment_id;
	}

	/**
	 * Creates or gets a blog category.
	 *
	 * @param string $name The name of the category.
	 * @return int The ID of the category.
	 */
	public static function create_blog_category( string $name ): int {
		$category_slug = sanitize_title( $name );
		$category      = get_term_by( 'slug', $category_slug, 'category' );
		if ( $category ) {
			return $category->term_id;
		}
		$category = wp_insert_term( $name, 'category' );
		if ( is_wp_error( $category ) ) {
			return 0;
		}
		return $category['term_id'];
	}
}
