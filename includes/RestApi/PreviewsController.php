<?php

namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Data\Services\PreviewsService;

/**
 * PreviewsController class.
 */
class PreviewsController {

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
	protected $rest_base = '/previews';

	/**
	 * Registers rest routes for PreviewsController class.
	 *
	 * @return void
	 */
	public function register_routes() {
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/snapshot',
			array(
				'methods'             => \WP_REST_Server::EDITABLE,
				'callback'            => array( $this, 'generate_snapshot' ),
				'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				'args'                => $this->generate_snapshot_args(),
			)
		);
	}

	/**
	 * Args for Generating the snapshot.
	 *
	 * @return array
	 */
	public function generate_snapshot_args() {
		return array(
			'content'       => array(
				'required' => true,
				'type'     => 'string',
			),
			'slug'          => array(
				'required' => true,
				'type'     => 'string',
			),
			'custom_styles' => array(
				'required' => false,
				'type'     => 'string',
			),
		);
	}

	/**
	 * Generates a snapshot.
	 *
	 * @param \WP_REST_Request $request The incoming request.
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function generate_snapshot( \WP_REST_Request $request ): \WP_REST_Response {
		$content       = $request->get_param( 'content' );
		$slug          = $request->get_param( 'slug' );
		$custom_styles = $request->get_param( 'custom_styles' );

		$snapshot = PreviewsService::generate_snapshot( $content, $slug, $custom_styles );
		if ( is_wp_error( $snapshot ) ) {
			return new \WP_REST_Response(
				$snapshot->get_error_message(),
				500
			);
		}

		return new \WP_REST_Response(
			$snapshot,
			200
		);
	}
}
