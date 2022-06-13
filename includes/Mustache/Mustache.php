<?php
namespace NewfoldLabs\WP\Module\Onboarding\Mustache;

class Mustache {

     protected $mustache_engine;

     function __construct() {
          $this->mustache_engine = new \Mustache_Engine(array(
               'loader' => new \Mustache_Loader_FilesystemLoader( dirname( __FILE__ ) . '/Templates' )
          ));
     }

     public function render_template( $template_name, $data ) {
          $template = $this->mustache_engine->loadTemplate( $template_name );
          return $template->render( $data );
     }
}
