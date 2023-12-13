"use strict";
(globalThis["webpackChunknewfold_Onboarding"] = globalThis["webpackChunknewfold_Onboarding"] || []).push([["src_OnboardingSPA_steps_GetStarted_Welcome_index_js"],{

/***/ "./node_modules/@wordpress/icons/build-module/library/external.js":
/*!************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/external.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

const external = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M18.2 17c0 .7-.6 1.2-1.2 1.2H7c-.7 0-1.2-.6-1.2-1.2V7c0-.7.6-1.2 1.2-1.2h3.2V4.2H7C5.5 4.2 4.2 5.5 4.2 7v10c0 1.5 1.2 2.8 2.8 2.8h10c1.5 0 2.8-1.2 2.8-2.8v-3.6h-1.5V17zM14.9 3v1.5h3.7l-6.4 6.4 1.1 1.1 6.4-6.4v3.7h1.5V3h-6.3z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (external);
//# sourceMappingURL=external.js.map

/***/ }),

/***/ "./src/OnboardingSPA/components/Button/NavCardButton/index.js":
/*!********************************************************************!*\
  !*** ./src/OnboardingSPA/components/Button/NavCardButton/index.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Button */ "./src/OnboardingSPA/components/Button/index.js");
/* harmony import */ var _utils_api_flow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/api/flow */ "./src/OnboardingSPA/utils/api/flow.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.js");
/* harmony import */ var _utils_analytics_hiive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../utils/analytics/hiive */ "./src/OnboardingSPA/utils/analytics/hiive/index.js");
/* harmony import */ var _utils_analytics_hiive_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../utils/analytics/hiive/constants */ "./src/OnboardingSPA/utils/analytics/hiive/constants.js");
/* harmony import */ var _utils_api_plugins__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../utils/api/plugins */ "./src/OnboardingSPA/utils/api/plugins.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");












/**
 * Navigation Button Component on Card
 *
 * @return
 */

const NavCardButton = _ref => {
  let {
    text,
    disabled,
    className,
    icon
  } = _ref;
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_10__.useNavigate)();
  const {
    nextStep,
    currentData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    return {
      nextStep: select(_store__WEBPACK_IMPORTED_MODULE_2__.store).getNextStep(),
      currentData: select(_store__WEBPACK_IMPORTED_MODULE_2__.store).getCurrentOnboardingData()
    };
  }, []);
  const isLastStep = null === nextStep || false === nextStep;

  async function saveDataAndExit() {
    if (currentData) {
      currentData.isComplete = new Date().getTime();
      (0,_utils_api_flow__WEBPACK_IMPORTED_MODULE_4__.setFlow)(currentData);
    }

    (0,_utils_api_plugins__WEBPACK_IMPORTED_MODULE_8__.activateInitialPlugins)();
    (0,_utils_analytics_hiive__WEBPACK_IMPORTED_MODULE_6__.sendOnboardingEvent)(new _utils_analytics_hiive__WEBPACK_IMPORTED_MODULE_6__.OnboardingEvent(_utils_analytics_hiive_constants__WEBPACK_IMPORTED_MODULE_7__.ACTION_ONBOARDING_COMPLETE));
    window.location.replace(_constants__WEBPACK_IMPORTED_MODULE_5__.pluginDashboardPage);
  }

  const handleBtnClick = () => {
    return isLastStep ? saveDataAndExit() : navigate(nextStep.path);
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: classnames__WEBPACK_IMPORTED_MODULE_9___default()('nfd-nav-card-button', className),
    text: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: `${className}__text`
    }, text), icon && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_11__["default"], {
      className: `${className}__icon`,
      icon: icon
    })),
    handleClick: handleBtnClick,
    disabled: disabled
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NavCardButton);

/***/ }),

/***/ "./src/OnboardingSPA/components/Button/index.js":
/*!******************************************************!*\
  !*** ./src/OnboardingSPA/components/Button/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Common Button Component
 * Different variants can be added later based on our requirements
 *
 * @returns Button
 */
