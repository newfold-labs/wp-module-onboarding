<?php
namespace NewfoldLabs\WP\Module\Onboarding\Data;

/**
 * Contains Onboarding Flow information.
 */
final class Flows {

	/**
	 * Get the default onboarding flow.
	 *
	 * @return string
	 */
	public static function get_default_flow() {
		  return 'wp-setup';
	}


	/**
	 * Retrive all the known onboarding flows.
	 *
	 * @return array A value of true for each key indicates that the flow has been approved
	 * and a value of null indicates the flow has not been approved (or) has been temporarily disabled.
	 */
	public static function get_flows() {
		return array(
			'wp-setup'  => true,
			'ecommerce' => null,
		);
	}
}
