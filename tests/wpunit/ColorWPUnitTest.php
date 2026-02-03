<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Types\Color;

/**
 * Types Color wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Types\Color
 */
class ColorWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Color constructor and getters work.
	 *
	 * @return void
	 */
	public function test_color_constructor_and_getters() {
		$color = new Color( 'Accent 1', 'accent_1', '#F27121' );
		$this->assertSame( 'Accent 1', $color->get_name() );
		$this->assertSame( 'accent_1', $color->get_slug() );
		$this->assertSame( '#F27121', $color->get_color() );
	}

	/**
	 * to_array returns expected keys.
	 *
	 * @return void
	 */
	public function test_color_to_array() {
		$color = new Color( 'Accent 1', 'accent_1', '#F27121' );
		$arr  = $color->to_array();
		$this->assertSame( array( 'name' => 'Accent 1', 'slug' => 'accent_1', 'color' => '#F27121' ), $arr );
	}

	/**
	 * from_array creates equivalent Color.
	 *
	 * @return void
	 */
	public function test_color_from_array() {
		$data  = array( 'name' => 'Accent 1', 'slug' => 'accent_1', 'color' => '#F27121' );
		$color = Color::from_array( $data );
		$this->assertInstanceOf( Color::class, $color );
		$this->assertSame( 'Accent 1', $color->get_name() );
		$this->assertSame( 'accent_1', $color->get_slug() );
		$this->assertSame( '#F27121', $color->get_color() );
	}

	/**
	 * from_array throws when name is missing.
	 *
	 * @return void
	 */
	public function test_color_from_array_throws_when_keys_missing() {
		$this->expectException( \InvalidArgumentException::class );
		$this->expectExceptionMessage( 'Array must contain name, slug, and color keys' );
		Color::from_array( array( 'slug' => 'accent_1', 'color' => '#F27121' ) );
	}

	/**
	 * Constructor trims whitespace.
	 *
	 * @return void
	 */
	public function test_color_trims_whitespace() {
		$color = new Color( '  Accent 1  ', '  accent_1  ', '  #F27121  ' );
		$this->assertSame( 'Accent 1', $color->get_name() );
		$this->assertSame( 'accent_1', $color->get_slug() );
		$this->assertSame( '#F27121', $color->get_color() );
	}

	/**
	 * Constructor throws when name is empty.
	 *
	 * @return void
	 */
	public function test_color_throws_when_name_empty() {
		$this->expectException( \InvalidArgumentException::class );
		$this->expectExceptionMessage( 'Name cannot be empty' );
		new Color( '  ', 'accent_1', '#F27121' );
	}
}
