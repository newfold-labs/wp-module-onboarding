<?php
namespace NewfoldLabs\WP\Module\Onboarding\Data;

use NewfoldLabs\WP\Module\Onboarding\Services\PluginInstaller;

/**
 * Contains Onboarding Flow information.
 */
final class Flows {
	/**
	 * Flow data blueprint.
	 *
	 * @var array
	 */
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
						'slug'  => 'base',
						'name'  => 'Base',
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
	 * Check if a plan is of flow type ecommerce.
	 *
	 * @param string $plan The hosting plan.
	 * @return boolean
	 */
	public static function is_ecommerce_plan( $plan ) {
		if ( preg_match( '/^(wc_standard|wc_premium)$/i', $plan ) ) {
			return true;
		}
		return false;
	}

	/**
	 * Checks if an install is of type commerce priority.
	 *
	 * @return boolean
	 */
	public static function is_commerce_priority() {
		if ( self::get_flow_from_plugins() === 'ecommerce' ) {
			return true;
		}
		return false;
	}

	/**
	 * Get the type of flow from the flow query param or the flow preset option.
	 *
	 * @return string|boolean
	 */
	public static function get_flow_from_params() {
		$flows = self::get_flows();

		if ( isset( $_GET['flow'] ) ) {
			   $current_flow_type = \sanitize_text_field( $_GET['flow'] );
		}

		if ( ! empty( $current_flow_type ) && isset( $flows[ $current_flow_type ] ) ) {
			return $current_flow_type;
		}

		$current_flow_type = \get_option( Options::get_option_name( 'flow_preset' ), false );
		if ( $current_flow_type && isset( $flows[ $current_flow_type ] ) ) {
			return $current_flow_type;
		}

		return false;
	}

	/**
	 * Gets the flow based on the plugins installed/activated.
	 *
	 * @return string|boolean
	 */
	public static function get_flow_from_plugins() {
		if ( PluginInstaller::exists( 'woocommerce', true ) ) {
			return 'ecommerce';
		}
		return false;
	}

	/**
	 * Get the flow type given customer data in a particular shape.
	 *
	 * @param array $customer_data The customer data to parse.
	 * @return string|boolean
	 */
	public static function get_flow_from_customer_data( $customer_data = array() ) {
		if ( isset( $customer_data['plan_type'] ) && isset( $customer_data['plan_subtype'] ) ) {
			return self::get_flow_from_plan_subtype( $customer_data['plan_subtype'] );
		}
		return false;
	}

	/**
	 * Get the corresponding flow type given a hosting plan_subtype.
	 *
	 * @param string $plan_subtype The hosting plan_subtype.
	 * @return string|boolean
	 */
	public static function get_flow_from_plan_subtype( $plan_subtype ) {
		if ( self::is_ecommerce_plan( $plan_subtype ) ) {
			 return isset( self::get_flows()['ecommerce'] ) ? 'ecommerce' : false;
		}
		 return false;
	}
}
