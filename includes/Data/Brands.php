<?php
namespace NewfoldLabs\WP\Module\Onboarding\Data;

/**
 * Contains Brand information.
 */
final class Brands {

	public static function get_brands() {

		return array(
			'bluehost'       => array(
				'brand'            => 'bluehost',
				'name'             => 'Bluehost',
				'url'              => 'https://bluehost.com',
				'knowledgeBaseUrl' => 'https://www.bluehost.com/help/results/wordpress',
				'helpUrl'          => 'https://www.bluehost.com/help',
				'blogUrl'          => 'https://www.bluehost.com/blog/',
				'facebookUrl'      => 'https://www.facebook.com/bluehost',
				'twitterName'      => '@bluehost',
				'twitterUrl'       => 'https://twitter.com/bluehost',
				'youtubeUrl'       => 'https://www.youtube.com/user/bluehost',
				'linkedinUrl'      => 'https://www.linkedin.com/company/bluehost-com',
				'accountUrl'       => 'https://my.bluehost.com',
				'domainsUrl'       => 'https://my.bluehost.com/hosting/app?lil=1#/domains',
				'emailUrl'         => 'https://my.bluehost.com/hosting/app?lil=1#/email-office',
				'hireExpertsInfo'   => array(
					'defaultLink'		=> 'admin.php?',
					'fragment'			=> '#/marketplace/services/blue-sky', 
					'queryParameters' 	=> array(
						'page'			=> 'bluehost',
						'utm_source'	=> 'onboarding',
						'utm_medium'	=> 'wp_admin',
						'utm_campaign'	=> 'wp-setup'
					),
				),
				'expertsInfo' => array(
					'defaultLink'		=> 'https://my.bluehost.com/cgi/app/#/marketplace/product/i/bluesky',
					'queryParams'		=> array(
						'utm_source'	=> 'wp-onboarding',
						'utm_medium'	=> 'brand-plugin',
					),
				),
				'fullServiceCreativeTeamInfo' => array(
					'defaultLink'		=> 'https://www.bluehost.com/solutions/full-service',
					'fragment'			=> '#full-service',
					'queryParams'		=> array(
						'utm_source'	=> 'wp-onboarding',
						'utm_medium'	=> 'brand-plugin',
					),
				),
				'techSupportInfo' => array(
					'defaultLink'		=> 'https://helpchat.bluehost.com/',
					'queryParams'		=> array(
						'utm_source'	=> 'wp-onboarding',
						'utm_medium'	=> 'brand-plugin',
					),
				),
			),
			'bluehost-india' => array(
				'brand'            => 'bluehost-india',
				'name'             => 'Bluehost',
				'url'              => 'https://bluehost.in',
				'knowledgeBaseUrl' => 'https://www.bluehost.in/hosting/help/results/wordpress',
				'helpUrl'          => 'https://www.bluehost.in/hosting/help',
				'blogUrl'          => 'https://www.bluehost.in/tutorials',
				'facebookUrl'      => 'https://www.facebook.com/BlueHostIndia',
				'twitterName'      => '@BluehostIndia',
				'twitterUrl'       => 'https://twitter.com/bluehostindia',
				'youtubeUrl'       => null,
				'linkedinUrl'      => null,
				'accountUrl'       => 'https://my.bluehost.in',
				'domainsUrl'       => 'https://my.bluehost.in/hosting/app?lil=1#/domains',
				'emailUrl'         => 'https://my.bluehost.in/hosting/app?lil=1#/email-office',
				'hireExpertsInfo'   => array(
					'defaultLink' 		=> 'https://www.bluehost.in/solutions/full-service', 
					'utmParameters' 	=> array(
						'utm_source' 	=> 'blog',
						'utm_medium' 	=> 'socialmedia',
						'utm_campaign' 	=> 'blogpost'
					)
				),
				'expertsInfo' => array(
					'defaultLink'		=> 'https://my.bluehost.in/cgi/app/#/marketplace/product/i/bluesky',
					'queryParams'		=> array(
						'utm_source'	=> 'wp-onboarding',
						'utm_medium'	=> 'brand-plugin',
					),
				),
				'fullServiceCreativeTeamInfo' => array(
					'defaultLink'		=> 'https://www.bluehost.in/solutions/full-service',
					'fragment'			=> '#full-service',
					'queryParams'		=> array(
						'utm_source'	=> 'wp-onboarding',
						'utm_medium'	=> 'brand-plugin',
					),
				),
				'techSupportInfo' => array(
					'defaultLink'		=> 'https://helpchat.bluehost.in/',
					'queryParams'		=> array(
						'utm_source'	=> 'wp-onboarding',
						'utm_medium'	=> 'brand-plugin',
					),
				),
			),
		);
	}
}
