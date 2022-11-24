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
		),
		array(
			'slug'     => '2',
			'icon'     => 'icon-name',
			'title'    => 'Forms',
			'subtitle' => 'Powered by WP Forms',
			'desc'     => 'WP Forms',
		),
		array(
			'slug'     => '3',
			'icon'     => 'icon-name',
			'title'    => 'Site Traffic',
			'subtitle' => 'Powered by MonsterInsights',
			'desc'     => 'MonsterInsights',
		),
		array(
			'slug'     => '4',
			'icon'     => 'icon-name',
			'title'    => 'Search Engine Optimization',
			'subtitle' => 'Powered by Yoast',
			'desc'     => 'Yoast',
		),
		array(
			'slug'     => '5',
			'icon'     => 'icon-name',
			'title'    => 'Email Newsletters',
			'subtitle' => 'Powered by Creative Email',
			'desc'     => 'Creative Email',
		),
		array(
			'slug'     => '6',
			'icon'     => 'icon-name',
			'title'    => 'Enhanced Product Search',
			'subtitle' => 'Powered by YITH',
			'desc'     => 'YITH',
		),
		array(
			'slug'     => '7',
			'icon'     => 'icon-name',
			'title'    => 'Enhanced Product Filters',
			'subtitle' => 'Powered by YITH',
			'desc'     => 'YITH',
		),
		array(
			'slug'     => '8',
			'icon'     => 'icon-name',
			'title'    => 'Bookings & Appointments',
			'subtitle' => 'Powered by YITH',
			'desc'     => 'YITH',
		),
		array(
			'slug'     => '9',
			'icon'     => 'icon-name',
			'title'    => 'Product Wishlists',
			'subtitle' => 'Powered by YITH',
			'desc'     => 'YITH',
		),
		array(
			'slug'     => '10',
			'icon'     => 'icon-name',
			'title'    => 'Lead Generation',
			'subtitle' => 'Powered by Optin Monster',
			'desc'     => 'Optin Monster',
		),
	);



	public static function get_default_plugins_list() {
		return self::$default_plugins;
	}

	public static function get_custom_plugins_list() {

		 return self::get_default_plugins_list();
	}

}
