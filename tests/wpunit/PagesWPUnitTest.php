<?php

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Types\Page;
use NewfoldLabs\WP\Module\Onboarding\Types\Pages;

/**
 * Types Pages wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Types\Pages
 */
class PagesWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Page.
	 *
	 * @return void
	 */
	private function page( string $slug = 'home', string $title = 'Home', bool $front = false ): Page {
		return new Page( $title, $slug, 'content for ' . $slug, $front );
	}

	/**
	 * Empty constructor.
	 *
	 * @return void
	 */
	public function test_empty_constructor() {
		$pages = new Pages();
		$this->assertTrue( $pages->is_empty() );
		$this->assertSame( 0, $pages->count() );
		$this->assertSame( array(), $pages->get_pages() );
	}

	/**
	 * Constructor with pages.
	 *
	 * @return void
	 */
	public function test_constructor_with_pages() {
		$pages = new Pages( array( $this->page(), $this->page( 'about', 'About' ) ) );
		$this->assertFalse( $pages->is_empty() );
		$this->assertSame( 2, $pages->count() );
	}

	/**
	 * Constructor throws on non page item.
	 *
	 * @return void
	 */
	public function test_constructor_throws_on_non_page_item() {
		$this->expectException( \InvalidArgumentException::class );
		new Pages( array( 'not a page' ) );
	}

	/**
	 * Constructor throws on duplicate slug.
	 *
	 * @return void
	 */
	public function test_constructor_throws_on_duplicate_slug() {
		$this->expectException( \InvalidArgumentException::class );
		new Pages( array( $this->page(), $this->page() ) );
	}

	/**
	 * Add page.
	 *
	 * @return void
	 */
	public function test_add_page() {
		$pages = new Pages();
		$ret   = $pages->add_page( $this->page() );
		$this->assertSame( $pages, $ret );
		$this->assertSame( 1, $pages->count() );
	}

	/**
	 * Add page throws on duplicate.
	 *
	 * @return void
	 */
	public function test_add_page_throws_on_duplicate() {
		$pages = new Pages( array( $this->page() ) );
		$this->expectException( \InvalidArgumentException::class );
		$pages->add_page( $this->page() );
	}

	/**
	 * Add pages atomic on duplicate in batch.
	 *
	 * @return void
	 */
	public function test_add_pages_atomic_on_duplicate_in_batch() {
		$pages = new Pages();
		try {
			$pages->add_pages( array( $this->page(), $this->page() ) );
			$this->fail( 'Expected exception not thrown' );
		} catch ( \InvalidArgumentException $e ) {
			$this->assertTrue( $pages->is_empty(), 'No pages should be added when batch contains duplicates' );
		}
	}

	/**
	 * Add pages throws on invalid item.
	 *
	 * @return void
	 */
	public function test_add_pages_throws_on_invalid_item() {
		$pages = new Pages();
		$this->expectException( \InvalidArgumentException::class );
		$pages->add_pages( array( 'not a page' ) );
	}

	/**
	 * Add pages throws on existing slug.
	 *
	 * @return void
	 */
	public function test_add_pages_throws_on_existing_slug() {
		$pages = new Pages( array( $this->page() ) );
		$this->expectException( \InvalidArgumentException::class );
		$pages->add_pages( array( $this->page( 'home', 'Home Again' ) ) );
	}

	/**
	 * Remove page by slug removes and reindexes.
	 *
	 * @return void
	 */
	public function test_remove_page_by_slug_removes_and_reindexes() {
		$pages = new Pages( array( $this->page(), $this->page( 'about', 'About' ) ) );
		$pages->remove_page_by_slug( 'home' );
		$this->assertSame( 1, $pages->count() );
		$this->assertSame( array( 0 ), array_keys( $pages->get_pages() ) );
	}

	/**
	 * Has page and get by slug.
	 *
	 * @return void
	 */
	public function test_has_page_and_get_by_slug() {
		$pages = new Pages( array( $this->page() ) );
		$this->assertTrue( $pages->has_page( 'home' ) );
		$this->assertFalse( $pages->has_page( 'missing' ) );
		$this->assertInstanceOf( Page::class, $pages->get_page_by_slug( 'home' ) );
		$this->assertNull( $pages->get_page_by_slug( 'missing' ) );
	}

	/**
	 * Get page content by slug.
	 *
	 * @return void
	 */
	public function test_get_page_content_by_slug() {
		$pages = new Pages( array( $this->page() ) );
		$this->assertSame( 'content for home', $pages->get_page_content_by_slug( 'home' ) );
		$this->assertNull( $pages->get_page_content_by_slug( 'missing' ) );
	}

	/**
	 * Get front page via is front page flag.
	 *
	 * @return void
	 */
	public function test_get_front_page_via_is_front_page_flag() {
		$pages = new Pages(
			array(
				$this->page( 'about', 'About' ),
				$this->page( 'landing', 'Landing', true ),
			)
		);
		$this->assertSame( 'landing', $pages->get_front_page()->get_slug() );
	}

	/**
	 * Get front page falls back to home slug.
	 *
	 * @return void
	 */
	public function test_get_front_page_falls_back_to_home_slug() {
		$pages = new Pages( array( $this->page( 'about', 'About' ), $this->page() ) );
		$this->assertSame( 'home', $pages->get_front_page()->get_slug() );
	}

	/**
	 * Get front page throws when no match.
	 *
	 * @return void
	 */
	public function test_get_front_page_throws_when_no_match() {
		$pages = new Pages( array( $this->page( 'about', 'About' ) ) );
		$this->expectException( \RuntimeException::class );
		$pages->get_front_page();
	}

	/**
	 * To array returns list.
	 *
	 * @return void
	 */
	public function test_to_array_returns_list() {
		$pages = new Pages( array( $this->page() ) );
		$this->assertSame(
			array(
				array(
					'title'         => 'Home',
					'slug'          => 'home',
					'content'       => 'content for home',
					'is_front_page' => false,
				),
			),
			$pages->to_array()
		);
	}

	/**
	 * To associative array returns slug to content map.
	 *
	 * @return void
	 */
	public function test_to_associative_array_returns_slug_to_content_map() {
		$pages = new Pages( array( $this->page(), $this->page( 'about', 'About' ) ) );
		$this->assertSame(
			array(
				'home'  => 'content for home',
				'about' => 'content for about',
			),
			$pages->to_associative_array()
		);
	}
}
