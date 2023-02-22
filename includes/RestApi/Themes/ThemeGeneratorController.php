<?php
namespace NewfoldLabs\WP\Module\Onboarding\RestApi\Themes;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\Onboarding\Data\Data;
use NewfoldLabs\WP\Module\Onboarding\Mustache\Mustache;
use NewfoldLabs\WP\Module\Onboarding\Data\Themes;
use NewfoldLabs\WP\Module\Onboarding\Data\Options;

/**
 * Class ThemeGeneratorController
 */
class ThemeGeneratorController {
	 /**
	  * The REST API namespace of this controller's route.
	  *
	  * @var string
	  */
	 protected $namespace = 'newfold-onboarding/v1';

	/**
	 * The REST endpoint base
	 *
	 * @var string
	 */
	 protected $rest_base = '/themes';

	 /**
	  * The REST endpoint base
	  *
	  * @var string
	  */
	 protected $rest_extended_base = '/child/generate';

	 /**
	  * Registers rest routes for this controller class.
	  *
	  * @return void
	  */
	public function register_routes() {
		\register_rest_route(
			$this->namespace,
			$this->rest_base . $this->rest_extended_base,
			array(
				array(
					'methods'             => \WP_Rest_Server::CREATABLE,
					'callback'            => array( $this, 'generate_child_theme' ),
					'permission_callback' => array( Permissions::class, 'rest_can_manage_themes' ),
				),
			)
		);
	}

	 /**
	  * Generates the child theme from an active parent theme.
	  *
	  * @return \WP_REST_Response|\WP_Error
	  */
	public function generate_child_theme() {
		// Ensure that we have sufficient data to generate a child theme.
		$flow_data_option = \get_option( Options::get_option_name( 'flow' ), false );
		if ( false === $flow_data_option || ! isset( $flow_data_option['data'] ) ) {
			return new \WP_Error(
				'nfd_onboarding_error',
				'Flow data does not exist to generate a child theme.',
				array( 'status' => 500 )
			);
		}

		$flow_data = $this->validate_and_sanitize_flow_data( $flow_data_option['data'] );
		if ( false === $flow_data ) {
			return new \WP_Error(
				'nfd_onboarding_error',
				'Flow data is incomplete to generate a child theme.',
				array( 'status' => 500 )
			);
		}

		 // Connect to the WordPress file system.
		if ( ! $this->connect_to_filesystem() ) {
			return new \WP_Error(
				'nfd_onboarding_error',
				'Could not connect to the filesystem.',
				array( 'status' => 500 )
			);
		}

		// Check if the parent theme exists.
		$parent_theme_slug   = $flow_data['theme']['template'];
		$parent_theme_exists = ( \wp_get_theme( $parent_theme_slug ) )->exists();
		if ( ! $parent_theme_exists ) {
			return new \WP_Error(
				'nfd_onboarding_error',
				'Parent theme is missing to generate the child theme.',
				array( 'status' => 500 )
			);
		}

		/*
		 Activate the parent theme if it is not active.
		 This is necessary to register the parent theme's block patterns.
		 */
		$active_theme = ( \wp_get_theme() )->get( 'TextDomain' );
		if ( $active_theme !== $parent_theme_slug ) {
			$this->activate_theme( $parent_theme_slug );
		}

		// Generate the necessary slugs and paths.
		$themes_dir       = dirname( \get_stylesheet_directory() );
		$parent_theme_dir = $themes_dir . '/' . $parent_theme_slug;
		$child_theme_slug = $this->get_child_theme_slug( $flow_data );
		$child_theme_dir  = $themes_dir . '/' . $child_theme_slug;

		// Generate theme.json data for the child theme.
		$theme_json_data = $this->generate_child_theme_json( $flow_data, $parent_theme_dir );
		if ( ! $theme_json_data ) {
			return new \WP_Error(
				'nfd_onboarding_error',
				'Could not generate theme.json',
				array( 'status' => 500 )
			);
		}

		// Generate the pattern for a given header part to place it into the relevant HTML file.
		$part_patterns = array();
		if ( $flow_data['partHeader'] ) {
			$part_patterns['header'] = $this->generate_theme_part_pattern( $flow_data['partHeader'] );
			if ( \is_wp_error( $part_patterns['header'] ) ) {
				return $part_patterns['header'];
			}
		}

		$child_theme_stylesheet_comment = $this->generate_child_theme_stylesheet_comment( $parent_theme_slug, $child_theme_slug );

		// Write the child theme to the filesystem under themes.
		$child_theme_data = array(
			'parent_theme_slug'              => $parent_theme_slug,
			'child_theme_slug'               => $child_theme_slug,
			'parent_theme_dir'               => $parent_theme_dir,
			'child_theme_dir'                => $child_theme_dir,
			'child_theme_json'               => \wp_json_encode( $theme_json_data ),
			'child_theme_stylesheet_comment' => $child_theme_stylesheet_comment,
			'part_patterns'                  => $part_patterns,
		);

		$child_theme_written = $this->write_child_theme( $child_theme_data );
		if ( true !== $child_theme_written ) {
			return new \WP_Error(
				'nfd_onboarding_error',
				$child_theme_written,
				array( 'status' => 500 )
			);
		}

		// Activate the child theme.
		$this->activate_theme( $child_theme_slug );

		$child_theme_verified = $this->verify_child_theme( $child_theme_data );

		if ( ! $child_theme_verified ) {
			return new \WP_Error(
				'nfd_onboarding_error',
				'Error generating child theme.',
				array( 'status' => 500 )
			);
		}

		return new \WP_REST_Response(
			array(),
			201
		);
	}

