/**
 * Receives `window.nfdOnboarding` and sets migrated: true.
 *
 * `url` is left to keep __webpack_public_path__ decoupled from store.
 *
 * @param {*} runtime
 * @return
 */
export function setRuntime( runtime ) {
	window.nfdOnboarding = {
		buildUrl: runtime.buildUrl,
		siteUrl: runtime.siteUrl,
		migrated: true,
		currentFlow: runtime.currentFlow ?? 'wp-setup',
		themeStepData: runtime.themeStepData,
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
 * @return
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
 * @return
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
 * @return
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
 * @param {*} path
 * @param     flow
 * @return
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
 * @return
 */
export function setActiveStep( path ) {
	// Remove Trailing Spaces from URL
	path = path.replace( /\/$/, '' );

	return {
		type: 'SET_ACTIVE_STEP',
		path,
	};
}

/**
 * Accepts a JSON to set the current data.
 *
 * @param {*} currentData
 * @return
 */
export function setCurrentOnboardingData( currentData ) {
	return {
		type: 'SET_CURRENT_DATA',
		currentData,
	};
}

/**
 * Updates general settings.
 *
 * @param {*} settings
 * @return
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

export function updatePluginsStatus( pluginsStatus ) {
	return {
		type: 'UPDATE_PLUGINS_STATUS',
		pluginsStatus,
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
