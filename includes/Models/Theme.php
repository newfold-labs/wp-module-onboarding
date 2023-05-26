<?php

namespace NewfoldLabs\WP\Module\Onboarding\Models;

/**
 * Class Theme
 */
class Theme implements \JsonSerializable {

	/**
	 * Name of the Theme.
	 *
	 * @var string
	 */
	private $theme_name;

	/**
	 * Theme image Path.
	 *
	 * @var string
	 */
	private $theme_image;

	/**
	 * Status of a theme being a Newfold Theme.
	 *
	 * @var boolean
	 */
	private $is_newfold_theme;

	/**
	 * Theme constructor.
	 *
	 * @param string $theme_name Theme Name.
	 */
	public function __construct( $theme_name ) {
		$this->theme_name       = $theme_name;
		$this->is_newfold_theme = false;
	}

	/**
	 * Sets the Theme Name
	 *
	 * @param string $theme_name name of the theme.
	 * @return void
	 */
	public function set_theme_name( $theme_name ) {
		$this->theme_name = $theme_name;
	}

	/**
	 * Retrieve the Theme Name
	 *
	 * @return string
	 */
	public function get_theme_name() {
		return $this->theme_name;
	}

	/**
	 * Sets the Theme image path
	 *
	 * @param string $theme_image Path to theme screenshot image.
	 * @return void
	 */
	public function set_theme_image( $theme_image ) {
		$this->theme_image = $theme_image;
	}

	/**
	 * Retrieve the path to theme screenshot image
	 *
	 * @return string
	 */
	public function get_theme_image() {
		return $this->theme_image;
	}

	/**
	 * Sets the status of a theme as a Newfold theme.
	 *
	 * @param boolean $is_newfold_theme Determines if there is a Newfold theme
	 * @return void
	 */
	public function set_is_newfold_theme( $is_newfold_theme ) {
		$this->is_newfold_theme = $is_newfold_theme;
	}

	/**
	 * Retrieve is_newfold_theme status - true if the theme author is Newfold Digital.
	 *
	 * @return boolean
	 */
	public function get_is_newfold_theme() {
		return $this->is_newfold_theme;
	}

	/**
	 * To JSON Serialize the Theme data
	 *
	 * @return array
	 */
	public function jsonSerialize() {
		return array(
			'name'           => $this->theme_name,
			'image'          => $this->theme_image,
			'isNewfoldTheme' => $this->is_newfold_theme,
		);
	}
}
