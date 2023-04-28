<?php

namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Data\SiteClassification;

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
				'callback'            => array( $this, 'get_site_classification' ),
				'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
			)
		);
	}

    public function get_site_classification() {
        if ( ! class_exists( 'NewfoldLabs\WP\Module\Data\SiteClassification' ) ) {
			return array();
		}
        $classification = new SiteClassification();
        return $classification->get();
    }
}
