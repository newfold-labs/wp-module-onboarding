<?php
/**
 * Tests for the blog site type service.
 *
 * @package NewfoldLabs\WP\Module\Onboarding
 */

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Services\SiteTypes\BlogSiteTypeService;

/**
 * BlogSiteTypeService wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Services\SiteTypes\BlogSiteTypeService
 */
class BlogSiteTypeServiceWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Build one category-bound section (a columns block holding a categoryBinding
	 * query, a heading, and a "More" link) for fixtures.
	 *
	 * @param string $heading Section heading text.
	 * @return string Block markup.
	 */
	private function section( string $heading ): string {
		return '<!-- wp:columns --><div class="wp-block-columns"><!-- wp:column --><div class="wp-block-column">'
			. '<!-- wp:heading --><h2 class="wp-block-heading">' . $heading . '</h2><!-- /wp:heading -->'
			. '<!-- wp:query {"queryId":1,"query":{"inherit":true},"metadata":{"categoryBinding":true}} -->'
			. '<div class="wp-block-query"><!-- wp:post-template --><!-- wp:post-title /--><!-- /wp:post-template --></div>'
			. '<!-- /wp:query -->'
			. '<!-- wp:paragraph --><p><a href="#">More posts</a></p><!-- /wp:paragraph -->'
			. '</div><!-- /wp:column --></div><!-- /wp:columns -->';
	}

	/**
	 * Create a page with the given block content.
	 *
	 * @param string $content Page block markup.
	 * @return int Page ID.
	 */
	private function page( string $content ): int {
		return (int) self::factory()->post->create(
			array(
				'post_type'    => 'page',
				'post_content' => $content,
			)
		);
	}

	/**
	 * A category-bound section gets a real taxQuery and its heading and "More"
	 * link rewritten to the assigned category.
	 *
	 * @return void
	 */
	public function test_resolve_rewrites_section() {
		$term_id    = (int) wp_insert_term( 'News', 'category' )['term_id'];
		$page_id    = $this->page( $this->section( 'Latest' ) );
		$categories = array(
			array(
				'name'    => 'News',
				'term_id' => $term_id,
				'url'     => 'http://example.org/category/news/',
			),
		);

		BlogSiteTypeService::resolve_category_bound_sections( $categories );

		$content = get_post( $page_id )->post_content;
		$this->assertStringContainsString( '"taxQuery"', $content );
		$this->assertStringContainsString( '"category":[' . $term_id . ']', $content );
		$this->assertStringContainsString( '"inherit":false', $content );
		$this->assertStringContainsString( '>News</h2>', $content );
		$this->assertStringContainsString( 'More News', $content );
		$this->assertStringContainsString( 'http://example.org/category/news/', $content );
	}

	/**
	 * Pages without a categoryBinding marker are left untouched.
	 *
	 * @return void
	 */
	public function test_resolve_skips_pages_without_marker() {
		$page_id = $this->page( '<!-- wp:paragraph --><p>Plain page.</p><!-- /wp:paragraph -->' );
		$before  = get_post( $page_id )->post_content;

		BlogSiteTypeService::resolve_category_bound_sections(
			array(
				array(
					'name'    => 'News',
					'term_id' => 1,
					'url'     => 'http://example.org/category/news/',
				),
			)
		);

		$this->assertSame( $before, get_post( $page_id )->post_content );
	}

	/**
	 * With no categories the resolver returns early and changes nothing.
	 *
	 * @return void
	 */
	public function test_resolve_returns_early_without_categories() {
		$page_id = $this->page( $this->section( 'Latest' ) );
		$before  = get_post( $page_id )->post_content;

		BlogSiteTypeService::resolve_category_bound_sections( array() );

		$this->assertSame( $before, get_post( $page_id )->post_content );
	}

	/**
	 * Sections are resolved on every page, not just the front page.
	 *
	 * @return void
	 */
	public function test_resolve_applies_to_all_pages() {
		$term_id    = (int) wp_insert_term( 'News', 'category' )['term_id'];
		$home_id    = $this->page( $this->section( 'Home feed' ) );
		$about_id   = $this->page( $this->section( 'About feed' ) );
		$categories = array(
			array(
				'name'    => 'News',
				'term_id' => $term_id,
				'url'     => 'http://example.org/category/news/',
			),
		);

		BlogSiteTypeService::resolve_category_bound_sections( $categories );

		$this->assertStringContainsString( '>News</h2>', get_post( $home_id )->post_content );
		$this->assertStringContainsString( '>News</h2>', get_post( $about_id )->post_content );
	}

	/**
	 * Multiple sections on one page get distinct categories in document order.
	 *
	 * @return void
	 */
	public function test_resolve_assigns_categories_in_order() {
		$news_id    = (int) wp_insert_term( 'News', 'category' )['term_id'];
		$reviews_id = (int) wp_insert_term( 'Reviews', 'category' )['term_id'];
		$page_id    = $this->page( $this->section( 'First' ) . $this->section( 'Second' ) );
		$categories = array(
			array(
				'name'    => 'News',
				'term_id' => $news_id,
				'url'     => 'http://example.org/category/news/',
			),
			array(
				'name'    => 'Reviews',
				'term_id' => $reviews_id,
				'url'     => 'http://example.org/category/reviews/',
			),
		);

		BlogSiteTypeService::resolve_category_bound_sections( $categories );

		$content = get_post( $page_id )->post_content;
		$this->assertStringContainsString( '>News</h2>', $content );
		$this->assertStringContainsString( '>Reviews</h2>', $content );
		$this->assertLessThan(
			strpos( $content, '>Reviews</h2>' ),
			strpos( $content, '>News</h2>' ),
			'The first section is assigned the first category.'
		);
	}
}
