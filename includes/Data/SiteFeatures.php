<?php

namespace NewfoldLabs\WP\Module\Onboarding\Data;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;

final class SiteFeatures {

	protected static $default_plugins = array(
		array(
			'slug'     => 'jetpack',
			'icon'     => 'icon-name',
			'title'    => 'Security, Speed & Growth',
			'subtitle' => 'Powered by Jetpack',
			'desc'     => 'Jetpack',
			'selected' => false,
		),
		array(
			'slug'     => 'wpforms-lite',
			'icon'     => 'icon-name',
			'title'    => 'Forms',
			'subtitle' => 'Powered by WP Forms',
			'desc'     => 'WP Forms',
			'selected' => false,
		),
		array(
			'slug'     => '3',
			'icon'     => 'icon-name',
			'title'    => 'Site Traffic',
			'subtitle' => 'Powered by MonsterInsights',
			'desc'     => 'MonsterInsights',
			'selected' => false,
		),
		array(
			'slug'     => '4',
			'icon'     => 'icon-name',
			'title'    => 'Search Engine Optimization',
			'subtitle' => 'Powered by Yoast',
			'desc'     => 'Yoast',
			'selected' => false,
		),
		array(
			'slug'     => '5',
			'icon'     => 'icon-name',
			'title'    => 'Email Newsletters',
			'subtitle' => 'Powered by Creative Email',
			'desc'     => 'Creative Email',
			'selected' => false,
		),
		array(
			'slug'     => '6',
			'icon'     => 'icon-name',
			'title'    => 'Enhanced Product Search',
			'subtitle' => 'Powered by YITH',
			'desc'     => 'YITH',
			'selected' => false,
		),
		array(
			'slug'     => '7',
			'icon'     => 'icon-name',
			'title'    => 'Enhanced Product Filters',
			'subtitle' => 'Powered by YITH',
			'desc'     => 'YITH',
			'selected' => false,
		),
		array(
			'slug'     => '8',
			'icon'     => 'icon-name',
			'title'    => 'Bookings & Appointments',
			'subtitle' => 'Powered by YITH',
			'desc'     => 'YITH',
			'selected' => false,
		),
		array(
			'slug'     => 'nfd_slug_yith_shippo_shippings_for_woocommerce',
			'icon'     => 'icon-name',
			'title'    => 'Product Wishlists',
			'subtitle' => 'Powered by YITH',
			'desc'     => 'YITH',
			'selected' => false,
		),
		array(
			'slug'     => 'optinmonster',
			'icon'     => 'icon-name',
			'title'    => 'Lead Generation',
			'subtitle' => 'Powered by Optin Monster',
			'desc'     => 'Optin Monster',
			'selected' => false,
		),
	);

	public static function convert_to_hash() {
		$idx                  = 0;
		$default_plugins_hash = array();

		foreach ( self::$default_plugins as $default_plugin ) {
			$default_plugins_hash[ $default_plugin['slug'] ] = $idx;
			$idx += 1;
		}

		return $default_plugins_hash;
	}

	public static function mark_installed_plugins() {
		$installed_plugins = Plugins::get_init();

		// Make an Hash Map for faster updation
		$default_plugins_hash = self::convert_to_hash();

		foreach ( $installed_plugins as $installed_plugin ) {
			if ( isset( $default_plugins_hash[ $installed_plugin['slug'] ] ) ) {
				self::$default_plugins[ $default_plugins_hash[ $installed_plugin['slug'] ] ]['selected'] = true;
			}
		}

	}


	public static function get_default_plugins_list() {
		self::mark_installed_plugins();
		return self::$default_plugins;
	}

	public static function get_custom_plugins_list() {

		 return self::get_default_plugins_list();
	}

}
