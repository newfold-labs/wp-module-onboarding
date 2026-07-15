<?php
/**
 * Tests for the site navigation service.
 *
 * @package NewfoldLabs\WP\Module\Onboarding
 */

namespace NewfoldLabs\WP\Module\Onboarding;

use NewfoldLabs\WP\Module\Onboarding\Services\SiteNavigationService;
use NewfoldLabs\WP\Module\Onboarding\Services\SiteTypes\CommonSiteTypeService;

/**
 * SiteNavigationService wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Onboarding\Services\SiteNavigationService
 */
class SiteNavigationServiceWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Invoke a private method on a SiteNavigationService instance.
	 *
	 * @param string $method Method name.
	 * @param array  $args   Arguments.
	 * @return mixed
	 */
	private function invoke_private( string $method, array $args = array() ) {
		$reflection = new \ReflectionMethod( SiteNavigationService::class, $method );
		$reflection->setAccessible( true );
		return $reflection->invokeArgs( new SiteNavigationService(), $args );
	}

	/**
	 * The taxonomy link grammar carries the category label, id, url and kind.
	 *
	 * @return void
	 */
	public function test_taxonomy_link_block_grammar() {
		$grammar = SiteNavigationService::get_nav_taxonomy_link_block_grammar(
			42,
			'Tech News',
			'http://example.org/category/tech-news/'
		);

		$this->assertStringContainsString( '"label":"Tech News"', $grammar );
		$this->assertStringContainsString( '"type":"category"', $grammar );
		$this->assertStringContainsString( '"id":42', $grammar );
		$this->assertStringContainsString( '"kind":"taxonomy"', $grammar );
		$this->assertStringContainsString( 'category/tech-news', $grammar );
	}

	/**
	 * Only onboarding-generated categories surface as nav items.
	 *
	 * @return void
	 */
	public function test_category_navigation_items_only_includes_generated() {
		CommonSiteTypeService::create_blog_category( 'News' );
		CommonSiteTypeService::create_blog_category( 'Reviews' );
		self::factory()->category->create( array( 'name' => 'Plain' ) );

		$items  = $this->invoke_private( 'get_category_navigation_items' );
		$titles = wp_list_pluck( $items, 'title' );

		$this->assertCount( 2, $items );
		$this->assertContains( 'News', $titles );
		$this->assertContains( 'Reviews', $titles );
		$this->assertNotContains( 'Plain', $titles );
	}

	/**
	 * The nav is ordered front -> categories -> other pages -> contact, capped at five.
	 *
	 * @return void
	 */
	public function test_cap_nav_items_orders_by_role_and_caps() {
		$page_items     = array(
			array(
				'title'    => 'Home',
				'is_front' => true,
			),
			array( 'title' => 'About' ),
			array( 'title' => 'Services' ),
			array( 'title' => 'Blog' ),
			array(
				'title'      => 'Contact',
				'is_contact' => true,
			),
		);
		$category_items = array(
			array( 'title' => 'News' ),
			array( 'title' => 'Reviews' ),
		);

		$result = $this->invoke_private( 'cap_nav_items', array( $page_items, $category_items ) );

		$this->assertSame(
			array( 'Home', 'News', 'Reviews', 'About', 'Services' ),
			wp_list_pluck( $result, 'title' )
		);
	}

	/**
	 * When no page is flagged as the front page, the first page is treated as home.
	 *
	 * @return void
	 */
	public function test_cap_nav_items_falls_back_to_first_page() {
		$result = $this->invoke_private(
			'cap_nav_items',
			array(
				array( array( 'title' => 'About' ), array( 'title' => 'Work' ) ),
				array(),
			)
		);

		$titles = wp_list_pluck( $result, 'title' );
		$this->assertSame( 'About', $titles[0] );
	}

	/**
	 * Setting up the nav menu creates a wp_navigation post with link grammar.
	 *
	 * @return void
	 */
	public function test_setup_site_nav_menu_creates_navigation_post() {
		$pages = array(
			array(
				'id'            => (int) self::factory()->post->create( array( 'post_type' => 'page' ) ),
				'title'         => 'Home',
				'link'          => 'http://example.org/',
				'slug'          => 'home',
				'is_front_page' => true,
			),
			array(
				'id'              => (int) self::factory()->post->create( array( 'post_type' => 'page' ) ),
				'title'           => 'Contact',
				'link'            => 'http://example.org/contact/',
				'slug'            => 'contact',
				'is_contact_page' => true,
			),
		);

		$result = ( new SiteNavigationService() )->setup_site_nav_menu( 'blog', $pages );

		$this->assertTrue( $result );
		$nav = get_posts(
			array(
				'post_type'   => 'wp_navigation',
				'numberposts' => 1,
			)
		);
		$this->assertNotEmpty( $nav );
		$this->assertStringContainsString( 'wp:navigation-link', $nav[0]->post_content );
	}

	/**
	 * A site with generated categories gets taxonomy links injected into the nav.
	 *
	 * @return void
	 */
	public function test_setup_site_nav_menu_injects_category_links_when_categories_exist() {
		CommonSiteTypeService::create_blog_category( 'News' );
		$pages = array(
			array(
				'id'            => (int) self::factory()->post->create( array( 'post_type' => 'page' ) ),
				'title'         => 'Home',
				'link'          => 'http://example.org/',
				'slug'          => 'home',
				'is_front_page' => true,
			),
		);

		( new SiteNavigationService() )->setup_site_nav_menu( 'blog', $pages );

		$nav = get_posts(
			array(
				'post_type'   => 'wp_navigation',
				'numberposts' => 1,
			)
		);
		$this->assertNotEmpty( $nav );
		$this->assertStringContainsString( '"kind":"taxonomy"', $nav[0]->post_content );
	}

	/**
	 * A non-blog site keeps its full, uncapped page menu and gets no category links,
	 * even when it generated categories (e.g. a sitekit with includes_articles).
	 *
	 * @return void
	 */
	public function test_setup_site_nav_menu_excludes_category_links_for_non_blog() {
		CommonSiteTypeService::create_blog_category( 'News' );
		$pages = array();
		foreach ( array( 'Home', 'About', 'Services', 'Work', 'Team', 'Contact' ) as $title ) {
			$slug    = strtolower( $title );
			$pages[] = array(
				'id'    => (int) self::factory()->post->create( array( 'post_type' => 'page' ) ),
				'title' => $title,
				'link'  => 'http://example.org/' . $slug . '/',
				'slug'  => $slug,
			);
		}

		( new SiteNavigationService() )->setup_site_nav_menu( 'business', $pages );

		$nav = get_posts(
			array(
				'post_type'   => 'wp_navigation',
				'numberposts' => 1,
			)
		);
		$this->assertNotEmpty( $nav );
		$this->assertSame( 6, substr_count( $nav[0]->post_content, 'wp:navigation-link' ) );
		$this->assertStringNotContainsString( '"kind":"taxonomy"', $nav[0]->post_content );
	}

	/**
	 * Ecommerce nav excludes policy/support pages but keeps contact.
	 *
	 * @return void
	 */
	public function test_setup_site_nav_menu_excludes_policy_pages_for_ecommerce() {
		$pages = array(
			array(
				'id'            => (int) self::factory()->post->create( array( 'post_type' => 'page' ) ),
				'title'         => 'Home',
				'link'          => 'http://example.org/',
				'slug'          => 'home',
				'is_front_page' => true,
			),
			array(
				'id'    => (int) self::factory()->post->create( array( 'post_type' => 'page' ) ),
				'title' => 'About',
				'link'  => 'http://example.org/about/',
				'slug'  => 'about',
			),
			array(
				'id'              => (int) self::factory()->post->create( array( 'post_type' => 'page' ) ),
				'title'           => 'Contact',
				'link'            => 'http://example.org/contact/',
				'slug'            => 'contact',
				'is_contact_page' => true,
			),
			array(
				'id'    => (int) self::factory()->post->create( array( 'post_type' => 'page' ) ),
				'title' => 'Shipping',
				'link'  => 'http://example.org/shipping/',
				'slug'  => 'shipping',
			),
			array(
				'id'    => (int) self::factory()->post->create( array( 'post_type' => 'page' ) ),
				'title' => 'FAQ',
				'link'  => 'http://example.org/faq/',
				'slug'  => 'faq',
			),
		);

		( new SiteNavigationService() )->setup_site_nav_menu( 'ecommerce', $pages );

		$nav = get_posts(
			array(
				'post_type'   => 'wp_navigation',
				'numberposts' => 1,
			)
		);
		$this->assertNotEmpty( $nav );
		$this->assertStringContainsString( '"label":"Contact"', $nav[0]->post_content );
		$this->assertStringNotContainsString( '"label":"Shipping"', $nav[0]->post_content );
		$this->assertStringNotContainsString( '"label":"FAQ"', $nav[0]->post_content );
	}

	/**
	 * Policy page detection keeps contact and flags support pages.
	 *
	 * @return void
	 */
	public function test_is_policy_nav_page() {
		$this->assertTrue(
			SiteNavigationService::is_policy_nav_page(
				array(
					'slug' => 'shipping',
				)
			)
		);
		$this->assertFalse(
			SiteNavigationService::is_policy_nav_page(
				array(
					'slug'            => 'contact',
					'is_contact_page' => true,
				)
			)
		);
		$this->assertFalse(
			SiteNavigationService::is_policy_nav_page(
				array(
					'slug' => 'about',
				)
			)
		);
	}
}
