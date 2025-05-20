<?php

namespace NewfoldLabs\WP\Module\Onboarding\Services;

/**
 * Class LanguageService
 *
 * Handles language-related operations for the onboarding module.
 */
class LanguageService {

	/**
	 * Get all available languages including the default English.
	 *
	 * @return array List of language data
	 */
	public static function get_all_languages() {
		// Load translation-install.php if the function doesn't exist
		if ( ! function_exists( 'wp_get_available_translations' ) ) {
			require_once ABSPATH . 'wp-admin/includes/translation-install.php';
		}

		// Get all available translations from WordPress API
		$translations = \wp_get_available_translations();

		// If translations API fails, provide basic fallback
		if ( empty( $translations ) ) {
			return self::get_fallback_languages();
		}

		// Format data for response - include English as default
		$formatted_languages = array(
			array(
				'code'        => 'en_US',
				'name'        => 'English (United States)',
				'native_name' => 'English (United States)',
			),
		);

		// Add translated languages with proper format
		foreach ( $translations as $locale => $translation ) {
			$formatted_languages[] = array(
				'code'        => $locale,
				'name'        => $translation['english_name'],
				'native_name' => $translation['native_name'],
			);
		}

		return $formatted_languages;
	}

	/**
	 * Get language data array formatted for the language selection component.
	 * Returns array of [language_name, language_code] pairs.
	 *
	 * @return array Array of language name and code pairs
	 */
	public static function get_languages_for_selection() {
		$languages     = self::get_all_languages();
		$language_list = array();

		foreach ( $languages as $language ) {
			$language_list[] = array(
				$language['name'],
				$language['code'],
			);
		}

		return $language_list;
	}

	/**
	 * Get fallback languages in case the translations API fails.
	 *
	 * @return array Basic list of language data
	 */
	private static function get_fallback_languages() {
		return array(
			array(
				'code'        => 'en_US',
				'name'        => 'English (United States)',
				'native_name' => 'English (United States)',
			),
			array(
				'code'        => 'es_ES',
				'name'        => 'Spanish (Spain)',
				'native_name' => 'Español',
			),
			array(
				'code'        => 'fr_FR',
				'name'        => 'French (France)',
				'native_name' => 'Français',
			),
			array(
				'code'        => 'de_DE',
				'name'        => 'German',
				'native_name' => 'Deutsch',
			),
		);
	}
}
