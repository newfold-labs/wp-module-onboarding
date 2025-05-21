// eslint-disable-next-line import/no-extraneous-dependencies
import { addQueryArgs } from '@wordpress/url';

/**
 * Runtime Reducer
 *
 * @param {*} state
 * @param {*} action
 * @return {*} state
 */
export function runtime( state = {}, action ) {
	switch ( action.type ) {
		case 'SET_RUNTIME_SLICE':
			return {
				...state,
				...action.runtime,
			};
		case 'SET_INSTAWP_MIGRATION_URL':
			return {
				...state,
				currentBrand: {
					...state.currentBrand,
					migrationInfo: {
						...state.currentBrand.migrationInfo,
						instaWpMigrationUrl: action.instaWpMigrationUrl,
					},
				},
			};
	}

	return state;
}

/**
 * Runtime Actions
 */
export const actions = {
	/**
	 * Receives `window.nfdOnboarding.runtime` and sets migrated: true.
	 *
	 * `url` is left to keep __webpack_public_path__ decoupled from store.
	 *
	 * @param {*} runtimeData
	 * @return {Object} action object
	 */
	setRuntimeSlice( runtimeData ) {
		window.nfdOnboarding.runtime = {
			buildUrl: runtimeData.buildUrl,
			siteUrl: runtimeData.siteUrl,
			migrated: true,
		};
		return {
			type: 'SET_RUNTIME_SLICE',
			runtime: runtimeData,
		};
	},

	setInstaWpMigrationUrl( instaWpMigrationUrl ) {
		return {
			type: 'SET_INSTAWP_MIGRATION_URL',
			instaWpMigrationUrl,
		};
	},
};

/**
 * Runtime Selectors
 */
export const selectors = {
	/**
	 * Gets current host brand name
	 *
	 * @param {*} state
	 * @return {string} Brand name
	 */
	getBrandName( state ) {
		return state.runtime.currentBrand.name;
	},

	/**
	 * Gets the link to the migration service.
	 *
	 * @param {*} state
	 * @return {string} migrationUrl
	 */
	getMigrationFallbackUrl( state ) {
		const migrationInfo = state.runtime.currentBrand.migrationInfo;
		const migrationUrl =
			addQueryArgs( migrationInfo?.defaultLink, migrationInfo?.queryParams ) +
			( migrationInfo?.fragment || '' );
		return migrationUrl;
	},

	/**
	 * Checks if the site has migration access.
	 *
	 * @param {*} state
	 * @return {boolean} canMigrateSite
	 */
	canMigrateSite( state ) {
		const migrationInfo = state.runtime.currentBrand.config;
		return migrationInfo?.canMigrateSite;
	},

	/**
	 * Gets all available languages.
	 *
	 * @param {*} state
	 * @return {Array<{locale: string, name: string, native_name: string}>} languages
	 */
	getLanguages( state ) {
		return Object.values( state.runtime.languages );
	},
};
