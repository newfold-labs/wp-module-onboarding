<?php
namespace NewfoldLabs\WP\Module\Onboarding\Tasks;

use NewfoldLabs\WP\Module\Onboarding\Services\ThemeInstaller;

/**
 * Task for installing a Theme.
 */
class ThemeInstallTask extends Task {
	 private $slug, $activate, $priority, $retries;

	 /**
	  * @param string  $slug The slug for the Theme. Ref: includes/Data/Themes.php for the slugs.
	  * @param boolean $activate A value of true activates the theme.
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
	  * Installs the Theme using the ThemeInstaller Service.
	  *
	  * @return \WP_REST_Response|WP_Error
	  */
	public function execute() {
		return ThemeInstaller::install(
			$this->get_slug(),
			$this->get_activate()
		);
	}

	 /**
	  * Convert the ThemeInstallTask into an associative array.
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