const Button = _ref => {
  let {
    text,
    handleClick,
    disabled,
    className
  } = _ref;

  const handleBtnClick = () => {
    handleClick();
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: `${className} nfd-card-button`,
    onClick: handleBtnClick,
    disabled: disabled
  }, text);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Button);

/***/ }),

/***/ "./src/OnboardingSPA/components/TabPanelHover/container.js":
/*!*****************************************************************!*\
  !*** ./src/OnboardingSPA/components/TabPanelHover/container.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/dom */ "@wordpress/dom");
/* harmony import */ var _wordpress_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom__WEBPACK_IMPORTED_MODULE_3__);


// @ts-nocheck

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */




const noop = () => {};

const MENU_ITEM_ROLES = ['menuitem', 'menuitemradio', 'menuitemcheckbox'];

function cycleValue(value, total, offset) {
  const nextValue = value + offset;

  if (nextValue < 0) {
    return total + nextValue;
  } else if (nextValue >= total) {
    return nextValue - total;
  }

  return nextValue;
}

class NavigableContainer extends _wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Component {
  constructor() {
    super(...arguments);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.bindContainer = this.bindContainer.bind(this);
    this.getFocusableContext = this.getFocusableContext.bind(this);
    this.getFocusableIndex = this.getFocusableIndex.bind(this);
  }

  componentDidMount() {
    // We use DOM event listeners instead of React event listeners
    // because we want to catch events from the underlying DOM tree
    // The React Tree can be different from the DOM tree when using
    // portals. Block Toolbars for instance are rendered in a separate
    // React Trees.
    this.container.addEventListener('keydown', this.onKeyDown);
    this.container.addEventListener('focus', this.onFocus);
  }

  componentWillUnmount() {
    this.container.removeEventListener('keydown', this.onKeyDown);
    this.container.removeEventListener('focus', this.onFocus);
  }

  bindContainer(ref) {
    const {
      forwardedRef
    } = this.props;
    this.container = ref;

    if (typeof forwardedRef === 'function') {
      forwardedRef(ref);
    } else if (forwardedRef && 'current' in forwardedRef) {
      forwardedRef.current = ref;
    }
  }

  getFocusableContext(target) {
    const {
      onlyBrowserTabstops
    } = this.props;
    const finder = onlyBrowserTabstops ? _wordpress_dom__WEBPACK_IMPORTED_MODULE_3__.focus.tabbable : _wordpress_dom__WEBPACK_IMPORTED_MODULE_3__.focus.focusable;
    const focusables = finder.find(this.container);
    const index = this.getFocusableIndex(focusables, target);

    if (index > -1 && target) {
      return {
        index,
        target,
        focusables
      };
    }

    return null;
  }

  getFocusableIndex(focusables, target) {
    const directIndex = focusables.indexOf(target);

    if (directIndex !== -1) {
      return directIndex;
    }
  }

  onKeyDown(event) {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }

    const {
      getFocusableContext
    } = this;
    const {
      cycle = true,
      eventToOffset,
      onNavigate = noop,
      stopNavigationEvents
    } = this.props;
    const offset = eventToOffset(event); // eventToOffset returns undefined if the event is not handled by the component.

    if (offset !== undefined && stopNavigationEvents) {
      // Prevents arrow key handlers bound to the document directly interfering.
      event.stopImmediatePropagation(); // When navigating a collection of items, prevent scroll containers
      // from scrolling. The preventDefault also prevents Voiceover from
      // 'handling' the event, as voiceover will try to use arrow keys
      // for highlighting text.

      const targetRole = event.target.getAttribute('role');

      if (MENU_ITEM_ROLES.includes(targetRole)) {
        event.preventDefault();
      }
    }

    if (!offset) {
      return;
    }

    const context = getFocusableContext(event.target.ownerDocument.activeElement);

    if (!context) {
      return;
    }

    const {
      index,
      focusables
    } = context;
    const nextIndex = cycle ? cycleValue(index, focusables.length, offset) : index + offset;

