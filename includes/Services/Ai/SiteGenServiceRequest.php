<?php
/**
 * SiteGenServiceRequest class.
 *
 * @package NewfoldLabs\WP\Module\Onboarding
 */

namespace NewfoldLabs\WP\Module\Onboarding\Services\Ai;

use NewfoldLabs\WP\Module\Data\HiiveConnection;

/**
 * SiteGenServiceRequest class.
 */
class SiteGenServiceRequest {


	/**
	 * The default base URL.
	 *
	 * @var string
	 */
	const DEFAULT_BASE_URL = 'https://ai-platform.hiive.cloud';

	/**
	 * The URL.
	 *
	 * @var string
	 */
	protected $url;

	/**
	 * The headers.
	 *
	 * @var array
	 */
	protected $headers;

	/**
	 * The body.
	 *
	 * @var array
	 */
	protected $body;

	/**
	 * The SSL verify setting.
	 *
	 * @var bool
	 */
	protected $sslverify;

	/**
	 * Constructor.
	 *
	 * @param string $endpoint The endpoint.
	 * @param array  $body The body.
	 */
	public function __construct( string $endpoint, array $body ) {
		$this->sslverify = defined( 'NFD_AI_PLATFORM_SSL_VERIFY' ) ? NFD_AI_PLATFORM_SSL_VERIFY : true;
		$this->url       = rtrim( self::get_base_url(), '/' ) . '/api/v1/' . $endpoint;
		$this->body      = $body;
		$this->headers   = array(
			'Content-Type'  => 'application/json',
			'Authorization' => 'Bearer ' . HiiveConnection::get_auth_token(),
		);
	}

	/**
	 * Send the request and return the response body.
	 *
	 * @return array|null Decoded response body or null on failure.
	 */
	public function send(): ?array {
		$response = wp_remote_post(
			$this->url,
			$this->get_request_args()
		);

		if ( \is_wp_error( $response ) ) {
			return null;
		}

		$body = wp_remote_retrieve_body( $response );
		return json_decode( $body, true );
	}

	/**
	 * Send the request asynchronously.
	 *
	 * @return void
	 */
	public function send_async(): void {
		wp_remote_post(
			$this->url,
			$this->get_request_args( false )
		);
	}

	/**
	 * Get the request arguments.
	 *
	 * @param bool $blocking Whether the request is blocking.
	 * @return array The request arguments.
	 */
	private function get_request_args( $blocking = true ): array {
		return array(
			'headers'   => $this->headers,
			'body'      => wp_json_encode( $this->body ),
			'sslverify' => $this->sslverify,
			'blocking'  => $blocking,
		);
	}

	/**
	 * Get the AI Platform base URL.
	 *
	 * @return string The AI Platform base URL.
	 */
	public static function get_base_url(): string {
		return defined( 'NFD_AI_PLATFORM_BASE_URL' ) ? NFD_AI_PLATFORM_BASE_URL : self::DEFAULT_BASE_URL;
	}
}
