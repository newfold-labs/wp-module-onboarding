<?php

namespace NewfoldLabs\WP\Module\Onboarding\Types;

/**
 * Page data type class.
 *
 * Represents a single page with title, slug, and content.
 *
 * @package NewfoldLabs\WP\Module\Onboarding\Types
 */
class Page {

	/**
	 * Page title.
	 *
	 * @var string
	 */
	private $title;

	/**
	 * Page slug.
	 *
	 * @var string
	 */
	private $slug;

	/**
	 * Page content.
	 *
	 * @var string
	 */
	private $content;

	/**
	 * Whether the page is the front page.
	 *
	 * @var bool
	 */
	private $is_front_page;

	/**
	 * Page constructor.
	 *
	 * @param string $title Page title.
	 * @param string $slug Page slug.
	 * @param string $content Page content.
	 * @param bool $is_front_page Whether the page is the front page.
	 * @throws \InvalidArgumentException When parameters are invalid.
	 */
	public function __construct( string $title, string $slug, string $content, bool $is_front_page = false ) {
		$this->validate_parameters( $title, $slug, $content );
		$this->set_properties( $title, $slug, $content, $is_front_page );
	}

	/**
	 * Validate constructor parameters.
	 *
	 * @param string $title Page title.
	 * @param string $slug Page slug.
	 * @param string $content Page content.
	 * @throws \InvalidArgumentException When parameters are invalid.
	 */
	private function validate_parameters( string $title, string $slug, string $content ): void {
		if ( empty( trim( $title ) ) ) {
			throw new \InvalidArgumentException( 'Title cannot be empty' );
		}

		if ( empty( trim( $slug ) ) ) {
			throw new \InvalidArgumentException( 'Slug cannot be empty' );
		}

		if ( empty( trim( $content ) ) ) {
			throw new \InvalidArgumentException( 'Content cannot be empty' );
		}
	}

	/**
	 * Set properties from parameters.
	 *
	 * @param string $title Page title.
	 * @param string $slug Page slug.
	 * @param string $content Page content.
	 * @param bool $is_front_page Whether the page is the front page.
	 */
	private function set_properties( string $title, string $slug, string $content, bool $is_front_page ): void {
		$this->title        = trim( $title );
		$this->slug         = trim( $slug );
		$this->content      = trim( $content );
		$this->is_front_page = $is_front_page;
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
	 * Get slug.
	 *
	 * @return string
	 */
	public function get_slug(): string {
		return $this->slug;
	}

	/**
	 * Get content.
	 *
	 * @return string
	 */
	public function get_content(): string {
		return $this->content;
	}

	/**
	 * Get whether the page is the front page.
	 *
	 * @return bool
	 */
	public function is_front_page(): bool {
		return $this->is_front_page;
	}

	/**
	 * Convert to array.
	 *
	 * @return array
	 */
	public function to_array(): array {
		return array(
			'title'   => $this->title,
			'slug'    => $this->slug,
			'content' => $this->content,
			'is_front_page' => $this->is_front_page,
		);
	}

	/**
	 * Create from array (static factory method).
	 *
	 * @param array $data Page data array.
	 * @return Page
	 */
	public static function from_array( array $data ): Page {
		if ( ! isset( $data['title'] ) || ! isset( $data['slug'] ) || ! isset( $data['content'] ) ) {
			throw new \InvalidArgumentException( 'Array must contain title, slug, and content keys' );
		}

		return new self( $data['title'], $data['slug'], $data['content'], $data['is_front_page'] ?? false );
	}
} 