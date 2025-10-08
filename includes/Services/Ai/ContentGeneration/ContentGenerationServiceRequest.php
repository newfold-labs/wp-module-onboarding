<?php
/**
 * AI Content Generation Service Request class.
 *
 * @package NewfoldLabs\WP\Module\Onboarding
 */

namespace NewfoldLabs\WP\Module\Onboarding\Services\Ai\ContentGeneration;

use NewfoldLabs\WP\Module\Data\HiiveConnection;

/**
 * AI Content Generation Service Request Class
 *
 * Handles HTTP requests to the AI Content Generation API endpoint.
 */
class ContentGenerationServiceRequest {

	/**
	 * Default production base URL
	 */
	const DEFAULT_PRODUCTION_BASE_URL = 'https://patterns.hiive.cloud';

	/**
	 * Default local base URL
	 */
	const DEFAULT_LOCAL_BASE_URL = 'http://localhost:8888';

	/**
	 * API URL
	 *
	 * @var string
	 */
	private $url;

	/**
	 * API endpoint
	 *
	 * @var string
	 */
	private $endpoint;

	/**
	 * Request headers
	 *
	 * @var array
	 */
	private $headers;

	/**
	 * Request body
	 *
	 * @var array
	 */
	private $body;

	/**
	 * Response
	 *
	 * @var array|\WP_Error
	 */
	private $response = null;

	/**
	 * Constructor
	 *
	 * @param string $endpoint API endpoint.
	 * @param array  $body     Request body data.
	 * @param array  $headers  Additional headers to include in the request.
	 */
	public function __construct( string $endpoint, array $body, array $headers = array() ) {
		$this->endpoint = $endpoint;
		$this->body     = $body;
		$this->url      = $this->get_api_url();
		$this->headers  = array_merge(
			array(
				'Content-Type'  => 'application/json',
				'Authorization' => 'Bearer ' . HiiveConnection::get_auth_token(),
			),
			$headers
		);
	}

	/**
	 * Get the API URL based on configuration
	 *
	 * @return string The API URL to use.
	 */
	private function get_api_url(): string {

		if ( defined( 'NFD_WB_DEV_MODE' ) && NFD_WB_DEV_MODE ) {
			$base_url = defined( 'NFD_WB_LOCAL_BASE_URL' ) ? NFD_WB_LOCAL_BASE_URL : self::DEFAULT_LOCAL_BASE_URL;
		} else {
			$base_url = defined( 'NFD_WB_PRODUCTION_BASE_URL' ) ? NFD_WB_PRODUCTION_BASE_URL : self::DEFAULT_PRODUCTION_BASE_URL;
		}

		return $base_url . '/api/v1/content-generation/';
	}

	/**
	 * Send the HTTP request
	 *
	 * @return ContentGenerationServiceRequest The instance of the class.
	 */
	public function send(): ContentGenerationServiceRequest {
		$response = wp_remote_post(
			$this->url . $this->endpoint,
			array(
				'headers' => $this->headers,
				'body'    => wp_json_encode( $this->body ),
				'timeout' => 60,
			)
		);

		$this->response = $response;
		return $this;
	}

	/**
	 * Check if the request was successful
	 *
	 * @return bool True if the request was successful, false otherwise.
	 */
	public function is_successful(): bool {
		if ( ! $this->response || is_wp_error( $this->response ) ) {
			return false;
		}

		$code = wp_remote_retrieve_response_code( $this->response );
		return $code >= 200 && $code < 300;
	}

	/**
	 * Get the response body
	 *
	 * @return array|null The response body or null if the request was not successful.
	 */
	public function get_response_body(): ?array {
		// If the request was not successful, return null.
		if ( ! $this->is_successful() ) {
			return null;
		}

		return json_decode( wp_remote_retrieve_body( $this->response ), true );
	}

	/**
	 * Get the error response body
	 *
	 * @return array|null The error response body or null if the request was successful.
	 */
	public function get_error_response_body(): ?array {
		if ( $this->is_successful() ) {
			return null;
		}

		return json_decode( wp_remote_retrieve_body( $this->response ), true );
	}

	/**
	 * Get the response code
	 *
	 * @return int|null The response code or null if the request was not successful.
	 */
	public function get_response_code(): ?int {
		if ( ! $this->response || is_wp_error( $this->response ) ) {
			return 500;
		}

		return wp_remote_retrieve_response_code( $this->response );
	}
}
