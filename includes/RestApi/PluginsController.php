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
	 * Ensure WooCommerce and ecommerce plugins are installed and active.
	 *
	 * If WooCommerce is already active, returns immediately.
	 * If installed but inactive, activates it synchronously.
	 * If not installed, queues a background install+activation task.
	 *
	 * @return \WP_REST_Response
	 */
	public function initialize_ecommerce(): \WP_REST_Response {

		if ( class_exists( 'WooCommerce' ) ) {
			return new \WP_REST_Response( array( 'status' => 'active' ), 200 );
		}

		$plugin_file = 'woocommerce/woocommerce.php';

		if ( file_exists( \WP_PLUGIN_DIR . '/' . $plugin_file ) ) {
			$result = \activate_plugin( $plugin_file );
			if ( \is_wp_error( $result ) ) {
				return new \WP_REST_Response( array( 'status' => 'error', 'message' => $result->get_error_message() ), 500 );
			}
			return new \WP_REST_Response( array( 'status' => 'activated' ), 200 );
		}

		EcommerceSiteTypeService::install_ecommerce_plugins();
		return new \WP_REST_Response( array( 'status' => 'installing' ), 202 );
	}
}
