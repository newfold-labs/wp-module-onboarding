<?php
/**
 * SiteGenServiceRequest class.
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
	const DEFAULT_BASE_URL = 'https://bluehost-ai-platform.on-forge.com';

	/**
	 * The URL.
	 *
	 * @var string
	 */
	protected string $url;

	/**
	 * The headers.
	 *
	 * @var array
	 */
	protected array $headers;

	/**
	 * The body.
	 *
	 * @var array
	 */
	protected array $body;

	/**
	 * Constructor.
	 *
	 * @param string $endpoint The endpoint.
	 * @param array  $body The body.
	 */
	public function __construct( string $endpoint, array $body ) {
		$base          = defined( 'NFD_AI_PLATFORM_BASE_URL' ) ? NFD_AI_PLATFORM_BASE_URL : self::DEFAULT_BASE_URL;
		$this->url     = rtrim( $base, '/' ) . '/api/v1/' . $endpoint;
		$this->body    = $body;
		$this->headers = array(
			'Content-Type'  => 'application/json',
			'Authorization' => 'Bearer ' . HiiveConnection::get_auth_token(),
		);
	}

	/**
	 * Send the request asynchronously.
	 *
	 * @return void
	 */
	public function send_async(): void {
		wp_remote_post(
			$this->url,
			array(
				'headers'  => $this->headers,
				'body'     => wp_json_encode( $this->body ),
				'sslverify' => defined( 'NFD_AI_PLATFORM_SSL_VERIFY' ) ? NFD_AI_PLATFORM_SSL_VERIFY : true, //set to false in development environments.
				'blocking' => false, // The request is fire and forget. No waiting for AI Platform response and no action is needed on the response.
			)
		);
	}
}
