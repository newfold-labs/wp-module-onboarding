<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Types\Page;

/**
 * Types Page wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Types\Page
 */
class PageWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Constructor and getters.
	 *
	 * @return void
	 */
	public function test_constructor_and_getters() {
		$page = new Page( 'Home', 'home', '<!-- wp:paragraph --><p>Hi</p><!-- /wp:paragraph -->' );
		$this->assertSame( 'Home', $page->get_title() );
		$this->assertSame( 'home', $page->get_slug() );
		$this->assertSame( '<!-- wp:paragraph --><p>Hi</p><!-- /wp:paragraph -->', $page->get_content() );
		$this->assertFalse( $page->is_front_page() );
	}

	/**
	 * Constructor trims whitespace.
	 *
	 * @return void
	 */
	public function test_constructor_trims_whitespace() {
		$page = new Page( '  Home  ', '  home  ', '  content  ' );
		$this->assertSame( 'Home', $page->get_title() );
		$this->assertSame( 'home', $page->get_slug() );
		$this->assertSame( 'content', $page->get_content() );
	}

	/**
	 * Is front page when set.
	 *
	 * @return void
	 */
	public function test_is_front_page_when_set() {
		$page = new Page( 'Home', 'home', 'content', true );
		$this->assertTrue( $page->is_front_page() );
	}

	/**
	 * Constructor throws when title empty.
	 *
	 * @return void
	 */
	public function test_constructor_throws_when_title_empty() {
		$this->expectException( \InvalidArgumentException::class );
		new Page( '  ', 'home', 'content' );
	}

	/**
	 * Constructor throws when slug empty.
	 *
	 * @return void
	 */
	public function test_constructor_throws_when_slug_empty() {
		$this->expectException( \InvalidArgumentException::class );
		new Page( 'Home', '   ', 'content' );
	}

	/**
	 * Constructor throws when content empty.
	 *
	 * @return void
	 */
	public function test_constructor_throws_when_content_empty() {
		$this->expectException( \InvalidArgumentException::class );
		new Page( 'Home', 'home', '   ' );
	}

	/**
	 * To array.
	 *
	 * @return void
	 */
	public function test_to_array() {
		$page = new Page( 'Home', 'home', 'content', true );
		$this->assertSame(
			array(
				'title'         => 'Home',
				'slug'          => 'home',
				'content'       => 'content',
				'is_front_page' => true,
			),
			$page->to_array()
		);
	}

	/**
	 * From array round trip.
	 *
	 * @return void
	 */
	public function test_from_array_round_trip() {
		$data = array(
			'title'         => 'Home',
			'slug'          => 'home',
			'content'       => 'content',
			'is_front_page' => true,
		);
		$page = Page::from_array( $data );
		$this->assertSame( $data, $page->to_array() );
	}

	/**
	 * From array defaults is front page to false.
	 *
	 * @return void
	 */
	public function test_from_array_defaults_is_front_page_to_false() {
		$page = Page::from_array(
			array(
				'title'   => 'About',
				'slug'    => 'about',
				'content' => 'about content',
			)
		);
		$this->assertFalse( $page->is_front_page() );
	}

	/**
	 * From array throws when keys missing.
	 *
	 * @return void
	 */
	public function test_from_array_throws_when_keys_missing() {
		$this->expectException( \InvalidArgumentException::class );
		Page::from_array(
			array(
				'title' => 'Home',
				'slug'  => 'home',
			)
		);
	}
}
