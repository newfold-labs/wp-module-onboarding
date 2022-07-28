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
		'jetpack'       => array(
               'approved' => true,
               'path'     => 'jetpack/jetpack.php'
          ),
		'woocommerce'   => array(
               'approved' => true,
               'path'     => 'woocommerce/woocommerce.php'
          ),
		'wordpress-seo' => array(
               'approved' => true,
               'path'     => 'wordpress-seo/wp-seo.php'
          ),
		'wpforms-lite'  => array(
               'approved' => true,
               'path'     => 'wpforms-lite/wpforms.php'
          ),
          'google-analytics-for-wordpress' => array(
               'approved' => true,
               'path'     => 'google-analytics-for-wordpress/googleanalytics.php'
          ),
          'optinmonster' => array(
               'approved' => true,
               'path'     => 'optinmonster/optin-monster-wp-api.php'
          )
	);

     protected static $nfd_slugs = array(
          'nfd_slug_endurance_page_cache' => array(
               'approved' => true,
               'url'      => 'https://raw.githubusercontent.com/bluehost/endurance-page-cache/production/endurance-page-cache.php',
               'path'     => WP_CONTENT_DIR . '/mu-plugins/endurance-page-cache.php'
          ),
          'nfd_slug_yith_woocommerce_customize_myaccount_page' => array(
               'approved' => true,
               'url'      => 'https://hiive.cloud/workers/plugin-downloads/yith-woocommerce-customize-myaccount-page',
               'path'     => 'yith-woocommerce-customize-myaccount-page-extended/init.php'
          ),
          'nfd_slug_yith_woocommerce_gift_cards' => array(
               'approved' => true,
               'url'      => 'https://hiive.cloud/workers/plugin-downloads/yith-woocommerce-gift-cards',
               'path'     => 'yith-woocommerce-gift-cards-extended/init.php'
          ),
          'nfd_slug_ecomdash_wordpress_plugin' => array(
               'approved' => true,
               'url'      => 'https://hiive.cloud/workers/plugin-downloads/ecomdash-wordpress-plugin',
               'path'     => '202207190850-ecomdash-wordpress-plugin-latest/ecomdash-plugin.php'
          ),
          'nfd_slug_yith_paypal_payments_for_woocommerce' => array(
               'approved' => true,
               'url'      => 'https://hiive.cloud/workers/plugin-downloads/yith-paypal-payments-for-woocommerce',
               'path'     => 'yith-paypal-payments-for-woocommerce-extended/init.php'
          ),
          'nfd_slug_yith_shippo_shippings_for_woocommerce' => array(
               'approved' => true,
               'url'      => 'https://hiive.cloud/workers/plugin-downloads/yith-shippo-shippings-for-woocommerce',
               'path'     => 'yith-shippo-shippings-for-woocommerce-extended/init.php'
          ),
          'nfd_slug_yith_woocommerce_ajax_product_filter' => array(
               'approved' => true,
               'url'      => 'https://hiive.cloud/workers/plugin-downloads/yith-woocommerce-ajax-product-filter',
               'path'     => 'yith-woocommerce-ajax-product-filter-extended/init.php'
          ),
          'nfd_slug_yith_woocommerce_booking' => array(
               'approved' => true,
               'url'      => 'https://hiive.cloud/workers/plugin-downloads/yith-woocommerce-booking',
               'path'     => ''
          ),
          'nfd_slug_yith_woocommerce_wishlist' => array(
               'approved' => true,
               'url'      => 'https://hiive.cloud/workers/plugin-downloads/yith-woocommerce-wishlist',
               'path'     => 'yith-woocommerce-wishlist-extended/init.php'
          ),
     );

     protected static $init_list = array(
          array(
               'slug' => 'woocommerce',
               'activate' => true
          ),
          array(
               'slug' => 'nfd_slug_endurance_page_cache',
               'activate' => true
          ),
          array(
               'slug' => 'jetpack',
               'activate' => true,
          ),
          array(
               'slug' => 'wordpress-seo',
               'activate' => true
          ),
          array(
               'slug' => 'wpforms-lite',
               'activate' => true
          ),
          array(
               'slug' => 'google-analytics-for-wordpress',
               'activate' => true
          ),
          array(
               'slug' => 'optinmonster',
               'activate' => true
          ),
          array(
               'slug' => 'nfd_slug_yith_woocommerce_customize_myaccount_page',
               'activate' => true
          ),
          array(
               'slug' => 'nfd_slug_yith_woocommerce_gift_cards',
               'activate' => true
          ),
          array(
               'slug' => 'nfd_slug_yith_woocommerce_wishlist',
               'activate' => true
          ),
          array(
               'slug' => 'nfd_slug_yith_shippo_shippings_for_woocommerce',
               'activate' => true
          ),
          array(
               'slug' => 'nfd_slug_yith_paypal_payments_for_woocommerce',
               'activate' => true
          ),
          array(
               'slug' => 'nfd_slug_ecomdash_wordpress_plugin',
               'activate' => false
          ),
     );

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
			'wp_slugs' => array_keys( self::$wp_slugs, true ),
			'urls'     => array_keys( self::$urls, true ),
			'domains'  => array_keys( self::$domains, true ),
		);
	}

     public static function get_init() {
          return self::$init_list;
     }

}
