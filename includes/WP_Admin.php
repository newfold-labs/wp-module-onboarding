<?php
namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Data\Bluehost;
use NewfoldLabs\WP\Module\Onboarding\Services\PluginService;
use NewfoldLabs\WP\Module\Onboarding\Services\ThemeService;
use NewfoldLabs\WP\Module\Onboarding\Services\I18nService;
use NewfoldLabs\WP\Module\Onboarding\Services\ReduxStateService;
use NewfoldLabs\WP\Module\Onboarding\Data\Runtime;
use NewfoldLabs\WP\Module\Patterns\SiteClassification as PatternsSiteClassification;

/**
 * Register Admin Page, Assets & Admin functionality with WordPress.
 */
final class WP_Admin {

	/**
	 * Identifier for page and assets.
	 *
	 * @var string
	 */
	public static $slug = 'nfd-onboarding';

	/**
	 * Array of allowed referrers
	 *
	 * @var array
	 */
	protected static $allowed_referrers = array(
		'nfd-onboarding',
		'nfd-plugin',
	);

	/**
	 * Tap WordPress Hooks
	 *
	 * @return void
	 */
	public function __construct() {
		\add_action( 'init', array( __CLASS__, 'load_php_textdomain' ) );
		\add_action( 'admin_menu', array( __CLASS__, 'register_page' ) );
		\add_action( 'load-dashboard_page_' . self::$slug, array( __CLASS__, 'page_title' ), 9, 1 );
		\add_action( 'load-dashboard_page_' . self::$slug, array( __CLASS__, 'initialize' ) );
		\add_action( 'load-dashboard_page_' . self::$slug, array( __CLASS__, 'hide_admin_chrome' ) );
		\add_action( 'admin_enqueue_scripts', array( __CLASS__, 'enqueue_site_editor_assets' ) );

		self::pre_set_filter_wonder_blocks_transients();
	}

	/**
	 * Loads the textdomain for the module. This applies only to PHP strings.
	 *
	 * @return boolean
	 */
	public static function load_php_textdomain() {
		return I18nService::load_php_translations(
			'wp-module-onboarding',
			NFD_ONBOARDING_PLUGIN_DIRNAME . '/vendor/newfold-labs/wp-module-onboarding/languages'
		);
	}

	/**
	 * Register WordPress Admin Page.
	 *
	 * By passing null to add_submenu_page, the page isn't displayed in the left Admin Menu,
	 * but is available from /wp-admin/index.php?page=nfd-onboarding.
	 *
	 * @return void
	 */
	public static function register_page() {
		\add_submenu_page(
			'',
			\__( 'Onboarding', 'wp-module-onboarding' ),
			\__( 'Onboarding', 'wp-module-onboarding' ),
			Permissions::ADMIN,
			self::$slug,
			array( __CLASS__, 'render' ),
			100
		);
	}

	/**
	 * Set the page title for the Onboarding page.
	 *
	 * @return void
	 * */
	public static function page_title() {
		if ( isset( $_GET['page'] ) && \sanitize_text_field( wp_unslash( $_GET['page'] ) ) === self::$slug ) {
			global $title;
			$title = \__( 'Onboarding', 'wp-module-onboarding' ); // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
		}
	}

