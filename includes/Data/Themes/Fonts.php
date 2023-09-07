<?php

namespace NewfoldLabs\WP\Module\Onboarding\Data\Themes;

use NewfoldLabs\WP\Module\Onboarding\Data\Themes;

/**
 * Contains custom font palettes for a given theme.
 */
final class Fonts {

	/**
	 * This contains the different font variations for the theme.
	 *
	 * @var string
	 */
	protected static function get_theme_fonts() {
		return array(
			'yith-wonder' => array(
				'modern-approachable'            => array(
					'label'   => __( 'Modern & approachable', 'wp-module-onboarding' ),
					'matches' => 'yith-wonder/theme-json',
					'styles'  => array(
						'typography' => array(
							'fontFamily' => 'var(--wp--preset--font-family--mulish)',
						),
						'blocks'     => array(
							'core/heading' => array(
								'typography' => array(
									'fontFamily' => 'var(--wp--preset--font-family--poppins)',
								),
							),
						),
					),
				),
				'strong-sleek'                   => array(
					'label'   => __( 'Strong & sleek', 'wp-module-onboarding' ),
					'matches' => 'yith-wonder/styles/01-blue-shades',
					'styles'  => array(
						'typography' => array(
							'fontFamily' => 'var(--wp--preset--font-family--raleway)',
						),
						'blocks'     => array(
							'core/heading' => array(
								'typography' => array(
									'fontFamily' => 'var(--wp--preset--font-family--oswald)',
								),
							),
						),
					),
				),
				'stately-elevated'               => array(
					'label'   => __( 'Stately & elevated', 'wp-module-onboarding' ),
					'matches' => 'yith-wonder/styles/02-pink-shades',
					'styles'  => array(
						'typography' => array(
							'fontFamily' => 'var(--wp--preset--font-family--source-sans-pro)',
						),
						'blocks'     => array(
							'core/heading' => array(
								'typography' => array(
									'fontFamily' => 'var(--wp--preset--font-family--playfair)',
								),
							),
						),
					),
				),
				'typewriter-crisp-midcentury'    => array(
					'label'   => __( 'Typewriter & crisp midcentury', 'wp-module-onboarding' ),
					'matches' => 'yith-wonder/styles/03-orange-shades',
					'styles'  => array(
						'typography' => array(
							'fontFamily' => 'var(--wp--preset--font-family--jost)',
						),
						'blocks'     => array(
							'core/heading' => array(
								'typography' => array(
									'fontFamily' => 'var(--wp--preset--font-family--solway)',
								),
							),
						),
					),
				),
				'refined-traditional-newsletter' => array(
					'label'   => __( 'Refined traditional newsletter', 'wp-module-onboarding' ),
					'matches' => 'yith-wonder/styles/04-black-shades',
					'styles'  => array(
						'typography' => array(
							'fontFamily' => 'var(--wp--preset--font-family--jost)',
						),
						'blocks'     => array(
							'core/heading' => array(
								'typography' => array(
									'fontFamily' => 'var(--wp--preset--font-family--merriweather)',
								),
							),
						),
					),
				),
				'bold-stamp-slab'                => array(
					'label'   => __( 'Bold stamp & slab', 'wp-module-onboarding' ),
					'matches' => 'yith-wonder/styles/05-red-shades',
					'styles'  => array(
						'typography' => array(
							'fontFamily' => 'var(--wp--preset--font-family--roboto-slab)',
						),
						'blocks'     => array(
							'core/heading' => array(
								'typography' => array(
									'fontFamily' => 'var(--wp--preset--font-family--changa-one)',
								),
							),
						),
					),
				),
				'fast-simple'                    => array(
					'label'   => __( 'Fast & Simple', 'wp-module-onboarding' ),
					'matches' => 'newfold/onboarding-01',
					'styles'  => array(
						'typography' => array(
							'fontFamily' => 'var(--wp--preset--font-family--system)',
						),
						'blocks'     => array(
							'core/heading' => array(
								'typography' => array(
									'fontFamily' => 'var(--wp--preset--font-family--system)',
								),
							),
						),
					),
				),
				'timeless-traditional'           => array(
					'label'   => __( 'Timeless & Traditional', 'wp-module-onboarding' ),
					'matches' => 'newfold/onboarding-02',
					'styles'  => array(
						'typography' => array(
							'fontFamily' => 'var(--wp--preset--font-family--serif)',
						),
						'blocks'     => array(
							'core/heading' => array(
								'typography' => array(
									'fontFamily' => 'var(--wp--preset--font-family--serif)',
								),
							),
						),
					),
				),
				'sleek-sophisticated'            => array(
					'label'   => __( 'Sleek & Sophisticated', 'wp-module-onboarding' ),
					'matches' => 'newfold/onboarding-03',
					'styles'  => array(
						'typography' => array(
							'fontFamily' => 'var(--wp--preset--font-family--dm-sans)',
						),
						'blocks'     => array(
							'core/heading' => array(
								'typography' => array(
									'fontFamily' => 'var(--wp--preset--font-family--dm-sans)',
								),
							),
						),
					),
				),
				'clear-crisp'                    => array(
					'label'   => __( 'Clear & Crisp', 'wp-module-onboarding' ),
					'matches' => 'newfold/onboarding-04',
					'styles'  => array(
						'typography' => array(
							'fontFamily' => 'var(--wp--preset--font-family--inter)',
						),
						'blocks'     => array(
							'core/heading' => array(
								'typography' => array(
									'fontFamily' => 'var(--wp--preset--font-family--inter)',
								),
							),
						),
					),
				),
				'retro-classy'                   => array(
					'label'   => __( 'Retro & Classy', 'wp-module-onboarding' ),
					'matches' => 'newfold/onboarding-05',
					'styles'  => array(
						'typography' => array(
							'fontFamily' => 'var(--wp--preset--font-family--league-spartan)',
						),
						'blocks'     => array(
							'core/heading' => array(
								'typography' => array(
									'fontFamily' => 'var(--wp--preset--font-family--league-spartan)',
								),
							),
						),
					),
				),
				'defined-solid'                  => array(
					'label'   => __( 'Defined & Solid', 'wp-module-onboarding' ),
					'matches' => 'newfold/onboarding-06',
					'styles'  => array(
						'typography' => array(
							'fontFamily' => 'var(--wp--preset--font-family--roboto-slab)',
						),
						'blocks'     => array(
							'core/heading' => array(
								'typography' => array(
									'fontFamily' => 'var(--wp--preset--font-family--roboto-slab)',
								),
							),
						),
					),
				),
			),
		);
	}

	/**
	 * Retrieves the active theme font variations.
	 *
	 * @return array|\WP_Error
	 */
	public static function get_fonts_from_theme() {
		$active_theme = Themes::get_active_theme();
		$theme_fonts  = self::get_theme_fonts();
		return isset( $theme_fonts[ $active_theme ] ) ? $theme_fonts[ $active_theme ] : false;
	}
}
