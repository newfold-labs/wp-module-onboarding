<?php

namespace NewfoldLabs\WP\Module\Onboarding\Data\Themes;

/**
 * Contains custom color palettes for a given theme.
 */
final class Colors {

	/**
	 * This contains the different color variations for the theme.
	 *
	 * @var string
	 */
	protected static $theme_colors = array(
		'yith-wonder' => array(
			'tailored' => array(
				'calm'         => array(
					'header-background'    => '#1A4733',
					'header-foreground'    => '#FFFFFF',
					'header-titles'        => '#FFFFFF',
					'secondary-background' => '#1A4733',
					'secondary-foreground' => '#FFF',
					'tertiary'             => '#C7DBFF',
					'secondary'            => '#344A77',
					'primary'              => '#1A4733',
					'base'                 => '#FFFFFF',
				),
				'cool'         => array(
					'header-background'    => '#C7DBFF',
					'header-foreground'    => '#21447B',
					'header-titles'        => '#21447B',
					'secondary-background' => '#C7DBFF',
					'secondary-foreground' => '#21447B',
					'tertiary'             => '#C7DBFF',
					'secondary'            => '#3764B4',
					'primary'              => '#21447B',
					'base'                 => '#FFFFFF',
				),
				'warm'         => array(
					'header-background'    => '#FDE5D0',
					'header-foreground'    => '#7A3921',
					'header-titles'        => '#7A3921',
					'secondary-background' => '#FDE5D0',
					'secondary-foreground' => '#7A3921',
					'tertiary'             => '#FFEDED',
					'secondary'            => '#B97040',
					'primary'              => '#7A3921',
					'base'                 => '#FFFFFF',
				),
				'radiant'      => array(
					'header-background'    => '#63156A',
					'header-foreground'    => '#E3F7FF',
					'header-titles'        => '#E3F7FF',
					'secondary-background' => '#781980',
					'secondary-foreground' => '#E3F7FF',
					'tertiary'             => '#C7F0FF',
					'secondary'            => '#64288C',
					'primary'              => '#63156A',
					'base'                 => '#FFFFFF',
				),
				'bold'         => array(
					'header-background'    => '#FFD7F1',
					'header-foreground'    => '#09857C',
					'header-titles'        => '#09857C',
					'secondary-background' => '#ffddf3',
					'secondary-foreground' => '#09857C',
					'tertiary'             => '#F2A3D6',
					'secondary'            => '#076D66',
					'primary'              => '#09857C',
					'base'                 => '#FFFFFF',
				),
				'retro'        => array(
					'header-background'    => '#096385',
					'header-foreground'    => '#F2E6A2',
					'header-titles'        => '#F2E6A2',
					'secondary-background' => '#096385',
					'secondary-foreground' => '#F2E6A2',
					'tertiary'             => '#F2E6A2',
					'secondary'            => '#BE9E00',
					'primary'              => '#096385',
					'base'                 => '#FFFFFF',
				),
				'professional' => array(
					'header-background'    => '#6D8258',
					'header-foreground'    => '#F5FAFF',
					'header-titles'        => '#D2E0F5',
					'secondary-background' => '#6D8258',
					'secondary-foreground' => '#F5FAFF',
					'tertiary'             => '#d6e4f9',
					'secondary'            => '#405F1C',
					'primary'              => '#558320',
					'base'                 => '#FFFFFF',
				),
				'crisp'        => array(
					'header-background'    => '#ccc',
					'header-foreground'    => '#333',
					'header-titles'        => '#234',
					'secondary-background' => '#ccc',
					'secondary-foreground' => '#333',
					'tertiary'             => '#777',
					'secondary'            => '#17222E',
					'primary'              => '#223344',
					'base'                 => '#FFFFFF',
				),
				'polished'     => array(
					'header-background'    => '#313131',
					'header-foreground'    => '#fff',
					'header-titles'        => '#6B69EA',
					'secondary-background' => '#444',
					'secondary-foreground' => '#ddd',
					'tertiary'             => '#313131',
					'secondary'            => '#6B69EA',
					'primary'              => '#5100FA',
					'base'                 => '#FFFFFF',
				),
				'nightowl'     => array(
					'header-background'    => '#06080A',
					'header-foreground'    => '#fff',
					'header-titles'        => '#FAAA14',
					'secondary-background' => '#0A0C0E',
					'secondary-foreground' => '#fff',
					'tertiary'             => '#FFDFA3',
					'secondary'            => '#06080A',
					'primary'              => '#B97900',
					'base'                 => '#FFFFFF',
				),
				'subtle'       => array(
					'header-background'    => '#C7ADBB',
					'header-foreground'    => '#5A3C4B',
					'header-titles'        => '#5A3C4B',
					'secondary-background' => '#C7ADBB',
					'secondary-foreground' => '#5A3C4B',
					'tertiary'             => '#D4C9CF',
					'secondary'            => '#57203c',
					'primary'              => '#5A3C4B',
					'base'                 => '#FFFFFF',
				),
			),
			'custom-picker-grouping'  => array(
				'base'     => array(
					'header-foreground',
					'header-titles',
					'secondary-foreground',
				),
				'tertiary' => array(
					'header-background',
					'secondary-background',
				),
			),
		),
	);

	/**
	 * Retrieves the active theme color variations.
	 *
	 * @return array|\WP_Error
	 */
	public static function get_colors_from_theme() {
		$active_theme  = ( \wp_get_theme() )->get( 'TextDomain' );
		$pattern_slugs = self::$theme_colors[ $active_theme ];

		if ( ! isset( $pattern_slugs ) ) {
			return new \WP_Error(
				'Theme Colors not found',
				'No WordPress Colors are available for this theme.',
				array( 'status' => 404 )
			);
		}

		return $pattern_slugs;
	}
}
