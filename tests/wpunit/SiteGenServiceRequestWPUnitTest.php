<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Services\Ai\SiteGenServiceRequest;

/**
 * SiteGenServiceRequest wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Services\Ai\SiteGenServiceRequest
 */
class SiteGenServiceRequestWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Captured HTTP request URL.
	 *
	 * @var string|null
	 */
	private $captured_url;

	/**
	 * Captured HTTP request args.
	 *
	 * @var array|null
	 */
	private $captured_args;

	/**
	 * Set up.
	 *
	 * @return void
	 */
	public function setUp(): void {
		parent::setUp();
		$this->captured_url  = null;
		$this->captured_args = null;
		update_option( 'nfd_data_token', 'test-token' );
	}

	/**
	 * Short-circuit outgoing HTTP requests with a canned response.
	 *
	 * @param array|\WP_Error $response Response to return.
	 * @return void
	 */
	private function mock_http( $response ): void {
		add_filter(
			'pre_http_request',
			function ( $pre, $args, $url ) use ( $response ) {
				$this->captured_url  = $url;
				$this->captured_args = $args;
				return $response;
			},
			10,
			3
		);
	}

	/**
	 * Build a mock HTTP response array.
	 *
	 * @param string $body Raw body.
	 * @return array
	 */
	private function http_response( string $body ): array {
		return array(
			'headers'  => array(),
			'body'     => $body,
			'response' => array(
				'code'    => 200,
				'message' => 'OK',
			),
			'cookies'  => array(),
			'filename' => null,
		);
	}

	/**
	 * Base URL defaults to the AI platform.
	 *
	 * @covers ::get_base_url
	 * @return void
	 */
	public function test_get_base_url_default() {
		if ( defined( 'NFD_AI_PLATFORM_BASE_URL' ) ) {
			$this->assertSame( NFD_AI_PLATFORM_BASE_URL, SiteGenServiceRequest::get_base_url() );
			return;
		}

		$this->assertSame( SiteGenServiceRequest::DEFAULT_BASE_URL, SiteGenServiceRequest::get_base_url() );
	}

	/**
	 * Send posts the JSON body with auth to the versioned endpoint URL and decodes the response.
	 *
	 * @covers ::__construct
	 * @covers ::send
	 * @covers ::get_request_args
	 * @return void
	 */
	public function test_send_posts_json_and_decodes_response() {
		$this->mock_http( $this->http_response( '{"site_id":"abc"}' ) );

		$result = ( new SiteGenServiceRequest( 'handshake', array( 'k' => 'v' ) ) )->send();

		$this->assertSame( array( 'site_id' => 'abc' ), $result );
		$this->assertSame(
			rtrim( SiteGenServiceRequest::get_base_url(), '/' ) . '/api/v1/handshake',
			$this->captured_url
		);
		$this->assertSame( wp_json_encode( array( 'k' => 'v' ) ), $this->captured_args['body'] );
		$this->assertSame( 'application/json', $this->captured_args['headers']['Content-Type'] );
		$this->assertSame( 'Bearer test-token', $this->captured_args['headers']['Authorization'] );
		$this->assertTrue( $this->captured_args['blocking'] );
		if ( ! defined( 'NFD_AI_PLATFORM_SSL_VERIFY' ) ) {
			$this->assertTrue( $this->captured_args['sslverify'] );
		}
	}

	/**
	 * Transport errors return null.
	 *
	 * @covers ::send
	 * @return void
	 */
	public function test_send_returns_null_on_wp_error() {
		$this->mock_http( new \WP_Error( 'http_request_failed', 'boom' ) );

		$this->assertNull( ( new SiteGenServiceRequest( 'x', array() ) )->send() );
	}

	/**
	 * Non-JSON bodies decode to null.
	 *
	 * @covers ::send
	 * @return void
	 */
	public function test_send_returns_null_for_non_json_body() {
		$this->mock_http( $this->http_response( 'not json' ) );

		$this->assertNull( ( new SiteGenServiceRequest( 'x', array() ) )->send() );
	}

	/**
	 * Async sends are non-blocking.
	 *
	 * @covers ::send_async
	 * @covers ::get_request_args
	 * @return void
	 */
	public function test_send_async_is_non_blocking() {
		$this->mock_http( $this->http_response( '{}' ) );

		( new SiteGenServiceRequest( 'events', array( 'a' => 1 ) ) )->send_async();

		$this->assertFalse( $this->captured_args['blocking'] );
		$this->assertStringEndsWith( '/api/v1/events', $this->captured_url );
	}
}
