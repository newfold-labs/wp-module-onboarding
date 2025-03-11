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
	 * Tap WordPress Hooks
	 *
	 * @return void
	 */
	public function __construct() {
		\add_action( 'init', array( __CLASS__, 'load_php_textdomain' ) );
		\add_action( 'admin_menu', array( __CLASS__, 'register_page' ) );
		\add_action( 'load-dashboard_page_' . self::$slug, array( __CLASS__, 'page_title' ), 9, 1 );
		\add_action( 'load-dashboard_page_' . self::$slug, array( __CLASS__, 'initialize' ) );
		\add_action( 'load-themes.php', array( __CLASS__, 'can_restart_onboarding' ) );
		if ( 'sitegen' === Data::current_flow() ) {
			\add_action( 'load-themes.php', array( __CLASS__, 'mark_sitegen_generated_themes' ) );
			SiteGenService::pre_set_filter_wonder_blocks_transients();
			SiteGenService::instantiate_sitegen_hooks();
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
	 * Render DOM element for React SPA mount.
	 *
	 * @return void
	 */
	public static function render() {
		echo PHP_EOL;
		echo '<!-- NFD:ONBOARDING -->';
		echo PHP_EOL;
		echo '<div id="nfd-onboarding" class="nfd-onboarding-container"></div>';
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

			\wp_add_inline_script(
				self::$slug,
				'var nfdOnboarding =' . wp_json_encode( Data::runtime() ) . ';',
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

			wp_add_inline_script(
				'wp-blocks',
				sprintf( 'wp.blocks.setCategories( %s );', wp_json_encode( get_block_categories( $block_editor_context ) ) ),
				'after'
			);

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
	 * Initialize Plugins and Themes if necessary.
	 *
	 * @return void
	 */
	public static function initialize() {
		if ( ! empty( $_GET['nfd_plugins'] ) && 'true' === sanitize_text_field( $_GET['nfd_plugins'] ) ) {
			PluginService::initialize();
		}

		if ( ! empty( $_GET['nfd_themes'] ) && 'true' === sanitize_text_field( $_GET['nfd_themes'] ) ) {
			ThemeService::initialize();
		}

		FlowService::initialize_data();

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
					'buttonHref' => \admin_url( 'index.php?page=' . self::$slug ),
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

		\wp_enqueue_script( 'onboarding-restart-button' );
		\wp_enqueue_style( 'onboarding-restart-button' );
	}
} // END /NewfoldLabs/WP/Module/Onboarding/Admin()
