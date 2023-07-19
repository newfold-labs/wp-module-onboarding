<?php
namespace NewfoldLabs\WP\Module\Onboarding\Data;

/**
 * Stores all the WordPress Options used in the module.
 */
final class Options {
	/**
	 * Prefix for options in the module.
	 *
	 * @var string
	 */
	protected static $prefix = 'nfd_module_onboarding_';

	/**
	 * List of all the options.
	 *
	 * @var array
	 */
	protected static $options = array(
		'redirect'                      => 'redirect',
		'redirect_param'                => 'redirect_param',
		'activate'                      => 'activate',
		'activate_param'                => 'activate_param',
		'new_coming_soon'               => 'nfd_coming_soon',
		'old_coming_soon'               => 'mm_coming_soon',
		'brand'                         => 'mm_brand',
		'close_comments_for_old_posts'  => 'close_comments_for_old_posts',
		'close_comments_days_old'       => 'close_comments_days_old',
		'comments_per_page'             => 'comments_per_page',
		'start_date'                    => 'start_date',
		'allow_major_auto_core_updates' => 'allow_major_auto_core_updates',
		'allow_minor_auto_core_updates' => 'allow_minor_auto_core_updates',
		'auto_update_plugin'            => 'auto_update_plugin',
		'auto_update_theme'             => 'auto_update_theme',
		'permalink_structure'           => 'permalink_structure',
		'settings_initialized'          => 'settings_initialized',
		'flow'                          => 'flow',
		'blog_name'                     => 'blogname',
		'blog_description'              => 'blogdescription',
		'site_icon'                     => 'site_icon',
		'site_logo'                     => 'site_logo',
		'show_on_front'                 => 'show_on_front',
		'page_on_front'                 => 'page_on_front',
		'theme_settings'                => 'theme_settings',
		'flow_preset'                   => 'flow_preset',
		'wpseo_social'                  => 'wpseo_social',
		'compatibility_results'         => 'compatibility_results',
		'core_update_referrer'          => 'core_update_referrer',
		'wc_currency'                   => 'woocommerce_currency',
		'wc_default_country'            => 'woocommerce_default_country',
		'wc_email'                      => 'woocommerce_email_from_address',
		'wc_address_primary'            => 'woocommerce_store_address',
		'wc_address_secondary'          => 'woocommerce_store_address_2',
		'wc_city'                       => 'woocommerce_store_city',
		'wc_postcode'                   => 'woocommerce_store_postcode',
		'wc_taxes_enabled'              => 'wc_connect_taxes_enabled',
		'wc_calc_taxes'                 => 'woocommerce_calc_taxes',
		'wc_no_sales_tax'               => 'woocommerce_no_sales_tax',
	);

	/**
	 * Contains all the options and their values to be initialized by onboarding.
	 *
	 * @var array
	 */
	protected static $initialization_options = array(
		'close_comments_for_old_posts'  => 1,
		'close_comments_days_old'       => 28,
		'comments_per_page'             => 20,
		'new_coming_soon'               => 'true',
		'allow_major_auto_core_updates' => 'true',
		'allow_minor_auto_core_updates' => 'true',
		'auto_update_plugin'            => 'true',
		'auto_update_theme'             => 'true',
		'permalink_structure'           => '/%postname%/',
	);

	/**
	 * Get option name for a given key.
	 *
	 * @param string  $option_key The key for the Options::$options array.
	 * @param boolean $attach_prefix Attach the module prefix.
	 * @return string|boolean
	 */
	public static function get_option_name( $option_key, $attach_prefix = true ) {
		return isset( self::$options[ $option_key ] )
				? ( $attach_prefix
					? self::$prefix . self::$options[ $option_key ]
					: self::$options[ $option_key ]
				)
				: false;
	}

	/**
	 * Get the list of all options.
	 *
	 * @return array
	 */
	public static function get_all_options() {
		return self::$options;
	}

	/**
	 * Get the list of all initialization options with their values.
	 *
	 * @return array
	 */
	public static function get_initialization_options() {
		return self::$initialization_options;
	}

	/**
	 * Get all the WooCommerce Settings Options.
	 *
	 * @return array
	 */
	public static function get_wc_settings_options() {
		return array(
			'wc_currency'          => array(
				'show_in_rest' => true,
				'type'         => 'string',
				'description'  => __( 'Woocommerce Settings', 'wp-module-onboarding' ),
			),
			'wc_default_country'   => array(
				'show_in_rest' => true,
				'type'         => 'string',
				'description'  => __( 'Woocommerce Settings', 'wp-module-onboarding' ),
			),
			'wc_email'             => array(
				'show_in_rest' => true,
				'type'         => 'string',
				'description'  => __( 'Woocommerce Settings', 'wp-module-onboarding' ),
			),
			'wc_address_primary'   => array(
				'show_in_rest' => true,
				'type'         => 'string',
				'description'  => __( 'Woocommerce Settings', 'wp-module-onboarding' ),
			),
			'wc_address_secondary' => array(
				'show_in_rest' => true,
				'type'         => 'string',
				'description'  => __( 'Woocommerce Settings', 'wp-module-onboarding' ),
			),
			'wc_city'              => array(
				'show_in_rest' => true,
				'type'         => 'string',
				'description'  => __( 'Woocommerce Settings', 'wp-module-onboarding' ),
			),
			'wc_postcode'          => array(
				'show_in_rest' => true,
				'type'         => 'string',
				'description'  => __( 'Woocommerce Settings', 'wp-module-onboarding' ),
			),
			'wc_taxes_enabled'     => array(
				'show_in_rest' => true,
				'type'         => 'string',
				'description'  => __( 'Woocommerce Settings', 'wp-module-onboarding' ),
			),
			'wc_calc_taxes'        => array(
				'show_in_rest' => true,
				'type'         => 'string',
				'description'  => __( 'Woocommerce Settings', 'wp-module-onboarding' ),
			),
			'wc_no_sales_tax'      => array(
				'show_in_rest' => true,
				'type'         => 'boolean',
				'description'  => __( 'Woocommerce Settings', 'wp-module-onboarding' ),
			),
		);
	}
}
