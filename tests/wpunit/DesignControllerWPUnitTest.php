<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\RestApi\DesignController;

/**
 * DesignController wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\RestApi\DesignController
 */
class DesignControllerWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	const PALETTES_OPTION = 'nfd_module_onboarding_editor_colorpalette';
	const FONTS_OPTION    = 'nfd_module_onboarding_editor_fontpair';

	/**
	 * Controller under test.
	 *
	 * @var DesignController
	 */
	private $controller;

	/**
	 * Set up.
	 *
	 * @return void
	 */
	public function setUp(): void {
		parent::setUp();
		$this->controller = new DesignController();
		$this->clear_cache();
	}

	/**
	 * Tear down.
	 *
	 * @return void
	 */
	public function tearDown(): void {
		$this->clear_cache();
		delete_option( self::PALETTES_OPTION );
		delete_option( self::FONTS_OPTION );
		remove_all_filters( 'pre_http_request' );
		parent::tearDown();
	}

	/**
	 * Remove cached Hiive transients.
	 *
	 * @return void
	 */
	private function clear_cache(): void {
		foreach ( array( 'nfd_hiive_color_palettes', 'nfd_hiive_font_pairs', 'nfd_hiive_colors', 'nfd_hiive_fonts' ) as $key ) {
			delete_transient( $key );
		}
	}

	/**
	 * Build a request with optional referer.
	 *
	 * @param string|null $referer  Referer header.
	 * @param int         $page     Page.
	 * @param int         $per_page Per page.
	 * @return \WP_REST_Request
	 */
	private function request( ?string $referer, int $page = 1, int $per_page = 10 ): \WP_REST_Request {
		$request = new \WP_REST_Request( 'GET', '/newfold-onboarding/v1/design/color-palettes' );
		if ( null !== $referer ) {
			$request->set_header( 'Referer', $referer );
		}
		$request->set_param( 'page', $page );
		$request->set_param( 'per_page', $per_page );

		return $request;
	}

	/**
	 * Mock the Hiive HTTP response.
	 *
	 * @param mixed $body_or_error Array/string body or WP_Error.
	 * @return void
	 */
	private function mock_hiive( $body_or_error ): void {
		add_filter(
			'pre_http_request',
			static function () use ( $body_or_error ) {
				if ( is_wp_error( $body_or_error ) ) {
					return $body_or_error;
				}
				return array(
					'headers'  => array(),
					'body'     => is_string( $body_or_error ) ? $body_or_error : wp_json_encode( $body_or_error ),
					'response' => array(
						'code'    => 200,
						'message' => 'OK',
					),
					'cookies'  => array(),
					'filename' => null,
				);
			}
		);
	}

	/**
	 * A sample stored palette.
	 *
	 * @return array
	 */
	private function sample_palette(): array {
		return array(
			'base'     => '#ffffff',
			'contrast' => '#000000',
			'accent_2' => '#ff0000',
			'accent_5' => '#00ff00',
		);
	}

	/**
	 * Routes are registered with validated args.
	 */
	public function test_register_routes_registers_design_routes() {
		global $wp_rest_server;
		$wp_rest_server = null;
		add_action( 'rest_api_init', array( $this->controller, 'register_routes' ) );

		$routes = rest_get_server()->get_routes();

		$this->assertArrayHasKey( '/newfold-onboarding/v1/design/color-palettes', $routes );
		$this->assertArrayHasKey( '/newfold-onboarding/v1/design/font-pairs', $routes );

		$wp_rest_server = null;
	}

	/**
	 * Out-of-range pagination args are rejected by the route validators.
	 */
	public function test_routes_reject_invalid_pagination_args() {
		global $wp_rest_server;
		$wp_rest_server = null;
		add_action( 'rest_api_init', array( $this->controller, 'register_routes' ) );
		wp_set_current_user( self::factory()->user->create( array( 'role' => 'administrator' ) ) );

		$request = new \WP_REST_Request( 'GET', '/newfold-onboarding/v1/design/font-pairs' );
		$request->set_param( 'per_page', 500 );
		$response = rest_get_server()->dispatch( $request );

		$this->assertSame( 400, $response->get_status() );

		$wp_rest_server = null;
	}

	/**
	 * Requests without a referer are rejected.
	 */
	public function test_requests_without_referer_return_400() {
		foreach ( array( 'get_color_palettes', 'get_font_pairs' ) as $method ) {
			$result = $this->controller->$method( $this->request( null ) );
			$this->assertWPError( $result );
			$this->assertSame( 'invalid_referer', $result->get_error_code() );
			$this->assertSame( 400, $result->get_error_data()['status'] );
		}
	}

	/**
	 * Onboarding referers read palettes from options and format them.
	 */
	public function test_color_palettes_from_options_are_formatted_and_paginated() {
		update_option( self::PALETTES_OPTION, array( $this->sample_palette(), $this->sample_palette(), $this->sample_palette() ) );

		$response = $this->controller->get_color_palettes( $this->request( 'http://example.org/wp-admin/index.php?page=nfd-onboarding', 2, 2 ) );

		$this->assertInstanceOf( \WP_REST_Response::class, $response );
		$data = $response->get_data();
		$this->assertCount( 1, $data['data'] );
		$this->assertSame( 'Palette 3', $data['data'][0]['name'] );
		$this->assertCount( 4, $data['data'][0]['displayColors'] );
		$this->assertSame( 'base', $data['data'][0]['palette'][0]['slug'] );
		$this->assertSame( 3, $data['pagination']['total_items'] );
		$this->assertEquals( 2, $data['pagination']['total_pages'] );
		$this->assertSame( 2, $data['pagination']['current_page'] );
		$this->assertSame( 3, $response->get_headers()['X-WP-Total'] );
	}

	/**
	 * With no stored palettes the onboarding path falls back to theme.json.
	 */
	public function test_color_palettes_fall_back_to_theme_json_when_no_options() {
		delete_option( self::PALETTES_OPTION );

		$response = $this->controller->get_color_palettes( $this->request( 'http://example.org/?page=nfd-onboarding' ) );

		$this->assertInstanceOf( \WP_REST_Response::class, $response );
		$this->assertArrayHasKey( 'data', $response->get_data() );
	}

	/**
	 * Font pairs come from options for onboarding referers, or 404 when absent.
	 */
	public function test_font_pairs_from_options() {
		$missing = $this->controller->get_font_pairs( $this->request( 'http://example.org/?page=nfd-onboarding' ) );
		$this->assertWPError( $missing );
		$this->assertSame( 'no_font_pairs', $missing->get_error_code() );

		update_option( self::FONTS_OPTION, array( array( 'font_heading_name' => 'Lora' ), array( 'font_heading_name' => 'Inter' ) ) );
		$response = $this->controller->get_font_pairs( $this->request( 'http://example.org/?page=nfd-onboarding', 1, 1 ) );

		$this->assertCount( 1, $response->get_data()['data'] );
		$this->assertEquals( 2, $response->get_data()['pagination']['total_pages'] );
	}

	/**
	 * Other referers fetch palettes from Hiive, drop invalid ones and cache the result.
	 */
	public function test_color_palettes_from_hiive_filter_invalid_and_cache() {
		$this->mock_hiive(
			array(
				'data' => array(
					array(
						'name'    => 'Good',
						'palette' => array( 'a', 'b', 'c', 'd', 'e' ),
					),
					array(
						'name'    => 'Too short',
						'palette' => array( 'a' ),
					),
					array( 'palette' => array( 'a', 'b', 'c', 'd' ) ),
				),
			)
		);

		$response = $this->controller->get_color_palettes( $this->request( 'http://example.org/wp-admin/admin.php?page=nfd-plugin' ) );

		$data = $response->get_data()['data'];
		$this->assertCount( 1, $data );
		$this->assertSame( 'Good', $data[0]['name'] );
		$this->assertSame( array( 'a', 'b', 'c', 'd' ), $data[0]['displayColors'] );
		$this->assertIsArray( get_transient( 'nfd_hiive_color_palettes' ) );
	}

	/**
	 * Cached palettes are used without hitting the API.
	 */
	public function test_color_palettes_use_cached_hiive_data() {
		set_transient(
			'nfd_hiive_color_palettes',
			array(
				array(
					'name'          => 'Cached',
					'palette'       => array(),
					'displayColors' => array(),
				),
			),
			HOUR_IN_SECONDS
		);
		$this->mock_hiive( new \WP_Error( 'should_not_be_called', 'no network' ) );

		$response = $this->controller->get_color_palettes( $this->request( 'http://example.org/?page=nfd-plugin' ) );

		$this->assertSame( 'Cached', $response->get_data()['data'][0]['name'] );
	}

	/**
	 * A Hiive failure for palettes falls back to theme.json rather than erroring.
	 */
	public function test_color_palettes_fall_back_to_theme_json_on_hiive_error() {
		$this->mock_hiive( new \WP_Error( 'http_request_failed', 'down' ) );

		$response = $this->controller->get_color_palettes( $this->request( 'http://example.org/?page=nfd-plugin' ) );

		$this->assertInstanceOf( \WP_REST_Response::class, $response );
	}

	/**
	 * Font pairs are fetched from Hiive and cached.
	 */
	public function test_font_pairs_from_hiive_are_cached() {
		$this->mock_hiive( array( 'data' => array( array( 'font_heading_name' => 'Lora' ) ) ) );

		$response = $this->controller->get_font_pairs( $this->request( 'http://example.org/?page=nfd-plugin' ) );

		$this->assertSame( 'Lora', $response->get_data()['data'][0]['font_heading_name'] );
		$this->assertIsArray( get_transient( 'nfd_hiive_font_pairs' ) );
	}

	/**
	 * Hiive transport errors surface as a 502.
	 */
	public function test_font_pairs_hiive_http_error_returns_502() {
		$this->mock_hiive( new \WP_Error( 'http_request_failed', 'down' ) );

		$result = $this->controller->get_font_pairs( $this->request( 'http://example.org/?page=nfd-plugin' ) );

		$this->assertWPError( $result );
		$this->assertSame( 'hiive_api_error', $result->get_error_code() );
		$this->assertSame( 502, $result->get_error_data()['status'] );
	}

	/**
	 * Unparseable Hiive bodies surface as a 502 and are not cached.
	 */
	public function test_font_pairs_hiive_bad_json_returns_502() {
		$this->mock_hiive( '<html>not json</html>' );

		$result = $this->controller->get_font_pairs( $this->request( 'http://example.org/?page=nfd-plugin' ) );

		$this->assertWPError( $result );
		$this->assertSame( 'json_parse_error', $result->get_error_code() );
		$this->assertFalse( get_transient( 'nfd_hiive_fonts' ) );
	}

	/**
	 * Pagination math and headers.
	 */
	public function test_paginate_response_calculates_pages_and_headers() {
		$method = new \ReflectionMethod( DesignController::class, 'paginate_response' );
		$method->setAccessible( true );

		$response = $method->invoke( $this->controller, range( 1, 25 ), 3, 10 );

		$this->assertSame( array( 21, 22, 23, 24, 25 ), $response->get_data()['data'] );
		$this->assertEquals( 3, $response->get_data()['pagination']['total_pages'] );
		$this->assertSame( 25, $response->get_headers()['X-WP-Total'] );
		$this->assertEquals( 3, $response->get_headers()['X-WP-TotalPages'] );
	}
}
