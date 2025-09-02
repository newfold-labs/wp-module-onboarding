<?php
/**
 * Blueprint Import Service
 *
 * @package NewfoldLabs\WP\Module\Onboarding
 */

namespace NewfoldLabs\WP\Module\Onboarding\Services\Blueprints;

/**
 * Blueprint Import Service
 * 
 * This class handles the import of a blueprint package that is exported by...
 * https://github.com/newfold-labs/wp-plugin-blueprint-exporter.
 * 
 * The blueprint package is a zip file that contains a SQL file and a folder with
 * the media files.
 * 
 * The SQL file is processed to replace the source site URL with the target site URL.
 * The media files are copied to the wp-content/uploads directory.
 */
class BlueprintImportService extends BlueprintsService {

	/**
	 * The resources source of the blueprint.
	 *
	 * @var string
	 */
	private $resources_url = '';

	/**
	 * The temporary directory for the import.
	 *
	 * @var string
	 */
	private $temp_dir = '';

	/**
	 * Import a blueprint.
	 *
	 * @param string $blueprint_resources_url The zip file source of the blueprint.
	 * @return true|\WP_Error True if the blueprint is imported, WP_Error if there is an error.
	 */
	public function import( string $blueprint_resources_url ) {
		$this->resources_url = $blueprint_resources_url;
		// Validate the blueprint resources source.
		if ( ! $this->validate_blueprint_resources_url() ) {
			return new \WP_Error( 'invalid_blueprint_resources_url', 'Invalid blueprint resources URL' );
		}

		try {
			// Fetch the blueprint zip to be imported.
			$blueprint_zip = $this->fetch_blueprint_zip();
			if ( \is_wp_error( $blueprint_zip ) ) {
				return $blueprint_zip;
			}

			// Unzip the blueprint zip.
			$blueprint_processed = $this->process_blueprint_zip( $blueprint_zip );
			if ( \is_wp_error( $blueprint_processed ) ) {
				return $blueprint_processed;
			}

			return true;
		} catch ( \Exception $e ) {
			$this->cleanup_temp_dir();
			return new \WP_Error( 'blueprint_import_error', 'Blueprint import failed' );
		}
	}

	/**
	 * Validate the blueprint resources source.
	 *
	 * @return bool True if the blueprint resources source is valid, false otherwise.
	 */
	private function validate_blueprint_resources_url(): bool {
		$blueprint = $this->get_blueprint_by_resources_url( $this->resources_url );
		if ( empty( $blueprint ) ) {
			return false;
		}

		return true;
	}

	/**
	 * Fetch the blueprint zip to temp file.
	 *
	 * @return string|\WP_Error The download temp file path or an error if the blueprint zip is not found.
	 */
	private function fetch_blueprint_zip() {
		if ( ! function_exists( 'download_url' ) ) {
			require_once ABSPATH . 'wp-admin/includes/file.php';
		}

		$zip_file = \download_url( $this->resources_url );
		if ( \is_wp_error( $zip_file ) ) {
			return new \WP_Error( 'blueprint_zip_download_failed', 'Blueprint zip download failed' );
		}

		return $zip_file;
	}

	/**
	 * Process the blueprint zip.
	 *
	 * @param string $zip_file The path to the zip file.
	 * @return true|\WP_Error True if the blueprint zip is processed, WP_Error if there is an error.
	 */
	private function process_blueprint_zip( string $zip_file ) {
		\WP_Filesystem();

		/**
		 * The result of the blueprint import.
		 *
		 * @var true|\WP_Error
		 */
		$result = true;

		// Create the temporary working directory.
		$this->temp_dir = \get_temp_dir() . 'blueprint-import/';
		// Delete working directory if it exists (clear existing exports).
		if ( is_dir( $this->temp_dir ) ) {
			$this->cleanup_temp_dir();
		}
		// Create working directory.
		if ( ! is_dir( $this->temp_dir ) ) {
			\wp_mkdir_p( $this->temp_dir );
		}

		// Unzip the blueprint zip to the working directory.
		$unzip_status = \unzip_file( $zip_file, $this->temp_dir );
		if ( \is_wp_error( $unzip_status ) ) {
			@unlink( $zip_file );
			$result = new \WP_Error( 'blueprint_unzip_failed', 'Blueprint unzip failed' );
		}
		@unlink( $zip_file );

		// Process the SQL file
		$sql_processed = $this->process_sql_file();
		if ( \is_wp_error( $sql_processed ) ) {
			$result = $sql_processed;
		}

		// Process media files
		$media_processed = $this->process_media_files();
		if ( \is_wp_error( $media_processed ) ) {
			$result = $media_processed;
		}

		// Clean up the temporary directory.
		$this->cleanup_temp_dir();

		return $result;
	}

