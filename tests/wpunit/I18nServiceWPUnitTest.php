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
	 * Missing translation files return false.
	 *
	 * @covers ::load_php_translations
	 * @return void
	 */
	public function test_load_php_translations_returns_false_without_mo_file() {
		$this->assertFalse( I18nService::load_php_translations( 'nfd-test-domain', 'nonexistent-dir' ) );
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
