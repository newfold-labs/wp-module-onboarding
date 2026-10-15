<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\Services\ReduxStateService;

/**
 * ReduxStateService wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Services\ReduxStateService
 */
class ReduxStateServiceWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Unknown slice returns an empty array.
	 *
	 * @covers ::get
	 * @return void
	 */
	public function test_get_unknown_state_returns_empty_array() {
		$this->assertSame( array(), ReduxStateService::get( 'nope' ) );
	}

	/**
	 * Unset slice returns an empty array.
	 *
	 * @covers ::get
	 * @return void
	 */
	public function test_get_unset_steps_returns_empty_array() {
		$this->assertSame( array(), ReduxStateService::get( 'steps' ) );
	}

	/**
	 * Update rejects unknown slices.
	 *
	 * @covers ::update
	 * @return void
	 */
	public function test_update_unknown_state_returns_false() {
		$this->assertFalse( ReduxStateService::update( 'nope', array( 'a' => 1 ) ) );
	}

	/**
	 * Update rejects empty data.
	 *
	 * @covers ::update
	 * @return void
	 */
	public function test_update_empty_data_returns_false() {
		$this->assertFalse( ReduxStateService::update( 'steps', array() ) );
	}

	/**
	 * Update stores data with a last_updated timestamp that get returns.
	 *
	 * @covers ::update
	 * @covers ::get
	 * @return void
	 */
	public function test_update_then_get_round_trips_with_last_updated() {
		$this->assertTrue( ReduxStateService::update( 'steps', array( 'current' => 'chat' ) ) );

		$data = ReduxStateService::get( 'steps' );
		$this->assertSame( 'chat', $data['current'] );
		$this->assertArrayHasKey( 'last_updated', $data );
		$this->assertIsInt( $data['last_updated'] );
	}

	/**
	 * Sitegen slice is rebuilt from dedicated options with defaults.
	 *
	 * @covers ::get_state_sitegen
	 * @return void
	 */
	public function test_get_state_sitegen_defaults() {
		$this->assertSame(
			array(
				'siteId'              => '',
				'siteGenId'           => '',
				'siteType'            => '',
				'enhancedPrompt'      => '',
				'discoveryData'       => array(),
				'sitegenSliceVersion' => 0,
			),
			ReduxStateService::get_state_sitegen()
		);
	}

	/**
	 * Sitegen slice reflects stored options and is used by get().
	 *
	 * @covers ::get_state_sitegen
	 * @covers ::get
	 * @return void
	 */
	public function test_get_sitegen_reads_dedicated_options() {
		update_option( Options::get_option_name( 'sitegen_site_id' ), 'site-123' );
		update_option( Options::get_option_name( 'sitegen_current_id' ), 'gen-456' );
		update_option( Options::get_option_name( 'sitegen_site_type' ), 'blog' );
		update_option( Options::get_option_name( 'sitegen_enhanced_prompt' ), 'A better prompt' );
		update_option( Options::get_option_name( 'sitegen_discovery_data' ), array( 'q' => 'a' ) );

		$data = ReduxStateService::get( 'sitegen' );

		$this->assertSame( 'site-123', $data['siteId'] );
		$this->assertSame( 'gen-456', $data['siteGenId'] );
		$this->assertSame( 'blog', $data['siteType'] );
		$this->assertSame( 'A better prompt', $data['enhancedPrompt'] );
		$this->assertSame( array( 'q' => 'a' ), $data['discoveryData'] );
	}

	/**
	 * Existing site id is returned without a handshake.
	 *
	 * @covers ::ensure_sitegen_site_id
	 * @return void
	 */
	public function test_ensure_sitegen_site_id_returns_existing() {
		update_option( Options::get_option_name( 'sitegen_site_id' ), 'existing-id' );
		$this->assertSame( 'existing-id', ReduxStateService::ensure_sitegen_site_id() );
	}

	/**
	 * Failed handshake yields an empty string and stores nothing.
	 *
	 * @covers ::ensure_sitegen_site_id
	 * @return void
	 */
	public function test_ensure_sitegen_site_id_returns_empty_when_handshake_fails() {
		$filter = static function () {
			return new \WP_Error( 'fail', 'fail', array( 'status' => 500 ) );
		};
		add_filter( 'rest_pre_dispatch', $filter );

		$this->assertSame( '', ReduxStateService::ensure_sitegen_site_id() );

		remove_filter( 'rest_pre_dispatch', $filter );
		$this->assertEmpty( get_option( Options::get_option_name( 'sitegen_site_id' ), '' ) );
	}

	/**
	 * Successful handshake persists and returns the site id.
	 *
	 * @covers ::ensure_sitegen_site_id
	 * @return void
	 */
	public function test_ensure_sitegen_site_id_persists_handshake_result() {
		$filter = static function () {
			return array( 'site_id' => 'new-id' );
		};
		add_filter( 'rest_pre_dispatch', $filter );

		$this->assertSame( 'new-id', ReduxStateService::ensure_sitegen_site_id() );

		remove_filter( 'rest_pre_dispatch', $filter );
		$this->assertSame( 'new-id', get_option( Options::get_option_name( 'sitegen_site_id' ) ) );
	}
}
