<?php
namespace NewfoldLabs\WP\Module\Onboarding\RestApi\Themes;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Data\Themes;
use NewfoldLabs\WP\Module\Onboarding\Data\Services\GlobalStylesService;

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
		register_rest_route(
			$this->namespace,
			$this->rest_base . $this->rest_extended_base,
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'args'                => $this->get_pattern_args(),
					'callback'            => array( $this, 'get_theme_variations' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
				array(
					'methods'             => \WP_REST_Server::EDITABLE,
					'args'                => $this->set_pattern_args(),
					'callback'            => array( $this, 'set_theme_variation' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);

		register_rest_route(
			$this->namespace,
			$this->rest_base . $this->rest_extended_base . '/update',
			array(
				array(
					'methods'             => \WP_REST_Server::EDITABLE,
					'args'                => $this->get_update_diy_global_style_variation_args(),
					'callback'            => array( $this, 'update_diy_global_style_variation' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);
	}

	/**
	 * Get the patterns arguments.
	 * Retrieves the original numerous variations if true, else sends the recently saved theme settings in the DB.
	 *
	 * @return array
	 */
	public function get_pattern_args() {
			return array(
				'variations' => array(
					'type'    => 'boolean',
					'default' => false,
				),
			);
	}

	/**
	 * Set the pattern arguments to the latest modified Global Style that is to be saved in the DB.
	 *
	 * @return array
	 */
	public function set_pattern_args() {
		return array(
			'title'    => array(
				'type'     => 'string',
				'required' => true,
			),
			'settings' => array(
				'type'     => 'object',
				'required' => true,
			),
		);
	}

	/**
	 * Gets the arguments for updating DIY global style variations.
	 *
	 * @return array An array of argument definitions for the REST API request.
	 */
	public function get_update_diy_global_style_variation_args() {
		return array(
			'id'       => array(
				'description' => __( 'The id of a template', 'wp-module-onboarding' ),
				'type'        => 'integer',
				'default'     => GlobalStylesService::get_active_custom_global_styles_post_id(),
			),
			'styles'   => array(
				'description' => __( 'The custom styles', 'wp-module-onboarding' ),
				'default'     => array(),
				'required'    => false,
			),
			'settings' => array(
				'description' => __( 'The custom settings', 'wp-module-onboarding' ),
				'default'     => array(),
				'required'    => false,
			),
		);
	}

	/**
	 * Translate decoded json file.
	 *
	 * @param string $theme_json Theme content.
	 * @param string $domain Domain type.
	 * @return string
	 */
	private static function translate( $theme_json, $domain = 'default' ) {
			$i18n_schema = wp_json_file_decode( __DIR__ . '/theme-i18n.json' );

		return translate_settings_using_i18n_schema( $i18n_schema, $theme_json, $domain );
	}

	/**
	 * Translate the json decoded HTML Files and retrieve all the Theme Style Variations.
	 *
	 * @return array
	 */
	private static function get_style_variations() {
		$variations     = array();
		$base_directory = get_stylesheet_directory() . '/styles';
		if ( is_dir( $base_directory ) ) {
			$nested_files      = new \RecursiveIteratorIterator( new \RecursiveDirectoryIterator( $base_directory ) );
			$nested_html_files = iterator_to_array( new \RegexIterator( $nested_files, '/^.+\.json$/i', \RecursiveRegexIterator::GET_MATCH ) );
			ksort( $nested_html_files );
			foreach ( $nested_html_files as $path => $file ) {
				$decoded_file = wp_json_file_decode( $path, array( 'associative' => true ) );
				if ( is_array( $decoded_file ) ) {
					$translated = self::translate( $decoded_file, wp_get_theme()->get( 'TextDomain' ) );
					$variation  = ( new \WP_Theme_JSON( $translated ) )->get_data();
					if ( empty( $variation['title'] ) ) {
						$variation['title'] = basename( $path, '.json' );
					}
					$variations[] = $variation;
				}
			}
		}
		return $variations;
	}

	/**
	 * Retrieves the active themes variations.
	 *
	 * @param \WP_REST_Request $request Request model.
	 * @return array|\WP_Error
	 */
	public function get_theme_variations( \WP_REST_Request $request ) {

		$default = $request->get_param( 'variations' );

		// If there exists an old Custom Theme then return that
		if ( false === $default && false !== Themes::get_selected_diy_theme_settings() ) {
			return array(
				Themes::get_selected_diy_theme_settings(),
			);
		}

		$active_variation              = \WP_Theme_JSON_Resolver::get_theme_data()->get_data();
		$active_variation_global_style = array(
			'id'       => 0,
			'title'    => 'Default',
			'version'  => $active_variation['version'],
			'settings' => $active_variation['settings'],
			'styles'   => $active_variation['styles'],
		);

		return array_merge(
			array( $active_variation_global_style ),
			self::get_style_variations()
		);
	}

	/**
	 * Saves the custom active theme variations.
	 *
	 * @param \WP_REST_Request $request Request model.
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function set_theme_variation( \WP_REST_Request $request ) {
		// The theme data with the new Colors and Fonts
		$theme_data = json_decode( $request->get_body(), true );

		if ( $theme_data ) {

			// Save the new Theme style into the db
			Themes::set_diy_theme_settings( $theme_data );

			return new \WP_REST_Response(
				$theme_data,
				200
			);
		}

		return new \WP_Error(
			500,
			'Missing important parameters',
			'Settings parameter is found to be missing'
		);
	}

	/**
	 * Handles the update DIY global style variation request.
	 *
	 * @param \WP_REST_Request $request The REST API request object containing the parameters.
	 *
	 * @return \WP_REST_Response|\WP_Error Returns a WP_REST_Response on success, or a WP_Error on failure.
	 */
	public function update_diy_global_style_variation( \WP_REST_Request $request ) {
		$request_data = $request->get_params();
		$id           = $request_data['id'];
		$styles       = $request_data['styles'];
		$settings     = $request_data['settings'];

		$status = GlobalStylesService::update_diy_global_style_variation( $id, $styles, $settings );

		if ( is_wp_error( $status ) ) {
			return $status;
		}

		return new \WP_REST_Response(
			array(
				'message' => __( 'Global style customization created.', 'wp-module-onboarding' ),
			),
			201
		);
	}
}
