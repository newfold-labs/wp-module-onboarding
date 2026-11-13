<?php

namespace NewfoldLabs\WP\Module\Onboarding\Services;

/**
 * Global Styles Service Class
 *
 * Responsible for setting the global styles and color palette.
 */
class GlobalStylesService {

	/**
	 * Decoded global styles post content object.
	 *
	 * @var array|null
	 */
	protected $global_styles = null;

	/**
	 * Active global styles post ID.
	 *
	 * @var int|null
	 */
	protected $global_styles_id = 0;

	/**
	 * Global Styles Service constructor.
	 */
	public function __construct() {
		// Ensure the global styles post exists (creates it on fresh installs).
		$post_id = \WP_Theme_JSON_Resolver::get_user_global_styles_post_id();
		if ( $post_id ) {
			$this->global_styles_id = $post_id;
			$post                   = get_post( $post_id );
			$this->global_styles    = $post ? ( json_decode( $post->post_content, true ) ?? array() ) : array();
		}
	}

	/**
	 * Set the color palette.
	 *
	 * @param array $color_palette The color palette to set.
	 * @return array|\WP_Error The color palette on success, \WP_Error on failure.
	 * @throws \Exception Caught internally and converted to \WP_Error.
	 */
	public function set_color_palette( array $color_palette ) {
		try {
			if ( null === $this->global_styles || null === $this->global_styles_id ) {
				throw new \Exception( 'Global styles not found. Please ensure a theme with global styles support is active.' );
			}

			$color_palette = self::transform_color_palette( $color_palette );
			if ( empty( $color_palette ) ) {
				throw new \Exception( 'Invalid color palette' );
			}

			// Update the color palette in the global styles.
			$this->global_styles['settings']['color']['palette']['theme'] = $color_palette;

			$result = $this->update_active_global_styles();
			if ( is_wp_error( $result ) ) {
				throw new \Exception( $result->get_error_message() );
			}

			return $color_palette;
		} catch ( \Exception $e ) {
			return new \WP_Error( 'set_color_palette_error', $e->getMessage() );
		}
	}

	/**
	 * Transform color palette object to ensure it is valid.
	 *
	 * @param array $color_palette The color palette to process.
	 * @return array The processed color palette.
	 */
	public static function transform_color_palette( array $color_palette ) {
		$result = array();

		foreach ( $color_palette as $color ) {
			if ( ! isset( $color['slug'] ) || ! isset( $color['color'] ) ) {
				continue;
			}

			$color_slug  = str_replace( '_', '-', $color['slug'] );
			$color_name  = $color['name'] ?? $color_slug;
			$color_value = $color['color'];

			$result[] = array(
				'slug'  => $color_slug,
				'name'  => $color_name,
				'color' => $color_value,
			);
		}

		return $result;
	}

	/**
	 * Set the full global styles from a sitekit.
	 * Writes the incoming data directly into the global styles post.
	 * Everything in the incoming payload is applied as-is — nothing is skipped or filtered.
	 *
	 * @param array $global_styles The global styles to apply.
	 * @return bool|\WP_Error True on success, WP_Error on failure.
	 * @throws \Exception Caught internally and converted to \WP_Error.
	 */
	public function set_global_styles( array $global_styles ) {
		try {
			// Font families are origin-keyed preset lists (custom/theme/default). A plain
			// array_replace_recursive would merge them by index and turn a flat incoming list
			// into numeric keys next to `custom`, which crashes the Site Editor. Merge them
			// separately (by slug, per origin) and also heal any previously corrupted data.
			$existing_fonts = $this->global_styles['settings']['typography']['fontFamilies'] ?? null;
			$font_families  = null;
			if ( isset( $global_styles['settings']['typography']['fontFamilies'] ) ) {
				$font_families = self::merge_font_families(
					$existing_fonts,
					$global_styles['settings']['typography']['fontFamilies']
				);
				unset( $global_styles['settings']['typography']['fontFamilies'] );
			} elseif ( is_array( $existing_fonts ) ) {
				$font_families = self::normalize_font_families( $existing_fonts );
			}

			// Merge each top-level key from the incoming data into the existing global styles.
			foreach ( $global_styles as $key => $value ) {
				if ( is_array( $value ) && is_array( $this->global_styles[ $key ] ?? null ) ) {
					$this->global_styles[ $key ] = array_replace_recursive(
						$this->global_styles[ $key ],
						$value
					);
				} else {
					$this->global_styles[ $key ] = $value;
				}
			}

			if ( null !== $font_families ) {
				$this->global_styles['settings']['typography']['fontFamilies'] = $font_families;
			}

			$result = $this->update_active_global_styles();
			if ( is_wp_error( $result ) ) {
				throw new \Exception( $result->get_error_message() );
			}

			return true;
		} catch ( \Exception $e ) {
			return new \WP_Error( 'set_global_styles_error', $e->getMessage() );
		}
	}

