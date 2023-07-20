"use strict";
(globalThis["webpackChunknewfold_Onboarding"] = globalThis["webpackChunknewfold_Onboarding"] || []).push([["src_OnboardingSPA_pages_Steps_GetStarted_SiteTypeSetup_PrimarySite_index_js"],{

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
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Button */ "./src/OnboardingSPA/components/Button/index.js");
/* harmony import */ var _utils_api_flow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/api/flow */ "./src/OnboardingSPA/utils/api/flow.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.js");







/**
 * Navigation Button Component on Card
 *
 * @return
 */

const NavCardButton = _ref => {
  let {
    text,
    disabled
  } = _ref;
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_6__.useNavigate)();
  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_6__.useLocation)();
  const {
    nextStep,
    currentData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    return {
      nextStep: select(_store__WEBPACK_IMPORTED_MODULE_2__.store).getNextStep(),
      currentData: select(_store__WEBPACK_IMPORTED_MODULE_2__.store).getCurrentOnboardingData()
    };
  }, [location.path]);
  const isLastStep = null === nextStep || false === nextStep;

  async function saveDataAndExit() {
    if (currentData) {
      currentData.isComplete = new Date().getTime();
      (0,_utils_api_flow__WEBPACK_IMPORTED_MODULE_4__.setFlow)(currentData);
    } //Redirect to Admin Page for normal customers
    // and Bluehost Dashboard for ecommerce customers


    const exitLink = exitToWordpressForEcommerce() ? _constants__WEBPACK_IMPORTED_MODULE_5__.pluginDashboardPage : _constants__WEBPACK_IMPORTED_MODULE_5__.wpAdminPage;
    window.location.replace(exitLink);
  }

  const exitToWordpressForEcommerce = () => {
    if (window.nfdOnboarding.currentFlow === 'ecommerce') {
      return true;
    }

    return false;
  };

  const handleBtnClick = () => {
    return isLastStep ? saveDataAndExit() : navigate(nextStep.path);
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: "nfd-nav-card-button",
    text: text,
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

/***/ "./src/OnboardingSPA/components/CardHeader/index.js":
/*!**********************************************************!*\
  !*** ./src/OnboardingSPA/components/CardHeader/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


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
    className: question ? 'nfd-step-card-subheading-other' : 'nfd-step-card-subheading'
  }, subHeading), question && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "nfd-step-card-question"
  }, question));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(CardHeader));

/***/ }),

/***/ "./src/OnboardingSPA/components/NewfoldLargeCard/index.js":
/*!****************************************************************!*\
  !*** ./src/OnboardingSPA/components/NewfoldLargeCard/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);



const NewfoldLargeCard = _ref => {
  let {
    className = '',
    children
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('nfd-onboarding-large-card', className)
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `nfd-onboarding-large-card__logo`
  }), children);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NewfoldLargeCard);

/***/ }),

/***/ "./src/OnboardingSPA/pages/Steps/GetStarted/SiteTypeSetup/PrimarySite/index.js":
/*!*************************************************************************************!*\
  !*** ./src/OnboardingSPA/pages/Steps/GetStarted/SiteTypeSetup/PrimarySite/index.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Layouts_Common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../components/Layouts/Common */ "./src/OnboardingSPA/components/Layouts/Common.js");
/* harmony import */ var _components_NewfoldLargeCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../components/NewfoldLargeCard */ "./src/OnboardingSPA/components/NewfoldLargeCard/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../constants */ "./src/constants.js");
/* harmony import */ var _contents__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../contents */ "./src/OnboardingSPA/pages/Steps/GetStarted/SiteTypeSetup/contents.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _components_CardHeader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../components/CardHeader */ "./src/OnboardingSPA/components/CardHeader/index.js");
/* harmony import */ var _components_Button_NavCardButton__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../components/Button/NavCardButton */ "./src/OnboardingSPA/components/Button/NavCardButton/index.js");
/* harmony import */ var _components_NeedHelpTag__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../components/NeedHelpTag */ "./src/OnboardingSPA/components/NeedHelpTag/index.js");
/* harmony import */ var _components_Animate__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../components/Animate */ "./src/OnboardingSPA/components/Animate/index.js");
/* harmony import */ var _utils_api_siteClassification__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../utils/api/siteClassification */ "./src/OnboardingSPA/utils/api/siteClassification.js");
/* harmony import */ var _utils_analytics__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../../utils/analytics */ "./src/OnboardingSPA/utils/analytics/index.js");















