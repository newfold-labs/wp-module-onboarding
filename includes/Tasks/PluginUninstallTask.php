<?php
namespace NewfoldLabs\WP\Module\Onboarding\Tasks;

use NewfoldLabs\WP\Module\Onboarding\Services\PluginUninstaller;

/**
 * Task for Uninstalling a Plugin.
 */
class PluginUninstallTask extends Task {

	private $slug, $priority, $retries;

	/**
	 * @param string $slug The slug for the Plugin. Ref: includes/Data/Plugins.php for the slugs.
	 * @param int    $priority Priority of the task, higher the number higher the priority.
	 * @param int    $retries The number of times the Task has been retried
	 */
	function __construct( $slug, $priority = 0, $retries = 0 ) {
		$this->slug     = $slug;
		$this->priority = $priority;
		$this->retries  = $retries;
	}

	public function get_slug() {
		return $this->slug;
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
	 * Uninstalls the Plugin using the PluginUninstaller Service.
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function execute() {
		return PluginUninstaller::uninstall( $this->get_slug() );
	}

	/**
	 * Convert the PluginUninstallTask into an associative array.
	 *
	 * @return array
	 */
	public function to_array() {
		return array(
			'slug'     => $this->slug,
			'priority' => $this->priority,
			'retries'  => $this->retries,
		);
	}

}
