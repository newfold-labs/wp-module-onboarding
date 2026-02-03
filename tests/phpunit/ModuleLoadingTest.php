<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use PHPUnit\Framework\TestCase;

/**
 * PHPUnit tests to verify module classes load (no WordPress required).
 *
 * @coversNothing
 */
class ModuleLoadingTest extends TestCase {

	/**
	 * Core module classes are loadable.
	 *
	 * @return void
	 */
	public function test_module_classes_load() {
		$this->assertTrue( class_exists( Types\Color::class ) );
		$this->assertTrue( class_exists( Permissions::class ) );
		$this->assertTrue( class_exists( Compatibility\Status::class ) );
		$this->assertTrue( class_exists( RestApi\RestApi::class ) );
	}
}
