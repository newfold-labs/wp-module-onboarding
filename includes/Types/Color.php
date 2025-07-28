<?php

namespace NewfoldLabs\WP\Module\Onboarding\Types;

/**
 * Color data type class.
 *
 * Represents a WordPress compatible color with name, slug, and hex color value.
 *
 * @package NewfoldLabs\WP\Module\Onboarding\Types
 *
 * @example
 * name: Accent 1
 * slug: accent_1
 * color: #F27121
 */
class Color {

	/**
	 * Color name.
	 *
	 * @var string
	 */
	private $name;

	/**
	 * Color slug.
	 *
	 * @var string
	 */
	private $slug;

	/**
	 * Color hex value.
	 *
	 * @var string
	 */
	private $color;

	/**
	 * Color constructor.
	 *
	 * @param string $name Color name - e.g. "Accent 1".
	 * @param string $slug Color slug - e.g. "accent_1".
	 * @param string $color Color hex value - e.g. "#F27121".
	 * @throws \InvalidArgumentException When parameters are invalid.
	 */
	public function __construct( string $name, string $slug, string $color ) {
		$this->validate_parameters( $name, $slug, $color );
		$this->set_properties( $name, $slug, $color );
	}

	/**
	 * Validate constructor parameters.
	 *
	 * @param string $name Color name.
	 * @param string $slug Color slug.
	 * @param string $color Color hex value.
	 * @throws \InvalidArgumentException When parameters are invalid.
	 */
	private function validate_parameters( string $name, string $slug, string $color ): void {
		if ( empty( trim( $name ) ) ) {
			throw new \InvalidArgumentException( 'Name cannot be empty' );
		}

		if ( empty( trim( $slug ) ) ) {
			throw new \InvalidArgumentException( 'Slug cannot be empty' );
		}

		if ( empty( trim( $color ) ) ) {
			throw new \InvalidArgumentException( 'Color cannot be empty' );
		}
	}

	/**
	 * Set properties from parameters.
	 *
	 * @param string $name Color name.
	 * @param string $slug Color slug.
	 * @param string $color Color hex value.
	 */
	private function set_properties( string $name, string $slug, string $color ): void {
		$this->name  = trim( $name );
		$this->slug  = trim( $slug );
		$this->color = trim( $color );
	}

	/**
	 * Get name.
	 *
	 * @return string
	 */
	public function get_name(): string {
		return $this->name;
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
	 * Get color.
	 *
	 * @return string
	 */
	public function get_color(): string {
		return $this->color;
	}

	/**
	 * Convert to array.
	 *
	 * @return array
	 */
	public function to_array(): array {
		return array(
			'name'  => $this->name,
			'slug'  => $this->slug,
			'color' => $this->color,
		);
	}

	/**
	 * Create from array (static factory method).
	 *
	 * @param array $data Color data array.
	 * @return Color
	 */
	public static function from_array( array $data ): Color {
		if ( ! isset( $data['name'] ) || ! isset( $data['slug'] ) || ! isset( $data['color'] ) ) {
			throw new \InvalidArgumentException( 'Array must contain name, slug, and color keys' );
		}

		return new self( $data['name'], $data['slug'], $data['color'] );
	}
} 