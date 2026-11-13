<?php
namespace NewfoldLabs\WP\Module\Onboarding\Data;

/**
 * Contains Brand information.
 */
final class Brands {

	/**
	 * Default Brand Data
	 *
	 * @return array
	 */
	public static function get_default_brand() {
		$default_brand_data = array(
			'brand'               => 'wordpress',
			'name'                => __( 'your web host', 'wp-module-onboarding' ),
			'pluginDashboardPage' => \admin_url(),
		);

		return array_replace( self::get_brands()['bluehost'], $default_brand_data );
	}

	/**
	 * Retrieve brand-specific data for various brands such as Bluehost, Bluehost India, Web.com, etc.
	 *
	 * Only data onboarding itself reads lives here (name, url, dashboard page and redirect params,
	 * migration link, `config.canMigrateSite`). Brand plugins own anything else (portal links, icons,
	 * social links, phone numbers) and expose it via the module container.
	 *
	 * @return array Associative array of brand slug => brand data.
	 */
	public static function get_brands(): array {
		$can_migrate_site = Config::can_migrate_site();

		return array(
			'bluehost'       => array(
				'brand'                   => 'bluehost',
				'name'                    => 'Bluehost',
				'url'                     => apply_filters( 'nfd_build_url', 'https://bluehost.com' ),
				'pluginDashboardPage'     => \admin_url( 'admin.php?page=bluehost' ),
				'dashboardRedirectParams' => array(
					'referrer' => 'nfd-onboarding',
				),
				'migrationInfo'           => array(
					'defaultLink' => apply_filters( 'nfd_build_url', 'https://www.bluehost.com/my-account/hosting/details/sites/add/transfer' ),
				),
				'config'                  => array(
					'canMigrateSite' => $can_migrate_site,
				),
			),
			'bluehost-india' => array(
				'brand'                   => 'bluehost-india',
				'name'                    => 'Bluehost',
				'url'                     => apply_filters( 'nfd_build_url', 'https://bluehost.in' ),
				'pluginDashboardPage'     => \admin_url( 'admin.php?page=bluehost' ),
				'dashboardRedirectParams' => array(
					'referrer' => 'nfd-onboarding',
				),
				'migrationInfo'           => array(),
				'config'                  => array(
					'canMigrateSite' => $can_migrate_site,
				),
			),
			'webcom'         => array(
				'brand'         => 'webcom',
				'name'          => 'Web.com',
				'url'           => apply_filters( 'nfd_build_url', 'https://web.com' ),
				'migrationInfo' => array(),
				'config'        => array(
					'canMigrateSite' => $can_migrate_site,
				),
			),
			'crazy-domains'  => array(
				'brand'               => 'crazy-domains',
				'name'                => 'Crazy Domains',
				'url'                 => apply_filters( 'nfd_build_url', 'https://www.crazydomains.com' ),
				'pluginDashboardPage' => \admin_url( 'admin.php?page=crazy-domains' ),
				'migrationInfo'       => array(),
				'config'              => array(
					'canMigrateSite' => $can_migrate_site,
				),
			),
			'hostgator-br'   => array(
				'brand'               => 'hostgator-br',
				'name'                => 'HostGator',
				'url'                 => apply_filters( 'nfd_build_url', 'https://www.hostgator.com.br' ),
				'pluginDashboardPage' => \admin_url( 'admin.php?page=hostgator' ),
				'migrationInfo'       => array(),
				'config'              => array(
					'canMigrateSite' => $can_migrate_site,
				),
			),
			'hostgator-us'   => array(
				'brand'               => 'hostgator-us',
				'name'                => 'HostGator',
				'url'                 => apply_filters( 'nfd_build_url', 'https://www.hostgator.com' ),
				'pluginDashboardPage' => \admin_url( 'admin.php?page=hostgator' ),
				'migrationInfo'       => array(),
				'config'              => array(
					'canMigrateSite' => $can_migrate_site,
				),
			),
		);
	}

	/**
	 * Sets the hosting brand for which Onboarding is active.
	 *
	 * @param object $container The brand plugin container.
	 * @return string
	 */
	public static function set_current_brand( $container ) {
		if ( ! defined( 'NFD_ONBOARDING_PLUGIN_BRAND' ) ) {
			$brand = $container->plugin()->brand;
			if ( empty( $brand ) ) {
				$brand = 'WordPress';
			}

			if ( false !== stripos( $brand, 'hostgator' ) ) {
				$region = strtolower( $container->plugin()->region );
				$brand  = "hostgator-{$region}";
			}

			$brand = sanitize_title_with_dashes( str_replace( '_', '-', $brand ) );
			define( 'NFD_ONBOARDING_PLUGIN_BRAND', $brand );

			return $brand;
		}
	}
}
