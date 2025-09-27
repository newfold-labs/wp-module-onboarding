<?php

namespace NewfoldLabs\WP\Module\Onboarding\Services\Ai\ImageGeneration;

use NewfoldLabs\WP\Module\Onboarding\Services\MediaService;
use NewfoldLabs\WP\Module\Onboarding\Types\Logo;

/**
 * Logo Generation Service
 *
 * This service is used to generate logos for a site.
 * Service API Documentation: https://github.com/newfold-labs/cloud-patterns/wiki/LogoGen-Service#api
 */
class LogoGenerationService {

	/**
	 * The logos.
	 *
	 * @var array
	 */
	private $logos = array();

	/**
	 * Generate logos.
	 *
	 * @param string $site_title The site title.
	 * @param string $site_description The site description.
	 * @param string $locale The locale.
	 * @return string|WP_Error The tracking reference ID or a WP_Error object if the request fails.
	 */
	public function generate( string $site_title, string $site_description, string $locale ) {
		if ( ! self::is_locale_supported( $locale ) ) {
			return new \WP_Error(
				'logogen_locale_not_supported',
				'Locale not supported',
				array( 'status' => 400 )
			);
		}

		$request = new ImageGenerationServiceRequest(
			'logos/generate',
			array(
				'name' => $site_title,
				'description' => $site_description
			)
		);
		$request->send();

		// Success.
		if (
			$request->is_successful() &&
			isset( $request->get_response_body()['reference_id'] )
		) {
			$reference_id = $request->get_response_body()['reference_id'];
			return array( 'reference_id' => $reference_id );
		}

		// Error.
		$response_code = $request->get_response_code();
		$error_message = $request->get_error_message();
		$response = new \WP_Error(
			'logogen_generation_failed',
			$error_message,
			array( 'status' => $response_code )
		);

		return $response;
	}

	/**
	 * Generate more logos.
	 *
	 * @param string $reference_id The reference ID.
	 * @return string|WP_Error The status or a WP_Error object if the request fails.
	 */
	public function generate_more( string $reference_id ) {
		$request = new ImageGenerationServiceRequest(
			'logos/generate/more',
			array(
				'reference_id' => $reference_id
			)
		);
		$request->send();

		// Success.
		if (
			$request->is_successful() &&
			isset( $request->get_response_body()['status'] )
		) {
			$status = $request->get_response_body()['status'];
			return array( 'status' => $status );
		}

		// Error.
		$response_code = $request->get_response_code();
		$error_message = $request->get_error_message();
		$response = new \WP_Error(
			'logogen_generation_more_failed',
			$error_message,
			array( 'status' => $response_code )
		);

		return $response;
	}

	/**
	 * Get the generation status.
	 *
	 * @param string $reference_id The reference ID.
	 * @return array|WP_Error The generation status or a WP_Error object if the request fails.
	 */
	public function generation_status( string $reference_id ) {
		$request = new ImageGenerationServiceRequest(
			'logos/generate/status',
			array(
				'reference_id' => $reference_id
			)
		);
		$request->send();

		// Success.
		if (
			$request->is_successful() &&
			isset( $request->get_response_body()['status'] )
		) {
			$status = $request->get_response_body()['status'];
			// Store the logos if the generation is completed.
			if ( $status === 'completed' ) {
				$this->logos = $request->get_response_body()['logos'];
			}
			return array( 'status' => $status );
		}

		// Error.
		$response_code = $request->get_response_code();
		$error_message = $request->get_error_message();
		$response = new \WP_Error(
			'logogen_generation_status_check_failed',
			$error_message,
			array( 'status' => $response_code )
		);

		return $response;
	}

	/**
	 * Select a logo.
	 *
	 * @param string $logo_reference_id The logo reference ID.
	 * @return array|WP_Error The selected logo URL or a WP_Error object if the request fails.
	 */
	public function select( string $logo_reference_id ) {
		$request = new ImageGenerationServiceRequest(
			'logos/generate/select',
			array(
				'logo_reference_id' => $logo_reference_id
			)
		);
		$request->send();

		// Success.
		if (
			$request->is_successful() &&
			isset( $request->get_response_body()['selected_logo_url'] )
		) {
			$selected_logo_url = $request->get_response_body()['selected_logo_url'];
			$attachment_data = MediaService::import_image_from_url( $selected_logo_url );
			if ( is_array( $attachment_data ) ) {
				$id = $attachment_data['id'];
				$url = $attachment_data['src'];
				return array( 'selected_logo_id' => $id, 'selected_logo_url' => $url );
			} else {
				return new \WP_Error(
					'logogen_select_logo_import_failed',
					'Failed to import logo image',
					array( 'status' => 500 )
				);
			}
		}

		// Error.
		$response_code = $request->get_response_code();
		$error_message = $request->get_error_message();
		$response = new \WP_Error(
			'logogen_select_logo_failed',
			$error_message,
			array( 'status' => $response_code )
		);

		return $response;
	}

	/**
	 * Get the logos.
	 *
	 * @param bool $as_array Whether to return the logos as array of arrays instead of Logo objects.
	 * @param bool $shuffle Whether to shuffle the logos.
	 * @return array|WP_Error The logos as array of Logo objects or a WP_Error object if the response is malformed.
	 */
	public function get_logos( bool $as_array = false, bool $shuffle = false ) {
		$logos = array();
		foreach ( $this->logos as $logo ) {
			$reference_id = $logo['reference_id'] ?? null;
			$style = $logo['style'] ?? null;
			$url = $logo['url'] ?? null;

			// Ensure shape is not malformed.
			if ( ! $reference_id || ! $style || ! $url ) {
				continue;
			}

			if ( $as_array ) {
				$logos[] = array(
					'reference_id' => $reference_id,
					'style' => $style,
					'url' => $url
				);
			} else {
				$logos[] = new Logo(
					$reference_id,
					$style,
					$url
				);
			}
		}

		// Ensure the response is not malformed.
		if ( empty( $logos ) ) {
			return new \WP_Error(
				'logogen_logos_response_malformed',
				'Malformed logos response',
				array( 'status' => 404 )
			);
		}

		if ( $shuffle ) {
			shuffle( $logos );
		}

		return $logos;
	}

	/**
	 * Check if the locale is supported.
	 *
	 * @param string $locale The locale to check.
	 * @return bool True if the locale is supported, false otherwise.
	 */
	public static function is_locale_supported( string $locale ): bool {
		return strpos( $locale, 'en_' ) === 0;
	}
}
