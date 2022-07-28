<?php
namespace NewfoldLabs\WP\Module\Onboarding\Data;

/**
 * Stores all the WordPress Options used in the module.
 */
final class Options {
	 /**
	  * @var string Prefix for options in the module.
	  */
	protected static string $prefix = 'nfd_module_onboarding_';

	 /**
	  * @var array List of all the options
	  */
	protected static array $options = array(
		'redirect'             => 'redirect',
		'redirect_param'       => 'redirect_param',
		'exited'               => 'exited',
		'completed'            => 'completed',
		'coming_soon'          => 'mm_coming_soon',
		'brand'                => 'mm_brand',
		'plugins_init_status'  => 'plugins_init_status',
		'plugin_install_queue' => 'plugin_install_queue',
	);

	 /**
	  * Get option name for a given key.
	  *
	  * @param string $option_key The key for the Options::$options array.
	  * @param bool   $attach_prefix Attach the module prefix.
	  *
	  * @return string
	  */
	public static function get_option_name( $option_key, $attach_prefix = true ) {
		 return isset( self::$options[ $option_key ] )
				   ? ( $attach_prefix
						? self::$prefix . self::$options[ $option_key ]
						: self::$options[ $option_key ]
					)
				   : false;
	}

	 /**
	  * @return array List of all options.
	  */
	public static function get_all_options() {
		 return self::$options;
	}
}
