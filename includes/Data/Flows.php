<?php
namespace NewfoldLabs\WP\Module\Onboarding\Data;

/**
 * Contains Onboarding Flow information.
 */
final class Flows {

	protected static $data = array(
		// Each time step is viewed, insert GMT timestamp to array.
		'isViewed'             => array(),

		// The first time required criteria met (if any), mark GMT timestamp.
		'isComplete'           => false,

		'hasExited'            => false,

		// If user navigates to another step, mark GMT timestamp.
		'isSkipped'            => array(),

		// path identifier for the current step within a flow
		'currentStep'          => '/step/wp-setup/get-started',

		'createdAt'            => '',

		'updatedAt'            => '',

		// to populate the step fields if a user is resuming a flow.
		'data'                 => array(
			'siteType'        => array(
				'label'     => '',
				'referTo'   => 'site',
				'primary'   => '',
				'secondary' => '',
			),

			'wpComfortLevel'  => '0',

			// Enums: `publishing`, `designing`, `selling`, 'migrating', 'regenerate' and 'skip'
			'topPriority'     => array(
				'priority1' => 'publishing',
			),

			// This data will map to WordPress default 'blogname'
			'blogName'        => '',

			// This data will map to WordPress default 'blogdescription'
			'blogDescription' => '',

			// This integer will map to the attachment ID for an uploaded image to the WordPress media library
			'siteLogo'        => 0,

			// key-value store for social media accounts
			'accounts'        => array(),

			'theme'           => array(
				// This is the WordPress parent theme slug
				'template'   => '',

				// This is the parent theme or child theme slug if present
				'stylesheet' => '',

				// This is the key for the theme.json variation file
				'variation'  => '',
			),

			'customDesign'    => false,

			'palette'         => array(
				array(
					'slug'  => '',
					'color' => '',
					'name'  => '',
				),
			),

			'typography'      => array(
				'fontFamilies' => array(),
				'fontSizes'    => array(),
			),

			// This string will identify the Header Pattern
			'partHeader'      => '',

			// for eg. Home, About, Contact, Blog|News, Resume, Portfolio, Staff and Link in Bio
			'sitePages'       => array(),

			// will include plugin installs, module activation/deactivation and perhaps API calls to the hosting platform for Newfold-specific services
			'siteFeatures'    => array(),
		),

		// we will store active flows (abandoned wp-setup, abandoned wp-commerce) with their identifier and use as a reference to access currentStep and data
		'currentFlows'         => array(),

		'isFirstNFDOnboarding' => true,

		// This is the common label like 'personal blog', 'restaurant', 'dentist'
		'siteType'             => 'blog',

		// 'personal', 'professional', 'business', 'ecommerce', 'nonprofit', 'team/community', 'web-pro-agency', 'other'
		'ownerType'            => 'personal',

		// Set by Hosting Platform as a FOS-purchased ecommerce plan
		'isEcommercePlan'      => false,

		'doesCommerce'         => false,

		'storeDetails'         => array(
			'productInfo'     => array(
				'product_count' => '',
				'product_types' => array()
			)
		),
	);

	 /**
	  * Get Onboarding Flow information.
	  *
	  * @return array
	  */
	public static function get_data() {
		return self::$data;
	}

	/**
	 * Get the default onboarding flow.
	 *
	 * @return string
	 */
	public static function get_default_flow() {
		  return 'wp-setup';
	}

	/**
	 * Retrive all the known onboarding flows.
	 *
	 * @return array A value of true for each key indicates that the flow has been approved
	 * and a value of null indicates the flow has not been approved (or) has been temporarily disabled.
	 */
	public static function get_flows() {
		return array(
			'wp-setup'  => true,
			'ecommerce' => true,
		);
	}

	/**
	 * @param string $plan_subtype
	 *
	 * Get the corresponding flow given a hosting plan_subtype.
	 *
	 * @return string
	 */
	public static function get_flow_from_plan_subtype( $plan_subtype ) {
		if ( preg_match( '/^(wc_standard|wc_premium)$/i', $plan_subtype ) ) {
			 return isset( self::get_flows()['ecommerce'] ) ? 'ecommerce' : self::get_default_flow();
		}
		 return self::get_default_flow();
	}
}
