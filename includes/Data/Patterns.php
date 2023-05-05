<?php
namespace NewfoldLabs\WP\Module\Onboarding\Data;

/**
 * Class Patterns
 */
final class Patterns {

	/**
	 * List of dummy menu page titles.
	 *
	 * @return array
	 */
	public static function get_dummy_menu_items() {
		return array(
			__( 'Home', 'wp-module-onboarding' ),
			__( 'About', 'wp-module-onboarding' ),
			__( 'Contact', 'wp-module-onboarding' ),
			__( 'News', 'wp-module-onboarding' ),
			__( 'Privacy', 'wp-module-onboarding' ),
			__( 'Careers', 'wp-module-onboarding' ),
		);
	}

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
						'active'  => true,
						'replace' => true,
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
				'homepage-styles' => self::get_patterns_for_homepage_menu_slugs(),
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
	 * Get post metadata for a pattern. Ref: SitePagesController.php
	 *
	 * @return array
	 */
	public static function get_theme_patterns_meta() {
		return array(
			'yith-wonder' => array(
				'company-page' => array(
					'nf_dc_page' => 'about',
				),
				'contact-us'   => array(
					'nf_dc_page' => 'contact',
				),
				'homepage-1'   => array(
					'nf_dc_page' => 'home',
				),
				'homepage-2'   => array(
					'nf_dc_page' => 'home',
				),
				'homepage-3'   => array(
					'nf_dc_page' => 'home',
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
	 * Get the post meta for a given pattern slug.
	 *
	 * @param string $pattern_slug The pattern slug (theme/kebab-cased-name).
	 * @return array|boolean
	 */
	public static function get_meta_from_pattern_slug( $pattern_slug ) {
		$theme_pattern = explode( '/', $pattern_slug );
		if ( ! isset( $theme_pattern[0] ) || ! isset( $theme_pattern[1] ) ) {
			return false;
		}
		$theme_patterns_meta = self::get_theme_patterns_meta();
		return isset( $theme_patterns_meta[ $theme_pattern [0] ][ $theme_pattern [1] ] )
		? $theme_patterns_meta[ $theme_pattern [0] ][ $theme_pattern [1] ]
		: false;
	}

	/**
	 * Retrieve pattern from slug.
	 *
	 * @param array $pattern_slug Pattern Slug Data
	 *
	 * @return array|boolean
	 */
	public static function get_pattern_from_slug( $pattern_slug ) {
		$active_theme            = ( \wp_get_theme() )->get( 'TextDomain' );
		$pattern_slug            = $active_theme . '/' . $pattern_slug;
		$block_patterns_registry = \WP_Block_Patterns_Registry::get_instance();
		if ( $block_patterns_registry->is_registered( $pattern_slug ) ) {
			$pattern = $block_patterns_registry->get_registered( $pattern_slug );
			return array(
				'title'   => $pattern['title'],
				'content' => self::cleanup_wp_grammar( $pattern['content'] ),
				'name'    => $pattern['name'],
				'meta'    => self::get_meta_from_pattern_slug( $pattern_slug ),
			);
		}

		return false;
	}

	/**
	 * Replace the header menu slug in the patterns array
	 *
	 * @param array  $patterns Patterns for the specific step
	 * @param string $header_menu_slug header menu slug choosen by the user
	 *
	 * @return array
	 */
	private static function replace_header_menu_slug( $patterns, $header_menu_slug ) {
		foreach ( $patterns as $slug => $slug_details ) {
			if ( isset( $slug_details['replace'] ) && true === $slug_details['replace'] ) {
				unset( $patterns[ $slug ] );
				$patterns = array_merge( array( $header_menu_slug => $slug_details ), $patterns );
			}
		}
		return $patterns;
	}

	/**
	 * Replace the header menu slug in the patterns array
	 *
	 * @param array $pattern_content pattern grammar that is to be modified
	 *
	 * @return array
	 */
	private static function replace_split_menu_items( $pattern_content ) {
		$dummy_menu_grammar      = '';
		$menu_navigation_grammar = '<!-- wp:navigation-link {"isTopLevelLink":true} /-->';

		foreach ( self::get_dummy_menu_items() as $item ) {
			$dummy_menu_grammar = '<!-- wp:navigation-link {
				"isTopLevelLink":true, 
				"label":"' . strtolower( $item ) . '", 
				"title":"' . $item . '", 
				"url":"' . get_site_url() . '/' . strtolower( $item ) . '"
			} /-->';
			$pattern_content    = preg_replace( $menu_navigation_grammar, $dummy_menu_grammar, $pattern_content, 1 );
		}
		return $pattern_content;
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
				$pattern      = $block_patterns_registry->get_registered( $pattern_name );
				if ( $block_patterns_registry->is_registered( $pattern_name ) ) {
					if ( array_key_exists( 'content', $pattern_slugs[ $pattern_slug ] ) && ! empty( $pattern_slugs[ $pattern_slug ]['content'] ) ) {
						$pattern['content'] = $pattern_slugs[ $pattern_slug ]['content'];
					}
					// if header menu slug contains "split" replace the menu links with dummy links
					if ( false !== stripos( $pattern_slug, 'split' ) ) {
						$pattern['content'] = self::replace_split_menu_items( $pattern['content'] );
					}

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

	public static function get_patterns_for_homepage_menu_slugs() {
		$flow_data        = \get_option( Options::get_option_name( 'flow' ) );
		$header_menu_slug = explode( '/', $flow_data['data']['partHeader'] )[1];
		$header_slug      = ! empty( $header_menu_slug ) ? $header_menu_slug : 'site-header-left-logo-navigation-inline';

		$homepage_slugs = array(
			$header_slug,
			'site-footer',
		);

		$homepage_style_slugs = array(
			'homepage-1' => array(
				'active'  => true,
				'shown'   => true,
				'content' => '',
			),
			'homepage-2' => array(
				'active'  => true,
				'shown'   => true,
				'content' => '',
			),
			'homepage-3' => array(
				'active'  => true,
				'shown'   => true,
				'content' => '',
			),
		);

		$header_block_grammar = self::get_pattern_from_slug( $homepage_slugs[0] )['content'];
		// if header menu slug contains "split" replace the menu links with dummy links
		if ( false !== stripos( $homepage_slugs[0], 'split' ) ) {
			$header_block_grammar = self::replace_split_menu_items( $header_block_grammar );
		}

		$footer_block_grammar = self::get_pattern_from_slug( $homepage_slugs[1] )['content'];

		foreach ( array_keys( $homepage_style_slugs ) as $homepage_style ) {
			$homepage_style_slugs[ $homepage_style ]['content'] .= $header_block_grammar . self::get_pattern_from_slug( $homepage_style )['content'] . $footer_block_grammar;
		}

		return $homepage_style_slugs;
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
