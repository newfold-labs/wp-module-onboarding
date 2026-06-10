<?php
/**
 * Common site type service.
 *
 * @package NewfoldLabs\WP\Module\Onboarding\Services\SiteTypes
 */

namespace NewfoldLabs\WP\Module\Onboarding\Services\SiteTypes;

use NewfoldLabs\WP\Module\Onboarding\Services\PostTypeService;
/**
 * Common site type service.
 */
class CommonSiteTypeService {

	/**
	 * Publishes a list of blog posts.
	 *
	 * @param array $articles The articles.
	 * @return int[] List of successfully created article IDs.
	 */
	public static function publish_articles( array $articles ): array {
		$category_map = self::build_category_map_from_articles( $articles );
		$created_ids  = array();

		foreach ( $articles as $article ) {
			$category_ids = array();
			foreach ( ( $article['categories'] ?? array() ) as $category ) {
				if ( ! empty( $category_map[ $category ] ) ) {
					$category_ids[] = $category_map[ $category ];
				}
			}

			$article_id = self::publish_article(
				$article['title'] ?? '',
				$article['excerpt'] ?? '',
				$article['content'] ?? '',
				$article['featured_image'] ?? '',
				$category_ids
			);

			if ( is_wp_error( $article_id ) ) {
				continue;
			}

			$created_ids[] = $article_id;
		}

		return $created_ids;
	}

	/**
	 * Builds a deduplicated category map: name → term_id.
	 *
	 * @param array $articles The articles.
	 * @return array<string,int> The map of category name to term ID.
	 */
	private static function build_category_map_from_articles( array $articles ): array {
		$category_map = array();
		foreach ( $articles as $article ) {
			foreach ( ( $article['categories'] ?? array() ) as $category ) {
				if ( ! isset( $category_map[ $category ] ) ) {
					$category_map[ $category ] = self::create_blog_category( $category );
				}
			}
		}
		return $category_map;
	}

	/**
	 * Publishes a blog post.
	 *
	 * @param string $title Post title.
	 * @param string $excerpt Post excerpt.
	 * @param string $content Post body.
	 * @param string $image Optional featured image URL.
	 * @param array  $categories Category term IDs to assign.
	 * @return int|\WP_Error The post ID.
	 */
	public static function publish_article( string $title, string $excerpt, string $content, string $image = '', array $categories = array() ) {
		// Remove hooks that can slow down the operation.
		remove_all_actions( 'wp_insert_post' );
		remove_all_actions( 'save_post' );

		$post_author = get_current_user_id();
		if ( ! $post_author ) {
			$post_author = 1;
		}

		$post_data = array(
			'post_title'   => $title,
			'post_content' => $content,
			'post_excerpt' => $excerpt,
			'post_status'  => 'publish',
			'post_type'    => 'post',
			'post_author'  => $post_author,
		);
		// Insert post.
		$post_id = wp_insert_post( $post_data );
		// Validate post was created successfully.
		if ( is_wp_error( $post_id ) || ! $post_id ) {
			return new \WP_Error( 'error_publishing_blog_post', 'Failed to create post' );
		}

		if ( ! empty( $categories ) ) {
			wp_set_post_terms( $post_id, $categories, 'category' );
		}

		update_post_meta( $post_id, 'nfd_onboarding_generated', '1' );
		if ( ! empty( $image ) ) {
			update_post_meta( $post_id, 'nfd_image_url', esc_url_raw( $image ) );
		}

		return $post_id;
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
		update_term_meta( $category['term_id'], PostTypeService::META_ONBOARDING_GENERATED, '1' );
		return $category['term_id'];
	}
}
