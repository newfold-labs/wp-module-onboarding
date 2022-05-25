<?php

namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

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
	protected $rest_base = 'themes';/**


	/**
	 * The extended base of this controller's route.
	 *
	 * @var string
	 */
	protected $rest_extended_base = 'variations';
	/**
	 * Registers the settings route
	 */
	public function register_routes() {

		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base.'/' . $this->rest_extended_base,
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_theme_variations' ),
					'permission_callback' => array( $this, 'check_permission' ),
					'args'                => $this->get_request_params()
				)
			)
		);

	}

	/**
	 * Retrieves the themes variations.
	 *
	 * @return \WP_REST_RESPONSE|\WP_Error
	 */
	public function get_theme_variations(\WP_REST_Request $request) {

		$theme = $request->get_param( 'theme' );
        $default_variation = $this->get_default_theme_variation($theme);
        $variations = $this->get_theme_variations_list($theme);

		if(is_wp_error($default_variation)) return $default_variation;
		
		return array_merge($default_variation, $variations);
	}

	/**
	 * Retrieves the list of installed themes in the WordPress Installation.
	 *
	 * @return array|\WP_Error
	 */
	public function get_default_theme_variation($theme) {

		$request = new \WP_REST_Request( 'GET', '/wp/v2/global-styles/themes/'.$theme);
		$response = rest_do_request( $request );
		
		if (200 === $response->status) {

			$themes = array();
			$themes_data = json_decode( wp_json_encode( $response->data ), true );

			$theme_variation_screenshot = $this->get_theme_default_screenshot($theme);

			$theme_variation_data["title"] = "default";
			$theme_variation_data["palette"] = $themes_data['settings']['color']['palette']['theme'];
			$theme_variation_data["screenshot"] = $theme_variation_screenshot;

			$themes[0] = $theme_variation_data;

			return $themes;
		} else {
			return new \WP_Error($response->status, 'Failed to Fetch Theme Data');
		}

	}
    
	/**
	 * Retrieves the list of installed themes in the WordPress Installation.
	 *
	 * @return array|\WP_Error
	 */
	public function get_theme_variations_list($theme) {

        $url = '/wp/v2/themes/'.$theme.'/variations';
		$request = new \WP_REST_Request( 'GET', '/wp/v2/global-styles/themes/'.$theme.'/variations');
		$response = rest_do_request( $request );
		
		if (200 === $response->status) {

			$themes = array();
			$themes_data = json_decode( wp_json_encode( $response->data ), true );

			for($i = 0; $i < count($themes_data); $i++){

				$variation_name = $themes_data[$i]['title'];
				$theme_variation_screenshot = $this->get_theme_variation_screenshot($theme, $variation_name);

				$theme_variation_data["title"] = $variation_name;
				$theme_variation_data["palette"] = $themes_data[$i]['settings']['color']['palette']['theme'];
				$theme_variation_data["screenshot"] = $theme_variation_screenshot;

				$themes[$i] = $theme_variation_data;
			}

			return $themes;
		} else {
			return new \WP_Error($response->status, 'Failed to Fetch Theme Variations');
		}

	}

	/**
	 * Retrieves the default screenshot for the specified Theme.
	 *
	 * @return string|\WP_Error
	 */
	public function get_theme_default_screenshot($theme) {

		$request = new \WP_REST_Request( 'GET', '/wp/v2/themes');
		$response = rest_do_request( $request );
		
		if (200 === $response->status) {

			$default_screenshot = '';
			$themes_data = json_decode( wp_json_encode( $response->data ), true );

			for($i = 0; $i < count($themes_data); $i++){
				if($theme === $themes_data[$i]['template'])
					$default_screenshot = $themes_data[$i]['screenshot'];

			}
			return $default_screenshot;
		} else {
			return new \WP_Error($response->status, 'Failed to Fetch Installed Themes');
		}

	}

	/**
	 * Retrieves the variation screenshot for the specified Theme.
	 *
	 * @return string|\WP_Error
	 */
	public function get_theme_variation_screenshot($theme, $variation_name) {

		return 'dummy/'.$theme.'/'.$variation_name.'.png';

		// TODO Implement 
		// The Variation Screenshot Service

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
                'sanitize_callback' => 'sanitize_text_field'
            )
        );
    }

	/**
	 * Check permissions for routes.
	 *
	 * @return bool|\WP_Error
	 */
	public function check_permission() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return new \WP_Error( 'rest_forbidden_context', __( 'Sorry, you are not allowed to access this endpoint.', 'newfold-onboarding-module' ), array( 'status' => rest_authorization_required_code() ) );
		}

		return true;
	}

}


// Combine two JSON's
// json_encode(array_merge(json_decode($a, true), json_decode($b, true)))