<?php

namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Data\Data;
use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\Data\Patterns;
use NewfoldLabs\WP\Module\Onboarding\WP_Admin;

/**
 * Instantiate controllers and register routes.
 */
class RestApiFilter {

	/**
	 * Setup the custom REST API filters
	 */
	public function __construct() {
		\add_filter( 'rest_request_before_callbacks', array( __CLASS__, 'add_appropriate_filters_for_onboarding' ), 10, 3 );
		if ( 'ecommerce' === Data::current_flow() ) {
			\add_filter( 'rest_api_init', array( __CLASS__, 'register_wc_settings_options' ) );
		}
	}

	/**
	 * Custom filter to check for pages API call, if true then add more filters for the onboarding flow only.
	 *
	 * @param array            $response - the API response
	 * @param array            $handler - handler
	 * @param \WP_REST_Request $request - WP_REST_Request object
	 *
	 * @return array
	 */
	public static function add_appropriate_filters_for_onboarding( $response, array $handler, \WP_REST_Request $request ) {
		if ( ! self::is_request_from_onboarding_flow( $request ) ) {
			return $response;
		}
		$request_method = $request->get_method();
		switch ( $request_method ) {
			case 'GET':
				self::get_method_filters( $request );
				break;
		}
		return $response;
	}

	/**
	 * Apply the appropriate filters based on the route
	 *
	 * @param object $request REST API object
	 * @return void
	 */
	private static function get_method_filters( $request ) {
		$request_route = $request->get_route();
		switch ( $request_route ) {
			case '/wp/v2/pages':
				\add_filter( 'rest_page_query', array( __CLASS__, 'header_menu_limit_pages' ) );
				\add_filter( 'rest_request_after_callbacks', array( __CLASS__, 'header_menu_rename_pages' ), 10, 3 );
				break;
			case '/wp/v2/navigation':
				\add_filter( 'rest_request_after_callbacks', array( __CLASS__, 'wp_onboarding_nav_menu_filter' ), 10, 2 );
				break;
			case '/newfold-onboarding/v1/patterns':
				\add_filter( 'rest_request_after_callbacks', array( __CLASS__, 'wp_onboarding_site_logo_filter' ), 10, 2 );
				break;
		}
	}

	/**
	 * Function for modifying the grammar to contain a dynamic sized logo.
	 *
	 * @param object $response - WP_REST_Response object
	 * @param array  $args - An array containing arguments.
	 *
	 * @return object
	 */
	public static function wp_onboarding_site_logo_filter( $response, $args ) {
		$response_data = $response->get_data();

		$site_logo_id = \get_option( Options::get_option_name( 'site_icon', false ) );
		if ( '0' !== $site_logo_id ) {
			if ( is_string( $response_data ) ) {
				$response_data = self::wp_onboarding_add_site_logo_styles( $response_data, $site_logo_id );
			}

			if ( is_array( $response_data ) ) {
				foreach ( $response_data as &$value ) {
					if ( isset( $value['slug'] ) && isset( $value['content'] ) ) {
						if ( false !== strpos( $value['slug'], 'header' ) ) {
							$value['content'] = self::wp_onboarding_add_site_logo_styles( $value['content'], $site_logo_id );
						}
					}
				}
			}
		}

		$response->set_data( $response_data );
		return $response;
	}

	/**
	 * Function for adding a custom width style to the Site Logo.
	 *
	 * @param string $content - WP Grammar with site Logo
	 * @param string $site_logo_id - Site Logo ID to be resized
	 *
	 * @return string
	 */
	public static function wp_onboarding_add_site_logo_styles( $content, $site_logo_id ) {
		$calculated_width = self::wp_onboarding_calculate_site_logo_width( $site_logo_id );
		if ( $calculated_width ) {
			// Final Width Style to be applied.
			$custom_width_style = '{"width":' . $calculated_width . '}';
			// Check if there is a site-logo at all.
			preg_match( '/<!-- wp:site-logo.*?\/-->/m', $content, $matches );

			if ( isset( $matches ) && count( $matches ) >= 1 ) {
				$site_logo_grammar = $matches[0];
				// Check if the site-logo has a predefined width.
				preg_match( '/{"width":.*?}/m', $site_logo_grammar, $width_style );
				if ( isset( $width_style ) && count( $width_style ) >= 1 ) {
					// If width is present we need to just replace that not modifying other properties.
					$site_logo_grammar = preg_replace( '/{"width":.*?}/m', $custom_width_style, $site_logo_grammar );
					$content           = preg_replace( '/<!-- wp:site-logo .*? \/-->/m', $site_logo_grammar, $content );
				} else {
					// If width is not present we need add it not modifying other properties.
					$content = preg_replace( '/<!-- wp:site-logo/m', '<!-- wp:site-logo ' . $custom_width_style, $content );
				}
			}
		}

		return $content;
	}

