<?php

namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Themes;
use NewfoldLabs\WP\Module\Onboarding\Data\Patterns;
use NewfoldLabs\WP\Module\Onboarding\Data\Services\FlowService;

/**
 * Class TemplatePartsService
 *
 * Service class for handling template parts within the onboarding module.
 */
class TemplatePartsService {
	/**
	 * Retrieves a template part by its ID using the WordPress REST API.
	 *
	 * @param string $id The ID of the template part to retrieve.
	 * @return array|WP_Error The data of the template part or a WP_Error object on failure.
	 */
	public static function get_template_part( $id ) {
		// Create a GET request for the specified template part ID.
		$get_template_part_request = new \WP_REST_Request(
			'GET',
			"/wp/v2/template-parts/$id"
		);
		// Execute the request and get the response.
		$get_template_part_response = rest_do_request( $get_template_part_request );
		if ( $get_template_part_response->is_error() ) {
			return $get_template_part_response->as_error();
		}

		return $get_template_part_response->get_data();
	}

	/**
	 * Updates a template part with new content using the WordPress REST API.
	 *
	 * @param string $id The ID of the template part to update.
	 * @param string $content The new content for the template part.
	 * @return bool|WP_Error True on success, or a WP_Error object on failure.
	 */
	public static function update_template_part( $id, $content ) {
		// Create a POST request for the specified template part ID.
		$update_template_part_request = new \WP_REST_Request(
			'POST',
			"/wp/v2/template-parts/$id"
		);
		// Set the body parameters for the request with the new content.
		$update_template_part_request->set_body_params(
			array(
				'content' => $content,
			)
		);

		// Execute the request and get the response.
		$update_template_part_response = rest_do_request( $update_template_part_request );
		if ( $update_template_part_response->is_error() ) {
			return $update_template_part_response->as_error();
		}

		return true;
	}

	/**
	 * Updates the default template parts with the user-selected header template part for the DIY flow.
	 *
	 * @return bool|WP_Error True on success, or a WP_Error object on failure.
	 */
	public static function update_diy_selected_template_parts() {
		// Retrieve the selected header template part ID from the flow data.
		$selected_template_part_id = FlowService::get_selected_header_template_part();
		if ( ! $selected_template_part_id ) {
			return new \WP_Error(
				'nfd_onboarding_error',
				__( 'Selected header template part not stored.', 'wp-module-onboarding' ),
				array( 'status' => 404 )
			);
		}

		// Retrieve the template part content from Wonder Theme or Wonder Blocks.
		$selected_template_part = Patterns::get_pattern_from_slug( $selected_template_part_id );
		if ( ! $selected_template_part ) {
			return new \WP_Error(
				'nfd_onboarding_error',
				__( 'Selected header template part not found.', 'wp-module-onboarding' ),
				array( 'status' => 404 )
			);
		}
		$selected_template_part_content = $selected_template_part['content'];
		// Get the active theme and construct the default header ID.
		$active_theme      = Themes::get_active_theme();
		$default_header_id = "$active_theme/header";
		// Update the default header template part with the selected content.
		$update_status = self::update_template_part( $default_header_id, $selected_template_part_content );
		if ( is_wp_error( $update_status ) ) {
			return $update_status;
		}

		return true;
	}
}
