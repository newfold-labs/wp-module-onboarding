<?php
namespace NewfoldLabs\WP\Module\Onboarding\Tasks;

abstract class Task {

	abstract public function execute();
	abstract public function to_array();
}
