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
			'hireExpertsInfo'     => array(
				'defaultLink'     => 'https://www.bluehost.com/wp-live',
				'queryParameters' => array(
					'page'         => 'bluehost',
					'utm_source'   => 'wp-onboarding',
					'utm_medium'   => 'brand-plugin',
					'utm_campaign' => 'wp-setup',
				),
			),
		);

		return array_replace( self::get_brands()['bluehost'], $default_brand_data );
	}

	/**
	 * Brand specific data - Bluehost, Bluehost India, Webcom
	 *
	 * @return array
	 */
	public static function get_brands() {

		return array(
			'bluehost'       => array(
				'brand'                       => 'bluehost',
				'name'                        => 'Bluehost',
				'url'                         => 'https://bluehost.com',
				'knowledgeBaseUrl'            => 'https://www.bluehost.com/help/results/wordpress',
				'helpUrl'                     => 'https://www.bluehost.com/help',
				'blogUrl'                     => 'https://www.bluehost.com/blog/',
				'facebookUrl'                 => 'https://www.facebook.com/bluehost',
				'twitterName'                 => '@bluehost',
				'twitterUrl'                  => 'https://twitter.com/bluehost',
				'youtubeUrl'                  => 'https://www.youtube.com/user/bluehost',
				'linkedinUrl'                 => 'https://www.linkedin.com/company/bluehost-com',
				'accountUrl'                  => 'https://my.bluehost.com',
				'domainsUrl'                  => 'https://my.bluehost.com/hosting/app?lil=1#/domains',
				'emailUrl'                    => 'https://my.bluehost.com/hosting/app?lil=1#/email-office',
				'pluginDashboardPage'         => \admin_url( 'admin.php?page=bluehost' ),
				'phoneNumbers'                => array(
					'sales'   => '844-303-1730',
					'support' => '888-401-4678',
					'intl'    => '+1-801-765-9400',
				),
				'hireExpertsInfo'             => array(
					'defaultLink'     => 'admin.php?',
					'fragment'        => '#/marketplace/services/blue-sky',
					'queryParameters' => array(
						'page'         => 'bluehost',
						'utm_source'   => 'wp-onboarding',
						'utm_medium'   => 'brand-plugin',
						'utm_campaign' => 'wp-setup',
					),
				),
				'expertsInfo'                 => array(
					'defaultLink' => 'https://my.bluehost.com/cgi/app/#/marketplace/product/i/bluesky',
					'queryParams' => array(
						'utm_source' => 'wp-onboarding',
						'utm_medium' => 'brand-plugin',
					),
				),
				'fullServiceCreativeTeamInfo' => array(
					'defaultLink' => 'https://www.bluehost.com/solutions/full-service',
					'fragment'    => '#full-service',
					'queryParams' => array(
						'utm_source' => 'wp-onboarding',
						'utm_medium' => 'brand-plugin',
					),
				),
				'techSupportInfo'             => array(
					'defaultLink' => 'https://helpchat.bluehost.com/',
					'queryParams' => array(
						'utm_source' => 'wp-onboarding',
						'utm_medium' => 'brand-plugin',
					),
				),
				'config'                      => array(
					'net_new_signup_date_threshold' => '2023-05-04T00:00:00.000Z',
					'enabled_flows'                 => array(
						'ecommerce' => true,
						'wp-setup'  => true,
					),
				),
			),
			'bluehost-india' => array(
				'brand'                       => 'bluehost-india',
				'name'                        => 'Bluehost',
				'url'                         => 'https://bluehost.in',
				'knowledgeBaseUrl'            => 'https://www.bluehost.in/hosting/help/results/wordpress',
				'helpUrl'                     => 'https://www.bluehost.in/hosting/help',
				'blogUrl'                     => 'https://www.bluehost.in/tutorials',
				'facebookUrl'                 => 'https://www.facebook.com/BlueHostIndia',
				'twitterName'                 => '@BluehostIndia',
				'twitterUrl'                  => 'https://twitter.com/bluehostindia',
				'youtubeUrl'                  => 'https://www.youtube.com/c/BluehostIndia1',
				'linkedinUrl'                 => null,
				'accountUrl'                  => 'https://my.bluehost.in',
				'domainsUrl'                  => 'https://my.bluehost.in/hosting/app?lil=1#/domains',
				'emailUrl'                    => 'https://my.bluehost.in/hosting/app?lil=1#/email-office',
				'pluginDashboardPage'         => \admin_url( 'admin.php?page=bluehost' ),
				'phoneNumbers'                => array(
					'support' => '1800-419-4426',
				),
				'hireExpertsInfo'             => array(
					'defaultLink'   => 'https://www.bluehost.in/bluesky',
					'utmParameters' => array(
						'utm_source'   => 'wp-onboarding',
						'utm_medium'   => 'brand-plugin',
						'utm_campaign' => 'wp-setup',
					),
				),
				'expertsInfo'                 => array(
					'defaultLink' => 'https://my.bluehost.in/cgi/app/#/marketplace/product/i/bluesky',
					'queryParams' => array(
						'utm_source' => 'wp-onboarding',
						'utm_medium' => 'brand-plugin',
					),
				),
				'fullServiceCreativeTeamInfo' => array(
					'defaultLink' => 'https://www.bluehost.in/solutions/full-service',
					'fragment'    => '#full-service',
					'queryParams' => array(
						'utm_source' => 'wp-onboarding',
						'utm_medium' => 'brand-plugin',
					),
				),
				'techSupportInfo'             => array(
					'defaultLink' => 'https://helpchat.bluehost.in/',
					'queryParams' => array(
						'utm_source' => 'wp-onboarding',
						'utm_medium' => 'brand-plugin',
					),
				),
				'config'                      => array(
					'net_new_signup_date_threshold' => '2022-08-18T15:30:00.000Z',
					'enabled_flows'                 => array(
						'ecommerce' => true,
						'wp-setup'  => false,
					),
				),
			),
			'webcom'         => array(
				'brand'                       => 'webcom',
				'name'                        => 'Web.com',
				'url'                         => 'https://web.com',
				'knowledgeBaseUrl'            => 'https://www.web.com/knowledge',
				'helpUrl'                     => 'https://www.web.com/knowledge',
				'blogUrl'                     => 'https://www.web.com/blog',
				'facebookUrl'                 => 'https://www.facebook.com/Web.com/',
				'twitterName'                 => '@webdotcom',
				'twitterUrl'                  => 'http://twitter.com/webdotcom',
				'youtubeUrl'                  => 'https://www.youtube.com/c/webdotcom',
				'linkedinUrl'                 => 'https://www.linkedin.com/company/website-pros/',
				'accountUrl'                  => 'https://www.web.com/my-account',
				'domainsUrl'                  => 'https://www.web.com/domains',
				'emailUrl'                    => 'https://www.web.com/email-service',
				'phoneNumbers'                => array(
					'sales'   => '866-923-8821',
					'support' => '866-923-8821',
					'intl'    => '+1-904-680-6617',
				),
				'hireExpertsInfo'             => array(
					'defaultLink'   => 'https://www.web.com/websites/pro-website-services',
					'utmParameters' => array(
						'utm_source'   => '',
						'utm_medium'   => '',
						'utm_campaign' => '',
					),
				),
				'expertsInfo'                 => array(
					'defaultLink' => 'https://www.web.com/websites/pro-website-services',
					'queryParams' => array(
						'utm_source' => '',
						'utm_medium' => '',
					),
				),
				'fullServiceCreativeTeamInfo' => array(
					'defaultLink' => 'https://www.web.com/websites/pro-website-services',
					'fragment'    => '',
					'queryParams' => array(
						'utm_source' => 'wp-onboarding',
						'utm_medium' => 'brand-plugin',
					),
				),
				'techSupportInfo'             => array(
					'defaultLink' => '',
					'queryParams' => array(
						'utm_source' => '',
						'utm_medium' => '',
					),
				),
				'config'                      => array(
					'net_new_signup_date_threshold' => '2022-08-18T15:30:00.000Z',
					'enabled_flows'                 => array(
						'ecommerce' => false,
						'wp-setup'  => false,
					),
				),
			),
			'crazy-domains'  => array(
				'brand'                       => 'crazy-domains',
				'name'                        => 'Crazy Domains',
				'url'                         => 'https://www.crazydomains.com',
				'knowledgeBaseUrl'            => 'https://www.crazydomains.com/learn/online-academy/',
				'helpUrl'                     => 'https://www.crazydomains.com/help',
				'blogUrl'                     => 'https://www.crazydomains.com/learn/',
				'facebookUrl'                 => 'https://www.facebook.com/crazydomains/',
				'twitterName'                 => '@crazydomains',
				'twitterUrl'                  => 'https://twitter.com/crazydomains',
				'youtubeUrl'                  => 'https://www.youtube.com/user/CrazyDomains',
				'linkedinUrl'                 => '',
				'accountUrl'                  => 'https://www.crazydomains.com/my-account/home/',
				'domainsUrl'                  => '',
				'emailUrl'                    => 'https://www.crazydomains.com/contact/',
				'pluginDashboardPage'         => \admin_url( 'admin.php?page=crazy-domains' ),
				'phoneNumbers'                => array(
					'support' => '2135592459',
				),
				'hireExpertsInfo'             => array(
					'defaultLink'     => 'https://www.crazydomains.com/help/',
					'fragment'        => '',
					'queryParameters' => array(
						'utm_source'   => 'wp-onboarding',
						'utm_medium'   => 'brand-plugin',
						'utm_campaign' => 'wp-setup',
					),
				),
				'expertsInfo'                 => array(
					'defaultLink' => 'https://www.crazydomains.com/help/',
					'queryParams' => array(
						'utm_source' => 'wp-onboarding',
						'utm_medium' => 'brand-plugin',
					),
				),
				'fullServiceCreativeTeamInfo' => array(
					'defaultLink' => 'https://www.crazydomains.com/help/',
					'fragment'    => '',
					'queryParams' => array(
						'utm_source' => 'wp-onboarding',
						'utm_medium' => 'brand-plugin',
					),
				),
				'techSupportInfo'             => array(
					'defaultLink' => 'https://www.crazydomains.com/contact/',
					'queryParams' => array(
						'utm_source' => 'wp-onboarding',
						'utm_medium' => 'brand-plugin',
					),
				),
				'config'                      => array(
					'net_new_signup_date_threshold' => '2023-05-04T00:00:00.000Z',
					'enabled_flows'                 => array(
						'ecommerce' => true,
						'wp-setup'  => true,
					),
					'views'                         => array(
						'sidebar' => array(
							'illustration' => array(
								'shown' => false,
							),
						),
					),
				),
			),
		);
	}

	/**
	 * Sets the hosting brand for which Onboarding is active.
	 *
	 * @param array $container The brand plugin container.
	 * @return void
	 */
	public static function set_current_brand( $container ) {
		if ( ! defined( 'NFD_ONBOARDING_PLUGIN_BRAND' ) ) {
			$brand = $container->plugin()->brand;
			if ( empty( $brand ) ) {
				$brand = 'wordpress';
			}
			define( 'NFD_ONBOARDING_PLUGIN_BRAND', sanitize_title_with_dashes( str_replace( '_', '-', $brand ) ) );
		}
	}
}
