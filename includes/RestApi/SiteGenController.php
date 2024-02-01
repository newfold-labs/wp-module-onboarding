<?php

namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Data\Services\SiteGenService;
use NewfoldLabs\WP\Module\Onboarding\Data\SiteGen as SiteGenData;

/**
 * Class SiteGenController
 */
class SiteGenController {

	/**
	 * The namespace of this controller's route.
	 *
	 * @var string
	 */
	protected $namespace = 'newfold-onboarding/v1';

	/**
	 * The endpoint base
	 *
	 * @var string
	 */
	protected $rest_base = '/sitegen';

	/**
	 * Registers rest routes for SiteGenController class.
	 *
	 * @return void
	 */
	public function register_routes() {
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/identifiers',
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_enabled_identifiers' ),
				'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
			)
		);
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/generate',
			array(
				'methods'             => \WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'generate_sitegen_meta' ),
				'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				'args'                => $this->sitegen_meta_args(),
			)
		);
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/homepages',
			array(
				'methods'             => \WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'get_homepages' ),
				'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				'args'                => $this->get_homepages_args(),
			)
		);
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/homepages/regenerate',
			array(
				'methods'             => \WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'regenerate_homepage' ),
				'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				'args'                => $this->get_regenerate_homepage_args(),
			)
		);
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/site-details-meta',
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_site_details_meta' ),
				'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
			)
		);
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/customize-data',
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_customize_sidebar_data' ),
				'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
			)
		);

		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/pages/sitemap',
			array(
				'methods'             => \WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'publish_sitemap_pages' ),
				'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				'args'                => $this->get_publish_sitemap_pages_args(),
			)
		);
	}

	/**
	 * Required Args for Generating Site Gen Meta.
	 *
	 * @return array
	 */
	public function sitegen_meta_args() {
		return array(
			'site_info'  => array(
				'required' => true,
				'type'     => 'object',
			),
			'identifier' => array(
				'required' => true,
				'type'     => 'string',
			),
			'skip_cache' => array(
				'required' => false,
				'type'     => 'boolean',
			),
		);
	}

	/**
	 * Gets the arguments for the homepages endpoint.
	 *
	 * @return array The array of arguments.
	 */
	public function get_homepages_args() {
		return array(
			'site_description' => array(
				'required'          => true,
				'type'              => 'string',
				'sanitize_callback' => 'sanitize_text_field',
			),
		);
	}

	/**
	 * Gets the arguments for the '/pages/sitemap' endpoint.
	 *
	 * @return array The array of arguments.
	 */
	public function get_publish_sitemap_pages_args() {
		return array(
			'site_description' => array(
				'required'          => true,
				'type'              => 'string',
				'sanitize_callback' => 'sanitize_text_field',
			),
		);
	}

	/**
	 * Gets the arguments for the 'get-homepages' endpoint.
	 *
	 * @return array The array of arguments.
	 */
	public function get_regenerate_homepage_args() {
		return array(
			'site_description' => array(
				'required'          => true,
				'type'              => 'string',
				'sanitize_callback' => 'sanitize_text_field',
			),
			'slug'             => array(
				'required' => false,
			),
			'colorPalettes'    => array(
				'required' => false,
			),
			'isFavorite'       => array(
				'required' => true,
			),
		);
	}

	/**
	 * Gets all the valid Identifiers
	 *
	 * @return array
	 */
	public function get_enabled_identifiers() {
		return array_keys( array_filter( SiteGenService::enabled_identifiers() ) );
	}

	/**
	 * Generate Sitegen meta data.
	 *
	 * @param \WP_REST_Request $request Request model.
	 *
	 * @return array|WP_Error
	 */
	public function generate_sitegen_meta( \WP_REST_Request $request ) {
		if ( ! SiteGenService::is_enabled() ) {
			return new \WP_Error(
				'nfd_onboarding_error',
				'SiteGen is Disabled.',
				array( 'status' => 404 )
			);
		}

		$site_info  = $request->get_param( 'site_info' );
		$identifier = $request->get_param( 'identifier' );
		$skip_cache = $request->get_param( 'skip_cache' );

		// TODO Implement the main function and do computations if required.
		return SiteGenService::instantiate_site_meta( $site_info, $identifier, $skip_cache );
	}

	/**
	 * Gets the preview homepages
	 *
	 * @param \WP_REST_Request $request parameter.
	 * @return array
	 */
	public function get_homepages( \WP_REST_Request $request ) {
		$existing_homepages = SiteGenService::get_homepages();
		if ( ! empty( $existing_homepages ) ) {
			return new \WP_REST_Response( $existing_homepages, 200 );
		}

		$site_description = $request->get_param( 'site_description' );
		$site_info        = array( 'site_description' => $site_description );

		$target_audience = SiteGenService::instantiate_site_meta( $site_info, 'target_audience' );
		if ( is_wp_error( $target_audience ) ) {
			return $target_audience;
		}

		$content_style = SiteGenService::instantiate_site_meta( $site_info, 'content_tones' );
		if ( is_wp_error( $content_style ) ) {
			return $content_style;
		}

		$homepages = SiteGenService::generate_homepages(
			$site_description,
			$content_style,
			$target_audience
		);

		if ( is_wp_error( $homepages ) ) {
			return $homepages;
		}

		return new \WP_REST_Response( $homepages, 201 );
	}

	/**
	 * Gets the regenerated preview homepages
	 *
	 * @param \WP_REST_Request $request parameter.
	 * @return array
	 */
	public function regenerate_homepage( \WP_REST_Request $request ) {
		$site_description = $request->get_param( 'site_description' );
		$slug             = $request->get_param( 'slug' );
		$color_palette    = $request->get_param( 'palette' );
		$is_favorite      = $request->get_param( 'isFavorite' );
		$site_info        = array( 'site_description' => $site_description );

		$target_audience = SiteGenService::instantiate_site_meta( $site_info, 'target_audience' );
		if ( is_wp_error( $target_audience ) ) {
			return $target_audience;
		}
		$content_style = SiteGenService::instantiate_site_meta( $site_info, 'content_tones' );
		if ( is_wp_error( $content_style ) ) {
			return $content_style;
		}

		if ( $is_favorite ) {
			$result = SiteGenService::regenerate_favorite_homepage( $slug, $color_palette );
		} else {
			$result = SiteGenService::regenerate_homepage( $site_description, $content_style, $target_audience );
		}

		if ( null === $result ) {
			return new \WP_Error(
				'nfd_onboarding_error',
				__( 'Error at Regenerating home pages.', 'wp-module-onboarding' ),
				array(
					'status' => 400,
				)
			);
		}

		return new \WP_REST_Response( $result, 200 );
	}

	/**
	 * Publish the pages in the sitemap.
	 *
	 * @param \WP_REST_Request $request The incoming request
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function publish_sitemap_pages( \WP_REST_Request $request ) {
		$site_description = $request->get_param( 'site_description' );
		$site_info        = array( 'site_description' => $site_description );

		$target_audience = SiteGenService::instantiate_site_meta( $site_info, 'target_audience' );
		if ( is_wp_error( $target_audience ) ) {
			return $target_audience;
		}

		$content_style = SiteGenService::instantiate_site_meta( $site_info, 'content_tones' );
		if ( is_wp_error( $content_style ) ) {
			return $content_style;
		}

		$sitemap = SiteGenService::instantiate_site_meta( $site_info, 'sitemap' );
		if ( is_wp_error( $sitemap ) ) {
			return $sitemap;
		}

		SiteGenService::publish_sitemap_pages( $site_description, $content_style, $target_audience, $sitemap );

		return new \WP_REST_Response( array(), 201 );
	}

	/**
	 * Generate Sitegen Site Details meta data.
	 *
	 * @return array|WP_Error
	 */
	public function get_site_details_meta() {
		return SiteGenData::get_site_details_questionnaire();
	}

	/**
	 * Get Sitegen Customize sidebar data.
	 *
	 * @return array|WP_Error
	 */
	public function get_customize_sidebar_data() {
		return SiteGenService::get_customize_sidebar_data();
	}
}
