<?php
namespace NewfoldLabs\WP\Module\Onboarding\Data;

/**
 * Contains Brand information.
 */
final class Brands {

	protected static $brands = array(
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
		),
	);

	/**
	 * Get Brand information.
	 *
	 * @return array
	 */
	public static function get_brands() {
		return self::$brands;
	}
}
