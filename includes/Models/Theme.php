<?php

namespace NewfoldLabs\WP\Module\Onboarding\Models;

/**
 * Class Theme
 */
class Theme implements \JsonSerializable {

	private $theme_name;
	private $theme_image;
	private $is_newfold_theme;

	/**
	 * @param string $theme_name
	 */
	public function __construct( $theme_name ) {
		$this->theme_name       = $theme_name;
		$this->is_newfold_theme = false;
	}

	/**
	 * @param string $theme_name
	 *
	 * @return void
	 */
	public function set_theme_name( $theme_name ) {
		$this->theme_name = $theme_name;
	}

	/**
	 * @return string $theme_name
	 */
	public function get_theme_name() {
		return $this->theme_name;
	}

	/**
	 * @param string $theme_image Path to theme screenshot image.
	 *
	 * @return void
	 */
	public function set_theme_image( $theme_image ) {
		$this->theme_image = $theme_image;
	}

	/**
	 * @return $theme_image Path to theme screenshot image.
	 */
	public function get_theme_image() {
		return $this->theme_image;
	}

	/**
	 * @param boolean $is_newfold_theme
	 *
	 * @return void
	 */
	public function set_is_newfold_theme( $is_newfold_theme ) {
		$this->is_newfold_theme = $is_newfold_theme;
	}

	/**
	 * @return boolean $is_newfold_theme true if the theme author is Newfold Digital.
	 */
	public function get_is_newfold_theme() {
		return $this->is_newfold_theme;
	}

	/**
	 * @return array JSON Serialize the data
	 */
	public function jsonSerialize() {
		return array(
			'name'           => $this->theme_name,
			'image'          => $this->theme_image,
			'isNewfoldTheme' => $this->is_newfold_theme,
		);
	}
}
