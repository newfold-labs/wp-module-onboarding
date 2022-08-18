<?php
namespace NewfoldLabs\WP\Module\Onboarding\Data;

/**
 * List of Plugin Slugs/URLs/Domains
 */
final class Plugins {

	/*
	 A value of true indicates that the slug/url/domain has been approved.
	   A value of null indicates that the slug/url/domain has not been approved
	   (or) has been temporarily deactivated.
	*/

	protected static $wp_slugs = array(
		'jetpack'                        => array(
			'approved' => true,
			'path'     => 'jetpack/jetpack.php',
		),
		'woocommerce'                    => array(
			'approved' => true,
			'path'     => 'woocommerce/woocommerce.php',
		),
		'wordpress-seo'                  => array(
			'approved' => true,
			'path'     => 'wordpress-seo/wp-seo.php',
		),
		'wpforms-lite'                   => array(
			'approved' => true,
			'path'     => 'wpforms-lite/wpforms.php',
		),
		'google-analytics-for-wordpress' => array(
			'approved' => true,
			'path'     => 'google-analytics-for-wordpress/googleanalytics.php',
		),
		'optinmonster'                   => array(
			'approved' => true,
			'path'     => 'optinmonster/optin-monster-wp-api.php',
		),
		'yith-woocommerce-ajax-search'   => array(
			'approved' => true,
			'path'     => 'yith-woocommerce-ajax-search/init.php',
		),
	);

	 /**
	  * Contains a list of zip url's with a unique "nfd_slug" for each.
	  *
	  * @var array
	  */
	protected static $nfd_slugs = array(
		'nfd_slug_endurance_page_cache'                  => array(
			'approved' => true,
			'url'      => 'https://raw.githubusercontent.com/bluehost/endurance-page-cache/production/endurance-page-cache.php',
			'path'     => WP_CONTENT_DIR . '/mu-plugins/endurance-page-cache.php',
		),
		'nfd_slug_yith_woocommerce_customize_myaccount_page' => array(
			'approved' => true,
			'url'      => 'https://hiive.cloud/workers/plugin-downloads/yith-woocommerce-customize-myaccount-page',
			'path'     => 'yith-woocommerce-customize-myaccount-page-extended/init.php',
		),
		'nfd_slug_yith_woocommerce_gift_cards'           => array(
			'approved' => true,
			'url'      => 'https://hiive.cloud/workers/plugin-downloads/yith-woocommerce-gift-cards',
			'path'     => 'yith-woocommerce-gift-cards-extended/init.php',
		),
		'nfd_slug_ecomdash_wordpress_plugin'             => array(
			'approved' => true,
			'url'      => 'https://hiive.cloud/workers/plugin-downloads/ecomdash-wordpress-plugin',
			'path'     => 'ecomdash-wordpress-plugin/ecomdash-plugin.php',
		),
		'nfd_slug_yith_paypal_payments_for_woocommerce'  => array(
			'approved' => true,
			'url'      => 'https://hiive.cloud/workers/plugin-downloads/yith-paypal-payments-for-woocommerce',
			'path'     => 'yith-paypal-payments-for-woocommerce-extended/init.php',
		),
		'nfd_slug_yith_shippo_shippings_for_woocommerce' => array(
			'approved' => true,
			'url'      => 'https://hiive.cloud/workers/plugin-downloads/yith-shippo-shippings-for-woocommerce',
			'path'     => 'yith-shippo-shippings-for-woocommerce-extended/init.php',
		),
		'nfd_slug_yith_woocommerce_ajax_product_filter'  => array(
			'approved' => true,
			'url'      => 'https://hiive.cloud/workers/plugin-downloads/yith-woocommerce-ajax-product-filter',
			'path'     => 'yith-woocommerce-ajax-product-filter-extended/init.php',
		),
		'nfd_slug_yith_woocommerce_booking'              => array(
			'approved' => true,
			'url'      => 'https://hiive.cloud/workers/plugin-downloads/yith-woocommerce-booking',
			'path'     => 'yith-woocommerce-booking-extended/init.php',
		),
		'nfd_slug_yith_woocommerce_wishlist'             => array(
			'approved' => true,
			'url'      => 'https://hiive.cloud/workers/plugin-downloads/yith-woocommerce-wishlist',
			'path'     => 'yith-woocommerce-wishlist-extended/init.php',
		),
	);

