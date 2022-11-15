<?php

namespace NewfoldLabs\WP\Module\Onboarding\Data\Themes;

final class Fonts {

	 /**
	  * This contains the different font variations for the theme.
	  *
	  * @var string
	  */
	protected static $theme_fonts = array(
		'yith-wonder' => array(
			'modern-approachable'            => array(
				'label'   => 'Modern & approachable',
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
				'label'   => 'Strong & sleek',
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
				'label'   => 'Stately & elevated',
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
				'label'   => 'Typewriter & crisp midcentury',
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
				'label'   => 'Refined traditional newsletter',
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
				'label'   => 'Bold stamp & slab',
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
				'label'   => 'Fast & Simple',
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
				'label'   => 'Timeless & Traditional',
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
				'label'   => 'Sleek & Sophisticated',
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
				'label'   => 'Clear & Crisp',
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
				'label'   => 'Retro & Classy',
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
				'label'   => 'Defined & Solid',
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

	 /**
	  * Retrieves the active theme font variations.
	  *
	  * @return array|\WP_Error
	  */
	public static function get_fonts_from_theme() {
		 $active_theme = ( \wp_get_theme() )->get( 'TextDomain' );
		 return isset( self::$theme_fonts[ $active_theme ] ) ? self::$theme_fonts[ $active_theme ] : false;
	}
}
