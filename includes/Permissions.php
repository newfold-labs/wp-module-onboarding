<?php
namespace NewfoldLabs\WP\Module\Onboarding;

/**
 * Permissions and Authorization constants and utilities.
 */
final class Permissions {

	/**
	 * WordPress Admin capability string
	 */
	const ADMIN          = 'manage_options';
	const INSTALL_THEMES = 'install_themes';
	const EDIT_THEMES    = 'edit_themes';

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

	public static function rest_can_manage_themes() {
		return \is_user_logged_in() &&
			   \current_user_can( Permissions::INSTALL_THEMES ) &&
			   \current_user_can( Permissions::EDIT_THEMES );
	}

	/**
	 * Confirm whether user has ADMIN user and edit_post capabilities for creating pages.
	 *
	 * @return boolean
	 */
	public static function custom_post_authorized_admin() {
		return \current_user_can('edit_posts') && \current_user_can(Permissions::ADMIN);
	}

} // END \NewfoldLabs\WP\Module\Onboarding\Permissions()

