"use strict";
(globalThis["webpackChunknewfold_Onboarding"] = globalThis["webpackChunknewfold_Onboarding"] || []).push([["src_OnboardingSPA_pages_Steps_GetStarted_SiteTypeSetup_SecondarySite_index_js"],{

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
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/index.js");
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

/***/ "./src/OnboardingSPA/components/Layouts/Base.js":
/*!******************************************************!*\
  !*** ./src/OnboardingSPA/components/Layouts/Base.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BaseLayout);

/***/ }),

/***/ "./src/OnboardingSPA/components/Layouts/Common.js":
/*!********************************************************!*\
  !*** ./src/OnboardingSPA/components/Layouts/Common.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ "./src/OnboardingSPA/components/NeedHelpTag/index.js":
/*!***********************************************************!*\
  !*** ./src/OnboardingSPA/components/NeedHelpTag/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
 * @param  content
 * @return NeedHelpTag
 */

const NeedHelpTag = _ref => {
  let {
    question = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Need Help?', 'wp-module-onboarding'),
    urlLabel = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Hire our Experts', 'wp-module-onboarding')
  } = _ref;
  const hireExpertsUrl = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.select)(_store__WEBPACK_IMPORTED_MODULE_1__.store).getHireExpertsUrl();
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-card-need-help-tag"
  }, question, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: hireExpertsUrl,
    target: '_blank'
  }, urlLabel));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NeedHelpTag);

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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NewfoldLargeCard);

/***/ }),

/***/ "./src/OnboardingSPA/pages/Steps/GetStarted/SiteTypeSetup/SecondarySite/index.js":
/*!***************************************************************************************!*\
  !*** ./src/OnboardingSPA/pages/Steps/GetStarted/SiteTypeSetup/SecondarySite/index.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Layouts_Common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../components/Layouts/Common */ "./src/OnboardingSPA/components/Layouts/Common.js");
/* harmony import */ var _components_NewfoldLargeCard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../components/NewfoldLargeCard */ "./src/OnboardingSPA/components/NewfoldLargeCard/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../constants */ "./src/constants.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _components_CardHeader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../components/CardHeader */ "./src/OnboardingSPA/components/CardHeader/index.js");
/* harmony import */ var _components_Button_NavCardButton__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../components/Button/NavCardButton */ "./src/OnboardingSPA/components/Button/NavCardButton/index.js");
/* harmony import */ var _components_NeedHelpTag__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../components/NeedHelpTag */ "./src/OnboardingSPA/components/NeedHelpTag/index.js");
/* harmony import */ var _content_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../content.json */ "./src/OnboardingSPA/pages/Steps/GetStarted/SiteTypeSetup/content.json");
/* harmony import */ var _utils_locales_translations__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../utils/locales/translations */ "./src/OnboardingSPA/utils/locales/translations.js");
/* harmony import */ var _components_Animate__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../../components/Animate */ "./src/OnboardingSPA/components/Animate/index.js");















