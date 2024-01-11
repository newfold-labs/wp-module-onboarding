<?php

namespace NewfoldLabs\WP\Module\Onboarding\Services;

/**
 * Class for handling internationalization.
 */
class I18nService {

	/**
	 * Loads the PHP translations from .mo files in the languages dir.
	 * The .mo file must be named $domain-$locale.mo
	 *
	 * @param [string] $domain The text domain.
	 * @param [string] $languages_dir The directory containing the .mo files.
	 * @return boolean
	 */
	public static function load_php_translations( $domain, $languages_dir ) {
		return load_plugin_textdomain(
			$domain,
			false,
			$languages_dir
		);
	}

	/**
	 * Localizes a particular script using a JSON file present in the languages dir.
	 * The JSON file must be named $domain-$locale-$script_slug.json.
	 * Note: The script must be registered before this function is called.
	 *
	 * @param [string] $domain The text domain.
	 * @param [string] $script_slug The slug of the registered script.
	 * @param [string] $languages_dir The directory containing the .json file for the script.
	 * @return boolean
	 */
	public static function load_js_translations( $domain, $script_slug, $languages_dir ) {
		return wp_set_script_translations(
			$script_slug,
			$domain,
			$languages_dir
		);
	}
}
