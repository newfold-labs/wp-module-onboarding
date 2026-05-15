<?php
namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Services\ReduxStateService;
use NewfoldLabs\WP\Module\Onboarding\Services\Ai\SiteGenServiceRequest;
use NewfoldLabs\WP\Module\Onboarding\Data\Options;

/**
 * Class SiteGenAiController
 */
class SiteGenAiController {

	/**
	 * Full REST path for handshake (for WP_REST_Request / rest_do_request).
	 * Must match namespace + rest_base + '/handshake' below.
	 *
	 * @var string
	 */
	public const REST_ROUTE_HANDSHAKE = '/newfold-onboarding/v1/sitegen/handshake';

	/**
	 * The namespace of this controller's route.
	 *
	 * @var string
	 */
	protected $namespace = 'newfold-onboarding/v1';

	/**
	 * The base of this controller's route.
	 *
	 * @var string
	 */
	protected $rest_base = '/sitegen';

	/**
	 * Registers rest routes for SiteGenAiController class.
	 *
	 * @return void
	 */
	public function register_routes() {

		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/handshake',
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'handshake' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);

		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/report-published',
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'report_published' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);
	}

	/**
	 * Handshake with the AI platform.
	 *
	 * @return \WP_REST_Response
	 */
	public function handshake(): \WP_REST_Response {
		$request = new SiteGenServiceRequest(
			'sitegen/handshake',
			array( 'domain' => \home_url() )
		);

		$response = $request->send();

		if ( ! $response || empty( $response['site_id'] ) ) {
			return new \WP_REST_Response( array( 'error' => 'Handshake failed' ), 502 );
		}

		return new \WP_REST_Response( $response, 200 );
	}

	/**
	 * Report the published site.
	 *
	 * @return \WP_REST_Response
	 */
	public function report_published(): \WP_REST_Response {
		$sitegen_id = get_option( Options::get_option_name( 'sitegen_current_id' ), '' );
		if ( ! $sitegen_id ) {
			return new \WP_REST_Response( array( 'status' => 'no_site_id' ), 200 );
		}

		$ai_request = new SiteGenServiceRequest( 'sitegen/select', array( 'sitegen_id' => $sitegen_id ) );
		$ai_request->send_async();

		return new \WP_REST_Response( array( 'status' => 'reported' ), 200 );
	}
}
