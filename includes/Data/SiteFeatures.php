<?php

namespace NewfoldLabs\WP\Module\Onboarding\Data;

/**
 * Class SiteFeatures
 */
final class SiteFeatures {
	/**
	 * Contains the map of site features for a particular flow and plan.
	 *
	 * @var array
	 */
	protected static function get_site_features_flow_plan_map() {
		return array(
			'wp-setup'  => array(
				'default' => array(
					'jetpack'                           => array(
						'slug'     => 'jetpack',
						'icon'     => '--site-features-security',
						'title'    => __( 'Security, Speed & Growth', 'wp-module-onboarding' ),
						'subtitle' => __( 'Powered by Jetpack', 'wp-module-onboarding' ),
						'desc'     => __( 'Jetpack includes dozens of powerful, unique capabilities for your WordPress sites from Automattic.', 'wp-module-onboarding' ),
						'selected' => false,
						'shown'    => true,
					),
					'wpforms-lite'                      => array(
						'slug'     => 'wpforms-lite',
						'icon'     => '--site-features-form',
						'title'    => __( 'Forms', 'wp-module-onboarding' ),
						'subtitle' => __( 'Powered by WP Forms', 'wp-module-onboarding' ),
						'desc'     => __( 'Five million people build smarter forms and surveys with WPForms from Awesome Motive.', 'wp-module-onboarding' ),
						'selected' => false,
						'shown'    => true,
					),
					'google-analytics-for-wordpress'    => array(
						'slug'     => 'google-analytics-for-wordpress',
						'icon'     => '--site-features-analytics',
						'title'    => __( 'Site Traffic', 'wp-module-onboarding' ),
						'subtitle' => __( 'Powered by MonsterInsights', 'wp-module-onboarding' ),
						'desc'     => __( 'See the opportunities in your website analytics traffic data using MonsterInsights from Awesome Motive.', 'wp-module-onboarding' ),
						'selected' => false,
						'shown'    => true,
					),
					'wordpress-seo'                     => array(
						'slug'     => 'wordpress-seo',
						'icon'     => '--site-features-share',
						'title'    => __( 'Search Engine Optimization', 'wp-module-onboarding' ),
						'subtitle' => __( 'Powered by Yoast', 'wp-module-onboarding' ),
						'desc'     => __( 'Get more traffic to your WordPress site with powerful analysis and tools from our colleagues at Yoast.', 'wp-module-onboarding' ),
						'selected' => false,
						'shown'    => true,
					),
					'creative-mail-by-constant-contact' => array(
						'slug'     => 'creative-mail-by-constant-contact',
						'icon'     => '--site-features-email',
						'title'    => __( 'Email Newsletters', 'wp-module-onboarding' ),
						'subtitle' => __( 'Powered by Creative Email', 'wp-module-onboarding' ),
						'desc'     => __( 'A professional logo builder, marketing automations with WooCommerce and social management -- CreativeMail is a whole lot more than mail from Constant Contact.', 'wp-module-onboarding' ),
						'selected' => false,
						'shown'    => true,
					),
					'optinmonster'                      => array(
						'slug'     => 'optinmonster',
						'icon'     => '--site-features-lead',
						'title'    => __( 'Lead Generation', 'wp-module-onboarding' ),
						'subtitle' => __( 'Powered by Optin Monster', 'wp-module-onboarding' ),
						'desc'     => __( 'Connect with website visitors using a proven kit of tools for growth using this offering from Awesome Motive.', 'wp-module-onboarding' ),
						'selected' => false,
						'shown'    => true,
					),
				),
			),
			'ecommerce' => array(
				'default'     => array(
					'jetpack'                           => array(
						'slug'     => 'jetpack',
						'icon'     => '--site-features-security',
						'title'    => __( 'Security, Speed & Growth', 'wp-module-onboarding' ),
						'subtitle' => __( 'Powered by Jetpack', 'wp-module-onboarding' ),
						'desc'     => __( 'Jetpack includes dozens of powerful, unique capabilities for your WordPress sites from Automattic.', 'wp-module-onboarding' ),
						'selected' => false,
						'shown'    => true,
					),
					'wpforms-lite'                      => array(
						'slug'     => 'wpforms-lite',
						'icon'     => '--site-features-form',
						'title'    => __( 'Forms', 'wp-module-onboarding' ),
						'subtitle' => __( 'Powered by WP Forms', 'wp-module-onboarding' ),
						'desc'     => __( 'Five million people build smarter forms and surveys with WPForms from Awesome Motive.', 'wp-module-onboarding' ),
						'selected' => false,
						'shown'    => true,
					),
					'google-analytics-for-wordpress'    => array(
						'slug'     => 'google-analytics-for-wordpress',
						'icon'     => '--site-features-analytics',
						'title'    => __( 'Site Traffic', 'wp-module-onboarding' ),
						'subtitle' => __( 'Powered by MonsterInsights', 'wp-module-onboarding' ),
						'desc'     => __( 'See the opportunities in your website analytics traffic data using MonsterInsights from Awesome Motive.', 'wp-module-onboarding' ),
						'selected' => false,
						'shown'    => true,
					),
					'wordpress-seo'                     => array(
						'slug'     => 'wordpress-seo',
						'icon'     => '--site-features-share',
						'title'    => __( 'Search Engine Optimization', 'wp-module-onboarding' ),
						'subtitle' => __( 'Powered by Yoast', 'wp-module-onboarding' ),
						'desc'     => __( 'Get more traffic to your WordPress site with powerful analysis and tools from our colleagues at Yoast.', 'wp-module-onboarding' ),
						'selected' => false,
						'shown'    => true,
					),
					'creative-mail-by-constant-contact' => array(
						'slug'     => 'creative-mail-by-constant-contact',
						'icon'     => '--site-features-email',
						'title'    => __( 'Email Newsletters', 'wp-module-onboarding' ),
						'subtitle' => __( 'Powered by Creative Email', 'wp-module-onboarding' ),
						'desc'     => __( 'A professional logo builder, marketing automations with WooCommerce and social management -- CreativeMail is a whole lot more than mail from Constant Contact.', 'wp-module-onboarding' ),
						'selected' => false,
						'shown'    => true,
					),
					'optinmonster'                      => array(
						'slug'     => 'optinmonster',
						'icon'     => '--site-features-lead',
						'title'    => __( 'Lead Generation', 'wp-module-onboarding' ),
						'subtitle' => __( 'Powered by Optin Monster', 'wp-module-onboarding' ),
						'desc'     => __( 'Connect with website visitors using a proven kit of tools for growth using this offering from Awesome Motive.', 'wp-module-onboarding' ),
						'selected' => false,
						'shown'    => true,
					),
				),
				'wc_standard' => array(
					'yith-woocommerce-ajax-search'       => array(
						'slug'     => 'yith-woocommerce-ajax-search',
						'icon'     => '--site-features-search',
						'title'    => __( 'Enhanced Product Search', 'wp-module-onboarding' ),
						'subtitle' => __( 'Powered by YITH', 'wp-module-onboarding' ),
						'desc'     => __( 'Give your visitors great search experiences with this exclusive offering from our colleagues at YITH.', 'wp-module-onboarding' ),
						'selected' => false,
						'shown'    => true,
					),
					'nfd_slug_yith_woocommerce_ajax_product_filter' => array(
						'slug'     => 'nfd_slug_yith_woocommerce_ajax_product_filter',
						'icon'     => '--site-features-filter',
						'title'    => __( 'Enhanced Product Filters', 'wp-module-onboarding' ),
						'subtitle' => __( 'Powered by YITH', 'wp-module-onboarding' ),
						'desc'     => __( 'Give your visitors powerful tools to discover your great products with this exclusive offering from our colleagues at YITH.', 'wp-module-onboarding' ),
						'selected' => false,
						'shown'    => true,
					),
					'nfd_slug_yith_woocommerce_booking'  => array(
						'slug'     => 'nfd_slug_yith_woocommerce_booking',
						'icon'     => '--site-features-bookingcalendar',
						'title'    => __( 'Bookings & Appointments', 'wp-module-onboarding' ),
						'subtitle' => __( 'Powered by YITH', 'wp-module-onboarding' ),
						'desc'     => __( 'Have visitors book meetings and services with you, accepting payment and more using this exclusive offering from our colleagues at YITH.', 'wp-module-onboarding' ),
						'selected' => false,
						'shown'    => true,
					),
					'nfd_slug_yith_woocommerce_wishlist' => array(
						'slug'     => 'nfd_slug_yith_woocommerce_wishlist',
						'icon'     => '--site-features-wishlist',
						'title'    => __( 'Product Wishlists', 'wp-module-onboarding' ),
						'subtitle' => __( 'Powered by YITH', 'wp-module-onboarding' ),
						'desc'     => __( 'Let discerning shoppers curate their selections with a system of favorites using this exclusive offering from our colleagues at YITH.', 'wp-module-onboarding' ),
						'selected' => false,
						'shown'    => true,
					),
				),
				'wc_premium'  => array(
					'yith-woocommerce-ajax-search'       => array(
						'slug'     => 'yith-woocommerce-ajax-search',
						'icon'     => '--site-features-search',
						'title'    => __( 'Enhanced Product Search', 'wp-module-onboarding' ),
						'subtitle' => __( 'Powered by YITH', 'wp-module-onboarding' ),
						'desc'     => __( 'Give your visitors great search experiences with this exclusive offering from our colleagues at YITH.', 'wp-module-onboarding' ),
						'selected' => false,
						'shown'    => true,
					),
					'nfd_slug_yith_woocommerce_ajax_product_filter' => array(
						'slug'     => 'nfd_slug_yith_woocommerce_ajax_product_filter',
						'icon'     => '--site-features-filter',
						'title'    => __( 'Enhanced Product Filters', 'wp-module-onboarding' ),
						'subtitle' => __( 'Powered by YITH', 'wp-module-onboarding' ),
						'desc'     => __( 'Give your visitors powerful tools to discover your great products with this exclusive offering from our colleagues at YITH.', 'wp-module-onboarding' ),
						'selected' => false,
						'shown'    => true,
					),
					'nfd_slug_yith_woocommerce_booking'  => array(
						'slug'     => 'nfd_slug_yith_woocommerce_booking',
						'icon'     => '--site-features-bookingcalendar',
						'title'    => __( 'Bookings & Appointments', 'wp-module-onboarding' ),
						'subtitle' => __( 'Powered by YITH', 'wp-module-onboarding' ),
						'desc'     => __( 'Have visitors book meetings and services with you, accepting payment and more using this exclusive offering from our colleagues at YITH.', 'wp-module-onboarding' ),
						'selected' => false,
						'shown'    => true,
					),
					'nfd_slug_yith_woocommerce_wishlist' => array(
						'slug'     => 'nfd_slug_yith_woocommerce_wishlist',
						'icon'     => '--site-features-wishlist',
						'title'    => __( 'Product Wishlists', 'wp-module-onboarding' ),
						'subtitle' => __( 'Powered by YITH', 'wp-module-onboarding' ),
						'desc'     => __( 'Let discerning shoppers curate their selections with a system of favorites using this exclusive offering from our colleagues at YITH.', 'wp-module-onboarding' ),
						'selected' => false,
						'shown'    => true,
					),
				),
				'wc_priority' => array(),
			),
		);
	}

