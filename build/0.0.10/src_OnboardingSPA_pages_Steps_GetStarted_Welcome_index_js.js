"use strict";
(self["webpackChunknewfold_Onboarding"] = self["webpackChunknewfold_Onboarding"] || []).push([["src_OnboardingSPA_pages_Steps_GetStarted_Welcome_index_js"],{

/***/ "./src/OnboardingSPA/components/Button/NavCardButton/index.js":
/*!********************************************************************!*\
  !*** ./src/OnboardingSPA/components/Button/NavCardButton/index.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/index.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Button */ "./src/OnboardingSPA/components/Button/index.js");





/**
 * Navigation Button Component on Card
 *
 * @returns
 */

const NavCardButton = _ref => {
  let {
    text,
    disabled
  } = _ref;
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_4__.useNavigate)();
  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_4__.useLocation)();
  const {
    nextStep
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    return {
      nextStep: select(_store__WEBPACK_IMPORTED_MODULE_2__.store).getNextStep()
    };
  }, [location.path]);

  const handleBtnClick = () => {
    navigate(nextStep.path);
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: "nfd-nav-card-button",
    text: text,
    handleClick: handleBtnClick,
    disabled: disabled
  });
};

/* harmony default export */ __webpack_exports__["default"] = (NavCardButton);

/***/ }),

/***/ "./src/OnboardingSPA/components/Button/index.js":
/*!******************************************************!*\
  !*** ./src/OnboardingSPA/components/Button/index.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (Button);

/***/ }),

/***/ "./src/OnboardingSPA/components/CardHeader/index.js":
/*!**********************************************************!*\
  !*** ./src/OnboardingSPA/components/CardHeader/index.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


/**
 * Common Heading Component for Card Header
 * Includes one heading, one sub-heading and one question
 * More text types can be added later based on requirements
 *
 * @return CardHeader
 */


const CardHeader = _ref => {
  let {
    heading,
    subHeading,
    question
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, heading && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "nfd-step-card-heading"
  }, heading), subHeading && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: question ? "nfd-step-card-subheading-other" : "nfd-step-card-subheading"
  }, subHeading), question && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "nfd-step-card-question"
  }, question));
};

/* harmony default export */ __webpack_exports__["default"] = (CardHeader);

/***/ }),

/***/ "./src/OnboardingSPA/components/Layouts/Base.js":
/*!******************************************************!*\
  !*** ./src/OnboardingSPA/components/Layouts/Base.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_a11y__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/a11y */ "@wordpress/a11y");
/* harmony import */ var _wordpress_a11y__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_a11y__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../constants */ "./src/constants.js");
/* harmony import */ var _utils_api_events__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/api/events */ "./src/OnboardingSPA/utils/api/events.js");







/**
 * The Base Layout has no prescribed styles, only shared functionality like focus-management and analytics.
 *
 * @param {object} props
 * @returns
 */

const BaseLayout = _ref => {
  let {
    className = 'nfd-onboarding-layout__base',
    children
  } = _ref;
  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_5__.useLocation)();
  const mainContainer = document.querySelector('.nfd-onboard-content');

  const speakRouteTitle = function (location) {
    let title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Showing new Onboarding Page';
    // [TODO]: Determine if some routes should not speak the title
    (0,_wordpress_a11y__WEBPACK_IMPORTED_MODULE_2__.speak)(title, 'assertive');
  };

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    mainContainer === null || mainContainer === void 0 ? void 0 : mainContainer.focus({
      preventScroll: true
    });
    speakRouteTitle(location, 'Override');
    new _utils_api_events__WEBPACK_IMPORTED_MODULE_4__["default"](`${_constants__WEBPACK_IMPORTED_MODULE_3__.NFD_ONBOARDING_EVENT_PREFIX}-pageview`, {
      stepID: location.pathname,
      previousStepID: window.nfdOnboarding.previousStepID
    }).send();
    window.nfdOnboarding.previousStepID = location.pathname;
  }, [location.pathname]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('nfd-onboarding-layout', className)
  }, children);
};

/* harmony default export */ __webpack_exports__["default"] = (BaseLayout);

/***/ }),

/***/ "./src/OnboardingSPA/components/Layouts/Common.js":
/*!********************************************************!*\
  !*** ./src/OnboardingSPA/components/Layouts/Common.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Base */ "./src/OnboardingSPA/components/Layouts/Base.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);





