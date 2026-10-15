<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\Services\AppService;

/**
 * AppService wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Services\AppService
 */
class AppServiceWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Get the onboarding status option.
	 *
	 * @return mixed
	 */
	private function status() {
		return get_option( Options::get_option_name( 'status' ) );
	}

	/**
	 * First start marks onboarding as started.
	 *
	 * Settings are pre-marked as initialized so wp-config.php is never touched.
	 *
	 * @covers ::start
	 * @return void
	 */
	public function test_start_marks_onboarding_started_on_first_run() {
		update_option( Options::get_option_name( 'settings_initialized' ), true );

		$fired = 0;
		add_action(
			'newfold/onboarding/started',
			function () use ( &$fired ) {
				++$fired;
			}
		);

		AppService::start();

		$this->assertSame( 'started', $this->status() );
		$this->assertSame( 1, $fired );
	}

	/**
	 * Starting again does not re-run initialization.
	 *
	 * @covers ::start
	 * @return void
	 */
	public function test_start_is_noop_when_already_started() {
		update_option( Options::get_option_name( 'status' ), 'started' );

		$fired = 0;
		add_action(
			'newfold/onboarding/started',
			function () use ( &$fired ) {
				++$fired;
			}
		);

		AppService::start();

		$this->assertSame( 'started', $this->status() );
		$this->assertSame( 0, $fired );
		$this->assertFalse( get_option( Options::get_option_name( 'settings_initialized' ) ) );
	}

	/**
	 * Completing marks onboarding completed and fires the completed action.
	 *
	 * Cache purge and survey services come from the module container; failures
	 * there are caught and must not break completion.
	 *
	 * @covers ::complete
	 * @return void
	 */
	public function test_complete_marks_completed_and_swallows_service_errors() {
		update_option( Options::get_option_name( 'status' ), 'started' );

		$fired = 0;
		add_action(
			'newfold/onboarding/completed',
			function () use ( &$fired ) {
				++$fired;
			}
		);

		AppService::complete();

		$this->assertSame( 'completed', $this->status() );
		$this->assertSame( 1, $fired );
	}

	/**
	 * Completing without a started onboarding leaves the status untouched.
	 *
	 * @covers ::complete
	 * @return void
	 */
	public function test_complete_without_started_status_does_not_complete() {
		AppService::complete();

		$this->assertNotSame( 'completed', $this->status() );
	}
}
