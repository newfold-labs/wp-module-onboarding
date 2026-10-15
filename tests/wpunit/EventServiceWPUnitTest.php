<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\Services\EventService;

/**
 * EventService wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Services\EventService
 */
class EventServiceWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Event requests captured from the REST dispatch.
	 *
	 * @var \WP_REST_Request[]
	 */
	private $requests = array();

	/**
	 * Set up.
	 *
	 * @return void
	 */
	public function setUp(): void {
		parent::setUp();
		$this->requests = array();

		if ( ! defined( 'NFD_MODULE_DATA_EVENTS_API' ) ) {
			define( 'NFD_MODULE_DATA_EVENTS_API', '/newfold-data/v1/events' );
		}

		add_filter(
			'rest_pre_dispatch',
			function ( $result, $server, $request ) {
				if ( NFD_MODULE_DATA_EVENTS_API === $request->get_route() ) {
					$this->requests[] = $request;
					return array( 'ok' => true );
				}
				return $result;
			},
			10,
			3
		);
	}

	/**
	 * Init registers the option hooks.
	 *
	 * @covers ::init
	 * @return void
	 */
	public function test_init_registers_option_hooks() {
		EventService::init();

		$this->assertNotFalse( has_action( 'updated_option', array( EventService::class, 'handle_option_update' ) ) );
		$this->assertNotFalse( has_action( 'added_option', array( EventService::class, 'handle_option_update' ) ) );
	}

	/**
	 * Category validation.
	 *
	 * @covers ::validate_category
	 * @return void
	 */
	public function test_validate_category() {
		$this->assertTrue( EventService::validate_category( 'wonder_start' ) );
		$this->assertTrue( EventService::validate_category( 'experiment' ) );
		$this->assertFalse( EventService::validate_category( 'nope' ) );
	}

	/**
	 * Action validation.
	 *
	 * @covers ::validate_action
	 * @return void
	 */
	public function test_validate_action() {
		$this->assertTrue( EventService::validate_action( 'pageview' ) );
		$this->assertFalse( EventService::validate_action( 'not_an_action' ) );
	}

	/**
	 * Event validation requires a valid action and category.
	 *
	 * @covers ::validate
	 * @return void
	 */
	public function test_validate_requires_action_and_category() {
		$valid = array(
			'action'   => 'pageview',
			'category' => 'wonder_start',
		);

		$this->assertSame( $valid, EventService::validate( $valid ) );
		$this->assertFalse( EventService::validate( array( 'category' => 'wonder_start' ) ) );
		$this->assertFalse( EventService::validate( array( 'action' => 'pageview' ) ) );
		$this->assertFalse( EventService::validate( array_merge( $valid, array( 'action' => 'bad' ) ) ) );
		$this->assertFalse( EventService::validate( array_merge( $valid, array( 'category' => 'bad' ) ) ) );
	}

	/**
	 * Invalid events return a WP_Error and send nothing.
	 *
	 * @covers ::send
	 * @return void
	 */
	public function test_send_invalid_event_returns_wp_error() {
		$result = EventService::send( array( 'action' => 'bad' ) );

		$this->assertWPError( $result );
		$this->assertSame( 'nfd_module_onboarding_error', $result->get_error_code() );
		$this->assertCount( 0, $this->requests );
	}

	/**
	 * Valid events are dispatched to the data module events API.
	 *
	 * @covers ::send
	 * @return void
	 */
	public function test_send_valid_event_dispatches_request() {
		$result = EventService::send(
			array(
				'action'   => 'pageview',
				'category' => 'wonder_start',
				'data'     => array( 'page' => 'home' ),
			)
		);

		$this->assertNotWPError( $result );
		$this->assertCount( 1, $this->requests );
		$params = $this->requests[0]->get_body_params();
		$this->assertSame( 'pageview', $params['action'] );
		$this->assertSame( array( 'page' => 'home' ), $params['data'] );
	}

	/**
	 * Error responses from the API are returned as WP_Error.
	 *
	 * @covers ::send
	 * @return void
	 */
	public function test_send_returns_wp_error_when_api_errors() {
		remove_all_filters( 'rest_pre_dispatch' );
		add_filter(
			'rest_pre_dispatch',
			static function () {
				return new \WP_Error( 'api_fail', 'fail', array( 'status' => 500 ) );
			}
		);

		$result = EventService::send(
			array(
				'action'   => 'pageview',
				'category' => 'wonder_start',
			)
		);

		$this->assertWPError( $result );
		$this->assertSame( 'api_fail', $result->get_error_code() );
	}

	/**
	 * Started events get a timestamp.
	 *
	 * @covers ::send
	 * @return void
	 */
	public function test_send_onboarding_started_adds_timestamp() {
		EventService::send(
			array(
				'action'   => 'onboarding_started',
				'category' => 'wonder_start',
			)
		);

		$params = $this->requests[0]->get_body_params();
		$this->assertArrayHasKey( 'timestamp', $params['data'] );
		$this->assertArrayNotHasKey( 'ttl', $params['data'] );
	}

	/**
	 * Complete events get a ttl computed from the stored start and completion times.
	 *
	 * @covers ::send
	 * @return void
	 */
	public function test_send_onboarding_complete_adds_ttl_from_stored_times() {
		update_option( Options::get_option_name( 'start_time' ), 1000 );
		update_option( Options::get_option_name( 'completed_time' ), 1090 );

		EventService::send(
			array(
				'action'   => 'onboarding_complete',
				'category' => 'wonder_start',
			)
		);

		$params = $this->requests[0]->get_body_params();
		$this->assertArrayHasKey( 'timestamp', $params['data'] );
		$this->assertSame( 90, $params['data']['ttl'] );
	}

	/**
	 * Without a stored completion time the ttl uses the current time.
	 *
	 * @covers ::send
	 * @return void
	 */
	public function test_send_onboarding_complete_ttl_falls_back_to_now() {
		update_option( Options::get_option_name( 'start_time' ), time() - 60 );

		EventService::send(
			array(
				'action'   => 'onboarding_complete',
				'category' => 'wonder_start',
			)
		);

		$ttl = $this->requests[0]->get_body_params()['data']['ttl'];
		$this->assertGreaterThanOrEqual( 60, $ttl );
		$this->assertLessThan( 70, $ttl );
	}

	/**
	 * Without a start time no ttl is added.
	 *
	 * @covers ::send
	 * @return void
	 */
	public function test_send_onboarding_complete_without_start_time_has_no_ttl() {
		EventService::send(
			array(
				'action'   => 'onboarding_complete',
				'category' => 'wonder_start',
			)
		);

		$this->assertArrayNotHasKey( 'ttl', $this->requests[0]->get_body_params()['data'] );
	}

	/**
	 * Primary type changes send a primary_type_set event.
	 *
	 * @covers ::handle_option_update
	 * @return void
	 */
	public function test_handle_option_update_tracks_primary_type() {
		EventService::handle_option_update(
			'nfd_data_site_classification_primary',
			array( 'value' => 'old' ),
			array( 'value' => 'blog' )
		);

		$this->assertCount( 1, $this->requests );
		$params = $this->requests[0]->get_body_params();
		$this->assertSame( 'primary_type_set', $params['action'] );
		$this->assertSame( 'blog', $params['data']['primary_type'] );
		$this->assertSame( 'database_saved', $params['data']['source'] );
	}

	/**
	 * Secondary type changes send a secondary_type_set event.
	 *
	 * @covers ::handle_option_update
	 * @return void
	 */
	public function test_handle_option_update_tracks_secondary_type() {
		EventService::handle_option_update(
			'nfd_data_site_classification_secondary',
			array( 'value' => 'old' ),
			array( 'value' => 'portfolio' )
		);

		$params = $this->requests[0]->get_body_params();
		$this->assertSame( 'secondary_type_set', $params['action'] );
		$this->assertSame( 'portfolio', $params['data']['secondary_type'] );
	}

	/**
	 * The added_option hook passes only name and value.
	 *
	 * @covers ::handle_option_update
	 * @return void
	 */
	public function test_handle_option_update_supports_added_option_signature() {
		EventService::handle_option_update(
			'nfd_data_site_classification_primary',
			array( 'value' => 'store' )
		);

		$this->assertCount( 1, $this->requests );
		$this->assertSame( 'store', $this->requests[0]->get_body_params()['data']['primary_type'] );
	}

	/**
	 * Unchanged, non-array, value-less and unrelated updates send nothing.
	 *
	 * @covers ::handle_option_update
	 * @return void
	 */
	public function test_handle_option_update_ignores_irrelevant_updates() {
		$same = array( 'value' => 'blog' );
		EventService::handle_option_update( 'nfd_data_site_classification_primary', $same, $same );
		EventService::handle_option_update( 'nfd_data_site_classification_primary', 'a', 'b' );
		EventService::handle_option_update( 'nfd_data_site_classification_primary', array(), array( 'other' => 'x' ) );
		EventService::handle_option_update( 'some_other_option', array( 'value' => 'a' ), array( 'value' => 'b' ) );

		$this->assertCount( 0, $this->requests );
	}
}
