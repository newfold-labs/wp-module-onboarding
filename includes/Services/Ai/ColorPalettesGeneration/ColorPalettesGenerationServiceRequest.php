<?php
/**
 * AI Color Palettes Generation Service Request class.
 *
 * @package NewfoldLabs\WP\Module\Onboarding
 */

namespace NewfoldLabs\WP\Module\Onboarding\Services\Ai\ColorPalettesGeneration;

use NewfoldLabs\WP\Module\Onboarding\Services\Ai\ServiceRequest;

/**
 * AI Color Palettes Generation Service Request Class
 *
 * Handles HTTP requests to the AI Content Generation API endpoint.
 */
class ColorPalettesGenerationServiceRequest extends ServiceRequest {

	/**
	 * Service Endpoint
	 *
	 * @var string
	 */
	protected $service_endpoint = 'colorpalettes/';

	/**
	 * Constructor
	 *
	 * @param string $endpoint API endpoint.
	 * @param array  $body     Request body data.
	 * @param array  $headers  Additional headers to include in the request.
	 */
	public function __construct( string $endpoint, array $body, array $headers = array() ) {
		parent::__construct( $endpoint, $body, $headers );
	}

}
