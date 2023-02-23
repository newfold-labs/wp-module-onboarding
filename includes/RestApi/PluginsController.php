<?php
namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Data\Plugins;
use NewfoldLabs\WP\Module\Onboarding\Data\SiteFeatures;
use NewfoldLabs\WP\Module\Onboarding\Services\PluginInstaller;
use NewfoldLabs\WP\Module\Onboarding\Tasks\PluginInstallTask;
use NewfoldLabs\WP\Module\Onboarding\TaskManagers\PluginInstallTaskManager;
use NewfoldLabs\WP\Module\Onboarding\Tasks\PluginUninstallTask;
use NewfoldLabs\WP\Module\Onboarding\TaskManagers\PluginUninstallTaskManager;

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

		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/status',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_status' ),
					'args'                => $this->get_status_args(),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);

		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/site-features',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_site_features' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'set_site_features' ),
					'args'                => $this->set_site_features_args(),
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
	 * Get the plugin status check arguments.
	 *
	 * @return array
	 */
	public function get_status_args() {
		return array(
			'plugin'    => array(
				'type'     => 'string',
				'required' => true,
			),
			'activated' => array(
				'type'    => 'boolean',
				'default' => true,
			),
		);
	}

	/**
	 * Get the set site features arguments.
	 *
	 * @return array
	 */
	public function set_site_features_args() {
		return array(
			'plugins' => array(
				'type'     => 'object',
				'required' => true,
			),
		);
	}

	/**
	 * Verify caller has permissions to install plugins.
	 *
	 * @param \WP_REST_Request $request the incoming request object.
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
	 * @param \WP_REST_Request $request the incoming request object.
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

	/**
	 * Returns the status of a given plugin slug.
	 *
	 * @param \WP_REST_Request $request the incoming request object.
	 * @return \WP_REST_Response
	 */
	public function get_status( \WP_REST_Request $request ) {
		$plugin    = $request->get_param( 'plugin' );
		$activated = $request->get_param( 'activated' );

		if ( PluginInstaller::exists( $plugin, $activated ) ) {
			return new \WP_REST_Response(
				array(
					'status' => $activated ? 'activated' : 'installed',
				),
				200
			);
		}

		$position_in_queue = PluginInstallTaskManager::status( $plugin );

		if ( false !== $position_in_queue ) {
			return new \WP_REST_Response(
				array(
					'status'   => 'installing',
					'estimate' => ( ( $position_in_queue + 1 ) * 30 ),
				),
				200
			);
		}

		$in_progress_plugin = \get_option( Options::get_option_name( 'plugins_init_status' ), '' );
		if ( $in_progress_plugin === $plugin ) {
			return new \WP_REST_Response(
				array(
					'status'   => 'installing',
					'estimate' => 30,
				),
				200
			);
		}

		return new \WP_REST_Response(
			array(
				'status' => 'inactive',
			),
			200
		);

	}

	/**
	 * Retrieves all the site features.
	 *
	 * @return array|\WP_Error
	 */
	public function get_site_features() {
		 return SiteFeatures::get_with_selections();
	}

	/**
	 * Installs/Uninstalls the requested plugins.
	 *
	 * @param \WP_REST_Request $request the incoming request object.
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function set_site_features( \WP_REST_Request $request ) {

		  $plugin_body = json_decode( $request->get_body(), true );
		  $plugins     = isset( $plugin_body['plugins'] ) ? $plugin_body['plugins'] : false;

		if ( ! $plugins ) {
			return new \WP_Error(
				'plugin_list_not_provided',
				'Plugins List Not Provided',
				array( 'status' => 404 )
			);
		}

		foreach ( $plugins as $plugin => $decision ) {
			if ( $decision ) {
				// If the Plugin exists and is activated
				if ( PluginInstaller::exists( $plugin, $decision ) ) {
					continue;
				}

				PluginInstallTaskManager::add_to_queue(
					new PluginInstallTask(
						$plugin,
						true
					)
				);
			} else {
				PluginUninstallTaskManager::add_to_queue(
					new PluginUninstallTask(
						$plugin
					)
				);
			}
		}

		return new \WP_REST_Response(
			array(),
			202
		);
	}
}

