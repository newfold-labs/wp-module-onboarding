import { select, subscribe } from '@wordpress/data';
import { nfdOnboardingStore } from '@/data/store';
import { updateOnboardingAppSlice } from '@/utils/api';

const DEFAULT_STATE = {
	isSiteTypeRequiredPluginsInstalled: false,
	preview: {
		iframeSrc: null,
		postId: null,
	},
	regenerateMode: false,
	canvasSidebarIsOpen: true,
	appSliceVersion: 0,
};

/**
 * App Reducer
 *
 * @param {*} state
 * @param {*} action
 * @return {*} state
 */
export function app( state = DEFAULT_STATE, action ) {
	switch ( action.type ) {
		case 'SET_APP_SLICE':
			return {
				...state,
				...action.appSlice,
				appSliceVersion: state.appSliceVersion + 1,
			};
		case 'SET_SITE_TYPE_REQUIRED_PLUGINS_INSTALLED':
			return {
				...state,
				isSiteTypeRequiredPluginsInstalled: action.isSiteTypeRequiredPluginsInstalled,
				appSliceVersion: state.appSliceVersion + 1,
			};
		case 'SET_PREVIEW':
			return {
				...state,
				preview: action.preview,
				appSliceVersion: state.appSliceVersion + 1,
			};
		case 'SET_REGENERATE_MODE':
			return {
				...state,
				regenerateMode: action.regenerateMode,
				appSliceVersion: state.appSliceVersion + 1,
			};
		case 'SET_CANVAS_SIDEBAR_IS_OPEN':
			return {
				...state,
				canvasSidebarIsOpen: action.canvasSidebarIsOpen,
				appSliceVersion: state.appSliceVersion + 1,
			};
	}

	return state;
}

/**
 * App Actions
 */
export const actions = {
	setAppSlice: ( appSlice ) => {
		return {
			type: 'SET_APP_SLICE',
			appSlice,
		};
	},
	setIsSiteTypeRequiredPluginsInstalled: ( isSiteTypeRequiredPluginsInstalled ) => {
		return {
			type: 'SET_SITE_TYPE_REQUIRED_PLUGINS_INSTALLED',
			isSiteTypeRequiredPluginsInstalled,
		};
	},
	setPreview: ( preview ) => {
		return {
			type: 'SET_PREVIEW',
			preview,
		};
	},
	setRegenerateMode: ( regenerateMode ) => {
		return {
			type: 'SET_REGENERATE_MODE',
			regenerateMode,
		};
	},
	setCanvasSidebarIsOpen: ( canvasSidebarIsOpen ) => {
		return {
			type: 'SET_CANVAS_SIDEBAR_IS_OPEN',
			canvasSidebarIsOpen,
		};
	},
};

/**
 * App Selectors
 */
export const selectors = {
	getAppSlice: ( state ) => state.app,
	getIsSiteTypeRequiredPluginsInstalled: ( state ) => state.app.isSiteTypeRequiredPluginsInstalled,
	getPreview: ( state ) => state.app.preview,
	getRegenerateMode: ( state ) => state.app.regenerateMode,
	getCanvasSidebarIsOpen: ( state ) => state.app.canvasSidebarIsOpen,
	getAppSliceVersion: ( state ) => state.app.appSliceVersion,
};

/**
 * A service function that subscribes to any changes to the slice data and syncs it to the database.
 */
export function dbSyncService() {
	let previousAppSliceVersion = select( nfdOnboardingStore ).getAppSliceVersion();

	subscribe( () => {
		const updatedAppSliceState = select( nfdOnboardingStore ).getAppSlice();
		const updatedAppSliceVersion = select( nfdOnboardingStore ).getAppSliceVersion();

		if ( previousAppSliceVersion !== updatedAppSliceVersion ) {
			previousAppSliceVersion = updatedAppSliceVersion;

			updateOnboardingAppSlice( updatedAppSliceState );
		}
	}, nfdOnboardingStore );
}
