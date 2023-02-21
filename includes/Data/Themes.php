<?php
namespace NewfoldLabs\WP\Module\Onboarding\Data;

/**
 * Class Themes
 */
final class Themes {
	/**
	 * Contains a list of zipped theme url's with a unique "nfd_slug" for each.
	 * A value of true indicates that the slug has been approved.
	 * A value of null indicates that the slug has not been approved
	 * (or) has been temporarily deactivated.
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
	 * Flow to necessary theme map.
	 * This is temporary, as we implement theme selections we can remove this.
	 *
	 * @var array
	 */
	protected static $flow_default_theme_slugs = array(
		'wp-setup'  => 'twentytwentythree',
		'ecommerce' => 'yith-wonder',
	);

	  /**
	   * Key 'default' contains a list of default themes to be installed irrespective of the plan.
	   * Key <flow> contains a Key 'default' and a list of Key <subtype>'s.
	   * Key <flow> => 'default' contains a list of default theme installs for <flow>.
	   * Key <flow> => <subtype> contains a list of themes to be installed for a particular <subtype>.
	   *
	   * The final queue of themes to be installed makes use of a max heap and hence the greater the number the earlier
	   * a theme will be placed for install in the queue. This will also allow us to
	   * prevent entering negative numbers when queueing a theme for earlier installs.
	   *
	   * @var array Initial themes to be installed classified based on the hosting plan.
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
	  * Returns the list of themes in a data structure that is faster to search.
	  *
	  * @return array
	  */
	public static function get() {
		 return array(
			 'nfd_slugs' => self::$nfd_slugs,
		 );
	}

	 /**
	  * Get all the approved theme slugs.
	  *
	  * @return array
	  */
	public static function get_approved() {
		 return array(
			 'nfd_slugs' => array_keys( array_filter( self::$nfd_slugs, array( __CLASS__, 'check_approved' ) ) ),
		 );
	}

	/**
	 * Checks if a slug has been approved.
	 *
	 * @param string $value The slug to check for
	 * @return boolean
	 */
	private static function check_approved( $value ) {
		return true === $value['approved'];
	}

	 /**
	  * Get the number of previews that will be fetched in each step.
	  * This helps us show the number of necessary skeletons in the front end.
	  *
	  * @return array
	  */
	public static function step_preview_data() {
		$theme_step_data                                  = Patterns::get_count_of_patterns();
		$site_features                                    = count( SiteFeatures::get() );
		$theme_step_data['site-features']['previewCount'] = $site_features;
		return $theme_step_data;
	}

	 /**
	  * Get a list of initial themes to be installed for a particular hosting plan.
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
			if ( 'default' !== $plan_subtype && isset( self::$init_list[ $plan_flow ][ $plan_subtype ] ) ) {
				$init_list = array_merge( $init_list, self::$init_list[ $plan_flow ][ $plan_subtype ] );
			}
		}

		return $init_list;
	}

	/**
	 * Get the default necessary theme for a particular flow.
	 * This is temporary, as we implement theme selections we can remove this.
	 *
	 * @param string $flow The flow to get the theme for.
	 * @return string|boolean
	 */
	public static function get_flow_default_theme_slug( $flow ) {
		return isset( self::$flow_default_theme_slugs[ $flow ] ) ? self::$flow_default_theme_slugs[ $flow ] : false;
	}
}
