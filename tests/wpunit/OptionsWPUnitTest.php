<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;

/**
 * Data Options wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Data\Options
 */
class OptionsWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Get option name with prefix.
	 *
	 * @return void
	 */
	public function test_get_option_name_with_prefix() {
		$this->assertSame( 'nfd_module_onboarding_flow', Options::get_option_name( 'flow' ) );
		$this->assertSame( 'nfd_module_onboarding_status', Options::get_option_name( 'status' ) );
	}

	/**
	 * Get option name without prefix.
	 *
	 * @return void
	 */
	public function test_get_option_name_without_prefix() {
		$this->assertSame( 'flow', Options::get_option_name( 'flow', false ) );
		$this->assertSame( 'blogname', Options::get_option_name( 'blog_name', false ) );
	}

	/**
	 * Get option name returns false for unknown key.
	 *
	 * @return void
	 */
	public function test_get_option_name_returns_false_for_unknown_key() {
		$this->assertFalse( Options::get_option_name( 'does_not_exist' ) );
	}

	/**
	 * Get all options returns array with known keys.
	 *
	 * @return void
	 */
	public function test_get_all_options_returns_array_with_known_keys() {
		$options = Options::get_all_options();
		$this->assertIsArray( $options );
		$this->assertArrayHasKey( 'flow', $options );
		$this->assertArrayHasKey( 'status', $options );
		$this->assertArrayHasKey( 'site_info', $options );
	}

	/**
	 * Get initialization options returns expected defaults.
	 *
	 * @return void
	 */
	public function test_get_initialization_options_returns_expected_defaults() {
		$init = Options::get_initialization_options();
		$this->assertIsArray( $init );
		$this->assertSame( 1, $init['close_comments_for_old_posts'] );
		$this->assertSame( 28, $init['close_comments_days_old'] );
		$this->assertSame( '/%postname%/', $init['permalink_structure'] );
	}

	/**
	 * Get wc settings options returns expected keys.
	 *
	 * @return void
	 */
	public function test_get_wc_settings_options_returns_expected_keys() {
		$wc = Options::get_wc_settings_options();
		$this->assertIsArray( $wc );
		foreach ( array( 'wc_currency', 'wc_default_country', 'wc_email', 'wc_calc_taxes', 'wc_no_sales_tax' ) as $key ) {
			$this->assertArrayHasKey( $key, $wc );
			$this->assertArrayHasKey( 'show_in_rest', $wc[ $key ] );
			$this->assertTrue( $wc[ $key ]['show_in_rest'] );
		}
		$this->assertSame( 'boolean', $wc['wc_no_sales_tax']['type'] );
	}

	/**
	 * Get origin option name.
	 *
	 * @return void
	 */
	public function test_get_origin_option_name() {
		$this->assertSame( 'nfd_origin_prompt', Options::get_origin_option_name( 'origin_prompt' ) );
		$this->assertSame( 'nfd_origin_prompt_completed', Options::get_origin_option_name( 'origin_prompt_completed' ) );
	}

	/**
	 * Get origin option name returns false for unknown key.
	 *
	 * @return void
	 */
	public function test_get_origin_option_name_returns_false_for_unknown_key() {
		$this->assertFalse( Options::get_origin_option_name( 'does_not_exist' ) );
	}
}
