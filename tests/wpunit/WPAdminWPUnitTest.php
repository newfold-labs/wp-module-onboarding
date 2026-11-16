<?php

namespace NewfoldLabs\WP\Module\Onboarding;

/**
 * WP_Admin wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\WP_Admin
 */
class WPAdminWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Original $pagenow.
	 *
	 * @var mixed
	 */
	private $original_pagenow;

	/**
	 * Set up.
	 *
	 * @return void
	 */
	public function setUp(): void {
		parent::setUp();
		global $pagenow;
		$this->original_pagenow = $pagenow;
	}

	/**
	 * Tear down.
	 *
	 * @return void
	 */
	public function tearDown(): void {
		global $pagenow;
		$pagenow = $this->original_pagenow; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
		unset( $_GET['page'], $_GET['referrer'] );
		delete_option( 'nfd_module_onboarding_editor_fontpair' );
		remove_all_filters( 'pre_http_request' );
		parent::tearDown();
	}

	/**
	 * Call a private static method.
	 *
	 * @param string $method Method.
	 * @param array  $args   Args.
	 * @return mixed
	 */
	private function call( string $method, array $args = array() ) {
		$ref = new \ReflectionMethod( WP_Admin::class, $method );
		$ref->setAccessible( true );
		return $ref->invokeArgs( null, $args );
	}

	/**
	 * The constructor taps the expected WordPress hooks.
	 */
	public function test_constructor_registers_hooks() {
		$admin = new WP_Admin();

		$this->assertNotFalse( has_action( 'init', array( WP_Admin::class, 'load_php_textdomain' ) ) );
		$this->assertNotFalse( has_action( 'admin_menu', array( WP_Admin::class, 'register_page' ) ) );
		$this->assertNotFalse( has_action( 'load-dashboard_page_' . WP_Admin::$slug, array( WP_Admin::class, 'page_title' ) ) );
		$this->assertNotFalse( has_action( 'load-dashboard_page_' . WP_Admin::$slug, array( WP_Admin::class, 'initialize' ) ) );
		$this->assertNotFalse( has_action( 'load-dashboard_page_' . WP_Admin::$slug, array( WP_Admin::class, 'hide_admin_chrome' ) ) );
		$this->assertNotFalse( has_action( 'admin_enqueue_scripts', array( WP_Admin::class, 'enqueue_site_editor_assets' ) ) );
		$this->assertNotFalse( has_filter( 'wp_kses_allowed_html', array( WP_Admin::class, 'add_svg_support_to_kses' ) ) );
		$this->assertInstanceOf( WP_Admin::class, $admin );
	}

	/**
	 * No transient hooks are registered that point at callbacks which do not exist.
	 */
	public function test_constructor_registers_no_dangling_transient_hooks() {
		new WP_Admin();

		$this->assertFalse( has_action( 'pre_set_transient_wba_templates_categories' ) );
		$this->assertFalse( method_exists( WP_Admin::class, 'filter_wonder_blocks_categories_transient' ) );
		$this->assertFalse( method_exists( WP_Admin::class, 'pre_set_filter_wonder_blocks_transients' ) );
	}

	/**
	 * The page slug is stable.
	 */
	public function test_slug() {
		$this->assertSame( 'nfd-onboarding', WP_Admin::$slug );
	}

	/**
	 * register_page adds a hidden submenu page for admins.
	 */
	public function test_register_page_registers_hidden_page() {
		wp_set_current_user( self::factory()->user->create( array( 'role' => 'administrator' ) ) );
		global $_registered_pages;

		WP_Admin::register_page();

		$this->assertArrayHasKey( 'admin_page_' . WP_Admin::$slug, (array) $_registered_pages );
	}

	/**
	 * The page title is only set for the onboarding page.
	 */
	public function test_page_title_only_applies_to_onboarding_page() {
		global $title;
		$title = 'Original'; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited

		$_GET['page'] = 'other-page';
		WP_Admin::page_title();
		$this->assertSame( 'Original', $title );

		$_GET['page'] = WP_Admin::$slug;
		WP_Admin::page_title();
		$this->assertSame( 'Onboarding', $title );
	}

	/**
	 * Chrome is hidden through an early admin_head style.
	 */
	public function test_hide_admin_chrome_adds_admin_head_styles() {
		WP_Admin::hide_admin_chrome();

		ob_start();
		do_action( 'admin_head' );
		$output = ob_get_clean();

		$this->assertStringContainsString( '#adminmenumain', $output );
		$this->assertStringContainsString( 'display: none !important', $output );
		$this->assertStringContainsString( 'dashboard_page_nfd-onboarding', $output );
	}

	/**
	 * The loading screen is a non-empty template string.
	 */
	public function test_is_loading_returns_template_markup() {
		$markup = WP_Admin::is_loading();

		$this->assertIsString( $markup );
		$this->assertStringContainsString( 'nfd-loading', $markup );
	}

	/**
	 * Render outputs the SPA mount point between marker comments.
	 */
	public function test_render_outputs_mount_point() {
		ob_start();
		WP_Admin::render();
		$output = ob_get_clean();

		$this->assertStringContainsString( '<!-- NFD:ONBOARDING -->', $output );
		$this->assertStringContainsString( '<div id="nfd-onboarding" class="nfd-onboarding-container">', $output );
		$this->assertStringContainsString( '<!-- /NFD:ONBOARDING -->', $output );
	}

	/**
	 * Block assets hook fires the patterns utilities action.
	 */
	public function test_enqueue_block_assets_fires_utilities_action() {
		$fired = 0;
		add_action(
			'enqueue_nfd_wonder_blocks_utilities',
			static function () use ( &$fired ) {
				++$fired;
			}
		);

		WP_Admin::enqueue_block_assets();

		$this->assertSame( 1, $fired );
	}

	/**
	 * SVG elements are only whitelisted for the post context.
	 */
	public function test_add_svg_support_to_kses() {
		$tags = array( 'p' => array() );

		$this->assertSame( $tags, WP_Admin::add_svg_support_to_kses( $tags, 'data' ) );

		$result = WP_Admin::add_svg_support_to_kses( $tags, 'post' );
		$this->assertArrayHasKey( 'p', $result );
		foreach ( array( 'svg', 'path', 'rect', 'circle' ) as $tag ) {
			$this->assertArrayHasKey( $tag, $result );
		}
		$this->assertTrue( $result['svg']['viewbox'] );
		$this->assertTrue( $result['path']['d'] );
		$this->assertTrue( $result['circle']['r'] );
	}

	/**
	 * Existing svg attributes are preserved when merging.
	 */
	public function test_add_svg_support_to_kses_preserves_existing_svg_attributes() {
		$result = WP_Admin::add_svg_support_to_kses( array( 'svg' => array( 'custom' => true ) ), 'post' );

		$this->assertTrue( $result['svg']['custom'] );
		$this->assertTrue( $result['svg']['xmlns'] );
	}

	/**
	 * Site editor assets are skipped on other screens or for unknown referrers.
	 */
	public function test_enqueue_site_editor_assets_requires_site_editor_and_referrer() {
		global $pagenow;

		$pagenow          = 'index.php'; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
		$_GET['referrer'] = 'nfd-onboarding';
		WP_Admin::enqueue_site_editor_assets();
		$this->assertFalse( wp_script_is( 'nfd-design-studio', 'registered' ) );

		$pagenow          = 'site-editor.php'; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
		$_GET['referrer'] = 'evil-referrer';
		WP_Admin::enqueue_site_editor_assets();
		$this->assertFalse( wp_script_is( 'nfd-design-studio', 'registered' ) );
	}

	/**
	 * Site editor assets are enqueued for an allowed referrer on the site editor.
	 *
	 * The built asset manifest is not guaranteed to exist (CI does not build), so a minimal
	 * one is written to the configured build dir (or a temp dir when the constants are unset)
	 * for the duration of the test.
	 */
	public function test_enqueue_site_editor_assets_enqueues_design_studio_for_allowed_referrer() {
		if ( ! defined( 'NFD_ONBOARDING_BUILD_DIR' ) ) {
			define( 'NFD_ONBOARDING_BUILD_DIR', sys_get_temp_dir() . '/nfd-onboarding-test-build' );
		}
		if ( ! defined( 'NFD_ONBOARDING_BUILD_URL' ) ) {
			define( 'NFD_ONBOARDING_BUILD_URL', 'http://example.org/build' );
		}

		$dir_created  = false;
		$file_created = false;
		$asset_file   = NFD_ONBOARDING_BUILD_DIR . '/onboarding-design-studio.asset.php';

		if ( ! is_dir( NFD_ONBOARDING_BUILD_DIR ) ) {
			$dir_created = wp_mkdir_p( NFD_ONBOARDING_BUILD_DIR );
		}
		if ( ! is_readable( $asset_file ) ) {
			$file_created = false !== @file_put_contents( $asset_file, "<?php return array( 'dependencies' => array(), 'version' => 'test' );" ); // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged, WordPress.WP.AlternativeFunctions.file_system_operations_file_put_contents
		}
		if ( ! is_readable( $asset_file ) ) {
			$this->markTestSkipped( 'Cannot create a design studio asset manifest.' );
		}

		try {
			global $pagenow;
			$pagenow          = 'site-editor.php'; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
			$_GET['referrer'] = 'nfd-plugin';

			WP_Admin::enqueue_site_editor_assets();

			$this->assertTrue( wp_script_is( 'nfd-design-studio', 'enqueued' ) );
			$this->assertTrue( wp_style_is( 'nfd-design-studio', 'enqueued' ) );
		} finally {
			wp_dequeue_script( 'nfd-design-studio' );
			wp_deregister_script( 'nfd-design-studio' );
			wp_dequeue_style( 'nfd-design-studio' );
			wp_deregister_style( 'nfd-design-studio' );
			if ( $file_created ) {
				@unlink( $asset_file ); // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged, WordPress.WP.AlternativeFunctions.unlink_unlink
			}
			if ( $dir_created ) {
				@rmdir( NFD_ONBOARDING_BUILD_DIR ); // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged, WordPress.WP.AlternativeFunctions.rmdir_rmdir
			}
		}
	}

	/**
	 * Cached font data is enqueued as an inline @font-face style.
	 */
	public function test_enqueue_preview_fonts_enqueues_cached_fonts() {
		update_option( 'nfd_module_onboarding_editor_fontpair', array( array( 'font_heading_name' => 'Lora', 'font_content_name' => 'Lora' ) ) );
		set_transient(
			'nfd_font_data_' . sanitize_key( 'Lora' ),
			array(
				'wp_json' => array(
					'name'     => 'Lora',
					'fontFace' => array(
						array(
							'fontFamily' => 'Lora',
							'fontWeight' => '400',
							'fontStyle'  => 'normal',
							'src'        => array( 'https://example.com/lora.woff2' ),
						),
					),
				),
			),
			HOUR_IN_SECONDS
		);

		$this->call( 'enqueue_preview_fonts' );

		$handle = 'nfd-font-lora';
		$this->assertTrue( wp_style_is( $handle, 'enqueued' ) );
		$inline = wp_styles()->get_data( $handle, 'after' );
		$css    = is_array( $inline ) ? implode( '', $inline ) : (string) $inline;
		$this->assertStringContainsString( 'font-family: "Lora"', $css );
		$this->assertStringContainsString( 'url("https://example.com/lora.woff2") format("woff2")', $css );
		$this->assertStringContainsString( 'font-display: swap', $css );

		delete_transient( 'nfd_font_data_' . sanitize_key( 'Lora' ) );
	}

	/**
	 * Uncached fonts are fetched, cached on success, and skipped on failure.
	 */
	public function test_enqueue_preview_fonts_fetches_missing_fonts() {
		update_option( 'nfd_module_onboarding_editor_fontpair', array( array( 'font_heading_name' => 'Nunito' ) ) );
		$body = array(
			'wp_json' => array(
				'name'     => 'Nunito',
				'fontFace' => array(
					array(
						'fontFamily' => 'Nunito',
						'src'        => array( 'https://example.com/nunito.woff2' ),
					),
				),
			),
		);
		add_filter(
			'pre_http_request',
			static function () use ( $body ) {
				return array(
					'headers'  => array(),
					'body'     => wp_json_encode( $body ),
					'response' => array(
						'code'    => 200,
						'message' => 'OK',
					),
					'cookies'  => array(),
					'filename' => null,
				);
			}
		);

		$this->call( 'enqueue_preview_fonts' );

		$this->assertTrue( wp_style_is( 'nfd-font-nunito', 'enqueued' ) );
		$this->assertIsArray( get_transient( 'nfd_font_data_nunito' ) );
		delete_transient( 'nfd_font_data_nunito' );
	}

	/**
	 * Failed font fetches are ignored.
	 */
	public function test_enqueue_preview_fonts_ignores_failed_fetches() {
		update_option( 'nfd_module_onboarding_editor_fontpair', array( array( 'font_heading_name' => 'Missing Font' ) ) );
		add_filter(
			'pre_http_request',
			static function () {
				return new \WP_Error( 'http_request_failed', 'down' );
			}
		);

		$this->call( 'enqueue_preview_fonts' );

		$this->assertFalse( wp_style_is( 'nfd-font-missing-font', 'enqueued' ) );
	}

	/**
	 * Without stored font pairs nothing is enqueued or fetched.
	 */
	public function test_enqueue_preview_fonts_with_no_font_pairs_is_noop() {
		delete_option( 'nfd_module_onboarding_editor_fontpair' );
		add_filter(
			'pre_http_request',
			function () {
				$this->fail( 'No HTTP request expected.' );
			}
		);

		$this->call( 'enqueue_preview_fonts' );

		$this->assertTrue( true );
	}
}
