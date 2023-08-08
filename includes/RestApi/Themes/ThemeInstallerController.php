<?php
namespace NewfoldLabs\WP\Module\Onboarding\RestApi\Themes;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Services\ThemeService;

/**
 * Controller defining API's for theme install related functionalities.
 */
class ThemeInstallerController extends \WP_REST_Controller {
	/**
	 * The namespace of this controller's route.
	 *
	 * @var string
	 */
	protected $namespace = 'newfold-onboarding/v1';

	/**
	 * The base of this controller's route.
	 *
	 * @var string
	 */
	protected $rest_base = '/themes';

	/**
	 * Register the controller routes.
	 */
	public function register_routes() {
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/initialize',
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'initialize' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);
	}

	/**
	 * Queue in the initial list of themes to be installed.
	 *
	 * @return \WP_REST_Response
	 */
	public static function initialize() {
		if ( ThemeService::initialize() ) {
			return new \WP_REST_Response(
				array(),
				202
			);
		}

		return new \WP_REST_Response(
			array(),
			500
		);
	}
}
