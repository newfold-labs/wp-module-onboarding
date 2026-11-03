<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Services\ThumbnailService;

/**
 * ThumbnailService wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Services\ThumbnailService
 */
class ThumbnailServiceWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Placeholder markup WooCommerce would hand the `woocommerce_placeholder_img` filter.
	 *
	 * @var string
	 */
	private $placeholder_html = '<img src="placeholder.png" class="woocommerce-placeholder" alt="" />';

	/**
	 * Service under test. One instance per test; its constructor registers the WC filters.
	 *
	 * @var ThumbnailService
	 */
	private $service;

	/**
	 * Set up lifecycle hook.
	 *
	 * @return void
	 */
	public function setUp(): void {
		parent::setUp();
		$this->service = new ThumbnailService();
	}

	/**
	 * Tear down lifecycle hook. Unhook the filter the constructor registered so one test's
	 * instance does not bleed a bound callback into the next.
	 *
	 * @return void
	 */
	public function tearDown(): void {
		$callback = array( $this->service, 'maybe_replace_wc_placeholder_img' );
		$priority = \has_filter( 'woocommerce_placeholder_img', $callback );
		if ( false !== $priority ) {
			\remove_filter( 'woocommerce_placeholder_img', $callback, $priority );
		}
		unset( $GLOBALS['product'] );
		parent::tearDown();
	}

	/**
	 * WooCommerce's `wc_placeholder_img()` forwards whatever `$size` it was called with to the
	 * `woocommerce_placeholder_img` filter, and the order-email path calls it with a `[ width, height ]`
	 * array. A `string` type hint on `$size` made that a fatal `TypeError`, crashing checkout for any
	 * order containing an image-less product (PRESS0-5263). The filter callback must accept an array size.
	 *
	 * @covers ::maybe_replace_wc_placeholder_img
	 * @return void
	 */
	public function test_accepts_array_size_without_fatal() {
		$result = $this->service->maybe_replace_wc_placeholder_img(
			$this->placeholder_html,
			array( 300, 300 ),
			array(
				'width'  => 300,
				'height' => 300,
			)
		);

		// With no product in context the callback is a pass-through: the point is that the array
		// size no longer fatals before we get here.
		$this->assertSame( $this->placeholder_html, $result );
	}

	/**
	 * The original string-size path must keep working unchanged.
	 *
	 * @covers ::maybe_replace_wc_placeholder_img
	 * @return void
	 */
	public function test_accepts_string_size_without_fatal() {
		$result = $this->service->maybe_replace_wc_placeholder_img(
			$this->placeholder_html,
			'woocommerce_thumbnail',
			array(
				'width'  => 300,
				'height' => 300,
			)
		);

		$this->assertSame( $this->placeholder_html, $result );
	}

	/**
	 * Exercises the filter exactly as WordPress would, end to end: a callback registered with a
	 * `string` type hint fatals when `apply_filters` passes an array, so this proves the wiring, not
	 * just a direct call.
	 *
	 * @covers ::maybe_replace_wc_placeholder_img
	 * @return void
	 */
	public function test_filter_invocation_with_array_size_returns_html() {
		// Prove our specific callback is on the hook; otherwise the pass-through assertion below
		// would pass even against an unregistered filter (or some other plugin's callback) and
		// prove nothing about our wiring.
		$this->assertNotFalse(
			\has_filter( 'woocommerce_placeholder_img', array( $this->service, 'maybe_replace_wc_placeholder_img' ) )
		);

		$result = \apply_filters(
			'woocommerce_placeholder_img',
			$this->placeholder_html,
			array( 300, 300 ),
			array(
				'width'  => 300,
				'height' => 300,
			)
		);

		$this->assertSame( $this->placeholder_html, $result );
	}
}
