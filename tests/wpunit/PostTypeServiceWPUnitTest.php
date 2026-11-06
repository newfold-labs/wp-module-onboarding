<?php
/**
 * Tests for the post type service.
 *
 * @package NewfoldLabs\WP\Module\Onboarding
 */

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Services\PostTypeService;
use NewfoldLabs\WP\Module\Onboarding\Services\SiteTypes\CommonSiteTypeService;

/**
 * PostTypeService wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Services\PostTypeService
 */
class PostTypeServiceWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Backup of WP_Rewrite::$extra_rules_top. Core appends permastruct rules to it on
	 * every regeneration and never removes them, so restore it between tests.
	 *
	 * @var array
	 */
	private $extra_rules_top_backup = array();

	/**
	 * Set up: post-name permalinks, a Services page with a child, and a clean option.
	 *
	 * @return void
	 */
	public function setUp(): void {
		parent::setUp();

		$this->extra_rules_top_backup = $GLOBALS['wp_rewrite']->extra_rules_top;

		// Instantiating attaches the option hooks under test.
		new PostTypeService();

		delete_option( PostTypeService::get_services_option_name() );
		if ( post_type_exists( PostTypeService::SERVICE_POST_TYPE ) ) {
			unregister_post_type( PostTypeService::SERVICE_POST_TYPE );
		}

		$this->set_permalink_structure( '/%postname%/' );
	}

	/**
	 * Tear down: leave the post type unregistered for other tests.
	 *
	 * @return void
	 */
	public function tearDown(): void {
		if ( post_type_exists( PostTypeService::SERVICE_POST_TYPE ) ) {
			unregister_post_type( PostTypeService::SERVICE_POST_TYPE );
		}
		$GLOBALS['wp_rewrite']->extra_rules_top = $this->extra_rules_top_backup;
		parent::tearDown();
	}

	/**
	 * Create a "services" page with a child page.
	 *
	 * @return int Child page ID.
	 */
	private function create_services_child_page(): int {
		$parent = self::factory()->post->create(
			array(
				'post_type'  => 'page',
				'post_name'  => 'services',
				'post_title' => 'Services',
			)
		);

		return self::factory()->post->create(
			array(
				'post_type'   => 'page',
				'post_name'   => 'certification-and-courses',
				'post_title'  => 'Certification and Courses',
				'post_parent' => $parent,
			)
		);
	}

	/**
	 * Whether WP_Rewrite holds a permastruct for the service post type.
	 *
	 * This is what the next rule regeneration builds the `/services/` rules from.
	 *
	 * @return bool
	 */
	private function has_service_permastruct(): bool {
		global $wp_rewrite;
		return isset( $wp_rewrite->extra_permastructs[ PostTypeService::SERVICE_POST_TYPE ] );
	}

	/**
	 * Seed non-empty stored rewrite rules so a flush is observable.
	 *
	 * @return void
	 */
	private function seed_rewrite_rules(): void {
		update_option( 'rewrite_rules', array( 'stale/?$' => 'index.php' ) );
	}

	/**
	 * Post type is not registered when the option is missing.
	 *
	 * @covers ::register
	 * @return void
	 */
	public function test_not_registered_when_option_missing() {
		( new PostTypeService() )->register();

		$this->assertFalse( PostTypeService::is_services_enabled() );
		$this->assertFalse( post_type_exists( PostTypeService::SERVICE_POST_TYPE ) );
	}

	/**
	 * Post type is registered when the option is true.
	 *
	 * @covers ::register
	 * @return void
	 */
	public function test_registered_when_option_true() {
		update_option( PostTypeService::get_services_option_name(), '1' );
		unregister_post_type( PostTypeService::SERVICE_POST_TYPE );

		( new PostTypeService() )->register();

		$this->assertTrue( post_type_exists( PostTypeService::SERVICE_POST_TYPE ) );
	}

	/**
	 * Child pages under /services/ resolve when the post type is disabled (DEVSUP-154525).
	 *
	 * @covers ::register
	 * @return void
	 */
	public function test_services_child_page_resolves_when_disabled() {
		$child_id = $this->create_services_child_page();
		flush_rewrite_rules( false );

		$this->go_to( get_permalink( $child_id ) );

		$this->assertFalse( is_404() );
		$this->assertSame( $child_id, get_queried_object()->ID );
	}

	/**
	 * With the post type enabled, a child page of the site's Services page still resolves
	 * because the page wins when no service has that slug.
	 *
	 * @covers ::yield_to_page
	 * @return void
	 */
	public function test_services_child_page_resolves_when_enabled() {
		$child_id = $this->create_services_child_page();
		PostTypeService::set_services_enabled( true );

		$this->go_to( get_permalink( $child_id ) );

		$this->assertFalse( is_404() );
		$this->assertTrue( is_page() );
		$this->assertSame( $child_id, get_queried_object()->ID );
	}

	/**
	 * A published service with the same slug as a child page keeps its URL.
	 *
	 * @covers ::yield_to_page
	 * @return void
	 */
	public function test_service_wins_over_page_with_same_slug() {
		$child_id = $this->create_services_child_page();
		PostTypeService::set_services_enabled( true );
		$service_id = self::factory()->post->create(
			array(
				'post_type'  => PostTypeService::SERVICE_POST_TYPE,
				'post_name'  => 'certification-and-courses',
				'post_title' => 'Certification service',
			)
		);

		$this->go_to( get_permalink( $service_id ) );

		$this->assertFalse( is_404() );
		$this->assertSame( $service_id, get_queried_object()->ID );
		$this->assertNotSame( $child_id, get_queried_object()->ID );
	}

	/**
	 * A draft service does not block a page at the same path.
	 *
	 * @covers ::yield_to_page
	 * @return void
	 */
	public function test_draft_service_does_not_block_page() {
		$child_id = $this->create_services_child_page();
		PostTypeService::set_services_enabled( true );
		self::factory()->post->create(
			array(
				'post_type'   => PostTypeService::SERVICE_POST_TYPE,
				'post_status' => 'draft',
				'post_name'   => 'certification-and-courses',
			)
		);

		$this->go_to( get_permalink( $child_id ) );

		$this->assertFalse( is_404() );
		$this->assertSame( $child_id, get_queried_object()->ID );
	}

	/**
	 * With no service and no page at the path, the request still 404s.
	 *
	 * @covers ::yield_to_page
	 * @return void
	 */
	public function test_unknown_services_path_404s() {
		$this->create_services_child_page();
		PostTypeService::set_services_enabled( true );

		$this->go_to( home_url( '/services/does-not-exist/' ) );

		$this->assertTrue( is_404() );
	}

	/**
	 * The filter can keep the post type unregistered even when the option is on.
	 *
	 * @covers ::should_register_service_post_type
	 * @covers ::register
	 * @return void
	 */
	public function test_register_filter_can_disable_post_type() {
		update_option( PostTypeService::get_services_option_name(), '1' );
		add_filter( 'newfold/onboarding/filter/registerServicePostType', '__return_false' );

		( new PostTypeService() )->register();

		$this->assertFalse( post_type_exists( PostTypeService::SERVICE_POST_TYPE ) );
	}

	/**
	 * The filter can force the post type on when the option is off.
	 *
	 * @covers ::should_register_service_post_type
	 * @return void
	 */
	public function test_register_filter_can_enable_post_type() {
		add_filter( 'newfold/onboarding/filter/registerServicePostType', '__return_true' );

		( new PostTypeService() )->register();

		$this->assertTrue( post_type_exists( PostTypeService::SERVICE_POST_TYPE ) );
	}

	/**
	 * The default rewrite slug is `services`.
	 *
	 * @covers ::get_rewrite_slug
	 * @return void
	 */
	public function test_default_rewrite_slug() {
		PostTypeService::set_services_enabled( true );

		$this->assertSame( 'services', PostTypeService::get_rewrite_slug() );
		$this->assertSame( 'services', get_post_type_object( PostTypeService::SERVICE_POST_TYPE )->rewrite['slug'] );
	}

	/**
	 * The slug filter changes the URL base, and bad values fall back to the default.
	 *
	 * @covers ::get_rewrite_slug
	 * @return void
	 */
	public function test_rewrite_slug_filter() {
		add_filter(
			'newfold/onboarding/filter/serviceRewriteSlug',
			function () {
				return 'Our Services/';
			}
		);
		$this->assertSame( 'our-services', PostTypeService::get_rewrite_slug() );

		remove_all_filters( 'newfold/onboarding/filter/serviceRewriteSlug' );
		add_filter( 'newfold/onboarding/filter/serviceRewriteSlug', '__return_empty_string' );
		$this->assertSame( 'services', PostTypeService::get_rewrite_slug() );

		remove_all_filters( 'newfold/onboarding/filter/serviceRewriteSlug' );
		add_filter( 'newfold/onboarding/filter/serviceRewriteSlug', '__return_false' );
		$this->assertSame( 'services', PostTypeService::get_rewrite_slug() );
	}

	/**
	 * A filtered slug is used when the post type is registered and pages are untouched.
	 *
	 * @covers ::get_rewrite_slug
	 * @covers ::register
	 * @return void
	 */
	public function test_registered_with_filtered_slug() {
		add_filter(
			'newfold/onboarding/filter/serviceRewriteSlug',
			function () {
				return 'nfd-services';
			}
		);
		$child_id = $this->create_services_child_page();
		PostTypeService::set_services_enabled( true );
		flush_rewrite_rules( false );

		$this->assertSame( 'nfd-services', get_post_type_object( PostTypeService::SERVICE_POST_TYPE )->rewrite['slug'] );

		$this->go_to( get_permalink( $child_id ) );
		$this->assertSame( $child_id, get_queried_object()->ID );
	}

	/**
	 * Enabling registers the post type and clears stored rewrite rules.
	 *
	 * @covers ::set_services_enabled
	 * @covers ::sync_service_post_type
	 * @return void
	 */
	public function test_enabling_registers_and_flushes_rewrite_rules() {
		$this->seed_rewrite_rules();

		PostTypeService::set_services_enabled( true );

		$this->assertTrue( post_type_exists( PostTypeService::SERVICE_POST_TYPE ) );
		$this->assertTrue( $this->has_service_permastruct() );
		$this->assertEmpty( get_option( 'rewrite_rules' ) );
	}

	/**
	 * Disabling unregisters the post type and clears stored rewrite rules.
	 *
	 * @covers ::set_services_enabled
	 * @covers ::sync_service_post_type
	 * @return void
	 */
	public function test_disabling_unregisters_and_flushes_rewrite_rules() {
		PostTypeService::set_services_enabled( true );
		$this->seed_rewrite_rules();

		PostTypeService::set_services_enabled( false );

		$this->assertFalse( post_type_exists( PostTypeService::SERVICE_POST_TYPE ) );
		$this->assertFalse( $this->has_service_permastruct() );
		$this->assertEmpty( get_option( 'rewrite_rules' ) );
	}

	/**
	 * Re-saving the same value does not flush rewrite rules.
	 *
	 * @covers ::set_services_enabled
	 * @return void
	 */
	public function test_unchanged_value_does_not_flush() {
		PostTypeService::set_services_enabled( false );
		$this->seed_rewrite_rules();

		PostTypeService::set_services_enabled( false );

		$this->assertNotEmpty( get_option( 'rewrite_rules' ) );
	}

	/**
	 * Deleting the option behaves like disabling.
	 *
	 * @covers ::handle_services_option_deleted
	 * @return void
	 */
	public function test_deleting_option_unregisters() {
		PostTypeService::set_services_enabled( true );
		$this->seed_rewrite_rules();

		delete_option( PostTypeService::get_services_option_name() );

		$this->assertFalse( post_type_exists( PostTypeService::SERVICE_POST_TYPE ) );
		$this->assertEmpty( get_option( 'rewrite_rules' ) );
	}

	/**
	 * The option is stored with autoload on.
	 *
	 * @covers ::set_services_enabled
	 * @return void
	 */
	public function test_option_is_autoloaded() {
		global $wpdb;

		PostTypeService::set_services_enabled( false );

		$autoload = $wpdb->get_var(
			$wpdb->prepare(
				"SELECT autoload FROM {$wpdb->options} WHERE option_name = %s",
				PostTypeService::get_services_option_name()
			)
		);
		$this->assertContains( $autoload, array( 'yes', 'on' ) );
	}

	/**
	 * Existing service posts are detected even when the post type is unregistered.
	 *
	 * @covers ::has_service_posts
	 * @return void
	 */
	public function test_has_service_posts_without_registration() {
		$this->assertFalse( PostTypeService::has_service_posts() );

		self::factory()->post->create( array( 'post_type' => PostTypeService::SERVICE_POST_TYPE ) );

		$this->assertTrue( PostTypeService::has_service_posts() );
	}

	/**
	 * The 4.0.11 upgrade routine disables the post type when no services exist.
	 *
	 * @return void
	 */
	public function test_upgrade_routine_disables_without_services() {
		require dirname( __DIR__, 2 ) . '/upgrades/4.0.11.php';

		$this->assertSame( '0', get_option( PostTypeService::get_services_option_name() ) );
		$this->assertFalse( PostTypeService::is_services_enabled() );
	}

	/**
	 * The 4.0.11 upgrade routine enables the post type when services exist.
	 *
	 * @return void
	 */
	public function test_upgrade_routine_enables_with_existing_services() {
		self::factory()->post->create( array( 'post_type' => PostTypeService::SERVICE_POST_TYPE ) );

		require dirname( __DIR__, 2 ) . '/upgrades/4.0.11.php';

		$this->assertTrue( PostTypeService::is_services_enabled() );
		$this->assertTrue( post_type_exists( PostTypeService::SERVICE_POST_TYPE ) );
	}

	/**
	 * The 4.0.11 upgrade routine leaves an existing option untouched.
	 *
	 * @return void
	 */
	public function test_upgrade_routine_respects_existing_option() {
		PostTypeService::set_services_enabled( true );

		require dirname( __DIR__, 2 ) . '/upgrades/4.0.11.php';

		$this->assertTrue( PostTypeService::is_services_enabled() );
	}

	/**
	 * Publishing services enables the post type and creates the posts with meta.
	 *
	 * @covers \NewfoldLabs\WP\Module\Onboarding\Services\SiteTypes\CommonSiteTypeService::publish_services
	 * @return void
	 */
	public function test_publish_services_enables_and_creates_posts() {
		$ids = CommonSiteTypeService::publish_services(
			array(
				array(
					'title'          => 'Personal Training',
					'excerpt'        => 'One-on-one sessions.',
					'content'        => '<!-- wp:paragraph --><p>Train.</p><!-- /wp:paragraph -->',
					'featured_image' => 'https://example.com/pt.jpg',
				),
				array(
					'title'   => 'Group Classes',
					'content' => '<!-- wp:paragraph --><p>Group.</p><!-- /wp:paragraph -->',
				),
			)
		);

		$this->assertCount( 2, $ids );
		$this->assertTrue( PostTypeService::is_services_enabled() );
		$this->assertSame( PostTypeService::SERVICE_POST_TYPE, get_post_type( $ids[0] ) );
		$this->assertSame( 'publish', get_post_status( $ids[0] ) );
		$this->assertSame( '1', get_post_meta( $ids[0], PostTypeService::META_ONBOARDING_GENERATED, true ) );
		$this->assertSame( 'https://example.com/pt.jpg', get_post_meta( $ids[0], PostTypeService::META_IMAGE_URL, true ) );
		$this->assertSame( '', get_post_meta( $ids[1], PostTypeService::META_IMAGE_URL, true ) );
	}

	/**
	 * Publishing an empty list does not enable the post type.
	 *
	 * @covers \NewfoldLabs\WP\Module\Onboarding\Services\SiteTypes\CommonSiteTypeService::publish_services
	 * @return void
	 */
	public function test_publish_no_services_leaves_disabled() {
		$this->assertSame( array(), CommonSiteTypeService::publish_services( array() ) );
		$this->assertFalse( PostTypeService::is_services_enabled() );
	}
}
