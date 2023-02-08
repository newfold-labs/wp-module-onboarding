<?php
namespace NewfoldLabs\WP\Module\Onboarding\RestApi\Themes;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Services\ThemeInstaller;
use NewfoldLabs\WP\Module\Onboarding\TaskManagers\ThemeInstallTaskManager;
use NewfoldLabs\WP\Module\Onboarding\Tasks\ThemeInstallTask;
/**
 * Controller defining API's for theme install related functionalities.
 */
class ThemeInstallerController extends \WP_REST_Controller {
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
	protected $rest_base = '/themes';

	/**
	 * Register the controller routes.
	 */
	public function register_routes() {
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/initialize',
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'initialize' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
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
					'args'                => $this->get_install_theme_args(),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
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
	}

	 /**
	  * Get args for the install route.
	  *
	  * @return array
	  */
	public function get_install_theme_args() {
		 return array(
			 'theme'    => array(
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
	 * Get the theme status check arguments.
	 *
	 * @return array
	 */
	public function get_status_args() {
		return array(
			'theme'     => array(
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
	  * Queue in the initial list of themes to be installed.
	  *
	  * @return \WP_REST_Response
	  */
	public static function initialize() {
		if ( ThemeInstallTaskManager::queue_initial_installs() ) {
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
	  * Install the requested theme via a slug (theme).
	  *
	  * @param \WP_REST_Request $request The request object.
	  *
	  * @return \WP_REST_Response|\WP_Error
	  */
	public static function install( \WP_REST_Request $request ) {
		$theme    = $request->get_param( 'theme' );
		$activate = $request->get_param( 'activate' );
		$queue    = $request->get_param( 'queue' );
		$priority = $request->get_param( 'priority' );

		  // Checks if a theme with the given slug and activation criteria already exists.
		if ( ThemeInstaller::exists( $theme, $activate ) ) {
			return new \WP_REST_Response(
				array(),
				200
			);
		}

		  // Queue the theme install if specified in the request.
		if ( $queue ) {
			ThemeInstallTaskManager::add_to_queue(
				new ThemeInstallTask(
					$theme,
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
		 $theme_install_task = new ThemeInstallTask( $theme, $activate );

		 return $theme_install_task->execute();
	}

	/**
	 * Returns the status of a given theme slug.
	 *
	 * @param \WP_REST_Request $request The request object
	 *
	 * @return \WP_REST_Response
	 */
	public function get_status( \WP_REST_Request $request ) {
		$theme     = $request->get_param( 'theme' );
		$activated = $request->get_param( 'activated' );

		if ( ThemeInstaller::exists( $theme, $activated ) ) {
			return new \WP_REST_Response(
				array(
					'status' => $activated ? 'activated' : 'installed',
				),
				200
			);
		}

		$position_in_queue = ThemeInstallTaskManager::status( $theme );

		if ( false !== $position_in_queue ) {
			return new \WP_REST_Response(
				array(
					'status'   => 'installing',
					'estimate' => ( ( $position_in_queue + 1 ) * 10 ),
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
}