	/**
	 * Process the SQL file.
	 *
	 * @return bool|\WP_Error True if the SQL file is processed, WP_Error if there is an error.
	 */
	private function process_sql_file() {
		// Get the SQL file.
		$sql_file = $this->temp_dir . 'blueprint.sql';
		if ( ! file_exists( $sql_file ) ) {
			return new \WP_Error( 'sql_file_not_found', 'Blueprint SQL file not found' );
		}

		// Read the SQL file.
		$sql_content = file_get_contents( $sql_file );
		if ( false === $sql_content || empty( $sql_content ) ) {
			return new \WP_Error( 'sql_file_read_error', 'Could not read SQL file' );
		}

		// Perform search and replace.
		$processed_sql_content = $this->search_replace( $sql_content );
		if ( \is_wp_error( $processed_sql_content ) ) {
			return $processed_sql_content;
		}

		// Insert the SQL content.
		$insert_sql = $this->insert_sql( $processed_sql_content );
		if ( \is_wp_error( $insert_sql ) ) {
			return $insert_sql;
		}

		// Map the user posts.
		$this->map_user_posts();

		return true;
	}

	/**
	 * Search and replace.
	 *
	 * @param string $sql_content The SQL content.
	 * @return string|\WP_Error The processed SQL content or an WP_Error if there is an error.
	 */
	private function search_replace( string $sql_content ) {
		global $wpdb;

		/**
		 * Search and replace database prefix.
		 */
		$sql_content = str_replace( '{{PREFIX}}', $wpdb->prefix, $sql_content );

		/**
		 * Search and replace site URL.
		 */
		// Get the source site URL.
		$source_site_url = preg_match( '/-- Site URL: ([^\r\n]+)/', $sql_content, $matches );
		if ( empty( $source_site_url ) ) {
			return new \WP_Error( 'source_site_url_not_found', 'Source site URL not found' );
		}
		$source_site_url = trim( $matches[1] ?? '' );
		$source_site_url = rtrim( $source_site_url, '/' );

		// Get the target site URL.
		$target_site_url = home_url();
		$target_site_url = rtrim( $target_site_url, '/' );

		// Replace URLs in content
		$sql_content = str_replace( $source_site_url, $target_site_url, $sql_content );
		// Also handle URLs with trailing slashes
		$sql_content = str_replace( $source_site_url . '/', $target_site_url . '/', $sql_content );

		/**
		 * Search and replace any non-secure urls with secure urls.
		 */
		$non_secure_source_site_url = parse_url( $source_site_url, PHP_URL_HOST );
		$non_secure_source_site_url = 'http://' . $non_secure_source_site_url;

		// Replace URLs in content
		$sql_content = str_replace( $non_secure_source_site_url, $target_site_url, $sql_content );
		// Also handle URLs with trailing slashes
		$sql_content = str_replace( $non_secure_source_site_url . '/', $target_site_url . '/', $sql_content );

		if ( empty( $sql_content ) ) {
			return new \WP_Error( 'sql_search_replace_failed', 'SQL search and replace failed' );
		}

		return $sql_content;
	}

	/**
	 * Insert the SQL content.
	 *
	 * @param string $sql_content The SQL content.
	 * @return bool|\WP_Error True if the SQL content is inserted, WP_Error if 75% or more of the SQL statements are not inserted.
	 */
	private function insert_sql( string $sql_content ) {
		global $wpdb;

		// Extract the SQL statements from the SQL content.
		$statements = $this->get_statements_from_sql( $sql_content );
		if ( empty( $statements ) ) {
			return new \WP_Error( 'invalid_sql_content', 'Invalid SQL content. No statements found.' );
		}

		// Status trackers.
		$errors = [];
		$successful_count = 0;
		$total_statements = 0;

		// Insert the SQL content.
		foreach ( $statements as $statement ) {
			$statement = trim( $statement );
			// Skip empty statements, comments, and SET statements.
			if ( empty( $statement ) || strpos( $statement, '--' ) === 0 || strpos( $statement, 'SET' ) === 0 ) {
				continue;
			}

			$total_statements++;

			$result = $wpdb->query( $statement );
			if ( false === $result && ! empty( $wpdb->last_error ) ) {
				// Record the error.
				$errors[] = [
					'statement' => substr( $statement, 0, 100 ) . '...',
					'error' => $wpdb->last_error
				];
			} else {
				$successful_count++;
			}
		}

		/**
		 * Determine success based on ratio of successful imports
		 */
		$success_rate = $total_statements > 0 ? ( $successful_count / $total_statements ) : 0;

		// If the success rate is less than 75%, return an error.
		if ( $success_rate < 0.75 ) {
			return new \WP_Error( 'sql_import_mostly_failed', 
				sprintf( 'SQL import mostly failed. %d/%d statements succeeded.', $successful_count, $total_statements ),
				$errors
			);
		}

		return true;
	}

