<?php

namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Services\Ai\ImageGeneration\LogoGenerationService;

/**
 * Class LogoGenController
 */
class LogoGenController {

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
	protected $rest_base = '/logogen';

	/**
	 * Registers rest routes for LogoGenController class.
	 *
	 * @return void
	 */
	public function register_routes() {
		register_rest_route(
			$this->namespace,
			$this->rest_base . '/generate',
			array(
			'methods'             => \WP_REST_Server::CREATABLE,
			'callback'            => array( $this, 'generate_logos' ),
			'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
			'args'                => $this->get_generate_logos_args(),
		) );
		register_rest_route(
			$this->namespace,
			$this->rest_base . '/generate/status',
			array(
				'methods'             => \WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'get_generation_status' ),
				'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				'args'                => $this->get_generation_status_args(),
			)
		);
		register_rest_route(
			$this->namespace,
			$this->rest_base . '/generate/more',
			array(
				'methods'             => \WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'generate_more_logos' ),
				'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				'args'                => $this->get_generate_more_logos_args(),
			)
		);
		register_rest_route(
			$this->namespace,
			$this->rest_base . '/generate/select',
			array(
				'methods'             => \WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'select_logo' ),
				'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				'args'                => $this->get_select_logo_args(),
			)
		);
	}

	/**
	 * Get the arguments for the generate logos endpoint.
	 *
	 * @return array
	 */
	public function get_generate_logos_args(): array {
		return array(
			'site_title' => array(
				'type' => 'string',
				'required' => true,
			),
			'site_description' => array(
				'type' => 'string',
				'required' => true,
			),
			'locale' => array(
				'type' => 'string',
				'required' => true,
			),
		);
	}

	/**
	 * Get the arguments for the get generation status endpoint.
	 *
	 * @return array
	 */
	public function get_generation_status_args(): array {
		return array(
			'reference_id' => array(
				'type' => 'string',
				'required' => true,
			),
		);
	}

	/**
	 * Get the arguments for the generate more logos endpoint.
	 *
	 * @return array
	 */
	public function get_generate_more_logos_args(): array {
		return array(
			'reference_id' => array(
				'type' => 'string',
				'required' => true,
			),
		);
	}

	/**
	 * Get the arguments for the select logo endpoint.
	 *
	 * @return array
	 */
	public function get_select_logo_args(): array {
		return array(
			'logo_reference_id' => array(
				'type' => 'string',
				'required' => true,
			),
		);
	}

	/**
	 * Generate logos.
	 *
	 * @param \WP_REST_Request $request The request object.
	 * @return \WP_REST_Response
	 */
	public function generate_logos( \WP_REST_Request $request ) {
		$site_title = $request->get_param( 'site_title' );
		$site_description = $request->get_param( 'site_description' );
		$locale = $request->get_param( 'locale' );

		$logogen_service = new LogoGenerationService();
		$response = $logogen_service->generate( $site_title, $site_description, $locale );
		if ( is_wp_error( $response ) ) {
			return $response;
		}

		return new \WP_REST_Response( $response, 202 );
	}

	/**
	 * Get the generation status.
	 *
	 * @param \WP_REST_Request $request The request object.
	 * @return \WP_REST_Response
	 */
	public function get_generation_status( \WP_REST_Request $request ) {
		$reference_id = $request->get_param( 'reference_id' );

		// Check the generation status.
		$logogen_service = new LogoGenerationService();
		$response = $logogen_service->generation_status( $reference_id );
		if ( is_wp_error( $response ) ) {
			return $response;
		}

		// If the generation is completed, add the logos to the response.
		if ( $response['status'] === 'completed' ) {
			$logos = $logogen_service->get_logos( true, true );
			$response['logos'] = $logos;
		}

		return new \WP_REST_Response( $response, 200 );
	}

	/**
	 * Generate more logos.
	 *
	 * @param \WP_REST_Request $request The request object.
	 * @return \WP_REST_Response
	 */
	public function generate_more_logos( \WP_REST_Request $request ) {
		$reference_id = $request->get_param( 'reference_id' );

		$logogen_service = new LogoGenerationService();
		$response = $logogen_service->generate_more( $reference_id );
		if ( is_wp_error( $response ) ) {
			return $response;
		}

		return new \WP_REST_Response( $response, 202 );
	}

	/**
	 * Select a logo.
	 *
	 * @param \WP_REST_Request $request The request object.
	 * @return \WP_REST_Response
	 */
	public function select_logo( \WP_REST_Request $request ) {
		$logo_reference_id = $request->get_param( 'logo_reference_id' );

		$logogen_service = new LogoGenerationService();
		$response = $logogen_service->select( $logo_reference_id );
		if ( is_wp_error( $response ) ) {
			return $response;
		}

		return new \WP_REST_Response( $response, 200 );
	}
}
