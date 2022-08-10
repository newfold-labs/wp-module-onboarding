<?php
namespace NewfoldLabs\WP\Module\Onboarding\Tasks;

use NewfoldLabs\WP\Module\Onboarding\Services\ThemeInstaller;

class ThemeInstallTask extends Task {
	 private $slug, $activate, $priority, $retries;

	function __construct( $slug, $activate, $priority = 0, $retries = 0 ) {
		$this->slug    = $slug;
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

	public function execute() {
		return ThemeInstaller::install(
			$this->get_slug(),
			$this->get_activate()
		);
	}

	public function to_array() {
		return array(
			'slug'     => $this->slug,
			'activate' => $this->activate,
			'priority' => $this->priority,
			'retries'  => $this->retries,
		);
	}

}
