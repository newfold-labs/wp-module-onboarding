<?php
namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Data\Data;
use NewfoldLabs\WP\Module\Onboarding\Services\PluginService;
use NewfoldLabs\WP\Module\Onboarding\Services\ThemeService;
use NewfoldLabs\WP\Module\Onboarding\Data\Services\FlowService;
use NewfoldLabs\WP\Module\Onboarding\Services\I18nService;

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
		\add_action( 'load-dashboard_page_' . self::$slug, array( __CLASS__, 'initialize' ) );
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
			null,
			\__( 'Onboarding', 'wp-module-onboarding' ),
			\__( 'Onboarding', 'wp-module-onboarding' ),
			Permissions::ADMIN,
			self::$slug,
			array( __CLASS__, 'render' ),
			100
		);
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
	}

} // END /NewfoldLabs/WP/Module/Onboarding/Admin()
