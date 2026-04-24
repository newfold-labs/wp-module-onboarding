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
			'name'                => __( 'your web host', 'wp-module-onboarding-data' ),
			'pluginDashboardPage' => \admin_url(),
			'hireExpertsInfo'     => array(
				'defaultLink'     => apply_filters( 'nfd_build_url', 'https://www.bluehost.com/wp-live' ),
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
	 * Retrieve brand-specific data for various brands such as Bluehost, Bluehost India, Web.com, etc.
	 *
	 * @return array Associative array containing configuration details for each brand, including links,
	 *               contact information, and enabled features.
	 */
	public static function get_brands(): array {
		// Checks if customer has access to AI Sitegen.
		$has_ai_sitegen   = Config::has_ai_sitegen();
		$can_migrate_site = Config::can_migrate_site();

		return array(
			'bluehost'       => array(
				'brand'                       => 'bluehost',
				'name'                        => 'Bluehost',
				'url'                         => apply_filters( 'nfd_build_url', 'https://bluehost.com' ),
				'knowledgeBaseUrl'            => apply_filters( 'nfd_build_url', 'https://www.bluehost.com/help/results/wordpress' ),
				'helpUrl'                     => apply_filters( 'nfd_build_url', 'https://www.bluehost.com/help' ),
				'blogUrl'                     => apply_filters( 'nfd_build_url', 'https://www.bluehost.com/blog/' ),
				'facebookUrl'                 => apply_filters( 'nfd_build_url', 'https://www.facebook.com/bluehost' ),
				'twitterName'                 => '@bluehost',
				'twitterUrl'                  => apply_filters( 'nfd_build_url', 'https://twitter.com/bluehost' ),
				'youtubeUrl'                  => apply_filters( 'nfd_build_url', 'https://www.youtube.com/user/bluehost' ),
				'linkedinUrl'                 => apply_filters( 'nfd_build_url', 'https://www.linkedin.com/company/bluehost-com' ),
				'accountUrl'                  => apply_filters( 'nfd_build_url', 'https://my.bluehost.com' ),
				'domainsUrl'                  => apply_filters( 'nfd_build_url', 'https://my.bluehost.com/hosting/app?lil=1#/domains' ),
				'emailUrl'                    => apply_filters( 'nfd_build_url', 'https://my.bluehost.com/hosting/app?lil=1#/email-office' ),
				'pluginDashboardPage'         => \admin_url( 'admin.php?page=bluehost' ),
				'dashboardRedirectParams'     => array(
					'referrer' => 'nfd-onboarding',
				),
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
					'defaultLink' => apply_filters(
						'nfd_build_url',
						'https://www.bluehost.com/solutions/full-service',
						array(
							'utm_source' => 'wp-onboarding',
						)
					),
					'fragment'    => '#full-service',
					'queryParams' => array(
						'utm_source' => 'wp-onboarding',
						'utm_medium' => 'brand-plugin',
					),
				),
				'techSupportInfo'             => array(
					'defaultLink' => apply_filters(
						'nfd_build_url',
						'https://helpchat.bluehost.com/',
						array(
							'utm_source' => 'wp-onboarding',
						)
					),
					'queryParams' => array(
						'utm_source' => 'wp-onboarding',
						'utm_medium' => 'brand-plugin',
					),
				),
				'migrationInfo'               => array(
					'defaultLink' => apply_filters( 'nfd_build_url', 'https://www.bluehost.com/my-account/hosting/details/sites/add/transfer' ),
				),
				'config'                      => array(
					'enabled_flows'        => array(
						'ecommerce' => true,
						'wp-setup'  => true,
						'sitegen'   => $has_ai_sitegen,
					),
					'wonder_blocks'        => true,
					'prioritization'       => false,
					'canMigrateSite'       => $can_migrate_site,
					'canRestartOnboarding' => true,
				),
			),
			'bluehost-india' => array(
				'brand'                       => 'bluehost-india',
				'name'                        => 'Bluehost',
				'url'                         => apply_filters( 'nfd_build_url', 'https://bluehost.in' ),
				'knowledgeBaseUrl'            => apply_filters( 'nfd_build_url', 'https://www.bluehost.in/hosting/help/results/wordpress' ),
				'helpUrl'                     => apply_filters( 'nfd_build_url', 'https://www.bluehost.in/hosting/help' ),
				'blogUrl'                     => apply_filters( 'nfd_build_url', 'https://www.bluehost.in/tutorials' ),
				'facebookUrl'                 => apply_filters( 'nfd_build_url', 'https://www.facebook.com/BlueHostIndia' ),
				'twitterName'                 => '@BluehostIndia',
				'twitterUrl'                  => apply_filters( 'nfd_build_url', 'https://twitter.com/bluehostindia' ),
				'youtubeUrl'                  => apply_filters( 'nfd_build_url', 'https://www.youtube.com/c/BluehostIndia1' ),
				'linkedinUrl'                 => null,
				'accountUrl'                  => apply_filters( 'nfd_build_url', 'https://my.bluehost.in' ),
				'domainsUrl'                  => apply_filters( 'nfd_build_url', 'https://my.bluehost.in/hosting/app?lil=1#/domains' ),
				'emailUrl'                    => apply_filters( 'nfd_build_url', 'https://my.bluehost.in/hosting/app?lil=1#/email-office' ),
				'pluginDashboardPage'         => \admin_url( 'admin.php?page=bluehost' ),
				'dashboardRedirectParams'     => array(
					'referrer' => 'nfd-onboarding',
				),
				'phoneNumbers'                => array(
					'support' => '1800-419-4426',
				),
				'hireExpertsInfo'             => array(
					'defaultLink'   => apply_filters(
						'nfd_build_url',
						'https://www.bluehost.in/bluesky',
						array(
							'utm_source'   => 'wp-onboarding',
							'utm_campaign' => 'wp-setup',
						)
					),
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
					'defaultLink' => apply_filters(
						'nfd_build_url',
						'https://www.bluehost.in/solutions/full-service',
						array(
							'utm_source' => 'wp-onboarding',
						)
					),
					'fragment'    => '#full-service',
					'queryParams' => array(
						'utm_source' => 'wp-onboarding',
						'utm_medium' => 'brand-plugin',
					),
				),
				'techSupportInfo'             => array(
					'defaultLink' => apply_filters(
						'nfd_build_url',
						'https://helpchat.bluehost.in/',
						array(
							'utm_source' => 'wp-onboarding',
						)
					),
					'queryParams' => array(
						'utm_source' => 'wp-onboarding',
						'utm_medium' => 'brand-plugin',
					),
				),
				'migrationInfo'               => array(),
				'config'                      => array(
					'enabled_flows'        => array(
						'ecommerce' => true,
						'wp-setup'  => false,
						'sitegen'   => $has_ai_sitegen,
					),
					'wonder_blocks'        => true,
					'prioritization'       => false,
					'canMigrateSite'       => $can_migrate_site,
					'canRestartOnboarding' => false,
				),
			),
			'webcom'         => array(
				'brand'                       => 'webcom',
				'name'                        => 'Web.com',
				'url'                         => apply_filters( 'nfd_build_url', 'https://web.com' ),
				'knowledgeBaseUrl'            => apply_filters( 'nfd_build_url', 'https://www.web.com/knowledge' ),
				'helpUrl'                     => apply_filters( 'nfd_build_url', 'https://www.web.com/knowledge' ),
				'blogUrl'                     => apply_filters( 'nfd_build_url', 'https://www.web.com/blog' ),
				'facebookUrl'                 => apply_filters( 'nfd_build_url', 'https://www.facebook.com/Web.com/' ),
				'twitterName'                 => '@webdotcom',
				'twitterUrl'                  => apply_filters( 'nfd_build_url', 'http://twitter.com/webdotcom' ),
				'youtubeUrl'                  => apply_filters( 'nfd_build_url', 'https://www.youtube.com/c/webdotcom' ),
				'linkedinUrl'                 => apply_filters( 'nfd_build_url', 'https://www.linkedin.com/company/website-pros/' ),
				'accountUrl'                  => apply_filters( 'nfd_build_url', 'https://www.web.com/my-account' ),
				'domainsUrl'                  => apply_filters( 'nfd_build_url', 'https://www.web.com/domains' ),
				'emailUrl'                    => apply_filters( 'nfd_build_url', 'https://www.web.com/email-service' ),
				'phoneNumbers'                => array(
					'sales'   => '866-923-8821',
					'support' => '866-923-8821',
					'intl'    => '+1-904-680-6617',
				),
				'hireExpertsInfo'             => array(
					'defaultLink'   => apply_filters( 'nfd_build_url', 'https://www.web.com/websites/pro-website-services' ),
					'utmParameters' => array(
						'utm_source'   => '',
						'utm_medium'   => '',
						'utm_campaign' => '',
					),
				),
				'expertsInfo'                 => array(
					'defaultLink' => apply_filters( 'nfd_build_url', 'https://www.web.com/websites/pro-website-services' ),
					'queryParams' => array(
						'utm_source' => '',
						'utm_medium' => '',
					),
				),
				'fullServiceCreativeTeamInfo' => array(
					'defaultLink' => apply_filters(
						'nfd_build_url',
						'https://www.web.com/websites/pro-website-services',
						array(
							'utm_source' => 'wp-onboarding',
						)
					),
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
				'migrationInfo'               => array(),
				'config'                      => array(
					'enabled_flows'        => array(
						'ecommerce' => false,
						'wp-setup'  => false,
						'sitegen'   => $has_ai_sitegen,
					),
					'wonder_blocks'        => true,
					'prioritization'       => false,
					'canMigrateSite'       => $can_migrate_site,
					'canRestartOnboarding' => false,
				),
			),
			'crazy-domains'  => array(
				'brand'                       => 'crazy-domains',
				'name'                        => 'Crazy Domains',
				'url'                         => apply_filters( 'nfd_build_url', 'https://www.crazydomains.com' ),
				'knowledgeBaseUrl'            => apply_filters( 'nfd_build_url', 'https://www.crazydomains.com/learn/online-academy/' ),
				'helpUrl'                     => apply_filters( 'nfd_build_url', 'https://www.crazydomains.com/help' ),
				'blogUrl'                     => apply_filters( 'nfd_build_url', 'https://www.crazydomains.com/learn/' ),
				'facebookUrl'                 => apply_filters( 'nfd_build_url', 'https://www.facebook.com/crazydomains/' ),
				'twitterName'                 => '@crazydomains',
				'twitterUrl'                  => apply_filters( 'nfd_build_url', 'https://twitter.com/crazydomains' ),
				'youtubeUrl'                  => apply_filters( 'nfd_build_url', 'https://www.youtube.com/user/CrazyDomains' ),
				'linkedinUrl'                 => '',
				'accountUrl'                  => apply_filters( 'nfd_build_url', 'https://www.crazydomains.com/my-account/home/' ),
				'domainsUrl'                  => '',
				'emailUrl'                    => apply_filters( 'nfd_build_url', 'https://www.crazydomains.com/contact/' ),
				'pluginDashboardPage'         => \admin_url( 'admin.php?page=crazy-domains' ),
				'phoneNumbers'                => array(
					'support' => '2135592459',
				),
				'hireExpertsInfo'             => array(
					'defaultLink'     => apply_filters(
						'nfd_build_url',
						'https://www.crazydomains.com/help/',
						array(
							'utm_source'   => 'wp-onboarding',
							'utm_campaign' => 'wp-setup',
						)
					),
					'fragment'        => '',
					'queryParameters' => array(
						'utm_source'   => 'wp-onboarding',
						'utm_medium'   => 'brand-plugin',
						'utm_campaign' => 'wp-setup',
					),
				),
				'expertsInfo'                 => array(
					'defaultLink' => apply_filters(
						'nfd_build_url',
						'https://www.crazydomains.com/help/',
						array(
							'utm_source' => 'wp-onboarding',
						)
					),
					'queryParams' => array(
						'utm_source' => 'wp-onboarding',
						'utm_medium' => 'brand-plugin',
					),
				),
				'fullServiceCreativeTeamInfo' => array(
					'defaultLink' => apply_filters(
						'nfd_build_url',
						'https://www.crazydomains.com/help/',
						array(
							'utm_source' => 'wp-onboarding',
						)
					),
					'fragment'    => '',
					'queryParams' => array(
						'utm_source' => 'wp-onboarding',
						'utm_medium' => 'brand-plugin',
					),
				),
				'techSupportInfo'             => array(
					'defaultLink' => apply_filters(
						'nfd_build_url',
						'https://www.crazydomains.com/contact/',
						array(
							'utm_source' => 'wp-onboarding',
						)
					),
					'queryParams' => array(
						'utm_source' => 'wp-onboarding',
						'utm_medium' => 'brand-plugin',
					),
				),
				'migrationInfo'               => array(),
				'config'                      => array(
					'enabled_flows'        => array(
						'ecommerce' => true,
						'wp-setup'  => true,
						'sitegen'   => $has_ai_sitegen,
					),
					'wonder_blocks'        => true,
					'prioritization'       => false,
					'views'                => array(
						'sidebar' => array(
							'illustration' => array(
								'shown' => false,
							),
						),
					),
					'canMigrateSite'       => $can_migrate_site,
					'canRestartOnboarding' => false,
				),
			),
			'hostgator-br'   => array(
				'brand'                       => 'hostgator-br',
				'name'                        => 'HostGator',
				'url'                         => apply_filters( 'nfd_build_url', 'https://www.hostgator.com.br' ),
				'knowledgeBaseUrl'            => apply_filters( 'nfd_build_url', 'https://suporte.hostgator.com.br/hc/pt-br' ),
				'helpUrl'                     => apply_filters( 'nfd_build_url', 'https://cliente.hostgator.com.br/suporte' ),
				'blogUrl'                     => apply_filters( 'nfd_build_url', 'https://www.hostgator.com.br/blog/' ),
				'facebookUrl'                 => apply_filters( 'nfd_build_url', 'https://www.facebook.com/HostgatorBrasil/' ),
				'twitterName'                 => '@hostgatorbrasil',
				'twitterUrl'                  => apply_filters( 'nfd_build_url', 'https://twitter.com/hostgatorbrasil' ),
				'youtubeUrl'                  => apply_filters( 'nfd_build_url', 'https://www.youtube.com/c/HostGatorBrasil' ),
				'linkedinUrl'                 => apply_filters( 'nfd_build_url', 'https://www.linkedin.com/company/hostgator-latam/' ),
				'accountUrl'                  => apply_filters( 'nfd_build_url', 'https://financeiro.hostgator.com.br/' ),
				'domainsUrl'                  => apply_filters( 'nfd_build_url', 'https://cliente.hostgator.com.br/dominios' ),
				'emailUrl'                    => apply_filters( 'nfd_build_url', 'https://cliente.hostgator.com.br/emails-list' ),
				'pluginDashboardPage'         => \admin_url( 'admin.php?page=hostgator' ),
				'phoneNumbers'                => array(
					'support' => '',
				),
				'hireExpertsInfo'             => array(
					'defaultLink'     => apply_filters(
						'nfd_build_url',
						'https://suporte.hostgator.com.br/hc/pt-br',
						array(
							'utm_source'   => 'wp-onboarding',
							'utm_campaign' => 'wp-setup',
						)
					),
					'fragment'        => '',
					'queryParameters' => array(
						'utm_source'   => 'wp-onboarding',
						'utm_medium'   => 'brand-plugin',
						'utm_campaign' => 'wp-setup',
					),
				),
				'expertsInfo'                 => array(
					'defaultLink' => apply_filters(
						'nfd_build_url',
						'https://suporte.hostgator.com.br/hc/pt-br',
						array(
							'utm_source' => 'wp-onboarding',
						)
					),
					'queryParams' => array(
						'utm_source' => 'wp-onboarding',
						'utm_medium' => 'brand-plugin',
					),
				),
				'fullServiceCreativeTeamInfo' => array(
					'defaultLink' => apply_filters(
						'nfd_build_url',
						'https://suporte.hostgator.com.br/hc/pt-br',
						array(
							'utm_source' => 'wp-onboarding',
						)
					),
					'fragment'    => '',
					'queryParams' => array(
						'utm_source' => 'wp-onboarding',
						'utm_medium' => 'brand-plugin',
					),
				),
				'techSupportInfo'             => array(
					'defaultLink' => apply_filters(
						'nfd_build_url',
						'https://suporte.hostgator.com.br/hc/pt-br',
						array(
							'utm_source' => 'wp-onboarding',
						)
					),
					'queryParams' => array(
						'utm_source' => 'wp-onboarding',
						'utm_medium' => 'brand-plugin',
					),
				),
				'migrationInfo'               => array(),
				'config'                      => array(
					'enabled_flows'        => array(
						'ecommerce' => true,
						'wp-setup'  => true,
						'sitegen'   => $has_ai_sitegen,
					),
					'wonder_blocks'        => true,
					'prioritization'       => false,
					'views'                => array(
						'sidebar' => array(
							'illustration' => array(
								'shown' => false,
							),
							'experts'      => array(
								'shown' => false,
							),
							'fullService'  => array(
								'shown' => false,
							),
							'infoPanel'    => array(
								'headingWithDescriptions' => array(
									'shown' => array( 0 ),
								),
							),
						),
					),
					'canMigrateSite'       => $can_migrate_site,
					'canRestartOnboarding' => false,
				),
			),
			'hostgator-us'   => array(
				'brand'                       => 'hostgator-us',
				'name'                        => 'HostGator',
				'url'                         => apply_filters( 'nfd_build_url', 'https://www.hostgator.com' ),
				'knowledgeBaseUrl'            => apply_filters( 'nfd_build_url', 'https://www.hostgator.com/help' ),
				'helpUrl'                     => apply_filters( 'nfd_build_url', 'https://www.hostgator.com/help' ),
				'blogUrl'                     => apply_filters( 'nfd_build_url', 'https://www.hostgator.com/blog/' ),
				'facebookUrl'                 => apply_filters( 'nfd_build_url', 'https://www.facebook.com/HostGator/' ),
				'twitterName'                 => '@HostGator',
				'twitterUrl'                  => apply_filters( 'nfd_build_url', 'https://twitter.com/hostgator' ),
				'youtubeUrl'                  => apply_filters( 'nfd_build_url', 'https://www.youtube.com/user/hostgator' ),
				'linkedinUrl'                 => apply_filters( 'nfd_build_url', 'https://www.linkedin.com/company/hostgator-com/' ),
				'accountUrl'                  => apply_filters( 'nfd_build_url', 'https://www.hostgator.com/my-account/login' ),
				'domainsUrl'                  => apply_filters( 'nfd_build_url', 'https://www.hostgator.com/my-account/domain-center/domain-list' ),
				'emailUrl'                    => apply_filters( 'nfd_build_url', 'https://www.hostgator.com/my-account/hosting/details/email' ),
				'pluginDashboardPage'         => \admin_url( 'admin.php?page=hostgator' ),
				'phoneNumbers'                => array(
					'support' => '866-964-2867',
					'intl'    => '+1-713-574-5287',
				),
				'hireExpertsInfo'             => array(
					'defaultLink'     => apply_filters(
						'nfd_build_url',
						'https://www.hostgator.com/services/web-design',
						array(
							'utm_source'   => 'wp-onboarding',
							'utm_campaign' => 'wp-setup',
						)
					),
					'fragment'        => '',
					'queryParameters' => array(
						'utm_source'   => 'wp-onboarding',
						'utm_medium'   => 'brand-plugin',
						'utm_campaign' => 'wp-setup',
					),
				),
				'expertsInfo'                 => array(
					'defaultLink' => apply_filters(
						'nfd_build_url',
						'https://www.hostgator.com/services/web-design',
						array(
							'utm_source' => 'wp-onboarding',
						)
					),
					'queryParams' => array(
						'utm_source' => 'wp-onboarding',
						'utm_medium' => 'brand-plugin',
					),
				),
				'fullServiceCreativeTeamInfo' => array(
					'defaultLink' => apply_filters(
						'nfd_build_url',
						'https://www.hostgator.com/services/web-design',
						array(
							'utm_source' => 'wp-onboarding',
						)
					),
					'fragment'    => '',
					'queryParams' => array(
						'utm_source' => 'wp-onboarding',
						'utm_medium' => 'brand-plugin',
					),
				),
				'techSupportInfo'             => array(
					'defaultLink' => apply_filters(
						'nfd_build_url',
						'https://www.hostgator.com/help',
						array(
							'utm_source' => 'wp-onboarding',
						)
					),
					'queryParams' => array(
						'utm_source' => 'wp-onboarding',
						'utm_medium' => 'brand-plugin',
					),
				),
				'migrationInfo'               => array(),
				'config'                      => array(
					'enabled_flows'        => array(
						'ecommerce' => true,
						'wp-setup'  => true,
						'sitegen'   => $has_ai_sitegen,
					),
					'wonder_blocks'        => true,
					'prioritization'       => false,
					'views'                => array(
						'sidebar' => array(
							'illustration' => array(
								'shown' => false,
							),
							'experts'      => array(
								'shown' => false,
							),
							'fullService'  => array(
								'shown' => false,
							),
							'infoPanel'    => array(
								'headingWithDescriptions' => array(
									'shown' => array( 0 ),
								),
							),
						),
					),
					'canMigrateSite'       => $can_migrate_site,
					'canRestartOnboarding' => false,
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
