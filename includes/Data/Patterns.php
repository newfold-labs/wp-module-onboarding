<?php
namespace NewfoldLabs\WP\Module\Onboarding\Data;

final class Patterns {

	protected static $theme_step_patterns = array(
		'yith-wonder' => array(
			'theme-styles' => array(
				'site-header-left-logo-navigation-inline',
				'homepage-1',
				'site-footer',
			),
			'homepage-styles' => array(
				'site-header-left-logo-navigation-inline',
				'homepage-1',
				'homepage-2',
				'homepage-3',
				'site-footer',
			),
		),
	);

	public static function cleanup_wp_grammar( $content ) {

		// Remove template-part if that exists
		$content = preg_replace( '/^<!-- wp:template-part .* \/-->$/m', '', $content );

		// Create an array with the values you want to replace
		$searches = array( "\n", "\t" );

		// Replace the line breaks and tabs with a empty string
		$content = str_replace( $searches, '', $content );

		return $content;
	}

	public static function get_pattern_from_slug( $pattern_slug ) {
		$active_theme = ( \wp_get_theme() )->get( 'TextDomain' );
		$pattern_name = $active_theme . '/' . $pattern_slug;

        $block_patterns_registry = \WP_Block_Patterns_Registry::get_instance();
		if ( $block_patterns_registry->is_registered( $pattern_name ) ) {
			$pattern = $block_patterns_registry->get_registered( $pattern_name );
			return array(
				'title'   => $pattern['title'],
				'content' => self::cleanup_wp_grammar( $pattern['content'] ),
				'name'    => $pattern['name'],
			);
		}

		return false;
	}

	public static function get_theme_step_patterns_from_step( $step, $squash = false ) {
		$active_theme = ( \wp_get_theme() )->get( 'TextDomain' );

		if ( ! isset( self::$theme_step_patterns[ $active_theme ][ $step ] ) ) {
			return false;
		}

		$pattern_slugs           = self::$theme_step_patterns[ $active_theme ][ $step ];
		$block_patterns_registry = \WP_Block_Patterns_Registry::get_instance();
		$block_patterns          = array();
		$block_patterns_squashed = '';
		foreach ( $pattern_slugs as $name=>$pattern_slug ) {
			$pattern_name = $active_theme . '/' . $pattern_slug;
			if ( $block_patterns_registry->is_registered( $pattern_name ) ) {
				$pattern = $block_patterns_registry->get_registered( $pattern_name );
				if ( ! $squash ) {
					$block_patterns[] = array(
						'slug'    => $pattern_slug,
						'title'   => $pattern['title'],
						'content' => self::cleanup_wp_grammar( $pattern['content'] ),
						'name'    => $pattern['name'],
					);
					continue;
				}
				$block_patterns_squashed .= self::cleanup_wp_grammar( $pattern['content'] );
			}
		}

		return $squash ? $block_patterns_squashed : $block_patterns;
	}
}
