<?php
namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\Data\Config;
use NewfoldLabs\WP\Module\Onboarding\WP_Config;

/**
 * Class SettingsController
 */
class SettingsController {

	/**
	 * The namespace of this controller's route.
	 *
	 * @var string
	 */
	protected $namespace = 'newfold-onboarding/v1';

	/**
	 * The endpoint base
	 *
	 * @var string
	 */
	protected $rest_base = '/settings';

	/**
	 * Yoast wp_options key
	 *
	 * @var string
	 */
	protected $yoast_wp_options_key = 'wpseo_social';

	/**
	 * Validate these URL keys in the data provided
	 *
	 * @var array
	 */
	protected $social_urls_to_validate = array(
		'facebook_site',
		'instagram_url',
		'linkedin_url',
		'myspace_url',
		'pinterest_url',
		'twitter_site',
		'youtube_url',
		'wikipedia_url',
		'other_social_urls',
	);

	/**
	 * Registers the settings route
	 */
	public function register_routes() {
		\register_rest_route(
			$this->namespace,
			$this->rest_base,
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_item' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
				array(
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'update_item' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);

		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/initialize',
			array(
				array(
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'initialize' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);
	}

	/**
	 * Retrieves the settings handled by the plugin.
	 *
	 * @return \WP_REST_Response
	 */
	public function get_item() {
		return new \WP_REST_Response( $this->get_current_settings() );
	}

	/**
	 * Updates settings for the settings object.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function update_item( \WP_REST_Request $request ) {
		$settings = $this->get_current_settings();
		$params   = $request->get_json_params();

		// check if all the param keys are present in the yoast social keys
		foreach ( $params as $param_key => $param_value ) {
			if ( ! array_key_exists( $param_key, $settings ) ) {
				return new \WP_Error(
					'param_key_not_present',
					"The provided param key '{$param_key}' does not match",
					array( 'status' => 400 )
				);
			}

			// check for proper url
			if ( in_array( $param_key, $this->social_urls_to_validate ) ) {
				// check for the other URL's array
				if ( ! is_array( $param_value ) ) {
					// sanitize fields
					$param[ $param_key ] = \sanitize_text_field( $param_value );

					if ( ! empty( $param_value ) && ! \wp_http_validate_url( $param_value ) ) {
						return new \WP_Error(
							'param_not_proper_url',
							"The provided param '{$param_value}' is NOT a proper URL",
							array( 'status' => 400 )
						);
					}
				} else {
					foreach ( $param_value as $param_url ) {
						// sanitize fields
						$param[ $param_url ] = \sanitize_text_field( $param_url );

						if ( ! empty( $param_url ) && ! \wp_http_validate_url( $param_url ) ) {
							return new \WP_Error(
								'param_not_proper_url',
								"The provided param '{$param_url}' is NOT a proper URLL",
								array( 'status' => 400 )
							);
						}
					}
				}
			}
		}
		$settings = array_merge( $settings, $params );
		\update_option( $this->yoast_wp_options_key, $settings );
		return $this->get_item();
	}

	/**
	 * Retrieve the existing saved array of settings
	 *
	 * @return array $settings List of the settings and their values
	 */
	public function get_current_settings() {

		// incase yoast plugin is not installed then we need to save the values in the yoast_wp_options_key
		if ( ( $social_data = \get_option( $this->yoast_wp_options_key ) ) === false ) {

			// initialize an array with empty values
			$social_data                      = array_fill_keys( $this->social_urls_to_validate, '' );
			$social_data['other_social_urls'] = array(); // only this key has to be an array

			// update database
			\add_option( $this->yoast_wp_options_key, $social_data );
		}

		return $social_data;

	}

	/**
	 * Initialize WordPress Options, Permalinks and Configuration.
	 *
	 * @return \WP_REST_Response
	 */
	public function initialize() {

          if ( \get_option( Options::get_option_name( 'settings_initialized' ), false ) ) {
               return new \WP_REST_Response(
                    array(),
                    200
               );
          }

		  // Update wp_options
		$init_options = Options::get_initialization_options();
		foreach ( $init_options as $option_key => $option_value ) {
			 \update_option( Options::get_option_name( $option_key, false ), $option_value );
		}
		  // Can't be part of initialization constants as they are static.
		\update_option( Options::get_option_name( 'install_date', false ), gmdate( 'M d, Y' ) );

		  // Flush permalinks
		flush_rewrite_rules();

		  // Add constants to the WordPress configuration (wp-config.php)
		  $wp_config_constants = Config::get_wp_config_initialization_constants();
		$wp_config             = new WP_Config();
		foreach ( $wp_config_constants as $constant_key => $constant_value ) {
			if ( $wp_config->constant_exists( $constant_key ) ) {
				$wp_config->update_constant( $constant_key, $constant_value );
				continue;
			}
			$wp_config->add_constant( $constant_key, $constant_value );
		}

          \update_option( Options::get_option_name( 'settings_initialized' ), true );

		return new \WP_REST_Response(
			array(),
			201
		);
	}
}
