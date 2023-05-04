<?php
namespace NewfoldLabs\WP\Module\Onboarding;

use DateTime;
use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Data\Options;

/**
 * Contains functionalities that redirect users to Onboarding on login to WordPress.
 */
class LoginRedirect {
	/**
	 * Handles the redirect to onboarding
	 *
	 * @param string $original_redirect The requested redirect URL
	 * @return string
	 */
	public static function handle_redirect( $original_redirect ) {
		// Don't redirect if user is not an admin
		if ( ! current_user_can( 'manage_options' ) ) {
			return $original_redirect;
		}

		$redirect_option_name = Options::get_option_name( 'redirect' );
		// If request has ?nfd_module_onboarding_redirect=false then temporarily disable the redirect
		if ( isset( $_GET[ $redirect_option_name ] )
			&& 'false' === $_GET[ $redirect_option_name ] ) {
			self::disable_redirect();
		}

		// Redirect was temporarily disabled via transient
		if ( \get_transient( Options::get_option_name( 'redirect_param' ) ) === '1' ) {
			return $original_redirect;
		}

		// Don't redirect if coming soon is off. User has launched their site
		if ( \get_option( Options::get_option_name( 'coming_soon', false ), 'true' ) !== 'true' ) {
			return $original_redirect;
		}

		// Don't redirect if they have intentionally exited or completed onboarding
		$flow_data = \get_option( Options::get_option_name( 'flow' ), false );
		if ( data_get( $flow_data, 'hasExited' ) || data_get( $flow_data, 'isComplete' ) ) {
			return $original_redirect;
		}

		// Check for disabled redirect database option: nfd_module_onboarding_redirect
		$redirect_option = \get_option( $redirect_option_name, null );
		// If not set, then set it to true
		if ( empty( $redirect_option ) ) {
			$redirect_option = \update_option( $redirect_option_name, true );
		}
		if ( ! $redirect_option ) {
			return $original_redirect;
		}

		// If site was created more than 72 hours ago, don't redirect to onboarding
		$install_date      = new DateTime( \get_option( Options::get_option_name( 'install_date', false ), gmdate( 'M d, Y' ) ) );
		$current_date      = new DateTime( gmdate( 'M d, Y' ) );
		$interval          = $current_date->diff( $install_date );
		$interval_in_hours = ( $interval->days * 24 ) + $interval->h;
		if ( $interval_in_hours >= 72 ) {
			return $original_redirect;
		}

		// Finally, if we made it this far, then set the redirect URL to point to onboarding
		return \admin_url( '/index.php?page=nfd-onboarding' );
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
