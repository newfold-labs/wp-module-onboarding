<?php

namespace NewfoldLabs\WP\Module\Onboarding\Services;

class GlobalStylesService {

	/**
	 * Decoded global styles post content object.
	 *
	 * @var array
	 */
	protected array $global_styles;

	/**
	 * Active global styles post ID.
	 *
	 * @var int
	 */
	protected int $global_styles_id;

	/**
	 * Global Styles Service constructor.
	 *
	 * @return GlobalStylesService
	 */
	public function __construct() {
		$user_global_styles = self::get_user_global_styles();
		if ( $user_global_styles ) {
			$this->global_styles    = json_decode( $user_global_styles['post_content'], true );
			$this->global_styles_id = $user_global_styles['ID'];
		}
		return $this;
	}

	/**
	 * Set the color palette.
	 *
	 * @param array $color_palette The color palette to set.
	 * @return array The color palette on success, \WP_Error on failure.
	 */
	public function set_color_palette( array $color_palette ): array|\WP_Error {
		try {
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
	 * Get the user global styles.
	 *
	 * @return array The user global styles.
	 */
	public function get_user_global_styles(): array {
		return \WP_Theme_JSON_Resolver::get_user_data_from_wp_global_styles( wp_get_theme() );
	}

	/**
	 * Update global styles.
	 *
	 * @param int|null   $post_id The global styles post id to update. If not provided, the active global styles will be updated.
	 * @param array|null $post_content array of global styles to inject into the post content. If not provided, the active global styles will be updated.
	 * @return int|\WP_Error The updated post id on success, \WP_Error on failure.
	 */
	protected function update_active_global_styles( ?array $post_content = null, ?int $post_id = null ): int|\WP_Error {
		$post_id      = $post_id ?? $this->global_styles_id;
		$post_content = $post_content ?? $this->global_styles;

		$result = wp_update_post( [
			'ID'           => $post_id,
			'post_content' => wp_json_encode( $post_content ),
		], true );
		if ( is_wp_error( $result ) ) {
			return $result;
		}

		wp_clean_theme_json_cache();

		return $result;
	}
}
// $sitegen_state = \get_option( Options::get_option_name( 'state_sitegen' ) );
