<?php
namespace NewfoldLabs\WP\Module\Onboarding\Data;

/**
 * Class Patterns
 */
final class Patterns {

	/**
	 * Retrieve Patterns for Theme Step.
	 *
	 * @return array
	 */
	protected static function get_theme_step_patterns() {
		return array(
			'yith-wonder' => array(
				'theme-styles'    => array(
					'site-header-left-logo-navigation-inline' => array(
						'active' => true,
					),
					'homepage-1'  => array(
						'active'  => true,
						'shown'   => true,
						'combine' => true,
					),
					'site-footer' => array(
						'active' => true,
					),
				),
				'homepage-styles' => array(
					'site-header-left-logo-navigation-inline' => array(
						'active' => true,
					),
					'homepage-1'  => array(
						'active' => true,
						'shown'  => true,
					),
					'homepage-2'  => array(
						'active' => true,
						'shown'  => true,
					),
					'homepage-3'  => array(
						'active' => true,
						'shown'  => true,
					),
					'site-footer' => array(
						'active' => true,
					),
				),
				'site-pages'      => array(
					'company-page'      => array(
						'active'      => true,
						'title'       => 'About',
						'selected'    => true,
						'shown'       => true,
						'description' => __( 'Explain your company values or the history behind your brand.', 'wp-module-onboarding' ),
					),
					'contact-us'        => array(
						'active'      => true,
						'selected'    => true,
						'title'       => 'Contact',
						'shown'       => true,
						'description' => __( 'Offer visitors a single page with a contact form, your street address and social media.', 'wp-module-onboarding' ),
					),
					'testimonials-page' => array(
						'active'      => true,
						'title'       => 'Testimonials',
						'selected'    => false,
						'shown'       => true,
						'description' => __( 'Highlight your success with testimonials from your fans.', 'wp-module-onboarding' ),
					),
					'blog-page'         => array(
						'active'      => true,
						'selected'    => true,
						'title'       => 'Blog',
						'shown'       => true,
						'description' => __( 'A page for periodic news, announcements and ideas.', 'wp-module-onboarding' ),
					),
				),
				'header-menu'     => array(
					'site-header-left-logo-navigation-inline' => array(
						'active' => true,
						'shown'  => true,
					),
					'homepage-1'                => array(
						'active' => true,
					),
					'site-footer'               => array(
						'active' => true,
					),
					'site-header-left-logo-navigation-below' => array(
						'active' => true,
						'shown'  => true,
					),
					'site-header-centered'      => array(
						'active' => true,
						'shown'  => true,
					),
					'site-header-splitted-menu' => array(
						'active' => true,
						'shown'  => true,
					),
				),
			),
		);
	}

	/**
	 * Sanitize the content by cleaning wp_grammar.
	 *
	 * @param string $content Data to clean
	 *
	 * @return string
	 */
	private static function cleanup_wp_grammar( $content ) {

		// Remove template-part if that exists
		$content = preg_replace( '/^<!-- wp:template-part .* \/-->$/m', '', $content );

		// Create an array with the values you want to replace
		$searches = array( "\n", "\t" );

		// Replace the line breaks and tabs with a empty string
		$content = str_replace( $searches, '', $content );

		return $content;
	}

	/**
	 * Retrieve pattern from slug.
	 *
	 * @param array $pattern_slug Pattern Slug Data
	 *
	 * @return array|boolean
	 */
	public static function get_pattern_from_slug( $pattern_slug ) {

		$block_patterns_registry = \WP_Block_Patterns_Registry::get_instance();
		if ( $block_patterns_registry->is_registered( $pattern_slug ) ) {
			$pattern = $block_patterns_registry->get_registered( $pattern_slug );
			return array(
				'title'   => $pattern['title'],
				'content' => self::cleanup_wp_grammar( $pattern['content'] ),
				'name'    => $pattern['name'],
			);
		}

		return false;
	}

	/**
	 * Retrieve Theme Step Patterns from chosen Theme in Previous Step
	 *
	 * @param string  $step Step from which Theme Step Pattern is required
	 * @param boolean $squash Flag set to retrieve the block pattern
	 *
	 * @return array|string
	 */
	public static function get_theme_step_patterns_from_step( $step, $squash = false ) {
		$active_theme = ( \wp_get_theme() )->get( 'TextDomain' );

		if ( ! isset( self::get_theme_step_patterns()[ $active_theme ][ $step ] ) ) {
			return false;
		}

		$pattern_slugs           = self::get_theme_step_patterns()[ $active_theme ][ $step ];
		$block_patterns_registry = \WP_Block_Patterns_Registry::get_instance();
		$block_patterns          = array();
		$block_patterns_squashed = '';
		foreach ( array_keys( $pattern_slugs ) as $pattern_slug ) {
			if ( true === $pattern_slugs[ $pattern_slug ]['active'] ) {
				$pattern_name = $active_theme . '/' . $pattern_slug;
				if ( $block_patterns_registry->is_registered( $pattern_name ) ) {
					$pattern = $block_patterns_registry->get_registered( $pattern_name );
					if ( ! $squash ) {
						$block_patterns[] = array_merge(
							array(
								'slug'    => $pattern_name,
								'title'   => $pattern['title'],
								'content' => self::cleanup_wp_grammar( $pattern['content'] ),
								'name'    => $pattern['name'],
							),
							$pattern_slugs[ $pattern_slug ]
						);
						continue;
					}
					$block_patterns_squashed .= self::cleanup_wp_grammar( $pattern['content'] );
				}
			}
		}

		return $squash ? $block_patterns_squashed : $block_patterns;
	}

	/**
	 * Retrieve Pattern Count.
	 *
	 * @return array
	 */
	public static function get_count_of_patterns() {
		$active_theme          = ( \wp_get_theme() )->get( 'TextDomain' );
		$theme_step_patterns   = self::get_theme_step_patterns();
		$active_theme_patterns = isset( $theme_step_patterns[ $active_theme ] ) ? $theme_step_patterns[ $active_theme ] : array();

		$theme_pattern_count = array();
		foreach ( $active_theme_patterns as $theme_step => $patterns ) {
			$theme_step_count = 0;
			$combine_styles   = 1;
			foreach ( $patterns as $pattern => $pattern_data ) {
				if ( isset( $pattern_data['shown'] ) && true === $pattern_data['shown'] ) {
					++$theme_step_count;
				}
				if ( isset( $pattern_data['combine'] ) && true === $pattern_data['combine'] ) {
					$combine_styles = count( \WP_Theme_JSON_Resolver::get_style_variations() ) + 1;
				}
			}

			$theme_pattern_count[ $theme_step ] = array(
				'previewCount' => $combine_styles * $theme_step_count,
			);
		}
		return $theme_pattern_count;
	}

}
