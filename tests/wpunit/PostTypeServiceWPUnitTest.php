<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Services\PostTypeService;

/**
 * PostTypeService wpunit tests.
 *
 * Guards against the service post type shadowing a site's own content at /services/,
 * which 404s that page's child pages on pretty permalinks (DEVSUP-154525). The post type
 * keeps the "services" slug when that path is free and steps aside to a namespaced slug
 * when it is not.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Services\PostTypeService
 */
class PostTypeServiceWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Service instances created during a test, tracked so their hooks can be removed.
	 *
	 * @var PostTypeService[]
	 */
	private $services = array();

	/**
	 * Set up: use a pretty permalink structure so the rewrite rules are generated.
	 *
	 * @return void
	 */
	public function setUp(): void {
		parent::setUp();
		delete_option( PostTypeService::REWRITE_SLUG_OPTION );
		delete_option( PostTypeService::REWRITE_FLUSHED_OPTION );
		global $wp_rewrite;
		$wp_rewrite->set_permalink_structure( '/%postname%/' );
	}

	/**
	 * Tear down: reset permalinks, unregister the post type, and remove instance hooks.
	 *
	 * The post type and its permastruct live on the $wp_rewrite / $wp_post_types globals,
	 * and each PostTypeService constructor adds hooks to $wp_filter; both persist across
	 * tests in one process, so without this a slug or callback from one test would leak
	 * into the next.
	 *
	 * @return void
	 */
	public function tearDown(): void {
		foreach ( $this->services as $service ) {
			remove_action( 'init', array( $service, 'register' ) );
			remove_action( 'wp_loaded', array( $service, 'maybe_flush_rewrite_rules' ) );
			remove_action( 'save_post_page', array( $service, 'invalidate_rewrite_slug_cache' ) );
			remove_action( 'deleted_post', array( $service, 'invalidate_rewrite_slug_cache' ) );
			remove_action( 'trashed_post', array( $service, 'invalidate_rewrite_slug_cache' ) );
			remove_action( 'untrashed_post', array( $service, 'invalidate_rewrite_slug_cache' ) );
		}
		$this->services = array();

		if ( post_type_exists( PostTypeService::SERVICE_POST_TYPE ) ) {
			unregister_post_type( PostTypeService::SERVICE_POST_TYPE );
		}
		global $wp_rewrite;
		$wp_rewrite->set_permalink_structure( '' );
		$wp_rewrite->flush_rules();
		parent::tearDown();
	}

	/**
	 * Construct a service and track it so tearDown can remove its hooks.
	 *
	 * @return PostTypeService
	 */
	private function make_service(): PostTypeService {
		$service          = new PostTypeService();
		$this->services[] = $service;
		return $service;
	}

	/**
	 * Register the post type, as a page load would.
	 *
	 * @return void
	 */
	private function register_cpt(): void {
		$this->make_service()->register();
	}

	/**
	 * Create a published top-level page at /services/.
	 *
	 * @return int
	 */
	private function create_services_page(): int {
		return self::factory()->post->create(
			array(
				'post_type'   => 'page',
				'post_status' => 'publish',
				'post_title'  => 'Services',
				'post_name'   => 'services',
			)
		);
	}

	/**
	 * With no conflicting content, the post type keeps the default "services" slug.
	 *
	 * @return void
	 */
	public function test_uses_default_slug_when_services_path_is_free(): void {
		$this->register_cpt();

		$post_type = get_post_type_object( PostTypeService::SERVICE_POST_TYPE );
		$this->assertNotNull( $post_type );
		$this->assertSame( PostTypeService::SERVICE_REWRITE_SLUG, $post_type->rewrite['slug'] );
	}

	/**
	 * When the site already has a page at /services/, the post type steps aside.
	 *
	 * @return void
	 */
	public function test_steps_aside_when_a_services_page_exists(): void {
		$this->create_services_page();
		$this->register_cpt();

		$post_type = get_post_type_object( PostTypeService::SERVICE_POST_TYPE );
		$this->assertSame( PostTypeService::SERVICE_REWRITE_SLUG_NAMESPACED, $post_type->rewrite['slug'] );
		$this->assertFalse( $post_type->rewrite['with_front'], 'with_front must be disabled for the namespaced slug.' );
	}

	/**
	 * A child page that merely shares the "services" slug must not force a step-aside.
	 *
	 * A page at /about/services/ shares the slug but does not occupy the top-level
	 * /services/ path, so the default slug should be kept.
	 *
	 * @return void
	 */
	public function test_child_services_page_does_not_force_step_aside(): void {
		$parent_id = self::factory()->post->create(
			array(
				'post_type'   => 'page',
				'post_status' => 'publish',
				'post_name'   => 'about',
			)
		);
		self::factory()->post->create(
			array(
				'post_type'   => 'page',
				'post_status' => 'publish',
				'post_name'   => 'services',
				'post_parent' => $parent_id,
			)
		);
		$this->register_cpt();

		$post_type = get_post_type_object( PostTypeService::SERVICE_POST_TYPE );
		$this->assertSame( PostTypeService::SERVICE_REWRITE_SLUG, $post_type->rewrite['slug'] );
	}

	/**
	 * The post type must not register /services/* rules when a services page exists.
	 *
	 * This is the regression guard for DEVSUP-154525. A "services" rewrite slug generates
	 * rules that match /services/<child> and route it to the (non-existent) service post,
	 * shadowing the real page's children. Asserting on the generated rules is
	 * deterministic, unlike simulating the front-end request through the test harness.
	 *
	 * @return void
	 */
	public function test_rewrite_rules_do_not_shadow_a_services_page(): void {
		$this->create_services_page();
		$this->register_cpt();

		global $wp_rewrite;
		$rules               = $wp_rewrite->rewrite_rules();
		$has_namespaced_rule = false;
		foreach ( $rules as $regex => $query ) {
			if ( false === strpos( $query, 'nfd_service=' ) ) {
				continue;
			}
			$this->assertStringStartsNotWith(
				'services/',
				$regex,
				"Rewrite rule '{$regex}' shadows the site's /services/ page path."
			);
			if ( 0 === strpos( $regex, 'nfd-services/' ) ) {
				$has_namespaced_rule = true;
			}
		}

		$this->assertTrue(
			$has_namespaced_rule,
			'The service post type should still register working rules under the namespaced base.'
		);
	}

	/**
	 * The flush is gated on the registered slug: it records it, then is a no-op.
	 *
	 * @return void
	 */
	public function test_maybe_flush_rewrite_rules_is_slug_gated(): void {
		$service = $this->make_service();
		$service->register();
		$service->maybe_flush_rewrite_rules();
		$this->assertSame(
			PostTypeService::SERVICE_REWRITE_SLUG,
			get_option( PostTypeService::REWRITE_FLUSHED_OPTION ),
			'The registered slug should be recorded after the first flush.'
		);

		// Second call is a no-op: the registered slug is already current.
		$service->maybe_flush_rewrite_rules();
		$this->assertSame(
			PostTypeService::SERVICE_REWRITE_SLUG,
			get_option( PostTypeService::REWRITE_FLUSHED_OPTION )
		);
	}

	/**
	 * Plain permalinks have no rewrite rules, so the flush is skipped entirely.
	 *
	 * @return void
	 */
	public function test_maybe_flush_rewrite_rules_skips_plain_permalinks(): void {
		global $wp_rewrite;
		$wp_rewrite->set_permalink_structure( '' );

		$service = $this->make_service();
		$service->register();
		$service->maybe_flush_rewrite_rules();

		$this->assertFalse(
			get_option( PostTypeService::REWRITE_FLUSHED_OPTION ),
			'No flush marker should be written when permalinks are plain.'
		);
	}

	/**
	 * Adding then removing a /services/ page steps the slug aside and back.
	 *
	 * @return void
	 */
	public function test_slug_flips_aside_and_back_as_services_page_comes_and_goes(): void {
		// Add a conflicting page: the next registration steps aside.
		$page_id = $this->create_services_page();
		$this->register_cpt();
		$this->assertSame(
			PostTypeService::SERVICE_REWRITE_SLUG_NAMESPACED,
			get_post_type_object( PostTypeService::SERVICE_POST_TYPE )->rewrite['slug']
		);

		// Remove it: the cache is invalidated and the slug returns to the default.
		wp_delete_post( $page_id, true );
		$this->register_cpt();
		$this->assertSame(
			PostTypeService::SERVICE_REWRITE_SLUG,
			get_post_type_object( PostTypeService::SERVICE_POST_TYPE )->rewrite['slug']
		);
	}

	/**
	 * Trashing and restoring a /services/ page invalidates the cached slug.
	 *
	 * @return void
	 */
	public function test_slug_follows_services_page_through_trash_and_restore(): void {
		$page_id = $this->create_services_page();
		$this->register_cpt();
		$this->assertSame(
			PostTypeService::SERVICE_REWRITE_SLUG_NAMESPACED,
			get_post_type_object( PostTypeService::SERVICE_POST_TYPE )->rewrite['slug']
		);

		// Trashed: /services/ is free again, so the default slug returns.
		wp_trash_post( $page_id );
		$this->register_cpt();
		$this->assertSame(
			PostTypeService::SERVICE_REWRITE_SLUG,
			get_post_type_object( PostTypeService::SERVICE_POST_TYPE )->rewrite['slug']
		);

		// Restored: the page occupies /services/ once more, so it steps aside again.
		wp_untrash_post( $page_id );
		wp_update_post(
			array(
				'ID'          => $page_id,
				'post_status' => 'publish',
			)
		);
		$this->register_cpt();
		$this->assertSame(
			PostTypeService::SERVICE_REWRITE_SLUG_NAMESPACED,
			get_post_type_object( PostTypeService::SERVICE_POST_TYPE )->rewrite['slug']
		);
	}
}