const StepPrimarySetup = () => {
  const {
    setDrawerActiveView,
    setIsDrawerSuppressed,
    setIsHeaderNavigationEnabled,
    setSidebarActiveView,
    setCurrentOnboardingData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_5__.store);
  const {
    currentData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.useSelect)(select => {
    return {
      currentData: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getCurrentOnboardingData()
    };
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setSidebarActiveView(_constants__WEBPACK_IMPORTED_MODULE_3__.SIDEBAR_LEARN_MORE);
    setIsDrawerSuppressed(true);
    setDrawerActiveView(_constants__WEBPACK_IMPORTED_MODULE_3__.VIEW_NAV_GET_STARTED);
    setIsHeaderNavigationEnabled(true);
    getSiteClassificationData();
  }, []);
  const [custom, setCustom] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [siteClassification, setSiteClassification] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const [primaryCategory, setPrimaryCategory] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(''); // Timeout after which a custom input analytics event will be sent.

  const [typingTimeout, setTypingTimeout] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const content = (0,_contents__WEBPACK_IMPORTED_MODULE_4__["default"])();
  /**
   * Function which fetches the Site Classifications
   *
   */

  const getSiteClassificationData = async () => {
    var _currentData$data, _currentData$data$sit, _currentData$data2, _currentData$data2$si, _currentData$data$sit2, _currentData$data5, _currentData$data5$si, _currentData$data5$si2, _currentData$data6, _currentData$data6$si, _currentData$data6$si2;

    const siteClassificationData = await (0,_utils_api_siteClassification__WEBPACK_IMPORTED_MODULE_11__.getSiteClassification)();
    setSiteClassification(siteClassificationData === null || siteClassificationData === void 0 ? void 0 : siteClassificationData.body); // Incase old user comes again with data, we need to save it

    if (typeof (currentData === null || currentData === void 0 ? void 0 : (_currentData$data = currentData.data) === null || _currentData$data === void 0 ? void 0 : (_currentData$data$sit = _currentData$data.siteType) === null || _currentData$data$sit === void 0 ? void 0 : _currentData$data$sit.primary) === 'string' || typeof (currentData === null || currentData === void 0 ? void 0 : (_currentData$data2 = currentData.data) === null || _currentData$data2 === void 0 ? void 0 : (_currentData$data2$si = _currentData$data2.siteType) === null || _currentData$data2$si === void 0 ? void 0 : _currentData$data2$si.secondary) === 'string') {
      var _currentData$data3, _currentData$data3$si, _currentData$data4, _currentData$data4$si;

      const primaryValue = currentData === null || currentData === void 0 ? void 0 : (_currentData$data3 = currentData.data) === null || _currentData$data3 === void 0 ? void 0 : (_currentData$data3$si = _currentData$data3.siteType) === null || _currentData$data3$si === void 0 ? void 0 : _currentData$data3$si.primary;
      const secondaryValue = currentData === null || currentData === void 0 ? void 0 : (_currentData$data4 = currentData.data) === null || _currentData$data4 === void 0 ? void 0 : (_currentData$data4$si = _currentData$data4.siteType) === null || _currentData$data4$si === void 0 ? void 0 : _currentData$data4$si.secondary;
      currentData.data.siteType.primary = {
        refers: 'custom',
        value: primaryValue
      };
      currentData.data.siteType.secondary = {
        refers: 'custom',
        value: secondaryValue
      };
      setCurrentOnboardingData(currentData);
    }

    setPrimaryCategory((_currentData$data$sit2 = currentData === null || currentData === void 0 ? void 0 : (_currentData$data5 = currentData.data) === null || _currentData$data5 === void 0 ? void 0 : (_currentData$data5$si = _currentData$data5.siteType) === null || _currentData$data5$si === void 0 ? void 0 : (_currentData$data5$si2 = _currentData$data5$si.primary) === null || _currentData$data5$si2 === void 0 ? void 0 : _currentData$data5$si2.value) !== null && _currentData$data$sit2 !== void 0 ? _currentData$data$sit2 : '');

    if ((currentData === null || currentData === void 0 ? void 0 : (_currentData$data6 = currentData.data) === null || _currentData$data6 === void 0 ? void 0 : (_currentData$data6$si = _currentData$data6.siteType) === null || _currentData$data6$si === void 0 ? void 0 : (_currentData$data6$si2 = _currentData$data6$si.primary) === null || _currentData$data6$si2 === void 0 ? void 0 : _currentData$data6$si2.refers) === 'custom') {
      var _currentData$data7, _currentData$data7$si, _currentData$data7$si2;

      categoryInput(currentData === null || currentData === void 0 ? void 0 : (_currentData$data7 = currentData.data) === null || _currentData$data7 === void 0 ? void 0 : (_currentData$data7$si = _currentData$data7.siteType) === null || _currentData$data7$si === void 0 ? void 0 : (_currentData$data7$si2 = _currentData$data7$si.primary) === null || _currentData$data7$si2 === void 0 ? void 0 : _currentData$data7$si2.value);
    }
  };
  /**
   * Function which saves data in redux when category name is selected via chips
   *
   * @param {string} primType
   */


  const handleCategoryClick = primType => {
    setCustom(false);
    setPrimaryCategory(primType);
    currentData.data.siteType.primary.refers = 'slug';
    currentData.data.siteType.primary.value = primType;
    setCurrentOnboardingData(currentData);
    (0,_utils_analytics__WEBPACK_IMPORTED_MODULE_12__.trackHiiveEvent)('primary-type', {
      refers: 'slug',
      value: primType
    });
  };
  /**
   * Function which saves data in redux when category name is put-in via input box
   *
   * @param {string} value
   */


  const categoryInput = value => {
    setCustom(true);
    currentData.data.siteType.primary.refers = 'custom';
    currentData.data.siteType.primary.value = value;
    setCurrentOnboardingData(currentData);

    if ('' !== primaryCategory && primaryCategory !== value) {
      clearTimeout(typingTimeout);
      setTypingTimeout(setTimeout(() => {
        (0,_utils_analytics__WEBPACK_IMPORTED_MODULE_12__.trackHiiveEvent)('primary-type', {
          refers: 'custom',
          value
        });
      }, 1000));
    }

    setPrimaryCategory(value);
  };

  const primarySiteTypeChips = () => {
    const types = siteClassification === null || siteClassification === void 0 ? void 0 : siteClassification.types;
    return Object.keys(types).map((type, idx) => {
      var _types$type, _types$type2, _types$type3;

      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        key: (_types$type = types[type]) === null || _types$type === void 0 ? void 0 : _types$type.slug,
        tabIndex: idx + 1,
        role: "button",
        className: `${types[type].slug === primaryCategory && !custom ? 'chosenPrimaryCategory ' : ''}nfd-card-pri-category`,
        onClick: () => handleCategoryClick(types[type].slug),
        onKeyDown: () => handleCategoryClick(types[type].slug)
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "nfd-card-pri-category-wrapper"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        className: `nfd-card-pri-category-wrapper__icon ${types[type].slug === primaryCategory ? 'nfd-card-pri-category-wrapper__icon-selected ' : ''}`,
        style: {
          backgroundImage: `url(${(_types$type2 = types[type]) === null || _types$type2 === void 0 ? void 0 : _types$type2.icon})`
        }
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        className: "categName"
      }, (_types$type3 = types[type]) === null || _types$type3 === void 0 ? void 0 : _types$type3.label)));
    });
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Layouts_Common__WEBPACK_IMPORTED_MODULE_1__["default"], {
    isBgPrimary: true,
    isCentered: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_NewfoldLargeCard__WEBPACK_IMPORTED_MODULE_2__["default"], null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-card-heading center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_CardHeader__WEBPACK_IMPORTED_MODULE_7__["default"], {
    heading: content.heading,
    subHeading: content.subheading,
    question: content.question
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Animate__WEBPACK_IMPORTED_MODULE_10__["default"], {
    type: "fade-in-disabled",
    after: siteClassification
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-setup-primary-categories"
  }, siteClassification && primarySiteTypeChips()), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-setup-primary-custom"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "nfd-setup-primary-custom__tellus-text"
  }, "or tell us here:"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "search",
    onChange: e => {
      var _e$target;

      return categoryInput(e === null || e === void 0 ? void 0 : (_e$target = e.target) === null || _e$target === void 0 ? void 0 : _e$target.value);
    },
    className: "nfd-setup-primary-custom__tellus-input",
    placeholder: content.customInputPlaceholderText,
    value: custom ? primaryCategory : ''
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Button_NavCardButton__WEBPACK_IMPORTED_MODULE_8__["default"], {
    text: content.buttonText
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_NeedHelpTag__WEBPACK_IMPORTED_MODULE_9__["default"], null)));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StepPrimarySetup);

