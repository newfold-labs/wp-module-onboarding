<?php
namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Themes;

class ThemeInstaller {
	public static function install( $theme, $activate ) {
		 $theme_list = Themes::get();

		  // Checks if the theme slug is an nfd slug.
		if ( self::is_nfd_slug( $theme ) ) {
			   // Retrieve the theme stylesheet to determine if it has been already installed.
			 $stylesheet = $theme_list['nfd_slugs'][ $theme ]['stylesheet'];
				// Check if the theme already exists.
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

			   // If specified then activate the theme even if it already installed.
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

		  // Activate the theme if specified.
		if ( $activate && ( ( \wp_get_theme() )->get( 'TextDomain' ) !== $stylesheet ) ) {
			 \switch_theme( $stylesheet );
		}

		return new \WP_REST_Response(
			array(),
			201
		);

	}

	 /**
	  * @param string $theme Slug of the theme.
	  *
	  * Checks if a given slug is a valid nfd_slug. Ref: includes/Data/Themes.php for nfd_slug.
	  *
	  * @return boolean
	  */
	public static function is_nfd_slug( $theme ) {
		$theme_list = Themes::get();
		if ( isset( $theme_list['nfd_slugs'][ $theme ]['approved'] ) ) {
			  return true;
		}
		 return false;
	}

	/**
	 * @param mixed $theme Slug of the theme present under includes/Data/Themes.php.
	 * @param mixed $theme_type Type of theme Ref: includes/Data/Themes.php for types of theme slugs.
	 *
	 * @return string The theme stylesheet name.
	 */
	public static function get_theme_stylesheet( $theme, $theme_type ) {
		 $theme_list = Themes::get();
		 return $theme_list[ $theme_type ][ $theme ]['stylesheet'];
	}

	 /**
	  * @param string $theme
	  *
	  * @return string Type of theme. Ref: includes/Data/Themes.php for the different types.
	  */
	public static function get_theme_type( $theme ) {
		if ( self::is_nfd_slug( $theme ) ) {
			 return 'nfd_slugs';
		}
		return 'wp_slugs';
	}

	 /**
	  * @param string $stylesheet The stylesheet of the theme.
	  *
	  * Determines if a theme has already been installed.
	  *
	  * @return boolean
	  */
	public static function is_theme_installed( $stylesheet ) {
		 return ( \wp_get_theme( $stylesheet ) )->exists();
	}

	 /**
	  * @param string $stylesheet The stylesheet of the theme.
	  *
	  * Determines if a theme is already active.
	  *
	  * @return boolean
	  */
	public static function is_theme_active( $stylesheet ) {
		 return ( ( \wp_get_theme() )->get( 'TextDomain' ) ) === $stylesheet;
	}

	 /**
	  * @param string $theme
	  * @param string $activate
	  *
	  * Checks if a theme with the given slug and activation criteria already exists.
	  *
	  * @return boolean
	  */
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
