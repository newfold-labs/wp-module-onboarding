<?php

namespace NewfoldLabs\WP\Module\Onboarding\Types;

/**
 * Site classification data.
 */
class SiteClassification {

	/**
	 * The primary type of the site.
	 *
	 * @var string
	 */
	private $primary_type;

	/**
	 * The secondary type of the site.
	 *
	 * @var string
	 */
	private $secondary_type;

	/**
	 * Constructor.
	 *
	 * @param string $primary_type   Primary type.
	 * @param string $secondary_type Secondary type.
	 */
	public function __construct( string $primary_type, string $secondary_type ) {
		$this->primary_type   = ! empty( $primary_type ) ? $primary_type : 'other';
		$this->secondary_type = ! empty( $secondary_type ) ? $secondary_type : 'other';
	}

	/**
	 * Set primary type.
	 *
	 * @param string $primary_type Primary type.
	 */
	public function set_primary_type( string $primary_type ): void {
		$this->primary_type = $primary_type;
	}

	/**
	 * Set secondary type.
	 *
	 * @param string $secondary_type Secondary type.
	 */
	public function set_secondary_type( string $secondary_type ): void {
		$this->secondary_type = $secondary_type;
	}

	/**
	 * Get primary type.
	 *
	 * @return string
	 */
	public function get_primary_type(): string {
		return $this->primary_type;
	}

	/**
	 * Get secondary type.
	 *
	 * @return string
	 */
	public function get_secondary_type(): string {
		return $this->secondary_type;
	}
}