<?php

namespace NewfoldLabs\WP\Module\Onboarding\RestApi\Patterns;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Data\Options;


/**
 * Class HomepagePatternsController
 */
class HomepagePatternsController extends \WP_REST_Controller {

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
	  * The block namespace slugs for different themes
	  *
	  * @var array
	  */
	 protected $block_namespace_slugs = array (
		'yith-wonder'
	 );

	/**
	 * The approved list of homepage patterns
	 *
	 * @var array
	 */
	protected $homepage_pattern_slugs = array(
		'yith-wonder'  => array(
			'homepage-1' => array (
				// 'site-header-left-logo-navigation-inline',  // Header
				'homepage-1'  // HomePage
			),
			'homepage-2' => array (
				// 'site-header-centered',  // Header
				'homepage-2'  // HomePage
			),
			'homepage-3' => array (
				// 'site-header-left-logo-navigation-below',  // Header
				'homepage-3'  // HomePage
			),
		)	
	);

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
			'/' . $this->rest_base . '/homepage',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_homepage_patterns' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
				array(
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'set_homepage_patterns' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);

	}

	/**
	 * Cleans the content for the homepages
	 *
	 * @return string
	 */
	public function cleanup_wp_grammar( $content ) {

		// Remove template-part if that exists
		$content = preg_replace('/^<!-- wp:template-part .* \/-->$/m', '', $content);

		// Create an array with the values you want to replace
		$searches = array("\n", "\t");

		// Replace the line breaks and tabs with a empty string
		$content = str_replace($searches, "", $content);

		return $content;
	}

	/**
	 * Retrieves the patterns approved by the Onboarding Module.
	 *
	 * @return array|\WP_Error
	 */
	public function get_patterns($block_namespace, $block_pattern) {
		
		$pattern_name = $block_namespace . '/' . $block_pattern;
		if ( $this->patterns_registry_instance->is_registered( $pattern_name ) ) {
			$pattern = $this->patterns_registry_instance->get_registered( $pattern_name );

			return 
				array(
					'name'    => $pattern['name'],
					'title'   => $pattern['title'],
					'content' => $this->cleanup_wp_grammar($pattern['content'])
				);
		}
		else
			return new \WP_Error(
				'Pattern Instance is not registered',
				'The Pattern Instance not registered for Pattern: ' . $block_pattern,
				array( 'status' => 404 )
			);
	}

	/**
	 * Retrieves the Homepage patterns approved by the Onboarding Module.
	 *
	 * @return array|\WP_Error
	 */
	public function get_homepage_patterns() {
		$block_pattern_files = array();

		// Iterate through all the themes that are approved
		foreach ( $this->block_namespace_slugs as $block_namespace ) {

			// Fetch all the Patterns specific to a selected theme
			foreach ( $this->homepage_pattern_slugs[$block_namespace] as $pattern_name=>$block_patterns ) {

				$pattern_content['title'] = $pattern_name;
				$pattern_content['content'] = '';
				foreach ( $block_patterns as $block_pattern ) {

					// Fetch the Block Pattern specified from a specific theme
					$pattern_data = $this->get_patterns($block_namespace, $block_pattern);

					// Check if Pattern data is not NULL|Error and has data
					if(array_key_exists('content', $pattern_data))
						$pattern_content['content'] = $pattern_content['content'] . $pattern_data['content'];
				}

				$block_pattern_files[] = $pattern_content;
			}
		}

		return $block_pattern_files;
	}

	/**
	 * Sets the Homepage selected by the user.
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function set_homepage_patterns( \WP_REST_Request $request ) {

		$params = json_decode( $request->get_body(), true );
		if( !isset($params) || !array_key_exists('content', $params) )
			return new \WP_Error(
				'Homepage not specified',
				'The WordPress Grammar for homepage was not provided',
				array( 'status' => 404 )
			);

		$show_pages_on_front =  \get_option( Options::get_option_name( 'show_on_front', false ) );

		// Check if default homepage is posts
		if( $show_pages_on_front == 'posts' )
			\update_option( Options::get_option_name( 'show_on_front', false ), 'page' );

		
		$request = new \WP_REST_Request(
			'POST',
			'/wp/v2/pages'
		);

		$request->set_body_params(
			array(
				'title'    => 'Homepage',
				'status'   => 'publish',
				'template' => 'no-title',
				'content'  =>  $params['content'],
			)
		);
			
		$response = \rest_do_request( $request );
		
		if ( 201 === $response->status ) {
			$page_data = json_decode( wp_json_encode( $response->data ), true );

			// Set the newly added page as Homepage
			if( array_key_exists('id', $page_data) )
				\update_option( Options::get_option_name( 'page_on_front', false ), $page_data['id'] );

			return new \WP_REST_Response(
               array(
					'message' => 'Successfully set the Homepage',
					'response' => $page_data,
			   ),
               201
        	);
		}

		return new \WP_Error(
			$response->status,
			'Failed to save Homepage.'.$response
		);
	}
}
