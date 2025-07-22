<?php

namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Services\SitePagesService;
use NewfoldLabs\WP\Module\Onboarding\Data\Services\SiteGenService as LegacySiteGenService;
use NewfoldLabs\WP\Module\Onboarding\Services\ThemeGeneratorService;
use NewfoldLabs\WP\Module\Onboarding\Services\ReduxStateService;

/**
 * Class SiteGenService
 *
 * Handles the onboarding SiteGen flow for generating, publishing, and managing AI-generated homepages and related content.
 *
 * This service is designed to work with the onboarding module's Redux state and integrates with other onboarding services.
 *
 * @package NewfoldLabs\WP\Module\Onboarding\Services
 */
class SiteGenService {

	/**
	 * The Redux input object.
	 *
	 * @var array|null
	 */
	private $input_data = null;

	/**
	 * The Redux sitegen object.
	 *
	 * @var array|null
	 */
	private $sitegen_data = null;

	/**
	 * SiteGenService constructor.
	 *
	 * Initializes the service by loading the Redux input and sitegen data from the ReduxStateService.
	 */
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
	public function publish_homepage( string $selected_sitegen_homepage ) {
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
		$content           = $selected_homepage['content'];
		$title             = __( 'Home', 'wp-module-onboarding' );

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

		// Process images immediately in background (non-blocking)
		ThemeGeneratorService::process_homepage_images_immediate_async( $post_id, $content );

		// Add the homepage to the site navigation.
		$this->add_page_to_navigation( $post_id, $title, get_permalink( $post_id ) );

		// Change WordPress reading options to show static page as homepage.
		$wp_reading_homepage_option = get_option( 'show_on_front' );
		if ( 'page' !== $wp_reading_homepage_option ) {
			update_option( 'show_on_front', 'page' );
		}
		// Set the homepage as the front page.
		update_option( 'page_on_front', $post_id );

		return $post_id;
	}

	/**
	 * Get AI generated page title for a given slug (if found in sitemap).
	 *
	 * @param string $slug The slug of the page to get the title for.
	 * @return string|false The page title, or false if not found.
	 */
	public function get_sitemap_page_title( string $slug ) {
		$prompt    = $this->get_prompt();
		$locale    = $this->get_locale();
		$site_type = $this->get_site_type();
		if ( ! $prompt || ! $locale || ! $site_type ) {
			return false;
		}

		$sitemap = LegacySiteGenService::instantiate_site_meta( $prompt, 'sitemap', $site_type, $locale );
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
	 * @param int    $post_id The ID of the page to add to the navigation.
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
	public function get_prompt() {
		return ! empty( $this->input_data['prompt'] ) ? $this->input_data['prompt'] : false;
	}

	/**
	 * Get the site type entered during Onboarding.
	 *
	 * @return string
	 */
	public function get_site_type() {
		return ! empty( $this->input_data['siteType'] ) ? $this->input_data['siteType'] : 'business';
	}

	/**
	 * Get the locale entered during Onboarding.
	 *
	 * @return string
	 */
	public function get_locale() {
		return ! empty( $this->input_data['locale'] ) ? $this->input_data['locale'] : 'en_US';
	}
}
