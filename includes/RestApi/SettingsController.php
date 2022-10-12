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
	 * Array of defaults for the option.
	 *
	 * Shouldn't be requested directly, use $this->get_defaults();
	 *
	 * @var array
	 */
	protected $defaults = array(
		'facebook_site'         => '', // Text field.
		'instagram_url'         => '',
		'linkedin_url'          => '',
		'myspace_url'           => '',
		'og_default_image'      => '', // Text field.
		'og_default_image_id'   => '',
		'og_frontpage_title'    => '', // Text field.
		'og_frontpage_desc'     => '', // Text field.
		'og_frontpage_image'    => '', // Text field.
		'og_frontpage_image_id' => '',
		'opengraph'             => true,
		'pinterest_url'         => '',
		'pinterestverify'       => '',
		'twitter'               => true,
		'twitter_site'          => '', // Text field.
		'twitter_card_type'     => 'summary_large_image',
		'youtube_url'           => '',
		'wikipedia_url'         => '',
		'other_social_urls'     => array(),
	);

	/**
	 * Validate these URL keys in the data provided
	 *
	 * @var array
	 */
	protected $social_urls_to_validate = array(
		'facebook_site',
		'instagram_url',
		'linkedin_url',
		'twitter_site',
		'myspace_url',
		'pinterest_url',
		'youtube_url',
		'wikipedia_url',
		'other_social_urls',
	);

	/**
	 * Store for invalid urls
	 */
	protected $invalid_urls = array();

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
			if ( ! array_key_exists( $param_key, $this->defaults ) ) {
				$this->invalid_urls[] = $param_key;
				unset($params[$param_key]);
				continue;
			}

			// check for proper url
			if ( in_array( $param_key, $this->social_urls_to_validate ) ) {
				switch($param_key) {
					case 'twitter_site':
						if( !empty($params['twitter_site'])) {
							if( ( $twitter_id = $this->validate_twitter_id($params['twitter_site']) ) === false ) {
								$this->invalid_urls[] = 'twitter_site';
								unset($params['twitter_site']);
							} else {
								$params['twitter_site'] = $twitter_id;
							}
						}
						break;
					case 'other_social_urls':
						foreach ( $param_value as $param_key_osu => $param_url ) {
							$param_value[ $param_key_osu ] = \sanitize_text_field( $param_url );	
							if ( ! empty( $param_url ) && ! \wp_http_validate_url( $param_url ) ) {
								$this->invalid_urls[] = $param_key_osu;
								unset($params[$param_key_osu]);
								continue;
							}
						}
						break;
					default:
						$param[ $param_key ] = \sanitize_text_field( $param_value );
						if ( ! empty( $param_value ) && ! \wp_http_validate_url( $param_value ) ) {
							$this->invalid_urls[] = $param_key;
							unset($params[$param_key]);
						}
						break;
				}
			}
		}
		$settings = array_merge( $settings, $params );

		\update_option( $this->yoast_wp_options_key, $settings );

		if(!empty($this->invalid_urls)) {
			$error_keys = implode( ", ", $this->invalid_urls );
			return new \WP_Error(
				'invalid_urls',
				"Invalid url(s) provided for {$error_keys}.",
				array( 'status' => 400 )
			);
		}
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

			// initialize an array with default values
			$social_data = $this->defaults;

			// update database
			\add_option( $this->yoast_wp_options_key, $social_data );
		}
		// add the full url for twitter cause only the handle is saved in the database
		if( (!empty($social_data['twitter_site'])) &&
			($twitter_handle = $this->validate_twitter_id($social_data['twitter_site'])) !== false ) {
			$social_data['twitter_site'] = 'https://www.twitter.com/' . $twitter_handle;
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


	/**
	 * Validates a twitter id.
	 *
	 * @param string $twitter_id    The twitter id to be validated.
	 * @param bool   $strip_at_sign Whether or not to strip the `@` sign.
	 *
	 * @return string|false The validated twitter id or false if it is not valid.
	 */
	private function validate_twitter_id( $twitter_id, $strip_at_sign = true ) {
		$twitter_id = ( $strip_at_sign ) ? sanitize_text_field( ltrim( $twitter_id, '@' ) ) : sanitize_text_field( $twitter_id );

		/*
		 * From the Twitter documentation about twitter screen names:
		 * Typically a maximum of 15 characters long, but some historical accounts may exist with longer names.
		 * A username can only contain alphanumeric characters (letters A-Z, numbers 0-9) with the exception of underscores.
		 *
		 * @link https://support.twitter.com/articles/101299-why-can-t-i-register-certain-usernames
		 */
		if ( preg_match( '`^[A-Za-z0-9_]{1,25}$`', $twitter_id ) ) {
			return $twitter_id;
		}

		if ( preg_match( '`^http(?:s)?://(?:www\.)?twitter\.com/(?P<handle>[A-Za-z0-9_]{1,25})/?$`', $twitter_id, $matches ) ) {
			return $matches['handle'];
		}

		return false;
	}

}
