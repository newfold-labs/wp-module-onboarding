<?php
namespace NewfoldLabs\WP\Module\Onboarding\TaskManagers;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;

/**
 * class TaskManager
 */
final class TaskManager {

	/**
	 * List of Task Managers.
	 *
	 * @var array
	 */
	 protected $task_managers = array(
		 'NewfoldLabs\\WP\Module\\Onboarding\\TaskManagers\\PluginInstallTaskManager',
		 'NewfoldLabs\\WP\Module\\Onboarding\\TaskManagers\\PluginUninstallTaskManager',
		 'NewfoldLabs\\WP\Module\\Onboarding\\TaskManagers\\ThemeInstallTaskManager',
	 );

	 /**
	  * TaskManager constructor.
	  */
	 function __construct() {
		 foreach ( $this->task_managers as $task_manager ) {
			 if ( ! empty( get_option( Options::get_option_name( $task_manager::get_queue_name() ), array() ) ) ) {
				  new $task_manager();
			 }
		 }
	 }
}
