<?php

namespace NewfoldLabs\WP\Module\Onboarding\Data;

/**
 * A class to handle language/locale data.
 */
class Languages {
	/**
	 * List of all available languages.
	 *
	 * @var array
	 */
	private static $languages = array();

	/**
	 * English US language.
	 *
	 * @var array
	 */
	private static $english_us = array(
		'language'     => 'en_US',
		'english_name' => 'English (United States)',
		'native_name'  => 'English (United States)',
	);

	/**
	 * Active site language.
	 *
	 * @var string
	 */
	private static $default_language = '';

	/**
	 * Get all available languages.
	 *
	 * @return array The list of available languages.
	 */
	public static function get_all_languages(): array {
		// Get all available wp.org translations.
		if ( ! function_exists( 'wp_get_available_translations' ) ) {
			require_once ABSPATH . 'wp-admin/includes/translation-install.php';
		}
		$translations = \wp_get_available_translations();

		// If translations API fails, fallback to focus languages.
		if ( empty( $translations ) ) {
			$translations = self::get_fallback_languages();
		}

		self::$languages = $translations;

		// wp.org translations don't typically include English US, so we'll add it if it's missing.
		if ( ! array_key_exists( self::$english_us['language'], self::$languages ) ) {
			self::$languages[ self::$english_us['language'] ] = self::$english_us;
		}

		$languages = self::standardize_list( self::$languages );

		/**
		 * Filter the list of available languages.
		 *
		 * @param array $languages The list of available languages.
		 */
		$languages = \apply_filters( 'newfold/onboarding/filter/languages', $languages );

		return $languages;
	}

	/**
	 * Standardize the shape and content of the language list.
	 *
	 * @param array $languages The list of languages to standardize.
	 * @return array The standardized list of languages.
	 */
	private static function standardize_list( array $languages ): array {
		// standardize the shape.
		$languages = array_map(
			function ( $language ) {
				return array(
					'locale'      => $language['language'],
					'name'        => $language['english_name'],
					'native_name' => $language['native_name'],
				);
			},
			$languages
		);

		// Assign the default language.
		$default_language = self::get_default_language();
		if ( array_key_exists( $default_language, $languages ) ) {
			$languages[ $default_language ]['is_default'] = true;
		} else {
			// If the default language is not in the list, assign English US as the default.
			$languages[ self::$english_us['language'] ]['is_default'] = true;
		}

		// Sort list alphabetically by keys (locale).
		ksort( $languages );
		return $languages;
	}

	/**
	 * Check if the language (locale) is the default (active) language.
	 *
	 * @param string $locale The locale of the language.
	 * @return bool True if the language is the default language, false otherwise.
	 */
	public static function is_default_language( string $locale ): bool {
		if ( ! empty( self::$default_language ) ) {
			return $locale === self::$default_language;
		}

		return self::get_default_language() === $locale;
	}

	/**
	 * Get the site's active language.
	 *
	 * @return string The locale of the active language.
	 */
	public static function get_default_language(): string {
		$default_language       = \get_locale();
		self::$default_language = $default_language;
		return $default_language;
	}

	/**
	 * Get fallback languages in case the translations API fails.
	 *
	 * @return array Focus list of languages
	 */
	private static function get_fallback_languages(): array {
		return array(
			'en_US' => array(
				'language'     => 'en_US',
				'english_name' => 'English (United States)',
				'native_name'  => 'English (United States)',
			),
			'es_ES' => array(
				'language'     => 'es_ES',
				'english_name' => 'Spanish (Spain)',
				'native_name'  => 'Español',
			),
			'fr_FR' => array(
				'language'     => 'fr_FR',
				'english_name' => 'French (France)',
				'native_name'  => 'Français',
			),
			'de_DE' => array(
				'language'     => 'de_DE',
				'english_name' => 'German',
				'native_name'  => 'Deutsch',
			),
		);
	}
}
