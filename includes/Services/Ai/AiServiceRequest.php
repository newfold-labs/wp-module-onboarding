<?php

namespace NewfoldLabs\WP\Module\Onboarding\Services\Ai;

use NewfoldLabs\WP\Module\Data\HiiveConnection;

/**
 * AI Service Request Class
 *
 * Handles HTTP requests to the AI API endpoint.
 */
class AiServiceRequest {

	/**
	 * Default production base URL.
	 *
	 * @var string
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
	protected $url;

	/**
	 * API endpoint
	 *
	 * @var string
	 */
	protected $endpoint;

	/**
	 * Request headers
	 *
	 * @var array
	 */
	protected $headers;

	/**
	 * Request body
	 *
	 * @var array
	 */
	protected $body;

	/**
	 * Response
	 *
	 * @var array|\WP_Error|null
	 */
	protected $response = null;

	/**
	 * Constructor
	 *
	 * @param string      $endpoint The endpoint to send the request to.
	 * @param array       $body    Request body data.
	 * @param array       $headers Additional headers to include in the request.
	 * @param string|null $url The URL to send the request to (Not recommended to override this).
	 */
	public function __construct( string $endpoint, array $body, array $headers = array(), ?string $url = null ) {
		$this->url      = $url ?? $this->get_api_url();
		$this->endpoint = $endpoint;
		$this->body     = $body;
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

		if ( defined( 'NFD_WB_DEV_MODE' ) && NFD_DATA_WB_DEV_MODE ) {
			$base_url = defined( 'NFD_WB_LOCAL_BASE_URL' ) ? NFD_WB_LOCAL_BASE_URL : self::DEFAULT_LOCAL_BASE_URL;
		} else {
			$base_url = defined( 'NFD_WB_PRODUCTION_BASE_URL' ) ? NFD_WB_PRODUCTION_BASE_URL : self::DEFAULT_PRODUCTION_BASE_URL;
		}

		return $base_url . '/api/v1/';
	}

	/**
	 * Send the HTTP request
	 *
	 * @return AiServiceRequest The instance of the class.
	 */
	public function send(): AiServiceRequest {
		$response = wp_remote_post(
			$this->url . $this->endpoint,
			array(
				'headers' => $this->headers,
				'body'    => wp_json_encode( $this->body ),
				'timeout' => 180,
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

	/**
	 * Get the error message
	 *
	 * @return string|null The error message or null if the request was successful.
	 */
	public function get_error_message(): ?string {
		if ( $this->is_successful() ) {
			return null;
		}

		return $this->get_error_response_body()['message'] ?? __( 'An unknown error occurred', 'wp-module-onboarding' );
	}
}