	/**
	 * Retrieve Site Url Hash Value
	 *
	 * @param integer $length hash length
	 *
	 * @return string
	 */
	private function get_site_url_hash( $length = 8 ) {
		return substr( hash( 'sha256', site_url() ), 0, $length );
	}

	/**
	 * Retrieve Default Dashed Site Title
	 *
	 * @return array
	 */
	private function get_dashed_site_title_defaults() {
		return array( 'welcome', 'wordpress-site' );
	}

	 /**
	  * Get the child theme stylesheet from flow data.
	  *
	  * @param array $flow_data Flow Data
	  *
	  * @return string
	  */
	protected function get_child_theme_slug( $flow_data ) {
		if ( ! $flow_data['theme']['stylesheet'] ||
				   ( $flow_data['theme']['template'] === $flow_data['theme']['stylesheet'] ) ) {
			$current_brand              = Data::current_brand()['brand'];
			$default_site_titles_dashed = $this->get_dashed_site_title_defaults();
			$site_title_dashed          = \sanitize_title_with_dashes( \get_bloginfo( 'name' ) );
			if ( empty( $site_title_dashed ) || in_array( $site_title_dashed, $default_site_titles_dashed ) ) {
				$site_title_dashed = $this->get_site_url_hash();
			}
			return $current_brand . '-' . $site_title_dashed;
		}
		return $flow_data['theme']['stylesheet'];
	}

	 /**
	  * Activates a given theme.
	  *
	  * @param string $theme_slug WordPress slug for theme
	  *
	  * @return void
	  */
	protected function activate_theme( $theme_slug ) {
		\switch_theme( $theme_slug );
	}

	 /**
	  * Generates the child theme.json from the relevant parent theme.json
	  *
	  * @param array  $flow_data Flow Data
	  * @param string $parent_theme_dir Parent Theme Directory
	  *
	  * @return boolean|array
	  */
	private function generate_child_theme_json( $flow_data, $parent_theme_dir ) {
		global $wp_filesystem;

		$theme_data = \get_option( Options::get_option_name( 'theme_settings' ), false );

		if ( false !== $theme_data ) {
			unset( $theme_data['settings']['styles'] );
			unset( $theme_data['settings']['__unstableResolvedAssets'] );
			unset( $theme_data['settings']['__experimentalFeatures'] );
			$theme_json_data = $theme_data;
		} else {
			$theme_json_file = $parent_theme_dir . '/theme.json';
			if ( ! $wp_filesystem->exists( $theme_json_file ) ) {
				return false;
			}
			$theme_json      = $wp_filesystem->get_contents( $theme_json_file );
			$theme_json_data = json_decode( $theme_json, true );
		}

		return $theme_json_data;
	}

