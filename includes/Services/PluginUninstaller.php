<?php
namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Plugins;

class PluginUninstaller {

	public static function uninstall( $plugin ) {
		
        // if ( ! self::is_plugin_installed( $plugin_path ) ) {
		// 	 return false;
		// }

		// if ( $activate && ! \is_plugin_active( $plugin_path ) ) {
		// 	 return false;
		// }


		return new \WP_REST_Response(
			array(),
			201
		);
	}

	/**
	 * @param string $plugin
	 *
	 * Checks if a plugin with the given slug exists.
	 *
	 * @return boolean
	 */
	public static function exists( $plugin ) {
		 $plugin_type = self::get_plugin_type( $plugin );
		 $plugin_path = self::get_plugin_path( $plugin, $plugin_type );
		if ( ! self::is_plugin_installed( $plugin_path ) ) {
			 return false;
		}

		if ( ! \is_plugin_active( $plugin_path ) ) {
			 return false;
		}
		 return true;
	}

	/**
	 * @param string $plugin_path Path to the plugin's header file.
	 *
	 * Determines if a plugin has already been installed.
	 *
	 * @return boolean
	 */
	public static function is_plugin_installed( $plugin_path ) {
		if ( ! function_exists( 'get_plugins' ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}
		$all_plugins = \get_plugins();
		if ( ! empty( $all_plugins[ $plugin_path ] ) ) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Establishes a connection to the wp_filesystem.
	 *
	 * @return boolean
	 */
	protected static function connect_to_filesystem() {
		require_once ABSPATH . 'wp-admin/includes/file.php';

		// We want to ensure that the user has direct access to the filesystem.
		$access_type = \get_filesystem_method();
		if ( $access_type !== 'direct' ) {
			return false;
		}

		$creds = \request_filesystem_credentials( site_url() . '/wp-admin', '', false, false, array() );

		if ( ! \WP_Filesystem( $creds ) ) {
			return false;
		}

		return true;
	}

}
