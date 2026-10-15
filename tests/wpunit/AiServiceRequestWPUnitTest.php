<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Services\Ai\AiServiceRequest;

/**
 * AiServiceRequest wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Services\Ai\AiServiceRequest
 */
class AiServiceRequestWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

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
	 * @param int   $code HTTP status code.
	 * @param array $body Body to JSON encode.
	 * @return array
	 */
	private function http_response( int $code, array $body ): array {
		return array(
			'headers'  => array(),
			'body'     => wp_json_encode( $body ),
			'response' => array(
				'code'    => $code,
				'message' => '',
			),
			'cookies'  => array(),
			'filename' => null,
		);
	}

	/**
	 * Default URL points at the production patterns API.
	 *
	 * @covers ::__construct
	 * @return void
	 */
	public function test_constructor_uses_default_production_url() {
		if ( defined( 'NFD_WB_DEV_MODE' ) || defined( 'NFD_WB_PRODUCTION_BASE_URL' ) ) {
			$this->markTestSkipped( 'URL constants are defined in this environment.' );
		}

		$request = new AiServiceRequest( 'endpoint', array() );
		$property = new \ReflectionProperty( $request, 'url' );
		$property->setAccessible( true );
		$url = $property->getValue( $request );

		$this->assertSame( AiServiceRequest::DEFAULT_PRODUCTION_BASE_URL . '/api/v1/', $url );
	}

	/**
	 * Request sends JSON with auth header to the endpoint.
	 *
	 * @covers ::__construct
	 * @covers ::send
	 * @return void
	 */
	public function test_send_posts_json_with_auth_headers() {
		$this->mock_http( $this->http_response( 200, array( 'ok' => true ) ) );

		$request = new AiServiceRequest( 'thing', array( 'a' => 1 ), array( 'X-Custom' => 'yes' ), 'https://example.test/api/' );
		$this->assertSame( $request, $request->send() );

		$this->assertSame( 'https://example.test/api/thing', $this->captured_url );
		$this->assertSame( wp_json_encode( array( 'a' => 1 ) ), $this->captured_args['body'] );
		$this->assertSame( 'application/json', $this->captured_args['headers']['Content-Type'] );
		$this->assertSame( 'Bearer test-token', $this->captured_args['headers']['Authorization'] );
		$this->assertSame( 'yes', $this->captured_args['headers']['X-Custom'] );
		$this->assertSame( 180, $this->captured_args['timeout'] );
	}

	/**
	 * Custom headers can override the defaults.
	 *
	 * @covers ::__construct
	 * @return void
	 */
	public function test_custom_headers_override_defaults() {
		$this->mock_http( $this->http_response( 200, array() ) );

		$request = new AiServiceRequest( 'x', array(), array( 'Authorization' => 'Bearer other' ), 'https://example.test/' );
		$request->send();

		$this->assertSame( 'Bearer other', $this->captured_args['headers']['Authorization'] );
	}

	/**
	 * Successful responses expose body and code, and no error.
	 *
	 * @covers ::is_successful
	 * @covers ::get_response_body
	 * @covers ::get_response_code
	 * @covers ::get_error_response_body
	 * @covers ::get_error_message
	 * @return void
	 */
	public function test_successful_response_accessors() {
		$this->mock_http( $this->http_response( 201, array( 'id' => 5 ) ) );

		$request = ( new AiServiceRequest( 'x', array(), array(), 'https://example.test/' ) )->send();

		$this->assertTrue( $request->is_successful() );
		$this->assertSame( array( 'id' => 5 ), $request->get_response_body() );
		$this->assertSame( 201, $request->get_response_code() );
		$this->assertNull( $request->get_error_response_body() );
		$this->assertNull( $request->get_error_message() );
	}

	/**
	 * Error responses expose the error body and message.
	 *
	 * @covers ::is_successful
	 * @covers ::get_response_body
	 * @covers ::get_error_response_body
	 * @covers ::get_error_message
	 * @covers ::get_response_code
	 * @return void
	 */
	public function test_error_response_accessors() {
		$this->mock_http( $this->http_response( 422, array( 'message' => 'Bad input' ) ) );

		$request = ( new AiServiceRequest( 'x', array(), array(), 'https://example.test/' ) )->send();

		$this->assertFalse( $request->is_successful() );
		$this->assertNull( $request->get_response_body() );
		$this->assertSame( array( 'message' => 'Bad input' ), $request->get_error_response_body() );
		$this->assertSame( 'Bad input', $request->get_error_message() );
		$this->assertSame( 422, $request->get_response_code() );
	}

	/**
	 * Error response without a message falls back to a generic one.
	 *
	 * @covers ::get_error_message
	 * @return void
	 */
	public function test_error_message_defaults_when_missing() {
		$this->mock_http( $this->http_response( 500, array( 'other' => 'x' ) ) );

		$request = ( new AiServiceRequest( 'x', array(), array(), 'https://example.test/' ) )->send();

		$this->assertSame( 'An unknown error occurred', $request->get_error_message() );
	}

	/**
	 * Transport errors are treated as a 500 failure.
	 *
	 * @covers ::is_successful
	 * @covers ::get_response_code
	 * @covers ::get_error_message
	 * @return void
	 */
	public function test_wp_error_response_is_failure_with_500() {
		$this->mock_http( new \WP_Error( 'http_request_failed', 'boom' ) );

		$request = ( new AiServiceRequest( 'x', array(), array(), 'https://example.test/' ) )->send();

		$this->assertFalse( $request->is_successful() );
		$this->assertSame( 500, $request->get_response_code() );
		$this->assertNull( $request->get_response_body() );
		$this->assertSame( 'An unknown error occurred', $request->get_error_message() );
	}

	/**
	 * Before sending, the request is not successful.
	 *
	 * @covers ::is_successful
	 * @covers ::get_response_code
	 * @return void
	 */
	public function test_unsent_request_is_not_successful() {
		$request = new AiServiceRequest( 'x', array(), array(), 'https://example.test/' );

		$this->assertFalse( $request->is_successful() );
		$this->assertSame( 500, $request->get_response_code() );
	}
}
