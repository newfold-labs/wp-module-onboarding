<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Data\Events;

/**
 * Data Events wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Data\Events
 */
class EventsWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Get category returns expected categories.
	 *
	 * @return void
	 */
	public function test_get_category_returns_expected_categories() {
		$this->assertSame( array( 'wonder_start', 'experiment' ), Events::get_category() );
	}

	/**
	 * Get valid actions returns array.
	 *
	 * @return void
	 */
	public function test_get_valid_actions_returns_array() {
		$actions = Events::get_valid_actions();
		$this->assertIsArray( $actions );
		$this->assertNotEmpty( $actions );
	}

	/**
	 * Known valid actions are true.
	 *
	 * @return void
	 */
	public function test_known_valid_actions_are_true() {
		$actions = Events::get_valid_actions();
		foreach ( array( 'pageview', 'onboarding_started', 'onboarding_complete', 'migration_initiated', 'logo_added' ) as $expected ) {
			$this->assertArrayHasKey( $expected, $actions );
			$this->assertTrue( $actions[ $expected ] );
		}
	}
}
