<?php

namespace NewfoldLabs\WP\Module\Onboarding\Data;

use NewfoldLabs\WP\Module\Installer\Services\PluginInstaller;
use NewfoldLabs\WP\Module\Onboarding\Services\Ai\SiteGenServiceRequest;
use function NewfoldLabs\WP\ModuleLoader\container;

/**
 * Runtime data class.
 */
class Runtime {
	/**
	 * Runtime data for Onboarding application
	 */
	public static function get_data() {
		return array(
			'buildUrl'            => \NFD_ONBOARDING_BUILD_URL,
			'siteUrl'             => \get_site_url(),
			'restUrl'             => \get_home_url() . '/index.php?rest_route=',
			'adminUrl'            => \admin_url(),
			'status'              => get_option( Options::get_option_name( 'status' ) ),
			'pluginInstallHash'   => PluginInstaller::rest_get_plugin_install_hash(),
			'languages'           => Languages::get_all_languages(),
			'currentUserDetails'  => self::wp_current_user_details(),
			'isFreshInstallation' => self::is_fresh_installation(),
			'aiPlatformUrl'       => SiteGenServiceRequest::get_base_url(),
			'sentryInitDsnURL'    => 'https://cd5bd4c30b914e0d1d0f49413e600afa@o4506197201715200.ingest.us.sentry.io/4507383861805056',
			'currentBrand'        => self::current_brand(),
		);
	}

		/**
		 * Get the current WordPress admin user details.
		 *
		 * @return array
		 */
	public static function wp_current_user_details() {
		$user = wp_get_current_user();
		if ( $user->exists() ) {
			return array(
				'displayName' => $user->display_name,
				'avatarUrl'   => get_avatar_url( $user->ID ),
			);
		}

		// If no user is found, return an empty array or default values as appropriate
		return array(
			'displayName' => '',
			'avatarUrl'   => '',
		);
	}

	/**
	 * Returns whether the site is a fresh installation or not.
	 *
	 * @return boolean
	 */
	public static function is_fresh_installation() {
		if ( container()->has( 'isFreshInstallation' ) ) {
			return container()->get( 'isFreshInstallation' );
		}

		return false;
	}

	/**
	 * Determine whether the site is in coming soon mode.
	 *
	 * @return boolean
	 */
	public static function coming_soon() {
		if ( ! container()->has( 'comingSoon' ) ) {
			return false;
		}

		$coming_soon_service = container()->get( 'comingSoon' );
		return $coming_soon_service->is_enabled();
	}

	/**
	 * Get the current brand.
	 *
	 * @return array The configuration array of the current brand. If the specified brand is not found,
	 *               returns the default brand configuration.
	 */
	public static function current_brand() {
		$brands = Brands::get_brands();
		$brand = defined( 'NFD_ONBOARDING_PLUGIN_BRAND' ) ? NFD_ONBOARDING_PLUGIN_BRAND : 'bluehost';
		return array_key_exists( $brand, $brands ) ?
			$brands[ $brand ] :
			Brands::get_default_brand();
	}
}
