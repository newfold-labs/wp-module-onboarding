import { _x } from '@wordpress/i18n';
import { DEFAULT_FLOW, ECOMMERCE_FLOW, SITEGEN_FLOW } from '../flows/constants';

export const translationMap = {
	[ DEFAULT_FLOW ]: {
		site: {
			noun: _x( 'site', 'noun', 'wp-module-onboarding' ),
		},
		website: {
			noun: _x( 'website', 'noun', 'wp-module-onboarding' ),
		},
	},
	[ ECOMMERCE_FLOW ]: {
		site: {
			noun: _x( 'store', 'noun', 'wp-module-onboarding' ),
		},
		website: {
			noun: _x( 'store', 'noun', 'wp-module-onboarding' ),
		},
	},
	[ SITEGEN_FLOW ]: {
		site: {
			noun: _x( 'site', 'noun', 'wp-module-onboarding' ),
		},
		website: {
			noun: _x( 'website', 'noun', 'wp-module-onboarding' ),
		},
	},
};
