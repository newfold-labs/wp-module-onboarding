<?php

namespace NewfoldLabs\WP\Module\Onboarding\Data\Themes;

final class Colors {


	 /**
	  * This contains the different color variations for the theme.
	  *
	  * @var string
	  */
	protected static $theme_colors = array(
		'yith-wonder' => array(
			'calm'         => array(
				'tertiary'   => '#C7DBFF',
				'secondary'  => '#E6EBEE',
				'primary'    => '#1A4733',
				'background' => '',
			),
			'cool'         => array(
				'tertiary'   => '#C7DBFF',
				'secondary'  => '#EDF7FE',
				'primary'    => '#21447B',
				'background' => '',
			),
			'warm'         => array(
				'tertiary'   => '#FFEDED',
				'secondary'  => '#FEF7E8',
				'primary'    => '#7A3921',
				'background' => '',
			),
			'radiant'      => array(
				'tertiary'   => '#C7F0FF',
				'secondary'  => '#FEF4FB',
				'primary'    => '#63156A',
				'background' => '',
			),
			'bold'         => array(
				'tertiary'   => '#F2A3D6',
				'secondary'  => '#FFFBF5',
				'primary'    => '#09857C',
				'background' => '',
			),
			'retro'        => array(
				'tertiary'   => '#F2E6A2',
				'secondary'  => '#F5FFFF',
				'primary'    => '#096385',
				'background' => '',
			),
			'professional' => array(
				'tertiary'   => '#A2C1F2',
				'secondary'  => '#F5FAFF',
				'primary'    => '#669933',
				'background' => '',
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