	/**
	 * Hide WP admin chrome (sidebar, toolbar, notices) immediately via admin_head
	 * so there is no flash before the onboarding overlay renders.
	 *
	 * @return void
	 */
	public static function hide_admin_chrome() {
		\add_action(
			'admin_head',
			static function () {
				echo '<style>
					#adminmenumain, #wpadminbar, #wpfooter,
					.notice, .update-nag, #screen-meta { display: none !important; }
					html.wp-toolbar { padding-top: 0 !important; }
					#wpcontent, #wpbody-content { margin-left: 0 !important; padding: 0 !important; }
					body.dashboard_page_nfd-onboarding {
						overflow: hidden;
						background: linear-gradient(180deg, #fff 0%, #f5f8ff 50%, #edf2ff 100%);
					}
				</style>';
			},
			1
		);
	}

	/**
	 * Render a loading screen.
	 *
	 * @return string
	 */
	public static function is_loading() {
		ob_start();
		include __DIR__ . '/Templates/loading-screen.php';
		return ob_get_clean();
	}

	/**
	 * Render DOM element for React SPA mount.
	 *
	 * @return void
	 */
	public static function render() {
		echo PHP_EOL;
		echo '<!-- NFD:ONBOARDING -->';
		echo PHP_EOL;
		echo '<div id="nfd-onboarding" class="nfd-onboarding-container">' . self::is_loading() . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo PHP_EOL;
		echo '<!-- /NFD:ONBOARDING -->';
		echo PHP_EOL;
	}

	/**
	 * Register built assets with WP_Dependency system.
	 *
	 * @return void
	 */
	public static function register_assets() {
		global $current_screen;

		$current_screen->is_block_editor( true );

		$asset_file = NFD_ONBOARDING_BUILD_DIR . '/onboarding.asset.php';

		if ( is_readable( $asset_file ) ) {
			$asset = include_once $asset_file;

			\wp_register_script(
				self::$slug,
				NFD_ONBOARDING_BUILD_URL . '/onboarding.js',
				array_merge( $asset['dependencies'], array() ),
				$asset['version'],
				true
			);

			I18nService::load_js_translations(
				'wp-module-onboarding',
				self::$slug,
				NFD_ONBOARDING_DIR . '/languages'
			);

			$nfd_onboarding_data = array(
				'runtime' => Runtime::get_data(),
			);
			\wp_add_inline_script(
				self::$slug,
				'var nfdOnboarding =' . wp_json_encode( $nfd_onboarding_data ) . ';',
				'before'
			);

			\wp_register_style(
				self::$slug,
				NFD_ONBOARDING_BUILD_URL . '/onboarding.css',
				array( 'wp-components', 'wp-editor', 'wp-edit-blocks' ),
				$asset['version']
			);

			wp_add_inline_script(
				'wp-blocks',
				'wp.blocks.unstable__bootstrapServerSideBlockDefinitions(' . wp_json_encode( get_block_editor_server_block_settings() ) . ');'
			);

			// Preload server-registered block bindings sources.
			$registered_sources = get_all_registered_block_bindings_sources();
			if ( ! empty( $registered_sources ) ) {
				$filtered_sources = array();
				foreach ( $registered_sources as $source ) {
					$filtered_sources[] = array(
						'name'        => $source->name,
						'label'       => $source->label,
						'usesContext' => $source->uses_context,
					);
				}
				$script = sprintf( 'for ( const source of %s ) { wp.blocks.registerBlockBindingsSource( source ); }', wp_json_encode( $filtered_sources ) );
				wp_add_inline_script(
					'wp-blocks',
					$script
				);
			}

			\wp_enqueue_script( self::$slug );
			\wp_enqueue_style( self::$slug );

			\add_action( 'enqueue_block_assets', array( __CLASS__, 'enqueue_block_assets' ) );
		}
	}

	/**
	 * Enqueues the block assets for the live previews.
	 *
	 * @return void
	 */
	public static function enqueue_block_assets() {
		// This hook exists in the patterns module.
		\do_action( 'enqueue_nfd_wonder_blocks_utilities' );
	}

	/**
	 * Redirects to the brand plugin page (WP Admin).
	 *
	 * @return void
	 */
	public static function exit_to_dashboard(): bool {
		$brand_plugin_url          = Bluehost::get_plugin_dashboard_page();
		$dashboard_redirect_params = 'referrer=' . self::$slug;

		// Redirect to the brand plugin page.
		wp_redirect(
			apply_filters(
				'nfd_build_url',
				$brand_plugin_url . '&' . $dashboard_redirect_params
			)
		);
		exit;
	}

	/**
	 * Initialize Plugins and Themes if necessary.
	 *
	 * @return void
	 */
	public static function initialize() {
		if ( ! empty( $_GET['nfd_plugins'] ) && 'true' === sanitize_text_field( $_GET['nfd_plugins'] ) ) {
			PluginService::initialize();
		}

		// Install and activate the default theme.
		$default_theme_installation_result = ThemeService::initialize();
		if ( ! $default_theme_installation_result ) {
			self::exit_to_dashboard();
		}

		self::register_assets();
	}

	/**
	 * Enqueue site editor specific assets when coming from onboarding.
	 *
	 * @return void
	 */
	public static function enqueue_site_editor_assets() {
		global $pagenow;

		// Only proceed if we're on site-editor.php and have the right referrer
		if ( 'site-editor.php' === $pagenow &&
			isset( $_GET['referrer'] ) &&
			in_array( $_GET['referrer'], self::$allowed_referrers, true )
		) {

			$asset_file = NFD_ONBOARDING_BUILD_DIR . '/onboarding-design-studio.asset.php';

			if ( is_readable( $asset_file ) ) {
				$asset = include_once $asset_file;

				\wp_register_script(
					'nfd-design-studio',
					NFD_ONBOARDING_BUILD_URL . '/onboarding-design-studio.js',
					$asset['dependencies'] ?? array( 'wp-editor', 'wp-blocks', 'wp-components' ),
					$asset['version'] ?? '1.0.0',
					true
				);

				\wp_register_style(
					'nfd-design-studio',
					NFD_ONBOARDING_BUILD_URL . '/onboarding-design-studio.css.css',
					array( 'wp-components' ),
					$asset['version'] ?? '1.0.0'
				);

				\wp_enqueue_script( 'nfd-design-studio' );
				\wp_enqueue_style( 'nfd-design-studio' );

				// Enqueue fonts for preview
				self::enqueue_preview_fonts();
			}
		}
	}

	/**
	 * Enqueue all available fonts for preview in design studio
	 *
	 * @return void
	 */
	private static function enqueue_preview_fonts() {

		$hiive_api_base = defined( 'NFD_DATA_WB_DEV_MODE' ) && NFD_DATA_WB_DEV_MODE
			? 'http://patterns-platform.test/api/v1'
			: 'https://paterns.hiive.cloud/api/v1';

		$font_pairs   = get_option( 'nfd_module_onboarding_editor_fontpair' );
		$unique_fonts = array();

		if ( $font_pairs && is_array( $font_pairs ) ) {
			foreach ( $font_pairs as $font_pair ) {
				if ( isset( $font_pair['font_heading_name'] ) ) {
					$unique_fonts[] = $font_pair['font_heading_name'];
				}
				if ( isset( $font_pair['font_content_name'] ) ) {
					$unique_fonts[] = $font_pair['font_content_name'];
				}
			}
		}

		$unique_fonts = array_unique( $unique_fonts );

		foreach ( $unique_fonts as $font_id ) {
			if ( empty( $font_id ) ) {
				continue;
			}

			// Check if font data is already cached
			$cache_key = 'nfd_font_data_' . sanitize_key( $font_id );
			$font_data = get_transient( $cache_key );

			if ( false === $font_data ) {
				// Fetch font data from Hiive API
				$response = wp_remote_get(
					$hiive_api_base . '/fonts/' . urlencode( sanitize_title( $font_id ) ),
					array(
						'timeout' => 10,
						'headers' => array(
							'Accept' => 'application/json',
						),
					)
				);

				if ( ! is_wp_error( $response ) && wp_remote_retrieve_response_code( $response ) === 200 ) {
					$body      = wp_remote_retrieve_body( $response );
					$font_data = json_decode( $body, true );

					set_transient( $cache_key, $font_data, HOUR_IN_SECONDS );
				}
			}

			// Enqueue the font if we have valid data
			if ( $font_data &&
				isset( $font_data['wp_json']['fontFace'][0]['src'][0] ) &&
				isset( $font_data['wp_json']['name'] )
			) {
				$font_url    = $font_data['wp_json']['fontFace'][0]['src'][0];
				$font_name   = $font_data['wp_json']['name'];
				$font_handle = 'nfd-font-' . sanitize_title( $font_id );

				// Create CSS for the font-face declaration
				$font_css = '';
				if ( isset( $font_data['wp_json']['fontFace'] ) && is_array( $font_data['wp_json']['fontFace'] ) ) {
					foreach ( $font_data['wp_json']['fontFace'] as $font_face ) {
						$font_css .= '@font-face {';
						$font_css .= 'font-family: "' . esc_attr( $font_face['fontFamily'] ) . '";';

						if ( isset( $font_face['fontWeight'] ) ) {
							$font_css .= 'font-weight: ' . esc_attr( $font_face['fontWeight'] ) . ';';
						}

						if ( isset( $font_face['fontStyle'] ) ) {
							$font_css .= 'font-style: ' . esc_attr( $font_face['fontStyle'] ) . ';';
						}

						if ( isset( $font_face['fontStretch'] ) ) {
							$font_css .= 'font-stretch: ' . esc_attr( $font_face['fontStretch'] ) . ';';
						}

						if ( isset( $font_face['src'] ) && is_array( $font_face['src'] ) ) {
							$src_declarations = array();
							foreach ( $font_face['src'] as $src ) {
								$src_declarations[] = 'url("' . esc_url( $src ) . '") format("woff2")';
							}
							$font_css .= 'src: ' . implode( ', ', $src_declarations ) . ';';
						}

						$font_css .= 'font-display: swap;';
						$font_css .= '}';
					}
				}

				// Register and enqueue the font style
				\wp_register_style( $font_handle, false );
				\wp_enqueue_style( $font_handle );
				\wp_add_inline_style( $font_handle, $font_css );
			}
		}
	}

	/**
	 * Pre-set filter wonder blocks transients.
	 *
	 * @return void
	 */
	public static function pre_set_filter_wonder_blocks_transients() {
		$args = wp_parse_args(
			array(
				'primary_type'   => PatternsSiteClassification::get_primary_type(),
				'secondary_type' => PatternsSiteClassification::get_secondary_type(),
			)
		);
		$id   = md5( serialize( $args ) );

		\add_action( "pre_set_transient_wba_templates_{$id}", array( __CLASS__, 'filter_wonder_blocks_templates_transient' ), 10, 1 );
		\add_action( 'pre_set_transient_wba_templates_categories', array( __CLASS__, 'filter_wonder_blocks_categories_transient' ), 10, 1 );
	}
} // END /NewfoldLabs/WP/Module/Onboarding/Admin()
