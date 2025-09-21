<?php

namespace NewfoldLabs\WP\Module\Onboarding\Types;

/**
 * Logo data type class.
 *
 * Represents a logo with reference ID, style, and URL.
 *
 * @package NewfoldLabs\WP\Module\Onboarding\Types
 *
 * @example
 * reference_id: "3FNjUdY"
 * style: "Text-only"
 * url: "https://url.com/to/logogen/3FNjUdY-text-only.png"
 */
class Logo {

	/**
	 * Logo reference ID.
	 *
	 * @var string
	 */
	private $reference_id;

	/**
	 * Logo style.
	 *
	 * @var string
	 */
	private $style;

	/**
	 * Logo URL.
	 *
	 * @var string
	 */
	private $url;

	/**
	 * Logo constructor.
	 *
	 * @param string $reference_id Logo reference ID - e.g. "3FNjUdY".
	 * @param string $style Logo style - e.g. "Text-only".
	 * @param string $url Logo URL - e.g. "https://cloud-patterns.test/storage/logogen/3FNjUdY-text-only.png".
	 * @throws \InvalidArgumentException When parameters are invalid.
	 */
	public function __construct( string $reference_id, string $style, string $url ) {
		$this->validate_parameters( $reference_id, $style, $url );
		$this->set_properties( $reference_id, $style, $url );
	}

	/**
	 * Validate constructor parameters.
	 *
	 * @param string $reference_id Logo reference ID.
	 * @param string $style Logo style.
	 * @param string $url Logo URL.
	 * @throws \InvalidArgumentException When parameters are invalid.
	 */
	private function validate_parameters( string $reference_id, string $style, string $url ): void {
		if ( empty( trim( $reference_id ) ) ) {
			throw new \InvalidArgumentException( 'Reference ID cannot be empty' );
		}

		if ( empty( trim( $style ) ) ) {
			throw new \InvalidArgumentException( 'Style cannot be empty' );
		}

		if ( empty( trim( $url ) ) ) {
			throw new \InvalidArgumentException( 'URL cannot be empty' );
		}

		if ( ! filter_var( $url, FILTER_VALIDATE_URL ) ) {
			throw new \InvalidArgumentException( 'URL must be a valid URL' );
		}
	}

	/**
	 * Set properties from parameters.
	 *
	 * @param string $reference_id Logo reference ID.
	 * @param string $style Logo style.
	 * @param string $url Logo URL.
	 */
	private function set_properties( string $reference_id, string $style, string $url ): void {
		$this->reference_id = trim( $reference_id );
		$this->style        = trim( $style );
		$this->url          = trim( $url );
	}

	/**
	 * Get reference ID.
	 *
	 * @return string
	 */
	public function get_reference_id(): string {
		return $this->reference_id;
	}

	/**
	 * Get style.
	 *
	 * @return string
	 */
	public function get_style(): string {
		return $this->style;
	}

	/**
	 * Get URL.
	 *
	 * @return string
	 */
	public function get_url(): string {
		return $this->url;
	}

	/**
	 * Convert to array.
	 *
	 * @return array
	 */
	public function to_array(): array {
		return array(
			'reference_id' => $this->reference_id,
			'style'        => $this->style,
			'url'          => $this->url,
		);
	}

	/**
	 * Create from array (static factory method).
	 *
	 * @param array $data Logo data array.
	 * @return Logo
	 * @throws \InvalidArgumentException When required keys are missing.
	 */
	public static function from_array( array $data ): Logo {
		if ( ! isset( $data['reference_id'] ) || ! isset( $data['style'] ) || ! isset( $data['url'] ) ) {
			throw new \InvalidArgumentException( 'Array must contain reference_id, style, and url keys' );
		}

		return new self( $data['reference_id'], $data['style'], $data['url'] );
	}
}
