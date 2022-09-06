<?php
namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Data\Data;
use SebastianBergmann\CodeCoverage\Util\Percentage;
use NewfoldLabs\WP\Module\Onboarding\TaskManagers\PluginInstallTaskManager;
use NewfoldLabs\WP\Module\Onboarding\TaskManagers\ThemeInstallTaskManager;

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
		\add_action( 'admin_menu', array( __CLASS__, 'register_page' ) );
		\add_action( 'load-dashboard_page_' . self::$slug, array( __CLASS__, 'initialize' ) );
		// \add_action( 'wp_dashboard_setup', array( __CLASS__, 'register_widget' ) );
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

			\wp_add_inline_script(
				self::$slug,
				'var nfdOnboarding =' . wp_json_encode( Data::runtime() ) . ';',
				'before'
			);

			\wp_register_style(
				self::$slug,
				NFD_ONBOARDING_BUILD_URL . '/onboarding.css',
				array( 'wp-components', 'wp-editor' ),
				$asset['version']
			);

			\wp_enqueue_script( self::$slug );
			\wp_enqueue_style( self::$slug );
		}
	}

	public static function initialize() {
		if ( isset( $_GET['nfd_plugins'] ) && $_GET['nfd_plugins'] === 'true' ) {
			PluginInstallTaskManager::queue_initial_installs();
		}

		if ( isset( $_GET['nfd_themes'] ) && $_GET['nfd_themes'] === 'true' ) {
			ThemeInstallTaskManager::queue_initial_installs();
		}

		self::register_assets();
	}

} // END \NewfoldLabs\WP\Module\Onboarding\Admin()