/***/ }),

/***/ "./src/OnboardingSPA/pages/Steps/GetStarted/SiteTypeSetup/contents.js":
/*!****************************************************************************!*\
  !*** ./src/OnboardingSPA/pages/Steps/GetStarted/SiteTypeSetup/contents.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_locales_translations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../utils/locales/translations */ "./src/OnboardingSPA/utils/locales/translations.js");



const getContents = () => {
  return {
    heading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(
    /* translators: %s: site */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Help us tailor this setup to your %s', 'wp-module-onboarding'), (0,_utils_locales_translations__WEBPACK_IMPORTED_MODULE_1__.translations)('site')),
    subheading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(
    /* translators: %s: SITE */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('ABOUT YOUR %s', 'wp-module-onboarding'), (0,_utils_locales_translations__WEBPACK_IMPORTED_MODULE_1__.translations)('SITE')),
    question: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(
    /* translators: %s: site */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('What type of %s is it?', 'wp-module-onboarding'), (0,_utils_locales_translations__WEBPACK_IMPORTED_MODULE_1__.translations)('site')),
    buttonText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Continue Setup', 'wp-module-onboarding'),
    customInputPlaceholderText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(
    /* translators: %s: site */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Enter to search your %s type', 'wp-module-onboarding'), (0,_utils_locales_translations__WEBPACK_IMPORTED_MODULE_1__.translations)('site')),
    customInputLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('or tell us here:', 'wp-module-onboarding')
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getContents);

/***/ }),

/***/ "./src/OnboardingSPA/utils/api/siteClassification.js":
/*!***********************************************************!*\
  !*** ./src/OnboardingSPA/utils/api/siteClassification.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getSiteClassification": () => (/* binding */ getSiteClassification)
