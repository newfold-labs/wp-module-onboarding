// eslint-disable-next-line import/no-extraneous-dependencies
import { addQueryArgs } from '@wordpress/url';

/**
 * Gets current host brand name
 *
 * @param {*} state
 * @return {string} Brand name
 */
export function getBrandName( state ) {
	return state.runtime.currentBrand.name;
}

/**
 * Gets the link to the migration service.
 *
 * @param {*} state
 * @return {string} migrationUrl
 */
export function getMigrationFallbackUrl( state ) {
	const migrationInfo = state.runtime.currentBrand.migrationInfo;
	const migrationUrl =
		addQueryArgs( migrationInfo?.defaultLink, migrationInfo?.queryParams ) +
		( migrationInfo?.fragment || '' );
	return migrationUrl;
}

/**
 * Checks if the site has migration access.
 *
 * @param {*} state
 * @return {boolean} canMigrateSite
 */
export function canMigrateSite( state ) {
	const migrationInfo = state.runtime.currentBrand.config;
	return migrationInfo?.canMigrateSite;
}
