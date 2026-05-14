<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Compatibility\Scan;

/**
 * Compatibility Scan wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Compatibility\Scan
 */
class CompatibilityScanWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	public function test_default_config_and_test_statuses() {
		$scan = new Scan();
		$this->assertSame( '6.5', $scan->default_config['min_wp'] );
		$this->assertSame( array( 'compatible', 'unsupported-wp' ), $scan->test_statuses );
	}

	public function test_scan_against_current_wp_evaluates_to_compatible() {
		$scan = new Scan();
		$this->assertSame( 'compatible', $scan->result );
		$this->assertNotEmpty( $scan->data['wp_version'] );
	}

	public function test_scan_with_higher_min_wp_evaluates_to_unsupported() {
		$scan = new Scan( array( 'min_wp' => '99.0' ) );
		$this->assertSame( 'unsupported-wp', $scan->result );
	}

	public function test_custom_config_is_merged_with_defaults() {
		$scan = new Scan( array( 'min_wp' => '5.0' ) );
		$this->assertSame( '5.0', $scan->config['min_wp'] );
	}
}
