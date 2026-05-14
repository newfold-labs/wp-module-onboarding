<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Data\Bluehost;

/**
 * Data Bluehost wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Data\Bluehost
 */
class BluehostDataWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	public function test_get_brands_returns_known_brands() {
		$this->assertSame( array( 'bluehost', 'bluehost-india' ), Bluehost::get_brands() );
	}

	public function test_get_dashboard_redirect_params() {
		$this->assertSame( array( 'referrer' => 'nfd-onboarding' ), Bluehost::get_dashboard_redirect_params() );
	}

	public function test_get_plugin_dashboard_page_contains_admin_php() {
		$page = Bluehost::get_plugin_dashboard_page();
		$this->assertIsString( $page );
		$this->assertStringContainsString( 'admin.php?page=bluehost', $page );
	}

	public function test_get_data_aggregates_all_keys() {
		$data = Bluehost::get_data();
		$this->assertIsArray( $data );
		$this->assertArrayHasKey( 'pluginDashboardPage', $data );
		$this->assertArrayHasKey( 'dashboardRedirectParams', $data );
		$this->assertArrayHasKey( 'brands', $data );
		$this->assertSame( Bluehost::get_brands(), $data['brands'] );
	}

	public function test_get_current_brand_defaults_to_bluehost_when_constant_missing() {
		if ( defined( 'NFD_ONBOARDING_BLUEHOST_BRAND' ) ) {
			$this->markTestSkipped( 'NFD_ONBOARDING_BLUEHOST_BRAND already defined; cannot exercise default path.' );
		}
		$this->assertSame( 'bluehost', Bluehost::get_current_brand() );
	}
}
