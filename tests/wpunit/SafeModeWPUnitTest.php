<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Compatibility\Safe_Mode;
use NewfoldLabs\WP\Module\Onboarding\Compatibility\Scan;
use NewfoldLabs\WP\Module\Onboarding\Compatibility\Status;
use NewfoldLabs\WP\Module\Onboarding\Data\Options;

/**
 * Safe_Mode wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Compatibility\Safe_Mode
 */
class SafeModeWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Original $pagenow.
	 *
	 * @var mixed
	 */
	private $original_pagenow;

	/**
	 * Set up.
	 *
	 * @return void
	 */
	public function setUp(): void {
		parent::setUp();
		global $pagenow;
		$this->original_pagenow = $pagenow;
	}

	/**
	 * Tear down.
	 *
	 * @return void
	 */
	public function tearDown(): void {
		global $pagenow;
		$pagenow = $this->original_pagenow; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
		unset( $_GET['updated'] );
		delete_transient( Options::get_option_name( 'core_update_referrer' ) );
		Status::reset();
		remove_all_actions( '_core_updated_successfully' );
		remove_all_actions( 'load-about.php' );
		parent::tearDown();
	}

	/**
	 * Build a scan with stubbed data/config for rendering.
	 *
	 * @return Scan
	 */
	private function scan(): Scan {
		$scan         = new Scan();
		$scan->data   = array( 'wp_version' => '5.0' );
		$scan->config = array( 'min_wp' => '6.9' );

		return $scan;
	}

	/**
	 * The constructor hooks the submenu page and the post-update redirects.
	 */
	public function test_constructor_registers_hooks() {
		$safe_mode = new Safe_Mode( $this->scan() );

		$this->assertSame( $this->scan()->config, $safe_mode->scan->config );
		$this->assertNotFalse( has_action( 'admin_menu', array( $safe_mode, 'core_update_page' ) ) );
		$this->assertNotFalse( has_action( '_core_updated_successfully', array( Safe_Mode::class, 'handle_redirect' ) ) );
		$this->assertNotFalse( has_action( 'load-about.php', array( Safe_Mode::class, 'handle_redirect' ) ) );
	}

	/**
	 * core_update_page registers a hidden submenu page for the onboarding slug.
	 */
	public function test_core_update_page_registers_hidden_submenu_page() {
		wp_set_current_user( self::factory()->user->create( array( 'role' => 'administrator' ) ) );
		global $_registered_pages;
		$safe_mode = new Safe_Mode( $this->scan() );

		$safe_mode->core_update_page();

		$this->assertArrayHasKey( 'admin_page_' . WP_Admin::$slug, (array) $_registered_pages );
	}

	/**
	 * Rendering stores the referrer transient and outputs the upgrade UI.
	 */
	public function test_render_sets_referrer_transient_and_outputs_upgrade_ui() {
		require_once ABSPATH . 'wp-admin/includes/update.php';
		$_SERVER['REQUEST_URI'] = '/wp-admin/index.php?page=nfd-onboarding';
		$safe_mode              = new Safe_Mode( $this->scan() );

		ob_start();
		$safe_mode->render();
		$output = ob_get_clean();

		$this->assertStringContainsString( 'safe-mode', $output );
		$this->assertStringContainsString( 'name="upgrade"', $output );
		$this->assertStringContainsString( 'upgrade-core', $output );
		$this->assertNotFalse( get_transient( Options::get_option_name( 'core_update_referrer' ) ) );
	}

	/**
	 * about.php loads that are not post-update are ignored entirely.
	 */
	public function test_handle_redirect_ignores_about_page_without_updated_flag() {
		global $pagenow;
		$pagenow = 'about.php'; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
		update_option( Options::get_option_name( 'compatibility_results' ), 'compatible' );

		Safe_Mode::handle_redirect();

		$this->assertNotFalse( get_option( Options::get_option_name( 'compatibility_results' ) ), 'Status must not be reset' );
	}

	/**
	 * After a core update the compatibility status is reset for a re-scan.
	 */
	public function test_handle_redirect_resets_status() {
		global $pagenow;
		$pagenow = 'update-core.php'; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
		update_option( Options::get_option_name( 'compatibility_results' ), 'compatible' );

		Safe_Mode::handle_redirect();

		$this->assertFalse( get_option( Options::get_option_name( 'compatibility_results' ) ) );
	}

	/**
	 * Outside Coming Soon mode the referrer transient is left in place and nothing redirects.
	 */
	public function test_handle_redirect_does_not_redirect_when_not_coming_soon() {
		global $pagenow;
		$pagenow = 'update-core.php'; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
		set_transient( Options::get_option_name( 'core_update_referrer' ), '/wp-admin/index.php?page=nfd-onboarding', DAY_IN_SECONDS );

		ob_start();
		Safe_Mode::handle_redirect();
		$output = ob_get_clean();

		$this->assertSame( '', $output );
		$this->assertNotFalse( get_transient( Options::get_option_name( 'core_update_referrer' ) ) );
	}

	/**
	 * Without a stored referrer nothing happens beyond the reset.
	 */
	public function test_handle_redirect_without_referrer_outputs_nothing() {
		global $pagenow;
		$pagenow = 'about.php'; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
		$_GET['updated'] = '1';

		ob_start();
		Safe_Mode::handle_redirect();
		$output = ob_get_clean();

		$this->assertSame( '', $output );
	}
}