    if (nextIndex >= 0 && nextIndex < focusables.length) {
      focusables[nextIndex].focus();
      onNavigate(nextIndex, focusables[nextIndex]);
    }
  }

  render() {
    const {
      children,
      ...props
    } = this.props;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      ref: this.bindContainer
    }, (0,lodash__WEBPACK_IMPORTED_MODULE_2__.omit)(props, ['stopNavigationEvents', 'eventToOffset', 'onNavigate', 'onKeyDown', 'cycle', 'onlyBrowserTabstops', 'forwardedRef'])), children);
  }

}

const forwardedNavigableContainer = (props, ref) => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(NavigableContainer, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    forwardedRef: ref
  }));
};

forwardedNavigableContainer.displayName = 'NavigableContainer';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(forwardedNavigableContainer));

/***/ }),

/***/ "./src/OnboardingSPA/components/TabPanelHover/index.js":
/*!*************************************************************!*\
  !*** ./src/OnboardingSPA/components/TabPanelHover/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TabPanelHover)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _navigableContainer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./navigableContainer */ "./src/OnboardingSPA/components/TabPanelHover/navigableContainer.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__);



/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */




const noop = () => {};

const TabButton = _ref => {
  let {
    tabId,
    onClick,
    children,
    selected,
    ...rest
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Button, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    role: "tab",
    tabIndex: selected ? null : -1,
    "aria-selected": selected,
    id: tabId,
    onClick: onClick
  }, rest), children);
};

function TabPanelHover(_ref2) {
  var _selectedTab$name;

  let {
    className,
    children,
    tabs,
    initialTabName,
    orientation = 'horizontal',
    activeClass = 'is-active',
    notActiveClass = 'is-not-active',
    onSelect = noop
  } = _ref2;
  const instanceId = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_4__.useInstanceId)(TabPanelHover, 'tab-panel');
  const [selected, setSelected] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null);

  const handleMouseOver = tabKey => {
    setSelected(tabKey);
    onSelect(tabKey);
  };

  const onNavigate = (childIndex, child) => {
    child.click();
  };

  const selectedTab = (0,lodash__WEBPACK_IMPORTED_MODULE_3__.find)(tabs, {
    name: selected
  });
  const selectedId = `${instanceId}-${(_selectedTab$name = selectedTab === null || selectedTab === void 0 ? void 0 : selectedTab.name) !== null && _selectedTab$name !== void 0 ? _selectedTab$name : 'none'}`;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const newSelectedTab = (0,lodash__WEBPACK_IMPORTED_MODULE_3__.find)(tabs, {
      name: selected
    });

    if (!newSelectedTab) {
      setSelected(initialTabName || (tabs.length > 0 ? tabs[0].name : null));
    }
  }, [tabs]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: className
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_navigableContainer__WEBPACK_IMPORTED_MODULE_5__.NavigableMenu, {
    role: "tablist",
    orientation: orientation,
    onNavigate: onNavigate,
    className: "components-tab-panel__tabs"
  }, tabs.map(tab => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(TabButton, {
    className: `components-tab-panel__tabs-item ${tab.name === selected && activeClass} ${tab.name !== selected && notActiveClass}`,
    tabId: `${instanceId}-${tab.name}`,
    "aria-controls": `${instanceId}-${tab.name}-view`,
    selected: tab.name === selected,
    key: tab.name,
    onMouseOver: (0,lodash__WEBPACK_IMPORTED_MODULE_3__.partial)(handleMouseOver, tab.name)
  }, tab.title))), selectedTab && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    key: selectedId,
    "aria-labelledby": selectedId,
    role: "tabpanel",
    id: `${selectedId}-view`,
    className: "components-tab-panel__tab-content"
  }, children(selectedTab)));
}

/***/ }),

/***/ "./src/OnboardingSPA/components/TabPanelHover/menu.js":
/*!************************************************************!*\
  !*** ./src/OnboardingSPA/components/TabPanelHover/menu.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NavigableMenu": () => (/* binding */ NavigableMenu),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_keycodes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/keycodes */ "@wordpress/keycodes");
/* harmony import */ var _wordpress_keycodes__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_keycodes__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _container__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./container */ "./src/OnboardingSPA/components/TabPanelHover/container.js");


