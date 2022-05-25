<?php

namespace NewfoldLabs\WP\Module\Onboarding\Models;

class Theme {

    public string $theme_name;
    public string $theme_image;
    public bool $is_newfold_theme;

    public function __construct() 
    {
        $this->is_newfold_theme = false;
    }

    // The Theme Name i.e. twentytwentytwo
    public function set_theme_name($theme_name) {
        $this->theme_name = $theme_name;
    }
    public function get_theme_name() {
        return $this->theme_name;
    }

    // The Theme Image i.e. ScreenShot for the Theme
    public function set_theme_image($theme_image) {
        $this->theme_image = $theme_image;
    }

    public function get_theme_image() {
        return $this->theme_image;
    }

    // Determines if it's a Newfold Theme
    public function set_is_newfold_theme($is_newfold_theme) {
        $this->is_newfold_theme = $is_newfold_theme;
    }

    public function get_is_newfold_theme() {
        return $this->is_newfold_theme;
    }
}