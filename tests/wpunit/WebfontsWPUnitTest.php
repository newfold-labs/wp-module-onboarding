<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Services\Webfonts;

/**
 * Webfonts wpunit tests.
 *
 * Private helpers are exercised through reflection; they hold the CSS-building logic.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Services\Webfonts
 */
class WebfontsWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Call a private static Webfonts method.
	 *
	 * @param string $method Method name.
	 * @param array  $args   Arguments.
	 * @return mixed
	 */
	private function call( string $method, array $args = array() ) {
		$ref = new \ReflectionMethod( Webfonts::class, $method );
		$ref->setAccessible( true );
		return $ref->invokeArgs( null, $args );
	}

	/**
	 * Run a callback while capturing user-level errors triggered by validation.
	 *
	 * @param callable $callback Callback.
	 * @return array{result: mixed, errors: string[]}
	 */
	private function capture_errors( callable $callback ): array {
		$errors  = array();
		$handler = static function ( $errno, $errstr ) use ( &$errors ) {
			$errors[] = $errstr;
			return true;
		};
		set_error_handler( $handler, E_USER_NOTICE | E_USER_WARNING | E_USER_DEPRECATED );
		try {
			$result = $callback();
		} finally {
			restore_error_handler();
		}

		return array(
			'result' => $result,
			'errors' => $errors,
		);
	}

	/**
	 * Keys are converted to kebab-case.
	 */
	public function test_convert_keys_to_kebab_case() {
		$result = $this->call(
			'convert_keys_to_kebab_case',
			array(
				array(
					'fontFamily' => 'Inter',
					'fontWeight' => '400',
					'src'        => array( 'a.woff2' ),
				),
			)
		);

		$this->assertSame( 'Inter', $result['font-family'] );
		$this->assertSame( '400', $result['font-weight'] );
		$this->assertArrayHasKey( 'src', $result );
		$this->assertArrayNotHasKey( 'fontFamily', $result );
	}

	/**
	 * Non file:./ sources pass through untouched.
	 */
	public function test_transform_src_into_uri_leaves_external_urls() {
		$src = array( 'https://example.com/font.woff2', 'data:font/woff2;base64,AAAA' );

		$this->assertSame( $src, $this->call( 'transform_src_into_uri', array( $src ) ) );
	}

	/**
	 * file:./ sources are resolved against the theme.
	 */
	public function test_transform_src_into_uri_resolves_theme_relative_files() {
		$result = $this->call( 'transform_src_into_uri', array( array( 'file:./assets/fonts/a.woff2' ) ) );

		$this->assertStringStartsWith( 'http', $result[0] );
		$this->assertStringEndsWith( 'assets/fonts/a.woff2', $result[0] );
		$this->assertStringNotContainsString( 'file:./', $result[0] );
	}

	/**
	 * A valid webfont gets defaults and loses unknown properties.
	 */
	public function test_validate_webfont_applies_defaults_and_strips_unknown_props() {
		$result = $this->call(
			'validate_webfont',
			array(
				array(
					'font-family' => 'Inter',
					'src'         => 'inter.woff2',
					'bogus'       => 'x',
				),
			)
		);

		$this->assertIsArray( $result );
		$this->assertSame( 'normal', $result['font-style'] );
		$this->assertSame( '400', $result['font-weight'] );
		$this->assertSame( 'fallback', $result['font-display'] );
		$this->assertArrayNotHasKey( 'bogus', $result );
	}

	/**
	 * Unknown font-display values fall back to "fallback".
	 */
	public function test_validate_webfont_normalizes_invalid_font_display() {
		$result = $this->call(
			'validate_webfont',
			array(
				array(
					'font-family'  => 'Inter',
					'src'          => 'inter.woff2',
					'font-display' => 'nonsense',
				),
			)
		);

		$this->assertSame( 'fallback', $result['font-display'] );
	}

	/**
	 * Invalid webfonts are rejected with a notice.
	 *
	 * @dataProvider invalid_webfont_provider
	 *
	 * @param array $webfont Webfont args.
	 */
	public function test_validate_webfont_rejects_invalid_input( array $webfont ) {
		$out = $this->capture_errors(
			function () use ( $webfont ) {
				return $this->call( 'validate_webfont', array( $webfont ) );
			}
		);

		$this->assertFalse( $out['result'] );
		$this->assertNotEmpty( $out['errors'] );
	}

	/**
	 * Invalid webfont inputs.
	 *
	 * @return array
	 */
	public function invalid_webfont_provider(): array {
		return array(
			'missing family'    => array( array( 'src' => 'a.woff2' ) ),
			'missing src'       => array( array( 'font-family' => 'Inter' ) ),
			'empty src entry'   => array(
				array(
					'font-family' => 'Inter',
					'src'         => array( '  ' ),
				),
			),
			'non-scalar weight' => array(
				array(
					'font-family' => 'Inter',
					'src'         => 'a.woff2',
					'font-weight' => array( 400 ),
				),
			),
		);
	}

	/**
	 * Sources are ordered data, woff2, woff, ttf, eot, otf regardless of input order.
	 */
	public function test_order_src_orders_formats_for_browser_support() {
		$result = $this->call(
			'order_src',
			array(
				array(
					'src' => array(
						'https://example.com/a.otf',
						'https://example.com/a.ttf',
						'https://example.com/a.woff',
						'https://example.com/a.eot',
						'https://example.com/a.woff2',
						'data:font/woff2;base64,AAAA',
					),
				),
			)
		);

		$formats = wp_list_pluck( $result['src'], 'format' );
		$this->assertSame( array( 'data', 'woff2', 'woff', 'truetype', 'embedded-opentype', 'opentype' ), $formats );
	}

	/**
	 * Local URLs are made relative and format syntax differs for data URIs.
	 */
	public function test_compile_src_builds_local_and_url_sources() {
		$local = home_url( '/wp-content/fonts/a.woff2' );
		$src   = $this->call(
			'compile_src',
			array(
				'Inter',
				array(
					array(
						'url'    => $local,
						'format' => 'woff2',
					),
					array(
						'url'    => 'data:font/woff2;base64,AAAA',
						'format' => 'data',
					),
					array(
						'url'    => 'https://cdn.example.com/a.woff',
						'format' => 'woff',
					),
				),
			)
		);

		$this->assertStringStartsWith( 'local(Inter)', $src );
		$this->assertStringContainsString( "url('/wp-content/fonts/a.woff2') format('woff2')", $src );
		$this->assertStringContainsString( ', url(data:font/woff2;base64,AAAA)', $src );
		$this->assertStringContainsString( "url('https://cdn.example.com/a.woff') format('woff')", $src );
	}

	/**
	 * Font variation settings are concatenated.
	 */
	public function test_compile_variations() {
		$this->assertSame( '', $this->call( 'compile_variations', array( array() ) ) );
		$this->assertSame( 'wght 400', $this->call( 'compile_variations', array( array( 'wght' => 400 ) ) ) );
	}

	/**
	 * Family names with spaces are quoted, provider is dropped, empty values skipped.
	 */
	public function test_build_font_face_css_quotes_family_and_skips_internal_keys() {
		$css = $this->call(
			'build_font_face_css',
			array(
				array(
					'font-family'             => 'Open Sans',
					'font-weight'             => '700',
					'provider'                => 'local',
					'font-style'              => '',
					'font-variation-settings' => array( 'wght' => 700 ),
					'src'                     => array(
						array(
							'url'    => 'https://cdn.example.com/os.woff2',
							'format' => 'woff2',
						),
					),
				),
			)
		);

		$this->assertStringContainsString( 'font-family:"Open Sans";', $css );
		$this->assertStringContainsString( 'font-weight:700;', $css );
		$this->assertStringContainsString( 'font-variation-settings:wght 700;', $css );
		$this->assertStringContainsString( "src:local(\"Open Sans\"), url('https://cdn.example.com/os.woff2') format('woff2');", $css );
		$this->assertStringNotContainsString( 'provider', $css );
		$this->assertStringNotContainsString( 'font-style', $css );
	}

	/**
	 * Already-quoted families are not double-quoted.
	 */
	public function test_build_font_face_css_does_not_requote_family() {
		$css = $this->call(
			'build_font_face_css',
			array(
				array(
					'font-family' => "'Open Sans'",
					'src'         => array(),
				),
			)
		);

		$this->assertStringContainsString( "font-family:'Open Sans';", $css );
	}

	/**
	 * CSS from webfonts wraps each face in @font-face.
	 */
	public function test_get_css_from_webfonts_wraps_each_face() {
		$css = $this->call(
			'get_css_from_webfonts',
			array(
				array(
					array(
						'font-family' => 'Inter',
						'src'         => array( 'https://cdn.example.com/a.woff2' ),
					),
					array(
						'font-family' => 'Lora',
						'src'         => array( 'https://cdn.example.com/b.woff2' ),
					),
				),
			)
		);

		$this->assertSame( 2, substr_count( $css, '@font-face{' ) );
		$this->assertSame( '', $this->call( 'get_css_from_webfonts', array( array() ) ) );
	}

	/**
	 * Theme webfonts getters return the documented shapes.
	 */
	public function test_theme_json_webfont_getters_return_expected_types() {
		$this->assertIsArray( Webfonts::get_webfonts_from_theme_json() );
		$this->assertIsArray( Webfonts::get_registered_webfonts_from_theme_json() );

		$css = Webfonts::get_wp_theme_json_webfonts_css();
		$this->assertTrue( false === $css || ( is_string( $css ) && '' !== $css ) );
	}

	/**
	 * Invalid webfonts are dropped from the registered list rather than registered as junk.
	 */
	public function test_get_registered_webfonts_skips_invalid_webfonts() {
		$inject = static function ( $theme_json ) {
			return $theme_json->update_with(
				array(
					'version'  => \WP_Theme_JSON::LATEST_SCHEMA,
					'settings' => array(
						'typography' => array(
							'fontFamilies' => array(
								array(
									'fontFamily' => 'Inter, sans-serif',
									'name'       => 'Inter',
									'slug'       => 'inter',
									'fontFace'   => array(
										array(
											'fontFamily' => 'Inter',
											'fontWeight' => '400',
											'src'        => array( 'https://cdn.example.com/inter.woff2' ),
										),
										array(
											'fontFamily' => '',
											'src'        => array( 'https://cdn.example.com/broken.woff2' ),
										),
									),
								),
							),
						),
					),
				)
			);
		};
		add_filter( 'wp_theme_json_data_theme', $inject );
		\WP_Theme_JSON_Resolver::clean_cached_data();

		$out = $this->capture_errors(
			static function () {
				return Webfonts::get_registered_webfonts_from_theme_json();
			}
		);

		remove_filter( 'wp_theme_json_data_theme', $inject );
		\WP_Theme_JSON_Resolver::clean_cached_data();

		$families = wp_list_pluck( $out['result'], 'font-family' );
		$this->assertContains( 'Inter', $families );
		foreach ( $out['result'] as $webfont ) {
			$this->assertNotEmpty( $webfont['font-family'], 'Invalid webfonts must not be registered' );
		}
	}
}