// @ts-nocheck

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */


function NavigableMenu(_ref, ref) {
  let {
    role = 'menu',
    orientation = 'vertical',
    ...rest
  } = _ref;

  const eventToOffset = evt => {
    const {
      keyCode
    } = evt;
    let next = [_wordpress_keycodes__WEBPACK_IMPORTED_MODULE_3__.DOWN];
    let previous = [_wordpress_keycodes__WEBPACK_IMPORTED_MODULE_3__.UP];

    if (orientation === 'horizontal') {
      next = [_wordpress_keycodes__WEBPACK_IMPORTED_MODULE_3__.RIGHT];
      previous = [_wordpress_keycodes__WEBPACK_IMPORTED_MODULE_3__.LEFT];
    }

    if (orientation === 'both') {
      next = [_wordpress_keycodes__WEBPACK_IMPORTED_MODULE_3__.RIGHT, _wordpress_keycodes__WEBPACK_IMPORTED_MODULE_3__.DOWN];
      previous = [_wordpress_keycodes__WEBPACK_IMPORTED_MODULE_3__.LEFT, _wordpress_keycodes__WEBPACK_IMPORTED_MODULE_3__.UP];
    }

    if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.includes)(next, keyCode)) {
      return 1;
    } else if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.includes)(previous, keyCode)) {
      return -1;
    } else if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.includes)([_wordpress_keycodes__WEBPACK_IMPORTED_MODULE_3__.DOWN, _wordpress_keycodes__WEBPACK_IMPORTED_MODULE_3__.UP, _wordpress_keycodes__WEBPACK_IMPORTED_MODULE_3__.LEFT, _wordpress_keycodes__WEBPACK_IMPORTED_MODULE_3__.RIGHT], keyCode)) {
      // Key press should be handled, e.g. have event propagation and
      // default behavior handled by NavigableContainer but not result
      // in an offset.
      return 0;
    }
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_container__WEBPACK_IMPORTED_MODULE_4__["default"], (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref,
    stopNavigationEvents: true,
    onlyBrowserTabstops: false,
    role: role,
    "aria-orientation": role === 'presentation' ? null : orientation,
    eventToOffset: eventToOffset
  }, rest));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(NavigableMenu));

/***/ }),

/***/ "./src/OnboardingSPA/components/TabPanelHover/navigableContainer.js":
/*!**************************************************************************!*\
  !*** ./src/OnboardingSPA/components/TabPanelHover/navigableContainer.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NavigableMenu": () => (/* reexport safe */ _menu__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "TabbableContainer": () => (/* reexport safe */ _tabbable__WEBPACK_IMPORTED_MODULE_1__["default"])
/* harmony export */ });
/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menu */ "./src/OnboardingSPA/components/TabPanelHover/menu.js");
/* harmony import */ var _tabbable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tabbable */ "./src/OnboardingSPA/components/TabPanelHover/tabbable.js");
// @ts-nocheck

/**
 * Internal Dependencies
 */



/***/ }),

/***/ "./src/OnboardingSPA/components/TabPanelHover/tabbable.js":
/*!****************************************************************!*\
  !*** ./src/OnboardingSPA/components/TabPanelHover/tabbable.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TabbableContainer": () => (/* binding */ TabbableContainer),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_keycodes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/keycodes */ "@wordpress/keycodes");
/* harmony import */ var _wordpress_keycodes__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_keycodes__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _container__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./container */ "./src/OnboardingSPA/components/TabPanelHover/container.js");


// @ts-nocheck

/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */


