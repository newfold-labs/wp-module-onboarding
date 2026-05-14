<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Types\Color;
use NewfoldLabs\WP\Module\Onboarding\Types\ColorPalette;

/**
 * Types ColorPalette wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Types\ColorPalette
 */
class ColorPaletteWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	private function color( string $slug = 'accent_1', string $name = 'Accent 1', string $hex = '#F27121' ): Color {
		return new Color( $name, $slug, $hex );
	}

	public function test_constructor_with_slug_only() {
		$palette = new ColorPalette( 'palette_1' );
		$this->assertSame( 'palette_1', $palette->get_slug() );
		$this->assertTrue( $palette->is_empty() );
		$this->assertSame( 0, $palette->count() );
	}

	public function test_constructor_trims_slug() {
		$palette = new ColorPalette( '  palette_1  ' );
		$this->assertSame( 'palette_1', $palette->get_slug() );
	}

	public function test_constructor_with_colors() {
		$palette = new ColorPalette( 'palette_1', array( $this->color(), $this->color( 'accent_2', 'Accent 2', '#8A4D76' ) ) );
		$this->assertFalse( $palette->is_empty() );
		$this->assertSame( 2, $palette->count() );
	}

	public function test_constructor_throws_when_slug_empty() {
		$this->expectException( \InvalidArgumentException::class );
		new ColorPalette( '   ' );
	}

	public function test_constructor_throws_when_palette_contains_non_color() {
		$this->expectException( \InvalidArgumentException::class );
		new ColorPalette( 'palette_1', array( 'not a color' ) );
	}

	public function test_add_color_returns_self_and_appends() {
		$palette = new ColorPalette( 'palette_1' );
		$ret     = $palette->add_color( $this->color() );
		$this->assertSame( $palette, $ret );
		$this->assertSame( 1, $palette->count() );
	}

	public function test_add_colors_appends_all() {
		$palette = new ColorPalette( 'palette_1' );
		$palette->add_colors(
			array(
				$this->color(),
				$this->color( 'accent_2', 'Accent 2', '#8A4D76' ),
			)
		);
		$this->assertSame( 2, $palette->count() );
	}

	public function test_add_colors_throws_on_invalid_item() {
		$palette = new ColorPalette( 'palette_1' );
		$this->expectException( \InvalidArgumentException::class );
		$palette->add_colors( array( $this->color(), 'bad' ) );
	}

	public function test_get_color_by_slug_returns_match_or_null() {
		$palette = new ColorPalette( 'palette_1', array( $this->color() ) );
		$this->assertInstanceOf( Color::class, $palette->get_color_by_slug( 'accent_1' ) );
		$this->assertNull( $palette->get_color_by_slug( 'missing' ) );
	}

	public function test_remove_color_by_slug_removes_and_reindexes() {
		$palette = new ColorPalette(
			'palette_1',
			array(
				$this->color(),
				$this->color( 'accent_2', 'Accent 2', '#8A4D76' ),
			)
		);
		$palette->remove_color_by_slug( 'accent_1' );
		$this->assertSame( 1, $palette->count() );
		$this->assertSame( array( 0 ), array_keys( $palette->get_palette() ) );
		$this->assertNull( $palette->get_color_by_slug( 'accent_1' ) );
	}

	public function test_to_array_serializes_palette() {
		$palette = new ColorPalette( 'palette_1', array( $this->color() ) );
		$this->assertSame(
			array(
				'slug'    => 'palette_1',
				'palette' => array(
					array(
						'name'  => 'Accent 1',
						'slug'  => 'accent_1',
						'color' => '#F27121',
					),
				),
			),
			$palette->to_array()
		);
	}

	public function test_from_array_round_trip() {
		$data    = array(
			'slug'    => 'palette_1',
			'palette' => array(
				array(
					'name'  => 'Accent 1',
					'slug'  => 'accent_1',
					'color' => '#F27121',
				),
			),
		);
		$palette = ColorPalette::from_array( $data );
		$this->assertSame( 'palette_1', $palette->get_slug() );
		$this->assertSame( 1, $palette->count() );
		$this->assertSame( $data, $palette->to_array() );
	}

	public function test_from_array_without_palette_key_creates_empty() {
		$palette = ColorPalette::from_array( array( 'slug' => 'palette_1' ) );
		$this->assertTrue( $palette->is_empty() );
	}

	public function test_from_array_throws_when_slug_missing() {
		$this->expectException( \InvalidArgumentException::class );
		ColorPalette::from_array( array( 'palette' => array() ) );
	}
}
