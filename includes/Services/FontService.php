<?php

namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Themes\Fonts;
use NewfoldLabs\WP\Module\Onboarding\Data\Services\FlowService;

/**
 * Class FontService
 *
 * Provides functionality to manage fonts in theme JSON settings, particularly
 * for deselecting inactive or unused fonts.
 */
class FontService {
	/**
	 * Deselects fonts that are not active from the theme JSON settings.
	 *
	 * This function filters out fonts from the given theme JSON settings that
	 * are not in the list of active font slugs, ensuring only the selected fonts
	 * remain active.
	 *
	 * @param array $theme_json_settings The theme JSON settings array.
	 * @param array $active_slugs An array of active font slugs to be retained.
	 *
	 * @return array The modified theme JSON settings with inactive fonts removed.
	 */
	public static function deselect_fonts_from_theme_json_settings( $theme_json_settings, $active_slugs ) {
		if ( ! isset( $theme_json_settings['typography']['fontFamilies'] ) ) {
			return $theme_json_settings;
		}

		// Get the currently selected fonts
		$initial_selected_fonts = $theme_json_settings['typography']['fontFamilies'];
		$final_selected_fonts   = array();
		// Iterate through each font and keep only those that are active
		foreach ( $initial_selected_fonts as $index => $font ) {
			if ( isset( $font['slug'] ) && in_array( $font['slug'], $active_slugs, true ) ) {
				array_push( $final_selected_fonts, $font );
			}
		}
		// Update the theme settings with the filtered list of fonts
		$theme_json_settings['typography']['fontFamilies'] = $final_selected_fonts;

		return $theme_json_settings;
	}

	/**
	 * Deselects inactive DIY flow fonts from the theme JSON settings.
	 *
	 * This function retrieves the currently selected font style from the flow
	 * data, checks which fonts are used, and then calls another function to
	 * remove unused fonts from the theme JSON settings.
	 *
	 * @param array $theme_json_settings The theme JSON settings array.
	 *
	 * @return array The modified theme JSON settings with inactive DIY fonts removed.
	 */
	public static function deselect_inactive_diy_fonts( $theme_json_settings ) {
		// Get the selected font style from the flow data
		$selected_font_style = FlowService::get_selected_font_style();
		if ( empty( $selected_font_style ) ) {
			return $theme_json_settings;
		}

		// Retrieve the fonts available in the flow
		$theme_fonts = Fonts::get_fonts_from_theme();
		if ( ! isset( $theme_fonts[ $selected_font_style ] ) ) {
			return $theme_json_settings;
		}

		// Get the data for the selected font style
		$selected_font_data = $theme_fonts[ $selected_font_style ];
		$selected_slugs     = $selected_font_data['slugs'];

		// Deselect fonts that are not part of the selected slugs
		return self::deselect_fonts_from_theme_json_settings( $theme_json_settings, $selected_slugs );
	}
}
