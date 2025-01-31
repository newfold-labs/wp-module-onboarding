<?php

namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Themes;

/**
 * Class GlobalStylesService
 *
 * Handles operations related to global styles and settings, such as updating
 * global style variations and retrieving theme settings.
 */
class GlobalStylesService {
	/**
	 * Updates the DIY flow global style variation.
	 *
	 * This function updates the global style variation using the provided ID, styles, and settings.
	 * If styles or settings are empty, it attempts to fetch user-selected theme settings from the flow.
	 *
	 * @param string $id       The ID of the global style variation to update.
	 * @param array  $styles   The styles to apply. Defaults to empty.
	 * @param array  $settings The settings to apply. Defaults to empty.
	 * @return true|\WP_Error  Returns true on success, or a WP_Error on failure.
	 */
	public static function update_diy_global_style_variation( $id, $styles = array(), $settings = array() ) {
		// If both styles and settings are not empty, update directly.
		if ( ! ( empty( $styles ) && empty( $settings ) ) ) {

			// Remove inactive DIY flow fonts from the theme JSON settings, retaining only the fonts that are currently in use or selected
			$settings = FontService::deselect_inactive_diy_fonts( $settings );

			return self::update_global_style_variation(
				$id,
				$styles,
				$settings
			);
		}

		// Retrieve user-selected theme settings.
		$user_selected_theme_settings = Themes::get_selected_diy_theme_settings();
		if ( ! $user_selected_theme_settings ) {
			return new \WP_Error(
				'nfd_onboarding_error',
				__( 'Selected theme settings were not found.', 'wp-module-onboarding' ),
				array( 'status' => 404 )
			);
		}

		// If styles are empty, use styles from user-selected theme settings.
		if ( empty( $styles ) ) {
			if ( empty( $user_selected_theme_settings['styles'] ) ) {
				return new \WP_Error(
					'nfd_onboarding_error',
					__( 'Styles does not exist under the selected theme settings.', 'wp-module-onboarding' ),
					array( 'status' => 400 )
				);
			}

			$styles = $user_selected_theme_settings['styles'];
		}

		// If settings are empty, use settings from user-selected theme settings.
		if ( empty( $settings ) ) {
			if ( empty( $user_selected_theme_settings['settings'] ) ) {
				return new \WP_Error(
					'nfd_onboarding_error',
					__( 'Settings does not exist under the selected theme settings.', 'wp-module-onboarding' ),
					array( 'status' => 400 )
				);
			}

			// Remove specific keys from the settings before using them as these are large and unnecessary.
			unset( $user_selected_theme_settings['settings']['styles'] );
			unset( $user_selected_theme_settings['settings']['__unstableResolvedAssets'] );
			unset( $user_selected_theme_settings['settings']['__experimentalFeatures'] );
			$settings = $user_selected_theme_settings['settings'];
		}

		// Remove inactive DIY flow fonts from the theme JSON settings, retaining only the fonts that are currently in use or selected
		$settings = FontService::deselect_inactive_diy_fonts( $settings );

		return self::update_global_style_variation(
			$id,
			$styles,
			$settings
		);
	}

	/**
	 * Updates the global style variation given the id.
	 *
	 * This private function sends a POST request to update the global style using the provided
	 * styles and settings.
	 *
	 * @param string $id       The ID of the global style variation to update.
	 * @param array  $styles   The styles to apply.
	 * @param array  $settings The settings to apply.
	 * @return true|\WP_Error  Returns true on success, or a WP_Error on failure.
	 */
	private static function update_global_style_variation( $id, $styles, $settings ) {
		// Create a REST request to update global styles.
		$update_active_global_style_request = new \WP_REST_Request(
			'POST',
			"/wp/v2/global-styles/$id"
		);
		$update_active_global_style_request->set_header( 'Content-Type', 'application/json' );
		// Generate custom theme.json data.
		$custom_theme_json = self::create_custom_theme_json( $styles, $settings );
		if ( ! isset( $custom_theme_json['styles'] ) || ! isset( $custom_theme_json['settings'] ) ) {
			return new \WP_Error(
				'nfd_onboarding_error',
				__( 'There is an error with your styles or settings.', 'wp-module-onboarding' ),
				array( 'status' => 400 )
			);
		}
		// Set the request body parameters.
		$update_active_global_style_request->set_body_params(
			array(
				'id'       => $id,
				'styles'   => $custom_theme_json['styles'],
				'settings' => $custom_theme_json['settings'],
			)
		);

		// Execute the REST request.
		$update_active_global_style_response = rest_do_request( $update_active_global_style_request );
		if ( $update_active_global_style_response->is_error() ) {
			return $update_active_global_style_response->as_error();
		}

		return true;
	}

	/**
	 * Retrieves the post ID of the active/parent custom global styles.
	 *
	 * @return int The post ID of the active custom global styles.
	 */
	public static function get_active_custom_global_styles_post_id() {
		return \WP_Theme_JSON_Resolver::get_user_global_styles_post_id();
	}

	/**
	 * Creates a custom theme.json array.
	 *
	 * This function generates a theme.json structure based on the provided styles and settings.
	 *
	 * @param array $styles   The styles to include in the theme.json.
	 * @param array $settings The settings to include in the theme.json.
	 * @param int   $version  The version of the theme.json schema. Defaults to the latest schema.
	 * @return array          The raw theme.json data.
	 */
	public static function create_custom_theme_json( $styles, $settings, $version = \WP_Theme_JSON::LATEST_SCHEMA ) {
		$theme_json = new \WP_Theme_JSON(
			array(
				'version'  => $version,
				'styles'   => $styles,
				'settings' => $settings,
			)
		);

		return $theme_json->get_raw_data();
	}
}
