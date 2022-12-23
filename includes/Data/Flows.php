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
		'isComplete'           => 0,

		'hasExited'            => 0,

		// If user navigates to another step, mark GMT timestamp.
		'isSkipped'            => array(),

		// path identifier for the current step within a flow
		'currentStep'          => '/step/wp-setup/get-started',

		'createdAt'            => 0,

		'updatedAt'            => 0,

		// to populate the step fields if a user is resuming a flow.
		'data'                 => array(
			// Any manual fixes or modification made to siteType shall also be made in FlowServices::update_default_data_for_ecommerce()
			'siteType'        => array(
				'label'     => '',
				'referTo'   => 'site',
				'primary'   => '',
				'secondary' => '',
			),

			'wpComfortLevel'  => '0',

			// Any manual fixes or modification made to topPriority shall also be made in FlowServices::update_default_data_for_ecommerce()
			// Enums: `publishing`, `designing`, `selling`, 'migrating', 'regenerate' and 'skip'
			'topPriority'     => array(
				'priority1' => 'publishing',
			),

			// This data will map to WordPress default 'blogname'
			'blogName'        => '',

			// This data will map to WordPress default 'blogdescription'
			'blogDescription' => '',

			// This integer will map to the attachment ID for an uploaded image to the WordPress media library
			'siteLogo'        => array(
				'id' => 0,
				'url' => '',
			),

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
				'slug'     => '',
				'name'     => '',
				'color'    => array(
					array(
						'slug'  => 'primary',
						'name'  => 'Primary',
						'color' => '',
					),
					array(
						'slug'  => 'secondary',
						'name'  => 'Secondary',
						'color' => '',
					),
					array(
						'slug'  => 'tertiary',
						'name'  => 'Tertiary',
						'color' => '',
					),
					array(
						'slug'  => 'background',
						'name'  => 'Background',
						'color' => '',
					),
				),
				'supports' => array( 'yith-wonder' ),
			),

			'typography'      => array(
				'slug' => '',
				'data' => array(),
			),

			// This string will identify the Header Pattern
			'partHeader'      => '',

			// for eg. Home, About, Contact, Blog|News, Resume, Portfolio, Staff and Link in Bio
			'sitePages'       => array(
				'homepage' => '',
				'other'    => array(),
			),

			// will include plugin installs, module activation/deactivation and perhaps API calls to the hosting platform for Newfold-specific services
			'siteFeatures'    => array(),

			'socialData'	  => array(), 
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
			'productInfo' => array(
				'product_count' => '',
				'product_types' => array(),
			),
		),
	);

	/**
	  * Has all the Flow Key parameters to be updated for the user in Key-Value pair.
	  *
	  * - OldKey is the existing key in $data which is to be renamed
	  * - new_key is the key to be replaced in the database and also to be manually 
	  *   entered in $data instead of the value of 'OldKey' 
	  * - retain_existing_value (Boolean): true if the value in the DB for the old_key is to be retained,
	  *   false if the new_key is to have the new_value and discard the value set in the DB for old_key 
	  * @return array
	  */
	  protected static $fixes = array(
		// 'OldKey' => array( 'new_key' => 'NewKey', 'retain_existing_value' => true/false )
	);

	/**
	  * Array with Key Names as Key, and '1'as value to set the key as an exception
	  *
	  * @return array
	  */
	protected static $exception_list = array("color" => 1, "typography" => 1, "other" => 1, "siteFeatures" => 1, "socialData" => 1);

	/**
	  * Update Flow Key and/or Value.
	  *
	  * @return array
	  */
	public static function get_fixes() {
		return self::$fixes;
	}

	/**
	  * Update Exception Key(s).
	  *
	  * @return array
	  */
	  public static function get_exception_list() {
		return self::$exception_list;
	}

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
