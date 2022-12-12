<?php

namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Mustache\Mustache;
use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\Data\Patterns;

/**
 * class SitePagesController
 */
class SitePagesController {


	/**
	 * @var string
	 */
	protected $namespace = 'newfold-onboarding/v1';

	/**
	 * @var string
	 */
	protected $rest_base = '/site-pages';

	/**
	 * Registers rest routes for SitePagesController class.
	 *
	 * @return void
	 */
	public function register_routes() {
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/publish',
			array(
				'methods'             => \WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'publish_site_pages' ),
				'permission_callback' => array( Permissions::class, 'custom_post_authorized_admin' ),
			)
		);
	}

	/**
	 * Endpoint create_page
	 *
	 * @param $request WP_REST_Request
	 */
	public function publish_site_pages() {
		$flow_data_option = \get_option( Options::get_option_name( 'flow' ), false );
		if ( $flow_data_option === false || ! isset( $flow_data_option['data'] ) ) {
			return new \WP_Error(
				'nfd_onboarding_error',
				'Flow data does not exist to generate a child theme.',
				array( 'status' => 500 )
			);
		}

		$flow_data = $flow_data_option['data'];

		$homepage_set = $this->set_homepage( $flow_data['sitePages']['homepage'] );
		if ( is_wp_error( $homepage_set ) ) {
			return $homepage_set;
		}

		$site_pages_set = $this->set_site_pages( $flow_data['sitePages']['other'] );
		if ( is_wp_error( $site_pages_set ) ) {
			return $site_pages_set;
		}

		return new \WP_REST_Response(
			array(),
			201
		);
	}

	private function set_homepage( $homepage_pattern_slug ) {
		if ( empty( $homepage_pattern_slug ) ) {
			return true;
		}

		 $pattern_data = Patterns::get_pattern_from_slug( $homepage_pattern_slug );
		if ( ! $pattern_data ) {
			return new \WP_Error(
				'nfd_onboarding_error',
				"Page Pattern for $homepage_pattern_slug not found.",
				array( 'status' => 500 )
			);
		}

		 $show_pages_on_front = \get_option( Options::get_option_name( 'show_on_front', false ) );

		 // Check if default homepage is posts
		if ( $show_pages_on_front == 'posts' ) {
			 \update_option( Options::get_option_name( 'show_on_front', false ), 'page' );
		}

		$post_id = $this->publish_page( 'Homepage', $pattern_data['content'], true );
		if ( is_wp_error( $post_id ) ) {
			return $post_id;
		}

		\update_option( Options::get_option_name( 'page_on_front', false ), $post_id );

		return true;

	}

	private function set_site_pages( $site_pages_pattern_slugs ) {
		if ( empty( $site_pages_pattern_slugs ) ) {
			return true;
		}

		foreach ( $site_pages_pattern_slugs as $key => $site_page ) {
			$pattern_data = Patterns::get_pattern_from_slug( $site_page['slug'] );
			if ( ! $pattern_data ) {
				return new \WP_Error(
					'nfd_onboarding_error',
					"Page Pattern for $site_page[slug] not found.",
					array( 'status' => 500 )
				);
			}
			$page_data = $this->publish_page( $site_page['title'], $pattern_data['content'] );
			if ( is_wp_error( $page_data ) ) {
				return $page_data;
			}
		}
		return true;
	}

	public function publish_page( $title, $content, $is_template_no_title = false ) {

		$post = array(
			'post_title'   => $title,
			'post_status'  => 'publish',
			'post_content' => $content,
			'post_type'    => 'page',
		);

		if ( $is_template_no_title ) {
			$post['page_template'] = 'no-title';
		}

		return \wp_insert_post( $post );
	}
}
