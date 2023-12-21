<?php

namespace NewfoldLabs\WP\Module\Onboarding\RestApi;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\AI\SiteGen\SiteGen;
use NewfoldLabs\WP\Module\Onboarding\Data\Services\SiteGenService;

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
			$this->rest_base . '/get-identifiers',
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_valid_identifiers' ),
				'permission_callback' => '__return_true',
			)
		);
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/generate',
			array(
				'methods'             => \WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'generate_sitegen_meta' ),
				'permission_callback' => '__return_true',
				'args'                => $this->sitegen_meta_args(),
			)
		);
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/get-homepages',
			array(
				'methods'             => \WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'get_homepages' ),
				'permission_callback' => '__return_true',
				'args' => $this->get_homepages_args(),
			)
		);
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/get-homepages-regenerate',
			array(
				'methods'             => \WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'get_regenerated_homepages' ),
				'permission_callback' => '__return_true',
				'args' => $this->get_homepages_args(),
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
     * Gets the arguments for the 'get-homepages' endpoint.
     *
     * @return array The array of arguments.
     */
    public function get_homepages_args() {
        return array(
            'site_description' => array(
                'required' => false,
                'validate_callback' => function($param, $request, $key) {
                    return is_string($param);
                },
                'sanitize_callback' => 'sanitize_text_field'
            ),
            'regenerate' => array(
                'required' => false,
            ),
            // Add other parameters here as needed.
        );
    }

	/**
	 * Gets all the valid Identifiers
	 *
	 * @return array
	 */
	public function get_valid_identifiers() {
		return array_keys( array_filter( SiteGenService::get_identifiers() ) );
	}

	/**
	 * Generate Sitegen meta data.
	 *
	 * @param \WP_REST_Request $request Request model.
	 *
	 * @return array|WP_Error
	 */
	public function generate_sitegen_meta( \WP_REST_Request $request ) {

		$site_info  = $request->get_param( 'site_info' );
		$identifier = $request->get_param( 'identifier' );
		$skip_cache = $request->get_param( 'skip_cache' );

		if ( SiteGenService::is_enabled() ) {
			// TODO Implement the main function and do computations if required.
			return SiteGenService::instantiate_site_meta( $site_info, $identifier, $skip_cache );
		}

		return new \WP_Error(
			'sitegen-error',
			'SiteGen is Disabled.',
			array( 'status' => 404 )
		);
	}

	/**
	 * Gets the preview homepages
	 *
	 * @return array
	 */
	public function get_homepages( \WP_REST_Request $request ) {

		// Fetching parameters provided by the front end.
		$site_description = $request->get_param( 'site_description' );
		$regenerate = $request->get_param( 'regenerate' );
		$site_info = array( 'site_info' => array( 'site_description' => $site_description ) );

		// If the option exists and is not empty, return it
		$existing_homepages = get_option('nfd-sitegen-homepages', []);		
       /*  if ( ! empty( $existing_homepages )  && !$regenerate ) {
            return new \WP_REST_Response( $existing_homepages, 200 );
        } */

		// Check if $target_audience is false, null, or not set and then call again.
		$target_audience_option = get_option('nfd-ai-site-gen-targetaudience');
		$target_audience = isset($target_audience_option) ? $target_audience_option : null;

		if (!$target_audience) {
			$target_audience = SiteGenService::instantiate_site_meta($site_info, 'targetaudience', $skip_cache);
		}

		$content_style_option = get_option('nfd-ai-site-gen-contenttones');
		$content_style = isset($content_style_option) ? $content_style_option : null;
		if(!$content_style) {
			$content_style = SiteGenService::instantiate_site_meta($site_info, 'contenttones', $skip_cache);
		}

		// Ensure that the required data is available.
		if (!$target_audience || !$content_style) {
			return new \WP_REST_Response(
				array('message' => 'Required data is missing.'),
				400 // Bad Request
			);
		}

		$home_pages = SiteGen::get_home_pages(
			$site_description,
			$content_style,
			$target_audience,
			false
		);

		$processed_home_pages = $this->process_homepages_response( $home_pages );
		update_option('nfd-sitegen-homepages', $processed_home_pages );
		return new \WP_REST_Response($processed_home_pages, 200);
	}

	public function get_regenerated_homepages( \WP_REST_Request $request ) {
		// Fetching parameters provided by the front end.
		$site_description = $request->get_param( 'site_description' );
		$slug = $request->get_param( 'slug' );
		$colorPalattes = $request->get_param( 'colorPalettes' );
		$site_info = array( 'site_info' => array( 'site_description' => $site_description ) );
	
		// Get target audience and content style options.
		$target_audience = get_option('nfd-ai-site-gen-targetaudience');
		$content_style = get_option('nfd-ai-site-gen-contenttones');
	
		// Ensure that the required data is available.
		if (!$target_audience || !$content_style) {
			return new \WP_REST_Response(
				array('message' => 'Required data is missing.'),
				400 // Bad Request
			);
		}
	
		// Get the existing and regenerated homepages.
		$existing_homepages = get_option('nfd-sitegen-homepages', []);
		$regenerated_homepages = get_option('nfd-sitegen-regenerated-homepages', []);
	
		// Check if there are any regenerated homepages left.
		if (!empty($regenerated_homepages)) {
			// Shift the first element from regenerated homepages to existing homepages.
			$regenerated_item = array_shift($regenerated_homepages);
			$existing_homepages[] = $regenerated_item;
	
			// Update the options with the new values.
			update_option('nfd-sitegen-regenerated-homepages', $regenerated_homepages);
			update_option('nfd-sitegen-homepages', $existing_homepages);
	
			// Return the updated list of existing homepages.
			return new \WP_REST_Response($existing_homepages, 200);
		} else {
			// Since there are no regenerated homepages left, generate new ones.
			$home_pages = SiteGen::get_home_pages(
				$site_description,
				$content_style,
				$target_audience,
				true 
			);
	
			// Process and save the new batch of regenerated homepages.
			$regenerated_homepages = $this->process_homepages_response( $home_pages );
			update_option('nfd-sitegen-regenerated-homepages', $regenerated_homepages);
	
			// Take the first regenerated homepage and add it to the existing homepages.
			$regenerated_item = array_shift($regenerated_homepages);
			$existing_homepages[] = $regenerated_item;
	
			// Save the updates and return the response.
			update_option('nfd-sitegen-regenerated-homepages', $regenerated_homepages);
			update_option('nfd-sitegen-homepages', $existing_homepages);
	
			// Return the updated list of existing homepages.
			return new \WP_REST_Response($existing_homepages, 200);
		}
	}	

	private function transform_color_palette($color_palette) {
		$transformed_palette = array_map(function($key, $value) {
			return [
				"slug" => $key,
				"title" => ucfirst(str_replace('_', ' ', $key)),
				"color" => $value
			];
		}, array_keys($color_palette), $color_palette);
	
		return $transformed_palette;
	}

	private function get_color_palette($color_palettes) {
		foreach ($color_palettes as $palette_index => $palette) {	
			error_log("Homepage Version palette: " . print_r($palette, true));
			$colors_list = array_map(function($key, $color) {
				error_log("Homepage Version palette key: " . print_r($key, true));
				error_log("Homepage Version palette: color" . print_r($color, true));
				return [
					"slug" => $key,
					"palette" => $this->transform_color_palette($color)
				];
			}, array_keys($palette), $palette);
		}
		return $colors_list; 
	}
	

	private function process_homepages_response($home_pages) {
		$versions = [];
	
		// Fetch the color palette data from the options table.
		$color_palettes = get_option('nfd-ai-site-gen-colorpalette');
	
		// If color palettes is not an array, try decoding it in case it's a JSON string.
		if (!is_array($color_palettes)) {
			$color_palettes = json_decode($color_palettes, true);
		}
	
		// Retrieve the existing homepages to find the last version number.
		$existing_homepages = get_option('nfd-sitegen-homepages', []);
		$last_version_number = $this->get_last_version_number($existing_homepages);
		$version_number = $last_version_number + 1; // Start numbering from the last version number + 1
	
		// Iterate through each homepage block.
		foreach ($home_pages as $key => $blocks) {
			if (!is_array($blocks)) {
				continue;
			}
	
			$filtered_blocks = array_filter($blocks, function($value) {
				return !is_null($value);
			});
	
			$content = implode('', $filtered_blocks);
	
			$version_info = [
				"slug" => "version" . $version_number,
				"title" => "Version " . $version_number,
				"isFavourited" => false,
				"content" => $content,
				"color" => $this->get_color_palette($color_palettes)
			];
	
			$versions[] = $version_info;
	
			$version_number++; // Increment the version number for the next iteration.
		}
	
		return $versions;
	}
	

	private function get_last_version_number($homepages) {
		// Initialize to zero, assuming there are no versions yet.
		$last_version_number = 0;
	
		// Loop through the homepages to find the highest version number.
		foreach ($homepages as $homepage) {
			// Extract the number from the slug (assuming slug is like "version3").
			if (preg_match('/version(\d+)/', $homepage['slug'], $matches)) {
				$version_num = intval($matches[1]);
				if ($version_num > $last_version_number) {
					$last_version_number = $version_num;
				}
			}
		}
	
		return $last_version_number;
	}
}
