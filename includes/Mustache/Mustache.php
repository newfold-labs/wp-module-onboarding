<?php
namespace NewfoldLabs\WP\Module\Onboarding\Mustache;

/**
 * Class Mustache
 */
class Mustache {

	protected $mustache_engine;

	function __construct() {
		$this->mustache_engine = new \Mustache_Engine(
			array(
				'loader' => new \Mustache_Loader_FilesystemLoader( dirname( __FILE__ ) . '/Templates' ),
			)
		);
	}

	/**
	 * @param string $template_name
	 * @param array $data
	 * 
	 * @return string
	 */
	public function render_template( $template_name, $data ) {
	     return $this->mustache_engine->loadTemplate( $template_name )->render( $data );
	}
}
