<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Data\Events;
use PHPUnit\Framework\TestCase;

/**
 * PHPUnit tests for Data\Events (no WordPress required).
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Data\Events
 */
class EventsTest extends TestCase {

	/**
	 * Categories are the expected Hiive categories.
	 *
	 * @covers ::get_category
	 * @return void
	 */
	public function test_get_category() {
		$this->assertSame( array( 'wonder_start', 'experiment' ), Events::get_category() );
	}

	/**
	 * Every valid action is enabled and uses snake_case.
	 *
	 * @covers ::get_valid_actions
	 * @return void
	 */
	public function test_valid_actions_are_enabled_snake_case_keys() {
		$actions = Events::get_valid_actions();

		$this->assertNotEmpty( $actions );
		foreach ( $actions as $action => $enabled ) {
			$this->assertTrue( $enabled, "Action {$action} should be enabled." );
			$this->assertMatchesRegularExpression( '/^[a-z0-9_]+$/', $action );
		}
	}

	/**
	 * Actions the SPA and services emit are registered.
	 *
	 * @covers ::get_valid_actions
	 * @return void
	 */
	public function test_expected_actions_are_registered() {
		$expected = array(
			'pageview',
			'onboarding_started',
			'onboarding_complete',
			'primary_type_set',
			'secondary_type_set',
			'site_generation_time',
			'error_state_triggered',
			'migration_initiated',
		);

		foreach ( $expected as $action ) {
			$this->assertArrayHasKey( $action, Events::get_valid_actions() );
		}
	}
}
