<?php
/**
 * Post type service.
 *
 * @package NewfoldLabs\WP\Module\Onboarding\Services
 */

namespace NewfoldLabs\WP\Module\Onboarding\Services;

/**
 * Post Type Service Class
 *
 * Responsible for registering the post types and meta fields for the onboarding-generated content.
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
	}

	/**
	 * Register post types.
	 */
	public function register(): void {
		$this->register_service_post_type();
		$this->register_image_url_meta();
	}

	/**
	 * Register service post type.
	 */
	private function register_service_post_type(): void {
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
			'has_archive'        => true,
			'show_in_rest'       => true,
			'supports'           => array( 'title', 'editor', 'thumbnail', 'custom-fields' ),
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
		foreach ( array( 'page', 'post', 'product', self::SERVICE_POST_TYPE ) as $post_type ) {
			if ( 'page' !== $post_type ) {
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
