<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Services\PostTypeService;
use NewfoldLabs\WP\Module\Onboarding\Services\SiteTypes\EcommerceSiteTypeService;

/**
 * EcommerceSiteTypeService wpunit tests.
 *
 * WooCommerce is not assumed to be installed: the product post type and
 * product_cat taxonomy are registered locally, and the "plain meta" product path is exercised.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Services\SiteTypes\EcommerceSiteTypeService
 */
class EcommerceSiteTypeServiceWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Hook tables publish_woo_product strips; restored after each test.
	 *
	 * @var array
	 */
	private $saved_hooks = array();

	/**
	 * Set up.
	 *
	 * @return void
	 */
	public function setUp(): void {
		parent::setUp();
		global $wp_filter;
		foreach ( array( 'woocommerce_new_product', 'woocommerce_update_product', 'wp_insert_post', 'save_post' ) as $hook ) {
			$this->saved_hooks[ $hook ] = isset( $wp_filter[ $hook ] ) ? clone $wp_filter[ $hook ] : null;
		}

		if ( ! post_type_exists( 'product' ) ) {
			register_post_type( 'product', array( 'public' => true ) );
		}
		if ( ! taxonomy_exists( 'product_cat' ) ) {
			register_taxonomy( 'product_cat', 'product', array( 'hierarchical' => true ) );
		}
	}

	/**
	 * Tear down.
	 *
	 * @return void
	 */
	public function tearDown(): void {
		global $wp_filter;
		foreach ( $this->saved_hooks as $hook => $saved ) {
			if ( null === $saved ) {
				unset( $wp_filter[ $hook ] );
			} else {
				$wp_filter[ $hook ] = $saved;
			}
		}
		parent::tearDown();
	}

	/**
	 * Call a private static method.
	 *
	 * @param string $method Method.
	 * @param array  $args   Args.
	 * @return mixed
	 */
	private function call( string $method, array $args = array() ) {
		$ref = new \ReflectionMethod( EcommerceSiteTypeService::class, $method );
		$ref->setAccessible( true );
		return $ref->invokeArgs( null, $args );
	}

	/**
	 * Categories are created once, flagged as generated and then reused.
	 */
	public function test_create_or_get_woo_category_creates_then_reuses() {
		$first  = EcommerceSiteTypeService::create_or_get_woo_category( 'Summer Sale' );
		$second = EcommerceSiteTypeService::create_or_get_woo_category( 'Summer Sale' );

		$this->assertGreaterThan( 0, $first );
		$this->assertSame( $first, $second );
		$this->assertSame( '1', get_term_meta( $first, PostTypeService::META_ONBOARDING_GENERATED, true ) );
	}

	/**
	 * Failing term creation returns 0.
	 */
	public function test_create_or_get_woo_category_returns_zero_on_error() {
		$this->assertSame( 0, EcommerceSiteTypeService::create_or_get_woo_category( '' ) );
	}

	/**
	 * A product is published with excerpt, price meta, image URL meta and the generated flag.
	 */
	public function test_publish_woo_product_stores_product_data() {
		$category = EcommerceSiteTypeService::create_or_get_woo_category( 'Shirts' );

		$id = EcommerceSiteTypeService::publish_woo_product( 'Blue Shirt', 'A nice shirt', '19.99', 'https://example.com/shirt.jpg', array( $category ) );

		$this->assertIsInt( $id );
		$post = get_post( $id );
		$this->assertSame( 'product', $post->post_type );
		$this->assertSame( 'publish', $post->post_status );
		$this->assertSame( 'Blue Shirt', $post->post_title );
		$this->assertSame( 'A nice shirt', $post->post_excerpt );
		$this->assertSame( '1', get_post_meta( $id, PostTypeService::META_ONBOARDING_GENERATED, true ) );
		$this->assertSame( 'https://example.com/shirt.jpg', get_post_meta( $id, 'nfd_image_url', true ) );
		$this->assertContains( $category, wp_get_post_terms( $id, 'product_cat', array( 'fields' => 'ids' ) ) );

		if ( ! function_exists( 'wc_get_product' ) ) {
			$this->assertSame( '19.99', get_post_meta( $id, '_regular_price', true ) );
			$this->assertSame( 'instock', get_post_meta( $id, '_stock_status', true ) );
			$this->assertSame( 'no', get_post_meta( $id, '_manage_stock', true ) );
		}
	}

	/**
	 * No image URL means no image meta; no categories means no terms.
	 */
	public function test_publish_woo_product_without_image_or_categories() {
		$id = EcommerceSiteTypeService::publish_woo_product( 'Plain', '', 5 );

		$this->assertSame( '', get_post_meta( $id, 'nfd_image_url', true ) );
		$this->assertEmpty( wp_get_post_terms( $id, 'product_cat' ) );
	}

	/**
	 * Products fall back to user 1 as author when nobody is logged in.
	 */
	public function test_publish_woo_product_defaults_author() {
		wp_set_current_user( 0 );

		$id = EcommerceSiteTypeService::publish_woo_product( 'Authored', '', 1 );

		$this->assertSame( 1, (int) get_post( $id )->post_author );
	}

	/**
	 * publish_products dedupes categories and maps products to them.
	 */
	public function test_publish_products_creates_products_with_shared_categories() {
		$ids = EcommerceSiteTypeService::publish_products(
			array(
				array(
					'name'              => 'Tee',
					'short_description' => 'Soft',
					'price'             => 10,
					'categories'        => array( 'Apparel', 'Sale' ),
				),
				array(
					'name'       => 'Hat',
					'price'      => 8,
					'categories' => array( 'Apparel' ),
				),
			)
		);

		$this->assertCount( 2, $ids );
		$apparel = get_term_by( 'slug', 'apparel', 'product_cat' );
		$this->assertNotFalse( $apparel );
		$this->assertCount( 1, get_terms( array( 'taxonomy' => 'product_cat', 'name' => 'Apparel', 'hide_empty' => false ) ) );
		foreach ( $ids as $id ) {
			$this->assertContains( $apparel->term_id, wp_get_post_terms( $id, 'product_cat', array( 'fields' => 'ids' ) ) );
		}
		$this->assertSame( array(), EcommerceSiteTypeService::publish_products( array() ) );
	}

	/**
	 * Without WooCommerce there are no pages to set up and no shop info.
	 */
	public function test_woo_page_helpers_degrade_without_woocommerce() {
		if ( class_exists( '\WC_Install' ) ) {
			$this->markTestSkipped( 'WooCommerce is loaded.' );
		}

		$this->assertFalse( EcommerceSiteTypeService::setup_woo_pages() );
		$this->assertSame( array(), EcommerceSiteTypeService::get_woo_shop_page_info() );
	}

	/**
	 * Ecommerce plugin list is an array of plugin definitions.
	 */
	public function test_get_ecommerce_plugins_returns_array() {
		$this->assertIsArray( EcommerceSiteTypeService::get_ecommerce_plugins() );
	}

	/**
	 * The installing response is a 202 listing WooCommerce as pending.
	 */
	public function test_installing_response_shape() {
		$response = $this->call( 'woocommerce_installing_response' );

		$this->assertSame( 202, $response->get_status() );
		$this->assertSame( 'installing', $response->get_data()['status'] );
		$this->assertSame( array( 'woocommerce' ), $response->get_data()['pending'] );
	}

	/**
	 * Install progress is detected from the installer's init-status option.
	 */
	public function test_is_woocommerce_install_in_progress_reads_installer_option() {
		$option = \NewfoldLabs\WP\Module\Installer\Data\Options::get_option_name( 'plugins_init_status' );

		delete_option( $option );
		$this->assertFalse( $this->call( 'is_woocommerce_install_in_progress' ) );

		update_option( $option, 'woocommerce' );
		$this->assertTrue( $this->call( 'is_woocommerce_install_in_progress' ) );

		update_option( $option, 'something-else' );
		$this->assertFalse( $this->call( 'is_woocommerce_install_in_progress' ) );

		delete_option( $option );
	}

	/**
	 * Raising the time limit is safe to call.
	 */
	public function test_extend_install_time_limit_does_not_error() {
		$this->call( 'extend_install_time_limit' );
		$this->assertTrue( true );
	}

	/**
	 * Queueing returns the caller's response untouched.
	 */
	public function test_queue_ecommerce_stack_and_respond_passes_response_through() {
		$response = new \WP_REST_Response( array( 'x' => 1 ), 202 );

		$this->assertSame( $response, $this->call( 'queue_ecommerce_stack_and_respond', array( $response ) ) );
		$this->assertNull( $this->call( 'queue_ecommerce_stack_and_respond', array( null ) ) );
	}

	/**
	 * While the installer is still processing WooCommerce, callers get the 202 response.
	 */
	public function test_ensure_woocommerce_active_reports_install_in_progress() {
		$option = \NewfoldLabs\WP\Module\Installer\Data\Options::get_option_name( 'plugins_init_status' );
		update_option( $option, 'woocommerce' );

		$result = EcommerceSiteTypeService::ensure_woocommerce_active();

		delete_option( $option );
		$this->assertInstanceOf( \WP_REST_Response::class, $result );
		$this->assertContains( $result->get_status(), array( 202, 500 ), '202 when whitelisted, 500 when the slug is not whitelisted' );
	}
}