function TabbableContainer(_ref, ref) {
  let {
    eventToOffset,
    ...props
  } = _ref;

  const innerEventToOffset = evt => {
    const {
      keyCode,
      shiftKey
    } = evt;

    if (_wordpress_keycodes__WEBPACK_IMPORTED_MODULE_2__.TAB === keyCode) {
      return shiftKey ? -1 : 1;
    } // Allow custom handling of keys besides Tab.
    //
    // By default, TabbableContainer will move focus forward on Tab and
    // backward on Shift+Tab. The handler below will be used for all other
    // events. The semantics for `eventToOffset`'s return
    // values are the following:
    //
    // - +1: move focus forward
    // - -1: move focus backward
    // -  0: don't move focus, but acknowledge event and thus stop it
    // - undefined: do nothing, let the event propagate.


    if (eventToOffset) {
      return eventToOffset(evt);
    }
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_container__WEBPACK_IMPORTED_MODULE_3__["default"], (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref,
    stopNavigationEvents: true,
    onlyBrowserTabstops: true,
    eventToOffset: innerEventToOffset
  }, props));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(TabbableContainer));

/***/ }),

/***/ "./src/OnboardingSPA/components/Tab/index.js":
/*!***************************************************!*\
  !*** ./src/OnboardingSPA/components/Tab/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Animate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Animate */ "./src/OnboardingSPA/components/Animate/index.js");


/**
 * Common Tab Component
 *
 * @return Tab
 */


const Tab = _ref => {
  let {
    title,
    text,
    imgType,
    className,
    animationName
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: className
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tab-text"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, title), text), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tab-image"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tab-img"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Animate__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: animationName
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: imgType
  })))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tab);

/***/ }),

/***/ "./src/OnboardingSPA/steps/GetStarted/Welcome/contents.js":
/*!****************************************************************!*\
  !*** ./src/OnboardingSPA/steps/GetStarted/Welcome/contents.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_locales_translations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/locales/translations */ "./src/OnboardingSPA/utils/locales/translations.js");



const getContents = brandName => {
  return {
    heading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(
    /* translators: %s: website or store */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Make your %s dreams a reality!', 'wp-module-onboarding'), (0,_utils_locales_translations__WEBPACK_IMPORTED_MODULE_1__.translations)('website')),
    subheading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(
    /* translators: %s: Brand */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('with WordPress and %s.', 'wp-module-onboarding'), brandName),
    migrateButtonText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Migrate a WordPress Site', 'wp-module-onboarding'),
    startButtonText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Start Setup', 'wp-module-onboarding'),
    tabs: [{
      name: 'tab1',
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('YOUR CONTENT', 'wp-module-onboarding'),
      subtitle: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Publish boldly with WordPress Blocks.', 'wp-module-onboarding'),
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(
      /* translators: %s: site or store */
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Build a beautiful %s using a visual builder. Block Patterns accelerate telling your story or tending your store with professional designs.', 'wp-module-onboarding'), (0,_utils_locales_translations__WEBPACK_IMPORTED_MODULE_1__.translations)('site')),
      imgType: 'content-img',
      animationName: 'fade-in-right'
    }, {
      name: 'tab2',
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('POWERFUL FEATURES', 'wp-module-onboarding'),
      subtitle: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Proven, easy-to-use solutions.', 'wp-module-onboarding'),
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(
      /* translators: 1: site or store 2: Brand */
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Reach for your %1$s goals using proven WordPress Plugins & %2$s solutions. Send a newsletter, host a podcast, book clients, take payments and more.', 'wp-module-onboarding'), (0,_utils_locales_translations__WEBPACK_IMPORTED_MODULE_1__.translations)('site'), brandName),
      imgType: 'features-img',
      animationName: 'fade-in-up'
    }, {
      name: 'tab3',
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('MODERN DESIGN', 'wp-module-onboarding'),
      subtitle: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Paint trim. Move walls. No sweat.', 'wp-module-onboarding'),
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(
      /* translators: %s: site or store */
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Establish your %s's unique design. Use the WordPress Editor to refine over time with professionally-designed patterns, parts, templates, colors and type.", 'wp-module-onboarding'), (0,_utils_locales_translations__WEBPACK_IMPORTED_MODULE_1__.translations)('site')),
      imgType: 'design-img',
      animationName: 'fade-in-left'
    }]
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getContents);

/***/ }),

/***/ "./src/OnboardingSPA/steps/GetStarted/Welcome/index.js":
/*!*************************************************************!*\
  !*** ./src/OnboardingSPA/steps/GetStarted/Welcome/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/external.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/chevron-right.js");
/* harmony import */ var _components_Layouts_Common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/Layouts/Common */ "./src/OnboardingSPA/components/Layouts/Common.js");
/* harmony import */ var _components_NewfoldLargeCard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/NewfoldLargeCard */ "./src/OnboardingSPA/components/NewfoldLargeCard/index.js");
/* harmony import */ var _components_CardHeader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/CardHeader */ "./src/OnboardingSPA/components/CardHeader/index.js");
/* harmony import */ var _components_Button_NavCardButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/Button/NavCardButton */ "./src/OnboardingSPA/components/Button/NavCardButton/index.js");
/* harmony import */ var _components_Tab__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/Tab */ "./src/OnboardingSPA/components/Tab/index.js");
/* harmony import */ var _components_TabPanelHover__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../components/TabPanelHover */ "./src/OnboardingSPA/components/TabPanelHover/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.js");
/* harmony import */ var _contents__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./contents */ "./src/OnboardingSPA/steps/GetStarted/Welcome/contents.js");
/* harmony import */ var _components_Button_ButtonWhite__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../components/Button/ButtonWhite */ "./src/OnboardingSPA/components/Button/ButtonWhite/index.js");
















