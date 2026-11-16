<?php
namespace NewfoldLabs\WP\Module\Onboarding\Services;

/**
 * Collects webfonts declared in theme.json (including style variations) and compiles them to @font-face CSS.
 *
 * Adapted from WordPress core's webfont handling.
 */
class Webfonts {

	/**
	 * Get all webfont (fontFace) definitions from the merged theme.json settings and style variations.
	 *
	 * @return array List of raw fontFace definitions.
	 */
	public static function get_webfonts_from_theme_json() {
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

	/**
	 * Rewrites theme-relative `file:./` sources into full theme file URIs.
	 *
	 * @param array $src Font sources.
	 * @return array Sources with theme-relative paths resolved.
	 */
	private static function transform_src_into_uri( array $src ) {
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
	private static function convert_keys_to_kebab_case( array $font_face ) {
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
	private static function validate_webfont( $webfont ) {
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
			trigger_error( esc_html__( 'Webfont font family must be a non-empty string.', 'wp-module-onboarding' ) ); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_trigger_error -- Developer-facing validation notice, mirrors WordPress core.

			return false;
		}

		// Check that the `src` property is defined and a valid type.
		if ( empty( $webfont['src'] ) || ( ! is_string( $webfont['src'] ) && ! is_array( $webfont['src'] ) ) ) {
			trigger_error( esc_html__( 'Webfont src must be a non-empty string or an array of strings.', 'wp-module-onboarding' ) ); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_trigger_error -- Developer-facing validation notice, mirrors WordPress core.

			return false;
		}

		// Validate the `src` property.
		foreach ( (array) $webfont['src'] as $src ) {
			if ( ! is_string( $src ) || '' === trim( $src ) ) {
				trigger_error( esc_html__( 'Each webfont src must be a non-empty string.', 'wp-module-onboarding' ) ); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_trigger_error -- Developer-facing validation notice, mirrors WordPress core.

				return false;
			}
		}

		// Check the font-weight.
		if ( ! is_string( $webfont['font-weight'] ) && ! is_int( $webfont['font-weight'] ) ) {
			trigger_error( esc_html__( 'Webfont font weight must be a properly formatted string or integer.', 'wp-module-onboarding' ) ); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_trigger_error -- Developer-facing validation notice, mirrors WordPress core.

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

	/**
	 * Get the validated, normalized webfonts from theme.json.
	 *
	 * Invalid webfonts are skipped.
	 *
	 * @return array List of webfonts with kebab-case properties and resolved sources.
	 */
	public static function get_registered_webfonts_from_theme_json() {
		$registered_webfonts = array();

		foreach ( self::get_webfonts_from_theme_json() as $webfont ) {
			if ( ! is_array( $webfont ) ) {
				continue;
			}

			$webfont = self::convert_keys_to_kebab_case( $webfont );

			$webfont = self::validate_webfont( $webfont );

			// Skip if not valid.
			if ( empty( $webfont ) ) {
				continue;
			}

			$webfont['src'] = self::transform_src_into_uri( (array) $webfont['src'] );

			$registered_webfonts[] = $webfont;
		}

		return $registered_webfonts;
	}

	/**
	 * Orders a webfont's sources for browser support: data URIs first, then woff2, woff, ttf, eot, otf.
	 *
	 * @param array $webfont Webfont with a `src` list of URLs.
	 * @return array Webfont whose `src` is a list of `url`/`format` pairs.
	 */
	private static function order_src( array $webfont ) {
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

	/**
	 * Compiles ordered sources into a CSS `src` value, making same-site URLs relative.
	 *
	 * @param string $font_family Font family name.
	 * @param array  $value       Ordered `url`/`format` pairs.
	 * @return string The CSS `src` value.
	 */
	private static function compile_src( $font_family, array $value ) {
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
	private static function compile_variations( array $font_variation_settings ) {
		$variations = '';

		foreach ( $font_variation_settings as $key => $value ) {
			$variations .= "$key $value";
		}

		return $variations;
	}

	/**
	 * Builds the declarations for a single @font-face rule.
	 *
	 * @param array $webfont Webfont with ordered sources.
	 * @return string CSS declarations (without the surrounding @font-face block).
	 */
	private static function build_font_face_css( array $webfont ) {
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
				$value = self::compile_src( $webfont['font-family'], $value );
			}

			// If font-variation-settings is an array, convert it to a string.
			if ( 'font-variation-settings' === $key && is_array( $value ) ) {
				$value = self::compile_variations( $value );
			}

			if ( ! empty( $value ) ) {
				$css .= "$key:$value;";
			}
		}

		return $css;
	}

	/**
	 * Compiles registered webfonts into @font-face CSS.
	 *
	 * @param array $registered_webfonts Validated webfonts.
	 * @return string The CSS, or an empty string when there are no webfonts.
	 */
	private static function get_css_from_webfonts( $registered_webfonts ) {
		$css = '';

		foreach ( $registered_webfonts as $webfont ) {
			// Order the webfont's `src` items to optimize for browser support.
			$webfont = self::order_src( $webfont );

			// Build the @font-face CSS for this webfont.
			$css .= '@font-face{' . self::build_font_face_css( $webfont ) . '}';
		}

		return $css;
	}

	/**
	 * Get the @font-face CSS for all webfonts declared in theme.json.
	 *
	 * @return string|false The CSS, or false when there are none.
	 */
	public static function get_wp_theme_json_webfonts_css() {

		$styles = self::get_css_from_webfonts( self::get_registered_webfonts_from_theme_json() );

		if ( '' === $styles ) {
			return false;
		}

		return $styles;
	}
}
