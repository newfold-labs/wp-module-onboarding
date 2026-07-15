<?php
/**
 * Tests for the common site type service.
 *
 * @package NewfoldLabs\WP\Module\Onboarding
 */

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Services\PostTypeService;
use NewfoldLabs\WP\Module\Onboarding\Services\SiteTypes\CommonSiteTypeService;

/**
 * CommonSiteTypeService wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Services\SiteTypes\CommonSiteTypeService
 */
class CommonSiteTypeServiceWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Build one category-bound homepage section for fixtures.
	 *
	 * @return string Block markup.
	 */
	private function section(): string {
		return '<!-- wp:columns --><div class="wp-block-columns"><!-- wp:column --><div class="wp-block-column">'
			. '<!-- wp:heading --><h2 class="wp-block-heading">Latest</h2><!-- /wp:heading -->'
			. '<!-- wp:query {"queryId":1,"query":{"inherit":true},"metadata":{"categoryBinding":true}} -->'
			. '<div class="wp-block-query"><!-- wp:post-template --><!-- wp:post-title /--><!-- /wp:post-template --></div>'
			. '<!-- /wp:query -->'
			. '<!-- wp:paragraph --><p><a href="#">More posts</a></p><!-- /wp:paragraph -->'
			. '</div><!-- /wp:column --></div><!-- /wp:columns -->';
	}

	/**
	 * Creating a blog category stamps the onboarding-generated term meta.
	 *
	 * @return void
	 */
	public function test_create_blog_category_stamps_meta() {
		$term_id = CommonSiteTypeService::create_blog_category( 'News' );

		$this->assertGreaterThan( 0, $term_id );
		$this->assertSame(
			'1',
			get_term_meta( $term_id, PostTypeService::META_ONBOARDING_GENERATED, true )
		);
	}

	/**
	 * Publishing articles creates the posts and their categories, and resolves the
	 * category-bound section to the most-covered category.
	 *
	 * @return void
	 */
	public function test_publish_articles_creates_content_and_resolves_section() {
		$page_id  = (int) self::factory()->post->create(
			array(
				'post_type'    => 'page',
				'post_content' => $this->section(),
			)
		);
		$articles = array(
			array(
				'title'      => 'Post A',
				'excerpt'    => 'A',
				'content'    => '<!-- wp:paragraph --><p>A</p><!-- /wp:paragraph -->',
				'categories' => array( 'News' ),
			),
			array(
				'title'      => 'Post B',
				'excerpt'    => 'B',
				'content'    => '<!-- wp:paragraph --><p>B</p><!-- /wp:paragraph -->',
				'categories' => array( 'News', 'Reviews' ),
			),
		);

		$created = CommonSiteTypeService::publish_articles( $articles );

		$this->assertCount( 2, $created );

		$news = get_term_by( 'slug', 'news', 'category' );
		$this->assertInstanceOf( \WP_Term::class, $news );
		$this->assertSame(
			'1',
			get_term_meta( $news->term_id, PostTypeService::META_ONBOARDING_GENERATED, true )
		);

		// News covers two articles and Reviews one, so the section resolves to News.
		$content = get_post( $page_id )->post_content;
		$this->assertStringContainsString( '"taxQuery"', $content );
		$this->assertStringContainsString( '>News</h2>', $content );
	}
}
