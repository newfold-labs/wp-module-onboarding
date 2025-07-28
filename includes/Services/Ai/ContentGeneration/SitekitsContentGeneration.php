<?php

namespace NewfoldLabs\WP\Module\Onboarding\Services\Ai\ContentGeneration;

use NewfoldLabs\WP\Module\Onboarding\RestApi\ParallelRequestsController;
use NewfoldLabs\WP\Module\Onboarding\Services\ParallelRequestsService;
use NewfoldLabs\WP\Module\Onboarding\Services\SiteGenService;
use NewfoldLabs\WP\Module\Onboarding\Services\SiteTypes\EcommerceSiteTypeService;
use NewfoldLabs\WP\Module\Onboarding\Types\Page;
use NewfoldLabs\WP\Module\Onboarding\Types\Pages;
use NewfoldLabs\WP\Module\Onboarding\Types\ParallelRequest;
use NewfoldLabs\WP\Module\Onboarding\Types\SiteClassification;
use NewfoldLabs\WP\Module\Onboarding\Types\Sitekit;
use WpOrg\Requests\Requests;

class SitekitsContentGeneration {

	private static $site_types_supported = [
		'ecommerce',
	];

	/**
	 * The site type.
	 *
	 * @var string
	 */
	private $site_type;

	/**
	 * The locale.
	 *
	 * @var string
	 */
	private $locale;

	/**
	 * The prompt.
	 *
	 * @var ContentGenerationPrompt
	 */
	private $prompt;

	/**
	 * The site classification.
	 *
	 * @var SiteClassification
	 */
	private $site_classification;

	/**
	 * Constructor.
	 *
	 * @param string $site_type The site type.
	 * @param string $locale The locale.
	 * @param ContentGenerationPrompt $prompt The prompt.
	 * @param SiteClassification $site_classification The site classification.
	 */
	public function __construct( string $site_type, string $locale, ContentGenerationPrompt $prompt, SiteClassification $site_classification ) {
		$this->site_type           = $site_type;
		$this->locale              = $locale;
		$this->prompt              = $prompt;
		$this->site_classification = $site_classification;
	}

	/**
	 * Generates the sitekits.
	 *
	 * @param int $count The number of sitekits to generate.
	 * @return array|\WP_Error The sitekits - array of Sitekit objects or WP_Error on failure.
	 */
	public function generate_sitekits( int $count = 3 ) {
		$prompt = $this->prompt->get_prompt();
		$request_body = array(
			'siteType'      => $this->site_type,
			'count'         => $count,
			'prompt'        => $prompt,
			'locale'        => $this->locale,
			'primaryType'   => $this->site_classification->get_primary_type(),
			'secondaryType' => $this->site_classification->get_secondary_type(),
		);

		// Install sitekits pre-requisites plugins in background.
		$this->install_pre_requisites_in_background();

		// Generate sitekits.
		$request = new ContentGenerationServiceRequest( 'sitekits/generate', $request_body );
		$request->send();
		// Success.
		if (
			$request->is_successful() &&
			isset( $request->get_response_body()['sitekits'] )
		) {
			$response = array();

			// Process the sitekits.
			$sitekits = $request->get_response_body()['sitekits'];
			foreach ( $sitekits as $sitekit ) {
				$sitekit_object = $this->get_sitekit_object( $sitekit );
				$response[]     = $sitekit_object;
			}

			// Publish site content.
			$posts = $request->get_response_body()['posts'] ?? array();
			$this->publish_content( $posts );

			return $response;
		}

		// Error.
		$response_code = $request->get_response_code();
		$response_body = $request->get_error_response_body();
		$error_message = ( $response_body && isset( $response_body['message'] ) ) ? $response_body['message'] : __( 'An unknown error occurred', 'wp-module-onboarding' );
		$response = new \WP_Error(
			'sitekits_generation_failed',
			$error_message,
			array( 'status' => $response_code )
		);

		return $response;
	}

	/**
	 * Gets the sitekit object.
	 *
	 * @param array $sitekit The sitekit.
	 * @return Sitekit The sitekit object.
	 */
	private function get_sitekit_object( array $sitekit ): Sitekit {
		$processed_sitekit = $this->process_sitekit_item( $sitekit );

		$sitekit = new Sitekit(
			$processed_sitekit['slug'],
			$processed_sitekit['title'],
			$processed_sitekit['header'],
			$processed_sitekit['footer'],
			$processed_sitekit['pages'],
			$processed_sitekit['color_palette']
		);

		return $sitekit;
	}

	/**
	 * Processes and prepares a sitekit item from the response.
	 *
	 * @param array $sitekit_item The sitekit item.
	 * @return array The processed sitekit item — ready to be converted to a Sitekit object.
	 */
	private function process_sitekit_item( array $sitekit_item ): array {
		$result           = array();
		$result['slug']   = $sitekit_item['slug'];
		$result['title']  = $sitekit_item['title'];
		$result['header'] = $sitekit_item['header']['patternContent'];
		$result['footer'] = $sitekit_item['footer']['patternContent'];
		
		$pages = array();
		foreach ( $sitekit_item['pages'] as $page_slug => $page_patterns ) {
			$page_title    = ucfirst( str_replace( '-', ' ', $page_slug ) );
			$page_content  = $this->get_page_content_from_patterns( $page_patterns );
			$is_front_page = $page_slug === 'home';
			$pages[]       = new Page( $page_title, $page_slug, $page_content, $is_front_page );
		}
		$result['pages'] = new Pages( $pages );

		// Attach a color palette to the sitekit.
		$result['color_palette'] = SiteGenService::get_instance()->get_color_palette();

		return $result;
	}

	/**
	 * Gets the page content from the response patterns array.
	 *
	 * @param array $page_patterns The page patterns.
	 * @return string The page content.
	 */
	private function get_page_content_from_patterns( array $page_patterns ): string {
		$page_content = '';
		foreach ( $page_patterns as $pattern ) {
			$page_content .= $pattern['patternContent'];
		}
		return $page_content;
	}

	/**
	 * Installs the pre-requisites in background.
	 *
	 * @return void
	 */
	private function install_pre_requisites_in_background(): void {
		if ( $this->site_type === 'ecommerce' ) {
			EcommerceSiteTypeService::install_ecommerce_plugins();
		}
	}

	/**
	 * Publishes the demo content.
	 *
	 * @param array $posts The posts.
	 * @return void
	 */
	private function publish_content( array $posts = array() ): void {
		// Publish WooCommerce products.
		$products = $posts['products'] ?? array();
		if ( ! empty( $products ) ) {
			foreach ( $products as $index => $product ) {
				EcommerceSiteTypeService::publish_woo_product(
					$product['name'] ?? 'Product ' . $index + 1,
					$product['description'] ?? 'Description for Product ' . $index + 1,
					$product['price'] ?? '24.99',
					$product['image'] ?? '',
					$product['categories'] ?? array()
				);
			}
		}
	}

	/**
	 * Checks if the site type supports sitekits`.
	 *
	 * @param string $site_type The site type.
	 * @return bool
	 */
	public static function site_type_supported( string $site_type ): bool {
		return in_array( $site_type, self::$site_types_supported );
	}
}