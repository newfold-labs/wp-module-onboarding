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
	 * Default rewrite slug for the service post type.
	 */
	const SERVICE_REWRITE_SLUG = 'services';

	/**
	 * Rewrite slug used when the default "services" base is already taken by the site's
	 * own content. A generic "services" slug registers /services/* rewrite rules that
	 * take priority over a site's own Page named "Services" and 404 that page's child
	 * pages on pretty permalink structures (DEVSUP-154525), so the post type steps aside.
	 */
	const SERVICE_REWRITE_SLUG_NAMESPACED = 'nfd-services';

	/**
	 * Option that caches the effective rewrite slug, so register() reads it for free on
	 * every request (autoloaded) instead of querying. It is cleared when a page is added
	 * or removed, which recomputes the slug on the next request.
	 */
	const REWRITE_SLUG_OPTION = 'nfd_onboarding_service_rewrite_slug';

	/**
	 * Option that records the slug the rewrite rules were last flushed for, so the rules
	 * are flushed exactly once whenever the registered slug changes.
	 */
	const REWRITE_FLUSHED_OPTION = 'nfd_onboarding_service_rewrite_flushed';

	/**
	 * Memoized effective rewrite slug for the current request.
	 *
	 * @var string|null
	 */
	private $rewrite_slug = null;

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'init', array( $this, 'register' ) );
		add_action( 'wp_loaded', array( $this, 'maybe_flush_rewrite_rules' ) );
		add_action( 'save_post_page', array( $this, 'invalidate_rewrite_slug_cache' ), 10, 2 );
		add_action( 'deleted_post', array( $this, 'invalidate_rewrite_slug_cache' ), 10, 2 );
		add_action( 'trashed_post', array( $this, 'invalidate_rewrite_slug_cache' ), 10, 1 );
		add_action( 'untrashed_post', array( $this, 'invalidate_rewrite_slug_cache' ), 10, 1 );
	}

	/**
	 * The rewrite slug to register the service post type under.
	 *
	 * Uses the default "services" slug, unless the site already has its own top-level page
	 * at /services/, in which case it steps aside to a namespaced slug so it does not
	 * shadow that page's child pages.
	 *
	 * The value is cached in an autoloaded option so it is read for free on init; the cache
	 * is recomputed only after it is cleared by invalidate_rewrite_slug_cache(), so the
	 * database is not queried on every request. Also memoized for the current request.
	 *
	 * @return string
	 */
	public function get_rewrite_slug(): string {
		if ( null !== $this->rewrite_slug ) {
			return $this->rewrite_slug;
		}

		$cached = get_option( self::REWRITE_SLUG_OPTION );
		if ( self::SERVICE_REWRITE_SLUG === $cached || self::SERVICE_REWRITE_SLUG_NAMESPACED === $cached ) {
			$this->rewrite_slug = $cached;
			return $this->rewrite_slug;
		}

		$this->rewrite_slug = $this->is_services_path_in_use()
			? self::SERVICE_REWRITE_SLUG_NAMESPACED
			: self::SERVICE_REWRITE_SLUG;
		update_option( self::REWRITE_SLUG_OPTION, $this->rewrite_slug );

		return $this->rewrite_slug;
	}

	/**
	 * Clear the cached rewrite slug when a page is created, deleted, trashed, or restored.
	 *
	 * Any of those to a top-level /services/ page can change the effective slug, so the
	 * cache is cleared and recomputed on the next request, where maybe_flush_rewrite_rules()
	 * then flushes the rules if the registered slug actually changed. Changes to other post
	 * types are ignored.
	 *
	 * @param int           $post_id Post ID.
	 * @param \WP_Post|null $post    Post object; passed by save_post_page and deleted_post,
	 *                               resolved from $post_id for the trash hooks.
	 * @return void
	 */
	public function invalidate_rewrite_slug_cache( $post_id, $post = null ): void {
		if ( ! $post instanceof \WP_Post ) {
			$post = get_post( $post_id );
		}
		if ( ! $post instanceof \WP_Post || 'page' !== $post->post_type ) {
			return;
		}

		delete_option( self::REWRITE_SLUG_OPTION );
	}

	/**
	 * Whether the site's own content already occupies the top-level /services/ path.
	 *
	 * Scoped to a top-level page (post_parent 0): only a page at /services/ can own child
	 * pages that the CPT's /services/<child> rules would shadow. A nested page such as
	 * /about/services/, a post that shares the slug, or anything deeper does not occupy
	 * /services/ and must not force the post type to step aside.
	 *
	 * Called at most once per cache cycle from get_rewrite_slug(), not on every request.
	 *
	 * @return bool
	 */
	private function is_services_path_in_use(): bool {
		$found = get_posts(
			array(
				'post_type'              => 'page',
				'name'                   => self::SERVICE_REWRITE_SLUG,
				'post_parent'            => 0,
				'post_status'            => 'publish',
				'numberposts'            => 1,
				'fields'                 => 'ids',
				'no_found_rows'          => true,
				'update_post_meta_cache' => false,
				'update_post_term_cache' => false,
			)
		);

		return ! empty( $found );
	}

	/**
	 * Rewrite arguments for the service post type.
	 *
	 * When the post type steps aside to the namespaced slug, with_front is dropped so the
	 * rules cannot pick the permalink front back up and collide again.
	 *
	 * @return array
	 */
	private function get_rewrite_args(): array {
		$slug = $this->get_rewrite_slug();

		if ( self::SERVICE_REWRITE_SLUG_NAMESPACED === $slug ) {
			return array(
				'slug'       => $slug,
				'with_front' => false,
			);
		}

		return array(
			'slug'       => $slug,
			'with_front' => true,
		);
	}

	/**
	 * Flush rewrite rules once whenever the effective service rewrite slug changes.
	 *
	 * register_post_type() does not refresh the cached rewrite_rules option on its own,
	 * so the slug change would not take effect until something else flushed. This performs
	 * a single soft flush when the slug the post type is registered under differs from the
	 * slug the rules were last flushed for: on upgrade for sites that already collide, and
	 * again after a conflicting /services/ page is added or removed.
	 *
	 * @return void
	 */
	public function maybe_flush_rewrite_rules(): void {
		if ( '' === (string) get_option( 'permalink_structure' ) ) {
			return; // Plain permalinks have no rewrite rules to flush.
		}

		$slug = $this->get_rewrite_slug();
		if ( get_option( self::REWRITE_FLUSHED_OPTION ) === $slug ) {
			return;
		}

		flush_rewrite_rules( false );
		update_option( self::REWRITE_FLUSHED_OPTION, $slug );
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
			'has_archive'        => false,
			'show_in_rest'       => true,
			'supports'           => array( 'title', 'editor', 'thumbnail', 'custom-fields', 'excerpt' ),
			'menu_icon'          => 'dashicons-businessman',
			'rewrite'            => $this->get_rewrite_args(),
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
