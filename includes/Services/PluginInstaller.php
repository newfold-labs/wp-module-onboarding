<?php
namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Plugins;
use NewfoldLabs\WP\Module\Onboarding\Data\Options;

class PluginInstaller {

     public static function install( $plugin, $activate ) {
		$plugins_list = Plugins::get();

		// Check if the plugin param contains a zip url.
		if ( \wp_http_validate_url( $plugin ) ) {
			$domain = \wp_parse_url( $plugin, PHP_URL_HOST );
			// If the zip URL/domain is not approved.
			if ( ! isset( $plugins_list['urls'][ $plugin ] )
				&& ! isset( $plugins_list['domains'][ $domain ] ) ) {
					return new \WP_Error(
						'plugin-error',
						"You do not have permission to install from {$plugin}.",
						array( 'status' => 400 )
					);
			}

			$status = self::install_from_zip( $plugin, $activate );
			if ( \is_wp_error( $status ) ) {
				return $status;
			}

			return new \WP_REST_Response(
				array(),
				201
			);
		}

		// If it is not a zip URL then check if it is an approved slug.
		$plugin = \sanitize_text_field( $plugin );
          if ( self::is_nfd_slug( $plugin ) ) {
               $plugin_path = $plugins_list['nfd_slugs'][ $plugin ]['path'];
               if ( ! self::is_plugin_installed( $plugin_path ) ) {
                    $status = self::install_from_zip( $plugins_list['nfd_slugs'][ $plugin ]['url'], $activate );
                    if ( \is_wp_error( $status ) ) {
                         return $status;
                    }
               }
               if ( $activate && ! \is_plugin_active( $plugin_path ) ) {
                    $status = \activate_plugin( $plugin_path );
                    if ( \is_wp_error( $status ) ) {
                         $status->add_data( array( 'status' => 500 ) );
          
                         return $status;
                    }
               }
               return new \WP_REST_Response(
                    array(),
                    201
               );
          }

		if ( ! isset( $plugins_list['wp_slugs'][ $plugin ] ) ) {
			return new \WP_Error(
				'plugin-error',
				"You do not have permission to install {$plugin}.",
				array( 'status' => 400 )
			);
		}

          $plugin_path = $plugins_list['wp_slugs'][$plugin]['path'];
		if ( ! self::is_plugin_installed( $plugin_path ) ) {
               $status = self::install_from_wordpress( $plugin, $activate );
               if ( \is_wp_error( $status ) ) {
                    return $status;
               }
          }

          if ( $activate && ! \is_plugin_active( $plugin_path ) ) {
               $status = \activate_plugin( $plugin_path );
               if ( \is_wp_error( $status ) ) {
                    $status->add_data( array( 'status' => 500 ) );
     
                    return $status;
               }
          }

		return new \WP_REST_Response(
			array(),
			201
		);
	}

	/**
	 * @param string $slug Representing the wordpress.org slug.
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public static function install_from_wordpress( $plugin, $activate ) {
          require_once ABSPATH . 'wp-admin/includes/plugin-install.php';

          $api = \plugins_api(
			'plugin_information',
			array(
				'slug'   => $plugin,
				'fields' => array(
					'sections'       => false,
					'language_packs' => true,
				),
			)
		);

		if ( is_wp_error( $api ) ) {
			if ( false !== strpos( $api->get_error_message(), 'Plugin not found.' ) ) {
				$api->add_data( array( 'status' => 404 ) );
			} else {
				$api->add_data( array( 'status' => 500 ) );
			}

			return $api;
		}

          $status = self::install_from_zip( $api->download_link, $activate );
          if ( \is_wp_error( $status ) ) {
               return $status;
          }

		return new \WP_REST_Response(
			array(),
			200
		);
	}

	/**
	 * @param string $url URL to the zip for the plugin.
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public static function install_from_zip( $url, $activate ) {
		require_once ABSPATH . 'wp-admin/includes/file.php';
		require_once ABSPATH . 'wp-admin/includes/misc.php';
		require_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';

		\wp_cache_flush();
		$skin     = new \WP_Ajax_Upgrader_Skin();
		$upgrader = new \Plugin_Upgrader( $skin );

		$result = $upgrader->install( $url );
		if ( \is_wp_error( $result ) ) {
			$result->add_data( array( 'status' => 500 ) );

			return $result;
		}
		if ( \is_wp_error( $skin->result ) ) {
			$skin->result->add_data( array( 'status' => 500 ) );

			return $skin->result;
		}
		if ( $skin->get_errors()->has_errors() ) {
			$error = $skin->get_errors();
			$error->add_data( array( 'status' => 500 ) );

			return $error;
		}
		if ( is_null( $result ) ) {
			// Pass through the error from WP_Filesystem if one was raised.
			if ( $wp_filesystem instanceof \WP_Filesystem_Base
				&& \is_wp_error( $wp_filesystem->errors ) && $wp_filesystem->errors->has_errors()
			) {
				return new \WP_Error(
					'unable_to_connect_to_filesystem',
					$wp_filesystem->errors->get_error_message(),
					array( 'status' => 500 )
				);
			}

			return new \WP_Error(
				'unable_to_connect_to_filesystem',
				'Unable to connect to the filesystem.',
				array( 'status' => 500 )
			);
		}

		$plugin_file = $upgrader->plugin_info();
		if ( ! $plugin_file ) {
			return new \WP_Error(
				'unable_to_determine_installed_plugin',
				'Unable to determine what plugin was installed.',
				array( 'status' => 500 )
			);
		}

          if ( $activate && ! \is_plugin_active( $plugin_file ) ) {
               $status = \activate_plugin( $plugin_file );
               if ( \is_wp_error( $status ) ) {
                    $status->add_data( array( 'status' => 500 ) );
     
                    return $status;
               }
          }

		return new \WP_REST_Response(
			null,
			200
		);
	}

     public static function is_nfd_slug( $plugin ) {
          $plugins_list = Plugins::get();
          if ( isset( $plugins_list[ 'nfd_slugs' ][ $plugin ]['approved'] ) ) {
               return true;
          }
          return false;
     }

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

     public static function get_plugin_type( $plugin ) {
          if ( \wp_http_validate_url( $plugin ) ) {
               return 'urls';
          }
          if ( self::is_nfd_slug( $plugin ) ) {
               return 'nfd_slugs';
          }
          return 'wp_slugs';
     }

     public static function get_plugin_path( $plugin, $plugin_type ) {
          $plugin_list = Plugins::get();
          return $plugin_list[ $plugin_type ][ $plugin ]['path'];
     }

     public static function exists( $plugin, $activate ) {
          $plugin_type = self::get_plugin_type( $plugin );
          $plugin_path = self::get_plugin_path( $plugin, $plugin_type );
          echo $plugin_path;
          if ( ! self::is_plugin_installed( $plugin_path ) ) {
               return true;
          }
          if ( $activate && ! \is_plugin_active( $$plugin_path ) ) {
               return true;
          }
          return false;
     }

     public static function add_to_queue( $plugin, $activate ) {
          $plugins = \get_option( Options::get_option_name( 'plugin_install_queue' ), array() );
          foreach ( $plugins as $queued_plugin ) {
               if ( $queued_plugin['slug'] === $plugin && $queued_plugin['activate'] === $activate ) {
                    return;
               }
          }
          array_push( $plugins, array(
               'slug' => $plugin,
               'activate' => $activate
          ) );
          return \update_option( Options::get_option_name( 'plugin_install_queue' ), $plugins );
     }

}