<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Data\Brands;

/**
 * Data Brands wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Data\Brands
 */
class BrandsWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Get brands returns expected top level keys.
	 *
	 * @return void
	 */
	public function test_get_brands_returns_expected_top_level_keys() {
		$brands = Brands::get_brands();
		$this->assertIsArray( $brands );
		foreach ( array( 'bluehost', 'bluehost-india', 'webcom', 'crazy-domains', 'hostgator-br', 'hostgator-us' ) as $expected ) {
			$this->assertArrayHasKey( $expected, $brands );
			$this->assertIsArray( $brands[ $expected ] );
			$this->assertSame( $expected, $brands[ $expected ]['brand'] );
			$this->assertArrayHasKey( 'name', $brands[ $expected ] );
		}
	}

	/**
	 * Bluehost brand has expected shape.
	 *
	 * @return void
	 */
	public function test_bluehost_brand_has_expected_shape() {
		$bluehost = Brands::get_brands()['bluehost'];
		$this->assertSame( 'Bluehost', $bluehost['name'] );
		$this->assertArrayHasKey( 'config', $bluehost );
		$this->assertArrayHasKey( 'canMigrateSite', $bluehost['config'] );
		$this->assertArrayHasKey( 'url', $bluehost );
		$this->assertArrayHasKey( 'pluginDashboardPage', $bluehost );
		$this->assertSame( 'nfd-onboarding', $bluehost['dashboardRedirectParams']['referrer'] );
	}

	/**
	 * Get default brand returns bluehost shape with overrides.
	 *
	 * @return void
	 */
	public function test_get_default_brand_returns_bluehost_shape_with_overrides() {
		$default = Brands::get_default_brand();
		$this->assertIsArray( $default );
		$this->assertSame( 'wordpress', $default['brand'] );
		$this->assertSame( 'your web host', $default['name'] );
		// The override merges over the bluehost brand, so unmodified bluehost keys should still be present.
		$this->assertArrayHasKey( 'config', $default );
		$this->assertArrayHasKey( 'dashboardRedirectParams', $default );
	}

	/**
	 * Registry rows only carry fields onboarding reads; plugins own the rest.
	 *
	 * @return void
	 */
	public function test_brand_rows_only_contain_fields_onboarding_reads() {
		$allowed = array( 'brand', 'name', 'url', 'pluginDashboardPage', 'dashboardRedirectParams', 'migrationInfo', 'config' );
		foreach ( Brands::get_brands() as $slug => $row ) {
			$this->assertSame( array(), array_diff( array_keys( $row ), $allowed ), "Unexpected keys on {$slug}" );
			foreach ( array( 'brand', 'name', 'url', 'migrationInfo', 'config' ) as $required ) {
				$this->assertArrayHasKey( $required, $row, "{$slug} missing {$required}" );
			}
			$this->assertSame( array( 'canMigrateSite' ), array_keys( $row['config'] ), "Unexpected config keys on {$slug}" );
		}
	}

	/**
	 * Editor-chat brand data is not owned by the registry anymore.
	 *
	 * @return void
	 */
	public function test_brand_rows_have_no_editor_chat_fields() {
		foreach ( Brands::get_brands() as $row ) {
			foreach ( array( 'accountUrl', 'emailUrl', 'billingUrl', 'editorChatBrandId' ) as $key ) {
				$this->assertArrayNotHasKey( $key, $row );
			}
		}
	}

	/**
	 * Slug normalization for plain and underscored brands.
	 *
	 * @return void
	 */
	public function test_get_brand_slug_for_normalizes_brands() {
		$this->assertSame( 'bluehost', Brands::get_brand_slug_for( 'bluehost' ) );
		$this->assertSame( 'bluehost-india', Brands::get_brand_slug_for( 'Bluehost_India' ) );
		$this->assertSame( 'wordpress', Brands::get_brand_slug_for( '' ) );
		$this->assertSame( 'wordpress', Brands::get_brand_slug_for( null ) );
	}

	/**
	 * HostGator slugs include the lowercased region and match registry rows.
	 *
	 * @return void
	 */
	public function test_get_brand_slug_for_hostgator_appends_region() {
		$this->assertSame( 'hostgator-us', Brands::get_brand_slug_for( 'HostGator', 'US' ) );
		$this->assertSame( 'hostgator-br', Brands::get_brand_slug_for( 'hostgator', 'BR' ) );
		$brands = Brands::get_brands();
		$this->assertArrayHasKey( Brands::get_brand_slug_for( 'HostGator', 'US' ), $brands );
		$this->assertArrayHasKey( Brands::get_brand_slug_for( 'HostGator', 'BR' ), $brands );
	}

	/**
	 * set_current_brand uses the plugin brand/region and does not redefine the constant.
	 *
	 * @return void
	 */
	public function test_set_current_brand_is_noop_when_constant_defined() {
		$container = new class() {
			public function plugin() {
				return (object) array(
					'brand'  => 'HostGator',
					'region' => 'BR',
				);
			}
		};

		$this->assertTrue( defined( 'NFD_ONBOARDING_PLUGIN_BRAND' ) );
		$before = NFD_ONBOARDING_PLUGIN_BRAND;
		$this->assertNull( Brands::set_current_brand( $container ) );
		$this->assertSame( $before, NFD_ONBOARDING_PLUGIN_BRAND );
	}
}