const StepPrimarySetup = () => {
  var _currentData$data, _currentData$data$sit, _categoriesArray$, _categoriesArray$3, _categoriesArray$4, _categoriesArray$4$su, _categoriesArray$5;

  const {
    setDrawerActiveView,
    setSidebarActiveView,
    setIsDrawerSuppressed,
    setIsHeaderNavigationEnabled,
    setCurrentOnboardingData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_5__.store);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setSidebarActiveView(_constants__WEBPACK_IMPORTED_MODULE_4__.SIDEBAR_LEARN_MORE);
    setIsDrawerSuppressed(true);
    setDrawerActiveView(_constants__WEBPACK_IMPORTED_MODULE_4__.VIEW_NAV_GET_STARTED);
    setIsHeaderNavigationEnabled(true);
  }, []);
  const [clickedIndex, changeCategory] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(-1);
  const [inputCategVal, changeInputCateg] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const {
    currentStep,
    currentData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.useSelect)(select => {
    return {
      currentStep: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getCurrentStep(),
      currentData: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getCurrentOnboardingData()
    };
  }, []);
  const selectedCategoryInStore = currentData === null || currentData === void 0 ? void 0 : (_currentData$data = currentData.data) === null || _currentData$data === void 0 ? void 0 : (_currentData$data$sit = _currentData$data.siteType) === null || _currentData$data$sit === void 0 ? void 0 : _currentData$data$sit.secondary;
  const categoriesArray = _content_json__WEBPACK_IMPORTED_MODULE_10__.categories;
  const subCategories = (_categoriesArray$ = categoriesArray[0]) === null || _categoriesArray$ === void 0 ? void 0 : _categoriesArray$.subCategories;
  /**This condition fills the data in input box if the saved category isn't a subcategory from the content*/

  if (selectedCategoryInStore && !inputCategVal && subCategories.indexOf(selectedCategoryInStore) === -1) {
    if (selectedCategoryInStore !== 'secondaryCategory') changeInputCateg(selectedCategoryInStore);
  }
  /**
   * Function which saves data in redux when category name is put-in via input box
   *
   * @param  input
   */


  const categoryInput = input => {
    var _input$target, _input$target2;

    changeCategory(-1);
    changeInputCateg(input === null || input === void 0 ? void 0 : (_input$target = input.target) === null || _input$target === void 0 ? void 0 : _input$target.value);
    const currentDataCopy = currentData;
    currentDataCopy.data.siteType.secondary = input === null || input === void 0 ? void 0 : (_input$target2 = input.target) === null || _input$target2 === void 0 ? void 0 : _input$target2.value;
    setCurrentOnboardingData(currentDataCopy);
  };
  /**
   * Function which saves data in redux when category name is chosen via categories displayed
   *
   * @param  idxOfElm
   */


  const handleCategoryClick = idxOfElm => {
    var _categoriesArray$2;

    changeCategory(idxOfElm);
    changeInputCateg('');
    const currentDataCopy = currentData;
    currentDataCopy.data.siteType.secondary = (_categoriesArray$2 = categoriesArray[0]) === null || _categoriesArray$2 === void 0 ? void 0 : _categoriesArray$2.subCategories[idxOfElm];
    setCurrentOnboardingData(currentDataCopy);
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Layouts_Common__WEBPACK_IMPORTED_MODULE_2__["default"], {
    isBgPrimary: true,
    isCentered: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_NewfoldLargeCard__WEBPACK_IMPORTED_MODULE_3__["default"], null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-card-heading center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_CardHeader__WEBPACK_IMPORTED_MODULE_7__["default"], {
    heading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(currentStep === null || currentStep === void 0 ? void 0 : currentStep.heading, 'wp-module-onboarding'),
    subHeading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(_content_json__WEBPACK_IMPORTED_MODULE_10__.subHeading, 'wp-module-onboarding'), (0,_utils_locales_translations__WEBPACK_IMPORTED_MODULE_11__.translations)('SITE')),
    question: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(currentStep === null || currentStep === void 0 ? void 0 : currentStep.subheading, 'wp-module-onboarding')
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Animate__WEBPACK_IMPORTED_MODULE_12__["default"], {
    type: "fade-in-disabled",
    after: ((_categoriesArray$3 = categoriesArray[0]) === null || _categoriesArray$3 === void 0 ? void 0 : _categoriesArray$3.subCategories) && selectedCategoryInStore !== null
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-setup-secondary-categories"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-card-category-wrapper"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "category-scrolling-wrapper"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "icon",
    style: {
      backgroundImage: categoriesArray[0].icon
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "categName"
  }, ' ', categoriesArray[0].name))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "subCategoriesSection"
  }, (_categoriesArray$4 = categoriesArray[0]) === null || _categoriesArray$4 === void 0 ? void 0 : (_categoriesArray$4$su = _categoriesArray$4.subCategories) === null || _categoriesArray$4$su === void 0 ? void 0 : _categoriesArray$4$su.map((item, idx) => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      key: item,
      onClick: e => handleCategoryClick(idx),
      className: `${clickedIndex === idx || item === selectedCategoryInStore ? 'chosenSecondaryCategory ' : ''}nfd-card-category`
    }, item);
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-setup-primary-second"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-setup-primary-second-top"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "blackText"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(_content_json__WEBPACK_IMPORTED_MODULE_10__.tellusHereText, 'wp-module-onboarding')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    onChange: e => categoryInput(e),
    className: "tellUsInput",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(_content_json__WEBPACK_IMPORTED_MODULE_10__.placeholderSiteTypeInput, 'wp-module-onboarding'), (0,_utils_locales_translations__WEBPACK_IMPORTED_MODULE_11__.translations)('site')),
    value: inputCategVal
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Button_NavCardButton__WEBPACK_IMPORTED_MODULE_8__["default"], {
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(_content_json__WEBPACK_IMPORTED_MODULE_10__.buttonText),
    disabled: ((_categoriesArray$5 = categoriesArray[0]) === null || _categoriesArray$5 === void 0 ? void 0 : _categoriesArray$5.subCategories) === null
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_NeedHelpTag__WEBPACK_IMPORTED_MODULE_9__["default"], null)));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StepPrimarySetup);

/***/ }),

/***/ "./src/OnboardingSPA/utils/api/events.js":
/*!***********************************************!*\
  !*** ./src/OnboardingSPA/utils/api/events.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Event);

/***/ }),

