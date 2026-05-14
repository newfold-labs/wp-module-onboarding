<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Data\Plugins;

/**
 * Data Plugins wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Data\Plugins
 */
class PluginsWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

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

	public function test_get_init_includes_default_plugin_slugs() {
		$slugs = array_column( Plugins::get_init(), 'slug' );
		foreach ( array( 'jetpack', 'wordpress-seo', 'wpforms-lite', 'icon-block' ) as $expected ) {
			$this->assertContains( $expected, $slugs );
		}
	}

	public function test_get_ecommerce_plugins_returns_array() {
		$plugins = Plugins::get_ecommerce_plugins();
		$this->assertIsArray( $plugins );
		foreach ( $plugins as $plugin ) {
			$this->assertArrayHasKey( 'slug', $plugin );
		}
	}

	public function test_wc_prevent_redirect_on_activation_clears_transient() {
		\set_transient( '_wc_activation_redirect', '1', 60 );
		Plugins::wc_prevent_redirect_on_activation();
		$this->assertFalse( \get_transient( '_wc_activation_redirect' ) );
	}
}
