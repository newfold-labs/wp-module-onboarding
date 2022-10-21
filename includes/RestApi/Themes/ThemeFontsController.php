<?php

namespace NewfoldLabs\WP\Module\Onboarding\RestApi\Themes;

use NewfoldLabs\WP\Module\Onboarding\Data\Fonts;
use NewfoldLabs\WP\Module\Onboarding\Permissions;

/**
 * Class ThemeFontsController
 */
class ThemeFontsController extends \WP_REST_Controller
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
     protected $rest_base = '/themes';


     /**
      * The extended base of this controller's route.
      *
      * @var string
      */
     protected $rest_extended_base = '/fonts';

     /**
      * Registers routes for ThemeColorsController
      */
     public function register_routes()
     {
          \register_rest_route(
               $this->namespace,
               $this->rest_base . $this->rest_extended_base,
               array(
                    array(
                         'methods'  => \WP_REST_Server::READABLE,
                         'callback' => array($this, 'get_theme_fonts'),
                         'permission_callback' => array(Permissions::class, 'rest_is_authorized_admin'),
                    ),
               )
          );
     }

     /**
      * Retrieves the active theme font variations.
      *
      * @return array|\WP_Error
      */
     public function get_theme_fonts()
     {
          $theme_font_palettes = Fonts::get_fonts_from_theme();
          return $theme_font_palettes;
     }
}
