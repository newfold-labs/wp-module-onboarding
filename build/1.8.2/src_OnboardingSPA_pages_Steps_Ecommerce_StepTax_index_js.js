"use strict";
(globalThis["webpackChunknewfold_Onboarding"] = globalThis["webpackChunknewfold_Onboarding"] || []).push([["src_OnboardingSPA_pages_Steps_Ecommerce_StepTax_index_js"],{

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

/***/ "./src/OnboardingSPA/pages/Steps/Ecommerce/StepTax/contents.js":
/*!*********************************************************************!*\
  !*** ./src/OnboardingSPA/pages/Steps/Ecommerce/StepTax/contents.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);


const getContents = () => {
  return {
    heading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Configure your tax information', 'wp-module-onboarding'),
    subheading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Do you want to enable tax rates and calculations?', 'wp-module-onboarding'),
    options: [{
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Yes, enable tax rates and calculations', 'wp-module-onboarding'),
      value: '1',
      data: {
        wc_connect_taxes_enabled: 'yes',
        woocommerce_calc_taxes: 'yes'
      }
    }, {
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('I will configure my own tax information later', 'wp-module-onboarding'),
      value: '3',
      data: {
        wc_connect_taxes_enabled: 'no',
        woocommerce_calc_taxes: 'yes'
      }
    }, {
      content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("I don't charge sales tax", 'wp-module-onboarding'),
      value: '5',
      data: {
        woocommerce_no_sales_tax: true,
        woocommerce_calc_taxes: 'no',
        wc_connect_taxes_enabled: 'no'
      }
    }],
    buttonText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Continue Setup', 'wp-module-onboarding')
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getContents);

/***/ }),

/***/ "./src/OnboardingSPA/pages/Steps/Ecommerce/StepTax/index.js":
/*!******************************************************************!*\
  !*** ./src/OnboardingSPA/pages/Steps/Ecommerce/StepTax/index.js ***!
  \******************************************************************/
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
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../constants */ "./src/constants.js");
/* harmony import */ var _components_CardHeader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/CardHeader */ "./src/OnboardingSPA/components/CardHeader/index.js");
/* harmony import */ var _components_Layouts_Common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/Layouts/Common */ "./src/OnboardingSPA/components/Layouts/Common.js");
/* harmony import */ var _components_NeedHelpTag__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/NeedHelpTag */ "./src/OnboardingSPA/components/NeedHelpTag/index.js");
/* harmony import */ var _components_NewfoldLargeCard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/NewfoldLargeCard */ "./src/OnboardingSPA/components/NewfoldLargeCard/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _useWPSettings__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../useWPSettings */ "./src/OnboardingSPA/pages/Steps/Ecommerce/useWPSettings.js");
/* harmony import */ var _components_Animate__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/Animate */ "./src/OnboardingSPA/components/Animate/index.js");
/* harmony import */ var _contents__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./contents */ "./src/OnboardingSPA/pages/Steps/Ecommerce/StepTax/contents.js");
/* harmony import */ var _utils_analytics__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../utils/analytics */ "./src/OnboardingSPA/utils/analytics/index.js");
















function createReverseLookup(state) {
  return option => Object.entries(option.data).every(_ref => {
    let [key, value] = _ref;
    return (state === null || state === void 0 ? void 0 : state[key]) === value;
  });
}

