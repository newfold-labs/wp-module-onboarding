"use strict";
(globalThis["webpackChunknewfold_Onboarding"] = globalThis["webpackChunknewfold_Onboarding"] || []).push([["src_OnboardingSPA_steps_TopPriority_index_js"],{

/***/ "./src/OnboardingSPA/components/SelectableCardList/selectable-card-list.js":
/*!*********************************************************************************!*\
  !*** ./src/OnboardingSPA/components/SelectableCardList/selectable-card-list.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SelectableCard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SelectableCard */ "./src/OnboardingSPA/components/SelectableCard/index.js");



const SelectableCardList = _ref => {
  let {
    contents,
    selected,
    onSelectedChange
  } = _ref;
  const cardList = contents.map((content, idx) => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SelectableCard__WEBPACK_IMPORTED_MODULE_1__["default"], {
      id: idx,
      key: idx,
      path: content.icon,
      title: content.title,
      desc: content.desc,
      onSelectedChange: onSelectedChange,
      isSelected: idx === selected ? true : false
    });
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "selectable_cards"
  }, cardList);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SelectableCardList);

/***/ }),

/***/ "./src/OnboardingSPA/components/SelectableCard/index.js":
/*!**************************************************************!*\
  !*** ./src/OnboardingSPA/components/SelectableCard/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/check.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);




/**
 * Interface a Card with standard design.
 *
 * @returns
 */

const SelectableCard = _ref => {
  let {
    id,
    path,
    title,
    desc,
    isSelected,
    onSelectedChange
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Card, {
    className: `nfd-card ${isSelected && 'nfd-selected-card-box'}`,
    onClick: e => onSelectedChange(id)
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-card__top_row"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-card__icon"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${isSelected ? 'nfd-card__icon_box nfd-card__icon_box-selected' : 'nfd-card__icon_box'}`,
    style: {
      backgroundImage: `var(${path})`
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${isSelected ? 'nfd-card__icon_selected' : 'nfd-card__icon_unselected'}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: "nfd-card__icon_selected_path",
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__["default"],
    size: 64
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `nfd-card__body ${isSelected && 'nfd-selected-card'}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "nfd-card__body_title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(title, "wp-module-onboarding")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "nfd-card__body_description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(desc, "wp-module-onboarding"))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SelectableCard);

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

/***/ "./src/OnboardingSPA/steps/TopPriority/contents.js":
/*!*********************************************************!*\
  !*** ./src/OnboardingSPA/steps/TopPriority/contents.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);


const getContents = () => {
  return {
    heading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Tell us your top priority', 'wp-module-onboarding'),
    subheading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("We'll prioritize getting you there.", 'wp-module-onboarding'),
    options: [{
      icon: '--nfd-publish-icon',
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Publishing', 'wp-module-onboarding'),
      desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('From blogs, to newsletters, to podcasts and videos, we help the web find your content.', 'wp-module-onboarding')
    }, {
      icon: '--nfd-selling-icon',
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Selling', 'wp-module-onboarding'),
      desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Startup or seasoned business, drop-shipping or downloads, we've got ecommerce covered.", 'wp-module-onboarding')
    }, {
      icon: '--nfd-design-icon',
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Designing', 'wp-module-onboarding'),
      desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('With smart style presets and powerful options, we help your site look and feel polished.', 'wp-module-onboarding')
    }]
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getContents);

/***/ }),

/***/ "./src/OnboardingSPA/steps/TopPriority/index.js":
/*!******************************************************!*\
  !*** ./src/OnboardingSPA/steps/TopPriority/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_SkipButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/SkipButton */ "./src/OnboardingSPA/components/SkipButton/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _components_Layouts_Common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/Layouts/Common */ "./src/OnboardingSPA/components/Layouts/Common.js");
/* harmony import */ var _components_Heading_HeadingWithSubHeading__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/Heading/HeadingWithSubHeading */ "./src/OnboardingSPA/components/Heading/HeadingWithSubHeading/index.js");
/* harmony import */ var _components_SelectableCardList_selectable_card_list__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/SelectableCardList/selectable-card-list */ "./src/OnboardingSPA/components/SelectableCardList/selectable-card-list.js");
/* harmony import */ var _contents__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./contents */ "./src/OnboardingSPA/steps/TopPriority/contents.js");
/* harmony import */ var _utils_analytics_hiive__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../utils/analytics/hiive */ "./src/OnboardingSPA/utils/analytics/hiive/index.js");
/* harmony import */ var _utils_analytics_hiive_constants__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../utils/analytics/hiive/constants */ "./src/OnboardingSPA/utils/analytics/hiive/constants.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../constants */ "./src/constants.js");
/* harmony import */ var _data_flows_constants__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../data/flows/constants */ "./src/OnboardingSPA/data/flows/constants.js");
