	/**
	 * Generates the child theme.json style.css comment from the relevant parent theme slug
	 *
	 * @param array  $parent_theme_slug Parent Theme Slug
	 * @param string $child_theme_slug Child Theme Slug
	 *
	 * @return string
	 */
	private function generate_child_theme_stylesheet_comment( $parent_theme_slug, $child_theme_slug ) {
		$current_brand = Data::current_brand();
		$customer      = \wp_get_current_user();

		$default_site_titles_dashed = $this->get_dashed_site_title_defaults();
		$site_title                 = \get_bloginfo( 'name' );
		$site_title_dashed          = \sanitize_title_with_dashes( $site_title );
		if ( empty( $site_title ) || in_array( $site_title_dashed, $default_site_titles_dashed ) ) {
			$site_title = $current_brand['brand'] . '-' . $this->get_site_url_hash();
		}

		$theme_style_data = array(
			'current_brand'     => Data::current_brand(),
			'brand'             => $current_brand['brand'],
			'brand_name'        => $current_brand['name'] ? $current_brand['name'] : 'Newfold Digital',
			'site_title'        => $site_title,
			'site_url'          => \site_url(),
			'author'            => $customer->user_firstname,
			'parent_theme_slug' => $parent_theme_slug,
			'child_theme_slug'  => $child_theme_slug,
		);

		$mustache = new Mustache();
		return $mustache->render_template( 'themeStylesheet', $theme_style_data );
	}

	 /**
	  * Get the pattern for the theme part.
	  *
	  * @param string $pattern_slug Patten Slug
	  *
	  * @return string|\WP_Error the pattern for the part.
	  */
	private function generate_theme_part_pattern( $pattern_slug ) {
		$pattern = \WP_Block_Patterns_Registry::get_instance()->get_registered( $pattern_slug );
		if ( ! $pattern ) {
			return new \WP_Error(
				'nfd_onboarding_pattern_not_registered',
				"{$pattern_slug} has not been registered. Please retry.",
				array( 'status' => 500 )
			);
		}

		return $pattern['content'];
	}

	 /**
	  * Write the child theme to the themes directory.
	  *
	  * @param array $child_theme_data Child Theme Data
	  * @var string  parent_theme_slug
	  * @var string  child_theme_slug
	  * @var string  parent_theme_dir
	  * @var string  child_theme_dir
	  * @var string  child_theme_json
	  * @var string  part_patterns
	  *
	  * @return string|boolean
	  */
	private function write_child_theme( $child_theme_data ) {
		$child_directory_created = $this->create_directory( $child_theme_data['child_theme_dir'] );
		if ( ! $child_directory_created ) {
			return 'Error creating child directory.';
		}

		$theme_json_written = $this->write_theme_json(
			$child_theme_data['child_theme_dir'],
			$child_theme_data['child_theme_json']
		);
		if ( ! $theme_json_written ) {
			return 'Error writing theme.json.';
		}

		if ( ! empty( $child_theme_data['part_patterns'] ) ) {
			$template_parts_written = $this->write_template_parts(
				$child_theme_data['child_theme_dir'],
				$child_theme_data['part_patterns']
			);
			if ( ! $template_parts_written ) {
				return 'Error writing template part.';
			}
		}

		$child_stylesheet_written = $this->write_child_stylesheet(
			$child_theme_data['child_theme_stylesheet_comment'],
			$child_theme_data['child_theme_dir']
		);
		if ( ! $child_stylesheet_written ) {
			return 'Error writing stylesheet.';
		}

		$generate_screenshot = $this->generate_screenshot(
			$child_theme_data['parent_theme_dir'],
			$child_theme_data['child_theme_dir']
		);
		if ( ! $generate_screenshot ) {
			return 'Error generating screenshot';
		}

		return true;
	}