	 /**
	  * @var array Initial plugins to be installed classified based on the hosting plan.
	  *
	  * Key 'default' contains a list of default plugins to be installed irrespective of the plan.
	  * Key <flow> contains a Key 'default' and a list of Key <subtype>'s.
	  * Key <flow> => 'default' contains a list of default plugin installs for <flow>.
	  * Key <flow> => <subtype> contains a list of plugins to be installed for a particular <subtype>.
	  *
	  * The final queue of Plugins to be installed makes use of a max heap and hence the greater the number the earlier
	  * a Plugin will be placed for install in the queue. This will also allow us to
	  * prevent entering negative numbers when queueing a plugin for earlier installs.
	  */
	protected static $init_list = array(
		'default'   => array(
			array(
				'slug'     => 'nfd_slug_endurance_page_cache',
				'activate' => true,
				'priority' => 240,
			),
			array(
				'slug'     => 'jetpack',
				'activate' => true,
				'priority' => 220,
			),
			array(
				'slug'     => 'wordpress-seo',
				'activate' => true,
				'priority' => 200,
			),
			array(
				'slug'     => 'wpforms-lite',
				'activate' => true,
				'priority' => 180,
			),
			array(
				'slug'     => 'google-analytics-for-wordpress',
				'activate' => true,
				'priority' => 160,
			),
			array(
				'slug'     => 'optinmonster',
				'activate' => true,
				'priority' => 140,
			),
		),
		'ecommerce' => array(
			'default'    => array(
				array(
					'slug'     => 'woocommerce',
					'activate' => true,
					'priority' => 260,
				),
				array(
					'slug'     => 'nfd_slug_yith_woocommerce_customize_myaccount_page',
					'activate' => true,
					'priority' => 257,
				),
				array(
					'slug'     => 'nfd_slug_yith_woocommerce_gift_cards',
					'activate' => true,
					'priority' => 100,
				),
				array(
					'slug'     => 'nfd_slug_yith_woocommerce_wishlist',
					'activate' => true,
					'priority' => 80,
				),
				array(
					'slug'     => 'nfd_slug_yith_shippo_shippings_for_woocommerce',
					'activate' => true,
					'priority' => 259,
				),
				array(
					'slug'     => 'nfd_slug_yith_paypal_payments_for_woocommerce',
					'activate' => true,
					'priority' => 258,
				),
			),
			'wc_premium' => array(
				array(
					'slug'     => 'nfd_slug_ecomdash_wordpress_plugin',
					'activate' => true,
					'priority' => 20,
				),
			),
		),
	);

	 // [TODO] Think about deprecating this approach and move to nfd_slugs for url based installs.
	protected static $urls = array(
		'https://downloads.wordpress.org/plugin/google-analytics-for-wordpress.8.5.3.zip' => true,
	);

	protected static $domains = array(
		'downloads.wordpress.org' => true,
		'nonapproveddomain.com'   => null,
	);

	/**
	 * @return array
	 */
	public static function get_wp_slugs() {
		return self::$wp_slugs;
	}

	/**
	 * @return array
	 */
	public static function get_urls() {
		return self::$urls;
	}

	/**
	 * @return array
	 */
	public static function get_domains() {
		return self::$domains;
	}

	/**
	 * Use this return value for a faster search of slug/url/domain.
	 *
	 * @return array
	 */
	public static function get() {
		return array(
			'wp_slugs'  => self::$wp_slugs,
			'nfd_slugs' => self::$nfd_slugs,
			'urls'      => self::$urls,
			'domains'   => self::$domains,
		);
	}

	/**
	 * Get approved slugs/urls/domains
	 *
	 * @return array
	 */
	public static function get_approved() {
		return array(
			'wp_slugs'  => array_keys( array_filter( self::$wp_slugs, array( __CLASS__, 'check_approved' ) ) ),
			'nfd_slugs' => array_keys( array_filter( self::$nfd_slugs, array( __CLASS__, 'check_approved' ) ) ),
			'urls'      => array_keys( self::$urls, true ),
			'domains'   => array_keys( self::$domains, true ),
		);
	}

	/**
	 * @param array $value
	 *
	 * Checks if $value has been approved.
	 *
	 * @return boolean
	 */
	private static function check_approved( $value ) {
		 return $value['approved'] === true;
	}

	/**
	 * Get the list of initial plugins to be installed for a particular hosting plan.
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
