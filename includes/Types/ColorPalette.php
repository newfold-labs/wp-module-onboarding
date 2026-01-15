<?php

namespace NewfoldLabs\WP\Module\Onboarding\Types;

/**
 * ColorPalette data type class.
 *
 * Represents a collection of Color objects with a unique slug identifier.
 *
 * @package NewfoldLabs\WP\Module\Onboarding\Types
 *
 * @example
 * slug: palette_1
 * palette: [
 *   { name: "Accent 1", slug: "accent_1", color: "#F27121" },
 *   { name: "Accent 2", slug: "accent_2", color: "#8A4D76" }
 * ]
 */
class ColorPalette {

	/**
	 * Color palette slug.
	 *
	 * @var string
	 */
	private $slug;

	/**
	 * Array of Color objects.
	 *
	 * @var array
	 */
	private $palette;

	/**
	 * ColorPalette constructor.
	 *
	 * @param string $slug Color palette slug.
	 * @param array  $palette Array of Color objects (optional).
	 * @throws \InvalidArgumentException When parameters are invalid.
	 */
	public function __construct( string $slug, array $palette = array() ) {
		$this->validate_parameters( $slug, $palette );
		$this->set_properties( $slug, $palette );
	}

	/**
	 * Validate constructor parameters.
	 *
	 * @param string $slug Color palette slug.
	 * @param array  $palette Array of Color objects.
	 * @throws \InvalidArgumentException When parameters are invalid.
	 */
	private function validate_parameters( string $slug, array $palette ): void {
		if ( empty( trim( $slug ) ) ) {
			throw new \InvalidArgumentException( 'Slug cannot be empty' );
		}

		// Validate that all palette items are Color objects.
		foreach ( $palette as $index => $color ) {
			if ( ! $color instanceof Color ) {
				throw new \InvalidArgumentException( "Palette item at index {$index} must be a Color object" );
			}
		}
	}

	/**
	 * Set properties from parameters.
	 *
	 * @param string $slug Color palette slug.
	 * @param array  $palette Array of Color objects.
	 */
	private function set_properties( string $slug, array $palette ): void {
		$this->slug    = trim( $slug );
		$this->palette = $palette;
	}

	/**
	 * Add a Color object to the palette.
	 *
	 * @param Color $color Color object to add.
	 * @return ColorPalette
	 */
	public function add_color( Color $color ): ColorPalette {
		$this->palette[] = $color;
		return $this;
	}

	/**
	 * Add multiple Color objects to the palette.
	 *
	 * @param array $colors Array of Color objects.
	 * @return ColorPalette
	 */
	public function add_colors( array $colors ): ColorPalette {
		foreach ( $colors as $color ) {
			if ( ! $color instanceof Color ) {
				throw new \InvalidArgumentException( 'All items must be Color objects' );
			}
			$this->palette[] = $color;
		}
		return $this;
	}

	/**
	 * Remove a Color object from the palette by slug.
	 *
	 * @param string $color_slug The color slug to remove.
	 * @return ColorPalette
	 */
	public function remove_color_by_slug( string $color_slug ): ColorPalette {
		foreach ( $this->palette as $index => $color ) {
			if ( $color->get_slug() === $color_slug ) {
				unset( $this->palette[ $index ] );
				break;
			}
		}
		// Re-index array after removal.
		$this->palette = array_values( $this->palette );
		return $this;
	}

	/**
	 * Get slug.
	 *
	 * @return string
	 */
	public function get_slug(): string {
		return $this->slug;
	}

	/**
	 * Get palette.
	 *
	 * @return array
	 */
	public function get_palette(): array {
		return $this->palette;
	}

	/**
	 * Get color by slug.
	 *
	 * @param string $color_slug The color slug to find.
	 * @return Color|null
	 */
	public function get_color_by_slug( string $color_slug ) {
		foreach ( $this->palette as $color ) {
			if ( $color->get_slug() === $color_slug ) {
				return $color;
			}
		}
		return null;
	}

	/**
	 * Check if palette is empty.
	 *
	 * @return bool
	 */
	public function is_empty(): bool {
		return empty( $this->palette );
	}

	/**
	 * Get the number of colors in the palette.
	 *
	 * @return int
	 */
	public function count(): int {
		return count( $this->palette );
	}

	/**
	 * Convert to array.
	 *
	 * @return array
	 */
	public function to_array(): array {
		$palette_array = array();
		foreach ( $this->palette as $color ) {
			$palette_array[] = $color->to_array();
		}

		return array(
			'slug'    => $this->slug,
			'palette' => $palette_array,
		);
	}

	/**
	 * Create from array (static factory method).
	 *
	 * @param array $data ColorPalette data array.
	 * @return ColorPalette
	 */
	public static function from_array( array $data ): ColorPalette {
		if ( ! isset( $data['slug'] ) ) {
			throw new \InvalidArgumentException( 'Array must contain slug key' );
		}

		$palette = new self( $data['slug'] );

		if ( isset( $data['palette'] ) && is_array( $data['palette'] ) ) {
			foreach ( $data['palette'] as $color_data ) {
				$palette->add_color( Color::from_array( $color_data ) );
			}
		}

		return $palette;
	}
} 