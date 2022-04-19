<?php
namespace NewfoldLabs\WP\Module\Onboarding;

/**
 * CRUD methods for Onboarding config for use in API, CLI and runtime.
 */
final class Data {
    /**
     * Runtime data for Onboarding application
     */
    public static function runtime() {
        return array(
            'url'       => \NFD_ONBOARDING_BUILD_URL,
            'admin'     => \admin_url(),
            'brand'     => self::brand(),  
        );
    }
    /**
     * Establish brand to apply to Onboarding experience.
     * 
     * [TODO]: Pull from container.
     *
     * @return void
     */
    public static function brand() {
        $database = \get_option('mm_brand', 'newfold');

        return \apply_filters( 'nfd_module_onboarding_brand', $database );
    }
} // END \NewfoldLabs\WP\Module\Onboarding\Data()