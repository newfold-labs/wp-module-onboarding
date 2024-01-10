<?php

namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\AI\SiteGen\SiteGen;
use NewfoldLabs\WP\Module\Onboarding\Data\Services\SiteGenService;

/**
 * Class SiteGenController
 */
class SiteGenController {

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
	protected $rest_base = '/sitegen';

	/**
	 * Registers rest routes for SiteGenController class.
	 *
	 * @return void
	 */
	public function register_routes() {
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/get-identifiers',
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_valid_identifiers' ),
				'permission_callback' => '__return_true',
			)
		);
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/customize-data',
			array(
				'methods'  => \WP_REST_Server::READABLE,
				'callback' => array( $this, 'get_customize_sidebar_data' ),
				'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
			)
		);
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/generate',
			array(
				'methods'             => \WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'generate_sitegen_meta' ),
				'permission_callback' => '__return_true',
				'args'                => $this->sitegen_meta_args(),
			)
		);
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/get-homepages',
			array(
				'methods'             => \WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'get_homepages' ),
				'permission_callback' => '__return_true',
				'args'                => $this->get_homepages_args(),
			)
		);
	}

	/**
	 * Required Args for Generating Site Gen Meta.
	 *
	 * @return array
	 */
	public function sitegen_meta_args() {
		return array(
			'site_info'  => array(
				'required' => true,
				'type'     => 'object',
			),
			'identifier' => array(
				'required' => true,
				'type'     => 'string',
			),
			'skip_cache' => array(
				'required' => false,
				'type'     => 'boolean',
			),
		);
	}

		/**
		 * Gets the arguments for the 'get-homepages' endpoint.
		 *
		 * @return array The array of arguments.
		 */
	public function get_homepages_args() {
		return array(
			'site_description' => array(
				'required'          => false,
				'validate_callback' => function( $param, $request, $key ) {
					return is_string( $param );
				},
				'sanitize_callback' => 'sanitize_text_field',
			),
			'regenerate'       => array(
				'required' => false,
			),
			// Add other parameters here as needed.
		);
	}

	/**
	 * Gets all the valid Identifiers
	 *
	 * @return array
	 */
	public function get_valid_identifiers() {
		return array_keys( array_filter( SiteGenService::get_identifiers() ) );
	}

	/**
	 * Generate Sitegen meta data.
	 *
	 * @param \WP_REST_Request $request Request model.
	 *
	 * @return array|WP_Error
	 */
	public function generate_sitegen_meta( \WP_REST_Request $request ) {

		$site_info  = $request->get_param( 'site_info' );
		$identifier = $request->get_param( 'identifier' );
		$skip_cache = $request->get_param( 'skip_cache' );

		if ( SiteGenService::is_enabled() ) {
			// TODO Implement the main function and do computations if required.
			return SiteGenService::instantiate_site_meta( $site_info, $identifier, $skip_cache );
		}

		return new \WP_Error(
			'sitegen-error',
			'SiteGen is Disabled.',
			array( 'status' => 404 )
		);
	}

	/**
	 * Get Sitegen Customize sidebar data.
	 *
	 * @param \WP_REST_Request $request Request model.
	 *
	 * @return array|WP_Error
	 */
	public function get_customize_sidebar_data( \WP_REST_Request $request ) {
		return SiteGenService::get_customize_sidebar_data();
	}

	/**
	 * Gets the preview homepages
	 *
	 * @return array
	 */
	public function get_homepages( \WP_REST_Request $request ) {
		// Fetching parameters provided by the front end.
		$site_description = $request->get_param( 'site_description' );
		$regenerate       = $request->get_param( 'regenerate' );

		$site_info = array( 'site_info' => array( 'site_description' => $site_description ) );

		// Extracting the 'targetaudience' and 'contentstructure' values.
		$target_audience = SiteGenService::instantiate_site_meta( $site_info, 'targetaudience', $skip_cache );
		$content_style   = SiteGenService::instantiate_site_meta( $site_info, 'contenttones', $skip_cache );

		// Ensure that the required data is available.
		if ( ! $target_audience || ! $content_style ) {
			return new \WP_REST_Response(
				array( 'message' => 'Required data is missing.' ),
				400 // Bad Request
			);
		}

		// Call the static method from SiteGen with all parameters.
		$home_pages = SiteGen::get_home_pages(
			$site_description,
			$content_style,
			$target_audience,
			$regenerate
		);

		return new \WP_REST_Response( $home_pages, 200 ); // OK
	}

}
