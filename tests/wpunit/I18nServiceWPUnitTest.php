<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Services\I18nService;

/**
 * I18nService wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Services\I18nService
 */
class I18nServiceWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Loading from a directory without translation files returns a boolean and does not error.
	 *
	 * The exact value depends on the site locale (WordPress returns true for en_US).
	 *
	 * @covers ::load_php_translations
	 * @return void
	 */
	public function test_load_php_translations_returns_bool_without_translation_file() {
		$this->assertIsBool( I18nService::load_php_translations( 'nfd-test-domain', 'nonexistent-dir' ) );
	}

	/**
	 * Without a matching translation file no translations are loaded for a non-English locale.
	 *
	 * @covers ::load_php_translations
	 * @return void
	 */
	public function test_load_php_translations_returns_false_for_non_english_locale_without_translation_file() {
		$filter = static function () {
			return 'fr_FR';
		};
		add_filter( 'locale', $filter );

		$this->assertFalse( I18nService::load_php_translations( 'nfd-test-domain', 'nonexistent-dir' ) );

		remove_filter( 'locale', $filter );
	}

	/**
	 * Absolute path to the module languages directory.
	 *
	 * @return string
	 */
	private function languages_dir(): string {
		return dirname( dirname( __DIR__ ) ) . '/languages';
	}

	/**
	 * Every .po catalog has a generated .l10n.php file and no stale .mo file exists.
	 *
	 * The i18n scripts generate .po, .l10n.php and JSON files only.
	 *
	 * @return void
	 */
	public function test_each_po_file_has_l10n_php_and_no_mo_files() {
		$po_files = glob( $this->languages_dir() . '/*.po' );
		$this->assertNotEmpty( $po_files );

		foreach ( $po_files as $po_file ) {
			$base = substr( $po_file, 0, -3 );
			$this->assertFileExists( $base . '.l10n.php', basename( $base ) . ' is missing its .l10n.php file.' );
			$this->assertFileDoesNotExist( $base . '.mo', basename( $base ) . ' has a stale .mo file.' );
		}

		$this->assertSame( array(), glob( $this->languages_dir() . '/*.mo' ) );
	}

	/**
	 * Generated .l10n.php files return a valid translation catalog for this domain.
	 *
	 * @return void
	 */
	public function test_l10n_php_files_return_valid_catalogs() {
		foreach ( glob( $this->languages_dir() . '/*.l10n.php' ) as $file ) {
			$catalog = include $file;

			$this->assertIsArray( $catalog, basename( $file ) );
			$this->assertSame( 'wp-module-onboarding', $catalog['domain'], basename( $file ) );
			$this->assertNotEmpty( $catalog['language'], basename( $file ) );
			$this->assertIsArray( $catalog['messages'], basename( $file ) );
			$this->assertNotEmpty( $catalog['messages'], basename( $file ) );
			$this->assertStringContainsString( $catalog['language'], basename( $file ) );
		}
	}

	/**
	 * Translations load from the .l10n.php file when no .mo file exists.
	 *
	 * @return void
	 */
	public function test_translations_load_from_l10n_php_file() {
		$domain = 'wp-module-onboarding';
		$this->assertTrue( load_textdomain( $domain, $this->languages_dir() . '/wp-module-onboarding-de_DE.mo', 'de_DE' ) );

		$this->assertSame( 'Einbinden', translate( 'Onboarding', $domain ) );

		unload_textdomain( $domain );
	}

	/**
	 * Unregistered scripts cannot be given translations.
	 *
	 * @covers ::load_js_translations
	 * @return void
	 */
	public function test_load_js_translations_returns_false_for_unregistered_script() {
		$this->assertFalse( I18nService::load_js_translations( 'nfd-test-domain', 'nfd-unregistered-script', '/tmp' ) );
	}

	/**
	 * Registered scripts get translations attached.
	 *
	 * @covers ::load_js_translations
	 * @return void
	 */
	public function test_load_js_translations_returns_true_for_registered_script() {
		wp_register_script( 'nfd-test-script', 'https://example.org/test.js', array(), '1.0.0', true );

		$this->assertTrue( I18nService::load_js_translations( 'nfd-test-domain', 'nfd-test-script', '/tmp' ) );
		$this->assertSame( 'nfd-test-domain', wp_scripts()->registered['nfd-test-script']->textdomain );
		$this->assertSame( '/tmp', wp_scripts()->registered['nfd-test-script']->translations_path );
	}
}
