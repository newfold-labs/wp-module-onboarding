<?php
namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Data\Options;

class LoginRedirect {
	public static function handle_redirect( $url, $request, $user ) {
		  \do_action( 'qm/debug', $url );
		  \do_action( 'qm/debug', $request );
		  \do_action( 'qm/debug', $_GET['nfd_module_onboarding_redirect'] );

		$redirect_option = Options::get_option_name( 'redirect' );
		if ( $_GET[ $redirect_option ] === 'false' ) {
			 self::disable_redirect();
		}

		if ( \get_option( Options::get_option_name( 'redirect_param' ), false )
		 || \get_option( Options::get_option_name( 'exited' ), false )
		 || \get_option( Options::get_option_name( 'completed' ), false )
		 ) {

			return \admin_url();
		}

		$redirect = \get_option( $redirect_option, null );
		if ( $redirect === null ) {
			$redirect = \update_option( $redirect_option, true );
		}

		if ( ! $redirect || ! \get_option( Options::get_option_name( 'coming_soon', false ), true ) ) {
			  return \admin_url();
		}

		if ( self::is_administrator( $user ) ) {
			 return \admin_url( '/index.php?page=' . 'nfd-onboarding' );
		}

		return \admin_url();
	}

	public static function handle_redirect2( $url, $request, $user ) {
		 \do_action( 'qm/debug', $url );
		 \do_action( 'qm/debug', $request );

		if ( $_GET['nfd_module_onboarding_redirect'] === 'false'
		|| \get_option( Options::get_option_name( 'exited' ), false )
		|| \get_option( Options::get_option_name( 'completed' ), false )
		) {
			\do_action( 'qm/debug', $_GET['nfd_module_onboarding_redirect'] );
			return \admin_url();
		}

		$redirect_option = Options::get_option_name( 'redirect' );
		$redirect         = \get_option( $redirect_option, null );
		if ( $redirect === null ) {
			$redirect = \update_option( $redirect_option, true );
		}

		if ( ! $redirect || ! \get_option( Options::get_option_name( 'coming_soon', false ), true ) ) {
			  return \admin_url();
		}
		if ( self::is_administrator( $user ) ) {
			 return \admin_url( '/index.php?page=' . 'nfd-onboarding' );
		}
		 return \admin_url();
	}

	 /**
	  * Check if we have a valid user.
	  *
	  * @param \WP_User $user The WordPress user object.
	  *
	  * @return bool
	  */
	public static function is_user( $user ) {
		return $user && is_object( $user ) && is_a( $user, 'WP_User' );
	}

	/**
	 * Check if a user is an administrator.
	 *
	 * @param \WP_User $user WordPress user.
	 *
	 * @return bool
	 */
	public static function is_administrator( $user ) {
		return self::is_user( $user ) && $user->has_cap( 'manage_options' );
	}

	public static function enable_redirect() {
		if ( \get_option( Options::get_option_name( 'redirect_param' ), true ) ) {
			\update_option( Options::get_option_name( 'redirect_param' ), false );
		}
	}

	public static function disable_redirect() {
		if ( ! \get_option( Options::get_option_name( 'redirect_param' ), false ) ) {
			\update_option( Options::get_option_name( 'redirect_param' ), true );
		}
	}

	public static function remove_redirect_action() {
		 return \remove_action( 'login_redirect', array( __CLASS__, 'handle_redirect' ) );
	}
}