const StepTax = () => {
  const {
    setDrawerActiveView,
    setSidebarActiveView,
    setCurrentOnboardingData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_8__.store);
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_13__.useNavigate)();
  const [settings, setSettings] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const currentData = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => select(_store__WEBPACK_IMPORTED_MODULE_8__.store).getCurrentOnboardingData());

  const setWPSettings = async () => {
    const wpSettings = await (0,_useWPSettings__WEBPACK_IMPORTED_MODULE_9__.useWPSettings)();
    setSettings(wpSettings);
  };

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setSidebarActiveView(_constants__WEBPACK_IMPORTED_MODULE_3__.SIDEBAR_LEARN_MORE);
    setDrawerActiveView(_constants__WEBPACK_IMPORTED_MODULE_3__.VIEW_NAV_ECOMMERCE_STORE_INFO);
    setWPSettings();
  }, []);
  const content = (0,_contents__WEBPACK_IMPORTED_MODULE_11__["default"])();
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (settings && settings !== null && currentData.storeDetails.tax === undefined) {
      var _selectedTaxOption$da, _currentData$storeDet;

      const selectedTaxOption = content.options.find(createReverseLookup(settings));
      const tax = (_selectedTaxOption$da = selectedTaxOption === null || selectedTaxOption === void 0 ? void 0 : selectedTaxOption.data) !== null && _selectedTaxOption$da !== void 0 ? _selectedTaxOption$da : {};
      setCurrentOnboardingData({ ...currentData,
        storeDetails: { ...currentData.storeDetails,
          tax: { ...((_currentData$storeDet = currentData.storeDetails.tax) !== null && _currentData$storeDet !== void 0 ? _currentData$storeDet : {}),
            ...tax,
            option: selectedTaxOption === null || selectedTaxOption === void 0 ? void 0 : selectedTaxOption.value,
            isStoreDetailsFilled: settings.woocommerce_store_postcode !== null
          }
        }
      });
    }
  }, [settings, currentData.storeDetails]);
  const {
    tax
  } = currentData.storeDetails;

  const handleButtonClick = () => {
    //Commented as auto-calculate tax option is removed for MMP
    // let isAddressNeeded = tax?.option === "1" && !tax.isStoreDetailsFilled;
    // navigate(
    // 	isAddressNeeded ? '/ecommerce/step/address' : '/ecommerce/step/products'
    // );
    navigate('/ecommerce/step/products');
  };

  const selectOption = value => {
    const selectedOption = content.options.find(option => option.value === value);
    setCurrentOnboardingData({ ...currentData,
      storeDetails: { ...currentData.storeDetails,
        tax: { ...selectedOption.data,
          option: selectedOption.value,
          isStoreDetailsFilled: tax === null || tax === void 0 ? void 0 : tax.isStoreDetailsFilled
        }
      }
    });
    (0,_utils_analytics__WEBPACK_IMPORTED_MODULE_12__.trackHiiveEvent)('tax-information', selectedOption.content);
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Layouts_Common__WEBPACK_IMPORTED_MODULE_5__["default"], {
    isBgPrimary: true,
    isCentered: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_NewfoldLargeCard__WEBPACK_IMPORTED_MODULE_7__["default"], {
    className: "ecommerce-step"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-experience-step onboarding-ecommerce-step"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-card-heading center onboarding-ecommerce-step"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_CardHeader__WEBPACK_IMPORTED_MODULE_4__["default"], {
    heading: content.heading,
    subHeading: content.subheading
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Animate__WEBPACK_IMPORTED_MODULE_10__["default"], {
    type: 'fade-in-disabled',
    after: settings
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RadioControl, {
    className: 'nfd-onboarding-experience-step-tabs components-radio-control__input radio-control-tax-step radio-control-main',
    selected: tax === null || tax === void 0 ? void 0 : tax.option,
    options: content.options.map(option => {
      return {
        label: option.content,
        value: option.value
      };
    }),
    onChange: value => selectOption(value)
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "nfd-nav-card-button nfd-card-button",
    disabled: settings === null || (tax === null || tax === void 0 ? void 0 : tax.option) === undefined,
    onClick: handleButtonClick
  }, content.buttonText), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_NeedHelpTag__WEBPACK_IMPORTED_MODULE_6__["default"], null))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StepTax);

/***/ }),

/***/ "./src/OnboardingSPA/pages/Steps/Ecommerce/useWPSettings.js":
/*!******************************************************************!*\
  !*** ./src/OnboardingSPA/pages/Steps/Ecommerce/useWPSettings.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useWPSettings": () => (/* binding */ useWPSettings)
/* harmony export */ });
/* harmony import */ var _utils_api_ecommerce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/api/ecommerce */ "./src/OnboardingSPA/utils/api/ecommerce.js");

async function useWPSettings() {
  const settings = await (0,_utils_api_ecommerce__WEBPACK_IMPORTED_MODULE_0__.fetchWPSettings)().catch(() => ({}));
  return settings;
}

/***/ })

}]);
//# sourceMappingURL=src_OnboardingSPA_pages_Steps_Ecommerce_StepTax_index_js.js.map