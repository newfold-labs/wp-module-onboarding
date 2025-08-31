<?php
/**
 * Blueprints Service
 *
 * @package NewfoldLabs\WP\Module\Onboarding\Services\Blueprints
 */

namespace NewfoldLabs\WP\Module\Onboarding\Services\Blueprints;

use NewfoldLabs\WP\Module\Onboarding\Services\SiteTypes\EcommerceSiteTypeService;
use NewfoldLabs\WP\Module\Onboarding\Services\ReduxStateService;
use NewfoldLabs\WP\Module\Patterns\Services\PluginService as PatternsPluginService;

/**
 * Blueprints Service
 */
class BlueprintsService {

	/**
	 * The URL of the blueprints service.
	 *
	 * @var string
	 */
	private static $blueprints_service_url = 'https://patterns.hiive.cloud/api/v1/blueprints/';

	/**
	 * The redux blueprints data.
	 *
	 * @var array
	 */
	private $blueprints_data = array();

	public function __construct() {
		$this->blueprints_data = ReduxStateService::get( 'blueprints' );
	}

	/**
	 * Fetch the blueprints from the service.
	 *
	 * @return array|WP_Error The blueprints array or a WP_Error if the request fails.
	 */
	public static function fetch_blueprints() {
		$response = wp_remote_get( self::$blueprints_service_url );
		if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {
			return new \WP_Error( 'blueprints_service_error', 'Failed to get blueprints from the service' );
		}
		$response   = json_decode( wp_remote_retrieve_body( $response ), true );
		$blueprints = $response['data'];
		return $blueprints;
	}

	/**
	 * Import a blueprint.
	 *
	 * @param string $selected_blueprint_slug The slug of the selected blueprint.
	 * @return bool|WP_Error True if the blueprint is imported, WP_Error if there is an error.
	 */
	public function import_blueprint( string $selected_blueprint_slug ) {
		$selected_blueprint = $this->get_blueprint_by_slug( $selected_blueprint_slug );
		if ( empty( $selected_blueprint ) ) {
			return new \WP_Error( 'import_blueprint_error', 'Blueprint not found' );
		}

		$selected_blueprint_resources_url = $selected_blueprint['resources_url'];

		$blueprint_import_service = new BlueprintImportService();
		$import_result            = $blueprint_import_service->import( $selected_blueprint_resources_url );

		return $import_result;
	}

	/**
	 * Install the required plugins for a blueprint.
	 *
	 * @param string $selected_blueprint_slug The slug of the selected blueprint.
	 * @return bool|WP_Error True if the plugins are installed, WP_Error if there is an error.
	 */
	public function install_required_plugins( string $selected_blueprint_slug ) {
		$selected_blueprint = $this->get_blueprint_by_slug( $selected_blueprint_slug );
		if ( empty( $selected_blueprint ) ) {
			return new \WP_Error( 'install_blueprint_required_plugins_error', 'Blueprint not found' );
		}

		// Enable Jetpack Forms module.
		PatternsPluginService::enable_jetpack_forms_module();

		// Install WooCommerce plugins (background process).
		$selected_blueprint_type = $selected_blueprint['type'];
		if ( 'ecommerce' === $selected_blueprint_type ) {
			// Install WooCommerce plugins (background process).
			EcommerceSiteTypeService::install_ecommerce_plugins();
		}

		return true;
	}

	/**
	 * Get a blueprint by slug.
	 *
	 * @param string $slug The slug of the blueprint.
	 * @return array|null The blueprint array or null if not found.
	 */
	public function get_blueprint_by_slug( string $slug ) {
		return $this->get_blueprint_by_property( 'slug', $slug );
	}

	/**
	 * Get a blueprint by resources URL.
	 *
	 * @param string $resources_url The resources URL of the blueprint.
	 * @return array|null The blueprint array or null if not found.
	 */
	public function get_blueprint_by_resources_url( string $resources_url ) {
		return $this->get_blueprint_by_property( 'resources_url', $resources_url );
	}

	/**
	 * Get a blueprint by property.
	 *
	 * @param string $property The property of the blueprint.
	 * @param string $value The value of the property.
	 * @return array|null The blueprint array or null if not found.
	 */
	public function get_blueprint_by_property( string $property, string $value ) {
		if (
			empty( $this->blueprints_data ) ||
			! isset( $this->blueprints_data['blueprints'] ) ||
			! is_array( $this->blueprints_data['blueprints'] ) ||
			empty( $this->blueprints_data['blueprints'] )
		) {
			return null;
		}

		$blueprints = $this->blueprints_data['blueprints'];

		$target_blueprint = array_filter(
			$blueprints,
			function( $blueprint ) use ( $property, $value ) {
				return $blueprint[$property] === $value;
			}
		);
		if ( empty( $target_blueprint ) ) {
			return null;
		}

		return array_values( $target_blueprint )[0];
	}
}
