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
		\add_filter( 'rest_page_query', array( __CLASS__, 'header_menu_limit_pages' ) );
		\add_filter( 'rest_request_after_callbacks', array( __CLASS__, 'header_menu_rename_pages' ), 10, 3 );
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

	public static function header_menu_limit_pages( $args ) {
		$args['posts_per_page'] = 3;
		$args['no_found_rows']  = true;
		return $args;
	}

	public static function header_menu_rename_pages( $response, array $handler, \WP_REST_Request $request ) {
		if ( self::is_wp_pages_request( $request ) ) {
			self::modify_get_pages_response( $response );
		}
		 return $response;
	}

	public static function is_wp_pages_request( \WP_REST_Request $request ) {
		return '/wp/v2/pages' === $request->get_route()
		&& 'GET' === $request->get_method();
	}

	public static function modify_get_pages_response( $response ) {
		if ( ! ( $response instanceof \WP_REST_Response ) ) {
			return;
		}
		$data = array_map(
			array( __CLASS__, 'rename_page' ),
			$response->get_data(),
			array_keys( $response->get_data() )
		);
		$response->set_data( $data );
	}

	public static function rename_page( array $page, $index ) {
		$dummy_pages = array( 'About', 'Testimonials', 'Blog' );
		if ( isset( $page['title']['rendered'] ) ) {
			$page['title']['rendered'] = $dummy_pages[ $index ];
		}
		return $page;
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