	/**
	 * Calculate the new site Logo size
	 *
	 * @param string $site_logo_id - Site Logo ID to be resized
	 *
	 * @return integer|boolean
	 */
	private static function wp_onboarding_calculate_site_logo_width( $site_logo_id ) {
		$site_logo_metadata = wp_get_attachment_metadata( $site_logo_id );
		if ( isset( $site_logo_metadata ) && isset( $site_logo_metadata['height'] ) && isset( $site_logo_metadata['width'] ) ) {
			$site_logo_img_ratio = $site_logo_metadata['height'] / $site_logo_metadata['width'];
			switch ( $site_logo_img_ratio ) {
				// Landscape
				case ( $site_logo_img_ratio < 0.7 ):
					return 180;
				// Portrait
				case ( $site_logo_img_ratio > 1.3 ):
					return 130;
				// Squarish
				default:
					return 150;
			}
		}
		return false;
	}

	/**
	 * Function for modifying the navigation menu grammar.
	 *
	 * @param object $response - WP_REST_Response object
	 * @param array  $args - An array containing arguments.
	 *
	 * @return object
	 */
	public static function wp_onboarding_nav_menu_filter( $response, $args ) {
		$modified_data = array_map(
			array( __CLASS__, 'prepare_raw_html_menu' ),
			$response->get_data(),
			array_keys( $response->get_data() )
		);
		$response->set_data( $modified_data );
		return $response;
	}

	/**
	 * Modify the response to make sure it has the dummy pages.
	 *
	 * @param array   $data - array containing navigation menu data
	 * @param integer $index - array index from the pages list
	 *
	 * @return array
	 */
	public static function prepare_raw_html_menu( $data, $index ) {
		// create dummy menu links
		$menu_navigation_grammar = '';
		foreach ( Patterns::get_dummy_navigation_menu_items() as $page_title ) {
			$menu_navigation_grammar .= '<!-- wp:navigation-link {"isTopLevelLink":true, "label":"' . $page_title . '", "title":"' . $page_title . '"} /-->';
		}
		// need to reset ID else the data saved in the DB gets used
		$data['id']                  = $index;
		$data['content']['rendered'] = $menu_navigation_grammar;
		return $data;
	}

	/**
	 * Custom filter to check for pages API call, if true then add more filters for the onboarding flow only.
	 *
	 * @param array $args - the arguments used by the WP_QUERY
	 *
	 * @return array
	 */
	public static function header_menu_limit_pages( $args ) {
		$args['posts_per_page'] = 6;
		$args['orderby']        = 'id';
		$args['no_found_rows']  = true;
		return $args;
	}

	/**
	 * Custom filter to rename the info for the pages API call.
	 *
	 * @param array            $response - the api response
	 * @param array            $handler - handler
	 * @param \WP_REST_Request $request - WP_REST_Request object
	 *
	 * @return array
	 */
	public static function header_menu_rename_pages( $response, array $handler, \WP_REST_Request $request ) {
		self::modify_get_pages_response( $response );
		return $response;
	}

	/**
	 * Check if the API call is being made from the onboarding flow.
	 *
	 * @param \WP_REST_Request $request - WP_REST_Request object
	 *
	 * @return boolean
	 */
	public static function is_request_from_onboarding_flow( \WP_REST_Request $request ) {
		$referrer = $request->get_header( 'referer' );
		if ( ! $referrer ) {
			return false;
		}
		return false !== stripos( $referrer, 'page=' . WP_Admin::$slug );
	}

	/**
	 * Modify the response to make sure it has the dummy pages.
	 *
	 * @param array $response - response array
	 *
	 * @return null
	 */
	public static function modify_get_pages_response( $response ) {
		if ( ! ( $response instanceof \WP_REST_Response ) ) {
			return;
		}

		// make sure we have the number of dummy pages required
		$pages       = $response->get_data();
		$dummy_items = Patterns::get_dummy_navigation_menu_items();
		if ( count( $pages ) < count( $dummy_items ) ) {
			$pages = array_pad(
				$pages,
				count( $dummy_items ),
				array_pop( $pages )
			);
		}

		$data = array_map(
			array( __CLASS__, 'rename_page' ),
			$pages,
			array_keys( $pages )
		);
		$response->set_data( $data );
	}

	/**
	 * Modify the response to make sure it has the dummy pages.
	 *
	 * @param array   $page - array containing page attributes
	 * @param integer $index - array index from the pages list
	 *
	 * @return array
	 */
	public static function rename_page( array $page, $index ) {
		if ( isset( $page['title']['rendered'] ) ) {
			// changed id so that while rendering the menu link and name are proper
			$page['id']                = $page['id'] + $index;
			$page['title']['rendered'] = Patterns::get_dummy_navigation_menu_items()[ $index ];
			$page['menu_order']        = $index;
		}

		return $page;
	}

	/**
	 * Registers Woocommerce settings options with the wp/v2/settings API.
	 *
	 * @return void
	 */
	public static function register_wc_settings_options() {
		$wc_settings_options = Options::get_wc_settings_options();
		foreach ( $wc_settings_options as $wc_settings_option => $value ) {
			register_setting( 'general', Options::get_option_name( $wc_settings_option, false ), $value );
		}
	}
} // END /NewfoldLabs/WP/Module/Onboarding/RestApiFilter()
