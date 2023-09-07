<?php

namespace NewfoldLabs\WP\Module\Onboarding\RestApi\Themes;

use NewfoldLabs\WP\Module\Onboarding\Data\Patterns;
use NewfoldLabs\WP\Module\Onboarding\Permissions;

/**
 * Class PatternsController
 */
class PatternsController extends \WP_REST_Controller {


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
	protected $rest_base = '/patterns';

	/**
	 * Registers REST routes for this controller class.
	 */
	public function register_routes() {

		register_rest_route(
			$this->namespace,
			$this->rest_base,
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_pattern' ),
					'args'                => $this->get_pattern_args(),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);
	}

	/**
	 * Checks the type of the patterns.
	 *
	 * @return array
	 */
	public function get_pattern_args() {
		return array(
			'slug'   => array(
				'type' => 'string',
			),
			'step'   => array(
				'type' => 'string',
			),
			'squash' => array(
				'type'    => 'boolean',
				'default' => false,
			),
		);
	}

	/**
	 * Retrieves the patterns approved by the Onboarding Module.
	 *
	 * @param \WP_REST_Request $request WP Rest Response object
	 * @return \WP_Rest_Response|\WP_Error
	 */
	public function get_pattern( \WP_REST_Request $request ) {
		$step   = $request->get_param( 'step' );
		$squash = $request->get_param( 'squash' );
		$slug   = $request->get_param( 'slug' );

		if ( ! $step && ! $slug ) {
			return new \WP_Error(
				'missing_params',
				__( 'Pattern identifier (slug) or step name (step) required.', 'wp-module-onboarding' ),
				array( 'status' => 400 )
			);
		}

		if ( $step ) {
			$step_patterns = Patterns::get_theme_step_patterns_from_step( $step, $squash );
			if ( ! $step_patterns ) {
				return new \WP_Error(
					'no_patterns_found',
					__( 'No Patterns Found.', 'wp-module-onboarding' ),
					array( 'status' => 404 )
				);
			}

			return new \WP_REST_Response(
				$step_patterns
			);
		}

		$pattern = Patterns::get_pattern_from_slug( $slug );
		if ( ! $pattern ) {
			return new \WP_Error(
				'no_pattern_found',
				__( 'No Pattern Found.', 'wp-module-onboarding' ),
				array( 'status' => 404 )
			);
		}

		return new \WP_REST_Response(
			$pattern
		);
	}
}
