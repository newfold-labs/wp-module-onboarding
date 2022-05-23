<?php

namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Models\Theme;
use NewfoldLabs\WP\Module\Onboarding\Permissions;

/**
 * Class ApprovedThemeController
 */
class ApprovedThemeController extends \WP_REST_Controller {

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
	 * Registers the settings route
	 */
	public function register_routes() {

		register_rest_route(
			$this->namespace,
			'/'. $this->rest_base,
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_themes' ),
					'permission_callback' => array( $this, 'check_permission' ),
				)
			)
		);

	}

	/**
	 * Retrieves the themes offered by the Onboarding Module.
	 *
	 * @return \WP_REST_RESPONSE|\WP_Error
	 */
	public function get_themes() {

		$approved_slugs = $this->get_approved_theme_slugs();
		$installed_themes = $this->get_installed_themes_list();

		$approved_themes = $this->filter_approved_themes($approved_slugs, $installed_themes);
		return $approved_themes;
	}

	/**
	 * Retrieves the list of approved themes slugs from Hiive.
	 *
	 * @return array|\WP_Error
	 */
	public function get_approved_theme_slugs() {
		
		// Key-Value array implementation of approved themes
		$approved_themes = array("twentytwentytwo" => 1);
		return $approved_themes;

		// TODO Implementation
		// A Dynamic Version of Theme Management

		// $response = wp_remote_get( 'https://hiive.cloud/workers/theme_slugs');
		// if (200 === wp_remote_retrieve_response_code( $response )) {
		// 	return json_decode( wp_remote_retrieve_body( $response ) );
		// }else {
		// 	return new \WP_Error(
		// 		wp_remote_retrieve_response_code( $response ),
		// 		'Error Found'
		// 	);
		// }
	}

	/**
	 * Retrieves the list of installed themes in the WordPress Installation.
	 *
	 * @return array|\WP_Error
	 */
	public function get_installed_themes_list() {

		$request = new \WP_REST_Request( 'GET', '/wp/v2/'.$this->rest_base);
		$response = rest_do_request( $request );
		
		if (200 === $response->status) {

			$themes = array();
			$themes_data = json_decode( wp_json_encode( $response->data ), true );

			for($i = 0; $i < count($themes_data); $i++){
				$themes[$i] = new Theme();
				$themes[$i]->setThemeName($themes_data[$i]['template']);
				$themes[$i]->setThemeImage($themes_data[$i]['screenshot']);

				if(str_contains($themes_data[$i]['author']['raw'], 'Newfold Digital'))
					$themes[$i]->setisNewfoldTheme(true);
			}
			return $themes;
		} else {
			return new \WP_Error($response->status, 'Failed to Fetch Installed Themes');
		}

	}

	/**
	 * Filters out the Approved themes and Earlier Installed themes
	 *
	 * @return array|\WP_Error
	 */
	public function filter_approved_themes($approved_slugs, $installed_themes) {

		if(is_wp_error($installed_themes) || is_wp_error($approved_slugs)){
			return is_wp_error($installed_themes) ? $installed_themes : $approved_slugs;
		}

		$approved_themes = array();
		foreach ($installed_themes as $theme) {
			if( $theme->getisNewfoldTheme() || array_key_exists($theme->getThemeName(), $approved_slugs)){
				array_push($approved_themes, $theme);
			}
		}
		return  $approved_themes;
	}

	/**
	 * Check permissions for routes.
	 *
	 * @return bool|\WP_Error
	 */
	public function check_permission() {
		return Permissions::rest_is_authorized_admin();
	}

}
