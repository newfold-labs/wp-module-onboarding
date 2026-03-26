<?php

namespace NewfoldLabs\WP\Module\Onboarding\Types;

/**
 * Sitekit data type class.
 *
 * @package NewfoldLabs\WP\Module\Onboarding\Types
 */
class Sitekit {

	/**
	 * Sitekit slug.
	 *
	 * @var string
	 */
	private $slug;

	/**
	 * Sitekit title.
	 *
	 * @var string
	 */
	private $title;

	/**
	 * Sitekit header.
	 *
	 * @var string
	 */
	private $header;

	/**
	 * Sitekit footer.
	 *
	 * @var string
	 */
	private $footer;

	/**
	 * Sitekit pages.
	 *
	 * @var Pages
	 */
	private $pages;

	/**
	 * Sitekit color palette.
	 *
	 * @var ColorPalette|null
	 */
	private $color_palette;

	/**
	 * Sitekit global styles.
	 *
	 * @var array|null
	 */
	private $global_styles;

	/**
	 * Sitekit font pair.
	 *
	 * @var array|null
	 */
	private $font_pair;

	/**
	 * Sitekit constructor.
	 *
	 * @param string            $slug          Sitekit slug.
	 * @param string            $title         Sitekit title.
	 * @param string            $header        Sitekit header.
	 * @param string            $footer        Sitekit footer.
	 * @param Pages             $pages         Pages collection.
	 * @param ColorPalette|null $color_palette Color palette (optional).
	 * @param array|null        $global_styles Global styles (optional).
	 * @param array|null        $font_pair     Font pair data (optional).
	 * @throws \InvalidArgumentException When parameters are invalid.
	 */
	public function __construct( string $slug, string $title, string $header, string $footer, Pages $pages, ColorPalette $color_palette = null, ?array $global_styles = null, ?array $font_pair = null ) {
		$this->validate_parameters( $slug, $title, $header, $footer, $pages );
		$this->set_properties( $slug, $title, $header, $footer, $pages, $color_palette, $global_styles, $font_pair );
	}

	/**
	 * Validate constructor parameters.
	 *
	 * @param string $slug Sitekit slug.
	 * @param string $title Sitekit title.
	 * @param string $header Sitekit header.
	 * @param string $footer Sitekit footer.
	 * @param Pages  $pages Pages collection.
	 * @throws \InvalidArgumentException When parameters are invalid.
	 */
	private function validate_parameters( string $slug, string $title, string $header, string $footer, Pages $pages ): void {
		if ( empty( trim( $slug ) ) ) {
			throw new \InvalidArgumentException( 'Slug cannot be empty' );
		}

		if ( empty( trim( $title ) ) ) {
			throw new \InvalidArgumentException( 'Title cannot be empty' );
		}

		if ( empty( trim( $header ) ) ) {
			throw new \InvalidArgumentException( 'Header cannot be empty' );
		}

		if ( empty( trim( $footer ) ) ) {
			throw new \InvalidArgumentException( 'Footer cannot be empty' );
		}

		// Validate that pages collection has at least one page with slug "home".
		if ( $pages->is_empty() || ! $pages->has_page( 'home' ) ) {
			throw new \InvalidArgumentException( 'Pages collection must contain at least one page with slug \'home\'' );
		}
	}

	/**
	 * Set properties from parameters.
	 *
	 * @param string            $slug          Sitekit slug.
	 * @param string            $title         Sitekit title.
	 * @param string            $header        Sitekit header.
	 * @param string            $footer        Sitekit footer.
	 * @param Pages             $pages         Pages collection.
	 * @param ColorPalette|null $color_palette Color palette.
	 * @param array|null        $global_styles Global styles.
	 * @param array|null        $font_pair     Font pair data.
	 */
	private function set_properties( string $slug, string $title, string $header, string $footer, Pages $pages, ColorPalette $color_palette = null, ?array $global_styles = null, ?array $font_pair = null ): void {
		$this->slug          = trim( $slug );
		$this->title         = trim( $title );
		$this->header        = trim( $header );
		$this->footer        = trim( $footer );
		$this->pages         = $pages;
		$this->color_palette = $color_palette;
		$this->global_styles = $global_styles;
		$this->font_pair     = $font_pair;
	}

	/**
	 * Get slug.
	 *
	 * @return string
	 */
	public function get_slug(): string {
		return $this->slug;
	}

	/**
	 * Get title.
	 *
	 * @return string
	 */
	public function get_title(): string {
		return $this->title;
	}

	/**
	 * Get header.
	 *
	 * @return string
	 */
	public function get_header(): string {
		return $this->header;
	}

	/**
	 * Get footer.
	 *
	 * @return string
	 */
	public function get_footer(): string {
		return $this->footer;
	}

	/**
	 * Get pages collection.
	 *
	 * @return Pages
	 */
	public function get_pages(): Pages {
		return $this->pages;
	}

	/**
	 * Get color palette.
	 *
	 * @return ColorPalette|null
	 */
	public function get_color_palette() {
		return $this->color_palette;
	}

	/**
	 * Get global styles.
	 *
	 * @return array|null
	 */
	public function get_global_styles(): ?array {
		return $this->global_styles;
	}

	/**
	 * Get font pair.
	 *
	 * @return array|null
	 */
	public function get_font_pair(): ?array {
		return $this->font_pair;
	}

	/**
	 * Get page content by page key.
	 *
	 * @param string $page_key The page key to retrieve content for.
	 * @return string|null
	 */
	public function get_page_content( string $page_key ) {
		return $this->pages->get_page_content_by_slug( $page_key );
	}

	/**
	 * Get data for onboarding preview.
	 *
	 * @return array
	 */
	public function onboarding_preview_data(): array {
		return array(
			'slug'          => $this->slug,
			'title'         => $this->title,
			'header'        => $this->header,
			'footer'        => $this->footer,
			'content'       => $this->pages->get_front_page()->get_content(),
			'color'         => $this->color_palette ? $this->color_palette->to_array() : null,
			'global_styles' => $this->global_styles,
			'font_pair'     => $this->font_pair,
		);
	}

	/**
	 * Convert to array.
	 *
	 * @return array
	 */
	public function to_array(): array {
		$data = array(
			'slug'   => $this->slug,
			'title'  => $this->title,
			'header' => $this->header,
			'footer' => $this->footer,
			'pages'  => $this->pages->to_associative_array(),
		);

		if ( null !== $this->color_palette ) {
			$data['color_palette'] = $this->color_palette->to_array();
		}

		if ( null !== $this->global_styles ) {
			$data['global_styles'] = $this->global_styles;
		}

		if ( null !== $this->font_pair ) {
			$data['font_pair'] = $this->font_pair;
		}

		return $data;
	}
}
