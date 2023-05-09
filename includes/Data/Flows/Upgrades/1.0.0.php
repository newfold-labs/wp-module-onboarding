<?php
/**
 * Handle critical updates for flow data version 1.0.0
 * 
 * @package Onboarding Module
 */

namespace NewfoldLabs\WP\Module\Onboarding\Data\Flows\Upgrades;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;

if ( \get_option( Options::get_option_name( 'flow' ), false ) ) {
	$flow_data['data']['colorStyle'] = ! empty( $flow_data['data']['palette']['slug'] ) ? $flow_data['data']['palette']['slug'] : '';
	$flow_data['data']['fontStyle']  = ! empty( $flow_data['data']['typography']['slug'] ) ? $flow_data['data']['typography']['slug'] : '';
	\update_option( Options::get_option_name( 'flow', false ), $flow_data );
}
