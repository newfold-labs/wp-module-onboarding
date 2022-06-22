<?php

namespace NewfoldLabs\WP\Module\Onboarding\Data;

/**
 * Contains Onboarding Flow information.
 */
final class Flow
{

    protected static $flow_data = array(
        // Each time step is viewed, insert GMT timestamp to array.
        'isViewed' => array(),

        // The first time required criteria met (if any), mark GMT timestamp.
        'isComplete' => '',

        // If user navigates to another step, mark GMT timestamp.
        'isSkipped' => array(),

        // path identifier for the current step within a flow
	'currentStep' => '/step/wp-setup/get-started',

        'createdAt' => '',

        'updatedAt' => '',

        // to populate the step fields if a user is resuming a flow.
        'data' => array(
            'siteType' => array(
                'label' => '',
                'referTo' => 'site'
            ),
            'wpComfortLevel' => 5,

            // Enums: `publishing`, `designing`, `selling`, 'migrating', 'regenerate' and 'skip'
            'topPriority' => array(
                'priority1' => ''
            ),

            // This data will map to WordPress default 'blogname'
            'blogname' => '',

            // This data will map to WordPress default 'blogdescription'
            'blogdescription' => '',

            // This integer will map to the attachment ID for an uploaded image to the WordPress media library 
            'siteLogo' => 0,

            // key-value store for social media accounts
            'accounts' => array(),

            'theme' => array(
                // This is the WordPress parent theme slug
                'template' => '',

                // This is the parent theme or child theme slug if present
                'stylesheet' => '',

                // This is the key for the theme.json variation file
                'variation' => ''
            ),

            'customDesign' => false,

            'palette' => array(
                array(
                    'slug' => '',
                    'color' => '',
                    'name' => ''
                )
            ),

            'typography' => array(
                'fontFamily' => '',
                'fontSizes' => '',
                'fontFace' => ''
            ),

            // This string will identify the Header Pattern
            'partHeader' => '',

            // for eg. Home, About, Contact, Blog|News, Resume, Portfolio, Staff and Link in Bio
            'sitePages' => array(),

            // will include plugin installs, module activation/deactivation and perhaps API calls to the hosting platform for Newfold-specific services
            'siteFeatures' => array()
        ),

        // we will store active flows (abandoned wp-setup, abandoned wp-commerce) with their identifier and use as a reference to access currentStep and data
        'currentFlows' => array(),

        'isFirstNFDOnboarding' => true,

        'wpComfortLevel' => 3,

        // This is the common label like 'personal blog', 'restaurant', 'dentist'
        'siteType'  => 'blog',

        // 'personal', 'professional', 'business', 'ecommerce', 'nonprofit', 'team/community', 'web-pro-agency', 'other'
        'ownerType' => 'personal',

        // Set by Hosting Platform as a FOS-purchased ecommerce plan
        'isEcommercePlan' => false,

        'doesCommerce' => false,

    );

    /**
     * Get Onboarding Flow information.
     * 
     * @return array
     */
    public static function get_flow_data()
    {
        return self::$flow_data;
    }
}

