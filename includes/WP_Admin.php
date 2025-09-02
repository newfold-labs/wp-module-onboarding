<?php
namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Data\Data;
use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\Services\PluginService;
use NewfoldLabs\WP\Module\Onboarding\Services\ThemeService;
use NewfoldLabs\WP\Module\Onboarding\Data\Services\FlowService;
use NewfoldLabs\WP\Module\Onboarding\Data\Services\SiteGenService;
use NewfoldLabs\WP\Module\Onboarding\Data\Themes;
use NewfoldLabs\WP\Module\Onboarding\Services\I18nService;
use NewfoldLabs\WP\Module\Onboarding\Services\ReduxStateService;
use NewfoldLabs\WP\Module\Onboarding\Services\StatusService;

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
		/**
		 * We're disabling the restart onboarding feature for now.
		 */
		\add_action( 'load-toplevel_page_bluehost', array( __CLASS__, 'hide_onboarding_restart_card' ) );
		// \add_action( 'load-themes.php', array( __CLASS__, 'can_restart_onboarding' ) );
		\add_action( 'admin_enqueue_scripts', array( __CLASS__, 'enqueue_site_editor_assets' ) );
		if ( 'sitegen' === Data::current_flow() ) {
			\add_action( 'load-themes.php', array( __CLASS__, 'mark_sitegen_generated_themes' ) );
			SiteGenService::pre_set_filter_wonder_blocks_transients();
		}
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
	 * Render a loading screen.
	 *
	 * @return string
	 */
	public static function is_loading() {
		ob_start();
		?>
		<style>
			body.wp-admin {
				overflow: hidden !important;
			}
			.nfd-onboarding-loading-app__skeleton {
				position: relative;
				overflow: hidden;
				background-color: #DDE7F0;
			}
			.nfd-onboarding-loading-app__skeleton::after {
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				transform: translateX(-100%);
				background-image: linear-gradient(
					90deg,
					rgba(255, 255, 255, 0) 0,
					rgba(255, 255, 255, 0.2) 20%,
					rgba(255, 255, 255, 0.5) 60%,
					rgba(255, 255, 255, 0)
				);
				animation: nfd-skeleton-animation 2.5s infinite;
				content: "";
			}
			@keyframes nfd-skeleton-animation {
				100% {
					transform: translateX(100%);
				}
			}
			#nfd-onboarding {
				z-index: 100000;
			}
			.nfd-onboarding-loading-app {
				background-color: #F1F5F9;
				width: 100%;
				opacity: 1;
				transition: opacity 0.3s ease-in-out;
			}
			.nfd-onboarding-loading-app.fade-out {
				opacity: 0;
			}
			.nfd-onboarding-loading-app__header {
				background-color: #FFF;
				border-bottom: 1px solid #ECEEFE;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 1.5rem;
				min-height: 4rem;
			}
			.nfd-onboarding-loading-app__header__logo {
				width: 135px;
				height: 24px;
				border-radius: 6px;
			}
			.nfd-onboarding-loading-app__header__exit {
				width: 24px;
				height: 24px;
				border-radius: 6px;
			}
			.nfd-onboarding-loading-app__body {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.nfd-onboarding-loading-app__body__spinner {
				width: 100px;
				height: 100px;
				margin-top: -65px;
				border-radius: 12px;
				opacity: 0.8;
			}
		</style>
		<div class="nfd-onboarding-loading-app">
			<header class="nfd-onboarding-loading-app__header">
				<div class="nfd-onboarding-loading-app__header__logo nfd-onboarding-loading-app__skeleton"></div>
				<div class="nfd-onboarding-loading-app__header__exit nfd-onboarding-loading-app__skeleton"></div>
			</header>
			<div class="nfd-onboarding-loading-app__body">
				<div class="nfd-onboarding-loading-app__body__spinner nfd-onboarding-loading-app__skeleton"></div>
			</div>
		</div>
		<?php
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
				'runtime'    => Data::runtime(),
				'input'      => ReduxStateService::get( 'input' ),
				'sitegen'    => ReduxStateService::get( 'sitegen' ),
				'blueprints' => ReduxStateService::get( 'blueprints' ),
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
	 * Redirects to the brand plugin page or the WordPress admin dashboard.
	 *
	 * @return void
	 */
	public static function exit_to_dashboard(): bool {
		$runtime_data              = Data::runtime();
		$brand_plugin_url          = '';
		$dashboard_redirect_params = 'referrer=' . self::$slug;

		// Get the brand plugin page URL from the runtime data.
		if (
			isset( $runtime_data['currentBrand'], $runtime_data['currentBrand']['pluginDashboardPage'] ) &&
			is_string( $runtime_data['currentBrand']['pluginDashboardPage'] )
			) {
				// Set the brand plugin page URL.
				$brand_plugin_url = $runtime_data['currentBrand']['pluginDashboardPage'];
		}

		// If the brand plugin page URL is not found in the runtime, redirect to the WordPress admin.
		if ( empty( $brand_plugin_url ) ) {
			wp_redirect( apply_filters( 'nfd_build_url', admin_url() . '?' . $dashboard_redirect_params ) );
			exit;
		}

		// If the brand plugin page URL is found in the runtime, redirect to the brand plugin page.
		wp_redirect( apply_filters( 'nfd_build_url', $brand_plugin_url . '&' . $dashboard_redirect_params ) );
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

		self::set_onboarding_restart_option();
	}

	/**
	 * Enqueue scripts that mark Sitegen flow generated themes.
	 *
	 * @return void
	 */
	public static function mark_sitegen_generated_themes() {
		$flow_data = get_option( Options::get_option_name( 'flow' ), false );

		if ( ! $flow_data || ! isset( $flow_data['sitegen']['homepages'] ) ) {
			return;
		}

		\wp_register_script(
			'sitegen-theme-marker',
			NFD_ONBOARDING_BUILD_URL . '/sitegen-theme-marker.js',
			array(),
			'1.0.0',
			true
		);

		\wp_add_inline_script(
			'sitegen-theme-marker',
			'var nfdOnboarding =' . wp_json_encode(
				array(
					'homepages' => $flow_data['sitegen']['homepages'],
					'active'    => Themes::get_active_theme(),
				)
			) . ';',
			'before'
		);

		\wp_register_style(
			'sitegen-theme-marker',
			NFD_ONBOARDING_BUILD_URL . '/sitegen-theme-marker.css.css',
			array(),
			'1.0.0',
			'all'
		);

		\wp_enqueue_script( 'sitegen-theme-marker' );
		\wp_enqueue_style( 'sitegen-theme-marker' );
	}

	/**
	 * Sets the option in DB for the Initial Load of Onboarding
	 *
	 * @return void
	 */
	public static function set_onboarding_restart_option(): void {
		// Check if the customer is eligible for onboarding restart
		if ( StatusService::is_onboarding_restart_eligible() ) {
			// Get the option name for 'can_restart'
			$option_name = Options::get_option_name( 'can_restart' );

			// Check if the option doesn't exist before adding it
			if ( ! get_option( $option_name ) ) {
				// Add the option if it doesn't exist
				add_option( $option_name, true );
			}
		} else {
			// Get the option name for 'can_restart'
			$option_name = Options::get_option_name( 'can_restart' );

			// Add the option if it doesn't exist
			update_option( $option_name, false );
		}
	}

	/**
	 * Enqueue scripts that adds a new button to Restart Onboarding in themes.php
	 *
	 * @return void
	 */
	public static function can_restart_onboarding(): void {
		$can_restart = get_option( Options::get_option_name( 'can_restart' ), false );

		// If the customer in ineligible for restart don't enqueue scripts
		if ( ! $can_restart || ! StatusService::is_onboarding_restart_eligible() ) {
			return;
		}

		\wp_register_script(
			'onboarding-restart-button',
			NFD_ONBOARDING_BUILD_URL . '/onboarding-restart-button.js',
			array(),
			'1.0.0',
			true
		);

		\wp_add_inline_script(
			'onboarding-restart-button',
			'var nfdOnboardingRestartMeta =' . wp_json_encode(
				array(
					'buttonText' => \__( 'Build with AI', 'wp-module-onboarding' ),
					'buttonHref' => \apply_filters( 'nfd_build_url', admin_url( 'index.php?page=' . self::$slug ) ),
				)
			) . ';',
			'before'
		);

		\wp_register_style(
			'onboarding-restart-button',
			NFD_ONBOARDING_BUILD_URL . '/onboarding-restart-button.css.css',
			array(),
			'1.0.0',
			'all'
		);

		/**
		 * Temporary: hide the build with ai button
		 */
		wp_add_inline_style(
			'onboarding-restart-button',
			'.themes .theme.build-with-ai {
				display: none !important;
			}'
		);

		\wp_enqueue_script( 'onboarding-restart-button' );
		\wp_enqueue_style( 'onboarding-restart-button' );
	}

	/**
	 * Temporary: Enqueue scripts that hides the build with ai button
	 *
	 * @return void
	 */
	public static function hide_onboarding_restart_card(): void {
		\wp_register_style(
			'hide-onboarding-restart-card',
			false,
		);

		\wp_add_inline_style(
			'hide-onboarding-restart-card',
			'div[data-testid="restartOnboarding"] {
				display: none !important;
			}'
		);

		\wp_enqueue_style( 'hide-onboarding-restart-card' );
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
} // END /NewfoldLabs/WP/Module/Onboarding/Admin()
