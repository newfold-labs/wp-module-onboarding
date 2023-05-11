<?php

namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Data\SiteClassification\SiteClassification;

/**
 * Class SiteClassificationController
 */
class SiteClassificationController {

	/**
	 * The namespace of this controller's route.
	 *
	 * @var string
	 */
	protected $namespace = 'newfold-onboarding/v1';

	/**
	 * The endpoint base
	 *
	 * @var string
	 */
	protected $rest_base = '/site-classification';

	/**
	 * Registers rest routes for SiteClassificationController class.
	 *
	 * @return void
	 */
	public function register_routes() {
		\register_rest_route(
			$this->namespace,
			$this->rest_base,
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get' ),
				'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
			)
		);
	}

	/**
	 * Get site classification data.
	 *
	 * @return array
	 */
	public function get() {
		if ( ! class_exists( 'NewfoldLabs\WP\Module\Data\SiteClassification\SiteClassification' ) ) {
			return array();
		}
		return SiteClassification::get();
	}
}
