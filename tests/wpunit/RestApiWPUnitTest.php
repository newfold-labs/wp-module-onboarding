<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\RestApi\RestApi;

/**
 * RestApi wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\RestApi\RestApi
 */
class RestApiWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * rest_api_init registers newfold-onboarding REST routes.
	 *
	 * @return void
	 */
	public function test_rest_api_init_registers_onboarding_routes() {
		new RestApi();
		do_action( 'rest_api_init' );
		$server = rest_get_server();
		$routes = $server->get_routes();
		$found  = array_filter(
			array_keys( $routes ),
			function ( $route ) {
				return strpos( $route, 'newfold-onboarding' ) !== false;
			}
		);
		$this->assertNotEmpty( $found, 'Expected newfold-onboarding routes to be registered' );
	}
}
