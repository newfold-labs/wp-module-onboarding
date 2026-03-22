<?php
namespace NewfoldLabs\WP\Module\Onboarding\Data;

use NewfoldLabs\WP\Module\Installer\Data\Plugins as PluginsInstaller;

use function NewfoldLabs\WP\ModuleLoader\container;

/**
 * List of Plugin Slugs/URLs/Domains
 */
final class Plugins {
	/**
	 * Initial plugins to be installed.
	 *
	 * @var array
	 */
	protected static $init_list = array(
		'default'           => array(
			array(
				'slug'     => 'nfd_slug_endurance_page_cache',
				'activate' => true,
				'priority' => 240,
			),
			array(
				'slug'     => 'jetpack',
				'activate' => true,
				'priority' => 250,
			),
			array(
				'slug'     => 'wordpress-seo',
				'activate' => true,
				'priority' => 260,
			),
			array(
				'slug'     => 'wpforms-lite',
				'activate' => true,
				'priority' => 270,
			),
			array(
				'slug'     => 'google-analytics-for-wordpress',
				'activate' => true,
				'priority' => 280,
			),
			array(
				'slug'     => 'optinmonster',
				'activate' => true,
				'priority' => 290,
			),
		),
		'site-capabilities' => array(
			'hasEcomdash'     => array(
				array(
					'slug'     => 'nfd_slug_ecomdash_wordpress_plugin',
					'activate' => false,
					'priority' => 220,
				),
			),
			'hasYithExtended' => array(
				array(
					'slug'     => 'woocommerce',
					'activate' => true,
					'priority' => 300,
				),
				array(
					'slug'     => 'nfd_slug_yith_woocommerce_booking',
					'activate' => false,
					'priority' => 100,
				),
				array(
					'slug'     => 'yith-woocommerce-ajax-search',
					'activate' => false,
					'priority' => 120,
				),
				array(
					'slug'     => 'nfd_slug_yith_woocommerce_gift_cards',
					'activate' => false,
					'priority' => 140,
				),
				array(
					'slug'     => 'nfd_slug_yith_woocommerce_wishlist',
					'activate' => false,
					'priority' => 160,
				),
				array(
					'slug'     => 'nfd_slug_yith_woocommerce_customize_myaccount_page',
					'activate' => false,
					'priority' => 180,
				),
				array(
					'slug'     => 'nfd_slug_yith_woocommerce_ajax_product_filter',
					'activate' => false,
					'priority' => 200,
				),
				array(
					'slug'     => 'nfd_slug_wonder_cart',
					'activate' => true,
					'priority' => 210,
				),
			),
		),
		'ecommerce'         => array(
			'default'        => array(
				array(
					'slug'     => 'woocommerce',
					'activate' => true,
					'priority' => 300,
				),
			),
			'bluehost'       => array(
				'default' => array(
					array(
						'slug'     => 'nfd_slug_yith_shippo_shippings_for_woocommerce',
						'activate' => true,
						'priority' => 60,
					),
					array(
						'slug'     => 'nfd_slug_yith_paypal_payments_for_woocommerce',
						'activate' => true,
						'priority' => 80,
					),
				),
			),
			'bluehost-india' => array(
				'default' => array(
					array(
						'slug'     => 'nfd_slug_woo_razorpay',
						'activate' => true,
						'priority' => 80,
					),
				),
			),
		),
	);

	/**
	 * An array of capabilities that should not be run if the site has solution.
	 *
	 * @var array
	 */
	protected static $solution_override_capabilities = array( 'hasYithExtended' );

	/**
	 * Get the list of initial plugins to be installed for a particular hosting plan.
	 *
	 * @return array
	 */
	public static function get_init(): array {
		// The Default plugins for all types
		$init_list = self::$init_list['default'];

		// The default plugins for Site Capabilities.
		if ( isset( self::$init_list['site-capabilities'] ) ) {
			$plugins_data_for_site_capabilities = self::$init_list['site-capabilities'];

			foreach ( $plugins_data_for_site_capabilities as $site_capability => $plugins_data ) {
				// Skip capability installation if solution is present.
				if ( Config::has_solution() &&
						in_array( $site_capability, self::$solution_override_capabilities, true ) ) {
					continue;
				}
				// Check if the capability is enabled on Hiive
				if ( true === Config::get_site_capability( $site_capability ) ) {
					// Check if there are plugins for the flag.
					if ( is_array( $plugins_data ) && ! empty( $plugins_data ) ) {
						$init_list = array_merge( $init_list, $plugins_data );
					}
				}
			}
		}

		// Install ecommerce plugins if the site is an ecommerce site.
		$plan = null;
		if ( Config::has_solution() || Config::get_site_capability( 'hasYithExtended' ) ) {
			$plan = 'ecommerce';
		}
		if ( $plan && isset( self::$init_list[ $plan ] ) ) {
			// Default ecommerce plugins
			if ( isset( self::$init_list[ $plan ]['default'] ) ) {
				$init_list = array_merge( $init_list, self::$init_list[ $plan ]['default'] );
			}

			$current_brand = Bluehost::get_current_brand();
			// Brand specific ecommerce plugins
			if ( isset( self::$init_list[ $plan ][ $current_brand ]['default'] ) ) {
				$init_list = array_merge( $init_list, self::$init_list[ $plan ][ $current_brand ]['default'] );
			}
		}

		$init_list = self::remove_duplicates( $init_list );
		return $init_list;
	}

	/**
	 * Get the ecommerce plugins for the current brand.
	 *
	 * @return array
	 */
	public static function get_ecommerce_plugins(): array {
		$current_brand             = Bluehost::get_current_brand();
		$default_ecommerce_plugins = self::$init_list['ecommerce']['default'];
		$brand_ecommerce_plugins   = self::$init_list['ecommerce'][ $current_brand ]['default'];

		return array_merge( $default_ecommerce_plugins, $brand_ecommerce_plugins );
	}

	/**
	 * Remove duplicates from the init list.
	 *
	 * @param array $plugins The plugins to remove duplicates from.
	 * @return array The plugins with duplicates removed.
	 */
	private static function remove_duplicates( array $plugins ): array {
		$unique_plugins = array();

		foreach ( $plugins as $plugin ) {
			$slug = $plugin['slug'];

			// If the plugin is not in the unique plugins array, add it
			if ( ! isset( $unique_plugins[ $slug ] ) ) {
				$unique_plugins[ $slug ] = $plugin;
			} elseif ( $plugin['activate'] && ! $unique_plugins[ $slug ]['activate'] ) {
				// Only keep the plugin with activate = true
				$unique_plugins[ $slug ] = $plugin;
			}
		}

		return array_values( $unique_plugins );
	}

	/**
	 * Prevent redirect to woo wizard after activation of woocommerce.
	 *
	 * @return void
	 */
	public static function wc_prevent_redirect_on_activation() {
		\delete_transient( '_wc_activation_redirect' );
	}

	/**
	 * List of plugins that should stay active even with the filter option
	 *
	 * @return array
	 */
	public static function get_active_plugins_list(): array {
		return array(
			container()->plugin()->basename,
			isset( PluginsInstaller::get_wp_slugs()['woocommerce']['path'] ) ? PluginsInstaller::get_wp_slugs()['woocommerce']['path'] : false,
		);
	}
}
