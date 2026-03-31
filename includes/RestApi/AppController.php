<?php

namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Services\AppService;
use NewfoldLabs\WP\Module\Onboarding\Services\SiteTypes\EcommerceSiteTypeService;
use NewfoldLabs\WP\Module\Installer\Data\Plugins;

/**
 * AppController class for handling onboarding application REST API endpoints.
 *
 * This controller manages the REST API routes and handlers for the onboarding
 * application functionality. It provides endpoints for starting and completing
 * the onboarding process.
 */
class AppController {

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
	protected $rest_base = '/app';

	/**
	 * Register the REST API routes for the onboarding application.
	 *
	 * Registers two main endpoints:
	 * - /app/start: Initiates the onboarding process
	 * - /app/complete: Completes the onboarding process with selected homepage
	 */
	public function register_routes() {
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/start',
			array(
				array(
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'start' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);

		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/complete',
			array(
				array(
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'complete' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);

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
			$this->rest_base . '/enable-jetpack-modules',
			array(
				array(
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'enable_jetpack_modules' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);
	}

	/**
	 * Start onboarding backend process.
	 *
	 * @return \WP_REST_Response The response object.
	 */
	public function start(): \WP_REST_Response {
		AppService::start();
		return new \WP_REST_Response( array(), 202 );
	}

	/**
	 * Complete onboarding backend process.
	 *
	 * @return \WP_REST_Response The response object.
	 */
	public function complete(): \WP_REST_Response {
		try {
			AppService::complete();
			return new \WP_REST_Response( array(), 200 );
		} catch ( \Exception $e ) {
			return new \WP_REST_Response(
				array( 'error' => 'Encountered an error while completing the app service.' ),
				500
			);
		}
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


	/**
	 * Enable Jetpack Forms and Blocks modules.
	 * Must be called before creating pages that contain Jetpack blocks.
	 *
	 * @return \WP_REST_Response The response object.
	 */
	public function enable_jetpack_modules(): \WP_REST_Response {
		if ( ! class_exists( Plugins::class ) ) {
			return new \WP_REST_Response( array( 'error' => 'Installer module not available.' ), 500 );
		}

		$forms  = Plugins::toggle_jetpack_module( 'contact-form', true );
		$blocks = Plugins::toggle_jetpack_module( 'blocks', true );

		return new \WP_REST_Response(
			array(
				'contact-form' => $forms,
				'blocks'       => $blocks,
			),
			200
		);
	}
}
