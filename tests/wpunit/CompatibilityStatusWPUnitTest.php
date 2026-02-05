<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Compatibility\Status;

/**
 * Compatibility Status wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Compatibility\Status
 */
class CompatibilityStatusWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Tear down after each test.
	 *
	 * @return void
	 */
	public function tearDown(): void {
		Status::reset();
		parent::tearDown();
	}

	/**
	 * Default status is unscanned.
	 *
	 * @return void
	 */
	public function test_default_status_constant() {
		$this->assertSame( 'unscanned', Status::$default );
	}

	/**
	 * Get() returns default when no option is set.
	 *
	 * @return void
	 */
	public function test_get_returns_default_when_unset() {
		Status::reset();
		$this->assertSame( 'unscanned', Status::get() );
	}

	/**
	 * Get('all') returns stored data (default string when unset).
	 *
	 * @return void
	 */
	public function test_get_all_returns_stored_data() {
		Status::reset();
		$data = Status::get( 'all' );
		$this->assertSame( 'unscanned', $data );
	}

	/**
	 * Reset() removes stored option.
	 *
	 * @return void
	 */
	public function test_reset_clears_option() {
		$scan         = new \stdClass();
		$scan->result = 'compatible';
		Status::set( $scan );
		Status::reset();
		$this->assertSame( 'unscanned', Status::get() );
	}
}
