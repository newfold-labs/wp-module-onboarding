<?php
/**
 * Handle critical updates for flow data version 1.0.0
 *
 * @package Onboarding Module
 */

use NewfoldLabs\WP\Module\Onboarding\Data\Options;

$flow_data = \get_option( Options::get_option_name( 'flow' ), false );
if ( $flow_data ) {
	if ( ! empty( $flow_data['data']['palette']['slug'] ) ) {
		$flow_data['data']['colorStyle'] = $flow_data['data']['palette']['slug'];
	}
	if ( ! empty( $flow_data['data']['typography']['slug'] ) ) {
		$flow_data['data']['fontStyle']  = $flow_data['data']['typography']['slug'];
	}
	\update_option( Options::get_option_name( 'flow' ), $flow_data );
}
