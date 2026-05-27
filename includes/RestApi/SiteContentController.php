<?php
/**
 * Site Content Controller.
 *
 * @package NewfoldLabs\WP\Module\Onboarding\RestApi
 */

namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Services\SiteNavigationService;
use NewfoldLabs\WP\Module\Onboarding\Services\SiteTypes\EcommerceSiteTypeService;

/**
 * Handles REST API routes for publishing AI-generated site content.
 */
class SiteContentController {

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
	protected $rest_base = '/site-content';

	/**
	 * Registers rest routes for SiteContentController class.
	 *
	 * @return void
	 */
	public function register_routes(): void {
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/publish-products',
			array(
				array(
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'publish_products' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/setup-nav-menu',
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'setup_nav_menu' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
					'args'                => $this->get_setup_nav_menu_args(),
				),
			)
		);
	}

	/**
	 * Create WooCommerce products from the onboarding generation data.
	 *
	 * Expects a JSON body: { "products": [ { name, short_description, price, categories, featured_image }, ... ] }
	 * Images are stored as nfd_image_url meta and sideloaded asynchronously after onboarding.
	 *
	 * @param \WP_REST_Request $request The REST request object.
	 * @return \WP_REST_Response
	 */
	public function publish_products( \WP_REST_Request $request ): \WP_REST_Response {
		$products = $request->get_json_params()['products'] ?? array();

		if ( empty( $products ) ) {
			return new \WP_REST_Response( array( 'created' => 0 ), 200 );
		}

		$wc_response = EcommerceSiteTypeService::ensure_woocommerce_active();
		if ( null !== $wc_response ) {
			return $wc_response;
		}

		$created_ids = EcommerceSiteTypeService::publish_products( $products );

		return new \WP_REST_Response( array( 'created' => count( $created_ids ) ), 200 );
	}

	/**
	 * Setup the navigation menu from publish pages, including WooCommerce Shop for ecommerce sites.
	 *
	 * @param \WP_REST_Request $request The REST request object.
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function setup_nav_menu( \WP_REST_Request $request ) {
		$site_type = $request->get_param( 'site_type' ) ?? '';
		$pages     = $request->get_param( 'pages' ) ?? array();

		if ( empty( $pages ) ) {
			return new \WP_REST_Response( array( 'error' => 'No pages provided.' ), 400 );
		}

		if ( 'ecommerce' === strtolower( $site_type ) ) {
			$wc_response = EcommerceSiteTypeService::ensure_woocommerce_active();
			if ( null !== $wc_response ) {
				return $wc_response;
			}
		}

		$navigation_service = new SiteNavigationService();
		$result             = $navigation_service->setup_site_nav_menu( $site_type, $pages );

		if ( ! $result ) {
			return new \WP_Error(
				'nfd_onboarding_error',
				__( 'Error at Setting up the nav menu.', 'wp-module-onboarding' ),
				array( 'status' => 500 )
			);
		}

		return new \WP_REST_Response( array( 'success' => $result ), 200 );
	}

	/**
	 * Gets the arguments for the 'setup-nav-menu' endpoint.
	 *
	 * @return array The array of arguments.
	 */
	public function get_setup_nav_menu_args() {
		return array(
			'site_type' => array(
				'required' => false,
				'type'     => 'string',
			),
			'pages'     => array(
				'required' => true,
				'type'     => 'array',
			),
		);
	}


}
