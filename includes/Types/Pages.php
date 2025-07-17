<?php

namespace NewfoldLabs\WP\Module\Onboarding\Types;

/**
 * Pages data type class.
 *
 * Represents a collection of Page objects.
 *
 * @package NewfoldLabs\WP\Module\Onboarding\Types
 */
class Pages {

	/**
	 * Array of Page objects.
	 *
	 * @var array
	 */
	private $pages;

	/**
	 * Pages constructor.
	 *
	 * @param array $pages Array of Page objects (optional).
	 * @throws \InvalidArgumentException When parameters are invalid.
	 */
	public function __construct( array $pages = array() ) {
		$this->validate_parameters( $pages );
		$this->set_properties( $pages );
	}

	/**
	 * Validate constructor parameters.
	 *
	 * @param array $pages Array of Page objects.
	 * @throws \InvalidArgumentException When parameters are invalid or duplicate slugs exist.
	 */
	private function validate_parameters( array $pages ): void {
		// Validate that all pages items are Page objects and check for duplicate slugs.
		$slugs = array();
		foreach ( $pages as $index => $page ) {
			if ( ! $page instanceof Page ) {
				throw new \InvalidArgumentException( "Pages item at index {$index} must be a Page object" );
			}
			
			$slug = $page->get_slug();
			if ( in_array( $slug, $slugs, true ) ) {
				throw new \InvalidArgumentException( "Duplicate slug '{$slug}' found at index {$index}" );
			}
			
			$slugs[] = $slug;
		}
	}

	/**
	 * Set properties from parameters.
	 *
	 * @param array $pages Array of Page objects.
	 */
	private function set_properties( array $pages ): void {
		$this->pages = $pages;
	}

	/**
	 * Add a Page object to the collection.
	 *
	 * @param Page $page Page object to add.
	 * @return Pages
	 * @throws \InvalidArgumentException When a page with the same slug already exists.
	 */
	public function add_page( Page $page ): Pages {
		// Check if a page with the same slug already exists.
		if ( $this->has_page( $page->get_slug() ) ) {
			throw new \InvalidArgumentException( "A page with slug '{$page->get_slug()}' already exists" );
		}
		
		$this->pages[] = $page;
		return $this;
	}

	/**
	 * Add multiple Page objects to the collection.
	 *
	 * @param array $pages Array of Page objects.
	 * @return Pages
	 * @throws \InvalidArgumentException When parameters are invalid or duplicate slugs exist.
	 */
	public function add_pages( array $pages ): Pages {
		// First, validate all pages are Page objects and check for duplicates.
		$slugs_to_add = array();
		foreach ( $pages as $page ) {
			if ( ! $page instanceof Page ) {
				throw new \InvalidArgumentException( 'All items must be Page objects' );
			}
			$slug = $page->get_slug();
			
			// Check for duplicates within the new pages array.
			if ( in_array( $slug, $slugs_to_add, true ) ) {
				throw new \InvalidArgumentException( "Duplicate slug '{$slug}' found in the pages array" );
			}
			
			// Check for duplicates with existing pages.
			if ( $this->has_page( $slug ) ) {
				throw new \InvalidArgumentException( "A page with slug '{$slug}' already exists" );
			}
			
			$slugs_to_add[] = $slug;
		}
		
		// If all validations pass, add all pages.
		foreach ( $pages as $page ) {
			$this->pages[] = $page;
		}
		
		return $this;
	}

	/**
	 * Remove a Page object from the collection by slug.
	 *
	 * @param string $page_slug The page slug to remove.
	 * @return Pages
	 */
	public function remove_page_by_slug( string $page_slug ): Pages {
		foreach ( $this->pages as $index => $page ) {
			if ( $page->get_slug() === $page_slug ) {
				unset( $this->pages[ $index ] );
				break;
			}
		}
		// Re-index array after removal.
		$this->pages = array_values( $this->pages );
		return $this;
	}

	/**
	 * Get all pages.
	 *
	 * @return array
	 */
	public function get_pages(): array {
		return $this->pages;
	}

	/**
	 * Get the front page.
	 *
	 * @return Page
	 */
	public function get_front_page() {
		$front_page = null;
		// Check if there is a page with is_front_page set to true.
		foreach ( $this->pages as $page ) {
			if ( $page->is_front_page() ) {
				$front_page = $page;
				break;
			}
		}

		// If no front page is found, check if there is a page with slug 'home'.
		if ( ! $front_page ) {
			$front_page = $this->get_page_by_slug( 'home' );
			if ( ! $front_page ) {
				throw new \RuntimeException( 'Front page not found in pages collection' );
			}
		}

		return $front_page;
	}

	/**
	 * Get page by slug.
	 *
	 * @param string $page_slug The page slug to find.
	 * @return Page|null
	 */
	public function get_page_by_slug( string $page_slug ) {
		foreach ( $this->pages as $page ) {
			if ( $page->get_slug() === $page_slug ) {
				return $page;
			}
		}
		return null;
	}

	/**
	 * Get page content by slug.
	 *
	 * @param string $page_slug The page slug to find.
	 * @return string|null
	 */
	public function get_page_content_by_slug( string $page_slug ) {
		$page = $this->get_page_by_slug( $page_slug );
		return $page ? $page->get_content() : null;
	}

	/**
	 * Check if collection is empty.
	 *
	 * @return bool
	 */
	public function is_empty(): bool {
		return empty( $this->pages );
	}

	/**
	 * Get the number of pages in the collection.
	 *
	 * @return int
	 */
	public function count(): int {
		return count( $this->pages );
	}

	/**
	 * Check if a page exists by slug.
	 *
	 * @param string $page_slug The page slug to check.
	 * @return bool
	 */
	public function has_page( string $page_slug ): bool {
		return $this->get_page_by_slug( $page_slug ) !== null;
	}

	/**
	 * Convert to array.
	 *
	 * @return array
	 */
	public function to_array(): array {
		$pages_array = array();
		foreach ( $this->pages as $page ) {
			$pages_array[] = $page->to_array();
		}

		return $pages_array;
	}

	/**
	 * Convert to associative array with slug as key.
	 *
	 * @return array
	 */
	public function to_associative_array(): array {
		$pages_array = array();
		foreach ( $this->pages as $page ) {
			$pages_array[ $page->get_slug() ] = $page->get_content();
		}

		return $pages_array;
	}
}