const StepTopPriority = () => {
  const priorityTypes = {
    0: 'publishing',
    1: 'selling',
    2: 'designing'
  };
  const priorityTypesToAnalyticsMap = {
    publishing: 'content',
    selling: 'store',
    designing: 'design'
  };
  const [selected, setSelected] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [isLoaded, setisLoaded] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const isLargeViewport = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.useViewportMatch)('medium');
  const {
    setDrawerActiveView,
    setIsDrawerOpened,
    setSidebarActiveView,
    setCurrentOnboardingData,
    setIsDrawerSuppressed,
    setIsHeaderNavigationEnabled
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_5__.store);
  const {
    currentData,
    currentStep
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    return {
      currentData: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getCurrentOnboardingData(),
      currentStep: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getCurrentStep()
    };
  }, []);

  const getKey = value => {
    return Object === null || Object === void 0 ? void 0 : Object.keys(priorityTypes).find(key => priorityTypes[key] === value);
  };

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isLargeViewport) {
      setIsDrawerOpened(true);
    }

    setSidebarActiveView(false);
    setIsDrawerSuppressed(false);
    setDrawerActiveView(_constants__WEBPACK_IMPORTED_MODULE_12__.VIEW_NAV_PRIMARY);
    setIsHeaderNavigationEnabled(true);
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    async function setInitialData() {
      if (currentData) {
        const val = await (currentData === null || currentData === void 0 ? void 0 : currentData.data.topPriority.priority1);

        if (val !== '') {
          setSelected(parseInt(getKey(val)));
        } else {
          currentData.data.topPriority.priority1 = priorityTypes[selected];
          setCurrentOnboardingData(currentData);
        }
      }

      setisLoaded(true);
    }

    if (!isLoaded) {
      setInitialData();
    }
  }, [isLoaded]);

  const handleSelling = () => {
    if (_data_flows_constants__WEBPACK_IMPORTED_MODULE_13__.ECOMMERCE_FLOW !== window.nfdOnboarding.currentFlow) {
      window.nfdOnboarding.newFlow = _data_flows_constants__WEBPACK_IMPORTED_MODULE_13__.ECOMMERCE_FLOW;
      window.nfdOnboarding.currentFlow = _data_flows_constants__WEBPACK_IMPORTED_MODULE_13__.ECOMMERCE_FLOW;
    }
  };

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const selectedPriorityType = priorityTypes[selected];
    currentData.data.topPriority.priority1 = selectedPriorityType;
    setCurrentOnboardingData(currentData);
    (0,_utils_analytics_hiive__WEBPACK_IMPORTED_MODULE_10__.trackOnboardingEvent)(new _utils_analytics_hiive__WEBPACK_IMPORTED_MODULE_10__.OnboardingEvent(_utils_analytics_hiive_constants__WEBPACK_IMPORTED_MODULE_11__.ACTION_ONBOARDING_TOP_PRIORITY_SET, priorityTypesToAnalyticsMap[selectedPriorityType]));

    if ('selling' === selectedPriorityType) {
      handleSelling();
    } else {
      window.nfdOnboarding.newFlow = undefined;
      window.nfdOnboarding.currentFlow = _data_flows_constants__WEBPACK_IMPORTED_MODULE_13__.DEFAULT_FLOW;
    }
  }, [selected]);

  const handleSkip = () => {
    window.nfdOnboarding.newFlow = undefined;
    currentData.data.topPriority.priority1 = priorityTypes[0];
    setCurrentOnboardingData(currentData);
    (0,_utils_analytics_hiive__WEBPACK_IMPORTED_MODULE_10__.trackOnboardingEvent)(new _utils_analytics_hiive__WEBPACK_IMPORTED_MODULE_10__.OnboardingEvent(_utils_analytics_hiive_constants__WEBPACK_IMPORTED_MODULE_11__.ACTION_ONBOARDING_STEP_SKIPPED, currentStep.title));
  };

  const content = (0,_contents__WEBPACK_IMPORTED_MODULE_9__["default"])();
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Layouts_Common__WEBPACK_IMPORTED_MODULE_6__["default"], {
    isVerticallyCentered: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Heading_HeadingWithSubHeading__WEBPACK_IMPORTED_MODULE_7__["default"], {
    title: content.heading,
    subtitle: content.subheading
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_SelectableCardList_selectable_card_list__WEBPACK_IMPORTED_MODULE_8__["default"], {
    contents: content.options,
    selected: selected,
    onSelectedChange: setSelected
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "info-top-priority"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Where would you like to start? We'll start there and then move into next steps.", 'wp-module-onboarding')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_SkipButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
    callback: handleSkip
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StepTopPriority);

/***/ })

}]);
//# sourceMappingURL=src_OnboardingSPA_steps_TopPriority_index_js.js.map