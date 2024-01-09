<?php
namespace NewfoldLabs\WP\Module\Onboarding\Mustache;

/**
 * Class Mustache
 */
class Mustache {

	/**
	 * Mustache Engine.
	 *
	 * @var array
	 */
	protected $mustache_engine;

	/**
	 * Setup mustache engine.
	 */
	public function __construct() {
		$this->mustache_engine = new \Mustache_Engine(
			array(
				'loader' => new \Mustache_Loader_FilesystemLoader( __DIR__ . '/Templates' ),
			)
		);
	}

	/**
	 * Render respective template data.
	 *
	 * @param string $template_name Template Name
	 * @param array  $data Data
	 * @return string
	 */
	public function render_template( $template_name, $data ) {
		return $this->mustache_engine->loadTemplate( $template_name )->render( $data );
	}
}
