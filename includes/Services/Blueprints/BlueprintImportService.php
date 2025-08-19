<?php

namespace NewfoldLabs\WP\Module\Onboarding\Services\Blueprints;

use NewfoldLabs\WP\Module\Installer\Services\PluginInstaller;

class BlueprintImportService extends BlueprintsService {

	/**
	 * The XML source of the blueprint.
	 *
	 * @var string
	 */
	private $xml_url = '';

	/**
	 * Import a blueprint.
	 *
	 * @param string $blueprint_xml_url The XML source of the blueprint.
	 * @return bool|\WP_Error True if the blueprint is imported, WP_Error if there is an error.
	 */
	public function import( string $blueprint_xml_url ) {
		$this->xml_url = $blueprint_xml_url;
		// Validate the blueprint XML source.
		if ( ! $this->validate_blueprint_xml_source() ) {
			return new \WP_Error( 'invalid_blueprint_xml_source', 'Invalid blueprint XML source' );
		}

		// Fetch the blueprint XML to be imported.
		$blueprint_xml = $this->fetch_blueprint_xml();
		if ( \is_wp_error( $blueprint_xml ) ) {
			return $blueprint_xml;
		}

		// Check if the WordPress importer is loaded.
		$wordpress_importer = $this->get_wordpress_importer_instance();
		if ( \is_wp_error( $wordpress_importer ) ) {
			xr( $wordpress_importer );
			return $wordpress_importer;
		}

		try {
			$wordpress_importer->fetch_attachments = true;
			ob_start();
			$wordpress_importer->import( $blueprint_xml );
			$importer_output = ob_get_clean();

			// If the importer output does not contain the string "All done.", then the blueprint import failed.
			if ( false === strpos( $importer_output, 'All done.' ) ) {
				throw new \Exception( 'Blueprint import failed' );
			}
		} catch ( \Exception $e ) {
			@unlink( $blueprint_xml );
			return new \WP_Error( 'blueprint_import_failed', $e->getMessage() );
		}

		@unlink( $blueprint_xml );
		return true;
	}

	/**
	 * Validate the blueprint XML source.
	 *
	 * @return bool True if the blueprint XML source is valid, false otherwise.
	 */
	private function validate_blueprint_xml_source(): bool {
		$blueprint = $this->get_blueprint_by_resources_url( $this->xml_url );
		if ( empty( $blueprint ) ) {
			return false;
		}

		return true;
	}

	/**
	 * Fetch the blueprint XML to temp file.
	 *
	 * @return string|\WP_Error The download temp file path or an error if the blueprint XML is not found.
	 */
	private function fetch_blueprint_xml() {
		if ( ! function_exists( 'download_url' ) ) {
			require_once ABSPATH . 'wp-admin/includes/file.php';
		}

		$xml_file = \download_url( $this->xml_url );
		if ( \is_wp_error( $xml_file ) ) {
			return new \WP_Error( 'blueprint_xml_download_failed', 'Blueprint XML download failed' );
		}

		return $xml_file;
	}

	/**
	 * Get the WordPress importer instance.
	 *
	 * @return \WP_Import|\WP_Error The WordPress importer instance or an error if the WordPress importer is not loaded.
	 */
	private function get_wordpress_importer_instance() {
		$wordpress_importer_plugin = array(
			'slug'     => 'wordpress-importer',
			'path'     => 'wordpress-importer/wordpress-importer.php',
			'dir'      => WP_PLUGIN_DIR . '/wordpress-importer/',
		);

		// Install the WordPress importer plugin.
		if ( ! PluginInstaller::is_plugin_installed( $wordpress_importer_plugin['path'] ) ) {
			$install_status = PluginInstaller::install_from_wordpress( $wordpress_importer_plugin['slug'], true );
			if ( \is_wp_error( $install_status ) ) {
				return new \WP_Error( 'wordpress_importer_installation_failed', 'WordPress importer installation failed' );
			}
		}

		// Activate the WordPress importer plugin.
		if ( ! PluginInstaller::is_active( $wordpress_importer_plugin['path'] ) ) {
			$activation_status = \activate_plugin( $wordpress_importer_plugin['path'] );
			if ( \is_wp_error( $activation_status ) ) {
				return new \WP_Error( 'wordpress_importer_activation_failed', 'WordPress importer activation failed' );
			}
		}

		// Load core dependencies.
		require_once ABSPATH . 'wp-admin/includes/import.php';
		if ( ! class_exists( 'WP_Importer' ) ) {
			require_once ABSPATH . 'wp-admin/includes/class-wp-importer.php';
		}

		// Load WordPress importer plugin dependencies.
		$wordpress_importer_plugin_files = [
			$wordpress_importer_plugin['dir'] . 'compat.php',
			$wordpress_importer_plugin['dir'] . 'parsers/class-wxr-parser.php',
			$wordpress_importer_plugin['dir'] . 'parsers/class-wxr-parser-simplexml.php', 
			$wordpress_importer_plugin['dir'] . 'parsers/class-wxr-parser-xml.php',
			$wordpress_importer_plugin['dir'] . 'parsers/class-wxr-parser-regex.php',
			$wordpress_importer_plugin['dir'] . 'class-wp-import.php'
		];
		foreach ( $wordpress_importer_plugin_files as $file ) {
			if ( file_exists( $file ) ) {
				require_once $file;
			}
		}

		// Validate the WordPress importer is loaded.
		if ( ! class_exists( 'WP_Import' ) ) {
			return new \WP_Error( 'wordpress_importer_not_loaded', 'WordPress importer not loaded' );
		}

		return new \WP_Import();
	}
}