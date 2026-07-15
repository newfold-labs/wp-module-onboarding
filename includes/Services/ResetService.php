<?php

namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;
/**
 * Reset Services
 *
 * This class handles the reset of the onboarding services.
 */
class ResetService {

	/**
	 * Taxonomies to clear
	 *
	 * @var array
	 */
	private static $taxonomies = array( 'category', 'product_cat' );

	/**
	 * Post types to clear
	 *
	 * @var array
	 */
	private static $post_types = array( 'page', 'post', 'product', PostTypeService::SERVICE_POST_TYPE, 'wp_navigation' );

	/**
	 * Reset the onboarding services.
	 *
	 * @return void
	 */
	public static function reset(): void {
		self::delete_posts( true );
		self::delete_terms( true );
		self::delete_font_posts();
		self::reset_site_identity();
		self::reset_template_part( 'header' );
		self::reset_template_part( 'footer' );
		self::reset_global_styles();
		self::reset_onboarding_options();
		self::unschedule_cron_jobs();
		self::reset_prompt_origin();
	}

	/**
	 * Clear the onboarding backend process.
	 *
	 * @return void
	 */
	public static function clear(): void {
		self::delete_posts();
		self::delete_terms();
	}

	/**
	 * Delete all posts onboarding generated across post types: page, post, product, service
	 *
	 * @param bool $generated_only If true, delete posts onboarding generated.
	 *
	 * @return void
	 */
	private static function delete_posts( $generated_only = false ): void {

		$query = array(
			'post_type'      => self::$post_types,
			'post_status'    => 'any',
			'posts_per_page' => -1,
			'fields'         => 'ids',
		);

		if ( $generated_only ) {
			$query = array_merge(
				$query,
				array(
					'meta_key'   => PostTypeService::META_ONBOARDING_GENERATED,
					'meta_value' => '1',
				)
			);
		}

		$posts = get_posts( $query );

		if ( is_wp_error( $posts ) || empty( $posts ) ) {
			return;
		}

		foreach ( $posts as $post_id ) {

			$thumbnail_id = (int) get_post_thumbnail_id( $post_id );
			if ( $thumbnail_id ) {
				wp_delete_attachment( $thumbnail_id, true );
			}

			// remove all attached media of a page.
			$children = get_attached_media( '', $post_id );
			foreach ( $children as $child ) {
				wp_delete_attachment( $child->ID, true );
			}

			wp_delete_post( $post_id, true );
		}
	}

	/**
	 * Delete Font Library posts (wp_font_family / wp_font_face) so a regeneration
	 * reinstalls fonts cleanly.
	 *
	 * @return void
	 */
	private static function delete_font_posts(): void {
		if ( ! post_type_exists( 'wp_font_family' ) ) {
			return;
		}

		$font_posts = get_posts(
			array(
				'post_type'      => array( 'wp_font_family', 'wp_font_face' ),
				'post_status'    => 'any',
				'posts_per_page' => -1,
				'fields'         => 'ids',
			)
		);

		if ( is_wp_error( $font_posts ) || empty( $font_posts ) ) {
			return;
		}

		foreach ( $font_posts as $post_id ) {
			wp_delete_post( (int) $post_id, true );
		}
	}

	/**
	 * Reset site identity
	 *
	 * @return void
	 */
	private static function reset_site_identity(): void {
		$logo_id = (int) get_option( 'site_logo' );
		if ( $logo_id ) {
			wp_delete_attachment( $logo_id, true );
		}

		delete_option( 'site_logo' );
		delete_option( 'site_icon' );
		update_option( 'blogname', '' );
		update_option( 'blogdescription', '' );
	}

	/**
	 * Delete all onboarding-related options from the database.
	 * Some options (e.g. sitegen state) are preserved.
	 *
	 * @return void
	 */
	private static function reset_onboarding_options(): void {
		global $wpdb;
		$prefixes = array( 'nfd_module_onboarding_', 'nfd-ai-site-gen' );
		$excluded = array( 'nfd_module_onboarding_sitegen_site_id', 'nfd_module_onboarding_sitegen_previous_ids' );

		foreach ( $prefixes as $prefix ) {
			$options = $wpdb->get_col(
				$wpdb->prepare(
					"SELECT option_name FROM {$wpdb->options} WHERE option_name LIKE %s",
					$wpdb->esc_like( $prefix ) . '%'
				)
			);

			if ( empty( $options ) ) {
				continue;
			}

			foreach ( $options as $option_name ) {
				if ( in_array( $option_name, $excluded, true ) ) {
					continue;
				}
				delete_option( $option_name );
			}
		}
	}

