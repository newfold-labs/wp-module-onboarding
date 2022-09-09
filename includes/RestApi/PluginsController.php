<?php
namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Data\Plugins;
use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\Services\PluginInstaller;
use NewfoldLabs\WP\Module\Onboarding\Tasks\PluginInstallTask;
use NewfoldLabs\WP\Module\Onboarding\TaskManagers\PluginInstallTaskManager;

/**
 * Class PluginsController
 */
class PluginsController {

	/**
	 * @var string
	 */
	 protected $namespace = 'newfold-onboarding/v1';

	/**
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
			$this->rest_base . '/approved',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_approved_plugins' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);

		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/initialize',
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'initialize' ),
					'permission_callback' => array( $this, 'check_install_permissions' ),
				),
			)
		);

		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/install',
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'install' ),
					'args'                => $this->get_install_plugin_args(),
					'permission_callback' => array( $this, 'check_install_permissions' ),
				),
			)
		);
	}

	/**
	 * Get approved plugin slugs, urls and domains.
	 *
	 * @return \WP_REST_Response
	 */
	public function get_approved_plugins() {

		return new \WP_REST_Response(
			Plugins::get_approved(),
			200
		);
	}

	/**
	 * Get args for the install route.
	 *
	 * @return array
	 */
	public function get_install_plugin_args() {
		return array(
			'plugin'   => array(
				'type'     => 'string',
				'required' => true,
			),
			'activate' => array(
				'type'    => 'boolean',
				'default' => false,
			),
			'queue'    => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'priority' => array(
				'type'    => 'integer',
				'default' => 0,
			),
		);
	}

	/**
	 * Verify caller has permissions to install plugins.
	 *
	 * @param \WP_REST_Request $request
	 *
	 * @return boolean
	 */
	public function check_install_permissions( \WP_REST_Request $request ) {
		$install_hash = $request->get_header( 'X-NFD-ONBOARDING' );
		return Permissions::rest_verify_plugin_install_hash( $install_hash )
			&& Permissions::rest_is_authorized_admin();
	}

	/**
	 * Queue in the initial list of plugins to be installed.
	 *
	 * @return \WP_REST_Response
	 */
	public function initialize() {

		if ( PluginInstallTaskManager::queue_initial_installs() ) {
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
	 * Install the requested plugin via a zip url (or) slug.
	 *
	 * @param \WP_REST_Request $request
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function install( \WP_REST_Request $request ) {
		$plugin   = $request->get_param( 'plugin' );
		$activate = $request->get_param( 'activate' );
		$queue    = $request->get_param( 'queue' );
		$priority = $request->get_param( 'priority' );

		// Checks if a plugin with the given slug and activation criteria already exists.
		if ( PluginInstaller::exists( $plugin, $activate ) ) {
			return new \WP_REST_Response(
				array(),
				200
			);
		}

		// Queue the plugin install if specified in the request.
		if ( $queue ) {
			// Add a new PluginInstallTask to the Plugin install queue.
			PluginInstallTaskManager::add_to_queue(
				new PluginInstallTask(
					$plugin,
					$activate,
					$priority
				)
			);

			return new \WP_REST_Response(
				array(),
				202
			);
		}

		// Execute the task if it need not be queued.
		$plugin_install_task = new PluginInstallTask( $plugin, $activate );

		return $plugin_install_task->execute();
	}
}
