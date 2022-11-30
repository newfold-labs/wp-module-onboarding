<?php
namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Plugins;

class PluginUninstaller {

	public static function uninstall( $plugin ) {

		$plugin_list = Plugins::get_squashed();
		$plugin_path = $plugin_list[ $plugin ]['path'];

		if ( isset( $plugin_path ) && self::is_plugin_installed( $plugin_path ) ) {

			if ( \is_plugin_active( $plugin_path ) ) {
				\deactivate_plugins( $plugin_path );
			}

			if ( ! self::connect_to_filesystem() ) {
				return new \WP_Error(
					'nfd_onboarding_error',
					'Could not connect to the filesystem.',
					array( 'status' => 500 )
				);
			}

			if ( ! \delete_plugins( array( $plugin_path ) ) ) {
				return new \WP_Error(
					'nfd_onboarding_error',
					'Unable to Delete the Plugin',
					array( 'status' => 500 )
				);
			}
			
		} else {
			return new \WP_REST_Response(
				array(),
				201
			);
		}

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
		 $plugin_path = $plugin . '/' . $plugin . '.php';
		if ( ! self::is_plugin_installed( $plugin_path ) ) {
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
