<?php
namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\Services\FlowService;
use NewfoldLabs\WP\Module\Data\SiteClassification\PrimaryType;
use NewfoldLabs\WP\Module\Data\SiteClassification\SecondaryType;


/**
 * Class FlowController
 */
class FlowController {

	/**
	 * This is the REST API namespace that will be used for our custom API
	 *
	 * @var string
	 */
	protected $namespace = 'newfold-onboarding/v1';

	/**
	 * This is the REST endpoint
	 *
	 * @var string
	 */
	protected $rest_base = '/flow';

	/**
	 * Registers rest routes for this controller class.
	 *
	 * @return void
	 */
	public function register_routes() {
		\register_rest_route(
			$this->namespace,
			$this->rest_base,
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_onboarding_flow_data' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
				array(
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'save_onboarding_flow_data' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/complete',
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'complete' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);
	}

	/**
	 * Fetch onboarding flow details from database.
	 *
	 * @return \WP_REST_Response
	 */
	public function get_onboarding_flow_data() {
		$result = FlowService::read_flow_data_from_wp_option();
		if ( ! $result ) {
			$result = FlowService::get_default_flow_data();
			\update_option( Options::get_option_name( 'flow' ), $result );      }

		return new \WP_REST_Response(
			$result,
			200
		);
	}

	/**
	 * Save / Update onboarding flow details to database.
	 *
	 * @param \WP_REST_Request $request Request model.
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function save_onboarding_flow_data( \WP_REST_Request $request ) {
		$params = json_decode( $request->get_body(), true );

		if ( is_null( $params ) ) {
			return new \WP_Error(
				'no_post_data',
				'No Data Provided',
				array( 'status' => 404 )
			);
		}

		$default_flow_data = FlowService::get_default_flow_data();
		$mismatch_key      = FlowService::find_mismatch_key( $params, $default_flow_data );
		if ( is_wp_error( $mismatch_key ) ) {
			return $mismatch_key;
		}

		$flow_data = FlowService::get_updated_flow_data( $params );
		if ( is_wp_error( $flow_data ) ) {
			return $flow_data;
		}

		/*
		[TODO] Handle this and some of the site name, logo, description logic in a cleaner way.
		At least the primary and secondary update does not run on every flow data request.
		*/
		if ( ! empty( $params['data']['siteType']['primary']['refers'] ) &&
		( empty( $flow_data['data']['siteType']['primary']['value'] ) || $flow_data['data']['siteType']['primary']['value'] !== $params['data']['siteType']['primary']['value'] ) ) {
			if ( class_exists( 'NewfoldLabs\WP\Module\Data\SiteClassification\PrimaryType' ) ) {
				$primary_type = new PrimaryType( $params['data']['siteType']['primary']['refers'], $params['data']['siteType']['primary']['value'] );
				if ( ! $primary_type->save() ) {
					return new \WP_Error(
						'wrong_param_provided',
						__( 'Wrong Parameter Provided : primary => value', 'wp-module-onboarding' ),
						array( 'status' => 404 )
					);
				}
			}
		}

		if ( ! empty( $params['data']['siteType']['secondary']['refers'] ) &&
		( empty( $flow_data['data']['siteType']['secondary']['value'] ) || $flow_data['data']['siteType']['secondary']['value'] !== $params['data']['siteType']['secondary']['value'] ) ) {
			if ( class_exists( 'NewfoldLabs\WP\Module\Data\SiteClassification\SecondaryType' ) ) {
				$secondary_type = new SecondaryType( $params['data']['siteType']['secondary']['refers'], $params['data']['siteType']['secondary']['value'] );
				if ( ! $secondary_type->save() ) {
					return new \WP_Error(
						'wrong_param_provided',
						__( 'Wrong Parameter Provided : secondary => value', 'wp-module-onboarding' ),
						array( 'status' => 404 )
					);
				}
			}
		}

		// update timestamp once data is updated
		$flow_data['updatedAt'] = time();

		// Update Blog Information from Basic Info
		if ( ( ! empty( $flow_data['data']['blogName'] ) ) ) {
			\update_option( Options::get_option_name( 'blog_name', false ), $flow_data['data']['blogName'] );
		}

		if ( ( ! empty( $flow_data['data']['blogDescription'] ) ) ) {
			\update_option( Options::get_option_name( 'blog_description', false ), $flow_data['data']['blogDescription'] );
		}

		if ( ( ! empty( $flow_data['data']['siteLogo'] ) ) && ! empty( $flow_data['data']['siteLogo']['id'] ) ) {
				\update_option( Options::get_option_name( 'site_icon', false ), $flow_data['data']['siteLogo']['id'] );
				\update_option( Options::get_option_name( 'site_logo', false ), $flow_data['data']['siteLogo']['id'] );
		} else {
			\update_option( Options::get_option_name( 'site_icon', false ), 0 );
			\delete_option( Options::get_option_name( 'site_logo', false ) );
		}

		// save data to database
		if ( ! \update_option( Options::get_option_name( 'flow' ), $flow_data ) ) {
			return new \WP_Error(
				'database_update_failed',
				'There was an error saving the data',
				array( 'status' => 404 )
			);
		}

		return new \WP_REST_Response(
			$flow_data,
			200
		);
	}

	/**
	 * Request and Complete Site Pages and Child Theme Generation.
	 *
	 * @return \WP_REST_Response
	 */
	public function complete() {
		$site_pages_publish_request  = new \WP_REST_Request(
			'POST',
			'/newfold-onboarding/v1/site-pages/publish'
		);
		$site_pages_publish_response = \rest_do_request( $site_pages_publish_request );
		if ( $site_pages_publish_response->is_error() ) {
			return $site_pages_publish_response->as_error();
		}
		$child_theme_generation_request  = new \WP_REST_Request(
			'POST',
			'/newfold-onboarding/v1/themes/child/generate'
		);
		$child_theme_generation_response = \rest_do_request( $child_theme_generation_request );
		if ( $child_theme_generation_response->is_error() ) {
			return $child_theme_generation_response->as_error();
		}

		return new \WP_REST_Response(
			array(),
			201
		);
	}
}
