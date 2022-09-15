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
	protected $rest_base = '/themes';


	/**
	 * The extended base of this controller's route.
	 *
	 * @var string
	 */
	protected $rest_extended_base = '/variations';

	/**
	 * Registers routes for ThemeVariationsController
	 */
	public function register_routes() {
		\register_rest_route(
			$this->namespace,
			$this->rest_base . $this->rest_extended_base,
			array(
				array(
					'methods'  => \WP_REST_Server::READABLE,
					'callback' => array( $this, 'get_theme_variations' ),
					// 'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);
	}

	/**
	 * Retrieves the active themes variations.
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function get_theme_variations( \WP_REST_Request $request ) {
		$active_variation              = \WP_Theme_JSON_Resolver::get_merged_data( 'theme' )->get_raw_data();
		$active_variation_global_style = array(
            'title'    => 'Default',
			'version'  => $active_variation['version'],
			'settings' => $active_variation['settings'],
			'styles'   => $active_variation['styles'],
		);

		return array_merge(
			array( $active_variation_global_style ),
			\WP_Theme_JSON_Resolver::get_style_variations(),
		);
	}

}
