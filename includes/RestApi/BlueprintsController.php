<?php
/**
 * Blueprints Controller
 *
 * @package NewfoldLabs\WP\Module\Onboarding\RestApi
 */

namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Services\Blueprints\BlueprintsService;

class BlueprintsController {

	/**
	 * This is the REST API namespace that will be used for our custom API
	 *
	 * @var string
	 */
	protected $namespace = 'newfold-onboarding/v1';

	/**
	 * This is the REST endpoint
	 *
	 * @var string
	 */
	protected $rest_base = '/blueprints';

	/**
	 * Register the routes for the blueprints controller.
	 *
	 * @return void
	 */
	public function register_routes() {
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/get-blueprints',
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'get_blueprints' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/install-required-plugins',
			array(
				'methods'             => \WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'install_required_plugins' ),
				'args'                => $this->install_required_plugins_args(),
				'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
			)
		);
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/import-blueprint',
			array(
				'methods'             => \WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'import_blueprint' ),
				'args'                => $this->import_blueprint_args(),
				'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
			)
		);
	}

	/**
	 * Get the arguments for the install required plugins route.
	 *
	 * @return array The arguments.
	 */
	public function install_required_plugins_args() {
		return array(
			'selected_blueprint_slug' => array(
				'type'     => 'string',
				'required' => true,
			),
		);
	}

	/**
	 * Get the arguments for the import blueprint route.
	 *
	 * @return array The arguments.
	 */
	public function import_blueprint_args() {
		return array(
			'selected_blueprint_slug' => array(
				'type'     => 'string',
				'required' => true,
			),
		);
	}

	/**
	 * Get the blueprints.
	 *
	 * @param \WP_REST_Request $request The request object.
	 * @return \WP_REST_Response The response object.
	 */
	public function get_blueprints( \WP_REST_Request $request ): \WP_REST_Response {
		$blueprints = BlueprintsService::fetch_blueprints();
		if ( is_wp_error( $blueprints ) ) {
			return new \WP_REST_Response( $blueprints->get_error_message(), 500 );
		}

		return new \WP_REST_Response( $blueprints, 200 );
	}

	/**
	 * Install the required plugins for a blueprint.
	 *
	 * @param \WP_REST_Request $request The request object.
	 * @return \WP_REST_Response The response object.
	 */
	public function install_required_plugins( \WP_REST_Request $request ): \WP_REST_Response {
		$selected_blueprint_slug = $request->get_param( 'selected_blueprint_slug' );
		$result = (new BlueprintsService())->install_required_plugins( $selected_blueprint_slug );
		if ( is_wp_error( $result ) ) {
			return new \WP_REST_Response( $result->get_error_message(), 500 );
		}

		return new \WP_REST_Response( 'Installed required plugins', 202 );
	}

	/**
	 * Import a blueprint.
	 *
	 * @param \WP_REST_Request $request The request object.
	 * @return \WP_REST_Response The response object.
	 */
	public function import_blueprint( \WP_REST_Request $request ): \WP_REST_Response {
		$selected_blueprint_slug = $request->get_param( 'selected_blueprint_slug' );
		$result = (new BlueprintsService())->import_blueprint( $selected_blueprint_slug );
		if ( is_wp_error( $result ) ) {
			return new \WP_REST_Response( $result->get_error_message(), 500 );
		}

		return new \WP_REST_Response( 'Blueprint imported successfully', 200 );
	}
}
