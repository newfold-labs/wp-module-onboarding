<?php
namespace NewfoldLabs\WP\Module\Onboarding\RestApi\Themes;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Data\Themes;
use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\Services\ThemeInstaller;
use NewfoldLabs\WP\Module\Onboarding\TaskManagers\ThemeInstallTaskManager;
use NewfoldLabs\WP\Module\Onboarding\Tasks\ThemeInstallTask;

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
	  * Queue in the initial list of themes to be installed.
	  *
	  * @return \WP_REST_Response
	  */
	public static function initialize() {
		  // Checks if the init_list of themes have already been queued.
		if ( \get_option( Options::get_option_name( 'theme_init_status' ), 'init' ) !== 'init' ) {
			return new \WP_REST_Response(
				array(),
				202
			);
		}

		  // Set option to installing to prevent re-queueing the init_list again on page load.
		 \update_option( Options::get_option_name( 'theme_init_status' ), 'installing' );

		  // Get the initial list of themes to be installed based on the plan.
		 $init_themes = Themes::get_init();
		foreach ( $init_themes as $init_theme ) {
			   // Checks if a theme with the given slug and activation criteria already exists.
			if ( ! ThemeInstaller::exists( $init_theme['slug'], $init_theme['activate'] ) ) {
					// Add a new ThemeInstallTask to the theme install queue.
				ThemeInstallTaskManager::add_to_queue(
					new ThemeInstallTask(
						$init_theme['slug'],
						$init_theme['activate'],
						$init_theme['priority']
					)
				);
			}
		}

		return new \WP_REST_Response(
			array(),
			202
		);
	}

	 /**
	  * Install the requested theme via a slug (theme).
	  *
	  * @param \WP_REST_Request $request
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
}
