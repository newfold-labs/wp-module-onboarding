"use strict";
(globalThis["webpackChunknewfold_Onboarding"] = globalThis["webpackChunknewfold_Onboarding"] || []).push([["src_OnboardingSPA_steps_SiteGen_SocialMedia_index_js"],{

/***/ "./src/OnboardingSPA/components/Button/NextButtonSiteGen/index.js":
/*!************************************************************************!*\
  !*** ./src/OnboardingSPA/components/Button/NextButtonSiteGen/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/chevron-right.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../store */ "./src/OnboardingSPA/store/index.js");








const NextButtonSiteGen = _ref => {
  let {
    text,
    className,
    callback = null,
    disabled = false
  } = _ref;
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_5__.useNavigate)();
  const {
    nextStep
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    return {
      nextStep: select(_store__WEBPACK_IMPORTED_MODULE_4__.store).getNextStep()
    };
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('nfd-onboarding-button--site-gen-next', {
      'nfd-onboarding-button--site-gen-next--disabled': disabled
    }, className),
    onClick: () => {
      if (disabled) {
        return;
      }

      if (callback && typeof callback === 'function') {
        callback();
      }

      if (nextStep) {
        navigate(nextStep.path);
      }
    }
  }, text, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_6__["default"], {
    className: 'nfd-onboarding-button--site-gen-next--icon',
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__["default"]
  }));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NextButtonSiteGen);

/***/ }),

/***/ "./src/OnboardingSPA/components/Heading/AIHeading/index.js":
/*!*****************************************************************!*\
  !*** ./src/OnboardingSPA/components/Heading/AIHeading/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


const AIHeading = _ref => {
  let {
    title
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'ai-heading'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'ai-heading--icon'
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'ai-heading--title'
  }, title));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AIHeading);

/***/ }),

/***/ "./src/OnboardingSPA/components/SkipButton/index.js":
/*!**********************************************************!*\
  !*** ./src/OnboardingSPA/components/SkipButton/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _newfold_labs_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @newfold-labs/js-utility-ui-analytics */ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/index.js");
/* harmony import */ var _utils_api_flow__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/api/flow */ "./src/OnboardingSPA/utils/api/flow.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _utils_api_settings__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/api/settings */ "./src/OnboardingSPA/utils/api/settings.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../constants */ "./src/constants.js");
/* harmony import */ var _utils_analytics_hiive_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utils/analytics/hiive/constants */ "./src/OnboardingSPA/utils/analytics/hiive/constants.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_10__);














const SkipButton = _ref => {
  let {
    callback = false,
    className,
    text
  } = _ref;
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_11__.useNavigate)();
  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_11__.useLocation)();
  const {
    nextStep,
    currentData,
    socialData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    return {
      nextStep: select(_store__WEBPACK_IMPORTED_MODULE_6__.store).getNextStep(),
      currentData: select(_store__WEBPACK_IMPORTED_MODULE_6__.store).getCurrentOnboardingData(),
      socialData: select(_store__WEBPACK_IMPORTED_MODULE_6__.store).getOnboardingSocialData()
    };
  }, []);
  const isLastStep = null === nextStep || false === nextStep;
  const {
    setOnboardingSocialData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_6__.store);

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
      currentData.isComplete = new Date().getTime(); // If Social Data is changed then sync it

      if (path !== null && path !== void 0 && path.includes('basic-info')) {
        const socialDataResp = await syncSocialSettingsFinish(); // If Social Data is changed then Sync that also to the store

        if (socialDataResp) {
          setOnboardingSocialData(socialDataResp);
        }

        await _newfold_labs_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_4__.HiiveAnalytics.dispatchEvents(_utils_analytics_hiive_constants__WEBPACK_IMPORTED_MODULE_9__.CATEGORY);
      }

      (0,_utils_api_flow__WEBPACK_IMPORTED_MODULE_5__.setFlow)(currentData);
    }

    window.location.replace(_constants__WEBPACK_IMPORTED_MODULE_8__.pluginDashboardPage);
  }

  function skip() {
    if (typeof callback === 'function') {
      callback();
    }

    navigate(nextStep.path);
  }

  function skipStep() {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      className: classnames__WEBPACK_IMPORTED_MODULE_10___default()('skip-button', className),
      onClick: isLastStep ? () => saveData(location.pathname) : () => skip()
    }, text ? text : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Skip this Step', 'wp-module-onboarding'));
  }

  return skipStep();
};