/***/ "./src/OnboardingSPA/pages/Steps/GetStarted/SiteTypeSetup/content.json":
/*!*****************************************************************************!*\
  !*** ./src/OnboardingSPA/pages/Steps/GetStarted/SiteTypeSetup/content.json ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"cardHeading":"Help us tailor this setup to your site","subHeading":"ABOUT YOUR %s","question":"What type of %s is it?","buttonText":"Continue Setup","placeholderSiteTypeInput":"Enter to search your %s type","tellusHereText":"or tell us here:","categories":{"version":"0.0.1-beta","hash":"d2e300432f87d8346008cd66ffb2b7f7","types":{"business":{"slug":"business","label":"Business","icon":"https://cdn.hiive.space/site-classification/business.svg","schema":"Corporation","secondaryTypes":{"agency-consulting":{"primaryType":"business","slug":"agency-consulting","label":"Agency & Consulting","schema":"Organization","additionalPrimaryTypes":["personal"],"keywords":["expert","studio","strategy","management","innovation","biz","branding","growth","optimization","leadership"]},"arts-crafts":{"primaryType":"business","slug":"arts-crafts","label":"Arts & Crafts","schema":"Organization","keywords":["painting","sculpture","mural","curation","auction","contemporary","modern","abstract","visual","exhibit"]},"autos-repair":{"primaryType":"business","slug":"autos-repair","label":"Autos & Repair","schema":"AutomotiveBusiness","additionalPrimaryTypes":["education","creative"],"keywords":["car","mechanic","motorcycle","brakes","transmission","tires","parts","dealership","sales","tuning","detailing","bodywork","collision","restoration"]},"child-care":{"primaryType":"business","slug":"child-care","label":"Child Care","schema":"ChildCare","keywords":["babysit","nursery","infant","baby","toddler","camp","learning","preschool","daycare"]},"events":{"primaryType":"business","slug":"events","label":"Events","schema":"Organization","keywords":["corporate","holiday","conference","venue","rental","decor","AV","audio-visual","lighting","logistics","tickets","sponsorship","promotion","production","staffing"]},"finance":{"primaryType":"business","slug":"finance","label":"Finance","schema":"Organization","keywords":["bank","planning","investment","mortgage","wealth","risk","credit","debt","cash","budget","accounting","tax","retirement","portfolio"]},"garden-florist":{"primaryType":"business","slug":"garden-florist","label":"Florist & Garden Center","schema":"Florist","keywords":["flowers","herbs","vegetable","soil","mulch"]},"hr-recruiting":{"primaryType":"business","slug":"hr-recruiting","label":"HR & Recruiting","schema":"Organization","keywords":["human","resources","people","benefits","hiring","personnel","performance","onboarding","relocation","compliance","employee","HRIS","workforce","compensation","talent"]},"insurance":{"primaryType":"business","slug":"insurance","label":"Insurance","schema":"InsuranceAgency","keywords":["protection","life","liability","disability","compensation","umbrella","flood","pet","long-term care","marine"]},"legal":{"primaryType":"business","slug":"legal","label":"Legal","schema":"Organization","keywords":["lawyer","attorney","estate","immigration","arbitration","mediation","contract","trademark","patent","civil","criminal","litigation"]},"marketing":{"primaryType":"business","slug":"marketing","label":"Marketing","schema":"Organization","keywords":["promotion","SEO","advertising","social","content","digital","PPC","email","influencer","market","consumer","analytics","lead","sales","brand","loyalty"]},"outdoors":{"primaryType":"business","slug":"outdoors","label":"Outdoors","schema":"LocalBusiness","keywords":["hike","bike","hiking","biking","boat","swim","adventure","nature","wilderness","recreation","exploration","camping","fishing","hunting","climbing","kayak","raft","cycling","wildlife","scenic","sustainable","conservation","trail"]},"pr-communications":{"primaryType":"business","slug":"pr-communications","label":"PR & Communications","schema":"Organization","keywords":["public","relations","crisis","spokesperson","reputation","internal","relations","affairs","publicity","media","press"]},"real-estate-management":{"primaryType":"business","slug":"real-estate-management","label":"Real Estate & Management","schema":"LocalBusiness","keywords":["house","home","apartment","townhome","rental","mortgage","realtor","property","appraisal","brokerage","listings","inspections","staging"]},"shopping-retail":{"primaryType":"business","slug":"shopping-retail","label":"Shopping & Retail","schema":"Store","keywords":["commerce","brick-and-mortar","discounts","coupons","customer","product","loyalty","inventory","shipping","returns","cross-sell","upsell","gift cards"]},"trades-repair-services":{"primaryType":"business","slug":"trades-repair-services","label":"Trades & Repair Services","schema":"Organization","keywords":["plumbing","electrical","hvac","heating","cooling","AC","handy","locksmith","carpenter","flooring","pest control","cleaning","renovation","welding","masonry","garage","maintenance","roofing","painting"]},"weddings":{"primaryType":"business","slug":"weddings","label":"Weddings","schema":"LocalBusiness","keywords":["bridal","dress","tuxedo","invitations","registry","ceremony","reception"]}}},"creative":{"slug":"creative","label":"Creative","icon":"https://cdn.hiive.space/site-classification/creative.svg","schema":"Organization","secondaryTypes":{"artist":{"primaryType":"creative","slug":"artist","label":"Artist","schema":"Person","keywords":["portraits","artwork","drawings","illustrations"]},"autos-repair":{"primaryType":"business","slug":"autos-repair","label":"Autos & Repair","schema":"AutomotiveBusiness","additionalPrimaryTypes":["education","creative"],"keywords":["car","mechanic","motorcycle","brakes","transmission","tires","parts","dealership","sales","tuning","detailing","bodywork","collision","restoration"]},"cosplay":{"primaryType":"creative","slug":"cosplay","label":"Cosplay","schema":"Person","keywords":["costume","anime","manga","comics","fantasy","science","sci-fi","pop culture","props","wigs","makeup","fan","role-play","video games","character","fanart"]},"digital-creator":{"primaryType":"creative","slug":"digital-creator","label":"Digital Creator","schema":"Person","keywords":["content","social","digital","youtube","podcast","blog","vlog","graphic","animation","virtual","VR","augmented","gaming","e-book"]},"influencer":{"primaryType":"creative","slug":"influencer","label":"Influencer","schema":"Person","keywords":["collaboration","sponsored","audience","follower","instagram","youtube","tiktok","endorsement","affiliate","brand","consumer"]},"model":{"primaryType":"creative","slug":"model","label":"Model","schema":"Person","keywords":["runway","catwalk","photoshoot","beauty","commercial","editorial","plus-size","glamour"]},"photogrpahy":{"primaryType":"creative","slug":"photogrpahy","label":"Photography","schema":"LocalBusiness","keywords":["aerial","stock","portrait","wildlife","documentary","street","equipment","lens"]},"writing":{"primaryType":"creative","slug":"writing","label":"Writing","schema":"Person","keywords":["fiction","non-fiction","journalism","ghostwriting","proofreading","copywriting","script","freelance","academic","author","poetry","editing"]}}},"education":{"slug":"education","label":"Education","icon":"https://cdn.hiive.space/site-classification/education.svg","schema":"EducationalOrganization","secondaryTypes":{"after-school":{"primaryType":"education","slug":"after-school","label":"After-School Programs","schema":"LocalBusiness","keywords":["enrichment","academic","tutoring","homework","STEM","lessons","life","character","mentoring","field trip","parent"]},"autos-repair":{"primaryType":"business","slug":"autos-repair","label":"Autos & Repair","schema":"AutomotiveBusiness","additionalPrimaryTypes":["education","creative"],"keywords":["car","mechanic","motorcycle","brakes","transmission","tires","parts","dealership","sales","tuning","detailing","bodywork","collision","restoration"]},"driving-schools":{"primaryType":"education","slug":"driving-schools","label":"Driving Schools","schema":"AutomotiveBusiness","keywords":["insurance","accident","traffic","DMV","RMV","highway","parallel","driving test","permit","license","behind-the-wheel","road","defensive","driver"]},"online-courses":{"primaryType":"education","slug":"online-courses","label":"Online Courses","schema":"EducationalOrganization","keywords":["e-learn","distance","virtual","MOOC","LMS","course","curriculum","interactive","lectures","webinars","self-paced","certifications","skill","knowledge","collaborative","test","assessment"]},"schools-universities":{"primaryType":"education","slug":"schools-universities","label":"Schools & Universities","schema":"School","keywords":["college","higher-ed","academic","student","admissions","financial aid","scholarship","campus","extracurricular","athletics","major","minor","faculty","research","alumni"]},"student-organization":{"primaryType":"education","slug":"student-organization","label":"Student Organizations","schema":"Organization","keywords":["honor","debate","fraternity","sorority","student government","volunteer","music","theater","athletics","football","soccer","baseball","softball","volleyball","golf","community service","band","orchestra"]},"teacher":{"primaryType":"education","slug":"teacher","label":"Teacher","schema":"Person","keywords":["educator","pedagogy","learning","classroom"]},"test-preparation":{"primaryType":"education","slug":"test-preparation","label":"Test Preparation","schema":"Organization","keywords":["standardized","admissions","SAT","ACT","GRE","GMAT","LSAT","MCAT","test-taking","practice","scores","study","flashcards","private tutoring"]},"tutoring":{"primaryType":"education","slug":"tutoring","label":"Tutoring","schema":"Organization","keywords":["test prep","academic","homework","learning","second-language","spanish","english","science","math","algebra","calculus","biology","chemistry","standardized","AP"]}}},"entertainment":{"slug":"entertainment","label":"Entertainment","icon":"https://cdn.hiive.space/site-classification/entertainment.svg","schema":"EntertainmentBusiness","secondaryTypes":{"comedy":{"primaryType":"entertainment","slug":"comedy","label":"Comedy","schema":"EntertainmentBusiness","keywords":["stand-up","sketch","improv","satire","parody","humor","jokes","laugh","comedian","clubs","festivals","roast","prank","sitcom"]},"dance-theater":{"primaryType":"entertainment","slug":"dance-theater","label":"Dance & Theater","schema":"EntertainmentBusiness","keywords":["ballet","jazz","modern","tap dance","hip hop","contemporary","ballroom","chreography","playwriting","acting","stage"]},"film-tv":{"primaryType":"entertainment","slug":"film-tv","label":"Film & TV","schema":"EntertainmentBusiness","keywords":["production","directing","cinematography","special effects","visual effects","sound design","reality","script","film","television"]},"gaming-e-sports":{"primaryType":"entertainment","slug":"gaming-e-sports","label":"Gaming & E-sports","schema":"EntertainmentBusiness","keywords":["tournaments","game engine","PC","console","VR","multiplayer","streaming","shooter"]},"live-events":{"primaryType":"entertainment","slug":"live-events","label":"Live Events","schema":"EntertainmentBusiness","keywords":["concerts","trade show","exhibition","launch","award","charity","fairs","rallies","ceremonies","weddings","game","match","meetup"]},"music":{"primaryType":"entertainment","slug":"music","label":"Music","keywords":["open-mic","instrument","recording","theory","genre","playlist","vocal","guitar","brass","woodwind","percussion","drum","jazz","blues","marching",""]},"publishing-media":{"primaryType":"entertainment","slug":"publishing-media","label":"Publishing & Media","keywords":["book","author","journalism","media","magazine","writing","editing"]},"radio-podcasts":{"primaryType":"entertainment","slug":"radio-podcasts","label":"Radio & Podcasts","keywords":["broadcast","talk show","voiceover","host","storytelling","audiobook"]},"talent-management":{"primaryType":"entertainment","slug":"talent-management","label":"Talent Management","keywords":["acting","talent","representation","casting","audition","hollywood","guild","union","scout","headshots","reels"]},"video-streaming":{"primaryType":"entertainment","slug":"video-streaming","label":"Video & Streaming","schema":"EntertainmentBusiness","keywords":["youtube","vimeo","vlog","reaction","DIY","reviews","travel","cooking","challenges","influencer","subscribe"]}}},"fashion-beautiy":{"slug":"fashion-beautiy","label":"Fashion & Beauty","icon":"https://cdn.hiive.space/site-classification/fashion-beauty.svg","schema":"HealthAndBeautyBusiness","secondaryTypes":{"accessories":{"primaryType":"fashion-beauty","slug":"accessories","label":"Accessories","keywords":["watches","hats","sunglasses","scarves","belts","handbags","wallets","backpacks","ties","bowtie","gloves","socks","boots","sandals","sneakers","shoes"]},"clothing":{"primaryType":"fashion-beauty","slug":"clothing","label":"Clothing","keywords":["denim","dresses","jeans","sweaters","activewear","lingerie","formal","second-hand","consignment"]},"fragrances":{"primaryType":"fashion-beauty","slug":"fragrances","label":"Fragrances","keywords":["perfume","cologne","aromatherapy","floral","woody","oils","diffusers","gift","parfum","toilette","citrus","tees","t-shirt","apparel"]},"haircare":{"primaryType":"fashion-beauty","slug":"haircare","label":"Haircare","keywords":["styling","extensions","color","haircut","scalp","blow-dry","curling","flat iron","hair loss"]},"jewelry":{"primaryType":"fashion-beauty","slug":"jewelry","label":"Jewelry","keywords":["rings","necklaces","earrings","bracelets","precious","semi-precious","pearl","gem","birthstone","band","allergy","gold","silver","bronze","steel"]},"makeup-skincare":{"primaryType":"fashion-beauty","slug":"makeup-skincare","label":"Makeup & Skincare","keywords":["cosmetics","facial","moisturize","serum","toner","foundation","blush","mascara","eyeliner","lipstick","sunscreen","acne","concealer","deodorent"]},"nailcare":{"primaryType":"fashion-beauty","slug":"nailcare","label":"Nailcare","keywords":["polish","salon","manicure","pedicure","gel","acrylic","extensions","cuticle","french"]},"shoes":{"primaryType":"fashion-beauty","slug":"shoes","label":"Shoes","keywords":["boots","running","hiking","dress","casual","heels","flats","loafers","wedges","slippers"]},"stylists":{"primaryType":"fashion-beauty","slug":"stylists","label":"Stylists","keywords":["wardrobe","trends","fashion","beauty","image","personal"]},"tattoos-piercings":{"primaryType":"fashion-beauty","slug":"tattoos-piercings","label":"Tattoos & Piercings","keywords":["parlor","geometric","tribal","sleeve","back","chest","removal","body","ear","nose","lip","tongue","navel","cartilage","septum","studs","hoops","barbells","dermal"]}}},"food-beverage":{"slug":"food-beverage","label":"Food & Beverage","icon":"https://cdn.hiive.space/site-classification/food-beverage.svg","schema":"FoodService","secondaryTypes":{"bakeries":{"primaryType":"food-beverage","slug":"bakeries","label":"Bakeries","schema":"Bakery","keywords":["cake","cupcake","donuts","bagels","pie","bread","baguette","desserts","sourdough"]},"bars":{"primaryType":"food-beverage","slug":"bars","label":"Bars","schema":"BarOrPub","keywords":["cocktail","craft","wine","mixology","liquor","spirits","pub","dive bar","speakeasy","DJ","karaoke","nightlife","bottle service","bartender","barkeep","margarita","bourbon","club"]},"catering":{"primaryType":"food-beverage","slug":"catering","label":"Catering","schema":"FoodEstablishment","keywords":["event","corporate","party","wedding","buffet","plated","family-style","menu","vegetarian","kosher","farm-to-table"]},"chefs":{"primaryType":"food-beverage","slug":"chefs","label":"Chefs","schema":"FoodEstablishment","keywords":["culinary","gourmet","restaurant","kitchen","cooking","pastry","sous","fusion","gastronomy","ethnic"]},"coffee-tea":{"primaryType":"food-beverage","slug":"coffee-tea","label":"Coffee & Tea","schema":"FoodEstablishment","keywords":["espresso","cappuccino","latte","cold brew","herbal","loose-leaf","beans","roasting","brew","speciality","single-origin"]},"farms":{"primaryType":"food-beverage","slug":"farms","label":"Farms","schema":"Organization","keywords":["dairy","agriculture","crop","livestock","sustainable","organic","CSA","irrigation","fertilizer","harvest","tractor","soil","citrus","vegetable"]},"food-trucks":{"primaryType":"food-beverage","slug":"food-trucks","label":"Food Trucks","schema":"FoodEstablishment","keywords":["mobile","street food","gourmet","sandwiches","tacos","burger","bbq","barbeque","seafood","vegetarian","vegan","festival"]},"grocers-markets":{"primaryType":"food-beverage","slug":"grocers-markets","label":"Grocers & Markets","schema":"GroceryStore","keywords":["supermarket","farmer\'s market","local","meat","seafood","deli","bakery","produce","frozen","snacks","prepared","condiments","health"]},"recipes":{"primaryType":"food-beverage","slug":"recipes","label":"Recipes","schema":"Blog","keywords":["one-pot","breakfast","lunch","dinner","cooking","baking","entrees","appetizers","snacks","healthy","quick","weeknight"]}}},"government-politics":{"slug":"government-politics","label":"Government & Politics","icon":"https://cdn.hiive.space/site-classification/government-politics.svg","schema":"Organization","secondaryTypes":{"activism-advocacy":{"primaryType":"government-politics","slug":"activism-advocacy","label":"Activism & Advocacy","keywords":["justice","civil","human","grassroots","philanthropy","lobbying","volunteer","healthcare","rights","LGBT","racial"]},"emergency-relief":{"primaryType":"government-politics","slug":"emergency-relief","label":"Emergency Relief","keywords":["disaster","response","humanitarian","aid","crisis","preparedness","rescue","humanitarian","shlter","response","community"]},"judiciary":{"primaryType":"government-politics","slug":"judiciary","label":"Judiciary","keywords":["court","appeal","trial","judge"]},"law-enforcement":{"primaryType":"government-politics","slug":"law-enforcement","label":"Law Enforcement","keywords":["police","justice","forensic","homeland","border","traffic","SWAT","k-9","intelligence","surveillance","crime","investigation","detective","officer"]},"libraries":{"primaryType":"government-politics","slug":"libraries","label":"Libraries","keywords":["public","books","newspaper","research","reference","literacy","wifi"]},"military-veterans":{"primaryType":"government-politics","slug":"military-veterans","label":"Military & Veterans","keywords":["armed","army","navy","air force","marines","national guard","reserves","deployment","VA","PTSD","transition"]},"policy-campaigns":{"primaryType":"government-politics","slug":"policy-campaigns","label":"Policy & Campaigns","keywords":["grassroots","public opinion","messaging","fundraising","political action committee","PAC","election"]},"politicians":{"primaryType":"government-politics","slug":"politicians","label":"Politicians","keywords":["president","minister","governor","senator","represensitive","mayor","council","assembly","parliment","secretary","ambassador","consul","administrator"]},"public-services":{"primaryType":"government-politics","slug":"public-services","label":"Public Services","schema":"GovernmentService","keywords":["public works","waste management","parks","recreation","police","fire","water","sewer","housing","street","sidewalk","parking","code enforcement","permits","inspections","zoning","transit","transport"]},"towns-cities-regions":{"primaryType":"government-politics","slug":"towns-cities-regions","label":"Towns/Cities/Regions","schema":"AdministrativeArea","keywords":["city","county","state","municipalities","local","infrastructure","taxes","permits","tourism","public health","regulation","social"]}}},"health-wellness":{"slug":"health-wellness","label":"Health & Wellness","icon":"https://cdn.hiive.space/site-classification/health-wellness.svg","schema":"HealthAndBeautyBusiness","secondaryTypes":{"counseling-mental-health":{"primaryType":"health-wellness","slug":"counseling-mental-health","label":"Counseling & Mental Health","keywords":["therapy","depression","anxiety","stress","trauma","grief","substance","addition","abuse","disorder","relationship","mindfulness","meditation","wellness"]},"dentist-ortho":{"primaryType":"health-wellness","slug":"dentist-ortho","label":"Dentist & Ortho","keywords":["hygiene","cleaning","whitening","braces","invisalign","retainers","implants","crowns","fillings","root canal","oral surgery","wisdom teeth"]},"doctor":{"primaryType":"health-wellness","slug":"doctor","label":"Doctor","keywords":["medicine","health","care","general","practitioner","specialist","cardiologist","dermotologist","endocrinologist","neurologist","oncologist","cancer","pediatrician","psychiatrist","surgeon","allergist"]},"gym":{"primaryType":"health-wellness","slug":"gym","label":"Gym","keywords":["fitness","group","weight loss","muscle","cardio","strength","yoga","pilates","crossfit","bodybuilding","weight","treadmill","elliptical","interval"]},"nutrition-weight-loss":{"primaryType":"health-wellness","slug":"nutrition-weight-loss","label":"Nutrition & Weight Loss","keywords":["diet","health","nutrients","calorie","portion","superfood","planning","vegan","vegetarian","gluten","carb","fat","intermittent","keto","supplements","detox","metabolism"]},"physical-therapist":{"primaryType":"health-wellness","slug":"physical-therapist","label":"Physical Therapist","keywords":["orthopedic","sports","pediatric","geriatric","aquatic","injury","chronic","balance","surgery"]},"retreats":{"primaryType":"health-wellness","slug":"retreats","label":"Retreats","keywords":["yoga","meditation","mindfulness","spiritual","detox","ayurvedic","holistic","couples","silent","beach","mountain"]},"spas":{"primaryType":"health-wellness","slug":"spas","label":"Spas","keywords":["massage","facial","aromatherapy","relaxation","hot stone","deep tissue","sweedish","reflexology","waxing","sauna","jacuzzi"]},"spirituality":{"primaryType":"health-wellness","slug":"spirituality","label":"Spirituality","keywords":["christianity","islam","hindu","buddhism","bahá\'í","energy","reiki","chakra","zen","enlightenment","transcendence"]},"trainer":{"primaryType":"health-wellness","slug":"trainer","label":"Trainer","keywords":["exercise","flexibility","core","resistance","functional","endurance","wellness"]}}},"nonprofit":{"slug":"nonprofit","label":"Nonprofit","icon":"https://cdn.hiive.space/site-classification/nonprofit.svg","schema":"Organization","secondaryTypes":{"animals-wildlife":{"primaryType":"nonprofit","slug":"animals-wildlife","label":"Animals & Wildlife","keywords":["shelter","rescue","adoption","foster","humane","stray","spay","neuter","pet"]},"civic-community-groups":{"primaryType":"nonprofit","slug":"civic-community-groups","label":"Civic & Community Groups","keywords":["nonprift","grassroots","philanthropy","donate","neighborhood","outreach","town hall","coalition"]},"climate-environment":{"primaryType":"nonprofit","slug":"climate-environment","label":"Climate & Environment","keywords":["greenhouse","carbon","global warming","footprint","energy","clean","crisis","fossil","deforestation","biodiversity","ocean"]},"diversity-equity-inclusion":{"primaryType":"nonprofit","slug":"diversity-equity-inclusion","label":"Diversity, Equity & Inclusion","keywords":["black","african","immigrant","women","LGBT","gay","lesbian","trans","bias","intersectionality","discrimination","ally","unconscious","racism","multiculturalism","aggression"]},"foundations":{"primaryType":"nonprofit","slug":"foundations","label":"Foundations","keywords":["welfare","youth","rights","arts","culture","faith","charity"]},"military-veterans":{"primaryType":"nonprofit","slug":"military-veterans","label":"Military & Veterans","keywords":["armed","army","navy","air force","marines","national guard","reserves","deployment","VA","PTSD","transition"]},"museums":{"primaryType":"nonprofit","slug":"museums","label":"Museums","keywords":["art","exhibit","science","children","cultural","aviation","war","botanical","acquariam","planetarium","zoo","collection"]},"religious-groups":{"primaryType":"nonprofit","slug":"religious-groups","label":"Religious Groups","keywords":["christianity","islam","hindu","buddhism","bahá\'í","energy","reiki","chakra","zen","enlightenment","transcendence"]},"trade-professional-groups":{"primaryType":"nonprofit","slug":"trade-professional-groups","label":"Trade & Professional Groups","schema":"Organization","keywords":["organization","association","industry","business","chamber","commerce","networking","standards","market","leadership"]}}},"personal":{"slug":"personal","label":"Personal","icon":"https://cdn.hiive.space/site-classification/personal.svg","schema":"Person","secondaryTypes":{"agency-consulting":{"primaryType":"business","slug":"agency-consulting","label":"Agency & Consulting","schema":"Organization","additionalPrimaryTypes":["personal"],"keywords":["expert","studio","strategy","management","innovation","biz","branding","growth","optimization","leadership"]},"art":{"primaryType":"personal","slug":"art","label":"Art","keywords":["expression","artistic","scrapbook","printmaking","calligraphy","drawing","painting","sculpture","pottery"]},"blog":{"primaryType":"personal","slug":"blog","label":"Blog","keywords":["lifestyle","food","fashion","travel","beauty","DIY","parenting","technology","career","finance","politics","news"]},"creative-portfolio":{"primaryType":"personal","slug":"creative-portfolio","label":"Creative Portfolio","keywords":["art","design","photo","fashion","film","video","tv","music","writing","architecture","interior design","UX","UI","web design","web engineering","app design","VFX","creative"]},"digital-creator":{"primaryType":"personal","slug":"digital-creator","label":"Digital Creator","keywords":["youtuber","podcaster","twitch","instagrammer","tiktok","social media","marketer","author","designer","developer","animator","creator"]},"influencer":{"primaryType":"personal","slug":"influencer","label":"Influencer","keywords":["youtuber","podcaster","twitch","instagrammer","tiktok","social media","marketer","author","designer","developer","animator","creator"]},"model":{"primaryType":"personal","slug":"model","label":"Model","keywords":["runway","catwalk","photoshoot","beauty","commercial","editorial","plus-size","glamour"]},"photography":{"primaryType":"personal","slug":"photography","label":"Photography","keywords":["aerial","stock","portrait","wildlife","documentary","street","equipment","lens"]},"wedding":{"primaryType":"personal","slug":"wedding","label":"Wedding","keywords":["bridal","dress","tuxedo","invitations","registry","ceremony","reception"]},"writing":{"primaryType":"personal","slug":"writing","label":"Writing","keywords":["fiction","non-fiction","journalism","ghostwriting","proofreading","copywriting","script","freelance","academic","author","poetry","editing"]}}},"startup":{"slug":"startup","label":"Startup","icon":"https://cdn.hiive.space/site-classification/startup.svg","schema":"Organization","secondaryTypes":[]},"tech":{"slug":"tech","label":"Tech","icon":"https://cdn.hiive.space/site-classification/tech.svg","schema":"Organization","secondaryTypes":{"agency-consulting":{"primaryType":"tech","slug":"agency-consulting","label":"Agency & Consulting","schema":"Organization","keywords":["expert","studio","strategy","management","innovation","biz","branding","growth","optimization","leadership"]},"apps-software":{"primaryType":"tech","slug":"apps-software","label":"Apps & Software","schema":"Organization","keywords":["productivity","social media","entertainment","gaming","navigation","communication","messaging","editing","dating","ride-hailing","carshare","budget","amazon","ebay"]},"blockchain":{"primaryType":"tech","slug":"blockchain","label":"Blockchain","keywords":["crypto","bitcoin","DeFI","smart contract","proof of work","tokenization","decentralize","identity"]},"edutech":{"primaryType":"tech","slug":"edutech","label":"Edutech","keywords":["LMS","MOOC","learning","gamification","virtual","augmented","personalized","textbook","video-based","e-learning-microlearning","assessment","test"]},"fintech":{"primaryType":"tech","slug":"fintech","label":"Fintech","keywords":["banking","payments","wallets","peer-to-peer","P2P","crypto","blockchain","lending","insurtech","wealthtech","regtech","fraud","credit"]},"hardware-wearables":{"primaryType":"tech","slug":"hardware-wearables","label":"Hardware & Wearables","keywords":["computers","laptops","tablets","smartphones","headphones","console","TV","soundbar","thermostat","security","drone","3D printer","robotics"]},"services-saas":{"primaryType":"tech","slug":"services-saas","label":"Services (Saas)","keywords":["CRM","project","management","marketing","automation","drop-ship","time track","CMS","LMS","cybersecurity","payment","invoicing","collaboration","helpdesk","support","email"]},"social-communities":{"primaryType":"tech","slug":"social-communities","label":"Social Networks & Communities","keywords":["forums","peer-to-peer","support","dating","crowdsourcing","hobby","DIY","job boards","online"]}}},"travel-tourism":{"slug":"travel-tourism","label":"Travel & Tourism","icon":"https://cdn.hiive.space/site-classification/travel-tourism.svg","schema":"Organization","secondaryTypes":{"attractions":{"primaryType":"travel-tourism","slug":"attractions","label":"Attractions","schema":"TouristAttraction","keywords":["theme parks","museums","landmark","beach","waterfall","zoo","wildlife","park","botanical","arena","stadium","vineyard","bungee"]},"hotels-lodging":{"primaryType":"travel-tourism","slug":"hotels-lodging","label":"Hotels & Lodging","keywords":["motel","hotel","bed and breakfast","B&B","resort","villa","condo","cottage","cabin","houseboat","treehouse","turn","lodge","campsite","camping","RV"]},"property-management":{"primaryType":"travel-tourism","slug":"property-management","label":"Property Management","keywords":["HOA","condo","lease","short-term","homestay","guesthouse","apartment","condo","cabin","yurt","ranch","island"]},"rentals":{"primaryType":"travel-tourism","slug":"rentals","label":"Rentals","keywords":["homes","apartments","villas","condos","cabins","cottages","yurt","RV\'s","campervans","hostels","bike","boat","kyak","scooter","moped","motorcycle","car","offroad","watercraft","snowmobile","ski","snowboard","surfboard","scuba","golf club","tents"]},"tours-guides":{"primaryType":"travel-tourism","slug":"tours-guides","label":"Tours & Guides","keywords":["walking","city","cultural","history","historical","adventure","safari","scuba","snorkeling","ecotourism","wine","art","ghost","helicopter","zipline"]},"travel-agency":{"primaryType":"travel-tourism","slug":"travel-agency","label":"Travel Agency","keywords":["budget","solo","road trip","backpacking","family","adventure","luxury","glamping","deals","discounts","hotel","bed and breakfast","airbnb"]},"travel-influencer":{"primaryType":"travel-tourism","slug":"travel-influencer","label":"Travel Influencer"}}},"other":{"slug":"other","label":"Other","icon":"https://cdn.hiive.space/site-classification/other.svg","schema":"Thing","secondaryTypes":[]}}}}');

/***/ })

}]);
//# sourceMappingURL=src_OnboardingSPA_pages_Steps_GetStarted_SiteTypeSetup_SecondarySite_index_js.js.map