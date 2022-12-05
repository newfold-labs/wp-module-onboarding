<?php

namespace NewfoldLabs\WP\Module\Onboarding\Data;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;

final class SiteFeatures {

	protected static $default_plugins = array(
		'default' => array(),
		'ecommerce' => array(
			array(
				'slug'     => 'jetpack',
				'icon'     => '--site-features-security',
				'title'    => 'Security, Speed & Growth',
				'subtitle' => 'Powered by Jetpack',
				'desc'     => 'Jetpack',
				'selected' => false,
			),
			array(
				'slug'     => 'wpforms-lite',
				'icon'     => '--site-features-form',
				'title'    => 'Forms',
				'subtitle' => 'Powered by WP Forms',
				'desc'     => 'WP Forms',
				'selected' => false,
			),
			array(
				'slug'     => 'google-analytics-for-wordpress',
				'icon'     => '--site-features-analytics',
				'title'    => 'Site Traffic',
				'subtitle' => 'Powered by MonsterInsights',
				'desc'     => 'MonsterInsights',
				'selected' => false,
			),
			array(
				'slug'     => 'wordpress-seo',
				'icon'     => '--site-features-share',
				'title'    => 'Search Engine Optimization',
				'subtitle' => 'Powered by Yoast',
				'desc'     => 'Yoast',
				'selected' => false,
			),
			array(
				'slug'     => 'creative-mail-by-constant-contact',
				'icon'     => '--site-features-email',
				'title'    => 'Email Newsletters',
				'subtitle' => 'Powered by Creative Email',
				'desc'     => 'Creative Email',
				'selected' => false,
			),
			array(
				'slug'     => 'yith-woocommerce-ajax-search',
				'icon'     => '--site-features-search',
				'title'    => 'Enhanced Product Search',
				'subtitle' => 'Powered by YITH',
				'desc'     => 'YITH',
				'selected' => false,
			),
			array(
				'slug'     => 'nfd_slug_yith_woocommerce_ajax_product_filter',
				'icon'     => '--site-features-filter',
				'title'    => 'Enhanced Product Filters',
				'subtitle' => 'Powered by YITH',
				'desc'     => 'YITH',
				'selected' => false,
			),
			array(
				'slug'     => 'nfd_slug_yith_woocommerce_booking',
				'icon'     => '--site-features-bookingcalendar',
				'title'    => 'Bookings & Appointments',
				'subtitle' => 'Powered by YITH',
				'desc'     => 'YITH',
				'selected' => false,
			),
			array(
				'slug'     => 'nfd_slug_yith_woocommerce_wishlist',
				'icon'     => '--site-features-wishlist',
				'title'    => 'Product Wishlists',
				'subtitle' => 'Powered by YITH',
				'desc'     => 'YITH',
				'selected' => false,
			),
			array(
				'slug'     => 'optinmonster',
				'icon'     => '--site-features-lead',
				'title'    => 'Lead Generation',
				'subtitle' => 'Powered by Optin Monster',
				'desc'     => 'Optin Monster',
				'selected' => false,
			),
		)
	);

	public static function convert_to_hash() {
		$idx                  = 0;
		$flow = Data::current_flow();
		$default_plugins_hash = array();

		foreach ( self::$default_plugins[$flow] as $default_plugin ) {
			$default_plugins_hash[ $default_plugin['slug'] ] = $idx;
			$idx += 1;
		}

		return $default_plugins_hash;
	}

	public static function mark_initial_plugins() {
		$flow = Data::current_flow();
		$installed_plugins = Plugins::get_init();

		// Make an Hash Map for faster updation
		$default_plugins_hash = self::convert_to_hash();

		foreach ( $installed_plugins as $installed_plugin ) {
			if ( isset( $default_plugins_hash[ $installed_plugin['slug'] ] ) ) {
				self::$default_plugins[$flow][ $default_plugins_hash[ $installed_plugin['slug'] ] ]['selected'] = true;
			}
		}

	}


	public static function get_default_plugins_list() {
		$flow = Data::current_flow();
		self::mark_initial_plugins();
		return self::$default_plugins[$flow];
	}

	public static function get_custom_plugins_list() {

		 return self::get_default_plugins_list();
	}

}
