<?php
/**
 * Site Navigation Service
 *
 * @package NewfoldLabs\WP\Module\Onboarding\Services
 */

namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Services\SiteGenService as LegacySiteGenService;
use NewfoldLabs\WP\Module\Onboarding\Services\SiteTypes\EcommerceSiteTypeService;

/**
 * Site Navigation Service Class
 *
 * Handles the setup and management of site navigation menus.
 */
class SiteNavigationService extends SiteGenService {

	/**
	 * Constructor.
	 */
	public function __construct() {
		parent::__construct();
	}

	/**
	 * Get the site navigation menu items.
	 *
	 * @param string|null $site_type The site type.
	 * @return array Array of navigation items. Each item contains:
	 *               {
	 *                   @type int    $post_id       The ID of the page
	 *                   @type string $title         The title of the page
	 *                   @type string $permalink     The permalink of the page
	 *                   @type string $block_grammar The navigation link block grammar
	 *               }
	 */
	public function get_site_navigation_items( $site_type = null ): array {
		if ( ! $site_type ) {
			$site_type = $this->get_site_type();
		}

		$sitemap = LegacySiteGenService::instantiate_site_meta(
			$this->get_prompt(),
			'sitemap',
			$site_type,
			$this->get_locale()
		);

		$nav_items = array();

		// Add home page.
		$home_page = array_filter( $sitemap, function( $page ) {
			return '/' === $page['path'];
		} );
		if ( ! empty( $home_page ) ) {
			$title = $home_page[0]['title'];
			$nav_items[] = array(
				'post_id'       => 0,
				'title'         => $title,
				'permalink'     => get_site_url(),
				'block_grammar' => self::get_nav_link_block_grammar( 0, $title, get_site_url() ),
			);
		}

		// Add WooCommerce shop page (ecommerce site type).
		if ( 'ecommerce' === $site_type ) {
			// Setup WooCommerce pages.
			EcommerceSiteTypeService::setup_woo_pages();

			// Get the WooCommerce shop page info.
			$woo_shop_page = EcommerceSiteTypeService::get_woo_shop_page_info();
			if ( ! empty( $woo_shop_page ) ) {
				$nav_items[] = array(
					'post_id'       => $woo_shop_page['id'],
					'title'         => $woo_shop_page['title'],
					'permalink'     => $woo_shop_page['permalink'],
					'block_grammar' => self::get_nav_link_block_grammar( $woo_shop_page['id'], $woo_shop_page['title'], $woo_shop_page['permalink'] ),
				);
			}
		}

		// Add other published pages to the navigation.
		foreach ( $sitemap as $page ) {
			// Validate the page is published.
			$path    = $page['path'];
			$page_id = get_page_by_path( $path );
			if ( ! $page_id ) {
				continue;
			}

			$nav_items[] = array(
				'post_id'       => $page_id->ID,
				'title'         => $page['title'],
				'permalink'     => get_permalink( $page_id ),
				'block_grammar' => self::get_nav_link_block_grammar( $page_id->ID, $page['title'], get_permalink( $page_id ) ),
			);
		}

		return $nav_items;
	}

	/**
	 * Setup the site navigation menu.
	 *
	 * @param string|null $site_type The site type.
	 * @return bool True if the navigation menu was setup, false otherwise.
	 */
	public function setup_site_nav_menu( $site_type = '' ): bool {
		if ( ! $site_type ) {
			$site_type = $this->get_site_type();
		}

		$nav_items = $this->get_site_navigation_items( $site_type );
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
			// If we already have a navigation menu, update it.
			wp_update_post(
				array(
					'ID'           => $navigation->posts[0]->ID,
					'post_content' => $navigation_links_grammar,
				)
			);
		} else {
			// Create a new navigation menu.
			wp_insert_post(
				array(
					'post_title'   => 'Navigation',
					'post_content' => $navigation_links_grammar,
					'post_type'    => 'wp_navigation',
					'post_status'  => 'publish',
				)
			);
		}
		$navigation = new \WP_Query(
			array(
				'name'      => 'navigation',
				'post_type' => 'wp_navigation',
			)
		);

		return true;
	}

	/**
	 * Add a page to the site navigation.
	 *
	 * @param int    $post_id     The ID of the page to add to the navigation.
	 * @param string $page_title  The title of the page.
	 * @param string $permalink   The permalink of the page.
	 */
	public function add_page_to_navigation( int $post_id, string $page_title, string $permalink ): void {
		$id    = (int) $post_id;
		$label = sanitize_text_field( $page_title );
		$url   = esc_url_raw( $permalink );

		$nav_link_grammar = self::get_nav_link_block_grammar( $id, $label, $url );

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
					'post_content' => $nav_link_grammar . $navigation->posts[0]->post_content,
				)
			);
		}
	}

	/**
	 * Get the navigation link block grammar.
	 *
	 * @param int    $post_id     The ID of the page to add to the navigation.
	 * @param string $page_title  The title of the page.
	 * @param string $permalink   The permalink of the page.
	 * @return string The navigation link block grammar.
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
