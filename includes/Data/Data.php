<?php
namespace NewfoldLabs\WP\Module\Onboarding\Data;

/**
 * CRUD methods for Onboarding config for use in API, CLI and runtime.
 */
final class Data {
    /**
     * Runtime data for Onboarding application
     */
    public static function runtime() {
        return array(
            'url'          => \NFD_ONBOARDING_BUILD_URL,
            'admin'        => \admin_url(),
            'currentBrand' => self::current_brand(),
            'currentPlan'  => self::current_plan(),
        );
    }

    /**
     * Establish brand to apply to Onboarding experience.
     * 
     * [TODO]: Pull brand from container.
     * 
     * @return array
     */
    public static function current_brand() {

        $brand = \get_option('mm_brand', 'newfold');
        // This case arises when the option mm_brand exists but has an empty string as it's value.
        if (empty($brand)) {
            $brand = 'newfold';
        }
        \apply_filters( 'nfd_module_onboarding_brand', $brand );

        $brands = Brands::get_brands();

        return array_key_exists( $brand, $brands ) ? $brands[$brand] : array( 'brand' => $brand );
    }

    /**
     * Get current hosting plan.
     * 
     * [TODO]: Pull the actual plan.
     * 
     * @return string
     */
    public static function current_plan() {
        return 'shared';
    }
} // END \NewfoldLabs\WP\Module\Onboarding\Data()
