<?php
/**
 * Blueprints Service
 *
 * @package NewfoldLabs\WP\Module\Onboarding\Services
 */

namespace NewfoldLabs\WP\Module\Onboarding\Services;

/**
 * Blueprints Service
 */
class BlueprintsService {

	/**
	 * The URL of the blueprints service.
	 *
	 * @var string
	 */
	private $blueprints_service_url = 'https://cloud-patterns.test/api/v1/blueprints/';

	/**
	 * Fetch the blueprints from the service.
	 *
	 * @return array|WP_Error The blueprints array or a WP_Error if the request fails.
	 */
	public function fetch_blueprints() {
		$response = wp_remote_get( $this->blueprints_service_url );
		if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {
			return new \WP_Error( 'blueprints_service_error', 'Failed to get blueprints from the service' );
		}
		$response   = json_decode( wp_remote_retrieve_body( $response ), true );
		$blueprints = $response['data'];
		return $blueprints;
	}
}
