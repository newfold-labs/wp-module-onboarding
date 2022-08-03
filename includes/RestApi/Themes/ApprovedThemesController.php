<?php
namespace NewfoldLabs\WP\Module\Onboarding\RestApi\Themes;

use NewfoldLabs\WP\Module\Onboarding\Models\Theme;
use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Data\Data;

/**
 * Class ApprovedThemeController
 */
class ApprovedThemesController extends \WP_REST_Controller {

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
		\register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_approved_themes' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);
	}

	/**
	 * Get a list of approved themes.
	 *
	 * [TODO] Retrieve the list from Hiive.
	 *
	 * @return array|\WP_Error
	 */
	protected function get_approved_theme_slugs() {

		// Key-Value array implementation of approved themes for faster lookup
		return array( 'twentytwentytwo' => 1 );
	}

	/**
	 * Retrieves list of installed themes.
	 *
	 * @return array|\WP_Error
	 */
	public function get_installed_themes() {

		$request  = new \WP_REST_Request(
			'GET',
			'/wp/v2/' . $this->rest_base
		);
		$response = \rest_do_request( $request );

		if ( 200 === $response->status ) {
			   $current_brand      = $current_brand = Data::current_brand();
			   $current_brand_name = $current_brand['name'] ? $current_brand['name'] : 'Newfold Digital';
			$themes_data           = json_decode( \wp_json_encode( $response->data ), true );
			foreach ( $themes_data as $theme_data ) {
				$theme = new Theme( $theme_data['stylesheet'] );
				$theme->set_theme_image( $theme_data['screenshot'] );
				if ( str_contains( $theme_data['author']['raw'], $current_brand_name ) ) {
					$theme->set_is_newfold_theme( true );
				}
				$installed_themes[] = $theme;
			}

			return $installed_themes;
		}

		return new \WP_Error(
			$response->status,
			'Failed to fetch installed themes.'
		);
	}

	/**
	 * Retrieves the themes offered by the Onboarding Module.
	 *
	 * @return array|\WP_Error
	 */
	public function get_approved_themes() {
		$approved_theme_slugs = $this->get_approved_theme_slugs();
		$installed_themes     = $this->get_installed_themes();

		if ( \is_wp_error( $installed_themes ) ) {
			return $installed_themes;
		}

		foreach ( $installed_themes as $installed_theme ) {
			if ( $installed_theme->get_is_newfold_theme()
				|| array_key_exists( $installed_theme->get_theme_name(), $approved_theme_slugs ) ) {
				$approved_themes[] = $installed_theme;
			}
		}

		return $approved_themes;
	}
}
