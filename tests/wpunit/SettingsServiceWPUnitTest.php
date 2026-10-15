<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\Services\SettingsService;

/**
 * SettingsService wpunit tests.
 *
 * The full initialization path edits wp-config.php through WPConfigTransformer,
 * so only the already-initialized short-circuit is exercised here.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Services\SettingsService
 */
class SettingsServiceWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Initialization is skipped once settings_initialized is set.
	 *
	 * @covers ::initialize
	 * @return void
	 */
	public function test_initialize_is_noop_when_already_initialized() {
		update_option( Options::get_option_name( 'settings_initialized' ), true );

		update_option( 'comments_per_page', 7 );

		SettingsService::initialize();

		$this->assertSame( 7, (int) get_option( 'comments_per_page' ) );
		$this->assertFalse( get_option( Options::get_option_name( 'start_date' ) ) );
	}
}
