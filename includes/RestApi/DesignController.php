<?php
/**
 * Design Controller for handling color palettes and font pairings.
 *
 * @package NewfoldLabs\WP\Module\Onboarding\RestApi
 */

namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use WP_REST_Controller;
use WP_REST_Server;
use WP_REST_Response;
use WP_Error;

/**
 * Class DesignController
 */
class DesignController extends WP_REST_Controller {

	/**
	 * The namespace of this controller's route.
	 *
	 * @var string
	 */
	protected $namespace = 'newfold-onboarding/v1';

	/**
	 * The base of this controller's route.
	 *
	 * @var string
	 */
	protected $rest_base = 'design';

	/**
	 * Hiive API base endpoint
	 *
	 * @var string
	 */
	protected $hiive_api_base;

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->hiive_api_base = defined( 'NFD_DATA_WB_DEV_MODE' ) && NFD_DATA_WB_DEV_MODE
			? 'http://patterns-platform.test/api/v1'
			: 'https://paterns.hiive.cloud/api/v1';
	}

	/**
	 * Register the routes for this controller
	 */
	public function register_routes() {
		// Add route for paginated color palettes
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/color-palettes',
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_color_palettes' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
					'args'                => array(
						'page'     => array(
							'default'           => 1,
							'sanitize_callback' => 'absint',
							'validate_callback' => function ( $param ) {
								return is_numeric( $param ) && $param > 0;
							},
						),
						'per_page' => array(
							'default'           => 10,
							'sanitize_callback' => 'absint',
							'validate_callback' => function ( $param ) {
								return is_numeric( $param ) && $param > 0 && $param <= 100;
							},
						),
					),
				),
			)
		);

		// Add route for paginated font pairs
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/font-pairs',
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_font_pairs' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
					'args'                => array(
						'page'     => array(
							'default'           => 1,
							'sanitize_callback' => 'absint',
							'validate_callback' => function ( $param ) {
								return is_numeric( $param ) && $param > 0;
							},
						),
						'per_page' => array(
							'default'           => 10,
							'sanitize_callback' => 'absint',
							'validate_callback' => function ( $param ) {
								return is_numeric( $param ) && $param > 0 && $param <= 100;
							},
						),
					),
				),
			)
		);
	}

	/**
	 * Get paginated color palettes
	 *
	 * @param \WP_REST_Request $request Full data about the request.
	 * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
	 */
	public function get_color_palettes( $request ) {
		$referer  = $request->get_header( 'Referer' );
		$page     = $request->get_param( 'page' );
		$per_page = $request->get_param( 'per_page' );

		if ( ! $referer ) {
			return new WP_Error(
				'invalid_referer',
				'Invalid referer provided.',
				array( 'status' => 400 )
			);
		}

		// Check if referer contains nfd-onboarding
		if ( strpos( $referer, 'nfd-onboarding' ) !== false ) {
			$result = $this->get_color_palettes_from_options( $page, $per_page );
			// If no palettes found in options, fallback to theme.json palettes
			if ( is_wp_error( $result ) && $result->get_error_code() === 'no_color_palettes' ) {
				return $this->get_color_palettes_from_theme_json( $page, $per_page );
			}
			return $result;
		}

		// For all other referers (including nfd-plugin), fetch from Hiive
		$result = $this->get_color_palettes_from_hiive( $page, $per_page );
		// If hiive palettes are empty, fallback to theme.json palettes
		if ( is_wp_error( $result ) || ( isset( $result->data['data'] ) && empty( $result->data['data'] ) ) ) {
			return $this->get_color_palettes_from_theme_json( $page, $per_page );
		}
		return $result;
	}

	/**
	 * Get paginated font pairs
	 *
	 * @param \WP_REST_Request $request Full data about the request.
	 * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
	 */
	public function get_font_pairs( $request ) {
		$referer  = $request->get_header( 'Referer' );
		$page     = $request->get_param( 'page' );
		$per_page = $request->get_param( 'per_page' );

		if ( ! $referer ) {
			return new WP_Error(
				'invalid_referer',
				'Invalid referer provided.',
				array( 'status' => 400 )
			);
		}

		// Check if referer contains nfd-onboarding
		if ( strpos( $referer, 'nfd-onboarding' ) !== false ) {
			return $this->get_font_pairs_from_options( $page, $per_page );
		}

		// For all other referers (including nfd-plugin), fetch from Hiive
		return $this->get_font_pairs_from_hiive( $page, $per_page );
	}

	/**
	 * Get color palettes from WordPress options table with pagination
	 *
	 * @param int $page The current page number
	 * @param int $per_page Number of items per page
	 * @return WP_REST_Response|WP_Error
	 */
	protected function get_color_palettes_from_options( $page, $per_page ) {
		$color_palettes = get_option( 'nfd_module_onboarding_editor_colorpalette' );

		if ( false === $color_palettes ) {
			return new WP_Error(
				'no_color_palettes',
				'No color palettes found in options.',
				array( 'status' => 404 )
			);
		}

		$formatted_palettes = array();
		foreach ( $color_palettes as $index => $palette ) {
			$formatted_palette = array();

			foreach ( $palette as $key => $value ) {
				$formatted_palette[] = array(
					'name'  => $key,
					'slug'  => $key,
					'color' => $value,
				);
			}

			$formatted_palettes[] = array(
				// translators: %d is the index of the palette
				'name'          => sprintf( __( 'Palette %d', 'wp-module-onboarding' ), $index + 1 ),
				'displayColors' => array(
					array(
						'color' => $palette['base'],
						'name'  => 'Base',
						'slug'  => 'base',
					),
					array(
						'color' => $palette['contrast'],
						'name'  => 'Contrast',
						'slug'  => 'contrast',
					),
					array(
						'color' => $palette['accent_2'],
						'name'  => 'Primary',
						'slug'  => 'accent-2',
					),
					array(
						'color' => $palette['accent_5'],
						'name'  => 'Secondary',
						'slug'  => 'accent-5',
					),
				),
				'palette'       => $formatted_palette,
			);
		}

		return $this->paginate_response( $formatted_palettes, $page, $per_page );
	}

	/**
	 * Get font pairs from WordPress options table with pagination
	 *
	 * @param int $page The current page number
	 * @param int $per_page Number of items per page
	 * @return WP_REST_Response|WP_Error
	 */
	protected function get_font_pairs_from_options( $page, $per_page ) {
		$font_pairs = get_option( 'nfd_module_onboarding_editor_fontpair' );

		if ( false === $font_pairs ) {
			return new WP_Error(
				'no_font_pairs',
				'No font pairs found in options.',
				array( 'status' => 404 )
			);
		}

		return $this->paginate_response( $font_pairs, $page, $per_page );
	}

	/**
	 * Get color palettes from Hiive API with pagination
	 *
	 * @param int $page The current page number
	 * @param int $per_page Number of items per page
	 * @return WP_REST_Response|WP_Error
	 */
	protected function get_color_palettes_from_hiive( $page, $per_page ) {
		// Try to get cached data first
		$cached_data = get_transient( 'nfd_hiive_color_palettes' );
		if ( false !== $cached_data ) {
			return $this->paginate_response( $cached_data, $page, $per_page );
		}

		$color_palettes = $this->fetch_from_hiive( '/colors' );
		if ( is_wp_error( $color_palettes ) ) {
			return $color_palettes;
		}

		// Filter out invalid palettes and add displayColors
		$formatted_palettes = array_filter(
			array_map(
				function ( $palette ) {
					// Skip if required properties are missing
					if ( ! isset( $palette['name'] ) || ! isset( $palette['palette'] ) || count( $palette['palette'] ) < 4 ) {
						return null;
					}

					// Create standardized displayColors with specific slugs
					$palette['displayColors'] = array(
						$palette['palette'][0],
						$palette['palette'][1],
						$palette['palette'][2],
						$palette['palette'][3],
					);
					return $palette;
				},
				$color_palettes['data']
			),
			function ( $palette ) {
				return null !== $palette;
			}
		);

		// Re-index array to ensure sequential keys
		$formatted_palettes = array_values( $formatted_palettes );

		// Cache the formatted palettes for 24 hours
		set_transient( 'nfd_hiive_color_palettes', $formatted_palettes, DAY_IN_SECONDS );

		return $this->paginate_response( $formatted_palettes, $page, $per_page );
	}

	/**
	 * Get font pairs from Hiive API with pagination
	 *
	 * @param int $page The current page number
	 * @param int $per_page Number of items per page
	 * @return WP_REST_Response|WP_Error
	 */
	protected function get_font_pairs_from_hiive( $page, $per_page ) {
		// Try to get cached data first
		$cached_data = get_transient( 'nfd_hiive_font_pairs' );
		if ( false !== $cached_data ) {
			return $this->paginate_response( $cached_data, $page, $per_page );
		}

		$font_pairs = $this->fetch_from_hiive( '/fonts' );
		if ( is_wp_error( $font_pairs ) ) {
			return $font_pairs;
		}

		// Cache the font pairs for 24 hours
		set_transient( 'nfd_hiive_font_pairs', $font_pairs['data'], DAY_IN_SECONDS );

		return $this->paginate_response( $font_pairs['data'], $page, $per_page );
	}

	/**
	 * Helper function to fetch data from Hiive API
	 *
	 * @param string $endpoint The endpoint to fetch from
	 * @return array|WP_Error The decoded response data or WP_Error on failure
	 */
	protected function fetch_from_hiive( $endpoint ) {
		// Try to get cached endpoint data first
		$cache_key   = 'nfd_hiive_' . sanitize_key( $endpoint );
		$cached_data = get_transient( $cache_key );
		if ( false !== $cached_data ) {
			return $cached_data;
		}

		$response = wp_remote_get(
			$this->hiive_api_base . $endpoint,
			array(
				'timeout' => 15,
				'headers' => array(
					'Accept' => 'application/json',
				),
			)
		);

		if ( is_wp_error( $response ) ) {
			return new WP_Error(
				'hiive_api_error',
				'Error fetching data from Hiive: ' . $response->get_error_message(),
				array( 'status' => 502 )
			);
		}

		$body = wp_remote_retrieve_body( $response );
		$data = json_decode( $body, true );

		if ( json_last_error() !== JSON_ERROR_NONE ) {
			return new WP_Error(
				'json_parse_error',
				'Error parsing Hiive API response',
				array( 'status' => 502 )
			);
		}

		// Cache the endpoint data for 24 hours
		set_transient( $cache_key, $data, DAY_IN_SECONDS );

		return $data;
	}

	/**
	 * Get color palettes from theme.json
	 *
	 * @param int $page The current page number
	 * @param int $per_page Number of items per page
	 * @return WP_REST_Response|WP_Error
	 */
	protected function get_color_palettes_from_theme_json( $page, $per_page ) {
		$theme_palettes = array();

		// Method 1: Using WP_Theme_JSON_Resolver to get style variations (includes styles/colors folder)
		if ( class_exists( 'WP_Theme_JSON_Resolver' ) ) {
			// Get all style variations from styles/ folder (includes colors/ subfolder)
			$style_variations = \WP_Theme_JSON_Resolver::get_style_variations();

			// Process each style variation (from styles/colors folder)
			foreach ( $style_variations as $variation ) {
				$variation_data = $variation['settings'] ?? array();

				// Check if this variation has color palette
				if ( isset( $variation_data['color']['palette'] ) && is_array( $variation_data['color']['palette'] ) ) {
					$all_palette_sources = $variation['settings']['color']['palette'];

					foreach ( $all_palette_sources as $source_name => $colors ) {
						if ( is_array( $colors ) && ! empty( $colors ) ) {
							$formatted_colors = array();
							$display_colors   = array();

							foreach ( $colors as $index => $color ) {
								$formatted_colors[] = $color;

								if ( in_array( $color['slug'], array( 'base', 'contrast', 'accent-2', 'accent-5' ), true ) ) {
									$display_colors[] = $color;
								}
							}

							$theme_palettes[] = array(
								'name'          => $variation['title'],
								'displayColors' => $display_colors,
								'palette'       => $formatted_colors,
							);
						}
					}
				}
			}
		}

		return $this->paginate_response( $theme_palettes, $page, $per_page );
	}

	/**
	 * Helper function to paginate response data
	 *
	 * @param array $items The array of items to paginate
	 * @param int   $page The current page number
	 * @param int   $per_page Number of items per page
	 * @return WP_REST_Response
	 */
	protected function paginate_response( $items, $page, $per_page ) {
		$total_items = count( $items );
		$total_pages = ceil( $total_items / $per_page );
		$offset      = ( $page - 1 ) * $per_page;

		$paginated_items = array_slice( $items, $offset, $per_page );

		$response = new WP_REST_Response(
			array(
				'data'       => $paginated_items,
				'pagination' => array(
					'total_items'  => $total_items,
					'total_pages'  => $total_pages,
					'current_page' => $page,
					'per_page'     => $per_page,
				),
			)
		);

		// Add pagination headers
		$response->header( 'X-WP-Total', $total_items );
		$response->header( 'X-WP-TotalPages', $total_pages );

		return $response;
	}
}
