<?php
/**
 * Post type service.
 *
 * @package NewfoldLabs\WP\Module\Onboarding\Services
 */

namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;

/**
 * Post Type Service Class
 *
 * Responsible for registering the post types and meta fields for the onboarding-generated content.
 *
 * The `nfd_service` post type claims the `/services/` URL space, which collides with
 * existing "Services" pages and their children on sites that never used onboarding.
 * It is therefore only registered when the autoloaded services option is true. The
 * option is seeded by the 4.0.11 upgrade routine and enabled when onboarding
 * publishes services. Changing the option re-syncs registration and rewrite rules.
 */
class PostTypeService {

	/**
	 * Service post type.
	 */
	const SERVICE_POST_TYPE = 'nfd_service';

	/**
	 * Meta image URL.
	 */
	const META_IMAGE_URL = 'nfd_image_url';

	/**
	 * Meta onboarding generated.
	 */
	const META_ONBOARDING_GENERATED = 'nfd_onboarding_generated';

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'init', array( $this, 'register' ) );

		$option = self::get_services_option_name();
		add_action( "add_option_{$option}", array( __CLASS__, 'sync_service_post_type' ) );
		add_action( "update_option_{$option}", array( __CLASS__, 'sync_service_post_type' ) );
		add_action( "delete_option_{$option}", array( __CLASS__, 'handle_services_option_deleted' ) );
	}

	/**
	 * Register post types.
	 */
	public function register(): void {
		if ( self::is_services_enabled() ) {
			self::register_service_post_type();
		}
		$this->register_image_url_meta();
	}

	/**
	 * Name of the autoloaded option that gates the service post type.
	 *
	 * @return string
	 */
	public static function get_services_option_name(): string {
		return (string) Options::get_option_name( 'services_post_type_enabled' );
	}

	/**
	 * Whether the service post type should be registered.
	 *
	 * @return bool
	 */
	public static function is_services_enabled(): bool {
		return wp_validate_boolean( get_option( self::get_services_option_name(), false ) );
	}

	/**
	 * Enable or disable the service post type.
	 *
	 * Stored as '1' / '0' with autoload so the check on every request is free.
	 * Registration and rewrite rules are synced by the option hooks.
	 *
	 * @param bool $enabled Whether the post type should be registered.
	 * @return void
	 */
	public static function set_services_enabled( bool $enabled ): void {
		update_option( self::get_services_option_name(), $enabled ? '1' : '0', true );
	}

	/**
	 * Whether any `nfd_service` posts exist in the database.
	 *
	 * Queries the table directly so it works even when the post type is not registered.
	 *
	 * @return bool
	 */
	public static function has_service_posts(): bool {
		global $wpdb;

		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- one-off check; post type may be unregistered.
		$found = $wpdb->get_var(
			$wpdb->prepare(
				"SELECT ID FROM {$wpdb->posts} WHERE post_type = %s AND post_status <> 'auto-draft' LIMIT 1",
				self::SERVICE_POST_TYPE
			)
		);

		return ! empty( $found );
	}

	/**
	 * Sync post type registration with the option, then flush rewrite rules.
	 *
	 * Hooked to the option's add/update actions.
	 *
	 * @return void
	 */
	public static function sync_service_post_type(): void {
		self::apply_service_post_type_state( self::is_services_enabled() );
	}

	/**
	 * Treat deleting the option as disabling the post type.
	 *
	 * @return void
	 */
	public static function handle_services_option_deleted(): void {
		self::apply_service_post_type_state( false );
	}

	/**
	 * Register or unregister the post type for the current request and flush rewrite rules.
	 *
	 * Rewrite rules are flushed by clearing the stored rules rather than calling
	 * flush_rewrite_rules(). WordPress rebuilds them on the next request, once every
	 * post type is registered. Regenerating them in this request is unsafe: before
	 * `init` other post types are not registered yet, and after a post type is
	 * unregistered its rules linger in WP_Rewrite::$extra_rules_top for the rest of
	 * the request, so they would be saved again.
	 *
	 * @param bool $enabled Whether the post type should be registered.
	 * @return void
	 */
	private static function apply_service_post_type_state( bool $enabled ): void {
		if ( did_action( 'init' ) ) {
			$registered = post_type_exists( self::SERVICE_POST_TYPE );
			if ( $enabled && ! $registered ) {
				self::register_service_post_type();
			} elseif ( ! $enabled && $registered ) {
				unregister_post_type( self::SERVICE_POST_TYPE );
			}
		}

		delete_option( 'rewrite_rules' );
	}

	/**
	 * Register service post type.
	 */
	private static function register_service_post_type(): void {
		$labels = array(
			'name'                     => _x( 'Services', 'post type general name', 'wp-module-onboarding' ),
			'singular_name'            => _x( 'Service', 'post type singular name', 'wp-module-onboarding' ),
			'add_new'                  => _x( 'Add New', 'service', 'wp-module-onboarding' ),
			'add_new_item'             => __( 'Add New Service', 'wp-module-onboarding' ),
			'edit_item'                => __( 'Edit Service', 'wp-module-onboarding' ),
			'new_item'                 => __( 'New Service', 'wp-module-onboarding' ),
			'view_item'                => __( 'View Service', 'wp-module-onboarding' ),
			'view_items'               => __( 'View Services', 'wp-module-onboarding' ),
			'search_items'             => __( 'Search Services', 'wp-module-onboarding' ),
			'not_found'                => __( 'No services found.', 'wp-module-onboarding' ),
			'not_found_in_trash'       => __( 'No services found in Trash.', 'wp-module-onboarding' ),
			'parent_item_colon'        => __( 'Parent Service:', 'wp-module-onboarding' ),
			'all_items'                => __( 'All Services', 'wp-module-onboarding' ),
			'archives'                 => __( 'Service Archives', 'wp-module-onboarding' ),
			'attributes'               => __( 'Service Attributes', 'wp-module-onboarding' ),
			'insert_into_item'         => __( 'Insert into service', 'wp-module-onboarding' ),
			'uploaded_to_this_item'    => __( 'Uploaded to this service', 'wp-module-onboarding' ),
			'filter_items_list'        => __( 'Filter services list', 'wp-module-onboarding' ),
			'filter_by_date'           => __( 'Filter by date', 'wp-module-onboarding' ),
			'items_list_navigation'    => __( 'Services list navigation', 'wp-module-onboarding' ),
			'items_list'               => __( 'Services list', 'wp-module-onboarding' ),
			'item_published'           => __( 'Service published.', 'wp-module-onboarding' ),
			'item_published_privately' => __( 'Service published privately.', 'wp-module-onboarding' ),
			'item_reverted_to_draft'   => __( 'Service reverted to draft.', 'wp-module-onboarding' ),
			'item_trashed'             => __( 'Service trashed.', 'wp-module-onboarding' ),
			'item_untrashed'           => __( 'Service restored from Trash.', 'wp-module-onboarding' ),
			'item_scheduled'           => __( 'Service scheduled.', 'wp-module-onboarding' ),
			'item_updated'             => __( 'Service updated.', 'wp-module-onboarding' ),
			'menu_name'                => __( 'Services', 'wp-module-onboarding' ),
			'name_admin_bar'           => __( 'Service', 'wp-module-onboarding' ),
			'featured_image'           => __( 'Service featured image', 'wp-module-onboarding' ),
			'set_featured_image'       => __( 'Set service featured image', 'wp-module-onboarding' ),
			'remove_featured_image'    => __( 'Remove service featured image', 'wp-module-onboarding' ),
			'use_featured_image'       => __( 'Use as service featured image', 'wp-module-onboarding' ),
		);

		$args = array(
			'labels'             => $labels,
			'public'             => true,
			'has_archive'        => false,
			'show_in_rest'       => true,
			'supports'           => array( 'title', 'editor', 'thumbnail', 'custom-fields', 'excerpt' ),
			'menu_icon'          => 'dashicons-businessman',
			'rewrite'            => array( 'slug' => 'services' ),
			'publicly_queryable' => true,
			'show_ui'            => true,
			'show_in_menu'       => true,
			'query_var'          => true,
			'capability_type'    => 'post',
			'map_meta_cap'       => true,
		);

		register_post_type( self::SERVICE_POST_TYPE, $args );
	}


	/**
	 * Register image URL meta.
	 *
	 * @return void
	 */
	private function register_image_url_meta(): void {
		foreach ( array( 'page', 'post', 'product', 'wp_navigation', self::SERVICE_POST_TYPE ) as $post_type ) {
			if ( ! in_array( $post_type, array( 'page', 'wp_navigation' ), true ) ) {
				register_post_meta(
					$post_type,
					self::META_IMAGE_URL,
					array(
						'show_in_rest' => true,
						'single'       => true,
						'type'         => 'string',
					)
				);
			}

			register_post_meta(
				$post_type,
				self::META_ONBOARDING_GENERATED,
				array(
					'show_in_rest' => true,
					'single'       => true,
					'type'         => 'string',
				)
			);
		}
	}
}
