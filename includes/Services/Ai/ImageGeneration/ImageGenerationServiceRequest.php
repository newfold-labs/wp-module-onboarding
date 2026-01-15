<?php
/**
 * AI Image Generation Service Request class.
 *
 * @package NewfoldLabs\WP\Module\Onboarding
 */

namespace NewfoldLabs\WP\Module\Onboarding\Services\Ai\ImageGeneration;

use NewfoldLabs\WP\Module\Onboarding\Services\Ai\AiServiceRequest;

/**
 * AI Image Generation Service Request Class
 *
 * Handles HTTP requests to the AI Image Generation API endpoint.
 */
class ImageGenerationServiceRequest extends AiServiceRequest {

	/**
	 * The image generation endpoint.
	 *
	 * @var string
	 */
	protected $api_path = 'image-generation/';

	/**
	 * Constructor
	 *
	 * @param string $endpoint The image generation endpoint to use.
	 * @param array $body    Request body data.
	 * @param array $headers Additional headers to include in the request.
	 * @param string|null $url The URL to send the request to (Not recommended to override this).
	 */
	public function __construct( string $endpoint, array $body, array $headers = array(), ?string $url = null ) {
		$endpoint = $this->api_path . $endpoint;
		parent::__construct( $endpoint, $body, $headers, $url );
	}
}
