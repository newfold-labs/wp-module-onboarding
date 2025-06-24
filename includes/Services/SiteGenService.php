<?php

namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\Data\Services\SitePagesService;
use NewfoldLabs\WP\Module\Onboarding\Data\Services\SiteGenService as LegacySiteGenService;

class SiteGenService {

	/**
	 * The Redux input object.
	 *
	 * @var array|null
	 */
	private ?array $input_data = null;
	
	/**
	 * The Redux sitegen object.
	 *
	 * @var array|null
	 */
	private ?array $sitegen_data = null;

	public function __construct() {
		$this->input_data   = ReduxStateService::get( 'input' );
		$this->sitegen_data = ReduxStateService::get( 'sitegen' );
	}

	/**
	 * Publish the selected sitegen homepage.
	 *
	 * @param string $selected_sitegen_homepage The selected sitegen homepage to publish.
	 * @return int|\WP_Error
	 */
	public function publish_homepage( string $selected_sitegen_homepage ): int | \WP_Error {
		// Validate we have the selected homepage.
		if (
			! $this->sitegen_data ||
			! is_array( $this->sitegen_data['homepages'] ) ||
			! isset( $this->sitegen_data['homepages'][ $selected_sitegen_homepage ] )
		) {
			return new \WP_Error(
				'sitegen_homepage_publish_validation_error',
				'Error validating selected homepage.',
			);
		}

		$selected_homepage = $this->sitegen_data['homepages'][ $selected_sitegen_homepage ];
		// Always set the default homepage to a page.
		$show_pages_on_front = \get_option( Options::get_option_name( 'show_on_front', false ) );
		if ( 'posts' === $show_pages_on_front ) {
			\update_option( Options::get_option_name( 'show_on_front', false ), 'page' );
		}

		$content = $selected_homepage['content'];
		$title   = __( 'Home', 'wp-module-onboarding' );

		$post_id = SitePagesService::publish_page(
			$title,
			$content,
			true,
			array(
				'nf_dc_page' => 'home',
			)
		);
		if ( 0 === $post_id || is_wp_error( $post_id ) ) {
			return new \WP_Error(
				'sitegen_homepage_publish_error',
				'Error publishing homepage.',
			);
		}

		// Add the homepage to the site navigation.
		$this->add_page_to_navigation( $post_id, $title, get_permalink( $post_id ) );

		// Set the homepage as the front page.
		\update_option( Options::get_option_name( 'page_on_front', false ), $post_id );

		return $post_id;
	}

	/**
	 * Get AI generated page title for a given slug (if found in sitemap).
	 *
	 * @param string $slug The slug of the page to get the title for.
	 * @return string|false The page title, or false if not found.
	 */
	public function get_sitemap_page_title( string $slug ): string|false {
		$prompt = $this->get_prompt();
		$locale = $this->get_locale();
		if ( ! $prompt || ! $locale ) {
			return false;
		}

		$sitemap = LegacySiteGenService::instantiate_site_meta( $prompt, 'sitemap', $locale );
		if ( ! is_wp_error( $sitemap ) ) {
			foreach ( $sitemap as $page ) {
				if ( $slug === $page['slug'] ) {
					$title = $page['title'];
					return $title;
				}
			}
		}

		return false;
	}

	/**
	 * Add a page to the site navigation.
	 *
	 * @param int $post_id The ID of the page to add to the navigation.
	 * @param string $page_title The title of the page.
	 * @param string $permalink The permalink of the page.
	 */
	public function add_page_to_navigation( int $post_id, string $page_title, string $permalink ): void {
		$id    = $post_id;
		$label = $page_title;
		$url   = $permalink;

		$nav_link_grammar = "<!-- wp:navigation-link {\"label\":\"$label\",\"type\":\"page\",\"id\":$id,\"url\":\"$url\",\"kind\":\"post-type\"} /-->";

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
	 * Get the prompt entered during Onboarding.
	 *
	 * @return string|false
	 */
	public function get_prompt(): string|false {
		return ! empty( $this->input_data['prompt'] ) ? $this->input_data['prompt'] : false;
	}

	/**
	 * Get the locale entered during Onboarding.
	 *
	 * @return string
	 */
	public function get_locale(): string {
		return ! empty( $this->input_data['locale'] ) ? $this->input_data['locale'] : 'en_US';
	}
}