const SkipButtonMemo = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(SkipButton);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SkipButtonMemo);

/***/ }),

/***/ "./src/OnboardingSPA/steps/SiteGen/SocialMedia/contents.js":
/*!*****************************************************************!*\
  !*** ./src/OnboardingSPA/steps/SiteGen/SocialMedia/contents.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);


const getContents = () => {
  return {
    heading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Do you want to include any content from Facebook?', 'wp-module-onboarding'),
    facebookTitle: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Connect a Facebook Account', 'wp-module-onboarding'),
    facebookDesc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('By connecting a Facebook profile, we can fetch relevant data to increase the accuracy of your Al generated site.', 'wp-module-onboarding'),
    facebookButton: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Connect Facebook', 'wp-module-onboarding'),
    buttons: {
      skip: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Skip for now', 'wp-module-onboarding'),
      next: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Next', 'wp-module-onboarding')
    }
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getContents);

/***/ }),

/***/ "./src/OnboardingSPA/steps/SiteGen/SocialMedia/index.js":
/*!**************************************************************!*\
  !*** ./src/OnboardingSPA/steps/SiteGen/SocialMedia/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/* harmony import */ var _contents__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contents */ "./src/OnboardingSPA/steps/SiteGen/SocialMedia/contents.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.js");
/* harmony import */ var _components_SkipButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/SkipButton */ "./src/OnboardingSPA/components/SkipButton/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _components_Layouts_Common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/Layouts/Common */ "./src/OnboardingSPA/components/Layouts/Common.js");
/* harmony import */ var _components_Heading_AIHeading__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../components/Heading/AIHeading */ "./src/OnboardingSPA/components/Heading/AIHeading/index.js");
/* harmony import */ var _components_Button_NextButtonSiteGen__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../components/Button/NextButtonSiteGen */ "./src/OnboardingSPA/components/Button/NextButtonSiteGen/index.js");












const SiteGenSiteSocialMedia = () => {
  const isLargeViewport = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.useViewportMatch)('small');
  const {
    setIsHeaderEnabled,
    setSidebarActiveView,
    setHeaderActiveView,
    setDrawerActiveView
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_6__.store);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setIsHeaderEnabled(true);
    setSidebarActiveView(false);
    setHeaderActiveView(_constants__WEBPACK_IMPORTED_MODULE_4__.HEADER_SITEGEN);
    setDrawerActiveView(false);
  });
  const content = (0,_contents__WEBPACK_IMPORTED_MODULE_3__["default"])();
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Layouts_Common__WEBPACK_IMPORTED_MODULE_7__["default"], {
    isCentered: true,
    className: "nfd-onboarding-step--site-gen__social-media"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-step--site-gen__social-media__container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Heading_AIHeading__WEBPACK_IMPORTED_MODULE_8__["default"], {
    title: content.heading
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-step--site-gen__social-media__contain "
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-step--site-gen__social-media__contain__containleft "
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, content.facebookTitle), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, content.facebookDesc)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-step--site-gen__social-media__contain__containright "
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "nfd-onboarding-step--site-gen__social-media__contain__containright__button "
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", null), content.facebookButton))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-step--site-gen__social-media__container__buttons"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_SkipButton__WEBPACK_IMPORTED_MODULE_5__["default"], {
    className: "nfd-onboarding-step--site-gen__social-media__container__buttons__skip",
    text: content.buttons.skip
  }), isLargeViewport && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Button_NextButtonSiteGen__WEBPACK_IMPORTED_MODULE_9__["default"], {
    text: content.buttons.next,
    disabled: true
  }))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SiteGenSiteSocialMedia);

/***/ })

}]);
//# sourceMappingURL=src_OnboardingSPA_steps_SiteGen_SocialMedia_index_js.js.map