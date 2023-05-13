<?php
namespace NewfoldLabs\WP\Module\Onboarding\Tasks;

use NewfoldLabs\WP\Module\Onboarding\Services\ThemeInstaller;

/**
 * Task for installing a Theme.
 */
class ThemeInstallTask extends Task {

	/**
	 * Theme Slug.
	 *
	 * @var string
	 */
	 private $slug;

	/**
	 * Theme Activation Status.
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
	  * ThemeInstallTask constructor
	  *
	  * @param string  $slug The slug for the Theme. Ref: includes/Data/Themes.php for the slugs.
	  * @param boolean $activate A value of true activates the theme.
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
	 * Retrieves Slug for the Theme.
	 *
	 * @return string
	 */
	public function get_slug() {
		return $this->slug;
	}

	/**
	 * Retrieves Theme Activation Status.
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