	/**
	 * Unschedule any pending WP-Cron jobs registered during onboarding.
	 *
	 * @return void
	 */
	private static function unschedule_cron_jobs(): void {
		wp_unschedule_hook( MediaService::CRON_HOOK );
		wp_unschedule_hook( SiteGenImageService::CRON_HOOK );
		wp_unschedule_hook( SiteGenImageService::DAILY_CRON_HOOK );
	}

	/**
	 * Reset the prompt origin and save it  in the prompt_completed option
	 *
	 * @return void
	 */
	private static function reset_prompt_origin(): void {
		$origin_prompt       = get_option( Options::get_origin_option_name( 'origin_prompt' ) );
		$origin_chat_history = get_option( Options::get_origin_option_name( 'origin_chat_history' ) );
		if ( ! empty( $origin_prompt ) ) {
			update_option( Options::get_origin_option_name( 'origin_prompt_completed' ), $origin_prompt );
		}
		if ( ! empty( $origin_chat_history ) ) {
			update_option( Options::get_origin_option_name( 'origin_chat_history_completed' ), $origin_chat_history );
		}

		delete_option( Options::get_origin_option_name( 'origin_prompt' ) );
		delete_option( Options::get_origin_option_name( 'origin_chat_history' ) );
	}

	/**
	 * Remove default-term options so wp_delete_term() can delete Uncategorized.
	 *
	 * @param string $taxonomy Taxonomy slug.
	 * @return void
	 */
	private static function unset_default_term_option( string $taxonomy ): void {
		if ( 'category' === $taxonomy ) {
			delete_option( 'default_category' );
			return;
		}

		if ( 'product_cat' === $taxonomy ) {
			delete_option( 'default_product_cat' );
			delete_option( 'default_term_product_cat' );
		}
	}

	/**
	 * Delete terms
	 *
	 * @param bool $generated_only If true, delete terms onboarding generated.
	 *
	 * @return void
	 */
	private static function delete_terms( $generated_only = false ): void {

		foreach ( self::$taxonomies as $taxonomy ) {
			if ( ! taxonomy_exists( $taxonomy ) ) {
				continue;
			}

			if ( ! $generated_only ) {
				self::unset_default_term_option( $taxonomy );
			}

			$query = array(
				'taxonomy'   => $taxonomy,
				'hide_empty' => false,
				'fields'     => 'ids',
			);

			if ( $generated_only ) {
				$query = array_merge(
					$query,
					array(
						'meta_key'   => PostTypeService::META_ONBOARDING_GENERATED,
						'meta_value' => '1',
					)
				);
			}

			$terms = get_terms( $query );

			if ( is_wp_error( $terms ) || empty( $terms ) ) {
				continue;
			}
			foreach ( $terms as $term_id ) {
				wp_delete_term( (int) $term_id, $taxonomy );
			}
		}
	}

	/**
	 * Reset the template part to the theme default
	 *
	 * @param string $slug Template part slug.
	 * @return void
	 */
	private static function reset_template_part( string $slug ): void {
		$custom_parts = get_posts(
			array(
				'post_type'      => 'wp_template_part',
				'post_status'    => 'any',
				'name'           => $slug,
				'posts_per_page' => 1,
				'tax_query'      => array(
					array(
						'taxonomy' => 'wp_theme',
						'field'    => 'name',
						'terms'    => get_stylesheet(),
					),
				),
				'fields'         => 'ids',
			)
		);

		foreach ( $custom_parts as $post_id ) {
			wp_delete_post( (int) $post_id, true );
		}
	}

	/**
	 * Reset the global styles to the theme default
	 *
	 * @return void
	 */
	private static function reset_global_styles(): void {
		$post_id = \WP_Theme_JSON_Resolver::get_user_global_styles_post_id();
		if ( ! $post_id ) {
			return;
		}
		wp_update_post(
			array(
				'ID'           => $post_id,
				'post_content' => wp_slash( '{"version": ' . \WP_Theme_JSON::LATEST_SCHEMA . ', "isGlobalStylesUserThemeJSON": true }' ),
			)
		);
		wp_clean_theme_json_cache();
		\WP_Theme_JSON_Resolver::clean_cached_data();
	}
}
