import { select, subscribe } from '@wordpress/data';
import { nfdOnboardingStore } from '@/data/store';
import { updateOnboardingSiteGenSlice } from '@/utils/api';

const DEFAULT_STATE = {
	siteId: null,
	SiteGenId: null,
	siteType: null,
	sitemap: [],
	siteKit: [],
	sitemapPages: [],
	siteColors: [],
	siteLogo: null,
	sitegenSliceVersion: 0,
};

/**
 * Sitegen Reducer
 *
 * @param {*} state
 * @param {*} action
 * @return {*} state
 */
export function sitegen( state = DEFAULT_STATE, action ) {
	switch ( action.type ) {
		case 'SET_SITEGEN_SLICE':
			return {
				...state,
				...action.siteGenSlice,
				sitegenSliceVersion: state.sitegenSliceVersion + 1,
			};
		case 'SET_SITE_ID':
			return {
				...state,
				siteId: action.siteId,
				sitegenSliceVersion: state.sitegenSliceVersion + 1,
			};
		case 'SET_SITEGEN_ID':
			return {
				...state,
				SiteGenId: action.SiteGenId,
				sitegenSliceVersion: state.sitegenSliceVersion + 1,
			};
		case 'SET_SITE_TYPE':
			return {
				...state,
				siteType: action.siteType,
				sitegenSliceVersion: state.sitegenSliceVersion + 1,
			};
		case 'SET_SITE_BRAND_IDENTITY':
			return {
				...state,
				siteBrandIdentity: action.siteBrandIdentity,
				sitegenSliceVersion: state.sitegenSliceVersion + 1,
			};
		case 'SET_SITE_CLASSIFICATION':
			return {
				...state,
				siteClassification: action.siteClassification,
				sitegenSliceVersion: state.sitegenSliceVersion + 1,
			};
		case 'SET_SITEMAP':
			return {
				...state,
				sitemap: action.sitemap,
				sitegenSliceVersion: state.sitegenSliceVersion + 1,
			};
		case 'SET_SITE_KIT':
			return {
				...state,
				siteKit: action.siteKit,
				sitegenSliceVersion: state.sitegenSliceVersion + 1,
			};
		case 'SET_SITEMAP_PAGES':
			return {
				...state,
				sitemapPages: action.sitemapPages,
				sitegenSliceVersion: state.sitegenSliceVersion + 1,
			};
		case 'SET_SITE_COLORS':
			return {
				...state,
				siteColors: action.siteColors,
				sitegenSliceVersion: state.sitegenSliceVersion + 1,
			};
		case 'SET_SITE_LOGO':
			return {
				...state,
				siteLogo: action.siteLogo,
				sitegenSliceVersion: state.sitegenSliceVersion + 1,
			};
	}

	return state;
}

export const actions = {
	setSiteGenSlice: ( siteGenSlice ) => {
		return {
			type: 'SET_SITEGEN_SLICE',
			siteGenSlice,
		};
	},
	setSiteId: ( siteId ) => {
		return {
			type: 'SET_SITE_ID',
			siteId,
		};
	},
	setSiteGenId: ( SiteGenId ) => {
		return {
			type: 'SET_SITEGEN_ID',
			SiteGenId,
		};
	},
	setSiteType: ( siteType ) => {
		return {
			type: 'SET_SITE_TYPE',
			siteType,
		};
	},
	setSiteBrandIdentity: ( siteBrandIdentity ) => {
		return {
			type: 'SET_SITE_BRAND_IDENTITY',
			siteBrandIdentity,
		};
	},
	setSiteClassification: ( siteClassification ) => {
		return {
			type: 'SET_SITE_CLASSIFICATION',
			siteClassification,
		};
	},
	setSitemap: ( sitemap ) => {
		return {
			type: 'SET_SITEMAP',
			sitemap,
		};
	},
	setSiteKit: ( siteKit ) => {
		return {
			type: 'SET_SITE_KIT',
			siteKit,
		};
	},
	setSitemapPages: ( sitemapPages ) => {
		return {
			type: 'SET_SITEMAP_PAGES',
			sitemapPages,
		};
	},
	setSiteColors: ( siteColors ) => {
		return {
			type: 'SET_SITE_COLORS',
			siteColors,
		};
	},
	setSiteLogo: ( siteLogo ) => {
		return {
			type: 'SET_SITE_LOGO',
			siteLogo,
		};
	},
};

export const selectors = {
	getSiteGenSlice: ( state ) => state.sitegen,
	getSiteId: ( state ) => state.sitegen.siteId,
	getSiteGenId: ( state ) => state.sitegen.SiteGenId,
	getSiteType: ( state ) => state.sitegen.siteType,
	getSiteBrandIdentity: ( state ) => state.sitegen.siteBrandIdentity,
	getSiteClassification: ( state ) => state.sitegen.siteClassification,
	getSitemap: ( state ) => state.sitegen.sitemap,
	getSiteKit: ( state ) => state.sitegen.siteKit,
	getSitemapPages: ( state ) => state.sitegen.sitemapPages,
	getSiteColors: ( state ) => state.sitegen.siteColors,
	getSiteLogo: ( state ) => state.sitegen.siteLogo,
	getSitegenSliceVersion: ( state ) => state.sitegen.sitegenSliceVersion,
};

/**
 * A service function that subscribes to any changes to the slice data and syncs it to the database.
 */
export function dbSyncService() {
	let previousSiteGenSliceVersion = select( nfdOnboardingStore ).getSitegenSliceVersion();

	subscribe( () => {
		const updatedSiteGenSliceState = select( nfdOnboardingStore ).getSiteGenSlice();
		const updatedSiteGenSliceVersion = select( nfdOnboardingStore ).getSitegenSliceVersion();

		// Only sync if the slice data actually changed.
		if ( previousSiteGenSliceVersion !== updatedSiteGenSliceVersion ) {
			previousSiteGenSliceVersion = updatedSiteGenSliceVersion;

			updateOnboardingSiteGenSlice( updatedSiteGenSliceState );
		}
	}, nfdOnboardingStore );
}
