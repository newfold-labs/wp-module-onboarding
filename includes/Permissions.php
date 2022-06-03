<?php
namespace NewfoldLabs\WP\Module\Onboarding;

/**
 * Permissions and Authorization constants and utilities.
 */
final class Permissions {

	/**
	 * WordPress Admin capability string
	 */
	const ADMIN = 'manage_options';

	public static function rest_get_plugin_install_hash() {
		return 'NFD_ONBOARDING_' . hash( 'sha256', NFD_ONBOARDING_VERSION . wp_salt( 'nonce' ) . site_url() );
	}

	public static function rest_verify_plugin_install_hash( $hash ) {
		return $hash === self::rest_get_plugin_install_hash();
	}

	/**
	 * Confirm REST API caller has ADMIN user capabilities.
	 *
	 * @return boolean
	 */
	public static function rest_is_authorized_admin() {
		return \is_user_logged_in() && \current_user_can( Permissions::ADMIN );
	}

	/**
	 * Confirm logged-in user is in wp-admin and has ADMIN user capabilities.
	 *
	 * @return boolean
	 */
	public static function is_authorized_admin() {
		return \is_admin() && self::rest_is_authorized_admin();
	}

} // END \NewfoldLabs\WP\Module\Onboarding\Permissions()
