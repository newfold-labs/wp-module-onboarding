<?php
namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\Services\Ai\SiteGenServiceRequest;

/**
 * Class SiteGenAiController
 */
class SiteGenAiController {
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
			$this->rest_base . '/ai-site-id',
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'save_ai_site_id' ),
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
	 * Save the AI site ID.
	 *
	 * @param \WP_REST_Request $request The REST request object.
	 * @return \WP_REST_Response
	 */
	public function save_ai_site_id( \WP_REST_Request $request ): \WP_REST_Response {
		$site_id = $request->get_param( 'site_id' );
		\update_option( Options::get_option_name( 'ai_sitegen_site_id' ), $site_id );
		return new \WP_REST_Response( array( 'status' => 'ok' ), 200 );
	}

	/**
	 * Report the published site.
	 *
	 * @return \WP_REST_Response
	 */
	public function report_published(): \WP_REST_Response {
		$site_id = \get_option( Options::get_option_name( 'ai_sitegen_site_id' ) );

		if ( ! $site_id ) {
			return new \WP_REST_Response( array( 'status' => 'no_site_id' ), 200 );
		}

		$ai_request = new SiteGenServiceRequest( 'sitegen/select', array( 'site_id' => $site_id ) );
		$ai_request->send_async();

		return new \WP_REST_Response( array( 'status' => 'reported' ), 200 );
	}
}
