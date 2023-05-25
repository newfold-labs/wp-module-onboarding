<?php
namespace NewfoldLabs\WP\Module\Onboarding\Tasks;

use NewfoldLabs\WP\Module\Onboarding\Services\PluginInstaller;

/**
 * Task for installing a Plugin.
 */
class PluginInstallTask extends Task {

	/**
	 * Plugin Slug.
	 *
	 * @var string
	 */
	private $slug;

	/**
	 * Plugin Activation Status.
	 *
	 * @var boolean
	 */
	private $activate;

	/**
	 * Task Priority.
	 *
	 * @var int
	 */
	private $priority;

	/**
	 * Task Installation Retries Count.
	 *
	 * @var int
	 */
	private $retries;

	/**
	 * PluginInstallTask constructor
	 *
	 * @param string  $slug The slug for the Plugin. Ref: includes/Data/Plugins.php for the slugs.
	 * @param boolean $activate A value of true activates the plugin.
	 * @param int     $priority Priority of the task, higher the number higher the priority.
	 * @param int     $retries The number of times the Task has been retried
	 */
	public function __construct( $slug, $activate, $priority = 0, $retries = 0 ) {
		$this->slug     = $slug;
		$this->activate = $activate;
		$this->priority = $priority;
		$this->retries  = $retries;
	}

	/**
	 * Retrieves Slug for the Plugin.
	 *
	 * @return string
	 */
	public function get_slug() {
		return $this->slug;
	}

	/**
	 * Retrieves Plugin Activation Status.
	 *
	 * @return boolean
	 */
	public function get_activate() {
		return $this->activate;
	}

	/**
	 * Retrieves Task Priority.
	 *
	 * @return int
	 */
	public function get_priority() {
		return $this->priority;
	}

	/**
	 * Retrieves Task Installation retry count.
	 *
	 * @return string
	 */
	public function get_retries() {
		 return $this->retries;
	}

	/**
	 * Increments retry count.
	 *
	 * @return void
	 */
	public function increment_retries() {
		$this->retries++;
	}

	/**
	 * Installs the Plugin using the PluginInstaller Service.
	 *
	 * @return \WP_REST_Response|WP_Error
	 */
	public function execute() {
		return PluginInstaller::install( $this->get_slug(), $this->get_activate() );
	}

	/**
	 * Convert the PluginInstallTask into an associative array.
	 *
	 * @return array
	 */
	public function to_array() {
		return array(
			'slug'     => $this->slug,
			'activate' => $this->activate,
			'priority' => $this->priority,
			'retries'  => $this->retries,
		);
	}
}
