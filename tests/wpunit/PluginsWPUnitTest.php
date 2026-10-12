<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Data\Plugins;

/**
 * Data Plugins wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Data\Plugins
 */
class PluginsWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Get init returns default plugins when no capabilities.
	 *
	 * @return void
	 */
	public function test_get_init_returns_default_plugins_when_no_capabilities() {
		$init = Plugins::get_init();
		$this->assertIsArray( $init );
		$this->assertNotEmpty( $init );
		foreach ( $init as $plugin ) {
			$this->assertArrayHasKey( 'slug', $plugin );
			$this->assertArrayHasKey( 'activate', $plugin );
			$this->assertArrayHasKey( 'priority', $plugin );
		}
		// Slugs should be unique.
		$slugs = array_column( $init, 'slug' );
		$this->assertSame( count( $slugs ), count( array_unique( $slugs ) ) );
	}

	/**
	 * Get init includes default plugin slugs.
	 *
	 * @return void
	 */
	public function test_get_init_includes_default_plugin_slugs() {
		$slugs = array_column( Plugins::get_init(), 'slug' );
		foreach ( array( 'jetpack', 'wordpress-seo', 'wpforms-lite', 'icon-block' ) as $expected ) {
			$this->assertContains( $expected, $slugs );
		}
	}

	/**
	 * Get ecommerce plugins returns array.
	 *
	 * @return void
	 */
	public function test_get_ecommerce_plugins_returns_array() {
		$plugins = Plugins::get_ecommerce_plugins();
		$this->assertIsArray( $plugins );
		foreach ( $plugins as $plugin ) {
			$this->assertArrayHasKey( 'slug', $plugin );
		}
	}

	/**
	 * Retired YITH extended plugins stay off the install list.
	 *
	 * @return void
	 */
	public function test_init_list_omits_retired_yith_extended_plugins() {
		$property = new \ReflectionProperty( Plugins::class, 'init_list' );
		$property->setAccessible( true );

		$slugs = $this->collect_plugin_slugs( $property->getValue() );

		$retired = array(
			'nfd_slug_yith_woocommerce_booking',
			'nfd_slug_yith_woocommerce_gift_cards',
			'nfd_slug_yith_woocommerce_wishlist',
			'nfd_slug_yith_woocommerce_customize_myaccount_page',
			'nfd_slug_yith_woocommerce_ajax_product_filter',
			'nfd_slug_yith_shippo_shippings_for_woocommerce',
			'nfd_slug_yith_paypal_payments_for_woocommerce',
		);

		foreach ( $retired as $slug ) {
			$this->assertNotContains( $slug, $slugs );
		}

		$this->assertContains( 'yith-woocommerce-ajax-search', $slugs );
		$this->assertContains( 'nfd_slug_wonder_cart', $slugs );
		$this->assertContains( 'woocommerce', $slugs );
	}

	/**
	 * Flatten plugin entries to slugs.
	 *
	 * @param array $plugins Plugin list, possibly nested by capability and brand.
	 * @return array<int, string>
	 */
	private function collect_plugin_slugs( array $plugins ): array {
		$slugs = array();
		$stack = array( $plugins );

		while ( $stack ) {
			$current = array_pop( $stack );
			if ( isset( $current['slug'] ) && is_string( $current['slug'] ) ) {
				$slugs[] = $current['slug'];
				continue;
			}

			foreach ( $current as $item ) {
				if ( is_array( $item ) ) {
					$stack[] = $item;
				}
			}
		}

		return $slugs;
	}

	/**
	 * Wc prevent redirect on activation clears transient.
	 *
	 * @return void
	 */
	public function test_wc_prevent_redirect_on_activation_clears_transient() {
		\set_transient( '_wc_activation_redirect', '1', 60 );
		Plugins::wc_prevent_redirect_on_activation();
		$this->assertFalse( \get_transient( '_wc_activation_redirect' ) );
	}
}
