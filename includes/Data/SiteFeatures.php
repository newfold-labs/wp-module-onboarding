<?php

namespace NewfoldLabs\WP\Module\Onboarding\Data;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;

final class SiteFeatures {

	protected static $default_plugins = array(
		array(
			'slug'     => '1',
			'icon'     => 'icon-name',
			'title'    => 'Security, Speed & Growth',
			'subtitle' => 'Powered by Jetpack',
			'desc'     => 'Jetpack',
			'selected' => false,
		),
		array(
			'slug'     => '2',
			'icon'     => 'icon-name',
			'title'    => 'Forms',
			'subtitle' => 'Powered by WP Forms',
			'desc'     => 'WP Forms',
			'selected' => true,
		),
		array(
			'slug'     => '3',
			'icon'     => 'icon-name',
			'title'    => 'Site Traffic',
			'subtitle' => 'Powered by MonsterInsights',
			'desc'     => 'MonsterInsights',
			'selected' => true,
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
			'selected' => true,
		),
		array(
			'slug'     => '7',
			'icon'     => 'icon-name',
			'title'    => 'Enhanced Product Filters',
			'subtitle' => 'Powered by YITH',
			'desc'     => 'YITH',
			'selected' => true,
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
			'slug'     => '9',
			'icon'     => 'icon-name',
			'title'    => 'Product Wishlists',
			'subtitle' => 'Powered by YITH',
			'desc'     => 'YITH',
			'selected' => false,
		),
		array(
			'slug'     => '10',
			'icon'     => 'icon-name',
			'title'    => 'Lead Generation',
			'subtitle' => 'Powered by Optin Monster',
			'desc'     => 'Optin Monster',
			'selected' => true,
		),
	);



	public static function get_default_plugins_list() {
		return self::$default_plugins;
	}

	public static function get_custom_plugins_list() {

		 return self::get_default_plugins_list();
	}

}