/**
 *
 * @param {*} param0
 * @returns
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
 * @param {object} props
 * @returns
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
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Base__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()('nfd-onboarding-layout__common', className, {
      'is-layout-fade-in': isFadeIn
    }, {
      'is-bg-primary': isBgPrimary
    }, {
      'is-centered': isCentered
    }, {
      'is-vertically-centered': isVerticallyCentered
    }, {
      'is-padded': isPadded
    })
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Container, null, children));
};

/* harmony default export */ __webpack_exports__["default"] = (CommonLayout);

/***/ }),

/***/ "./src/OnboardingSPA/components/NewfoldLargeCard/index.js":
/*!****************************************************************!*\
  !*** ./src/OnboardingSPA/components/NewfoldLargeCard/index.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);




const NewfoldLargeCard = _ref => {
  let {
    className = '',
    children
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('nfd-onboarding-large-card', className)
  }, children);
};

/* harmony default export */ __webpack_exports__["default"] = (NewfoldLargeCard);

/***/ }),

/***/ "./src/OnboardingSPA/components/Tab/index.js":
/*!***************************************************!*\
  !*** ./src/OnboardingSPA/components/Tab/index.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


/**
* Common Tab Component
*
* @returns Tab
*/
const Tab = _ref => {
  let {
    title,
    text,
    imgType,
    className
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: className
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "content-text"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, title), text), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: imgType
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Tab);

/***/ }),

/***/ "./src/OnboardingSPA/components/TabPanelHover/container.js":
/*!*****************************************************************!*\
  !*** ./src/OnboardingSPA/components/TabPanelHover/container.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
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
/* harmony default export */ __webpack_exports__["default"] = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(forwardedNavigableContainer));

/***/ }),

/***/ "./src/OnboardingSPA/components/TabPanelHover/index.js":
/*!*************************************************************!*\
  !*** ./src/OnboardingSPA/components/TabPanelHover/index.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ TabPanelHover; }
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
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NavigableMenu": function() { return /* binding */ NavigableMenu; }
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
/* harmony default export */ __webpack_exports__["default"] = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(NavigableMenu));

/***/ }),

/***/ "./src/OnboardingSPA/components/TabPanelHover/navigableContainer.js":
/*!**************************************************************************!*\
  !*** ./src/OnboardingSPA/components/TabPanelHover/navigableContainer.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NavigableMenu": function() { return /* reexport safe */ _menu__WEBPACK_IMPORTED_MODULE_0__["default"]; },
/* harmony export */   "TabbableContainer": function() { return /* reexport safe */ _tabbable__WEBPACK_IMPORTED_MODULE_1__["default"]; }
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
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TabbableContainer": function() { return /* binding */ TabbableContainer; }
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
/* harmony default export */ __webpack_exports__["default"] = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(TabbableContainer));

/***/ }),

/***/ "./src/OnboardingSPA/pages/Steps/GetStarted/Welcome/index.js":
/*!*******************************************************************!*\
  !*** ./src/OnboardingSPA/pages/Steps/GetStarted/Welcome/index.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/index.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_locales_translations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../utils/locales/translations */ "./src/OnboardingSPA/utils/locales/translations.js");
/* harmony import */ var _components_Layouts_Common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/Layouts/Common */ "./src/OnboardingSPA/components/Layouts/Common.js");
/* harmony import */ var _components_NewfoldLargeCard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/NewfoldLargeCard */ "./src/OnboardingSPA/components/NewfoldLargeCard/index.js");
/* harmony import */ var _components_CardHeader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/CardHeader */ "./src/OnboardingSPA/components/CardHeader/index.js");
/* harmony import */ var _components_Button_NavCardButton__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/Button/NavCardButton */ "./src/OnboardingSPA/components/Button/NavCardButton/index.js");
/* harmony import */ var _components_Tab__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/Tab */ "./src/OnboardingSPA/components/Tab/index.js");
/* harmony import */ var _tabContent_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./tabContent.json */ "./src/OnboardingSPA/pages/Steps/GetStarted/Welcome/tabContent.json");
/* harmony import */ var _components_TabPanelHover__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/TabPanelHover */ "./src/OnboardingSPA/components/TabPanelHover/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../../constants */ "./src/constants.js");















