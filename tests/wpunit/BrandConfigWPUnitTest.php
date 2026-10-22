<?php

use NewfoldLabs\WP\Module\Onboarding\Data\BrandConfig;
use NewfoldLabs\WP\Module\Onboarding\Data\Brands;
use NewfoldLabs\WP\Module\Onboarding\ModuleController;

/**
 * BrandConfig wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Data\BrandConfig
 */
class BrandConfigWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Known brands include bluehost and hostgator-us.
	 */
	public function test_is_known_brand_accepts_configured_brands() {
		$this->assertTrue( BrandConfig::is_known_brand( 'bluehost' ) );
		$this->assertTrue( BrandConfig::is_known_brand( 'hostgator-us' ) );
		$this->assertFalse( BrandConfig::is_known_brand( 'not-a-real-brand' ) );
	}

	/**
	 * Dashboard redirect params include onboarding referrer.
	 */
	public function test_get_dashboard_redirect_params_includes_referrer() {
		$params = BrandConfig::get_dashboard_redirect_params();
		$this->assertIsArray( $params );
		$this->assertSame( 'nfd-onboarding', $params['referrer'] );
	}

	/**
	 * Plugin dashboard page is an admin URL.
	 */
	public function test_get_plugin_dashboard_page_contains_admin_php() {
		$page = BrandConfig::get_plugin_dashboard_page();
		$this->assertStringContainsString( 'admin.php', $page );
	}

	/**
	 * Module eligibility uses Brands keys, not a Bluehost-only list.
	 */
	public function test_module_controller_brand_eligibility_matches_brands_registry() {
		$brands = Brands::get_brands();
		foreach ( array_keys( $brands ) as $slug ) {
			$this->assertTrue( ModuleController::is_brand_eligible( $slug ) );
		}
		$this->assertFalse( ModuleController::is_brand_eligible( 'unknown-brand-slug' ) );
	}
}
