<?php
namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Themes;

class ThemeInstaller {
	public static function install( $theme, $activate ) {
		 $theme_list = Themes::get();

		if ( self::is_nfd_slug( $theme ) ) {
			 $stylesheet = $theme_list['nfd_slugs'][ $theme ]['stylesheet'];
			if ( ! ( \wp_get_theme( $stylesheet ) )->exists() ) {
				$status = self::install_from_zip(
					$theme_list['nfd_slugs'][ $theme ]['url'],
					$activate,
					$stylesheet
				);
				if ( \is_wp_error( $status ) ) {
					return $status;
				}

				return new \WP_REST_Response(
					array(),
					201
				);
			}

			if ( $activate && ( ( \wp_get_theme() )->get( 'TextDomain' ) !== $stylesheet ) ) {
				 $status = \switch_theme( $stylesheet );
			}
		}

		return new \WP_REST_Response(
			array(),
			201
		);
	}

	public static function install_from_zip( $url, $activate, $stylesheet ) {
		require_once ABSPATH . 'wp-admin/includes/file.php';
		require_once ABSPATH . 'wp-admin/includes/misc.php';
		require_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';

		 $skin     = new \WP_Ajax_Upgrader_Skin();
		 $upgrader = new \Theme_Upgrader( $skin );
		 $result   = $upgrader->install( $url );

		if ( is_wp_error( $result ) ) {
			 return $result;
		}

		if ( is_wp_error( $skin->result ) ) {
			 return $skin->result;
		}

		if ( $skin->get_errors()->has_errors() ) {
			return new \WP_Error(
				'unable_to_install_theme',
				$skin->get_error_messages(),
				array( 'status' => 500 )
			);
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

		if ( $activate && ( ( \wp_get_theme() )->get( 'TextDomain' ) !== $stylesheet ) ) {
			 \switch_theme( $stylesheet );
		}

		return new \WP_REST_Response(
			array(),
			201
		);

	}

	public static function is_nfd_slug( $theme ) {
		$theme_list = Themes::get();
		if ( isset( $theme_list['nfd_slugs'][ $theme ]['approved'] ) ) {
			  return true;
		}
		 return false;
	}

	public static function get_theme_stylesheet( $theme, $theme_type ) {
		 $theme_list = Themes::get();
		 return $theme_list[ $theme_type ][ $theme ]['stylesheet'];
	}

	public static function get_theme_type( $theme ) {
		if ( self::is_nfd_slug( $theme ) ) {
			 return 'nfd_slugs';
		}
		return 'wp_slugs';
	}

	public static function is_theme_installed( $stylesheet ) {
		 return ( \wp_get_theme( $stylesheet ) )->exists();
	}

	public static function is_theme_active( $stylesheet ) {
		 return ( ( \wp_get_theme() )->get( 'TextDomain' ) ) === $stylesheet;
	}

	public static function exists( $theme, $activate ) {
		 $theme_type       = self::get_theme_type( $theme );
		 $theme_stylesheet = self::get_theme_stylesheet( $theme, $theme_type );
		if ( ! self::is_theme_installed( $theme_stylesheet ) ) {
			 return false;
		}
		if ( $activate && ! self::is_theme_active( $theme_stylesheet ) ) {
			 return false;
		}
		 return true;
	}
}
