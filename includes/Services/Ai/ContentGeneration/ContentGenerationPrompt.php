<?php
/**
 * Content Generation Prompt Class
 *
 * This file contains the ContentGenerationPrompt class which processes
 * site info entered during onboarding and generates structured prompt
 * for AI content generation.
 *
 * @package NewfoldLabs\WP\Module\Onboarding\Services\Ai\ContentGeneration
 */

namespace NewfoldLabs\WP\Module\Onboarding\Services\Ai\ContentGeneration;

use NewfoldLabs\WP\Module\AI\SiteGen\SiteGen;
use NewfoldLabs\WP\Module\Onboarding\Data\Services\SiteGenService as LegacySiteGenService;

/**
 * Content Generation Prompt Class
 *
 * This class processes the site info entered during onboarding and generates
 * structured prompt for AI content generation.
 */
class ContentGenerationPrompt {

	/**
	 * The original site description provided by the user.
	 *
	 * @var string
	 */
	private $site_description;

	/**
	 * The type of site (e.g., 'business', 'blog', 'ecommerce').
	 *
	 * @var string
	 */
	private $site_type;

	/**
	 * The locale/language code for the site.
	 *
	 * @var string
	 */
	private $locale;

	/**
	 * The required site meta dependencies.
	 *
	 * @var array
	 */
	private $prompt_site_meta_dependencies = array(
		'target_audience',
		'content_tones',
		'keywords',
	);

	/**
	 * Constructor for ContentGenerationPrompt.
	 *
	 * @param string $site_description The user-provided site description.
	 * @param string $site_type       The type of site (e.g., 'business', 'personal', 'ecommerce').
	 * @param string $locale          The locale/language code for the site.
	 */
	public function __construct( $site_description, $site_type, $locale ) {
		$this->validate_input( $site_description, $site_type, $locale );

		$this->site_description = trim( $site_description );
		$this->site_type        = trim( $site_type );
		$this->locale           = trim( $locale );
	}

	/**
	 * Validates the input parameters.
	 *
	 * @param string $site_description The site description.
	 * @param string $site_type        The site type.
	 * @param string $locale           The locale.
	 *
	 * @throws \Exception If any parameter is empty.
	 */
	private function validate_input( $site_description, $site_type, $locale ) {
		if ( empty( $site_description ) ) {
			throw new \Exception( 'Site description cannot be empty' );
		}

		if ( empty( $site_type ) ) {
			throw new \Exception( 'Site type cannot be empty' );
		}

		if ( empty( $locale ) ) {
			throw new \Exception( 'Locale cannot be empty' );
		}
	}

	/**
	 * Sets the refined site description using AI processing.
	 *
	 * @return string The refined site description.
	 */
	private function get_refined_site_description(): string {
		return SiteGen::get_refined_site_description( $this->site_description );
	}

	/**
	 * Gets the meta response for the site meta dependency.
	 *
	 * @param string $site_meta_dependency The site meta dependency.
	 *
	 * @return array The meta response.
	 */
	private function get_meta_response( $site_meta_dependency ): array {
		$response = LegacySiteGenService::instantiate_site_meta(
			$this->site_description,
			$site_meta_dependency,
			$this->site_type,
			$this->locale
		);

		if ( is_wp_error( $response ) ) {
			return array();
		}

		return $response;
	}

	/**
	 * Gets the complete prompt array for content generation.
	 *
	 * @return array {
	 *     The complete prompt array for content generation.
	 *
	 *     @type string $site_description The refined site description.
	 *     @type array  $target_audience  The target audience information.
	 *     @type array  $content_style    The content style/tone information.
	 *     @type array  $keywords         The relevant keywords.
	 * }
	 */
	public function get_prompt(): array {
		$prompt = array();
		$prompt['site_description'] = $this->get_refined_site_description();

		foreach ( $this->prompt_site_meta_dependencies as $site_meta_dependency ) {
			$prompt[ $site_meta_dependency ] = $this->get_meta_response( $site_meta_dependency );
		}

		return $prompt;
	}
}