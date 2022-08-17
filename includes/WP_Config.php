<?php
namespace NewfoldLabs\WP\Module\Onboarding;

/**
 * Access and Modify WordPress Configuration (wp-config.php).
 */
class WP_Config {

	 /**
	  * @var \WPConfigTransformer
	  */
	 protected $wp_config;

	function __construct() {
		 $this->wp_config = new \WPConfigTransformer( ABSPATH . 'wp-config.php' );
	}

	 /**
	  * Adds a new constant to WordPress Configuration.
	  *
	  * @param mixed $name Name of the constant
	  * @param mixed $value Value of the constant
	  *
	  * @return boolean
	  */
	public function add_constant( $name, $value ) {
		 return $this->wp_config->add( 'constant', $name, $value, array( 'raw' => true ) );
	}

	 /**
	  * Updates an existing constant in WordPress Configuration.
	  *
	  * @param mixed $name Name of the constant
	  * @param mixed $value Value of the constant
	  *
	  * @return boolean
	  */
	public function update_constant( $name, $value ) {
		 return $this->wp_config->update( 'constant', $name, $value, array( 'raw' => true ) );
	}

	 /**
	  * Checks if the constant already exists in the WordPress Configuration.
	  *
	  * @param mixed $name Name of the constant.
	  *
	  * @return boolean
	  */
	public function constant_exists( $name ) {
		 return $this->wp_config->exists( 'constant', $name );
	}

}
