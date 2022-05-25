<?php

namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Permissions;

/**
 * Class HeaderPatternsController
 */
class HeaderPatternsController extends \WP_REST_Controller {

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
	protected $rest_base = 'header-patterns';

	/**
	 * The approved list of header patterns
	 *
	 * @var string
	 */
	protected $header_pattern_slugs = [
		'header-default',
		'header-large-dark',
		'header-small-dark',
		'header-image-background',
		'header-image-background-overlay'
	];

	/**
	 * Registers the settings route
	 */
	public function register_routes() {

		register_rest_route(
			$this->namespace,
			'/'. $this->rest_base,
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_header_patterns' ),
					'permission_callback' => array( $this, 'check_permission' ),
				)
			)
		);

	}

	/**
	 * Retrieves the patterns approved by the Onboarding Module.
	 *
	 * @return \WP_REST_RESPONSE|\WP_Error
	 */
	public function get_header_patterns() {

		$pattern_locations = $this->get_pattern_locations();
		$pattern_data = $this->get_pattern_data($pattern_locations);
		return $pattern_data;
	}

	/**
	 * Retrieves the location of approved patterns from the file system.
	 *
	 * @return array|\WP_Error
	 */
	public function get_pattern_locations() {

		$block_pattern_dir = array();

		// Determining the path for approved patterns list
		foreach ( $this->header_pattern_slugs as $block_pattern ) {
			$pattern_file = get_theme_file_path( '/inc/patterns/' . $block_pattern . '.php' );
			$block_pattern_dir[] = $pattern_file;
		}

		return $block_pattern_dir;
	}

	/**
	 * Retrieves the Pattern Content from the location specified.
	 *
	 * @return array|\WP_Error
	 */
	public function get_pattern_data($block_pattern_dirs) {

		$block_patterns_data = array();
		$headers = array('title', 'content');
		foreach($block_pattern_dirs as $pattern_file){

			if(file_exists($pattern_file)){

				// Parse pattern slug from file name.
				if ( ! preg_match( '#/(?P<slug>[A-z0-9_-]+)\.php$#', $pattern_file, $matches ) ) {
					continue;
				}

				$pattern_data = array();
				$pattern_file = require($pattern_file);

				// Parsing the required header fields
				foreach($headers as $header){
					$pattern_data[$header] = $pattern_file[$header];
				}

				// Adding the slug identifier
				$pattern_data["slug"] = $matches['slug'];

				$block_patterns_data[] = $pattern_data;
			}
			else {
				return new \WP_Error(404, 'Failed to fetch Pattern file');
			}
		}

		return $block_patterns_data;
	}

	/**
	 * Check permissions for routes.
	 *
	 * @return bool|\WP_Error
	 */
	public function check_permission() {
		return Permissions::rest_is_authorized_admin();
	}

}
