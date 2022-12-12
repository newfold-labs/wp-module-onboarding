<?php

namespace NewfoldLabs\WP\Module\Onboarding\Data;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;

final class SiteFeatures {

	public static function get_site_features()
	{
		return array(
			'wp-setup'   => array(),
			'ecommerce' => array(
				'jetpack'                            => array(
					'slug'     => 'jetpack',
					'icon'     => '--site-features-security',
					'title'    => 'Security, Speed & Growth',
					'subtitle' => 'Powered by Jetpack',
					'desc'     => 'Jetpack',
					'selected' => false,
					'shown'    => true,
				),
				'wpforms-lite'                       => array(
					'slug'     => 'wpforms-lite',
					'icon'     => '--site-features-form',
					'title'    => 'Forms',
					'subtitle' => 'Powered by WP Forms',
					'desc'     => 'WP Forms',
					'selected' => false,
					'shown'    => true,
				),
				'google-analytics-for-wordpress'     => array(
					'slug'     => 'google-analytics-for-wordpress',
					'icon'     => '--site-features-analytics',
					'title'    => 'Site Traffic',
					'subtitle' => 'Powered by MonsterInsights',
					'desc'     => 'MonsterInsights',
					'selected' => false,
					'shown'    => true,
				),
				'wordpress-seo'                      => array(
					'slug'     => 'wordpress-seo',
					'icon'     => '--site-features-share',
					'title'    => 'Search Engine Optimization',
					'subtitle' => 'Powered by Yoast',
					'desc'     => 'Yoast',
					'selected' => false,
					'shown'    => true,
				),
				'creative-mail-by-constant-contact'  => array(
					'slug'     => 'creative-mail-by-constant-contact',
					'icon'     => '--site-features-email',
					'title'    => 'Email Newsletters',
					'subtitle' => 'Powered by Creative Email',
					'desc'     => 'Creative Email',
					'selected' => false,
					'shown'    => true,
				),
				'yith-woocommerce-ajax-search'       => array(
					'slug'     => 'yith-woocommerce-ajax-search',
					'icon'     => '--site-features-search',
					'title'    => 'Enhanced Product Search',
					'subtitle' => 'Powered by YITH',
					'desc'     => 'YITH',
					'selected' => false,
					'shown'    => true,
				),
				'nfd_slug_yith_woocommerce_ajax_product_filter' => array(
					'slug'     => 'nfd_slug_yith_woocommerce_ajax_product_filter',
					'icon'     => '--site-features-filter',
					'title'    => 'Enhanced Product Filters',
					'subtitle' => 'Powered by YITH',
					'desc'     => 'YITH',
					'selected' => false,
					'shown'    => true,
				),
				'nfd_slug_yith_woocommerce_booking'  => array(
					'slug'     => 'nfd_slug_yith_woocommerce_booking',
					'icon'     => '--site-features-bookingcalendar',
					'title'    => 'Bookings & Appointments',
					'subtitle' => 'Powered by YITH',
					'desc'     => 'YITH',
					'selected' => false,
					'shown'    => true,
				),
				'nfd_slug_yith_woocommerce_wishlist' => array(
					'slug'     => 'nfd_slug_yith_woocommerce_wishlist',
					'icon'     => '--site-features-wishlist',
					'title'    => 'Product Wishlists',
					'subtitle' => 'Powered by YITH',
					'desc'     => 'YITH',
					'selected' => false,
					'shown'    => true,
				),
				'optinmonster'                       => array(
					'slug'     => 'optinmonster',
					'icon'     => '--site-features-lead',
					'title'    => 'Lead Generation',
					'subtitle' => 'Powered by Optin Monster',
					'desc'     => 'Optin Monster',
					'selected' => false,
					'shown'    => true,
				),
			),
		);
	}

	public static function mark_initial_plugins() {
		$flow              = Data::current_flow();
		$installed_plugins = Plugins::get_init();

		// Get a Copy of the list for alteration
		$site_features_marked = self::get_site_features()[ $flow ];

		foreach ( $installed_plugins as $installed_plugin ) {
			if ( isset( $site_features_marked[ $installed_plugin['slug'] ] ) ) {
				$site_features_marked[ $installed_plugin['slug'] ]['selected'] = true;
			}
		}

		return $site_features_marked;
	}

	public static function get() {
		return self::mark_initial_plugins();
	}

}
