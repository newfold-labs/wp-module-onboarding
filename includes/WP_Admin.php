<?php
namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Data\Data;
use SebastianBergmann\CodeCoverage\Util\Percentage;
use NewfoldLabs\WP\Module\Onboarding\Data\Options;

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
		\add_action( 'load-dashboard_page_' . self::$slug, array( __CLASS__, 'register_assets' ) );
		\add_action( 'admin_init', array( __CLASS__, 'handle_redirect' ) );
		\add_filter( Options::get_option_name( 'redirect' ) . '_disable', array( __CLASS__, 'disable_redirect' ) );
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
			\__( 'Onboarding', 'nfd_module_onboarding' ),
			\__( 'Onboarding', 'nfd_module_onboarding' ),
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
				array( 'wp-components' ),
				$asset['version']
			);

			\wp_enqueue_script( self::$slug );
			\wp_enqueue_style( self::$slug );
		}
	}

	public static function handle_redirect() {
          $redirect_option = Options::get_option_name( 'redirect' );

		if ( $_GET['page'] === self::$slug
		  || $_GET[ $redirect_option ] === 'false'
		  || \get_option( Options::get_option_name( 'exited' ), false )
		  || \get_option( Options::get_option_name( 'completed' ), false )
		) {
			return;
		}

		$redirect = \get_option( $redirect_option, null );
		if ( $redirect === null ) {
			 $redirect = \update_option( $redirect_option, true );
		}

		if ( ! $redirect || ! \get_option( Options::get_option_name( 'coming_soon', false ), true ) ) {
			 return;
		}

		return \wp_safe_redirect( \admin_url( '/index.php?page=' . self::$slug ) );
	}

	public static function disable_redirect() {
		return \remove_action( 'admin_init', array( __CLASS__, 'handle_redirect' ) );
	}

} // END \NewfoldLabs\WP\Module\Onboarding\Admin()
