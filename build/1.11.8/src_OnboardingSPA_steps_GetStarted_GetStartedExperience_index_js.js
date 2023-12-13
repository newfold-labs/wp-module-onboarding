"use strict";
(globalThis["webpackChunknewfold_Onboarding"] = globalThis["webpackChunknewfold_Onboarding"] || []).push([["src_OnboardingSPA_steps_GetStarted_GetStartedExperience_index_js"],{

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

/***/ "./src/OnboardingSPA/steps/GetStarted/GetStartedExperience/contents.js":
/*!*****************************************************************************!*\
  !*** ./src/OnboardingSPA/steps/GetStarted/GetStartedExperience/contents.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_locales_translations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/locales/translations */ "./src/OnboardingSPA/utils/locales/translations.js");



const getContents = () => {
  return {
    heading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(
    /* translators: %s: website or store */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Help us tailor this setup to your %s', 'wp-module-onboarding'), (0,_utils_locales_translations__WEBPACK_IMPORTED_MODULE_1__.translations)('site')),
    subheading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('ABOUT YOU', 'wp-module-onboarding'),
    question: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('What is your experience with WordPress?', 'wp-module-onboarding'),
    buttonText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Continue Setup', 'wp-module-onboarding'),
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Never used it', 'wp-module-onboarding'),
      slug: 'novice',
      value: '1'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Used it some', 'wp-module-onboarding'),
      slug: 'intermediate',
      value: '3'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("I'm an expert", 'wp-module-onboarding'),
      slug: 'expert',
      value: '5'
    }]
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getContents);

/***/ }),

/***/ "./src/OnboardingSPA/steps/GetStarted/GetStartedExperience/index.js":
/*!**************************************************************************!*\
  !*** ./src/OnboardingSPA/steps/GetStarted/GetStartedExperience/index.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Layouts_Common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/Layouts/Common */ "./src/OnboardingSPA/components/Layouts/Common.js");
/* harmony import */ var _components_NewfoldLargeCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/NewfoldLargeCard */ "./src/OnboardingSPA/components/NewfoldLargeCard/index.js");
/* harmony import */ var _components_CardHeader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/CardHeader */ "./src/OnboardingSPA/components/CardHeader/index.js");
/* harmony import */ var _components_Button_NavCardButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/Button/NavCardButton */ "./src/OnboardingSPA/components/Button/NavCardButton/index.js");
/* harmony import */ var _components_NeedHelpTag__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/NeedHelpTag */ "./src/OnboardingSPA/components/NeedHelpTag/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _components_Animate__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../components/Animate */ "./src/OnboardingSPA/components/Animate/index.js");
/* harmony import */ var _contents__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./contents */ "./src/OnboardingSPA/steps/GetStarted/GetStartedExperience/contents.js");
/* harmony import */ var _utils_analytics_hiive__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../utils/analytics/hiive */ "./src/OnboardingSPA/utils/analytics/hiive/index.js");
/* harmony import */ var _utils_analytics_hiive_constants__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../utils/analytics/hiive/constants */ "./src/OnboardingSPA/utils/analytics/hiive/constants.js");
















const GetStartedExperience = () => {
  const [wpComfortLevel, setWpComfortLevel] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('0');
  const {
    currentData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_9__.useSelect)(select => {
    return {
      currentData: select(_store__WEBPACK_IMPORTED_MODULE_7__.store).getCurrentOnboardingData()
    };
  }, []);
  const {
    setDrawerActiveView,
    setCurrentOnboardingData,
    setSidebarActiveView,
    setIsDrawerSuppressed,
    setIsHeaderNavigationEnabled
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_9__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_7__.store);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setSidebarActiveView(_constants__WEBPACK_IMPORTED_MODULE_6__.SIDEBAR_LEARN_MORE);
    setIsDrawerSuppressed(true);
    setDrawerActiveView(_constants__WEBPACK_IMPORTED_MODULE_6__.VIEW_NAV_GET_STARTED);
    setIsHeaderNavigationEnabled(true);
  }, []);

  async function getFlowData() {
    setWpComfortLevel(currentData.data.wpComfortLevel);
  }

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    getFlowData();
  }, []);

  const saveData = value => {
    setWpComfortLevel(value);
    const currentDataCopy = currentData;
    currentDataCopy.data.wpComfortLevel = value || '0';
    setCurrentOnboardingData(currentDataCopy);
    (0,_utils_analytics_hiive__WEBPACK_IMPORTED_MODULE_12__.trackOnboardingEvent)(new _utils_analytics_hiive__WEBPACK_IMPORTED_MODULE_12__.OnboardingEvent(_utils_analytics_hiive_constants__WEBPACK_IMPORTED_MODULE_13__.ACTION_EXPERIENCE_LEVEL_SET, content.options.filter(option => {
      return option.value === value;
    })[0].slug));
  };

  const content = (0,_contents__WEBPACK_IMPORTED_MODULE_11__["default"])();
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Layouts_Common__WEBPACK_IMPORTED_MODULE_1__["default"], {
    isBgPrimary: true,
    isCentered: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_NewfoldLargeCard__WEBPACK_IMPORTED_MODULE_2__["default"], null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-experience-step"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-card-heading center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_CardHeader__WEBPACK_IMPORTED_MODULE_3__["default"], {
    heading: content.heading,
    subHeading: content.subheading,
    question: content.question
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Animate__WEBPACK_IMPORTED_MODULE_10__["default"], {
    type: 'fade-in-disabled',
    after: wpComfortLevel
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_8__.RadioControl, {
    className: 'nfd-onboarding-experience-step-tabs components-radio-control__input radio-control-main',
    selected: wpComfortLevel,
    options: content.options.map(option => {
      return {
        label: option.label,
        value: option.value
      };
    }),
    onChange: value => saveData(value)
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Button_NavCardButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
    text: content.buttonText,
    disabled: wpComfortLevel === '0'
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_NeedHelpTag__WEBPACK_IMPORTED_MODULE_5__["default"], null))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GetStartedExperience);

/***/ })

}]);
//# sourceMappingURL=src_OnboardingSPA_steps_GetStarted_GetStartedExperience_index_js.js.map