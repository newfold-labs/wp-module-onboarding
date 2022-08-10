<?php
namespace NewfoldLabs\WP\Module\Onboarding\Data;

final class Themes {
	protected static $nfd_slugs = array(
		'nfd_slug_yith_wonder' => array(
			'approved'   => true,
			'url'        => 'https://hiive.cloud/workers/plugin-downloads/yith-wonder-theme',
			'stylesheet' => 'yith-wonder',
		),
	);

	protected static $init_list = array(
		'default' => array(
			array(
				'slug'     => 'nfd_slug_yith_wonder',
				'activate' => true,
				'priority' => 20,
			),
		),
	);

	public static function get() {
		 return array(
			 'nfd_slugs' => self::$nfd_slugs,
		 );
	}

	public static function get_approved() {
		 return array(
			 'nfd_slugs' => array_keys( array_filter( self::$wp_slugs, array( __CLASS__, 'check_approved' ) ) ),
		 );
	}

	private static function check_approved( $value ) {
		 return $value['approved'] === true;
	}

	public static function get_init() {
		 return self::$init_list['default'];
	}
}