	 /**
	  * Creates a directory if necessary.
	  *
	  * @param string $dir Directory
	  *
	  * @return boolean
	  */
	private function create_directory( $dir ) {
		global $wp_filesystem;

		if ( ! $wp_filesystem->exists( $dir ) ) {
			return $wp_filesystem->mkdir( $dir );
		}

		return true;
	}

	 /**
	  * Writes $theme_json to a theme's theme.json file.
	  *
	  * @param string $theme_dir Theme Directory
	  * @param string $theme_json Theme json content
	  *
	  * @return boolean
	  */
	private function write_theme_json( $theme_dir, $theme_json ) {
		return $this->write_to_filesystem( $theme_dir . '/theme.json', $theme_json );
	}

	 /**
	  * Writes HTML template parts to the theme's parts directory.
	  *
	  * @param string $theme_dir Theme Directory
	  * @param array  $part_patterns HTML Template Part
	  *
	  * @return boolean
	  */
	private function write_template_parts( $theme_dir, $part_patterns ) {
		global $wp_filesystem;

		if ( ! $wp_filesystem->exists( $theme_dir . '/parts' ) ) {
			$parts_directory_created = mkdir( $theme_dir . '/parts' );
			if ( ! $parts_directory_created ) {
				return false;
			}
		}
		foreach ( $part_patterns as $part => $pattern ) {
			$status = $this->write_to_filesystem( $theme_dir . "/parts/{$part}.html", $pattern );
			if ( ! $status ) {
				return false;
			}
		}

		return true;
	}

	 /**
	  * Writes style.css for the child theme.
	  *
	  * @param string $child_theme_stylesheet_comment Stylesheet comment of Child Theme
	  * @param string $child_theme_dir Child Theme Directory
	  *
	  * @return boolean
	  */
	private function write_child_stylesheet( $child_theme_stylesheet_comment, $child_theme_dir ) {
		return $this->write_to_filesystem( $child_theme_dir . '/style.css', $child_theme_stylesheet_comment );
	}

	 /**
	  * Checks if $flow_data has all the necessary data to generate a child theme.
	  *
	  * @param array $flow_data Flow Data
	  *
	  * @return boolean
	  */
	private function validate_and_sanitize_flow_data( $flow_data ) {
		$current_flow = Data::current_flow();
		if ( ! $flow_data['theme']['template'] ) {
			$current_flow = Data::current_flow();

			$flow_data['theme']['template'] = Themes::get_flow_default_theme_slug( $current_flow );
		}

		if ( $flow_data['customDesign'] ) {
			if ( ! $flow_data['palette'] && ! $flow_data['typography']['slug'] ) {
				return false;
			}
		}

		return $flow_data;
	}

	 /**
	  * Copy parent's screenshot.png to the child theme directory.
	  *
	  * [TODO] Generate the actual child theme screenshot.
	  *
	  * @param string $parent_theme_dir Parent Theme Directory
	  * @param string $child_theme_dir Child Theme Directory
	  *
	  * @return boolean
	  */
	private function generate_screenshot( $parent_theme_dir, $child_theme_dir ) {
		global $wp_filesystem;

		$screenshot_files = array( '/screenshot.png', '/screenshot.jpg' );
		foreach ( $screenshot_files as $key => $screenshot_file ) {
			$child_theme_screenshot_file  = $child_theme_dir . $screenshot_file;
			$parent_theme_screenshot_file = $parent_theme_dir . $screenshot_file;
			if ( $wp_filesystem->exists( $parent_theme_screenshot_file ) ) {
				break;
			}
		}

		if ( $wp_filesystem->exists( $child_theme_screenshot_file ) ) {
			$wp_filesystem->delete( $child_theme_screenshot_file );
		}

		return $wp_filesystem->copy(
			$parent_theme_screenshot_file,
			$child_theme_screenshot_file
		);
	}

