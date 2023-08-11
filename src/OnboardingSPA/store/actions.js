/**
 * Receives `window.nfdOnboarding` and sets migrated: true.
 *
 * `url` is left to keep __webpack_public_path__ decoupled from store.
 *
 * @param {*} runtime
 * @return {Object} action object
 */
export function setRuntime( runtime ) {
	window.nfdOnboarding = {
		buildUrl: runtime.buildUrl,
		siteUrl: runtime.siteUrl,
		migrated: true,
		currentFlow: runtime.currentFlow ?? 'wp-setup',
		stepPreviewData: runtime.previewSettings.stepPreviewData,
	};
	return {
		type: 'SET_RUNTIME',
		runtime,
	};
}

/**
 * Sets the active view within the Drawer render slot.
 *
 * @param {*} view
 * @return {Object} action object
 */
export function setDrawerActiveView( view ) {
	return {
		type: 'SET_DRAWER_ACTIVE_VIEW',
		view,
	};
}

/**
 * Opens the off-canvas drawer on left of viewport.
 *
 * @param {*} isOpen
 * @return {Object} action object
 */
export function setIsDrawerOpened( isOpen ) {
	return {
		type: 'SET_DRAWER_OPENED',
		isOpen,
	};
}

/**
 * Keeps the drawer on the left suppressed.
 *
 * @param {*} isSuppressed
 * @return {Object} action object
 */
export function setIsDrawerSuppressed( isSuppressed ) {
	return {
		type: 'SET_DRAWER_SUPPRESSED',
		isSuppressed,
	};
}

/**
 * Accepts a string flow to set the active flow.
 *
 * NOTE: does not have any navigation side-effect.
 *
 * @param {*} flow
 * @return {Object} action object
 */
export function setActiveFlow( flow ) {
	return {
		type: 'SET_ACTIVE_FLOW',
		flow,
	};
}

/**
 * Accepts a string path to set the active step.
 *
 * NOTE: does not have any navigation side-effect.
 *
 * @param {*} path
 * @return {Object} action object
 */
export function setActiveStep( path ) {
	// Remove Trailing Spaces from URL
	path = path.replace( /\/$/, '' );

	return {
		type: 'SET_ACTIVE_STEP',
		path,
	};
}

export function setActiveChapter( chapter ) {
	return {
		type: 'SET_ACTIVE_CHAPTER',
		chapter,
	};
}

/**
 * Accepts a JSON to set the Flow Data.
 *
 * @param {*} flowData
 * @return {Object} action object
 */
export function setCurrentOnboardingData( flowData ) {
	return {
		type: 'SET_CURRENT_DATA',
		flowData,
	};
}

/**
 * Accepts a JSON to set the social data.
 *
 * @param {*} socialData
 * @return {Object} action object
 */
export function setOnboardingSocialData( socialData ) {
	return {
		type: 'SET_SOCIAL_DATA',
		socialData,
	};
}

/**
 * Updates general settings.
 *
 * @param {*} settings
 * @return {Object} action object
 */
export function updateSettings( settings ) {
	return {
		type: 'UPDATE_SETTINGS',
		settings,
	};
}

export function updateThemeStatus( themeStatus ) {
	return {
		type: 'UPDATE_THEME_STATUS',
		themeStatus,
	};
}

export function setIsSidebarOpened( isOpen ) {
	return {
		type: 'SET_SIDEBAR_OPENED',
		isOpen,
	};
}

export function setSidebarActiveView( view ) {
	return {
		type: 'SET_SIDEBAR_ACTIVE_VIEW',
		view,
	};
}

export function setIsHeaderNavigationEnabled( isNavigationEnabled ) {
	return {
		type: 'SET_HEADER_NAVIGATION_ENABLED',
		isNavigationEnabled,
	};
}

export function updatePreviewSettings( previewSettings ) {
	return {
		type: 'SET_PREVIEW_SETTINGS',
		previewSettings,
	};
}

export function updateRoutes( routes ) {
	return {
		type: 'UPDATE_ROUTES',
		routes,
	};
}

export function updateAllSteps( allSteps ) {
	return {
		type: 'UPDATE_ALL_STEPS',
		allSteps,
	};
}

export function updateDesignSteps( designSteps ) {
	return {
		type: 'UPDATE_DESIGN_STEPS',
		designSteps,
	};
}

export function setHeaderMenuData( menu ) {
	return {
		type: 'UPDATE_HEADER_MENU_DATA',
		menu,
	};
}

export function enqueueRequest( id, request ) {
	return {
		type: 'ENQUEUE_REQUEST',
		id,
		request,
	};
}

export function dequeueRequest() {
	return {
		type: 'DEQUEUE_REQUEST',
	};
}

export function flushQueue() {
	return {
		type: 'FLUSH_QUEUE',
	};
}
