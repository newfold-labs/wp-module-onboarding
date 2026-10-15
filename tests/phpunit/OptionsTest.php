<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use PHPUnit\Framework\TestCase;

/**
 * PHPUnit tests for the WordPress-free parts of Data\Options.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Data\Options
 */
class OptionsTest extends TestCase {

	/**
	 * Names are prefixed by default and unprefixed on request.
	 *
	 * @covers ::get_option_name
	 * @return void
	 */
	public function test_get_option_name_prefix_handling() {
		$this->assertSame( 'nfd_module_onboarding_status', Options::get_option_name( 'status' ) );
		$this->assertSame( 'status', Options::get_option_name( 'status', false ) );
		$this->assertSame( 'blogname', Options::get_option_name( 'blog_name', false ) );
	}

	/**
	 * Unknown keys return false.
	 *
	 * @covers ::get_option_name
	 * @return void
	 */
	public function test_get_option_name_unknown_key_returns_false() {
		$this->assertFalse( Options::get_option_name( 'does_not_exist' ) );
		$this->assertFalse( Options::get_option_name( 'does_not_exist', false ) );
	}

	/**
	 * Origin option names use their own prefix.
	 *
	 * @covers ::get_origin_option_name
	 * @return void
	 */
	public function test_get_origin_option_name() {
		$this->assertSame( 'nfd_origin_prompt', Options::get_origin_option_name( 'origin_prompt' ) );
		$this->assertSame( '', Options::get_origin_option_name( 'does_not_exist' ) );
	}

	/**
	 * Options used by the services exist in the registry.
	 *
	 * @covers ::get_all_options
	 * @return void
	 */
	public function test_service_options_are_registered() {
		$options = Options::get_all_options();

		foreach ( array(
			'status',
			'start_time',
			'completed_time',
			'site_info',
			'settings_initialized',
			'sitegen_site_id',
			'sitegen_current_id',
			'sitegen_site_type',
			'sitegen_enhanced_prompt',
			'sitegen_discovery_data',
		) as $key ) {
			$this->assertArrayHasKey( $key, $options, "Option {$key} should be registered." );
		}
	}

	/**
	 * Every registered option maps to a non-empty string name.
	 *
	 * @covers ::get_all_options
	 * @return void
	 */
	public function test_option_names_are_strings() {
		foreach ( Options::get_all_options() as $key => $name ) {
			$this->assertIsString( $name, "Option {$key} should map to a string name." );
			$this->assertNotSame( '', $name, "Option {$key} should not map to an empty name." );
		}
	}

	/**
	 * Initialization option defaults.
	 *
	 * @covers ::get_initialization_options
	 * @return void
	 */
	public function test_get_initialization_options() {
		$init = Options::get_initialization_options();

		$this->assertSame( 1, $init['close_comments_for_old_posts'] );
		$this->assertSame( 28, $init['close_comments_days_old'] );
		$this->assertSame( '/%postname%/', $init['permalink_structure'] );
	}
}
