<?php
namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\Data\Config;
use NewfoldLabs\WP\Module\Onboarding\WP_Config;
use NewfoldLabs\WP\Module\Onboarding\Data\Data;

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

        \register_rest_route(
			$this->namespace,
			$this->rest_base . '/preview',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_preview_settings' ),
					// 'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
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

    public static function fn_get_webfonts_from_theme_json() {
        // Get settings from theme.json.
        $settings = \WP_Theme_JSON_Resolver::get_merged_data()->get_settings();

        // If in the editor, add webfonts defined in variations.
        if ( is_admin() || ( defined( 'REST_REQUEST' ) && REST_REQUEST ) ) {
            $variations = \WP_Theme_JSON_Resolver::get_style_variations();
            foreach ( $variations as $variation ) {
                // Skip if fontFamilies are not defined in the variation.
                if ( empty( $variation['settings']['typography']['fontFamilies'] ) ) {
                    continue;
                }

                // Initialize the array structure.
                if ( empty( $settings['typography'] ) ) {
                    $settings['typography'] = array();
                }
                if ( empty( $settings['typography']['fontFamilies'] ) ) {
                    $settings['typography']['fontFamilies'] = array();
                }
                if ( empty( $settings['typography']['fontFamilies']['theme'] ) ) {
                    $settings['typography']['fontFamilies']['theme'] = array();
                }

                // Combine variations with settings. Remove duplicates.
                $settings['typography']['fontFamilies']['theme'] = array_merge( $settings['typography']['fontFamilies']['theme'], $variation['settings']['typography']['fontFamilies']['theme'] );
                $settings['typography']['fontFamilies']          = array_unique( $settings['typography']['fontFamilies'] );
            }
        }

        // Bail out early if there are no settings for webfonts.
        if ( empty( $settings['typography']['fontFamilies'] ) ) {
            return array();
        }

        $webfonts = array();

        // Look for fontFamilies.
        foreach ( $settings['typography']['fontFamilies'] as $font_families ) {
            foreach ( $font_families as $font_family ) {

                // Skip if fontFace is not defined.
                if ( empty( $font_family['fontFace'] ) ) {
                    continue;
                }

                // Skip if fontFace is not an array of webfonts.
                if ( ! is_array( $font_family['fontFace'] ) ) {
                    continue;
                }

                $webfonts = array_merge( $webfonts, $font_family['fontFace'] );
            }
        }

        return $webfonts;
    }

    static function fn_transform_src_into_uri( array $src ) {
        foreach ( $src as $key => $url ) {
            // Tweak the URL to be relative to the theme root.
            if ( ! str_starts_with( $url, 'file:./' ) ) {
                continue;
            }

            $src[ $key ] = get_theme_file_uri( str_replace( 'file:./', '', $url ) );
        }

        return $src;
    }

    /**
     * Converts the font-face properties (i.e. keys) into kebab-case.
     *
     * @since 6.0.0
     *
     * @param array $font_face Font face to convert.
     * @return array Font faces with each property in kebab-case format.
     */
    static function fn_convert_keys_to_kebab_case( array $font_face ) {
        foreach ( $font_face as $property => $value ) {
            $kebab_case               = _wp_to_kebab_case( $property );
            $font_face[ $kebab_case ] = $value;
            if ( $kebab_case !== $property ) {
                unset( $font_face[ $property ] );
            }
        }

        return $font_face;
    }

    /**
     * Validates a webfont.
     *
     * @since 6.0.0
     *
     * @param array $webfont The webfont arguments.
     * @return array|false The validated webfont arguments, or false if the webfont is invalid.
     */
    static function fn_validate_webfont( $webfont ) {
        $webfont = wp_parse_args(
            $webfont,
            array(
                'font-family'  => '',
                'font-style'   => 'normal',
                'font-weight'  => '400',
                'font-display' => 'fallback',
                'src'          => array(),
            )
        );

        // Check the font-family.
        if ( empty( $webfont['font-family'] ) || ! is_string( $webfont['font-family'] ) ) {
            trigger_error( __( 'Webfont font family must be a non-empty string.' ) );

            return false;
        }

        // Check that the `src` property is defined and a valid type.
        if ( empty( $webfont['src'] ) || ( ! is_string( $webfont['src'] ) && ! is_array( $webfont['src'] ) ) ) {
            trigger_error( __( 'Webfont src must be a non-empty string or an array of strings.' ) );

            return false;
        }

        // Validate the `src` property.
        foreach ( (array) $webfont['src'] as $src ) {
            if ( ! is_string( $src ) || '' === trim( $src ) ) {
                trigger_error( __( 'Each webfont src must be a non-empty string.' ) );

                return false;
            }
        }

        // Check the font-weight.
        if ( ! is_string( $webfont['font-weight'] ) && ! is_int( $webfont['font-weight'] ) ) {
            trigger_error( __( 'Webfont font weight must be a properly formatted string or integer.' ) );

            return false;
        }

        // Check the font-display.
        if ( ! in_array( $webfont['font-display'], array( 'auto', 'block', 'fallback', 'swap' ), true ) ) {
            $webfont['font-display'] = 'fallback';
        }

        $valid_props = array(
            'ascend-override',
            'descend-override',
            'font-display',
            'font-family',
            'font-stretch',
            'font-style',
            'font-weight',
            'font-variant',
            'font-feature-settings',
            'font-variation-settings',
            'line-gap-override',
            'size-adjust',
            'src',
            'unicode-range',
        );

        foreach ( $webfont as $prop => $value ) {
            if ( ! in_array( $prop, $valid_props, true ) ) {
                unset( $webfont[ $prop ] );
            }
        }

        return $webfont;
    }

    static function fn_register_webfonts() {
        $registered_webfonts = array();

        foreach ( self::fn_get_webfonts_from_theme_json() as $webfont ) {
            if ( ! is_array( $webfont ) ) {
                continue;
            }

            $webfont = self::fn_convert_keys_to_kebab_case( $webfont );

            $webfont = self::fn_validate_webfont( $webfont );

            $webfont['src'] = self::fn_transform_src_into_uri( (array) $webfont['src'] );

            // Skip if not valid.
            if ( empty( $webfont ) ) {
                continue;
            }

            $registered_webfonts[] = $webfont;
        }

        return $registered_webfonts;
    }

    static function fn_order_src( array $webfont ) {
        $src         = array();
        $src_ordered = array();

        foreach ( $webfont['src'] as $url ) {
            // Add data URIs first.
            if ( str_starts_with( trim( $url ), 'data:' ) ) {
                $src_ordered[] = array(
                    'url'    => $url,
                    'format' => 'data',
                );
                continue;
            }
            $format         = pathinfo( $url, PATHINFO_EXTENSION );
            $src[ $format ] = $url;
        }

        // Add woff2.
        if ( ! empty( $src['woff2'] ) ) {
            $src_ordered[] = array(
                'url'    => sanitize_url( $src['woff2'] ),
                'format' => 'woff2',
            );
        }

        // Add woff.
        if ( ! empty( $src['woff'] ) ) {
            $src_ordered[] = array(
                'url'    => sanitize_url( $src['woff'] ),
                'format' => 'woff',
            );
        }

        // Add ttf.
        if ( ! empty( $src['ttf'] ) ) {
            $src_ordered[] = array(
                'url'    => sanitize_url( $src['ttf'] ),
                'format' => 'truetype',
            );
        }

        // Add eot.
        if ( ! empty( $src['eot'] ) ) {
            $src_ordered[] = array(
                'url'    => sanitize_url( $src['eot'] ),
                'format' => 'embedded-opentype',
            );
        }

        // Add otf.
        if ( ! empty( $src['otf'] ) ) {
            $src_ordered[] = array(
                'url'    => sanitize_url( $src['otf'] ),
                'format' => 'opentype',
            );
        }
        $webfont['src'] = $src_ordered;

        return $webfont;
    }

    static function fn_compile_src( $font_family, array $value ) {
        $src = "local($font_family)";

        foreach ( $value as $item ) {

            if (
                str_starts_with( $item['url'], site_url() ) ||
                str_starts_with( $item['url'], home_url() )
            ) {
                $item['url'] = wp_make_link_relative( $item['url'] );
            }

            $src .= ( 'data' === $item['format'] )
                ? ", url({$item['url']})"
                : ", url('{$item['url']}') format('{$item['format']}')";
        }

        return $src;
    }

    /**
     * Compiles the font variation settings.
     *
     * @since 6.0.0
     *
     * @param array $font_variation_settings Array of font variation settings.
     * @return string The CSS.
     */
    static function fn_compile_variations( array $font_variation_settings ) {
        $variations = '';

        foreach ( $font_variation_settings as $key => $value ) {
            $variations .= "$key $value";
        }

        return $variations;
    }

    static function fn_build_font_face_css( array $webfont ) {
        $css = '';

        // Wrap font-family in quotes if it contains spaces.
        if (
            str_contains( $webfont['font-family'], ' ' ) &&
            ! str_contains( $webfont['font-family'], '"' ) &&
            ! str_contains( $webfont['font-family'], "'" )
        ) {
            $webfont['font-family'] = '"' . $webfont['font-family'] . '"';
        }

        foreach ( $webfont as $key => $value ) {
            /*
             * Skip "provider", since it's for internal API use,
             * and not a valid CSS property.
             */
            if ( 'provider' === $key ) {
                continue;
            }

            // Compile the "src" parameter.
            if ( 'src' === $key ) {
                $value = self::fn_compile_src( $webfont['font-family'], $value );
            }

            // If font-variation-settings is an array, convert it to a string.
            if ( 'font-variation-settings' === $key && is_array( $value ) ) {
                $value =self::fn_compile_variations( $value );
            }

            if ( ! empty( $value ) ) {
                $css .= "$key:$value;";
            }
        }

        return $css;
    }

    static function fn_get_css ($registered_webfonts) {
        $css = '';

        foreach ( $registered_webfonts as $webfont ) {
            // Order the webfont's `src` items to optimize for browser support.
            $webfont = self::fn_order_src( $webfont );

            // Build the @font-face CSS for this webfont.
            $css .= '@font-face{' . self::fn_build_font_face_css( $webfont ) . '}';
        }

        return $css;
    }

    function wp_theme_json_webfonts_handler() {
            
            $styles = self::fn_get_css(self::fn_register_webfonts());
    
            // Bail out if there are no styles to enqueue.
            if ( '' === $styles ) {
                return;
            }

            return $styles;
    }

    public function get_preview_settings() {
        $preview_settings = Data::preview_settings();
        $preview_settings['settings']['__unstableResolvedAssets']['styles'] .= '<style>' . $this->wp_theme_json_webfonts_handler() . '</style>';
        return new \WP_REST_Response(
            $preview_settings,
            200
        );
    }
}
