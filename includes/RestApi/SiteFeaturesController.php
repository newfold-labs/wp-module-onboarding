<?php

namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Data\SiteFeatures;

/**
 * Class SiteFeaturesController
 */
class SiteFeaturesController extends \WP_REST_Controller {


	 /**
	  * The namespace of this controller's route.
	  *
	  * @var string
	  */
	 protected $namespace = 'newfold-onboarding/v1';

	 /**
	  * The base of this controller's route.
	  *
	  * @var string
	  */
	 protected $rest_base = '/features';

	 /**
	  * Registers routes for SiteFeaturesController
	  */
	public function register_routes() {
		\register_rest_route(
			$this->namespace,
			$this->rest_base,
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_custom_plugins' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);
	}

	 /**
	  * Retrieves the Customized list of Plugins for the user.
	  *
	  * @return array|\WP_Error
	  */
	public function get_custom_plugins() {
		 $custom_plugins = SiteFeatures::get_custom_plugins_list();
		 return $custom_plugins;
	}
}