/* harmony export */ });
/* harmony import */ var _resolve__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./resolve */ "./src/OnboardingSPA/utils/api/resolve.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common */ "./src/OnboardingSPA/utils/api/common.js");
/* harmony import */ var _siteClassification_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./siteClassification.json */ "./src/OnboardingSPA/utils/api/siteClassification.json");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__);




async function getSiteClassification() {
  const data = await (0,_resolve__WEBPACK_IMPORTED_MODULE_0__.resolve)(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
    url: (0,_common__WEBPACK_IMPORTED_MODULE_1__.onboardingRestURL)('site-classification')
  }));

  if (data.body.length === 0) {
    return _siteClassification_json__WEBPACK_IMPORTED_MODULE_2__;
  }

  return data;
}

/***/ }),

/***/ "./src/OnboardingSPA/utils/api/siteClassification.json":
/*!*************************************************************!*\
  !*** ./src/OnboardingSPA/utils/api/siteClassification.json ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"body":{"types":{"business":{"slug":"business","label":"Business","icon":"https://cdn.hiive.space/site-classification/business.svg","emoji":"💼","schema":"Corporation","secondaryTypes":{"agency-consulting":{"primaryType":"business","slug":"agency-consulting","label":"Agency & Consulting"},"arts-crafts":{"primaryType":"business","slug":"arts-crafts","label":"Arts & Crafts"},"autos-repair":{"primaryType":"business","slug":"autos-repair","label":"Autos & Repair"},"child-care":{"primaryType":"business","slug":"child-care","label":"Child Care"},"events":{"primaryType":"business","slug":"events","label":"Events"},"finance":{"primaryType":"business","slug":"finance","label":"Finance"},"garden-florist":{"primaryType":"business","slug":"garden-florist","label":"Florist & Garden Center"},"hr-recruiting":{"primaryType":"business","slug":"hr-recruiting","label":"HR & Recruiting"},"insurance":{"primaryType":"business","slug":"insurance","label":"Insurance"},"legal":{"primaryType":"business","slug":"legal","label":"Legal"},"marketing":{"primaryType":"business","slug":"marketing","label":"Marketing"},"outdoors":{"primaryType":"business","slug":"outdoors","label":"Outdoors"},"pr-communications":{"primaryType":"business","slug":"pr-communications","label":"PR & Communications"},"real-estate-management":{"primaryType":"business","slug":"real-estate-management","label":"Real Estate & Management"},"shopping-retail":{"primaryType":"business","slug":"shopping-retail","label":"Shopping & Retail"},"trades-repair-services":{"primaryType":"business","slug":"trades-repair-services","label":"Trades & Repair Services"},"weddings":{"primaryType":"business","slug":"weddings","label":"Weddings"}}}}}}');

/***/ })

}]);
//# sourceMappingURL=src_OnboardingSPA_pages_Steps_GetStarted_SiteTypeSetup_PrimarySite_index_js.js.map