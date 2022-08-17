<?php
namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Data\Options;

class LoginRedirect {

	public static function handle_redirect( $redirect, $redirect_to, $user ) {
		$redirect_option_name = Options::get_option_name( 'redirect' );
		if ( isset( $_GET[ $redirect_option_name ] )
		  && $_GET[ $redirect_option_name ] === 'false' ) {
			 self::disable_redirect();
		}

		$flow_exited    = false;
		$flow_completed = false;
		$flow_data      = \get_option( Options::get_option_name( 'flow' ), false );
		if ( ! empty( $flow_data ) ) {
			$flow_exited    = ( ! empty( $flow_data['hasExited'] ) );
			$flow_completed = ( ! empty( $flow_data['isComplete'] ) );
		}

		if ( \get_transient( Options::get_option_name( 'redirect_param' ) ) === '1'
		 || $flow_exited
		 || $flow_completed
		 ) {
			return $redirect;
		}

		$redirect_option = \get_option( $redirect_option_name, null );
		if ( empty( $redirect_option ) ) {
			$redirect_option = \update_option( $redirect_option_name, true );
		}

		if ( ! ( $redirect_option
				&& \get_option( Options::get_option_name( 'coming_soon', false ), 'true' ) ) === 'true' ) {
			 return $redirect;
		}

		if ( self::is_administrator( $user ) ) {
			 return \admin_url( '/index.php?page=' . 'nfd-onboarding' );
		}

		return $redirect;
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
		return self::is_user( $user ) && $user->has_cap( Permissions::ADMIN );
	}

	/**
	 * Sets a transient that disables redirect to onboarding on login.
	 *
	 * @return void
	 */
	public static function disable_redirect() {
		  \set_transient( Options::get_option_name( 'redirect_param' ), '1', 30 );
	}

	/**
	 * Sets a transient that enables redirect to onboarding on login.
	 *
	 * @return void
	 */
	public static function enable_redirect() {
		  \set_transient( Options::get_option_name( 'redirect_param' ), '0', 30 );
	}

	/**
	 * Removes the onboarding login redirect action.
	 *
	 * @return bool
	 */
	public static function remove_handle_redirect_action() {
		 return \remove_action( 'login_redirect', array( __CLASS__, 'handle_redirect' ) );
	}
}
