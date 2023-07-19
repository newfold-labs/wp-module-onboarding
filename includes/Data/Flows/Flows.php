<?php
namespace NewfoldLabs\WP\Module\Onboarding\Data\Flows;

use NewfoldLabs\WP\Module\Onboarding\Services\FlowService;
use NewfoldLabs\WP\Module\Onboarding\Data\Data;
use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Installer\Services\PluginInstaller;

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
		'version'              => '1.0.0',

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
			// Any manual fixes or modification made to siteType shall also be made in FlowService::update_default_data_for_ecommerce()
			'siteType'        => array(
				'referTo'   => 'site',
				'primary'   => array(
					'refers' => '',
					'value'  => '',
				),
				'secondary' => array(
					'refers' => '',
					'value'  => '',
				),
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
				'id'  => 0,
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

			'colorStyle'      => '',

			'fontStyle'       => '',

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
	 * Array with Key Names as Key, and array to specify Key from Exception Key Array to remove/add as Value
	 *
	 * This shall be used temporarily as the respective keys having varied patterns of values cannot be handled by the scope of current functionality
	 *
	 * @var array
	 */
	protected static $exception_list = array(
		'other' => true,
	);

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
	 * Retrieve all the known onboarding flows.
	 *
	 * @return array A value of true for each key indicates that the flow has been approved
	 * and a value of null indicates the flow has not been approved (or) has been temporarily disabled.
	 */
	public static function get_flows() {
		$current_brand = Data::current_brand();
		return isset( $current_brand['config']['enabled_flows'] )
		? $current_brand['config']['enabled_flows'] : array(
			'wp-setup'  => false,
			'ecommerce' => false,
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

		if ( ! empty( $current_flow_type ) && true === $flows[ $current_flow_type ] ) {
			return $current_flow_type;
		}

		$current_flow_type = \get_option( Options::get_option_name( 'flow_preset' ), false );
		if ( $current_flow_type && true === $flows[ $current_flow_type ] ) {
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
		if ( PluginInstaller::exists( 'woocommerce', false ) ) {
			return true === self::get_flows()['ecommerce'] ? 'ecommerce' : false;
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
			return true === self::get_flows()['ecommerce'] ? 'ecommerce' : false;
		}
		return false;
	}
	/**
	 * Get the corresponding flow from the top priority in flow data.
	 *
	 * @return string|boolean
	 */
	public static function get_flow_from_top_priority() {
		$flow_data = FlowService::read_data_from_wp_option();
		if ( $flow_data && isset( $flow_data['data']['topPriority']['priority1'] ) && 'selling' === $flow_data['data']['topPriority']['priority1'] ) {
			return true === self::get_flows()['ecommerce'] ? 'ecommerce' : false;
		}
		return false;
	}
}
