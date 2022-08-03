<?php

namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Permissions;

/**
 * Class PatternsController
 */
class PatternsController extends \WP_REST_Controller {

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
	protected $rest_base = 'patterns';

	/**
	 * The approved list of header patterns
	 *
	 * @var string
	 */
	protected $header_pattern_slugs = array(
		'header-default',
		'header-large-dark',
		'header-small-dark',
		'header-image-background',
		'header-image-background-overlay',
	);

	 /**
	  * The block namespace. Currently only twentytwentytwo
	  *
	  * @var string
	  */
	 protected $block_namespace = 'twentytwentytwo';

	 /**
	  * This will allow us to query block patterns.
	  *
	  * @var \WP_Block_Patterns_Registry
	  */
	 protected $patterns_registry_instance;

	public function __construct() {
		 $this->patterns_registry_instance = \WP_Block_Patterns_Registry::get_instance();
	}

	/**
	 * Registers REST routes for this controller class.
	 */
	public function register_routes() {

		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/header',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_header_patterns' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);

	}

	/**
	 * Retrieves the patterns approved by the Onboarding Module.
	 *
	 * @return \WP_Rest_Response|array
	 */
	public function get_header_patterns() {
		$block_pattern_files = array();

		foreach ( $this->header_pattern_slugs as $block_pattern ) {
			   $pattern_name = $this->block_namespace . '/' . $block_pattern;
			if ( $this->patterns_registry_instance->is_registered( $pattern_name ) ) {
				 $pattern               = $this->patterns_registry_instance->get_registered( $pattern_name );
				 $block_pattern_files[] = array(
					 'title'   => $pattern['title'],
					 'content' => $pattern['content'],
					 'name'    => $pattern['name'],
				 );
			}
		}

		return $block_pattern_files;
	}

}
