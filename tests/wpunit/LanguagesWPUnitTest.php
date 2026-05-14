<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Data\Languages;

/**
 * Data Languages wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Data\Languages
 */
class LanguagesWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	public function test_get_default_language_returns_locale() {
		$this->assertSame( \get_locale(), Languages::get_default_language() );
	}

	public function test_is_default_language_true_for_current_locale() {
		$this->assertTrue( Languages::is_default_language( \get_locale() ) );
	}

	public function test_is_default_language_false_for_other_locale() {
		$other = 'en_US' === \get_locale() ? 'fr_FR' : 'en_US';
		$this->assertFalse( Languages::is_default_language( $other ) );
	}

	public function test_get_all_languages_returns_standardized_shape() {
		\add_filter(
			'newfold/onboarding/filter/languages',
			function ( $languages ) {
				return $languages;
			}
		);

		$languages = Languages::get_all_languages();
		$this->assertIsArray( $languages );
		$this->assertNotEmpty( $languages );
		$this->assertArrayHasKey( 'en_US', $languages );

		// Each entry must contain the standardized keys.
		foreach ( $languages as $locale => $language ) {
			$this->assertArrayHasKey( 'locale', $language );
			$this->assertArrayHasKey( 'name', $language );
			$this->assertArrayHasKey( 'native_name', $language );
			$this->assertSame( $locale, $language['locale'] );
		}

		// Exactly one language is flagged as default.
		$defaults = array_filter(
			$languages,
			function ( $language ) {
				return ! empty( $language['is_default'] );
			}
		);
		$this->assertCount( 1, $defaults );

		// Sorted alphabetically by locale.
		$keys = array_keys( $languages );
		$sorted = $keys;
		sort( $sorted );
		$this->assertSame( $sorted, $keys );
	}

	public function test_languages_filter_is_applied() {
		\add_filter(
			'newfold/onboarding/filter/languages',
			function ( $languages ) {
				$languages['xx_TEST'] = array(
					'locale'      => 'xx_TEST',
					'name'        => 'Test',
					'native_name' => 'Test',
				);
				return $languages;
			}
		);

		$languages = Languages::get_all_languages();
		$this->assertArrayHasKey( 'xx_TEST', $languages );
	}
}