	/**
	 * Get the statements from the SQL content.
	 *
	 * @param string $sql_content The SQL content.
	 * @return array The statements.
	 */
	private function get_statements_from_sql( string $sql_content ): array {
		$statements = [];
		$current_statement = '';
		
		// Split the entire SQL dump into individual lines
		$lines = explode( "\n", $sql_content );

		// Loop through each line to build statements
		foreach ( $lines as $line ) {
			$trimmed_line = trim( $line );

			// Skip empty lines and comment lines
			if ( empty( $trimmed_line ) || strpos( $trimmed_line, '--' ) === 0 || strpos( $trimmed_line, '#' ) === 0 ) {
				continue;
			}

			// Append the line to the current statement
			$current_statement .= $line . "\n";

			// If a line ends with a semicolon, we've reached the end of a statement
			if ( substr( $trimmed_line, -1 ) === ';' ) {
				$statements[] = trim( $current_statement );
				// Reset for the next statement
				$current_statement = '';
			}
		}

		return $statements;
	}

	/**
	 * Process the media files.
	 *
	 * @return bool|\WP_Error True if the media files are processed, WP_Error if there is an error.
	 */
	private function process_media_files() {
		$temp_uploads_dir = $this->temp_dir . 'uploads/';
		if ( ! is_dir( $temp_uploads_dir ) ) {
			// Return true if no uploads to import.
			return true;
		}

		// Get wp-content/uploads directory.
		$wp_uploads_dir = wp_upload_dir()['basedir'];
		if ( ! is_dir( $wp_uploads_dir ) ) {
			return new \WP_Error( 'uploads_dir_not_found', 'WordPress uploads directory not found' );
		}

		// Iterate through the uploads source and copy its contents to the wp-content/uploads directory.
		$iterator = new \RecursiveIteratorIterator(
			new \RecursiveDirectoryIterator( $temp_uploads_dir, \RecursiveDirectoryIterator::SKIP_DOTS ),
			\RecursiveIteratorIterator::SELF_FIRST
		);

		try {
			foreach ( $iterator as $file ) {
				$source_path   = $file->getRealPath();
				$relative_path = substr( $source_path, strlen( $temp_uploads_dir ) );
				// Remove leading 'uploads/' if it exists in the relative path.
				if ( strpos( $relative_path, 'uploads' . DIRECTORY_SEPARATOR ) === 0 ) {
					$relative_path = substr( $relative_path, strlen( 'uploads' . DIRECTORY_SEPARATOR ) );
				}
				$destination_path = $wp_uploads_dir . DIRECTORY_SEPARATOR . $relative_path;

				if ( $file->isDir() ) {
					wp_mkdir_p( $destination_path );
				} else {
					// Ensure destination directory exists
					$destination_file_dir = dirname( $destination_path );
					if ( ! is_dir( $destination_file_dir ) ) {
						wp_mkdir_p( $destination_file_dir );
					}

					// Copy the file (overwrite if it exists).
					if ( file_exists( $destination_path ) ) {
						unlink( $destination_path );
					}
					copy( $source_path, $destination_path );
				}
			}
		} catch ( \Exception $e ) {
			return new \WP_Error( 'blueprint_media_import_error', 'Media import failed: ' . $e->getMessage() );
		}

		return true;
	}

	/**
	 * Map wp_posts post_author rows to the current user.
	 *
	 * @return void
	 */
	private function map_user_posts() {
		global $wpdb;
		$current_user_id = get_current_user_id();

		$wpdb->query( $wpdb->prepare(
			"UPDATE {$wpdb->posts} SET post_author = %d",
			$current_user_id
		) );
	}

	/**
	 * Clean up the temporary directory.
	 * 
	 * @return bool True if the temporary directory is cleaned up, false otherwise.
	 */
	private function cleanup_temp_dir(): bool {
		$dir = $this->temp_dir;
		if ( ! is_dir( $dir ) ) {
			return true;
		}

		// Remove all files and subdirectories.
		$files = array_diff( scandir( $dir ), array( '.', '..' ) );
		foreach ( $files as $file ) {
			$path = $dir . DIRECTORY_SEPARATOR . $file;
			if ( is_dir( $path ) ) {
				$this->remove_not_empty_directory( $path );
			} else {
				unlink( $path );
			}
		}

		return rmdir( $dir );
	}

	/**
	 * Recursively remove a directory and all its contents.
	 *
	 * @param string $dir The directory path to remove
	 * @return bool True on success, false on failure
	 */
	private function remove_not_empty_directory( string $dir ): bool {
		if ( ! is_dir( $dir ) ) {
			return true;
		}

		// Remove all files and subdirectories.
		$files = array_diff( scandir( $dir ), array( '.', '..' ) );
		foreach ( $files as $file ) {
			$path = $dir . DIRECTORY_SEPARATOR . $file;
			if ( is_dir( $path ) ) {
				$this->remove_not_empty_directory( $path );
			} else {
				unlink( $path );
			}
		}

		return rmdir( $dir );
	}
}
