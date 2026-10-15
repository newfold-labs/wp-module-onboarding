<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Types\Color;
use NewfoldLabs\WP\Module\Onboarding\Types\ColorPalette;
use PHPUnit\Framework\TestCase;

/**
 * PHPUnit tests for Types\ColorPalette (no WordPress required).
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Types\ColorPalette
 */
class ColorPaletteTest extends TestCase {

	/**
	 * Build a Color for fixtures.
	 *
	 * @param string $slug Color slug.
	 * @param string $name Color name.
	 * @param string $hex  Hex value.
	 * @return Color
	 */
	private function color( string $slug = 'accent_1', string $name = 'Accent 1', string $hex = '#F27121' ): Color {
		return new Color( $name, $slug, $hex );
	}

	/**
	 * Empty palette with trimmed slug.
	 *
	 * @covers ::__construct
	 * @covers ::get_slug
	 * @covers ::is_empty
	 * @covers ::count
	 * @return void
	 */
	public function test_constructor_trims_slug_and_starts_empty() {
		$palette = new ColorPalette( '  palette_1  ' );

		$this->assertSame( 'palette_1', $palette->get_slug() );
		$this->assertTrue( $palette->is_empty() );
		$this->assertSame( 0, $palette->count() );
	}

	/**
	 * Constructor accepts initial colors.
	 *
	 * @covers ::__construct
	 * @return void
	 */
	public function test_constructor_with_colors() {
		$palette = new ColorPalette( 'p', array( $this->color(), $this->color( 'accent_2', 'Accent 2', '#8A4D76' ) ) );

		$this->assertFalse( $palette->is_empty() );
		$this->assertSame( 2, $palette->count() );
	}

	/**
	 * Empty slugs are rejected.
	 *
	 * @covers ::__construct
	 * @return void
	 */
	public function test_constructor_throws_for_empty_slug() {
		$this->expectException( \InvalidArgumentException::class );
		$this->expectExceptionMessage( 'Slug cannot be empty' );
		new ColorPalette( '   ' );
	}

	/**
	 * Non-Color items are rejected with their index.
	 *
	 * @covers ::__construct
	 * @return void
	 */
	public function test_constructor_throws_for_non_color_item() {
		$this->expectException( \InvalidArgumentException::class );
		$this->expectExceptionMessage( 'Palette item at index 1 must be a Color object' );
		new ColorPalette( 'p', array( $this->color(), 'nope' ) );
	}

	/**
	 * Adding colors is chainable.
	 *
	 * @covers ::add_color
	 * @covers ::add_colors
	 * @return void
	 */
	public function test_add_color_and_add_colors_chain() {
		$palette = new ColorPalette( 'p' );

		$result = $palette
			->add_color( $this->color() )
			->add_colors( array( $this->color( 'accent_2', 'Accent 2', '#8A4D76' ) ) );

		$this->assertSame( $palette, $result );
		$this->assertSame( 2, $palette->count() );
	}

	/**
	 * Invalid items passed to add_colors are rejected.
	 *
	 * @covers ::add_colors
	 * @return void
	 */
	public function test_add_colors_throws_for_non_color_item() {
		$this->expectException( \InvalidArgumentException::class );
		$this->expectExceptionMessage( 'All items must be Color objects' );
		( new ColorPalette( 'p' ) )->add_colors( array( 'bad' ) );
	}

	/**
	 * Lookup by slug.
	 *
	 * @covers ::get_color_by_slug
	 * @return void
	 */
	public function test_get_color_by_slug() {
		$palette = new ColorPalette( 'p', array( $this->color() ) );

		$this->assertSame( '#F27121', $palette->get_color_by_slug( 'accent_1' )->get_color() );
		$this->assertNull( $palette->get_color_by_slug( 'missing' ) );
	}

	/**
	 * Removing by slug reindexes the palette.
	 *
	 * @covers ::remove_color_by_slug
	 * @covers ::get_palette
	 * @return void
	 */
	public function test_remove_color_by_slug_reindexes() {
		$palette = new ColorPalette( 'p', array( $this->color(), $this->color( 'accent_2', 'Accent 2', '#8A4D76' ) ) );

		$result = $palette->remove_color_by_slug( 'accent_1' );

		$this->assertSame( $palette, $result );
		$this->assertSame( array( 0 ), array_keys( $palette->get_palette() ) );
		$this->assertSame( 'accent_2', $palette->get_palette()[0]->get_slug() );
	}

	/**
	 * Serialization round trip.
	 *
	 * @covers ::to_array
	 * @covers ::from_array
	 * @return void
	 */
	public function test_to_array_and_from_array_round_trip() {
		$data = array(
			'slug'    => 'p',
			'palette' => array(
				array(
					'name'  => 'Accent 1',
					'slug'  => 'accent_1',
					'color' => '#F27121',
				),
			),
		);

		$palette = ColorPalette::from_array( $data );

		$this->assertSame( $data, $palette->to_array() );
	}

	/**
	 * A missing palette key yields an empty palette.
	 *
	 * @covers ::from_array
	 * @return void
	 */
	public function test_from_array_without_palette_is_empty() {
		$this->assertTrue( ColorPalette::from_array( array( 'slug' => 'p' ) )->is_empty() );
	}

	/**
	 * A missing slug key is rejected.
	 *
	 * @covers ::from_array
	 * @return void
	 */
	public function test_from_array_throws_without_slug() {
		$this->expectException( \InvalidArgumentException::class );
		$this->expectExceptionMessage( 'Array must contain slug key' );
		ColorPalette::from_array( array( 'palette' => array() ) );
	}
}
