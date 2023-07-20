/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/hiive/data/namespace.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@newfold-labs/js-utility-ui-analytics/src/hiive/data/namespace.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "namespace": () => (/* binding */ namespace)
/* harmony export */ });
const namespace = {
	urls: {
		single: undefined,
		batch: undefined,
	},
	queue: {
		events: [],
		threshold: 100,
	},
	debounce: {
		time: undefined,
		instance: undefined,
	},
};


/***/ }),

/***/ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/hiive/events/HiiveEvent.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@newfold-labs/js-utility-ui-analytics/src/hiive/events/HiiveEvent.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HiiveEvent": () => (/* binding */ HiiveEvent)
/* harmony export */ });
/**
 * Defines the structure of a Hiive analytics event.
 *
 * @class HiiveEvent
 */
class HiiveEvent {
	/**
	 * Constructor for the HiiveEvent class.
	 *
	 * @param {string} category  The category of the event (This actual value will depend on the URL you are reporting to).
	 * @param {string} action    The action that triggered the event (The actual value will depend on the URL you are reporting to).
	 * @param {Object} data      Data related to the event.
	 * @param {string} namespace The namespace that the event belongs to.
	 */
	constructor( category, action, data, namespace ) {
		this.category = category;
		this.action = action;
		this.data = data;
		this.namespace = namespace;
	}
}


/***/ }),

/***/ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/hiive/events/index.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@newfold-labs/js-utility-ui-analytics/src/hiive/events/index.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HiiveEvent": () => (/* reexport safe */ _HiiveEvent__WEBPACK_IMPORTED_MODULE_0__.HiiveEvent)
/* harmony export */ });
/* harmony import */ var _HiiveEvent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HiiveEvent */ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/hiive/events/HiiveEvent.js");
// Exports related to Hiive events.



/***/ }),

/***/ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/hiive/index.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@newfold-labs/js-utility-ui-analytics/src/hiive/index.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HiiveAnalytics": () => (/* binding */ HiiveAnalytics),
/* harmony export */   "HiiveEvent": () => (/* reexport safe */ _events__WEBPACK_IMPORTED_MODULE_1__.HiiveEvent)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./events */ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/hiive/events/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../store */ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/store/index.js");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__);





/**
 * Determines whether Hiive analytics have been initialized or not for a particular namespace.
 *
 * @param {string} namespace The namespace the check.
 * @return {boolean} whether Hiive analytics have been initialized or not for a particular namespace.
 */
const initialized = ( namespace ) => {
	if ( window?.nfdUIAnalytics?.hiive ) {
		return namespace in window.nfdUIAnalytics.hiive;
	}
	return false;
};

/**
 * Validates that the parameter is an instance of HiiveEvent.
 *
 * @param {Object} event Any valid JS Object.
 * @return {boolean} whether the param is a valid HiiveEvent instance or not.
 */
const validate = ( event ) => {
	if ( ! ( event instanceof _events__WEBPACK_IMPORTED_MODULE_1__.HiiveEvent ) ) {
		return false;
	}

	return true;
};

/**
 * Initializes the module to send out Hiive analytics events.
 *
 * @param {Object} param0                          Data to initialize Hiive analytics.
 * @param {Object} param0.settings                 Settings that define the behavior of HiiveAnalytics.
 * @param {Object} param0.settings.debounce        Settings related to the debounce.
 * @param {number} param0.settings.debounce.time   The interval that must pass once an event has been tracked after which a batch request gets placed automatically to the batch URL.
 * @param {Object} param0.settings.queue           Settings related to the Hiive events queue.
 * @param {number} param0.settings.queue.threshold The limit that the number of events in the queue must cross after which a batch request gets placed automatically to the batch URL.
 * @param {Object} param0.urls                     Contains URL's to report analytics.
 * @param {string} param0.urls.single              The URL that can handle a single event.
 * @param {string} param0.urls.batch               The URL that can handle an array of events.
 * @param {string} param0.namespace                The namespace to initialize.
 * @return {boolean} Whether the module was initialized or not.
 */
const initialize = async ( {
	namespace,
	urls: { single, batch } = {},
	settings: { debounce: { time } = {}, queue: { threshold = 100 } = {} } = {},
} ) => {
	if ( ! namespace ) {
		return false;
	}

	// If the module is already initialized then skip initialization.
	if ( initialized( namespace ) ) {
		return true;
	}

	// If no reporting URL's are defined then fail initialization.
	if ( ! ( single || batch ) ) {
		return false;
	}

	(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)( _store__WEBPACK_IMPORTED_MODULE_2__.store ).initializeNamespace( namespace );

	// Update Redux store with all the required data.
	(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)( _store__WEBPACK_IMPORTED_MODULE_2__.store ).updateHiiveUrls(
		{
			single,
			batch,
		},
		namespace
	);
	(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)( _store__WEBPACK_IMPORTED_MODULE_2__.store ).updateHiiveDebounceTime( time, namespace );
	(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)( _store__WEBPACK_IMPORTED_MODULE_2__.store ).updateHiiveEventsQueueThreshold( threshold, namespace );

	// This helps us quickly determine whether Hiive analytics have been enabled.
	if ( window.nfdUIAnalytics?.hiive ) {
		window.nfdUIAnalytics.hiive[ namespace ] = true;
	} else {
		window.nfdUIAnalytics = {
			hiive: {
				[ namespace ]: true,
			},
		};
	}

	return true;
};

/**
 * Tracks the event by putting it in a queue.
 *
 * @param {HiiveEvent} event The event object to track.
 * @return {boolean} whether the event has been successfully queued for tracking or not.
 */
const track = ( event ) => {
	// Do not perform any activity if the module has not been initialized or the event is not valid.
	if ( ! ( validate( event ) && initialized( event.namespace ) ) ) {
		return false;
	}
	const namespace = event.namespace;
	delete event.namespace;
	// Add the event to a queue of tracked events.
	const events = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)( _store__WEBPACK_IMPORTED_MODULE_2__.store ).getHiiveEventsQueue( namespace );
	events.push( event );
	(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)( _store__WEBPACK_IMPORTED_MODULE_2__.store ).updateHiiveEventsQueue( events, namespace );

	// If the number of events in the queue have crossed the threshold then dispatch all of them.
	const threshold = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)( _store__WEBPACK_IMPORTED_MODULE_2__.store ).getHiiveEventsQueueThreshold( namespace );
	if ( threshold && threshold < events.length ) {
		dispatchEvents( namespace );
	}

	// Reset the debounce setTimeout instance.
	resetDebounceInstance( namespace );

	return true;
};

/**
 * Reports the event to urls.single defined during initialization.
 *
 * @param {HiiveEvent} event The event object to send.
 * @return {Promise<boolean>} whether the event has been successfully sent or not.
 */
const send = async ( event ) => {
	// Do not perform any activity if the module has not been initialized or the event is not valid.
	if ( ! ( validate( event ) && initialized( event.namespace ) ) ) {
		return false;
	}

	const namespace = event.namespace;
	delete event.namespace;

	const url = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)( _store__WEBPACK_IMPORTED_MODULE_2__.store ).getHiiveSingleUrl( namespace );
	if ( ! url ) {
		return false;
	}

	try {
		await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()( {
			url,
			method: 'POST',
			data: event,
		} );
	} catch ( error ) {
		console.error( error );
		return false;
	}
};

/**
 * Reports all the queued events to urls.batch defined during initialization.
 *
 * @param {string} namespace The namespace whose events must be dispatched.
 * @return {Promise<boolean>} whether or not all the events were sent to the batchUrl successfully.
 */
const dispatchEvents = async ( namespace ) => {
	if ( ! namespace || ! initialized( namespace ) ) {
		return false;
	}

	const url = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)( _store__WEBPACK_IMPORTED_MODULE_2__.store ).getHiiveBatchUrl( namespace );
	if ( ! url ) {
		return false;
	}

	// If there are no events to report then return.
	const events = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)( _store__WEBPACK_IMPORTED_MODULE_2__.store ).getHiiveEventsQueue( namespace );
	if ( 0 === events.length ) {
		return true;
	}

	// Rare case: Do this so that any other dispatchEvents calls do not dispatch redundant data.
	(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)( _store__WEBPACK_IMPORTED_MODULE_2__.store ).updateHiiveEventsQueue( [], namespace );

	try {
		await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()( {
			url,
			method: 'POST',
			data: events,
		} );
	} catch ( error ) {
		// [TODO] Figure out a better error handling method and clear the queue.
		console.error( error );
		(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)( _store__WEBPACK_IMPORTED_MODULE_2__.store ).updateHiiveEventsQueue( events, namespace );
	}

	return true;
};

/**
 * Resets the debounce instance countdown.
 *
 * @param {string} namespace The namespace in which the debounce instance should be reset.
 * @return {boolean} whether the reset occurred successfully or not.
 */
const resetDebounceInstance = ( namespace ) => {
	if ( ! namespace ) {
		return false;
	}

	const debounce = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)( _store__WEBPACK_IMPORTED_MODULE_2__.store ).getHiiveDebounce( namespace );

	if ( ! debounce.time ) {
		return false;
	}

	clearInterval( debounce.instance );
	(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)( _store__WEBPACK_IMPORTED_MODULE_2__.store ).updateHiiveDebounceInstance(
		setTimeout( () => {
			dispatchEvents( namespace );
			(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)( _store__WEBPACK_IMPORTED_MODULE_2__.store ).updateHiiveDebounceInstance(
				undefined,
				namespace
			);
		}, debounce.time ),
		namespace
	);
	return true;
};

/**
 * Disables the debounce.
 *
 * @param {string} namespace The namespace in which the debounce instance should be disabled.
 * @return {boolean} whether the debounce has been successfully disabled or not.
 */
const disableDebounce = ( namespace ) => {
	if ( ! namespace ) {
		return false;
	}

	const debounce = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)( _store__WEBPACK_IMPORTED_MODULE_2__.store ).getHiiveDebounce( namespace );
	if ( debounce.instance ) {
		clearInterval( debounce.instance );
		(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)( _store__WEBPACK_IMPORTED_MODULE_2__.store ).updateHiiveDebounceInstance( undefined, namespace );
		(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)( _store__WEBPACK_IMPORTED_MODULE_2__.store ).updateHiiveDebounceTime( undefined, namespace );
	}
	return true;
};

const HiiveAnalytics = {
	initialize,
	initialized,
	validate,
	track,
	send,
	dispatchEvents,
	disableDebounce,
};



/***/ }),

/***/ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@newfold-labs/js-utility-ui-analytics/src/index.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HiiveAnalytics": () => (/* reexport safe */ _hiive__WEBPACK_IMPORTED_MODULE_0__.HiiveAnalytics),
/* harmony export */   "HiiveEvent": () => (/* reexport safe */ _hiive__WEBPACK_IMPORTED_MODULE_0__.HiiveEvent)
/* harmony export */ });
/* harmony import */ var _hiive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hiive */ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/hiive/index.js");
// Exports for the Hiive Platform.



/***/ }),

/***/ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/store/actions.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@newfold-labs/js-utility-ui-analytics/src/store/actions.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initializeNamespace": () => (/* binding */ initializeNamespace),
/* harmony export */   "updateHiiveDebounceInstance": () => (/* binding */ updateHiiveDebounceInstance),
/* harmony export */   "updateHiiveDebounceTime": () => (/* binding */ updateHiiveDebounceTime),
/* harmony export */   "updateHiiveEventsQueue": () => (/* binding */ updateHiiveEventsQueue),
/* harmony export */   "updateHiiveEventsQueueThreshold": () => (/* binding */ updateHiiveEventsQueueThreshold),
/* harmony export */   "updateHiiveUrls": () => (/* binding */ updateHiiveUrls)
/* harmony export */ });
/**
 * Initialize a Hiive Event namespace.
 *
 * @param {string} namespace The namespace to be initialized.
 * @return {Object} Type of action to perform with data.
 */
function initializeNamespace( namespace ) {
	return {
		type: 'INITIALIZE_NAMESPACE',
		namespace,
	};
}

/**
 * Update the Hiive URLs.
 *
 * @param {Object} urls      The Hiive URLs.
 * @param {string} namespace The namespace in which the URL's must be updated.
 * @return {Object} Type of action to perform with data.
 */
function updateHiiveUrls( urls, namespace ) {
	return {
		type: 'UPDATE_HIIVE_URLS',
		urls,
		namespace,
	};
}

/**
 * Update the Hiive events queue.
 *
 * @param {Array}  events    An array of events to be queued.
 * @param {string} namespace The namespace in which the queue must be updated.
 * @return {Object} Type of action to perform with data.
 */
function updateHiiveEventsQueue( events, namespace ) {
	return {
		type: 'UPDATE_HIIVE_EVENTS_QUEUE',
		events,
		namespace,
	};
}

/**
 *
 * @param {number} threshold The threshold for the queue.
 * @param {string} namespace The namespace in which the threshold must be updated.
 * @return {Object} Type of action to perform with data.
 */
function updateHiiveEventsQueueThreshold( threshold, namespace ) {
	return {
		type: 'UPDATE_HIIVE_EVENTS_QUEUE_THRESHOLD',
		threshold,
		namespace,
	};
}

/**
 * Update the Hiive events dispatch debounce time.
 *
 * @param {number} debounceTime The time to wait.
 * @param {string} namespace    The namespace in which the debounce time must be updated.
 * @return {Object} Type of action to perform with data.
 */
function updateHiiveDebounceTime( debounceTime, namespace ) {
	return {
		type: 'UPDATE_HIIVE_DEBOUNCE_TIME',
		debounceTime,
		namespace,
	};
}

/**
 * Updates the Hiive debounce instance.
 *
 * @param {Object} instance  A setTimeout instance of the debounce.
 * @param {string} namespace The namespace in which the debounce instance must be updated.
 * @return {Object} Type of action to perform with data.
 */
function updateHiiveDebounceInstance( instance, namespace ) {
	return {
		type: 'UPDATE_HIIVE_DEBOUNCE_INSTANCE',
		instance,
		namespace,
	};
}


/***/ }),

/***/ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/store/constants.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@newfold-labs/js-utility-ui-analytics/src/store/constants.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "STORE_NAME": () => (/* binding */ STORE_NAME)
/* harmony export */ });
/**
 * The name for the Redux store of this package.
 */
const STORE_NAME = 'newfold/ui-analytics';


/***/ }),

/***/ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/store/index.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@newfold-labs/js-utility-ui-analytics/src/store/index.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "nfdUIAnalyticsStoreConfig": () => (/* binding */ nfdUIAnalyticsStoreConfig),
/* harmony export */   "store": () => (/* binding */ store)
/* harmony export */ });
/* harmony import */ var _reducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reducer */ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/store/reducer.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actions */ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/store/actions.js");
/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./selectors */ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/store/selectors.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/store/constants.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);







/**
 * The Redux store configuration.
 */
const nfdUIAnalyticsStoreConfig = {
	reducer: _reducer__WEBPACK_IMPORTED_MODULE_0__["default"],
	actions: _actions__WEBPACK_IMPORTED_MODULE_1__,
	selectors: _selectors__WEBPACK_IMPORTED_MODULE_2__,
};

const store = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.createReduxStore)( _constants__WEBPACK_IMPORTED_MODULE_3__.STORE_NAME, nfdUIAnalyticsStoreConfig );
(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.register)( store );


/***/ }),

/***/ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/store/reducer.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@newfold-labs/js-utility-ui-analytics/src/store/reducer.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "hiive": () => (/* binding */ hiive)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hiive_data_namespace__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../hiive/data/namespace */ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/hiive/data/namespace.js");




/**
 * A reducer for Hiive related actions.
 *
 * @param {Object} state  The current state of the store.
 * @param {Object} action The action to be performed to change the state.
 * @return {Object} state The new state of the store after the action is performed.
 */
const hiive = ( state, action ) => {
	switch ( action.type ) {
		case 'INITIALIZE_NAMESPACE': {
			return {
				...state,
				[ action.namespace ]: _hiive_data_namespace__WEBPACK_IMPORTED_MODULE_1__.namespace,
			};
		}
		case 'UPDATE_HIIVE_URLS':
			return {
				...state,
				[ action.namespace ]: {
					...state[ action.namespace ],
					urls: {
						single: action.urls.single,
						batch: action.urls.batch,
					},
				},
			};
		case 'UPDATE_HIIVE_EVENTS_QUEUE':
			return {
				...state,
				[ action.namespace ]: {
					...state[ action.namespace ],
					queue: {
						events: action.events,
						threshold: state[ action.namespace ].queue.threshold,
					},
				},
			};
		case 'UPDATE_HIIVE_EVENTS_QUEUE_THRESHOLD': {
			return {
				...state,
				[ action.namespace ]: {
					...state[ action.namespace ],
					queue: {
						events: state[ action.namespace ].queue.events,
						threshold: action.threshold,
					},
				},
			};
		}
		case 'UPDATE_HIIVE_DEBOUNCE_TIME':
			return {
				...state,
				[ action.namespace ]: {
					...state[ action.namespace ],
					debounce: {
						time: action.debounceTime,
						instance: state[ action.namespace ].debounce.instance,
					},
				},
			};
		case 'UPDATE_HIIVE_DEBOUNCE_INSTANCE':
			return {
				...state,
				[ action.namespace ]: {
					...state[ action.namespace ],
					debounce: {
						time: state[ action.namespace ].debounce.time,
						instance: action.instance,
					},
				},
			};
	}
	return state;
};

/**
 * Combines all the reducers in this file.
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.combineReducers)( {
	hiive,
} ));


/***/ }),

/***/ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/store/selectors.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@newfold-labs/js-utility-ui-analytics/src/store/selectors.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getHiiveBatchUrl": () => (/* binding */ getHiiveBatchUrl),
/* harmony export */   "getHiiveDebounce": () => (/* binding */ getHiiveDebounce),
/* harmony export */   "getHiiveEventsQueue": () => (/* binding */ getHiiveEventsQueue),
/* harmony export */   "getHiiveEventsQueueThreshold": () => (/* binding */ getHiiveEventsQueueThreshold),
/* harmony export */   "getHiiveSingleUrl": () => (/* binding */ getHiiveSingleUrl)
/* harmony export */ });
/**
 * Retrieves all the queued Hiive events.
 *
 * @param {Object} state     The current state of the redux store.
 * @param {string} namespace The namespace from which the events must be retrieved.
 * @return {Array} events An array of events that are queued.
 */
function getHiiveEventsQueue( state, namespace ) {
	return state.hiive[ namespace ]?.queue.events;
}

/**
 *
 * @param {*}      state     The current state of the redux store.
 * @param {string} namespace The namespace from which the threshold must be read.
 * @return {Array} threshold Threshold of the queue.
 */
function getHiiveEventsQueueThreshold( state, namespace ) {
	return state.hiive[ namespace ]?.queue.threshold;
}

/**
 * Retrieves the default Hiive URL.
 *
 * @param {Object} state     The current state of the redux store.
 * @param {string} namespace The namespace from which the single URL must be read.
 * @return {string} The default URL in the store.
 */
function getHiiveSingleUrl( state, namespace ) {
	return state.hiive[ namespace ]?.urls.single;
}

/**
 * Retrieves the batch Hiive URL.
 *
 * @param {*}      state     The current state of the redux store.
 * @param {string} namespace The namespace from which the batch URL must be read.
 * @return {string} The batch URL in the store.
 */
function getHiiveBatchUrl( state, namespace ) {
	return state.hiive[ namespace ]?.urls.batch;
}

/**
 * Retrieves debounce data.
 *
 * @param {Object} state     The current state of the redux store.
 * @param {string} namespace The namespace from which the Hiive debounce must be read.
 * @return {Object} The debounce data.
 */
function getHiiveDebounce( state, namespace ) {
	return state.hiive[ namespace ]?.debounce;
}


/***/ }),

/***/ "./node_modules/@remix-run/router/dist/router.js":
/*!*******************************************************!*\
  !*** ./node_modules/@remix-run/router/dist/router.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbortedDeferredError": () => (/* binding */ AbortedDeferredError),
/* harmony export */   "Action": () => (/* binding */ Action),
/* harmony export */   "ErrorResponse": () => (/* binding */ ErrorResponse),
/* harmony export */   "IDLE_BLOCKER": () => (/* binding */ IDLE_BLOCKER),
/* harmony export */   "IDLE_FETCHER": () => (/* binding */ IDLE_FETCHER),
/* harmony export */   "IDLE_NAVIGATION": () => (/* binding */ IDLE_NAVIGATION),
/* harmony export */   "UNSAFE_DEFERRED_SYMBOL": () => (/* binding */ UNSAFE_DEFERRED_SYMBOL),
/* harmony export */   "UNSAFE_DeferredData": () => (/* binding */ DeferredData),
/* harmony export */   "UNSAFE_convertRoutesToDataRoutes": () => (/* binding */ convertRoutesToDataRoutes),
/* harmony export */   "UNSAFE_getPathContributingMatches": () => (/* binding */ getPathContributingMatches),
/* harmony export */   "UNSAFE_invariant": () => (/* binding */ invariant),
/* harmony export */   "UNSAFE_warning": () => (/* binding */ warning),
/* harmony export */   "createBrowserHistory": () => (/* binding */ createBrowserHistory),
/* harmony export */   "createHashHistory": () => (/* binding */ createHashHistory),
/* harmony export */   "createMemoryHistory": () => (/* binding */ createMemoryHistory),
/* harmony export */   "createPath": () => (/* binding */ createPath),
/* harmony export */   "createRouter": () => (/* binding */ createRouter),
/* harmony export */   "createStaticHandler": () => (/* binding */ createStaticHandler),
/* harmony export */   "defer": () => (/* binding */ defer),
/* harmony export */   "generatePath": () => (/* binding */ generatePath),
/* harmony export */   "getStaticContextFromError": () => (/* binding */ getStaticContextFromError),
/* harmony export */   "getToPathname": () => (/* binding */ getToPathname),
/* harmony export */   "isDeferredData": () => (/* binding */ isDeferredData),
/* harmony export */   "isRouteErrorResponse": () => (/* binding */ isRouteErrorResponse),
/* harmony export */   "joinPaths": () => (/* binding */ joinPaths),
/* harmony export */   "json": () => (/* binding */ json),
/* harmony export */   "matchPath": () => (/* binding */ matchPath),
/* harmony export */   "matchRoutes": () => (/* binding */ matchRoutes),
/* harmony export */   "normalizePathname": () => (/* binding */ normalizePathname),
/* harmony export */   "parsePath": () => (/* binding */ parsePath),
/* harmony export */   "redirect": () => (/* binding */ redirect),
/* harmony export */   "resolvePath": () => (/* binding */ resolvePath),
/* harmony export */   "resolveTo": () => (/* binding */ resolveTo),
/* harmony export */   "stripBasename": () => (/* binding */ stripBasename)
/* harmony export */ });
/**
 * @remix-run/router v1.6.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

////////////////////////////////////////////////////////////////////////////////
//#region Types and Constants
////////////////////////////////////////////////////////////////////////////////

/**
 * Actions represent the type of change to a location value.
 */
var Action;

(function (Action) {
  /**
   * A POP indicates a change to an arbitrary index in the history stack, such
   * as a back or forward navigation. It does not describe the direction of the
   * navigation, only that the current index changed.
   *
   * Note: This is the default action for newly created history objects.
   */
  Action["Pop"] = "POP";
  /**
   * A PUSH indicates a new entry being added to the history stack, such as when
   * a link is clicked and a new page loads. When this happens, all subsequent
   * entries in the stack are lost.
   */

  Action["Push"] = "PUSH";
  /**
   * A REPLACE indicates the entry at the current index in the history stack
   * being replaced by a new one.
   */

  Action["Replace"] = "REPLACE";
})(Action || (Action = {}));

const PopStateEventType = "popstate";
/**
 * Memory history stores the current location in memory. It is designed for use
 * in stateful non-browser environments like tests and React Native.
 */

function createMemoryHistory(options) {
  if (options === void 0) {
    options = {};
  }

  let {
    initialEntries = ["/"],
    initialIndex,
    v5Compat = false
  } = options;
  let entries; // Declare so we can access from createMemoryLocation

  entries = initialEntries.map((entry, index) => createMemoryLocation(entry, typeof entry === "string" ? null : entry.state, index === 0 ? "default" : undefined));
  let index = clampIndex(initialIndex == null ? entries.length - 1 : initialIndex);
  let action = Action.Pop;
  let listener = null;

  function clampIndex(n) {
    return Math.min(Math.max(n, 0), entries.length - 1);
  }

  function getCurrentLocation() {
    return entries[index];
  }

  function createMemoryLocation(to, state, key) {
    if (state === void 0) {
      state = null;
    }

    let location = createLocation(entries ? getCurrentLocation().pathname : "/", to, state, key);
    warning(location.pathname.charAt(0) === "/", "relative pathnames are not supported in memory history: " + JSON.stringify(to));
    return location;
  }

  function createHref(to) {
    return typeof to === "string" ? to : createPath(to);
  }

  let history = {
    get index() {
      return index;
    },

    get action() {
      return action;
    },

    get location() {
      return getCurrentLocation();
    },

    createHref,

    createURL(to) {
      return new URL(createHref(to), "http://localhost");
    },

    encodeLocation(to) {
      let path = typeof to === "string" ? parsePath(to) : to;
      return {
        pathname: path.pathname || "",
        search: path.search || "",
        hash: path.hash || ""
      };
    },

    push(to, state) {
      action = Action.Push;
      let nextLocation = createMemoryLocation(to, state);
      index += 1;
      entries.splice(index, entries.length, nextLocation);

      if (v5Compat && listener) {
        listener({
          action,
          location: nextLocation,
          delta: 1
        });
      }
    },

    replace(to, state) {
      action = Action.Replace;
      let nextLocation = createMemoryLocation(to, state);
      entries[index] = nextLocation;

      if (v5Compat && listener) {
        listener({
          action,
          location: nextLocation,
          delta: 0
        });
      }
    },

    go(delta) {
      action = Action.Pop;
      let nextIndex = clampIndex(index + delta);
      let nextLocation = entries[nextIndex];
      index = nextIndex;

      if (listener) {
        listener({
          action,
          location: nextLocation,
          delta
        });
      }
    },

    listen(fn) {
      listener = fn;
      return () => {
        listener = null;
      };
    }

  };
  return history;
}
/**
 * Browser history stores the location in regular URLs. This is the standard for
 * most web apps, but it requires some configuration on the server to ensure you
 * serve the same app at multiple URLs.
 *
 * @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#createbrowserhistory
 */

function createBrowserHistory(options) {
  if (options === void 0) {
    options = {};
  }

  function createBrowserLocation(window, globalHistory) {
    let {
      pathname,
      search,
      hash
    } = window.location;
    return createLocation("", {
      pathname,
      search,
      hash
    }, // state defaults to `null` because `window.history.state` does
    globalHistory.state && globalHistory.state.usr || null, globalHistory.state && globalHistory.state.key || "default");
  }

  function createBrowserHref(window, to) {
    return typeof to === "string" ? to : createPath(to);
  }

  return getUrlBasedHistory(createBrowserLocation, createBrowserHref, null, options);
}
/**
 * Hash history stores the location in window.location.hash. This makes it ideal
 * for situations where you don't want to send the location to the server for
 * some reason, either because you do cannot configure it or the URL space is
 * reserved for something else.
 *
 * @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#createhashhistory
 */

function createHashHistory(options) {
  if (options === void 0) {
    options = {};
  }

  function createHashLocation(window, globalHistory) {
    let {
      pathname = "/",
      search = "",
      hash = ""
    } = parsePath(window.location.hash.substr(1));
    return createLocation("", {
      pathname,
      search,
      hash
    }, // state defaults to `null` because `window.history.state` does
    globalHistory.state && globalHistory.state.usr || null, globalHistory.state && globalHistory.state.key || "default");
  }

  function createHashHref(window, to) {
    let base = window.document.querySelector("base");
    let href = "";

    if (base && base.getAttribute("href")) {
      let url = window.location.href;
      let hashIndex = url.indexOf("#");
      href = hashIndex === -1 ? url : url.slice(0, hashIndex);
    }

    return href + "#" + (typeof to === "string" ? to : createPath(to));
  }

  function validateHashLocation(location, to) {
    warning(location.pathname.charAt(0) === "/", "relative pathnames are not supported in hash history.push(" + JSON.stringify(to) + ")");
  }

  return getUrlBasedHistory(createHashLocation, createHashHref, validateHashLocation, options);
}
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
function warning(cond, message) {
  if (!cond) {
    // eslint-disable-next-line no-console
    if (typeof console !== "undefined") console.warn(message);

    try {
      // Welcome to debugging history!
      //
      // This error is thrown as a convenience so you can more easily
      // find the source for a warning that appears in the console by
      // enabling "pause on exceptions" in your JavaScript debugger.
      throw new Error(message); // eslint-disable-next-line no-empty
    } catch (e) {}
  }
}

function createKey() {
  return Math.random().toString(36).substr(2, 8);
}
/**
 * For browser-based histories, we combine the state and key into an object
 */


function getHistoryState(location, index) {
  return {
    usr: location.state,
    key: location.key,
    idx: index
  };
}
/**
 * Creates a Location object with a unique key from the given Path
 */


function createLocation(current, to, state, key) {
  if (state === void 0) {
    state = null;
  }

  let location = _extends({
    pathname: typeof current === "string" ? current : current.pathname,
    search: "",
    hash: ""
  }, typeof to === "string" ? parsePath(to) : to, {
    state,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: to && to.key || key || createKey()
  });

  return location;
}
/**
 * Creates a string URL path from the given pathname, search, and hash components.
 */

function createPath(_ref) {
  let {
    pathname = "/",
    search = "",
    hash = ""
  } = _ref;
  if (search && search !== "?") pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#") pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
/**
 * Parses a string URL path into its separate pathname, search, and hash components.
 */

function parsePath(path) {
  let parsedPath = {};

  if (path) {
    let hashIndex = path.indexOf("#");

    if (hashIndex >= 0) {
      parsedPath.hash = path.substr(hashIndex);
      path = path.substr(0, hashIndex);
    }

    let searchIndex = path.indexOf("?");

    if (searchIndex >= 0) {
      parsedPath.search = path.substr(searchIndex);
      path = path.substr(0, searchIndex);
    }

    if (path) {
      parsedPath.pathname = path;
    }
  }

  return parsedPath;
}

function getUrlBasedHistory(getLocation, createHref, validateLocation, options) {
  if (options === void 0) {
    options = {};
  }

  let {
    window = document.defaultView,
    v5Compat = false
  } = options;
  let globalHistory = window.history;
  let action = Action.Pop;
  let listener = null;
  let index = getIndex(); // Index should only be null when we initialize. If not, it's because the
  // user called history.pushState or history.replaceState directly, in which
  // case we should log a warning as it will result in bugs.

  if (index == null) {
    index = 0;
    globalHistory.replaceState(_extends({}, globalHistory.state, {
      idx: index
    }), "");
  }

  function getIndex() {
    let state = globalHistory.state || {
      idx: null
    };
    return state.idx;
  }

  function handlePop() {
    action = Action.Pop;
    let nextIndex = getIndex();
    let delta = nextIndex == null ? null : nextIndex - index;
    index = nextIndex;

    if (listener) {
      listener({
        action,
        location: history.location,
        delta
      });
    }
  }

  function push(to, state) {
    action = Action.Push;
    let location = createLocation(history.location, to, state);
    if (validateLocation) validateLocation(location, to);
    index = getIndex() + 1;
    let historyState = getHistoryState(location, index);
    let url = history.createHref(location); // try...catch because iOS limits us to 100 pushState calls :/

    try {
      globalHistory.pushState(historyState, "", url);
    } catch (error) {
      // They are going to lose state here, but there is no real
      // way to warn them about it since the page will refresh...
      window.location.assign(url);
    }

    if (v5Compat && listener) {
      listener({
        action,
        location: history.location,
        delta: 1
      });
    }
  }

  function replace(to, state) {
    action = Action.Replace;
    let location = createLocation(history.location, to, state);
    if (validateLocation) validateLocation(location, to);
    index = getIndex();
    let historyState = getHistoryState(location, index);
    let url = history.createHref(location);
    globalHistory.replaceState(historyState, "", url);

    if (v5Compat && listener) {
      listener({
        action,
        location: history.location,
        delta: 0
      });
    }
  }

  function createURL(to) {
    // window.location.origin is "null" (the literal string value) in Firefox
    // under certain conditions, notably when serving from a local HTML file
    // See https://bugzilla.mozilla.org/show_bug.cgi?id=878297
    let base = window.location.origin !== "null" ? window.location.origin : window.location.href;
    let href = typeof to === "string" ? to : createPath(to);
    invariant(base, "No window.location.(origin|href) available to create URL for href: " + href);
    return new URL(href, base);
  }

  let history = {
    get action() {
      return action;
    },

    get location() {
      return getLocation(window, globalHistory);
    },

    listen(fn) {
      if (listener) {
        throw new Error("A history only accepts one active listener");
      }

      window.addEventListener(PopStateEventType, handlePop);
      listener = fn;
      return () => {
        window.removeEventListener(PopStateEventType, handlePop);
        listener = null;
      };
    },

    createHref(to) {
      return createHref(window, to);
    },

    createURL,

    encodeLocation(to) {
      // Encode a Location the same way window.location would
      let url = createURL(to);
      return {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash
      };
    },

    push,
    replace,

    go(n) {
      return globalHistory.go(n);
    }

  };
  return history;
} //#endregion

var ResultType;

(function (ResultType) {
  ResultType["data"] = "data";
  ResultType["deferred"] = "deferred";
  ResultType["redirect"] = "redirect";
  ResultType["error"] = "error";
})(ResultType || (ResultType = {}));

const immutableRouteKeys = new Set(["lazy", "caseSensitive", "path", "id", "index", "children"]);

function isIndexRoute(route) {
  return route.index === true;
} // Walk the route tree generating unique IDs where necessary so we are working
// solely with AgnosticDataRouteObject's within the Router


function convertRoutesToDataRoutes(routes, mapRouteProperties, parentPath, manifest) {
  if (parentPath === void 0) {
    parentPath = [];
  }

  if (manifest === void 0) {
    manifest = {};
  }

  return routes.map((route, index) => {
    let treePath = [...parentPath, index];
    let id = typeof route.id === "string" ? route.id : treePath.join("-");
    invariant(route.index !== true || !route.children, "Cannot specify children on an index route");
    invariant(!manifest[id], "Found a route id collision on id \"" + id + "\".  Route " + "id's must be globally unique within Data Router usages");

    if (isIndexRoute(route)) {
      let indexRoute = _extends({}, route, mapRouteProperties(route), {
        id
      });

      manifest[id] = indexRoute;
      return indexRoute;
    } else {
      let pathOrLayoutRoute = _extends({}, route, mapRouteProperties(route), {
        id,
        children: undefined
      });

      manifest[id] = pathOrLayoutRoute;

      if (route.children) {
        pathOrLayoutRoute.children = convertRoutesToDataRoutes(route.children, mapRouteProperties, treePath, manifest);
      }

      return pathOrLayoutRoute;
    }
  });
}
/**
 * Matches the given routes to a location and returns the match data.
 *
 * @see https://reactrouter.com/utils/match-routes
 */

function matchRoutes(routes, locationArg, basename) {
  if (basename === void 0) {
    basename = "/";
  }

  let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
  let pathname = stripBasename(location.pathname || "/", basename);

  if (pathname == null) {
    return null;
  }

  let branches = flattenRoutes(routes);
  rankRouteBranches(branches);
  let matches = null;

  for (let i = 0; matches == null && i < branches.length; ++i) {
    matches = matchRouteBranch(branches[i], // Incoming pathnames are generally encoded from either window.location
    // or from router.navigate, but we want to match against the unencoded
    // paths in the route definitions.  Memory router locations won't be
    // encoded here but there also shouldn't be anything to decode so this
    // should be a safe operation.  This avoids needing matchRoutes to be
    // history-aware.
    safelyDecodeURI(pathname));
  }

  return matches;
}

function flattenRoutes(routes, branches, parentsMeta, parentPath) {
  if (branches === void 0) {
    branches = [];
  }

  if (parentsMeta === void 0) {
    parentsMeta = [];
  }

  if (parentPath === void 0) {
    parentPath = "";
  }

  let flattenRoute = (route, index, relativePath) => {
    let meta = {
      relativePath: relativePath === undefined ? route.path || "" : relativePath,
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index,
      route
    };

    if (meta.relativePath.startsWith("/")) {
      invariant(meta.relativePath.startsWith(parentPath), "Absolute route path \"" + meta.relativePath + "\" nested under path " + ("\"" + parentPath + "\" is not valid. An absolute child route path ") + "must start with the combined path of all its parent routes.");
      meta.relativePath = meta.relativePath.slice(parentPath.length);
    }

    let path = joinPaths([parentPath, meta.relativePath]);
    let routesMeta = parentsMeta.concat(meta); // Add the children before adding this route to the array so we traverse the
    // route tree depth-first and child routes appear before their parents in
    // the "flattened" version.

    if (route.children && route.children.length > 0) {
      invariant( // Our types know better, but runtime JS may not!
      // @ts-expect-error
      route.index !== true, "Index routes must not have child routes. Please remove " + ("all child routes from route path \"" + path + "\"."));
      flattenRoutes(route.children, branches, routesMeta, path);
    } // Routes without a path shouldn't ever match by themselves unless they are
    // index routes, so don't add them to the list of possible branches.


    if (route.path == null && !route.index) {
      return;
    }

    branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta
    });
  };

  routes.forEach((route, index) => {
    var _route$path;

    // coarse-grain check for optional params
    if (route.path === "" || !((_route$path = route.path) != null && _route$path.includes("?"))) {
      flattenRoute(route, index);
    } else {
      for (let exploded of explodeOptionalSegments(route.path)) {
        flattenRoute(route, index, exploded);
      }
    }
  });
  return branches;
}
/**
 * Computes all combinations of optional path segments for a given path,
 * excluding combinations that are ambiguous and of lower priority.
 *
 * For example, `/one/:two?/three/:four?/:five?` explodes to:
 * - `/one/three`
 * - `/one/:two/three`
 * - `/one/three/:four`
 * - `/one/three/:five`
 * - `/one/:two/three/:four`
 * - `/one/:two/three/:five`
 * - `/one/three/:four/:five`
 * - `/one/:two/three/:four/:five`
 */


function explodeOptionalSegments(path) {
  let segments = path.split("/");
  if (segments.length === 0) return [];
  let [first, ...rest] = segments; // Optional path segments are denoted by a trailing `?`

  let isOptional = first.endsWith("?"); // Compute the corresponding required segment: `foo?` -> `foo`

  let required = first.replace(/\?$/, "");

  if (rest.length === 0) {
    // Intepret empty string as omitting an optional segment
    // `["one", "", "three"]` corresponds to omitting `:two` from `/one/:two?/three` -> `/one/three`
    return isOptional ? [required, ""] : [required];
  }

  let restExploded = explodeOptionalSegments(rest.join("/"));
  let result = []; // All child paths with the prefix.  Do this for all children before the
  // optional version for all children so we get consistent ordering where the
  // parent optional aspect is preferred as required.  Otherwise, we can get
  // child sections interspersed where deeper optional segments are higher than
  // parent optional segments, where for example, /:two would explodes _earlier_
  // then /:one.  By always including the parent as required _for all children_
  // first, we avoid this issue

  result.push(...restExploded.map(subpath => subpath === "" ? required : [required, subpath].join("/"))); // Then if this is an optional value, add all child versions without

  if (isOptional) {
    result.push(...restExploded);
  } // for absolute paths, ensure `/` instead of empty segment


  return result.map(exploded => path.startsWith("/") && exploded === "" ? "/" : exploded);
}

function rankRouteBranches(branches) {
  branches.sort((a, b) => a.score !== b.score ? b.score - a.score // Higher score first
  : compareIndexes(a.routesMeta.map(meta => meta.childrenIndex), b.routesMeta.map(meta => meta.childrenIndex)));
}

const paramRe = /^:\w+$/;
const dynamicSegmentValue = 3;
const indexRouteValue = 2;
const emptySegmentValue = 1;
const staticSegmentValue = 10;
const splatPenalty = -2;

const isSplat = s => s === "*";

function computeScore(path, index) {
  let segments = path.split("/");
  let initialScore = segments.length;

  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }

  if (index) {
    initialScore += indexRouteValue;
  }

  return segments.filter(s => !isSplat(s)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
}

function compareIndexes(a, b) {
  let siblings = a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]);
  return siblings ? // If two routes are siblings, we should try to match the earlier sibling
  // first. This allows people to have fine-grained control over the matching
  // behavior by simply putting routes with identical paths in the order they
  // want them tried.
  a[a.length - 1] - b[b.length - 1] : // Otherwise, it doesn't really make sense to rank non-siblings by index,
  // so they sort equally.
  0;
}

function matchRouteBranch(branch, pathname) {
  let {
    routesMeta
  } = branch;
  let matchedParams = {};
  let matchedPathname = "/";
  let matches = [];

  for (let i = 0; i < routesMeta.length; ++i) {
    let meta = routesMeta[i];
    let end = i === routesMeta.length - 1;
    let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    let match = matchPath({
      path: meta.relativePath,
      caseSensitive: meta.caseSensitive,
      end
    }, remainingPathname);
    if (!match) return null;
    Object.assign(matchedParams, match.params);
    let route = meta.route;
    matches.push({
      // TODO: Can this as be avoided?
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
      route
    });

    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }

  return matches;
}
/**
 * Returns a path with params interpolated.
 *
 * @see https://reactrouter.com/utils/generate-path
 */


function generatePath(originalPath, params) {
  if (params === void 0) {
    params = {};
  }

  let path = originalPath;

  if (path.endsWith("*") && path !== "*" && !path.endsWith("/*")) {
    warning(false, "Route path \"" + path + "\" will be treated as if it were " + ("\"" + path.replace(/\*$/, "/*") + "\" because the `*` character must ") + "always follow a `/` in the pattern. To get rid of this warning, " + ("please change the route path to \"" + path.replace(/\*$/, "/*") + "\"."));
    path = path.replace(/\*$/, "/*");
  } // ensure `/` is added at the beginning if the path is absolute


  const prefix = path.startsWith("/") ? "/" : "";
  const segments = path.split(/\/+/).map((segment, index, array) => {
    const isLastSegment = index === array.length - 1; // only apply the splat if it's the last segment

    if (isLastSegment && segment === "*") {
      const star = "*";
      const starParam = params[star]; // Apply the splat

      return starParam;
    }

    const keyMatch = segment.match(/^:(\w+)(\??)$/);

    if (keyMatch) {
      const [, key, optional] = keyMatch;
      let param = params[key];

      if (optional === "?") {
        return param == null ? "" : param;
      }

      if (param == null) {
        invariant(false, "Missing \":" + key + "\" param");
      }

      return param;
    } // Remove any optional markers from optional static segments


    return segment.replace(/\?$/g, "");
  }) // Remove empty segments
  .filter(segment => !!segment);
  return prefix + segments.join("/");
}
/**
 * Performs pattern matching on a URL pathname and returns information about
 * the match.
 *
 * @see https://reactrouter.com/utils/match-path
 */

function matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = {
      path: pattern,
      caseSensitive: false,
      end: true
    };
  }

  let [matcher, paramNames] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
  let match = pathname.match(matcher);
  if (!match) return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = paramNames.reduce((memo, paramName, index) => {
    // We need to compute the pathnameBase here using the raw splat value
    // instead of using params["*"] later because it will be decoded then
    if (paramName === "*") {
      let splatValue = captureGroups[index] || "";
      pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
    }

    memo[paramName] = safelyDecodeURIComponent(captureGroups[index] || "", paramName);
    return memo;
  }, {});
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}

function compilePath(path, caseSensitive, end) {
  if (caseSensitive === void 0) {
    caseSensitive = false;
  }

  if (end === void 0) {
    end = true;
  }

  warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), "Route path \"" + path + "\" will be treated as if it were " + ("\"" + path.replace(/\*$/, "/*") + "\" because the `*` character must ") + "always follow a `/` in the pattern. To get rid of this warning, " + ("please change the route path to \"" + path.replace(/\*$/, "/*") + "\"."));
  let paramNames = [];
  let regexpSource = "^" + path.replace(/\/*\*?$/, "") // Ignore trailing / and /*, we'll handle it below
  .replace(/^\/*/, "/") // Make sure it has a leading /
  .replace(/[\\.*+^$?{}|()[\]]/g, "\\$&") // Escape special regex chars
  .replace(/\/:(\w+)/g, (_, paramName) => {
    paramNames.push(paramName);
    return "/([^\\/]+)";
  });

  if (path.endsWith("*")) {
    paramNames.push("*");
    regexpSource += path === "*" || path === "/*" ? "(.*)$" // Already matched the initial /, just match the rest
    : "(?:\\/(.+)|\\/*)$"; // Don't include the / in params["*"]
  } else if (end) {
    // When matching to the end, ignore trailing slashes
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    // If our path is non-empty and contains anything beyond an initial slash,
    // then we have _some_ form of path in our regex so we should expect to
    // match only if we find the end of this path segment.  Look for an optional
    // non-captured trailing slash (to match a portion of the URL) or the end
    // of the path (if we've matched to the end).  We used to do this with a
    // word boundary but that gives false positives on routes like
    // /user-preferences since `-` counts as a word boundary.
    regexpSource += "(?:(?=\\/|$))";
  } else ;

  let matcher = new RegExp(regexpSource, caseSensitive ? undefined : "i");
  return [matcher, paramNames];
}

function safelyDecodeURI(value) {
  try {
    return decodeURI(value);
  } catch (error) {
    warning(false, "The URL path \"" + value + "\" could not be decoded because it is is a " + "malformed URL segment. This is probably due to a bad percent " + ("encoding (" + error + ")."));
    return value;
  }
}

function safelyDecodeURIComponent(value, paramName) {
  try {
    return decodeURIComponent(value);
  } catch (error) {
    warning(false, "The value for the URL param \"" + paramName + "\" will not be decoded because" + (" the string \"" + value + "\" is a malformed URL segment. This is probably") + (" due to a bad percent encoding (" + error + ")."));
    return value;
  }
}
/**
 * @private
 */


function stripBasename(pathname, basename) {
  if (basename === "/") return pathname;

  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  } // We want to leave trailing slash behavior in the user's control, so if they
  // specify a basename with a trailing slash, we should support it


  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
  let nextChar = pathname.charAt(startIndex);

  if (nextChar && nextChar !== "/") {
    // pathname does not start with basename/
    return null;
  }

  return pathname.slice(startIndex) || "/";
}
/**
 * Returns a resolved path object relative to the given pathname.
 *
 * @see https://reactrouter.com/utils/resolve-path
 */

function resolvePath(to, fromPathname) {
  if (fromPathname === void 0) {
    fromPathname = "/";
  }

  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to === "string" ? parsePath(to) : to;
  let pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}

function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  let relativeSegments = relativePath.split("/");
  relativeSegments.forEach(segment => {
    if (segment === "..") {
      // Keep the root "" segment so the pathname starts at /
      if (segments.length > 1) segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}

function getInvalidPathError(char, field, dest, path) {
  return "Cannot include a '" + char + "' character in a manually specified " + ("`to." + field + "` field [" + JSON.stringify(path) + "].  Please separate it out to the ") + ("`to." + dest + "` field. Alternatively you may provide the full path as ") + "a string in <Link to=\"...\"> and the router will parse it for you.";
}
/**
 * @private
 *
 * When processing relative navigation we want to ignore ancestor routes that
 * do not contribute to the path, such that index/pathless layout routes don't
 * interfere.
 *
 * For example, when moving a route element into an index route and/or a
 * pathless layout route, relative link behavior contained within should stay
 * the same.  Both of the following examples should link back to the root:
 *
 *   <Route path="/">
 *     <Route path="accounts" element={<Link to=".."}>
 *   </Route>
 *
 *   <Route path="/">
 *     <Route path="accounts">
 *       <Route element={<AccountsLayout />}>       // <-- Does not contribute
 *         <Route index element={<Link to=".."} />  // <-- Does not contribute
 *       </Route
 *     </Route>
 *   </Route>
 */


function getPathContributingMatches(matches) {
  return matches.filter((match, index) => index === 0 || match.route.path && match.route.path.length > 0);
}
/**
 * @private
 */

function resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
  if (isPathRelative === void 0) {
    isPathRelative = false;
  }

  let to;

  if (typeof toArg === "string") {
    to = parsePath(toArg);
  } else {
    to = _extends({}, toArg);
    invariant(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to));
    invariant(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to));
    invariant(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to));
  }

  let isEmptyPath = toArg === "" || to.pathname === "";
  let toPathname = isEmptyPath ? "/" : to.pathname;
  let from; // Routing is relative to the current pathname if explicitly requested.
  //
  // If a pathname is explicitly provided in `to`, it should be relative to the
  // route context. This is explained in `Note on `<Link to>` values` in our
  // migration guide from v5 as a means of disambiguation between `to` values
  // that begin with `/` and those that do not. However, this is problematic for
  // `to` values that do not provide a pathname. `to` can simply be a search or
  // hash string, in which case we should assume that the navigation is relative
  // to the current location's pathname and *not* the route pathname.

  if (isPathRelative || toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;

    if (toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/"); // Each leading .. segment means "go up one route" instead of "go up one
      // URL segment".  This is a key difference from how <a href> works and a
      // major reason we call this a "to" value instead of a "href".

      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }

      to.pathname = toSegments.join("/");
    } // If there are more ".." segments than parent routes, resolve relative to
    // the root / URL.


    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }

  let path = resolvePath(to, from); // Ensure the pathname has a trailing slash if the original "to" had one

  let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/"); // Or if this was a link to the current path which has a trailing slash

  let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");

  if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
    path.pathname += "/";
  }

  return path;
}
/**
 * @private
 */

function getToPathname(to) {
  // Empty strings should be treated the same as / paths
  return to === "" || to.pathname === "" ? "/" : typeof to === "string" ? parsePath(to).pathname : to.pathname;
}
/**
 * @private
 */

const joinPaths = paths => paths.join("/").replace(/\/\/+/g, "/");
/**
 * @private
 */

const normalizePathname = pathname => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
/**
 * @private
 */

const normalizeSearch = search => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
/**
 * @private
 */

const normalizeHash = hash => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
/**
 * This is a shortcut for creating `application/json` responses. Converts `data`
 * to JSON and sets the `Content-Type` header.
 */

const json = function json(data, init) {
  if (init === void 0) {
    init = {};
  }

  let responseInit = typeof init === "number" ? {
    status: init
  } : init;
  let headers = new Headers(responseInit.headers);

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json; charset=utf-8");
  }

  return new Response(JSON.stringify(data), _extends({}, responseInit, {
    headers
  }));
};
class AbortedDeferredError extends Error {}
class DeferredData {
  constructor(data, responseInit) {
    this.pendingKeysSet = new Set();
    this.subscribers = new Set();
    this.deferredKeys = [];
    invariant(data && typeof data === "object" && !Array.isArray(data), "defer() only accepts plain objects"); // Set up an AbortController + Promise we can race against to exit early
    // cancellation

    let reject;
    this.abortPromise = new Promise((_, r) => reject = r);
    this.controller = new AbortController();

    let onAbort = () => reject(new AbortedDeferredError("Deferred data aborted"));

    this.unlistenAbortSignal = () => this.controller.signal.removeEventListener("abort", onAbort);

    this.controller.signal.addEventListener("abort", onAbort);
    this.data = Object.entries(data).reduce((acc, _ref) => {
      let [key, value] = _ref;
      return Object.assign(acc, {
        [key]: this.trackPromise(key, value)
      });
    }, {});

    if (this.done) {
      // All incoming values were resolved
      this.unlistenAbortSignal();
    }

    this.init = responseInit;
  }

  trackPromise(key, value) {
    if (!(value instanceof Promise)) {
      return value;
    }

    this.deferredKeys.push(key);
    this.pendingKeysSet.add(key); // We store a little wrapper promise that will be extended with
    // _data/_error props upon resolve/reject

    let promise = Promise.race([value, this.abortPromise]).then(data => this.onSettle(promise, key, null, data), error => this.onSettle(promise, key, error)); // Register rejection listeners to avoid uncaught promise rejections on
    // errors or aborted deferred values

    promise.catch(() => {});
    Object.defineProperty(promise, "_tracked", {
      get: () => true
    });
    return promise;
  }

  onSettle(promise, key, error, data) {
    if (this.controller.signal.aborted && error instanceof AbortedDeferredError) {
      this.unlistenAbortSignal();
      Object.defineProperty(promise, "_error", {
        get: () => error
      });
      return Promise.reject(error);
    }

    this.pendingKeysSet.delete(key);

    if (this.done) {
      // Nothing left to abort!
      this.unlistenAbortSignal();
    }

    if (error) {
      Object.defineProperty(promise, "_error", {
        get: () => error
      });
      this.emit(false, key);
      return Promise.reject(error);
    }

    Object.defineProperty(promise, "_data", {
      get: () => data
    });
    this.emit(false, key);
    return data;
  }

  emit(aborted, settledKey) {
    this.subscribers.forEach(subscriber => subscriber(aborted, settledKey));
  }

  subscribe(fn) {
    this.subscribers.add(fn);
    return () => this.subscribers.delete(fn);
  }

  cancel() {
    this.controller.abort();
    this.pendingKeysSet.forEach((v, k) => this.pendingKeysSet.delete(k));
    this.emit(true);
  }

  async resolveData(signal) {
    let aborted = false;

    if (!this.done) {
      let onAbort = () => this.cancel();

      signal.addEventListener("abort", onAbort);
      aborted = await new Promise(resolve => {
        this.subscribe(aborted => {
          signal.removeEventListener("abort", onAbort);

          if (aborted || this.done) {
            resolve(aborted);
          }
        });
      });
    }

    return aborted;
  }

  get done() {
    return this.pendingKeysSet.size === 0;
  }

  get unwrappedData() {
    invariant(this.data !== null && this.done, "Can only unwrap data on initialized and settled deferreds");
    return Object.entries(this.data).reduce((acc, _ref2) => {
      let [key, value] = _ref2;
      return Object.assign(acc, {
        [key]: unwrapTrackedPromise(value)
      });
    }, {});
  }

  get pendingKeys() {
    return Array.from(this.pendingKeysSet);
  }

}

function isTrackedPromise(value) {
  return value instanceof Promise && value._tracked === true;
}

function unwrapTrackedPromise(value) {
  if (!isTrackedPromise(value)) {
    return value;
  }

  if (value._error) {
    throw value._error;
  }

  return value._data;
}

const defer = function defer(data, init) {
  if (init === void 0) {
    init = {};
  }

  let responseInit = typeof init === "number" ? {
    status: init
  } : init;
  return new DeferredData(data, responseInit);
};
/**
 * A redirect response. Sets the status code and the `Location` header.
 * Defaults to "302 Found".
 */

const redirect = function redirect(url, init) {
  if (init === void 0) {
    init = 302;
  }

  let responseInit = init;

  if (typeof responseInit === "number") {
    responseInit = {
      status: responseInit
    };
  } else if (typeof responseInit.status === "undefined") {
    responseInit.status = 302;
  }

  let headers = new Headers(responseInit.headers);
  headers.set("Location", url);
  return new Response(null, _extends({}, responseInit, {
    headers
  }));
};
/**
 * @private
 * Utility class we use to hold auto-unwrapped 4xx/5xx Response bodies
 */

class ErrorResponse {
  constructor(status, statusText, data, internal) {
    if (internal === void 0) {
      internal = false;
    }

    this.status = status;
    this.statusText = statusText || "";
    this.internal = internal;

    if (data instanceof Error) {
      this.data = data.toString();
      this.error = data;
    } else {
      this.data = data;
    }
  }

}
/**
 * Check if the given error is an ErrorResponse generated from a 4xx/5xx
 * Response thrown from an action/loader
 */

function isRouteErrorResponse(error) {
  return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
}

const validMutationMethodsArr = ["post", "put", "patch", "delete"];
const validMutationMethods = new Set(validMutationMethodsArr);
const validRequestMethodsArr = ["get", ...validMutationMethodsArr];
const validRequestMethods = new Set(validRequestMethodsArr);
const redirectStatusCodes = new Set([301, 302, 303, 307, 308]);
const redirectPreserveMethodStatusCodes = new Set([307, 308]);
const IDLE_NAVIGATION = {
  state: "idle",
  location: undefined,
  formMethod: undefined,
  formAction: undefined,
  formEncType: undefined,
  formData: undefined
};
const IDLE_FETCHER = {
  state: "idle",
  data: undefined,
  formMethod: undefined,
  formAction: undefined,
  formEncType: undefined,
  formData: undefined
};
const IDLE_BLOCKER = {
  state: "unblocked",
  proceed: undefined,
  reset: undefined,
  location: undefined
};
const ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
const isServer = !isBrowser;

const defaultMapRouteProperties = route => ({
  hasErrorBoundary: Boolean(route.hasErrorBoundary)
}); //#endregion
////////////////////////////////////////////////////////////////////////////////
//#region createRouter
////////////////////////////////////////////////////////////////////////////////

/**
 * Create a router and listen to history POP navigations
 */


function createRouter(init) {
  invariant(init.routes.length > 0, "You must provide a non-empty routes array to createRouter");
  let mapRouteProperties;

  if (init.mapRouteProperties) {
    mapRouteProperties = init.mapRouteProperties;
  } else if (init.detectErrorBoundary) {
    // If they are still using the deprecated version, wrap it with the new API
    let detectErrorBoundary = init.detectErrorBoundary;

    mapRouteProperties = route => ({
      hasErrorBoundary: detectErrorBoundary(route)
    });
  } else {
    mapRouteProperties = defaultMapRouteProperties;
  } // Routes keyed by ID


  let manifest = {}; // Routes in tree format for matching

  let dataRoutes = convertRoutesToDataRoutes(init.routes, mapRouteProperties, undefined, manifest);
  let inFlightDataRoutes;
  let basename = init.basename || "/"; // Config driven behavior flags

  let future = _extends({
    v7_normalizeFormMethod: false,
    v7_prependBasename: false
  }, init.future); // Cleanup function for history


  let unlistenHistory = null; // Externally-provided functions to call on all state changes

  let subscribers = new Set(); // Externally-provided object to hold scroll restoration locations during routing

  let savedScrollPositions = null; // Externally-provided function to get scroll restoration keys

  let getScrollRestorationKey = null; // Externally-provided function to get current scroll position

  let getScrollPosition = null; // One-time flag to control the initial hydration scroll restoration.  Because
  // we don't get the saved positions from <ScrollRestoration /> until _after_
  // the initial render, we need to manually trigger a separate updateState to
  // send along the restoreScrollPosition
  // Set to true if we have `hydrationData` since we assume we were SSR'd and that
  // SSR did the initial scroll restoration.

  let initialScrollRestored = init.hydrationData != null;
  let initialMatches = matchRoutes(dataRoutes, init.history.location, basename);
  let initialErrors = null;

  if (initialMatches == null) {
    // If we do not match a user-provided-route, fall back to the root
    // to allow the error boundary to take over
    let error = getInternalRouterError(404, {
      pathname: init.history.location.pathname
    });
    let {
      matches,
      route
    } = getShortCircuitMatches(dataRoutes);
    initialMatches = matches;
    initialErrors = {
      [route.id]: error
    };
  }

  let initialized = // All initialMatches need to be loaded before we're ready.  If we have lazy
  // functions around still then we'll need to run them in initialize()
  !initialMatches.some(m => m.route.lazy) && ( // And we have to either have no loaders or have been provided hydrationData
  !initialMatches.some(m => m.route.loader) || init.hydrationData != null);
  let router;
  let state = {
    historyAction: init.history.action,
    location: init.history.location,
    matches: initialMatches,
    initialized,
    navigation: IDLE_NAVIGATION,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: init.hydrationData != null ? false : null,
    preventScrollReset: false,
    revalidation: "idle",
    loaderData: init.hydrationData && init.hydrationData.loaderData || {},
    actionData: init.hydrationData && init.hydrationData.actionData || null,
    errors: init.hydrationData && init.hydrationData.errors || initialErrors,
    fetchers: new Map(),
    blockers: new Map()
  }; // -- Stateful internal variables to manage navigations --
  // Current navigation in progress (to be committed in completeNavigation)

  let pendingAction = Action.Pop; // Should the current navigation prevent the scroll reset if scroll cannot
  // be restored?

  let pendingPreventScrollReset = false; // AbortController for the active navigation

  let pendingNavigationController; // We use this to avoid touching history in completeNavigation if a
  // revalidation is entirely uninterrupted

  let isUninterruptedRevalidation = false; // Use this internal flag to force revalidation of all loaders:
  //  - submissions (completed or interrupted)
  //  - useRevalidator()
  //  - X-Remix-Revalidate (from redirect)

  let isRevalidationRequired = false; // Use this internal array to capture routes that require revalidation due
  // to a cancelled deferred on action submission

  let cancelledDeferredRoutes = []; // Use this internal array to capture fetcher loads that were cancelled by an
  // action navigation and require revalidation

  let cancelledFetcherLoads = []; // AbortControllers for any in-flight fetchers

  let fetchControllers = new Map(); // Track loads based on the order in which they started

  let incrementingLoadId = 0; // Track the outstanding pending navigation data load to be compared against
  // the globally incrementing load when a fetcher load lands after a completed
  // navigation

  let pendingNavigationLoadId = -1; // Fetchers that triggered data reloads as a result of their actions

  let fetchReloadIds = new Map(); // Fetchers that triggered redirect navigations

  let fetchRedirectIds = new Set(); // Most recent href/match for fetcher.load calls for fetchers

  let fetchLoadMatches = new Map(); // Store DeferredData instances for active route matches.  When a
  // route loader returns defer() we stick one in here.  Then, when a nested
  // promise resolves we update loaderData.  If a new navigation starts we
  // cancel active deferreds for eliminated routes.

  let activeDeferreds = new Map(); // Store blocker functions in a separate Map outside of router state since
  // we don't need to update UI state if they change

  let blockerFunctions = new Map(); // Flag to ignore the next history update, so we can revert the URL change on
  // a POP navigation that was blocked by the user without touching router state

  let ignoreNextHistoryUpdate = false; // Initialize the router, all side effects should be kicked off from here.
  // Implemented as a Fluent API for ease of:
  //   let router = createRouter(init).initialize();

  function initialize() {
    // If history informs us of a POP navigation, start the navigation but do not update
    // state.  We'll update our own state once the navigation completes
    unlistenHistory = init.history.listen(_ref => {
      let {
        action: historyAction,
        location,
        delta
      } = _ref;

      // Ignore this event if it was just us resetting the URL from a
      // blocked POP navigation
      if (ignoreNextHistoryUpdate) {
        ignoreNextHistoryUpdate = false;
        return;
      }

      warning(blockerFunctions.size === 0 || delta != null, "You are trying to use a blocker on a POP navigation to a location " + "that was not created by @remix-run/router. This will fail silently in " + "production. This can happen if you are navigating outside the router " + "via `window.history.pushState`/`window.location.hash` instead of using " + "router navigation APIs.  This can also happen if you are using " + "createHashRouter and the user manually changes the URL.");
      let blockerKey = shouldBlockNavigation({
        currentLocation: state.location,
        nextLocation: location,
        historyAction
      });

      if (blockerKey && delta != null) {
        // Restore the URL to match the current UI, but don't update router state
        ignoreNextHistoryUpdate = true;
        init.history.go(delta * -1); // Put the blocker into a blocked state

        updateBlocker(blockerKey, {
          state: "blocked",
          location,

          proceed() {
            updateBlocker(blockerKey, {
              state: "proceeding",
              proceed: undefined,
              reset: undefined,
              location
            }); // Re-do the same POP navigation we just blocked

            init.history.go(delta);
          },

          reset() {
            deleteBlocker(blockerKey);
            updateState({
              blockers: new Map(router.state.blockers)
            });
          }

        });
        return;
      }

      return startNavigation(historyAction, location);
    }); // Kick off initial data load if needed.  Use Pop to avoid modifying history
    // Note we don't do any handling of lazy here.  For SPA's it'll get handled
    // in the normal navigation flow.  For SSR it's expected that lazy modules are
    // resolved prior to router creation since we can't go into a fallbackElement
    // UI for SSR'd apps

    if (!state.initialized) {
      startNavigation(Action.Pop, state.location);
    }

    return router;
  } // Clean up a router and it's side effects


  function dispose() {
    if (unlistenHistory) {
      unlistenHistory();
    }

    subscribers.clear();
    pendingNavigationController && pendingNavigationController.abort();
    state.fetchers.forEach((_, key) => deleteFetcher(key));
    state.blockers.forEach((_, key) => deleteBlocker(key));
  } // Subscribe to state updates for the router


  function subscribe(fn) {
    subscribers.add(fn);
    return () => subscribers.delete(fn);
  } // Update our state and notify the calling context of the change


  function updateState(newState) {
    state = _extends({}, state, newState);
    subscribers.forEach(subscriber => subscriber(state));
  } // Complete a navigation returning the state.navigation back to the IDLE_NAVIGATION
  // and setting state.[historyAction/location/matches] to the new route.
  // - Location is a required param
  // - Navigation will always be set to IDLE_NAVIGATION
  // - Can pass any other state in newState


  function completeNavigation(location, newState) {
    var _location$state, _location$state2;

    // Deduce if we're in a loading/actionReload state:
    // - We have committed actionData in the store
    // - The current navigation was a mutation submission
    // - We're past the submitting state and into the loading state
    // - The location being loaded is not the result of a redirect
    let isActionReload = state.actionData != null && state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && state.navigation.state === "loading" && ((_location$state = location.state) == null ? void 0 : _location$state._isRedirect) !== true;
    let actionData;

    if (newState.actionData) {
      if (Object.keys(newState.actionData).length > 0) {
        actionData = newState.actionData;
      } else {
        // Empty actionData -> clear prior actionData due to an action error
        actionData = null;
      }
    } else if (isActionReload) {
      // Keep the current data if we're wrapping up the action reload
      actionData = state.actionData;
    } else {
      // Clear actionData on any other completed navigations
      actionData = null;
    } // Always preserve any existing loaderData from re-used routes


    let loaderData = newState.loaderData ? mergeLoaderData(state.loaderData, newState.loaderData, newState.matches || [], newState.errors) : state.loaderData; // On a successful navigation we can assume we got through all blockers
    // so we can start fresh

    for (let [key] of blockerFunctions) {
      deleteBlocker(key);
    } // Always respect the user flag.  Otherwise don't reset on mutation
    // submission navigations unless they redirect


    let preventScrollReset = pendingPreventScrollReset === true || state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && ((_location$state2 = location.state) == null ? void 0 : _location$state2._isRedirect) !== true;

    if (inFlightDataRoutes) {
      dataRoutes = inFlightDataRoutes;
      inFlightDataRoutes = undefined;
    }

    updateState(_extends({}, newState, {
      actionData,
      loaderData,
      historyAction: pendingAction,
      location,
      initialized: true,
      navigation: IDLE_NAVIGATION,
      revalidation: "idle",
      restoreScrollPosition: getSavedScrollPosition(location, newState.matches || state.matches),
      preventScrollReset,
      blockers: new Map(state.blockers)
    }));

    if (isUninterruptedRevalidation) ; else if (pendingAction === Action.Pop) ; else if (pendingAction === Action.Push) {
      init.history.push(location, location.state);
    } else if (pendingAction === Action.Replace) {
      init.history.replace(location, location.state);
    } // Reset stateful navigation vars


    pendingAction = Action.Pop;
    pendingPreventScrollReset = false;
    isUninterruptedRevalidation = false;
    isRevalidationRequired = false;
    cancelledDeferredRoutes = [];
    cancelledFetcherLoads = [];
  } // Trigger a navigation event, which can either be a numerical POP or a PUSH
  // replace with an optional submission


  async function navigate(to, opts) {
    if (typeof to === "number") {
      init.history.go(to);
      return;
    }

    let normalizedPath = normalizeTo(state.location, state.matches, basename, future.v7_prependBasename, to, opts == null ? void 0 : opts.fromRouteId, opts == null ? void 0 : opts.relative);
    let {
      path,
      submission,
      error
    } = normalizeNavigateOptions(future.v7_normalizeFormMethod, false, normalizedPath, opts);
    let currentLocation = state.location;
    let nextLocation = createLocation(state.location, path, opts && opts.state); // When using navigate as a PUSH/REPLACE we aren't reading an already-encoded
    // URL from window.location, so we need to encode it here so the behavior
    // remains the same as POP and non-data-router usages.  new URL() does all
    // the same encoding we'd get from a history.pushState/window.location read
    // without having to touch history

    nextLocation = _extends({}, nextLocation, init.history.encodeLocation(nextLocation));
    let userReplace = opts && opts.replace != null ? opts.replace : undefined;
    let historyAction = Action.Push;

    if (userReplace === true) {
      historyAction = Action.Replace;
    } else if (userReplace === false) ; else if (submission != null && isMutationMethod(submission.formMethod) && submission.formAction === state.location.pathname + state.location.search) {
      // By default on submissions to the current location we REPLACE so that
      // users don't have to double-click the back button to get to the prior
      // location.  If the user redirects to a different location from the
      // action/loader this will be ignored and the redirect will be a PUSH
      historyAction = Action.Replace;
    }

    let preventScrollReset = opts && "preventScrollReset" in opts ? opts.preventScrollReset === true : undefined;
    let blockerKey = shouldBlockNavigation({
      currentLocation,
      nextLocation,
      historyAction
    });

    if (blockerKey) {
      // Put the blocker into a blocked state
      updateBlocker(blockerKey, {
        state: "blocked",
        location: nextLocation,

        proceed() {
          updateBlocker(blockerKey, {
            state: "proceeding",
            proceed: undefined,
            reset: undefined,
            location: nextLocation
          }); // Send the same navigation through

          navigate(to, opts);
        },

        reset() {
          deleteBlocker(blockerKey);
          updateState({
            blockers: new Map(state.blockers)
          });
        }

      });
      return;
    }

    return await startNavigation(historyAction, nextLocation, {
      submission,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: error,
      preventScrollReset,
      replace: opts && opts.replace
    });
  } // Revalidate all current loaders.  If a navigation is in progress or if this
  // is interrupted by a navigation, allow this to "succeed" by calling all
  // loaders during the next loader round


  function revalidate() {
    interruptActiveLoads();
    updateState({
      revalidation: "loading"
    }); // If we're currently submitting an action, we don't need to start a new
    // navigation, we'll just let the follow up loader execution call all loaders

    if (state.navigation.state === "submitting") {
      return;
    } // If we're currently in an idle state, start a new navigation for the current
    // action/location and mark it as uninterrupted, which will skip the history
    // update in completeNavigation


    if (state.navigation.state === "idle") {
      startNavigation(state.historyAction, state.location, {
        startUninterruptedRevalidation: true
      });
      return;
    } // Otherwise, if we're currently in a loading state, just start a new
    // navigation to the navigation.location but do not trigger an uninterrupted
    // revalidation so that history correctly updates once the navigation completes


    startNavigation(pendingAction || state.historyAction, state.navigation.location, {
      overrideNavigation: state.navigation
    });
  } // Start a navigation to the given action/location.  Can optionally provide a
  // overrideNavigation which will override the normalLoad in the case of a redirect
  // navigation


  async function startNavigation(historyAction, location, opts) {
    // Abort any in-progress navigations and start a new one. Unset any ongoing
    // uninterrupted revalidations unless told otherwise, since we want this
    // new navigation to update history normally
    pendingNavigationController && pendingNavigationController.abort();
    pendingNavigationController = null;
    pendingAction = historyAction;
    isUninterruptedRevalidation = (opts && opts.startUninterruptedRevalidation) === true; // Save the current scroll position every time we start a new navigation,
    // and track whether we should reset scroll on completion

    saveScrollPosition(state.location, state.matches);
    pendingPreventScrollReset = (opts && opts.preventScrollReset) === true;
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let loadingNavigation = opts && opts.overrideNavigation;
    let matches = matchRoutes(routesToUse, location, basename); // Short circuit with a 404 on the root error boundary if we match nothing

    if (!matches) {
      let error = getInternalRouterError(404, {
        pathname: location.pathname
      });
      let {
        matches: notFoundMatches,
        route
      } = getShortCircuitMatches(routesToUse); // Cancel all pending deferred on 404s since we don't keep any routes

      cancelActiveDeferreds();
      completeNavigation(location, {
        matches: notFoundMatches,
        loaderData: {},
        errors: {
          [route.id]: error
        }
      });
      return;
    } // Short circuit if it's only a hash change and not a mutation submission
    // For example, on /page#hash and submit a <Form method="post"> which will
    // default to a navigation to /page


    if (isHashChangeOnly(state.location, location) && !(opts && opts.submission && isMutationMethod(opts.submission.formMethod))) {
      completeNavigation(location, {
        matches
      });
      return;
    } // Create a controller/Request for this navigation


    pendingNavigationController = new AbortController();
    let request = createClientSideRequest(init.history, location, pendingNavigationController.signal, opts && opts.submission);
    let pendingActionData;
    let pendingError;

    if (opts && opts.pendingError) {
      // If we have a pendingError, it means the user attempted a GET submission
      // with binary FormData so assign here and skip to handleLoaders.  That
      // way we handle calling loaders above the boundary etc.  It's not really
      // different from an actionError in that sense.
      pendingError = {
        [findNearestBoundary(matches).route.id]: opts.pendingError
      };
    } else if (opts && opts.submission && isMutationMethod(opts.submission.formMethod)) {
      // Call action if we received an action submission
      let actionOutput = await handleAction(request, location, opts.submission, matches, {
        replace: opts.replace
      });

      if (actionOutput.shortCircuited) {
        return;
      }

      pendingActionData = actionOutput.pendingActionData;
      pendingError = actionOutput.pendingActionError;

      let navigation = _extends({
        state: "loading",
        location
      }, opts.submission);

      loadingNavigation = navigation; // Create a GET request for the loaders

      request = new Request(request.url, {
        signal: request.signal
      });
    } // Call loaders


    let {
      shortCircuited,
      loaderData,
      errors
    } = await handleLoaders(request, location, matches, loadingNavigation, opts && opts.submission, opts && opts.fetcherSubmission, opts && opts.replace, pendingActionData, pendingError);

    if (shortCircuited) {
      return;
    } // Clean up now that the action/loaders have completed.  Don't clean up if
    // we short circuited because pendingNavigationController will have already
    // been assigned to a new controller for the next navigation


    pendingNavigationController = null;
    completeNavigation(location, _extends({
      matches
    }, pendingActionData ? {
      actionData: pendingActionData
    } : {}, {
      loaderData,
      errors
    }));
  } // Call the action matched by the leaf route for this navigation and handle
  // redirects/errors


  async function handleAction(request, location, submission, matches, opts) {
    interruptActiveLoads(); // Put us in a submitting state

    let navigation = _extends({
      state: "submitting",
      location
    }, submission);

    updateState({
      navigation
    }); // Call our action and get the result

    let result;
    let actionMatch = getTargetMatch(matches, location);

    if (!actionMatch.route.action && !actionMatch.route.lazy) {
      result = {
        type: ResultType.error,
        error: getInternalRouterError(405, {
          method: request.method,
          pathname: location.pathname,
          routeId: actionMatch.route.id
        })
      };
    } else {
      result = await callLoaderOrAction("action", request, actionMatch, matches, manifest, mapRouteProperties, basename);

      if (request.signal.aborted) {
        return {
          shortCircuited: true
        };
      }
    }

    if (isRedirectResult(result)) {
      let replace;

      if (opts && opts.replace != null) {
        replace = opts.replace;
      } else {
        // If the user didn't explicity indicate replace behavior, replace if
        // we redirected to the exact same location we're currently at to avoid
        // double back-buttons
        replace = result.location === state.location.pathname + state.location.search;
      }

      await startRedirectNavigation(state, result, {
        submission,
        replace
      });
      return {
        shortCircuited: true
      };
    }

    if (isErrorResult(result)) {
      // Store off the pending error - we use it to determine which loaders
      // to call and will commit it when we complete the navigation
      let boundaryMatch = findNearestBoundary(matches, actionMatch.route.id); // By default, all submissions are REPLACE navigations, but if the
      // action threw an error that'll be rendered in an errorElement, we fall
      // back to PUSH so that the user can use the back button to get back to
      // the pre-submission form location to try again

      if ((opts && opts.replace) !== true) {
        pendingAction = Action.Push;
      }

      return {
        // Send back an empty object we can use to clear out any prior actionData
        pendingActionData: {},
        pendingActionError: {
          [boundaryMatch.route.id]: result.error
        }
      };
    }

    if (isDeferredResult(result)) {
      throw getInternalRouterError(400, {
        type: "defer-action"
      });
    }

    return {
      pendingActionData: {
        [actionMatch.route.id]: result.data
      }
    };
  } // Call all applicable loaders for the given matches, handling redirects,
  // errors, etc.


  async function handleLoaders(request, location, matches, overrideNavigation, submission, fetcherSubmission, replace, pendingActionData, pendingError) {
    // Figure out the right navigation we want to use for data loading
    let loadingNavigation = overrideNavigation;

    if (!loadingNavigation) {
      let navigation = _extends({
        state: "loading",
        location,
        formMethod: undefined,
        formAction: undefined,
        formEncType: undefined,
        formData: undefined
      }, submission);

      loadingNavigation = navigation;
    } // If this was a redirect from an action we don't have a "submission" but
    // we have it on the loading navigation so use that if available


    let activeSubmission = submission || fetcherSubmission ? submission || fetcherSubmission : loadingNavigation.formMethod && loadingNavigation.formAction && loadingNavigation.formData && loadingNavigation.formEncType ? {
      formMethod: loadingNavigation.formMethod,
      formAction: loadingNavigation.formAction,
      formData: loadingNavigation.formData,
      formEncType: loadingNavigation.formEncType
    } : undefined;
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(init.history, state, matches, activeSubmission, location, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, fetchLoadMatches, routesToUse, basename, pendingActionData, pendingError); // Cancel pending deferreds for no-longer-matched routes or routes we're
    // about to reload.  Note that if this is an action reload we would have
    // already cancelled all pending deferreds so this would be a no-op

    cancelActiveDeferreds(routeId => !(matches && matches.some(m => m.route.id === routeId)) || matchesToLoad && matchesToLoad.some(m => m.route.id === routeId)); // Short circuit if we have no loaders to run

    if (matchesToLoad.length === 0 && revalidatingFetchers.length === 0) {
      let updatedFetchers = markFetchRedirectsDone();
      completeNavigation(location, _extends({
        matches,
        loaderData: {},
        // Commit pending error if we're short circuiting
        errors: pendingError || null
      }, pendingActionData ? {
        actionData: pendingActionData
      } : {}, updatedFetchers ? {
        fetchers: new Map(state.fetchers)
      } : {}));
      return {
        shortCircuited: true
      };
    } // If this is an uninterrupted revalidation, we remain in our current idle
    // state.  If not, we need to switch to our loading state and load data,
    // preserving any new action data or existing action data (in the case of
    // a revalidation interrupting an actionReload)


    if (!isUninterruptedRevalidation) {
      revalidatingFetchers.forEach(rf => {
        let fetcher = state.fetchers.get(rf.key);
        let revalidatingFetcher = {
          state: "loading",
          data: fetcher && fetcher.data,
          formMethod: undefined,
          formAction: undefined,
          formEncType: undefined,
          formData: undefined,
          " _hasFetcherDoneAnything ": true
        };
        state.fetchers.set(rf.key, revalidatingFetcher);
      });
      let actionData = pendingActionData || state.actionData;
      updateState(_extends({
        navigation: loadingNavigation
      }, actionData ? Object.keys(actionData).length === 0 ? {
        actionData: null
      } : {
        actionData
      } : {}, revalidatingFetchers.length > 0 ? {
        fetchers: new Map(state.fetchers)
      } : {}));
    }

    pendingNavigationLoadId = ++incrementingLoadId;
    revalidatingFetchers.forEach(rf => {
      if (rf.controller) {
        // Fetchers use an independent AbortController so that aborting a fetcher
        // (via deleteFetcher) does not abort the triggering navigation that
        // triggered the revalidation
        fetchControllers.set(rf.key, rf.controller);
      }
    }); // Proxy navigation abort through to revalidation fetchers

    let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach(f => abortFetcher(f.key));

    if (pendingNavigationController) {
      pendingNavigationController.signal.addEventListener("abort", abortPendingFetchRevalidations);
    }

    let {
      results,
      loaderResults,
      fetcherResults
    } = await callLoadersAndMaybeResolveData(state.matches, matches, matchesToLoad, revalidatingFetchers, request);

    if (request.signal.aborted) {
      return {
        shortCircuited: true
      };
    } // Clean up _after_ loaders have completed.  Don't clean up if we short
    // circuited because fetchControllers would have been aborted and
    // reassigned to new controllers for the next navigation


    if (pendingNavigationController) {
      pendingNavigationController.signal.removeEventListener("abort", abortPendingFetchRevalidations);
    }

    revalidatingFetchers.forEach(rf => fetchControllers.delete(rf.key)); // If any loaders returned a redirect Response, start a new REPLACE navigation

    let redirect = findRedirect(results);

    if (redirect) {
      await startRedirectNavigation(state, redirect, {
        replace
      });
      return {
        shortCircuited: true
      };
    } // Process and commit output from loaders


    let {
      loaderData,
      errors
    } = processLoaderData(state, matches, matchesToLoad, loaderResults, pendingError, revalidatingFetchers, fetcherResults, activeDeferreds); // Wire up subscribers to update loaderData as promises settle

    activeDeferreds.forEach((deferredData, routeId) => {
      deferredData.subscribe(aborted => {
        // Note: No need to updateState here since the TrackedPromise on
        // loaderData is stable across resolve/reject
        // Remove this instance if we were aborted or if promises have settled
        if (aborted || deferredData.done) {
          activeDeferreds.delete(routeId);
        }
      });
    });
    let updatedFetchers = markFetchRedirectsDone();
    let didAbortFetchLoads = abortStaleFetchLoads(pendingNavigationLoadId);
    let shouldUpdateFetchers = updatedFetchers || didAbortFetchLoads || revalidatingFetchers.length > 0;
    return _extends({
      loaderData,
      errors
    }, shouldUpdateFetchers ? {
      fetchers: new Map(state.fetchers)
    } : {});
  }

  function getFetcher(key) {
    return state.fetchers.get(key) || IDLE_FETCHER;
  } // Trigger a fetcher load/submit for the given fetcher key


  function fetch(key, routeId, href, opts) {
    if (isServer) {
      throw new Error("router.fetch() was called during the server render, but it shouldn't be. " + "You are likely calling a useFetcher() method in the body of your component. " + "Try moving it to a useEffect or a callback.");
    }

    if (fetchControllers.has(key)) abortFetcher(key);
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let normalizedPath = normalizeTo(state.location, state.matches, basename, future.v7_prependBasename, href, routeId, opts == null ? void 0 : opts.relative);
    let matches = matchRoutes(routesToUse, normalizedPath, basename);

    if (!matches) {
      setFetcherError(key, routeId, getInternalRouterError(404, {
        pathname: normalizedPath
      }));
      return;
    }

    let {
      path,
      submission
    } = normalizeNavigateOptions(future.v7_normalizeFormMethod, true, normalizedPath, opts);
    let match = getTargetMatch(matches, path);
    pendingPreventScrollReset = (opts && opts.preventScrollReset) === true;

    if (submission && isMutationMethod(submission.formMethod)) {
      handleFetcherAction(key, routeId, path, match, matches, submission);
      return;
    } // Store off the match so we can call it's shouldRevalidate on subsequent
    // revalidations


    fetchLoadMatches.set(key, {
      routeId,
      path
    });
    handleFetcherLoader(key, routeId, path, match, matches, submission);
  } // Call the action for the matched fetcher.submit(), and then handle redirects,
  // errors, and revalidation


  async function handleFetcherAction(key, routeId, path, match, requestMatches, submission) {
    interruptActiveLoads();
    fetchLoadMatches.delete(key);

    if (!match.route.action && !match.route.lazy) {
      let error = getInternalRouterError(405, {
        method: submission.formMethod,
        pathname: path,
        routeId: routeId
      });
      setFetcherError(key, routeId, error);
      return;
    } // Put this fetcher into it's submitting state


    let existingFetcher = state.fetchers.get(key);

    let fetcher = _extends({
      state: "submitting"
    }, submission, {
      data: existingFetcher && existingFetcher.data,
      " _hasFetcherDoneAnything ": true
    });

    state.fetchers.set(key, fetcher);
    updateState({
      fetchers: new Map(state.fetchers)
    }); // Call the action for the fetcher

    let abortController = new AbortController();
    let fetchRequest = createClientSideRequest(init.history, path, abortController.signal, submission);
    fetchControllers.set(key, abortController);
    let actionResult = await callLoaderOrAction("action", fetchRequest, match, requestMatches, manifest, mapRouteProperties, basename);

    if (fetchRequest.signal.aborted) {
      // We can delete this so long as we weren't aborted by ou our own fetcher
      // re-submit which would have put _new_ controller is in fetchControllers
      if (fetchControllers.get(key) === abortController) {
        fetchControllers.delete(key);
      }

      return;
    }

    if (isRedirectResult(actionResult)) {
      fetchControllers.delete(key);
      fetchRedirectIds.add(key);

      let loadingFetcher = _extends({
        state: "loading"
      }, submission, {
        data: undefined,
        " _hasFetcherDoneAnything ": true
      });

      state.fetchers.set(key, loadingFetcher);
      updateState({
        fetchers: new Map(state.fetchers)
      });
      return startRedirectNavigation(state, actionResult, {
        submission,
        isFetchActionRedirect: true
      });
    } // Process any non-redirect errors thrown


    if (isErrorResult(actionResult)) {
      setFetcherError(key, routeId, actionResult.error);
      return;
    }

    if (isDeferredResult(actionResult)) {
      throw getInternalRouterError(400, {
        type: "defer-action"
      });
    } // Start the data load for current matches, or the next location if we're
    // in the middle of a navigation


    let nextLocation = state.navigation.location || state.location;
    let revalidationRequest = createClientSideRequest(init.history, nextLocation, abortController.signal);
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let matches = state.navigation.state !== "idle" ? matchRoutes(routesToUse, state.navigation.location, basename) : state.matches;
    invariant(matches, "Didn't find any matches after fetcher action");
    let loadId = ++incrementingLoadId;
    fetchReloadIds.set(key, loadId);

    let loadFetcher = _extends({
      state: "loading",
      data: actionResult.data
    }, submission, {
      " _hasFetcherDoneAnything ": true
    });

    state.fetchers.set(key, loadFetcher);
    let [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(init.history, state, matches, submission, nextLocation, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, fetchLoadMatches, routesToUse, basename, {
      [match.route.id]: actionResult.data
    }, undefined // No need to send through errors since we short circuit above
    ); // Put all revalidating fetchers into the loading state, except for the
    // current fetcher which we want to keep in it's current loading state which
    // contains it's action submission info + action data

    revalidatingFetchers.filter(rf => rf.key !== key).forEach(rf => {
      let staleKey = rf.key;
      let existingFetcher = state.fetchers.get(staleKey);
      let revalidatingFetcher = {
        state: "loading",
        data: existingFetcher && existingFetcher.data,
        formMethod: undefined,
        formAction: undefined,
        formEncType: undefined,
        formData: undefined,
        " _hasFetcherDoneAnything ": true
      };
      state.fetchers.set(staleKey, revalidatingFetcher);

      if (rf.controller) {
        fetchControllers.set(staleKey, rf.controller);
      }
    });
    updateState({
      fetchers: new Map(state.fetchers)
    });

    let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach(rf => abortFetcher(rf.key));

    abortController.signal.addEventListener("abort", abortPendingFetchRevalidations);
    let {
      results,
      loaderResults,
      fetcherResults
    } = await callLoadersAndMaybeResolveData(state.matches, matches, matchesToLoad, revalidatingFetchers, revalidationRequest);

    if (abortController.signal.aborted) {
      return;
    }

    abortController.signal.removeEventListener("abort", abortPendingFetchRevalidations);
    fetchReloadIds.delete(key);
    fetchControllers.delete(key);
    revalidatingFetchers.forEach(r => fetchControllers.delete(r.key));
    let redirect = findRedirect(results);

    if (redirect) {
      return startRedirectNavigation(state, redirect);
    } // Process and commit output from loaders


    let {
      loaderData,
      errors
    } = processLoaderData(state, state.matches, matchesToLoad, loaderResults, undefined, revalidatingFetchers, fetcherResults, activeDeferreds);
    let doneFetcher = {
      state: "idle",
      data: actionResult.data,
      formMethod: undefined,
      formAction: undefined,
      formEncType: undefined,
      formData: undefined,
      " _hasFetcherDoneAnything ": true
    };
    state.fetchers.set(key, doneFetcher);
    let didAbortFetchLoads = abortStaleFetchLoads(loadId); // If we are currently in a navigation loading state and this fetcher is
    // more recent than the navigation, we want the newer data so abort the
    // navigation and complete it with the fetcher data

    if (state.navigation.state === "loading" && loadId > pendingNavigationLoadId) {
      invariant(pendingAction, "Expected pending action");
      pendingNavigationController && pendingNavigationController.abort();
      completeNavigation(state.navigation.location, {
        matches,
        loaderData,
        errors,
        fetchers: new Map(state.fetchers)
      });
    } else {
      // otherwise just update with the fetcher data, preserving any existing
      // loaderData for loaders that did not need to reload.  We have to
      // manually merge here since we aren't going through completeNavigation
      updateState(_extends({
        errors,
        loaderData: mergeLoaderData(state.loaderData, loaderData, matches, errors)
      }, didAbortFetchLoads ? {
        fetchers: new Map(state.fetchers)
      } : {}));
      isRevalidationRequired = false;
    }
  } // Call the matched loader for fetcher.load(), handling redirects, errors, etc.


  async function handleFetcherLoader(key, routeId, path, match, matches, submission) {
    let existingFetcher = state.fetchers.get(key); // Put this fetcher into it's loading state

    let loadingFetcher = _extends({
      state: "loading",
      formMethod: undefined,
      formAction: undefined,
      formEncType: undefined,
      formData: undefined
    }, submission, {
      data: existingFetcher && existingFetcher.data,
      " _hasFetcherDoneAnything ": true
    });

    state.fetchers.set(key, loadingFetcher);
    updateState({
      fetchers: new Map(state.fetchers)
    }); // Call the loader for this fetcher route match

    let abortController = new AbortController();
    let fetchRequest = createClientSideRequest(init.history, path, abortController.signal);
    fetchControllers.set(key, abortController);
    let result = await callLoaderOrAction("loader", fetchRequest, match, matches, manifest, mapRouteProperties, basename); // Deferred isn't supported for fetcher loads, await everything and treat it
    // as a normal load.  resolveDeferredData will return undefined if this
    // fetcher gets aborted, so we just leave result untouched and short circuit
    // below if that happens

    if (isDeferredResult(result)) {
      result = (await resolveDeferredData(result, fetchRequest.signal, true)) || result;
    } // We can delete this so long as we weren't aborted by our our own fetcher
    // re-load which would have put _new_ controller is in fetchControllers


    if (fetchControllers.get(key) === abortController) {
      fetchControllers.delete(key);
    }

    if (fetchRequest.signal.aborted) {
      return;
    } // If the loader threw a redirect Response, start a new REPLACE navigation


    if (isRedirectResult(result)) {
      fetchRedirectIds.add(key);
      await startRedirectNavigation(state, result);
      return;
    } // Process any non-redirect errors thrown


    if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(state.matches, routeId);
      state.fetchers.delete(key); // TODO: In remix, this would reset to IDLE_NAVIGATION if it was a catch -
      // do we need to behave any differently with our non-redirect errors?
      // What if it was a non-redirect Response?

      updateState({
        fetchers: new Map(state.fetchers),
        errors: {
          [boundaryMatch.route.id]: result.error
        }
      });
      return;
    }

    invariant(!isDeferredResult(result), "Unhandled fetcher deferred data"); // Put the fetcher back into an idle state

    let doneFetcher = {
      state: "idle",
      data: result.data,
      formMethod: undefined,
      formAction: undefined,
      formEncType: undefined,
      formData: undefined,
      " _hasFetcherDoneAnything ": true
    };
    state.fetchers.set(key, doneFetcher);
    updateState({
      fetchers: new Map(state.fetchers)
    });
  }
  /**
   * Utility function to handle redirects returned from an action or loader.
   * Normally, a redirect "replaces" the navigation that triggered it.  So, for
   * example:
   *
   *  - user is on /a
   *  - user clicks a link to /b
   *  - loader for /b redirects to /c
   *
   * In a non-JS app the browser would track the in-flight navigation to /b and
   * then replace it with /c when it encountered the redirect response.  In
   * the end it would only ever update the URL bar with /c.
   *
   * In client-side routing using pushState/replaceState, we aim to emulate
   * this behavior and we also do not update history until the end of the
   * navigation (including processed redirects).  This means that we never
   * actually touch history until we've processed redirects, so we just use
   * the history action from the original navigation (PUSH or REPLACE).
   */


  async function startRedirectNavigation(state, redirect, _temp) {
    var _window;

    let {
      submission,
      replace,
      isFetchActionRedirect
    } = _temp === void 0 ? {} : _temp;

    if (redirect.revalidate) {
      isRevalidationRequired = true;
    }

    let redirectLocation = createLocation(state.location, redirect.location, // TODO: This can be removed once we get rid of useTransition in Remix v2
    _extends({
      _isRedirect: true
    }, isFetchActionRedirect ? {
      _isFetchActionRedirect: true
    } : {}));
    invariant(redirectLocation, "Expected a location on the redirect navigation"); // Check if this an absolute external redirect that goes to a new origin

    if (ABSOLUTE_URL_REGEX.test(redirect.location) && isBrowser && typeof ((_window = window) == null ? void 0 : _window.location) !== "undefined") {
      let url = init.history.createURL(redirect.location);
      let isDifferentBasename = stripBasename(url.pathname, basename) == null;

      if (window.location.origin !== url.origin || isDifferentBasename) {
        if (replace) {
          window.location.replace(redirect.location);
        } else {
          window.location.assign(redirect.location);
        }

        return;
      }
    } // There's no need to abort on redirects, since we don't detect the
    // redirect until the action/loaders have settled


    pendingNavigationController = null;
    let redirectHistoryAction = replace === true ? Action.Replace : Action.Push; // Use the incoming submission if provided, fallback on the active one in
    // state.navigation

    let {
      formMethod,
      formAction,
      formEncType,
      formData
    } = state.navigation;

    if (!submission && formMethod && formAction && formData && formEncType) {
      submission = {
        formMethod,
        formAction,
        formEncType,
        formData
      };
    } // If this was a 307/308 submission we want to preserve the HTTP method and
    // re-submit the GET/POST/PUT/PATCH/DELETE as a submission navigation to the
    // redirected location


    if (redirectPreserveMethodStatusCodes.has(redirect.status) && submission && isMutationMethod(submission.formMethod)) {
      await startNavigation(redirectHistoryAction, redirectLocation, {
        submission: _extends({}, submission, {
          formAction: redirect.location
        }),
        // Preserve this flag across redirects
        preventScrollReset: pendingPreventScrollReset
      });
    } else if (isFetchActionRedirect) {
      // For a fetch action redirect, we kick off a new loading navigation
      // without the fetcher submission, but we send it along for shouldRevalidate
      await startNavigation(redirectHistoryAction, redirectLocation, {
        overrideNavigation: {
          state: "loading",
          location: redirectLocation,
          formMethod: undefined,
          formAction: undefined,
          formEncType: undefined,
          formData: undefined
        },
        fetcherSubmission: submission,
        // Preserve this flag across redirects
        preventScrollReset: pendingPreventScrollReset
      });
    } else {
      // Otherwise, we kick off a new loading navigation, preserving the
      // submission info for the duration of this navigation
      await startNavigation(redirectHistoryAction, redirectLocation, {
        overrideNavigation: {
          state: "loading",
          location: redirectLocation,
          formMethod: submission ? submission.formMethod : undefined,
          formAction: submission ? submission.formAction : undefined,
          formEncType: submission ? submission.formEncType : undefined,
          formData: submission ? submission.formData : undefined
        },
        // Preserve this flag across redirects
        preventScrollReset: pendingPreventScrollReset
      });
    }
  }

  async function callLoadersAndMaybeResolveData(currentMatches, matches, matchesToLoad, fetchersToLoad, request) {
    // Call all navigation loaders and revalidating fetcher loaders in parallel,
    // then slice off the results into separate arrays so we can handle them
    // accordingly
    let results = await Promise.all([...matchesToLoad.map(match => callLoaderOrAction("loader", request, match, matches, manifest, mapRouteProperties, basename)), ...fetchersToLoad.map(f => {
      if (f.matches && f.match && f.controller) {
        return callLoaderOrAction("loader", createClientSideRequest(init.history, f.path, f.controller.signal), f.match, f.matches, manifest, mapRouteProperties, basename);
      } else {
        let error = {
          type: ResultType.error,
          error: getInternalRouterError(404, {
            pathname: f.path
          })
        };
        return error;
      }
    })]);
    let loaderResults = results.slice(0, matchesToLoad.length);
    let fetcherResults = results.slice(matchesToLoad.length);
    await Promise.all([resolveDeferredResults(currentMatches, matchesToLoad, loaderResults, loaderResults.map(() => request.signal), false, state.loaderData), resolveDeferredResults(currentMatches, fetchersToLoad.map(f => f.match), fetcherResults, fetchersToLoad.map(f => f.controller ? f.controller.signal : null), true)]);
    return {
      results,
      loaderResults,
      fetcherResults
    };
  }

  function interruptActiveLoads() {
    // Every interruption triggers a revalidation
    isRevalidationRequired = true; // Cancel pending route-level deferreds and mark cancelled routes for
    // revalidation

    cancelledDeferredRoutes.push(...cancelActiveDeferreds()); // Abort in-flight fetcher loads

    fetchLoadMatches.forEach((_, key) => {
      if (fetchControllers.has(key)) {
        cancelledFetcherLoads.push(key);
        abortFetcher(key);
      }
    });
  }

  function setFetcherError(key, routeId, error) {
    let boundaryMatch = findNearestBoundary(state.matches, routeId);
    deleteFetcher(key);
    updateState({
      errors: {
        [boundaryMatch.route.id]: error
      },
      fetchers: new Map(state.fetchers)
    });
  }

  function deleteFetcher(key) {
    if (fetchControllers.has(key)) abortFetcher(key);
    fetchLoadMatches.delete(key);
    fetchReloadIds.delete(key);
    fetchRedirectIds.delete(key);
    state.fetchers.delete(key);
  }

  function abortFetcher(key) {
    let controller = fetchControllers.get(key);
    invariant(controller, "Expected fetch controller: " + key);
    controller.abort();
    fetchControllers.delete(key);
  }

  function markFetchersDone(keys) {
    for (let key of keys) {
      let fetcher = getFetcher(key);
      let doneFetcher = {
        state: "idle",
        data: fetcher.data,
        formMethod: undefined,
        formAction: undefined,
        formEncType: undefined,
        formData: undefined,
        " _hasFetcherDoneAnything ": true
      };
      state.fetchers.set(key, doneFetcher);
    }
  }

  function markFetchRedirectsDone() {
    let doneKeys = [];
    let updatedFetchers = false;

    for (let key of fetchRedirectIds) {
      let fetcher = state.fetchers.get(key);
      invariant(fetcher, "Expected fetcher: " + key);

      if (fetcher.state === "loading") {
        fetchRedirectIds.delete(key);
        doneKeys.push(key);
        updatedFetchers = true;
      }
    }

    markFetchersDone(doneKeys);
    return updatedFetchers;
  }

  function abortStaleFetchLoads(landedId) {
    let yeetedKeys = [];

    for (let [key, id] of fetchReloadIds) {
      if (id < landedId) {
        let fetcher = state.fetchers.get(key);
        invariant(fetcher, "Expected fetcher: " + key);

        if (fetcher.state === "loading") {
          abortFetcher(key);
          fetchReloadIds.delete(key);
          yeetedKeys.push(key);
        }
      }
    }

    markFetchersDone(yeetedKeys);
    return yeetedKeys.length > 0;
  }

  function getBlocker(key, fn) {
    let blocker = state.blockers.get(key) || IDLE_BLOCKER;

    if (blockerFunctions.get(key) !== fn) {
      blockerFunctions.set(key, fn);
    }

    return blocker;
  }

  function deleteBlocker(key) {
    state.blockers.delete(key);
    blockerFunctions.delete(key);
  } // Utility function to update blockers, ensuring valid state transitions


  function updateBlocker(key, newBlocker) {
    let blocker = state.blockers.get(key) || IDLE_BLOCKER; // Poor mans state machine :)
    // https://mermaid.live/edit#pako:eNqVkc9OwzAMxl8l8nnjAYrEtDIOHEBIgwvKJTReGy3_lDpIqO27k6awMG0XcrLlnz87nwdonESogKXXBuE79rq75XZO3-yHds0RJVuv70YrPlUrCEe2HfrORS3rubqZfuhtpg5C9wk5tZ4VKcRUq88q9Z8RS0-48cE1iHJkL0ugbHuFLus9L6spZy8nX9MP2CNdomVaposqu3fGayT8T8-jJQwhepo_UtpgBQaDEUom04dZhAN1aJBDlUKJBxE1ceB2Smj0Mln-IBW5AFU2dwUiktt_2Qaq2dBfaKdEup85UV7Yd-dKjlnkabl2Pvr0DTkTreM

    invariant(blocker.state === "unblocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "proceeding" || blocker.state === "blocked" && newBlocker.state === "unblocked" || blocker.state === "proceeding" && newBlocker.state === "unblocked", "Invalid blocker state transition: " + blocker.state + " -> " + newBlocker.state);
    state.blockers.set(key, newBlocker);
    updateState({
      blockers: new Map(state.blockers)
    });
  }

  function shouldBlockNavigation(_ref2) {
    let {
      currentLocation,
      nextLocation,
      historyAction
    } = _ref2;

    if (blockerFunctions.size === 0) {
      return;
    } // We ony support a single active blocker at the moment since we don't have
    // any compelling use cases for multi-blocker yet


    if (blockerFunctions.size > 1) {
      warning(false, "A router only supports one blocker at a time");
    }

    let entries = Array.from(blockerFunctions.entries());
    let [blockerKey, blockerFunction] = entries[entries.length - 1];
    let blocker = state.blockers.get(blockerKey);

    if (blocker && blocker.state === "proceeding") {
      // If the blocker is currently proceeding, we don't need to re-check
      // it and can let this navigation continue
      return;
    } // At this point, we know we're unblocked/blocked so we need to check the
    // user-provided blocker function


    if (blockerFunction({
      currentLocation,
      nextLocation,
      historyAction
    })) {
      return blockerKey;
    }
  }

  function cancelActiveDeferreds(predicate) {
    let cancelledRouteIds = [];
    activeDeferreds.forEach((dfd, routeId) => {
      if (!predicate || predicate(routeId)) {
        // Cancel the deferred - but do not remove from activeDeferreds here -
        // we rely on the subscribers to do that so our tests can assert proper
        // cleanup via _internalActiveDeferreds
        dfd.cancel();
        cancelledRouteIds.push(routeId);
        activeDeferreds.delete(routeId);
      }
    });
    return cancelledRouteIds;
  } // Opt in to capturing and reporting scroll positions during navigations,
  // used by the <ScrollRestoration> component


  function enableScrollRestoration(positions, getPosition, getKey) {
    savedScrollPositions = positions;
    getScrollPosition = getPosition;

    getScrollRestorationKey = getKey || (location => location.key); // Perform initial hydration scroll restoration, since we miss the boat on
    // the initial updateState() because we've not yet rendered <ScrollRestoration/>
    // and therefore have no savedScrollPositions available


    if (!initialScrollRestored && state.navigation === IDLE_NAVIGATION) {
      initialScrollRestored = true;
      let y = getSavedScrollPosition(state.location, state.matches);

      if (y != null) {
        updateState({
          restoreScrollPosition: y
        });
      }
    }

    return () => {
      savedScrollPositions = null;
      getScrollPosition = null;
      getScrollRestorationKey = null;
    };
  }

  function saveScrollPosition(location, matches) {
    if (savedScrollPositions && getScrollRestorationKey && getScrollPosition) {
      let userMatches = matches.map(m => createUseMatchesMatch(m, state.loaderData));
      let key = getScrollRestorationKey(location, userMatches) || location.key;
      savedScrollPositions[key] = getScrollPosition();
    }
  }

  function getSavedScrollPosition(location, matches) {
    if (savedScrollPositions && getScrollRestorationKey && getScrollPosition) {
      let userMatches = matches.map(m => createUseMatchesMatch(m, state.loaderData));
      let key = getScrollRestorationKey(location, userMatches) || location.key;
      let y = savedScrollPositions[key];

      if (typeof y === "number") {
        return y;
      }
    }

    return null;
  }

  function _internalSetRoutes(newRoutes) {
    inFlightDataRoutes = newRoutes;
  }

  router = {
    get basename() {
      return basename;
    },

    get state() {
      return state;
    },

    get routes() {
      return dataRoutes;
    },

    initialize,
    subscribe,
    enableScrollRestoration,
    navigate,
    fetch,
    revalidate,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: to => init.history.createHref(to),
    encodeLocation: to => init.history.encodeLocation(to),
    getFetcher,
    deleteFetcher,
    dispose,
    getBlocker,
    deleteBlocker,
    _internalFetchControllers: fetchControllers,
    _internalActiveDeferreds: activeDeferreds,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes
  };
  return router;
} //#endregion
////////////////////////////////////////////////////////////////////////////////
//#region createStaticHandler
////////////////////////////////////////////////////////////////////////////////

const UNSAFE_DEFERRED_SYMBOL = Symbol("deferred");
function createStaticHandler(routes, opts) {
  invariant(routes.length > 0, "You must provide a non-empty routes array to createStaticHandler");
  let manifest = {};
  let basename = (opts ? opts.basename : null) || "/";
  let mapRouteProperties;

  if (opts != null && opts.mapRouteProperties) {
    mapRouteProperties = opts.mapRouteProperties;
  } else if (opts != null && opts.detectErrorBoundary) {
    // If they are still using the deprecated version, wrap it with the new API
    let detectErrorBoundary = opts.detectErrorBoundary;

    mapRouteProperties = route => ({
      hasErrorBoundary: detectErrorBoundary(route)
    });
  } else {
    mapRouteProperties = defaultMapRouteProperties;
  }

  let dataRoutes = convertRoutesToDataRoutes(routes, mapRouteProperties, undefined, manifest);
  /**
   * The query() method is intended for document requests, in which we want to
   * call an optional action and potentially multiple loaders for all nested
   * routes.  It returns a StaticHandlerContext object, which is very similar
   * to the router state (location, loaderData, actionData, errors, etc.) and
   * also adds SSR-specific information such as the statusCode and headers
   * from action/loaders Responses.
   *
   * It _should_ never throw and should report all errors through the
   * returned context.errors object, properly associating errors to their error
   * boundary.  Additionally, it tracks _deepestRenderedBoundaryId which can be
   * used to emulate React error boundaries during SSr by performing a second
   * pass only down to the boundaryId.
   *
   * The one exception where we do not return a StaticHandlerContext is when a
   * redirect response is returned or thrown from any action/loader.  We
   * propagate that out and return the raw Response so the HTTP server can
   * return it directly.
   */

  async function query(request, _temp2) {
    let {
      requestContext
    } = _temp2 === void 0 ? {} : _temp2;
    let url = new URL(request.url);
    let method = request.method;
    let location = createLocation("", createPath(url), null, "default");
    let matches = matchRoutes(dataRoutes, location, basename); // SSR supports HEAD requests while SPA doesn't

    if (!isValidMethod(method) && method !== "HEAD") {
      let error = getInternalRouterError(405, {
        method
      });
      let {
        matches: methodNotAllowedMatches,
        route
      } = getShortCircuitMatches(dataRoutes);
      return {
        basename,
        location,
        matches: methodNotAllowedMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {},
        activeDeferreds: null
      };
    } else if (!matches) {
      let error = getInternalRouterError(404, {
        pathname: location.pathname
      });
      let {
        matches: notFoundMatches,
        route
      } = getShortCircuitMatches(dataRoutes);
      return {
        basename,
        location,
        matches: notFoundMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {},
        activeDeferreds: null
      };
    }

    let result = await queryImpl(request, location, matches, requestContext);

    if (isResponse(result)) {
      return result;
    } // When returning StaticHandlerContext, we patch back in the location here
    // since we need it for React Context.  But this helps keep our submit and
    // loadRouteData operating on a Request instead of a Location


    return _extends({
      location,
      basename
    }, result);
  }
  /**
   * The queryRoute() method is intended for targeted route requests, either
   * for fetch ?_data requests or resource route requests.  In this case, we
   * are only ever calling a single action or loader, and we are returning the
   * returned value directly.  In most cases, this will be a Response returned
   * from the action/loader, but it may be a primitive or other value as well -
   * and in such cases the calling context should handle that accordingly.
   *
   * We do respect the throw/return differentiation, so if an action/loader
   * throws, then this method will throw the value.  This is important so we
   * can do proper boundary identification in Remix where a thrown Response
   * must go to the Catch Boundary but a returned Response is happy-path.
   *
   * One thing to note is that any Router-initiated Errors that make sense
   * to associate with a status code will be thrown as an ErrorResponse
   * instance which include the raw Error, such that the calling context can
   * serialize the error as they see fit while including the proper response
   * code.  Examples here are 404 and 405 errors that occur prior to reaching
   * any user-defined loaders.
   */


  async function queryRoute(request, _temp3) {
    let {
      routeId,
      requestContext
    } = _temp3 === void 0 ? {} : _temp3;
    let url = new URL(request.url);
    let method = request.method;
    let location = createLocation("", createPath(url), null, "default");
    let matches = matchRoutes(dataRoutes, location, basename); // SSR supports HEAD requests while SPA doesn't

    if (!isValidMethod(method) && method !== "HEAD" && method !== "OPTIONS") {
      throw getInternalRouterError(405, {
        method
      });
    } else if (!matches) {
      throw getInternalRouterError(404, {
        pathname: location.pathname
      });
    }

    let match = routeId ? matches.find(m => m.route.id === routeId) : getTargetMatch(matches, location);

    if (routeId && !match) {
      throw getInternalRouterError(403, {
        pathname: location.pathname,
        routeId
      });
    } else if (!match) {
      // This should never hit I don't think?
      throw getInternalRouterError(404, {
        pathname: location.pathname
      });
    }

    let result = await queryImpl(request, location, matches, requestContext, match);

    if (isResponse(result)) {
      return result;
    }

    let error = result.errors ? Object.values(result.errors)[0] : undefined;

    if (error !== undefined) {
      // If we got back result.errors, that means the loader/action threw
      // _something_ that wasn't a Response, but it's not guaranteed/required
      // to be an `instanceof Error` either, so we have to use throw here to
      // preserve the "error" state outside of queryImpl.
      throw error;
    } // Pick off the right state value to return


    if (result.actionData) {
      return Object.values(result.actionData)[0];
    }

    if (result.loaderData) {
      var _result$activeDeferre;

      let data = Object.values(result.loaderData)[0];

      if ((_result$activeDeferre = result.activeDeferreds) != null && _result$activeDeferre[match.route.id]) {
        data[UNSAFE_DEFERRED_SYMBOL] = result.activeDeferreds[match.route.id];
      }

      return data;
    }

    return undefined;
  }

  async function queryImpl(request, location, matches, requestContext, routeMatch) {
    invariant(request.signal, "query()/queryRoute() requests must contain an AbortController signal");

    try {
      if (isMutationMethod(request.method.toLowerCase())) {
        let result = await submit(request, matches, routeMatch || getTargetMatch(matches, location), requestContext, routeMatch != null);
        return result;
      }

      let result = await loadRouteData(request, matches, requestContext, routeMatch);
      return isResponse(result) ? result : _extends({}, result, {
        actionData: null,
        actionHeaders: {}
      });
    } catch (e) {
      // If the user threw/returned a Response in callLoaderOrAction, we throw
      // it to bail out and then return or throw here based on whether the user
      // returned or threw
      if (isQueryRouteResponse(e)) {
        if (e.type === ResultType.error && !isRedirectResponse(e.response)) {
          throw e.response;
        }

        return e.response;
      } // Redirects are always returned since they don't propagate to catch
      // boundaries


      if (isRedirectResponse(e)) {
        return e;
      }

      throw e;
    }
  }

  async function submit(request, matches, actionMatch, requestContext, isRouteRequest) {
    let result;

    if (!actionMatch.route.action && !actionMatch.route.lazy) {
      let error = getInternalRouterError(405, {
        method: request.method,
        pathname: new URL(request.url).pathname,
        routeId: actionMatch.route.id
      });

      if (isRouteRequest) {
        throw error;
      }

      result = {
        type: ResultType.error,
        error
      };
    } else {
      result = await callLoaderOrAction("action", request, actionMatch, matches, manifest, mapRouteProperties, basename, true, isRouteRequest, requestContext);

      if (request.signal.aborted) {
        let method = isRouteRequest ? "queryRoute" : "query";
        throw new Error(method + "() call aborted");
      }
    }

    if (isRedirectResult(result)) {
      // Uhhhh - this should never happen, we should always throw these from
      // callLoaderOrAction, but the type narrowing here keeps TS happy and we
      // can get back on the "throw all redirect responses" train here should
      // this ever happen :/
      throw new Response(null, {
        status: result.status,
        headers: {
          Location: result.location
        }
      });
    }

    if (isDeferredResult(result)) {
      let error = getInternalRouterError(400, {
        type: "defer-action"
      });

      if (isRouteRequest) {
        throw error;
      }

      result = {
        type: ResultType.error,
        error
      };
    }

    if (isRouteRequest) {
      // Note: This should only be non-Response values if we get here, since
      // isRouteRequest should throw any Response received in callLoaderOrAction
      if (isErrorResult(result)) {
        throw result.error;
      }

      return {
        matches: [actionMatch],
        loaderData: {},
        actionData: {
          [actionMatch.route.id]: result.data
        },
        errors: null,
        // Note: statusCode + headers are unused here since queryRoute will
        // return the raw Response or value
        statusCode: 200,
        loaderHeaders: {},
        actionHeaders: {},
        activeDeferreds: null
      };
    }

    if (isErrorResult(result)) {
      // Store off the pending error - we use it to determine which loaders
      // to call and will commit it when we complete the navigation
      let boundaryMatch = findNearestBoundary(matches, actionMatch.route.id);
      let context = await loadRouteData(request, matches, requestContext, undefined, {
        [boundaryMatch.route.id]: result.error
      }); // action status codes take precedence over loader status codes

      return _extends({}, context, {
        statusCode: isRouteErrorResponse(result.error) ? result.error.status : 500,
        actionData: null,
        actionHeaders: _extends({}, result.headers ? {
          [actionMatch.route.id]: result.headers
        } : {})
      });
    } // Create a GET request for the loaders


    let loaderRequest = new Request(request.url, {
      headers: request.headers,
      redirect: request.redirect,
      signal: request.signal
    });
    let context = await loadRouteData(loaderRequest, matches, requestContext);
    return _extends({}, context, result.statusCode ? {
      statusCode: result.statusCode
    } : {}, {
      actionData: {
        [actionMatch.route.id]: result.data
      },
      actionHeaders: _extends({}, result.headers ? {
        [actionMatch.route.id]: result.headers
      } : {})
    });
  }

  async function loadRouteData(request, matches, requestContext, routeMatch, pendingActionError) {
    let isRouteRequest = routeMatch != null; // Short circuit if we have no loaders to run (queryRoute())

    if (isRouteRequest && !(routeMatch != null && routeMatch.route.loader) && !(routeMatch != null && routeMatch.route.lazy)) {
      throw getInternalRouterError(400, {
        method: request.method,
        pathname: new URL(request.url).pathname,
        routeId: routeMatch == null ? void 0 : routeMatch.route.id
      });
    }

    let requestMatches = routeMatch ? [routeMatch] : getLoaderMatchesUntilBoundary(matches, Object.keys(pendingActionError || {})[0]);
    let matchesToLoad = requestMatches.filter(m => m.route.loader || m.route.lazy); // Short circuit if we have no loaders to run (query())

    if (matchesToLoad.length === 0) {
      return {
        matches,
        // Add a null for all matched routes for proper revalidation on the client
        loaderData: matches.reduce((acc, m) => Object.assign(acc, {
          [m.route.id]: null
        }), {}),
        errors: pendingActionError || null,
        statusCode: 200,
        loaderHeaders: {},
        activeDeferreds: null
      };
    }

    let results = await Promise.all([...matchesToLoad.map(match => callLoaderOrAction("loader", request, match, matches, manifest, mapRouteProperties, basename, true, isRouteRequest, requestContext))]);

    if (request.signal.aborted) {
      let method = isRouteRequest ? "queryRoute" : "query";
      throw new Error(method + "() call aborted");
    } // Process and commit output from loaders


    let activeDeferreds = new Map();
    let context = processRouteLoaderData(matches, matchesToLoad, results, pendingActionError, activeDeferreds); // Add a null for any non-loader matches for proper revalidation on the client

    let executedLoaders = new Set(matchesToLoad.map(match => match.route.id));
    matches.forEach(match => {
      if (!executedLoaders.has(match.route.id)) {
        context.loaderData[match.route.id] = null;
      }
    });
    return _extends({}, context, {
      matches,
      activeDeferreds: activeDeferreds.size > 0 ? Object.fromEntries(activeDeferreds.entries()) : null
    });
  }

  return {
    dataRoutes,
    query,
    queryRoute
  };
} //#endregion
////////////////////////////////////////////////////////////////////////////////
//#region Helpers
////////////////////////////////////////////////////////////////////////////////

/**
 * Given an existing StaticHandlerContext and an error thrown at render time,
 * provide an updated StaticHandlerContext suitable for a second SSR render
 */

function getStaticContextFromError(routes, context, error) {
  let newContext = _extends({}, context, {
    statusCode: 500,
    errors: {
      [context._deepestRenderedBoundaryId || routes[0].id]: error
    }
  });

  return newContext;
}

function isSubmissionNavigation(opts) {
  return opts != null && "formData" in opts;
}

function normalizeTo(location, matches, basename, prependBasename, to, fromRouteId, relative) {
  let contextualMatches;
  let activeRouteMatch;

  if (fromRouteId != null && relative !== "path") {
    // Grab matches up to the calling route so our route-relative logic is
    // relative to the correct source route.  When using relative:path,
    // fromRouteId is ignored since that is always relative to the current
    // location path
    contextualMatches = [];

    for (let match of matches) {
      contextualMatches.push(match);

      if (match.route.id === fromRouteId) {
        activeRouteMatch = match;
        break;
      }
    }
  } else {
    contextualMatches = matches;
    activeRouteMatch = matches[matches.length - 1];
  } // Resolve the relative path


  let path = resolveTo(to ? to : ".", getPathContributingMatches(contextualMatches).map(m => m.pathnameBase), stripBasename(location.pathname, basename) || location.pathname, relative === "path"); // When `to` is not specified we inherit search/hash from the current
  // location, unlike when to="." and we just inherit the path.
  // See https://github.com/remix-run/remix/issues/927

  if (to == null) {
    path.search = location.search;
    path.hash = location.hash;
  } // Add an ?index param for matched index routes if we don't already have one


  if ((to == null || to === "" || to === ".") && activeRouteMatch && activeRouteMatch.route.index && !hasNakedIndexQuery(path.search)) {
    path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
  } // If we're operating within a basename, prepend it to the pathname.  If
  // this is a root navigation, then just use the raw basename which allows
  // the basename to have full control over the presence of a trailing slash
  // on root actions


  if (prependBasename && basename !== "/") {
    path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
  }

  return createPath(path);
} // Normalize navigation options by converting formMethod=GET formData objects to
// URLSearchParams so they behave identically to links with query params


function normalizeNavigateOptions(normalizeFormMethod, isFetcher, path, opts) {
  // Return location verbatim on non-submission navigations
  if (!opts || !isSubmissionNavigation(opts)) {
    return {
      path
    };
  }

  if (opts.formMethod && !isValidMethod(opts.formMethod)) {
    return {
      path,
      error: getInternalRouterError(405, {
        method: opts.formMethod
      })
    };
  } // Create a Submission on non-GET navigations


  let submission;

  if (opts.formData) {
    let formMethod = opts.formMethod || "get";
    submission = {
      formMethod: normalizeFormMethod ? formMethod.toUpperCase() : formMethod.toLowerCase(),
      formAction: stripHashFromPath(path),
      formEncType: opts && opts.formEncType || "application/x-www-form-urlencoded",
      formData: opts.formData
    };

    if (isMutationMethod(submission.formMethod)) {
      return {
        path,
        submission
      };
    }
  } // Flatten submission onto URLSearchParams for GET submissions


  let parsedPath = parsePath(path);
  let searchParams = convertFormDataToSearchParams(opts.formData); // On GET navigation submissions we can drop the ?index param from the
  // resulting location since all loaders will run.  But fetcher GET submissions
  // only run a single loader so we need to preserve any incoming ?index params

  if (isFetcher && parsedPath.search && hasNakedIndexQuery(parsedPath.search)) {
    searchParams.append("index", "");
  }

  parsedPath.search = "?" + searchParams;
  return {
    path: createPath(parsedPath),
    submission
  };
} // Filter out all routes below any caught error as they aren't going to
// render so we don't need to load them


function getLoaderMatchesUntilBoundary(matches, boundaryId) {
  let boundaryMatches = matches;

  if (boundaryId) {
    let index = matches.findIndex(m => m.route.id === boundaryId);

    if (index >= 0) {
      boundaryMatches = matches.slice(0, index);
    }
  }

  return boundaryMatches;
}

function getMatchesToLoad(history, state, matches, submission, location, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, fetchLoadMatches, routesToUse, basename, pendingActionData, pendingError) {
  let actionResult = pendingError ? Object.values(pendingError)[0] : pendingActionData ? Object.values(pendingActionData)[0] : undefined;
  let currentUrl = history.createURL(state.location);
  let nextUrl = history.createURL(location); // Pick navigation matches that are net-new or qualify for revalidation

  let boundaryId = pendingError ? Object.keys(pendingError)[0] : undefined;
  let boundaryMatches = getLoaderMatchesUntilBoundary(matches, boundaryId);
  let navigationMatches = boundaryMatches.filter((match, index) => {
    if (match.route.lazy) {
      // We haven't loaded this route yet so we don't know if it's got a loader!
      return true;
    }

    if (match.route.loader == null) {
      return false;
    } // Always call the loader on new route instances and pending defer cancellations


    if (isNewLoader(state.loaderData, state.matches[index], match) || cancelledDeferredRoutes.some(id => id === match.route.id)) {
      return true;
    } // This is the default implementation for when we revalidate.  If the route
    // provides it's own implementation, then we give them full control but
    // provide this value so they can leverage it if needed after they check
    // their own specific use cases


    let currentRouteMatch = state.matches[index];
    let nextRouteMatch = match;
    return shouldRevalidateLoader(match, _extends({
      currentUrl,
      currentParams: currentRouteMatch.params,
      nextUrl,
      nextParams: nextRouteMatch.params
    }, submission, {
      actionResult,
      defaultShouldRevalidate: // Forced revalidation due to submission, useRevalidator, or X-Remix-Revalidate
      isRevalidationRequired || // Clicked the same link, resubmitted a GET form
      currentUrl.pathname + currentUrl.search === nextUrl.pathname + nextUrl.search || // Search params affect all loaders
      currentUrl.search !== nextUrl.search || isNewRouteInstance(currentRouteMatch, nextRouteMatch)
    }));
  }); // Pick fetcher.loads that need to be revalidated

  let revalidatingFetchers = [];
  fetchLoadMatches.forEach((f, key) => {
    // Don't revalidate if fetcher won't be present in the subsequent render
    if (!matches.some(m => m.route.id === f.routeId)) {
      return;
    }

    let fetcherMatches = matchRoutes(routesToUse, f.path, basename); // If the fetcher path no longer matches, push it in with null matches so
    // we can trigger a 404 in callLoadersAndMaybeResolveData

    if (!fetcherMatches) {
      revalidatingFetchers.push({
        key,
        routeId: f.routeId,
        path: f.path,
        matches: null,
        match: null,
        controller: null
      });
      return;
    }

    let fetcherMatch = getTargetMatch(fetcherMatches, f.path);

    if (cancelledFetcherLoads.includes(key)) {
      revalidatingFetchers.push({
        key,
        routeId: f.routeId,
        path: f.path,
        matches: fetcherMatches,
        match: fetcherMatch,
        controller: new AbortController()
      });
      return;
    } // Revalidating fetchers are decoupled from the route matches since they
    // hit a static href, so they _always_ check shouldRevalidate and the
    // default is strictly if a revalidation is explicitly required (action
    // submissions, useRevalidator, X-Remix-Revalidate).


    let shouldRevalidate = shouldRevalidateLoader(fetcherMatch, _extends({
      currentUrl,
      currentParams: state.matches[state.matches.length - 1].params,
      nextUrl,
      nextParams: matches[matches.length - 1].params
    }, submission, {
      actionResult,
      // Forced revalidation due to submission, useRevalidator, or X-Remix-Revalidate
      defaultShouldRevalidate: isRevalidationRequired
    }));

    if (shouldRevalidate) {
      revalidatingFetchers.push({
        key,
        routeId: f.routeId,
        path: f.path,
        matches: fetcherMatches,
        match: fetcherMatch,
        controller: new AbortController()
      });
    }
  });
  return [navigationMatches, revalidatingFetchers];
}

function isNewLoader(currentLoaderData, currentMatch, match) {
  let isNew = // [a] -> [a, b]
  !currentMatch || // [a, b] -> [a, c]
  match.route.id !== currentMatch.route.id; // Handle the case that we don't have data for a re-used route, potentially
  // from a prior error or from a cancelled pending deferred

  let isMissingData = currentLoaderData[match.route.id] === undefined; // Always load if this is a net-new route or we don't yet have data

  return isNew || isMissingData;
}

function isNewRouteInstance(currentMatch, match) {
  let currentPath = currentMatch.route.path;
  return (// param change for this match, /users/123 -> /users/456
    currentMatch.pathname !== match.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    currentPath != null && currentPath.endsWith("*") && currentMatch.params["*"] !== match.params["*"]
  );
}

function shouldRevalidateLoader(loaderMatch, arg) {
  if (loaderMatch.route.shouldRevalidate) {
    let routeChoice = loaderMatch.route.shouldRevalidate(arg);

    if (typeof routeChoice === "boolean") {
      return routeChoice;
    }
  }

  return arg.defaultShouldRevalidate;
}
/**
 * Execute route.lazy() methods to lazily load route modules (loader, action,
 * shouldRevalidate) and update the routeManifest in place which shares objects
 * with dataRoutes so those get updated as well.
 */


async function loadLazyRouteModule(route, mapRouteProperties, manifest) {
  if (!route.lazy) {
    return;
  }

  let lazyRoute = await route.lazy(); // If the lazy route function was executed and removed by another parallel
  // call then we can return - first lazy() to finish wins because the return
  // value of lazy is expected to be static

  if (!route.lazy) {
    return;
  }

  let routeToUpdate = manifest[route.id];
  invariant(routeToUpdate, "No route found in manifest"); // Update the route in place.  This should be safe because there's no way
  // we could yet be sitting on this route as we can't get there without
  // resolving lazy() first.
  //
  // This is different than the HMR "update" use-case where we may actively be
  // on the route being updated.  The main concern boils down to "does this
  // mutation affect any ongoing navigations or any current state.matches
  // values?".  If not, it should be safe to update in place.

  let routeUpdates = {};

  for (let lazyRouteProperty in lazyRoute) {
    let staticRouteValue = routeToUpdate[lazyRouteProperty];
    let isPropertyStaticallyDefined = staticRouteValue !== undefined && // This property isn't static since it should always be updated based
    // on the route updates
    lazyRouteProperty !== "hasErrorBoundary";
    warning(!isPropertyStaticallyDefined, "Route \"" + routeToUpdate.id + "\" has a static property \"" + lazyRouteProperty + "\" " + "defined but its lazy function is also returning a value for this property. " + ("The lazy route property \"" + lazyRouteProperty + "\" will be ignored."));

    if (!isPropertyStaticallyDefined && !immutableRouteKeys.has(lazyRouteProperty)) {
      routeUpdates[lazyRouteProperty] = lazyRoute[lazyRouteProperty];
    }
  } // Mutate the route with the provided updates.  Do this first so we pass
  // the updated version to mapRouteProperties


  Object.assign(routeToUpdate, routeUpdates); // Mutate the `hasErrorBoundary` property on the route based on the route
  // updates and remove the `lazy` function so we don't resolve the lazy
  // route again.

  Object.assign(routeToUpdate, _extends({}, mapRouteProperties(routeToUpdate), {
    lazy: undefined
  }));
}

async function callLoaderOrAction(type, request, match, matches, manifest, mapRouteProperties, basename, isStaticRequest, isRouteRequest, requestContext) {
  if (isStaticRequest === void 0) {
    isStaticRequest = false;
  }

  if (isRouteRequest === void 0) {
    isRouteRequest = false;
  }

  let resultType;
  let result;
  let onReject;

  let runHandler = handler => {
    // Setup a promise we can race against so that abort signals short circuit
    let reject;
    let abortPromise = new Promise((_, r) => reject = r);

    onReject = () => reject();

    request.signal.addEventListener("abort", onReject);
    return Promise.race([handler({
      request,
      params: match.params,
      context: requestContext
    }), abortPromise]);
  };

  try {
    let handler = match.route[type];

    if (match.route.lazy) {
      if (handler) {
        // Run statically defined handler in parallel with lazy()
        let values = await Promise.all([runHandler(handler), loadLazyRouteModule(match.route, mapRouteProperties, manifest)]);
        result = values[0];
      } else {
        // Load lazy route module, then run any returned handler
        await loadLazyRouteModule(match.route, mapRouteProperties, manifest);
        handler = match.route[type];

        if (handler) {
          // Handler still run even if we got interrupted to maintain consistency
          // with un-abortable behavior of handler execution on non-lazy or
          // previously-lazy-loaded routes
          result = await runHandler(handler);
        } else if (type === "action") {
          let url = new URL(request.url);
          let pathname = url.pathname + url.search;
          throw getInternalRouterError(405, {
            method: request.method,
            pathname,
            routeId: match.route.id
          });
        } else {
          // lazy() route has no loader to run.  Short circuit here so we don't
          // hit the invariant below that errors on returning undefined.
          return {
            type: ResultType.data,
            data: undefined
          };
        }
      }
    } else if (!handler) {
      let url = new URL(request.url);
      let pathname = url.pathname + url.search;
      throw getInternalRouterError(404, {
        pathname
      });
    } else {
      result = await runHandler(handler);
    }

    invariant(result !== undefined, "You defined " + (type === "action" ? "an action" : "a loader") + " for route " + ("\"" + match.route.id + "\" but didn't return anything from your `" + type + "` ") + "function. Please return a value or `null`.");
  } catch (e) {
    resultType = ResultType.error;
    result = e;
  } finally {
    if (onReject) {
      request.signal.removeEventListener("abort", onReject);
    }
  }

  if (isResponse(result)) {
    let status = result.status; // Process redirects

    if (redirectStatusCodes.has(status)) {
      let location = result.headers.get("Location");
      invariant(location, "Redirects returned/thrown from loaders/actions must have a Location header"); // Support relative routing in internal redirects

      if (!ABSOLUTE_URL_REGEX.test(location)) {
        location = normalizeTo(new URL(request.url), matches.slice(0, matches.indexOf(match) + 1), basename, true, location);
      } else if (!isStaticRequest) {
        // Strip off the protocol+origin for same-origin + same-basename absolute
        // redirects. If this is a static request, we can let it go back to the
        // browser as-is
        let currentUrl = new URL(request.url);
        let url = location.startsWith("//") ? new URL(currentUrl.protocol + location) : new URL(location);
        let isSameBasename = stripBasename(url.pathname, basename) != null;

        if (url.origin === currentUrl.origin && isSameBasename) {
          location = url.pathname + url.search + url.hash;
        }
      } // Don't process redirects in the router during static requests requests.
      // Instead, throw the Response and let the server handle it with an HTTP
      // redirect.  We also update the Location header in place in this flow so
      // basename and relative routing is taken into account


      if (isStaticRequest) {
        result.headers.set("Location", location);
        throw result;
      }

      return {
        type: ResultType.redirect,
        status,
        location,
        revalidate: result.headers.get("X-Remix-Revalidate") !== null
      };
    } // For SSR single-route requests, we want to hand Responses back directly
    // without unwrapping.  We do this with the QueryRouteResponse wrapper
    // interface so we can know whether it was returned or thrown


    if (isRouteRequest) {
      // eslint-disable-next-line no-throw-literal
      throw {
        type: resultType || ResultType.data,
        response: result
      };
    }

    let data;
    let contentType = result.headers.get("Content-Type"); // Check between word boundaries instead of startsWith() due to the last
    // paragraph of https://httpwg.org/specs/rfc9110.html#field.content-type

    if (contentType && /\bapplication\/json\b/.test(contentType)) {
      data = await result.json();
    } else {
      data = await result.text();
    }

    if (resultType === ResultType.error) {
      return {
        type: resultType,
        error: new ErrorResponse(status, result.statusText, data),
        headers: result.headers
      };
    }

    return {
      type: ResultType.data,
      data,
      statusCode: result.status,
      headers: result.headers
    };
  }

  if (resultType === ResultType.error) {
    return {
      type: resultType,
      error: result
    };
  }

  if (isDeferredData(result)) {
    var _result$init, _result$init2;

    return {
      type: ResultType.deferred,
      deferredData: result,
      statusCode: (_result$init = result.init) == null ? void 0 : _result$init.status,
      headers: ((_result$init2 = result.init) == null ? void 0 : _result$init2.headers) && new Headers(result.init.headers)
    };
  }

  return {
    type: ResultType.data,
    data: result
  };
} // Utility method for creating the Request instances for loaders/actions during
// client-side navigations and fetches.  During SSR we will always have a
// Request instance from the static handler (query/queryRoute)


function createClientSideRequest(history, location, signal, submission) {
  let url = history.createURL(stripHashFromPath(location)).toString();
  let init = {
    signal
  };

  if (submission && isMutationMethod(submission.formMethod)) {
    let {
      formMethod,
      formEncType,
      formData
    } = submission; // Didn't think we needed this but it turns out unlike other methods, patch
    // won't be properly normalized to uppercase and results in a 405 error.
    // See: https://fetch.spec.whatwg.org/#concept-method

    init.method = formMethod.toUpperCase();
    init.body = formEncType === "application/x-www-form-urlencoded" ? convertFormDataToSearchParams(formData) : formData;
  } // Content-Type is inferred (https://fetch.spec.whatwg.org/#dom-request)


  return new Request(url, init);
}

function convertFormDataToSearchParams(formData) {
  let searchParams = new URLSearchParams();

  for (let [key, value] of formData.entries()) {
    // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#converting-an-entry-list-to-a-list-of-name-value-pairs
    searchParams.append(key, value instanceof File ? value.name : value);
  }

  return searchParams;
}

function processRouteLoaderData(matches, matchesToLoad, results, pendingError, activeDeferreds) {
  // Fill in loaderData/errors from our loaders
  let loaderData = {};
  let errors = null;
  let statusCode;
  let foundError = false;
  let loaderHeaders = {}; // Process loader results into state.loaderData/state.errors

  results.forEach((result, index) => {
    let id = matchesToLoad[index].route.id;
    invariant(!isRedirectResult(result), "Cannot handle redirect results in processLoaderData");

    if (isErrorResult(result)) {
      // Look upwards from the matched route for the closest ancestor
      // error boundary, defaulting to the root match
      let boundaryMatch = findNearestBoundary(matches, id);
      let error = result.error; // If we have a pending action error, we report it at the highest-route
      // that throws a loader error, and then clear it out to indicate that
      // it was consumed

      if (pendingError) {
        error = Object.values(pendingError)[0];
        pendingError = undefined;
      }

      errors = errors || {}; // Prefer higher error values if lower errors bubble to the same boundary

      if (errors[boundaryMatch.route.id] == null) {
        errors[boundaryMatch.route.id] = error;
      } // Clear our any prior loaderData for the throwing route


      loaderData[id] = undefined; // Once we find our first (highest) error, we set the status code and
      // prevent deeper status codes from overriding

      if (!foundError) {
        foundError = true;
        statusCode = isRouteErrorResponse(result.error) ? result.error.status : 500;
      }

      if (result.headers) {
        loaderHeaders[id] = result.headers;
      }
    } else {
      if (isDeferredResult(result)) {
        activeDeferreds.set(id, result.deferredData);
        loaderData[id] = result.deferredData.data;
      } else {
        loaderData[id] = result.data;
      } // Error status codes always override success status codes, but if all
      // loaders are successful we take the deepest status code.


      if (result.statusCode != null && result.statusCode !== 200 && !foundError) {
        statusCode = result.statusCode;
      }

      if (result.headers) {
        loaderHeaders[id] = result.headers;
      }
    }
  }); // If we didn't consume the pending action error (i.e., all loaders
  // resolved), then consume it here.  Also clear out any loaderData for the
  // throwing route

  if (pendingError) {
    errors = pendingError;
    loaderData[Object.keys(pendingError)[0]] = undefined;
  }

  return {
    loaderData,
    errors,
    statusCode: statusCode || 200,
    loaderHeaders
  };
}

function processLoaderData(state, matches, matchesToLoad, results, pendingError, revalidatingFetchers, fetcherResults, activeDeferreds) {
  let {
    loaderData,
    errors
  } = processRouteLoaderData(matches, matchesToLoad, results, pendingError, activeDeferreds); // Process results from our revalidating fetchers

  for (let index = 0; index < revalidatingFetchers.length; index++) {
    let {
      key,
      match,
      controller
    } = revalidatingFetchers[index];
    invariant(fetcherResults !== undefined && fetcherResults[index] !== undefined, "Did not find corresponding fetcher result");
    let result = fetcherResults[index]; // Process fetcher non-redirect errors

    if (controller && controller.signal.aborted) {
      // Nothing to do for aborted fetchers
      continue;
    } else if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(state.matches, match == null ? void 0 : match.route.id);

      if (!(errors && errors[boundaryMatch.route.id])) {
        errors = _extends({}, errors, {
          [boundaryMatch.route.id]: result.error
        });
      }

      state.fetchers.delete(key);
    } else if (isRedirectResult(result)) {
      // Should never get here, redirects should get processed above, but we
      // keep this to type narrow to a success result in the else
      invariant(false, "Unhandled fetcher revalidation redirect");
    } else if (isDeferredResult(result)) {
      // Should never get here, deferred data should be awaited for fetchers
      // in resolveDeferredResults
      invariant(false, "Unhandled fetcher deferred data");
    } else {
      let doneFetcher = {
        state: "idle",
        data: result.data,
        formMethod: undefined,
        formAction: undefined,
        formEncType: undefined,
        formData: undefined,
        " _hasFetcherDoneAnything ": true
      };
      state.fetchers.set(key, doneFetcher);
    }
  }

  return {
    loaderData,
    errors
  };
}

function mergeLoaderData(loaderData, newLoaderData, matches, errors) {
  let mergedLoaderData = _extends({}, newLoaderData);

  for (let match of matches) {
    let id = match.route.id;

    if (newLoaderData.hasOwnProperty(id)) {
      if (newLoaderData[id] !== undefined) {
        mergedLoaderData[id] = newLoaderData[id];
      }
    } else if (loaderData[id] !== undefined && match.route.loader) {
      // Preserve existing keys not included in newLoaderData and where a loader
      // wasn't removed by HMR
      mergedLoaderData[id] = loaderData[id];
    }

    if (errors && errors.hasOwnProperty(id)) {
      // Don't keep any loader data below the boundary
      break;
    }
  }

  return mergedLoaderData;
} // Find the nearest error boundary, looking upwards from the leaf route (or the
// route specified by routeId) for the closest ancestor error boundary,
// defaulting to the root match


function findNearestBoundary(matches, routeId) {
  let eligibleMatches = routeId ? matches.slice(0, matches.findIndex(m => m.route.id === routeId) + 1) : [...matches];
  return eligibleMatches.reverse().find(m => m.route.hasErrorBoundary === true) || matches[0];
}

function getShortCircuitMatches(routes) {
  // Prefer a root layout route if present, otherwise shim in a route object
  let route = routes.find(r => r.index || !r.path || r.path === "/") || {
    id: "__shim-error-route__"
  };
  return {
    matches: [{
      params: {},
      pathname: "",
      pathnameBase: "",
      route
    }],
    route
  };
}

function getInternalRouterError(status, _temp4) {
  let {
    pathname,
    routeId,
    method,
    type
  } = _temp4 === void 0 ? {} : _temp4;
  let statusText = "Unknown Server Error";
  let errorMessage = "Unknown @remix-run/router error";

  if (status === 400) {
    statusText = "Bad Request";

    if (method && pathname && routeId) {
      errorMessage = "You made a " + method + " request to \"" + pathname + "\" but " + ("did not provide a `loader` for route \"" + routeId + "\", ") + "so there is no way to handle the request.";
    } else if (type === "defer-action") {
      errorMessage = "defer() is not supported in actions";
    }
  } else if (status === 403) {
    statusText = "Forbidden";
    errorMessage = "Route \"" + routeId + "\" does not match URL \"" + pathname + "\"";
  } else if (status === 404) {
    statusText = "Not Found";
    errorMessage = "No route matches URL \"" + pathname + "\"";
  } else if (status === 405) {
    statusText = "Method Not Allowed";

    if (method && pathname && routeId) {
      errorMessage = "You made a " + method.toUpperCase() + " request to \"" + pathname + "\" but " + ("did not provide an `action` for route \"" + routeId + "\", ") + "so there is no way to handle the request.";
    } else if (method) {
      errorMessage = "Invalid request method \"" + method.toUpperCase() + "\"";
    }
  }

  return new ErrorResponse(status || 500, statusText, new Error(errorMessage), true);
} // Find any returned redirect errors, starting from the lowest match


function findRedirect(results) {
  for (let i = results.length - 1; i >= 0; i--) {
    let result = results[i];

    if (isRedirectResult(result)) {
      return result;
    }
  }
}

function stripHashFromPath(path) {
  let parsedPath = typeof path === "string" ? parsePath(path) : path;
  return createPath(_extends({}, parsedPath, {
    hash: ""
  }));
}

function isHashChangeOnly(a, b) {
  if (a.pathname !== b.pathname || a.search !== b.search) {
    return false;
  }

  if (a.hash === "") {
    // No hash -> hash
    return b.hash !== "";
  } else if (a.hash === b.hash) {
    // current hash -> same hash
    return true;
  } else if (b.hash !== "") {
    // current hash -> new hash
    return true;
  }

  return false;
}

function isDeferredResult(result) {
  return result.type === ResultType.deferred;
}

function isErrorResult(result) {
  return result.type === ResultType.error;
}

function isRedirectResult(result) {
  return (result && result.type) === ResultType.redirect;
}

function isDeferredData(value) {
  let deferred = value;
  return deferred && typeof deferred === "object" && typeof deferred.data === "object" && typeof deferred.subscribe === "function" && typeof deferred.cancel === "function" && typeof deferred.resolveData === "function";
}

function isResponse(value) {
  return value != null && typeof value.status === "number" && typeof value.statusText === "string" && typeof value.headers === "object" && typeof value.body !== "undefined";
}

function isRedirectResponse(result) {
  if (!isResponse(result)) {
    return false;
  }

  let status = result.status;
  let location = result.headers.get("Location");
  return status >= 300 && status <= 399 && location != null;
}

function isQueryRouteResponse(obj) {
  return obj && isResponse(obj.response) && (obj.type === ResultType.data || ResultType.error);
}

function isValidMethod(method) {
  return validRequestMethods.has(method.toLowerCase());
}

function isMutationMethod(method) {
  return validMutationMethods.has(method.toLowerCase());
}

async function resolveDeferredResults(currentMatches, matchesToLoad, results, signals, isFetcher, currentLoaderData) {
  for (let index = 0; index < results.length; index++) {
    let result = results[index];
    let match = matchesToLoad[index]; // If we don't have a match, then we can have a deferred result to do
    // anything with.  This is for revalidating fetchers where the route was
    // removed during HMR

    if (!match) {
      continue;
    }

    let currentMatch = currentMatches.find(m => m.route.id === match.route.id);
    let isRevalidatingLoader = currentMatch != null && !isNewRouteInstance(currentMatch, match) && (currentLoaderData && currentLoaderData[match.route.id]) !== undefined;

    if (isDeferredResult(result) && (isFetcher || isRevalidatingLoader)) {
      // Note: we do not have to touch activeDeferreds here since we race them
      // against the signal in resolveDeferredData and they'll get aborted
      // there if needed
      let signal = signals[index];
      invariant(signal, "Expected an AbortSignal for revalidating fetcher deferred result");
      await resolveDeferredData(result, signal, isFetcher).then(result => {
        if (result) {
          results[index] = result || results[index];
        }
      });
    }
  }
}

async function resolveDeferredData(result, signal, unwrap) {
  if (unwrap === void 0) {
    unwrap = false;
  }

  let aborted = await result.deferredData.resolveData(signal);

  if (aborted) {
    return;
  }

  if (unwrap) {
    try {
      return {
        type: ResultType.data,
        data: result.deferredData.unwrappedData
      };
    } catch (e) {
      // Handle any TrackedPromise._error values encountered while unwrapping
      return {
        type: ResultType.error,
        error: e
      };
    }
  }

  return {
    type: ResultType.data,
    data: result.deferredData.data
  };
}

function hasNakedIndexQuery(search) {
  return new URLSearchParams(search).getAll("index").some(v => v === "");
} // Note: This should match the format exported by useMatches, so if you change
// this please also change that :)  Eventually we'll DRY this up


function createUseMatchesMatch(match, loaderData) {
  let {
    route,
    pathname,
    params
  } = match;
  return {
    id: route.id,
    pathname,
    params,
    data: loaderData[route.id],
    handle: route.handle
  };
}

function getTargetMatch(matches, location) {
  let search = typeof location === "string" ? parsePath(location).search : location.search;

  if (matches[matches.length - 1].route.index && hasNakedIndexQuery(search || "")) {
    // Return the leaf index route when index is present
    return matches[matches.length - 1];
  } // Otherwise grab the deepest "path contributing" match (ignoring index and
  // pathless layout routes)


  let pathMatches = getPathContributingMatches(matches);
  return pathMatches[pathMatches.length - 1];
} //#endregion


//# sourceMappingURL=router.js.map


/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/icon/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/icon/index.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */

/** @typedef {{icon: JSX.Element, size?: number} & import('@wordpress/primitives').SVGProps} IconProps */

/**
 * Return an SVG icon.
 *
 * @param {IconProps} props icon is the SVG component to render
 *                          size is a number specifiying the icon size in pixels
 *                          Other props will be passed to wrapped SVG component
 *
 * @return {JSX.Element}  Icon component
 */

function Icon(_ref) {
  let {
    icon,
    size = 24,
    ...props
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(icon, {
    width: size,
    height: size,
    ...props
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Icon);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/brush.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/brush.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const brush = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M4 20h8v-1.5H4V20zM18.9 3.5c-.6-.6-1.5-.6-2.1 0l-7.2 7.2c-.4-.1-.7 0-1.1.1-.5.2-1.5.7-1.9 2.2-.4 1.7-.8 2.2-1.1 2.7-.1.1-.2.3-.3.4l-.6 1.1H6c2 0 3.4-.4 4.7-1.4.8-.6 1.2-1.4 1.3-2.3 0-.3 0-.5-.1-.7L19 5.7c.5-.6.5-1.6-.1-2.2zM9.7 14.7c-.7.5-1.5.8-2.4 1 .2-.5.5-1.2.8-2.3.2-.6.4-1 .8-1.1.5-.1 1 .1 1.3.3.2.2.3.5.2.8 0 .3-.1.9-.7 1.3z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (brush);
//# sourceMappingURL=brush.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/check.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/check.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const check = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M16.7 7.1l-6.3 8.5-3.3-2.5-.9 1.2 4.5 3.4L17.9 8z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (check);
//# sourceMappingURL=check.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/chevron-left.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/chevron-left.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const chevronLeft = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M14.6 7l-1.2-1L8 12l5.4 6 1.2-1-4.6-5z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (chevronLeft);
//# sourceMappingURL=chevron-left.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/chevron-right.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/chevron-right.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const chevronRight = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M10.6 6L9.4 7l4.6 5-4.6 5 1.2 1 5.4-6z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (chevronRight);
//# sourceMappingURL=chevron-right.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/close-small.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/close-small.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const closeSmall = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (closeSmall);
//# sourceMappingURL=close-small.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/color.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/color.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const color = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M17.2 10.9c-.5-1-1.2-2.1-2.1-3.2-.6-.9-1.3-1.7-2.1-2.6L12 4l-1 1.1c-.6.9-1.3 1.7-2 2.6-.8 1.2-1.5 2.3-2 3.2-.6 1.2-1 2.2-1 3 0 3.4 2.7 6.1 6.1 6.1s6.1-2.7 6.1-6.1c0-.8-.3-1.8-1-3zm-5.1 7.6c-2.5 0-4.6-2.1-4.6-4.6 0-.3.1-1 .8-2.3.5-.9 1.1-1.9 2-3.1.7-.9 1.3-1.7 1.8-2.3.7.8 1.3 1.6 1.8 2.3.8 1.1 1.5 2.2 2 3.1.7 1.3.8 2 .8 2.3 0 2.5-2.1 4.6-4.6 4.6z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (color);
//# sourceMappingURL=color.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/copy.js":
/*!********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/copy.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const copy = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M20.2 8v11c0 .7-.6 1.2-1.2 1.2H6v1.5h13c1.5 0 2.7-1.2 2.7-2.8V8zM18 16.4V4.6c0-.9-.7-1.6-1.6-1.6H4.6C3.7 3 3 3.7 3 4.6v11.8c0 .9.7 1.6 1.6 1.6h11.8c.9 0 1.6-.7 1.6-1.6zm-13.5 0V4.6c0-.1.1-.1.1-.1h11.8c.1 0 .1.1.1.1v11.8c0 .1-.1.1-.1.1H4.6l-.1-.1z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (copy);
//# sourceMappingURL=copy.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/header.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/header.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const header = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M18.5 10.5H10v8h8a.5.5 0 00.5-.5v-7.5zm-10 0h-3V18a.5.5 0 00.5.5h2.5v-8zM6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (header);
//# sourceMappingURL=header.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/help.js":
/*!********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/help.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const help = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M12 4.75a7.25 7.25 0 100 14.5 7.25 7.25 0 000-14.5zM3.25 12a8.75 8.75 0 1117.5 0 8.75 8.75 0 01-17.5 0zM12 8.75a1.5 1.5 0 01.167 2.99c-.465.052-.917.44-.917 1.01V14h1.5v-.845A3 3 0 109 10.25h1.5a1.5 1.5 0 011.5-1.5zM11.25 15v1.5h1.5V15h-1.5z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (help);
//# sourceMappingURL=help.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/home.js":
/*!********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/home.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const home = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M12 4L4 7.9V20h16V7.9L12 4zm6.5 14.5H14V13h-4v5.5H5.5V8.8L12 5.7l6.5 3.1v9.7z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (home);
//# sourceMappingURL=home.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/info.js":
/*!********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/info.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const info = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M12 3.2c-4.8 0-8.8 3.9-8.8 8.8 0 4.8 3.9 8.8 8.8 8.8 4.8 0 8.8-3.9 8.8-8.8 0-4.8-4-8.8-8.8-8.8zm0 16c-4 0-7.2-3.3-7.2-7.2C4.8 8 8 4.8 12 4.8s7.2 3.3 7.2 7.2c0 4-3.2 7.2-7.2 7.2zM11 17h2v-6h-2v6zm0-8h2V7h-2v2z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (info);
//# sourceMappingURL=info.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/institution.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/institution.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const institute = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  fillRule: "evenodd",
  d: "M18.646 9H20V8l-1-.5L12 4 5 7.5 4 8v1h14.646zm-3-1.5L12 5.677 8.354 7.5h7.292zm-7.897 9.44v-6.5h-1.5v6.5h1.5zm5-6.5v6.5h-1.5v-6.5h1.5zm5 0v6.5h-1.5v-6.5h1.5zm2.252 8.81c0 .414-.334.75-.748.75H4.752a.75.75 0 010-1.5h14.5a.75.75 0 01.749.75z",
  clipRule: "evenodd"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (institute);
//# sourceMappingURL=institution.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/more-vertical.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/more-vertical.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const moreVertical = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M13 19h-2v-2h2v2zm0-6h-2v-2h2v2zm0-6h-2V5h2v2z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (moreVertical);
//# sourceMappingURL=more-vertical.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/move-to.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/move-to.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const moveTo = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M19.75 9c0-1.257-.565-2.197-1.39-2.858-.797-.64-1.827-1.017-2.815-1.247-1.802-.42-3.703-.403-4.383-.396L11 4.5V6l.177-.001c.696-.006 2.416-.02 4.028.356.887.207 1.67.518 2.216.957.52.416.829.945.829 1.688 0 .592-.167.966-.407 1.23-.255.281-.656.508-1.236.674-1.19.34-2.82.346-4.607.346h-.077c-1.692 0-3.527 0-4.942.404-.732.209-1.424.545-1.935 1.108-.526.579-.796 1.33-.796 2.238 0 1.257.565 2.197 1.39 2.858.797.64 1.827 1.017 2.815 1.247 1.802.42 3.703.403 4.383.396L13 19.5h.714V22L18 18.5 13.714 15v3H13l-.177.001c-.696.006-2.416.02-4.028-.356-.887-.207-1.67-.518-2.216-.957-.52-.416-.829-.945-.829-1.688 0-.592.167-.966.407-1.23.255-.281.656-.508 1.237-.674 1.189-.34 2.819-.346 4.606-.346h.077c1.692 0 3.527 0 4.941-.404.732-.209 1.425-.545 1.936-1.108.526-.579.796-1.33.796-2.238z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (moveTo);
//# sourceMappingURL=move-to.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/navigation.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/navigation.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const navigation = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M12 4c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14.5c-3.6 0-6.5-2.9-6.5-6.5S8.4 5.5 12 5.5s6.5 2.9 6.5 6.5-2.9 6.5-6.5 6.5zM9 16l4.5-3L15 8.4l-4.5 3L9 16z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (navigation);
//# sourceMappingURL=navigation.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/pages.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/pages.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const pages = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M7 13.8h6v-1.5H7v1.5zM18 16V4c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2zM5.5 16V4c0-.3.2-.5.5-.5h10c.3 0 .5.2.5.5v12c0 .3-.2.5-.5.5H6c-.3 0-.5-.2-.5-.5zM7 10.5h8V9H7v1.5zm0-3.3h8V5.8H7v1.4zM20.2 6v13c0 .7-.6 1.2-1.2 1.2H8v1.5h11c1.5 0 2.7-1.2 2.7-2.8V6h-1.5z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pages);
//# sourceMappingURL=pages.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/plugins.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/plugins.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const plugins = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M10.5 4v4h3V4H15v4h1.5a1 1 0 011 1v4l-3 4v2a1 1 0 01-1 1h-3a1 1 0 01-1-1v-2l-3-4V9a1 1 0 011-1H9V4h1.5zm.5 12.5v2h2v-2l3-4v-3H8v3l3 4z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugins);
//# sourceMappingURL=plugins.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/post.js":
/*!********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/post.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const post = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "m7.3 9.7 1.4 1.4c.2-.2.3-.3.4-.5 0 0 0-.1.1-.1.3-.5.4-1.1.3-1.6L12 7 9 4 7.2 6.5c-.6-.1-1.1 0-1.6.3 0 0-.1 0-.1.1-.3.1-.4.2-.6.4l1.4 1.4L4 11v1h1l2.3-2.3zM4 20h9v-1.5H4V20zm0-5.5V16h16v-1.5H4z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (post);
//# sourceMappingURL=post.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/redo.js":
/*!********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/redo.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const redo = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M15.6 6.5l-1.1 1 2.9 3.3H8c-.9 0-1.7.3-2.3.9-1.4 1.5-1.4 4.2-1.4 5.6v.2h1.5v-.3c0-1.1 0-3.5 1-4.5.3-.3.7-.5 1.3-.5h9.2L14.5 15l1.1 1.1 4.6-4.6-4.6-5z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (redo);
//# sourceMappingURL=redo.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/search.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/search.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const search = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M13 5c-3.3 0-6 2.7-6 6 0 1.4.5 2.7 1.3 3.7l-3.8 3.8 1.1 1.1 3.8-3.8c1 .8 2.3 1.3 3.7 1.3 3.3 0 6-2.7 6-6S16.3 5 13 5zm0 10.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (search);
//# sourceMappingURL=search.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/shipping.js":
/*!************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/shipping.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const shipping = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M3 6.75C3 5.784 3.784 5 4.75 5H15V7.313l.05.027 5.056 2.73.394.212v3.468a1.75 1.75 0 01-1.75 1.75h-.012a2.5 2.5 0 11-4.975 0H9.737a2.5 2.5 0 11-4.975 0H3V6.75zM13.5 14V6.5H4.75a.25.25 0 00-.25.25V14h.965a2.493 2.493 0 011.785-.75c.7 0 1.332.287 1.785.75H13.5zm4.535 0h.715a.25.25 0 00.25-.25v-2.573l-4-2.16v4.568a2.487 2.487 0 011.25-.335c.7 0 1.332.287 1.785.75zM6.282 15.5a1.002 1.002 0 00.968 1.25 1 1 0 10-.968-1.25zm9 0a1 1 0 101.937.498 1 1 0 00-1.938-.498z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (shipping);
//# sourceMappingURL=shipping.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/star-empty.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/star-empty.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const starEmpty = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  fillRule: "evenodd",
  d: "M9.706 8.646a.25.25 0 01-.188.137l-4.626.672a.25.25 0 00-.139.427l3.348 3.262a.25.25 0 01.072.222l-.79 4.607a.25.25 0 00.362.264l4.138-2.176a.25.25 0 01.233 0l4.137 2.175a.25.25 0 00.363-.263l-.79-4.607a.25.25 0 01.072-.222l3.347-3.262a.25.25 0 00-.139-.427l-4.626-.672a.25.25 0 01-.188-.137l-2.069-4.192a.25.25 0 00-.448 0L9.706 8.646zM12 7.39l-.948 1.921a1.75 1.75 0 01-1.317.957l-2.12.308 1.534 1.495c.412.402.6.982.503 1.55l-.362 2.11 1.896-.997a1.75 1.75 0 011.629 0l1.895.997-.362-2.11a1.75 1.75 0 01.504-1.55l1.533-1.495-2.12-.308a1.75 1.75 0 01-1.317-.957L12 7.39z",
  clipRule: "evenodd"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (starEmpty);
//# sourceMappingURL=star-empty.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/star-filled.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/star-filled.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const starFilled = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M11.776 4.454a.25.25 0 01.448 0l2.069 4.192a.25.25 0 00.188.137l4.626.672a.25.25 0 01.139.426l-3.348 3.263a.25.25 0 00-.072.222l.79 4.607a.25.25 0 01-.362.263l-4.138-2.175a.25.25 0 00-.232 0l-4.138 2.175a.25.25 0 01-.363-.263l.79-4.607a.25.25 0 00-.071-.222L4.754 9.881a.25.25 0 01.139-.426l4.626-.672a.25.25 0 00.188-.137l2.069-4.192z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (starFilled);
//# sourceMappingURL=star-filled.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/store.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/store.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const store = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  fillRule: "evenodd",
  d: "M19.75 11H21V8.667L19.875 4H4.125L3 8.667V11h1.25v8.75h15.5V11zm-1.5 0H5.75v7.25H10V13h4v5.25h4.25V11zm-5.5-5.5h2.067l.486 3.24.028.76H12.75v-4zm-3.567 0h2.067v4H8.669l.028-.76.486-3.24zm7.615 3.1l-.464-3.1h2.36l.806 3.345V9.5h-2.668l-.034-.9zM7.666 5.5h-2.36L4.5 8.845V9.5h2.668l.034-.9.464-3.1z",
  clipRule: "evenodd"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (store);
//# sourceMappingURL=store.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/styles.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/styles.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "styles": () => (/* binding */ styles)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const styles = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M12 4c-4.4 0-8 3.6-8 8v.1c0 4.1 3.2 7.5 7.2 7.9h.8c4.4 0 8-3.6 8-8s-3.6-8-8-8zm0 15V5c3.9 0 7 3.1 7 7s-3.1 7-7 7z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styles);
//# sourceMappingURL=styles.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/typography.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/typography.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const typography = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M6.9 7L3 17.8h1.7l1-2.8h4.1l1 2.8h1.7L8.6 7H6.9zm-.7 6.6l1.5-4.3 1.5 4.3h-3zM21.6 17c-.1.1-.2.2-.3.2-.1.1-.2.1-.4.1s-.3-.1-.4-.2c-.1-.1-.1-.3-.1-.6V12c0-.5 0-1-.1-1.4-.1-.4-.3-.7-.5-1-.2-.2-.5-.4-.9-.5-.4 0-.8-.1-1.3-.1s-1 .1-1.4.2c-.4.1-.7.3-1 .4-.2.2-.4.3-.6.5-.1.2-.2.4-.2.7 0 .3.1.5.2.8.2.2.4.3.8.3.3 0 .6-.1.8-.3.2-.2.3-.4.3-.7 0-.3-.1-.5-.2-.7-.2-.2-.4-.3-.6-.4.2-.2.4-.3.7-.4.3-.1.6-.1.8-.1.3 0 .6 0 .8.1.2.1.4.3.5.5.1.2.2.5.2.9v1.1c0 .3-.1.5-.3.6-.2.2-.5.3-.9.4-.3.1-.7.3-1.1.4-.4.1-.8.3-1.1.5-.3.2-.6.4-.8.7-.2.3-.3.7-.3 1.2 0 .6.2 1.1.5 1.4.3.4.9.5 1.6.5.5 0 1-.1 1.4-.3.4-.2.8-.6 1.1-1.1 0 .4.1.7.3 1 .2.3.6.4 1.2.4.4 0 .7-.1.9-.2.2-.1.5-.3.7-.4h-.3zm-3-.9c-.2.4-.5.7-.8.8-.3.2-.6.2-.8.2-.4 0-.6-.1-.9-.3-.2-.2-.3-.6-.3-1.1 0-.5.1-.9.3-1.2s.5-.5.8-.7c.3-.2.7-.3 1-.5.3-.1.6-.3.7-.6v3.4z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (typography);
//# sourceMappingURL=typography.js.map

/***/ }),

/***/ "./node_modules/@wordpress/interface/build-module/components/action-item/index.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@wordpress/interface/build-module/components/action-item/index.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);



/**
 * WordPress dependencies
 */



const noop = () => {};

function ActionItemSlot(_ref) {
  let {
    name,
    as: Component = _wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ButtonGroup,
    fillProps = {},
    bubblesVirtually,
    ...props
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Slot, {
    name: name,
    bubblesVirtually: bubblesVirtually,
    fillProps: fillProps
  }, fills => {
    if (!_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Children.toArray(fills).length) {
      return null;
    } // Special handling exists for backward compatibility.
    // It ensures that menu items created by plugin authors aren't
    // duplicated with automatically injected menu items coming
    // from pinnable plugin sidebars.
    // @see https://github.com/WordPress/gutenberg/issues/14457


    const initializedByPlugins = [];
    _wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Children.forEach(fills, _ref2 => {
      let {
        props: {
          __unstableExplicitMenuItem,
          __unstableTarget
        }
      } = _ref2;

      if (__unstableTarget && __unstableExplicitMenuItem) {
        initializedByPlugins.push(__unstableTarget);
      }
    });
    const children = _wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Children.map(fills, child => {
      if (!child.props.__unstableExplicitMenuItem && initializedByPlugins.includes(child.props.__unstableTarget)) {
        return null;
      }

      return child;
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(Component, props, children);
  });
}

function ActionItem(_ref3) {
  let {
    name,
    as: Component = _wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button,
    onClick,
    ...props
  } = _ref3;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Fill, {
    name: name
  }, _ref4 => {
    let {
      onClick: fpOnClick
    } = _ref4;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(Component, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      onClick: onClick || fpOnClick ? function () {
        (onClick || noop)(...arguments);
        (fpOnClick || noop)(...arguments);
      } : undefined
    }, props));
  });
}

ActionItem.Slot = ActionItemSlot;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ActionItem);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/interface/build-module/components/complementary-area-context/index.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/@wordpress/interface/build-module/components/complementary-area-context/index.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/plugins */ "@wordpress/plugins");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_0__.withPluginContext)((context, ownProps) => {
  return {
    icon: ownProps.icon || context.icon,
    identifier: ownProps.identifier || `${context.name}/${ownProps.name}`
  };
}));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/interface/build-module/components/complementary-area-header/index.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/@wordpress/interface/build-module/components/complementary-area-header/index.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/close-small.js");
/* harmony import */ var _complementary_area_toggle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../complementary-area-toggle */ "./node_modules/@wordpress/interface/build-module/components/complementary-area-toggle/index.js");



/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */



const ComplementaryAreaHeader = _ref => {
  let {
    smallScreenTitle,
    children,
    className,
    toggleButtonProps
  } = _ref;
  const toggleButton = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_complementary_area_toggle__WEBPACK_IMPORTED_MODULE_3__["default"], (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__["default"]
  }, toggleButtonProps));
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "components-panel__header interface-complementary-area-header__small"
  }, smallScreenTitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "interface-complementary-area-header__small-title"
  }, smallScreenTitle), toggleButton), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('components-panel__header', 'interface-complementary-area-header', className),
    tabIndex: -1
  }, children, toggleButton));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ComplementaryAreaHeader);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/interface/build-module/components/complementary-area-more-menu-item/index.js":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/@wordpress/interface/build-module/components/complementary-area-more-menu-item/index.js ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ComplementaryAreaMoreMenuItem)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/check.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _complementary_area_toggle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../complementary-area-toggle */ "./node_modules/@wordpress/interface/build-module/components/complementary-area-toggle/index.js");
/* harmony import */ var _action_item__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../action-item */ "./node_modules/@wordpress/interface/build-module/components/action-item/index.js");



/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */




const PluginsMenuItem = _ref => {
  let {
    // Menu item is marked with unstable prop for backward compatibility.
    // They are removed so they don't leak to DOM elements.
    // @see https://github.com/WordPress/gutenberg/issues/14457
    __unstableExplicitMenuItem,
    __unstableTarget,
    ...restProps
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.MenuItem, restProps);
};

function ComplementaryAreaMoreMenuItem(_ref2) {
  let {
    scope,
    target,
    __unstableExplicitMenuItem,
    ...props
  } = _ref2;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_complementary_area_toggle__WEBPACK_IMPORTED_MODULE_3__["default"], (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    as: toggleProps => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_action_item__WEBPACK_IMPORTED_MODULE_4__["default"], (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
        __unstableExplicitMenuItem: __unstableExplicitMenuItem,
        __unstableTarget: `${scope}/${target}`,
        as: PluginsMenuItem,
        name: `${scope}/plugin-more-menu`
      }, toggleProps));
    },
    role: "menuitemcheckbox",
    selectedIcon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__["default"],
    name: target,
    scope: scope
  }, props));
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/interface/build-module/components/complementary-area-toggle/index.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/@wordpress/interface/build-module/components/complementary-area-toggle/index.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store */ "./node_modules/@wordpress/interface/build-module/store/index.js");
/* harmony import */ var _complementary_area_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../complementary-area-context */ "./node_modules/@wordpress/interface/build-module/components/complementary-area-context/index.js");



/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */




function ComplementaryAreaToggle(_ref) {
  let {
    as = _wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button,
    scope,
    identifier,
    icon,
    selectedIcon,
    name,
    ...props
  } = _ref;
  const ComponentToUse = as;
  const isSelected = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => select(_store__WEBPACK_IMPORTED_MODULE_4__.store).getActiveComplementaryArea(scope) === identifier, [identifier]);
  const {
    enableComplementaryArea,
    disableComplementaryArea
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_4__.store);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(ComponentToUse, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    icon: selectedIcon && isSelected ? selectedIcon : icon,
    onClick: () => {
      if (isSelected) {
        disableComplementaryArea(scope);
      } else {
        enableComplementaryArea(scope, identifier);
      }
    }
  }, props));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_complementary_area_context__WEBPACK_IMPORTED_MODULE_5__["default"])(ComplementaryAreaToggle));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/interface/build-module/components/complementary-area/index.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@wordpress/interface/build-module/components/complementary-area/index.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/check.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/star-filled.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/star-empty.js");
/* harmony import */ var _wordpress_viewport__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/viewport */ "@wordpress/viewport");
/* harmony import */ var _wordpress_viewport__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_viewport__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _complementary_area_header__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../complementary-area-header */ "./node_modules/@wordpress/interface/build-module/components/complementary-area-header/index.js");
/* harmony import */ var _complementary_area_more_menu_item__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../complementary-area-more-menu-item */ "./node_modules/@wordpress/interface/build-module/components/complementary-area-more-menu-item/index.js");
/* harmony import */ var _complementary_area_toggle__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../complementary-area-toggle */ "./node_modules/@wordpress/interface/build-module/components/complementary-area-toggle/index.js");
/* harmony import */ var _complementary_area_context__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../complementary-area-context */ "./node_modules/@wordpress/interface/build-module/components/complementary-area-context/index.js");
/* harmony import */ var _pinned_items__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../pinned-items */ "./node_modules/@wordpress/interface/build-module/components/pinned-items/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../store */ "./node_modules/@wordpress/interface/build-module/store/index.js");



/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */







/**
 * Internal dependencies
 */








function ComplementaryAreaSlot(_ref) {
  let {
    scope,
    ...props
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Slot, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    name: `ComplementaryArea/${scope}`
  }, props));
}

function ComplementaryAreaFill(_ref2) {
  let {
    scope,
    children,
    className
  } = _ref2;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Fill, {
    name: `ComplementaryArea/${scope}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: className
  }, children));
}

function useAdjustComplementaryListener(scope, identifier, activeArea, isActive, isSmall) {
  const previousIsSmall = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
  const shouldOpenWhenNotSmall = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
  const {
    enableComplementaryArea,
    disableComplementaryArea
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_7__.store);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    // If the complementary area is active and the editor is switching from
    // a big to a small window size.
    if (isActive && isSmall && !previousIsSmall.current) {
      disableComplementaryArea(scope); // Flag the complementary area to be reopened when the window size
      // goes from small to big.

      shouldOpenWhenNotSmall.current = true;
    } else if ( // If there is a flag indicating the complementary area should be
    // enabled when we go from small to big window size and we are going
    // from a small to big window size.
    shouldOpenWhenNotSmall.current && !isSmall && previousIsSmall.current) {
      // Remove the flag indicating the complementary area should be
      // enabled.
      shouldOpenWhenNotSmall.current = false;
      enableComplementaryArea(scope, identifier);
    } else if ( // If the flag is indicating the current complementary should be
    // reopened but another complementary area becomes active, remove
    // the flag.
    shouldOpenWhenNotSmall.current && activeArea && activeArea !== identifier) {
      shouldOpenWhenNotSmall.current = false;
    }

    if (isSmall !== previousIsSmall.current) {
      previousIsSmall.current = isSmall;
    }
  }, [isActive, isSmall, scope, identifier, activeArea]);
}

function ComplementaryArea(_ref3) {
  let {
    children,
    className,
    closeLabel = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Close plugin'),
    identifier,
    header,
    headerClassName,
    icon,
    isPinnable = true,
    panelClassName,
    scope,
    name,
    smallScreenTitle,
    title,
    toggleShortcut,
    isActiveByDefault,
    showIconLabels = false
  } = _ref3;
  const {
    isLoading,
    isActive,
    isPinned,
    activeArea,
    isSmall,
    isLarge
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    const {
      getActiveComplementaryArea,
      isComplementaryAreaLoading,
      isItemPinned
    } = select(_store__WEBPACK_IMPORTED_MODULE_7__.store);

    const _activeArea = getActiveComplementaryArea(scope);

    return {
      isLoading: isComplementaryAreaLoading(scope),
      isActive: _activeArea === identifier,
      isPinned: isItemPinned(scope, identifier),
      activeArea: _activeArea,
      isSmall: select(_wordpress_viewport__WEBPACK_IMPORTED_MODULE_6__.store).isViewportMatch('< medium'),
      isLarge: select(_wordpress_viewport__WEBPACK_IMPORTED_MODULE_6__.store).isViewportMatch('large')
    };
  }, [identifier, scope]);
  useAdjustComplementaryListener(scope, identifier, activeArea, isActive, isSmall);
  const {
    enableComplementaryArea,
    disableComplementaryArea,
    pinItem,
    unpinItem
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_7__.store);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    // Set initial visibility: For large screens, enable if it's active by
    // default. For small screens, always initially disable.
    if (isActiveByDefault && activeArea === undefined && !isSmall) {
      enableComplementaryArea(scope, identifier);
    } else if (activeArea === undefined && isSmall) {
      disableComplementaryArea(scope, identifier);
    }
  }, [activeArea, isActiveByDefault, scope, identifier, isSmall]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, isPinnable && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_pinned_items__WEBPACK_IMPORTED_MODULE_8__["default"], {
    scope: scope
  }, isPinned && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_complementary_area_toggle__WEBPACK_IMPORTED_MODULE_9__["default"], {
    scope: scope,
    identifier: identifier,
    isPressed: isActive && (!showIconLabels || isLarge),
    "aria-expanded": isActive,
    "aria-disabled": isLoading,
    label: title,
    icon: showIconLabels ? _wordpress_icons__WEBPACK_IMPORTED_MODULE_10__["default"] : icon,
    showTooltip: !showIconLabels,
    variant: showIconLabels ? 'tertiary' : undefined
  })), name && isPinnable && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_complementary_area_more_menu_item__WEBPACK_IMPORTED_MODULE_11__["default"], {
    target: name,
    scope: scope,
    icon: icon
  }, title), isActive && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(ComplementaryAreaFill, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('interface-complementary-area', className),
    scope: scope
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_complementary_area_header__WEBPACK_IMPORTED_MODULE_12__["default"], {
    className: headerClassName,
    closeLabel: closeLabel,
    onClose: () => disableComplementaryArea(scope),
    smallScreenTitle: smallScreenTitle,
    toggleButtonProps: {
      label: closeLabel,
      shortcut: toggleShortcut,
      scope,
      identifier
    }
  }, header || (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("strong", null, title), isPinnable && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    className: "interface-complementary-area__pin-unpin-item",
    icon: isPinned ? _wordpress_icons__WEBPACK_IMPORTED_MODULE_13__["default"] : _wordpress_icons__WEBPACK_IMPORTED_MODULE_14__["default"],
    label: isPinned ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Unpin from toolbar') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Pin to toolbar'),
    onClick: () => (isPinned ? unpinItem : pinItem)(scope, identifier),
    isPressed: isPinned,
    "aria-expanded": isPinned
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Panel, {
    className: panelClassName
  }, children)));
}

const ComplementaryAreaWrapped = (0,_complementary_area_context__WEBPACK_IMPORTED_MODULE_15__["default"])(ComplementaryArea);
ComplementaryAreaWrapped.Slot = ComplementaryAreaSlot;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ComplementaryAreaWrapped);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/interface/build-module/components/fullscreen-mode/index.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/@wordpress/interface/build-module/components/fullscreen-mode/index.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */


const FullscreenMode = _ref => {
  let {
    isActive
  } = _ref;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let isSticky = false; // `is-fullscreen-mode` is set in PHP as a body class by Gutenberg, and this causes
    // `sticky-menu` to be applied by WordPress and prevents the admin menu being scrolled
    // even if `is-fullscreen-mode` is then removed. Let's remove `sticky-menu` here as
    // a consequence of the FullscreenMode setup.

    if (document.body.classList.contains('sticky-menu')) {
      isSticky = true;
      document.body.classList.remove('sticky-menu');
    }

    return () => {
      if (isSticky) {
        document.body.classList.add('sticky-menu');
      }
    };
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isActive) {
      document.body.classList.add('is-fullscreen-mode');
    } else {
      document.body.classList.remove('is-fullscreen-mode');
    }

    return () => {
      if (isActive) {
        document.body.classList.remove('is-fullscreen-mode');
      }
    };
  }, [isActive]);
  return null;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FullscreenMode);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/interface/build-module/components/index.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@wordpress/interface/build-module/components/index.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ActionItem": () => (/* reexport safe */ _action_item__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   "ComplementaryArea": () => (/* reexport safe */ _complementary_area__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "ComplementaryAreaMoreMenuItem": () => (/* reexport safe */ _complementary_area_more_menu_item__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "FullscreenMode": () => (/* reexport safe */ _fullscreen_mode__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "InterfaceSkeleton": () => (/* reexport safe */ _interface_skeleton__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "MoreMenuDropdown": () => (/* reexport safe */ _more_menu_dropdown__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "MoreMenuFeatureToggle": () => (/* reexport safe */ _more_menu_feature_toggle__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   "NavigableRegion": () => (/* reexport safe */ _navigable_region__WEBPACK_IMPORTED_MODULE_12__["default"]),
/* harmony export */   "PinnedItems": () => (/* reexport safe */ _pinned_items__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "PreferencesModal": () => (/* reexport safe */ _preferences_modal__WEBPACK_IMPORTED_MODULE_8__["default"]),
/* harmony export */   "PreferencesModalSection": () => (/* reexport safe */ _preferences_modal_section__WEBPACK_IMPORTED_MODULE_10__["default"]),
/* harmony export */   "PreferencesModalTabs": () => (/* reexport safe */ _preferences_modal_tabs__WEBPACK_IMPORTED_MODULE_9__["default"]),
/* harmony export */   "___unstablePreferencesModalBaseOption": () => (/* reexport safe */ _preferences_modal_base_option__WEBPACK_IMPORTED_MODULE_11__["default"])
/* harmony export */ });
/* harmony import */ var _complementary_area__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./complementary-area */ "./node_modules/@wordpress/interface/build-module/components/complementary-area/index.js");
/* harmony import */ var _complementary_area_more_menu_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./complementary-area-more-menu-item */ "./node_modules/@wordpress/interface/build-module/components/complementary-area-more-menu-item/index.js");
/* harmony import */ var _fullscreen_mode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fullscreen-mode */ "./node_modules/@wordpress/interface/build-module/components/fullscreen-mode/index.js");
/* harmony import */ var _interface_skeleton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./interface-skeleton */ "./node_modules/@wordpress/interface/build-module/components/interface-skeleton/index.js");
/* harmony import */ var _pinned_items__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pinned-items */ "./node_modules/@wordpress/interface/build-module/components/pinned-items/index.js");
/* harmony import */ var _more_menu_dropdown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./more-menu-dropdown */ "./node_modules/@wordpress/interface/build-module/components/more-menu-dropdown/index.js");
/* harmony import */ var _more_menu_feature_toggle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./more-menu-feature-toggle */ "./node_modules/@wordpress/interface/build-module/components/more-menu-feature-toggle/index.js");
/* harmony import */ var _action_item__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./action-item */ "./node_modules/@wordpress/interface/build-module/components/action-item/index.js");
/* harmony import */ var _preferences_modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./preferences-modal */ "./node_modules/@wordpress/interface/build-module/components/preferences-modal/index.js");
/* harmony import */ var _preferences_modal_tabs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./preferences-modal-tabs */ "./node_modules/@wordpress/interface/build-module/components/preferences-modal-tabs/index.js");
/* harmony import */ var _preferences_modal_section__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./preferences-modal-section */ "./node_modules/@wordpress/interface/build-module/components/preferences-modal-section/index.js");
/* harmony import */ var _preferences_modal_base_option__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./preferences-modal-base-option */ "./node_modules/@wordpress/interface/build-module/components/preferences-modal-base-option/index.js");
/* harmony import */ var _navigable_region__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./navigable-region */ "./node_modules/@wordpress/interface/build-module/components/navigable-region/index.js");













//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/interface/build-module/components/interface-skeleton/index.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@wordpress/interface/build-module/components/interface-skeleton/index.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _navigable_region__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../navigable-region */ "./node_modules/@wordpress/interface/build-module/components/navigable-region/index.js");



/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */





/**
 * Internal dependencies
 */



function useHTMLClass(className) {
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const element = document && document.querySelector(`html:not(.${className})`);

    if (!element) {
      return;
    }

    element.classList.toggle(className);
    return () => {
      element.classList.toggle(className);
    };
  }, [className]);
}

function InterfaceSkeleton(_ref, ref) {
  let {
    isDistractionFree,
    footer,
    header,
    editorNotices,
    sidebar,
    secondarySidebar,
    notices,
    content,
    actions,
    labels,
    className,
    enableRegionNavigation = true,
    // Todo: does this need to be a prop.
    // Can we use a dependency to keyboard-shortcuts directly?
    shortcuts
  } = _ref;
  const navigateRegionsProps = (0,_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__unstableUseNavigateRegions)(shortcuts);
  useHTMLClass('interface-interface-skeleton__html-container');
  const defaultLabels = {
    /* translators: accessibility text for the top bar landmark region. */
    header: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Header'),

    /* translators: accessibility text for the content landmark region. */
    body: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Content'),

    /* translators: accessibility text for the secondary sidebar landmark region. */
    secondarySidebar: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Block Library'),

    /* translators: accessibility text for the settings landmark region. */
    sidebar: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Settings'),

    /* translators: accessibility text for the publish landmark region. */
    actions: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Publish'),

    /* translators: accessibility text for the footer landmark region. */
    footer: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Footer')
  };
  const mergedLabels = { ...defaultLabels,
    ...labels
  };
  const headerVariants = {
    hidden: isDistractionFree ? {
      opacity: 0
    } : {
      opacity: 1
    },
    hover: {
      opacity: 1,
      transition: {
        type: 'tween',
        delay: 0.2,
        delayChildren: 0.2
      }
    }
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, enableRegionNavigation ? navigateRegionsProps : {}, {
    ref: (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_5__.useMergeRefs)([ref, enableRegionNavigation ? navigateRegionsProps.ref : undefined]),
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, 'interface-interface-skeleton', navigateRegionsProps.className, !!footer && 'has-footer')
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "interface-interface-skeleton__editor"
  }, !!header && isDistractionFree && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_navigable_region__WEBPACK_IMPORTED_MODULE_6__["default"], {
    as: _wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__unstableMotion.div,
    className: "interface-interface-skeleton__header",
    "aria-label": mergedLabels.header,
    initial: isDistractionFree ? 'hidden' : 'hover',
    whileHover: "hover",
    variants: headerVariants,
    transition: {
      type: 'tween',
      delay: 0.8
    }
  }, header), !!header && !isDistractionFree && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_navigable_region__WEBPACK_IMPORTED_MODULE_6__["default"], {
    className: "interface-interface-skeleton__header",
    ariaLabel: mergedLabels.header
  }, header), isDistractionFree && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "interface-interface-skeleton__header"
  }, editorNotices), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "interface-interface-skeleton__body"
  }, !!secondarySidebar && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_navigable_region__WEBPACK_IMPORTED_MODULE_6__["default"], {
    className: "interface-interface-skeleton__secondary-sidebar",
    ariaLabel: mergedLabels.secondarySidebar
  }, secondarySidebar), !!notices && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "interface-interface-skeleton__notices"
  }, notices), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_navigable_region__WEBPACK_IMPORTED_MODULE_6__["default"], {
    className: "interface-interface-skeleton__content",
    ariaLabel: mergedLabels.body
  }, content), !!sidebar && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_navigable_region__WEBPACK_IMPORTED_MODULE_6__["default"], {
    className: "interface-interface-skeleton__sidebar",
    ariaLabel: mergedLabels.sidebar
  }, sidebar), !!actions && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_navigable_region__WEBPACK_IMPORTED_MODULE_6__["default"], {
    className: "interface-interface-skeleton__actions",
    ariaLabel: mergedLabels.actions
  }, actions))), !!footer && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_navigable_region__WEBPACK_IMPORTED_MODULE_6__["default"], {
    className: "interface-interface-skeleton__footer",
    ariaLabel: mergedLabels.footer
  }, footer));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(InterfaceSkeleton));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/interface/build-module/components/more-menu-dropdown/index.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@wordpress/interface/build-module/components/more-menu-dropdown/index.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MoreMenuDropdown)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/more-vertical.js");


/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */




function MoreMenuDropdown(_ref) {
  let {
    as: DropdownComponent = _wordpress_components__WEBPACK_IMPORTED_MODULE_2__.DropdownMenu,
    className,

    /* translators: button label text should, if possible, be under 16 characters. */
    label = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Options'),
    popoverProps,
    toggleProps,
    children
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownComponent, {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('interface-more-menu-dropdown', className),
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__["default"],
    label: label,
    popoverProps: {
      placement: 'bottom-end',
      ...popoverProps,
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('interface-more-menu-dropdown__content', popoverProps === null || popoverProps === void 0 ? void 0 : popoverProps.className)
    },
    toggleProps: {
      tooltipPosition: 'bottom',
      ...toggleProps
    }
  }, onClose => children(onClose));
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/interface/build-module/components/more-menu-feature-toggle/index.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/@wordpress/interface/build-module/components/more-menu-feature-toggle/index.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MoreMenuFeatureToggle)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/check.js");
/* harmony import */ var _wordpress_a11y__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/a11y */ "@wordpress/a11y");
/* harmony import */ var _wordpress_a11y__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_a11y__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store */ "./node_modules/@wordpress/interface/build-module/store/index.js");


/**
 * WordPress dependencies
 */





/**
 * Internal dependencies
 */


function MoreMenuFeatureToggle(_ref) {
  let {
    scope,
    label,
    info,
    messageActivated,
    messageDeactivated,
    shortcut,
    feature
  } = _ref;
  const isActive = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => select(_store__WEBPACK_IMPORTED_MODULE_5__.store).isFeatureActive(scope, feature), [feature]);
  const {
    toggleFeature
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_5__.store);

  const speakMessage = () => {
    if (isActive) {
      (0,_wordpress_a11y__WEBPACK_IMPORTED_MODULE_4__.speak)(messageDeactivated || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Feature deactivated'));
    } else {
      (0,_wordpress_a11y__WEBPACK_IMPORTED_MODULE_4__.speak)(messageActivated || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Feature activated'));
    }
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.MenuItem, {
    icon: isActive && _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__["default"],
    isSelected: isActive,
    onClick: () => {
      toggleFeature(scope, feature);
      speakMessage();
    },
    role: "menuitemcheckbox",
    info: info,
    shortcut: shortcut
  }, label);
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/interface/build-module/components/navigable-region/index.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@wordpress/interface/build-module/components/navigable-region/index.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavigableRegion)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);



/**
 * External dependencies
 */

function NavigableRegion(_ref) {
  let {
    children,
    className,
    ariaLabel,
    as: Tag = 'div',
    ...props
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(Tag, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('interface-navigable-region', className),
    "aria-label": ariaLabel,
    role: "region",
    tabIndex: "-1"
  }, props), children);
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/interface/build-module/components/pinned-items/index.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@wordpress/interface/build-module/components/pinned-items/index.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);



/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */



function PinnedItems(_ref) {
  let {
    scope,
    ...props
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Fill, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    name: `PinnedItems/${scope}`
  }, props));
}

function PinnedItemsSlot(_ref2) {
  let {
    scope,
    className,
    ...props
  } = _ref2;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Slot, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    name: `PinnedItems/${scope}`
  }, props), fills => (fills === null || fills === void 0 ? void 0 : fills.length) > 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, 'interface-pinned-items')
  }, fills));
}

PinnedItems.Slot = PinnedItemsSlot;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PinnedItems);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/interface/build-module/components/preferences-modal-base-option/index.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@wordpress/interface/build-module/components/preferences-modal-base-option/index.js ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */


function BaseOption(_ref) {
  let {
    help,
    label,
    isChecked,
    onChange,
    children
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "interface-preferences-modal__option"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    __nextHasNoMarginBottom: true,
    help: help,
    label: label,
    checked: isChecked,
    onChange: onChange
  }), children);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BaseOption);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/interface/build-module/components/preferences-modal-section/index.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/@wordpress/interface/build-module/components/preferences-modal-section/index.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


const Section = _ref => {
  let {
    description,
    title,
    children
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("fieldset", {
    className: "interface-preferences-modal__section"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("legend", {
    className: "interface-preferences-modal__section-legend"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "interface-preferences-modal__section-title"
  }, title), description && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "interface-preferences-modal__section-description"
  }, description)), children);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Section);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/interface/build-module/components/preferences-modal-tabs/index.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/@wordpress/interface/build-module/components/preferences-modal-tabs/index.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PreferencesModalTabs)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/chevron-left.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/chevron-right.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);


/**
 * WordPress dependencies
 */





const PREFERENCES_MENU = 'preferences-menu';
function PreferencesModalTabs(_ref) {
  let {
    sections
  } = _ref;
  const isLargeViewport = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__.useViewportMatch)('medium'); // This is also used to sync the two different rendered components
  // between small and large viewports.

  const [activeMenu, setActiveMenu] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(PREFERENCES_MENU);
  /**
   * Create helper objects from `sections` for easier data handling.
   * `tabs` is used for creating the `TabPanel` and `sectionsContentMap`
   * is used for easier access to active tab's content.
   */

  const {
    tabs,
    sectionsContentMap
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    let mappedTabs = {
      tabs: [],
      sectionsContentMap: {}
    };

    if (sections.length) {
      mappedTabs = sections.reduce((accumulator, _ref2) => {
        let {
          name,
          tabLabel: title,
          content
        } = _ref2;
        accumulator.tabs.push({
          name,
          title
        });
        accumulator.sectionsContentMap[name] = content;
        return accumulator;
      }, {
        tabs: [],
        sectionsContentMap: {}
      });
    }

    return mappedTabs;
  }, [sections]);
  const getCurrentTab = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(tab => sectionsContentMap[tab.name] || null, [sectionsContentMap]);
  let modalContent; // We render different components based on the viewport size.

  if (isLargeViewport) {
    modalContent = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TabPanel, {
      className: "interface-preferences__tabs",
      tabs: tabs,
      initialTabName: activeMenu !== PREFERENCES_MENU ? activeMenu : undefined,
      onSelect: setActiveMenu,
      orientation: "vertical"
    }, getCurrentTab);
  } else {
    modalContent = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalNavigatorProvider, {
      initialPath: "/",
      className: "interface-preferences__provider"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalNavigatorScreen, {
      path: "/"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Card, {
      isBorderless: true,
      size: "small"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.CardBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalItemGroup, null, tabs.map(tab => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalNavigatorButton, {
        key: tab.name,
        path: tab.name,
        as: _wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalItem,
        isAction: true
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalHStack, {
        justify: "space-between"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FlexItem, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalTruncate, null, tab.title)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FlexItem, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_4__["default"], {
        icon: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.isRTL)() ? _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__["default"] : _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__["default"]
      }))));
    }))))), sections.length && sections.map(section => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalNavigatorScreen, {
        key: `${section.name}-menu`,
        path: section.name
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Card, {
        isBorderless: true,
        size: "large"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.CardHeader, {
        isBorderless: false,
        justify: "left",
        size: "small",
        gap: "6"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalNavigatorBackButton, {
        icon: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.isRTL)() ? _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__["default"] : _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__["default"],
        "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Navigate to the previous view')
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalText, {
        size: "16"
      }, section.tabLabel)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.CardBody, null, section.content)));
    }));
  }

  return modalContent;
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/interface/build-module/components/preferences-modal/index.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@wordpress/interface/build-module/components/preferences-modal/index.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PreferencesModal)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);


/**
 * WordPress dependencies
 */


function PreferencesModal(_ref) {
  let {
    closeModal,
    children
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Modal, {
    className: "interface-preferences-modal",
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Preferences'),
    onRequestClose: closeModal
  }, children);
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/interface/build-module/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@wordpress/interface/build-module/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ActionItem": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_0__.ActionItem),
/* harmony export */   "ComplementaryArea": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_0__.ComplementaryArea),
/* harmony export */   "ComplementaryAreaMoreMenuItem": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_0__.ComplementaryAreaMoreMenuItem),
/* harmony export */   "FullscreenMode": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_0__.FullscreenMode),
/* harmony export */   "InterfaceSkeleton": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_0__.InterfaceSkeleton),
/* harmony export */   "MoreMenuDropdown": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_0__.MoreMenuDropdown),
/* harmony export */   "MoreMenuFeatureToggle": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_0__.MoreMenuFeatureToggle),
/* harmony export */   "NavigableRegion": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_0__.NavigableRegion),
/* harmony export */   "PinnedItems": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_0__.PinnedItems),
/* harmony export */   "PreferencesModal": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_0__.PreferencesModal),
/* harmony export */   "PreferencesModalSection": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_0__.PreferencesModalSection),
/* harmony export */   "PreferencesModalTabs": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_0__.PreferencesModalTabs),
/* harmony export */   "___unstablePreferencesModalBaseOption": () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_0__.___unstablePreferencesModalBaseOption),
/* harmony export */   "store": () => (/* reexport safe */ _store__WEBPACK_IMPORTED_MODULE_1__.store)
/* harmony export */ });
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components */ "./node_modules/@wordpress/interface/build-module/components/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store */ "./node_modules/@wordpress/interface/build-module/store/index.js");


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/interface/build-module/store/actions.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@wordpress/interface/build-module/store/actions.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "disableComplementaryArea": () => (/* binding */ disableComplementaryArea),
/* harmony export */   "enableComplementaryArea": () => (/* binding */ enableComplementaryArea),
/* harmony export */   "pinItem": () => (/* binding */ pinItem),
/* harmony export */   "setDefaultComplementaryArea": () => (/* binding */ setDefaultComplementaryArea),
/* harmony export */   "setFeatureDefaults": () => (/* binding */ setFeatureDefaults),
/* harmony export */   "setFeatureValue": () => (/* binding */ setFeatureValue),
/* harmony export */   "toggleFeature": () => (/* binding */ toggleFeature),
/* harmony export */   "unpinItem": () => (/* binding */ unpinItem)
/* harmony export */ });
/* harmony import */ var _wordpress_deprecated__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/deprecated */ "@wordpress/deprecated");
/* harmony import */ var _wordpress_deprecated__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_deprecated__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_preferences__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/preferences */ "@wordpress/preferences");
/* harmony import */ var _wordpress_preferences__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_preferences__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


/**
 * Set a default complementary area.
 *
 * @param {string} scope Complementary area scope.
 * @param {string} area  Area identifier.
 *
 * @return {Object} Action object.
 */

const setDefaultComplementaryArea = (scope, area) => ({
  type: 'SET_DEFAULT_COMPLEMENTARY_AREA',
  scope,
  area
});
/**
 * Enable the complementary area.
 *
 * @param {string} scope Complementary area scope.
 * @param {string} area  Area identifier.
 */

const enableComplementaryArea = (scope, area) => _ref => {
  let {
    registry,
    dispatch
  } = _ref;

  // Return early if there's no area.
  if (!area) {
    return;
  }

  const isComplementaryAreaVisible = registry.select(_wordpress_preferences__WEBPACK_IMPORTED_MODULE_1__.store).get(scope, 'isComplementaryAreaVisible');

  if (!isComplementaryAreaVisible) {
    registry.dispatch(_wordpress_preferences__WEBPACK_IMPORTED_MODULE_1__.store).set(scope, 'isComplementaryAreaVisible', true);
  }

  dispatch({
    type: 'ENABLE_COMPLEMENTARY_AREA',
    scope,
    area
  });
};
/**
 * Disable the complementary area.
 *
 * @param {string} scope Complementary area scope.
 */

const disableComplementaryArea = scope => _ref2 => {
  let {
    registry
  } = _ref2;
  const isComplementaryAreaVisible = registry.select(_wordpress_preferences__WEBPACK_IMPORTED_MODULE_1__.store).get(scope, 'isComplementaryAreaVisible');

  if (isComplementaryAreaVisible) {
    registry.dispatch(_wordpress_preferences__WEBPACK_IMPORTED_MODULE_1__.store).set(scope, 'isComplementaryAreaVisible', false);
  }
};
/**
 * Pins an item.
 *
 * @param {string} scope Item scope.
 * @param {string} item  Item identifier.
 *
 * @return {Object} Action object.
 */

const pinItem = (scope, item) => _ref3 => {
  let {
    registry
  } = _ref3;

  // Return early if there's no item.
  if (!item) {
    return;
  }

  const pinnedItems = registry.select(_wordpress_preferences__WEBPACK_IMPORTED_MODULE_1__.store).get(scope, 'pinnedItems'); // The item is already pinned, there's nothing to do.

  if ((pinnedItems === null || pinnedItems === void 0 ? void 0 : pinnedItems[item]) === true) {
    return;
  }

  registry.dispatch(_wordpress_preferences__WEBPACK_IMPORTED_MODULE_1__.store).set(scope, 'pinnedItems', { ...pinnedItems,
    [item]: true
  });
};
/**
 * Unpins an item.
 *
 * @param {string} scope Item scope.
 * @param {string} item  Item identifier.
 */

const unpinItem = (scope, item) => _ref4 => {
  let {
    registry
  } = _ref4;

  // Return early if there's no item.
  if (!item) {
    return;
  }

  const pinnedItems = registry.select(_wordpress_preferences__WEBPACK_IMPORTED_MODULE_1__.store).get(scope, 'pinnedItems');
  registry.dispatch(_wordpress_preferences__WEBPACK_IMPORTED_MODULE_1__.store).set(scope, 'pinnedItems', { ...pinnedItems,
    [item]: false
  });
};
/**
 * Returns an action object used in signalling that a feature should be toggled.
 *
 * @param {string} scope       The feature scope (e.g. core/edit-post).
 * @param {string} featureName The feature name.
 */

function toggleFeature(scope, featureName) {
  return function (_ref5) {
    let {
      registry
    } = _ref5;
    _wordpress_deprecated__WEBPACK_IMPORTED_MODULE_0___default()(`dispatch( 'core/interface' ).toggleFeature`, {
      since: '6.0',
      alternative: `dispatch( 'core/preferences' ).toggle`
    });
    registry.dispatch(_wordpress_preferences__WEBPACK_IMPORTED_MODULE_1__.store).toggle(scope, featureName);
  };
}
/**
 * Returns an action object used in signalling that a feature should be set to
 * a true or false value
 *
 * @param {string}  scope       The feature scope (e.g. core/edit-post).
 * @param {string}  featureName The feature name.
 * @param {boolean} value       The value to set.
 *
 * @return {Object} Action object.
 */

function setFeatureValue(scope, featureName, value) {
  return function (_ref6) {
    let {
      registry
    } = _ref6;
    _wordpress_deprecated__WEBPACK_IMPORTED_MODULE_0___default()(`dispatch( 'core/interface' ).setFeatureValue`, {
      since: '6.0',
      alternative: `dispatch( 'core/preferences' ).set`
    });
    registry.dispatch(_wordpress_preferences__WEBPACK_IMPORTED_MODULE_1__.store).set(scope, featureName, !!value);
  };
}
/**
 * Returns an action object used in signalling that defaults should be set for features.
 *
 * @param {string}                  scope    The feature scope (e.g. core/edit-post).
 * @param {Object<string, boolean>} defaults A key/value map of feature names to values.
 *
 * @return {Object} Action object.
 */

function setFeatureDefaults(scope, defaults) {
  return function (_ref7) {
    let {
      registry
    } = _ref7;
    _wordpress_deprecated__WEBPACK_IMPORTED_MODULE_0___default()(`dispatch( 'core/interface' ).setFeatureDefaults`, {
      since: '6.0',
      alternative: `dispatch( 'core/preferences' ).setDefaults`
    });
    registry.dispatch(_wordpress_preferences__WEBPACK_IMPORTED_MODULE_1__.store).setDefaults(scope, defaults);
  };
}
//# sourceMappingURL=actions.js.map

/***/ }),

/***/ "./node_modules/@wordpress/interface/build-module/store/constants.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@wordpress/interface/build-module/store/constants.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "STORE_NAME": () => (/* binding */ STORE_NAME)
/* harmony export */ });
/**
 * The identifier for the data store.
 *
 * @type {string}
 */
const STORE_NAME = 'core/interface';
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "./node_modules/@wordpress/interface/build-module/store/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@wordpress/interface/build-module/store/index.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "store": () => (/* binding */ store)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions */ "./node_modules/@wordpress/interface/build-module/store/actions.js");
/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./selectors */ "./node_modules/@wordpress/interface/build-module/store/selectors.js");
/* harmony import */ var _reducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reducer */ "./node_modules/@wordpress/interface/build-module/store/reducer.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./node_modules/@wordpress/interface/build-module/store/constants.js");
/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */





/**
 * Store definition for the interface namespace.
 *
 * @see https://github.com/WordPress/gutenberg/blob/HEAD/packages/data/README.md#createReduxStore
 *
 * @type {Object}
 */

const store = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.createReduxStore)(_constants__WEBPACK_IMPORTED_MODULE_1__.STORE_NAME, {
  reducer: _reducer__WEBPACK_IMPORTED_MODULE_2__["default"],
  actions: _actions__WEBPACK_IMPORTED_MODULE_3__,
  selectors: _selectors__WEBPACK_IMPORTED_MODULE_4__
}); // Once we build a more generic persistence plugin that works across types of stores
// we'd be able to replace this with a register call.

(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.register)(store);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/interface/build-module/store/reducer.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@wordpress/interface/build-module/store/reducer.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "complementaryAreas": () => (/* binding */ complementaryAreas),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */

function complementaryAreas() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SET_DEFAULT_COMPLEMENTARY_AREA':
      {
        const {
          scope,
          area
        } = action; // If there's already an area, don't overwrite it.

        if (state[scope]) {
          return state;
        }

        return { ...state,
          [scope]: area
        };
      }

    case 'ENABLE_COMPLEMENTARY_AREA':
      {
        const {
          scope,
          area
        } = action;
        return { ...state,
          [scope]: area
        };
      }
  }

  return state;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.combineReducers)({
  complementaryAreas
}));
//# sourceMappingURL=reducer.js.map

/***/ }),

/***/ "./node_modules/@wordpress/interface/build-module/store/selectors.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@wordpress/interface/build-module/store/selectors.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getActiveComplementaryArea": () => (/* binding */ getActiveComplementaryArea),
/* harmony export */   "isComplementaryAreaLoading": () => (/* binding */ isComplementaryAreaLoading),
/* harmony export */   "isFeatureActive": () => (/* binding */ isFeatureActive),
/* harmony export */   "isItemPinned": () => (/* binding */ isItemPinned)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_deprecated__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/deprecated */ "@wordpress/deprecated");
/* harmony import */ var _wordpress_deprecated__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_deprecated__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_preferences__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/preferences */ "@wordpress/preferences");
/* harmony import */ var _wordpress_preferences__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_preferences__WEBPACK_IMPORTED_MODULE_2__);
/**
 * WordPress dependencies
 */



/**
 * Returns the complementary area that is active in a given scope.
 *
 * @param {Object} state Global application state.
 * @param {string} scope Item scope.
 *
 * @return {string | null | undefined} The complementary area that is active in the given scope.
 */

const getActiveComplementaryArea = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.createRegistrySelector)(select => (state, scope) => {
  var _state$complementaryA;

  const isComplementaryAreaVisible = select(_wordpress_preferences__WEBPACK_IMPORTED_MODULE_2__.store).get(scope, 'isComplementaryAreaVisible'); // Return `undefined` to indicate that the user has never toggled
  // visibility, this is the vanilla default. Other code relies on this
  // nuance in the return value.

  if (isComplementaryAreaVisible === undefined) {
    return undefined;
  } // Return `null` to indicate the user hid the complementary area.


  if (isComplementaryAreaVisible === false) {
    return null;
  }

  return state === null || state === void 0 ? void 0 : (_state$complementaryA = state.complementaryAreas) === null || _state$complementaryA === void 0 ? void 0 : _state$complementaryA[scope];
});
const isComplementaryAreaLoading = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.createRegistrySelector)(select => (state, scope) => {
  var _state$complementaryA2;

  const isVisible = select(_wordpress_preferences__WEBPACK_IMPORTED_MODULE_2__.store).get(scope, 'isComplementaryAreaVisible');
  const identifier = state === null || state === void 0 ? void 0 : (_state$complementaryA2 = state.complementaryAreas) === null || _state$complementaryA2 === void 0 ? void 0 : _state$complementaryA2[scope];
  return isVisible && identifier === undefined;
});
/**
 * Returns a boolean indicating if an item is pinned or not.
 *
 * @param {Object} state Global application state.
 * @param {string} scope Scope.
 * @param {string} item  Item to check.
 *
 * @return {boolean} True if the item is pinned and false otherwise.
 */

const isItemPinned = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.createRegistrySelector)(select => (state, scope, item) => {
  var _pinnedItems$item;

  const pinnedItems = select(_wordpress_preferences__WEBPACK_IMPORTED_MODULE_2__.store).get(scope, 'pinnedItems');
  return (_pinnedItems$item = pinnedItems === null || pinnedItems === void 0 ? void 0 : pinnedItems[item]) !== null && _pinnedItems$item !== void 0 ? _pinnedItems$item : true;
});
/**
 * Returns a boolean indicating whether a feature is active for a particular
 * scope.
 *
 * @param {Object} state       The store state.
 * @param {string} scope       The scope of the feature (e.g. core/edit-post).
 * @param {string} featureName The name of the feature.
 *
 * @return {boolean} Is the feature enabled?
 */

const isFeatureActive = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.createRegistrySelector)(select => (state, scope, featureName) => {
  _wordpress_deprecated__WEBPACK_IMPORTED_MODULE_1___default()(`select( 'core/interface' ).isFeatureActive( scope, featureName )`, {
    since: '6.0',
    alternative: `select( 'core/preferences' ).get( scope, featureName )`
  });
  return !!select(_wordpress_preferences__WEBPACK_IMPORTED_MODULE_2__.store).get(scope, featureName);
});
//# sourceMappingURL=selectors.js.map

/***/ }),

/***/ "./src/OnboardingSPA/components/Animate/index.js":
/*!*******************************************************!*\
  !*** ./src/OnboardingSPA/components/Animate/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);


/**
 * A Animator to show animation
 *
 * @param {string}             type  The name of Animation to be shown.
 * @param { object | boolean } after The variable to look after for before showing the animation, by default true to show the children right away.
 *
 */

const Animate = _ref => {
  let {
    type,
    after = true,
    children,
    className = '',
    duration = false,
    timingFunction = false
  } = _ref;
  const prefix = 'animate';
  /**
   * Returns the appropriate className
   *
   * @return {string | void} ClassName that applies the animations
   */

  function getAnimateClassName() {
    if (type) {
      let classname = '';

      switch (type) {
        // Add animation types and appropriate CSS
        case 'fade-in':
          classname = prefix.concat('__fade-in');
          break;

        case 'fade-in-disabled':
          classname = prefix.concat('__fade-in--disabled');
          break;

        case 'fade-in-right':
          classname = prefix.concat('__fade-in--right');
          break;

        case 'fade-in-left':
          classname = prefix.concat('__fade-in--left');
          break;

        case 'fade-in-up':
          classname = prefix.concat('__fade-in--up');
          break;

        case 'shine':
          classname = prefix.concat('__shine');
          break;

        case 'shine-placeholder':
          classname = prefix.concat('__shine--placeholder');
          break;

        case 'dropdown':
          classname = prefix.concat('__dropdown');
          break;

        case 'load':
          classname = prefix.concat('__load');
          break;
      }

      return classname;
    }
  }

  return !after ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${prefix}__blank`
  }, children) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(getAnimateClassName(), className),
    style: {
      animationDuration: duration,
      animationTimingFunction: timingFunction
    }
  }, children);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Animate);

/***/ }),

/***/ "./src/OnboardingSPA/components/App/index.js":
/*!***************************************************!*\
  !*** ./src/OnboardingSPA/components/App/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Header */ "./src/OnboardingSPA/components/Header/index.js");
/* harmony import */ var _Content__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Content */ "./src/OnboardingSPA/components/Content/index.js");
/* harmony import */ var _Drawer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Drawer */ "./src/OnboardingSPA/components/Drawer/index.js");
/* harmony import */ var _Sidebar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Sidebar */ "./src/OnboardingSPA/components/Sidebar/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _utils_api_flow__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/api/flow */ "./src/OnboardingSPA/utils/api/flow.js");
/* harmony import */ var _utils_api_settings__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/api/settings */ "./src/OnboardingSPA/utils/api/settings.js");
/* harmony import */ var _utils_api_ecommerce__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/api/ecommerce */ "./src/OnboardingSPA/utils/api/ecommerce.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _data_routes___WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../data/routes/ */ "./src/OnboardingSPA/data/routes/index.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _wordpress_interface__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @wordpress/interface */ "./node_modules/@wordpress/interface/build-module/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../constants */ "./src/constants.js");
/* harmony import */ var _NewfoldInterfaceSkeleton__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../NewfoldInterfaceSkeleton */ "./src/OnboardingSPA/components/NewfoldInterfaceSkeleton/index.js");
/* harmony import */ var _newfold_labs_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @newfold-labs/js-utility-ui-analytics */ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/index.js");
/* harmony import */ var _utils_analytics__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../utils/analytics */ "./src/OnboardingSPA/utils/analytics/index.js");











 // eslint-disable-next-line import/no-extraneous-dependencies











/**
 * Primary app that renders the <NewfoldInterfaceSkeleton />.
 *
 * Is a child of the hash router and error boundary.
 *
 * @return {WPComponent} App Component
 */

const App = () => {
  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_20__.useLocation)();
  const isLargeViewport = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_12__.useViewportMatch)('medium');
  const pathname = (0,lodash__WEBPACK_IMPORTED_MODULE_11__.kebabCase)(location.pathname);
  const {
    isDrawerOpen,
    newfoldBrand,
    onboardingFlow,
    currentData,
    socialData,
    firstStep,
    routes,
    designSteps,
    allSteps
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_13__.useSelect)(select => {
    return {
      isDrawerOpen: select(_store__WEBPACK_IMPORTED_MODULE_9__.store).isDrawerOpened(),
      newfoldBrand: select(_store__WEBPACK_IMPORTED_MODULE_9__.store).getNewfoldBrand(),
      onboardingFlow: select(_store__WEBPACK_IMPORTED_MODULE_9__.store).getOnboardingFlow(),
      currentData: select(_store__WEBPACK_IMPORTED_MODULE_9__.store).getCurrentOnboardingData(),
      socialData: select(_store__WEBPACK_IMPORTED_MODULE_9__.store).getOnboardingSocialData(),
      firstStep: select(_store__WEBPACK_IMPORTED_MODULE_9__.store).getFirstStep(),
      routes: select(_store__WEBPACK_IMPORTED_MODULE_9__.store).getRoutes(),
      allSteps: select(_store__WEBPACK_IMPORTED_MODULE_9__.store).getAllSteps(),
      designSteps: select(_store__WEBPACK_IMPORTED_MODULE_9__.store).getDesignSteps()
    };
  }, []);
  const [isRequestPlaced, setIsRequestPlaced] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [didVisitBasicInfo, setDidVisitBasicInfo] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [didVisitEcommerce, setDidVisitEcommerce] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const {
    setActiveStep,
    setActiveFlow,
    updateRoutes,
    updateDesignSteps,
    updateAllSteps,
    flushQueue,
    enqueueRequest,
    setOnboardingSocialData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_13__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_9__.store);

  async function syncSocialSettings() {
    const initialData = await (0,_utils_api_settings__WEBPACK_IMPORTED_MODULE_7__.getSettings)();
    const result = await (0,_utils_api_settings__WEBPACK_IMPORTED_MODULE_7__.setSettings)(socialData);
    setDidVisitBasicInfo(false);

    if ((result === null || result === void 0 ? void 0 : result.error) !== null) {
      return initialData === null || initialData === void 0 ? void 0 : initialData.body;
    }

    return result === null || result === void 0 ? void 0 : result.body;
  }

  async function syncStoreDetails() {
    const {
      address,
      tax
    } = currentData.storeDetails;
    let payload = {};

    if (address !== undefined) {
      delete address.country;
      delete address.state;
      payload = address;
    }

    if (tax !== undefined) {
      // const option = tax.option;
      // const isStoreDetailsFilled = tax.isStoreDetailsFilled;
      delete tax.option;
      delete tax.isStoreDetailsFilled; // No Auto-calculate taxes for MMP
      // if (option === "1") {
      // 	if (isStoreDetailsFilled) {
      // 		payload = { ...payload, ...tax };
      // 	}
      // } else {
      // 	payload = { ...payload, ...tax };
      // }

      payload = { ...payload,
        ...tax
      };
    }

    if (!(0,_utils_api_ecommerce__WEBPACK_IMPORTED_MODULE_8__.isEmpty)(payload)) {
      await (0,_utils_api_ecommerce__WEBPACK_IMPORTED_MODULE_8__.updateWPSettings)(payload);
    }

    delete currentData.storeDetails.address;
    delete currentData.storeDetails.tax;
    setDidVisitEcommerce(false);
  }

  async function syncStoreToDB() {
    // The First Welcome Step doesn't have any Store changes
    const isFirstStep = (location === null || location === void 0 ? void 0 : location.pathname) === (firstStep === null || firstStep === void 0 ? void 0 : firstStep.path);

    if (currentData && !isFirstStep) {
      if (!isRequestPlaced) {
        setIsRequestPlaced(true);

        if (didVisitEcommerce) {
          await syncStoreDetails();
        } // If Social Data is changed then sync it


        if (didVisitBasicInfo) {
          const socialDataResp = await syncSocialSettings(); // If Social Data is changed then Sync that also to the store

          if (socialDataResp) {
            setOnboardingSocialData(socialDataResp);
          }
        }

        flushQueue();
        enqueueRequest(_constants__WEBPACK_IMPORTED_MODULE_16__.API_REQUEST.SET_FLOW, () => (0,_utils_api_flow__WEBPACK_IMPORTED_MODULE_6__.setFlow)(currentData));
        setIsRequestPlaced(false);
      }
    } // Check if the Basic Info page was visited


    if (location !== null && location !== void 0 && location.pathname.includes('basic-info')) {
      setDidVisitBasicInfo(true);
    }

    if (location !== null && location !== void 0 && location.pathname.includes('ecommerce')) {
      setDidVisitEcommerce(true);
    }
  }

  const addColorAndTypographyRoutes = () => {
    const updates = removeColorAndTypographyRoutes();
    const steps = [_data_routes___WEBPACK_IMPORTED_MODULE_10__.conditionalSteps.designColors, _data_routes___WEBPACK_IMPORTED_MODULE_10__.conditionalSteps.designTypography];
    return {
      routes: (0,lodash__WEBPACK_IMPORTED_MODULE_11__.orderBy)(updates.routes.concat(steps), ['priority'], ['asc']),
      allSteps: (0,lodash__WEBPACK_IMPORTED_MODULE_11__.orderBy)(updates.allSteps.concat(steps), ['priority'], ['asc']),
      designSteps: (0,lodash__WEBPACK_IMPORTED_MODULE_11__.orderBy)(updates.designSteps.concat(steps), ['priority'], ['asc'])
    };
  };

  const removeColorAndTypographyRoutes = () => {
    return {
      routes: (0,lodash__WEBPACK_IMPORTED_MODULE_11__.filter)(routes, route => !route.path.includes(_data_routes___WEBPACK_IMPORTED_MODULE_10__.conditionalSteps.designColors.path) && !route.path.includes(_data_routes___WEBPACK_IMPORTED_MODULE_10__.conditionalSteps.designTypography.path)),
      allSteps: (0,lodash__WEBPACK_IMPORTED_MODULE_11__.filter)(allSteps, allStep => !allStep.path.includes(_data_routes___WEBPACK_IMPORTED_MODULE_10__.conditionalSteps.designColors.path) && !allStep.path.includes(_data_routes___WEBPACK_IMPORTED_MODULE_10__.conditionalSteps.designTypography.path)),
      designSteps: (0,lodash__WEBPACK_IMPORTED_MODULE_11__.filter)(designSteps, designStep => !designStep.path.includes(_data_routes___WEBPACK_IMPORTED_MODULE_10__.conditionalSteps.designColors.path) && !designStep.path.includes(_data_routes___WEBPACK_IMPORTED_MODULE_10__.conditionalSteps.designTypography.path))
    };
  };

  function handleColorsAndTypographyRoutes() {
    if (location !== null && location !== void 0 && location.pathname.includes('colors') || location !== null && location !== void 0 && location.pathname.includes('typography')) {
      var _currentData$data;

      const updates = currentData !== null && currentData !== void 0 && (_currentData$data = currentData.data) !== null && _currentData$data !== void 0 && _currentData$data.customDesign ? addColorAndTypographyRoutes() : removeColorAndTypographyRoutes();
      updateRoutes(updates.routes);
      updateDesignSteps(updates.designSteps);
      updateAllSteps(updates.allSteps);
    }
  }

  const handlePreviousStepTracking = () => {
    var _window$nfdOnboarding;

    const previousStep = (_window$nfdOnboarding = window.nfdOnboarding) === null || _window$nfdOnboarding === void 0 ? void 0 : _window$nfdOnboarding.previousStepID;

    if (typeof previousStep !== 'string') {
      window.nfdOnboarding.previousStepID = location.pathname;
      _newfold_labs_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_18__.HiiveAnalytics.dispatchEvents(_constants__WEBPACK_IMPORTED_MODULE_16__.HIIVE_ANALYTICS_CATEGORY);
      return;
    }

    if (previousStep.includes('products')) {
      (0,_utils_analytics__WEBPACK_IMPORTED_MODULE_19__.trackHiiveEvent)('products-info', {
        productCount: currentData.storeDetails.productInfo.product_count,
        productTypes: currentData.storeDetails.productInfo.product_types.join(',')
      });
    }

    if (previousStep.includes('site-pages')) {
      var _currentData$data$sit;

      if (((_currentData$data$sit = currentData.data.sitePages) === null || _currentData$data$sit === void 0 ? void 0 : _currentData$data$sit.other) !== false) {
        var _currentData$data$sit2, _currentData$data$sit3;

        (_currentData$data$sit2 = currentData.data.sitePages) === null || _currentData$data$sit2 === void 0 ? void 0 : (_currentData$data$sit3 = _currentData$data$sit2.other) === null || _currentData$data$sit3 === void 0 ? void 0 : _currentData$data$sit3.forEach(sitePage => {
          (0,_utils_analytics__WEBPACK_IMPORTED_MODULE_19__.trackHiiveEvent)(`${sitePage.slug}-layout`, sitePage.slug);
        });
      }
    }

    if (previousStep.includes('site-features')) {
      var _currentData$data2;

      const siteFeatures = (_currentData$data2 = currentData.data) === null || _currentData$data2 === void 0 ? void 0 : _currentData$data2.siteFeatures;

      if (siteFeatures) {
        const siteFeaturesArray = Object.keys(siteFeatures).filter(key => {
          return siteFeatures[key] !== false;
        });
        (0,_utils_analytics__WEBPACK_IMPORTED_MODULE_19__.trackHiiveEvent)('site-features', siteFeaturesArray.join(','));
      }
    }

    window.nfdOnboarding.previousStepID = location.pathname;
    _newfold_labs_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_18__.HiiveAnalytics.dispatchEvents(_constants__WEBPACK_IMPORTED_MODULE_16__.HIIVE_ANALYTICS_CATEGORY);
  };

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    document.body.classList.add(`nfd-brand-${newfoldBrand}`);
  }, [newfoldBrand]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    syncStoreToDB();
    handlePreviousStepTracking();
    handleColorsAndTypographyRoutes();

    if (location.pathname.includes('/step')) {
      setActiveFlow(onboardingFlow);
      setActiveStep(location.pathname);
    }
  }, [location.pathname, onboardingFlow]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_interface__WEBPACK_IMPORTED_MODULE_15__.FullscreenMode, {
    isActive: true
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_14__.SlotFillProvider, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_NewfoldInterfaceSkeleton__WEBPACK_IMPORTED_MODULE_17__["default"], {
    className: classnames__WEBPACK_IMPORTED_MODULE_5___default()('nfd-onboarding-skeleton', `brand-${newfoldBrand}`, `path-${pathname}`, {
      'is-drawer-open': isDrawerOpen
    }, {
      'is-large-viewport': isLargeViewport
    }, {
      'is-small-viewport': !isLargeViewport
    }),
    header: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Header__WEBPACK_IMPORTED_MODULE_1__["default"], null),
    drawer: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Drawer__WEBPACK_IMPORTED_MODULE_3__["default"], null),
    content: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Content__WEBPACK_IMPORTED_MODULE_2__["default"], null),
    sidebar: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Sidebar__WEBPACK_IMPORTED_MODULE_4__["default"], null)
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

/***/ }),

/***/ "./src/OnboardingSPA/components/ColorPickerButton/index.js":
/*!*****************************************************************!*\
  !*** ./src/OnboardingSPA/components/ColorPickerButton/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


// This is a Color Picker Button with a color displayed infront of the name
const ColorPickerButton = _ref => {
  let {
    isColorSelected,
    color,
    slug,
    name,
    callback
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "custom-palette__below-row",
    onClick: () => callback(slug),
    onKeyDown: () => callback(slug),
    role: "button",
    tabIndex: 0
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `custom-palette__below-row-icon ${isColorSelected && 'custom-palette__below-row-icon_selected_border'}`,
    style: {
      backgroundColor: `${color}`
    }
  }, isColorSelected ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, "\u2713") : null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "custom-palette__below-row-text"
  }, name));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ColorPickerButton);

/***/ }),

/***/ "./src/OnboardingSPA/components/Content/index.js":
/*!*******************************************************!*\
  !*** ./src/OnboardingSPA/components/Content/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _StateHandlers_Flow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../StateHandlers/Flow */ "./src/OnboardingSPA/components/StateHandlers/Flow/index.js");






/**
 * Primary content area within the <InterfaceSkeleton />.
 *
 * @return WPComponent
 */

const Content = () => {
  const {
    routes
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    return {
      routes: select(_store__WEBPACK_IMPORTED_MODULE_1__.store).getRoutes()
    };
  });
  const getMappedPages = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    return routes === null || routes === void 0 ? void 0 : routes.map(route => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.Route, {
      key: route.path,
      path: route.path,
      end: true,
      element: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(route.Component, null)
    }));
  }, [routes]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("main", {
    className: "nfd-onboard-content"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
    fallback: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null)
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_StateHandlers_Flow__WEBPACK_IMPORTED_MODULE_3__["default"], null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.Routes, null, getMappedPages(routes)))));
};

const ContentMemo = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(Content);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ContentMemo);

/***/ }),

/***/ "./src/OnboardingSPA/components/Drawer/DrawerPanel/DesignColors.js":
/*!*************************************************************************!*\
  !*** ./src/OnboardingSPA/components/Drawer/DrawerPanel/DesignColors.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Animate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Animate */ "./src/OnboardingSPA/components/Animate/index.js");
/* harmony import */ var _utils_analytics__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../utils/analytics */ "./src/OnboardingSPA/utils/analytics/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _utils_api_themes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../utils/api/themes */ "./src/OnboardingSPA/utils/api/themes.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.js");
/* harmony import */ var _utils_global_styles_use_global_styles_output__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../utils/global-styles/use-global-styles-output */ "./src/OnboardingSPA/utils/global-styles/use-global-styles-output.js");
/* harmony import */ var _pages_Steps_DesignColors_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../pages/Steps/DesignColors/utils */ "./src/OnboardingSPA/pages/Steps/DesignColors/utils.js");
/* harmony import */ var _ColorPickerButton__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../ColorPickerButton */ "./src/OnboardingSPA/components/ColorPickerButton/index.js");















const DesignColors = () => {
  // Used for scrolling into custom colors section
  const customColorsResetRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  /**
   * Predefined color palettes with color mappings
   * eg: calm: {header-background: '#1A4733', secondary-foreground: '#FFF', …}
   */

  const [colors, setColors] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  /**
   * Custom mapping for selected colors from backend
   * eg: base => ["header-foreground", "header-titles", "secondary-foreground"]
   */

  const [customColorsMap, setCustomColorsMap] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  /**
   * Mapped value for every color type for faster updates
   * eg: {base: "#ffffff", contrast: "#404040", ... }
   * Note: This exists for Predefined and Custom colors as well
   */

  const [selectedColors, setSelectedColors] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(); // Custom Colors Section

  /**
   * Custom color mapping selected by the user
   * eg: {base: '#da2929', contrast: '#404040',.. }
   */

  const [customColors, setCustomColors] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  /**
   * Determines which custom color was toggled to select a color
   * e.g. base, primary, secondary..
   */

  const [colorPickerCalledBy, setColorPickerCalledBy] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  /**
   * Determines if color picker should be shown
   * Boolean able to toggle value i.e. true/false
   */

  const [showColorPicker, setShowColorPicker] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  /**
   * Determines if custom colors accordion state
   * Boolean able to toggle value i.e. true/false
   */

  const [isAccordionClosed, setIsAccordionClosed] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const {
    storedPreviewSettings,
    currentData,
    themeStatus
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    return {
      storedPreviewSettings: select(_store__WEBPACK_IMPORTED_MODULE_7__.store).getPreviewSettings(),
      currentData: select(_store__WEBPACK_IMPORTED_MODULE_7__.store).getCurrentOnboardingData(),
      themeStatus: select(_store__WEBPACK_IMPORTED_MODULE_7__.store).getThemeStatus()
    };
  }, []);
  const {
    updatePreviewSettings,
    setCurrentOnboardingData,
    updateThemeStatus
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_7__.store);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (_constants__WEBPACK_IMPORTED_MODULE_9__.THEME_STATUS_ACTIVE === themeStatus) {
      var _currentData$data;

      setColorStylesAndPatterns();

      if ((currentData === null || currentData === void 0 ? void 0 : (_currentData$data = currentData.data) === null || _currentData$data === void 0 ? void 0 : _currentData$data.colorStyle) === 'custom') {
        var _customColorsResetRef;

        setIsAccordionClosed(false);
        customColorsResetRef === null || customColorsResetRef === void 0 ? void 0 : (_customColorsResetRef = customColorsResetRef.current) === null || _customColorsResetRef === void 0 ? void 0 : _customColorsResetRef.scrollIntoView({
          behavior: 'smooth',
          block: 'end'
        });
      }
    }
  }, [themeStatus]);
  /**
   * Fetches the colors for the Drawer and sets the state
   * Contains: 'tailored' and 'custom-picker-grouping'
   */

  const setColorStylesAndPatterns = async () => {
    var _currentData$data2;

    const [globalStyles, colorPaletteResponse] = await Promise.all([(0,_utils_api_themes__WEBPACK_IMPORTED_MODULE_8__.getGlobalStyles)(), (0,_utils_api_themes__WEBPACK_IMPORTED_MODULE_8__.getThemeColors)()]);

    if (colorPaletteResponse !== null && colorPaletteResponse !== void 0 && colorPaletteResponse.error) {
      return updateThemeStatus(_constants__WEBPACK_IMPORTED_MODULE_9__.THEME_STATUS_INIT);
    }

    if (globalStyles !== null && globalStyles !== void 0 && globalStyles.error) {
      return updateThemeStatus(_constants__WEBPACK_IMPORTED_MODULE_9__.THEME_STATUS_INIT);
    }

    setColors(colorPaletteResponse === null || colorPaletteResponse === void 0 ? void 0 : colorPaletteResponse.body.tailored);
    setCustomColorsMap(colorPaletteResponse === null || colorPaletteResponse === void 0 ? void 0 : colorPaletteResponse.body['custom-picker-grouping']);
    let selectedColorsNew;

    if (!((currentData === null || currentData === void 0 ? void 0 : (_currentData$data2 = currentData.data) === null || _currentData$data2 === void 0 ? void 0 : _currentData$data2.colorStyle) === '')) {
      var _globalStyles$body$, _globalStyles$body$$s, _globalStyles$body$$s2, _currentData$data3;

      selectedColorsNew = (_globalStyles$body$ = globalStyles.body[0]) === null || _globalStyles$body$ === void 0 ? void 0 : (_globalStyles$body$$s = _globalStyles$body$.settings) === null || _globalStyles$body$$s === void 0 ? void 0 : (_globalStyles$body$$s2 = _globalStyles$body$$s.color) === null || _globalStyles$body$$s2 === void 0 ? void 0 : _globalStyles$body$$s2.palette;

      if ((currentData === null || currentData === void 0 ? void 0 : (_currentData$data3 = currentData.data) === null || _currentData$data3 === void 0 ? void 0 : _currentData$data3.colorStyle) === 'custom') {
        setSelectedColors((0,_pages_Steps_DesignColors_utils__WEBPACK_IMPORTED_MODULE_11__.storeToState)(selectedColorsNew));
        setCustomColors((0,_pages_Steps_DesignColors_utils__WEBPACK_IMPORTED_MODULE_11__.storeToState)(selectedColorsNew));
      }

      setSelectedColors((0,_pages_Steps_DesignColors_utils__WEBPACK_IMPORTED_MODULE_11__.storeToState)(selectedColorsNew));
    } else {
      // Adds colors to the custom colors at start if not saved
      resetColors();
    }
  };
  /**
   * When the user clicks on reset button it fetches the
   * orginal colors and replaces them in the preview and store
   */


  async function resetColors() {
    var _currentData$data4, _currentData$data4$th, _globalStyles$body$2;

    const globalStyles = await (0,_utils_api_themes__WEBPACK_IMPORTED_MODULE_8__.getGlobalStyles)(true);
    let selectedGlobalStyle;

    if (currentData !== null && currentData !== void 0 && (_currentData$data4 = currentData.data) !== null && _currentData$data4 !== void 0 && (_currentData$data4$th = _currentData$data4.theme) !== null && _currentData$data4$th !== void 0 && _currentData$data4$th.variation) {
      selectedGlobalStyle = globalStyles.body.filter(globalStyle => globalStyle.title === currentData.data.theme.variation)[0];
    } else if (((_globalStyles$body$2 = globalStyles.body[0]) === null || _globalStyles$body$2 === void 0 ? void 0 : _globalStyles$body$2.id) === 0) {
      selectedGlobalStyle = globalStyles.body[0];
    }

    updatePreviewSettings( // eslint-disable-next-line react-hooks/rules-of-hooks
    (0,_utils_global_styles_use_global_styles_output__WEBPACK_IMPORTED_MODULE_10__.useGlobalStylesOutput)(selectedGlobalStyle, storedPreviewSettings));
    setCustomColors();
    const selectedGlobalStylePalette = selectedGlobalStyle.settings.color.palette;
    currentData.data.colorStyle = '';
    setCurrentOnboardingData(currentData);
    setSelectedColors((0,_pages_Steps_DesignColors_utils__WEBPACK_IMPORTED_MODULE_11__.storeToState)(selectedGlobalStylePalette));
    (0,_utils_analytics__WEBPACK_IMPORTED_MODULE_6__.trackHiiveEvent)('color-selection-reset', selectedGlobalStyle.title);
  }
  /**
   * Converts the user selected value into a suitable valid global styles array value
   *
   * @param {string} colorStyle - Selected Color slug
   * @return {Object} selectedGlobalStyle - Updated Global Styles with new color changes
   */


  async function saveThemeColorPalette(colorStyle) {
    var _storedPreviewSetting, _storedPreviewSetting2;

    const selectedGlobalStyle = storedPreviewSettings;
    let selectedThemeColorPalette = storedPreviewSettings === null || storedPreviewSettings === void 0 ? void 0 : (_storedPreviewSetting = storedPreviewSettings.settings) === null || _storedPreviewSetting === void 0 ? void 0 : (_storedPreviewSetting2 = _storedPreviewSetting.color) === null || _storedPreviewSetting2 === void 0 ? void 0 : _storedPreviewSetting2.palette;

    if (!(colors && colorStyle && selectedThemeColorPalette)) {
      return storedPreviewSettings;
    }

    selectedThemeColorPalette = selectedThemeColorPalette.map(color => {
      var _colors$colorStyle;

      if (colors !== null && colors !== void 0 && (_colors$colorStyle = colors[colorStyle]) !== null && _colors$colorStyle !== void 0 && _colors$colorStyle[color.slug]) {
        // If not custom color then look for the predefined colors and get the color from the selected colors
        color.color = colors[colorStyle][color.slug];
      }

      return color;
    }); // Update Global Styles to reflect the same

    selectedGlobalStyle.settings.color.palette = selectedThemeColorPalette;
    updatePreviewSettings( // eslint-disable-next-line react-hooks/rules-of-hooks
    (0,_utils_global_styles_use_global_styles_output__WEBPACK_IMPORTED_MODULE_10__.useGlobalStylesOutput)(selectedGlobalStyle, storedPreviewSettings));
    return selectedGlobalStyle;
  } // Pre-defined Colors Section

  /**
   * Select a color from predefined colors and sync it.
   *
   * @param {string} colorStyle - Selected Color slug
   */


  const handleClick = colorStyle => {
    setCustomColors();
    saveThemeColorPalette(colorStyle);
    setSelectedColors(colors[colorStyle]);
    (0,_pages_Steps_DesignColors_utils__WEBPACK_IMPORTED_MODULE_11__.stateToStore)(colors[colorStyle], colorStyle); //  Save selected color to Store

    currentData.data.colorStyle = colorStyle;
    setCurrentOnboardingData(currentData);
    (0,_utils_analytics__WEBPACK_IMPORTED_MODULE_6__.trackHiiveEvent)('color-selection', colorStyle);
  };
  /**
   * Build the predefined Colors Component
   *
   * @return {WPComponent} Predefined Colors Component
   */


  function buildColors() {
    return Object.keys(colors).map((colorStyle, idx) => {
      var _currentData$data5, _colors$colorStyle2, _colors$colorStyle3, _colors$colorStyle4;

      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        key: colorStyle,
        className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('color-palette drawer-palette--button', {
          'color-palette-selected drawer-palette--button--selected': colorStyle === (currentData === null || currentData === void 0 ? void 0 : (_currentData$data5 = currentData.data) === null || _currentData$data5 === void 0 ? void 0 : _currentData$data5.colorStyle)
        }),
        role: "button",
        tabIndex: idx + 1,
        onClick: () => handleClick(colorStyle),
        onKeyDown: () => handleClick(colorStyle)
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "color-palette__colors"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "color-palette__colors--tertiary",
        style: {
          backgroundColor: `${(_colors$colorStyle2 = colors[colorStyle]) === null || _colors$colorStyle2 === void 0 ? void 0 : _colors$colorStyle2['header-background']}`
        }
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "color-palette__colors--secondary",
        style: {
          backgroundColor: `${(_colors$colorStyle3 = colors[colorStyle]) === null || _colors$colorStyle3 === void 0 ? void 0 : _colors$colorStyle3.secondary}`
        }
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "color-palette__colors--primary",
        style: {
          backgroundColor: `${(_colors$colorStyle4 = colors[colorStyle]) === null || _colors$colorStyle4 === void 0 ? void 0 : _colors$colorStyle4.primary}`
        }
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "color-palette__name drawer-palette--button__text"
      }, colorStyle.charAt(0).toUpperCase() + colorStyle.slice(1)));
    });
  } // Custom Colors Section

  /**
   * Custom Color can be mapped to more than one slug
   * eg: base is mapped to ["header-foreground", "header-titles", "secondary-foreground"]
   * So for every change in base all the subsequent colors must also be changed concurrently
   */


  async function saveCustomColors() {
    var _selectedGlobalStyle$, _selectedGlobalStyle$2;

    const selectedGlobalStyle = storedPreviewSettings;
    const selectedThemeColorPalette = selectedGlobalStyle === null || selectedGlobalStyle === void 0 ? void 0 : (_selectedGlobalStyle$ = selectedGlobalStyle.settings) === null || _selectedGlobalStyle$ === void 0 ? void 0 : (_selectedGlobalStyle$2 = _selectedGlobalStyle$.color) === null || _selectedGlobalStyle$2 === void 0 ? void 0 : _selectedGlobalStyle$2.palette;

    if (selectedThemeColorPalette) {
      for (let idx = 0; idx < selectedThemeColorPalette.length; idx++) {
        var _selectedThemeColorPa;

        const slug = (_selectedThemeColorPa = selectedThemeColorPalette[idx]) === null || _selectedThemeColorPa === void 0 ? void 0 : _selectedThemeColorPa.slug;

        if (colorPickerCalledBy === slug && customColors && customColors[slug] !== undefined) {
          // Assign the color to the color that toggled color picker
          selectedThemeColorPalette[idx].color = customColors[slug];
        }
      } // If there is a mapping for a color to other colors in custom colors map


      if (customColorsMap) {
        const colorVariant = customColorsMap[colorPickerCalledBy];

        if (colorVariant) {
          // Find if the Color had a mapping to other colors and update them with the same color too
          colorVariant.forEach(variant => {
            if (customColors && customColors[colorPickerCalledBy] !== undefined) {
              selectedThemeColorPalette[(0,_pages_Steps_DesignColors_utils__WEBPACK_IMPORTED_MODULE_11__.findInPalette)(variant, storedPreviewSettings, colorPickerCalledBy)].color = customColors[colorPickerCalledBy];
            }
          });
        }
      } // Update the global styles to show the same.


      selectedGlobalStyle.settings.color.palette = selectedThemeColorPalette;
      updatePreviewSettings( // eslint-disable-next-line react-hooks/rules-of-hooks
      (0,_utils_global_styles_use_global_styles_output__WEBPACK_IMPORTED_MODULE_10__.useGlobalStylesOutput)(selectedGlobalStyle, storedPreviewSettings));
    }
  }
  /**
   * Change the color for the active color picker
   * this changes the color when the user clicks on a new color.
   *
   * @param {string} color - The Color hex user has selected
   */


  const handleColorPicker = async color => {
    const selectedColorsLocalCopy = { ...selectedColors
    };
    selectedColorsLocalCopy[colorPickerCalledBy] = color;

    if (customColorsMap) {
      const colorVariant = customColorsMap[colorPickerCalledBy];

      if (colorVariant) {
        // If the selected color has a mapping to other colors the update the other colors respectively
        colorVariant.forEach(variant => {
          selectedColorsLocalCopy[variant] = color;
        });
      }
    }

    saveCustomColors();
    (0,_pages_Steps_DesignColors_utils__WEBPACK_IMPORTED_MODULE_11__.stateToStore)(selectedColorsLocalCopy, 'custom'); //  Save selected color to Store

    currentData.data.colorStyle = 'custom';
    setCurrentOnboardingData(currentData);
    setSelectedColors(selectedColorsLocalCopy);

    if (!customColors) {
      (0,_utils_analytics__WEBPACK_IMPORTED_MODULE_6__.trackHiiveEvent)('color-selection', 'custom');
    }

    setCustomColors(selectedColorsLocalCopy);
  };
  /**
   * Toggles the color picker for every color
   * and sets by which color was the Picker toggled.
   * Note: This does not change the color
   *
   * @param {string} colorType - Color Slug e.g. base, secondary,...
   */


  const handleColorPickerButton = colorType => {
    setShowColorPicker(!showColorPicker);

    if (!showColorPicker) {
      setColorPickerCalledBy(colorType);
    } else {
      setColorPickerCalledBy('');
    }
  };
  /**
   * Build the Custom Colors Component
   *
   * @return {WPComponent} Custom Colors Component
   */


  function buildCustomColors() {
    var _selectedColors$prima, _selectedColors$secon, _selectedColors$heade, _customColors$base;

    const defaultColor = '#fff';
    const primaryColor = customColors && (customColors === null || customColors === void 0 ? void 0 : customColors.primary) !== '' ? customColors.primary : (_selectedColors$prima = selectedColors === null || selectedColors === void 0 ? void 0 : selectedColors.primary) !== null && _selectedColors$prima !== void 0 ? _selectedColors$prima : defaultColor;
    const secondaryColor = customColors && (customColors === null || customColors === void 0 ? void 0 : customColors.secondary) !== '' ? customColors.secondary : (_selectedColors$secon = selectedColors === null || selectedColors === void 0 ? void 0 : selectedColors.secondary) !== null && _selectedColors$secon !== void 0 ? _selectedColors$secon : defaultColor;
    const tertiaryColor = customColors && (customColors === null || customColors === void 0 ? void 0 : customColors['header-background']) !== '' ? customColors['header-background'] : (_selectedColors$heade = selectedColors === null || selectedColors === void 0 ? void 0 : selectedColors['header-background']) !== null && _selectedColors$heade !== void 0 ? _selectedColors$heade : defaultColor;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "custom-palette"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "custom-palette__top",
      role: "button",
      tabIndex: 0,
      onClick: () => setIsAccordionClosed(!isAccordionClosed),
      onKeyDown: () => setIsAccordionClosed(!isAccordionClosed)
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "custom-palette__top-text"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('SELECT CUSTOM COLORS', 'wp-module-onboarding')), isAccordionClosed ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "custom-palette__top-icon"
    }, "+") : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "custom-palette__top-icon"
    }, "-")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Animate__WEBPACK_IMPORTED_MODULE_5__["default"], {
      type: 'fade-in',
      duration: "300ms",
      timingFunction: "ease-in-out",
      className: `custom-palette__below ${isAccordionClosed ? 'custom-palette_acc_closed' : 'custom-palette_acc_opened'}`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ColorPickerButton__WEBPACK_IMPORTED_MODULE_12__["default"], {
      isColorSelected: customColors,
      color: (_customColors$base = customColors === null || customColors === void 0 ? void 0 : customColors.base) !== null && _customColors$base !== void 0 ? _customColors$base : defaultColor,
      slug: "base",
      name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Background', 'wp-module-onboarding'),
      callback: handleColorPickerButton
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ColorPickerButton__WEBPACK_IMPORTED_MODULE_12__["default"], {
      isColorSelected: customColors,
      color: primaryColor,
      slug: "primary",
      name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Primary', 'wp-module-onboarding'),
      callback: handleColorPickerButton
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ColorPickerButton__WEBPACK_IMPORTED_MODULE_12__["default"], {
      isColorSelected: customColors,
      color: secondaryColor,
      slug: "secondary",
      name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Secondary', 'wp-module-onboarding'),
      callback: handleColorPickerButton
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ColorPickerButton__WEBPACK_IMPORTED_MODULE_12__["default"], {
      isColorSelected: customColors,
      color: tertiaryColor,
      slug: "tertiary",
      name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Tertiary', 'wp-module-onboarding'),
      callback: handleColorPickerButton
    })), customColors && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Animate__WEBPACK_IMPORTED_MODULE_5__["default"], {
      type: 'fade-in',
      duration: "300ms"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      ref: customColorsResetRef,
      className: "theme-colors--drawer--reset",
      role: "button",
      tabIndex: 0,
      onClick: resetColors,
      onKeyDown: resetColors
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Reset', 'wp-module-onboarding')))), showColorPicker && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Popover, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      role: "button",
      tabIndex: 0,
      className: "custom-palette__picker-close-icon",
      onClick: () => setShowColorPicker(false),
      onKeyDown: () => setShowColorPicker(false)
    }, "X"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ColorPicker, {
      onChange: handleColorPicker
    })));
  }

  return colors && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "theme-colors--drawer"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Color Palettes', 'wp-module-onboarding')), buildColors(), buildCustomColors());
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DesignColors);

/***/ }),

/***/ "./src/OnboardingSPA/components/Drawer/DrawerPanel/DesignHeaderMenu.js":
/*!*****************************************************************************!*\
  !*** ./src/OnboardingSPA/components/Drawer/DrawerPanel/DesignHeaderMenu.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _utils_api_patterns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/api/patterns */ "./src/OnboardingSPA/utils/api/patterns.js");
/* harmony import */ var _components_LivePreview__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/LivePreview */ "./src/OnboardingSPA/components/LivePreview/index.js");
/* harmony import */ var _utils_api_flow__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils/api/flow */ "./src/OnboardingSPA/utils/api/flow.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.js");
/* harmony import */ var _utils_analytics__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../utils/analytics */ "./src/OnboardingSPA/utils/analytics/index.js");











const DesignHeaderMenu = () => {
  var _storedPreviewSetting;

  const [patterns, setPatterns] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const [headerMenuPreviewData, setHeaderMenuPreviewData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const [selectedPattern, setSelectedPattern] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_8__.useLocation)();
  const {
    currentStep,
    currentData,
    themeStatus,
    storedPreviewSettings
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    return {
      currentStep: select(_store__WEBPACK_IMPORTED_MODULE_2__.store).getStepFromPath(location.pathname),
      currentData: select(_store__WEBPACK_IMPORTED_MODULE_2__.store).getCurrentOnboardingData(),
      themeStatus: select(_store__WEBPACK_IMPORTED_MODULE_2__.store).getThemeStatus(),
      storedPreviewSettings: select(_store__WEBPACK_IMPORTED_MODULE_2__.store).getStepPreviewData()
    };
  }, []);
  const {
    setCurrentOnboardingData,
    updateThemeStatus,
    setHeaderMenuData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_2__.store);

  const getPatternsData = async () => {
    const headerMenuPreviewResponse = await (0,_utils_api_patterns__WEBPACK_IMPORTED_MODULE_3__.getPatterns)(currentStep.patternId);

    if (headerMenuPreviewResponse !== null && headerMenuPreviewResponse !== void 0 && headerMenuPreviewResponse.error) {
      return updateThemeStatus(_constants__WEBPACK_IMPORTED_MODULE_6__.THEME_STATUS_INIT);
    }

    const headerMenuPatterns = headerMenuPreviewResponse === null || headerMenuPreviewResponse === void 0 ? void 0 : headerMenuPreviewResponse.body.pageHeaders;
    const pageContent = headerMenuPreviewResponse === null || headerMenuPreviewResponse === void 0 ? void 0 : headerMenuPreviewResponse.body.pageBody;

    if (!currentData.data.partHeader || currentData.data.partHeader === '') {
      currentData.data.partHeader = headerMenuPatterns[0].slug;
      setCurrentOnboardingData(currentData);
    }

    setSelectedPattern(currentData.data.partHeader);
    setHeaderMenuPreviewData(headerMenuPreviewResponse.body);
    setPatterns(headerMenuPatterns); // read the header menu array to get the selected header pattern and combine it with body content

    let [headerContent, pagePreview] = ['', ''];
    headerMenuPatterns.forEach(headerMenu => {
      if (headerMenu.slug === currentData.data.partHeader) {
        headerContent = headerMenu.content;
      }
    });
    pagePreview = headerContent + pageContent;
    setHeaderMenuData(pagePreview);
  };

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (themeStatus === _constants__WEBPACK_IMPORTED_MODULE_6__.THEME_STATUS_ACTIVE) {
      getPatternsData();
    }
  }, [themeStatus]);

  const handleClick = async idx => {
    if (document.getElementsByClassName('nfd-onboard-content')) {
      document.getElementsByClassName('nfd-onboard-content')[0].scrollIntoView({
        behavior: 'smooth'
      });
    }

    const chosenPattern = patterns[idx];

    if (chosenPattern.slug === selectedPattern) {
      return true;
    }

    setSelectedPattern(chosenPattern.slug);
    currentData.data.partHeader = chosenPattern.slug;
    setCurrentOnboardingData(currentData);
    const newPagePattern = chosenPattern.content + headerMenuPreviewData.pageBody;
    setHeaderMenuData(newPagePattern); // API call to make sure the DB is in sync with the store for the selected header menu

    const result = await (0,_utils_api_flow__WEBPACK_IMPORTED_MODULE_5__.setFlow)(currentData);

    if ((result === null || result === void 0 ? void 0 : result.error) === null) {
      setCurrentOnboardingData(currentData);
    }

    (0,_utils_analytics__WEBPACK_IMPORTED_MODULE_7__.trackHiiveEvent)('theme-header', chosenPattern.slug);
  };

  const buildPreviews = () => {
    return patterns === null || patterns === void 0 ? void 0 : patterns.map((pattern, idx) => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_LivePreview__WEBPACK_IMPORTED_MODULE_4__.LivePreviewSelectableCard, {
        key: idx,
        className: 'theme-header-menu-preview--drawer__list__item',
        selected: pattern.slug === selectedPattern,
        blockGrammer: pattern.content,
        viewportWidth: 900,
        styling: 'custom',
        overlay: false,
        onClick: () => handleClick(idx)
      });
    });
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_LivePreview__WEBPACK_IMPORTED_MODULE_4__.LivePreviewSkeleton, {
    count: (_storedPreviewSetting = storedPreviewSettings[currentStep === null || currentStep === void 0 ? void 0 : currentStep.patternId]) === null || _storedPreviewSetting === void 0 ? void 0 : _storedPreviewSetting.previewCount,
    watch: patterns,
    callback: buildPreviews,
    className: 'theme-header-menu-preview--drawer__list__item',
    viewportWidth: 900
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DesignHeaderMenu);

/***/ }),

/***/ "./src/OnboardingSPA/components/Drawer/DrawerPanel/DesignHomepageMenu.js":
/*!*******************************************************************************!*\
  !*** ./src/OnboardingSPA/components/Drawer/DrawerPanel/DesignHomepageMenu.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);



const DesignHomepageMenu = () => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      padding: '0 16px'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Pick a Homepage Design', 'wp-module-onboarding')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Panel will show a few Homepage Patterns.', 'wp-module-onboarding')));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DesignHomepageMenu);

/***/ }),

/***/ "./src/OnboardingSPA/components/Drawer/DrawerPanel/DesignThemeStylesMenu.js":
/*!**********************************************************************************!*\
  !*** ./src/OnboardingSPA/components/Drawer/DrawerPanel/DesignThemeStylesMenu.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);



const DesignThemeStylesMenu = () => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      padding: '0 16px'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Pick a Theme Style', 'wp-module-onboarding')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No Style Selected', 'wp-module-onboarding')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Panel will show Theme details', 'wp-module-onboarding')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('With Style Selected', 'wp-module-onboarding')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Panel will show single-column of other Styles.', 'wp-module-onboarding')));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DesignThemeStylesMenu);

/***/ }),

/***/ "./src/OnboardingSPA/components/Drawer/DrawerPanel/DesignThemeStylesPreview.js":
/*!*************************************************************************************!*\
  !*** ./src/OnboardingSPA/components/Drawer/DrawerPanel/DesignThemeStylesPreview.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _utils_api_patterns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/api/patterns */ "./src/OnboardingSPA/utils/api/patterns.js");
/* harmony import */ var _utils_api_themes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/api/themes */ "./src/OnboardingSPA/utils/api/themes.js");
/* harmony import */ var _utils_global_styles_use_global_styles_output__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils/global-styles/use-global-styles-output */ "./src/OnboardingSPA/utils/global-styles/use-global-styles-output.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.js");
/* harmony import */ var _LivePreview__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../LivePreview */ "./src/OnboardingSPA/components/LivePreview/index.js");
/* harmony import */ var _utils_analytics__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../utils/analytics */ "./src/OnboardingSPA/utils/analytics/index.js");











const DesignThemeStylesPreview = () => {
  var _themeVariations$curr;

  const [pattern, setPattern] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const [globalStyles, setGlobalStyles] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const [selectedStyle, setSelectedStyle] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const {
    currentStep,
    currentData,
    storedPreviewSettings,
    themeStatus,
    themeVariations
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    return {
      currentStep: select(_store__WEBPACK_IMPORTED_MODULE_2__.store).getCurrentStep(),
      currentData: select(_store__WEBPACK_IMPORTED_MODULE_2__.store).getCurrentOnboardingData(),
      storedPreviewSettings: select(_store__WEBPACK_IMPORTED_MODULE_2__.store).getPreviewSettings(),
      themeStatus: select(_store__WEBPACK_IMPORTED_MODULE_2__.store).getThemeStatus(),
      themeVariations: select(_store__WEBPACK_IMPORTED_MODULE_2__.store).getStepPreviewData()
    };
  }, []);
  const {
    updatePreviewSettings,
    setCurrentOnboardingData,
    updateThemeStatus
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_2__.store);

  const scrollSelectionIntoView = () => {
    if (document.getElementsByClassName('theme-styles-preview--drawer__list__item__title-bar--selected') && document.getElementsByClassName('theme-styles-preview--drawer__list__item__title-bar--selected')[0]) {
      document.getElementsByClassName('theme-styles-preview--drawer__list__item__title-bar--selected')[0].scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  const getStylesAndPatterns = async () => {
    const globalStylesResponse = await (0,_utils_api_themes__WEBPACK_IMPORTED_MODULE_4__.getGlobalStyles)(true);

    if (globalStylesResponse !== null && globalStylesResponse !== void 0 && globalStylesResponse.error) {
      return updateThemeStatus(_constants__WEBPACK_IMPORTED_MODULE_6__.THEME_STATUS_INIT);
    }

    let selectedGlobalStyle;

    if (currentData.data.theme.variation) {
      selectedGlobalStyle = currentData.data.theme.variation;
    } else {
      selectedGlobalStyle = globalStylesResponse.body[0].title;
      currentData.data.theme.variation = selectedGlobalStyle;
      setCurrentOnboardingData(currentData);
    }

    setSelectedStyle(selectedGlobalStyle);
    const patternResponse = await (0,_utils_api_patterns__WEBPACK_IMPORTED_MODULE_3__.getPatterns)(currentStep.patternId, true);

    if (patternResponse !== null && patternResponse !== void 0 && patternResponse.error) {
      return updateThemeStatus(_constants__WEBPACK_IMPORTED_MODULE_6__.THEME_STATUS_INIT);
    }

    setPattern(patternResponse === null || patternResponse === void 0 ? void 0 : patternResponse.body);
    setGlobalStyles(globalStylesResponse === null || globalStylesResponse === void 0 ? void 0 : globalStylesResponse.body);
    scrollSelectionIntoView();
  };

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (themeStatus === _constants__WEBPACK_IMPORTED_MODULE_6__.THEME_STATUS_ACTIVE) {
      getStylesAndPatterns();
    }
  }, [themeStatus]);

  const handleClick = idx => {
    const selectedGlobalStyle = globalStyles[idx];

    if (selectedStyle === selectedGlobalStyle.title) {
      return true;
    }

    updatePreviewSettings( // eslint-disable-next-line react-hooks/rules-of-hooks
    (0,_utils_global_styles_use_global_styles_output__WEBPACK_IMPORTED_MODULE_5__.useGlobalStylesOutput)(selectedGlobalStyle, storedPreviewSettings));
    setSelectedStyle(selectedGlobalStyle.title);
    currentData.data.theme.variation = selectedGlobalStyle.title;
    setCurrentOnboardingData(currentData);
    (0,_utils_analytics__WEBPACK_IMPORTED_MODULE_8__.trackHiiveEvent)('selected-style', selectedGlobalStyle.title);
  };

  const buildPreviews = () => {
    return globalStyles === null || globalStyles === void 0 ? void 0 : globalStyles.map((globalStyle, idx) => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_LivePreview__WEBPACK_IMPORTED_MODULE_7__.LivePreviewSelectableCard, {
        key: idx,
        className: 'theme-styles-preview--drawer__list__item',
        selected: globalStyle.title === selectedStyle,
        blockGrammer: pattern,
        viewportWidth: 900,
        styling: 'custom',
        previewSettings: globalStyle,
        overlay: false,
        onClick: () => handleClick(idx)
      });
    });
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "theme-styles-preview--drawer"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "theme-styles-preview--drawer__list"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_LivePreview__WEBPACK_IMPORTED_MODULE_7__.LivePreviewSkeleton, {
    className: 'theme-styles-preview--drawer__list__item',
    watch: globalStyles && pattern,
    count: (_themeVariations$curr = themeVariations[currentStep === null || currentStep === void 0 ? void 0 : currentStep.patternId]) === null || _themeVariations$curr === void 0 ? void 0 : _themeVariations$curr.previewCount,
    callback: buildPreviews,
    viewportWidth: 900
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DesignThemeStylesPreview);

/***/ }),

/***/ "./src/OnboardingSPA/components/Drawer/DrawerPanel/DesignThemes.js":
/*!*************************************************************************!*\
  !*** ./src/OnboardingSPA/components/Drawer/DrawerPanel/DesignThemes.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);



const DesignThemes = () => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      padding: '0 16px'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Pick a Theme', 'wp-module-onboarding')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No Theme Selected', 'wp-module-onboarding')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Panel will show contextual help', 'wp-module-onboarding')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('With Theme Selected', 'wp-module-onboarding')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Panel will show single-column of other Themes.', 'wp-module-onboarding')));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DesignThemes);

/***/ }),

/***/ "./src/OnboardingSPA/components/Drawer/DrawerPanel/DesignTypography.js":
/*!*****************************************************************************!*\
  !*** ./src/OnboardingSPA/components/Drawer/DrawerPanel/DesignTypography.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _utils_api_themes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils/api/themes */ "./src/OnboardingSPA/utils/api/themes.js");
/* harmony import */ var _utils_global_styles_use_global_styles_output__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../utils/global-styles/use-global-styles-output */ "./src/OnboardingSPA/utils/global-styles/use-global-styles-output.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.js");
/* harmony import */ var _utils_analytics__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../utils/analytics */ "./src/OnboardingSPA/utils/analytics/index.js");











const DesignTypography = () => {
  const drawerFontOptions = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const [isLoaded, setIsLoaded] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [selectedFont, setSelectedFont] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const [fontPalettes, setFontPalettes] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const {
    storedPreviewSettings,
    currentData,
    themeStatus
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    return {
      storedPreviewSettings: select(_store__WEBPACK_IMPORTED_MODULE_4__.store).getPreviewSettings(),
      currentData: select(_store__WEBPACK_IMPORTED_MODULE_4__.store).getCurrentOnboardingData(),
      themeStatus: select(_store__WEBPACK_IMPORTED_MODULE_4__.store).getThemeStatus()
    };
  }, []);
  const {
    updatePreviewSettings,
    setCurrentOnboardingData,
    updateThemeStatus
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_4__.store);

  const getFontStylesAndPatterns = async () => {
    var _storedPreviewSetting, _storedPreviewSetting2;

    const fonts = await (0,_utils_api_themes__WEBPACK_IMPORTED_MODULE_5__.getThemeFonts)();

    if (fonts !== null && fonts !== void 0 && fonts.error) {
      return updateThemeStatus(_constants__WEBPACK_IMPORTED_MODULE_7__.THEME_STATUS_INIT);
    }

    setFontPalettes(fonts === null || fonts === void 0 ? void 0 : fonts.body);
    const stylesCustom = storedPreviewSettings === null || storedPreviewSettings === void 0 ? void 0 : (_storedPreviewSetting = storedPreviewSettings.settings) === null || _storedPreviewSetting === void 0 ? void 0 : (_storedPreviewSetting2 = _storedPreviewSetting.styles[0]) === null || _storedPreviewSetting2 === void 0 ? void 0 : _storedPreviewSetting2.css;

    if (stylesCustom) {
      // Loads in all CSS variables related to fontFamily
      const regex = /--wp--preset--font-family.*;/;
      drawerFontOptions.current.setAttribute('style', stylesCustom.match(regex));
    }

    setIsLoaded(true);
  };

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    var _currentData$data;

    if ((currentData === null || currentData === void 0 ? void 0 : (_currentData$data = currentData.data) === null || _currentData$data === void 0 ? void 0 : _currentData$data.fontStyle) !== '' && fontPalettes !== undefined) {
      var _currentData$data2, _currentData$data3;

      setSelectedFont(currentData === null || currentData === void 0 ? void 0 : (_currentData$data2 = currentData.data) === null || _currentData$data2 === void 0 ? void 0 : _currentData$data2.fontStyle);
      handleClick(currentData === null || currentData === void 0 ? void 0 : (_currentData$data3 = currentData.data) === null || _currentData$data3 === void 0 ? void 0 : _currentData$data3.fontStyle);
    }
  }, [fontPalettes, storedPreviewSettings]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!isLoaded && _constants__WEBPACK_IMPORTED_MODULE_7__.THEME_STATUS_ACTIVE === themeStatus) {
      getFontStylesAndPatterns();
    }
  }, [isLoaded, themeStatus]);

  const handleClick = async function (fontStyle) {
    var _globalStylesCopy$sty, _globalStylesCopy$sty2, _globalStylesCopy$sty3, _globalStylesCopy$sty4, _globalStylesCopy$sty5, _globalStylesCopy$sty6, _globalStylesCopy$sty7, _globalStylesCopy$sty8, _globalStylesCopy$sty9, _globalStylesCopy$sty10, _globalStylesCopy$sty11;

    let context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'click';

    if (selectedFont === fontStyle) {
      return true;
    }

    setSelectedFont(fontStyle); // Changes the Global Styles to Recompute css properties

    const globalStylesCopy = storedPreviewSettings;
    const fontPalettesCopy = fontPalettes;

    if (globalStylesCopy !== null && globalStylesCopy !== void 0 && (_globalStylesCopy$sty = globalStylesCopy.styles) !== null && _globalStylesCopy$sty !== void 0 && (_globalStylesCopy$sty2 = _globalStylesCopy$sty.typography) !== null && _globalStylesCopy$sty2 !== void 0 && _globalStylesCopy$sty2.fontFamily && globalStylesCopy !== null && globalStylesCopy !== void 0 && (_globalStylesCopy$sty3 = globalStylesCopy.styles) !== null && _globalStylesCopy$sty3 !== void 0 && (_globalStylesCopy$sty4 = _globalStylesCopy$sty3.blocks['core/heading']) !== null && _globalStylesCopy$sty4 !== void 0 && (_globalStylesCopy$sty5 = _globalStylesCopy$sty4.typography) !== null && _globalStylesCopy$sty5 !== void 0 && _globalStylesCopy$sty5.fontFamily) {
      var _fontPalettesCopy$fon, _fontPalettesCopy$fon2, _fontPalettesCopy$fon3, _fontPalettesCopy$fon4;

      globalStylesCopy.styles.typography.fontFamily = (_fontPalettesCopy$fon = fontPalettesCopy[fontStyle]) === null || _fontPalettesCopy$fon === void 0 ? void 0 : (_fontPalettesCopy$fon2 = _fontPalettesCopy$fon.styles) === null || _fontPalettesCopy$fon2 === void 0 ? void 0 : (_fontPalettesCopy$fon3 = _fontPalettesCopy$fon2.typography) === null || _fontPalettesCopy$fon3 === void 0 ? void 0 : _fontPalettesCopy$fon3.fontFamily;
      globalStylesCopy.styles.blocks['core/heading'].typography.fontFamily = (_fontPalettesCopy$fon4 = fontPalettesCopy[fontStyle]) === null || _fontPalettesCopy$fon4 === void 0 ? void 0 : _fontPalettesCopy$fon4.styles.blocks['core/heading'].typography.fontFamily;
    }

    if ((_globalStylesCopy$sty6 = globalStylesCopy.styles) !== null && _globalStylesCopy$sty6 !== void 0 && (_globalStylesCopy$sty7 = _globalStylesCopy$sty6.blocks['core/site-title']) !== null && _globalStylesCopy$sty7 !== void 0 && (_globalStylesCopy$sty8 = _globalStylesCopy$sty7.typography) !== null && _globalStylesCopy$sty8 !== void 0 && _globalStylesCopy$sty8.fontFamily) {
      var _fontPalettesCopy$fon5;

      globalStylesCopy.styles.blocks['core/site-title'].typography.fontFamily = (_fontPalettesCopy$fon5 = fontPalettesCopy[fontStyle]) === null || _fontPalettesCopy$fon5 === void 0 ? void 0 : _fontPalettesCopy$fon5.styles.blocks['core/heading'].typography.fontFamily;
    }

    if ((_globalStylesCopy$sty9 = globalStylesCopy.styles) !== null && _globalStylesCopy$sty9 !== void 0 && (_globalStylesCopy$sty10 = _globalStylesCopy$sty9.blocks['core/site-tagline']) !== null && _globalStylesCopy$sty10 !== void 0 && (_globalStylesCopy$sty11 = _globalStylesCopy$sty10.typography) !== null && _globalStylesCopy$sty11 !== void 0 && _globalStylesCopy$sty11.fontFamily) {
      var _fontPalettesCopy$fon6;

      globalStylesCopy.styles.blocks['core/site-tagline'].typography.fontFamily = (_fontPalettesCopy$fon6 = fontPalettesCopy[fontStyle]) === null || _fontPalettesCopy$fon6 === void 0 ? void 0 : _fontPalettesCopy$fon6.styles.blocks['core/heading'].typography.fontFamily;
    } // Saves the data to the Store


    currentData.data.fontStyle = fontStyle;
    updatePreviewSettings( // eslint-disable-next-line react-hooks/rules-of-hooks
    (0,_utils_global_styles_use_global_styles_output__WEBPACK_IMPORTED_MODULE_6__.useGlobalStylesOutput)(globalStylesCopy, storedPreviewSettings));
    setCurrentOnboardingData(currentData);

    if ('click' === context) {
      (0,_utils_analytics__WEBPACK_IMPORTED_MODULE_8__.trackHiiveEvent)('font-selection', fontStyle);
    }
  };

  function buildPalettes() {
    return Object.keys(fontPalettes).map((fontStyle, idx) => {
      var _fontPalettes$fontSty, _fontPalettes$fontSty2, _fontPalettes$fontSty3, _fontPalettes$fontSty4, _fontPalettes$fontSty5, _fontPalettes$fontSty6, _fontPalettes$fontSty7, _fontPalettes$fontSty8, _splitLabel$;

      const splitLabel = (_fontPalettes$fontSty = fontPalettes[fontStyle]) === null || _fontPalettes$fontSty === void 0 ? void 0 : _fontPalettes$fontSty.label.split('&', 2);

      if (splitLabel.length === 0) {
        return null;
      }

      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        key: fontStyle,
        role: "button",
        tabIndex: idx + 1,
        className: classnames__WEBPACK_IMPORTED_MODULE_3___default()('font-palette drawer-palette--button', {
          'font-palette-selected drawer-palette--button--selected': selectedFont === fontStyle
        }),
        onClick: () => handleClick(fontStyle),
        onKeyDown: () => handleClick(fontStyle)
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "font-palette__icon drawer-palette--button__text",
        style: {
          fontFamily: (_fontPalettes$fontSty2 = fontPalettes[fontStyle]) === null || _fontPalettes$fontSty2 === void 0 ? void 0 : (_fontPalettes$fontSty3 = _fontPalettes$fontSty2.styles) === null || _fontPalettes$fontSty3 === void 0 ? void 0 : (_fontPalettes$fontSty4 = _fontPalettes$fontSty3.typography) === null || _fontPalettes$fontSty4 === void 0 ? void 0 : _fontPalettes$fontSty4.fontFamily
        }
      }, "Aa"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "font-palette__name drawer-palette--button__text"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        style: {
          fontFamily: (_fontPalettes$fontSty5 = fontPalettes[fontStyle]) === null || _fontPalettes$fontSty5 === void 0 ? void 0 : _fontPalettes$fontSty5.styles.blocks['core/heading'].typography.fontFamily
        }
      }, splitLabel[0]), splitLabel[1] ? '&' : '', (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        style: {
          fontFamily: (_fontPalettes$fontSty6 = fontPalettes[fontStyle]) === null || _fontPalettes$fontSty6 === void 0 ? void 0 : (_fontPalettes$fontSty7 = _fontPalettes$fontSty6.styles) === null || _fontPalettes$fontSty7 === void 0 ? void 0 : (_fontPalettes$fontSty8 = _fontPalettes$fontSty7.typography) === null || _fontPalettes$fontSty8 === void 0 ? void 0 : _fontPalettes$fontSty8.fontFamily
        }
      }, (_splitLabel$ = splitLabel[1]) !== null && _splitLabel$ !== void 0 ? _splitLabel$ : '')));
    });
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: drawerFontOptions,
    className: "theme-fonts--drawer"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Font Palettes', 'wp-module-onboarding')), fontPalettes && buildPalettes());
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DesignTypography);

/***/ }),

/***/ "./src/OnboardingSPA/components/Drawer/DrawerPanel/Ecommerce/NavStoreInfo.js":
/*!***********************************************************************************!*\
  !*** ./src/OnboardingSPA/components/Drawer/DrawerPanel/Ecommerce/NavStoreInfo.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/chevron-left.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../constants */ "./src/constants.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _Animate__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../Animate */ "./src/OnboardingSPA/components/Animate/index.js");










const NavStoreInfo = () => {
  const {
    storeInfoSteps
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    return {
      storeInfoSteps: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getStoreInfoSteps()
    };
  }, []);
  const {
    setDrawerActiveView
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_5__.store);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Animate__WEBPACK_IMPORTED_MODULE_6__["default"], {
    type: 'fade-in',
    duration: "100ms",
    timingFunction: "ease-in"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    className: "nfd-onboarding-drawer__panel-back",
    variant: "tertiary",
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__["default"],
    onClick: () => setDrawerActiveView(_constants__WEBPACK_IMPORTED_MODULE_3__.VIEW_NAV_PRIMARY)
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Onboarding Menu', 'wp-module-onboarding')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-drawer__panel-menu"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "nfd-onboarding-drawer__panel-routes"
  }, storeInfoSteps.map(step => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
      key: step.path,
      className: "nfd-onboarding-drawer__panel-menu-item"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_8__.NavLink, {
      to: step.path,
      className: "nfd-onboarding-drawer__panel-menu-link",
      state: {
        origin: 'drawer-nav'
      },
      onClick: () => setDrawerActiveView(step.VIEW)
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_9__["default"], {
      icon: step.Icon
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, step.title)));
  }))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NavStoreInfo);

/***/ }),

/***/ "./src/OnboardingSPA/components/Drawer/DrawerPanel/NavDesign.js":
/*!**********************************************************************!*\
  !*** ./src/OnboardingSPA/components/Drawer/DrawerPanel/NavDesign.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/chevron-left.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Animate__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../Animate */ "./src/OnboardingSPA/components/Animate/index.js");











const NavDesign = () => {
  const {
    designSteps
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    return {
      designSteps: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getDesignSteps()
    };
  }, []);
  const {
    setDrawerActiveView
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_5__.store);
  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_8__.useLocation)();
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Animate__WEBPACK_IMPORTED_MODULE_7__["default"], {
    type: 'fade-in',
    duration: "100ms",
    timingFunction: "ease-in"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    className: "nfd-onboarding-drawer__panel-back",
    variant: "tertiary",
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__["default"],
    onClick: () => setDrawerActiveView(_constants__WEBPACK_IMPORTED_MODULE_3__.VIEW_NAV_PRIMARY)
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Onboarding Menu', 'wp-module-onboarding')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-drawer__panel-menu"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "nfd-onboarding-drawer__panel-routes"
  }, designSteps.map(step => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
      key: step.path,
      className: "nfd-onboarding-drawer__panel-menu-item"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_10__.NavLink, {
      to: step.path,
      className: classnames__WEBPACK_IMPORTED_MODULE_6___default()('nfd-onboarding-drawer__panel-menu-link', {
        active: location.pathname === step.path || location.pathname.includes(step === null || step === void 0 ? void 0 : step.designDrawerActiveLinkIncludes)
      }),
      state: {
        origin: 'drawer-nav'
      },
      onClick: () => setDrawerActiveView(step.VIEW)
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_11__["default"], {
      icon: step.Icon
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, step.title)));
  }))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NavDesign);

/***/ }),

/***/ "./src/OnboardingSPA/components/Drawer/DrawerPanel/NavGetStarted.js":
/*!**************************************************************************!*\
  !*** ./src/OnboardingSPA/components/Drawer/DrawerPanel/NavGetStarted.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/chevron-left.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _Animate__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Animate */ "./src/OnboardingSPA/components/Animate/index.js");










const NavGetStarted = () => {
  const {
    getStartedSteps
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    return {
      getStartedSteps: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getGetStartedSteps()
    };
  }, []);
  const {
    setDrawerActiveView
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_5__.store);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Animate__WEBPACK_IMPORTED_MODULE_6__["default"], {
    type: 'fade-in',
    duration: "100ms",
    timingFunction: "ease-in"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    className: "nfd-onboarding-drawer__panel-back",
    variant: "tertiary",
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__["default"],
    onClick: () => setDrawerActiveView(_constants__WEBPACK_IMPORTED_MODULE_3__.VIEW_NAV_PRIMARY)
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Onboarding Menu', 'wp-module-onboarding')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-drawer__panel-menu"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "nfd-onboarding-drawer__panel-routes"
  }, getStartedSteps.map(step => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
      key: step.path,
      className: "nfd-onboarding-drawer__panel-menu-item"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_8__.NavLink, {
      to: step.path,
      className: "nfd-onboarding-drawer__panel-menu-link",
      state: {
        origin: 'drawer-nav'
      },
      onClick: () => setDrawerActiveView(step.VIEW)
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_9__["default"], {
      icon: step.Icon
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, step.title)));
  }))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NavGetStarted);

/***/ }),

/***/ "./src/OnboardingSPA/components/Drawer/DrawerPanel/NavPage.js":
/*!********************************************************************!*\
  !*** ./src/OnboardingSPA/components/Drawer/DrawerPanel/NavPage.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/chevron-left.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Animate__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Animate */ "./src/OnboardingSPA/components/Animate/index.js");









const NavPage = () => {
  const {
    setDrawerActiveView
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_4__.store);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Animate__WEBPACK_IMPORTED_MODULE_6__["default"], {
    type: 'fade-in',
    duration: "100ms",
    timingFunction: "ease-in"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    className: "nfd-onboarding-drawer__panel-back",
    variant: "tertiary",
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__["default"],
    onClick: () => setDrawerActiveView(_constants__WEBPACK_IMPORTED_MODULE_2__.VIEW_NAV_PRIMARY)
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Resume Onboarding', 'wp-module-onboarding')));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NavPage);

/***/ }),

/***/ "./src/OnboardingSPA/components/Drawer/DrawerPanel/NavPrimary.js":
/*!***********************************************************************!*\
  !*** ./src/OnboardingSPA/components/Drawer/DrawerPanel/NavPrimary.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var _ExitToWordPress__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ExitToWordPress */ "./src/OnboardingSPA/components/ExitToWordPress/index.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Animate__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Animate */ "./src/OnboardingSPA/components/Animate/index.js");










const NavPrimary = () => {
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_7__.useNavigate)();
  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_7__.useLocation)();
  const {
    topSteps
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    return {
      topSteps: select(_store__WEBPACK_IMPORTED_MODULE_3__.store).getTopSteps()
    };
  }, []);
  const {
    setDrawerActiveView
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_3__.store);
  const isFirstStep = topSteps[0].path === location.pathname;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Animate__WEBPACK_IMPORTED_MODULE_6__["default"], {
    type: 'fade-in',
    duration: "100ms",
    timingFunction: "ease-in"
  }, isFirstStep && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    className: "nfd-onboarding-drawer__panel-back",
    variant: "tertiary",
    onClick: () => navigate('/page/what-to-expect')
  }, "What to Expect") || (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ExitToWordPress__WEBPACK_IMPORTED_MODULE_2__["default"], {
    buttonClassName: "nfd-onboarding-drawer__panel-back",
    buttonVariant: "tertiary",
    origin: "drawer-panel"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-drawer__panel-menu"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "nfd-onboarding-drawer__panel-routes"
  }, topSteps.map(step => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Tooltip, {
      key: step.path,
      text: step.heading
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
      className: "nfd-onboarding-drawer__panel-menu-item"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_8__.NavLink, {
      to: location.pathname === step.path || location.pathname.includes(step === null || step === void 0 ? void 0 : step.primaryDrawerActiveLinkIncludes) ? location.pathname : step.path,
      className: classnames__WEBPACK_IMPORTED_MODULE_5___default()('nfd-onboarding-drawer__panel-menu-link', {
        active: location.pathname === step.path || location.pathname.includes(step === null || step === void 0 ? void 0 : step.primaryDrawerActiveLinkIncludes)
      }),
      state: {
        origin: 'drawer-nav'
      },
      onClick: () => (step === null || step === void 0 ? void 0 : step.VIEW) && setDrawerActiveView(step.VIEW)
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_9__["default"], {
      icon: step.Icon
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, step.title))));
  }))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NavPrimary);

/***/ }),

/***/ "./src/OnboardingSPA/components/Drawer/DrawerPanel/WithDesignBack.js":
/*!***************************************************************************!*\
  !*** ./src/OnboardingSPA/components/Drawer/DrawerPanel/WithDesignBack.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/chevron-left.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.js");
/* harmony import */ var _Animate__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Animate */ "./src/OnboardingSPA/components/Animate/index.js");









const WithDesignBack = _ref => {
  let {
    children
  } = _ref;
  const {
    setDrawerActiveView
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_4__.store);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Animate__WEBPACK_IMPORTED_MODULE_6__["default"], {
    type: 'fade-in',
    duration: "100ms",
    timingFunction: "ease-in"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    className: "nfd-onboarding-drawer__panel-back",
    variant: "tertiary",
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__["default"],
    onClick: () => setDrawerActiveView(_constants__WEBPACK_IMPORTED_MODULE_5__.VIEW_NAV_DESIGN)
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Design', 'wp-module-onboarding')), children);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WithDesignBack);

/***/ }),

/***/ "./src/OnboardingSPA/components/Drawer/DrawerPanel/index.js":
/*!******************************************************************!*\
  !*** ./src/OnboardingSPA/components/Drawer/DrawerPanel/index.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _DesignColors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DesignColors */ "./src/OnboardingSPA/components/Drawer/DrawerPanel/DesignColors.js");
/* harmony import */ var _DesignHeaderMenu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DesignHeaderMenu */ "./src/OnboardingSPA/components/Drawer/DrawerPanel/DesignHeaderMenu.js");
/* harmony import */ var _DesignHomepageMenu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DesignHomepageMenu */ "./src/OnboardingSPA/components/Drawer/DrawerPanel/DesignHomepageMenu.js");
/* harmony import */ var _DesignThemeStylesMenu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DesignThemeStylesMenu */ "./src/OnboardingSPA/components/Drawer/DrawerPanel/DesignThemeStylesMenu.js");
/* harmony import */ var _DesignThemeStylesPreview__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./DesignThemeStylesPreview */ "./src/OnboardingSPA/components/Drawer/DrawerPanel/DesignThemeStylesPreview.js");
/* harmony import */ var _DesignThemes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./DesignThemes */ "./src/OnboardingSPA/components/Drawer/DrawerPanel/DesignThemes.js");
/* harmony import */ var _DesignTypography__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./DesignTypography */ "./src/OnboardingSPA/components/Drawer/DrawerPanel/DesignTypography.js");
/* harmony import */ var _wordpress_keycodes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @wordpress/keycodes */ "@wordpress/keycodes");
/* harmony import */ var _wordpress_keycodes__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_wordpress_keycodes__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _NavDesign__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./NavDesign */ "./src/OnboardingSPA/components/Drawer/DrawerPanel/NavDesign.js");
/* harmony import */ var _NavGetStarted__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./NavGetStarted */ "./src/OnboardingSPA/components/Drawer/DrawerPanel/NavGetStarted.js");
/* harmony import */ var _NavPage__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./NavPage */ "./src/OnboardingSPA/components/Drawer/DrawerPanel/NavPage.js");
/* harmony import */ var _NavPrimary__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./NavPrimary */ "./src/OnboardingSPA/components/Drawer/DrawerPanel/NavPrimary.js");
/* harmony import */ var _Ecommerce_NavStoreInfo__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Ecommerce/NavStoreInfo */ "./src/OnboardingSPA/components/Drawer/DrawerPanel/Ecommerce/NavStoreInfo.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _WithDesignBack__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./WithDesignBack */ "./src/OnboardingSPA/components/Drawer/DrawerPanel/WithDesignBack.js");






















const DrawerPanel = () => {
  const [isNavView, setIsNavView] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true); // menu-primary is default view

  const {
    isDrawerOpen,
    drawerView
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    const {
      isDrawerOpened,
      getDrawerView
    } = select(_store__WEBPACK_IMPORTED_MODULE_18__.store);
    return {
      isDrawerOpen: isDrawerOpened(),
      drawerView: getDrawerView()
    };
  }, []);
  const {
    setIsDrawerOpened,
    setDrawerActiveView
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_18__.store);

  const closeOnEscape = event => {
    if (event.keyCode === _wordpress_keycodes__WEBPACK_IMPORTED_MODULE_10__.ESCAPE && !event.defaultPrevented) {
      event.preventDefault();
      setIsDrawerOpened(false);
    }
  };

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (_constants__WEBPACK_IMPORTED_MODULE_1__.DRAWER_NAV_VIEWS.includes(drawerView)) {
      setIsNavView(true);
    } else {
      setIsNavView(false);
    }
  }, [drawerView]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_17___default()(`nfd-onboarding-drawer__panel`, {
      'is-open': isDrawerOpen
    }),
    onKeyDown: closeOnEscape
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-drawer__panel-inner"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-drawer__panel-site-title-container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-drawer__panel-site-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_16__.__)('WordPress Onboarding', 'wp-module-onboarding'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-drawer__panel-scroll-container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-drawer__panel-inside"
  }, _constants__WEBPACK_IMPORTED_MODULE_1__.VIEW_NAV_PRIMARY === drawerView && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_NavPrimary__WEBPACK_IMPORTED_MODULE_14__["default"], null), _constants__WEBPACK_IMPORTED_MODULE_1__.VIEW_NAV_DESIGN === drawerView && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_NavDesign__WEBPACK_IMPORTED_MODULE_11__["default"], null), _constants__WEBPACK_IMPORTED_MODULE_1__.VIEW_NAV_GET_STARTED === drawerView && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_NavGetStarted__WEBPACK_IMPORTED_MODULE_12__["default"], null), _constants__WEBPACK_IMPORTED_MODULE_1__.VIEW_NAV_ECOMMERCE_STORE_INFO === drawerView && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Ecommerce_NavStoreInfo__WEBPACK_IMPORTED_MODULE_15__["default"], null), _constants__WEBPACK_IMPORTED_MODULE_1__.VIEW_NAV_PAGE === drawerView && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_NavPage__WEBPACK_IMPORTED_MODULE_13__["default"], null), _constants__WEBPACK_IMPORTED_MODULE_1__.VIEW_DESIGN_THEMES === drawerView && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_WithDesignBack__WEBPACK_IMPORTED_MODULE_19__["default"], null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DesignThemes__WEBPACK_IMPORTED_MODULE_8__["default"], null)), _constants__WEBPACK_IMPORTED_MODULE_1__.VIEW_DESIGN_THEME_STYLES_MENU === drawerView && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_WithDesignBack__WEBPACK_IMPORTED_MODULE_19__["default"], null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DesignThemeStylesMenu__WEBPACK_IMPORTED_MODULE_6__["default"], null)), _constants__WEBPACK_IMPORTED_MODULE_1__.VIEW_DESIGN_THEME_STYLES_PREVIEW === drawerView && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_WithDesignBack__WEBPACK_IMPORTED_MODULE_19__["default"], null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DesignThemeStylesPreview__WEBPACK_IMPORTED_MODULE_7__["default"], null)), _constants__WEBPACK_IMPORTED_MODULE_1__.VIEW_DESIGN_COLORS === drawerView && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_WithDesignBack__WEBPACK_IMPORTED_MODULE_19__["default"], null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DesignColors__WEBPACK_IMPORTED_MODULE_3__["default"], null)), _constants__WEBPACK_IMPORTED_MODULE_1__.VIEW_DESIGN_TYPOGRAPHY === drawerView && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_WithDesignBack__WEBPACK_IMPORTED_MODULE_19__["default"], null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DesignTypography__WEBPACK_IMPORTED_MODULE_9__["default"], null)), _constants__WEBPACK_IMPORTED_MODULE_1__.VIEW_DESIGN_HEADER_MENU === drawerView && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_WithDesignBack__WEBPACK_IMPORTED_MODULE_19__["default"], null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DesignHeaderMenu__WEBPACK_IMPORTED_MODULE_4__["default"], null)), _constants__WEBPACK_IMPORTED_MODULE_1__.VIEW_DESIGN_HOMEPAGE_MENU === drawerView && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_WithDesignBack__WEBPACK_IMPORTED_MODULE_19__["default"], null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DesignHomepageMenu__WEBPACK_IMPORTED_MODULE_5__["default"], null))))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DrawerPanel);

/***/ }),

/***/ "./src/OnboardingSPA/components/Drawer/DrawerToggle/index.js":
/*!*******************************************************************!*\
  !*** ./src/OnboardingSPA/components/Drawer/DrawerToggle/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../store */ "./src/OnboardingSPA/store/index.js");








const DrawerToggle = _ref => {
  let {
    isOpen
  } = _ref;
  const {
    isDrawerOpen,
    isDrawerSuppressed
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    return {
      isDrawerOpen: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).isDrawerOpened(),
      isDrawerSuppressed: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).isDrawerSuppressed()
    };
  }, []);
  const {
    setIsDrawerOpened
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_5__.store);
  const drawerToggleRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!isDrawerOpen) {
      drawerToggleRef.current.focus();
    }
  }, [isDrawerOpen]);

  const toggleDrawer = () => {
    isDrawerSuppressed || setIsDrawerOpened(!isDrawerOpen);
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__unstableMotion.div, {
    className: classnames__WEBPACK_IMPORTED_MODULE_4___default()('nfd-onboarding-drawer__toggle', {
      'is-open': isDrawerOpen
    }),
    whileHover: "expand"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    className: `nfd-onboarding-drawer__toggle-button has-icon ${!isDrawerSuppressed || 'is-suppressed'}`,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Toggle Navigation', 'wp-module-onboarding'),
    ref: drawerToggleRef,
    "aria-pressed": isOpen,
    onClick: toggleDrawer
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      width: '36px',
      height: '36px',
      backgroundImage: 'var(--nfd-onboarding-icon)',
      backgroundSize: 'contain'
    }
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DrawerToggle);

/***/ }),

/***/ "./src/OnboardingSPA/components/Drawer/index.js":
/*!******************************************************!*\
  !*** ./src/OnboardingSPA/components/Drawer/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _DrawerPanel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DrawerPanel */ "./src/OnboardingSPA/components/Drawer/DrawerPanel/index.js");
/* harmony import */ var _DrawerToggle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DrawerToggle */ "./src/OnboardingSPA/components/Drawer/DrawerToggle/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store */ "./src/OnboardingSPA/store/index.js");







/**
 * Off-canvas drawer to left of viewport.
 *
 * @param {*} param0
 * @return
 */

const Drawer = _ref => {
  let {
    isDefaultOpen = false
  } = _ref;
  const isDesktopViewport = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.useViewportMatch)('medium');
  const {
    setIsDrawerOpened
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_5__.store);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setIsDrawerOpened(isDefaultOpen && isDesktopViewport);
  }, [isDefaultOpen, isDesktopViewport, setIsDrawerOpened]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DrawerToggle__WEBPACK_IMPORTED_MODULE_4__["default"], null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DrawerPanel__WEBPACK_IMPORTED_MODULE_3__["default"], null));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(Drawer));

/***/ }),

/***/ "./src/OnboardingSPA/components/ExitToWordPress/index.js":
/*!***************************************************************!*\
  !*** ./src/OnboardingSPA/components/ExitToWordPress/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/chevron-left.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_api_flow__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/api/flow */ "./src/OnboardingSPA/utils/api/flow.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _utils_api_settings__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/api/settings */ "./src/OnboardingSPA/utils/api/settings.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../constants */ "./src/constants.js");
/* harmony import */ var _newfold_labs_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @newfold-labs/js-utility-ui-analytics */ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/index.js");
/* harmony import */ var _utils_analytics__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../utils/analytics */ "./src/OnboardingSPA/utils/analytics/index.js");














/**
 * Self-contained button and confirmation modal for exiting Onboarding page.
 *
 * @param {*} param0
 *
 * @return {WPComponent} ExitToWordPress Component
 */

const ExitToWordPress = _ref => {
  let {
    buttonText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Exit to WordPress', 'wp-module-onboarding'),
    showButtonIcon = true,
    showButton = true,
    buttonVariant = 'secondary',
    buttonClassName = false,
    isModalOpen = false,
    modalTitle = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Exit without finishing?', 'wp-module-onboarding'),
    modalText = false,
    modalPrimaryCloseButtonText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Continue', 'wp-module-onboarding'),
    modalOnClose = false,
    modalExitButtonText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Exit', 'wp-module-onboarding')
  } = _ref;
  const [isOpen, setIsOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(isModalOpen);

  const openModal = () => setIsOpen(true);

  const closeModal = () => {
    if (typeof modalOnClose === 'function') {
      modalOnClose();
    }

    setIsOpen(false);
  };

  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_11__.useLocation)();
  const {
    currentData,
    brandName,
    socialData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    return {
      currentData: select(_store__WEBPACK_IMPORTED_MODULE_6__.store).getCurrentOnboardingData(),
      brandName: select(_store__WEBPACK_IMPORTED_MODULE_6__.store).getNewfoldBrandName(),
      socialData: select(_store__WEBPACK_IMPORTED_MODULE_6__.store).getOnboardingSocialData()
    };
  }, [location.pathname]);
  const {
    setOnboardingSocialData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_6__.store);

  if (!modalText) {
    modalText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)(
    /* translators: %s: Brand */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('You can restart onboarding from your %s Settings page.', 'wp-module-onboarding'), brandName);
  }

  async function syncSocialSettingsFinish() {
    const initialData = await (0,_utils_api_settings__WEBPACK_IMPORTED_MODULE_7__.getSettings)();
    const result = await (0,_utils_api_settings__WEBPACK_IMPORTED_MODULE_7__.setSettings)(socialData);

    if ((result === null || result === void 0 ? void 0 : result.error) !== null) {
      return initialData === null || initialData === void 0 ? void 0 : initialData.body;
    }

    return result === null || result === void 0 ? void 0 : result.body;
  }

  async function saveData(path) {
    if (currentData) {
      currentData.hasExited = new Date().getTime(); // If Social Data is changed then sync it

      if (path !== null && path !== void 0 && path.includes('basic-info')) {
        const socialDataResp = await syncSocialSettingsFinish(); // If Social Data is changed then Sync that also to the store

        if (socialDataResp) {
          setOnboardingSocialData(socialDataResp);
        }
      }

      (0,_utils_api_flow__WEBPACK_IMPORTED_MODULE_5__.setFlow)(currentData);
    }

    (0,_utils_analytics__WEBPACK_IMPORTED_MODULE_10__.trackHiiveEvent)('exit-to-wordpress', window.location.href);
    await _newfold_labs_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_9__.HiiveAnalytics.dispatchEvents(_constants__WEBPACK_IMPORTED_MODULE_8__.HIIVE_ANALYTICS_CATEGORY); //Redirect to Admin Page for normal customers
    // and Bluehost Dashboard for ecommerce customers

    const exitLink = exitToWordpressForEcommerce() ? _constants__WEBPACK_IMPORTED_MODULE_8__.pluginDashboardPage : _constants__WEBPACK_IMPORTED_MODULE_8__.wpAdminPage;
    window.location.replace(exitLink);
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, showButton && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    icon: showButtonIcon ? _wordpress_icons__WEBPACK_IMPORTED_MODULE_12__["default"] : false,
    variant: buttonVariant,
    onClick: openModal,
    className: classnames__WEBPACK_IMPORTED_MODULE_4___default()(`nfd-onboarding-etw__trigger`, buttonClassName)
  }, buttonText), isOpen && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Modal, {
    title: modalTitle,
    onRequestClose: () => closeModal()
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, modalText), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ButtonGroup, {
    className: "nfd-onboarding-etw__buttons"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "secondary",
    onClick: () => closeModal()
  }, modalPrimaryCloseButtonText), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "primary",
    onClick: () => saveData(location.pathname)
  }, modalExitButtonText))));
};
/*
 * check if this is the last step
 */


const exitToWordpressForEcommerce = () => {
  if (window.nfdOnboarding.currentFlow === 'ecommerce') {
    return true;
  }

  return false;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ExitToWordPress);

/***/ }),

/***/ "./src/OnboardingSPA/components/Header/components/HeaderEnd.js":
/*!*********************************************************************!*\
  !*** ./src/OnboardingSPA/components/Header/components/HeaderEnd.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _step_navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../step-navigation */ "./src/OnboardingSPA/components/Header/step-navigation.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.js");








const HeaderEnd = () => {
  const {
    sidebars,
    isHeaderNavigationEnabled
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    return {
      sidebars: select(_store__WEBPACK_IMPORTED_MODULE_4__.store).getSidebars(),
      isHeaderNavigationEnabled: select(_store__WEBPACK_IMPORTED_MODULE_4__.store).isHeaderNavigationEnabled()
    };
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, isHeaderNavigationEnabled && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_step_navigation__WEBPACK_IMPORTED_MODULE_3__["default"], null), sidebars.map(sidebar => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Slot, {
      key: sidebar.id,
      name: `${_constants__WEBPACK_IMPORTED_MODULE_5__.SIDEBAR_MENU_SLOTFILL_PREFIX}/${sidebar.id}`
    });
  }));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HeaderEnd);

/***/ }),

/***/ "./src/OnboardingSPA/components/Header/index.js":
/*!******************************************************!*\
  !*** ./src/OnboardingSPA/components/Header/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_HeaderEnd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/HeaderEnd */ "./src/OnboardingSPA/components/Header/components/HeaderEnd.js");
/* harmony import */ var _ExitToWordPress__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ExitToWordPress */ "./src/OnboardingSPA/components/ExitToWordPress/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store */ "./src/OnboardingSPA/store/index.js");








/**
 * Interface header rendered into header render prop in <InterfaceSkeleton />.
 *
 * @return Header
 */

const Header = () => {
  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_6__.useLocation)();
  const {
    firstStep
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    return {
      firstStep: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getFirstStep()
    };
  }, []);
  const isGettingStarted = (firstStep === null || firstStep === void 0 ? void 0 : firstStep.path) === (location === null || location === void 0 ? void 0 : location.pathname);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-header"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-header__start"
  }, isGettingStarted ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ExitToWordPress__WEBPACK_IMPORTED_MODULE_4__["default"], {
    origin: "header-first-step"
  }) : null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-header__center"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-header__end"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_HeaderEnd__WEBPACK_IMPORTED_MODULE_3__["default"], null)));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(Header));

/***/ }),

/***/ "./src/OnboardingSPA/components/Header/step-navigation.js":
/*!****************************************************************!*\
  !*** ./src/OnboardingSPA/components/Header/step-navigation.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/chevron-left.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/chevron-right.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_api_flow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/api/flow */ "./src/OnboardingSPA/utils/api/flow.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../constants */ "./src/constants.js");









/**
 * Back step Navigation button.
 *
 * @param {*} param0
 *
 * @return {WPComponent} Back Component
 */

const Back = _ref => {
  let {
    path
  } = _ref;
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_7__.useNavigate)();

  const navigateBack = () => navigate(path, {
    state: {
      origin: 'header'
    }
  });

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    className: "navigation-buttons navigation-buttons_back",
    onClick: navigateBack,
    variant: "secondary"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_8__["default"], {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__["default"]
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Back', 'wp-module-onboarding'));
};
/**
 * Next step naigation button
 *
 * @param {*} param0
 *
 * @return {WPComponent} Next Component
 */


const Next = _ref2 => {
  let {
    path
  } = _ref2;

  /* [TODO]: some sense of isStepComplete to enable/disable */
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_7__.useNavigate)();

  const navigateNext = () => navigate(path, {
    state: {
      origin: 'header'
    }
  });

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    onClick: navigateNext,
    variant: "primary",
    className: "navigation-buttons navigation-buttons_next"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Next', 'wp-module-onboarding'), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_8__["default"], {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_10__["default"]
  }));
};

async function saveDataAndExit(currentData) {
  if (currentData) {
    currentData.isComplete = new Date().getTime();
    (0,_utils_api_flow__WEBPACK_IMPORTED_MODULE_4__.setFlow)(currentData);
  } //Redirect to Admin Page for normal customers
  // and Bluehost Dashboard for ecommerce customers


  const exitLink = exitToWordpressForEcommerce() ? _constants__WEBPACK_IMPORTED_MODULE_6__.pluginDashboardPage : _constants__WEBPACK_IMPORTED_MODULE_6__.wpAdminPage;
  window.location.replace(exitLink);
}
/**
 * Finish step navigation button.
 *
 * @param {*} param0
 *
 * @return {WPComponent} Finish Component
 */


const Finish = _ref3 => {
  let {
    currentData,
    saveDataAndExitFunc
  } = _ref3;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    onClick: () => saveDataAndExitFunc(currentData),
    className: "navigation-buttons navigation-buttons_finish",
    variant: "primary"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Finish', 'wp-module-onboarding'), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_8__["default"], {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_10__["default"]
  }));
};
/**
 * Step buttons presented in Header.
 *
 * @return {WPComponent} StepNavigation Component
 */


const StepNavigation = () => {
  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_7__.useLocation)();
  const {
    previousStep,
    nextStep,
    currentData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    return {
      nextStep: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getNextStep(),
      previousStep: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getPreviousStep(),
      currentData: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getCurrentOnboardingData()
    };
  }, [location.pathname]);
  const isFirstStep = null === previousStep || false === previousStep;
  const isLastStep = null === nextStep || false === nextStep;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-header__step-navigation"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ButtonGroup, {
    style: {
      display: 'flex',
      columnGap: '0.5rem'
    }
  }, isFirstStep || isLastStep ? null : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Back, {
    path: previousStep.path
  }), isLastStep ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Finish, {
    currentData: currentData,
    saveDataAndExitFunc: saveDataAndExit
  }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Next, {
    path: nextStep.path
  })));
};
/*
 * check if this is the last step
 */


const exitToWordpressForEcommerce = () => {
  if (window.nfdOnboarding.currentFlow === 'ecommerce') {
    return true;
  }

  return false;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StepNavigation);

/***/ }),

/***/ "./src/OnboardingSPA/components/HeadingWithSubHeading/index.js":
/*!*********************************************************************!*\
  !*** ./src/OnboardingSPA/components/HeadingWithSubHeading/index.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Interface Cards with standard design.
 *
 * @param {Object} root0
 * @param {string} root0.title
 * @param {string} root0.subtitle
 * @param {Object} root0.children
 */
const HeadingWithSubHeading = _ref => {
  let {
    title,
    subtitle,
    children
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-main-heading"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "nfd-main-heading__title"
  }, title), subtitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "nfd-main-heading__subtitle"
  }, subtitle), children);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HeadingWithSubHeading);

/***/ }),

/***/ "./src/OnboardingSPA/components/Layouts/Base.js":
/*!******************************************************!*\
  !*** ./src/OnboardingSPA/components/Layouts/Base.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_a11y__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/a11y */ "@wordpress/a11y");
/* harmony import */ var _wordpress_a11y__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_a11y__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _utils_analytics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/analytics */ "./src/OnboardingSPA/utils/analytics/index.js");







const BaseLayout = _ref => {
  let {
    className = 'nfd-onboarding-layout__base',
    children
  } = _ref;
  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_4__.useLocation)();
  const mainContainer = document.querySelector('.nfd-onboard-content');

  const speakRouteTitle = function () {
    let title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Showing new Onboarding Page';
    // [TODO]: Determine if some routes should not speak the title
    (0,_wordpress_a11y__WEBPACK_IMPORTED_MODULE_2__.speak)(title, 'assertive');
  };

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    mainContainer === null || mainContainer === void 0 ? void 0 : mainContainer.focus({
      preventScroll: true
    });
    speakRouteTitle('Override');
    (0,_utils_analytics__WEBPACK_IMPORTED_MODULE_3__.trackHiiveEvent)('pageview', window.location.href);
  }, [location.pathname]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('nfd-onboarding-layout', className)
  }, children);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BaseLayout);

/***/ }),

/***/ "./src/OnboardingSPA/components/Layouts/Common.js":
/*!********************************************************!*\
  !*** ./src/OnboardingSPA/components/Layouts/Common.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Base */ "./src/OnboardingSPA/components/Layouts/Base.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Animate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Animate */ "./src/OnboardingSPA/components/Animate/index.js");





/**
 *
 * @param {*} param0
 * @return
 */

const InnerContainer = _ref => {
  let {
    children
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: "is-contained"
  }, children);
};
/**
 * The Common Layout extends the Base Layout and applies structural styles and animations.
 *
 * @param {Object} props
 * @param          props.className
 * @param          props.children
 * @param          props.isBgPrimary
 * @param          props.isCentered
 * @param          props.isVerticallyCentered
 * @param          props.isContained
 * @param          props.isPadded
 * @param          props.isFadeIn
 * @return
 */


const CommonLayout = _ref2 => {
  let {
    className = '',
    children,
    isBgPrimary = false,
    isCentered = false,
    isVerticallyCentered = false,
    isContained = false,
    isPadded = false,
    isFadeIn = true
  } = _ref2;
  const Container = isContained ? InnerContainer : _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Animate__WEBPACK_IMPORTED_MODULE_3__["default"], {
    type: isFadeIn && 'fade-in',
    duration: '233ms',
    timingFunction: 'ease-in-out'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Base__WEBPACK_IMPORTED_MODULE_1__["default"], {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('nfd-onboarding-layout__common', className, {
      'is-bg-primary': isBgPrimary
    }, {
      'is-centered': isCentered
    }, {
      'is-vertically-centered': isVerticallyCentered
    }, {
      'is-padded': isPadded
    })
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Container, null, children)));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CommonLayout);

/***/ }),

/***/ "./src/OnboardingSPA/components/LivePreview/BlockPreview/auto.js":
/*!***********************************************************************!*\
  !*** ./src/OnboardingSPA/components/LivePreview/BlockPreview/auto.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AutoBlockPreview)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__);





 // This is used to avoid rendering the block list if the sizes change.

let MemoizedBlockList;
const MAX_HEIGHT = 6000;

function ScaledBlockPreview(_ref) {
  var _settings$__experimen, _settings$__experimen2;

  let {
    viewportWidth,
    settings,
    containerWidth,
    minHeight,
    additionalStyles = []
  } = _ref;

  if (!viewportWidth) {
    viewportWidth = containerWidth;
  }

  const [contentResizeListener, {
    height: contentHeight
  }] = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__.useResizeObserver)();
  const {
    styles,
    assets,
    duotone
  } = {
    styles: settings.styles,
    assets: settings.__unstableResolvedAssets,
    duotone: (_settings$__experimen = settings.__experimentalFeatures) === null || _settings$__experimen === void 0 ? void 0 : (_settings$__experimen2 = _settings$__experimen.color) === null || _settings$__experimen2 === void 0 ? void 0 : _settings$__experimen2.duotone
  }; // Avoid scrollbars for pattern previews.

  const editorStyles = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    if (styles) {
      return [...styles, {
        css: 'body{height:auto;overflow:hidden;border:none;padding:0;}',
        __unstableType: 'presets'
      }, ...additionalStyles];
    }

    return styles;
  }, [styles, additionalStyles]);
  const svgFilters = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    var _duotone$default, _duotone$theme;

    return [...((_duotone$default = duotone === null || duotone === void 0 ? void 0 : duotone.default) !== null && _duotone$default !== void 0 ? _duotone$default : []), ...((_duotone$theme = duotone === null || duotone === void 0 ? void 0 : duotone.theme) !== null && _duotone$theme !== void 0 ? _duotone$theme : [])];
  }, [duotone]); // Initialize on render instead of module top level, to avoid circular dependency issues.

  MemoizedBlockList = MemoizedBlockList || (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__.pure)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.BlockList);
  const scale = containerWidth / viewportWidth;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Disabled, {
    className: "block-editor-block-preview__content",
    style: {
      transform: `scale(${scale})`,
      height: contentHeight * scale,
      maxHeight: contentHeight > MAX_HEIGHT ? MAX_HEIGHT * scale : undefined,
      minHeight
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.__unstableIframe, {
    head: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.__unstableEditorStyles, {
      styles: editorStyles
    }),
    assets: assets,
    contentRef: (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__.useRefEffect)(bodyElement => {
      const {
        ownerDocument: {
          documentElement
        }
      } = bodyElement;
      documentElement.classList.add('block-editor-block-preview__content-iframe');
      documentElement.style.position = 'absolute';
      documentElement.style.width = '100%'; // necessary for contentResizeListener to work.

      bodyElement.style.boxSizing = 'border-box';
      bodyElement.style.position = 'absolute';
      bodyElement.style.width = '100%';
      bodyElement.spellcheck = 0;
    }, []),
    "aria-hidden": true,
    tabIndex: -1,
    style: {
      position: 'absolute',
      width: viewportWidth,
      height: contentHeight,
      pointerEvents: 'none',
      // This is a catch-all max-height for patterns.
      // See: https://github.com/WordPress/gutenberg/pull/38175.
      maxHeight: MAX_HEIGHT,
      minHeight: scale !== 0 && scale < 1 && minHeight ? minHeight / scale : minHeight
    }
  }, contentResizeListener,
  /* Filters need to be rendered before children to avoid Safari rendering issues. */
  svgFilters.map(preset => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.__unstablePresetDuotoneFilter, {
    preset: preset,
    key: preset.slug
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(MemoizedBlockList, {
    renderAppender: false
  })));
}

function AutoBlockPreview(props) {
  const [containerResizeListener, {
    width: containerWidth
  }] = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__.useResizeObserver)();
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    style: {
      position: 'relative',
      width: '100%',
      height: 0
    }
  }, containerResizeListener), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "block-editor-block-preview__container"
  }, containerWidth && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(ScaledBlockPreview, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    containerWidth: containerWidth
  }))));
}

/***/ }),

/***/ "./src/OnboardingSPA/components/LivePreview/BlockPreview/index.js":
/*!************************************************************************!*\
  !*** ./src/OnboardingSPA/components/LivePreview/BlockPreview/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _auto__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./auto */ "./src/OnboardingSPA/components/LivePreview/BlockPreview/auto.js");
/* harmony import */ var _utils_global_styles_use_global_styles_output__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils/global-styles/use-global-styles-output */ "./src/OnboardingSPA/utils/global-styles/use-global-styles-output.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _Animate__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../Animate */ "./src/OnboardingSPA/components/Animate/index.js");










const BlockPreview = _ref => {
  let {
    blockGrammer,
    viewportWidth = 1300,
    styling = 'large',
    setIsLoadingParent = false,
    previewSettings = false,
    skeletonLoadingTime = 2500
  } = _ref;
  const [blocks, setBlocks] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const [settings, setSettings] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const [loading, setIsLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (skeletonLoadingTime) {
      const timer = setTimeout(() => {
        setIsLoading(false);

        if (setIsLoadingParent) {
          setIsLoadingParent(false);
        }
      }, skeletonLoadingTime);
      return () => clearTimeout(timer);
    }

    setIsLoading(false);

    if (setIsLoadingParent) {
      setIsLoadingParent(false);
    }
  }, [skeletonLoadingTime]);
  const {
    currentData,
    storedPreviewSettings
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    return {
      currentData: select(_store__WEBPACK_IMPORTED_MODULE_6__.store).getCurrentOnboardingData(),
      storedPreviewSettings: select(_store__WEBPACK_IMPORTED_MODULE_6__.store).getPreviewSettings()
    };
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (previewSettings) {
      setSettings( // eslint-disable-next-line react-hooks/rules-of-hooks
      (0,_utils_global_styles_use_global_styles_output__WEBPACK_IMPORTED_MODULE_5__.useGlobalStylesOutput)(previewSettings, storedPreviewSettings, 'block-preview'));
    } else {
      setSettings(storedPreviewSettings);
    }
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (blockGrammer) {
      setBlocks((0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__.parse)(blockGrammer));
    }
  }, [blockGrammer]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!previewSettings) {
      setSettings(storedPreviewSettings);
    }
  }, [storedPreviewSettings, currentData]);
  const SkeletonLivePreview = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(() => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "live-preview__container--is-skeleton"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "live-preview__container--is-skeleton--box live-preview__container--is-skeleton--box-header"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Animate__WEBPACK_IMPORTED_MODULE_7__["default"], {
      type: 'shine',
      className: "live-preview__container--is-skeleton--shimmer"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "live-preview__container--is-skeleton--box live-preview__container--is-skeleton--box-body-1"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "live-preview__container--is-skeleton--box live-preview__container--is-skeleton--box-body-2"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "live-preview__container--is-skeleton--box live-preview__container--is-skeleton--box-footer"
    }));
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `live-preview__container-${styling}`
  }, loading && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SkeletonLivePreview, null), blocks && settings && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.BlockEditorProvider, {
    value: blocks,
    settings: settings.settings
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_auto__WEBPACK_IMPORTED_MODULE_4__["default"], {
    viewportWidth: viewportWidth,
    settings: settings.settings
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(BlockPreview));

/***/ }),

/***/ "./src/OnboardingSPA/components/LivePreview/GlobalStylesProvider/index.js":
/*!********************************************************************************!*\
  !*** ./src/OnboardingSPA/components/LivePreview/GlobalStylesProvider/index.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _utils_api_themes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/api/themes */ "./src/OnboardingSPA/utils/api/themes.js");
/* harmony import */ var _utils_global_styles_use_global_styles_output__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/global-styles/use-global-styles-output */ "./src/OnboardingSPA/utils/global-styles/use-global-styles-output.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.js");






/**
 * Global Style Parent Component
 * The Fetching of Global Style Object from either store or API is
 * common to a lot many places and this component does the trick import { useState, useEffect } from '@wordpress/element';for us.
 *
 * @return Global Style Parent
 */

const GlobalStylesProvider = _ref => {
  let {
    children
  } = _ref;
  const [isLoaded, setIsLoaded] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const {
    currentData,
    storedPreviewSettings,
    themeStatus
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(select => {
    return {
      currentData: select(_store__WEBPACK_IMPORTED_MODULE_2__.store).getCurrentOnboardingData(),
      storedPreviewSettings: select(_store__WEBPACK_IMPORTED_MODULE_2__.store).getPreviewSettings(),
      themeStatus: select(_store__WEBPACK_IMPORTED_MODULE_2__.store).getThemeStatus()
    };
  }, []);
  const {
    updateThemeStatus,
    updatePreviewSettings,
    enqueueRequest
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_2__.store);

  const getStylesAndPatterns = async () => {
    let selectedGlobalStyle;
    if (storedPreviewSettings !== null && storedPreviewSettings !== void 0 && storedPreviewSettings.title && storedPreviewSettings !== null && storedPreviewSettings !== void 0 && storedPreviewSettings.settings) selectedGlobalStyle = storedPreviewSettings;else {
      var _globalStyles$body$;

      const globalStyles = await (0,_utils_api_themes__WEBPACK_IMPORTED_MODULE_3__.getGlobalStyles)();

      if (globalStyles !== null && globalStyles !== void 0 && globalStyles.error) {
        return updateThemeStatus(_constants__WEBPACK_IMPORTED_MODULE_5__.THEME_STATUS_INIT);
      }

      if (currentData.data.theme.variation) {
        selectedGlobalStyle = globalStyles.body.filter(globalStyle => globalStyle.title === currentData.data.theme.variation)[0];
      } else if (((_globalStyles$body$ = globalStyles.body[0]) === null || _globalStyles$body$ === void 0 ? void 0 : _globalStyles$body$.id) === 0) {
        selectedGlobalStyle = globalStyles.body[0];
      }

      updatePreviewSettings( // eslint-disable-next-line react-hooks/rules-of-hooks
      (0,_utils_global_styles_use_global_styles_output__WEBPACK_IMPORTED_MODULE_4__.useGlobalStylesOutput)(selectedGlobalStyle, storedPreviewSettings));
    }

    if (selectedGlobalStyle) {
      enqueueRequest(_constants__WEBPACK_IMPORTED_MODULE_5__.API_REQUEST.SET_GLOBAL_STYLES, () => (0,_utils_api_themes__WEBPACK_IMPORTED_MODULE_3__.setGlobalStyles)({ ...selectedGlobalStyle,
        title: currentData.data.theme.variation,
        version: 2
      }));
    }

    setIsLoaded(true);
  };

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!isLoaded && _constants__WEBPACK_IMPORTED_MODULE_5__.THEME_STATUS_ACTIVE === themeStatus) getStylesAndPatterns();
  }, [isLoaded, themeStatus]);
  return children;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GlobalStylesProvider);

/***/ }),

/***/ "./src/OnboardingSPA/components/LivePreview/LivePreviewSkeleton/index.js":
/*!*******************************************************************************!*\
  !*** ./src/OnboardingSPA/components/LivePreview/LivePreviewSkeleton/index.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! .. */ "./src/OnboardingSPA/components/LivePreview/index.js");




/**
 * Renders Skeletons for Live Previews.
 *
 * @param {Object}  root0               Props.
 * @param {number}  root0.count         The number of Live Previews to be shown
 * @param {number}  root0.watch         The variable to be awaited for
 * @param {string}  root0.callback      The Render function in parent to be called
 * @param {string}  root0.className     The class name for the Live Preview
 * @param {number}  root0.viewportWidth Viewport Width for the Live Preview
 * @param {boolean} root0.isWithCard    Whether the skeleton is a Card
 */

const LivePreviewSkeleton = _ref => {
  let {
    count,
    watch,
    callback,
    className,
    viewportWidth,
    isWithCard = false
  } = _ref;
  const MAX_ANIMATION_TIME = 600000;
  const [rerender, doRerender] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => doRerender(1), [watch]);

  const buildDummyPreviews = () => {
    const dummyPreviews = [];

    for (let i = 0; i < count; i++) {
      dummyPreviews.push((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(___WEBPACK_IMPORTED_MODULE_2__.LivePreviewSelectableCard, {
        key: i,
        styling: 'custom',
        className: className,
        skeletonLoadingTime: MAX_ANIMATION_TIME,
        viewportWidth: viewportWidth
      }));
    }

    return dummyPreviews;
  };

  const buildDummyPreviewsWithInfo = () => {
    const dummyPreviews = [];

    for (let i = 0; i < count; i++) {
      dummyPreviews.push((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(___WEBPACK_IMPORTED_MODULE_2__.LivePreviewSelectableCardWithInfo, {
        key: i,
        className: className,
        viewportWidth: 1200,
        styling: 'custom',
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Loading…', 'wp-module-onboarding'),
        description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Loading…', 'wp-module-onboarding')
      }));
    }

    return dummyPreviews;
  };

  const build = () => {
    if (isWithCard) {
      return buildDummyPreviewsWithInfo();
    }

    return buildDummyPreviews();
  };

  return !watch ? build() : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, watch ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      display: 'none'
    }
  }, rerender) : null, callback());
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LivePreviewSkeleton);

/***/ }),

/***/ "./src/OnboardingSPA/components/LivePreview/SelectableCard/index.js":
/*!**************************************************************************!*\
  !*** ./src/OnboardingSPA/components/LivePreview/SelectableCard/index.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/check.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/search.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! .. */ "./src/OnboardingSPA/components/LivePreview/index.js");





const SelectableCard = _ref => {
  let {
    className = 'live-preview--selectable-card',
    selected = false,
    blockGrammer,
    viewportWidth = 1500,
    styling = 'large',
    previewSettings,
    overlay = false,
    onClick = false,
    skeletonLoadingTime = 2500
  } = _ref;
  const [loadingParent, setIsLoadingParent] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${className}`,
    role: "button",
    tabIndex: 0,
    onClick: typeof onClick === 'function' && (() => {
      if (!loadingParent) {
        onClick();
      }
    }),
    onKeyDown: typeof onClick === 'function' && (() => {
      if (!loadingParent) {
        onClick();
      }
    })
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${className}__title-bar`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${className}__title-bar__browser`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: `${className}__title-bar__browser__dot`
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: `${className}__title-bar__browser__dot`
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: `${className}__title-bar__browser__dot`
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${selected ? `${className}__title-bar--selected live-preview-selected-check` : `${className}__title-bar--unselected`}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: `${className}__title-bar--selected__path`,
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__["default"],
    size: 64
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${className}__live-preview-container`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(___WEBPACK_IMPORTED_MODULE_1__.LivePreview, {
    styling: styling,
    blockGrammer: blockGrammer,
    viewportWidth: viewportWidth,
    previewSettings: previewSettings,
    setIsLoadingParent: setIsLoadingParent,
    skeletonLoadingTime: skeletonLoadingTime
  }), overlay && !loadingParent && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${className}__live-preview-container__overlay`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: `${className}__live-preview-container__overlay__icon`,
    size: 64,
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__["default"]
  }))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SelectableCard);

/***/ }),

/***/ "./src/OnboardingSPA/components/LivePreview/SelectableCardWithInfo/index.js":
/*!**********************************************************************************!*\
  !*** ./src/OnboardingSPA/components/LivePreview/SelectableCardWithInfo/index.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/help.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! .. */ "./src/OnboardingSPA/components/LivePreview/index.js");
/* harmony import */ var _Animate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Animate */ "./src/OnboardingSPA/components/Animate/index.js");







const SelectableCardWithInfo = _ref => {
  let {
    className = 'live-preview--selectable-card--title-description',
    selected = false,
    blockGrammer,
    viewportWidth = 1500,
    styling = 'large',
    previewSettings,
    onClick = false,
    skeletonLoadingTime = 2500,
    title = false,
    description = false,
    slug
  } = _ref;
  const [showDescription, setShowDescription] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);

  const handleCheck = isChecked => {
    if (typeof onClick === 'function') {
      onClick(isChecked, slug, title);
    }
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${className}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${className}__live-preview-container`,
    onClick: () => handleCheck(!selected),
    role: "presentation"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(___WEBPACK_IMPORTED_MODULE_2__.LivePreview, {
    styling: styling,
    blockGrammer: blockGrammer,
    viewportWidth: viewportWidth,
    previewSettings: previewSettings,
    skeletonLoadingTime: skeletonLoadingTime
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${className}__information`,
    style: {
      backgroundColor: showDescription ? 'var(--nfd-onboarding-light-gray-highlighted)' : 'var(--nfd-onboarding-light-gray-3)'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${className}__information__title-question`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${className}__information__title-question__checkbox`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CheckboxControl, {
    label: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("b", null, title),
    onChange: () => handleCheck(!selected),
    checked: selected
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${className}__information__title-question__question`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: `${className}__information__title-question__question__icon`,
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__["default"],
    style: {
      fill: showDescription && 'var(--wp-admin-theme-color-darker-10)'
    },
    onClick: () => setShowDescription(!showDescription)
  })))), showDescription && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Animate__WEBPACK_IMPORTED_MODULE_3__["default"], {
    type: 'dropdown',
    className: `${className}__description--container ${showDescription ? 'highlighted' : 'not-highlighted'}`,
    style: {
      backgroundColor: showDescription ? 'var(--nfd-onboarding-light-gray-highlighted)' : 'var(--nfd-onboarding-light-gray-3)'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: `${className}__description--text`
  }, description)));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SelectableCardWithInfo);

/***/ }),

/***/ "./src/OnboardingSPA/components/LivePreview/index.js":
/*!***********************************************************!*\
  !*** ./src/OnboardingSPA/components/LivePreview/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GlobalStylesProvider": () => (/* reexport safe */ _GlobalStylesProvider__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "LivePreview": () => (/* reexport safe */ _BlockPreview__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "LivePreviewSelectableCard": () => (/* reexport safe */ _SelectableCard__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "LivePreviewSelectableCardWithInfo": () => (/* reexport safe */ _SelectableCardWithInfo__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "LivePreviewSkeleton": () => (/* reexport safe */ _LivePreviewSkeleton__WEBPACK_IMPORTED_MODULE_1__["default"])
/* harmony export */ });
/* harmony import */ var _BlockPreview__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BlockPreview */ "./src/OnboardingSPA/components/LivePreview/BlockPreview/index.js");
/* harmony import */ var _LivePreviewSkeleton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LivePreviewSkeleton */ "./src/OnboardingSPA/components/LivePreview/LivePreviewSkeleton/index.js");
/* harmony import */ var _SelectableCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SelectableCard */ "./src/OnboardingSPA/components/LivePreview/SelectableCard/index.js");
/* harmony import */ var _SelectableCardWithInfo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SelectableCardWithInfo */ "./src/OnboardingSPA/components/LivePreview/SelectableCardWithInfo/index.js");
/* harmony import */ var _GlobalStylesProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./GlobalStylesProvider */ "./src/OnboardingSPA/components/LivePreview/GlobalStylesProvider/index.js");






/***/ }),

/***/ "./src/OnboardingSPA/components/Loaders/Step/Ecommerce/contents.js":
/*!*************************************************************************!*\
  !*** ./src/OnboardingSPA/components/Loaders/Step/Ecommerce/contents.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_locales_translations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../utils/locales/translations */ "./src/OnboardingSPA/utils/locales/translations.js");



const getContents = brandName => {
  return {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(
    /* translators: 1: Brand 2: Site */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Making the keys to your %1$s Online %2$s', 'wp-module-onboarding'), brandName, (0,_utils_locales_translations__WEBPACK_IMPORTED_MODULE_1__.translations)('Site')),
    subtitle: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('We’re installing WooCommerce for you to fill with your amazing products & services!', 'wp-module-onboarding')
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getContents);

/***/ }),

/***/ "./src/OnboardingSPA/components/Loaders/Step/Ecommerce/index.js":
/*!**********************************************************************!*\
  !*** ./src/OnboardingSPA/components/Loaders/Step/Ecommerce/index.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! .. */ "./src/OnboardingSPA/components/Loaders/Step/index.js");
/* harmony import */ var _contents__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./contents */ "./src/OnboardingSPA/components/Loaders/Step/Ecommerce/contents.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../store */ "./src/OnboardingSPA/store/index.js");






const EcommerceStepLoader = () => {
  const {
    brandName
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    return {
      brandName: select(_store__WEBPACK_IMPORTED_MODULE_4__.store).getNewfoldBrandName()
    };
  }, []);
  const contents = (0,_contents__WEBPACK_IMPORTED_MODULE_2__["default"])(brandName);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(___WEBPACK_IMPORTED_MODULE_1__["default"], {
    title: contents.title,
    subtitle: contents.subtitle
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EcommerceStepLoader);

/***/ }),

/***/ "./src/OnboardingSPA/components/Loaders/Step/index.js":
/*!************************************************************!*\
  !*** ./src/OnboardingSPA/components/Loaders/Step/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Layouts_Common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Layouts/Common */ "./src/OnboardingSPA/components/Layouts/Common.js");
/* harmony import */ var _HeadingWithSubHeading__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../HeadingWithSubHeading */ "./src/OnboardingSPA/components/HeadingWithSubHeading/index.js");
/* harmony import */ var _NeedHelpTag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../NeedHelpTag */ "./src/OnboardingSPA/components/NeedHelpTag/index.js");





const StepLoader = _ref => {
  let {
    title,
    subtitle
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Layouts_Common__WEBPACK_IMPORTED_MODULE_1__["default"], {
    className: "step-loader",
    isVerticallyCentered: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_HeadingWithSubHeading__WEBPACK_IMPORTED_MODULE_2__["default"], {
    title: title,
    subtitle: subtitle
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "step-loader__logo-container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "step-loader__logo"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_NeedHelpTag__WEBPACK_IMPORTED_MODULE_3__["default"], null));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StepLoader);

/***/ }),

/***/ "./src/OnboardingSPA/components/NeedHelpTag/index.js":
/*!***********************************************************!*\
  !*** ./src/OnboardingSPA/components/NeedHelpTag/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);




/**
 * Need Help Label and URL rendering component for most of the onboarding steps
 * Pass any Label and URL redirect which we want as is to display on the UI
 *
 * @param content
 * @return NeedHelpTag
 */

const NeedHelpTag = _ref => {
  let {
    question = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Need Help?', 'wp-module-onboarding'),
    urlLabel = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Hire our Experts', 'wp-module-onboarding')
  } = _ref;
  const hireExpertsUrl = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.select)(_store__WEBPACK_IMPORTED_MODULE_1__.store).getHireExpertsUrl();
  return hireExpertsUrl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-card-need-help-tag"
  }, question, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: hireExpertsUrl,
    target: '_blank',
    rel: "noreferrer"
  }, urlLabel));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NeedHelpTag);

/***/ }),

/***/ "./src/OnboardingSPA/components/NewfoldInterfaceSkeleton/index.js":
/*!************************************************************************!*\
  !*** ./src/OnboardingSPA/components/NewfoldInterfaceSkeleton/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_5__);



/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * WordPress dependencies
 */

 // eslint-disable-next-line  @wordpress/no-unsafe-wp-apis





function useHTMLClass(className) {
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const element = document && document.querySelector(`html:not(.${className})`);

    if (!element) {
      return;
    }

    element.classList.toggle(className);
    return () => {
      element.classList.toggle(className);
    };
  }, [className]);
}

function NewfoldInterfaceSkeleton(_ref, ref) {
  let {
    footer,
    header,
    sidebar,
    secondarySidebar,
    notices,
    content,
    drawer,
    actions,
    labels,
    className,
    shortcuts
  } = _ref;
  const navigateRegionsProps = (0,_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__unstableUseNavigateRegions)(shortcuts);
  useHTMLClass('nfd-interface-interface-skeleton__html-container');
  const defaultLabels = {
    /* translators: accessibility text for the nav bar landmark region. */
    drawer: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Drawer', 'wp-module-onboarding'),

    /* translators: accessibility text for the top bar landmark region. */
    header: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Header', 'wp-module-onboarding'),

    /* translators: accessibility text for the content landmark region. */
    body: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Content', 'wp-module-onboarding'),

    /* translators: accessibility text for the secondary sidebar landmark region. */
    secondarySidebar: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Block Library', 'wp-module-onboarding'),

    /* translators: accessibility text for the settings landmark region. */
    sidebar: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Settings', 'wp-module-onboarding'),

    /* translators: accessibility text for the publish landmark region. */
    actions: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Publish', 'wp-module-onboarding'),

    /* translators: accessibility text for the footer landmark region. */
    footer: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Footer', 'wp-module-onboarding')
  };
  const mergedLabels = { ...defaultLabels,
    ...labels
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, navigateRegionsProps, {
    ref: (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_5__.useMergeRefs)([ref, navigateRegionsProps.ref]),
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, 'nfd-interface-interface-skeleton', navigateRegionsProps.className, !!footer && 'has-footer')
  }), !!drawer && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "nfd-interface-interface-skeleton__drawer",
    role: "region",
    "aria-label": mergedLabels.drawer,
    tabIndex: "-1"
  }, drawer), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "nfd-interface-interface-skeleton__editor"
  }, !!header && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "nfd-interface-interface-skeleton__header",
    role: "region",
    "aria-label": mergedLabels.header,
    tabIndex: "-1"
  }, header), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "nfd-interface-interface-skeleton__body"
  }, !!secondarySidebar && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "nfd-interface-interface-skeleton__secondary-sidebar",
    role: "region",
    "aria-label": mergedLabels.secondarySidebar,
    tabIndex: "-1"
  }, secondarySidebar), !!notices && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "nfd-interface-interface-skeleton__notices"
  }, notices), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "nfd-interface-interface-skeleton__content",
    role: "region",
    "aria-label": mergedLabels.body,
    tabIndex: "-1"
  }, content), !!sidebar && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "nfd-interface-interface-skeleton__sidebar",
    role: "region",
    "aria-label": mergedLabels.sidebar,
    tabIndex: "-1"
  }, sidebar), !!actions && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "nfd-interface-interface-skeleton__actions",
    role: "region",
    "aria-label": mergedLabels.actions,
    tabIndex: "-1"
  }, actions))), !!footer && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "nfd-interface-interface-skeleton__footer",
    role: "region",
    "aria-label": mergedLabels.footer,
    tabIndex: "-1"
  }, footer));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(NewfoldInterfaceSkeleton));

/***/ }),

/***/ "./src/OnboardingSPA/components/Sidebar/index.js":
/*!*******************************************************!*\
  !*** ./src/OnboardingSPA/components/Sidebar/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../constants */ "./src/constants.js");








const Sidebar = () => {
  const {
    isSidebarOpened,
    sideBarView,
    sidebars
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    return {
      isSidebarOpened: select(_store__WEBPACK_IMPORTED_MODULE_4__.store).isSidebarOpened(),
      sideBarView: select(_store__WEBPACK_IMPORTED_MODULE_4__.store).getSidebarView(),
      sidebars: select(_store__WEBPACK_IMPORTED_MODULE_4__.store).getSidebars()
    };
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
    fallback: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null)
  }, sidebars.map(sidebar => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      key: sidebar.id
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(sidebar.sidebar, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(sidebar.menu, null));
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('nfd-onboarding-sidebar__panel', {
      'is-open': isSidebarOpened && sideBarView
    })
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-sidebar__panel-inner"
  }, isSidebarOpened && sideBarView && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Slot, {
    name: `${_constants__WEBPACK_IMPORTED_MODULE_5__.SIDEBAR_SLOTFILL_PREFIX}/${sideBarView}`
  }))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sidebar);

/***/ }),

/***/ "./src/OnboardingSPA/components/StateHandlers/Flow/index.js":
/*!******************************************************************!*\
  !*** ./src/OnboardingSPA/components/StateHandlers/Flow/index.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _data_routes_ecommerce_flow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../data/routes/ecommerce-flow */ "./src/OnboardingSPA/data/routes/ecommerce-flow.js");
/* harmony import */ var _Loaders_Step_Ecommerce__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Loaders/Step/Ecommerce */ "./src/OnboardingSPA/components/Loaders/Step/Ecommerce/index.js");
/* harmony import */ var _utils_api_flow__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils/api/flow */ "./src/OnboardingSPA/utils/api/flow.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../utils */ "./src/OnboardingSPA/utils/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.js");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_8__);












const FlowStateHandler = _ref => {
  let {
    children
  } = _ref;
  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_9__.useLocation)();
  const [newFlow, setNewFlow] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const {
    brandConfig
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    return {
      brandName: select(_store__WEBPACK_IMPORTED_MODULE_2__.store).getNewfoldBrandName(),
      brandConfig: select(_store__WEBPACK_IMPORTED_MODULE_2__.store).getNewfoldBrandConfig()
    };
  }, []);
  const {
    setIsDrawerOpened,
    setIsDrawerSuppressed,
    setIsHeaderNavigationEnabled,
    setSidebarActiveView
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_2__.store);

  const disableNavigation = () => {
    setIsDrawerOpened(false);
    setIsDrawerSuppressed(true);
    setIsHeaderNavigationEnabled(false);
    setSidebarActiveView(false);
  };

  const handleCommerceFlow = async function (flow) {
    let retries = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    if (retries >= _constants__WEBPACK_IMPORTED_MODULE_7__.MAX_RETRIES_FLOW_SWITCH) {
      return setNewFlow(false);
    }

    const response = await (0,_utils_api_flow__WEBPACK_IMPORTED_MODULE_5__.switchFlow)(flow);

    if (response !== null && response !== void 0 && response.error) {
      retries = retries + 1;
      return handleCommerceFlow(flow, retries);
    }

    const firstEcommerceStep = (0,_data_routes_ecommerce_flow__WEBPACK_IMPORTED_MODULE_3__.getFirstEcommerceStep)();
    const fragment = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_8__.getFragment)(window.location.href);
    const redirect = (0,_utils__WEBPACK_IMPORTED_MODULE_6__.removeQueryParam)(window.location.href, 'flow').replace(fragment, '');
    window.location.replace(`${redirect}#${firstEcommerceStep.path}`);
    window.location.reload();
  };

  const switchToNewFlow = async flow => {
    var _brandConfig$enabled_;

    const enabledFlows = (_brandConfig$enabled_ = brandConfig === null || brandConfig === void 0 ? void 0 : brandConfig.enabled_flows) !== null && _brandConfig$enabled_ !== void 0 ? _brandConfig$enabled_ : {};

    if (!(flow in enabledFlows) || enabledFlows[flow] !== true) {
      return setNewFlow(false);
    }

    switch (flow) {
      case 'ecommerce':
        handleCommerceFlow(flow);
        break;

      default:
        setNewFlow(false);
    }
  };

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    var _window$nfdOnboarding;

    if ((_window$nfdOnboarding = window.nfdOnboarding) !== null && _window$nfdOnboarding !== void 0 && _window$nfdOnboarding.newFlow) {
      const flow = window.nfdOnboarding.newFlow;
      disableNavigation();
      setNewFlow(flow);
      switchToNewFlow(flow);
      window.nfdOnboarding.newFlow = undefined;
    }
  }, [location.pathname]);

  const handleRender = () => {
    switch (newFlow) {
      case 'ecommerce':
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Loaders_Step_Ecommerce__WEBPACK_IMPORTED_MODULE_4__["default"], null);

      default:
        return children;
    }
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, handleRender());
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FlowStateHandler);

/***/ }),

/***/ "./src/OnboardingSPA/data/routes/default-flow.js":
/*!*******************************************************!*\
  !*** ./src/OnboardingSPA/data/routes/default-flow.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "conditionalSteps": () => (/* binding */ conditionalSteps),
/* harmony export */   "initialDesignSteps": () => (/* binding */ initialDesignSteps),
/* harmony export */   "initialGetStartedSteps": () => (/* binding */ initialGetStartedSteps),
/* harmony export */   "initialTopSteps": () => (/* binding */ initialTopSteps),
/* harmony export */   "pages": () => (/* binding */ pages),
/* harmony export */   "routes": () => (/* binding */ routes),
/* harmony export */   "steps": () => (/* binding */ steps)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _pages_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../pages/index */ "./src/OnboardingSPA/pages/index.js");
/* harmony import */ var _utils_locales_translations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/locales/translations */ "./src/OnboardingSPA/utils/locales/translations.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/post.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/redo.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/home.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/move-to.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/navigation.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/info.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/styles.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/header.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/pages.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/copy.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/plugins.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/color.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/typography.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/brush.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../constants */ "./src/constants.js");


 // eslint-disable-next-line import/no-extraneous-dependencies






/**
 * This application has two types of routes: pages and steps.
 *
 * Pages are intended to exist outside the onboarding.
 *
 * Steps are the stages of the onboarding flow, expressed via numerical priority.
 * Steps increment by 10, allowing ample room for new steps to insert between.
 */

const ErrorPage = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_pages_ErrorPage_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/ErrorPage */ "./src/OnboardingSPA/pages/ErrorPage/index.js")));
const PageResources = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_pages_Resources_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/Resources */ "./src/OnboardingSPA/pages/Resources/index.js")));
const PageWhatToExpect = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_pages_WhatToExpect_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/WhatToExpect */ "./src/OnboardingSPA/pages/WhatToExpect/index.js")));
const StepGetStartedWelcome = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_pages_Steps_GetStarted_Welcome_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/Steps/GetStarted/Welcome */ "./src/OnboardingSPA/pages/Steps/GetStarted/Welcome/index.js")));
const StepGetStartedWelcomeLearnMoreSidebar = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_pages_Steps_GetStarted_Welcome_Sidebar_LearnMore_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/Steps/GetStarted/Welcome/Sidebar/LearnMore */ "./src/OnboardingSPA/pages/Steps/GetStarted/Welcome/Sidebar/LearnMore/index.js")));
const StepGetStartedExperience = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_pages_Steps_GetStarted_GetStartedExperience_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/Steps/GetStarted/GetStartedExperience */ "./src/OnboardingSPA/pages/Steps/GetStarted/GetStartedExperience/index.js")));
const StepGetStartedExperienceLearnMoreSidebar = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_pages_Steps_GetStarted_GetStartedExperience_Sidebar_LearnMore_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/Steps/GetStarted/GetStartedExperience/Sidebar/LearnMore */ "./src/OnboardingSPA/pages/Steps/GetStarted/GetStartedExperience/Sidebar/LearnMore/index.js")));
const StepGetStartedPrimarySetup = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_pages_Steps_GetStarted_SiteTypeSetup_PrimarySite_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/Steps/GetStarted/SiteTypeSetup/PrimarySite */ "./src/OnboardingSPA/pages/Steps/GetStarted/SiteTypeSetup/PrimarySite/index.js")));
const StepGetStartedPrimarySetupLearnMoreSidebar = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_pages_Steps_GetStarted_SiteTypeSetup_PrimarySite_Sidebar_LearnMore_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/Steps/GetStarted/SiteTypeSetup/PrimarySite/Sidebar/LearnMore/index */ "./src/OnboardingSPA/pages/Steps/GetStarted/SiteTypeSetup/PrimarySite/Sidebar/LearnMore/index.js")));
const StepGetStartedSecondarySetup = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_pages_Steps_GetStarted_SiteTypeSetup_SecondarySite_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/Steps/GetStarted/SiteTypeSetup/SecondarySite */ "./src/OnboardingSPA/pages/Steps/GetStarted/SiteTypeSetup/SecondarySite/index.js")));
const StepGetStartedSecondarySetupLearnMoreSidebar = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_pages_Steps_GetStarted_SiteTypeSetup_SecondarySite_Sidebar_LearnMore_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/Steps/GetStarted/SiteTypeSetup/SecondarySite/Sidebar/LearnMore/index */ "./src/OnboardingSPA/pages/Steps/GetStarted/SiteTypeSetup/SecondarySite/Sidebar/LearnMore/index.js")));
const StepTopPriority = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_pages_Steps_TopPriority_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/Steps/TopPriority */ "./src/OnboardingSPA/pages/Steps/TopPriority/index.js")));
const StepBasicInfo = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_pages_Steps_BasicInfo_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/Steps/BasicInfo */ "./src/OnboardingSPA/pages/Steps/BasicInfo/index.js")));
const StepBasicInfoLearnMoreSidebar = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_pages_Steps_BasicInfo_Sidebar_LearnMore_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/Steps/BasicInfo/Sidebar/LearnMore */ "./src/OnboardingSPA/pages/Steps/BasicInfo/Sidebar/LearnMore/index.js")));
const StepDesignThemeStylesMenu = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_pages_Steps_DesignThemeStyles_Menu_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/Steps/DesignThemeStyles/Menu */ "./src/OnboardingSPA/pages/Steps/DesignThemeStyles/Menu/index.js")));
const StepDesignThemeStylesMenuLearnMoreSidebar = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_pages_Steps_DesignThemeStyles_Menu_Sidebar_LearnMore_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/Steps/DesignThemeStyles/Menu/Sidebar/LearnMore */ "./src/OnboardingSPA/pages/Steps/DesignThemeStyles/Menu/Sidebar/LearnMore/index.js")));
const StepDesignThemeStylesPreview = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_pages_Steps_DesignThemeStyles_Preview_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/Steps/DesignThemeStyles/Preview */ "./src/OnboardingSPA/pages/Steps/DesignThemeStyles/Preview/index.js")));
const StepDesignThemeStylesPreviewLearnMoreSidebar = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_pages_Steps_DesignThemeStyles_Preview_Sidebar_LearnMore_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/Steps/DesignThemeStyles/Preview/Sidebar/LearnMore */ "./src/OnboardingSPA/pages/Steps/DesignThemeStyles/Preview/Sidebar/LearnMore/index.js")));
const StepDesignColors = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_pages_Steps_DesignColors_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/Steps/DesignColors */ "./src/OnboardingSPA/pages/Steps/DesignColors/index.js")));
const StepDesignColorsLearnMoreSidebar = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_pages_Steps_DesignColors_Sidebar_LearnMore_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/Steps/DesignColors/Sidebar/LearnMore */ "./src/OnboardingSPA/pages/Steps/DesignColors/Sidebar/LearnMore/index.js")));
const StepDesignTypography = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_pages_Steps_DesignTypography_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/Steps/DesignTypography */ "./src/OnboardingSPA/pages/Steps/DesignTypography/index.js")));
const StepDesignTypographyLearnMoreSidebar = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_pages_Steps_DesignTypography_Sidebar_LearnMore_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/Steps/DesignTypography/Sidebar/LearnMore */ "./src/OnboardingSPA/pages/Steps/DesignTypography/Sidebar/LearnMore/index.js")));
const StepDesignHeaderMenu = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_pages_Steps_DesignHeaderMenu_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/Steps/DesignHeaderMenu */ "./src/OnboardingSPA/pages/Steps/DesignHeaderMenu/index.js")));
const StepDesignHeaderMenuLearnMoreSidebar = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_pages_Steps_DesignHeaderMenu_Sidebar_LearnMore_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/Steps/DesignHeaderMenu/Sidebar/LearnMore */ "./src/OnboardingSPA/pages/Steps/DesignHeaderMenu/Sidebar/LearnMore/index.js")));
const StepDesignHomepageMenu = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_pages_Steps_DesignHomepageMenu_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/Steps/DesignHomepageMenu */ "./src/OnboardingSPA/pages/Steps/DesignHomepageMenu/index.js")));
const StepDesignHomepageMenuLearnMoreSidebar = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_pages_Steps_DesignHomepageMenu_Sidebar_LearnMore_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/Steps/DesignHomepageMenu/Sidebar/LearnMore */ "./src/OnboardingSPA/pages/Steps/DesignHomepageMenu/Sidebar/LearnMore/index.js")));
const StepSitePages = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_pages_Steps_SitePages_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/Steps/SitePages */ "./src/OnboardingSPA/pages/Steps/SitePages/index.js")));
const StepSitePagesLearnMoreSidebar = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_pages_Steps_SitePages_Sidebar_LearnMore_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/Steps/SitePages/Sidebar/LearnMore */ "./src/OnboardingSPA/pages/Steps/SitePages/Sidebar/LearnMore/index.js")));
const StepSiteFeatures = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_pages_Steps_SiteFeatures_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/Steps/SiteFeatures */ "./src/OnboardingSPA/pages/Steps/SiteFeatures/index.js")));
const StepSiteFeaturesLearnMoreSidebar = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_pages_Steps_SiteFeatures_Sidebar_LearnMore_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/Steps/SiteFeatures/Sidebar/LearnMore */ "./src/OnboardingSPA/pages/Steps/SiteFeatures/Sidebar/LearnMore/index.js")));
const StepComplete = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_pages_Steps_Complete_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/Steps/Complete */ "./src/OnboardingSPA/pages/Steps/Complete/index.js")));
const StepWhatNext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_pages_Steps_WhatNext_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/Steps/WhatNext */ "./src/OnboardingSPA/pages/Steps/WhatNext/index.js")));
const StepWhatNextLearnMoreSidebar = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_pages_Steps_WhatNext_Sidebar_LearnMore_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/Steps/WhatNext/Sidebar/LearnMore */ "./src/OnboardingSPA/pages/Steps/WhatNext/Sidebar/LearnMore/index.js")));
/**
 * All information pages should be prefixed with `/page`.
 *
 * All redirect sub-routes like `/` and `/step` and `/design` are exceptions.
 */

const pages = [{
  path: '/',
  title: '',
  description: '',
  Component: _pages_index__WEBPACK_IMPORTED_MODULE_3__["default"],
  Icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null)
}, {
  path: '/page/resources',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Resources', 'wp-module-onboarding'),
  description: '',
  Component: PageResources,
  Icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__["default"]
}, {
  path: '/page/what-to-expect',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('What to Expect', 'wp-module-onboarding'),
  description: '',
  Component: PageWhatToExpect,
  Icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__["default"]
}, {
  path: '*',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Error 404', 'wp-module-onboarding'),
  description: 'Please Check Again!',
  Component: ErrorPage,
  Icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__["default"]
}];
/**
 * All steps are registered in this array.
 *
 * Priorities should increment by 20 to leave ample space in-between for injection.
 */

const steps = [{
  path: '/wp-setup/step/get-started/welcome',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Welcome', 'wp-module-onboarding'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("We'll use this to personalize this onboarding and future recommendations", 'wp-module-onboarding'),
  Component: StepGetStartedWelcome,
  Icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_8__["default"],
  priority: 20,
  VIEW: _constants__WEBPACK_IMPORTED_MODULE_5__.VIEW_NAV_GET_STARTED,
  sidebars: {
    LearnMore: {
      SidebarComponents: [StepGetStartedWelcomeLearnMoreSidebar]
    }
  }
}, {
  path: '/wp-setup/step/get-started/experience',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('WordPress Experience', 'wp-module-onboarding'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("We'll use this to personalize this onboarding and future recommendations", 'wp-module-onboarding'),
  Component: StepGetStartedExperience,
  Icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_8__["default"],
  priority: 40,
  VIEW: _constants__WEBPACK_IMPORTED_MODULE_5__.VIEW_NAV_GET_STARTED,
  sidebars: {
    LearnMore: {
      SidebarComponents: [StepGetStartedExperienceLearnMoreSidebar]
    }
  }
}, {
  path: '/wp-setup/step/get-started/site-primary',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)(
  /* translators: %s: website or store */
  (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Primary %s Setup', 'wp-module-onboarding'), (0,_utils_locales_translations__WEBPACK_IMPORTED_MODULE_4__.translations)('Site')),
  Component: StepGetStartedPrimarySetup,
  Icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__["default"],
  priority: 60,
  sidebars: {
    LearnMore: {
      SidebarComponents: [StepGetStartedPrimarySetupLearnMoreSidebar]
    }
  }
}, {
  path: '/wp-setup/step/get-started/site-secondary',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)(
  /* translators: %s: website or store */
  (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Secondary %s Setup', 'wp-module-onboarding'), (0,_utils_locales_translations__WEBPACK_IMPORTED_MODULE_4__.translations)('Site')),
  Component: StepGetStartedSecondarySetup,
  Icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__["default"],
  priority: 80,
  sidebars: {
    LearnMore: {
      SidebarComponents: [StepGetStartedSecondarySetupLearnMoreSidebar]
    }
  }
}, {
  path: '/wp-setup/step/top-priority',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Top Priority', 'wp-module-onboarding'),
  heading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Tell us your top priority', 'wp-module-onboarding'),
  subheading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("We'll prioritize getting you there.", 'wp-module-onboarding'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("We'll recommend design choices, site options and products and features we have to offer.", 'wp-module-onboarding'),
  Component: StepTopPriority,
  Icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_10__["default"],
  priority: 100
}, {
  path: '/wp-setup/step/basic-info',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Basic Info', 'wp-module-onboarding'),
  heading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)(
  /* translators: %s: website or store */
  (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Introduce us to this %s', 'wp-module-onboarding'), (0,_utils_locales_translations__WEBPACK_IMPORTED_MODULE_4__.translations)('website')),
  subheading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('So we can introduce it to the web', 'wp-module-onboarding'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)(
  /* translators: %s: website or store */
  (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Help visitors, search results and social media identify your %s.', 'wp-module-onboarding'), (0,_utils_locales_translations__WEBPACK_IMPORTED_MODULE_4__.translations)('site')),
  Component: StepBasicInfo,
  Icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_11__["default"],
  priority: 120,
  sidebars: {
    LearnMore: {
      SidebarComponents: [StepBasicInfoLearnMoreSidebar]
    }
  }
}, {
  path: '/wp-setup/step/design/theme-styles/menu',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Theme Styles', 'wp-module-onboarding'),
  Component: StepDesignThemeStylesMenu,
  Icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_12__["default"],
  priority: 160,
  designDrawerActiveLinkIncludes: '/wp-setup/step/design/theme-styles/',
  VIEW: _constants__WEBPACK_IMPORTED_MODULE_5__.VIEW_NAV_DESIGN,
  patternId: 'theme-styles',
  sidebars: {
    LearnMore: {
      SidebarComponents: [StepDesignThemeStylesMenuLearnMoreSidebar]
    }
  }
}, {
  path: '/wp-setup/step/design/theme-styles/preview',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Theme Styles', 'wp-module-onboarding'),
  Component: StepDesignThemeStylesPreview,
  Icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_12__["default"],
  priority: 170,
  VIEW: _constants__WEBPACK_IMPORTED_MODULE_5__.VIEW_DESIGN_THEME_STYLES_PREVIEW,
  designDrawerActiveLinkIncludes: '/wp-setup/step/design/theme-styles/',
  patternId: 'theme-styles',
  sidebars: {
    LearnMore: {
      SidebarComponents: [StepDesignThemeStylesPreviewLearnMoreSidebar]
    }
  }
}, {
  path: '/wp-setup/step/design/header-menu',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Header & Menu', 'wp-module-onboarding'),
  heading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Let's make the right things visible", 'wp-module-onboarding'),
  subheading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Your site header helps organize your story for visitors.', 'wp-module-onboarding'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('A well-organized site makes visitors feel smart, helping you keep and convert them.', 'wp-module-onboarding'),
  Component: StepDesignHeaderMenu,
  Icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_13__["default"],
  priority: 220,
  VIEW: _constants__WEBPACK_IMPORTED_MODULE_5__.VIEW_DESIGN_HEADER_MENU,
  patternId: 'header-menu',
  sidebars: {
    LearnMore: {
      SidebarComponents: [StepDesignHeaderMenuLearnMoreSidebar]
    }
  }
}, {
  path: '/wp-setup/step/design/homepage-menu',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Homepage Layouts', 'wp-module-onboarding'),
  heading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('There’s no place like a great home page', 'wp-module-onboarding'),
  subheading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Pick a starter layout you can refine and remix with your content', 'wp-module-onboarding'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('A well-organized homepage makes visitors feel smart.', 'wp-module-onboarding'),
  Component: StepDesignHomepageMenu,
  Icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_14__["default"],
  priority: 240,
  VIEW: _constants__WEBPACK_IMPORTED_MODULE_5__.VIEW_NAV_DESIGN,
  patternId: 'homepage-styles',
  sidebars: {
    LearnMore: {
      SidebarComponents: [StepDesignHomepageMenuLearnMoreSidebar]
    }
  }
}, {
  path: '/wp-setup/step/design/site-pages',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Page Layouts', 'wp-module-onboarding'),
  heading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('You have ideas, we have page templates', 'wp-module-onboarding'),
  subheading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Begin closer to the finish line than a blank canvas.', 'wp-module-onboarding'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Pick a page, pick a layout and we'll focus on the basics so you focus on what's important and unique.", 'wp-module-onboarding'),
  Component: StepSitePages,
  Icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_15__["default"],
  priority: 260,
  patternId: 'site-pages',
  sidebars: {
    LearnMore: {
      SidebarComponents: [StepSitePagesLearnMoreSidebar]
    }
  }
}, {
  path: '/wp-setup/step/site-features',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Features', 'wp-module-onboarding'),
  heading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Key features to supercharge your site', 'wp-module-onboarding'),
  subheading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Our toolbox of Plugins & Services is your toolbox.', 'wp-module-onboarding'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Through Plugins, partners and unique $BRAND WordPress features, you've got tons of capabilities with $SITE.", 'wp-module-onboarding'),
  Component: StepSiteFeatures,
  Icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_16__["default"],
  priority: 280,
  patternId: 'site-features',
  sidebars: {
    LearnMore: {
      SidebarComponents: [StepSiteFeaturesLearnMoreSidebar]
    }
  }
}, {
  path: '/wp-setup/step/complete',
  Component: StepComplete,
  priority: 285
}, {
  path: '/wp-setup/step/what-next',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('What Next', 'wp-module-onboarding'),
  heading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('How else can we help?', 'wp-module-onboarding'),
  subheading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("We've got the basics setup, but we can help with any next steps.", 'wp-module-onboarding'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Setup more of your site, show you around WordPress or share secrets to success -- we'll follow your lead on how you'd like to proceed.", 'wp-module-onboarding'),
  Component: StepWhatNext,
  Icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__["default"],
  priority: 300,
  sidebars: {
    LearnMore: {
      SidebarComponents: [StepWhatNextLearnMoreSidebar]
    }
  }
}];
const conditionalSteps = {
  designColors: {
    path: '/wp-setup/step/design/colors',
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Colors', 'wp-module-onboarding'),
    heading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("What's your color palette?", 'wp-module-onboarding'),
    subheading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("We'll paint everything with your colors for a fresh, crisp look.", 'wp-module-onboarding'),
    description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Strong contrast and clear readability help your words jump off the screen.', 'wp-module-onboarding'),
    Component: StepDesignColors,
    Icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_17__["default"],
    priority: 180,
    VIEW: _constants__WEBPACK_IMPORTED_MODULE_5__.VIEW_DESIGN_COLORS,
    patternId: 'theme-styles',
    sidebars: {
      LearnMore: {
        SidebarComponents: [StepDesignColorsLearnMoreSidebar]
      }
    }
  },
  designTypography: {
    path: '/wp-setup/step/design/typography',
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Typography', 'wp-module-onboarding'),
    heading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("What's your font style?", 'wp-module-onboarding'),
    subheading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Impress your visitors with strong branding and aesthetics.', 'wp-module-onboarding'),
    description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Good typography uses style and proportions to give your words identity and priority. What's your story? Your focus?", 'wp-module-onboarding'),
    Component: StepDesignTypography,
    Icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_18__["default"],
    priority: 200,
    VIEW: _constants__WEBPACK_IMPORTED_MODULE_5__.VIEW_DESIGN_TYPOGRAPHY,
    patternId: 'theme-styles',
    sidebars: {
      LearnMore: {
        SidebarComponents: [StepDesignTypographyLearnMoreSidebar]
      }
    }
  }
};
const routes = [...pages, ...steps];
/**
 * Filter-out the design steps and register a fake step in their place.
 *
 * @return {Array} steps
 */

const initialTopSteps = () => {
  const topSteps = (0,lodash__WEBPACK_IMPORTED_MODULE_2__.filter)(steps, step => {
    return !step.path.includes('/step/get-started') && !step.path.includes('/step/design') && !step.path.includes('/step/complete');
  });
  const designStep = {
    /* This is a fake step to stand-in for all Design steps and does not have a Component to render */
    path: '/wp-setup/step/design/theme-styles/menu',
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Design', 'wp-module-onboarding'),
    description: '',
    Icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_19__["default"],
    VIEW: _constants__WEBPACK_IMPORTED_MODULE_5__.VIEW_NAV_DESIGN,
    primaryDrawerActiveLinkIncludes: '/wp-setup/step/design/',
    priority: 140
    /* matches priority for first design step */

  };
  const getStartedStep = {
    path: '/wp-setup/step/get-started/welcome',
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Get Started', 'wp-module-onboarding'),
    heading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Get Started', 'wp-module-onboarding'),
    Icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_8__["default"],
    VIEW: _constants__WEBPACK_IMPORTED_MODULE_5__.VIEW_NAV_GET_STARTED,
    primaryDrawerActiveLinkIncludes: '/wp-setup/step/get-started/',
    priority: 20
  };
  topSteps.push(designStep);
  topSteps.push(getStartedStep);
  return (0,lodash__WEBPACK_IMPORTED_MODULE_2__.orderBy)(topSteps, ['priority'], ['asc']);
};
/**
 * Filter out all non-design steps.
 *
 * @return {Array} steps
 */

const initialDesignSteps = () => {
  const designSteps = (0,lodash__WEBPACK_IMPORTED_MODULE_2__.filter)(steps, step => {
    return step.path.includes('/step/design/') && !step.path.includes('/theme-styles/preview');
  });
  return designSteps;
};
const initialGetStartedSteps = () => {
  const getStartedSteps = (0,lodash__WEBPACK_IMPORTED_MODULE_2__.filter)(steps, step => {
    return step.path.includes('/step/get-started');
  });
  return getStartedSteps;
};

/***/ }),

/***/ "./src/OnboardingSPA/data/routes/ecommerce-flow.js":
/*!*********************************************************!*\
  !*** ./src/OnboardingSPA/data/routes/ecommerce-flow.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ecommerceGetStartedSteps": () => (/* binding */ ecommerceGetStartedSteps),
/* harmony export */   "ecommerceSteps": () => (/* binding */ ecommerceSteps),
/* harmony export */   "getFirstEcommerceStep": () => (/* binding */ getFirstEcommerceStep),
/* harmony export */   "initialTopSteps": () => (/* binding */ initialTopSteps),
/* harmony export */   "routes": () => (/* binding */ routes),
/* harmony export */   "steps": () => (/* binding */ steps)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/store.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/institution.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/shipping.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _default_flow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./default-flow */ "./src/OnboardingSPA/data/routes/default-flow.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../constants */ "./src/constants.js");


 // eslint-disable-next-line import/no-extraneous-dependencies



const StepAddress = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_pages_Steps_Ecommerce_StepAddress_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/Steps/Ecommerce/StepAddress */ "./src/OnboardingSPA/pages/Steps/Ecommerce/StepAddress/index.js")));
const StepAddressLearnMoreSidebar = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_pages_Steps_Ecommerce_StepAddress_Sidebar_LearnMore_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/Steps/Ecommerce/StepAddress/Sidebar/LearnMore/ */ "./src/OnboardingSPA/pages/Steps/Ecommerce/StepAddress/Sidebar/LearnMore/index.js")));
const StepTax = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_pages_Steps_Ecommerce_StepTax_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/Steps/Ecommerce/StepTax */ "./src/OnboardingSPA/pages/Steps/Ecommerce/StepTax/index.js")));
const StepTaxLearnMoreSidebar = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_pages_Steps_Ecommerce_StepTax_Sidebar_LearnMore_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/Steps/Ecommerce/StepTax/Sidebar/LearnMore/ */ "./src/OnboardingSPA/pages/Steps/Ecommerce/StepTax/Sidebar/LearnMore/index.js")));
const StepProducts = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_pages_Steps_Ecommerce_StepProducts_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/Steps/Ecommerce/StepProducts */ "./src/OnboardingSPA/pages/Steps/Ecommerce/StepProducts/index.js")));
const StepProductsLearnMoreSidebar = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_pages_Steps_Ecommerce_StepProducts_Sidebar_LearnMore_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/Steps/Ecommerce/StepProducts/Sidebar/LearnMore */ "./src/OnboardingSPA/pages/Steps/Ecommerce/StepProducts/Sidebar/LearnMore/index.js")));

const ecommerceSteps = [{
  path: '/ecommerce/step/address',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Street Address', 'wp-module-onboarding'),
  heading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Street Address', 'wp-module-onboarding'),
  subheading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('In this step you confirm the business address of your store. Simply confirm the one you provided during your initial Bluehost account setup or provide a new one.', 'wp-module-onboarding'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('In this step you confirm the business address of your store. Simply confirm the one you provided during your initial Bluehost account setup or provide a new one.', 'wp-module-onboarding'),
  Component: StepAddress,
  Icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__["default"],
  priority: 85,
  VIEW: _constants__WEBPACK_IMPORTED_MODULE_4__.VIEW_NAV_ECOMMERCE_STORE_INFO,
  sidebars: {
    LearnMore: {
      SidebarComponents: [StepAddressLearnMoreSidebar]
    }
  }
}, {
  path: '/ecommerce/step/tax',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Tax Info', 'wp-module-onboarding'),
  heading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Tax Info', 'wp-module-onboarding'),
  subheading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Taxes can be configure at anytime in the WooCommerce Settings tab.', 'wp-module-onboarding'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Taxes can be configured at anytime in the WooCommerce Settings tab.', 'wp-module-onboarding'),
  Component: StepTax,
  Icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__["default"],
  priority: 90,
  VIEW: _constants__WEBPACK_IMPORTED_MODULE_4__.VIEW_NAV_ECOMMERCE_STORE_INFO,
  sidebars: {
    LearnMore: {
      SidebarComponents: [StepTaxLearnMoreSidebar]
    }
  }
}, {
  path: '/ecommerce/step/products',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Product Info', 'wp-module-onboarding'),
  heading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Product Info', 'wp-module-onboarding'),
  subheading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Hello, add a subheading for the learn more sidebar.', 'wp-module-onboarding'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("In this section, you can provide more information about your products and business, which will help us tailor your store setup experience and identify possible extensions you'll need for your online store.", 'wp-module-onboarding'),
  Component: StepProducts,
  Icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__["default"],
  priority: 95,
  VIEW: _constants__WEBPACK_IMPORTED_MODULE_4__.VIEW_NAV_ECOMMERCE_STORE_INFO,
  sidebars: {
    LearnMore: {
      SidebarComponents: [StepProductsLearnMoreSidebar]
    }
  }
}];
const steps = (0,lodash__WEBPACK_IMPORTED_MODULE_2__.orderBy)([...(0,lodash__WEBPACK_IMPORTED_MODULE_2__.filter)(_default_flow__WEBPACK_IMPORTED_MODULE_3__.steps, step => !step.path.includes('/step/top-priority') && !step.path.includes('/step/get-started/site-primary')), ...ecommerceSteps], ['priority'], ['asc']);
const routes = (0,lodash__WEBPACK_IMPORTED_MODULE_2__.orderBy)([...steps, ..._default_flow__WEBPACK_IMPORTED_MODULE_3__.pages], ['priority'], ['asc']);
const initialTopSteps = () => {
  const topSteps = (0,lodash__WEBPACK_IMPORTED_MODULE_2__.filter)(ecommerceSteps, step => {
    return !step.path.includes('/ecommerce/step');
  });
  const ecommerceStep = {
    /* This is a pseudo step to stand-in for all StoreInfo steps and does not have a Component to render */
    path: '/ecommerce/step/address',
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Store Info', 'wp-module-onboarding'),
    description: '',
    Icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__["default"],
    primaryDrawerActiveLinkIncludes: '/ecommerce/step/',
    VIEW: _constants__WEBPACK_IMPORTED_MODULE_4__.VIEW_NAV_ECOMMERCE_STORE_INFO,
    priority: 41
    /* matches priority for first store info step */

  };
  topSteps.push(ecommerceStep);
  const filteredSteps = (0,lodash__WEBPACK_IMPORTED_MODULE_2__.filter)((0,_default_flow__WEBPACK_IMPORTED_MODULE_3__.initialTopSteps)(), step => !step.path.includes('/step/top-priority'));
  return (0,lodash__WEBPACK_IMPORTED_MODULE_2__.orderBy)([...filteredSteps, ...topSteps], ['priority'], ['asc']);
};
const ecommerceGetStartedSteps = () => {
  return (0,lodash__WEBPACK_IMPORTED_MODULE_2__.filter)((0,_default_flow__WEBPACK_IMPORTED_MODULE_3__.initialGetStartedSteps)(), step => !step.path.includes('/step/get-started/site-primary'));
};
const getFirstEcommerceStep = () => {
  return ecommerceSteps[0];
};

/***/ }),

/***/ "./src/OnboardingSPA/data/routes/index.js":
/*!************************************************!*\
  !*** ./src/OnboardingSPA/data/routes/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "conditionalSteps": () => (/* binding */ conditionalSteps),
/* harmony export */   "initialDesignSteps": () => (/* binding */ initialDesignSteps),
/* harmony export */   "initialGetStartedSteps": () => (/* binding */ initialGetStartedSteps),
/* harmony export */   "initialStoreInfoSteps": () => (/* binding */ initialStoreInfoSteps),
/* harmony export */   "initialTopSteps": () => (/* binding */ initialTopSteps),
/* harmony export */   "routes": () => (/* binding */ routes),
/* harmony export */   "steps": () => (/* binding */ steps)
/* harmony export */ });
/* harmony import */ var _default_flow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./default-flow */ "./src/OnboardingSPA/data/routes/default-flow.js");
/* harmony import */ var _ecommerce_flow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ecommerce-flow */ "./src/OnboardingSPA/data/routes/ecommerce-flow.js");



function getSelectedRoute() {
  var _window$nfdOnboarding;

  return (_window$nfdOnboarding = window.nfdOnboarding.currentFlow) !== null && _window$nfdOnboarding !== void 0 ? _window$nfdOnboarding : 'wp-setup';
}

const routerMap = {
  'wp-setup': {
    routes: _default_flow__WEBPACK_IMPORTED_MODULE_0__.routes,
    steps: _default_flow__WEBPACK_IMPORTED_MODULE_0__.steps,
    conditionalSteps: _default_flow__WEBPACK_IMPORTED_MODULE_0__.conditionalSteps,
    initialTopSteps: _default_flow__WEBPACK_IMPORTED_MODULE_0__.initialTopSteps,
    initialDesignSteps: _default_flow__WEBPACK_IMPORTED_MODULE_0__.initialDesignSteps,
    initialGetStartedSteps: _default_flow__WEBPACK_IMPORTED_MODULE_0__.initialGetStartedSteps
  },
  ecommerce: {
    routes: _ecommerce_flow__WEBPACK_IMPORTED_MODULE_1__.routes,
    steps: _ecommerce_flow__WEBPACK_IMPORTED_MODULE_1__.steps,
    conditionalSteps: _default_flow__WEBPACK_IMPORTED_MODULE_0__.conditionalSteps,
    initialTopSteps: _ecommerce_flow__WEBPACK_IMPORTED_MODULE_1__.initialTopSteps,
    initialDesignSteps: _default_flow__WEBPACK_IMPORTED_MODULE_0__.initialDesignSteps,
    initialGetStartedSteps: _ecommerce_flow__WEBPACK_IMPORTED_MODULE_1__.ecommerceGetStartedSteps,
    initialStoreInfoSteps: _ecommerce_flow__WEBPACK_IMPORTED_MODULE_1__.ecommerceSteps
  }
};
const routes = [...routerMap[getSelectedRoute()].routes];
const steps = [...routerMap[getSelectedRoute()].steps];
const conditionalSteps = routerMap[getSelectedRoute()].conditionalSteps;
const initialTopSteps = () => {
  return routerMap[getSelectedRoute()].initialTopSteps();
};
const initialDesignSteps = () => {
  return routerMap[getSelectedRoute()].initialDesignSteps();
};
const initialGetStartedSteps = () => {
  return routerMap[getSelectedRoute()].initialGetStartedSteps();
};
const initialStoreInfoSteps = () => {
  return routerMap[getSelectedRoute()].initialStoreInfoSteps ? routerMap[getSelectedRoute()].initialStoreInfoSteps : [];
};

/***/ }),

/***/ "./src/OnboardingSPA/data/sidebars/index.js":
/*!**************************************************!*\
  !*** ./src/OnboardingSPA/data/sidebars/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sidebars": () => (/* binding */ sidebars)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../constants */ "./src/constants.js");


const LearnMoreMenu = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_components_Sidebar_components_LearnMore_Menu_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../components/Sidebar/components/LearnMore/Menu */ "./src/OnboardingSPA/components/Sidebar/components/LearnMore/Menu.js")));
const LearnMoreSidebar = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_components_Sidebar_components_LearnMore_Sidebar_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../components/Sidebar/components/LearnMore/Sidebar */ "./src/OnboardingSPA/components/Sidebar/components/LearnMore/Sidebar.js")));
const sidebars = [{
  id: _constants__WEBPACK_IMPORTED_MODULE_1__.SIDEBAR_LEARN_MORE,
  menu: LearnMoreMenu,
  sidebar: LearnMoreSidebar,
  enabled: true
}];

/***/ }),

/***/ "./src/OnboardingSPA/data/translations/index.js":
/*!******************************************************!*\
  !*** ./src/OnboardingSPA/data/translations/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "translationMap": () => (/* binding */ translationMap)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);

const translationMap = {
  'wp-setup': {
    site: {
      'noun': (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__._x)('site', 'noun', 'wp-module-onboarding')
    },
    website: {
      'noun': (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__._x)('website', 'noun', 'wp-module-onboarding')
    }
  },
  'ecommerce': {
    site: {
      'noun': (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__._x)('store', 'noun', 'wp-module-onboarding')
    },
    website: {
      'noun': (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__._x)('store', 'noun', 'wp-module-onboarding')
    }
  }
};

/***/ }),

/***/ "./src/OnboardingSPA/index.js":
/*!************************************!*\
  !*** ./src/OnboardingSPA/index.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "initializeNFDOnboarding": () => (/* binding */ initializeNFDOnboarding)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_app_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/app.scss */ "./src/OnboardingSPA/styles/app.scss");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _utils_api_flow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/api/flow */ "./src/OnboardingSPA/utils/api/flow.js");
/* harmony import */ var _utils_api_plugins__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/api/plugins */ "./src/OnboardingSPA/utils/api/plugins.js");
/* harmony import */ var _utils_api_themes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/api/themes */ "./src/OnboardingSPA/utils/api/themes.js");
/* harmony import */ var _utils_api_cronTrigger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/api/cronTrigger */ "./src/OnboardingSPA/utils/api/cronTrigger.js");
/* harmony import */ var _utils_api_settings__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/api/settings */ "./src/OnboardingSPA/utils/api/settings.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../constants */ "./src/constants.js");
/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/App */ "./src/OnboardingSPA/components/App/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_10__);



/* must import prior to App! */











/**
 * Component passed to wp.element.render().
 *
 * @return {WPComponent} NFDOnboarding Component
 */

const NFDOnboarding = () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_11__.HashRouter, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_App__WEBPACK_IMPORTED_MODULE_9__["default"], null));

const initializeFlowData = currentData => {
  currentData.hasExited = 0;
  currentData.isComplete = 0;
  return currentData;
};
/**
 * Method to initialize Onboarding interface inside WordPress Admin.
 *
 * @param {string} id      - Element ID to render into.
 * @param {Object} runtime - Expects runtime data from window.nfdOnboarding.
 */


async function initializeNFDOnboarding(id, runtime) {
  var _runtime$previewSetti;

  (0,_utils_api_plugins__WEBPACK_IMPORTED_MODULE_4__.init)();
  (0,_utils_api_themes__WEBPACK_IMPORTED_MODULE_5__.init)();
  setInterval(_utils_api_cronTrigger__WEBPACK_IMPORTED_MODULE_6__.trigger, 45000);
  const DOM_TARGET = document.getElementById(id);
  (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_10__.dispatch)(_store__WEBPACK_IMPORTED_MODULE_2__.store).setRuntime(runtime);

  if ((_runtime$previewSetti = runtime.previewSettings.settings.preRequisites) !== null && _runtime$previewSetti !== void 0 && _runtime$previewSetti.themes) {
    var _runtime$previewSetti2;

    (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_10__.dispatch)(_store__WEBPACK_IMPORTED_MODULE_2__.store).updateThemeStatus((_runtime$previewSetti2 = runtime.previewSettings.settings.preRequisites) === null || _runtime$previewSetti2 === void 0 ? void 0 : _runtime$previewSetti2.themes[_constants__WEBPACK_IMPORTED_MODULE_8__.DESIGN_STEPS_THEME]);
  }

  const currentData = await (0,_utils_api_flow__WEBPACK_IMPORTED_MODULE_3__.getFlow)();

  if (currentData.error === null) {
    currentData.body = initializeFlowData(currentData.body);
    (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_10__.dispatch)(_store__WEBPACK_IMPORTED_MODULE_2__.store).setCurrentOnboardingData(currentData.body);
  }

  if (null !== DOM_TARGET && 'undefined' !== typeof _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.render) {
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.render)((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(NFDOnboarding, null), DOM_TARGET);
    (0,_utils_api_settings__WEBPACK_IMPORTED_MODULE_7__.initialize)();
  } else {
    // eslint-disable-next-line no-console
    console.log('Could not find mount element or wp.element.render().');
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (initializeNFDOnboarding);

/***/ }),

/***/ "./src/OnboardingSPA/pages/Steps/DesignColors/utils.js":
/*!*************************************************************!*\
  !*** ./src/OnboardingSPA/pages/Steps/DesignColors/utils.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "findInPalette": () => (/* binding */ findInPalette),
/* harmony export */   "stateToStore": () => (/* binding */ stateToStore),
/* harmony export */   "storeToState": () => (/* binding */ storeToState)
/* harmony export */ });
/**
 * Helper Function for state in global styles to local mapping
 *
 * @param {Array} selectedColorPalette - Array of Map structure similar to the one in Global Styles
 *                                     e.g. [{color: '#ffffff', name: 'Base', slug: 'base'}, ...]
 *                                     return -> {base: "#ffffff", contrast: "#404040", ... }
 */
function storeToState(selectedColorPalette) {
  if (selectedColorPalette) {
    const selectedColorsLocalTemp = {};
    selectedColorPalette === null || selectedColorPalette === void 0 ? void 0 : selectedColorPalette.forEach(color => {
      selectedColorsLocalTemp[color.slug] = color.color;
    });
    return selectedColorsLocalTemp;
  }
}
/**
 * Converts the user selected value into a suitable valid global styles array value
 *
 * @param {Object} selectedColorsLocalTemp - Color type mapped to the color
 *                                         e.g. {base: "#ffffff", contrast: "#404040", ... }
 * @param {string} colorStyle              - Selected Color slug
 *                                         e.g. [{color: '#ffffff', name: 'Base', slug: 'base'}, ...]
 */

function stateToStore(selectedColorsLocalTemp, colorStyle) {
  if (selectedColorsLocalTemp && colorStyle) {
    const colorsArray = [];

    for (const colorName in selectedColorsLocalTemp) {
      colorsArray.push({
        slug: colorName,
        name: (colorName === null || colorName === void 0 ? void 0 : colorName.charAt(0).toUpperCase()) + (colorName === null || colorName === void 0 ? void 0 : colorName.slice(1)),
        color: selectedColorsLocalTemp[colorName]
      });
    }

    return colorsArray;
  }
}
/**
 * Finds the index of the color type being changed in the array
 * Array to check -> [{color: '#ffffff', name: 'Base', slug: 'base'}, ...]
 *
 * @param {string} slugName              - Slug Name for color i.e. base, secondary, header-title,...
 * @param {Array} palette - The Stored Preview Settings for live preview
 * @param {string} fallbackSlug   - The Color that triggered the color picker
 * @return {number} index - Index of the key "slug" mapped [{color: '#ffffff', name: 'Base', slug: 'base'}, ...] in the array
 */

function findInPalette(slugName, palette, fallbackSlug) {
  var _palette$settings, _palette$settings$col;

  const selectedThemeColorPalette = palette === null || palette === void 0 ? void 0 : (_palette$settings = palette.settings) === null || _palette$settings === void 0 ? void 0 : (_palette$settings$col = _palette$settings.color) === null || _palette$settings$col === void 0 ? void 0 : _palette$settings$col.palette;
  const index = selectedThemeColorPalette.findIndex(_ref => {
    let {
      slug
    } = _ref;
    return slug === slugName;
  }); // If the mapped slug doesn't exist then return the parent slug

  if (index === -1) {
    return selectedThemeColorPalette.findIndex(_ref2 => {
      let {
        slug
      } = _ref2;
      return slug === fallbackSlug;
    });
  }

  return index;
}

/***/ }),

/***/ "./src/OnboardingSPA/pages/index.js":
/*!******************************************!*\
  !*** ./src/OnboardingSPA/pages/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);






const IndexRoute = () => {
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_3__.useNavigate)();
  const {
    firstStep
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    return {
      firstStep: select(_store__WEBPACK_IMPORTED_MODULE_1__.store).getFirstStep()
    };
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    navigate(firstStep.path, {
      replace: true,
      state: {
        origin: 'index-redirect'
      }
    });
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IndexRoute);

/***/ }),

/***/ "./src/OnboardingSPA/store/actions.js":
/*!********************************************!*\
  !*** ./src/OnboardingSPA/store/actions.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dequeueRequest": () => (/* binding */ dequeueRequest),
/* harmony export */   "enqueueRequest": () => (/* binding */ enqueueRequest),
/* harmony export */   "flushQueue": () => (/* binding */ flushQueue),
/* harmony export */   "setActiveFlow": () => (/* binding */ setActiveFlow),
/* harmony export */   "setActiveStep": () => (/* binding */ setActiveStep),
/* harmony export */   "setCurrentOnboardingData": () => (/* binding */ setCurrentOnboardingData),
/* harmony export */   "setDrawerActiveView": () => (/* binding */ setDrawerActiveView),
/* harmony export */   "setHeaderMenuData": () => (/* binding */ setHeaderMenuData),
/* harmony export */   "setIsDrawerOpened": () => (/* binding */ setIsDrawerOpened),
/* harmony export */   "setIsDrawerSuppressed": () => (/* binding */ setIsDrawerSuppressed),
/* harmony export */   "setIsHeaderNavigationEnabled": () => (/* binding */ setIsHeaderNavigationEnabled),
/* harmony export */   "setIsSidebarOpened": () => (/* binding */ setIsSidebarOpened),
/* harmony export */   "setOnboardingSocialData": () => (/* binding */ setOnboardingSocialData),
/* harmony export */   "setRuntime": () => (/* binding */ setRuntime),
/* harmony export */   "setSidebarActiveView": () => (/* binding */ setSidebarActiveView),
/* harmony export */   "updateAllSteps": () => (/* binding */ updateAllSteps),
/* harmony export */   "updateDesignSteps": () => (/* binding */ updateDesignSteps),
/* harmony export */   "updatePreviewSettings": () => (/* binding */ updatePreviewSettings),
/* harmony export */   "updateRoutes": () => (/* binding */ updateRoutes),
/* harmony export */   "updateSettings": () => (/* binding */ updateSettings),
/* harmony export */   "updateThemeStatus": () => (/* binding */ updateThemeStatus)
/* harmony export */ });
/**
 * Receives `window.nfdOnboarding` and sets migrated: true.
 *
 * `url` is left to keep __webpack_public_path__ decoupled from store.
 *
 * @param {*} runtime
 * @return {Object} action object
 */
function setRuntime(runtime) {
  var _runtime$currentFlow;

  window.nfdOnboarding = {
    buildUrl: runtime.buildUrl,
    siteUrl: runtime.siteUrl,
    migrated: true,
    currentFlow: (_runtime$currentFlow = runtime.currentFlow) !== null && _runtime$currentFlow !== void 0 ? _runtime$currentFlow : 'wp-setup',
    stepPreviewData: runtime.previewSettings.stepPreviewData
  };
  return {
    type: 'SET_RUNTIME',
    runtime
  };
}
/**
 * Sets the active view within the Drawer render slot.
 *
 * @param {*} view
 * @return {Object} action object
 */

function setDrawerActiveView(view) {
  return {
    type: 'SET_DRAWER_ACTIVE_VIEW',
    view
  };
}
/**
 * Opens the off-canvas drawer on left of viewport.
 *
 * @param {*} isOpen
 * @return {Object} action object
 */

function setIsDrawerOpened(isOpen) {
  return {
    type: 'SET_DRAWER_OPENED',
    isOpen
  };
}
/**
 * Keeps the drawer on the left suppressed.
 *
 * @param {*} isSuppressed
 * @return {Object} action object
 */

function setIsDrawerSuppressed(isSuppressed) {
  return {
    type: 'SET_DRAWER_SUPPRESSED',
    isSuppressed
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

function setActiveFlow(flow) {
  return {
    type: 'SET_ACTIVE_FLOW',
    flow
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

function setActiveStep(path) {
  // Remove Trailing Spaces from URL
  path = path.replace(/\/$/, '');
  return {
    type: 'SET_ACTIVE_STEP',
    path
  };
}
/**
 * Accepts a JSON to set the Flow Data.
 *
 * @param {*} flowData
 * @return {Object} action object
 */

function setCurrentOnboardingData(flowData) {
  return {
    type: 'SET_CURRENT_DATA',
    flowData
  };
}
/**
 * Accepts a JSON to set the social data.
 *
 * @param {*} socialData
 * @return {Object} action object
 */

function setOnboardingSocialData(socialData) {
  return {
    type: 'SET_SOCIAL_DATA',
    socialData
  };
}
/**
 * Updates general settings.
 *
 * @param {*} settings
 * @return {Object} action object
 */

function updateSettings(settings) {
  return {
    type: 'UPDATE_SETTINGS',
    settings
  };
}
function updateThemeStatus(themeStatus) {
  return {
    type: 'UPDATE_THEME_STATUS',
    themeStatus
  };
}
function setIsSidebarOpened(isOpen) {
  return {
    type: 'SET_SIDEBAR_OPENED',
    isOpen
  };
}
function setSidebarActiveView(view) {
  return {
    type: 'SET_SIDEBAR_ACTIVE_VIEW',
    view
  };
}
function setIsHeaderNavigationEnabled(isNavigationEnabled) {
  return {
    type: 'SET_HEADER_NAVIGATION_ENABLED',
    isNavigationEnabled
  };
}
function updatePreviewSettings(previewSettings) {
  return {
    type: 'SET_PREVIEW_SETTINGS',
    previewSettings
  };
}
function updateRoutes(routes) {
  return {
    type: 'UPDATE_ROUTES',
    routes
  };
}
function updateAllSteps(allSteps) {
  return {
    type: 'UPDATE_ALL_STEPS',
    allSteps
  };
}
function updateDesignSteps(designSteps) {
  return {
    type: 'UPDATE_DESIGN_STEPS',
    designSteps
  };
}
function setHeaderMenuData(menu) {
  return {
    type: 'UPDATE_HEADER_MENU_DATA',
    menu
  };
}
function enqueueRequest(id, request) {
  return {
    type: 'ENQUEUE_REQUEST',
    id,
    request
  };
}
function dequeueRequest() {
  return {
    type: 'DEQUEUE_REQUEST'
  };
}
function flushQueue() {
  return {
    type: 'FLUSH_QUEUE'
  };
}

/***/ }),

/***/ "./src/OnboardingSPA/store/constants.js":
/*!**********************************************!*\
  !*** ./src/OnboardingSPA/store/constants.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "STORE_NAME": () => (/* binding */ STORE_NAME)
/* harmony export */ });
/**
 * Identifier for Newfold Onboarding data store.
 *
 * @type {string}
 */
const STORE_NAME = 'newfold/onboarding';

/***/ }),

/***/ "./src/OnboardingSPA/store/index.js":
/*!******************************************!*\
  !*** ./src/OnboardingSPA/store/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "nfdOnboardingStoreConfig": () => (/* binding */ nfdOnboardingStoreConfig),
/* harmony export */   "store": () => (/* binding */ store)
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions */ "./src/OnboardingSPA/store/actions.js");
/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./selectors */ "./src/OnboardingSPA/store/selectors.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./src/OnboardingSPA/store/constants.js");
/* harmony import */ var _wordpress_data_controls__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data-controls */ "@wordpress/data-controls");
/* harmony import */ var _wordpress_data_controls__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _reducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./reducer */ "./src/OnboardingSPA/store/reducer.js");






const nfdOnboardingStoreConfig = {
  reducer: _reducer__WEBPACK_IMPORTED_MODULE_5__["default"],
  actions: _actions__WEBPACK_IMPORTED_MODULE_0__,
  selectors: _selectors__WEBPACK_IMPORTED_MODULE_1__
};
const store = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.createReduxStore)(_constants__WEBPACK_IMPORTED_MODULE_3__.STORE_NAME, nfdOnboardingStoreConfig);
(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.register)(store);

/***/ }),

/***/ "./src/OnboardingSPA/store/reducer.js":
/*!********************************************!*\
  !*** ./src/OnboardingSPA/store/reducer.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "data": () => (/* binding */ data),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "drawer": () => (/* binding */ drawer),
/* harmony export */   "flow": () => (/* binding */ flow),
/* harmony export */   "header": () => (/* binding */ header),
/* harmony export */   "queue": () => (/* binding */ queue),
/* harmony export */   "runtime": () => (/* binding */ runtime),
/* harmony export */   "settings": () => (/* binding */ settings),
/* harmony export */   "sidebar": () => (/* binding */ sidebar)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants */ "./src/constants.js");
/* harmony import */ var _data_routes_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../data/routes/index */ "./src/OnboardingSPA/data/routes/index.js");
/* harmony import */ var _data_sidebars_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../data/sidebars/index */ "./src/OnboardingSPA/data/sidebars/index.js");
/* harmony import */ var _utils_api_queuer_api_queue_executor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/api-queuer/api-queue-executor */ "./src/OnboardingSPA/utils/api-queuer/api-queue-executor.js");





function flow() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    flow: 'wp-setup',
    steps: {
      routes: _data_routes_index__WEBPACK_IMPORTED_MODULE_2__.routes,
      allSteps: _data_routes_index__WEBPACK_IMPORTED_MODULE_2__.steps,
      topSteps: (0,_data_routes_index__WEBPACK_IMPORTED_MODULE_2__.initialTopSteps)(),
      designSteps: (0,_data_routes_index__WEBPACK_IMPORTED_MODULE_2__.initialDesignSteps)(),
      getStartedSteps: (0,_data_routes_index__WEBPACK_IMPORTED_MODULE_2__.initialGetStartedSteps)(),
      storeInfoSteps: (0,_data_routes_index__WEBPACK_IMPORTED_MODULE_2__.initialStoreInfoSteps)(),
      currentStep: '/wp-setup/step/what-next'
    }
  };
  let action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SET_ACTIVE_STEP':
      return { ...state,
        steps: { ...state.steps,
          currentStep: action.path
        }
      };

    case 'SET_ACTIVE_FLOW':
      return { ...state,
        flow: action.flow
      };

    case 'UPDATE_ROUTES':
      return { ...state,
        steps: { ...state.steps,
          routes: action.routes
        }
      };

    case 'UPDATE_ALL_STEPS':
      return { ...state,
        steps: { ...state.steps,
          allSteps: action.allSteps
        }
      };

    case 'UPDATE_DESIGN_STEPS':
      return { ...state,
        steps: { ...state.steps,
          designSteps: action.designSteps
        }
      };
  }

  return state;
}
function drawer() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    isOpen: false,
    isSuppressed: false,
    view: _constants__WEBPACK_IMPORTED_MODULE_1__.VIEW_NAV_PRIMARY
  };
  let action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SET_DRAWER_OPENED':
      return { ...state,
        isOpen: action.isOpen
      };

    case 'SET_DRAWER_ACTIVE_VIEW':
      return { ...state,
        view: action.view
      };

    case 'SET_DRAWER_SUPPRESSED':
      return { ...state,
        isSuppressed: action.isSuppressed,
        isOpen: action.isSuppressed ? false : state.isOpen
      };
  }

  return state;
}
function data() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SET_CURRENT_DATA':
      return { ...state,
        flowData: { ...action.flowData
        }
      };

    case 'SET_SOCIAL_DATA':
      return { ...state,
        socialData: { ...action.socialData
        }
      };
  }

  return state;
}
function sidebar() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    isOpen: false,
    view: 'LearnMore',
    sidebars: _data_sidebars_index__WEBPACK_IMPORTED_MODULE_3__.sidebars
  };
  let action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SET_SIDEBAR_OPENED':
      return { ...state,
        isOpen: action.isOpen
      };

    case 'SET_SIDEBAR_ACTIVE_VIEW':
      return { ...state,
        view: action.view
      };
  }

  return state;
}
function header() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    isNavigationEnabled: true,
    menu: ''
  };
  let action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SET_HEADER_NAVIGATION_ENABLED':
      return { ...state,
        isNavigationEnabled: action.isNavigationEnabled
      };

    case 'UPDATE_HEADER_MENU_DATA':
      return { ...state,
        menu: action.menu
      };
  }

  return state;
}
function runtime() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SET_RUNTIME':
      return { ...state,
        ...action.runtime
      };

    case 'SET_PREVIEW_SETTINGS':
      return { ...state,
        previewSettings: { ...state.previewSettings,
          settings: action.previewSettings
        }
      };
  }

  return state;
}
function settings() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    themeStatus: _constants__WEBPACK_IMPORTED_MODULE_1__.THEME_STATUS_INIT
  };
  let action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'UPDATE_SETTINGS':
      return { ...state,
        ...action.settings
      };

    case 'UPDATE_THEME_STATUS':
      return { ...state,
        themeStatus: action.themeStatus
      };
  }

  return state;
}
function queue() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  let action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    // Add a new API Request to the Queue
    case 'ENQUEUE_REQUEST':
      state = state.filter(ele => ele[0] !== action.id);
      return [...state, [action.id, action.request]];
    // Take out the topmost Queue Item

    case 'DEQUEUE_REQUEST':
      return [...state.slice(1)];
    // Make all the Queue Requests and Empty the queue

    case 'FLUSH_QUEUE':
      (0,_utils_api_queuer_api_queue_executor__WEBPACK_IMPORTED_MODULE_4__["default"])(state);
      return [];
  }

  return state;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.combineReducers)({
  drawer,
  runtime,
  data,
  settings,
  flow,
  sidebar,
  header,
  queue
}));

/***/ }),

/***/ "./src/OnboardingSPA/store/selectors.js":
/*!**********************************************!*\
  !*** ./src/OnboardingSPA/store/selectors.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getAllSteps": () => (/* binding */ getAllSteps),
/* harmony export */   "getCurrentOnboardingData": () => (/* binding */ getCurrentOnboardingData),
/* harmony export */   "getCurrentStep": () => (/* binding */ getCurrentStep),
/* harmony export */   "getCurrentStepPath": () => (/* binding */ getCurrentStepPath),
/* harmony export */   "getDesignSteps": () => (/* binding */ getDesignSteps),
/* harmony export */   "getDrawerView": () => (/* binding */ getDrawerView),
/* harmony export */   "getExpertsUrl": () => (/* binding */ getExpertsUrl),
/* harmony export */   "getFirstStep": () => (/* binding */ getFirstStep),
/* harmony export */   "getGetStartedSteps": () => (/* binding */ getGetStartedSteps),
/* harmony export */   "getHeaderMenuData": () => (/* binding */ getHeaderMenuData),
/* harmony export */   "getHireExpertsUrl": () => (/* binding */ getHireExpertsUrl),
/* harmony export */   "getLastStep": () => (/* binding */ getLastStep),
/* harmony export */   "getNewfoldBrand": () => (/* binding */ getNewfoldBrand),
/* harmony export */   "getNewfoldBrandConfig": () => (/* binding */ getNewfoldBrandConfig),
/* harmony export */   "getNewfoldBrandName": () => (/* binding */ getNewfoldBrandName),
/* harmony export */   "getNextStep": () => (/* binding */ getNextStep),
/* harmony export */   "getOnboardingFlow": () => (/* binding */ getOnboardingFlow),
/* harmony export */   "getOnboardingSocialData": () => (/* binding */ getOnboardingSocialData),
/* harmony export */   "getPluginInstallHash": () => (/* binding */ getPluginInstallHash),
/* harmony export */   "getPreviewSettings": () => (/* binding */ getPreviewSettings),
/* harmony export */   "getPreviousStep": () => (/* binding */ getPreviousStep),
/* harmony export */   "getQueuePeek": () => (/* binding */ getQueuePeek),
/* harmony export */   "getRoutes": () => (/* binding */ getRoutes),
/* harmony export */   "getSettings": () => (/* binding */ getSettings),
/* harmony export */   "getSidebarView": () => (/* binding */ getSidebarView),
/* harmony export */   "getSidebars": () => (/* binding */ getSidebars),
/* harmony export */   "getStepFromPath": () => (/* binding */ getStepFromPath),
/* harmony export */   "getStepPreviewData": () => (/* binding */ getStepPreviewData),
/* harmony export */   "getStoreInfoSteps": () => (/* binding */ getStoreInfoSteps),
/* harmony export */   "getTechSupportUrl": () => (/* binding */ getTechSupportUrl),
/* harmony export */   "getThemeStatus": () => (/* binding */ getThemeStatus),
/* harmony export */   "getTopSteps": () => (/* binding */ getTopSteps),
/* harmony export */   "getfullServiceCreativeTeamUrl": () => (/* binding */ getfullServiceCreativeTeamUrl),
/* harmony export */   "isDrawerOpened": () => (/* binding */ isDrawerOpened),
/* harmony export */   "isDrawerSuppressed": () => (/* binding */ isDrawerSuppressed),
/* harmony export */   "isHeaderNavigationEnabled": () => (/* binding */ isHeaderNavigationEnabled),
/* harmony export */   "isQueueEmpty": () => (/* binding */ isQueueEmpty),
/* harmony export */   "isSidebarOpened": () => (/* binding */ isSidebarOpened)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_1__);
// eslint-disable-next-line import/no-extraneous-dependencies


/**
 * Get the currently active drawer view
 *
 * @param {*} state
 * @return {string} Drawer View
 */

function getDrawerView(state) {
  return state.drawer.view;
}
/**
 * Check if the drawer is opened
 *
 * @param {*} state
 * @return {boolean} Drawer isOpen
 */

function isDrawerOpened(state) {
  return state.drawer.isOpen;
}
/**
 * Check if the drawer is suppressed
 *
 * @param {*} state
 * @return {boolean} Drawer isSuppressed
 */

function isDrawerSuppressed(state) {
  return state.drawer.isSuppressed;
}
function isHeaderNavigationEnabled(state) {
  return state.header.isNavigationEnabled;
}
/**
 * Gets current Newfold brand
 *
 * @param {*} state
 * @return {string} Newfold Brand
 */

function getNewfoldBrand(state) {
  return state.runtime.currentBrand.brand;
}
/**
 * Gets current Newfold brand
 *
 * @param {*} state
 * @return {string} Current Brand Name
 */

function getNewfoldBrandName(state) {
  return state.runtime.currentBrand.name;
}
/**
 * Gets the current Newfold Brand's Onboarding Configuration.
 *
 * @param {*} state
 * @return {Object} Brand Onboarding Configuration.
 */

function getNewfoldBrandConfig(state) {
  return state.runtime.currentBrand.config;
}
/**
 * Gets dynamic Hire Experts URL for Need Help Tag per brand
 *
 * @param {*} state
 * @return {string} hireExpertsUrl
 */

function getHireExpertsUrl(state) {
  const hireExpertsInfo = state.runtime.currentBrand.hireExpertsInfo;
  const hireExpertsUrl = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_1__.addQueryArgs)(hireExpertsInfo === null || hireExpertsInfo === void 0 ? void 0 : hireExpertsInfo.defaultLink, hireExpertsInfo === null || hireExpertsInfo === void 0 ? void 0 : hireExpertsInfo.queryParameters) + ((hireExpertsInfo === null || hireExpertsInfo === void 0 ? void 0 : hireExpertsInfo.fragment) || '');
  return hireExpertsUrl;
}
/**
 * Gets the current Onboarding Data
 *
 * @param {*} state
 * @return {string} Current Onboarding Data
 */

function getCurrentOnboardingData(state) {
  return state.data.flowData;
}
/**
 * Gets the current Onboarding Social Data
 *
 * @param {*} state
 * @return {string} Onboarding Social Data
 */

function getOnboardingSocialData(state) {
  return state.data.socialData;
}
/**
 * Gets current Onboarding Flow
 *
 * @param {*} state
 * @return {string} Onboarding Flow
 */

function getOnboardingFlow(state) {
  var _state$runtime$curren;

  return (_state$runtime$curren = state.runtime.currentFlow) !== null && _state$runtime$curren !== void 0 ? _state$runtime$curren : 'wp-setup';
}
function getRoutes(state) {
  return state.flow.steps.routes;
}
function getAllSteps(state) {
  return state.flow.steps.allSteps;
}
/**
 * Gets steps to display in drawer.
 *
 * @param {*} state
 * @return {Array} Top Steps
 */

function getTopSteps(state) {
  return state.flow.steps.topSteps;
}
/**
 * Gets design steps to display in drawer submenu.
 *
 * @param {*} state
 * @return {Array} Design Steps
 */

function getDesignSteps(state) {
  return state.flow.steps.designSteps;
}
/**
 * Gets get-started setup steps to display in drawer submenu.
 *
 * @param {*} state
 * @return {Array} Get Started Steps
 */

function getGetStartedSteps(state) {
  return state.flow.steps.getStartedSteps;
}
/**
 * Get the path to the current step.
 *
 * @param {*} state
 * @return {string} Current Step Path
 */

function getCurrentStepPath(state) {
  return state.flow.steps.currentStep;
}
/**
 * Gets the First step object.
 *
 * @param {*} state
 * @return {Object} First Step
 */

function getFirstStep(state) {
  return state.flow.steps.allSteps[0];
}
/**
 * Gets the Last step object.
 *
 * @param {*} state
 * @return {Object} Last Step
 */

function getLastStep(state) {
  return state.flow.steps.allSteps[state.flow.steps.allSteps.length - 1];
}
/**
 * Gets the current step object.
 *
 * @param {*} state
 * @return {Object} Current Step
 */

function getCurrentStep(state) {
  const filtered = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.filter)(state.flow.steps.allSteps, ['path', state.flow.steps.currentStep]);
  return filtered[0];
}
function getStepFromPath(state, path) {
  const filtered = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.filter)(state.flow.steps.allSteps, ['path', path]);
  return filtered[0];
}
/**
 * Get's the previous step's object.
 *
 * @param {*} state
 * @return {object|null|false} Previous Step
 */

function getPreviousStep(state) {
  const currentStepIndex = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.findIndex)(state.flow.steps.allSteps, {
    path: state.flow.steps.currentStep
  });

  if (0 === currentStepIndex) {
    return null; // current step is the first step
  }

  if (-1 === currentStepIndex) {
    return false; // could not find index
  }

  return state.flow.steps.allSteps[currentStepIndex - 1];
}
/**
 * Gets the next steps object.
 *
 * @param {*} state
 * @return {object|null|false} Next Step
 */

function getNextStep(state) {
  const totalIndexes = state.flow.steps.allSteps.length - 1;
  const currentStepIndex = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.findIndex)(state.flow.steps.allSteps, {
    path: state.flow.steps.currentStep
  });

  if (totalIndexes === currentStepIndex) {
    return null; // currentStep is the last step
  }

  if (-1 === currentStepIndex) {
    return false; // could not find index
  }

  return state.flow.steps.allSteps[currentStepIndex + 1];
}
function isSidebarOpened(state) {
  return state.sidebar.isOpen;
}
function getSidebarView(state) {
  return state.sidebar.view;
}
function getSidebars(state) {
  return (0,lodash__WEBPACK_IMPORTED_MODULE_0__.filter)(state.sidebar.sidebars, ['enabled', true]);
}
function getPreviewSettings(state) {
  return state.runtime.previewSettings.settings;
}
function getSettings(state) {
  return state.settings;
}
function getThemeStatus(state) {
  return state.settings.themeStatus;
}
function getStoreInfoSteps(state) {
  return state.flow.steps.storeInfoSteps;
}
function getStepPreviewData(state) {
  return state.runtime.previewSettings.stepPreviewData;
}
/**
 * Gets the current header menu Data
 *
 * @param {*} state
 * @return {string} menu
 */

function getHeaderMenuData(state) {
  return state.header.menu;
}
/**
 * Gets 1-1 Experts URL for Help Section in the Sidebars
 *
 * @param {*} state
 * @return {string} expertsUrl
 */

function getExpertsUrl(state) {
  const expertsInfo = state.runtime.currentBrand.expertsInfo;
  const expertsUrl = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_1__.addQueryArgs)(expertsInfo === null || expertsInfo === void 0 ? void 0 : expertsInfo.defaultLink, expertsInfo === null || expertsInfo === void 0 ? void 0 : expertsInfo.queryParams) + ((expertsInfo === null || expertsInfo === void 0 ? void 0 : expertsInfo.fragment) || '');
  return expertsUrl;
}
/**
 * Gets Full Service Creative Team URL for Help Section in the Sidebars
 *
 * @param {*} state
 * @return {string} fullServiceCreativeTeamUrl
 */

function getfullServiceCreativeTeamUrl(state) {
  const fullServiceCreativeTeamInfo = state.runtime.currentBrand.fullServiceCreativeTeamInfo;
  const fullServiceCreativeTeamUrl = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_1__.addQueryArgs)(fullServiceCreativeTeamInfo === null || fullServiceCreativeTeamInfo === void 0 ? void 0 : fullServiceCreativeTeamInfo.defaultLink, fullServiceCreativeTeamInfo === null || fullServiceCreativeTeamInfo === void 0 ? void 0 : fullServiceCreativeTeamInfo.queryParams) + ((fullServiceCreativeTeamInfo === null || fullServiceCreativeTeamInfo === void 0 ? void 0 : fullServiceCreativeTeamInfo.fragment) || '');
  return fullServiceCreativeTeamUrl;
}
/**
 * Gets Technical Support URL for Help Section in the Sidebars
 *
 * @param {*} state
 * @return {string} techSupportUrl
 */

function getTechSupportUrl(state) {
  const techSupportInfo = state.runtime.currentBrand.techSupportInfo;
  const techSupportUrl = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_1__.addQueryArgs)(techSupportInfo === null || techSupportInfo === void 0 ? void 0 : techSupportInfo.defaultLink, techSupportInfo === null || techSupportInfo === void 0 ? void 0 : techSupportInfo.queryParams) + ((techSupportInfo === null || techSupportInfo === void 0 ? void 0 : techSupportInfo.fragment) || '');
  return techSupportUrl;
}
/**
 * Gets the Plugin Install Hash for security
 *
 * @param {*} state
 * @return {string} pluginInstallHash
 */

function getPluginInstallHash(state) {
  return state.runtime.pluginInstallHash;
}
/**
 * Gets the Queue Element on top
 *
 * @param {*} state
 * @return {string} getQueuePeek
 */

function getQueuePeek(state) {
  var _state$queue$;

  return (_state$queue$ = state === null || state === void 0 ? void 0 : state.queue[0]) !== null && _state$queue$ !== void 0 ? _state$queue$ : null;
}
/**
 * Gets the Queue Element on top
 *
 * @param {*} state
 * @return {string} getQueuePeek
 */

function isQueueEmpty(state) {
  var _state$queue;

  return (state === null || state === void 0 ? void 0 : (_state$queue = state.queue) === null || _state$queue === void 0 ? void 0 : _state$queue.length) === 0;
}

/***/ }),

/***/ "./src/OnboardingSPA/utils/analytics/index.js":
/*!****************************************************!*\
  !*** ./src/OnboardingSPA/utils/analytics/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "trackHiiveEvent": () => (/* binding */ trackHiiveEvent)
/* harmony export */ });
/* harmony import */ var _newfold_labs_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @newfold-labs/js-utility-ui-analytics */ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../constants */ "./src/constants.js");


const trackHiiveEvent = (action, value) => {
  const data = {
    value,
    timestamp: Date.now()
  };

  if ('pageview' === action) {
    data.page = value;
  }

  const hiiveEvent = new _newfold_labs_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_0__.HiiveEvent(_constants__WEBPACK_IMPORTED_MODULE_1__.HIIVE_ANALYTICS_CATEGORY, action, data, _constants__WEBPACK_IMPORTED_MODULE_1__.HIIVE_ANALYTICS_CATEGORY);
  _newfold_labs_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_0__.HiiveAnalytics.track(hiiveEvent);
};

/***/ }),

/***/ "./src/OnboardingSPA/utils/api-queuer/api-queue-executor.js":
/*!******************************************************************!*\
  !*** ./src/OnboardingSPA/utils/api-queuer/api-queue-executor.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../constants */ "./src/constants.js");
/* eslint no-console: ["error", { allow: ["error"] }] */
 // This Executer is responsible to execute API requests in a sequence

const apiQueueExecutor = async requests => {
  const items = requests;

  const dequeue = async function () {
    let retryCount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    // Queue Empty
    if (!items[0]) return;
    await items[0][1]().then(e => {
      if (e.error && retryCount < _constants__WEBPACK_IMPORTED_MODULE_0__.MAX_RETRIES_API_QUEUER) {
        dequeue(retryCount + 1);
      }
    }).then(() => items.shift()).then(dequeue);
  };

  await dequeue();
  return items;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (apiQueueExecutor);

/***/ }),

/***/ "./src/OnboardingSPA/utils/api/common.js":
/*!***********************************************!*\
  !*** ./src/OnboardingSPA/utils/api/common.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "installerRestURL": () => (/* binding */ installerRestURL),
/* harmony export */   "onboardingRestURL": () => (/* binding */ onboardingRestURL),
/* harmony export */   "wpRestURL": () => (/* binding */ wpRestURL)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../constants */ "./src/constants.js");

const onboardingRestURL = api => {
  var _window$nfdOnboarding;

  return `${_constants__WEBPACK_IMPORTED_MODULE_0__.onboardingRestBase}/${api}` + ((_window$nfdOnboarding = window.nfdOnboarding) !== null && _window$nfdOnboarding !== void 0 && _window$nfdOnboarding.currentFlow ? `&flow=${window.nfdOnboarding.currentFlow}` : '');
};
const installerRestURL = api => {
  return `${_constants__WEBPACK_IMPORTED_MODULE_0__.installerRestBase}/${api}`;
};
const wpRestURL = api => {
  return `${_constants__WEBPACK_IMPORTED_MODULE_0__.wpRestBase}/${api}`;
};

/***/ }),

/***/ "./src/OnboardingSPA/utils/api/cronTrigger.js":
/*!****************************************************!*\
  !*** ./src/OnboardingSPA/utils/api/cronTrigger.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "trigger": () => (/* binding */ trigger)
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../constants */ "./src/constants.js");


const trigger = () => {
  _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    url: `${_constants__WEBPACK_IMPORTED_MODULE_1__.wpSiteUrl}/wp-cron.php`,
    method: 'GET',
    parse: false
  }).catch(error => {
    console.error(error);
  });
};

/***/ }),

/***/ "./src/OnboardingSPA/utils/api/ecommerce.js":
/*!**************************************************!*\
  !*** ./src/OnboardingSPA/utils/api/ecommerce.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchWPSettings": () => (/* binding */ fetchWPSettings),
/* harmony export */   "isEmpty": () => (/* binding */ isEmpty),
/* harmony export */   "updateWPSettings": () => (/* binding */ updateWPSettings)
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common */ "./src/OnboardingSPA/utils/api/common.js");


const isEmpty = object => Object.keys(object).length === 0;
async function fetchWPSettings() {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    url: (0,_common__WEBPACK_IMPORTED_MODULE_1__.wpRestURL)('settings')
  });
}
async function updateWPSettings(data) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    url: (0,_common__WEBPACK_IMPORTED_MODULE_1__.wpRestURL)('settings'),
    method: 'POST',
    data
  });
}

/***/ }),

/***/ "./src/OnboardingSPA/utils/api/flow.js":
/*!*********************************************!*\
  !*** ./src/OnboardingSPA/utils/api/flow.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "completeFlow": () => (/* binding */ completeFlow),
/* harmony export */   "getFlow": () => (/* binding */ getFlow),
/* harmony export */   "setFlow": () => (/* binding */ setFlow),
/* harmony export */   "switchFlow": () => (/* binding */ switchFlow)
/* harmony export */ });
/* harmony import */ var _resolve__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./resolve */ "./src/OnboardingSPA/utils/api/resolve.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common */ "./src/OnboardingSPA/utils/api/common.js");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);



let abortControllerSetFlow;
async function getFlow() {
  return await (0,_resolve__WEBPACK_IMPORTED_MODULE_0__.resolve)(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
    url: (0,_common__WEBPACK_IMPORTED_MODULE_1__.onboardingRestURL)('flow')
  }).then());
}
async function setFlow(data) {
  if (abortControllerSetFlow) {
    abortControllerSetFlow.abort('New setFlow request placed!');
  }

  abortControllerSetFlow = new AbortController();
  const {
    signal
  } = abortControllerSetFlow;
  return await (0,_resolve__WEBPACK_IMPORTED_MODULE_0__.resolve)(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
    url: (0,_common__WEBPACK_IMPORTED_MODULE_1__.onboardingRestURL)('flow'),
    signal,
    method: 'POST',
    data
  }).then());
}
async function completeFlow() {
  return await (0,_resolve__WEBPACK_IMPORTED_MODULE_0__.resolve)(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
    url: (0,_common__WEBPACK_IMPORTED_MODULE_1__.onboardingRestURL)('flow/complete'),
    method: 'POST'
  }).then());
}
async function switchFlow(flow) {
  return await (0,_resolve__WEBPACK_IMPORTED_MODULE_0__.resolve)(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
    url: (0,_common__WEBPACK_IMPORTED_MODULE_1__.onboardingRestURL)('flow/switch'),
    method: 'POST',
    data: {
      flow
    }
  }).then());
}

/***/ }),

/***/ "./src/OnboardingSPA/utils/api/patterns.js":
/*!*************************************************!*\
  !*** ./src/OnboardingSPA/utils/api/patterns.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getPatterns": () => (/* binding */ getPatterns)
/* harmony export */ });
/* harmony import */ var _resolve__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./resolve */ "./src/OnboardingSPA/utils/api/resolve.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common */ "./src/OnboardingSPA/utils/api/common.js");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);



async function getPatterns() {
  let step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  let squash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return await (0,_resolve__WEBPACK_IMPORTED_MODULE_0__.resolve)(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
    url: (0,_common__WEBPACK_IMPORTED_MODULE_1__.onboardingRestURL)(`patterns` + (step ? `&step=${step}&squash=${squash}` : ''))
  }).then());
}

/***/ }),

/***/ "./src/OnboardingSPA/utils/api/plugins.js":
/*!************************************************!*\
  !*** ./src/OnboardingSPA/utils/api/plugins.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getSiteFeatures": () => (/* binding */ getSiteFeatures),
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "setSiteFeatures": () => (/* binding */ setSiteFeatures)
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common */ "./src/OnboardingSPA/utils/api/common.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../index */ "./src/OnboardingSPA/utils/index.js");
/* harmony import */ var _resolve__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./resolve */ "./src/OnboardingSPA/utils/api/resolve.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../constants */ "./src/constants.js");





const init = () => {
  // Backend should have done the initialization if this param is present.
  if ((0,_index__WEBPACK_IMPORTED_MODULE_2__.getQueryParam)(_constants__WEBPACK_IMPORTED_MODULE_4__.NFD_PLUGINS_QUERY_PARAM)) {
    return true;
  }

  _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    url: (0,_common__WEBPACK_IMPORTED_MODULE_1__.onboardingRestURL)('plugins/initialize'),
    method: 'POST',
    headers: {
      'X-NFD-INSTALLER': window.nfdOnboarding.pluginInstallHash
    }
  }).catch(error => {
    // eslint-disable-next-line no-console
    console.error(error);
  });
};
const getSiteFeatures = async () => {
  return await (0,_resolve__WEBPACK_IMPORTED_MODULE_3__.resolve)(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    url: (0,_common__WEBPACK_IMPORTED_MODULE_1__.onboardingRestURL)('plugins/site-features')
  }));
};
const setSiteFeatures = async (pluginInstallHash, data) => {
  return await (0,_resolve__WEBPACK_IMPORTED_MODULE_3__.resolve)(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    url: (0,_common__WEBPACK_IMPORTED_MODULE_1__.onboardingRestURL)('plugins/site-features'),
    method: 'POST',
    headers: {
      'X-NFD-INSTALLER': pluginInstallHash
    },
    data
  }));
};

/***/ }),

/***/ "./src/OnboardingSPA/utils/api/resolve.js":
/*!************************************************!*\
  !*** ./src/OnboardingSPA/utils/api/resolve.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "resolve": () => (/* binding */ resolve)
/* harmony export */ });
async function resolve(promise) {
  const resolved = {
    body: null,
    error: null
  };

  try {
    resolved.body = await promise;
  } catch (e) {
    resolved.error = e;
  }

  return resolved;
}

/***/ }),

/***/ "./src/OnboardingSPA/utils/api/settings.js":
/*!*************************************************!*\
  !*** ./src/OnboardingSPA/utils/api/settings.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getSettings": () => (/* binding */ getSettings),
/* harmony export */   "initialize": () => (/* binding */ initialize),
/* harmony export */   "setSettings": () => (/* binding */ setSettings)
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _resolve_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resolve.js */ "./src/OnboardingSPA/utils/api/resolve.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../constants */ "./src/constants.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common */ "./src/OnboardingSPA/utils/api/common.js");




async function getSettings() {
  return await (0,_resolve_js__WEBPACK_IMPORTED_MODULE_1__.resolve)(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    url: (0,_common__WEBPACK_IMPORTED_MODULE_3__.onboardingRestURL)('settings')
  }).then());
}
async function setSettings(data) {
  return await (0,_resolve_js__WEBPACK_IMPORTED_MODULE_1__.resolve)(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    url: (0,_common__WEBPACK_IMPORTED_MODULE_3__.onboardingRestURL)('settings'),
    method: 'POST',
    data
  }).then());
}
const initialize = function () {
  let retries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  if (retries >= _constants__WEBPACK_IMPORTED_MODULE_2__.MAX_RETRIES_SETTINGS_INIT) {
    return false;
  }

  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    url: (0,_common__WEBPACK_IMPORTED_MODULE_3__.onboardingRestURL)('settings/initialize'),
    method: 'POST'
  }).catch(() => {
    retries = retries + 1;
    initialize(retries);
  });
};

/***/ }),

/***/ "./src/OnboardingSPA/utils/api/themes.js":
/*!***********************************************!*\
  !*** ./src/OnboardingSPA/utils/api/themes.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getGlobalStyles": () => (/* binding */ getGlobalStyles),
/* harmony export */   "getThemeColors": () => (/* binding */ getThemeColors),
/* harmony export */   "getThemeFonts": () => (/* binding */ getThemeFonts),
/* harmony export */   "getThemeStatus": () => (/* binding */ getThemeStatus),
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "install": () => (/* binding */ install),
/* harmony export */   "setGlobalStyles": () => (/* binding */ setGlobalStyles)
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common */ "./src/OnboardingSPA/utils/api/common.js");
/* harmony import */ var _resolve__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./resolve */ "./src/OnboardingSPA/utils/api/resolve.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../index */ "./src/OnboardingSPA/utils/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../constants */ "./src/constants.js");






const init = () => {
  // Backend should have done the initialization if this param is present.
  if ((0,_index__WEBPACK_IMPORTED_MODULE_3__.getQueryParam)(_constants__WEBPACK_IMPORTED_MODULE_4__.NFD_THEMES_QUERY_PARAM)) {
    return true;
  }

  _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    url: (0,_common__WEBPACK_IMPORTED_MODULE_1__.onboardingRestURL)('themes/initialize'),
    method: 'POST'
  }).catch(error => {
    // eslint-disable-next-line no-console
    console.error(error);
  });
};

const install = async function (theme) {
  let activate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  let queue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  if (typeof theme !== 'string') {
    return false;
  }

  return await (0,_resolve__WEBPACK_IMPORTED_MODULE_2__.resolve)(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    url: (0,_common__WEBPACK_IMPORTED_MODULE_1__.installerRestURL)('themes/install'),
    method: 'POST',
    data: {
      theme,
      activate,
      queue
    }
  }));
};

const getGlobalStyles = async function () {
  let variations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  return await (0,_resolve__WEBPACK_IMPORTED_MODULE_2__.resolve)(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    url: (0,_common__WEBPACK_IMPORTED_MODULE_1__.onboardingRestURL)('themes/variations&variations=' + variations)
  }).then());
};

const setGlobalStyles = async data => {
  return await (0,_resolve__WEBPACK_IMPORTED_MODULE_2__.resolve)(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    url: (0,_common__WEBPACK_IMPORTED_MODULE_1__.onboardingRestURL)('themes/variations'),
    method: 'POST',
    data
  }).then());
};

const getThemeStatus = async theme => {
  return await (0,_resolve__WEBPACK_IMPORTED_MODULE_2__.resolve)(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    url: (0,_common__WEBPACK_IMPORTED_MODULE_1__.onboardingRestURL)('themes/status' + (theme ? `&theme=${theme}` : ''))
  }));
};

const getThemeFonts = async () => {
  return await (0,_resolve__WEBPACK_IMPORTED_MODULE_2__.resolve)(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    url: (0,_common__WEBPACK_IMPORTED_MODULE_1__.onboardingRestURL)('themes/fonts')
  }));
};

const getThemeColors = async () => {
  return await (0,_resolve__WEBPACK_IMPORTED_MODULE_2__.resolve)(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    url: (0,_common__WEBPACK_IMPORTED_MODULE_1__.onboardingRestURL)('themes/colors')
  }));
};



/***/ }),

/***/ "./src/OnboardingSPA/utils/global-styles/typography-utils.js":
/*!*******************************************************************!*\
  !*** ./src/OnboardingSPA/utils/global-styles/typography-utils.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getComputedFluidTypographyValue": () => (/* binding */ getComputedFluidTypographyValue),
/* harmony export */   "getTypographyFontSizeValue": () => (/* binding */ getTypographyFontSizeValue),
/* harmony export */   "getTypographyValueAndUnit": () => (/* binding */ getTypographyValueAndUnit),
/* harmony export */   "roundToPrecision": () => (/* binding */ roundToPrecision)
/* harmony export */ });
/**
 * The fluid utilities must match the backend equivalent.
 * See: gutenberg_get_typography_font_size_value() in lib/block-supports/typography.php
 * ---------------------------------------------------------------
 */

/**
 * Returns a font-size value based on a given font-size preset.
 * Takes into account fluid typography parameters and attempts to return a css formula depending on available, valid values.
 *
 * @param {Object}           preset
 * @param {string}           preset.size              A default font size.
 * @param {string}           preset.name              A font size name, displayed in the UI.
 * @param {string}           preset.slug              A font size slug.
 * @param {Object}           preset.fluid
 * @param {string|undefined} preset.fluid.max         A maximum font size value.
 * @param {string|undefined} preset.fluid.min         A minimum font size value.
 * @param {Object}           typographySettings
 * @param {boolean}          typographySettings.fluid Whether fluid typography is enabled.
 *
 * @return {string} An font-size value
 */
function getTypographyFontSizeValue(preset, typographySettings) {
  const {
    size: defaultSize
  } = preset;

  if (true !== (typographySettings === null || typographySettings === void 0 ? void 0 : typographySettings.fluid)) {
    return defaultSize;
  } // Defaults.


  const DEFAULT_MAXIMUM_VIEWPORT_WIDTH = '1600px';
  const DEFAULT_MINIMUM_VIEWPORT_WIDTH = '768px';
  const DEFAULT_MINIMUM_FONT_SIZE_FACTOR = 0.75;
  const DEFAULT_MAXIMUM_FONT_SIZE_FACTOR = 1.5;
  const DEFAULT_SCALE_FACTOR = 1; // Font sizes.
  // A font size has explicitly bypassed fluid calculations.

  if (false === (preset === null || preset === void 0 ? void 0 : preset.fluid)) {
    return defaultSize;
  }

  const fluidFontSizeSettings = (preset === null || preset === void 0 ? void 0 : preset.fluid) || {}; // Try to grab explicit min and max fluid font sizes.

  let minimumFontSizeRaw = fluidFontSizeSettings === null || fluidFontSizeSettings === void 0 ? void 0 : fluidFontSizeSettings.min;
  let maximumFontSizeRaw = fluidFontSizeSettings === null || fluidFontSizeSettings === void 0 ? void 0 : fluidFontSizeSettings.max;
  const preferredSize = getTypographyValueAndUnit(defaultSize); // Protect against unsupported units.

  if (!(preferredSize !== null && preferredSize !== void 0 && preferredSize.unit)) {
    return defaultSize;
  } // If no fluid min or max font sizes are available, create some using min/max font size factors.


  if (!minimumFontSizeRaw) {
    minimumFontSizeRaw = preferredSize.value * DEFAULT_MINIMUM_FONT_SIZE_FACTOR + preferredSize.unit;
  }

  if (!maximumFontSizeRaw) {
    maximumFontSizeRaw = preferredSize.value * DEFAULT_MAXIMUM_FONT_SIZE_FACTOR + preferredSize.unit;
  }

  const fluidFontSizeValue = getComputedFluidTypographyValue({
    maximumViewPortWidth: DEFAULT_MAXIMUM_VIEWPORT_WIDTH,
    minimumViewPortWidth: DEFAULT_MINIMUM_VIEWPORT_WIDTH,
    maximumFontSize: maximumFontSizeRaw,
    minimumFontSize: minimumFontSizeRaw,
    scaleFactor: DEFAULT_SCALE_FACTOR
  });

  if (!!fluidFontSizeValue) {
    return fluidFontSizeValue;
  }

  return defaultSize;
}
/**
 * Internal implementation of clamp() based on available min/max viewport width, and min/max font sizes.
 *
 * @param {Object} args
 * @param {string} args.maximumViewPortWidth Maximum size up to which type will have fluidity.
 * @param {string} args.minimumViewPortWidth Minimum viewport size from which type will have fluidity.
 * @param {string} args.maximumFontSize      Maximum font size for any clamp() calculation.
 * @param {string} args.minimumFontSize      Minimum font size for any clamp() calculation.
 * @param {number} args.scaleFactor          A scale factor to determine how fast a font scales within boundaries.
 *
 * @return {string|null} A font-size value using clamp().
 */

function getComputedFluidTypographyValue(_ref) {
  let {
    maximumViewPortWidth,
    minimumViewPortWidth,
    maximumFontSize,
    minimumFontSize,
    scaleFactor
  } = _ref;
  // Grab the minimum font size and normalize it in order to use the value for calculations.
  const minimumFontSizeParsed = getTypographyValueAndUnit(minimumFontSize); // We get a 'preferred' unit to keep units consistent when calculating,
  // otherwise the result will not be accurate.

  const fontSizeUnit = (minimumFontSizeParsed === null || minimumFontSizeParsed === void 0 ? void 0 : minimumFontSizeParsed.unit) || 'rem'; // Grab the maximum font size and normalize it in order to use the value for calculations.

  const maximumFontSizeParsed = getTypographyValueAndUnit(maximumFontSize, {
    coerceTo: fontSizeUnit
  }); // Protect against unsupported units.

  if (!minimumFontSizeParsed || !maximumFontSizeParsed) {
    return null;
  } // Use rem for accessible fluid target font scaling.


  const minimumFontSizeRem = getTypographyValueAndUnit(minimumFontSize, {
    coerceTo: 'rem'
  }); // Viewport widths defined for fluid typography. Normalize units

  const maximumViewPortWidthParsed = getTypographyValueAndUnit(maximumViewPortWidth, {
    coerceTo: fontSizeUnit
  });
  const minumumViewPortWidthParsed = getTypographyValueAndUnit(minimumViewPortWidth, {
    coerceTo: fontSizeUnit
  }); // Protect against unsupported units.

  if (!maximumViewPortWidthParsed || !minumumViewPortWidthParsed || !minimumFontSizeRem) {
    return null;
  } // Build CSS rule.
  // Borrowed from https://websemantics.uk/tools/responsive-font-calculator/.


  const minViewPortWidthOffsetValue = roundToPrecision(minumumViewPortWidthParsed.value / 100, 3);
  const viewPortWidthOffset = minViewPortWidthOffsetValue + fontSizeUnit;
  let linearFactor = 100 * ((maximumFontSizeParsed.value - minimumFontSizeParsed.value) / (maximumViewPortWidthParsed.value - minumumViewPortWidthParsed.value));
  linearFactor = roundToPrecision(linearFactor, 3) || 1;
  const linearFactorScaled = linearFactor * scaleFactor;
  const fluidTargetFontSize = `${minimumFontSizeRem.value}${minimumFontSizeRem.unit} + ((1vw - ${viewPortWidthOffset}) * ${linearFactorScaled})`;
  return `clamp(${minimumFontSize}, ${fluidTargetFontSize}, ${maximumFontSize})`;
}
/**
 *
 * @param {string}           rawValue Raw size value from theme.json.
 * @param {Object|undefined} options  Calculation options.
 *
 * @return {{ unit: string, value: number }|null} An object consisting of `'value'` and `'unit'` properties.
 */

function getTypographyValueAndUnit(rawValue) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!rawValue) {
    return null;
  }

  const {
    coerceTo,
    rootSizeValue,
    acceptableUnits
  } = {
    coerceTo: '',
    // Default browser font size. Later we could inject some JS to compute this `getComputedStyle( document.querySelector( "html" ) ).fontSize`.
    rootSizeValue: 16,
    acceptableUnits: ['rem', 'px', 'em'],
    ...options
  };
  const acceptableUnitsGroup = acceptableUnits === null || acceptableUnits === void 0 ? void 0 : acceptableUnits.join('|');
  const regexUnits = new RegExp(`^(\\d*\\.?\\d+)(${acceptableUnitsGroup}){1,1}$`);
  const matches = rawValue.match(regexUnits); // We need a number value and a unit.

  if (!matches || matches.length < 3) {
    return null;
  }

  let [, value, unit] = matches;
  let returnValue = parseFloat(value);

  if ('px' === coerceTo && ('em' === unit || 'rem' === unit)) {
    returnValue = returnValue * rootSizeValue;
    unit = coerceTo;
  }

  if ('px' === unit && ('em' === coerceTo || 'rem' === coerceTo)) {
    returnValue = returnValue / rootSizeValue;
    unit = coerceTo;
  }

  return {
    value: returnValue,
    unit
  };
}
/**
 * Returns a value rounded to defined precision.
 * Returns `undefined` if the value is not a valid finite number.
 *
 * @param {number} value  Raw value.
 * @param {number} digits The number of digits to appear after the decimal point
 *
 * @return {number|undefined} Value rounded to standard precision.
 */

function roundToPrecision(value) {
  let digits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
  return Number.isFinite(value) ? parseFloat(value.toFixed(digits)) : undefined;
}

/***/ }),

/***/ "./src/OnboardingSPA/utils/global-styles/use-global-styles-output.js":
/*!***************************************************************************!*\
  !*** ./src/OnboardingSPA/utils/global-styles/use-global-styles-output.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getBlockSelectors": () => (/* binding */ getBlockSelectors),
/* harmony export */   "getLayoutStyles": () => (/* binding */ getLayoutStyles),
/* harmony export */   "getNodesWithSettings": () => (/* binding */ getNodesWithSettings),
/* harmony export */   "getNodesWithStyles": () => (/* binding */ getNodesWithStyles),
/* harmony export */   "getStylesDeclarations": () => (/* binding */ getStylesDeclarations),
/* harmony export */   "toCustomProperties": () => (/* binding */ toCustomProperties),
/* harmony export */   "toStyles": () => (/* binding */ toStyles),
/* harmony export */   "toSvgFilters": () => (/* binding */ toSvgFilters),
/* harmony export */   "useGlobalStylesOutput": () => (/* binding */ useGlobalStylesOutput)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_style_engine__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/style-engine */ "@wordpress/style-engine");
/* harmony import */ var _wordpress_style_engine__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_style_engine__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils */ "./src/OnboardingSPA/utils/global-styles/utils.js");


/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */




/**
 * Internal dependencies
 */

 // List of block support features that can have their related styles
// generated under their own feature level selector rather than the block's.

const BLOCK_SUPPORT_FEATURE_LEVEL_SELECTORS = {
  __experimentalBorder: 'border',
  color: 'color',
  spacing: 'spacing',
  typography: 'typography'
};

function compileStyleValue(uncompiledValue) {
  var _uncompiledValue$star;

  const VARIABLE_REFERENCE_PREFIX = 'var:';
  const VARIABLE_PATH_SEPARATOR_TOKEN_ATTRIBUTE = '|';
  const VARIABLE_PATH_SEPARATOR_TOKEN_STYLE = '--';

  if (uncompiledValue !== null && uncompiledValue !== void 0 && (_uncompiledValue$star = uncompiledValue.startsWith) !== null && _uncompiledValue$star !== void 0 && _uncompiledValue$star.call(uncompiledValue, VARIABLE_REFERENCE_PREFIX)) {
    const variable = uncompiledValue.slice(VARIABLE_REFERENCE_PREFIX.length).split(VARIABLE_PATH_SEPARATOR_TOKEN_ATTRIBUTE).join(VARIABLE_PATH_SEPARATOR_TOKEN_STYLE);
    return `var(--wp--${variable})`;
  }

  return uncompiledValue;
}
/**
 * Transform given preset tree into a set of style declarations.
 *
 * @param {Object} blockPresets
 * @param {Object} mergedSettings Merged theme.json settings.
 *
 * @return {Array<Object>} An array of style declarations.
 */


function getPresetsDeclarations() {
  let blockPresets = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let mergedSettings = arguments.length > 1 ? arguments[1] : undefined;
  return (0,lodash__WEBPACK_IMPORTED_MODULE_1__.reduce)(_utils__WEBPACK_IMPORTED_MODULE_5__.PRESET_METADATA, (declarations, _ref) => {
    let {
      path,
      valueKey,
      valueFunc,
      cssVarInfix
    } = _ref;
    const presetByOrigin = (0,lodash__WEBPACK_IMPORTED_MODULE_1__.get)(blockPresets, path, []);

    if (presetByOrigin && Array.isArray(presetByOrigin)) {
      presetByOrigin.forEach(value => {
        if (valueKey && !valueFunc) {
          declarations.push(`--wp--preset--${cssVarInfix}--${(0,lodash__WEBPACK_IMPORTED_MODULE_1__.kebabCase)(value.slug)}: ${value[valueKey]}`);
        } else if (valueFunc && typeof valueFunc === 'function') {
          declarations.push(`--wp--preset--${cssVarInfix}--${(0,lodash__WEBPACK_IMPORTED_MODULE_1__.kebabCase)(value.slug)}: ${valueFunc(value, mergedSettings)}`);
        }
      });
    }

    return declarations;
  }, []);
}
/**
 * Transform given preset tree into a set of preset class declarations.
 *
 * @param {string} blockSelector
 * @param {Object} blockPresets
 * @return {string} CSS declarations for the preset classes.
 */


function getPresetsClasses(blockSelector) {
  let blockPresets = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return (0,lodash__WEBPACK_IMPORTED_MODULE_1__.reduce)(_utils__WEBPACK_IMPORTED_MODULE_5__.PRESET_METADATA, (declarations, _ref2) => {
    let {
      path,
      cssVarInfix,
      classes
    } = _ref2;

    if (!classes) {
      return declarations;
    }

    const presetByOrigin = (0,lodash__WEBPACK_IMPORTED_MODULE_1__.get)(blockPresets, path, []);

    if (presetByOrigin && Array.isArray(presetByOrigin)) {
      presetByOrigin.forEach(_ref3 => {
        let {
          slug
        } = _ref3;
        classes.forEach(_ref4 => {
          let {
            classSuffix,
            propertyName
          } = _ref4;
          const classSelectorToUse = `.has-${(0,lodash__WEBPACK_IMPORTED_MODULE_1__.kebabCase)(slug)}-${classSuffix}`;
          const selectorToUse = blockSelector.split(',') // Selector can be "h1, h2, h3"
          .map(selector => `${selector}${classSelectorToUse}`).join(',');
          const value = `var(--wp--preset--${cssVarInfix}--${(0,lodash__WEBPACK_IMPORTED_MODULE_1__.kebabCase)(slug)})`;
          declarations += `${selectorToUse}{${propertyName}: ${value} !important;}`;
        });
      });
    }

    return declarations;
  }, '');
}

function getPresetsSvgFilters() {
  let blockPresets = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _utils__WEBPACK_IMPORTED_MODULE_5__.PRESET_METADATA.filter( // Duotone are the only type of filters for now.
  metadata => metadata.path.at(-1) === 'duotone').flatMap(metadata => {
    const presetByOrigin = (0,lodash__WEBPACK_IMPORTED_MODULE_1__.get)(blockPresets, metadata.path, {});
    return ['default', 'theme'].filter(origin => presetByOrigin[origin]).flatMap(origin => presetByOrigin[origin].map(preset => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.__unstablePresetDuotoneFilter, {
      preset: preset,
      key: preset.slug
    })));
  });
}

function flattenTree() {
  let input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let prefix = arguments.length > 1 ? arguments[1] : undefined;
  let token = arguments.length > 2 ? arguments[2] : undefined;
  let result = [];
  Object.keys(input).forEach(key => {
    const newKey = prefix + (0,lodash__WEBPACK_IMPORTED_MODULE_1__.kebabCase)(key.replace('/', '-'));
    const newLeaf = input[key];

    if (newLeaf instanceof Object) {
      const newPrefix = newKey + token;
      result = [...result, ...flattenTree(newLeaf, newPrefix, token)];
    } else {
      result.push(`${newKey}: ${newLeaf}`);
    }
  });
  return result;
}
/**
 * Transform given style tree into a set of style declarations.
 *
 * @param {Object}  blockStyles         Block styles.
 *
 * @param {string}  selector            The selector these declarations should attach to.
 *
 * @param {boolean} useRootPaddingAlign Whether to use CSS custom properties in root selector.
 *
 * @param {Object}  tree                A theme.json tree containing layout definitions.
 *
 * @return {Array} An array of style declarations.
 */


function getStylesDeclarations() {
  let blockStyles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  let useRootPaddingAlign = arguments.length > 2 ? arguments[2] : undefined;
  let tree = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  const isRoot = _utils__WEBPACK_IMPORTED_MODULE_5__.ROOT_BLOCK_SELECTOR === selector;
  const output = (0,lodash__WEBPACK_IMPORTED_MODULE_1__.reduce)(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__.__EXPERIMENTAL_STYLE_PROPERTY, (declarations, _ref5, key) => {
    let {
      value,
      properties,
      useEngine,
      rootOnly
    } = _ref5;

    if (rootOnly && !isRoot) {
      return declarations;
    }

    const pathToValue = value;

    if (pathToValue[0] === 'elements') {
      return declarations;
    }

    const styleValue = (0,lodash__WEBPACK_IMPORTED_MODULE_1__.get)(blockStyles, pathToValue); // Root-level padding styles don't currently support strings with CSS shorthand values.
    // This may change: https://github.com/WordPress/gutenberg/issues/40132.

    if (key === '--wp--style--root--padding' && (typeof styleValue === 'string' || !useRootPaddingAlign)) {
      return declarations;
    }

    if (!!properties && typeof styleValue !== 'string') {
      Object.entries(properties).forEach(entry => {
        const [name, prop] = entry;

        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_1__.get)(styleValue, [prop], false)) {
          // Do not create a declaration
          // for sub-properties that don't have any value.
          return;
        }

        const cssProperty = name.startsWith('--') ? name : (0,lodash__WEBPACK_IMPORTED_MODULE_1__.kebabCase)(name);
        declarations.push(`${cssProperty}: ${compileStyleValue((0,lodash__WEBPACK_IMPORTED_MODULE_1__.get)(styleValue, [prop]))}`);
      });
    } else if ((0,lodash__WEBPACK_IMPORTED_MODULE_1__.get)(blockStyles, pathToValue, false)) {
      const cssProperty = key.startsWith('--') ? key : (0,lodash__WEBPACK_IMPORTED_MODULE_1__.kebabCase)(key);
      declarations.push(`${cssProperty}: ${compileStyleValue((0,lodash__WEBPACK_IMPORTED_MODULE_1__.get)(blockStyles, pathToValue))}`);
    }

    return declarations;
  }, []); // The goal is to move everything to server side generated engine styles
  // This is temporary as we absorb more and more styles into the engine.

  const extraRules = (0,_wordpress_style_engine__WEBPACK_IMPORTED_MODULE_3__.getCSSRules)(blockStyles);
  extraRules.forEach(rule => {
    var _ruleValue;

    // Don't output padding properties if padding variables are set.
    if (isRoot && useRootPaddingAlign && rule.key.startsWith('padding')) {
      return;
    }

    const cssProperty = rule.key.startsWith('--') ? rule.key : (0,lodash__WEBPACK_IMPORTED_MODULE_1__.kebabCase)(rule.key);
    let ruleValue = rule.value;

    if (typeof ruleValue !== 'string' && (_ruleValue = ruleValue) !== null && _ruleValue !== void 0 && _ruleValue.ref) {
      var _ruleValue2;

      const refPath = ruleValue.ref.split('.');
      ruleValue = (0,lodash__WEBPACK_IMPORTED_MODULE_1__.get)(tree, refPath); // Presence of another ref indicates a reference to another dynamic value.
      // Pointing to another dynamic value is not supported.

      if (!ruleValue || !!((_ruleValue2 = ruleValue) !== null && _ruleValue2 !== void 0 && _ruleValue2.ref)) {
        return;
      }
    }

    output.push(`${cssProperty}: ${ruleValue}`);
  });
  return output;
}
/**
 * Get generated CSS for layout styles by looking up layout definitions provided
 * in theme.json, and outputting common layout styles, and specific blockGap values.
 *
 * @param {Object}  props
 * @param {Object}  props.tree                  A theme.json tree containing layout definitions.
 * @param {Object}  props.style                 A style object containing spacing values.
 * @param {string}  props.selector              Selector used to group together layout styling rules.
 * @param {boolean} props.hasBlockGapSupport    Whether or not the theme opts-in to blockGap support.
 * @param {boolean} props.hasFallbackGapSupport Whether or not the theme allows fallback gap styles.
 * @param {?string} props.fallbackGapValue      An optional fallback gap value if no real gap value is available.
 * @return {string} Generated CSS rules for the layout styles.
 */

function getLayoutStyles(_ref6) {
  var _style$spacing, _tree$settings, _tree$settings$layout, _tree$settings2, _tree$settings2$layou;

  let {
    tree,
    style,
    selector,
    hasBlockGapSupport,
    hasFallbackGapSupport,
    fallbackGapValue
  } = _ref6;
  let ruleset = '';
  let gapValue = hasBlockGapSupport ? (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.__experimentalGetGapCSSValue)(style === null || style === void 0 ? void 0 : (_style$spacing = style.spacing) === null || _style$spacing === void 0 ? void 0 : _style$spacing.blockGap) : ''; // Ensure a fallback gap value for the root layout definitions,
  // and use a fallback value if one is provided for the current block.

  if (hasFallbackGapSupport) {
    if (selector === _utils__WEBPACK_IMPORTED_MODULE_5__.ROOT_BLOCK_SELECTOR) {
      gapValue = !gapValue ? '0.5em' : gapValue;
    } else if (!hasBlockGapSupport && fallbackGapValue) {
      gapValue = fallbackGapValue;
    }
  }

  if (gapValue && tree !== null && tree !== void 0 && (_tree$settings = tree.settings) !== null && _tree$settings !== void 0 && (_tree$settings$layout = _tree$settings.layout) !== null && _tree$settings$layout !== void 0 && _tree$settings$layout.definitions) {
    Object.values(tree.settings.layout.definitions).forEach(_ref7 => {
      let {
        className,
        name,
        spacingStyles
      } = _ref7;

      // Allow outputting fallback gap styles for flex layout type when block gap support isn't available.
      if (!hasBlockGapSupport && 'flex' !== name) {
        return;
      }

      if (spacingStyles !== null && spacingStyles !== void 0 && spacingStyles.length) {
        spacingStyles.forEach(spacingStyle => {
          const declarations = [];

          if (spacingStyle.rules) {
            Object.entries(spacingStyle.rules).forEach(_ref8 => {
              let [cssProperty, cssValue] = _ref8;
              declarations.push(`${cssProperty}: ${cssValue ? cssValue : gapValue}`);
            });
          }

          if (declarations.length) {
            let combinedSelector = '';

            if (!hasBlockGapSupport) {
              // For fallback gap styles, use lower specificity, to ensure styles do not unintentionally override theme styles.
              combinedSelector = selector === _utils__WEBPACK_IMPORTED_MODULE_5__.ROOT_BLOCK_SELECTOR ? `:where(.${className}${(spacingStyle === null || spacingStyle === void 0 ? void 0 : spacingStyle.selector) || ''})` : `:where(${selector}.${className}${(spacingStyle === null || spacingStyle === void 0 ? void 0 : spacingStyle.selector) || ''})`;
            } else {
              combinedSelector = selector === _utils__WEBPACK_IMPORTED_MODULE_5__.ROOT_BLOCK_SELECTOR ? `${selector} .${className}${(spacingStyle === null || spacingStyle === void 0 ? void 0 : spacingStyle.selector) || ''}` : `${selector}.${className}${(spacingStyle === null || spacingStyle === void 0 ? void 0 : spacingStyle.selector) || ''}`;
            }

            ruleset += `${combinedSelector} { ${declarations.join('; ')}; }`;
          }
        });
      }
    }); // For backwards compatibility, ensure the legacy block gap CSS variable is still available.

    if (selector === _utils__WEBPACK_IMPORTED_MODULE_5__.ROOT_BLOCK_SELECTOR && hasBlockGapSupport) {
      ruleset += `${selector} { --wp--style--block-gap: ${gapValue}; }`;
    }
  } // Output base styles


  if (selector === _utils__WEBPACK_IMPORTED_MODULE_5__.ROOT_BLOCK_SELECTOR && tree !== null && tree !== void 0 && (_tree$settings2 = tree.settings) !== null && _tree$settings2 !== void 0 && (_tree$settings2$layou = _tree$settings2.layout) !== null && _tree$settings2$layou !== void 0 && _tree$settings2$layou.definitions) {
    const validDisplayModes = ['block', 'flex', 'grid'];
    Object.values(tree.settings.layout.definitions).forEach(_ref9 => {
      let {
        className,
        displayMode,
        baseStyles
      } = _ref9;

      if (displayMode && validDisplayModes.includes(displayMode)) {
        ruleset += `${selector} .${className} { display:${displayMode}; }`;
      }

      if (baseStyles !== null && baseStyles !== void 0 && baseStyles.length) {
        baseStyles.forEach(baseStyle => {
          const declarations = [];

          if (baseStyle.rules) {
            Object.entries(baseStyle.rules).forEach(_ref10 => {
              let [cssProperty, cssValue] = _ref10;
              declarations.push(`${cssProperty}: ${cssValue}`);
            });
          }

          if (declarations.length) {
            const combinedSelector = `${selector} .${className}${(baseStyle === null || baseStyle === void 0 ? void 0 : baseStyle.selector) || ''}`;
            ruleset += `${combinedSelector} { ${declarations.join('; ')}; }`;
          }
        });
      }
    });
  }

  return ruleset;
}
const getNodesWithStyles = (tree, blockSelectors) => {
  var _tree$styles$blocks, _tree$styles4;

  const nodes = [];

  if (!(tree !== null && tree !== void 0 && tree.styles)) {
    return nodes;
  }

  const pickStyleKeys = treeToPickFrom => (0,lodash__WEBPACK_IMPORTED_MODULE_1__.pickBy)(treeToPickFrom, (value, key) => ['border', 'color', 'spacing', 'typography', 'filter'].includes(key)); // Top-level.


  const styles = pickStyleKeys(tree.styles);

  if (!!styles) {
    nodes.push({
      styles,
      selector: _utils__WEBPACK_IMPORTED_MODULE_5__.ROOT_BLOCK_SELECTOR
    });
  }

  Object.entries(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__.__EXPERIMENTAL_ELEMENTS).forEach(_ref11 => {
    var _tree$styles, _tree$styles2;

    let [name, selector] = _ref11;

    if ((_tree$styles = tree.styles) !== null && _tree$styles !== void 0 && _tree$styles.elements && !!((_tree$styles2 = tree.styles) !== null && _tree$styles2 !== void 0 && _tree$styles2.elements[name])) {
      var _tree$styles3;

      nodes.push({
        styles: (_tree$styles3 = tree.styles) === null || _tree$styles3 === void 0 ? void 0 : _tree$styles3.elements[name],
        selector
      });
    }
  }); // Iterate over blocks: they can have styles & elements.

  Object.entries((_tree$styles$blocks = (_tree$styles4 = tree.styles) === null || _tree$styles4 === void 0 ? void 0 : _tree$styles4.blocks) !== null && _tree$styles$blocks !== void 0 ? _tree$styles$blocks : {}).forEach(_ref12 => {
    var _blockSelectors$block, _node$elements;

    let [blockName, node] = _ref12;
    const blockStyles = pickStyleKeys(node);

    if (!!blockStyles && !!(blockSelectors !== null && blockSelectors !== void 0 && (_blockSelectors$block = blockSelectors[blockName]) !== null && _blockSelectors$block !== void 0 && _blockSelectors$block.selector)) {
      nodes.push({
        duotoneSelector: blockSelectors[blockName].duotoneSelector,
        fallbackGapValue: blockSelectors[blockName].fallbackGapValue,
        hasLayoutSupport: blockSelectors[blockName].hasLayoutSupport,
        selector: blockSelectors[blockName].selector,
        styles: blockStyles,
        featureSelectors: blockSelectors[blockName].featureSelectors
      });
    }

    Object.entries((_node$elements = node === null || node === void 0 ? void 0 : node.elements) !== null && _node$elements !== void 0 ? _node$elements : {}).forEach(_ref13 => {
      let [elementName, value] = _ref13;

      if (!!value && !!(blockSelectors !== null && blockSelectors !== void 0 && blockSelectors[blockName]) && !!(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__.__EXPERIMENTAL_ELEMENTS !== null && _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__.__EXPERIMENTAL_ELEMENTS !== void 0 && _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__.__EXPERIMENTAL_ELEMENTS[elementName])) {
        nodes.push({
          styles: value,
          selector: blockSelectors[blockName].selector.split(',').map(sel => {
            const elementSelectors = _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__.__EXPERIMENTAL_ELEMENTS[elementName].split(',');
            return elementSelectors.map(elementSelector => sel + ' ' + elementSelector);
          }).join(',')
        });
      }
    });
  });
  return nodes;
};
const getNodesWithSettings = (tree, blockSelectors) => {
  var _tree$settings3, _tree$settings$blocks, _tree$settings4;

  const nodes = [];

  if (!(tree !== null && tree !== void 0 && tree.settings)) {
    return nodes;
  }

  const pickPresets = treeToPickFrom => {
    const presets = {};
    _utils__WEBPACK_IMPORTED_MODULE_5__.PRESET_METADATA.forEach(_ref14 => {
      let {
        path
      } = _ref14;
      const value = (0,lodash__WEBPACK_IMPORTED_MODULE_1__.get)(treeToPickFrom, path, false);

      if (value !== false) {
        (0,lodash__WEBPACK_IMPORTED_MODULE_1__.set)(presets, path, value);
      }
    });
    return presets;
  }; // Top-level.


  const presets = pickPresets(tree.settings);
  const custom = (_tree$settings3 = tree.settings) === null || _tree$settings3 === void 0 ? void 0 : _tree$settings3.custom;

  if (!(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(presets) || !!custom) {
    nodes.push({
      presets,
      custom,
      selector: _utils__WEBPACK_IMPORTED_MODULE_5__.ROOT_BLOCK_SELECTOR
    });
  } // Blocks.


  Object.entries((_tree$settings$blocks = (_tree$settings4 = tree.settings) === null || _tree$settings4 === void 0 ? void 0 : _tree$settings4.blocks) !== null && _tree$settings$blocks !== void 0 ? _tree$settings$blocks : {}).forEach(_ref15 => {
    let [blockName, node] = _ref15;
    const blockPresets = pickPresets(node);
    const blockCustom = node.custom;

    if (!(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(blockPresets) || !!blockCustom) {
      nodes.push({
        presets: blockPresets,
        custom: blockCustom,
        selector: blockSelectors[blockName].selector
      });
    }
  });
  return nodes;
};
const toCustomProperties = (tree, blockSelectors) => {
  const settings = getNodesWithSettings(tree, blockSelectors);
  let ruleset = '';
  settings.forEach(_ref16 => {
    let {
      presets,
      custom,
      selector
    } = _ref16;
    const declarations = getPresetsDeclarations(presets, tree === null || tree === void 0 ? void 0 : tree.settings);
    const customProps = flattenTree(custom, '--wp--custom--', '--');

    if (customProps.length > 0) {
      declarations.push(...customProps);
    }

    if (declarations.length > 0) {
      ruleset = ruleset + `${selector}{${declarations.join(';')};}`;
    }
  });
  return ruleset;
};
const toStyles = function (tree, blockSelectors, hasBlockGapSupport, hasFallbackGapSupport) {
  var _tree$settings5, _tree$settings6;

  let disableLayoutStyles = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  const nodesWithStyles = getNodesWithStyles(tree, blockSelectors);
  const nodesWithSettings = getNodesWithSettings(tree, blockSelectors);
  const useRootPaddingAlign = tree === null || tree === void 0 ? void 0 : (_tree$settings5 = tree.settings) === null || _tree$settings5 === void 0 ? void 0 : _tree$settings5.useRootPaddingAwareAlignments;
  const {
    contentSize,
    wideSize
  } = (tree === null || tree === void 0 ? void 0 : (_tree$settings6 = tree.settings) === null || _tree$settings6 === void 0 ? void 0 : _tree$settings6.layout) || {};
  /*
   * Reset default browser margin on the root body element.
   * This is set on the root selector **before** generating the ruleset
   * from the `theme.json`. This is to ensure that if the `theme.json` declares
   * `margin` in its `spacing` declaration for the `body` element then these
   * user-generated values take precedence in the CSS cascade.
   * @link https://github.com/WordPress/gutenberg/issues/36147.
   */

  let ruleset = 'body {margin: 0;';

  if (contentSize) {
    ruleset += ` --wp--style--global--content-size: ${contentSize};`;
  }

  if (wideSize) {
    ruleset += ` --wp--style--global--wide-size: ${wideSize};`;
  }

  if (useRootPaddingAlign) {
    ruleset += `padding-right: 0; padding-left: 0; padding-top: var(--wp--style--root--padding-top); padding-bottom: var(--wp--style--root--padding-bottom) } 
			 .has-global-padding { padding-right: var(--wp--style--root--padding-right); padding-left: var(--wp--style--root--padding-left); } 
			 .has-global-padding :where(.has-global-padding) { padding-right: 0; padding-left: 0; } 
			 .has-global-padding > .alignfull { margin-right: calc(var(--wp--style--root--padding-right) * -1); margin-left: calc(var(--wp--style--root--padding-left) * -1); } 
			 .has-global-padding :where(.has-global-padding) > .alignfull { margin-right: 0; margin-left: 0; } 
			 .has-global-padding > .alignfull:where(:not(.has-global-padding)) > :where([class*="wp-block-"]:not(.alignfull):not([class*="__"]),p,h1,h2,h3,h4,h5,h6,ul,ol) { padding-right: var(--wp--style--root--padding-right); padding-left: var(--wp--style--root--padding-left); } 
			 .has-global-padding :where(.has-global-padding) > .alignfull:where(:not(.has-global-padding)) > :where([class*="wp-block-"]:not(.alignfull):not([class*="__"]),p,h1,h2,h3,h4,h5,h6,ul,ol) { padding-right: 0; padding-left: 0;`;
  }

  ruleset += '}';
  nodesWithStyles.forEach(_ref17 => {
    let {
      selector,
      duotoneSelector,
      styles,
      fallbackGapValue,
      hasLayoutSupport,
      featureSelectors
    } = _ref17;

    // Process styles for block support features with custom feature level
    // CSS selectors set.
    if (featureSelectors) {
      Object.entries(featureSelectors).forEach(_ref18 => {
        let [featureName, featureSelector] = _ref18;

        if (styles !== null && styles !== void 0 && styles[featureName]) {
          const featureStyles = {
            [featureName]: styles[featureName]
          };
          const featureDeclarations = getStylesDeclarations(featureStyles);
          delete styles[featureName];

          if (!!featureDeclarations.length) {
            ruleset = ruleset + `${featureSelector}{${featureDeclarations.join(';')} }`;
          }
        }
      });
    }

    const duotoneStyles = {};

    if (styles !== null && styles !== void 0 && styles.filter) {
      duotoneStyles.filter = styles.filter;
      delete styles.filter;
    } // Process duotone styles (they use color.__experimentalDuotone selector).


    if (duotoneSelector) {
      const duotoneDeclarations = getStylesDeclarations(duotoneStyles);

      if (duotoneDeclarations.length > 0) {
        ruleset = ruleset + `${duotoneSelector}{${duotoneDeclarations.join(';')};}`;
      }
    } // Process blockGap and layout styles.


    if (!disableLayoutStyles && (_utils__WEBPACK_IMPORTED_MODULE_5__.ROOT_BLOCK_SELECTOR === selector || hasLayoutSupport)) {
      ruleset += getLayoutStyles({
        tree,
        style: styles,
        selector,
        hasBlockGapSupport,
        hasFallbackGapSupport,
        fallbackGapValue
      });
    } // Process the remaining block styles (they use either normal block class or __experimentalSelector).


    const declarations = getStylesDeclarations(styles, selector, useRootPaddingAlign, tree);

    if (declarations !== null && declarations !== void 0 && declarations.length) {
      ruleset = ruleset + `${selector}{${declarations.join(';')};}`;
    } // Check for pseudo selector in `styles` and handle separately.


    const pseudoSelectorStyles = Object.entries(styles).filter(_ref19 => {
      let [key] = _ref19;
      return key.startsWith(':');
    });

    if (pseudoSelectorStyles !== null && pseudoSelectorStyles !== void 0 && pseudoSelectorStyles.length) {
      pseudoSelectorStyles.forEach(_ref20 => {
        let [pseudoKey, pseudoStyle] = _ref20;
        const pseudoDeclarations = getStylesDeclarations(pseudoStyle);

        if (!(pseudoDeclarations !== null && pseudoDeclarations !== void 0 && pseudoDeclarations.length)) {
          return;
        } // `selector` maybe provided in a form
        // where block level selectors have sub element
        // selectors appended to them as a comma separated
        // string.
        // e.g. `h1 a,h2 a,h3 a,h4 a,h5 a,h6 a`;
        // Split and append pseudo selector to create
        // the proper rules to target the elements.


        const _selector = selector.split(',').map(sel => sel + pseudoKey).join(',');

        const pseudoRule = `${_selector}{${pseudoDeclarations.join(';')};}`;
        ruleset = ruleset + pseudoRule;
      });
    }
  });
  /* Add alignment / layout styles */

  ruleset = ruleset + '.wp-site-blocks > .alignleft { float: left; margin-right: 2em; }';
  ruleset = ruleset + '.wp-site-blocks > .alignright { float: right; margin-left: 2em; }';
  ruleset = ruleset + '.wp-site-blocks > .aligncenter { justify-content: center; margin-left: auto; margin-right: auto; }';

  if (!disableLayoutStyles && hasBlockGapSupport) {
    var _tree$styles5, _tree$styles5$spacing;

    // Use fallback of `0.5em` just in case, however if there is blockGap support, there should nearly always be a real value.
    const gapValue = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.__experimentalGetGapCSSValue)(tree === null || tree === void 0 ? void 0 : (_tree$styles5 = tree.styles) === null || _tree$styles5 === void 0 ? void 0 : (_tree$styles5$spacing = _tree$styles5.spacing) === null || _tree$styles5$spacing === void 0 ? void 0 : _tree$styles5$spacing.blockGap) || '0.5em';
    ruleset = ruleset + '.wp-site-blocks > * { margin-block-start: 0; margin-block-end: 0; }';
    ruleset = ruleset + `.wp-site-blocks > * + * { margin-block-start: ${gapValue}; }`;
  }

  nodesWithSettings.forEach(_ref21 => {
    let {
      selector,
      presets
    } = _ref21;

    if (_utils__WEBPACK_IMPORTED_MODULE_5__.ROOT_BLOCK_SELECTOR === selector) {
      // Do not add extra specificity for top-level classes.
      selector = '';
    }

    const classes = getPresetsClasses(selector, presets);

    if (!(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(classes)) {
      ruleset = ruleset + classes;
    }
  });
  return ruleset;
};
function toSvgFilters(tree, blockSelectors) {
  const nodesWithSettings = getNodesWithSettings(tree, blockSelectors);
  return nodesWithSettings.flatMap(_ref22 => {
    let {
      presets
    } = _ref22;
    return getPresetsSvgFilters(presets);
  });
}
const getBlockSelectors = blockTypes => {
  const result = {};
  blockTypes.forEach(blockType => {
    var _blockType$supports$_, _blockType$supports, _blockType$supports$c, _blockType$supports2, _blockType$supports2$, _blockType$supports3, _blockType$supports4, _blockType$supports4$, _blockType$supports4$2;

    const name = blockType.name;
    const selector = (_blockType$supports$_ = blockType === null || blockType === void 0 ? void 0 : (_blockType$supports = blockType.supports) === null || _blockType$supports === void 0 ? void 0 : _blockType$supports.__experimentalSelector) !== null && _blockType$supports$_ !== void 0 ? _blockType$supports$_ : '.wp-block-' + name.replace('core/', '').replace('/', '-');
    const duotoneSelector = (_blockType$supports$c = blockType === null || blockType === void 0 ? void 0 : (_blockType$supports2 = blockType.supports) === null || _blockType$supports2 === void 0 ? void 0 : (_blockType$supports2$ = _blockType$supports2.color) === null || _blockType$supports2$ === void 0 ? void 0 : _blockType$supports2$.__experimentalDuotone) !== null && _blockType$supports$c !== void 0 ? _blockType$supports$c : null;
    const hasLayoutSupport = !!(blockType !== null && blockType !== void 0 && (_blockType$supports3 = blockType.supports) !== null && _blockType$supports3 !== void 0 && _blockType$supports3.__experimentalLayout);
    const fallbackGapValue = blockType === null || blockType === void 0 ? void 0 : (_blockType$supports4 = blockType.supports) === null || _blockType$supports4 === void 0 ? void 0 : (_blockType$supports4$ = _blockType$supports4.spacing) === null || _blockType$supports4$ === void 0 ? void 0 : (_blockType$supports4$2 = _blockType$supports4$.blockGap) === null || _blockType$supports4$2 === void 0 ? void 0 : _blockType$supports4$2.__experimentalDefault; // For each block support feature add any custom selectors.

    const featureSelectors = {};
    Object.entries(BLOCK_SUPPORT_FEATURE_LEVEL_SELECTORS).forEach(_ref23 => {
      var _blockType$supports5, _blockType$supports5$;

      let [featureKey, featureName] = _ref23;
      const featureSelector = blockType === null || blockType === void 0 ? void 0 : (_blockType$supports5 = blockType.supports) === null || _blockType$supports5 === void 0 ? void 0 : (_blockType$supports5$ = _blockType$supports5[featureKey]) === null || _blockType$supports5$ === void 0 ? void 0 : _blockType$supports5$.__experimentalSelector;

      if (featureSelector) {
        featureSelectors[featureName] = (0,_utils__WEBPACK_IMPORTED_MODULE_5__.scopeSelector)(selector, featureSelector);
      }
    });
    result[name] = {
      duotoneSelector,
      fallbackGapValue,
      featureSelectors: Object.keys(featureSelectors).length ? featureSelectors : undefined,
      hasLayoutSupport,
      name,
      selector
    };
  });
  return result;
};
function useGlobalStylesOutput(previewSettings, storedPreviewSettings) {
  var _storedPreviewSetting;

  const hasBlockGapSupport = storedPreviewSettings.settings.__experimentalFeatures.spacing.blockGap;
  const hasFallbackGapSupport = !hasBlockGapSupport;
  const disableLayoutStyles = (_storedPreviewSetting = storedPreviewSettings.settings) !== null && _storedPreviewSetting !== void 0 && _storedPreviewSetting.disableLayoutStyles ? storedPreviewSettings.settings.disableLayoutStyles : true;

  if (!(previewSettings !== null && previewSettings !== void 0 && previewSettings.styles) && !(previewSettings !== null && previewSettings !== void 0 && previewSettings.settings) && !(previewSettings !== null && previewSettings !== void 0 && previewSettings.globalStyles)) {
    return;
  }

  const requiredSettings = {
    settings: previewSettings.settings,
    styles: previewSettings !== null && previewSettings !== void 0 && previewSettings.globalStyles ? previewSettings.globalStyles : previewSettings.styles
  };
  const blockSelectors = getBlockSelectors((0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__.getBlockTypes)());
  const customProperties = toCustomProperties(requiredSettings, blockSelectors);
  const globalStyles = toStyles(requiredSettings, blockSelectors, hasBlockGapSupport, hasFallbackGapSupport, disableLayoutStyles);
  const result = storedPreviewSettings.settings.styles.filter(style => {
    if (!(style.hasOwnProperty('id') && (style.id === 'customProperty' || style.id === 'globalStyle'))) return style;
  });
  const stylesheets = [...result, {
    id: 'customProperty',
    css: customProperties,
    isGlobalStyles: true
  }, {
    id: 'globalStyle',
    css: globalStyles,
    isGlobalStyles: true
  }];
  previewSettings.settings.styles = stylesheets;
  previewSettings.settings.__unstableResolvedAssets = storedPreviewSettings.settings.__unstableResolvedAssets;
  previewSettings.settings.__experimentalFeatures = storedPreviewSettings.settings.__experimentalFeatures;
  return previewSettings;
}

/***/ }),

/***/ "./src/OnboardingSPA/utils/global-styles/utils.js":
/*!********************************************************!*\
  !*** ./src/OnboardingSPA/utils/global-styles/utils.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PRESET_METADATA": () => (/* binding */ PRESET_METADATA),
/* harmony export */   "ROOT_BLOCK_NAME": () => (/* binding */ ROOT_BLOCK_NAME),
/* harmony export */   "ROOT_BLOCK_SELECTOR": () => (/* binding */ ROOT_BLOCK_SELECTOR),
/* harmony export */   "ROOT_BLOCK_SUPPORTS": () => (/* binding */ ROOT_BLOCK_SUPPORTS),
/* harmony export */   "getPresetVariableFromValue": () => (/* binding */ getPresetVariableFromValue),
/* harmony export */   "getValueFromVariable": () => (/* binding */ getValueFromVariable),
/* harmony export */   "scopeSelector": () => (/* binding */ scopeSelector)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _typography_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./typography-utils */ "./src/OnboardingSPA/utils/global-styles/typography-utils.js");
/**
 * External dependencies
 */

/**
 * Internal dependencies
 */


/* Supporting data. */

const ROOT_BLOCK_NAME = 'root';
const ROOT_BLOCK_SELECTOR = 'body';
const ROOT_BLOCK_SUPPORTS = ['background', 'backgroundColor', 'color', 'linkColor', 'buttonColor', 'fontFamily', 'fontSize', 'fontStyle', 'fontWeight', 'lineHeight', 'textDecoration', 'textTransform', 'padding'];
const PRESET_METADATA = [{
  path: ['color', 'palette'],
  valueKey: 'color',
  cssVarInfix: 'color',
  classes: [{
    classSuffix: 'color',
    propertyName: 'color'
  }, {
    classSuffix: 'background-color',
    propertyName: 'background-color'
  }, {
    classSuffix: 'border-color',
    propertyName: 'border-color'
  }]
}, {
  path: ['color', 'gradients'],
  valueKey: 'gradient',
  cssVarInfix: 'gradient',
  classes: [{
    classSuffix: 'gradient-background',
    propertyName: 'background'
  }]
}, {
  path: ['color', 'duotone'],
  cssVarInfix: 'duotone',
  valueFunc: _ref => {
    let {
      slug
    } = _ref;
    return `url( '#wp-duotone-${slug}' )`;
  },
  classes: []
}, {
  path: ['typography', 'fontSizes'],
  valueFunc: (preset, _ref2) => {
    let {
      typography: typographySettings
    } = _ref2;
    return (0,_typography_utils__WEBPACK_IMPORTED_MODULE_1__.getTypographyFontSizeValue)(preset, typographySettings);
  },
  valueKey: 'size',
  cssVarInfix: 'font-size',
  classes: [{
    classSuffix: 'font-size',
    propertyName: 'font-size'
  }]
}, {
  path: ['typography', 'fontFamilies'],
  valueKey: 'fontFamily',
  cssVarInfix: 'font-family',
  classes: [{
    classSuffix: 'font-family',
    propertyName: 'font-family'
  }]
}, {
  path: ['spacing', 'spacingSizes'],
  valueKey: 'size',
  cssVarInfix: 'spacing',
  valueFunc: _ref3 => {
    let {
      size
    } = _ref3;
    return size;
  },
  classes: []
}];
const STYLE_PATH_TO_CSS_VAR_INFIX = {
  'color.background': 'color',
  'color.text': 'color',
  'elements.link.color.text': 'color',
  'elements.button.color.text': 'color',
  'elements.button.backgroundColor': 'background-color',
  'elements.heading.color': 'color',
  'elements.heading.backgroundColor': 'background-color',
  'elements.heading.gradient': 'gradient',
  'color.gradient': 'gradient',
  'typography.fontSize': 'font-size',
  'typography.fontFamily': 'font-family'
};

function findInPresetsBy(features, blockName, presetPath, presetProperty, presetValueValue) {
  // Block presets take priority above root level presets.
  const orderedPresetsByOrigin = [(0,lodash__WEBPACK_IMPORTED_MODULE_0__.get)(features, ['blocks', blockName, ...presetPath]), (0,lodash__WEBPACK_IMPORTED_MODULE_0__.get)(features, presetPath)];

  for (const presetByOrigin of orderedPresetsByOrigin) {
    if (presetByOrigin) {
      // Preset origins ordered by priority.
      const origins = ['custom', 'theme', 'default'];

      for (const origin of origins) {
        const presets = presetByOrigin[origin];

        if (presets) {
          const presetObject = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.find)(presets, preset => preset[presetProperty] === presetValueValue);

          if (presetObject) {
            if (presetProperty === 'slug') {
              return presetObject;
            } // If there is a highest priority preset with the same slug but different value the preset we found was overwritten and should be ignored.


            const highestPresetObjectWithSameSlug = findInPresetsBy(features, blockName, presetPath, 'slug', presetObject.slug);

            if (highestPresetObjectWithSameSlug[presetProperty] === presetObject[presetProperty]) {
              return presetObject;
            }

            return undefined;
          }
        }
      }
    }
  }
}

function getPresetVariableFromValue(features, blockName, variableStylePath, presetPropertyValue) {
  if (!presetPropertyValue) {
    return presetPropertyValue;
  }

  const cssVarInfix = STYLE_PATH_TO_CSS_VAR_INFIX[variableStylePath];
  const metadata = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.find)(PRESET_METADATA, ['cssVarInfix', cssVarInfix]);

  if (!metadata) {
    // The property doesn't have preset data
    // so the value should be returned as it is.
    return presetPropertyValue;
  }

  const {
    valueKey,
    path
  } = metadata;
  const presetObject = findInPresetsBy(features, blockName, path, valueKey, presetPropertyValue);

  if (!presetObject) {
    // Value wasn't found in the presets,
    // so it must be a custom value.
    return presetPropertyValue;
  }

  return `var:preset|${cssVarInfix}|${presetObject.slug}`;
}

function getValueFromPresetVariable(features, blockName, variable, _ref4) {
  let [presetType, slug] = _ref4;
  const metadata = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.find)(PRESET_METADATA, ['cssVarInfix', presetType]);

  if (!metadata) {
    return variable;
  }

  const presetObject = findInPresetsBy(features.settings, blockName, metadata.path, 'slug', slug);

  if (presetObject) {
    const {
      valueKey
    } = metadata;
    const result = presetObject[valueKey];
    return getValueFromVariable(features, blockName, result);
  }

  return variable;
}

function getValueFromCustomVariable(features, blockName, variable, path) {
  var _get;

  const result = (_get = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.get)(features.settings, ['blocks', blockName, 'custom', ...path])) !== null && _get !== void 0 ? _get : (0,lodash__WEBPACK_IMPORTED_MODULE_0__.get)(features.settings, ['custom', ...path]);

  if (!result) {
    return variable;
  } // A variable may reference another variable so we need recursion until we find the value.


  return getValueFromVariable(features, blockName, result);
}
/**
 * Attempts to fetch the value of a theme.json CSS variable.
 *
 * @param {Object}   features  GlobalStylesContext config, e.g., user, base or merged. Represents the theme.json tree.
 * @param {string}   blockName The name of a block as represented in the styles property. E.g., 'root' for root-level, and 'core/${blockName}' for blocks.
 * @param {string|*} variable  An incoming style value. A CSS var value is expected, but it could be any value.
 * @return {string|*|{ref}} The value of the CSS var, if found. If not found, the passed variable argument.
 */


function getValueFromVariable(features, blockName, variable) {
  if (!variable || typeof variable !== 'string') {
    var _variable, _variable2;

    if ((_variable = variable) !== null && _variable !== void 0 && _variable.ref && typeof ((_variable2 = variable) === null || _variable2 === void 0 ? void 0 : _variable2.ref) === 'string') {
      var _variable3;

      const refPath = variable.ref.split('.');
      variable = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.get)(features, refPath); // Presence of another ref indicates a reference to another dynamic value.
      // Pointing to another dynamic value is not supported.

      if (!variable || !!((_variable3 = variable) !== null && _variable3 !== void 0 && _variable3.ref)) {
        return variable;
      }
    } else {
      return variable;
    }
  }

  const USER_VALUE_PREFIX = 'var:';
  const THEME_VALUE_PREFIX = 'var(--wp--';
  const THEME_VALUE_SUFFIX = ')';
  let parsedVar;

  if (variable.startsWith(USER_VALUE_PREFIX)) {
    parsedVar = variable.slice(USER_VALUE_PREFIX.length).split('|');
  } else if (variable.startsWith(THEME_VALUE_PREFIX) && variable.endsWith(THEME_VALUE_SUFFIX)) {
    parsedVar = variable.slice(THEME_VALUE_PREFIX.length, -THEME_VALUE_SUFFIX.length).split('--');
  } else {
    // We don't know how to parse the value: either is raw of uses complex CSS such as `calc(1px * var(--wp--variable) )`
    return variable;
  }

  const [type, ...path] = parsedVar;

  if (type === 'preset') {
    return getValueFromPresetVariable(features, blockName, variable, path);
  }

  if (type === 'custom') {
    return getValueFromCustomVariable(features, blockName, variable, path);
  }

  return variable;
}
/**
 * Function that scopes a selector with another one. This works a bit like
 * SCSS nesting except the `&` operator isn't supported.
 *
 * @example
 * ```js
 * const scope = '.a, .b .c';
 * const selector = '> .x, .y';
 * const merged = scopeSelector( scope, selector );
 * // merged is '.a > .x, .a .y, .b .c > .x, .b .c .y'
 * ```
 *
 * @param {string} scope    Selector to scope to.
 * @param {string} selector Original selector.
 *
 * @return {string} Scoped selector.
 */

function scopeSelector(scope, selector) {
  const scopes = scope.split(',');
  const selectors = selector.split(',');
  const selectorsScoped = [];
  scopes.forEach(outer => {
    selectors.forEach(inner => {
      selectorsScoped.push(`${outer.trim()} ${inner.trim()}`);
    });
  });
  return selectorsScoped.join(', ');
}

/***/ }),

/***/ "./src/OnboardingSPA/utils/index.js":
/*!******************************************!*\
  !*** ./src/OnboardingSPA/utils/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getQueryParam": () => (/* binding */ getQueryParam),
/* harmony export */   "removeQueryParam": () => (/* binding */ removeQueryParam)
/* harmony export */ });
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_0__);

const getQueryParam = paramName => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(paramName);
};
const removeQueryParam = (url, paramName) => {
  if ((0,_wordpress_url__WEBPACK_IMPORTED_MODULE_0__.hasQueryArg)(url, paramName)) {
    return (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_0__.removeQueryArgs)(url, paramName);
  }

  return url;
};

/***/ }),

/***/ "./src/OnboardingSPA/utils/locales/translations.js":
/*!*********************************************************!*\
  !*** ./src/OnboardingSPA/utils/locales/translations.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "translations": () => (/* binding */ translations)
/* harmony export */ });
/* harmony import */ var _data_translations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../data/translations */ "./src/OnboardingSPA/data/translations/index.js");

/**
 * Translation component according to the OnboardingFlow
 * Pass any word and/or context which we want to swap and display on the UI
 *
 * @return translationMap word
 */

const translations = function (word) {
  var _window, _window$nfdOnboarding;

  let context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'noun';
  const flow = ((_window = window) === null || _window === void 0 ? void 0 : (_window$nfdOnboarding = _window.nfdOnboarding) === null || _window$nfdOnboarding === void 0 ? void 0 : _window$nfdOnboarding.currentFlow) || 'wp-setup';
  const translated_word = _data_translations__WEBPACK_IMPORTED_MODULE_0__.translationMap[flow][word.toLowerCase()][context];
  return word == word.toUpperCase() ? translated_word.toUpperCase() : word[0] == word[0].toUpperCase() ? translated_word[0].toUpperCase() + translated_word.substring(1) : translated_word;
};

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "API_REQUEST": () => (/* binding */ API_REQUEST),
/* harmony export */   "DESIGN_STEPS_THEME": () => (/* binding */ DESIGN_STEPS_THEME),
/* harmony export */   "DRAWER_NAV_VIEWS": () => (/* binding */ DRAWER_NAV_VIEWS),
/* harmony export */   "DRAWER_VIEWS": () => (/* binding */ DRAWER_VIEWS),
/* harmony export */   "HIIVE_ANALYTICS_CATEGORY": () => (/* binding */ HIIVE_ANALYTICS_CATEGORY),
/* harmony export */   "MAX_RETRIES_API_QUEUER": () => (/* binding */ MAX_RETRIES_API_QUEUER),
/* harmony export */   "MAX_RETRIES_FLOW_SWITCH": () => (/* binding */ MAX_RETRIES_FLOW_SWITCH),
/* harmony export */   "MAX_RETRIES_SETTINGS_INIT": () => (/* binding */ MAX_RETRIES_SETTINGS_INIT),
/* harmony export */   "NFD_ONBOARDING_ELEMENT_ID": () => (/* binding */ NFD_ONBOARDING_ELEMENT_ID),
/* harmony export */   "NFD_ONBOARDING_EVENT_PREFIX": () => (/* binding */ NFD_ONBOARDING_EVENT_PREFIX),
/* harmony export */   "NFD_PLUGINS_QUERY_PARAM": () => (/* binding */ NFD_PLUGINS_QUERY_PARAM),
/* harmony export */   "NFD_THEMES_QUERY_PARAM": () => (/* binding */ NFD_THEMES_QUERY_PARAM),
/* harmony export */   "SIDEBAR_LEARN_MORE": () => (/* binding */ SIDEBAR_LEARN_MORE),
/* harmony export */   "SIDEBAR_MENU_SLOTFILL_PREFIX": () => (/* binding */ SIDEBAR_MENU_SLOTFILL_PREFIX),
/* harmony export */   "SIDEBAR_SLOTFILL_PREFIX": () => (/* binding */ SIDEBAR_SLOTFILL_PREFIX),
/* harmony export */   "THEME_INSTALL_WAIT_TIMEOUT": () => (/* binding */ THEME_INSTALL_WAIT_TIMEOUT),
/* harmony export */   "THEME_STATUS_ACTIVE": () => (/* binding */ THEME_STATUS_ACTIVE),
/* harmony export */   "THEME_STATUS_FAILURE": () => (/* binding */ THEME_STATUS_FAILURE),
/* harmony export */   "THEME_STATUS_INIT": () => (/* binding */ THEME_STATUS_INIT),
/* harmony export */   "THEME_STATUS_INSTALLING": () => (/* binding */ THEME_STATUS_INSTALLING),
/* harmony export */   "THEME_STATUS_NOT_ACTIVE": () => (/* binding */ THEME_STATUS_NOT_ACTIVE),
/* harmony export */   "VIEW_DESIGN_COLORS": () => (/* binding */ VIEW_DESIGN_COLORS),
/* harmony export */   "VIEW_DESIGN_HEADER_MENU": () => (/* binding */ VIEW_DESIGN_HEADER_MENU),
/* harmony export */   "VIEW_DESIGN_HOMEPAGE_MENU": () => (/* binding */ VIEW_DESIGN_HOMEPAGE_MENU),
/* harmony export */   "VIEW_DESIGN_THEMES": () => (/* binding */ VIEW_DESIGN_THEMES),
/* harmony export */   "VIEW_DESIGN_THEME_STYLES_MENU": () => (/* binding */ VIEW_DESIGN_THEME_STYLES_MENU),
/* harmony export */   "VIEW_DESIGN_THEME_STYLES_PREVIEW": () => (/* binding */ VIEW_DESIGN_THEME_STYLES_PREVIEW),
/* harmony export */   "VIEW_DESIGN_TYPOGRAPHY": () => (/* binding */ VIEW_DESIGN_TYPOGRAPHY),
/* harmony export */   "VIEW_NAV_DESIGN": () => (/* binding */ VIEW_NAV_DESIGN),
/* harmony export */   "VIEW_NAV_ECOMMERCE_STORE_INFO": () => (/* binding */ VIEW_NAV_ECOMMERCE_STORE_INFO),
/* harmony export */   "VIEW_NAV_GET_STARTED": () => (/* binding */ VIEW_NAV_GET_STARTED),
/* harmony export */   "VIEW_NAV_PAGE": () => (/* binding */ VIEW_NAV_PAGE),
/* harmony export */   "VIEW_NAV_PRIMARY": () => (/* binding */ VIEW_NAV_PRIMARY),
/* harmony export */   "installerRestBase": () => (/* binding */ installerRestBase),
/* harmony export */   "installerRestRoute": () => (/* binding */ installerRestRoute),
/* harmony export */   "onboardingRestBase": () => (/* binding */ onboardingRestBase),
/* harmony export */   "onboardingRestRoute": () => (/* binding */ onboardingRestRoute),
/* harmony export */   "pluginDashboardPage": () => (/* binding */ pluginDashboardPage),
/* harmony export */   "runtimeDataExists": () => (/* binding */ runtimeDataExists),
/* harmony export */   "wpAdminPage": () => (/* binding */ wpAdminPage),
/* harmony export */   "wpAdminUrl": () => (/* binding */ wpAdminUrl),
/* harmony export */   "wpRestBase": () => (/* binding */ wpRestBase),
/* harmony export */   "wpRestRoute": () => (/* binding */ wpRestRoute),
/* harmony export */   "wpRestURL": () => (/* binding */ wpRestURL),
/* harmony export */   "wpSiteUrl": () => (/* binding */ wpSiteUrl)
/* harmony export */ });
var _window, _window$nfdOnboarding, _window$nfdOnboarding2;

const NFD_ONBOARDING_ELEMENT_ID = 'nfd-onboarding';
const runtimeDataExists = 'object' === typeof ((_window = window) === null || _window === void 0 ? void 0 : _window.nfdOnboarding) && 'buildUrl' in window.nfdOnboarding;
const wpAdminUrl = window.nfdOnboarding.adminUrl;
const wpSiteUrl = window.nfdOnboarding.siteUrl;
const wpRestURL = window.nfdOnboarding.restUrl;
const wpRestRoute = 'wp/v2';
const onboardingRestRoute = 'newfold-onboarding/v1';
const installerRestRoute = 'newfold-installer/v1';
const wpRestBase = `${wpRestURL}/${wpRestRoute}`;
const onboardingRestBase = `${wpRestURL}/${onboardingRestRoute}`;
const installerRestBase = `${wpRestURL}/${installerRestRoute}`;
const wpAdminPage = `${wpAdminUrl}index.php`;
const pluginDashboardPage = `${(_window$nfdOnboarding = (_window$nfdOnboarding2 = window.nfdOnboarding.currentBrand) === null || _window$nfdOnboarding2 === void 0 ? void 0 : _window$nfdOnboarding2.pluginDashboardPage) !== null && _window$nfdOnboarding !== void 0 ? _window$nfdOnboarding : wpAdminPage}`;
const NFD_ONBOARDING_EVENT_PREFIX = 'nfd-module-onboarding-event';
const VIEW_NAV_PRIMARY = 'nav-primary';
const VIEW_NAV_DESIGN = 'nav-design';
const VIEW_NAV_PAGE = 'nav-page';
const VIEW_DESIGN_THEMES = 'design-themes';
const VIEW_DESIGN_THEME_STYLES_MENU = 'design-theme-styles-menu';
const VIEW_DESIGN_THEME_STYLES_PREVIEW = 'design-theme-styles-preview';
const VIEW_DESIGN_COLORS = 'design-colors';
const VIEW_DESIGN_TYPOGRAPHY = 'design-typography';
const VIEW_DESIGN_HEADER_MENU = 'design-header-menu';
const VIEW_DESIGN_HOMEPAGE_MENU = 'design-homepage-menu';
const VIEW_NAV_GET_STARTED = 'nav-get-started';
const VIEW_NAV_ECOMMERCE_STORE_INFO = 'nav-ecommerce-store-info';
const SIDEBAR_SLOTFILL_PREFIX = 'Sidebar';
const SIDEBAR_MENU_SLOTFILL_PREFIX = 'HeaderMenu';
const SIDEBAR_LEARN_MORE = 'LearnMore';
const MAX_RETRIES_API_QUEUER = 2;
const MAX_RETRIES_SETTINGS_INIT = 2;
const MAX_RETRIES_FLOW_SWITCH = 2;
const NFD_PLUGINS_QUERY_PARAM = 'nfd_plugins';
const NFD_THEMES_QUERY_PARAM = 'nfd_themes'; // [TODO] Read the theme from flow data once we have the themes step.

const DESIGN_STEPS_THEME = 'nfd_slug_yith_wonder';
const THEME_STATUS_INIT = 'init';
const THEME_STATUS_NOT_ACTIVE = 'inactive';
const THEME_STATUS_INSTALLING = 'installing';
const THEME_STATUS_ACTIVE = 'activated';
const THEME_STATUS_FAILURE = 'failed';
const THEME_INSTALL_WAIT_TIMEOUT = 30000;
const HIIVE_ANALYTICS_CATEGORY = 'wp-onboarding';
/**
 * All views for the <Drawer /> component.
 */

const DRAWER_VIEWS = [VIEW_NAV_PRIMARY, VIEW_NAV_DESIGN, VIEW_NAV_GET_STARTED, VIEW_NAV_PAGE, VIEW_NAV_ECOMMERCE_STORE_INFO, VIEW_DESIGN_THEMES, VIEW_DESIGN_THEME_STYLES_MENU, VIEW_DESIGN_THEME_STYLES_PREVIEW, VIEW_DESIGN_COLORS, VIEW_DESIGN_TYPOGRAPHY, VIEW_DESIGN_HEADER_MENU];
/**
 * All Navigation views for the <Drawer /> component.
 */

const DRAWER_NAV_VIEWS = [VIEW_NAV_PRIMARY, VIEW_NAV_DESIGN, VIEW_NAV_GET_STARTED, VIEW_NAV_PAGE, VIEW_NAV_ECOMMERCE_STORE_INFO];
/**
 * All API Requests for Onboarding.
 */

const API_REQUEST = {
  SET_FLOW: 'SET_FLOW',
  SET_GLOBAL_STYLES: 'SET_GLOBAL_STYLES'
};

/***/ }),

/***/ "./src/webpack-public-path.js":
/*!************************************!*\
  !*** ./src/webpack-public-path.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/**
 * Set webpack's public path (default is root directory of URI resource) to Plugin's build directory.
 * This helps lazy-loading work correctly. This value is set in `/includes/Data.php` in Data::runtime().
 */


const webpackPublicPath = () => {
  if (_constants__WEBPACK_IMPORTED_MODULE_0__.runtimeDataExists) {
    __webpack_require__.p = window.nfdOnboarding.buildUrl;
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (webpackPublicPath);

/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString === Object.prototype.toString) {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				} else {
					classes.push(arg.toString());
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "./src/OnboardingSPA/styles/app.scss":
/*!*******************************************!*\
  !*** ./src/OnboardingSPA/styles/app.scss ***!
  \*******************************************/
/***/ (() => {

throw new Error("Module build failed (from ./node_modules/mini-css-extract-plugin/dist/loader.js):\nHookWebpackError: Module build failed (from ./node_modules/postcss-loader/dist/cjs.js):\nTypeError: Cannot read property 'config' of undefined\n    at getTailwindConfig (/Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/node_modules/tailwindcss/lib/lib/setupTrackingContext.js:87:62)\n    at /Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/node_modules/tailwindcss/lib/lib/setupTrackingContext.js:99:92\n    at /Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/node_modules/tailwindcss/lib/processTailwindFeatures.js:48:11\n    at plugins (/Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/node_modules/tailwindcss/lib/plugin.js:38:63)\n    at LazyResult.runOnRoot (/Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/vendor/newfold-labs/wp-module-onboarding/node_modules/postcss/lib/lazy-result.js:339:16)\n    at LazyResult.runAsync (/Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/vendor/newfold-labs/wp-module-onboarding/node_modules/postcss/lib/lazy-result.js:393:26)\n    at async Object.loader (/Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/vendor/newfold-labs/wp-module-onboarding/node_modules/postcss-loader/dist/index.js:97:14)\n    at tryRunOrWebpackError (/Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/vendor/newfold-labs/wp-module-onboarding/node_modules/webpack/lib/HookWebpackError.js:88:9)\n    at __webpack_require_module__ (/Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/vendor/newfold-labs/wp-module-onboarding/node_modules/webpack/lib/Compilation.js:5051:12)\n    at __webpack_require__ (/Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/vendor/newfold-labs/wp-module-onboarding/node_modules/webpack/lib/Compilation.js:5008:18)\n    at /Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/vendor/newfold-labs/wp-module-onboarding/node_modules/webpack/lib/Compilation.js:5079:20\n    at symbolIterator (/Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/vendor/newfold-labs/wp-module-onboarding/node_modules/neo-async/async.js:3485:9)\n    at done (/Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/vendor/newfold-labs/wp-module-onboarding/node_modules/neo-async/async.js:3527:9)\n    at Hook.eval [as callAsync] (eval at create (/Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/vendor/newfold-labs/wp-module-onboarding/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:15:1)\n    at Hook.CALL_ASYNC_DELEGATE [as _callAsync] (/Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/vendor/newfold-labs/wp-module-onboarding/node_modules/tapable/lib/Hook.js:18:14)\n    at /Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/vendor/newfold-labs/wp-module-onboarding/node_modules/webpack/lib/Compilation.js:4986:43\n    at symbolIterator (/Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/vendor/newfold-labs/wp-module-onboarding/node_modules/neo-async/async.js:3482:9)\n-- inner error --\nError: Module build failed (from ./node_modules/postcss-loader/dist/cjs.js):\nTypeError: Cannot read property 'config' of undefined\n    at getTailwindConfig (/Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/node_modules/tailwindcss/lib/lib/setupTrackingContext.js:87:62)\n    at /Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/node_modules/tailwindcss/lib/lib/setupTrackingContext.js:99:92\n    at /Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/node_modules/tailwindcss/lib/processTailwindFeatures.js:48:11\n    at plugins (/Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/node_modules/tailwindcss/lib/plugin.js:38:63)\n    at LazyResult.runOnRoot (/Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/vendor/newfold-labs/wp-module-onboarding/node_modules/postcss/lib/lazy-result.js:339:16)\n    at LazyResult.runAsync (/Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/vendor/newfold-labs/wp-module-onboarding/node_modules/postcss/lib/lazy-result.js:393:26)\n    at async Object.loader (/Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/vendor/newfold-labs/wp-module-onboarding/node_modules/postcss-loader/dist/index.js:97:14)\n    at Object.<anonymous> (/Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/vendor/newfold-labs/wp-module-onboarding/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[4].use[1]!/Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/vendor/newfold-labs/wp-module-onboarding/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[4].use[2]!/Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/vendor/newfold-labs/wp-module-onboarding/node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[4].use[3]!/Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/vendor/newfold-labs/wp-module-onboarding/src/OnboardingSPA/styles/app.scss:1:7)\n    at /Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/vendor/newfold-labs/wp-module-onboarding/node_modules/webpack/lib/javascript/JavascriptModulesPlugin.js:441:11\n    at Hook.eval [as call] (eval at create (/Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/vendor/newfold-labs/wp-module-onboarding/node_modules/tapable/lib/HookCodeFactory.js:19:10), <anonymous>:7:1)\n    at Hook.CALL_DELEGATE [as _call] (/Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/vendor/newfold-labs/wp-module-onboarding/node_modules/tapable/lib/Hook.js:14:14)\n    at /Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/vendor/newfold-labs/wp-module-onboarding/node_modules/webpack/lib/Compilation.js:5053:39\n    at tryRunOrWebpackError (/Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/vendor/newfold-labs/wp-module-onboarding/node_modules/webpack/lib/HookWebpackError.js:83:7)\n    at __webpack_require_module__ (/Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/vendor/newfold-labs/wp-module-onboarding/node_modules/webpack/lib/Compilation.js:5051:12)\n    at __webpack_require__ (/Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/vendor/newfold-labs/wp-module-onboarding/node_modules/webpack/lib/Compilation.js:5008:18)\n    at /Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/vendor/newfold-labs/wp-module-onboarding/node_modules/webpack/lib/Compilation.js:5079:20\n    at symbolIterator (/Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/vendor/newfold-labs/wp-module-onboarding/node_modules/neo-async/async.js:3485:9)\n\nGenerated code for /Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/vendor/newfold-labs/wp-module-onboarding/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[4].use[1]!/Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/vendor/newfold-labs/wp-module-onboarding/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[4].use[2]!/Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/vendor/newfold-labs/wp-module-onboarding/node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[4].use[3]!/Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/vendor/newfold-labs/wp-module-onboarding/src/OnboardingSPA/styles/app.scss\n1 | throw new Error(\"Module build failed (from ./node_modules/postcss-loader/dist/cjs.js):\\nTypeError: Cannot read property 'config' of undefined\\n    at getTailwindConfig (/Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/node_modules/tailwindcss/lib/lib/setupTrackingContext.js:87:62)\\n    at /Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/node_modules/tailwindcss/lib/lib/setupTrackingContext.js:99:92\\n    at /Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/node_modules/tailwindcss/lib/processTailwindFeatures.js:48:11\\n    at plugins (/Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/node_modules/tailwindcss/lib/plugin.js:38:63)\\n    at LazyResult.runOnRoot (/Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/vendor/newfold-labs/wp-module-onboarding/node_modules/postcss/lib/lazy-result.js:339:16)\\n    at LazyResult.runAsync (/Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/vendor/newfold-labs/wp-module-onboarding/node_modules/postcss/lib/lazy-result.js:393:26)\\n    at async Object.loader (/Users/allen.benny/Local Sites/allenware/app/public/wp-content/plugins/bluehost-wordpress-plugin/vendor/newfold-labs/wp-module-onboarding/node_modules/postcss-loader/dist/index.js:97:14)\");");

/***/ }),

/***/ "./node_modules/react-router-dom/dist/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-router-dom/dist/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbortedDeferredError": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_1__.AbortedDeferredError),
/* harmony export */   "Await": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.Await),
/* harmony export */   "BrowserRouter": () => (/* binding */ BrowserRouter),
/* harmony export */   "Form": () => (/* binding */ Form),
/* harmony export */   "HashRouter": () => (/* binding */ HashRouter),
/* harmony export */   "Link": () => (/* binding */ Link),
/* harmony export */   "MemoryRouter": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.MemoryRouter),
/* harmony export */   "NavLink": () => (/* binding */ NavLink),
/* harmony export */   "Navigate": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.Navigate),
/* harmony export */   "NavigationType": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_1__.Action),
/* harmony export */   "Outlet": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.Outlet),
/* harmony export */   "Route": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.Route),
/* harmony export */   "Router": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.Router),
/* harmony export */   "RouterProvider": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.RouterProvider),
/* harmony export */   "Routes": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.Routes),
/* harmony export */   "ScrollRestoration": () => (/* binding */ ScrollRestoration),
/* harmony export */   "UNSAFE_DataRouterContext": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_DataRouterContext),
/* harmony export */   "UNSAFE_DataRouterStateContext": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_DataRouterStateContext),
/* harmony export */   "UNSAFE_LocationContext": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_LocationContext),
/* harmony export */   "UNSAFE_NavigationContext": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_NavigationContext),
/* harmony export */   "UNSAFE_RouteContext": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_RouteContext),
/* harmony export */   "UNSAFE_useRouteId": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_useRouteId),
/* harmony export */   "UNSAFE_useScrollRestoration": () => (/* binding */ useScrollRestoration),
/* harmony export */   "createBrowserRouter": () => (/* binding */ createBrowserRouter),
/* harmony export */   "createHashRouter": () => (/* binding */ createHashRouter),
/* harmony export */   "createMemoryRouter": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.createMemoryRouter),
/* harmony export */   "createPath": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_1__.createPath),
/* harmony export */   "createRoutesFromChildren": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.createRoutesFromChildren),
/* harmony export */   "createRoutesFromElements": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.createRoutesFromElements),
/* harmony export */   "createSearchParams": () => (/* binding */ createSearchParams),
/* harmony export */   "defer": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_1__.defer),
/* harmony export */   "generatePath": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_1__.generatePath),
/* harmony export */   "isRouteErrorResponse": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_1__.isRouteErrorResponse),
/* harmony export */   "json": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_1__.json),
/* harmony export */   "matchPath": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_1__.matchPath),
/* harmony export */   "matchRoutes": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_1__.matchRoutes),
/* harmony export */   "parsePath": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_1__.parsePath),
/* harmony export */   "redirect": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_1__.redirect),
/* harmony export */   "renderMatches": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.renderMatches),
/* harmony export */   "resolvePath": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_1__.resolvePath),
/* harmony export */   "unstable_HistoryRouter": () => (/* binding */ HistoryRouter),
/* harmony export */   "unstable_useBlocker": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.unstable_useBlocker),
/* harmony export */   "unstable_usePrompt": () => (/* binding */ usePrompt),
/* harmony export */   "useActionData": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useActionData),
/* harmony export */   "useAsyncError": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useAsyncError),
/* harmony export */   "useAsyncValue": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useAsyncValue),
/* harmony export */   "useBeforeUnload": () => (/* binding */ useBeforeUnload),
/* harmony export */   "useFetcher": () => (/* binding */ useFetcher),
/* harmony export */   "useFetchers": () => (/* binding */ useFetchers),
/* harmony export */   "useFormAction": () => (/* binding */ useFormAction),
/* harmony export */   "useHref": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useHref),
/* harmony export */   "useInRouterContext": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useInRouterContext),
/* harmony export */   "useLinkClickHandler": () => (/* binding */ useLinkClickHandler),
/* harmony export */   "useLoaderData": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useLoaderData),
/* harmony export */   "useLocation": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useLocation),
/* harmony export */   "useMatch": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useMatch),
/* harmony export */   "useMatches": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useMatches),
/* harmony export */   "useNavigate": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useNavigate),
/* harmony export */   "useNavigation": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useNavigation),
/* harmony export */   "useNavigationType": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useNavigationType),
/* harmony export */   "useOutlet": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useOutlet),
/* harmony export */   "useOutletContext": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useOutletContext),
/* harmony export */   "useParams": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useParams),
/* harmony export */   "useResolvedPath": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useResolvedPath),
/* harmony export */   "useRevalidator": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useRevalidator),
/* harmony export */   "useRouteError": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useRouteError),
/* harmony export */   "useRouteLoaderData": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useRouteLoaderData),
/* harmony export */   "useRoutes": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useRoutes),
/* harmony export */   "useSearchParams": () => (/* binding */ useSearchParams),
/* harmony export */   "useSubmit": () => (/* binding */ useSubmit)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @remix-run/router */ "./node_modules/@remix-run/router/dist/router.js");
/**
 * React Router DOM v6.11.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */





function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

const defaultMethod = "get";
const defaultEncType = "application/x-www-form-urlencoded";
function isHtmlElement(object) {
  return object != null && typeof object.tagName === "string";
}
function isButtonElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
}
function isFormElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
}
function isInputElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

function shouldProcessLinkClick(event, target) {
  return event.button === 0 && ( // Ignore everything but left clicks
  !target || target === "_self") && // Let browser handle "target=_blank" etc.
  !isModifiedEvent(event) // Ignore clicks with modifier keys
  ;
}
/**
 * Creates a URLSearchParams object using the given initializer.
 *
 * This is identical to `new URLSearchParams(init)` except it also
 * supports arrays as values in the object form of the initializer
 * instead of just strings. This is convenient when you need multiple
 * values for a given key, but don't want to use an array initializer.
 *
 * For example, instead of:
 *
 *   let searchParams = new URLSearchParams([
 *     ['sort', 'name'],
 *     ['sort', 'price']
 *   ]);
 *
 * you can do:
 *
 *   let searchParams = createSearchParams({
 *     sort: ['name', 'price']
 *   });
 */

function createSearchParams(init) {
  if (init === void 0) {
    init = "";
  }

  return new URLSearchParams(typeof init === "string" || Array.isArray(init) || init instanceof URLSearchParams ? init : Object.keys(init).reduce((memo, key) => {
    let value = init[key];
    return memo.concat(Array.isArray(value) ? value.map(v => [key, v]) : [[key, value]]);
  }, []));
}
function getSearchParamsForLocation(locationSearch, defaultSearchParams) {
  let searchParams = createSearchParams(locationSearch);

  if (defaultSearchParams) {
    for (let key of defaultSearchParams.keys()) {
      if (!searchParams.has(key)) {
        defaultSearchParams.getAll(key).forEach(value => {
          searchParams.append(key, value);
        });
      }
    }
  }

  return searchParams;
}
function getFormSubmissionInfo(target, options, basename) {
  let method;
  let action = null;
  let encType;
  let formData;

  if (isFormElement(target)) {
    let submissionTrigger = options.submissionTrigger;

    if (options.action) {
      action = options.action;
    } else {
      // When grabbing the action from the element, it will have had the basename
      // prefixed to ensure non-JS scenarios work, so strip it since we'll
      // re-prefix in the router
      let attr = target.getAttribute("action");
      action = attr ? (0,react_router__WEBPACK_IMPORTED_MODULE_1__.stripBasename)(attr, basename) : null;
    }

    method = options.method || target.getAttribute("method") || defaultMethod;
    encType = options.encType || target.getAttribute("enctype") || defaultEncType;
    formData = new FormData(target);

    if (submissionTrigger && submissionTrigger.name) {
      formData.append(submissionTrigger.name, submissionTrigger.value);
    }
  } else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
    let form = target.form;

    if (form == null) {
      throw new Error("Cannot submit a <button> or <input type=\"submit\"> without a <form>");
    } // <button>/<input type="submit"> may override attributes of <form>


    if (options.action) {
      action = options.action;
    } else {
      // When grabbing the action from the element, it will have had the basename
      // prefixed to ensure non-JS scenarios work, so strip it since we'll
      // re-prefix in the router
      let attr = target.getAttribute("formaction") || form.getAttribute("action");
      action = attr ? (0,react_router__WEBPACK_IMPORTED_MODULE_1__.stripBasename)(attr, basename) : null;
    }

    method = options.method || target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod;
    encType = options.encType || target.getAttribute("formenctype") || form.getAttribute("enctype") || defaultEncType;
    formData = new FormData(form); // Include name + value from a <button>, appending in case the button name
    // matches an existing input name

    if (target.name) {
      formData.append(target.name, target.value);
    }
  } else if (isHtmlElement(target)) {
    throw new Error("Cannot submit element that is not <form>, <button>, or " + "<input type=\"submit|image\">");
  } else {
    method = options.method || defaultMethod;
    action = options.action || null;
    encType = options.encType || defaultEncType;

    if (target instanceof FormData) {
      formData = target;
    } else {
      formData = new FormData();

      if (target instanceof URLSearchParams) {
        for (let [name, value] of target) {
          formData.append(name, value);
        }
      } else if (target != null) {
        for (let name of Object.keys(target)) {
          formData.append(name, target[name]);
        }
      }
    }
  }

  return {
    action,
    method: method.toLowerCase(),
    encType,
    formData
  };
}

const _excluded = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset"],
      _excluded2 = ["aria-current", "caseSensitive", "className", "end", "style", "to", "children"],
      _excluded3 = ["reloadDocument", "replace", "method", "action", "onSubmit", "fetcherKey", "routeId", "relative", "preventScrollReset"];
function createBrowserRouter(routes, opts) {
  return (0,react_router__WEBPACK_IMPORTED_MODULE_1__.createRouter)({
    basename: opts == null ? void 0 : opts.basename,
    future: _extends({}, opts == null ? void 0 : opts.future, {
      v7_prependBasename: true
    }),
    history: (0,react_router__WEBPACK_IMPORTED_MODULE_1__.createBrowserHistory)({
      window: opts == null ? void 0 : opts.window
    }),
    hydrationData: (opts == null ? void 0 : opts.hydrationData) || parseHydrationData(),
    routes,
    mapRouteProperties: react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_mapRouteProperties
  }).initialize();
}
function createHashRouter(routes, opts) {
  return (0,react_router__WEBPACK_IMPORTED_MODULE_1__.createRouter)({
    basename: opts == null ? void 0 : opts.basename,
    future: _extends({}, opts == null ? void 0 : opts.future, {
      v7_prependBasename: true
    }),
    history: (0,react_router__WEBPACK_IMPORTED_MODULE_1__.createHashHistory)({
      window: opts == null ? void 0 : opts.window
    }),
    hydrationData: (opts == null ? void 0 : opts.hydrationData) || parseHydrationData(),
    routes,
    mapRouteProperties: react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_mapRouteProperties
  }).initialize();
}

function parseHydrationData() {
  var _window;

  let state = (_window = window) == null ? void 0 : _window.__staticRouterHydrationData;

  if (state && state.errors) {
    state = _extends({}, state, {
      errors: deserializeErrors(state.errors)
    });
  }

  return state;
}

function deserializeErrors(errors) {
  if (!errors) return null;
  let entries = Object.entries(errors);
  let serialized = {};

  for (let [key, val] of entries) {
    // Hey you!  If you change this, please change the corresponding logic in
    // serializeErrors in react-router-dom/server.tsx :)
    if (val && val.__type === "RouteErrorResponse") {
      serialized[key] = new react_router__WEBPACK_IMPORTED_MODULE_1__.ErrorResponse(val.status, val.statusText, val.data, val.internal === true);
    } else if (val && val.__type === "Error") {
      let error = new Error(val.message); // Wipe away the client-side stack trace.  Nothing to fill it in with
      // because we don't serialize SSR stack traces for security reasons

      error.stack = "";
      serialized[key] = error;
    } else {
      serialized[key] = val;
    }
  }

  return serialized;
}
/**
 * A `<Router>` for use in web browsers. Provides the cleanest URLs.
 */


function BrowserRouter(_ref) {
  let {
    basename,
    children,
    window
  } = _ref;
  let historyRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef();

  if (historyRef.current == null) {
    historyRef.current = (0,react_router__WEBPACK_IMPORTED_MODULE_1__.createBrowserHistory)({
      window,
      v5Compat: true
    });
  }

  let history = historyRef.current;
  let [state, setState] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    action: history.action,
    location: history.location
  });
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => history.listen(setState), [history]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router__WEBPACK_IMPORTED_MODULE_2__.Router, {
    basename: basename,
    children: children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
/**
 * A `<Router>` for use in web browsers. Stores the location in the hash
 * portion of the URL so it is not sent to the server.
 */

function HashRouter(_ref2) {
  let {
    basename,
    children,
    window
  } = _ref2;
  let historyRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef();

  if (historyRef.current == null) {
    historyRef.current = (0,react_router__WEBPACK_IMPORTED_MODULE_1__.createHashHistory)({
      window,
      v5Compat: true
    });
  }

  let history = historyRef.current;
  let [state, setState] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    action: history.action,
    location: history.location
  });
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => history.listen(setState), [history]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router__WEBPACK_IMPORTED_MODULE_2__.Router, {
    basename: basename,
    children: children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
/**
 * A `<Router>` that accepts a pre-instantiated history object. It's important
 * to note that using your own history object is highly discouraged and may add
 * two versions of the history library to your bundles unless you use the same
 * version of the history library that React Router uses internally.
 */

function HistoryRouter(_ref3) {
  let {
    basename,
    children,
    history
  } = _ref3;
  const [state, setState] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    action: history.action,
    location: history.location
  });
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => history.listen(setState), [history]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router__WEBPACK_IMPORTED_MODULE_2__.Router, {
    basename: basename,
    children: children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}

if (true) {
  HistoryRouter.displayName = "unstable_HistoryRouter";
}
const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
const ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
/**
 * The public API for rendering a history-aware <a>.
 */

const Link = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function LinkWithRef(_ref4, ref) {
  let {
    onClick,
    relative,
    reloadDocument,
    replace,
    state,
    target,
    to,
    preventScrollReset
  } = _ref4,
      rest = _objectWithoutPropertiesLoose(_ref4, _excluded);

  let {
    basename
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_NavigationContext); // Rendered into <a href> for absolute URLs

  let absoluteHref;
  let isExternal = false;

  if (typeof to === "string" && ABSOLUTE_URL_REGEX.test(to)) {
    // Render the absolute href server- and client-side
    absoluteHref = to; // Only check for external origins client-side

    if (isBrowser) {
      try {
        let currentUrl = new URL(window.location.href);
        let targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to);
        let path = (0,react_router__WEBPACK_IMPORTED_MODULE_1__.stripBasename)(targetUrl.pathname, basename);

        if (targetUrl.origin === currentUrl.origin && path != null) {
          // Strip the protocol/origin/basename for same-origin absolute URLs
          to = path + targetUrl.search + targetUrl.hash;
        } else {
          isExternal = true;
        }
      } catch (e) {
        // We can't do external URL detection without a valid URL
         true ? (0,react_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(false, "<Link to=\"" + to + "\"> contains an invalid URL which will probably break " + "when clicked - please update to a valid URL path.") : 0;
      }
    }
  } // Rendered into <a href> for relative URLs


  let href = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useHref)(to, {
    relative
  });
  let internalOnClick = useLinkClickHandler(to, {
    replace,
    state,
    target,
    preventScrollReset,
    relative
  });

  function handleClick(event) {
    if (onClick) onClick(event);

    if (!event.defaultPrevented) {
      internalOnClick(event);
    }
  }

  return (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", _extends({}, rest, {
      href: absoluteHref || href,
      onClick: isExternal || reloadDocument ? onClick : handleClick,
      ref: ref,
      target: target
    }))
  );
});

if (true) {
  Link.displayName = "Link";
}
/**
 * A <Link> wrapper that knows if it's "active" or not.
 */


const NavLink = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function NavLinkWithRef(_ref5, ref) {
  let {
    "aria-current": ariaCurrentProp = "page",
    caseSensitive = false,
    className: classNameProp = "",
    end = false,
    style: styleProp,
    to,
    children
  } = _ref5,
      rest = _objectWithoutPropertiesLoose(_ref5, _excluded2);

  let path = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useResolvedPath)(to, {
    relative: rest.relative
  });
  let location = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useLocation)();
  let routerState = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_DataRouterStateContext);
  let {
    navigator
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_NavigationContext);
  let toPathname = navigator.encodeLocation ? navigator.encodeLocation(path).pathname : path.pathname;
  let locationPathname = location.pathname;
  let nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;

  if (!caseSensitive) {
    locationPathname = locationPathname.toLowerCase();
    nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null;
    toPathname = toPathname.toLowerCase();
  }

  let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(toPathname.length) === "/";
  let isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/");
  let ariaCurrent = isActive ? ariaCurrentProp : undefined;
  let className;

  if (typeof classNameProp === "function") {
    className = classNameProp({
      isActive,
      isPending
    });
  } else {
    // If the className prop is not a function, we use a default `active`
    // class for <NavLink />s that are active. In v5 `active` was the default
    // value for `activeClassName`, but we are removing that API and can still
    // use the old default behavior for a cleaner upgrade path and keep the
    // simple styling rules working as they currently do.
    className = [classNameProp, isActive ? "active" : null, isPending ? "pending" : null].filter(Boolean).join(" ");
  }

  let style = typeof styleProp === "function" ? styleProp({
    isActive,
    isPending
  }) : styleProp;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Link, _extends({}, rest, {
    "aria-current": ariaCurrent,
    className: className,
    ref: ref,
    style: style,
    to: to
  }), typeof children === "function" ? children({
    isActive,
    isPending
  }) : children);
});

if (true) {
  NavLink.displayName = "NavLink";
}
/**
 * A `@remix-run/router`-aware `<form>`. It behaves like a normal form except
 * that the interaction with the server is with `fetch` instead of new document
 * requests, allowing components to add nicer UX to the page as the form is
 * submitted and returns with data.
 */


const Form = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, ref) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(FormImpl, _extends({}, props, {
    ref: ref
  }));
});

if (true) {
  Form.displayName = "Form";
}

const FormImpl = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((_ref6, forwardedRef) => {
  let {
    reloadDocument,
    replace,
    method = defaultMethod,
    action,
    onSubmit,
    fetcherKey,
    routeId,
    relative,
    preventScrollReset
  } = _ref6,
      props = _objectWithoutPropertiesLoose(_ref6, _excluded3);

  let submit = useSubmitImpl(fetcherKey, routeId);
  let formMethod = method.toLowerCase() === "get" ? "get" : "post";
  let formAction = useFormAction(action, {
    relative
  });

  let submitHandler = event => {
    onSubmit && onSubmit(event);
    if (event.defaultPrevented) return;
    event.preventDefault();
    let submitter = event.nativeEvent.submitter;
    let submitMethod = (submitter == null ? void 0 : submitter.getAttribute("formmethod")) || method;
    submit(submitter || event.currentTarget, {
      method: submitMethod,
      replace,
      relative,
      preventScrollReset
    });
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", _extends({
    ref: forwardedRef,
    method: formMethod,
    action: formAction,
    onSubmit: reloadDocument ? onSubmit : submitHandler
  }, props));
});

if (true) {
  FormImpl.displayName = "FormImpl";
}
/**
 * This component will emulate the browser's scroll restoration on location
 * changes.
 */


function ScrollRestoration(_ref7) {
  let {
    getKey,
    storageKey
  } = _ref7;
  useScrollRestoration({
    getKey,
    storageKey
  });
  return null;
}

if (true) {
  ScrollRestoration.displayName = "ScrollRestoration";
} //#endregion
////////////////////////////////////////////////////////////////////////////////
//#region Hooks
////////////////////////////////////////////////////////////////////////////////


var DataRouterHook;

(function (DataRouterHook) {
  DataRouterHook["UseScrollRestoration"] = "useScrollRestoration";
  DataRouterHook["UseSubmitImpl"] = "useSubmitImpl";
  DataRouterHook["UseFetcher"] = "useFetcher";
})(DataRouterHook || (DataRouterHook = {}));

var DataRouterStateHook;

(function (DataRouterStateHook) {
  DataRouterStateHook["UseFetchers"] = "useFetchers";
  DataRouterStateHook["UseScrollRestoration"] = "useScrollRestoration";
})(DataRouterStateHook || (DataRouterStateHook = {}));

function getDataRouterConsoleError(hookName) {
  return hookName + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}

function useDataRouterContext(hookName) {
  let ctx = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_DataRouterContext);
  !ctx ?  true ? (0,react_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, getDataRouterConsoleError(hookName)) : 0 : void 0;
  return ctx;
}

function useDataRouterState(hookName) {
  let state = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_DataRouterStateContext);
  !state ?  true ? (0,react_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, getDataRouterConsoleError(hookName)) : 0 : void 0;
  return state;
}
/**
 * Handles the click behavior for router `<Link>` components. This is useful if
 * you need to create custom `<Link>` components with the same click behavior we
 * use in our exported `<Link>`.
 */


function useLinkClickHandler(to, _temp) {
  let {
    target,
    replace: replaceProp,
    state,
    preventScrollReset,
    relative
  } = _temp === void 0 ? {} : _temp;
  let navigate = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useNavigate)();
  let location = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useLocation)();
  let path = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useResolvedPath)(to, {
    relative
  });
  return react__WEBPACK_IMPORTED_MODULE_0__.useCallback(event => {
    if (shouldProcessLinkClick(event, target)) {
      event.preventDefault(); // If the URL hasn't changed, a regular <a> will do a replace instead of
      // a push, so do the same here unless the replace prop is explicitly set

      let replace = replaceProp !== undefined ? replaceProp : (0,react_router__WEBPACK_IMPORTED_MODULE_1__.createPath)(location) === (0,react_router__WEBPACK_IMPORTED_MODULE_1__.createPath)(path);
      navigate(to, {
        replace,
        state,
        preventScrollReset,
        relative
      });
    }
  }, [location, navigate, path, replaceProp, state, target, to, preventScrollReset, relative]);
}
/**
 * A convenient wrapper for reading and writing search parameters via the
 * URLSearchParams interface.
 */

function useSearchParams(defaultInit) {
   true ? (0,react_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(typeof URLSearchParams !== "undefined", "You cannot use the `useSearchParams` hook in a browser that does not " + "support the URLSearchParams API. If you need to support Internet " + "Explorer 11, we recommend you load a polyfill such as " + "https://github.com/ungap/url-search-params\n\n" + "If you're unsure how to load polyfills, we recommend you check out " + "https://polyfill.io/v3/ which provides some recommendations about how " + "to load polyfills only for users that need them, instead of for every " + "user.") : 0;
  let defaultSearchParamsRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(createSearchParams(defaultInit));
  let hasSetSearchParamsRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  let location = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useLocation)();
  let searchParams = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => // Only merge in the defaults if we haven't yet called setSearchParams.
  // Once we call that we want those to take precedence, otherwise you can't
  // remove a param with setSearchParams({}) if it has an initial value
  getSearchParamsForLocation(location.search, hasSetSearchParamsRef.current ? null : defaultSearchParamsRef.current), [location.search]);
  let navigate = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useNavigate)();
  let setSearchParams = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((nextInit, navigateOptions) => {
    const newSearchParams = createSearchParams(typeof nextInit === "function" ? nextInit(searchParams) : nextInit);
    hasSetSearchParamsRef.current = true;
    navigate("?" + newSearchParams, navigateOptions);
  }, [navigate, searchParams]);
  return [searchParams, setSearchParams];
}
/**
 * Returns a function that may be used to programmatically submit a form (or
 * some arbitrary data) to the server.
 */

function useSubmit() {
  return useSubmitImpl();
}

function useSubmitImpl(fetcherKey, fetcherRouteId) {
  let {
    router
  } = useDataRouterContext(DataRouterHook.UseSubmitImpl);
  let {
    basename
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_NavigationContext);
  let currentRouteId = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_useRouteId)();
  return react__WEBPACK_IMPORTED_MODULE_0__.useCallback(function (target, options) {
    if (options === void 0) {
      options = {};
    }

    if (typeof document === "undefined") {
      throw new Error("You are calling submit during the server render. " + "Try calling submit within a `useEffect` or callback instead.");
    }

    let {
      action,
      method,
      encType,
      formData
    } = getFormSubmissionInfo(target, options, basename); // Base options shared between fetch() and navigate()

    let opts = {
      preventScrollReset: options.preventScrollReset,
      formData,
      formMethod: method,
      formEncType: encType
    };

    if (fetcherKey) {
      !(fetcherRouteId != null) ?  true ? (0,react_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, "No routeId available for useFetcher()") : 0 : void 0;
      router.fetch(fetcherKey, fetcherRouteId, action, opts);
    } else {
      router.navigate(action, _extends({}, opts, {
        replace: options.replace,
        fromRouteId: currentRouteId
      }));
    }
  }, [router, basename, fetcherKey, fetcherRouteId, currentRouteId]);
} // v7: Eventually we should deprecate this entirely in favor of using the
// router method directly?


function useFormAction(action, _temp2) {
  let {
    relative
  } = _temp2 === void 0 ? {} : _temp2;
  let {
    basename
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_NavigationContext);
  let routeContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_RouteContext);
  !routeContext ?  true ? (0,react_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, "useFormAction must be used inside a RouteContext") : 0 : void 0;
  let [match] = routeContext.matches.slice(-1); // Shallow clone path so we can modify it below, otherwise we modify the
  // object referenced by useMemo inside useResolvedPath

  let path = _extends({}, (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useResolvedPath)(action ? action : ".", {
    relative
  })); // Previously we set the default action to ".". The problem with this is that
  // `useResolvedPath(".")` excludes search params and the hash of the resolved
  // URL. This is the intended behavior of when "." is specifically provided as
  // the form action, but inconsistent w/ browsers when the action is omitted.
  // https://github.com/remix-run/remix/issues/927


  let location = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useLocation)();

  if (action == null) {
    // Safe to write to these directly here since if action was undefined, we
    // would have called useResolvedPath(".") which will never include a search
    // or hash
    path.search = location.search;
    path.hash = location.hash; // When grabbing search params from the URL, remove the automatically
    // inserted ?index param so we match the useResolvedPath search behavior
    // which would not include ?index

    if (match.route.index) {
      let params = new URLSearchParams(path.search);
      params.delete("index");
      path.search = params.toString() ? "?" + params.toString() : "";
    }
  }

  if ((!action || action === ".") && match.route.index) {
    path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
  } // If we're operating within a basename, prepend it to the pathname prior
  // to creating the form action.  If this is a root navigation, then just use
  // the raw basename which allows the basename to have full control over the
  // presence of a trailing slash on root actions


  if (basename !== "/") {
    path.pathname = path.pathname === "/" ? basename : (0,react_router__WEBPACK_IMPORTED_MODULE_1__.joinPaths)([basename, path.pathname]);
  }

  return (0,react_router__WEBPACK_IMPORTED_MODULE_1__.createPath)(path);
}

function createFetcherForm(fetcherKey, routeId) {
  let FetcherForm = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, ref) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(FormImpl, _extends({}, props, {
      ref: ref,
      fetcherKey: fetcherKey,
      routeId: routeId
    }));
  });

  if (true) {
    FetcherForm.displayName = "fetcher.Form";
  }

  return FetcherForm;
}

let fetcherId = 0;
/**
 * Interacts with route loaders and actions without causing a navigation. Great
 * for any interaction that stays on the same page.
 */

function useFetcher() {
  var _route$matches;

  let {
    router
  } = useDataRouterContext(DataRouterHook.UseFetcher);
  let route = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_RouteContext);
  !route ?  true ? (0,react_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, "useFetcher must be used inside a RouteContext") : 0 : void 0;
  let routeId = (_route$matches = route.matches[route.matches.length - 1]) == null ? void 0 : _route$matches.route.id;
  !(routeId != null) ?  true ? (0,react_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, "useFetcher can only be used on routes that contain a unique \"id\"") : 0 : void 0;
  let [fetcherKey] = react__WEBPACK_IMPORTED_MODULE_0__.useState(() => String(++fetcherId));
  let [Form] = react__WEBPACK_IMPORTED_MODULE_0__.useState(() => {
    !routeId ?  true ? (0,react_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, "No routeId available for fetcher.Form()") : 0 : void 0;
    return createFetcherForm(fetcherKey, routeId);
  });
  let [load] = react__WEBPACK_IMPORTED_MODULE_0__.useState(() => href => {
    !router ?  true ? (0,react_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, "No router available for fetcher.load()") : 0 : void 0;
    !routeId ?  true ? (0,react_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, "No routeId available for fetcher.load()") : 0 : void 0;
    router.fetch(fetcherKey, routeId, href);
  });
  let submit = useSubmitImpl(fetcherKey, routeId);
  let fetcher = router.getFetcher(fetcherKey);
  let fetcherWithComponents = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => _extends({
    Form,
    submit,
    load
  }, fetcher), [fetcher, Form, submit, load]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    // Is this busted when the React team gets real weird and calls effects
    // twice on mount?  We really just need to garbage collect here when this
    // fetcher is no longer around.
    return () => {
      if (!router) {
        console.warn("No router available to clean up from useFetcher()");
        return;
      }

      router.deleteFetcher(fetcherKey);
    };
  }, [router, fetcherKey]);
  return fetcherWithComponents;
}
/**
 * Provides all fetchers currently on the page. Useful for layouts and parent
 * routes that need to provide pending/optimistic UI regarding the fetch.
 */

function useFetchers() {
  let state = useDataRouterState(DataRouterStateHook.UseFetchers);
  return [...state.fetchers.values()];
}
const SCROLL_RESTORATION_STORAGE_KEY = "react-router-scroll-positions";
let savedScrollPositions = {};
/**
 * When rendered inside a RouterProvider, will restore scroll positions on navigations
 */

function useScrollRestoration(_temp3) {
  let {
    getKey,
    storageKey
  } = _temp3 === void 0 ? {} : _temp3;
  let {
    router
  } = useDataRouterContext(DataRouterHook.UseScrollRestoration);
  let {
    restoreScrollPosition,
    preventScrollReset
  } = useDataRouterState(DataRouterStateHook.UseScrollRestoration);
  let location = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useLocation)();
  let matches = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useMatches)();
  let navigation = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useNavigation)(); // Trigger manual scroll restoration while we're active

  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = "auto";
    };
  }, []); // Save positions on pagehide

  usePageHide(react__WEBPACK_IMPORTED_MODULE_0__.useCallback(() => {
    if (navigation.state === "idle") {
      let key = (getKey ? getKey(location, matches) : null) || location.key;
      savedScrollPositions[key] = window.scrollY;
    }

    sessionStorage.setItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY, JSON.stringify(savedScrollPositions));
    window.history.scrollRestoration = "auto";
  }, [storageKey, getKey, navigation.state, location, matches])); // Read in any saved scroll locations

  if (typeof document !== "undefined") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => {
      try {
        let sessionPositions = sessionStorage.getItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY);

        if (sessionPositions) {
          savedScrollPositions = JSON.parse(sessionPositions);
        }
      } catch (e) {// no-op, use default empty object
      }
    }, [storageKey]); // Enable scroll restoration in the router
    // eslint-disable-next-line react-hooks/rules-of-hooks

    react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => {
      let disableScrollRestoration = router == null ? void 0 : router.enableScrollRestoration(savedScrollPositions, () => window.scrollY, getKey);
      return () => disableScrollRestoration && disableScrollRestoration();
    }, [router, getKey]); // Restore scrolling when state.restoreScrollPosition changes
    // eslint-disable-next-line react-hooks/rules-of-hooks

    react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => {
      // Explicit false means don't do anything (used for submissions)
      if (restoreScrollPosition === false) {
        return;
      } // been here before, scroll to it


      if (typeof restoreScrollPosition === "number") {
        window.scrollTo(0, restoreScrollPosition);
        return;
      } // try to scroll to the hash


      if (location.hash) {
        let el = document.getElementById(location.hash.slice(1));

        if (el) {
          el.scrollIntoView();
          return;
        }
      } // Don't reset if this navigation opted out


      if (preventScrollReset === true) {
        return;
      } // otherwise go to the top on new locations


      window.scrollTo(0, 0);
    }, [location, restoreScrollPosition, preventScrollReset]);
  }
}
/**
 * Setup a callback to be fired on the window's `beforeunload` event. This is
 * useful for saving some data to `window.localStorage` just before the page
 * refreshes.
 *
 * Note: The `callback` argument should be a function created with
 * `React.useCallback()`.
 */

function useBeforeUnload(callback, options) {
  let {
    capture
  } = options || {};
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    let opts = capture != null ? {
      capture
    } : undefined;
    window.addEventListener("beforeunload", callback, opts);
    return () => {
      window.removeEventListener("beforeunload", callback, opts);
    };
  }, [callback, capture]);
}
/**
 * Setup a callback to be fired on the window's `pagehide` event. This is
 * useful for saving some data to `window.localStorage` just before the page
 * refreshes.  This event is better supported than beforeunload across browsers.
 *
 * Note: The `callback` argument should be a function created with
 * `React.useCallback()`.
 */

function usePageHide(callback, options) {
  let {
    capture
  } = options || {};
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    let opts = capture != null ? {
      capture
    } : undefined;
    window.addEventListener("pagehide", callback, opts);
    return () => {
      window.removeEventListener("pagehide", callback, opts);
    };
  }, [callback, capture]);
}
/**
 * Wrapper around useBlocker to show a window.confirm prompt to users instead
 * of building a custom UI with useBlocker.
 *
 * Warning: This has *a lot of rough edges* and behaves very differently (and
 * very incorrectly in some cases) across browsers if user click addition
 * back/forward navigations while the confirm is open.  Use at your own risk.
 */


function usePrompt(_ref8) {
  let {
    when,
    message
  } = _ref8;
  let blocker = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.unstable_useBlocker)(when);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (blocker.state === "blocked" && !when) {
      blocker.reset();
    }
  }, [blocker, when]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (blocker.state === "blocked") {
      let proceed = window.confirm(message);

      if (proceed) {
        setTimeout(blocker.proceed, 0);
      } else {
        blocker.reset();
      }
    }
  }, [blocker, message]);
}
 //#endregion


//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/react-router/dist/index.js":
/*!*************************************************!*\
  !*** ./node_modules/react-router/dist/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbortedDeferredError": () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.AbortedDeferredError),
/* harmony export */   "Await": () => (/* binding */ Await),
/* harmony export */   "MemoryRouter": () => (/* binding */ MemoryRouter),
/* harmony export */   "Navigate": () => (/* binding */ Navigate),
/* harmony export */   "NavigationType": () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.Action),
/* harmony export */   "Outlet": () => (/* binding */ Outlet),
/* harmony export */   "Route": () => (/* binding */ Route),
/* harmony export */   "Router": () => (/* binding */ Router),
/* harmony export */   "RouterProvider": () => (/* binding */ RouterProvider),
/* harmony export */   "Routes": () => (/* binding */ Routes),
/* harmony export */   "UNSAFE_DataRouterContext": () => (/* binding */ DataRouterContext),
/* harmony export */   "UNSAFE_DataRouterStateContext": () => (/* binding */ DataRouterStateContext),
/* harmony export */   "UNSAFE_LocationContext": () => (/* binding */ LocationContext),
/* harmony export */   "UNSAFE_NavigationContext": () => (/* binding */ NavigationContext),
/* harmony export */   "UNSAFE_RouteContext": () => (/* binding */ RouteContext),
/* harmony export */   "UNSAFE_mapRouteProperties": () => (/* binding */ mapRouteProperties),
/* harmony export */   "UNSAFE_useRouteId": () => (/* binding */ useRouteId),
/* harmony export */   "UNSAFE_useRoutesImpl": () => (/* binding */ useRoutesImpl),
/* harmony export */   "createMemoryRouter": () => (/* binding */ createMemoryRouter),
/* harmony export */   "createPath": () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.createPath),
/* harmony export */   "createRoutesFromChildren": () => (/* binding */ createRoutesFromChildren),
/* harmony export */   "createRoutesFromElements": () => (/* binding */ createRoutesFromChildren),
/* harmony export */   "defer": () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.defer),
/* harmony export */   "generatePath": () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.generatePath),
/* harmony export */   "isRouteErrorResponse": () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.isRouteErrorResponse),
/* harmony export */   "json": () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.json),
/* harmony export */   "matchPath": () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.matchPath),
/* harmony export */   "matchRoutes": () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.matchRoutes),
/* harmony export */   "parsePath": () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.parsePath),
/* harmony export */   "redirect": () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.redirect),
/* harmony export */   "renderMatches": () => (/* binding */ renderMatches),
/* harmony export */   "resolvePath": () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.resolvePath),
/* harmony export */   "unstable_useBlocker": () => (/* binding */ useBlocker),
/* harmony export */   "useActionData": () => (/* binding */ useActionData),
/* harmony export */   "useAsyncError": () => (/* binding */ useAsyncError),
/* harmony export */   "useAsyncValue": () => (/* binding */ useAsyncValue),
/* harmony export */   "useHref": () => (/* binding */ useHref),
/* harmony export */   "useInRouterContext": () => (/* binding */ useInRouterContext),
/* harmony export */   "useLoaderData": () => (/* binding */ useLoaderData),
/* harmony export */   "useLocation": () => (/* binding */ useLocation),
/* harmony export */   "useMatch": () => (/* binding */ useMatch),
/* harmony export */   "useMatches": () => (/* binding */ useMatches),
/* harmony export */   "useNavigate": () => (/* binding */ useNavigate),
/* harmony export */   "useNavigation": () => (/* binding */ useNavigation),
/* harmony export */   "useNavigationType": () => (/* binding */ useNavigationType),
/* harmony export */   "useOutlet": () => (/* binding */ useOutlet),
/* harmony export */   "useOutletContext": () => (/* binding */ useOutletContext),
/* harmony export */   "useParams": () => (/* binding */ useParams),
/* harmony export */   "useResolvedPath": () => (/* binding */ useResolvedPath),
/* harmony export */   "useRevalidator": () => (/* binding */ useRevalidator),
/* harmony export */   "useRouteError": () => (/* binding */ useRouteError),
/* harmony export */   "useRouteLoaderData": () => (/* binding */ useRouteLoaderData),
/* harmony export */   "useRoutes": () => (/* binding */ useRoutes)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _remix_run_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @remix-run/router */ "./node_modules/@remix-run/router/dist/router.js");
/**
 * React Router v6.11.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */




function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

const DataRouterContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);

if (true) {
  DataRouterContext.displayName = "DataRouter";
}

const DataRouterStateContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);

if (true) {
  DataRouterStateContext.displayName = "DataRouterState";
}

const AwaitContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);

if (true) {
  AwaitContext.displayName = "Await";
}

const NavigationContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);

if (true) {
  NavigationContext.displayName = "Navigation";
}

const LocationContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);

if (true) {
  LocationContext.displayName = "Location";
}

const RouteContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext({
  outlet: null,
  matches: [],
  isDataRoute: false
});

if (true) {
  RouteContext.displayName = "Route";
}

const RouteErrorContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);

if (true) {
  RouteErrorContext.displayName = "RouteError";
}

/**
 * Returns the full href for the given "to" value. This is useful for building
 * custom links that are also accessible and preserve right-click behavior.
 *
 * @see https://reactrouter.com/hooks/use-href
 */

function useHref(to, _temp) {
  let {
    relative
  } = _temp === void 0 ? {} : _temp;
  !useInRouterContext() ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, // TODO: This error is probably because they somehow have 2 versions of the
  // router loaded. We can help them understand how to avoid that.
  "useHref() may be used only in the context of a <Router> component.") : 0 : void 0;
  let {
    basename,
    navigator
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
  let {
    hash,
    pathname,
    search
  } = useResolvedPath(to, {
    relative
  });
  let joinedPathname = pathname; // If we're operating within a basename, prepend it to the pathname prior
  // to creating the href.  If this is a root navigation, then just use the raw
  // basename which allows the basename to have full control over the presence
  // of a trailing slash on root links

  if (basename !== "/") {
    joinedPathname = pathname === "/" ? basename : (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.joinPaths)([basename, pathname]);
  }

  return navigator.createHref({
    pathname: joinedPathname,
    search,
    hash
  });
}
/**
 * Returns true if this component is a descendant of a <Router>.
 *
 * @see https://reactrouter.com/hooks/use-in-router-context
 */

function useInRouterContext() {
  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(LocationContext) != null;
}
/**
 * Returns the current location object, which represents the current URL in web
 * browsers.
 *
 * Note: If you're using this it may mean you're doing some of your own
 * "routing" in your app, and we'd like to know what your use case is. We may
 * be able to provide something higher-level to better suit your needs.
 *
 * @see https://reactrouter.com/hooks/use-location
 */

function useLocation() {
  !useInRouterContext() ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, // TODO: This error is probably because they somehow have 2 versions of the
  // router loaded. We can help them understand how to avoid that.
  "useLocation() may be used only in the context of a <Router> component.") : 0 : void 0;
  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(LocationContext).location;
}
/**
 * Returns the current navigation action which describes how the router came to
 * the current location, either by a pop, push, or replace on the history stack.
 *
 * @see https://reactrouter.com/hooks/use-navigation-type
 */

function useNavigationType() {
  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(LocationContext).navigationType;
}
/**
 * Returns a PathMatch object if the given pattern matches the current URL.
 * This is useful for components that need to know "active" state, e.g.
 * <NavLink>.
 *
 * @see https://reactrouter.com/hooks/use-match
 */

function useMatch(pattern) {
  !useInRouterContext() ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, // TODO: This error is probably because they somehow have 2 versions of the
  // router loaded. We can help them understand how to avoid that.
  "useMatch() may be used only in the context of a <Router> component.") : 0 : void 0;
  let {
    pathname
  } = useLocation();
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.matchPath)(pattern, pathname), [pathname, pattern]);
}
/**
 * The interface for the navigate() function returned from useNavigate().
 */

const navigateEffectWarning = "You should call navigate() in a React.useEffect(), not when " + "your component is first rendered."; // Mute warnings for calls to useNavigate in SSR environments

function useIsomorphicLayoutEffect(cb) {
  let isStatic = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext).static;

  if (!isStatic) {
    // We should be able to get rid of this once react 18.3 is released
    // See: https://github.com/facebook/react/pull/26395
    // eslint-disable-next-line react-hooks/rules-of-hooks
    react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(cb);
  }
}
/**
 * Returns an imperative method for changing the location. Used by <Link>s, but
 * may also be used by other elements to change the location.
 *
 * @see https://reactrouter.com/hooks/use-navigate
 */


function useNavigate() {
  let {
    isDataRoute
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext); // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks

  return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}

function useNavigateUnstable() {
  !useInRouterContext() ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, // TODO: This error is probably because they somehow have 2 versions of the
  // router loaded. We can help them understand how to avoid that.
  "useNavigate() may be used only in the context of a <Router> component.") : 0 : void 0;
  let {
    basename,
    navigator
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
  let {
    matches
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify((0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_getPathContributingMatches)(matches).map(match => match.pathnameBase));
  let activeRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(function (to, options) {
    if (options === void 0) {
      options = {};
    }

     true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(activeRef.current, navigateEffectWarning) : 0; // Short circuit here since if this happens on first render the navigate
    // is useless because we haven't wired up our history listener yet

    if (!activeRef.current) return;

    if (typeof to === "number") {
      navigator.go(to);
      return;
    }

    let path = (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.resolveTo)(to, JSON.parse(routePathnamesJson), locationPathname, options.relative === "path"); // If we're operating within a basename, prepend it to the pathname prior
    // to handing off to history.  If this is a root navigation, then we
    // navigate to the raw basename which allows the basename to have full
    // control over the presence of a trailing slash on root links

    if (basename !== "/") {
      path.pathname = path.pathname === "/" ? basename : (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.joinPaths)([basename, path.pathname]);
    }

    (!!options.replace ? navigator.replace : navigator.push)(path, options.state, options);
  }, [basename, navigator, routePathnamesJson, locationPathname]);
  return navigate;
}

const OutletContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
/**
 * Returns the context (if provided) for the child route at this level of the route
 * hierarchy.
 * @see https://reactrouter.com/hooks/use-outlet-context
 */

function useOutletContext() {
  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(OutletContext);
}
/**
 * Returns the element for the child route at this level of the route
 * hierarchy. Used internally by <Outlet> to render child routes.
 *
 * @see https://reactrouter.com/hooks/use-outlet
 */

function useOutlet(context) {
  let outlet = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext).outlet;

  if (outlet) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(OutletContext.Provider, {
      value: context
    }, outlet);
  }

  return outlet;
}
/**
 * Returns an object of key/value pairs of the dynamic params from the current
 * URL that were matched by the route path.
 *
 * @see https://reactrouter.com/hooks/use-params
 */

function useParams() {
  let {
    matches
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  let routeMatch = matches[matches.length - 1];
  return routeMatch ? routeMatch.params : {};
}
/**
 * Resolves the pathname of the given `to` value against the current location.
 *
 * @see https://reactrouter.com/hooks/use-resolved-path
 */

function useResolvedPath(to, _temp2) {
  let {
    relative
  } = _temp2 === void 0 ? {} : _temp2;
  let {
    matches
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify((0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_getPathContributingMatches)(matches).map(match => match.pathnameBase));
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.resolveTo)(to, JSON.parse(routePathnamesJson), locationPathname, relative === "path"), [to, routePathnamesJson, locationPathname, relative]);
}
/**
 * Returns the element of the route that matched the current location, prepared
 * with the correct context to render the remainder of the route tree. Route
 * elements in the tree must render an <Outlet> to render their child route's
 * element.
 *
 * @see https://reactrouter.com/hooks/use-routes
 */

function useRoutes(routes, locationArg) {
  return useRoutesImpl(routes, locationArg);
} // Internal implementation with accept optional param for RouterProvider usage

function useRoutesImpl(routes, locationArg, dataRouterState) {
  !useInRouterContext() ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, // TODO: This error is probably because they somehow have 2 versions of the
  // router loaded. We can help them understand how to avoid that.
  "useRoutes() may be used only in the context of a <Router> component.") : 0 : void 0;
  let {
    navigator
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
  let {
    matches: parentMatches
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  let routeMatch = parentMatches[parentMatches.length - 1];
  let parentParams = routeMatch ? routeMatch.params : {};
  let parentPathname = routeMatch ? routeMatch.pathname : "/";
  let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
  let parentRoute = routeMatch && routeMatch.route;

  if (true) {
    // You won't get a warning about 2 different <Routes> under a <Route>
    // without a trailing *, but this is a best-effort warning anyway since we
    // cannot even give the warning unless they land at the parent route.
    //
    // Example:
    //
    // <Routes>
    //   {/* This route path MUST end with /* because otherwise
    //       it will never match /blog/post/123 */}
    //   <Route path="blog" element={<Blog />} />
    //   <Route path="blog/feed" element={<BlogFeed />} />
    // </Routes>
    //
    // function Blog() {
    //   return (
    //     <Routes>
    //       <Route path="post/:id" element={<Post />} />
    //     </Routes>
    //   );
    // }
    let parentPath = parentRoute && parentRoute.path || "";
    warningOnce(parentPathname, !parentRoute || parentPath.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ("\"" + parentPathname + "\" (under <Route path=\"" + parentPath + "\">) but the ") + "parent route path has no trailing \"*\". This means if you navigate " + "deeper, the parent won't match anymore and therefore the child " + "routes will never render.\n\n" + ("Please change the parent <Route path=\"" + parentPath + "\"> to <Route ") + ("path=\"" + (parentPath === "/" ? "*" : parentPath + "/*") + "\">."));
  }

  let locationFromContext = useLocation();
  let location;

  if (locationArg) {
    var _parsedLocationArg$pa;

    let parsedLocationArg = typeof locationArg === "string" ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.parsePath)(locationArg) : locationArg;
    !(parentPathnameBase === "/" || ((_parsedLocationArg$pa = parsedLocationArg.pathname) == null ? void 0 : _parsedLocationArg$pa.startsWith(parentPathnameBase))) ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, " + "the location pathname must begin with the portion of the URL pathname that was " + ("matched by all parent routes. The current pathname base is \"" + parentPathnameBase + "\" ") + ("but pathname \"" + parsedLocationArg.pathname + "\" was given in the `location` prop.")) : 0 : void 0;
    location = parsedLocationArg;
  } else {
    location = locationFromContext;
  }

  let pathname = location.pathname || "/";
  let remainingPathname = parentPathnameBase === "/" ? pathname : pathname.slice(parentPathnameBase.length) || "/";
  let matches = (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.matchRoutes)(routes, {
    pathname: remainingPathname
  });

  if (true) {
     true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(parentRoute || matches != null, "No routes matched location \"" + location.pathname + location.search + location.hash + "\" ") : 0;
     true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(matches == null || matches[matches.length - 1].route.element !== undefined || matches[matches.length - 1].route.Component !== undefined, "Matched leaf route at location \"" + location.pathname + location.search + location.hash + "\" " + "does not have an element or Component. This means it will render an <Outlet /> with a " + "null value by default resulting in an \"empty\" page.") : 0;
  }

  let renderedMatches = _renderMatches(matches && matches.map(match => Object.assign({}, match, {
    params: Object.assign({}, parentParams, match.params),
    pathname: (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.joinPaths)([parentPathnameBase, // Re-encode pathnames that were decoded inside matchRoutes
    navigator.encodeLocation ? navigator.encodeLocation(match.pathname).pathname : match.pathname]),
    pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.joinPaths)([parentPathnameBase, // Re-encode pathnames that were decoded inside matchRoutes
    navigator.encodeLocation ? navigator.encodeLocation(match.pathnameBase).pathname : match.pathnameBase])
  })), parentMatches, dataRouterState); // When a user passes in a `locationArg`, the associated routes need to
  // be wrapped in a new `LocationContext.Provider` in order for `useLocation`
  // to use the scoped location instead of the global location.


  if (locationArg && renderedMatches) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(LocationContext.Provider, {
      value: {
        location: _extends({
          pathname: "/",
          search: "",
          hash: "",
          state: null,
          key: "default"
        }, location),
        navigationType: _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.Action.Pop
      }
    }, renderedMatches);
  }

  return renderedMatches;
}

function DefaultErrorComponent() {
  let error = useRouteError();
  let message = (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.isRouteErrorResponse)(error) ? error.status + " " + error.statusText : error instanceof Error ? error.message : JSON.stringify(error);
  let stack = error instanceof Error ? error.stack : null;
  let lightgrey = "rgba(200,200,200, 0.5)";
  let preStyles = {
    padding: "0.5rem",
    backgroundColor: lightgrey
  };
  let codeStyles = {
    padding: "2px 4px",
    backgroundColor: lightgrey
  };
  let devInfo = null;

  if (true) {
    console.error("Error handled by React Router default ErrorBoundary:", error);
    devInfo = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "\uD83D\uDCBF Hey developer \uD83D\uDC4B"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("code", {
      style: codeStyles
    }, "ErrorBoundary"), " or", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("code", {
      style: codeStyles
    }, "errorElement"), " prop on your route."));
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", null, "Unexpected Application Error!"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, message), stack ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("pre", {
    style: preStyles
  }, stack) : null, devInfo);
}

const defaultErrorElement = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(DefaultErrorComponent, null);
class RenderErrorBoundary extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
      revalidation: props.revalidation,
      error: props.error
    };
  }

  static getDerivedStateFromError(error) {
    return {
      error: error
    };
  }

  static getDerivedStateFromProps(props, state) {
    // When we get into an error state, the user will likely click "back" to the
    // previous page that didn't have an error. Because this wraps the entire
    // application, that will have no effect--the error page continues to display.
    // This gives us a mechanism to recover from the error when the location changes.
    //
    // Whether we're in an error state or not, we update the location in state
    // so that when we are in an error state, it gets reset when a new location
    // comes in and the user recovers from the error.
    if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") {
      return {
        error: props.error,
        location: props.location,
        revalidation: props.revalidation
      };
    } // If we're not changing locations, preserve the location but still surface
    // any new errors that may come through. We retain the existing error, we do
    // this because the error provided from the app state may be cleared without
    // the location changing.


    return {
      error: props.error || state.error,
      location: state.location,
      revalidation: props.revalidation || state.revalidation
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React Router caught the following error during render", error, errorInfo);
  }

  render() {
    return this.state.error ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(RouteContext.Provider, {
      value: this.props.routeContext
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(RouteErrorContext.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }

}

function RenderedRoute(_ref) {
  let {
    routeContext,
    match,
    children
  } = _ref;
  let dataRouterContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterContext); // Track how deep we got in our render pass to emulate SSR componentDidCatch
  // in a DataStaticRouter

  if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) {
    dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(RouteContext.Provider, {
    value: routeContext
  }, children);
}

function _renderMatches(matches, parentMatches, dataRouterState) {
  var _dataRouterState2;

  if (parentMatches === void 0) {
    parentMatches = [];
  }

  if (dataRouterState === void 0) {
    dataRouterState = null;
  }

  if (matches == null) {
    var _dataRouterState;

    if ((_dataRouterState = dataRouterState) != null && _dataRouterState.errors) {
      // Don't bail if we have data router errors so we can render them in the
      // boundary.  Use the pre-matched (or shimmed) matches
      matches = dataRouterState.matches;
    } else {
      return null;
    }
  }

  let renderedMatches = matches; // If we have data errors, trim matches to the highest error boundary

  let errors = (_dataRouterState2 = dataRouterState) == null ? void 0 : _dataRouterState2.errors;

  if (errors != null) {
    let errorIndex = renderedMatches.findIndex(m => m.route.id && (errors == null ? void 0 : errors[m.route.id]));
    !(errorIndex >= 0) ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, "Could not find a matching route for errors on route IDs: " + Object.keys(errors).join(",")) : 0 : void 0;
    renderedMatches = renderedMatches.slice(0, Math.min(renderedMatches.length, errorIndex + 1));
  }

  return renderedMatches.reduceRight((outlet, match, index) => {
    let error = match.route.id ? errors == null ? void 0 : errors[match.route.id] : null; // Only data routers handle errors

    let errorElement = null;

    if (dataRouterState) {
      errorElement = match.route.errorElement || defaultErrorElement;
    }

    let matches = parentMatches.concat(renderedMatches.slice(0, index + 1));

    let getChildren = () => {
      let children;

      if (error) {
        children = errorElement;
      } else if (match.route.Component) {
        // Note: This is a de-optimized path since React won't re-use the
        // ReactElement since it's identity changes with each new
        // React.createElement call.  We keep this so folks can use
        // `<Route Component={...}>` in `<Routes>` but generally `Component`
        // usage is only advised in `RouterProvider` when we can convert it to
        // `element` ahead of time.
        children = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(match.route.Component, null);
      } else if (match.route.element) {
        children = match.route.element;
      } else {
        children = outlet;
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(RenderedRoute, {
        match: match,
        routeContext: {
          outlet,
          matches,
          isDataRoute: dataRouterState != null
        },
        children: children
      });
    }; // Only wrap in an error boundary within data router usages when we have an
    // ErrorBoundary/errorElement on this route.  Otherwise let it bubble up to
    // an ancestor ErrorBoundary/errorElement


    return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index === 0) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(RenderErrorBoundary, {
      location: dataRouterState.location,
      revalidation: dataRouterState.revalidation,
      component: errorElement,
      error: error,
      children: getChildren(),
      routeContext: {
        outlet: null,
        matches,
        isDataRoute: true
      }
    }) : getChildren();
  }, null);
}
var DataRouterHook;

(function (DataRouterHook) {
  DataRouterHook["UseBlocker"] = "useBlocker";
  DataRouterHook["UseRevalidator"] = "useRevalidator";
  DataRouterHook["UseNavigateStable"] = "useNavigate";
})(DataRouterHook || (DataRouterHook = {}));

var DataRouterStateHook;

(function (DataRouterStateHook) {
  DataRouterStateHook["UseBlocker"] = "useBlocker";
  DataRouterStateHook["UseLoaderData"] = "useLoaderData";
  DataRouterStateHook["UseActionData"] = "useActionData";
  DataRouterStateHook["UseRouteError"] = "useRouteError";
  DataRouterStateHook["UseNavigation"] = "useNavigation";
  DataRouterStateHook["UseRouteLoaderData"] = "useRouteLoaderData";
  DataRouterStateHook["UseMatches"] = "useMatches";
  DataRouterStateHook["UseRevalidator"] = "useRevalidator";
  DataRouterStateHook["UseNavigateStable"] = "useNavigate";
  DataRouterStateHook["UseRouteId"] = "useRouteId";
})(DataRouterStateHook || (DataRouterStateHook = {}));

function getDataRouterConsoleError(hookName) {
  return hookName + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}

function useDataRouterContext(hookName) {
  let ctx = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterContext);
  !ctx ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, getDataRouterConsoleError(hookName)) : 0 : void 0;
  return ctx;
}

function useDataRouterState(hookName) {
  let state = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterStateContext);
  !state ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, getDataRouterConsoleError(hookName)) : 0 : void 0;
  return state;
}

function useRouteContext(hookName) {
  let route = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  !route ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, getDataRouterConsoleError(hookName)) : 0 : void 0;
  return route;
} // Internal version with hookName-aware debugging


function useCurrentRouteId(hookName) {
  let route = useRouteContext(hookName);
  let thisRoute = route.matches[route.matches.length - 1];
  !thisRoute.route.id ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, hookName + " can only be used on routes that contain a unique \"id\"") : 0 : void 0;
  return thisRoute.route.id;
}
/**
 * Returns the ID for the nearest contextual route
 */


function useRouteId() {
  return useCurrentRouteId(DataRouterStateHook.UseRouteId);
}
/**
 * Returns the current navigation, defaulting to an "idle" navigation when
 * no navigation is in progress
 */

function useNavigation() {
  let state = useDataRouterState(DataRouterStateHook.UseNavigation);
  return state.navigation;
}
/**
 * Returns a revalidate function for manually triggering revalidation, as well
 * as the current state of any manual revalidations
 */

function useRevalidator() {
  let dataRouterContext = useDataRouterContext(DataRouterHook.UseRevalidator);
  let state = useDataRouterState(DataRouterStateHook.UseRevalidator);
  return {
    revalidate: dataRouterContext.router.revalidate,
    state: state.revalidation
  };
}
/**
 * Returns the active route matches, useful for accessing loaderData for
 * parent/child routes or the route "handle" property
 */

function useMatches() {
  let {
    matches,
    loaderData
  } = useDataRouterState(DataRouterStateHook.UseMatches);
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => matches.map(match => {
    let {
      pathname,
      params
    } = match; // Note: This structure matches that created by createUseMatchesMatch
    // in the @remix-run/router , so if you change this please also change
    // that :)  Eventually we'll DRY this up

    return {
      id: match.route.id,
      pathname,
      params,
      data: loaderData[match.route.id],
      handle: match.route.handle
    };
  }), [matches, loaderData]);
}
/**
 * Returns the loader data for the nearest ancestor Route loader
 */

function useLoaderData() {
  let state = useDataRouterState(DataRouterStateHook.UseLoaderData);
  let routeId = useCurrentRouteId(DataRouterStateHook.UseLoaderData);

  if (state.errors && state.errors[routeId] != null) {
    console.error("You cannot `useLoaderData` in an errorElement (routeId: " + routeId + ")");
    return undefined;
  }

  return state.loaderData[routeId];
}
/**
 * Returns the loaderData for the given routeId
 */

function useRouteLoaderData(routeId) {
  let state = useDataRouterState(DataRouterStateHook.UseRouteLoaderData);
  return state.loaderData[routeId];
}
/**
 * Returns the action data for the nearest ancestor Route action
 */

function useActionData() {
  let state = useDataRouterState(DataRouterStateHook.UseActionData);
  let route = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  !route ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, "useActionData must be used inside a RouteContext") : 0 : void 0;
  return Object.values((state == null ? void 0 : state.actionData) || {})[0];
}
/**
 * Returns the nearest ancestor Route error, which could be a loader/action
 * error or a render error.  This is intended to be called from your
 * ErrorBoundary/errorElement to display a proper error message.
 */

function useRouteError() {
  var _state$errors;

  let error = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteErrorContext);
  let state = useDataRouterState(DataRouterStateHook.UseRouteError);
  let routeId = useCurrentRouteId(DataRouterStateHook.UseRouteError); // If this was a render error, we put it in a RouteError context inside
  // of RenderErrorBoundary

  if (error) {
    return error;
  } // Otherwise look for errors from our data router state


  return (_state$errors = state.errors) == null ? void 0 : _state$errors[routeId];
}
/**
 * Returns the happy-path data from the nearest ancestor <Await /> value
 */

function useAsyncValue() {
  let value = react__WEBPACK_IMPORTED_MODULE_0__.useContext(AwaitContext);
  return value == null ? void 0 : value._data;
}
/**
 * Returns the error from the nearest ancestor <Await /> value
 */

function useAsyncError() {
  let value = react__WEBPACK_IMPORTED_MODULE_0__.useContext(AwaitContext);
  return value == null ? void 0 : value._error;
}
let blockerId = 0;
/**
 * Allow the application to block navigations within the SPA and present the
 * user a confirmation dialog to confirm the navigation.  Mostly used to avoid
 * using half-filled form data.  This does not handle hard-reloads or
 * cross-origin navigations.
 */

function useBlocker(shouldBlock) {
  let {
    router
  } = useDataRouterContext(DataRouterHook.UseBlocker);
  let state = useDataRouterState(DataRouterStateHook.UseBlocker);
  let [blockerKey] = react__WEBPACK_IMPORTED_MODULE_0__.useState(() => String(++blockerId));
  let blockerFunction = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(args => {
    return typeof shouldBlock === "function" ? !!shouldBlock(args) : !!shouldBlock;
  }, [shouldBlock]);
  let blocker = router.getBlocker(blockerKey, blockerFunction); // Cleanup on unmount

  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => () => router.deleteBlocker(blockerKey), [router, blockerKey]); // Prefer the blocker from state since DataRouterContext is memoized so this
  // ensures we update on blocker state updates

  return state.blockers.get(blockerKey) || blocker;
}
/**
 * Stable version of useNavigate that is used when we are in the context of
 * a RouterProvider.
 */

function useNavigateStable() {
  let {
    router
  } = useDataRouterContext(DataRouterHook.UseNavigateStable);
  let id = useCurrentRouteId(DataRouterStateHook.UseNavigateStable);
  let activeRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(function (to, options) {
    if (options === void 0) {
      options = {};
    }

     true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(activeRef.current, navigateEffectWarning) : 0; // Short circuit here since if this happens on first render the navigate
    // is useless because we haven't wired up our router subscriber yet

    if (!activeRef.current) return;

    if (typeof to === "number") {
      router.navigate(to);
    } else {
      router.navigate(to, _extends({
        fromRouteId: id
      }, options));
    }
  }, [router, id]);
  return navigate;
}

const alreadyWarned = {};

function warningOnce(key, cond, message) {
  if (!cond && !alreadyWarned[key]) {
    alreadyWarned[key] = true;
     true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(false, message) : 0;
  }
}

/**
 * Given a Remix Router instance, render the appropriate UI
 */
function RouterProvider(_ref) {
  let {
    fallbackElement,
    router
  } = _ref;
  // Need to use a layout effect here so we are subscribed early enough to
  // pick up on any render-driven redirects/navigations (useEffect/<Navigate>)
  let [state, setState] = react__WEBPACK_IMPORTED_MODULE_0__.useState(router.state);
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => router.subscribe(setState), [router, setState]);
  let navigator = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    return {
      createHref: router.createHref,
      encodeLocation: router.encodeLocation,
      go: n => router.navigate(n),
      push: (to, state, opts) => router.navigate(to, {
        state,
        preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
      }),
      replace: (to, state, opts) => router.navigate(to, {
        replace: true,
        state,
        preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
      })
    };
  }, [router]);
  let basename = router.basename || "/";
  let dataRouterContext = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
    router,
    navigator,
    static: false,
    basename
  }), [router, navigator, basename]); // The fragment and {null} here are important!  We need them to keep React 18's
  // useId happy when we are server-rendering since we may have a <script> here
  // containing the hydrated server-side staticContext (from StaticRouterProvider).
  // useId relies on the component tree structure to generate deterministic id's
  // so we need to ensure it remains the same on the client even though
  // we don't need the <script> tag

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(DataRouterContext.Provider, {
    value: dataRouterContext
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(DataRouterStateContext.Provider, {
    value: state
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Router, {
    basename: router.basename,
    location: router.state.location,
    navigationType: router.state.historyAction,
    navigator: navigator
  }, router.state.initialized ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(DataRoutes, {
    routes: router.routes,
    state: state
  }) : fallbackElement))), null);
}

function DataRoutes(_ref2) {
  let {
    routes,
    state
  } = _ref2;
  return useRoutesImpl(routes, undefined, state);
}

/**
 * A <Router> that stores all entries in memory.
 *
 * @see https://reactrouter.com/router-components/memory-router
 */
function MemoryRouter(_ref3) {
  let {
    basename,
    children,
    initialEntries,
    initialIndex
  } = _ref3;
  let historyRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef();

  if (historyRef.current == null) {
    historyRef.current = (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.createMemoryHistory)({
      initialEntries,
      initialIndex,
      v5Compat: true
    });
  }

  let history = historyRef.current;
  let [state, setState] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    action: history.action,
    location: history.location
  });
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => history.listen(setState), [history]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Router, {
    basename: basename,
    children: children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}

/**
 * Changes the current location.
 *
 * Note: This API is mostly useful in React.Component subclasses that are not
 * able to use hooks. In functional components, we recommend you use the
 * `useNavigate` hook instead.
 *
 * @see https://reactrouter.com/components/navigate
 */
function Navigate(_ref4) {
  let {
    to,
    replace,
    state,
    relative
  } = _ref4;
  !useInRouterContext() ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, // TODO: This error is probably because they somehow have 2 versions of
  // the router loaded. We can help them understand how to avoid that.
  "<Navigate> may be used only in the context of a <Router> component.") : 0 : void 0;
   true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(!react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext).static, "<Navigate> must not be used on the initial render in a <StaticRouter>. " + "This is a no-op, but you should modify your code so the <Navigate> is " + "only ever rendered in response to some user interaction or state change.") : 0;
  let {
    matches
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let navigate = useNavigate(); // Resolve the path outside of the effect so that when effects run twice in
  // StrictMode they navigate to the same place

  let path = (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.resolveTo)(to, (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_getPathContributingMatches)(matches).map(match => match.pathnameBase), locationPathname, relative === "path");
  let jsonPath = JSON.stringify(path);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => navigate(JSON.parse(jsonPath), {
    replace,
    state,
    relative
  }), [navigate, jsonPath, relative, replace, state]);
  return null;
}

/**
 * Renders the child route's element, if there is one.
 *
 * @see https://reactrouter.com/components/outlet
 */
function Outlet(props) {
  return useOutlet(props.context);
}

/**
 * Declares an element that should be rendered at a certain URL path.
 *
 * @see https://reactrouter.com/components/route
 */
function Route(_props) {
   true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, "A <Route> is only ever to be used as the child of <Routes> element, " + "never rendered directly. Please wrap your <Route> in a <Routes>.") : 0 ;
}

/**
 * Provides location context for the rest of the app.
 *
 * Note: You usually won't render a <Router> directly. Instead, you'll render a
 * router that is more specific to your environment such as a <BrowserRouter>
 * in web browsers or a <StaticRouter> for server rendering.
 *
 * @see https://reactrouter.com/router-components/router
 */
function Router(_ref5) {
  let {
    basename: basenameProp = "/",
    children = null,
    location: locationProp,
    navigationType = _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.Action.Pop,
    navigator,
    static: staticProp = false
  } = _ref5;
  !!useInRouterContext() ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, "You cannot render a <Router> inside another <Router>." + " You should never have more than one in your app.") : 0 : void 0; // Preserve trailing slashes on basename, so we can let the user control
  // the enforcement of trailing slashes throughout the app

  let basename = basenameProp.replace(/^\/*/, "/");
  let navigationContext = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
    basename,
    navigator,
    static: staticProp
  }), [basename, navigator, staticProp]);

  if (typeof locationProp === "string") {
    locationProp = (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.parsePath)(locationProp);
  }

  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default"
  } = locationProp;
  let locationContext = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    let trailingPathname = (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.stripBasename)(pathname, basename);

    if (trailingPathname == null) {
      return null;
    }

    return {
      location: {
        pathname: trailingPathname,
        search,
        hash,
        state,
        key
      },
      navigationType
    };
  }, [basename, pathname, search, hash, state, key, navigationType]);
   true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(locationContext != null, "<Router basename=\"" + basename + "\"> is not able to match the URL " + ("\"" + pathname + search + hash + "\" because it does not start with the ") + "basename, so the <Router> won't render anything.") : 0;

  if (locationContext == null) {
    return null;
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(NavigationContext.Provider, {
    value: navigationContext
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(LocationContext.Provider, {
    children: children,
    value: locationContext
  }));
}

/**
 * A container for a nested tree of <Route> elements that renders the branch
 * that best matches the current location.
 *
 * @see https://reactrouter.com/components/routes
 */
function Routes(_ref6) {
  let {
    children,
    location
  } = _ref6;
  return useRoutes(createRoutesFromChildren(children), location);
}

/**
 * Component to use for rendering lazily loaded data from returning defer()
 * in a loader function
 */
function Await(_ref7) {
  let {
    children,
    errorElement,
    resolve
  } = _ref7;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(AwaitErrorBoundary, {
    resolve: resolve,
    errorElement: errorElement
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ResolveAwait, null, children));
}
var AwaitRenderStatus;

(function (AwaitRenderStatus) {
  AwaitRenderStatus[AwaitRenderStatus["pending"] = 0] = "pending";
  AwaitRenderStatus[AwaitRenderStatus["success"] = 1] = "success";
  AwaitRenderStatus[AwaitRenderStatus["error"] = 2] = "error";
})(AwaitRenderStatus || (AwaitRenderStatus = {}));

const neverSettledPromise = new Promise(() => {});

class AwaitErrorBoundary extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  static getDerivedStateFromError(error) {
    return {
      error
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("<Await> caught the following error during render", error, errorInfo);
  }

  render() {
    let {
      children,
      errorElement,
      resolve
    } = this.props;
    let promise = null;
    let status = AwaitRenderStatus.pending;

    if (!(resolve instanceof Promise)) {
      // Didn't get a promise - provide as a resolved promise
      status = AwaitRenderStatus.success;
      promise = Promise.resolve();
      Object.defineProperty(promise, "_tracked", {
        get: () => true
      });
      Object.defineProperty(promise, "_data", {
        get: () => resolve
      });
    } else if (this.state.error) {
      // Caught a render error, provide it as a rejected promise
      status = AwaitRenderStatus.error;
      let renderError = this.state.error;
      promise = Promise.reject().catch(() => {}); // Avoid unhandled rejection warnings

      Object.defineProperty(promise, "_tracked", {
        get: () => true
      });
      Object.defineProperty(promise, "_error", {
        get: () => renderError
      });
    } else if (resolve._tracked) {
      // Already tracked promise - check contents
      promise = resolve;
      status = promise._error !== undefined ? AwaitRenderStatus.error : promise._data !== undefined ? AwaitRenderStatus.success : AwaitRenderStatus.pending;
    } else {
      // Raw (untracked) promise - track it
      status = AwaitRenderStatus.pending;
      Object.defineProperty(resolve, "_tracked", {
        get: () => true
      });
      promise = resolve.then(data => Object.defineProperty(resolve, "_data", {
        get: () => data
      }), error => Object.defineProperty(resolve, "_error", {
        get: () => error
      }));
    }

    if (status === AwaitRenderStatus.error && promise._error instanceof _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.AbortedDeferredError) {
      // Freeze the UI by throwing a never resolved promise
      throw neverSettledPromise;
    }

    if (status === AwaitRenderStatus.error && !errorElement) {
      // No errorElement, throw to the nearest route-level error boundary
      throw promise._error;
    }

    if (status === AwaitRenderStatus.error) {
      // Render via our errorElement
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(AwaitContext.Provider, {
        value: promise,
        children: errorElement
      });
    }

    if (status === AwaitRenderStatus.success) {
      // Render children with resolved value
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(AwaitContext.Provider, {
        value: promise,
        children: children
      });
    } // Throw to the suspense boundary


    throw promise;
  }

}
/**
 * @private
 * Indirection to leverage useAsyncValue for a render-prop API on <Await>
 */


function ResolveAwait(_ref8) {
  let {
    children
  } = _ref8;
  let data = useAsyncValue();
  let toRender = typeof children === "function" ? children(data) : children;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, toRender);
} ///////////////////////////////////////////////////////////////////////////////
// UTILS
///////////////////////////////////////////////////////////////////////////////

/**
 * Creates a route config from a React "children" object, which is usually
 * either a `<Route>` element or an array of them. Used internally by
 * `<Routes>` to create a route config from its children.
 *
 * @see https://reactrouter.com/utils/create-routes-from-children
 */


function createRoutesFromChildren(children, parentPath) {
  if (parentPath === void 0) {
    parentPath = [];
  }

  let routes = [];
  react__WEBPACK_IMPORTED_MODULE_0__.Children.forEach(children, (element, index) => {
    if (! /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(element)) {
      // Ignore non-elements. This allows people to more easily inline
      // conditionals in their route config.
      return;
    }

    let treePath = [...parentPath, index];

    if (element.type === react__WEBPACK_IMPORTED_MODULE_0__.Fragment) {
      // Transparently support React.Fragment and its children.
      routes.push.apply(routes, createRoutesFromChildren(element.props.children, treePath));
      return;
    }

    !(element.type === Route) ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, "[" + (typeof element.type === "string" ? element.type : element.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>") : 0 : void 0;
    !(!element.props.index || !element.props.children) ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, "An index route cannot have child routes.") : 0 : void 0;
    let route = {
      id: element.props.id || treePath.join("-"),
      caseSensitive: element.props.caseSensitive,
      element: element.props.element,
      Component: element.props.Component,
      index: element.props.index,
      path: element.props.path,
      loader: element.props.loader,
      action: element.props.action,
      errorElement: element.props.errorElement,
      ErrorBoundary: element.props.ErrorBoundary,
      hasErrorBoundary: element.props.ErrorBoundary != null || element.props.errorElement != null,
      shouldRevalidate: element.props.shouldRevalidate,
      handle: element.props.handle,
      lazy: element.props.lazy
    };

    if (element.props.children) {
      route.children = createRoutesFromChildren(element.props.children, treePath);
    }

    routes.push(route);
  });
  return routes;
}
/**
 * Renders the result of `matchRoutes()` into a React element.
 */

function renderMatches(matches) {
  return _renderMatches(matches);
}

function mapRouteProperties(route) {
  let updates = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: route.ErrorBoundary != null || route.errorElement != null
  };

  if (route.Component) {
    if (true) {
      if (route.element) {
         true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(false, "You should not include both `Component` and `element` on your route - " + "`Component` will be used.") : 0;
      }
    }

    Object.assign(updates, {
      element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(route.Component),
      Component: undefined
    });
  }

  if (route.ErrorBoundary) {
    if (true) {
      if (route.errorElement) {
         true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(false, "You should not include both `ErrorBoundary` and `errorElement` on your route - " + "`ErrorBoundary` will be used.") : 0;
      }
    }

    Object.assign(updates, {
      errorElement: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(route.ErrorBoundary),
      ErrorBoundary: undefined
    });
  }

  return updates;
}

function createMemoryRouter(routes, opts) {
  return (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.createRouter)({
    basename: opts == null ? void 0 : opts.basename,
    future: _extends({}, opts == null ? void 0 : opts.future, {
      v7_prependBasename: true
    }),
    history: (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.createMemoryHistory)({
      initialEntries: opts == null ? void 0 : opts.initialEntries,
      initialIndex: opts == null ? void 0 : opts.initialIndex
    }),
    hydrationData: opts == null ? void 0 : opts.hydrationData,
    routes,
    mapRouteProperties
  }).initialize();
} ///////////////////////////////////////////////////////////////////////////////


//# sourceMappingURL=index.js.map


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = window["lodash"];

/***/ }),

/***/ "@wordpress/a11y":
/*!******************************!*\
  !*** external ["wp","a11y"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["a11y"];

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/block-library":
/*!**************************************!*\
  !*** external ["wp","blockLibrary"] ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blockLibrary"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/core-data":
/*!**********************************!*\
  !*** external ["wp","coreData"] ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["coreData"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/data-controls":
/*!**************************************!*\
  !*** external ["wp","dataControls"] ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["dataControls"];

/***/ }),

/***/ "@wordpress/deprecated":
/*!************************************!*\
  !*** external ["wp","deprecated"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["deprecated"];

/***/ }),

/***/ "@wordpress/dom":
/*!*****************************!*\
  !*** external ["wp","dom"] ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["dom"];

/***/ }),

/***/ "@wordpress/dom-ready":
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["domReady"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/keycodes":
/*!**********************************!*\
  !*** external ["wp","keycodes"] ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["keycodes"];

/***/ }),

/***/ "@wordpress/plugins":
/*!*********************************!*\
  !*** external ["wp","plugins"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["plugins"];

/***/ }),

/***/ "@wordpress/preferences":
/*!*************************************!*\
  !*** external ["wp","preferences"] ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["preferences"];

/***/ }),

/***/ "@wordpress/primitives":
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["primitives"];

/***/ }),

/***/ "@wordpress/style-engine":
/*!*************************************!*\
  !*** external ["wp","styleEngine"] ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["styleEngine"];

/***/ }),

/***/ "@wordpress/url":
/*!*****************************!*\
  !*** external ["wp","url"] ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["url"];

/***/ }),

/***/ "@wordpress/viewport":
/*!**********************************!*\
  !*** external ["wp","viewport"] ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["viewport"];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _extends)
/* harmony export */ });
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "newfold.Onboarding:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"onboarding": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunknewfold_Onboarding"] = globalThis["webpackChunknewfold_Onboarding"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!***************************!*\
  !*** ./src/onboarding.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webpack_public_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./webpack-public-path */ "./src/webpack-public-path.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_library__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-library */ "@wordpress/block-library");
/* harmony import */ var _wordpress_block_library__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_library__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _OnboardingSPA__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./OnboardingSPA */ "./src/OnboardingSPA/index.js");
/* harmony import */ var _newfold_labs_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @newfold-labs/js-utility-ui-analytics */ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/index.js");
/* harmony import */ var _OnboardingSPA_utils_api_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./OnboardingSPA/utils/api/common */ "./src/OnboardingSPA/utils/api/common.js");








if (_constants__WEBPACK_IMPORTED_MODULE_1__.runtimeDataExists) {
  _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2___default()(() => {
    _newfold_labs_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_5__.HiiveAnalytics.initialize({
      namespace: _constants__WEBPACK_IMPORTED_MODULE_1__.HIIVE_ANALYTICS_CATEGORY,
      urls: {
        single: (0,_OnboardingSPA_utils_api_common__WEBPACK_IMPORTED_MODULE_6__.onboardingRestURL)('events'),
        batch: (0,_OnboardingSPA_utils_api_common__WEBPACK_IMPORTED_MODULE_6__.onboardingRestURL)('events/batch')
      },
      settings: {
        debounce: {
          time: 3000
        }
      }
    });
    (0,_OnboardingSPA__WEBPACK_IMPORTED_MODULE_4__["default"])(_constants__WEBPACK_IMPORTED_MODULE_1__.NFD_ONBOARDING_ELEMENT_ID, window.nfdOnboarding);
    (0,_wordpress_block_library__WEBPACK_IMPORTED_MODULE_3__.registerCoreBlocks)();
  });
} else {
  /* eslint-disable no-console */
  console.log('Cannot find Newfold Onboarding runtime data to set __webpack_public_path__.');
}
})();

((window.newfold = window.newfold || {}).Onboarding = window.newfold.Onboarding || {}).onboarding = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=onboarding.js.map