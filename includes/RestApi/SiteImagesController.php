<?php
namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Permissions;

/**
 * Class SiteImagesController
 */
class SiteImagesController extends BaseHiiveController {

	/**
	 * @var string
	 */
	protected $namespace = 'newfold-onboarding/v1';

	/**
	 * @var string
	 */
	protected $rest_base = '/site-images';

	/**
	 * @var int
	 */
	protected $results_per_page = 25;

	/**
	 * Registers rest routes for this controller class.
	 *
	 * @return void
	 */
	public function register_routes() {
		\register_rest_route(
			$this->namespace,
			$this->rest_base,
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_images' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
					'args'                => $this->get_request_params(),
				),
			)
		);
	}

	/**
	 * Query Hiive Unsplash worker for images.
	 *
	 * @param \WP_REST_Request $request Request model.
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function get_images( \WP_REST_Request $request ) {
		// Define the required request and response args.
		$request_args  = array(
			'query'    => $request->get_param( 'siteType' ),
			'per_page' => $this->results_per_page,
		);
		$response_args = array( 'id', 'width', 'height', 'links', 'description', 'alt_description', 'urls' );

		// Request the Hiive Unsplash worker for images.
		$payload = $this->get( '/workers/unsplash/search/photos', $request_args );
		if ( \is_wp_error( $payload ) ) {
			return $payload;
		}

		// Filter out unnecessary keys from the results.
		$results = json_decode( $payload, true )['results'];
		foreach ( $results as $index => $result ) {
			$results[ $index ] = array_filter(
				$result,
				function ( $key ) use ( $response_args ) {
					return in_array( $key, $response_args );
				},
				ARRAY_FILTER_USE_KEY
			);
		}

		return new \WP_REST_Response(
			$results,
			200
		);
	}

	/**
	 * Get query params for the route.
	 *
	 * @return array
	 */
	public function get_request_params() {
		return array(
			'siteType' => array(
				'type'              => 'string',
				'required'          => true,
				'sanitize_callback' => 'sanitize_text_field',
			),
		);
	}
}
