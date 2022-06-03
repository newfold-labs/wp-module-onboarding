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
		'jetpack'       => true,
		'woocommerce'   => true,
		'wordpress-seo' => true,
		'wpforms-lite'  => true,
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
			'wp_slugs' => self::$wp_slugs,
			'urls'     => self::$urls,
			'domains'  => self::$domains,
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

}
