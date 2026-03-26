<?php

namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Services\GlobalStylesService;

/**
 * Class GlobalStylesController
 *
 * Handles REST API endpoints for managing global styles, fonts, and color palettes.
 */
class GlobalStylesController {

	/**
	 * This is the REST API namespace that will be used for our custom API
	 *
	 * @var string
	 */
	protected $namespace = 'newfold-onboarding/v1';

	/**
	 * This is the REST endpoint
	 *
	 * @var string
	 */
	protected $rest_base = '/global-styles';

	/**
	 * Registers rest routes for this controller class.
	 *
	 * @return void
	 */
	public function register_routes() {
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/set-color-palette',
			array(
				array(
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'set_color_palette' ),
					'args'                => $this->get_set_color_palette_args(),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);

		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/install-fonts',
			array(
				array(
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'install_fonts' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);

		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/set-global-styles',
			array(
				array(
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'set_global_styles' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);
	}

	/**
	 * Get the arguments for the set color palette endpoint.
	 *
	 * @return array
	 */
	public function get_set_color_palette_args() {
		return array(
			'color_palette' => array(
				'type'     => 'object',
				'required' => true,
			),
		);
	}

	/**
	 * Set the color palette.
	 *
	 * @param \WP_REST_Request $request The request object.
	 * @return \WP_REST_Response
	 */
	public function set_color_palette( \WP_REST_Request $request ): \WP_REST_Response {
		$data          = json_decode( $request->get_body(), true );
		$color_palette = $data['color_palette'];
		if ( ! is_array( $color_palette ) || empty( $color_palette ) ) {
			return new \WP_REST_Response(
				'Color palette is invalid.',
				400
			);
		}

		$response = ( new GlobalStylesService() )->set_color_palette( $color_palette );
		if ( is_wp_error( $response ) ) {
			return new \WP_REST_Response(
				'Error setting color palette.',
				500
			);
		}

		return new \WP_REST_Response(
			array( 'colors' => $response ),
			200
		);
	}

	/**
	 * Install fonts from a font pair. Downloads woff2 files server-side (no CORS issues)
	 * and registers them via the WP Font Library post types.
	 *
	 * @param \WP_REST_Request $request The request object.
	 * @return \WP_REST_Response
	 */
	public function install_fonts( \WP_REST_Request $request ): \WP_REST_Response {
		$data      = json_decode( $request->get_body(), true );
		$font_pair = $data['font_pair'] ?? null;

		if ( ! is_array( $font_pair ) || empty( $font_pair ) ) {
			return new \WP_REST_Response( 'Font pair data is invalid.', 400 );
		}

		if ( ! post_type_exists( 'wp_font_family' ) ) {
			return new \WP_REST_Response( 'Font Library not available (requires WP 6.5+).', 400 );
		}

		$results = array();
		$fonts   = array_filter(
			array(
				$font_pair['primary'] ?? null,
				$font_pair['secondary'] ?? null,
			)
		);

		foreach ( $fonts as $font ) {
			$slug = $font['slug'] ?? '';
			if ( empty( $slug ) ) {
				continue;
			}

			// Check if already installed with working font files.
			$existing = get_posts(
				array(
					'post_type'   => 'wp_font_family',
					'name'        => $slug,
					'post_status' => 'publish',
					'numberposts' => 1,
				)
			);
			if ( ! empty( $existing ) ) {
				$faces     = get_children(
					array(
						'post_parent' => $existing[0]->ID,
						'post_type'   => 'wp_font_face',
					)
				);
				$has_files = false;
				if ( ! empty( $faces ) ) {
					$font_dir_check = wp_get_font_dir();
					foreach ( $faces as $face ) {
						$face_data = json_decode( $face->post_content, true );
						$src       = $face_data['src'] ?? '';
						if ( $src && file_exists( str_replace( $font_dir_check['url'], $font_dir_check['path'], $src ) ) ) {
							$has_files = true;
							break;
						}
					}
				}

				if ( $has_files ) {
					$results[ $slug ] = 'already installed';
					continue;
				}

				// Clean up broken install — delete family and its faces.
				foreach ( $faces as $face ) {
					wp_delete_post( $face->ID, true );
				}
				wp_delete_post( $existing[0]->ID, true );
			}

			// Create font family post.
			$family_id = wp_insert_post(
				array(
					'post_type'    => 'wp_font_family',
					'post_title'   => $font['name'] ?? $slug,
					'post_name'    => $slug,
					'post_status'  => 'publish',
					'post_content' => wp_json_encode(
						array(
							'name'       => $font['name'] ?? $slug,
							'slug'       => $slug,
							'fontFamily' => $font['font_family'] ?? $slug,
							'preview'    => '',
						)
					),
				),
				true
			);

			if ( is_wp_error( $family_id ) ) {
				$results[ $slug ] = $family_id->get_error_message();
				continue;
			}

			// Download and install each font face.
			$face_count  = 0;
			$source_urls = $font['source_urls'] ?? array();
			$font_dir    = wp_get_font_dir();

			if ( ! file_exists( $font_dir['path'] ) ) {
				wp_mkdir_p( $font_dir['path'] );
			}

			foreach ( $source_urls as $weight => $styles ) {
				foreach ( $styles as $style => $remote_url ) {
					$tmp_file = download_url( $remote_url );
					if ( is_wp_error( $tmp_file ) ) {
						continue;
					}

					$filename  = "{$slug}_{$weight}_{$style}.woff2";
					$dest_path = $font_dir['path'] . '/' . $filename;
					// phpcs:ignore WordPress.WP.AlternativeFunctions.rename_rename
					if ( ! rename( $tmp_file, $dest_path ) ) {
						@unlink( $tmp_file ); // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged
						continue;
					}

					$local_url = $font_dir['url'] . '/' . $filename;

					wp_insert_post(
						array(
							'post_type'    => 'wp_font_face',
							'post_parent'  => $family_id,
							'post_status'  => 'publish',
							'post_content' => wp_json_encode(
								array(
									'fontFamily' => $font['name'] ?? $slug,
									'fontWeight' => (string) $weight,
									'fontStyle'  => $style,
									'src'        => $local_url,
								)
							),
						)
					);

					$face_count++;
				}
			}

			$results[ $slug ] = "{$face_count} faces installed";
		}

		// Always activate fonts by adding them to the global styles fontFamilies.
		$this->activate_installed_fonts( $fonts );

		return new \WP_REST_Response( array( 'results' => $results ), 200 );
	}

	/**
	 * Activate installed fonts by writing their fontFamilies entries into the global styles post.
	 *
	 * @param array $fonts Array of font data arrays.
	 */
	private function activate_installed_fonts( array $fonts ): void {
		$font_dir      = wp_get_font_dir();
		$font_families = array();

		foreach ( $fonts as $font ) {
			$slug        = $font['slug'] ?? '';
			$source_urls = $font['source_urls'] ?? array();
			$font_faces  = array();

			foreach ( $source_urls as $weight => $styles ) {
				foreach ( $styles as $style => $remote_url ) {
					$filename  = "{$slug}_{$weight}_{$style}.woff2";
					$dest_path = $font_dir['path'] . '/' . $filename;

					if ( file_exists( $dest_path ) ) {
						$font_faces[] = array(
							'fontFamily' => $font['name'] ?? $slug,
							'fontWeight' => (string) $weight,
							'fontStyle'  => $style,
							'src'        => $font_dir['url'] . '/' . $filename,
						);
					}
				}
			}

			if ( ! empty( $font_faces ) ) {
				$font_families[] = array(
					'name'       => $font['name'] ?? $slug,
					'slug'       => $slug,
					'fontFamily' => $font['font_family'] ?? $slug,
					'fontFace'   => $font_faces,
				);
			}
		}

		if ( empty( $font_families ) ) {
			return;
		}

		$service = new GlobalStylesService();
		$service->set_global_styles(
			array(
				'settings' => array(
					'typography' => array(
						'fontFamilies' => array(
							'custom' => $font_families,
						),
					),
				),
			)
		);
	}

	/**
	 * Set global styles from a sitekit.
	 *
	 * @param \WP_REST_Request $request The request object.
	 * @return \WP_REST_Response
	 */
	public function set_global_styles( \WP_REST_Request $request ): \WP_REST_Response {
		$data          = json_decode( $request->get_body(), true );
		$global_styles = $data['global_styles'] ?? null;

		if ( ! is_array( $global_styles ) || empty( $global_styles ) ) {
			return new \WP_REST_Response( 'Global styles data is invalid.', 400 );
		}

		$response = ( new GlobalStylesService() )->set_global_styles( $global_styles );
		if ( is_wp_error( $response ) ) {
			return new \WP_REST_Response( 'Error setting global styles: ' . $response->get_error_message(), 500 );
		}

		return new \WP_REST_Response( array( 'success' => true ), 200 );
	}
}