	/**
	 * Origins a typography.fontFamilies preset list can be keyed by.
	 *
	 * @var string[]
	 */
	const FONT_FAMILY_ORIGINS = array( 'default', 'theme', 'custom' );

	/**
	 * Normalize a settings.typography.fontFamilies value to its origin-keyed shape.
	 *
	 * Font presets found under numeric keys (a flat list, or numeric keys left next to an
	 * origin by an earlier bad merge) are moved into the `custom` origin.
	 *
	 * @param mixed $font_families Raw fontFamilies value.
	 * @return array Origin-keyed font families, each origin holding a sequential list.
	 */
	public static function normalize_font_families( $font_families ): array {
		$normalized = array();
		$loose      = array();

		if ( ! is_array( $font_families ) ) {
			return $normalized;
		}

		foreach ( $font_families as $key => $value ) {
			if ( ! is_array( $value ) ) {
				continue;
			}
			if ( in_array( $key, self::FONT_FAMILY_ORIGINS, true ) ) {
				$normalized[ $key ] = array_values( $value );
			} elseif ( is_int( $key ) || ctype_digit( (string) $key ) ) {
				$loose[] = $value;
			}
		}

		if ( ! empty( $loose ) ) {
			$normalized['custom'] = array_merge( $normalized['custom'] ?? array(), $loose );
		}

		return $normalized;
	}

	/**
	 * Merge incoming font families into the existing ones, per origin and by slug.
	 *
	 * A font with the same slug replaces the existing one; new fonts are appended.
	 * A flat incoming list is treated as `custom`.
	 *
	 * @param mixed $existing Existing fontFamilies value.
	 * @param mixed $incoming Incoming fontFamilies value.
	 * @return array Merged, origin-keyed font families.
	 */
	public static function merge_font_families( $existing, $incoming ): array {
		$merged = self::normalize_font_families( $existing );

		foreach ( self::normalize_font_families( $incoming ) as $origin => $fonts ) {
			$list = $merged[ $origin ] ?? array();

			foreach ( $fonts as $font ) {
				$slug  = is_array( $font ) ? ( $font['slug'] ?? null ) : null;
				$index = null;

				if ( null !== $slug ) {
					foreach ( $list as $i => $current ) {
						if ( is_array( $current ) && ( $current['slug'] ?? null ) === $slug ) {
							$index = $i;
							break;
						}
					}
				}

				if ( null === $index ) {
					$list[] = $font;
				} else {
					$list[ $index ] = $font;
				}
			}

			$merged[ $origin ] = array_values( $list );
		}

		return $merged;
	}

	/**
	 * Update global styles post.
	 *
	 * @param array|null $post_content Global styles payload to encode into post content.
	 * @param int|null   $post_id The global styles post ID to update.
	 * @return int|\WP_Error The updated post id on success, \WP_Error on failure.
	 */
	protected function update_active_global_styles( ?array $post_content = null, ?int $post_id = null ) {
		$post_id      = $post_id ?? $this->global_styles_id;
		$post_content = $post_content ?? $this->global_styles;

		if ( is_array( $post_content ) ) {
			$post_content['version']                     = \WP_Theme_JSON::LATEST_SCHEMA;
			$post_content['isGlobalStylesUserThemeJSON'] = true;
		}

		$result = wp_update_post(
			array(
				'ID'           => $post_id,
				'post_content' => wp_slash( wp_json_encode( $post_content ) ),
			),
			true
		);
		if ( is_wp_error( $result ) ) {
			return $result;
		}

		wp_clean_theme_json_cache();

		return $result;
	}
}
