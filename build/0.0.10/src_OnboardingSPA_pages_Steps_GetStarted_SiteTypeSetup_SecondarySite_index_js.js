"use strict";
(self["webpackChunknewfold_Onboarding"] = self["webpackChunknewfold_Onboarding"] || []).push([["src_OnboardingSPA_pages_Steps_GetStarted_SiteTypeSetup_SecondarySite_index_js"],{

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

/***/ "./src/OnboardingSPA/components/NeedHelpTag/index.js":
/*!***********************************************************!*\
  !*** ./src/OnboardingSPA/components/NeedHelpTag/index.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (NeedHelpTag);

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

/***/ "./src/OnboardingSPA/pages/Steps/GetStarted/SiteTypeSetup/SecondarySite/index.js":
/*!***************************************************************************************!*\
  !*** ./src/OnboardingSPA/pages/Steps/GetStarted/SiteTypeSetup/SecondarySite/index.js ***!
  \***************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
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














const StepPrimarySetup = () => {
  var _currentData$data, _currentData$data$sit, _categoriesArray$, _categoriesArray$3, _categoriesArray$3$su;

  const {
    setDrawerActiveView,
    setIsSidebarOpened,
    setIsDrawerSuppressed
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_5__.store);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setIsSidebarOpened(false);
    setIsDrawerSuppressed(true);
    setDrawerActiveView(_constants__WEBPACK_IMPORTED_MODULE_4__.VIEW_NAV_GET_STARTED);
  }, []);
  const [clickedIndex, changeCategory] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(-1);
  const [inputCategVal, changeInputCateg] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const {
    setCurrentOnboardingData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_5__.store);
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
  /** Function which saves data in redux when category name is put-in via input box */


  const categoryInput = input => {
    var _input$target, _input$target2;

    changeCategory(-1);
    changeInputCateg(input === null || input === void 0 ? void 0 : (_input$target = input.target) === null || _input$target === void 0 ? void 0 : _input$target.value);
    const currentDataCopy = currentData;
    currentDataCopy.data.siteType['secondary'] = input === null || input === void 0 ? void 0 : (_input$target2 = input.target) === null || _input$target2 === void 0 ? void 0 : _input$target2.value;
    setCurrentOnboardingData(currentDataCopy);
  };
  /** Function which saves data in redux when category name is chosen via categories displayed */


  const handleCategoryClick = idxOfElm => {
    var _categoriesArray$2;

    changeCategory(idxOfElm);
    changeInputCateg('');
    const currentDataCopy = currentData;
    currentDataCopy.data.siteType['secondary'] = (_categoriesArray$2 = categoriesArray[0]) === null || _categoriesArray$2 === void 0 ? void 0 : _categoriesArray$2.subCategories[idxOfElm];
    setCurrentOnboardingData(currentDataCopy);
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Layouts_Common__WEBPACK_IMPORTED_MODULE_2__["default"], {
    isBgPrimary: true,
    isCentered: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_NewfoldLargeCard__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: 'site-type-card'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-card-heading center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_CardHeader__WEBPACK_IMPORTED_MODULE_7__["default"], {
    heading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(currentStep === null || currentStep === void 0 ? void 0 : currentStep.heading, 'wp-module-onboarding'),
    subHeading: sprintf((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(_content_json__WEBPACK_IMPORTED_MODULE_10__.subHeading, 'wp-module-onboarding'), (0,_utils_locales_translations__WEBPACK_IMPORTED_MODULE_11__.translations)('SITE')),
    question: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(currentStep === null || currentStep === void 0 ? void 0 : currentStep.subheading, 'wp-module-onboarding')
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
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
  }, " ", categoriesArray[0].name))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "subCategoriesSection"
  }, (_categoriesArray$3 = categoriesArray[0]) === null || _categoriesArray$3 === void 0 ? void 0 : (_categoriesArray$3$su = _categoriesArray$3.subCategories) === null || _categoriesArray$3$su === void 0 ? void 0 : _categoriesArray$3$su.map((item, idx) => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      key: item,
      onClick: e => handleCategoryClick(idx),
      className: `${clickedIndex === idx || item === selectedCategoryInStore ? 'chosenSecondaryCategory ' : ''}nfd-card-category`
    }, item);
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-setup-primary-second"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-setup-primary-second-top"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "blackText"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(_content_json__WEBPACK_IMPORTED_MODULE_10__.tellusHereText, 'wp-module-onboarding')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    onChange: e => categoryInput(e),
    className: "tellUsInput",
    placeholder: sprintf((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(_content_json__WEBPACK_IMPORTED_MODULE_10__.placeholderSiteTypeInput, 'wp-module-onboarding'), (0,_utils_locales_translations__WEBPACK_IMPORTED_MODULE_11__.translations)('site')),
    value: inputCategVal
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-setup-primary-second-bottom"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Button_NavCardButton__WEBPACK_IMPORTED_MODULE_8__["default"], {
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(_content_json__WEBPACK_IMPORTED_MODULE_10__.buttonText)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_NeedHelpTag__WEBPACK_IMPORTED_MODULE_9__["default"], null)))));
};

/* harmony default export */ __webpack_exports__["default"] = (StepPrimarySetup);

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

/***/ "./src/OnboardingSPA/pages/Steps/GetStarted/SiteTypeSetup/content.json":
/*!*****************************************************************************!*\
  !*** ./src/OnboardingSPA/pages/Steps/GetStarted/SiteTypeSetup/content.json ***!
  \*****************************************************************************/
/***/ (function(module) {

module.exports = JSON.parse('{"cardHeading":"Help us tailor this setup to your site","subHeading":"ABOUT YOUR %s","question":"What type of %s is it?","buttonText":"Continue Setup","placeholderSiteTypeInput":"Enter to search your %s type","tellusHereText":"or tell us here:","categories":[{"name":"Business","icon":"var(--business-icon)","iconWhite":"var(--business-white-icon)","subCategories":["Fashion, apparel and accessories","Health and beauty","Electronics and computers","Food and drink","CBD and other hemp-derived products","Jewelry","Pets","Motherhood & Baby","Furniture & Home Decoration","Education & Learning"]}]}');

/***/ })

}]);
//# sourceMappingURL=src_OnboardingSPA_pages_Steps_GetStarted_SiteTypeSetup_SecondarySite_index_js.js.map