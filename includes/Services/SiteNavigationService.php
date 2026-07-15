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
	 * Maximum number of items (pages + category links) in the generated primary nav.
	 */
	const MAX_NAV_ITEMS = 5;

	/**
	 * Known policy page slugs (en + common localized defaults from sitegen).
	 *
	 * @var list<string>
	 */
	private const POLICY_PAGE_SLUGS = array(
		'shipping',
		'envios',
		'livraison',
		'returns-refunds',
		'devoluciones',
		'retours',
		'faq',
		'preguntas-frecuentes',
		'privacy-terms',
		'privacidad-terminos',
		'confidentialite-conditions',
		'privacy',
		'terms',
		'refund-and-returns-policy',
	);

	/**
	 * Setup the site navigation menu from client-created pages.
	 *
	 * @param string $site_type Site type from discovery (e.g. ecommerce, business).
	 * @param array  $pages     Pages from publish ctx.createdPages: id, title, link, slug.
	 * @return bool True if the navigation menu was setup, false otherwise.
	 */
	public function setup_site_nav_menu( string $site_type, array $pages ): bool {
		$page_items = $this->get_site_navigation_items( $site_type, $pages );

		// Category links and the role-ordered cap are a blog-only feature, gated on
		// the site type alone. Other types keep their full page menu in document
		// order — even when they ship posts (e.g. a sitekit with includes_articles);
		// generated categories alone do not make a site a blog.
		if ( 'blog' === strtolower( $site_type ) ) {
			$nav_items = $this->cap_nav_items( $page_items, $this->get_category_navigation_items() );
		} else {
			$nav_items = $page_items;
		}

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

			update_post_meta( $navigation->posts[0]->ID, PostTypeService::META_ONBOARDING_GENERATED, '1' );

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

		update_post_meta( $navigation_id, PostTypeService::META_ONBOARDING_GENERATED, '1' );

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
			if ( self::is_policy_nav_page( $page ) ) {
				continue;
			}

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
				'is_front'      => ! empty( $page['is_front_page'] ),
				'is_contact'    => ! empty( $page['is_contact_page'] ),
				'block_grammar' => self::get_nav_link_block_grammar( $id, $title, $link ),
			);
		}

		if ( 'ecommerce' !== strtolower( $site_type ) ) {
			return $nav_items;
		}

		EcommerceSiteTypeService::setup_woo_pages();
		EcommerceSiteTypeService::ensure_wishlist_page();
		EcommerceSiteTypeService::ensure_refund_returns_page_published();

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
			if ( empty( $page['is_front_page'] ) ) {
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

		if ( 1 === $insert_at ) {
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
		}

		array_splice( $nav_items, $insert_at, 0, array( $shop_item ) );

		return $nav_items;
	}

	/**
	 * Compose the primary nav from page + category items, capped at MAX_NAV_ITEMS
	 * and ordered by role: front page → category links → other pages → contact.
	 * Truncation drops from the end, so contact is shed first and the category
	 * links (a blog's primary IA) are preserved.
	 *
	 * @param array $page_items     Page navigation items (each with is_front/is_contact).
	 * @param array $category_items Category navigation items.
	 * @return array
	 */
	private function cap_nav_items( array $page_items, array $category_items ): array {
		$page_items     = array_values( $page_items );
		$category_items = array_values( $category_items );

		$front   = array();
		$contact = array();
		$other   = array();

		foreach ( $page_items as $item ) {
			if ( ! empty( $item['is_front'] ) && empty( $front ) ) {
				$front[] = $item;
			} elseif ( ! empty( $item['is_contact'] ) ) {
				$contact[] = $item;
			} else {
				$other[] = $item;
			}
		}

		// No front page flagged: treat the first page as home.
		if ( empty( $front ) && ! empty( $other ) ) {
			$front[] = array_shift( $other );
		}

		$ordered = array_merge( $front, $category_items, $other, $contact );

		return array_slice( $ordered, 0, self::MAX_NAV_ITEMS );
	}

	/**
	 * Build taxonomy nav items for the top 3 onboarding-generated category archives,
	 * most-populated first. Non-blog sites have no such terms, so they yield none.
	 *
	 * @return array Navigation items with block_grammar.
	 */
	private function get_category_navigation_items(): array {
		$terms = get_terms(
			array(
				'taxonomy'   => 'category',
				'hide_empty' => false,
				'orderby'    => 'count',
				'order'      => 'DESC',
				'number'     => 3,
				'meta_query' => array(
					array(
						'key'   => PostTypeService::META_ONBOARDING_GENERATED,
						'value' => '1',
					),
				),
			)
		);

		if ( is_wp_error( $terms ) || empty( $terms ) ) {
			return array();
		}

		$items = array();
		foreach ( $terms as $term ) {
			$link = get_term_link( $term );
			if ( is_wp_error( $link ) || ! $link ) {
				continue;
			}

			$items[] = array(
				'term_id'       => (int) $term->term_id,
				'title'         => $term->name,
				'permalink'     => $link,
				'block_grammar' => self::get_nav_taxonomy_link_block_grammar( (int) $term->term_id, $term->name, $link ),
			);
		}

		return $items;
	}

	/**
	 * Get the navigation link block grammar for a category archive (taxonomy term).
	 *
	 * @param int    $term_id Category term ID.
	 * @param string $label   Link label.
	 * @param string $url     Category archive URL.
	 * @return string Block markup.
	 */
	public static function get_nav_taxonomy_link_block_grammar( int $term_id, string $label, string $url ): string {
		$id    = (int) $term_id;
		$label = sanitize_text_field( $label );
		$url   = esc_url_raw( $url );

		return sprintf(
			'<!-- wp:navigation-link {"label":"%s","type":"category","id":%d,"url":"%s","kind":"taxonomy"} /-->',
			$label,
			$id,
			$url
		);
	}

	/**
	 * Whether a page is a policy/support page that belongs in the footer only.
	 *
	 * Contact pages are always kept in the header nav.
	 *
	 * @param array $page Publish page payload.
	 * @return bool
	 */
	public static function is_policy_nav_page( array $page ): bool {
		if ( ! empty( $page['is_contact_page'] ) ) {
			return false;
		}

		$slug = strtolower( trim( (string) ( $page['slug'] ?? '' ), '/' ) );

		return in_array( $slug, self::POLICY_PAGE_SLUGS, true );
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
