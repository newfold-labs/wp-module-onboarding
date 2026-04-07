<?php
/**
 * Site Content Controller.
 *
 * @package NewfoldLabs\WP\Module\Onboarding\RestApi
 */

namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
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

		// Ensure WooCommerce is active before creating products.
		if ( ! class_exists( 'WooCommerce' ) ) {
			$plugin_file = 'woocommerce/woocommerce.php';

			if ( file_exists( WP_PLUGIN_DIR . '/' . $plugin_file ) ) {
				// Installed but inactive — activate synchronously.
				$result = activate_plugin( $plugin_file );
				if ( is_wp_error( $result ) ) {
					return new \WP_REST_Response( array( 'error' => 'WooCommerce could not be activated.' ), 500 );
				}
			} else {
				// Not installed — trigger background install+activation queue.
				EcommerceSiteTypeService::install_ecommerce_plugins();
				return new \WP_REST_Response( array( 'status' => 'installing' ), 202 );
			}
		}

		$created_ids = EcommerceSiteTypeService::publish_products( $products );

		return new \WP_REST_Response( array( 'created' => count( $created_ids ) ), 200 );
	}
}
