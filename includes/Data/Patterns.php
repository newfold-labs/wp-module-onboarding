<?php

namespace NewfoldLabs\WP\Module\Onboarding\Data;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;

final class Patterns
{

     protected static $theme_step_patterns = array(
          'yith-wonder' => array(
               'theme-styles' => array(
                    'site-header-left-logo-navigation-inline',
                    'homepage-1',
                    'site-footer',
               ),
               'homepage-styles' => array(
                    'site-header-left-logo-navigation-inline',
                    'homepage-1',
                    'homepage-2',
                    'homepage-3',
                    'site-footer',
               ),
               'header' => array(
                    'site-header-centered-logo-split-menu',
                    'site-header-centered',
                    'site-header-left-logo-navigation-below',
                    'site-header-left-logo-navigation-inline'
               )
          ),
     );

     public static function cleanup_wp_grammar($content)
     {

          // Remove template-part if that exists
          $content = preg_replace('/^<!-- wp:template-part .* \/-->$/m', '', $content);

          // Create an array with the values you want to replace
          $searches = array("\n", "\t");

          // Replace the line breaks and tabs with a empty string
          $content = str_replace($searches, '', $content);

          return $content;
     }

     public static function get_pattern_from_slug($pattern_slug)
     {
          $active_theme = (\wp_get_theme())->get('TextDomain');
          $pattern_name = $active_theme . '/' . $pattern_slug;

          $block_patterns_registry = \WP_Block_Patterns_Registry::get_instance();
          if ($block_patterns_registry->is_registered($pattern_name)) {
               $pattern = $block_patterns_registry->get_registered($pattern_name);
               return array(
                    'title'   => $pattern['title'],
                    'content' => self::cleanup_wp_grammar($pattern['content']),
                    'name'    => $pattern['name'],
               );
          }

          return false;
     }

     public static function get_theme_step_patterns_from_step($step, $squash = false)
     {
          $active_theme = (\wp_get_theme())->get('TextDomain');

          if (!isset(self::$theme_step_patterns[$active_theme][$step])) {
               return false;
          }

          $pattern_slugs           = self::$theme_step_patterns[$active_theme][$step];
          $block_patterns_registry = \WP_Block_Patterns_Registry::get_instance();
          $block_patterns          = array();
          $block_patterns_squashed = '';
          foreach ($pattern_slugs as $pattern_slug) {
               $pattern_name = $active_theme . '/' . $pattern_slug;
               if ($block_patterns_registry->is_registered($pattern_name)) {
                    $pattern = $block_patterns_registry->get_registered($pattern_name);
                    if (!$squash) {
                         $block_patterns[] = array(
                              'slug'    => $pattern_slug,
                              'title'   => $pattern['title'],
                              'content' => self::cleanup_wp_grammar($pattern['content']),
                              'name'    => $pattern['name'],
                         );
                         continue;
                    }
                    $block_patterns_squashed .= self::cleanup_wp_grammar($pattern['content']);
               }
          }

          return $squash ? $block_patterns_squashed : $block_patterns;
     }

     public static function get_all_patterns_for_slug($slug_keyword)
     {
          $active_theme = (\wp_get_theme())->get('TextDomain');

          $block_patterns_registry = \WP_Block_Patterns_Registry::get_instance();
          $all_patterns = $block_patterns_registry->get_all_registered();

          $filtered_patterns = array();
          foreach($all_patterns as $pattern_info) {
               if( strpos($pattern_info['slug'], $active_theme) === 0 // making sure the slug name starts with the theme name
                   && strpos($pattern_info['slug'], $slug_keyword) !== FALSE ) {
                    $filtered_patterns[] = $pattern_info;
               }
          }
          return $filtered_patterns;
     }

     /**
      * Sets the Homepage selected by the user.
      *
      * @return \WP_REST_Response|\WP_Error
      */
     public function set_homepage_patterns($slug)
     {

          if (!isset($slug)) {
               return new \WP_Error(
                    'Slug not Provided',
                    'The WordPress Grammar Slug for homepage was not provided',
                    array('status' => 404)
               );
          }

          $pattern_data = self::get_pattern_from_slug($slug);
          if (!$pattern_data) {
               return new \WP_Error(
                    400,
                    'Failed to save Homepage, Pattern not found'
               );
          }

          $show_pages_on_front =  \get_option(Options::get_option_name('show_on_front', false));

          // Check if default homepage is posts
          if ($show_pages_on_front == 'posts') {
               \update_option(Options::get_option_name('show_on_front', false), 'page');
          }

          $request = new \WP_REST_Request(
               'POST',
               '/wp/v2/pages'
          );

          $request->set_body_params(
               array(
                    'title'    => 'Homepage',
                    'status'   => 'publish',
                    'template' => 'no-title',
                    'content'  =>  $pattern_data['content'],
               )
          );

          $response = \rest_do_request($request);

          if (201 === $response->status) {
               $page_data = json_decode(wp_json_encode($response->data), true);

               // Set the newly added page as Homepage
               if (array_key_exists('id', $page_data)) {
                    \update_option(Options::get_option_name('page_on_front', false), $page_data['id']);
               }

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
               'Failed to save Homepage.' . $response
          );
     }

     public static function set_theme_step_patterns($step, $slug)
     {

          switch ($step) {
               case 'homepage-styles':
                    if (isset($slug)) {
                         return self::set_homepage_patterns($slug);
                    }
               default:
                    return  new \WP_Error(
                         404,
                         'No Step Found with given params'
                    );
          }
     }
}
