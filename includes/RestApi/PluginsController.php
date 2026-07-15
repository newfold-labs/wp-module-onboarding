<?php
namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Installer\Services\PluginInstaller;
use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Services\PluginService;
use NewfoldLabs\WP\Module\Onboarding\Services\SiteTypes\EcommerceSiteTypeService;

/**
 * Class PluginsController
 */
class PluginsController {
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
	protected $rest_base = '/plugins';

	/**
	 * Registers rest routes for PluginsController class.
	 *
	 * @return void
	 */
	public function register_routes() {

		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/initialize',
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'initialize' ),
					'permission_callback' => array( PluginInstaller::class, 'check_install_permissions' ),
				),
			)
		);

		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/initialize-ecommerce',
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'initialize_ecommerce' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);

		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/ensure-critical',
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'ensure_critical' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);
	}

	/**
	 * Queue in the initial list of plugins to be installed.
	 *
	 * @return \WP_REST_Response
	 */
	public function initialize() {

		if ( PluginService::initialize() ) {
			return new \WP_REST_Response(
				array(),
				202
			);
		}

		return new \WP_REST_Response(
			array(),
			500
		);
	}

	/**
	 * Ensure WooCommerce, YITH Wishlist, and remaining ecommerce plugins are installed and active.
	 *
	 * Thin wrapper around EcommerceSiteTypeService::ensure_woocommerce_active(), which:
	 *  - returns null when Woo and Wishlist are already active (mapped here to a 200 'ready' response);
	 *  - installs/activates Woo then Wishlist synchronously when missing;
	 *  - queues the rest of the ecommerce stack (shipping, payments, brand-specific) for background install;
	 *  - returns a 202/500 response when something is still pending or failed.
	 *
	 * @return \WP_REST_Response
	 */
	public function initialize_ecommerce(): \WP_REST_Response {
		$response = EcommerceSiteTypeService::ensure_woocommerce_active();
		if ( null !== $response ) {
			return $response;
		}
		return new \WP_REST_Response( array( 'status' => 'ready' ), 200 );
	}

	/**
	 * Synchronous install/activate of critical plugins (Jetpack, Icon Block).
	 * Called by the frontend at the start of content generation as a safety net in case
	 * the background install queue has not yet processed them.
	 *
	 * @return \WP_REST_Response 200 when ready, 202 with pending list otherwise.
	 */
	public function ensure_critical(): \WP_REST_Response {
		$response = PluginService::ensure_critical_plugins_active();
		if ( null !== $response ) {
			return $response;
		}
		return new \WP_REST_Response( array( 'status' => 'ready' ), 200 );
	}
}