	/**
	 * Retrieves all the site features for a particular flow and plan.
	 *
	 * @return array
	 */
	public static function get() {
		$plan_data                   = Data::current_plan();
		$plan_flow                   = $plan_data['flow'];
		$plan_subtype                = $plan_data['subtype'];
		$site_features_flow_plan_map = self::get_site_features_flow_plan_map();

		$site_features = array();
		if ( $plan_flow && isset( $site_features_flow_plan_map[ $plan_flow ] ) ) {
			if ( isset( $site_features_flow_plan_map[ $plan_flow ]['default'] ) ) {
				$site_features = array_merge( $site_features, $site_features_flow_plan_map[ $plan_flow ]['default'] );
			}
			if ( 'default' !== $plan_subtype && isset( $site_features_flow_plan_map[ $plan_flow ][ $plan_subtype ] ) ) {
				$site_features = array_merge( $site_features, $site_features_flow_plan_map[ $plan_flow ][ $plan_subtype ] );
			}
		}
		return $site_features;
	}

	/**
	 * Retrieves all the site features for a particular flow and plan, marks
	 * each one as selected based on whether it has already been installed
	 * or is in the install queue.
	 *
	 * @return array
	 */
	public static function get_with_selections() {
		$site_features = self::get();
		if ( empty( $site_features ) ) {
			return array();
		}

		$installed_plugins = Plugins::get_init();
		foreach ( $installed_plugins as $installed_plugin ) {
			if ( isset( $site_features[ $installed_plugin['slug'] ] ) ) {
				$site_features[ $installed_plugin['slug'] ]['selected'] = true;
			}
		}

		return $site_features;
	}
}
