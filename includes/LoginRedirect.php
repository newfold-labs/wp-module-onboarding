<?php
namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Data\Data;
use NewfoldLabs\WP\Module\Onboarding\Data\Options;

use function WP_Forge\Helpers\dataGet;

/**
 * Contains functionalities that redirect users to onboarding upon logging into WordPress.
 */
class LoginRedirect {
	/**
	 * Redirect hook for Single Sign-On (SSO) logins.
	 *
	 * @param string $original_redirect The requested redirect URL.
	 * @return string The filtered URL to redirect to.
	 */
	public static function sso( $original_redirect ) {
		// Handle the redirect to onboarding query parameter.
		self::handle_redirect_param();
		return self::filter_redirect( $original_redirect, wp_get_current_user() );
	}

	/**
	 * Redirect hook for direct WordPress logins.
	 *
	 * @param string           $original_redirect           The requested redirect URL.
	 * @param string           $requested_original_redirect The requested redirect URL from the parameter.
	 * @param WP_User|WP_Error $user                        The current logged-in user or WP_Error on login failure.
	 * @return string The filtered URL to redirect to.
	 */
	public static function wplogin( $original_redirect, $requested_original_redirect, $user ) {
		// Handle the redirect to onboarding query parameter.
		self::handle_redirect_param();

		// wp-login.php runs this filter upon loading and during login failures.
		// We should perform a redirect only upon a successful user login.
		if ( ! ( $user instanceof \WP_User ) ) {
			return $original_redirect;
		}
		return self::filter_redirect( $original_redirect, $user );
	}

	/**
	 * Evaluate whether the redirect should point to onboarding.
	 *
	 * @param string  $original_redirect The requested redirect URL.
	 * @param WP_User $user              The logged in user.
	 * @return string The filtered URL to redirect to.
	 */
	public static function filter_redirect( $original_redirect, $user ) {
		// Only administrators should receive the onboarding redirect.
		if ( ! user_can( $user, 'manage_options' ) ) {
			return $original_redirect;
		}

		// Handle the redirect to onboarding WordPress option.
		$redirect_option_name = Options::get_option_name( 'redirect' );
		$redirect_option      = get_option( $redirect_option_name );
		if ( '0' === $redirect_option ) {
			return $original_redirect;
		} elseif ( '1' === $redirect_option ) {
			return admin_url( '/index.php?page=' . WP_Admin::$slug );
		}

		// Don't redirect to onboarding if onboarding was exited or completed.
		$flow_data = get_option( Options::get_option_name( 'flow' ), false );
		if ( dataGet( $flow_data, 'hasExited' ) || dataGet( $flow_data, 'isComplete' ) ) {
			return $original_redirect;
		}

		// Don't redirect to onboarding if the site is not a fresh installation.
		if ( false === Data::is_fresh_installation() ) {
			return $original_redirect;
		}

		// Don't redirect to onboarding if the 'coming_soon' mode is off. The user has launched their site.
		if ( ! Data::coming_soon() ) {
			return $original_redirect;
		}

		// Redirect to onboarding
		return admin_url( '/index.php?page=' . WP_Admin::$slug );
	}

	/**
	 * Sets an option that disables the redirect to onboarding on login.
	 *
	 * @return boolean
	 */
	public static function disable_redirect() {
		return update_option( Options::get_option_name( 'redirect' ), '0' );
	}

	/**
	 * Sets an option that enables the redirect to onboarding on login.
	 *
	 * @return boolean
	 */
	public static function enable_redirect() {
		return update_option( Options::get_option_name( 'redirect' ), '1' );
	}

	/**
	 * Removes the onboarding login redirect action.
	 *
	 * @return boolean
	 */
	public static function remove_handle_redirect_action() {
		return remove_action( 'login_redirect', array( __CLASS__, 'handle_redirect' ) );
	}

	/**
	 * Sets a WordPress option corresponding to the redirect parameter value.
	 *
	 * @return boolean
	 */
	private static function handle_redirect_param() {
		$redirect_option_name = Options::get_option_name( 'redirect' );
		if ( ! isset( $_GET[ $redirect_option_name ] ) ) {
			return false;
		}
		switch ( $_GET[ $redirect_option_name ] ) {
			case 'true':
				return self::enable_redirect();
			case 'false':
				return self::disable_redirect();
		}

		return false;
	}
}
