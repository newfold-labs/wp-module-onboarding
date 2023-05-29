<?php
namespace NewfoldLabs\WP\Module\Onboarding\Data;

/**
 * List of Plugin Slugs/URLs/Domains
 */
final class Plugins {
	/**
	 * Initial plugins to be installed classified based on the hosting plan.
	 * Key 'default' contains a list of default plugins to be installed irrespective of the plan.
	 * Key <flow> contains a Key 'default' and a list of Key <subtype>'s.
	 * Key <flow> => 'default' contains a list of default plugin installs for <flow>.
	 * Key <flow> => <subtype> contains a list of plugins to be installed for a particular <subtype>.
	 *
	 * The final queue of Plugins to be installed makes use of a max heap and hence the greater the number the earlier
	 * a Plugin will be placed for install in the queue. This will also allow us to
	 * prevent entering negative numbers when queueing a plugin for earlier installs.
	 *
	 * @var array
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
			'default'        => array(
				array(
					'slug'     => 'woocommerce',
					'activate' => true,
					'priority' => 260,
				),
			),
			'bluehost'       => array(
				'wc_standard' => array(
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
				'wc_premium'  => array(
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
					array(
						'slug'     => 'nfd_slug_ecomdash_wordpress_plugin',
						'activate' => true,
						'priority' => 20,
					),
				),
				'wc_priority' => array(
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
			),
			'bluehost-india' => array(
				'wc_standard' => array(
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
						'slug'     => 'nfd_slug_woo_razorpay',
						'activate' => true,
						'priority' => 258,
					),
				),
				'wc_premium'  => array(
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
						'slug'     => 'nfd_slug_woo_razorpay',
						'activate' => true,
						'priority' => 258,
					),
					array(
						'slug'     => 'nfd_slug_ecomdash_wordpress_plugin',
						'activate' => true,
						'priority' => 20,
					),
				),
				'wc_priority' => array(),
			),
			'crazy-domains'  => array(
				'wc_priority' => array(
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
			),
		),
	);

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
			$current_brand = Data::current_brand()['brand'];
			if ( 'default' !== $plan_subtype && isset( self::$init_list[ $plan_flow ][ $current_brand ][ $plan_subtype ] ) ) {
				$init_list = array_merge( $init_list, self::$init_list[ $plan_flow ][ $current_brand ][ $plan_subtype ] );
			}
		}

		return $init_list;
	}

	/**
	 * Prevent redirect to woo wizard after activation of woocommerce.
	 *
	 * @return void
	 */
	public static function wc_prevent_redirect_on_activation() {
		\delete_transient( '_wc_activation_redirect' );
	}

}
