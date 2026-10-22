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
	 * Known brands are every key in the Brands registry.
	 */
	public function test_is_known_brand_accepts_configured_brands() {
		$brand_slugs = array_keys( Brands::get_brands() );
		$this->assertNotEmpty( $brand_slugs );
		foreach ( $brand_slugs as $slug ) {
			$this->assertTrue( BrandConfig::is_known_brand( $slug ) );
		}
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

	/**
	 * Editor-chat JS brand payload includes expected keys.
	 */
	public function test_get_brand_for_editor_chat_js_has_expected_keys() {
		$brand = BrandConfig::get_brand_for_editor_chat_js();
		$this->assertArrayHasKey( 'id', $brand );
		$this->assertArrayHasKey( 'name', $brand );
		$this->assertArrayHasKey( 'accountUrl', $brand );
		$this->assertArrayHasKey( 'emailUrl', $brand );
		$this->assertArrayHasKey( 'billingUrl', $brand );
		$this->assertArrayHasKey( 'adminUrl', $brand );
	}

	/**
	 * Editor-chat worker brand id is a non-empty string for bluehost.
	 */
	public function test_get_editor_chat_brand_id_returns_string() {
		$id = BrandConfig::get_editor_chat_brand_id();
		$this->assertIsString( $id );
		$this->assertNotSame( '', $id );
		$this->assertSame( 'bluehost', $id );
	}
}
