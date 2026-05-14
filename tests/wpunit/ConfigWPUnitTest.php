<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Data\Config;

/**
 * Data Config wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Data\Config
 */
class ConfigWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Get wp config initialization constants.
	 *
	 * @return void
	 */
	public function test_get_wp_config_initialization_constants() {
		$constants = Config::get_wp_config_initialization_constants();
		$this->assertIsArray( $constants );
		$this->assertSame( '300', $constants['AUTOSAVE_INTERVAL'] );
		$this->assertSame( '20', $constants['WP_POST_REVISIONS'] );
		$this->assertSame( '7', $constants['EMPTY_TRASH_DAYS'] );
		$this->assertSame( 'true', $constants['WP_AUTO_UPDATE_CORE'] );
		$this->assertSame( '120', $constants['WP_CRON_LOCK_TIMEOUT'] );
	}

	/**
	 * Is onboarding request true for onboarding url.
	 *
	 * @return void
	 */
	public function test_is_onboarding_request_true_for_onboarding_url() {
		$url = \home_url( '/wp-admin/admin.php?page=nfd-onboarding' );
		$this->assertTrue( Config::is_onboarding_request( $url ) );
	}

	/**
	 * Is onboarding request false for non onboarding url.
	 *
	 * @return void
	 */
	public function test_is_onboarding_request_false_for_non_onboarding_url() {
		$url = \home_url( '/wp-admin/index.php?page=other' );
		$this->assertFalse( Config::is_onboarding_request( $url ) );
	}

	/**
	 * Is onboarding request false for foreign host.
	 *
	 * @return void
	 */
	public function test_is_onboarding_request_false_for_foreign_host() {
		$this->assertFalse( Config::is_onboarding_request( 'https://example.com/wp-admin/admin.php?page=nfd-onboarding' ) );
	}

	/**
	 * Is onboarding request false for empty query.
	 *
	 * @return void
	 */
	public function test_is_onboarding_request_false_for_empty_query() {
		$url = \home_url( '/wp-admin/admin.php' );
		$this->assertFalse( Config::is_onboarding_request( $url ) );
	}
}
