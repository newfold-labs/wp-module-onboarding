<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Types\Color;
use NewfoldLabs\WP\Module\Onboarding\Types\ColorPalette;
use NewfoldLabs\WP\Module\Onboarding\Types\Page;
use NewfoldLabs\WP\Module\Onboarding\Types\Pages;
use NewfoldLabs\WP\Module\Onboarding\Types\Sitekit;

/**
 * Types Sitekit wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Types\Sitekit
 */
class SitekitWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Pages with home.
	 *
	 * @return void
	 */
	private function pages_with_home( bool $front = true ): Pages {
		return new Pages(
			array(
				new Page( 'Home', 'home', 'home content', $front ),
				new Page( 'About', 'about', 'about content' ),
			)
		);
	}

	/**
	 * Palette.
	 *
	 * @return void
	 */
	private function palette(): ColorPalette {
		return new ColorPalette( 'palette_1', array( new Color( 'Accent 1', 'accent_1', '#F27121' ) ) );
	}

	/**
	 * Constructor and getters.
	 *
	 * @return void
	 */
	public function test_constructor_and_getters() {
		$pages   = $this->pages_with_home();
		$sitekit = new Sitekit( 'kit_1', 'My Kit', '<header/>', '<footer/>', $pages );
		$this->assertSame( 'kit_1', $sitekit->get_slug() );
		$this->assertSame( 'My Kit', $sitekit->get_title() );
		$this->assertSame( '<header/>', $sitekit->get_header() );
		$this->assertSame( '<footer/>', $sitekit->get_footer() );
		$this->assertSame( $pages, $sitekit->get_pages() );
		$this->assertNull( $sitekit->get_color_palette() );
		$this->assertNull( $sitekit->get_global_styles() );
		$this->assertNull( $sitekit->get_font_pair() );
	}

	/**
	 * Constructor trims strings.
	 *
	 * @return void
	 */
	public function test_constructor_trims_strings() {
		$sitekit = new Sitekit( '  kit_1  ', '  My Kit  ', '  <header/>  ', '  <footer/>  ', $this->pages_with_home() );
		$this->assertSame( 'kit_1', $sitekit->get_slug() );
		$this->assertSame( 'My Kit', $sitekit->get_title() );
		$this->assertSame( '<header/>', $sitekit->get_header() );
		$this->assertSame( '<footer/>', $sitekit->get_footer() );
	}

	/**
	 * Constructor with optional data.
	 *
	 * @return void
	 */
	public function test_constructor_with_optional_data() {
		$sitekit = new Sitekit(
			'kit_1',
			'My Kit',
			'<header/>',
			'<footer/>',
			$this->pages_with_home(),
			$this->palette(),
			array( 'typography' => array() ),
			array( 'heading' => 'Inter' )
		);
		$this->assertInstanceOf( ColorPalette::class, $sitekit->get_color_palette() );
		$this->assertSame( array( 'typography' => array() ), $sitekit->get_global_styles() );
		$this->assertSame( array( 'heading' => 'Inter' ), $sitekit->get_font_pair() );
	}

	/**
	 * Constructor throws when slug empty.
	 *
	 * @return void
	 */
	public function test_constructor_throws_when_slug_empty() {
		$this->expectException( \InvalidArgumentException::class );
		new Sitekit( '  ', 'My Kit', '<header/>', '<footer/>', $this->pages_with_home() );
	}

	/**
	 * Constructor throws when title empty.
	 *
	 * @return void
	 */
	public function test_constructor_throws_when_title_empty() {
		$this->expectException( \InvalidArgumentException::class );
		new Sitekit( 'kit_1', '  ', '<header/>', '<footer/>', $this->pages_with_home() );
	}

	/**
	 * Constructor throws when header empty.
	 *
	 * @return void
	 */
	public function test_constructor_throws_when_header_empty() {
		$this->expectException( \InvalidArgumentException::class );
		new Sitekit( 'kit_1', 'My Kit', '  ', '<footer/>', $this->pages_with_home() );
	}

	/**
	 * Constructor throws when footer empty.
	 *
	 * @return void
	 */
	public function test_constructor_throws_when_footer_empty() {
		$this->expectException( \InvalidArgumentException::class );
		new Sitekit( 'kit_1', 'My Kit', '<header/>', '  ', $this->pages_with_home() );
	}

	/**
	 * Constructor throws when pages missing home.
	 *
	 * @return void
	 */
	public function test_constructor_throws_when_pages_missing_home() {
		$pages = new Pages( array( new Page( 'About', 'about', 'about content' ) ) );
		$this->expectException( \InvalidArgumentException::class );
		new Sitekit( 'kit_1', 'My Kit', '<header/>', '<footer/>', $pages );
	}

	/**
	 * Get page content delegates to pages.
	 *
	 * @return void
	 */
	public function test_get_page_content_delegates_to_pages() {
		$sitekit = new Sitekit( 'kit_1', 'My Kit', '<header/>', '<footer/>', $this->pages_with_home() );
		$this->assertSame( 'home content', $sitekit->get_page_content( 'home' ) );
		$this->assertNull( $sitekit->get_page_content( 'missing' ) );
	}

	/**
	 * Onboarding preview data uses front page content.
	 *
	 * @return void
	 */
	public function test_onboarding_preview_data_uses_front_page_content() {
		$sitekit = new Sitekit(
			'kit_1',
			'My Kit',
			'<header/>',
			'<footer/>',
			$this->pages_with_home(),
			$this->palette()
		);
		$data = $sitekit->onboarding_preview_data();
		$this->assertSame( 'home content', $data['content'] );
		$this->assertSame( 'kit_1', $data['slug'] );
		$this->assertIsArray( $data['color'] );
	}

	/**
	 * Onboarding preview data color null when no palette.
	 *
	 * @return void
	 */
	public function test_onboarding_preview_data_color_null_when_no_palette() {
		$sitekit = new Sitekit( 'kit_1', 'My Kit', '<header/>', '<footer/>', $this->pages_with_home() );
		$this->assertNull( $sitekit->onboarding_preview_data()['color'] );
	}

	/**
	 * To array omits optional keys when unset.
	 *
	 * @return void
	 */
	public function test_to_array_omits_optional_keys_when_unset() {
		$sitekit = new Sitekit( 'kit_1', 'My Kit', '<header/>', '<footer/>', $this->pages_with_home() );
		$data    = $sitekit->to_array();
		$this->assertArrayNotHasKey( 'color_palette', $data );
		$this->assertArrayNotHasKey( 'global_styles', $data );
		$this->assertArrayNotHasKey( 'font_pair', $data );
		$this->assertSame( 'kit_1', $data['slug'] );
		$this->assertIsArray( $data['pages'] );
		$this->assertArrayHasKey( 'home', $data['pages'] );
	}

	/**
	 * To array includes optional keys when set.
	 *
	 * @return void
	 */
	public function test_to_array_includes_optional_keys_when_set() {
		$sitekit = new Sitekit(
			'kit_1',
			'My Kit',
			'<header/>',
			'<footer/>',
			$this->pages_with_home(),
			$this->palette(),
			array( 'typography' => array() ),
			array( 'heading' => 'Inter' )
		);
		$data = $sitekit->to_array();
		$this->assertArrayHasKey( 'color_palette', $data );
		$this->assertArrayHasKey( 'global_styles', $data );
		$this->assertArrayHasKey( 'font_pair', $data );
	}
}
