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
			$this->rest_base . '/options',
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'save_sitegen_options' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
					'args'                => array(
						'options' => array(
							'type'     => 'object',
							'required' => true,
						),
					),
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
	 * Save the options.
	 *
	 * @param \WP_REST_Request $request The REST request object.
	 *
	 * @return \WP_REST_Response
	 */
	public function save_sitegen_options( \WP_REST_Request $request ): \WP_REST_Response {
		$options = $request->get_param( 'options' );
		foreach ( $options as $key => $value ) {
			$option_name = Options::get_option_name( $key );

			if ( false !== $option_name ) {
				\update_option( $option_name, $value );
			}
		}
		return new \WP_REST_Response( array( 'status' => 'ok' ), 200 );
	}

	/**
	 * Report the published site.
	 *
	 * @return \WP_REST_Response
	 */
	public function report_published(): \WP_REST_Response {
		$sitegen_id = \get_option( Options::get_option_name( 'sitegen_id' ) );

		if ( ! $sitegen_id ) {
			return new \WP_REST_Response( array( 'status' => 'no_site_id' ), 200 );
		}

		$ai_request = new SiteGenServiceRequest( 'sitegen/select', array( 'sitegen_id' => $sitegen_id ) );

		$ai_request->send_async();

		return new \WP_REST_Response( array( 'status' => 'reported' ), 200 );
	}
}
