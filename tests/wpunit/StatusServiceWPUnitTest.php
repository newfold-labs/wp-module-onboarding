<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\Services\StatusService;

/**
 * StatusService wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Services\StatusService
 */
class StatusServiceWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Get a prefixed option value.
	 *
	 * @param string $key Option key without prefix.
	 * @return mixed
	 */
	private function opt( string $key ) {
		return get_option( Options::get_option_name( $key ) );
	}

	/**
	 * Set a prefixed option value.
	 *
	 * @param string $key   Option key without prefix.
	 * @param mixed  $value Option value.
	 * @return void
	 */
	private function set_opt( string $key, $value ): void {
		update_option( Options::get_option_name( $key ), $value );
	}

	/**
	 * First start marks status, stores start time and fires the action.
	 *
	 * @covers ::handle_started
	 * @return void
	 */
	public function test_handle_started_marks_started_and_fires_action() {
		$fired = 0;
		add_action(
			'newfold/onboarding/started',
			function () use ( &$fired ) {
				++$fired;
			}
		);

		$this->assertTrue( StatusService::handle_started() );
		$this->assertSame( 'started', $this->opt( 'status' ) );
		$this->assertNotEmpty( $this->opt( 'start_time' ) );
		$this->assertSame( 1, $fired );
	}

	/**
	 * A second start is a no-op.
	 *
	 * @covers ::handle_started
	 * @return void
	 */
	public function test_handle_started_returns_false_when_already_started() {
		StatusService::handle_started();
		$this->assertFalse( StatusService::handle_started() );
	}

	/**
	 * A completed onboarding is not restarted.
	 *
	 * @covers ::handle_started
	 * @return void
	 */
	public function test_handle_started_returns_false_when_completed() {
		$this->set_opt( 'status', 'completed' );
		$this->assertFalse( StatusService::handle_started() );
		$this->assertSame( 'completed', $this->opt( 'status' ) );
	}

	/**
	 * Abandoning a started onboarding clears time tracking.
	 *
	 * @covers ::handle_abandoned
	 * @return void
	 */
	public function test_handle_abandoned_updates_status_and_clears_times() {
		$this->set_opt( 'status', 'started' );
		$this->set_opt( 'start_time', time() );
		$this->set_opt( 'completed_time', time() );

		StatusService::handle_abandoned();

		$this->assertSame( 'abandoned', $this->opt( 'status' ) );
		$this->assertFalse( $this->opt( 'start_time' ) );
		$this->assertFalse( $this->opt( 'completed_time' ) );
	}

	/**
	 * Abandon only applies to started onboarding.
	 *
	 * @covers ::handle_abandoned
	 * @return void
	 */
	public function test_handle_abandoned_ignores_non_started_status() {
		$this->set_opt( 'status', 'completed' );
		StatusService::handle_abandoned();
		$this->assertSame( 'completed', $this->opt( 'status' ) );
	}

	/**
	 * Completing a started onboarding stores status, time, site info and fires the action.
	 *
	 * @covers ::handle_completed
	 * @return void
	 */
	public function test_handle_completed_marks_completed() {
		$fired = 0;
		add_action(
			'newfold/onboarding/completed',
			function () use ( &$fired ) {
				++$fired;
			}
		);
		$this->set_opt( 'status', 'started' );

		StatusService::handle_completed();

		$this->assertSame( 'completed', $this->opt( 'status' ) );
		$this->assertNotEmpty( $this->opt( 'completed_time' ) );
		$this->assertSame( 1, $fired );
	}

	/**
	 * Sitegen site types map to the site_type values other modules expect.
	 *
	 * @covers ::save_site_info
	 * @dataProvider site_type_provider
	 *
	 * @param string $sitegen_type Stored sitegen site type.
	 * @param string $expected     Expected site_info site_type.
	 * @return void
	 */
	public function test_save_site_info_maps_site_type( string $sitegen_type, string $expected ) {
		$this->set_opt( 'sitegen_site_type', $sitegen_type );

		StatusService::save_site_info();

		$this->assertSame(
			array(
				'experience_level' => 'advanced',
				'site_type'        => $expected,
			),
			$this->opt( 'site_info' )
		);
	}

	/**
	 * Site type mapping cases.
	 *
	 * @return array
	 */
	public function site_type_provider(): array {
		return array(
			'ecommerce mixed case' => array( 'eCommerce', 'ecommerce' ),
			'ecommerce lower'      => array( 'ecommerce', 'ecommerce' ),
			'blog'                 => array( 'Blog', 'personal' ),
			'personal'             => array( 'personal', 'personal' ),
			'business'             => array( 'business', 'business' ),
			'quoted value'         => array( '"ecommerce"', 'ecommerce' ),
			'unknown'              => array( 'portfolio', 'business' ),
			'empty'                => array( '', 'business' ),
		);
	}

	/**
	 * Completing without a started status does nothing.
	 *
	 * @covers ::handle_completed
	 * @return void
	 */
	public function test_handle_completed_ignored_unless_started() {
		$fired = 0;
		add_action(
			'newfold/onboarding/completed',
			function () use ( &$fired ) {
				++$fired;
			}
		);

		StatusService::handle_completed();

		$this->assertFalse( $this->opt( 'status' ) );
		$this->assertSame( 0, $fired );
	}

	/**
	 * Track abandons onboarding when the request is not the onboarding page.
	 *
	 * @covers ::track
	 * @return void
	 */
	public function test_track_abandons_when_not_on_onboarding_page() {
		$this->set_opt( 'status', 'started' );
		unset( $_GET['page'] );

		StatusService::track();

		$this->assertSame( 'abandoned', $this->opt( 'status' ) );
	}

	/**
	 * Track leaves status alone on the onboarding page.
	 *
	 * @covers ::track
	 * @return void
	 */
	public function test_track_ignores_onboarding_page() {
		$this->set_opt( 'status', 'started' );
		$_GET['page'] = WP_Admin::$slug;

		StatusService::track();
		unset( $_GET['page'] );

		$this->assertSame( 'started', $this->opt( 'status' ) );
	}
}