const StepWelcome = () => {
  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_12__.useLocation)();
  const {
    brandName,
    migrationUrl
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    return {
      brandName: select(_store__WEBPACK_IMPORTED_MODULE_1__.store).getNewfoldBrandName(),
      migrationUrl: select(_store__WEBPACK_IMPORTED_MODULE_1__.store).getMigrationUrl()
    };
  }, [location.pathname]);
  const {
    setDrawerActiveView,
    setSidebarActiveView,
    setIsDrawerSuppressed,
    setIsHeaderNavigationEnabled,
    setHeaderActiveView,
    setIsHeaderEnabled
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_1__.store);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setSidebarActiveView(_constants__WEBPACK_IMPORTED_MODULE_9__.SIDEBAR_LEARN_MORE);
    setIsHeaderNavigationEnabled(true);
    setIsDrawerSuppressed(true);
    setDrawerActiveView(_constants__WEBPACK_IMPORTED_MODULE_9__.VIEW_NAV_GET_STARTED);
    setHeaderActiveView(_constants__WEBPACK_IMPORTED_MODULE_9__.HEADER_SITEBUILD);
    setIsHeaderEnabled(true);
  }, []);
  const content = (0,_contents__WEBPACK_IMPORTED_MODULE_10__["default"])(brandName);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Layouts_Common__WEBPACK_IMPORTED_MODULE_3__["default"], {
    isBgPrimary: true,
    isCentered: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_NewfoldLargeCard__WEBPACK_IMPORTED_MODULE_4__["default"], null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "welcome-card"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_CardHeader__WEBPACK_IMPORTED_MODULE_5__["default"], {
    heading: content.heading,
    subHeading: content.subheading
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_TabPanelHover__WEBPACK_IMPORTED_MODULE_8__["default"], {
    className: "nfd-onboarding-overview__tab-panel",
    tabs: content.tabs.map(tab => {
      return {
        name: tab.name,
        title: tab.title,
        content: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Tab__WEBPACK_IMPORTED_MODULE_7__["default"], {
          title: tab.subtitle,
          text: tab.text,
          imgType: tab.imgType,
          animationName: tab.animationName,
          className: "tab-data"
        })
      };
    })
  }, tab => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, tab.content)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-overview__buttons"
  }, migrationUrl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Button_ButtonWhite__WEBPACK_IMPORTED_MODULE_11__["default"], {
    className: "nfd-onboarding-overview__buttons--white",
    text: content.migrateButtonText,
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_13__["default"],
    onClick: () => window.open(migrationUrl, '_blank')
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Button_NavCardButton__WEBPACK_IMPORTED_MODULE_6__["default"], {
    className: "nfd-onboarding-overview__buttons--background",
    text: content.startButtonText,
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_14__["default"]
  })))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StepWelcome);

/***/ })

}]);
//# sourceMappingURL=src_OnboardingSPA_steps_GetStarted_Welcome_index_js.js.map