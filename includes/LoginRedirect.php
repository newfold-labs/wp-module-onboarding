<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Data\Data;
use NewfoldLabs\WP\Module\Onboarding\Data\Options;

use function NewfoldLabs\WP\ModuleLoader\container;

/**
 * Contains functionalities that redirect users to Onboarding on login to WordPress.
 */
class LoginRedirect {
	/**
	 * Redirect hook for SSO Logins
	 *
	 * @param string $original_redirect The requested redirect URL
	 *
	 * @return string The filtered url to redirect to
	 */
	public static function sso( $original_redirect ) {
		return self::filter_redirect( $original_redirect, wp_get_current_user() );
	}

	/**
	 * Redirect hook for direct WP Logins
	 *
	 * @param string $original_redirect The requested redirect URL
	 * @param string $requested_original_redirect The requested redirect URL from parameter
	 * @param WP_User|WP_Error $user The current logged in user or WP_Error on login failure
	 *
	 * @return string The filtered URL to redirect to
	 */
	public static function wplogin( $original_redirect, $requested_original_redirect, $user ) {
		// wp-login.php runs this filter on load and login failures
		// We should only do a redirect with a successful user login
		if ( ! ( $user instanceof \WP_User ) ) {
			return $original_redirect;
		}

		return self::filter_redirect( $original_redirect, $user );
	}

	/**
	 * Evaluate whether the redirect should point to onboarding
	 *
	 * @param string $original_redirect The requested redirect URL
	 * @param \WP_User $user The logged-in user
	 *
	 * @return string The filtered url to redirect to
	 */
	public static function filter_redirect( $original_redirect, $user ) {

		$onboarding_redirect = admin_url( '/index.php?page=nfd-onboarding' );

		// Only admins should get the onboarding redirect
		if ( ! user_can( $user, 'manage_options' ) ) {
			return $original_redirect;
		}

		$redirect_option_name = Options::get_option_name( 'redirect' );

		// If request has ?nfd_module_onboarding_redirect={true|false} then enable/disable the redirect
		$shouldRedirect = filter_input( INPUT_GET, $redirect_option_name, FILTER_VALIDATE_BOOLEAN );

		// If URL parameter isn't set, then check the database option
		if ( is_null( $shouldRedirect ) ) {
			$shouldRedirect = get_option( $redirect_option_name, null );
		}

		// If we should explicitly handle the redirect, then update the database option and redirect accordingly
		if ( ! is_null( $shouldRedirect ) ) {
			update_option( $redirect_option_name, $shouldRedirect );

			return $shouldRedirect ? $onboarding_redirect : $original_redirect;
		}

		// In all other cases, determine whether to redirect based on a few conditions:

		// 1 - If user has previously completed or exited onboarding, then don't redirect
		$flow_data = \get_option( Options::get_option_name( 'flow' ), false );
		if ( data_get( $flow_data, 'hasExited' ) || data_get( $flow_data, 'isComplete' ) ) {
			update_option( $redirect_option_name, false );

			return $original_redirect;
		}

		// 2 - If the site is not a fresh WordPress installation, then don't redirect
		if ( ! container()->get('isFreshInstallation') ) {
			update_option( $redirect_option_name, false );

			return $original_redirect;
		}

		// 3 - If coming soon is off, then don't redirect (user has launched their site)
		if ( ! Data::coming_soon() ) {
			update_option( $redirect_option_name, false );

			return $original_redirect;
		}

		// If we made it here, then set the redirect URL to point to onboarding (and update the database option to prevent future redirects)
		update_option( $redirect_option_name, false );

		return $onboarding_redirect;
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