/**
 * component for rendering welcome step details.
 *
 * @returns
 */

const StepWelcome = () => {
  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_13__.useLocation)();
  const {
    currentStep,
    brandName
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    return {
      currentStep: select(_store__WEBPACK_IMPORTED_MODULE_2__.store).getCurrentStep(),
      brandName: select(_store__WEBPACK_IMPORTED_MODULE_2__.store).getNewfoldBrandName()
    };
  }, [location.pathname]);
  const {
    setDrawerActiveView,
    setIsSidebarOpened,
    setIsDrawerSuppressed
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_2__.store);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setIsSidebarOpened(false);
    setIsDrawerSuppressed(true);
    setDrawerActiveView(_constants__WEBPACK_IMPORTED_MODULE_12__.VIEW_NAV_GET_STARTED);
  }, []);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Layouts_Common__WEBPACK_IMPORTED_MODULE_5__["default"], {
    isBgPrimary: true,
    isCentered: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_NewfoldLargeCard__WEBPACK_IMPORTED_MODULE_6__["default"], null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "welcome-card"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_CardHeader__WEBPACK_IMPORTED_MODULE_7__["default"], {
    heading: currentStep === null || currentStep === void 0 ? void 0 : currentStep.heading,
    subHeading: (currentStep === null || currentStep === void 0 ? void 0 : currentStep.subheading) + brandName + '.'
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_TabPanelHover__WEBPACK_IMPORTED_MODULE_11__["default"], {
    className: "nfd-onboarding-overview__tab-panel",
    tabs: _tabContent_json__WEBPACK_IMPORTED_MODULE_10__.tabs.map(tab => {
      return {
        name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(tab.name, 'wp-module-onboarding'),
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(tab.title, 'wp-module-onboarding'),
        content: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Tab__WEBPACK_IMPORTED_MODULE_9__["default"], {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(tab.title, 'wp-module-onboarding'),
          text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(tab.text, 'wp-module-onboarding'), (0,_utils_locales_translations__WEBPACK_IMPORTED_MODULE_4__.translations)('site')),
          imgType: tab.imgType,
          className: "tab-data"
        })
      };
    })
  }, tab => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, tab.content)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Button_NavCardButton__WEBPACK_IMPORTED_MODULE_8__["default"], {
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Start Setup", 'wp-module-onboarding')
  }))));
};

/* harmony default export */ __webpack_exports__["default"] = (StepWelcome);

/***/ }),

/***/ "./src/OnboardingSPA/utils/api/events.js":
/*!***********************************************!*\
  !*** ./src/OnboardingSPA/utils/api/events.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common */ "./src/OnboardingSPA/utils/api/common.js");



class Event {
  constructor(eventSlug) {
    let eventData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.eventSlug = eventSlug;
    this.eventData = eventData;
  }

  send() {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
      url: (0,_common__WEBPACK_IMPORTED_MODULE_1__.onboardingRestURL)('events'),
      method: 'POST',
      data: {
        slug: this.eventSlug,
        data: this.eventData
      }
    }).catch(error => {
      console.error(error);
    });
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Event);

/***/ }),

/***/ "./src/OnboardingSPA/pages/Steps/GetStarted/Welcome/tabContent.json":
/*!**************************************************************************!*\
  !*** ./src/OnboardingSPA/pages/Steps/GetStarted/Welcome/tabContent.json ***!
  \**************************************************************************/
/***/ (function(module) {

module.exports = JSON.parse('{"tabs":[{"name":"tab1","title":"YOUR CONTENT","text":"Build a beautiful %s with WordPress Blocks and pre-built Block Patterns for common web content layouts.","imgType":"content-img"},{"name":"tab2","title":"POWERFUL FEATURES","text":"Start a %s, email newsletter, podcast, course, and more using WordPress Plugins and Bluehost.","imgType":"features-img"},{"name":"tab3","title":"MODERN DESIGN","text":"Setup and refine your %s\'s design styles, header, footer, and page layout templates in the WordPress Site Editor.","imgType":"design-img"}]}');

/***/ })

}]);
//# sourceMappingURL=src_OnboardingSPA_pages_Steps_GetStarted_Welcome_index_js.js.map