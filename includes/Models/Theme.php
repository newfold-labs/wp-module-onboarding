<?php

namespace NewfoldLabs\WP\Module\Onboarding\Models;

class Theme {

    public string $themeName;
    public string $themeImage;
    public bool $isNewfoldTheme;

    public function __construct() 
    {
        $this->isNewfoldTheme = false;
    }

    // The Theme Name i.e. twentytwentytwo
    public function setThemeName($themeName) {
        $this->themeName = $themeName;
    }
    public function getThemeName() {
        return $this->themeName;
    }

    // The Theme Image i.e. ScreenShot for the Theme
    public function setThemeImage($themeImage) {
        $this->themeImage = $themeImage;
    }

    public function getThemeImage() {
        return $this->themeImage;
    }

    // Determines if it's a Newfold Theme
    public function setisNewfoldTheme($isNewfoldTheme) {
        $this->isNewfoldTheme = $isNewfoldTheme;
    }

    public function getisNewfoldTheme() {
        return $this->isNewfoldTheme;
    }
}