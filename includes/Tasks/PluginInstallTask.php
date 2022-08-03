<?php
namespace NewfoldLabs\WP\Module\Onboarding\Tasks;

use NewfoldLabs\WP\Module\Onboarding\Services\PluginInstaller;

/**
 * Task for installing a Plugin.
 */
class PluginInstallTask extends Task {

	private $slug, $activate, $priority, $retries;

	/**
	 * @param string  $slug The slug for the Plugin. Ref: includes/Data/Plugins.php for the slugs.
	 * @param boolean $activate A value of true activates the plugin.
	 * @param int     $priority Priority of the task, higher the number higher the priority.
	 * @param int     $retries The number of times the Task has been retried
	 */
	function __construct( $slug, $activate, $priority = 0, $retries = 0 ) {
		$this->slug     = $slug;
		$this->activate = $activate;
		$this->priority = $priority;
		$this->retries  = $retries;
	}

	public function get_slug() {
		return $this->slug;
	}

	public function get_activate() {
		return $this->activate;
	}

	public function get_priority() {
		return $this->priority;
	}

	public function get_retries() {
		 return $this->retries;
	}

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
