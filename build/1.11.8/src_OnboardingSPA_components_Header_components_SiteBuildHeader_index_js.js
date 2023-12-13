"use strict";
(globalThis["webpackChunknewfold_Onboarding"] = globalThis["webpackChunknewfold_Onboarding"] || []).push([["src_OnboardingSPA_components_Header_components_SiteBuildHeader_index_js"],{

/***/ "./src/OnboardingSPA/components/Header/components/SiteBuildHeader/HeaderEnd.js":
/*!*************************************************************************************!*\
  !*** ./src/OnboardingSPA/components/Header/components/SiteBuildHeader/HeaderEnd.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/* harmony import */ var _step_navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./step-navigation */ "./src/OnboardingSPA/components/Header/components/SiteBuildHeader/step-navigation.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../constants */ "./src/constants.js");








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

/***/ "./src/OnboardingSPA/components/Header/components/SiteBuildHeader/index.js":
/*!*********************************************************************************!*\
  !*** ./src/OnboardingSPA/components/Header/components/SiteBuildHeader/index.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _HeaderEnd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HeaderEnd */ "./src/OnboardingSPA/components/Header/components/SiteBuildHeader/HeaderEnd.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../constants */ "./src/constants.js");





/**
 * Interface header rendered into header render prop in <InterfaceSkeleton />.
 *
 * @return {WPComponent} Header
 */

const SiteBuildHeader = () => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Fill, {
    name: `${_constants__WEBPACK_IMPORTED_MODULE_3__.HEADER_SITEBUILD}/${_constants__WEBPACK_IMPORTED_MODULE_3__.HEADER_END}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_HeaderEnd__WEBPACK_IMPORTED_MODULE_2__["default"], null));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(SiteBuildHeader));

/***/ }),

/***/ "./src/OnboardingSPA/components/Header/components/SiteBuildHeader/step-navigation.js":
/*!*******************************************************************************************!*\
  !*** ./src/OnboardingSPA/components/Header/components/SiteBuildHeader/step-navigation.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/chevron-left.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/chevron-right.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_api_flow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../utils/api/flow */ "./src/OnboardingSPA/utils/api/flow.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../constants */ "./src/constants.js");
/* harmony import */ var _utils_api_plugins__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../utils/api/plugins */ "./src/OnboardingSPA/utils/api/plugins.js");
/* harmony import */ var _utils_analytics_hiive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../utils/analytics/hiive */ "./src/OnboardingSPA/utils/analytics/hiive/index.js");
/* harmony import */ var _utils_analytics_hiive_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../utils/analytics/hiive/constants */ "./src/OnboardingSPA/utils/analytics/hiive/constants.js");












/**
 * Back step Navigation button.
 *
 * @param {*} param0
 *
 * @return {WPComponent} Back Component
 */

const Back = _ref => {
  let {
    path,
    showErrorDialog
  } = _ref;
  const {
    setNavErrorContinuePath
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_5__.store);
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_10__.useNavigate)();

  const navigateBack = () => {
    if (showErrorDialog !== false) {
      setNavErrorContinuePath(path);
    } else {
      navigate(path, {
        state: {
          origin: 'header'
        }
      });
    }
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    className: "navigation-buttons navigation-buttons_back",
    onClick: navigateBack,
    variant: "secondary"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_11__["default"], {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_12__["default"]
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
    path,
    showErrorDialog
  } = _ref2;
  const {
    setNavErrorContinuePath
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_5__.store);
  /* [TODO]: some sense of isStepComplete to enable/disable */

  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_10__.useNavigate)();

  const navigateNext = () => {
    if (showErrorDialog !== false) {
      setNavErrorContinuePath(path);
    } else {
      navigate(path, {
        state: {
          origin: 'header'
        }
      });
    }
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    onClick: navigateNext,
    variant: "primary",
    className: "navigation-buttons navigation-buttons_next"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Next', 'wp-module-onboarding'), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_11__["default"], {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_13__["default"]
  }));
};

async function saveDataAndExit(currentData) {
  if (currentData) {
    currentData.isComplete = new Date().getTime();
    (0,_utils_api_flow__WEBPACK_IMPORTED_MODULE_4__.setFlow)(currentData);
  }

  (0,_utils_api_plugins__WEBPACK_IMPORTED_MODULE_7__.activateInitialPlugins)();
  (0,_utils_analytics_hiive__WEBPACK_IMPORTED_MODULE_8__.sendOnboardingEvent)(new _utils_analytics_hiive__WEBPACK_IMPORTED_MODULE_8__.OnboardingEvent(_utils_analytics_hiive_constants__WEBPACK_IMPORTED_MODULE_9__.ACTION_ONBOARDING_COMPLETE));
  window.location.replace(_constants__WEBPACK_IMPORTED_MODULE_6__.pluginDashboardPage);
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
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Finish', 'wp-module-onboarding'), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_11__["default"], {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_13__["default"]
  }));
};
/**
 * Step buttons presented in Header.
 *
 * @return {WPComponent} StepNavigation Component
 */


const StepNavigation = () => {
  const {
    previousStep,
    nextStep,
    currentData,
    showErrorDialog
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    return {
      nextStep: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getNextStep(),
      previousStep: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getPreviousStep(),
      currentData: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getCurrentOnboardingData(),
      showErrorDialog: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getShowErrorDialog()
    };
  }, []);
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
    path: previousStep.path,
    showErrorDialog: showErrorDialog
  }), isLastStep ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Finish, {
    currentData: currentData,
    saveDataAndExitFunc: saveDataAndExit
  }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Next, {
    path: nextStep.path,
    showErrorDialog: showErrorDialog
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StepNavigation);

/***/ })

}]);
//# sourceMappingURL=src_OnboardingSPA_components_Header_components_SiteBuildHeader_index_js.js.map