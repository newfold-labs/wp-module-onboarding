<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Compatibility\Status;
use NewfoldLabs\WP\Module\Onboarding\Compatibility\Scan;
use NewfoldLabs\WP\Module\Onboarding\TaskManagers\ImageSideloadTaskManager;
use NewfoldLabs\WP\Module\Onboarding\Tasks\ImageSideloadTask;

/**
 * Module loading wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Application
 */
class ModuleLoadingWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Verify core module classes exist.
	 *
	 * @return void
	 */
	public function test_module_classes_load() {
		$this->assertTrue( class_exists( Application::class ) );
		$this->assertTrue( class_exists( ModuleController::class ) );
		$this->assertTrue( class_exists( Permissions::class ) );
		$this->assertTrue( class_exists( Status::class ) );
		$this->assertTrue( class_exists( Scan::class ) );
		$this->assertTrue( class_exists( ImageSideloadTaskManager::class ) );
		$this->assertTrue( class_exists( ImageSideloadTask::class ) );
		$this->assertTrue( class_exists( RestApi\RestApi::class ) );
	}

	/**
	 * Verify WordPress factory is available.
	 *
	 * @return void
	 */
	public function test_wordpress_factory_available() {
		$this->assertTrue( function_exists( 'get_option' ) );
		$this->assertNotEmpty( get_option( 'blogname' ) );
	}
}
