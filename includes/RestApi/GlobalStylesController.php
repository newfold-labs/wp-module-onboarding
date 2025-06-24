<?php

namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Services\GlobalStylesService;

class GlobalStylesController {

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
	protected $rest_base = '/global-styles';

	public function register_routes() {
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/set-color-palette',
			array(
				array(
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'set_color_palette' ),
					'args'                => $this->get_set_color_palette_args(),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);
	}

	public function get_set_color_palette_args() {
		return array(
			'color_palette' => array(
				'type'     => 'object',
				'required' => true,
			),
		);
	}

	/**
	 * Set the color palette.
	 *
	 * @param \WP_REST_Request $request The request object.
	 * @return \WP_REST_Response
	 */
	public function set_color_palette( \WP_REST_Request $request ): \WP_REST_Response {
		$data          = json_decode( $request->get_body(), true );
		$color_palette = $data['color_palette'];
		if ( ! is_array( $color_palette ) || empty( $color_palette ) ) {
			return new \WP_REST_Response(
				'Color palette is invalid.',
				400
			);
		}

		$response = ( new GlobalStylesService() )->set_color_palette( $color_palette );
		if ( is_wp_error( $response ) ) {
			return new \WP_REST_Response(
				'Error setting color palette.',
				500
			);
		}

		return new \WP_REST_Response(
			array( 'colors' => $response ),
			200
		);
	}
}
