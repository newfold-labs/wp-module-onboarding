<?php
namespace NewfoldLabs\WP\Module\Onboarding\Data;

final class Themes {
	 /*
	 A value of true indicates that the slug has been approved.
	   A value of null indicates that the slug has not been approved
	   (or) has been temporarily deactivated.
	*/

	 /**
	  * Contains a list of zipped theme url's with a unique "nfd_slug" for each.
	  *
	  * @var array
	  */
	protected static $nfd_slugs = array(
		'nfd_slug_yith_wonder' => array(
			'approved'   => true,
			'url'        => 'https://hiive.cloud/workers/plugin-downloads/yith-wonder-theme',
			'stylesheet' => 'yith-wonder',
		),
	);

	 /**
	  * @var array Initial themes to be installed classified based on the hosting plan.
	  *
	  * Key 'default' contains a list of default themes to be installed irrespective of the plan.
	  * Key <flow> contains a Key 'default' and a list of Key <subtype>'s.
	  * Key <flow> => 'default' contains a list of default theme installs for <flow>.
	  * Key <flow> => <subtype> contains a list of themes to be installed for a particular <subtype>.
	  *
	  * The final queue of themes to be installed makes use of a max heap and hence the greater the number the earlier
	  * a theme will be placed for install in the queue. This will also allow us to
	  * prevent entering negative numbers when queueing a theme for earlier installs.
	  */
	protected static $init_list = array(
		'default'   => array(),
		'ecommerce' => array(
			'default' => array(
				array(
					'slug'     => 'nfd_slug_yith_wonder',
					'activate' => true,
					'priority' => 20,
				),
			),
		),
	);

	 /**
	  * Use this return value for a faster search of slugs.
	  *
	  * @return array
	  */
	public static function get() {
		 return array(
			 'nfd_slugs' => self::$nfd_slugs,
		 );
	}

	 /**
	  * Get approved theme slugs.
	  *
	  * @return array
	  */

	public static function get_approved() {
		 return array(
			 'nfd_slugs' => array_keys( array_filter( self::$wp_slugs, array( __CLASS__, 'check_approved' ) ) ),
		 );
	}

	private static function check_approved( $value ) {
		 return $value['approved'] === true;
	}

	 /**
	  * Get the list of initial themes to be installed for a particular hosting plan.
	  *
	  * @return array
	  */
	public static function get_init() {
		$plan_data    = Data::current_plan();
		$plan_flow    = $plan_data['flow'];
		$plan_subtype = $plan_data['subtype'];
		$init_list    = self::$init_list['default'];
		if ( $plan_flow && isset( self::$init_list[ $plan_flow ] ) ) {
			if ( isset( self::$init_list[ $plan_flow ]['default'] ) ) {
				  $init_list = array_merge( $init_list, self::$init_list[ $plan_flow ]['default'] );
			}
			if ( $plan_subtype !== 'default' && isset( self::$init_list[ $plan_flow ][ $plan_subtype ] ) ) {
				   $init_list = array_merge( $init_list, self::$init_list[ $plan_flow ][ $plan_subtype ] );
			}
		}

		return $init_list;
	}
}
