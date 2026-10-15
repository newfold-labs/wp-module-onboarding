<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Services\ThemeService;

/**
 * ThemeService wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Services\ThemeService
 */
class ThemeServiceWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Stylesheet used by the Bluehost blueprint theme in the installer data.
	 */
	const STYLESHEET = 'bluehost-blueprint';

	/**
	 * Temporary theme root.
	 *
	 * @var string
	 */
	private $theme_root;

	/**
	 * Set up.
	 *
	 * @return void
	 */
	public function setUp(): void {
		parent::setUp();
		$this->reset_retries();
	}

	/**
	 * Tear down.
	 *
	 * @return void
	 */
	public function tearDown(): void {
		global $wp_theme_directories;

		if ( $this->theme_root ) {
			$wp_theme_directories = array_values( array_diff( (array) $wp_theme_directories, array( $this->theme_root ) ) );
			$this->remove_dir( $this->theme_root );
			$this->theme_root = null;
			wp_clean_themes_cache();
		}

		$this->reset_retries();
		parent::tearDown();
	}

	/**
	 * Reset the static retry counter.
	 *
	 * @return void
	 */
	private function reset_retries(): void {
		$property = new \ReflectionProperty( ThemeService::class, 'retries' );
		$property->setAccessible( true );
		$property->setValue( null, 0 );
	}

	/**
	 * Recursively remove a directory.
	 *
	 * @param string $dir Directory path.
	 * @return void
	 */
	private function remove_dir( string $dir ): void {
		if ( ! is_dir( $dir ) ) {
			return;
		}
		foreach ( scandir( $dir ) as $item ) {
			if ( '.' === $item || '..' === $item ) {
				continue;
			}
			$path = $dir . '/' . $item;
			is_dir( $path ) ? $this->remove_dir( $path ) : unlink( $path );
		}
		rmdir( $dir );
	}

	/**
	 * Create and register a minimal blueprint theme in a temp theme root.
	 *
	 * @param string $text_domain Text domain written to style.css.
	 * @return void
	 */
	private function install_fake_theme( string $text_domain ): void {
		$this->theme_root = sys_get_temp_dir() . '/nfd-theme-service-' . uniqid();
		$theme_dir        = $this->theme_root . '/' . self::STYLESHEET;
		mkdir( $theme_dir, 0777, true );

		file_put_contents(
			$theme_dir . '/style.css',
			"/*\nTheme Name: Blueprint Test\nVersion: 1.0\nText Domain: {$text_domain}\n*/\n"
		);
		file_put_contents( $theme_dir . '/index.php', "<?php\n// Silence is golden.\n" );

		register_theme_directory( $this->theme_root );
		wp_clean_themes_cache();
	}

	/**
	 * An installed but inactive theme is activated.
	 *
	 * @covers ::initialize
	 * @return void
	 */
	public function test_initialize_activates_installed_inactive_theme() {
		$this->install_fake_theme( 'something-else' );

		$this->assertTrue( ThemeService::initialize() );
		$this->assertSame( self::STYLESHEET, get_stylesheet() );
	}

	/**
	 * An installed and active theme needs no action.
	 *
	 * @covers ::initialize
	 * @return void
	 */
	public function test_initialize_returns_true_when_theme_already_active() {
		$this->install_fake_theme( self::STYLESHEET );
		switch_theme( self::STYLESHEET );

		$this->assertTrue( ThemeService::initialize() );
		$this->assertSame( self::STYLESHEET, get_stylesheet() );
	}

	/**
	 * Failed installs are retried and eventually give up.
	 *
	 * @covers ::initialize
	 * @covers ::retry
	 * @return void
	 */
	public function test_initialize_returns_false_after_repeated_install_failures() {
		$attempts = 0;
		add_filter(
			'pre_http_request',
			static function () use ( &$attempts ) {
				++$attempts;
				return new \WP_Error( 'http_request_failed', 'offline' );
			}
		);

		// The upgrader can leave output buffers open when it fails; keep ours balanced.
		$buffer_level = ob_get_level();
		try {
			$result = ThemeService::initialize();
		} finally {
			while ( ob_get_level() > $buffer_level ) {
				ob_end_clean();
			}
		}

		$this->assertFalse( $result );
		$this->assertGreaterThanOrEqual( 1, $attempts );
	}
}
