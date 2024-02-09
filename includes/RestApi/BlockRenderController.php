<?php

namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Data\Services\BlockRenderService;

/**
 * Undocumented class
 */
class BlockRenderController {

	/**
	 * The namespace of this controller's route.
	 *
	 * @var string
	 */
	protected $namespace = 'newfold-onboarding/v1';

	/**
	 * The endpoint base
	 *
	 * @var string
	 */
	protected $rest_base = '/block-render';

		/**
		 * Registers rest routes for BlockRenderController class.
		 *
		 * @return void
		 */
	public function register_routes() {
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/screenshot',
			array(
				'methods'  => \WP_REST_Server::CREATABLE,
				'callback' => array( $this, 'generate_screenshot' ),
				'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				'args'     => $this->generate_screenshot_args(),
			)
		);
	}

	/**
	 * Args for Generating the screenshot.
	 *
	 * @return array
	 */
	public function generate_screenshot_args() {
		return array(
			'width'   => array(
				'required' => true,
				'type'     => 'integer',
			),
			'height'  => array(
				'required' => true,
				'type'     => 'integer',
			),
			'content' => array(
				'required' => true,
				'type'     => 'string',
			),
		);
	}

	/**
	 * Generates a PNG screenshot of the HTML block render.
	 *
	 * @param \WP_REST_Request $request The incoming request.
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function generate_screenshot( \WP_REST_Request $request ) {
		$width   = $request->get_param( 'width' );
		$height  = $request->get_param( 'height' );
		$content = $request->get_param( 'content' );

		$screenshot = BlockRenderService::generate_screenshot( $width, $height, $content );
		if ( is_wp_error( $screenshot ) ) {
			return $screenshot;
		}

		return new \WP_REST_Response(
			$screenshot,
			201
		);
	}
}