	 /**
	  * Writes content to the specified file.
	  *
	  * @param string $file Specific File where $content is to be written
	  * @param string $content Content to write to the $file
	  *
	  * @return boolean
	  */
	private function write_to_filesystem( $file, $content ) {
		global $wp_filesystem;

		return $wp_filesystem->put_contents(
			$file,
			$content,
			FS_CHMOD_FILE // predefined mode settings for WP files
		);
	}

	 /**
	  * Connect to the WordPress filesystem.
	  *
	  * @return boolean
	  */
	protected function connect_to_filesystem() {
		require_once ABSPATH . 'wp-admin/includes/file.php';

		// We want to ensure that the user has direct access to the filesystem.
		$access_type = \get_filesystem_method();
		if ( 'direct' !== $access_type ) {
			return false;
		}

		$creds = \request_filesystem_credentials( site_url() . '/wp-admin', '', false, false, array() );

		if ( ! \WP_Filesystem( $creds ) ) {
			return false;
		}

		return true;
	}

	/**
	 * To verify the valid child theme.
	 *
	 * @param array $child_theme_data Child Theme Data
	 *
	 * @return boolean
	 */
	public function verify_child_theme( $child_theme_data ) {
		$child_theme_directory_exists = $this->verify_child_theme_directory( $child_theme_data['child_theme_dir'] );
		if ( ! $child_theme_directory_exists ) {
			return false;
		}
		$theme_json_valid = $this->verify_theme_json( $child_theme_data['child_theme_json'], $child_theme_data['child_theme_dir'] );
		if ( ! $theme_json_valid ) {
			return false;
		}

		$stylesheet_valid = $this->verify_stylesheet( $child_theme_data['child_theme_stylesheet_comment'], $child_theme_data['child_theme_dir'] );
		if ( ! $stylesheet_valid ) {
			return false;
		}

		$child_theme_active = $this->verify_child_theme_is_active( $child_theme_data['child_theme_slug'] );
		if ( ! $child_theme_active ) {
			return false;
		}

		return true;
	}

	/**
	 * To verify the valid child theme directory.
	 *
	 * @param string $child_theme_dir Child Theme Directory
	 *
	 * @return boolean
	 */
	private function verify_child_theme_directory( $child_theme_dir ) {
		global $wp_filesystem;

		return $wp_filesystem->exists( $child_theme_dir );
	}

	/**
	 * To verify the valid child theme.json.
	 *
	 * @param string $child_theme_json Child Theme json
	 * @param string $child_theme_dir Child Theme Directory
	 *
	 * @return boolean
	 */
	private function verify_theme_json( $child_theme_json, $child_theme_dir ) {
		global $wp_filesystem;

		$theme_json_path = $child_theme_dir . '/theme.json';
		if ( ! $wp_filesystem->exists( $theme_json_path ) ) {
			return false;
		}

		$theme_json_written = $wp_filesystem->get_contents( $theme_json_path );
		if ( $child_theme_json !== $theme_json_written ) {
			return false;
		}

		return true;
	}

	/**
	 * To verify the valid style.css of the respective child theme
	 *
	 * @param string $child_theme_stylesheet_comment Child Theme stylesheet comment
	 * @param string $child_theme_dir Child Theme Directory
	 *
	 * @return boolean
	 */
	private function verify_stylesheet( $child_theme_stylesheet_comment, $child_theme_dir ) {
		global $wp_filesystem;

		$stylesheet_path = $child_theme_dir . '/style.css';
		if ( ! $wp_filesystem->exists( $stylesheet_path ) ) {
			return false;
		}

		$written_stylesheet = $wp_filesystem->get_contents( $stylesheet_path );
		if ( $child_theme_stylesheet_comment !== $written_stylesheet ) {
			return false;
		}

		return true;
	}

	/**
	 * To verify the valid child theme is active.
	 *
	 * @param string $child_theme_slug Child Theme Slug
	 *
	 * @return boolean
	 */
	private function verify_child_theme_is_active( $child_theme_slug ) {
		$active_theme = ( \wp_get_theme() )->get( 'TextDomain' );
		if ( $active_theme !== $child_theme_slug ) {
			return false;
		}
		return true;
	}
}
