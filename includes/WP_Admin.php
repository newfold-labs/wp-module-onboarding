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
	 * Default set of dummy pages.
	 *
	 * @var array
	 */
	public static $dummy_pages = array( 'Home', 'About', 'Contact', 'News', 'Privacy', 'Careers' );

	/**
	 * Tap WordPress Hooks
	 *
	 * @return void
	 */
	public function __construct() {
		\add_action( 'admin_menu', array( __CLASS__, 'register_page' ) );
		\add_action( 'load-dashboard_page_' . self::$slug, array( __CLASS__, 'initialize' ) );
		\add_filter( 'rest_request_before_callbacks', array( __CLASS__, 'check_for_pages_api_call_from_onboarding_flow' ), 10, 3 );
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

	/**
	 * Initialise Plugins and Themes if necessary.
	 *
	 * @return void
	 */
	public static function initialize() {
		if ( ! empty( get_query_var( 'nfd_plugins' ) ) && 'true' === get_query_var( 'nfd_plugins' ) ) {
			PluginInstallTaskManager::queue_initial_installs();
		}

		if ( ! empty( get_query_var( 'nfd_themes' ) ) && 'true' === get_query_var( 'nfd_themes' ) ) {
			ThemeInstallTaskManager::queue_initial_installs();
		}

		self::register_assets();
	}

	/**
	 * Custom filter to check for pages API call, if true then add more filters for the onboarding flow only.
	 *
	 * @param array            $response - the api response
	 * @param array            $handler - handler
	 * @param \WP_REST_Request $request - WP_REST_Request object
	 *
	 * @return array
	 */
	public static function check_for_pages_api_call_from_onboarding_flow( $response, array $handler, \WP_REST_Request $request ) {
		if ( self::is_wp_pages_request( $request ) && self::is_request_from_onboarding_flow( $request ) ) {
			\add_filter( 'rest_page_query', array( __CLASS__, 'header_menu_limit_pages' ) );
			\add_filter( 'rest_request_after_callbacks', array( __CLASS__, 'header_menu_rename_pages' ), 10, 3 );
		} elseif ( self::is_nav_menu_request( $request ) && self::is_request_from_onboarding_flow( $request ) ) {
			\add_filter( 'rest_request_after_callbacks', array( __CLASS__, 'wp_onboarding_nav_menu_filter' ), 10, 2 );
		}
		return $response;
	}

	/**
	 * Function for modifying the navigation menu grammar.
	 *
	 * @param object $response - WP_REST_Response object
	 * @param array  $args - An array containing arguments.
	 *
	 * @return object
	 */
	public static function wp_onboarding_nav_menu_filter( $response, $args ) {
		$modified_data = array_map(
			array( __CLASS__, 'prepare_raw_html_menu' ),
			$response->get_data(),
			array_keys( $response->get_data() )
		);
		$response->set_data( $modified_data );
		return $response;
	}

	/**
	 * Modify the reponse to make sure it has the dummy pages.
	 *
	 * @param array   $data - array containing navigation menu data
	 * @param integer $index - array index from the pages list
	 *
	 * @return array
	 */
	public static function prepare_raw_html_menu( $data, $index ) {
		// create dummy menu links
		$menu_navigation_grammar = '';
		foreach ( self::$dummy_pages as $page_title ) {
			$menu_navigation_grammar .= '<!-- wp:navigation-link {"isTopLevelLink":true, "label":"' . $page_title . '", "title":"' . $page_title . '"} /-->';
		}
		// need to reset ID else the data saved in the DB gets used
		$data['id']                  = $index;
		$data['content']['rendered'] = $menu_navigation_grammar;
		return $data;
	}

	/**
	 * Check if the CORE navigation API call is being made.
	 *
	 * @param \WP_REST_Request $request - WP_REST_Request object
	 *
	 * @return boolean
	 */
	public static function is_nav_menu_request( \WP_REST_Request $request ) {
		return '/wp/v2/navigation' === $request->get_route() && 'GET' === $request->get_method();
	}

	/**
	 * Custom filter to check for pages API call, if true then add more filters for the onboarding flow only.
	 *
	 * @param array $args - the arguments used by the WP_QUERY
	 *
	 * @return array
	 */
	public static function header_menu_limit_pages( $args ) {
		$args['posts_per_page'] = 6;
		$args['orderby']        = 'id';
		$args['no_found_rows']  = true;
		return $args;
	}

	/**
	 * Custom filter to rename the info for the pages API call.
	 *
	 * @param array            $response - the api response
	 * @param array            $handler - handler
	 * @param \WP_REST_Request $request - WP_REST_Request object
	 *
	 * @return array
	 */
	public static function header_menu_rename_pages( $response, array $handler, \WP_REST_Request $request ) {
		if ( self::is_wp_pages_request( $request ) && self::is_request_from_onboarding_flow( $request ) ) {
			self::modify_get_pages_response( $response );
		}
		return $response;
	}

	/**
	 * Check if the API call is being made from the onboarding flow.
	 *
	 * @param \WP_REST_Request $request - WP_REST_Request object
	 *
	 * @return boolean
	 */
	public static function is_request_from_onboarding_flow( \WP_REST_Request $request ) {
		return false !== stripos( $request->get_header( 'referer' ), 'page=nfd-onboarding' );
	}

	/**
	 * Check if the CORE pages API call is being made.
	 *
	 * @param \WP_REST_Request $request - WP_REST_Request object
	 *
	 * @return boolean
	 */
	public static function is_wp_pages_request( \WP_REST_Request $request ) {
		return '/wp/v2/pages' === $request->get_route() && 'GET' === $request->get_method();
	}

	/**
	 * Modify the reponse to make sure it has the dummy pages.
	 *
	 * @param array $response - response array
	 *
	 * @return null
	 */
	public static function modify_get_pages_response( $response ) {
		if ( ! ( $response instanceof \WP_REST_Response ) ) {
			return;
		}

		// make sure we have the number of dummy pages required
		$pages = $response->get_data();
		if ( count( $pages ) < count( self::$dummy_pages ) ) {
			$pages = array_pad(
				$pages,
				count( self::$dummy_pages ),
				array_pop( $pages )
			);
		}

		$data = array_map(
			array( __CLASS__, 'rename_page' ),
			$pages,
			array_keys( $pages )
		);
		$response->set_data( $data );
	}

	/**
	 * Modify the reponse to make sure it has the dummy pages.
	 *
	 * @param array   $page - array containing page attibutes
	 * @param integer $index - array index from the pages list
	 *
	 * @return array
	 */
	public static function rename_page( array $page, $index ) {
		if ( isset( $page['title']['rendered'] ) ) {
			// changed id so that while rendering the menu link and name are proper
			$page['id']                = $page['id'] + $index;
			$page['title']['rendered'] = self::$dummy_pages[ $index ];
			$page['menu_order']        = $index;
		}
		return $page;
	}
} // END /NewfoldLabs/WP/Module/Onboarding/Admin()
