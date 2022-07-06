<?php
namespace NewfoldLabs\WP\Module\Onboarding\RestApi\Themes;

use NewfoldLabs\WP\Module\Onboarding\Permissions;

/**
 * Class ThemeVariationsController
 */
class ThemeVariationsController extends \WP_REST_Controller {

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
	protected $rest_base = 'themes';


	/**
	 * The extended base of this controller's route.
	 *
	 * @var string
	 */
	protected $rest_extended_base = 'variations';

	/**
	 * Registers routes for ThemeVariationsController
	 */
	public function register_routes() {
		\register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/' . $this->rest_extended_base,
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_theme_variations' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
					'args'                => $this->get_request_params(),
				),
			)
		);
	}

	/**
	 * Retrieves the themes variations.
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function get_theme_variations( \WP_REST_Request $request ) {
		$theme = $request->get_param( 'theme' );

		$default_variation = $this->get_default_theme_variation( $theme );
		if ( is_wp_error( $default_variation ) ) {
			return $default_variation;
		}

		$other_variations = $this->get_other_theme_variations( $theme );
		if ( is_wp_error( $other_variations ) ) {
			return $other_variations;
		}

		array_push( $other_variations, $default_variation );

		return $other_variations;
	}

	/**
	 * Retrieves the default theme variation.
	 *
	 * @return array|\WP_Error
	 */
	public function get_default_theme_variation( $theme ) {
		$request = new \WP_REST_Request(
			'GET',
			'/wp/v2/global-styles/themes/' . $theme
		);

		$response = \rest_do_request( $request );
		if ( 200 === $response->status ) {
			$themes_data       = json_decode( wp_json_encode( $response->data ), true );
			$default_variation = array(
				'title'      => 'default',
				'palette'    => $themes_data['settings']['color']['palette']['theme'],
				'screenshot' => $this->get_theme_default_screenshot( $theme ),
			);

			return $default_variation;
		}

		return new \WP_Error(
			$response->status,
			'Failed to fetch theme data.'
		);
	}

	/**
	 * Retrieves the non default theme variations.
	 *
	 * @return array|\WP_Error
	 */
	public function get_other_theme_variations( $theme ) {
		$request = new \WP_REST_Request(
			'GET',
			'/wp/v2/global-styles/themes/' . $theme . '/variations'
		);

		$response = \rest_do_request( $request );
		if ( 200 === $response->status ) {
			$themes_data = json_decode( wp_json_encode( $response->data ), true );
			foreach ( $themes_data as $theme_data ) {
				$theme_variations[] = array(
					'title'      => $theme_data['title'],
					'palette'    => $theme_data['settings']['color']['palette']['theme'],
					'screenshot' => $this->get_theme_variation_screenshot( $theme, $theme_data['title'] ),
				);
			}

			return $theme_variations ? $theme_variations : array();
		}

		return new \WP_Error(
			$response->status,
			'Failed to fetch theme variations'
		);
	}

	/**
	 * Retrieves default screenshot path for the specified theme.
	 *
	 * @return string|\WP_Error
	 */
	public function get_theme_default_screenshot( $theme ) {
		$request = new \WP_REST_Request(
			'GET',
			'/wp/v2/themes'
		);

		$response = \rest_do_request( $request );
		if ( 200 === $response->status ) {
			$themes_data = json_decode( wp_json_encode( $response->data ), true );
			foreach ( $themes_data as $theme_data ) {
				if ( $theme === $theme_data['template'] ) {
					return $theme_data['screenshot'] ? $theme_data['screenshot'] : '';
				}
			}
			return '';
		}

		return new \WP_Error(
			$response->status,
			'Failed to fetch installed themes.'
		);
	}

	/**
	 * Retrieves the variation screenshot for the specified Theme.
	 *
	 * [TODO] Get the actual theme variation screenshot paths.
	 *
	 * @return string|\WP_Error
	 */
	public function get_theme_variation_screenshot( $theme, $variation_name ) {
		return 'dummy/' . $theme . '/' . $variation_name . '.png';
	}

	/**
	 * Get query params for the route.
	 *
	 * @return array
	 */
	public function get_request_params() {
		return array(
			'theme' => array(
				'type'              => 'string',
				'required'          => true,
				'sanitize_callback' => 'sanitize_text_field',
			),
		);
	}
}
