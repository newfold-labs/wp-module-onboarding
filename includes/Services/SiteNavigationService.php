<?php
/**
 * Site Navigation Service
 *
 * @package NewfoldLabs\WP\Module\Onboarding\Services
 */

namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Services\SiteTypes\EcommerceSiteTypeService;

/**
 * Handles setup and management of site navigation menus during onboarding publish.
 */
class SiteNavigationService {

	/**
	 * Setup the site navigation menu from client-created pages.
	 *
	 * @param string $site_type Site type from discovery (e.g. ecommerce, business).
	 * @param array  $pages     Pages from publish ctx.createdPages: id, title, link, slug.
	 * @return bool True if the navigation menu was setup, false otherwise.
	 */
	public function setup_site_nav_menu( string $site_type, array $pages ): bool {
		$nav_items = $this->get_site_navigation_items( $site_type, $pages );
		if ( empty( $nav_items ) ) {
			return false;
		}

		$navigation_links_grammar = '';
		foreach ( $nav_items as $nav_item ) {
			$navigation_links_grammar .= $nav_item['block_grammar'];
		}

		$navigation = new \WP_Query(
			array(
				'name'      => 'navigation',
				'post_type' => 'wp_navigation',
			)
		);

		if ( ! empty( $navigation->posts ) ) {
			wp_update_post(
				array(
					'ID'           => $navigation->posts[0]->ID,
					'post_content' => $navigation_links_grammar,
				)
			);

			return true;
		}

		$navigation_id = wp_insert_post(
			array(
				'post_title'   => 'Navigation',
				'post_content' => $navigation_links_grammar,
				'post_type'    => 'wp_navigation',
				'post_status'  => 'publish',
			)
		);

		if ( is_wp_error( $navigation_id ) || ! $navigation_id ) {
			return false;
		}

		update_post_meta( $navigation_id, 'nfd_onboarding_generated', '1' );

		return true;
	}

	/**
	 * Build navigation items from publish pages, inserting Shop for ecommerce sites.
	 *
	 * @param string $site_type Site type from discovery.
	 * @param array  $pages     Client-created pages.
	 * @return array Navigation items with block_grammar.
	 */
	private function get_site_navigation_items( string $site_type, array $pages ): array {
		$nav_items = array();

		foreach ( $pages as $page ) {
			$id    = (int) ( $page['id'] ?? 0 );
			$title = $page['title'] ?? '';
			$link  = $page['link'] ?? '';

			if ( ! $title || ! $link ) {
				continue;
			}

			$nav_items[] = array(
				'post_id'       => $id,
				'title'         => $title,
				'permalink'     => $link,
				'block_grammar' => self::get_nav_link_block_grammar( $id, $title, $link ),
			);
		}

		if ( 'ecommerce' !== strtolower( $site_type ) ) {
			return $nav_items;
		}

		EcommerceSiteTypeService::setup_woo_pages();

		$woo_shop_page = EcommerceSiteTypeService::get_woo_shop_page_info();
		if ( empty( $woo_shop_page ) ) {
			return $nav_items;
		}

		$shop_item = array(
			'post_id'       => (int) $woo_shop_page['id'],
			'title'         => $woo_shop_page['title'],
			'permalink'     => $woo_shop_page['permalink'],
			'block_grammar' => self::get_nav_link_block_grammar(
				(int) $woo_shop_page['id'],
				$woo_shop_page['title'],
				$woo_shop_page['permalink']
			),
		);

		return $this->insert_shop_after_homepage( $nav_items, $shop_item, $pages );
	}

	/**
	 * Insert the Shop link after the homepage entry, deduplicating by page ID.
	 *
	 * @param array $nav_items Existing navigation items.
	 * @param array $shop_item Shop navigation item.
	 * @param array $pages     Original pages array (for home slug lookup).
	 * @return array
	 */
	private function insert_shop_after_homepage( array $nav_items, array $shop_item, array $pages ): array {
		foreach ( $nav_items as $item ) {
			if ( $item['post_id'] === $shop_item['post_id'] ) {
				return $nav_items;
			}
		}

		$insert_at = 1;

		foreach ( $pages as $page ) {
			if ( ( $page['slug'] ?? '' ) !== 'home' ) {
				continue;
			}

			$page_id = (int) ( $page['id'] ?? 0 );
			foreach ( $nav_items as $index => $item ) {
				if ( $item['post_id'] === $page_id ) {
					$insert_at = $index + 1;
					break 2;
				}
			}
		}

		array_splice( $nav_items, $insert_at, 0, array( $shop_item ) );

		return $nav_items;
	}

	/**
	 * Get the navigation link block grammar.
	 *
	 * @param int    $post_id    Page ID.
	 * @param string $page_title Link label.
	 * @param string $permalink  Page URL.
	 * @return string Block markup.
	 */
	public static function get_nav_link_block_grammar( int $post_id, string $page_title, string $permalink ): string {
		$id    = (int) $post_id;
		$label = sanitize_text_field( $page_title );
		$url   = esc_url_raw( $permalink );

		return sprintf(
			'<!-- wp:navigation-link {"label":"%s","type":"page","id":%d,"url":"%s","kind":"post-type"} /-->',
			$label,
			$id,
			$url
		);
	}
}
