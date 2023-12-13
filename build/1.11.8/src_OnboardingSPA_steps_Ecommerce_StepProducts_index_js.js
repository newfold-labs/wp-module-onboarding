"use strict";
(globalThis["webpackChunknewfold_Onboarding"] = globalThis["webpackChunknewfold_Onboarding"] || []).push([["src_OnboardingSPA_steps_Ecommerce_StepProducts_index_js"],{

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

/***/ "./src/OnboardingSPA/steps/Ecommerce/StepProducts/contents.js":
/*!********************************************************************!*\
  !*** ./src/OnboardingSPA/steps/Ecommerce/StepProducts/contents.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);


const getContents = () => {
  return {
    heading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Tell us about your products', 'wp-module-onboarding'),
    subheading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('What type of products will you be selling?', 'wp-module-onboarding'),
    question: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('How many products will you be selling?', 'wp-module-onboarding'),
    typeOptions: [{
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Physical products', 'wp-module-onboarding'),
      value: 'physical'
    }, {
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Digital / Downloadable products', 'wp-module-onboarding'),
      value: 'downloads'
    }, {
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Subscriptions', 'wp-module-onboarding'),
      value: 'subscriptions'
    }, {
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Book rooms, houses or rent products', 'wp-module-onboarding'),
      value: 'bookings'
    }, {
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Membership', 'wp-module-onboarding'),
      value: 'memberships'
    }, {
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Customizable products', 'wp-module-onboarding'),
      value: 'product-add-ons'
    }, {
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Bundles of products', 'wp-module-onboarding'),
      value: 'product-bundles'
    }, {
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Let your users ask a quote for your products', 'wp-module-onboarding'),
      value: 'product-quotes'
    }],
    numberOptions: [{
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('0', 'wp-module-onboarding'),
      value: '0'
    }, {
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('1 - 10', 'wp-module-onboarding'),
      value: '1-10'
    }, {
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('11 - 100', 'wp-module-onboarding'),
      value: '11-100'
    }, {
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('101 - 1000', 'wp-module-onboarding'),
      value: '101-1000'
    }, {
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('1000 +', 'wp-module-onboarding'),
      value: '1000+'
    }],
    buttonText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Continue Setup', 'wp-module-onboarding')
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getContents);

/***/ }),

/***/ "./src/OnboardingSPA/steps/Ecommerce/StepProducts/index.js":
/*!*****************************************************************!*\
  !*** ./src/OnboardingSPA/steps/Ecommerce/StepProducts/index.js ***!
  \*****************************************************************/
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
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.js");
/* harmony import */ var _components_Button_NavCardButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/Button/NavCardButton */ "./src/OnboardingSPA/components/Button/NavCardButton/index.js");
/* harmony import */ var _components_CardHeader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/CardHeader */ "./src/OnboardingSPA/components/CardHeader/index.js");
/* harmony import */ var _components_Layouts_Common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/Layouts/Common */ "./src/OnboardingSPA/components/Layouts/Common.js");
/* harmony import */ var _components_NeedHelpTag__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/NeedHelpTag */ "./src/OnboardingSPA/components/NeedHelpTag/index.js");
/* harmony import */ var _components_NewfoldLargeCard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../components/NewfoldLargeCard */ "./src/OnboardingSPA/components/NewfoldLargeCard/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _contents__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./contents */ "./src/OnboardingSPA/steps/Ecommerce/StepProducts/contents.js");













const StepProducts = () => {
  const {
    setDrawerActiveView,
    setSidebarActiveView,
    setCurrentOnboardingData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_9__.store);
  const currentData = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => select(_store__WEBPACK_IMPORTED_MODULE_9__.store).getCurrentOnboardingData());
  const productInfo = currentData.storeDetails.productInfo;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setSidebarActiveView(_constants__WEBPACK_IMPORTED_MODULE_3__.SIDEBAR_LEARN_MORE);
    setDrawerActiveView(_constants__WEBPACK_IMPORTED_MODULE_3__.VIEW_NAV_ECOMMERCE_STORE_INFO);
  }, []);

  const handleCheckbox = (value, checked) => setCurrentOnboardingData({ ...currentData,
    storeDetails: { ...currentData.storeDetails,
      productInfo: { ...productInfo,
        product_types: checked ? [...(productInfo === null || productInfo === void 0 ? void 0 : productInfo.product_types), value] : productInfo === null || productInfo === void 0 ? void 0 : productInfo.product_types.filter(product => product !== value)
      }
    }
  });

  const handleProductCount = count => setCurrentOnboardingData({ ...currentData,
    storeDetails: { ...currentData.storeDetails,
      productInfo: { ...productInfo,
        product_count: count
      }
    }
  });

  const content = (0,_contents__WEBPACK_IMPORTED_MODULE_10__["default"])();
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Layouts_Common__WEBPACK_IMPORTED_MODULE_6__["default"], {
    isBgPrimary: true,
    isCentered: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_NewfoldLargeCard__WEBPACK_IMPORTED_MODULE_8__["default"], {
    className: "ecommerce-step"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-experience-step onboarding-product-step onboarding-ecommerce-step"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-card-heading center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_CardHeader__WEBPACK_IMPORTED_MODULE_5__["default"], {
    heading: content.heading,
    subHeading: content.subheading
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-product-step-options"
  }, content.typeOptions.map(product => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CheckboxControl, {
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
  }, content.question), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RadioControl, {
    className: "components-radio-control__input",
    selected: productInfo === null || productInfo === void 0 ? void 0 : productInfo.product_count,
    options: content.numberOptions.map(option => {
      return {
        label: option.content,
        value: option.value
      };
    }),
    onChange: handleProductCount
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Button_NavCardButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
    text: content.buttonText
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_NeedHelpTag__WEBPACK_IMPORTED_MODULE_7__["default"], null))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StepProducts);

/***/ })

}]);
//# sourceMappingURL=src_OnboardingSPA_steps_Ecommerce_StepProducts_index_js.js.map