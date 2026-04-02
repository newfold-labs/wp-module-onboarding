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
	protected ?array $global_styles = null;

	/**
	 * Active global styles post ID.
	 *
	 * @var int|null
	 */
	protected ?int $global_styles_id = 0;

	/**
	 * Global Styles Service constructor.
	 *
	 * @return GlobalStylesService
	 */
	public function __construct() {
		// Ensure the global styles post exists (creates it on fresh installs).
		$post_id = \WP_Theme_JSON_Resolver::get_user_global_styles_post_id();
		if ( $post_id ) {
			$this->global_styles_id = $post_id;
			$post                   = get_post( $post_id );
			$this->global_styles    = $post ? ( json_decode( $post->post_content, true ) ?? array() ) : array();
		}
		return $this;
	}

	/**
	 * Set the color palette.
	 *
	 * @param array $color_palette The color palette to set.
	 * @return array The color palette on success, \WP_Error on failure.
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
	 * @return true|\WP_Error True on success, WP_Error on failure.
	 */
	public function set_global_styles( array $global_styles ) {
		try {
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
	 * Update global styles post.
	 *
	 * @param int|null   $post_id The global styles post id to update.
	 * @param array|null $post_content array of global styles to inject into the post content.
	 * @return int|\WP_Error The updated post id on success, \WP_Error on failure.
	 */
	protected function update_active_global_styles( ?array $post_content = null, ?int $post_id = null ) {
		$post_id      = $post_id ?? $this->global_styles_id;
		$post_content = $post_content ?? $this->global_styles;

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
