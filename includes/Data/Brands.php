<?php
namespace NewfoldLabs\WP\Module\Onboarding\Data;

/**
 * Contains Brand information.
 */
final class Brands {

	/**
	 * Brand specific data - Bluehost, Bluhost India, Webcom
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
			),
		);
	}
}
