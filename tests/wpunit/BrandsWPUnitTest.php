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
		$this->assertArrayHasKey( 'enabled_flows', $bluehost['config'] );
		$this->assertArrayHasKey( 'phoneNumbers', $bluehost );
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
		$this->assertArrayHasKey( 'phoneNumbers', $default );
	}
}
