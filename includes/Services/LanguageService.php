<?php

namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Languages;

/**
 * Class LanguageService
 *
 * Handles language-related operations for the onboarding module.
 */
class LanguageService {

	/**
	 * Get the site locale.
	 *
	 * @return string The site locale.
	 */
	public static function get_site_locale(): string {
		$locale = Languages::get_default_language();
		if ( ! $locale ) {
			// Fallback to en_US if no default language is found.
			$locale = 'en_US';
		}
		return $locale;
	}
}
