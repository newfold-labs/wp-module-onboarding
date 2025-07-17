<?php

namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Services\SitePagesService;
use NewfoldLabs\WP\Module\Onboarding\Data\Services\SiteGenService as LegacySiteGenService;
use NewfoldLabs\WP\Module\Onboarding\Services\Ai\ContentGeneration\ContentGenerationPrompt;
use NewfoldLabs\WP\Module\Onboarding\Services\Ai\ContentGeneration\SitekitsContentGeneration;
use NewfoldLabs\WP\Module\Onboarding\Types\Color;
use NewfoldLabs\WP\Module\Onboarding\Types\ColorPalette;
use NewfoldLabs\WP\Module\Onboarding\Types\SiteClassification;

class SiteGenService {

	/**
	 * The singleton instance.
	 *
	 * @var SiteGenService|null
	 */
	private static $instance = null;

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

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->input_data   = ReduxStateService::get( 'input' );
		$this->sitegen_data = ReduxStateService::get( 'sitegen' );
	}

	/**
	 * Get the singleton instance.
	 *
	 * @return SiteGenService
	 */
	public static function get_instance(): SiteGenService {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Generate the sitekits.
	 *
	 * @param string $site_description The site description.
	 * @param string $site_type The site type.
	 * @param string $locale The locale.
	 * @param bool   $for_onboarding_preview Whether to return the sitekits as array for onboarding preview.
	 * @return array|\WP_Error Array of Sitekit objects, array of sitekits for onboarding preview, or WP_Error if there is an error.
	 */
	public function get_sitekits( string $site_description, string $site_type, string $locale = 'en_US', bool $for_onboarding_preview = false ) {
		$prompt              = new ContentGenerationPrompt( $site_description, $site_type, $locale );
		$site_classification = $this->get_site_classification();

		$sitekits = new SitekitsContentGeneration( $site_type, $locale, $prompt, $site_classification );
		$sitekits = $sitekits->generate_sitekits();

		// If there is an error, return it.
		if ( is_wp_error( $sitekits ) ) {
			return $sitekits;
		}

		// If we are generating sitekits for onboarding preview, return the sitekits as array.
		if ( $for_onboarding_preview ) {
			$previews = array();
			foreach ( $sitekits as $sitekit ) {
				$previews[ $sitekit->get_slug() ] = $sitekit->onboarding_preview_data();
			}
			$sitekits = $previews;
		}

		return $sitekits;
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
	public function get_sitemap_page_title( string $slug ): string|false {
		$prompt = $this->get_prompt();
		$locale = $this->get_locale();
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
	 * Get the site classification.
	 *
	 * @return SiteClassification
	 */
	public function get_site_classification(): SiteClassification {
		$primary_type        = 'other';
		$secondary_type      = 'other';
		$site_classification = LegacySiteGenService::instantiate_site_meta(
			$this->get_prompt(),
			'site_classification',
			$this->get_site_type(),
			$this->get_locale()
		);

		if ( is_array( $site_classification ) ) {
			$primary_type   = $site_classification['primaryType'] ?? $primary_type;
			$secondary_type = $site_classification['slug'] ?? $secondary_type;
		}

		return new SiteClassification( $primary_type, $secondary_type );
	}

	/**
	 * Get a palette from the color palettes generated during the sitemeta calls.
	 *
	 * @return ColorPalette|null The color palette, or null on error.
	 */
	public function get_color_palette() {
		$color_palettes = LegacySiteGenService::instantiate_site_meta(
			$this->get_prompt(),
			'color_palette',
			$this->get_site_type(),
			$this->get_locale()
		);

		if ( ! is_array( $color_palettes ) ) {
			return null;
		}

		// Select a random color palette from the sitemeta.
		$selected_color_palette_index = array_rand( $color_palettes );
		$selected_color_palette       = $color_palettes[ $selected_color_palette_index ];

		$palette_slug   = 'palette_' . ( $selected_color_palette_index + 1 );
		$palette_colors = array();

		// Create a Color object for each color in the selected color palette.
		foreach ( $selected_color_palette as $key => $value ) {
			$slug  = $key;
			$name  = ucfirst( str_replace( '_', ' ', $slug ) );
			$color = $value;

			$palette_colors[] = new Color( $name, $slug, $color );
		}

		return new ColorPalette( $palette_slug, $palette_colors );
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
	 * Get the site type entered during Onboarding.
	 *
	 * @return string
	 */
	public function get_site_type(): string {
		return ! empty( $this->input_data['siteType'] ) ? $this->input_data['siteType'] : 'business';
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
