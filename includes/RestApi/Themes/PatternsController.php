<?php

namespace NewfoldLabs\WP\Module\Onboarding\RestApi\Themes;

use NewfoldLabs\WP\Module\Onboarding\Data\Patterns;
use NewfoldLabs\WP\Module\Onboarding\Permissions;

/**
 * Class PatternsController
 */
class PatternsController extends \WP_REST_Controller
{

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
     protected $rest_base = '/patterns';

     /**
      * Registers REST routes for this controller class.
      */
     public function register_routes()
     {

          register_rest_route(
               $this->namespace,
               $this->rest_base,
               array(
                    array(
                         'methods'  => \WP_REST_Server::READABLE,
                         'callback' => array($this, 'get_pattern'),
                         'args'     => $this->get_pattern_args(),
                         'permission_callback' => array(Permissions::class, 'rest_is_authorized_admin'),
                    ),
                    array(
                         'methods'             => \WP_REST_Server::EDITABLE,
                         'callback'            => array($this, 'set_pattern'),
                         'args'                => $this->set_pattern_args(),
                         'permission_callback' => array(Permissions::class, 'rest_is_authorized_admin'),
                    ),
               )
          );
          register_rest_route(
			$this->namespace,
			$this->rest_base . '/headers',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_all_header_patterns' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);
          register_rest_route(
			$this->namespace,
			$this->rest_base . '/header/default',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_default_header_pattern' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);
          register_rest_route(
			$this->namespace,
			$this->rest_base . '/header/preview',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_header_pattern_preview' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);
     }

     public function get_pattern_args()
     {
          return array(
               'slug'   => array(
                    'type' => 'string',
               ),
               'step'   => array(
                    'type' => 'string',
               ),
               'squash' => array(
                    'type'    => 'boolean',
                    'default' => false,
               ),
          );
     }

     public function set_pattern_args()
     {
          return array(
               'slug'   => array(
                    'type' => 'string',
               ),
               'step'   => array(
                    'type' => 'string',
               )
          );
     }

     /**
      * Retrieves the patterns approved by the Onboarding Module.
      *
      * @return \WP_Rest_Response|\WP_Error
      */
     public function get_pattern(\WP_REST_Request $request)
     {
          $step   = $request->get_param('step');
          $squash = $request->get_param('squash');
          $slug   = $request->get_param('slug');

          if (!$step && !$slug) {
               return new \WP_Error(
                    'missing_params',
                    __('Pattern identifier (slug) or step name (step) required.'),
                    array('status' => 400)
               );
          }

          if ($step) {
               $step_patterns = Patterns::get_theme_step_patterns_from_step($step, $squash);
               if (!$step_patterns) {
                    return new \WP_Error(
                         'no_patterns_found',
                         __('No Patterns Found.'),
                         array('status' => 404)
                    );
               }

               return new \WP_REST_Response(
                    $step_patterns
               );
          }

          $pattern = Patterns::get_pattern_from_slug($slug);
          if (!$pattern) {
               return new \WP_Error(
                    'no_pattern_found',
                    __('No Pattern Found.'),
                    array('status' => 404)
               );
          }

          return new \WP_REST_Response(
               $pattern
          );
     }


     /**
      * Sets the patterns according to the specific step.
      *
      * @return \WP_Rest_Response|\WP_Error
      */
     public function set_pattern(\WP_REST_Request $request)
     {
          $step   = $request->get_param('step');
          $slug   = $request->get_param('slug');

          if (!$step) {
               return new \WP_Error(
                    'missing_params',
                    __('Pattern identifier (slug) or step name (step) required.'),
                    array('status' => 400)
               );
          }

          return Patterns::set_theme_step_patterns($step, $slug);
     }

     /**
      * Retrieves all the header patterns.
      *
      * @return \WP_Rest_Response|\WP_Error
      */
     public function get_all_header_patterns()
     {
          $slug_keyword = 'header';

          $header_patterns = Patterns::get_all_patterns_for_slug($slug_keyword);
          if (!$header_patterns) {
               return new \WP_Error(
                    'no_patterns_found',
                    __('No Patterns Found.'),
                    array('status' => 404)
               );
          }

          return new \WP_REST_Response(
               $header_patterns
          );
     }

     /**
      * Retrieves deafult the header pattern.
      *
      * @return \WP_Rest_Response|\WP_Error
      */
      public function get_default_header_pattern()
      {
           $header_pattern = Patterns::get_default_header();
           if (!$header_pattern) {
                return new \WP_Error(
                     'no_default_pattern_found',
                     __('No Default Pattern Found.'),
                     array('status' => 404)
                );
           }
 
           return new \WP_REST_Response(
                $header_pattern
           );
      }

     /**
      * Retrieves pattern for specific header pattern.
      *
      * @return \WP_Rest_Response|\WP_Error
      */
     public function get_header_pattern_preview(\WP_REST_Request $request)
     {
          $slug   = $request->get_param('slug');

          $header_pattern_preview = Patterns::get_header_pattern_preview($slug);
          if (!$header_pattern_preview) {
               return new \WP_Error(
                    'no_header_preview',
                    __('Preview for the provided header pattern could not be generated.'),
                    array('status' => 404)
               );
          }

          return new \WP_REST_Response(
               $header_pattern_preview
          );
     }

}
