<?php
namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

/**
 * Base class for Hiive related actions.
 */
abstract class BaseHiiveController extends \WP_REST_Controller {

	/**
	 * @var string
	 */
	protected $url;

	public function __construct() {

		if ( ! defined( 'NFD_HIIVE_BASE_URL' ) ) {
			define( 'NFD_HIIVE_BASE_URL', 'https://hiive.cloud' );
		}

		$this->url = NFD_HIIVE_BASE_URL;
	}

	/**
	 * @param string $endpoint
	 * @param array  $args
	 *
	 * @return \WP_Error|string containing the Hiive response.
	 */
	protected function get( $endpoint, $args = array() ) {
		$request = $this->url . $endpoint . '?' . http_build_query( $args );

		$response = \wp_remote_get( $request );
		if ( 200 === \wp_remote_retrieve_response_code( $response ) ) {
			$payload = \wp_remote_retrieve_body( $response );

			return $payload;
		}

		return new \WP_Error(
			'hiive-error',
			'Error in fetching data.',
			array( 'status' => \wp_remote_retrieve_response_code( $response ) )
		);
	}
}
