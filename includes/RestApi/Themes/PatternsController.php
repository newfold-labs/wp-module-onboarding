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
					'callback'            => array( $this, 'get_step_patterns' ),
                    'args'                => $this->get_step_patterns_args(),
					// 'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);

	}

    public function get_step_patterns_args() {
        return array(
            'slug'   => array(
                'type' => 'string',
            ),
			'step'   => array(
				'type'     => 'string',
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
	 * @return \WP_Rest_Response|array
	 */
	public function get_step_patterns( \WP_REST_Request $request ) {
        $step = $request->get_param( 'step' );
        $squash = $request->get_param( 'squash' );
        $slug = $request->get_param( 'slug' );
        if ( $step ) {
            $step_patterns = Patterns::get_theme_step_patterns_from_step( $step, $squash );
            if ( ! $step_patterns ) {
                return new \WP_Error(
                    'no_patterns_found',
                    __('No Patterns Found for given step.'),
                    array( 'status' => 404 )
                );
            }
            return new \WP_REST_Response(
                $step_patterns
            );
        }
        // TODO HANDLE IF STEP NOT PRESENT TO GET FROM SLUG
	}

}
