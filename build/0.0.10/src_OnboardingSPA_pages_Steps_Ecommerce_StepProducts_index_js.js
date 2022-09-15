"use strict";
(self["webpackChunknewfold_Onboarding"] = self["webpackChunknewfold_Onboarding"] || []).push([["src_OnboardingSPA_pages_Steps_Ecommerce_StepProducts_index_js"],{

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

/***/ "./src/OnboardingSPA/pages/Steps/Ecommerce/StepProducts/index.js":
/*!***********************************************************************!*\
  !*** ./src/OnboardingSPA/pages/Steps/Ecommerce/StepProducts/index.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../constants */ "./src/constants.js");
/* harmony import */ var _components_Button_NavCardButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/Button/NavCardButton */ "./src/OnboardingSPA/components/Button/NavCardButton/index.js");
/* harmony import */ var _components_CardHeader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/CardHeader */ "./src/OnboardingSPA/components/CardHeader/index.js");
/* harmony import */ var _components_Layouts_Common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/Layouts/Common */ "./src/OnboardingSPA/components/Layouts/Common.js");
/* harmony import */ var _components_NeedHelpTag__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/NeedHelpTag */ "./src/OnboardingSPA/components/NeedHelpTag/index.js");
/* harmony import */ var _components_NewfoldLargeCard__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/NewfoldLargeCard */ "./src/OnboardingSPA/components/NewfoldLargeCard/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _content_json__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../content.json */ "./src/OnboardingSPA/pages/Steps/Ecommerce/content.json");















const StepProducts = () => {
  const isLargeViewport = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.useViewportMatch)('medium');
  const {
    setDrawerActiveView,
    setIsDrawerOpened,
    setIsDrawerSuppressed,
    setIsSidebarOpened,
    setCurrentOnboardingData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_11__.store);
  let currentData = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => select(_store__WEBPACK_IMPORTED_MODULE_11__.store).getCurrentOnboardingData());
  let productInfo = currentData.storeDetails.productInfo;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isLargeViewport) {
      setIsDrawerOpened(true);
    }

    setIsSidebarOpened(false);
    setIsDrawerSuppressed(false);
    setDrawerActiveView(_constants__WEBPACK_IMPORTED_MODULE_5__.VIEW_NAV_ECOMMERCE_STORE_INFO);
  }, []);

  const handleCheckbox = (value, checked) => setCurrentOnboardingData({
    storeDetails: { ...currentData.storeDetails,
      productInfo: { ...productInfo,
        product_types: checked ? [...(productInfo === null || productInfo === void 0 ? void 0 : productInfo.product_types), value] : productInfo === null || productInfo === void 0 ? void 0 : productInfo.product_types.filter(product => product !== value)
      }
    }
  });

  const handleProductCount = count => setCurrentOnboardingData({
    storeDetails: { ...currentData.storeDetails,
      productInfo: { ...productInfo,
        product_count: count
      }
    }
  });

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Layouts_Common__WEBPACK_IMPORTED_MODULE_8__["default"], {
    isBgPrimary: true,
    isCentered: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_NewfoldLargeCard__WEBPACK_IMPORTED_MODULE_10__["default"], null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-experience-step onboarding-product-step onboarding-ecommerce-step"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-card-heading center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_CardHeader__WEBPACK_IMPORTED_MODULE_7__["default"], {
    heading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)(_content_json__WEBPACK_IMPORTED_MODULE_12__.stepProductsHeading, 'wp-module-onboarding'),
    subHeading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)(_content_json__WEBPACK_IMPORTED_MODULE_12__.stepProductsSubHeading, 'wp-module-onboarding')
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-product-step-options"
  }, _content_json__WEBPACK_IMPORTED_MODULE_12__.productOptions.map(product => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CheckboxControl, {
    key: product.value,
    checked: productInfo.product_types.includes(product.value),
    label: product.content,
    onChange: e => handleCheckbox(product.value, e)
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "step-product-numbers"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    style: {
      fontSize: '16px'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)(_content_json__WEBPACK_IMPORTED_MODULE_12__.stepProductsQuestion, 'wp-module-onboarding')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RadioControl, {
    className: "components-radio-control__input",
    selected: productInfo === null || productInfo === void 0 ? void 0 : productInfo.product_count,
    options: _content_json__WEBPACK_IMPORTED_MODULE_12__.stepProductNumbers.map(option => {
      return {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)(option.content, 'wp-module-onboarding'),
        value: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)(option.value, 'wp-module-onboarding')
      };
    }),
    onChange: handleProductCount
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Button_NavCardButton__WEBPACK_IMPORTED_MODULE_6__["default"], {
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)(_content_json__WEBPACK_IMPORTED_MODULE_12__.buttonText, 'wp-module-onboarding')
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_NeedHelpTag__WEBPACK_IMPORTED_MODULE_9__["default"], null))));
};

/* harmony default export */ __webpack_exports__["default"] = (StepProducts);

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

/***/ "./src/OnboardingSPA/pages/Steps/Ecommerce/content.json":
/*!**************************************************************!*\
  !*** ./src/OnboardingSPA/pages/Steps/Ecommerce/content.json ***!
  \**************************************************************/
/***/ (function(module) {

module.exports = JSON.parse('{"stepProductsHeading":"Tell us about your products","stepProductsSubHeading":"What type of products will you be selling?","stepProductsQuestion":"How many products will you be selling?","stepTaxHeading":"Configure your tax information","stepTaxSubHeading":"Do you want to enable tax rates and calculations?","stepAddressHeading":"Confirm your business or store address","stepAddressSubHeading":"We’ll use this information to help you setup your online store","stepTaxOptions":[{"content":"Yes, enable tax rates and calculations","value":"1","data":{"wc_connect_taxes_enabled":"no","woocommerce_calc_taxes":"yes"}},{"content":"I will configure my own tax information later","value":"3","data":{"wc_connect_taxes_enabled":"no","woocommerce_calc_taxes":"no"}},{"content":"I don\'t charge sales tax","value":"5","data":{"woocommerce_no_sales_tax":true,"woocommerce_calc_taxes":"no"}}],"buttonText":"Continue Setup","productOptions":[{"content":"Physical products","value":"physical"},{"content":"Digital / Downloadable products","value":"downloads"},{"content":"Subscriptions","value":"subscriptions"},{"content":"Book rooms, houses or rent products","value":"bookings"},{"content":"Membership","value":"memberships"},{"content":"Customizable products","value":"product-add-ons"},{"content":"Bundles of products","value":"product-bundles"},{"content":"Let your users ask a quote for your products","value":"product-quotes"}],"stepProductNumbers":[{"content":"0","value":"0"},{"content":"1 - 10","value":"1-10"},{"content":"11 - 100","value":"11-100"},{"content":"101 - 1000","value":"101-1000"},{"content":"1000 +","value":"1000+"}]}');

/***/ })

}]);
//# sourceMappingURL=src_OnboardingSPA_pages_Steps_Ecommerce_StepProducts_index_js.js.map