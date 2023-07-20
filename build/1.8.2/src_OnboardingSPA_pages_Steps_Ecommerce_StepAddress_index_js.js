"use strict";
(globalThis["webpackChunknewfold_Onboarding"] = globalThis["webpackChunknewfold_Onboarding"] || []).push([["src_OnboardingSPA_pages_Steps_Ecommerce_StepAddress_index_js"],{

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

/***/ "./src/OnboardingSPA/pages/Steps/Ecommerce/StepAddress/contents.js":
/*!*************************************************************************!*\
  !*** ./src/OnboardingSPA/pages/Steps/Ecommerce/StepAddress/contents.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);


const getContents = () => {
  return {
    heading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Confirm your business or store address', 'wp-module-onboarding'),
    subheading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('We’ll use this information to help you setup your online store', 'wp-module-onboarding'),
    countryInputLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Where is your store based?', 'wp-module-onboarding'),
    addressInputLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Address', 'wp-module-onboarding'),
    cityInputLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('City', 'wp-module-onboarding'),
    stateInputLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('State', 'wp-module-onboarding'),
    postalCodeInputLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Postal Code', 'wp-module-onboarding'),
    emailInputLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Email', 'wp-module-onboarding'),
    currencyInputLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('What currency do you want to display in your store?', 'wp-module-onboarding'),
    requiredText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('* required', 'wp-module-onboarding'),
    buttonText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Continue Setup', 'wp-module-onboarding')
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getContents);

/***/ }),

/***/ "./src/OnboardingSPA/pages/Steps/Ecommerce/StepAddress/index.js":
/*!**********************************************************************!*\
  !*** ./src/OnboardingSPA/pages/Steps/Ecommerce/StepAddress/index.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../constants */ "./src/constants.js");
/* harmony import */ var _components_CardHeader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/CardHeader */ "./src/OnboardingSPA/components/CardHeader/index.js");
/* harmony import */ var _components_Layouts_Common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/Layouts/Common */ "./src/OnboardingSPA/components/Layouts/Common.js");
/* harmony import */ var _components_NeedHelpTag__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/NeedHelpTag */ "./src/OnboardingSPA/components/NeedHelpTag/index.js");
/* harmony import */ var _components_NewfoldLargeCard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/NewfoldLargeCard */ "./src/OnboardingSPA/components/NewfoldLargeCard/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _countries_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../countries.json */ "./src/OnboardingSPA/pages/Steps/Ecommerce/countries.json");
/* harmony import */ var _currencies_json__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../currencies.json */ "./src/OnboardingSPA/pages/Steps/Ecommerce/currencies.json");
/* harmony import */ var _useWPSettings__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../useWPSettings */ "./src/OnboardingSPA/pages/Steps/Ecommerce/useWPSettings.js");
/* harmony import */ var _components_Animate__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/Animate */ "./src/OnboardingSPA/components/Animate/index.js");
/* harmony import */ var _contents__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./contents */ "./src/OnboardingSPA/pages/Steps/Ecommerce/StepAddress/contents.js");


















const StepAddress = () => {
  var _address$woocommerce_, _address$country, _countries$find$state, _countries$find;

  const [settings, setSettings] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)();
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_15__.useNavigate)();
  const isLargeViewport = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.useViewportMatch)('medium');
  const {
    setDrawerActiveView,
    setIsDrawerOpened,
    setIsDrawerSuppressed,
    setSidebarActiveView,
    setCurrentOnboardingData,
    setIsHeaderNavigationEnabled
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_9__.store);

  const getDefaultValues = brand => {
    switch (brand) {
      case 'crazy-domains':
        return {
          woocommerce_default_country: 'AU:NSW',
          woocommerce_currency: 'AUD'
        };

      case 'bluehost-india':
        return {
          woocommerce_default_country: 'IN:AP',
          woocommerce_currency: 'INR'
        };

      case 'bluehost':
      default:
        return {
          woocommerce_default_country: 'US:AZ',
          woocommerce_currency: 'USD'
        };
    }
  };
  /**
   * When WC in installed, it sets a bunch of defaults related to country etc
   * which is detected by matching a set of values.
   *
   * @param {Record<string, string | null>} options
   * @return {boolean} Is default address set
   */


  const isDefaultAddressSet = options => {
    const emptyFields = ['woocommerce_store_address', 'woocommerce_store_city', 'woocommerce_store_postcode'];
    const areAddressFieldsEmpty = emptyFields.every(key => options[key] === null || options[key] === '');
    const wcDefaults = [['woocommerce_default_country', 'US:CA'], ['woocommerce_currency', 'USD']];
    const isCountryUSA = wcDefaults.every(_ref => {
      let [key, value] = _ref;
      return options[key] === value;
    });
    return areAddressFieldsEmpty && isCountryUSA;
  };

  const setNavigationState = () => {
    if (isLargeViewport) {
      setIsDrawerOpened(true);
    }

    setIsDrawerSuppressed(false);
    setIsHeaderNavigationEnabled(true);
  };

  const setWPSettings = async () => {
    const wpSettings = await (0,_useWPSettings__WEBPACK_IMPORTED_MODULE_12__.useWPSettings)();
    setSettings(wpSettings);
  };

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setNavigationState();
    setSidebarActiveView(_constants__WEBPACK_IMPORTED_MODULE_4__.SIDEBAR_LEARN_MORE);
    setDrawerActiveView(_constants__WEBPACK_IMPORTED_MODULE_4__.VIEW_NAV_ECOMMERCE_STORE_INFO);
    setWPSettings();
  }, []);
  const {
    currentData,
    newfoldBrand
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    return {
      currentData: select(_store__WEBPACK_IMPORTED_MODULE_9__.store).getCurrentOnboardingData(),
      newfoldBrand: select(_store__WEBPACK_IMPORTED_MODULE_9__.store).getNewfoldBrand()
    };
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (settings) {
      const addressKeys = ['woocommerce_store_address', 'woocommerce_store_city', 'woocommerce_store_postcode', 'woocommerce_default_country', 'woocommerce_currency', 'woocommerce_email_from_address'];
      const keysWithDefaultValues = ['woocommerce_default_country', 'woocommerce_currency'];

      if (settings !== null && currentData.storeDetails.address === undefined) {
        var _currentData$storeDet;

        const useDefaultValues = isDefaultAddressSet(settings);
        const addressToBeSet = { ...settings
        };
        const defaultValues = getDefaultValues(newfoldBrand);

        for (const key of keysWithDefaultValues) {
          if (addressToBeSet[key] === null || addressToBeSet[key] === '' || useDefaultValues) {
            addressToBeSet[key] = defaultValues[key];
          }
        }

        setCurrentOnboardingData({ ...currentData,
          storeDetails: { ...currentData.storeDetails,
            address: { ...((_currentData$storeDet = currentData.storeDetails.address) !== null && _currentData$storeDet !== void 0 ? _currentData$storeDet : {}),
              ...addressKeys.reduce((address, key) => ({ ...address,
                [key]: addressToBeSet[key]
              }), {})
            }
          }
        });
      }
    }
  }, [settings, currentData.storeDetails, newfoldBrand]);
  const {
    address
  } = currentData.storeDetails;
  const fieldProps = {
    disabled: address === undefined,
    onChange: handleFieldChange,
    onBlur: handleFieldChange
  };
  const defaultPlace = (_address$woocommerce_ = address === null || address === void 0 ? void 0 : address.woocommerce_default_country) !== null && _address$woocommerce_ !== void 0 ? _address$woocommerce_ : '';
  const [defaultCountry, defaultState] = defaultPlace.split(':');
  const selectedCountry = (_address$country = address === null || address === void 0 ? void 0 : address.country) !== null && _address$country !== void 0 ? _address$country : defaultCountry;
  const states = (_countries$find$state = _countries_json__WEBPACK_IMPORTED_MODULE_10__ === null || _countries_json__WEBPACK_IMPORTED_MODULE_10__ === void 0 ? void 0 : (_countries$find = _countries_json__WEBPACK_IMPORTED_MODULE_10__.find(country => country.code === selectedCountry)) === null || _countries$find === void 0 ? void 0 : _countries$find.states) !== null && _countries$find$state !== void 0 ? _countries$find$state : [];

  function handleFieldChange(event) {
    const fieldName = event.target.name;
    const newValue = event.target.value;
    let {
      country = selectedCountry,
      state
    } = address;

    if (country === defaultCountry && state === undefined) {
      state = defaultState;
    }

    if (states.length === 0) {
      state = ''; // edge case to handle when the user goes back to onboarding and changes from a country with state to no state
    }

    let place = '';

    if (['country', 'state'].includes(fieldName)) {
      if (fieldName === 'country') {
        place = state ? `${newValue}:${state}` : newValue;
      } else {
        place = `${country}:${newValue}`;
      }
    }

    setCurrentOnboardingData({ ...currentData,
      storeDetails: { ...currentData.storeDetails,
        address: { ...currentData.storeDetails.address,
          [fieldName]: newValue,
          ...(place !== '' && {
            woocommerce_default_country: place
          })
        }
      }
    });
  }

  const content = (0,_contents__WEBPACK_IMPORTED_MODULE_14__["default"])();
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_Layouts_Common__WEBPACK_IMPORTED_MODULE_6__["default"], {
    isBgPrimary: true,
    isCentered: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_NewfoldLargeCard__WEBPACK_IMPORTED_MODULE_8__["default"], {
    className: "ecommerce-step nfd-ecommerce-address-step"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "onboarding-ecommerce-step"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("form", {
    className: "onboarding-ecommerce-step",
    onSubmit: event => {
      event.preventDefault();
      event.stopPropagation(); //Commented as auto-calculate tax option is removed for MMP
      // let selectedTaxOption = content.stepTaxOptions.find((option) =>
      // 	Object.entries(option.data).every(
      // 		([optionName, requiredValue]) =>
      // 			settings?.[optionName] === requiredValue
      // 	)
      // );
      // navigate(
      // 	selectedTaxOption === undefined
      // 		? '/ecommerce/step/tax'
      // 		: '/ecommerce/step/products'
      // );

      navigate('/ecommerce/step/tax');
    },
    style: {
      display: 'grid',
      justifyItems: 'center'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "nfd-card-heading center onboarding-ecommerce-step"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_CardHeader__WEBPACK_IMPORTED_MODULE_5__["default"], {
    heading: content.heading,
    subHeading: content.subheading
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_Animate__WEBPACK_IMPORTED_MODULE_13__["default"], {
    type: 'fade-in-disabled',
    after: address !== undefined
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: 'store-address-form'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    "data-name": "country"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
    "aria-required": true,
    htmlFor: "country"
  }, content.countryInputLabel), address === undefined ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("input", {
    id: "country",
    name: "country",
    type: "text",
    disabled: true
  }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("select", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    type: "text",
    name: "country",
    required: true,
    defaultValue: selectedCountry
  }, fieldProps), _countries_json__WEBPACK_IMPORTED_MODULE_10__.map(country => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("option", {
    key: country.code,
    value: country.code
  }, country.name)))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    "data-name": "woocommerce_store_address"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
    "aria-required": true,
    htmlFor: "woocommerce_store_address"
  }, content.addressInputLabel), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("input", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    id: "woocommerce_store_address",
    name: "woocommerce_store_address",
    type: "text",
    required: true,
    defaultValue: address === null || address === void 0 ? void 0 : address.woocommerce_store_address
  }, fieldProps))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    "data-name": "full-address",
    "data-state-empty": states.length === 0
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    "data-name": "woocommerce_store_city"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
    "aria-required": true,
    htmlFor: "woocommerce_store_city"
  }, content.cityInputLabel), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("input", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    name: "woocommerce_store_city",
    id: "woocommerce_store_city",
    type: "text",
    required: true,
    defaultValue: address === null || address === void 0 ? void 0 : address.woocommerce_store_city
  }, fieldProps))), states.length === 0 || address === undefined ? null : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    "data-name": "state"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
    "aria-required": true,
    htmlFor: "state"
  }, content.stateInputLabel), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("select", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    id: "state",
    type: "text",
    name: "state",
    required: true,
    defaultValue: selectedCountry === defaultCountry ? defaultState : ''
  }, fieldProps), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("option", {
    key: '',
    value: '',
    selected: true
  }), states.map(state => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("option", {
    key: state.code,
    value: state.code
  }, state.name)))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    "data-name": "woocommerce_store_postcode"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
    "aria-required": true,
    htmlFor: "woocommerce_store_postcode"
  }, content.postalCodeInputLabel), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("input", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    id: "woocommerce_store_postcode",
    name: "woocommerce_store_postcode",
    type: "text",
    required: true,
    defaultValue: address === null || address === void 0 ? void 0 : address.woocommerce_store_postcode
  }, fieldProps)))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
    "aria-required": true,
    htmlFor: "woocommerce_email_from_address"
  }, content.emailInputLabel), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("input", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    name: "woocommerce_email_from_address",
    id: "woocommerce_email_from_address",
    type: "email",
    required: true,
    defaultValue: address === null || address === void 0 ? void 0 : address.woocommerce_email_from_address
  }, fieldProps))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
    htmlFor: "woocommerce_currency"
  }, content.currencyInputLabel), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("select", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    id: "woocommerce_currency",
    type: "text",
    name: "woocommerce_currency",
    value: address === null || address === void 0 ? void 0 : address.woocommerce_currency
  }, fieldProps), Object.entries(_currencies_json__WEBPACK_IMPORTED_MODULE_11__).map(_ref2 => {
    let [code, currency] = _ref2;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("option", {
      key: code,
      value: code,
      dangerouslySetInnerHTML: {
        __html: currency
      }
    });
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("em", {
    style: {
      display: 'inline'
    }
  }, content.requiredText))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    className: "nfd-nav-card-button nfd-card-button",
    disabled: address === undefined,
    type: "submit"
  }, content.buttonText)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_NeedHelpTag__WEBPACK_IMPORTED_MODULE_7__["default"], null))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StepAddress);

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

/***/ }),

/***/ "./src/OnboardingSPA/pages/Steps/Ecommerce/countries.json":
/*!****************************************************************!*\
  !*** ./src/OnboardingSPA/pages/Steps/Ecommerce/countries.json ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = JSON.parse('[{"code":"AF","name":"Afghanistan","states":[]},{"code":"AX","name":"Åland Islands","states":[]},{"code":"DZ","name":"Algeria","states":[{"code":"DZ-01","name":"Adrar"},{"code":"DZ-02","name":"Chlef"},{"code":"DZ-03","name":"Laghouat"},{"code":"DZ-04","name":"Oum El Bouaghi"},{"code":"DZ-05","name":"Batna"},{"code":"DZ-06","name":"Béjaïa"},{"code":"DZ-07","name":"Biskra"},{"code":"DZ-08","name":"Béchar"},{"code":"DZ-09","name":"Blida"},{"code":"DZ-10","name":"Bouira"},{"code":"DZ-11","name":"Tamanghasset"},{"code":"DZ-12","name":"Tébessa"},{"code":"DZ-13","name":"Tlemcen"},{"code":"DZ-14","name":"Tiaret"},{"code":"DZ-15","name":"Tizi Ouzou"},{"code":"DZ-16","name":"Algiers"},{"code":"DZ-17","name":"Djelfa"},{"code":"DZ-18","name":"Jijel"},{"code":"DZ-19","name":"Sétif"},{"code":"DZ-20","name":"Saïda"},{"code":"DZ-21","name":"Skikda"},{"code":"DZ-22","name":"Sidi Bel Abbès"},{"code":"DZ-23","name":"Annaba"},{"code":"DZ-24","name":"Guelma"},{"code":"DZ-25","name":"Constantine"},{"code":"DZ-26","name":"Médéa"},{"code":"DZ-27","name":"Mostaganem"},{"code":"DZ-28","name":"M’Sila"},{"code":"DZ-29","name":"Mascara"},{"code":"DZ-30","name":"Ouargla"},{"code":"DZ-31","name":"Oran"},{"code":"DZ-32","name":"El Bayadh"},{"code":"DZ-33","name":"Illizi"},{"code":"DZ-34","name":"Bordj Bou Arréridj"},{"code":"DZ-35","name":"Boumerdès"},{"code":"DZ-36","name":"El Tarf"},{"code":"DZ-37","name":"Tindouf"},{"code":"DZ-38","name":"Tissemsilt"},{"code":"DZ-39","name":"El Oued"},{"code":"DZ-40","name":"Khenchela"},{"code":"DZ-41","name":"Souk Ahras"},{"code":"DZ-42","name":"Tipasa"},{"code":"DZ-43","name":"Mila"},{"code":"DZ-44","name":"Aïn Defla"},{"code":"DZ-45","name":"Naama"},{"code":"DZ-46","name":"Aïn Témouchent"},{"code":"DZ-47","name":"Ghardaïa"},{"code":"DZ-48","name":"Relizane"}]},{"code":"AS","name":"American Samoa","states":[]},{"code":"AD","name":"Andorra","states":[]},{"code":"AO","name":"Angola","states":[{"code":"BGO","name":"Bengo"},{"code":"BLU","name":"Benguela"},{"code":"BIE","name":"Bié"},{"code":"CAB","name":"Cabinda"},{"code":"CNN","name":"Cunene"},{"code":"HUA","name":"Huambo"},{"code":"HUI","name":"Huíla"},{"code":"CCU","name":"Kuando Kubango"},{"code":"CNO","name":"Kwanza-Norte"},{"code":"CUS","name":"Kwanza-Sul"},{"code":"LUA","name":"Luanda"},{"code":"LNO","name":"Lunda-Norte"},{"code":"LSU","name":"Lunda-Sul"},{"code":"MAL","name":"Malanje"},{"code":"MOX","name":"Moxico"},{"code":"NAM","name":"Namibe"},{"code":"UIG","name":"Uíge"},{"code":"ZAI","name":"Zaire"}]},{"code":"AI","name":"Anguilla","states":[]},{"code":"AQ","name":"Antarctica","states":[]},{"code":"AG","name":"Antigua and Barbuda","states":[]},{"code":"AR","name":"Argentina","states":[{"code":"C","name":"Ciudad Autónoma de Buenos Aires"},{"code":"B","name":"Buenos Aires"},{"code":"K","name":"Catamarca"},{"code":"H","name":"Chaco"},{"code":"U","name":"Chubut"},{"code":"X","name":"Córdoba"},{"code":"W","name":"Corrientes"},{"code":"E","name":"Entre Ríos"},{"code":"P","name":"Formosa"},{"code":"Y","name":"Jujuy"},{"code":"L","name":"La Pampa"},{"code":"F","name":"La Rioja"},{"code":"M","name":"Mendoza"},{"code":"N","name":"Misiones"},{"code":"Q","name":"Neuquén"},{"code":"R","name":"Río Negro"},{"code":"A","name":"Salta"},{"code":"J","name":"San Juan"},{"code":"D","name":"San Luis"},{"code":"Z","name":"Santa Cruz"},{"code":"S","name":"Santa Fe"},{"code":"G","name":"Santiago del Estero"},{"code":"V","name":"Tierra del Fuego"},{"code":"T","name":"Tucumán"}]},{"code":"AM","name":"Armenia","states":[]},{"code":"AW","name":"Aruba","states":[]},{"code":"AU","name":"Australia","states":[{"code":"ACT","name":"Australian Capital Territory"},{"code":"NSW","name":"New South Wales"},{"code":"NT","name":"Northern Territory"},{"code":"QLD","name":"Queensland"},{"code":"SA","name":"South Australia"},{"code":"TAS","name":"Tasmania"},{"code":"VIC","name":"Victoria"},{"code":"WA","name":"Western Australia"}]},{"code":"AT","name":"Austria","states":[]},{"code":"AZ","name":"Azerbaijan","states":[]},{"code":"BS","name":"Bahamas","states":[]},{"code":"BH","name":"Bahrain","states":[]},{"code":"BD","name":"Bangladesh","states":[{"code":"BD-05","name":"Bagerhat"},{"code":"BD-01","name":"Bandarban"},{"code":"BD-02","name":"Barguna"},{"code":"BD-06","name":"Barishal"},{"code":"BD-07","name":"Bhola"},{"code":"BD-03","name":"Bogura"},{"code":"BD-04","name":"Brahmanbaria"},{"code":"BD-09","name":"Chandpur"},{"code":"BD-10","name":"Chattogram"},{"code":"BD-12","name":"Chuadanga"},{"code":"BD-11","name":"Cox\'s Bazar"},{"code":"BD-08","name":"Cumilla"},{"code":"BD-13","name":"Dhaka"},{"code":"BD-14","name":"Dinajpur"},{"code":"BD-15","name":"Faridpur "},{"code":"BD-16","name":"Feni"},{"code":"BD-19","name":"Gaibandha"},{"code":"BD-18","name":"Gazipur"},{"code":"BD-17","name":"Gopalganj"},{"code":"BD-20","name":"Habiganj"},{"code":"BD-21","name":"Jamalpur"},{"code":"BD-22","name":"Jashore"},{"code":"BD-25","name":"Jhalokati"},{"code":"BD-23","name":"Jhenaidah"},{"code":"BD-24","name":"Joypurhat"},{"code":"BD-29","name":"Khagrachhari"},{"code":"BD-27","name":"Khulna"},{"code":"BD-26","name":"Kishoreganj"},{"code":"BD-28","name":"Kurigram"},{"code":"BD-30","name":"Kushtia"},{"code":"BD-31","name":"Lakshmipur"},{"code":"BD-32","name":"Lalmonirhat"},{"code":"BD-36","name":"Madaripur"},{"code":"BD-37","name":"Magura"},{"code":"BD-33","name":"Manikganj "},{"code":"BD-39","name":"Meherpur"},{"code":"BD-38","name":"Moulvibazar"},{"code":"BD-35","name":"Munshiganj"},{"code":"BD-34","name":"Mymensingh"},{"code":"BD-48","name":"Naogaon"},{"code":"BD-43","name":"Narail"},{"code":"BD-40","name":"Narayanganj"},{"code":"BD-42","name":"Narsingdi"},{"code":"BD-44","name":"Natore"},{"code":"BD-45","name":"Nawabganj"},{"code":"BD-41","name":"Netrakona"},{"code":"BD-46","name":"Nilphamari"},{"code":"BD-47","name":"Noakhali"},{"code":"BD-49","name":"Pabna"},{"code":"BD-52","name":"Panchagarh"},{"code":"BD-51","name":"Patuakhali"},{"code":"BD-50","name":"Pirojpur"},{"code":"BD-53","name":"Rajbari"},{"code":"BD-54","name":"Rajshahi"},{"code":"BD-56","name":"Rangamati"},{"code":"BD-55","name":"Rangpur"},{"code":"BD-58","name":"Satkhira"},{"code":"BD-62","name":"Shariatpur"},{"code":"BD-57","name":"Sherpur"},{"code":"BD-59","name":"Sirajganj"},{"code":"BD-61","name":"Sunamganj"},{"code":"BD-60","name":"Sylhet"},{"code":"BD-63","name":"Tangail"},{"code":"BD-64","name":"Thakurgaon"}]},{"code":"BB","name":"Barbados","states":[]},{"code":"PW","name":"Belau","states":[]},{"code":"BE","name":"Belgium","states":[]},{"code":"BZ","name":"Belize","states":[]},{"code":"BJ","name":"Benin","states":[{"code":"AL","name":"Alibori"},{"code":"AK","name":"Atakora"},{"code":"AQ","name":"Atlantique"},{"code":"BO","name":"Borgou"},{"code":"CO","name":"Collines"},{"code":"KO","name":"Kouffo"},{"code":"DO","name":"Donga"},{"code":"LI","name":"Littoral"},{"code":"MO","name":"Mono"},{"code":"OU","name":"Ouémé"},{"code":"PL","name":"Plateau"},{"code":"ZO","name":"Zou"}]},{"code":"BM","name":"Bermuda","states":[]},{"code":"BT","name":"Bhutan","states":[]},{"code":"BO","name":"Bolivia","states":[{"code":"BO-B","name":"Beni"},{"code":"BO-H","name":"Chuquisaca"},{"code":"BO-C","name":"Cochabamba"},{"code":"BO-L","name":"La Paz"},{"code":"BO-O","name":"Oruro"},{"code":"BO-N","name":"Pando"},{"code":"BO-P","name":"Potosí"},{"code":"BO-S","name":"Santa Cruz"},{"code":"BO-T","name":"Tarija"}]},{"code":"BQ","name":"Bonaire, Saint Eustatius and Saba","states":[]},{"code":"BW","name":"Botswana","states":[]},{"code":"BV","name":"Bouvet Island","states":[]},{"code":"BR","name":"Brazil","states":[{"code":"AC","name":"Acre"},{"code":"AL","name":"Alagoas"},{"code":"AP","name":"Amapá"},{"code":"AM","name":"Amazonas"},{"code":"BA","name":"Bahia"},{"code":"CE","name":"Ceará"},{"code":"DF","name":"Distrito Federal"},{"code":"ES","name":"Espírito Santo"},{"code":"GO","name":"Goiás"},{"code":"MA","name":"Maranhão"},{"code":"MT","name":"Mato Grosso"},{"code":"MS","name":"Mato Grosso do Sul"},{"code":"MG","name":"Minas Gerais"},{"code":"PA","name":"Pará"},{"code":"PB","name":"Paraíba"},{"code":"PR","name":"Paraná"},{"code":"PE","name":"Pernambuco"},{"code":"PI","name":"Piauí"},{"code":"RJ","name":"Rio de Janeiro"},{"code":"RN","name":"Rio Grande do Norte"},{"code":"RS","name":"Rio Grande do Sul"},{"code":"RO","name":"Rondônia"},{"code":"RR","name":"Roraima"},{"code":"SC","name":"Santa Catarina"},{"code":"SP","name":"São Paulo"},{"code":"SE","name":"Sergipe"},{"code":"TO","name":"Tocantins"}]},{"code":"IO","name":"British Indian Ocean Territory","states":[]},{"code":"BN","name":"Brunei","states":[]},{"code":"BF","name":"Burkina Faso","states":[]},{"code":"BI","name":"Burundi","states":[]},{"code":"KH","name":"Cambodia","states":[]},{"code":"CM","name":"Cameroon","states":[]},{"code":"CA","name":"Canada","states":[{"code":"AB","name":"Alberta"},{"code":"BC","name":"British Columbia"},{"code":"MB","name":"Manitoba"},{"code":"NB","name":"New Brunswick"},{"code":"NL","name":"Newfoundland and Labrador"},{"code":"NT","name":"Northwest Territories"},{"code":"NS","name":"Nova Scotia"},{"code":"NU","name":"Nunavut"},{"code":"ON","name":"Ontario"},{"code":"PE","name":"Prince Edward Island"},{"code":"QC","name":"Quebec"},{"code":"SK","name":"Saskatchewan"},{"code":"YT","name":"Yukon Territory"}]},{"code":"CV","name":"Cape Verde","states":[]},{"code":"KY","name":"Cayman Islands","states":[]},{"code":"TD","name":"Chad","states":[]},{"code":"CL","name":"Chile","states":[{"code":"CL-AI","name":"Aisén del General Carlos Ibañez del Campo"},{"code":"CL-AN","name":"Antofagasta"},{"code":"CL-AP","name":"Arica y Parinacota"},{"code":"CL-AR","name":"La Araucanía"},{"code":"CL-AT","name":"Atacama"},{"code":"CL-BI","name":"Biobío"},{"code":"CL-CO","name":"Coquimbo"},{"code":"CL-LI","name":"Libertador General Bernardo O\'Higgins"},{"code":"CL-LL","name":"Los Lagos"},{"code":"CL-LR","name":"Los Ríos"},{"code":"CL-MA","name":"Magallanes"},{"code":"CL-ML","name":"Maule"},{"code":"CL-NB","name":"Ñuble"},{"code":"CL-RM","name":"Región Metropolitana de Santiago"},{"code":"CL-TA","name":"Tarapacá"},{"code":"CL-VS","name":"Valparaíso"}]},{"code":"CN","name":"China","states":[{"code":"CN1","name":"Yunnan / 云南"},{"code":"CN2","name":"Beijing / 北京"},{"code":"CN3","name":"Tianjin / 天津"},{"code":"CN4","name":"Hebei / 河北"},{"code":"CN5","name":"Shanxi / 山西"},{"code":"CN6","name":"Inner Mongolia / 內蒙古"},{"code":"CN7","name":"Liaoning / 辽宁"},{"code":"CN8","name":"Jilin / 吉林"},{"code":"CN9","name":"Heilongjiang / 黑龙江"},{"code":"CN10","name":"Shanghai / 上海"},{"code":"CN11","name":"Jiangsu / 江苏"},{"code":"CN12","name":"Zhejiang / 浙江"},{"code":"CN13","name":"Anhui / 安徽"},{"code":"CN14","name":"Fujian / 福建"},{"code":"CN15","name":"Jiangxi / 江西"},{"code":"CN16","name":"Shandong / 山东"},{"code":"CN17","name":"Henan / 河南"},{"code":"CN18","name":"Hubei / 湖北"},{"code":"CN19","name":"Hunan / 湖南"},{"code":"CN20","name":"Guangdong / 广东"},{"code":"CN21","name":"Guangxi Zhuang / 广西壮族"},{"code":"CN22","name":"Hainan / 海南"},{"code":"CN23","name":"Chongqing / 重庆"},{"code":"CN24","name":"Sichuan / 四川"},{"code":"CN25","name":"Guizhou / 贵州"},{"code":"CN26","name":"Shaanxi / 陕西"},{"code":"CN27","name":"Gansu / 甘肃"},{"code":"CN28","name":"Qinghai / 青海"},{"code":"CN29","name":"Ningxia Hui / 宁夏"},{"code":"CN30","name":"Macao / 澳门"},{"code":"CN31","name":"Tibet / 西藏"},{"code":"CN32","name":"Xinjiang / 新疆"}]},{"code":"CX","name":"Christmas Island","states":[]},{"code":"CC","name":"Cocos (Keeling) Islands","states":[]},{"code":"CO","name":"Colombia","states":[{"code":"CO-AMA","name":"Amazonas"},{"code":"CO-ANT","name":"Antioquia"},{"code":"CO-ARA","name":"Arauca"},{"code":"CO-ATL","name":"Atlántico"},{"code":"CO-BOL","name":"Bolívar"},{"code":"CO-BOY","name":"Boyacá"},{"code":"CO-CAL","name":"Caldas"},{"code":"CO-CAQ","name":"Caquetá"},{"code":"CO-CAS","name":"Casanare"},{"code":"CO-CAU","name":"Cauca"},{"code":"CO-CES","name":"Cesar"},{"code":"CO-CHO","name":"Chocó"},{"code":"CO-COR","name":"Córdoba"},{"code":"CO-CUN","name":"Cundinamarca"},{"code":"CO-DC","name":"Capital District"},{"code":"CO-GUA","name":"Guainía"},{"code":"CO-GUV","name":"Guaviare"},{"code":"CO-HUI","name":"Huila"},{"code":"CO-LAG","name":"La Guajira"},{"code":"CO-MAG","name":"Magdalena"},{"code":"CO-MET","name":"Meta"},{"code":"CO-NAR","name":"Nariño"},{"code":"CO-NSA","name":"Norte de Santander"},{"code":"CO-PUT","name":"Putumayo"},{"code":"CO-QUI","name":"Quindío"},{"code":"CO-RIS","name":"Risaralda"},{"code":"CO-SAN","name":"Santander"},{"code":"CO-SAP","name":"San Andrés & Providencia"},{"code":"CO-SUC","name":"Sucre"},{"code":"CO-TOL","name":"Tolima"},{"code":"CO-VAC","name":"Valle del Cauca"},{"code":"CO-VAU","name":"Vaupés"},{"code":"CO-VID","name":"Vichada"}]},{"code":"KM","name":"Comoros","states":[]},{"code":"CK","name":"Cook Islands","states":[]},{"code":"CR","name":"Costa Rica","states":[{"code":"CR-A","name":"Alajuela"},{"code":"CR-C","name":"Cartago"},{"code":"CR-G","name":"Guanacaste"},{"code":"CR-H","name":"Heredia"},{"code":"CR-L","name":"Limón"},{"code":"CR-P","name":"Puntarenas"},{"code":"CR-SJ","name":"San José"}]},{"code":"HR","name":"Croatia","states":[]},{"code":"CW","name":"Curaçao","states":[]},{"code":"CY","name":"Cyprus","states":[]},{"code":"CZ","name":"Czech Republic","states":[]},{"code":"DK","name":"Denmark","states":[]},{"code":"DJ","name":"Djibouti","states":[]},{"code":"DM","name":"Dominica","states":[]},{"code":"DO","name":"Dominican Republic","states":[{"code":"DO-01","name":"Distrito Nacional"},{"code":"DO-02","name":"Azua"},{"code":"DO-03","name":"Baoruco"},{"code":"DO-04","name":"Barahona"},{"code":"DO-33","name":"Cibao Nordeste"},{"code":"DO-34","name":"Cibao Noroeste"},{"code":"DO-35","name":"Cibao Norte"},{"code":"DO-36","name":"Cibao Sur"},{"code":"DO-05","name":"Dajabón"},{"code":"DO-06","name":"Duarte"},{"code":"DO-08","name":"El Seibo"},{"code":"DO-37","name":"El Valle"},{"code":"DO-07","name":"Elías Piña"},{"code":"DO-38","name":"Enriquillo"},{"code":"DO-09","name":"Espaillat"},{"code":"DO-30","name":"Hato Mayor"},{"code":"DO-19","name":"Hermanas Mirabal"},{"code":"DO-39","name":"Higüamo"},{"code":"DO-10","name":"Independencia"},{"code":"DO-11","name":"La Altagracia"},{"code":"DO-12","name":"La Romana"},{"code":"DO-13","name":"La Vega"},{"code":"DO-14","name":"María Trinidad Sánchez"},{"code":"DO-28","name":"Monseñor Nouel"},{"code":"DO-15","name":"Monte Cristi"},{"code":"DO-29","name":"Monte Plata"},{"code":"DO-40","name":"Ozama"},{"code":"DO-16","name":"Pedernales"},{"code":"DO-17","name":"Peravia"},{"code":"DO-18","name":"Puerto Plata"},{"code":"DO-20","name":"Samaná"},{"code":"DO-21","name":"San Cristóbal"},{"code":"DO-31","name":"San José de Ocoa"},{"code":"DO-22","name":"San Juan"},{"code":"DO-23","name":"San Pedro de Macorís"},{"code":"DO-24","name":"Sánchez Ramírez"},{"code":"DO-25","name":"Santiago"},{"code":"DO-26","name":"Santiago Rodríguez"},{"code":"DO-32","name":"Santo Domingo"},{"code":"DO-41","name":"Valdesia"},{"code":"DO-27","name":"Valverde"},{"code":"DO-42","name":"Yuma"}]},{"code":"EC","name":"Ecuador","states":[{"code":"EC-A","name":"Azuay"},{"code":"EC-B","name":"Bolívar"},{"code":"EC-F","name":"Cañar"},{"code":"EC-C","name":"Carchi"},{"code":"EC-H","name":"Chimborazo"},{"code":"EC-X","name":"Cotopaxi"},{"code":"EC-O","name":"El Oro"},{"code":"EC-E","name":"Esmeraldas"},{"code":"EC-W","name":"Galápagos"},{"code":"EC-G","name":"Guayas"},{"code":"EC-I","name":"Imbabura"},{"code":"EC-L","name":"Loja"},{"code":"EC-R","name":"Los Ríos"},{"code":"EC-M","name":"Manabí"},{"code":"EC-S","name":"Morona-Santiago"},{"code":"EC-N","name":"Napo"},{"code":"EC-D","name":"Orellana"},{"code":"EC-Y","name":"Pastaza"},{"code":"EC-P","name":"Pichincha"},{"code":"EC-SE","name":"Santa Elena"},{"code":"EC-SD","name":"Santo Domingo de los Tsáchilas"},{"code":"EC-U","name":"Sucumbíos"},{"code":"EC-T","name":"Tungurahua"},{"code":"EC-Z","name":"Zamora-Chinchipe"}]},{"code":"EG","name":"Egypt","states":[{"code":"EGALX","name":"Alexandria"},{"code":"EGASN","name":"Aswan"},{"code":"EGAST","name":"Asyut"},{"code":"EGBA","name":"Red Sea"},{"code":"EGBH","name":"Beheira"},{"code":"EGBNS","name":"Beni Suef"},{"code":"EGC","name":"Cairo"},{"code":"EGDK","name":"Dakahlia"},{"code":"EGDT","name":"Damietta"},{"code":"EGFYM","name":"Faiyum"},{"code":"EGGH","name":"Gharbia"},{"code":"EGGZ","name":"Giza"},{"code":"EGIS","name":"Ismailia"},{"code":"EGJS","name":"South Sinai"},{"code":"EGKB","name":"Qalyubia"},{"code":"EGKFS","name":"Kafr el-Sheikh"},{"code":"EGKN","name":"Qena"},{"code":"EGLX","name":"Luxor"},{"code":"EGMN","name":"Minya"},{"code":"EGMNF","name":"Monufia"},{"code":"EGMT","name":"Matrouh"},{"code":"EGPTS","name":"Port Said"},{"code":"EGSHG","name":"Sohag"},{"code":"EGSHR","name":"Al Sharqia"},{"code":"EGSIN","name":"North Sinai"},{"code":"EGSUZ","name":"Suez"},{"code":"EGWAD","name":"New Valley"}]},{"code":"SV","name":"El Salvador","states":[{"code":"SV-AH","name":"Ahuachapán"},{"code":"SV-CA","name":"Cabañas"},{"code":"SV-CH","name":"Chalatenango"},{"code":"SV-CU","name":"Cuscatlán"},{"code":"SV-LI","name":"La Libertad"},{"code":"SV-MO","name":"Morazán"},{"code":"SV-PA","name":"La Paz"},{"code":"SV-SA","name":"Santa Ana"},{"code":"SV-SM","name":"San Miguel"},{"code":"SV-SO","name":"Sonsonate"},{"code":"SV-SS","name":"San Salvador"},{"code":"SV-SV","name":"San Vicente"},{"code":"SV-UN","name":"La Unión"},{"code":"SV-US","name":"Usulután"}]},{"code":"GQ","name":"Equatorial Guinea","states":[]},{"code":"ER","name":"Eritrea","states":[]},{"code":"EE","name":"Estonia","states":[]},{"code":"SZ","name":"Eswatini","states":[]},{"code":"FK","name":"Falkland Islands","states":[]},{"code":"FO","name":"Faroe Islands","states":[]},{"code":"FJ","name":"Fiji","states":[]},{"code":"FI","name":"Finland","states":[]},{"code":"FR","name":"France","states":[]},{"code":"GF","name":"French Guiana","states":[]},{"code":"PF","name":"French Polynesia","states":[]},{"code":"TF","name":"French Southern Territories","states":[]},{"code":"GA","name":"Gabon","states":[]},{"code":"GM","name":"Gambia","states":[]},{"code":"GE","name":"Georgia","states":[]},{"code":"DE","name":"Germany","states":[{"code":"DE-BW","name":"Baden-Württemberg"},{"code":"DE-BY","name":"Bavaria"},{"code":"DE-BE","name":"Berlin"},{"code":"DE-BB","name":"Brandenburg"},{"code":"DE-HB","name":"Bremen"},{"code":"DE-HH","name":"Hamburg"},{"code":"DE-HE","name":"Hesse"},{"code":"DE-MV","name":"Mecklenburg-Vorpommern"},{"code":"DE-NI","name":"Lower Saxony"},{"code":"DE-NW","name":"North Rhine-Westphalia"},{"code":"DE-RP","name":"Rhineland-Palatinate"},{"code":"DE-SL","name":"Saarland"},{"code":"DE-SN","name":"Saxony"},{"code":"DE-ST","name":"Saxony-Anhalt"},{"code":"DE-SH","name":"Schleswig-Holstein"},{"code":"DE-TH","name":"Thuringia"}]},{"code":"GH","name":"Ghana","states":[{"code":"AF","name":"Ahafo"},{"code":"AH","name":"Ashanti"},{"code":"BA","name":"Brong-Ahafo"},{"code":"BO","name":"Bono"},{"code":"BE","name":"Bono East"},{"code":"CP","name":"Central"},{"code":"EP","name":"Eastern"},{"code":"AA","name":"Greater Accra"},{"code":"NE","name":"North East"},{"code":"NP","name":"Northern"},{"code":"OT","name":"Oti"},{"code":"SV","name":"Savannah"},{"code":"UE","name":"Upper East"},{"code":"UW","name":"Upper West"},{"code":"TV","name":"Volta"},{"code":"WP","name":"Western"},{"code":"WN","name":"Western North"}]},{"code":"GI","name":"Gibraltar","states":[]},{"code":"GR","name":"Greece","states":[{"code":"I","name":"Attica"},{"code":"A","name":"East Macedonia and Thrace"},{"code":"B","name":"Central Macedonia"},{"code":"C","name":"West Macedonia"},{"code":"D","name":"Epirus"},{"code":"E","name":"Thessaly"},{"code":"F","name":"Ionian Islands"},{"code":"G","name":"West Greece"},{"code":"H","name":"Central Greece"},{"code":"J","name":"Peloponnese"},{"code":"K","name":"North Aegean"},{"code":"L","name":"South Aegean"},{"code":"M","name":"Crete"}]},{"code":"GL","name":"Greenland","states":[]},{"code":"GD","name":"Grenada","states":[]},{"code":"GP","name":"Guadeloupe","states":[]},{"code":"GU","name":"Guam","states":[]},{"code":"GT","name":"Guatemala","states":[{"code":"GT-AV","name":"Alta Verapaz"},{"code":"GT-BV","name":"Baja Verapaz"},{"code":"GT-CM","name":"Chimaltenango"},{"code":"GT-CQ","name":"Chiquimula"},{"code":"GT-PR","name":"El Progreso"},{"code":"GT-ES","name":"Escuintla"},{"code":"GT-GU","name":"Guatemala"},{"code":"GT-HU","name":"Huehuetenango"},{"code":"GT-IZ","name":"Izabal"},{"code":"GT-JA","name":"Jalapa"},{"code":"GT-JU","name":"Jutiapa"},{"code":"GT-PE","name":"Petén"},{"code":"GT-QZ","name":"Quetzaltenango"},{"code":"GT-QC","name":"Quiché"},{"code":"GT-RE","name":"Retalhuleu"},{"code":"GT-SA","name":"Sacatepéquez"},{"code":"GT-SM","name":"San Marcos"},{"code":"GT-SR","name":"Santa Rosa"},{"code":"GT-SO","name":"Sololá"},{"code":"GT-SU","name":"Suchitepéquez"},{"code":"GT-TO","name":"Totonicapán"},{"code":"GT-ZA","name":"Zacapa"}]},{"code":"GG","name":"Guernsey","states":[]},{"code":"GN","name":"Guinea","states":[]},{"code":"GW","name":"Guinea-Bissau","states":[]},{"code":"GY","name":"Guyana","states":[]},{"code":"HM","name":"Heard Island and McDonald Islands","states":[]},{"code":"HN","name":"Honduras","states":[{"code":"HN-AT","name":"Atlántida"},{"code":"HN-IB","name":"Bay Islands"},{"code":"HN-CH","name":"Choluteca"},{"code":"HN-CL","name":"Colón"},{"code":"HN-CM","name":"Comayagua"},{"code":"HN-CP","name":"Copán"},{"code":"HN-CR","name":"Cortés"},{"code":"HN-EP","name":"El Paraíso"},{"code":"HN-FM","name":"Francisco Morazán"},{"code":"HN-GD","name":"Gracias a Dios"},{"code":"HN-IN","name":"Intibucá"},{"code":"HN-LE","name":"Lempira"},{"code":"HN-LP","name":"La Paz"},{"code":"HN-OC","name":"Ocotepeque"},{"code":"HN-OL","name":"Olancho"},{"code":"HN-SB","name":"Santa Bárbara"},{"code":"HN-VA","name":"Valle"},{"code":"HN-YO","name":"Yoro"}]},{"code":"HU","name":"Hungary","states":[{"code":"BK","name":"Bács-Kiskun"},{"code":"BE","name":"Békés"},{"code":"BA","name":"Baranya"},{"code":"BZ","name":"Borsod-Abaúj-Zemplén"},{"code":"BU","name":"Budapest"},{"code":"CS","name":"Csongrád-Csanád"},{"code":"FE","name":"Fejér"},{"code":"GS","name":"Győr-Moson-Sopron"},{"code":"HB","name":"Hajdú-Bihar"},{"code":"HE","name":"Heves"},{"code":"JN","name":"Jász-Nagykun-Szolnok"},{"code":"KE","name":"Komárom-Esztergom"},{"code":"NO","name":"Nógrád"},{"code":"PE","name":"Pest"},{"code":"SO","name":"Somogy"},{"code":"SZ","name":"Szabolcs-Szatmár-Bereg"},{"code":"TO","name":"Tolna"},{"code":"VA","name":"Vas"},{"code":"VE","name":"Veszprém"},{"code":"ZA","name":"Zala"}]},{"code":"IS","name":"Iceland","states":[]},{"code":"IN","name":"India","states":[{"code":"AP","name":"Andhra Pradesh"},{"code":"AR","name":"Arunachal Pradesh"},{"code":"AS","name":"Assam"},{"code":"BR","name":"Bihar"},{"code":"CT","name":"Chhattisgarh"},{"code":"GA","name":"Goa"},{"code":"GJ","name":"Gujarat"},{"code":"HR","name":"Haryana"},{"code":"HP","name":"Himachal Pradesh"},{"code":"JK","name":"Jammu and Kashmir"},{"code":"JH","name":"Jharkhand"},{"code":"KA","name":"Karnataka"},{"code":"KL","name":"Kerala"},{"code":"LA","name":"Ladakh"},{"code":"MP","name":"Madhya Pradesh"},{"code":"MH","name":"Maharashtra"},{"code":"MN","name":"Manipur"},{"code":"ML","name":"Meghalaya"},{"code":"MZ","name":"Mizoram"},{"code":"NL","name":"Nagaland"},{"code":"OR","name":"Odisha"},{"code":"PB","name":"Punjab"},{"code":"RJ","name":"Rajasthan"},{"code":"SK","name":"Sikkim"},{"code":"TN","name":"Tamil Nadu"},{"code":"TS","name":"Telangana"},{"code":"TR","name":"Tripura"},{"code":"UK","name":"Uttarakhand"},{"code":"UP","name":"Uttar Pradesh"},{"code":"WB","name":"West Bengal"},{"code":"AN","name":"Andaman and Nicobar Islands"},{"code":"CH","name":"Chandigarh"},{"code":"DN","name":"Dadra and Nagar Haveli"},{"code":"DD","name":"Daman and Diu"},{"code":"DL","name":"Delhi"},{"code":"LD","name":"Lakshadeep"},{"code":"PY","name":"Pondicherry (Puducherry)"}]},{"code":"ID","name":"Indonesia","states":[{"code":"AC","name":"Daerah Istimewa Aceh"},{"code":"SU","name":"Sumatera Utara"},{"code":"SB","name":"Sumatera Barat"},{"code":"RI","name":"Riau"},{"code":"KR","name":"Kepulauan Riau"},{"code":"JA","name":"Jambi"},{"code":"SS","name":"Sumatera Selatan"},{"code":"BB","name":"Bangka Belitung"},{"code":"BE","name":"Bengkulu"},{"code":"LA","name":"Lampung"},{"code":"JK","name":"DKI Jakarta"},{"code":"JB","name":"Jawa Barat"},{"code":"BT","name":"Banten"},{"code":"JT","name":"Jawa Tengah"},{"code":"JI","name":"Jawa Timur"},{"code":"YO","name":"Daerah Istimewa Yogyakarta"},{"code":"BA","name":"Bali"},{"code":"NB","name":"Nusa Tenggara Barat"},{"code":"NT","name":"Nusa Tenggara Timur"},{"code":"KB","name":"Kalimantan Barat"},{"code":"KT","name":"Kalimantan Tengah"},{"code":"KI","name":"Kalimantan Timur"},{"code":"KS","name":"Kalimantan Selatan"},{"code":"KU","name":"Kalimantan Utara"},{"code":"SA","name":"Sulawesi Utara"},{"code":"ST","name":"Sulawesi Tengah"},{"code":"SG","name":"Sulawesi Tenggara"},{"code":"SR","name":"Sulawesi Barat"},{"code":"SN","name":"Sulawesi Selatan"},{"code":"GO","name":"Gorontalo"},{"code":"MA","name":"Maluku"},{"code":"MU","name":"Maluku Utara"},{"code":"PA","name":"Papua"},{"code":"PB","name":"Papua Barat"}]},{"code":"IE","name":"Ireland","states":[{"code":"CW","name":"Carlow"},{"code":"CN","name":"Cavan"},{"code":"CE","name":"Clare"},{"code":"CO","name":"Cork"},{"code":"DL","name":"Donegal"},{"code":"D","name":"Dublin"},{"code":"G","name":"Galway"},{"code":"KY","name":"Kerry"},{"code":"KE","name":"Kildare"},{"code":"KK","name":"Kilkenny"},{"code":"LS","name":"Laois"},{"code":"LM","name":"Leitrim"},{"code":"LK","name":"Limerick"},{"code":"LD","name":"Longford"},{"code":"LH","name":"Louth"},{"code":"MO","name":"Mayo"},{"code":"MH","name":"Meath"},{"code":"MN","name":"Monaghan"},{"code":"OY","name":"Offaly"},{"code":"RN","name":"Roscommon"},{"code":"SO","name":"Sligo"},{"code":"TA","name":"Tipperary"},{"code":"WD","name":"Waterford"},{"code":"WH","name":"Westmeath"},{"code":"WX","name":"Wexford"},{"code":"WW","name":"Wicklow"}]},{"code":"IM","name":"Isle of Man","states":[]},{"code":"IL","name":"Israel","states":[]},{"code":"IT","name":"Italy","states":[{"code":"AG","name":"Agrigento"},{"code":"AL","name":"Alessandria"},{"code":"AN","name":"Ancona"},{"code":"AO","name":"Aosta"},{"code":"AR","name":"Arezzo"},{"code":"AP","name":"Ascoli Piceno"},{"code":"AT","name":"Asti"},{"code":"AV","name":"Avellino"},{"code":"BA","name":"Bari"},{"code":"BT","name":"Barletta-Andria-Trani"},{"code":"BL","name":"Belluno"},{"code":"BN","name":"Benevento"},{"code":"BG","name":"Bergamo"},{"code":"BI","name":"Biella"},{"code":"BO","name":"Bologna"},{"code":"BZ","name":"Bolzano"},{"code":"BS","name":"Brescia"},{"code":"BR","name":"Brindisi"},{"code":"CA","name":"Cagliari"},{"code":"CL","name":"Caltanissetta"},{"code":"CB","name":"Campobasso"},{"code":"CE","name":"Caserta"},{"code":"CT","name":"Catania"},{"code":"CZ","name":"Catanzaro"},{"code":"CH","name":"Chieti"},{"code":"CO","name":"Como"},{"code":"CS","name":"Cosenza"},{"code":"CR","name":"Cremona"},{"code":"KR","name":"Crotone"},{"code":"CN","name":"Cuneo"},{"code":"EN","name":"Enna"},{"code":"FM","name":"Fermo"},{"code":"FE","name":"Ferrara"},{"code":"FI","name":"Firenze"},{"code":"FG","name":"Foggia"},{"code":"FC","name":"Forlì-Cesena"},{"code":"FR","name":"Frosinone"},{"code":"GE","name":"Genova"},{"code":"GO","name":"Gorizia"},{"code":"GR","name":"Grosseto"},{"code":"IM","name":"Imperia"},{"code":"IS","name":"Isernia"},{"code":"SP","name":"La Spezia"},{"code":"AQ","name":"L\'Aquila"},{"code":"LT","name":"Latina"},{"code":"LE","name":"Lecce"},{"code":"LC","name":"Lecco"},{"code":"LI","name":"Livorno"},{"code":"LO","name":"Lodi"},{"code":"LU","name":"Lucca"},{"code":"MC","name":"Macerata"},{"code":"MN","name":"Mantova"},{"code":"MS","name":"Massa-Carrara"},{"code":"MT","name":"Matera"},{"code":"ME","name":"Messina"},{"code":"MI","name":"Milano"},{"code":"MO","name":"Modena"},{"code":"MB","name":"Monza e della Brianza"},{"code":"NA","name":"Napoli"},{"code":"NO","name":"Novara"},{"code":"NU","name":"Nuoro"},{"code":"OR","name":"Oristano"},{"code":"PD","name":"Padova"},{"code":"PA","name":"Palermo"},{"code":"PR","name":"Parma"},{"code":"PV","name":"Pavia"},{"code":"PG","name":"Perugia"},{"code":"PU","name":"Pesaro e Urbino"},{"code":"PE","name":"Pescara"},{"code":"PC","name":"Piacenza"},{"code":"PI","name":"Pisa"},{"code":"PT","name":"Pistoia"},{"code":"PN","name":"Pordenone"},{"code":"PZ","name":"Potenza"},{"code":"PO","name":"Prato"},{"code":"RG","name":"Ragusa"},{"code":"RA","name":"Ravenna"},{"code":"RC","name":"Reggio Calabria"},{"code":"RE","name":"Reggio Emilia"},{"code":"RI","name":"Rieti"},{"code":"RN","name":"Rimini"},{"code":"RM","name":"Roma"},{"code":"RO","name":"Rovigo"},{"code":"SA","name":"Salerno"},{"code":"SS","name":"Sassari"},{"code":"SV","name":"Savona"},{"code":"SI","name":"Siena"},{"code":"SR","name":"Siracusa"},{"code":"SO","name":"Sondrio"},{"code":"SU","name":"Sud Sardegna"},{"code":"TA","name":"Taranto"},{"code":"TE","name":"Teramo"},{"code":"TR","name":"Terni"},{"code":"TO","name":"Torino"},{"code":"TP","name":"Trapani"},{"code":"TN","name":"Trento"},{"code":"TV","name":"Treviso"},{"code":"TS","name":"Trieste"},{"code":"UD","name":"Udine"},{"code":"VA","name":"Varese"},{"code":"VE","name":"Venezia"},{"code":"VB","name":"Verbano-Cusio-Ossola"},{"code":"VC","name":"Vercelli"},{"code":"VR","name":"Verona"},{"code":"VV","name":"Vibo Valentia"},{"code":"VI","name":"Vicenza"},{"code":"VT","name":"Viterbo"}]},{"code":"CI","name":"Ivory Coast","states":[]},{"code":"JM","name":"Jamaica","states":[{"code":"JM-01","name":"Kingston"},{"code":"JM-02","name":"Saint Andrew"},{"code":"JM-03","name":"Saint Thomas"},{"code":"JM-04","name":"Portland"},{"code":"JM-05","name":"Saint Mary"},{"code":"JM-06","name":"Saint Ann"},{"code":"JM-07","name":"Trelawny"},{"code":"JM-08","name":"Saint James"},{"code":"JM-09","name":"Hanover"},{"code":"JM-10","name":"Westmoreland"},{"code":"JM-11","name":"Saint Elizabeth"},{"code":"JM-12","name":"Manchester"},{"code":"JM-13","name":"Clarendon"},{"code":"JM-14","name":"Saint Catherine"}]},{"code":"JP","name":"Japan","states":[{"code":"JP01","name":"Hokkaido"},{"code":"JP02","name":"Aomori"},{"code":"JP03","name":"Iwate"},{"code":"JP04","name":"Miyagi"},{"code":"JP05","name":"Akita"},{"code":"JP06","name":"Yamagata"},{"code":"JP07","name":"Fukushima"},{"code":"JP08","name":"Ibaraki"},{"code":"JP09","name":"Tochigi"},{"code":"JP10","name":"Gunma"},{"code":"JP11","name":"Saitama"},{"code":"JP12","name":"Chiba"},{"code":"JP13","name":"Tokyo"},{"code":"JP14","name":"Kanagawa"},{"code":"JP15","name":"Niigata"},{"code":"JP16","name":"Toyama"},{"code":"JP17","name":"Ishikawa"},{"code":"JP18","name":"Fukui"},{"code":"JP19","name":"Yamanashi"},{"code":"JP20","name":"Nagano"},{"code":"JP21","name":"Gifu"},{"code":"JP22","name":"Shizuoka"},{"code":"JP23","name":"Aichi"},{"code":"JP24","name":"Mie"},{"code":"JP25","name":"Shiga"},{"code":"JP26","name":"Kyoto"},{"code":"JP27","name":"Osaka"},{"code":"JP28","name":"Hyogo"},{"code":"JP29","name":"Nara"},{"code":"JP30","name":"Wakayama"},{"code":"JP31","name":"Tottori"},{"code":"JP32","name":"Shimane"},{"code":"JP33","name":"Okayama"},{"code":"JP34","name":"Hiroshima"},{"code":"JP35","name":"Yamaguchi"},{"code":"JP36","name":"Tokushima"},{"code":"JP37","name":"Kagawa"},{"code":"JP38","name":"Ehime"},{"code":"JP39","name":"Kochi"},{"code":"JP40","name":"Fukuoka"},{"code":"JP41","name":"Saga"},{"code":"JP42","name":"Nagasaki"},{"code":"JP43","name":"Kumamoto"},{"code":"JP44","name":"Oita"},{"code":"JP45","name":"Miyazaki"},{"code":"JP46","name":"Kagoshima"},{"code":"JP47","name":"Okinawa"}]},{"code":"JE","name":"Jersey","states":[]},{"code":"JO","name":"Jordan","states":[]},{"code":"KZ","name":"Kazakhstan","states":[]},{"code":"KE","name":"Kenya","states":[{"code":"KE01","name":"Baringo"},{"code":"KE02","name":"Bomet"},{"code":"KE03","name":"Bungoma"},{"code":"KE04","name":"Busia"},{"code":"KE05","name":"Elgeyo-Marakwet"},{"code":"KE06","name":"Embu"},{"code":"KE07","name":"Garissa"},{"code":"KE08","name":"Homa Bay"},{"code":"KE09","name":"Isiolo"},{"code":"KE10","name":"Kajiado"},{"code":"KE11","name":"Kakamega"},{"code":"KE12","name":"Kericho"},{"code":"KE13","name":"Kiambu"},{"code":"KE14","name":"Kilifi"},{"code":"KE15","name":"Kirinyaga"},{"code":"KE16","name":"Kisii"},{"code":"KE17","name":"Kisumu"},{"code":"KE18","name":"Kitui"},{"code":"KE19","name":"Kwale"},{"code":"KE20","name":"Laikipia"},{"code":"KE21","name":"Lamu"},{"code":"KE22","name":"Machakos"},{"code":"KE23","name":"Makueni"},{"code":"KE24","name":"Mandera"},{"code":"KE25","name":"Marsabit"},{"code":"KE26","name":"Meru"},{"code":"KE27","name":"Migori"},{"code":"KE28","name":"Mombasa"},{"code":"KE29","name":"Murang’a"},{"code":"KE30","name":"Nairobi County"},{"code":"KE31","name":"Nakuru"},{"code":"KE32","name":"Nandi"},{"code":"KE33","name":"Narok"},{"code":"KE34","name":"Nyamira"},{"code":"KE35","name":"Nyandarua"},{"code":"KE36","name":"Nyeri"},{"code":"KE37","name":"Samburu"},{"code":"KE38","name":"Siaya"},{"code":"KE39","name":"Taita-Taveta"},{"code":"KE40","name":"Tana River"},{"code":"KE41","name":"Tharaka-Nithi"},{"code":"KE42","name":"Trans Nzoia"},{"code":"KE43","name":"Turkana"},{"code":"KE44","name":"Uasin Gishu"},{"code":"KE45","name":"Vihiga"},{"code":"KE46","name":"Wajir"},{"code":"KE47","name":"West Pokot"}]},{"code":"KI","name":"Kiribati","states":[]},{"code":"KW","name":"Kuwait","states":[]},{"code":"KG","name":"Kyrgyzstan","states":[]},{"code":"LA","name":"Laos","states":[{"code":"AT","name":"Attapeu"},{"code":"BK","name":"Bokeo"},{"code":"BL","name":"Bolikhamsai"},{"code":"CH","name":"Champasak"},{"code":"HO","name":"Houaphanh"},{"code":"KH","name":"Khammouane"},{"code":"LM","name":"Luang Namtha"},{"code":"LP","name":"Luang Prabang"},{"code":"OU","name":"Oudomxay"},{"code":"PH","name":"Phongsaly"},{"code":"SL","name":"Salavan"},{"code":"SV","name":"Savannakhet"},{"code":"VI","name":"Vientiane Province"},{"code":"VT","name":"Vientiane"},{"code":"XA","name":"Sainyabuli"},{"code":"XE","name":"Sekong"},{"code":"XI","name":"Xiangkhouang"},{"code":"XS","name":"Xaisomboun"}]},{"code":"LV","name":"Latvia","states":[]},{"code":"LS","name":"Lesotho","states":[]},{"code":"LR","name":"Liberia","states":[{"code":"BM","name":"Bomi"},{"code":"BN","name":"Bong"},{"code":"GA","name":"Gbarpolu"},{"code":"GB","name":"Grand Bassa"},{"code":"GC","name":"Grand Cape Mount"},{"code":"GG","name":"Grand Gedeh"},{"code":"GK","name":"Grand Kru"},{"code":"LO","name":"Lofa"},{"code":"MA","name":"Margibi"},{"code":"MY","name":"Maryland"},{"code":"MO","name":"Montserrado"},{"code":"NM","name":"Nimba"},{"code":"RV","name":"Rivercess"},{"code":"RG","name":"River Gee"},{"code":"SN","name":"Sinoe"}]},{"code":"LI","name":"Liechtenstein","states":[]},{"code":"LT","name":"Lithuania","states":[]},{"code":"LU","name":"Luxembourg","states":[]},{"code":"MO","name":"Macao","states":[]},{"code":"MG","name":"Madagascar","states":[]},{"code":"MW","name":"Malawi","states":[]},{"code":"MY","name":"Malaysia","states":[{"code":"JHR","name":"Johor"},{"code":"KDH","name":"Kedah"},{"code":"KTN","name":"Kelantan"},{"code":"LBN","name":"Labuan"},{"code":"MLK","name":"Malacca (Melaka)"},{"code":"NSN","name":"Negeri Sembilan"},{"code":"PHG","name":"Pahang"},{"code":"PNG","name":"Penang (Pulau Pinang)"},{"code":"PRK","name":"Perak"},{"code":"PLS","name":"Perlis"},{"code":"SBH","name":"Sabah"},{"code":"SWK","name":"Sarawak"},{"code":"SGR","name":"Selangor"},{"code":"TRG","name":"Terengganu"},{"code":"PJY","name":"Putrajaya"},{"code":"KUL","name":"Kuala Lumpur"}]},{"code":"MV","name":"Maldives","states":[]},{"code":"ML","name":"Mali","states":[]},{"code":"MT","name":"Malta","states":[]},{"code":"MH","name":"Marshall Islands","states":[]},{"code":"MQ","name":"Martinique","states":[]},{"code":"MR","name":"Mauritania","states":[]},{"code":"MU","name":"Mauritius","states":[]},{"code":"YT","name":"Mayotte","states":[]},{"code":"MX","name":"Mexico","states":[{"code":"DF","name":"Ciudad de México"},{"code":"JA","name":"Jalisco"},{"code":"NL","name":"Nuevo León"},{"code":"AG","name":"Aguascalientes"},{"code":"BC","name":"Baja California"},{"code":"BS","name":"Baja California Sur"},{"code":"CM","name":"Campeche"},{"code":"CS","name":"Chiapas"},{"code":"CH","name":"Chihuahua"},{"code":"CO","name":"Coahuila"},{"code":"CL","name":"Colima"},{"code":"DG","name":"Durango"},{"code":"GT","name":"Guanajuato"},{"code":"GR","name":"Guerrero"},{"code":"HG","name":"Hidalgo"},{"code":"MX","name":"Estado de México"},{"code":"MI","name":"Michoacán"},{"code":"MO","name":"Morelos"},{"code":"NA","name":"Nayarit"},{"code":"OA","name":"Oaxaca"},{"code":"PU","name":"Puebla"},{"code":"QT","name":"Querétaro"},{"code":"QR","name":"Quintana Roo"},{"code":"SL","name":"San Luis Potosí"},{"code":"SI","name":"Sinaloa"},{"code":"SO","name":"Sonora"},{"code":"TB","name":"Tabasco"},{"code":"TM","name":"Tamaulipas"},{"code":"TL","name":"Tlaxcala"},{"code":"VE","name":"Veracruz"},{"code":"YU","name":"Yucatán"},{"code":"ZA","name":"Zacatecas"}]},{"code":"FM","name":"Micronesia","states":[]},{"code":"MD","name":"Moldova","states":[{"code":"C","name":"Chișinău"},{"code":"BL","name":"Bălți"},{"code":"AN","name":"Anenii Noi"},{"code":"BS","name":"Basarabeasca"},{"code":"BR","name":"Briceni"},{"code":"CH","name":"Cahul"},{"code":"CT","name":"Cantemir"},{"code":"CL","name":"Călărași"},{"code":"CS","name":"Căușeni"},{"code":"CM","name":"Cimișlia"},{"code":"CR","name":"Criuleni"},{"code":"DN","name":"Dondușeni"},{"code":"DR","name":"Drochia"},{"code":"DB","name":"Dubăsari"},{"code":"ED","name":"Edineț"},{"code":"FL","name":"Fălești"},{"code":"FR","name":"Florești"},{"code":"GE","name":"UTA Găgăuzia"},{"code":"GL","name":"Glodeni"},{"code":"HN","name":"Hîncești"},{"code":"IL","name":"Ialoveni"},{"code":"LV","name":"Leova"},{"code":"NS","name":"Nisporeni"},{"code":"OC","name":"Ocnița"},{"code":"OR","name":"Orhei"},{"code":"RZ","name":"Rezina"},{"code":"RS","name":"Rîșcani"},{"code":"SG","name":"Sîngerei"},{"code":"SR","name":"Soroca"},{"code":"ST","name":"Strășeni"},{"code":"SD","name":"Șoldănești"},{"code":"SV","name":"Ștefan Vodă"},{"code":"TR","name":"Taraclia"},{"code":"TL","name":"Telenești"},{"code":"UN","name":"Ungheni"}]},{"code":"MC","name":"Monaco","states":[]},{"code":"MN","name":"Mongolia","states":[]},{"code":"MS","name":"Montserrat","states":[]},{"code":"MA","name":"Morocco","states":[]},{"code":"MZ","name":"Mozambique","states":[{"code":"MZP","name":"Cabo Delgado"},{"code":"MZG","name":"Gaza"},{"code":"MZI","name":"Inhambane"},{"code":"MZB","name":"Manica"},{"code":"MZL","name":"Maputo Province"},{"code":"MZMPM","name":"Maputo"},{"code":"MZN","name":"Nampula"},{"code":"MZA","name":"Niassa"},{"code":"MZS","name":"Sofala"},{"code":"MZT","name":"Tete"},{"code":"MZQ","name":"Zambézia"}]},{"code":"NA","name":"Namibia","states":[{"code":"ER","name":"Erongo"},{"code":"HA","name":"Hardap"},{"code":"KA","name":"Karas"},{"code":"KE","name":"Kavango East"},{"code":"KW","name":"Kavango West"},{"code":"KH","name":"Khomas"},{"code":"KU","name":"Kunene"},{"code":"OW","name":"Ohangwena"},{"code":"OH","name":"Omaheke"},{"code":"OS","name":"Omusati"},{"code":"ON","name":"Oshana"},{"code":"OT","name":"Oshikoto"},{"code":"OD","name":"Otjozondjupa"},{"code":"CA","name":"Zambezi"}]},{"code":"NR","name":"Nauru","states":[]},{"code":"NP","name":"Nepal","states":[{"code":"BAG","name":"Bagmati"},{"code":"BHE","name":"Bheri"},{"code":"DHA","name":"Dhaulagiri"},{"code":"GAN","name":"Gandaki"},{"code":"JAN","name":"Janakpur"},{"code":"KAR","name":"Karnali"},{"code":"KOS","name":"Koshi"},{"code":"LUM","name":"Lumbini"},{"code":"MAH","name":"Mahakali"},{"code":"MEC","name":"Mechi"},{"code":"NAR","name":"Narayani"},{"code":"RAP","name":"Rapti"},{"code":"SAG","name":"Sagarmatha"},{"code":"SET","name":"Seti"}]},{"code":"NL","name":"Netherlands","states":[]},{"code":"NC","name":"New Caledonia","states":[]},{"code":"NZ","name":"New Zealand","states":[{"code":"NL","name":"Northland"},{"code":"AK","name":"Auckland"},{"code":"WA","name":"Waikato"},{"code":"BP","name":"Bay of Plenty"},{"code":"TK","name":"Taranaki"},{"code":"GI","name":"Gisborne"},{"code":"HB","name":"Hawke’s Bay"},{"code":"MW","name":"Manawatu-Wanganui"},{"code":"WE","name":"Wellington"},{"code":"NS","name":"Nelson"},{"code":"MB","name":"Marlborough"},{"code":"TM","name":"Tasman"},{"code":"WC","name":"West Coast"},{"code":"CT","name":"Canterbury"},{"code":"OT","name":"Otago"},{"code":"SL","name":"Southland"}]},{"code":"NI","name":"Nicaragua","states":[{"code":"NI-AN","name":"Atlántico Norte"},{"code":"NI-AS","name":"Atlántico Sur"},{"code":"NI-BO","name":"Boaco"},{"code":"NI-CA","name":"Carazo"},{"code":"NI-CI","name":"Chinandega"},{"code":"NI-CO","name":"Chontales"},{"code":"NI-ES","name":"Estelí"},{"code":"NI-GR","name":"Granada"},{"code":"NI-JI","name":"Jinotega"},{"code":"NI-LE","name":"León"},{"code":"NI-MD","name":"Madriz"},{"code":"NI-MN","name":"Managua"},{"code":"NI-MS","name":"Masaya"},{"code":"NI-MT","name":"Matagalpa"},{"code":"NI-NS","name":"Nueva Segovia"},{"code":"NI-RI","name":"Rivas"},{"code":"NI-SJ","name":"Río San Juan"}]},{"code":"NE","name":"Niger","states":[]},{"code":"NG","name":"Nigeria","states":[{"code":"AB","name":"Abia"},{"code":"FC","name":"Abuja"},{"code":"AD","name":"Adamawa"},{"code":"AK","name":"Akwa Ibom"},{"code":"AN","name":"Anambra"},{"code":"BA","name":"Bauchi"},{"code":"BY","name":"Bayelsa"},{"code":"BE","name":"Benue"},{"code":"BO","name":"Borno"},{"code":"CR","name":"Cross River"},{"code":"DE","name":"Delta"},{"code":"EB","name":"Ebonyi"},{"code":"ED","name":"Edo"},{"code":"EK","name":"Ekiti"},{"code":"EN","name":"Enugu"},{"code":"GO","name":"Gombe"},{"code":"IM","name":"Imo"},{"code":"JI","name":"Jigawa"},{"code":"KD","name":"Kaduna"},{"code":"KN","name":"Kano"},{"code":"KT","name":"Katsina"},{"code":"KE","name":"Kebbi"},{"code":"KO","name":"Kogi"},{"code":"KW","name":"Kwara"},{"code":"LA","name":"Lagos"},{"code":"NA","name":"Nasarawa"},{"code":"NI","name":"Niger"},{"code":"OG","name":"Ogun"},{"code":"ON","name":"Ondo"},{"code":"OS","name":"Osun"},{"code":"OY","name":"Oyo"},{"code":"PL","name":"Plateau"},{"code":"RI","name":"Rivers"},{"code":"SO","name":"Sokoto"},{"code":"TA","name":"Taraba"},{"code":"YO","name":"Yobe"},{"code":"ZA","name":"Zamfara"}]},{"code":"NU","name":"Niue","states":[]},{"code":"NF","name":"Norfolk Island","states":[]},{"code":"MP","name":"Northern Mariana Islands","states":[]},{"code":"NO","name":"Norway","states":[]},{"code":"OM","name":"Oman","states":[]},{"code":"PK","name":"Pakistan","states":[{"code":"JK","name":"Azad Kashmir"},{"code":"BA","name":"Balochistan"},{"code":"TA","name":"FATA"},{"code":"GB","name":"Gilgit Baltistan"},{"code":"IS","name":"Islamabad Capital Territory"},{"code":"KP","name":"Khyber Pakhtunkhwa"},{"code":"PB","name":"Punjab"},{"code":"SD","name":"Sindh"}]},{"code":"PS","name":"Palestinian Territory","states":[]},{"code":"PA","name":"Panama","states":[{"code":"PA-1","name":"Bocas del Toro"},{"code":"PA-2","name":"Coclé"},{"code":"PA-3","name":"Colón"},{"code":"PA-4","name":"Chiriquí"},{"code":"PA-5","name":"Darién"},{"code":"PA-6","name":"Herrera"},{"code":"PA-7","name":"Los Santos"},{"code":"PA-8","name":"Panamá"},{"code":"PA-9","name":"Veraguas"},{"code":"PA-10","name":"West Panamá"},{"code":"PA-EM","name":"Emberá"},{"code":"PA-KY","name":"Guna Yala"},{"code":"PA-NB","name":"Ngöbe-Buglé"}]},{"code":"PG","name":"Papua New Guinea","states":[]},{"code":"PY","name":"Paraguay","states":[{"code":"PY-ASU","name":"Asunción"},{"code":"PY-1","name":"Concepción"},{"code":"PY-2","name":"San Pedro"},{"code":"PY-3","name":"Cordillera"},{"code":"PY-4","name":"Guairá"},{"code":"PY-5","name":"Caaguazú"},{"code":"PY-6","name":"Caazapá"},{"code":"PY-7","name":"Itapúa"},{"code":"PY-8","name":"Misiones"},{"code":"PY-9","name":"Paraguarí"},{"code":"PY-10","name":"Alto Paraná"},{"code":"PY-11","name":"Central"},{"code":"PY-12","name":"Ñeembucú"},{"code":"PY-13","name":"Amambay"},{"code":"PY-14","name":"Canindeyú"},{"code":"PY-15","name":"Presidente Hayes"},{"code":"PY-16","name":"Alto Paraguay"},{"code":"PY-17","name":"Boquerón"}]},{"code":"PE","name":"Peru","states":[{"code":"CAL","name":"El Callao"},{"code":"LMA","name":"Municipalidad Metropolitana de Lima"},{"code":"AMA","name":"Amazonas"},{"code":"ANC","name":"Ancash"},{"code":"APU","name":"Apurímac"},{"code":"ARE","name":"Arequipa"},{"code":"AYA","name":"Ayacucho"},{"code":"CAJ","name":"Cajamarca"},{"code":"CUS","name":"Cusco"},{"code":"HUV","name":"Huancavelica"},{"code":"HUC","name":"Huánuco"},{"code":"ICA","name":"Ica"},{"code":"JUN","name":"Junín"},{"code":"LAL","name":"La Libertad"},{"code":"LAM","name":"Lambayeque"},{"code":"LIM","name":"Lima"},{"code":"LOR","name":"Loreto"},{"code":"MDD","name":"Madre de Dios"},{"code":"MOQ","name":"Moquegua"},{"code":"PAS","name":"Pasco"},{"code":"PIU","name":"Piura"},{"code":"PUN","name":"Puno"},{"code":"SAM","name":"San Martín"},{"code":"TAC","name":"Tacna"},{"code":"TUM","name":"Tumbes"},{"code":"UCA","name":"Ucayali"}]},{"code":"PH","name":"Philippines","states":[{"code":"ABR","name":"Abra"},{"code":"AGN","name":"Agusan del Norte"},{"code":"AGS","name":"Agusan del Sur"},{"code":"AKL","name":"Aklan"},{"code":"ALB","name":"Albay"},{"code":"ANT","name":"Antique"},{"code":"APA","name":"Apayao"},{"code":"AUR","name":"Aurora"},{"code":"BAS","name":"Basilan"},{"code":"BAN","name":"Bataan"},{"code":"BTN","name":"Batanes"},{"code":"BTG","name":"Batangas"},{"code":"BEN","name":"Benguet"},{"code":"BIL","name":"Biliran"},{"code":"BOH","name":"Bohol"},{"code":"BUK","name":"Bukidnon"},{"code":"BUL","name":"Bulacan"},{"code":"CAG","name":"Cagayan"},{"code":"CAN","name":"Camarines Norte"},{"code":"CAS","name":"Camarines Sur"},{"code":"CAM","name":"Camiguin"},{"code":"CAP","name":"Capiz"},{"code":"CAT","name":"Catanduanes"},{"code":"CAV","name":"Cavite"},{"code":"CEB","name":"Cebu"},{"code":"COM","name":"Compostela Valley"},{"code":"NCO","name":"Cotabato"},{"code":"DAV","name":"Davao del Norte"},{"code":"DAS","name":"Davao del Sur"},{"code":"DAC","name":"Davao Occidental"},{"code":"DAO","name":"Davao Oriental"},{"code":"DIN","name":"Dinagat Islands"},{"code":"EAS","name":"Eastern Samar"},{"code":"GUI","name":"Guimaras"},{"code":"IFU","name":"Ifugao"},{"code":"ILN","name":"Ilocos Norte"},{"code":"ILS","name":"Ilocos Sur"},{"code":"ILI","name":"Iloilo"},{"code":"ISA","name":"Isabela"},{"code":"KAL","name":"Kalinga"},{"code":"LUN","name":"La Union"},{"code":"LAG","name":"Laguna"},{"code":"LAN","name":"Lanao del Norte"},{"code":"LAS","name":"Lanao del Sur"},{"code":"LEY","name":"Leyte"},{"code":"MAG","name":"Maguindanao"},{"code":"MAD","name":"Marinduque"},{"code":"MAS","name":"Masbate"},{"code":"MSC","name":"Misamis Occidental"},{"code":"MSR","name":"Misamis Oriental"},{"code":"MOU","name":"Mountain Province"},{"code":"NEC","name":"Negros Occidental"},{"code":"NER","name":"Negros Oriental"},{"code":"NSA","name":"Northern Samar"},{"code":"NUE","name":"Nueva Ecija"},{"code":"NUV","name":"Nueva Vizcaya"},{"code":"MDC","name":"Occidental Mindoro"},{"code":"MDR","name":"Oriental Mindoro"},{"code":"PLW","name":"Palawan"},{"code":"PAM","name":"Pampanga"},{"code":"PAN","name":"Pangasinan"},{"code":"QUE","name":"Quezon"},{"code":"QUI","name":"Quirino"},{"code":"RIZ","name":"Rizal"},{"code":"ROM","name":"Romblon"},{"code":"WSA","name":"Samar"},{"code":"SAR","name":"Sarangani"},{"code":"SIQ","name":"Siquijor"},{"code":"SOR","name":"Sorsogon"},{"code":"SCO","name":"South Cotabato"},{"code":"SLE","name":"Southern Leyte"},{"code":"SUK","name":"Sultan Kudarat"},{"code":"SLU","name":"Sulu"},{"code":"SUN","name":"Surigao del Norte"},{"code":"SUR","name":"Surigao del Sur"},{"code":"TAR","name":"Tarlac"},{"code":"TAW","name":"Tawi-Tawi"},{"code":"ZMB","name":"Zambales"},{"code":"ZAN","name":"Zamboanga del Norte"},{"code":"ZAS","name":"Zamboanga del Sur"},{"code":"ZSI","name":"Zamboanga Sibugay"},{"code":"00","name":"Metro Manila"}]},{"code":"PN","name":"Pitcairn","states":[]},{"code":"PL","name":"Poland","states":[]},{"code":"PT","name":"Portugal","states":[]},{"code":"PR","name":"Puerto Rico","states":[]},{"code":"QA","name":"Qatar","states":[]},{"code":"RE","name":"Reunion","states":[]},{"code":"RO","name":"Romania","states":[{"code":"AB","name":"Alba"},{"code":"AR","name":"Arad"},{"code":"AG","name":"Argeș"},{"code":"BC","name":"Bacău"},{"code":"BH","name":"Bihor"},{"code":"BN","name":"Bistrița-Năsăud"},{"code":"BT","name":"Botoșani"},{"code":"BR","name":"Brăila"},{"code":"BV","name":"Brașov"},{"code":"B","name":"București"},{"code":"BZ","name":"Buzău"},{"code":"CL","name":"Călărași"},{"code":"CS","name":"Caraș-Severin"},{"code":"CJ","name":"Cluj"},{"code":"CT","name":"Constanța"},{"code":"CV","name":"Covasna"},{"code":"DB","name":"Dâmbovița"},{"code":"DJ","name":"Dolj"},{"code":"GL","name":"Galați"},{"code":"GR","name":"Giurgiu"},{"code":"GJ","name":"Gorj"},{"code":"HR","name":"Harghita"},{"code":"HD","name":"Hunedoara"},{"code":"IL","name":"Ialomița"},{"code":"IS","name":"Iași"},{"code":"IF","name":"Ilfov"},{"code":"MM","name":"Maramureș"},{"code":"MH","name":"Mehedinți"},{"code":"MS","name":"Mureș"},{"code":"NT","name":"Neamț"},{"code":"OT","name":"Olt"},{"code":"PH","name":"Prahova"},{"code":"SJ","name":"Sălaj"},{"code":"SM","name":"Satu Mare"},{"code":"SB","name":"Sibiu"},{"code":"SV","name":"Suceava"},{"code":"TR","name":"Teleorman"},{"code":"TM","name":"Timiș"},{"code":"TL","name":"Tulcea"},{"code":"VL","name":"Vâlcea"},{"code":"VS","name":"Vaslui"},{"code":"VN","name":"Vrancea"}]},{"code":"RU","name":"Russia","states":[]},{"code":"RW","name":"Rwanda","states":[]},{"code":"BL","name":"Saint Barthélemy","states":[]},{"code":"SH","name":"Saint Helena","states":[]},{"code":"KN","name":"Saint Kitts and Nevis","states":[]},{"code":"LC","name":"Saint Lucia","states":[]},{"code":"SX","name":"Saint Martin (Dutch part)","states":[]},{"code":"MF","name":"Saint Martin (French part)","states":[]},{"code":"PM","name":"Saint Pierre and Miquelon","states":[]},{"code":"VC","name":"Saint Vincent and the Grenadines","states":[]},{"code":"WS","name":"Samoa","states":[]},{"code":"SM","name":"San Marino","states":[]},{"code":"ST","name":"São Tomé and Príncipe","states":[]},{"code":"SA","name":"Saudi Arabia","states":[]},{"code":"SN","name":"Senegal","states":[]},{"code":"SC","name":"Seychelles","states":[]},{"code":"SL","name":"Sierra Leone","states":[]},{"code":"SG","name":"Singapore","states":[]},{"code":"SK","name":"Slovakia","states":[]},{"code":"SI","name":"Slovenia","states":[]},{"code":"SB","name":"Solomon Islands","states":[]},{"code":"SO","name":"Somalia","states":[]},{"code":"ZA","name":"South Africa","states":[{"code":"EC","name":"Eastern Cape"},{"code":"FS","name":"Free State"},{"code":"GP","name":"Gauteng"},{"code":"KZN","name":"KwaZulu-Natal"},{"code":"LP","name":"Limpopo"},{"code":"MP","name":"Mpumalanga"},{"code":"NC","name":"Northern Cape"},{"code":"NW","name":"North West"},{"code":"WC","name":"Western Cape"}]},{"code":"GS","name":"South Georgia/Sandwich Islands","states":[]},{"code":"KR","name":"South Korea","states":[]},{"code":"ES","name":"Spain","states":[{"code":"C","name":"A Coruña"},{"code":"VI","name":"Araba/Álava"},{"code":"AB","name":"Albacete"},{"code":"A","name":"Alicante"},{"code":"AL","name":"Almería"},{"code":"O","name":"Asturias"},{"code":"AV","name":"Ávila"},{"code":"BA","name":"Badajoz"},{"code":"PM","name":"Baleares"},{"code":"B","name":"Barcelona"},{"code":"BU","name":"Burgos"},{"code":"CC","name":"Cáceres"},{"code":"CA","name":"Cádiz"},{"code":"S","name":"Cantabria"},{"code":"CS","name":"Castellón"},{"code":"CE","name":"Ceuta"},{"code":"CR","name":"Ciudad Real"},{"code":"CO","name":"Córdoba"},{"code":"CU","name":"Cuenca"},{"code":"GI","name":"Girona"},{"code":"GR","name":"Granada"},{"code":"GU","name":"Guadalajara"},{"code":"SS","name":"Gipuzkoa"},{"code":"H","name":"Huelva"},{"code":"HU","name":"Huesca"},{"code":"J","name":"Jaén"},{"code":"LO","name":"La Rioja"},{"code":"GC","name":"Las Palmas"},{"code":"LE","name":"León"},{"code":"L","name":"Lleida"},{"code":"LU","name":"Lugo"},{"code":"M","name":"Madrid"},{"code":"MA","name":"Málaga"},{"code":"ML","name":"Melilla"},{"code":"MU","name":"Murcia"},{"code":"NA","name":"Navarra"},{"code":"OR","name":"Ourense"},{"code":"P","name":"Palencia"},{"code":"PO","name":"Pontevedra"},{"code":"SA","name":"Salamanca"},{"code":"TF","name":"Santa Cruz de Tenerife"},{"code":"SG","name":"Segovia"},{"code":"SE","name":"Sevilla"},{"code":"SO","name":"Soria"},{"code":"T","name":"Tarragona"},{"code":"TE","name":"Teruel"},{"code":"TO","name":"Toledo"},{"code":"V","name":"Valencia"},{"code":"VA","name":"Valladolid"},{"code":"BI","name":"Biscay"},{"code":"ZA","name":"Zamora"},{"code":"Z","name":"Zaragoza"}]},{"code":"LK","name":"Sri Lanka","states":[]},{"code":"SR","name":"Suriname","states":[]},{"code":"SJ","name":"Svalbard and Jan Mayen","states":[]},{"code":"SE","name":"Sweden","states":[]},{"code":"CH","name":"Switzerland","states":[{"code":"AG","name":"Aargau"},{"code":"AR","name":"Appenzell Ausserrhoden"},{"code":"AI","name":"Appenzell Innerrhoden"},{"code":"BL","name":"Basel-Landschaft"},{"code":"BS","name":"Basel-Stadt"},{"code":"BE","name":"Bern"},{"code":"FR","name":"Fribourg"},{"code":"GE","name":"Geneva"},{"code":"GL","name":"Glarus"},{"code":"GR","name":"Graubünden"},{"code":"JU","name":"Jura"},{"code":"LU","name":"Luzern"},{"code":"NE","name":"Neuchâtel"},{"code":"NW","name":"Nidwalden"},{"code":"OW","name":"Obwalden"},{"code":"SH","name":"Schaffhausen"},{"code":"SZ","name":"Schwyz"},{"code":"SO","name":"Solothurn"},{"code":"SG","name":"St. Gallen"},{"code":"TG","name":"Thurgau"},{"code":"TI","name":"Ticino"},{"code":"UR","name":"Uri"},{"code":"VS","name":"Valais"},{"code":"VD","name":"Vaud"},{"code":"ZG","name":"Zug"},{"code":"ZH","name":"Zürich"}]},{"code":"SY","name":"Syria","states":[]},{"code":"TW","name":"Taiwan","states":[]},{"code":"TJ","name":"Tajikistan","states":[]},{"code":"TZ","name":"Tanzania","states":[{"code":"TZ01","name":"Arusha"},{"code":"TZ02","name":"Dar es Salaam"},{"code":"TZ03","name":"Dodoma"},{"code":"TZ04","name":"Iringa"},{"code":"TZ05","name":"Kagera"},{"code":"TZ06","name":"Pemba North"},{"code":"TZ07","name":"Zanzibar North"},{"code":"TZ08","name":"Kigoma"},{"code":"TZ09","name":"Kilimanjaro"},{"code":"TZ10","name":"Pemba South"},{"code":"TZ11","name":"Zanzibar South"},{"code":"TZ12","name":"Lindi"},{"code":"TZ13","name":"Mara"},{"code":"TZ14","name":"Mbeya"},{"code":"TZ15","name":"Zanzibar West"},{"code":"TZ16","name":"Morogoro"},{"code":"TZ17","name":"Mtwara"},{"code":"TZ18","name":"Mwanza"},{"code":"TZ19","name":"Coast"},{"code":"TZ20","name":"Rukwa"},{"code":"TZ21","name":"Ruvuma"},{"code":"TZ22","name":"Shinyanga"},{"code":"TZ23","name":"Singida"},{"code":"TZ24","name":"Tabora"},{"code":"TZ25","name":"Tanga"},{"code":"TZ26","name":"Manyara"},{"code":"TZ27","name":"Geita"},{"code":"TZ28","name":"Katavi"},{"code":"TZ29","name":"Njombe"},{"code":"TZ30","name":"Simiyu"}]},{"code":"TH","name":"Thailand","states":[{"code":"TH-37","name":"Amnat Charoen"},{"code":"TH-15","name":"Ang Thong"},{"code":"TH-14","name":"Ayutthaya"},{"code":"TH-10","name":"Bangkok"},{"code":"TH-38","name":"Bueng Kan"},{"code":"TH-31","name":"Buri Ram"},{"code":"TH-24","name":"Chachoengsao"},{"code":"TH-18","name":"Chai Nat"},{"code":"TH-36","name":"Chaiyaphum"},{"code":"TH-22","name":"Chanthaburi"},{"code":"TH-50","name":"Chiang Mai"},{"code":"TH-57","name":"Chiang Rai"},{"code":"TH-20","name":"Chonburi"},{"code":"TH-86","name":"Chumphon"},{"code":"TH-46","name":"Kalasin"},{"code":"TH-62","name":"Kamphaeng Phet"},{"code":"TH-71","name":"Kanchanaburi"},{"code":"TH-40","name":"Khon Kaen"},{"code":"TH-81","name":"Krabi"},{"code":"TH-52","name":"Lampang"},{"code":"TH-51","name":"Lamphun"},{"code":"TH-42","name":"Loei"},{"code":"TH-16","name":"Lopburi"},{"code":"TH-58","name":"Mae Hong Son"},{"code":"TH-44","name":"Maha Sarakham"},{"code":"TH-49","name":"Mukdahan"},{"code":"TH-26","name":"Nakhon Nayok"},{"code":"TH-73","name":"Nakhon Pathom"},{"code":"TH-48","name":"Nakhon Phanom"},{"code":"TH-30","name":"Nakhon Ratchasima"},{"code":"TH-60","name":"Nakhon Sawan"},{"code":"TH-80","name":"Nakhon Si Thammarat"},{"code":"TH-55","name":"Nan"},{"code":"TH-96","name":"Narathiwat"},{"code":"TH-39","name":"Nong Bua Lam Phu"},{"code":"TH-43","name":"Nong Khai"},{"code":"TH-12","name":"Nonthaburi"},{"code":"TH-13","name":"Pathum Thani"},{"code":"TH-94","name":"Pattani"},{"code":"TH-82","name":"Phang Nga"},{"code":"TH-93","name":"Phatthalung"},{"code":"TH-56","name":"Phayao"},{"code":"TH-67","name":"Phetchabun"},{"code":"TH-76","name":"Phetchaburi"},{"code":"TH-66","name":"Phichit"},{"code":"TH-65","name":"Phitsanulok"},{"code":"TH-54","name":"Phrae"},{"code":"TH-83","name":"Phuket"},{"code":"TH-25","name":"Prachin Buri"},{"code":"TH-77","name":"Prachuap Khiri Khan"},{"code":"TH-85","name":"Ranong"},{"code":"TH-70","name":"Ratchaburi"},{"code":"TH-21","name":"Rayong"},{"code":"TH-45","name":"Roi Et"},{"code":"TH-27","name":"Sa Kaeo"},{"code":"TH-47","name":"Sakon Nakhon"},{"code":"TH-11","name":"Samut Prakan"},{"code":"TH-74","name":"Samut Sakhon"},{"code":"TH-75","name":"Samut Songkhram"},{"code":"TH-19","name":"Saraburi"},{"code":"TH-91","name":"Satun"},{"code":"TH-17","name":"Sing Buri"},{"code":"TH-33","name":"Sisaket"},{"code":"TH-90","name":"Songkhla"},{"code":"TH-64","name":"Sukhothai"},{"code":"TH-72","name":"Suphan Buri"},{"code":"TH-84","name":"Surat Thani"},{"code":"TH-32","name":"Surin"},{"code":"TH-63","name":"Tak"},{"code":"TH-92","name":"Trang"},{"code":"TH-23","name":"Trat"},{"code":"TH-34","name":"Ubon Ratchathani"},{"code":"TH-41","name":"Udon Thani"},{"code":"TH-61","name":"Uthai Thani"},{"code":"TH-53","name":"Uttaradit"},{"code":"TH-95","name":"Yala"},{"code":"TH-35","name":"Yasothon"}]},{"code":"TL","name":"Timor-Leste","states":[]},{"code":"TG","name":"Togo","states":[]},{"code":"TK","name":"Tokelau","states":[]},{"code":"TO","name":"Tonga","states":[]},{"code":"TT","name":"Trinidad and Tobago","states":[]},{"code":"TN","name":"Tunisia","states":[]},{"code":"TR","name":"Turkey","states":[{"code":"TR01","name":"Adana"},{"code":"TR02","name":"Adıyaman"},{"code":"TR03","name":"Afyon"},{"code":"TR04","name":"Ağrı"},{"code":"TR05","name":"Amasya"},{"code":"TR06","name":"Ankara"},{"code":"TR07","name":"Antalya"},{"code":"TR08","name":"Artvin"},{"code":"TR09","name":"Aydın"},{"code":"TR10","name":"Balıkesir"},{"code":"TR11","name":"Bilecik"},{"code":"TR12","name":"Bingöl"},{"code":"TR13","name":"Bitlis"},{"code":"TR14","name":"Bolu"},{"code":"TR15","name":"Burdur"},{"code":"TR16","name":"Bursa"},{"code":"TR17","name":"Çanakkale"},{"code":"TR18","name":"Çankırı"},{"code":"TR19","name":"Çorum"},{"code":"TR20","name":"Denizli"},{"code":"TR21","name":"Diyarbakır"},{"code":"TR22","name":"Edirne"},{"code":"TR23","name":"Elazığ"},{"code":"TR24","name":"Erzincan"},{"code":"TR25","name":"Erzurum"},{"code":"TR26","name":"Eskişehir"},{"code":"TR27","name":"Gaziantep"},{"code":"TR28","name":"Giresun"},{"code":"TR29","name":"Gümüşhane"},{"code":"TR30","name":"Hakkari"},{"code":"TR31","name":"Hatay"},{"code":"TR32","name":"Isparta"},{"code":"TR33","name":"İçel"},{"code":"TR34","name":"İstanbul"},{"code":"TR35","name":"İzmir"},{"code":"TR36","name":"Kars"},{"code":"TR37","name":"Kastamonu"},{"code":"TR38","name":"Kayseri"},{"code":"TR39","name":"Kırklareli"},{"code":"TR40","name":"Kırşehir"},{"code":"TR41","name":"Kocaeli"},{"code":"TR42","name":"Konya"},{"code":"TR43","name":"Kütahya"},{"code":"TR44","name":"Malatya"},{"code":"TR45","name":"Manisa"},{"code":"TR46","name":"Kahramanmaraş"},{"code":"TR47","name":"Mardin"},{"code":"TR48","name":"Muğla"},{"code":"TR49","name":"Muş"},{"code":"TR50","name":"Nevşehir"},{"code":"TR51","name":"Niğde"},{"code":"TR52","name":"Ordu"},{"code":"TR53","name":"Rize"},{"code":"TR54","name":"Sakarya"},{"code":"TR55","name":"Samsun"},{"code":"TR56","name":"Siirt"},{"code":"TR57","name":"Sinop"},{"code":"TR58","name":"Sivas"},{"code":"TR59","name":"Tekirdağ"},{"code":"TR60","name":"Tokat"},{"code":"TR61","name":"Trabzon"},{"code":"TR62","name":"Tunceli"},{"code":"TR63","name":"Şanlıurfa"},{"code":"TR64","name":"Uşak"},{"code":"TR65","name":"Van"},{"code":"TR66","name":"Yozgat"},{"code":"TR67","name":"Zonguldak"},{"code":"TR68","name":"Aksaray"},{"code":"TR69","name":"Bayburt"},{"code":"TR70","name":"Karaman"},{"code":"TR71","name":"Kırıkkale"},{"code":"TR72","name":"Batman"},{"code":"TR73","name":"Şırnak"},{"code":"TR74","name":"Bartın"},{"code":"TR75","name":"Ardahan"},{"code":"TR76","name":"Iğdır"},{"code":"TR77","name":"Yalova"},{"code":"TR78","name":"Karabük"},{"code":"TR79","name":"Kilis"},{"code":"TR80","name":"Osmaniye"},{"code":"TR81","name":"Düzce"}]},{"code":"TM","name":"Turkmenistan","states":[]},{"code":"TC","name":"Turks and Caicos Islands","states":[]},{"code":"TV","name":"Tuvalu","states":[]},{"code":"UG","name":"Uganda","states":[{"code":"UG314","name":"Abim"},{"code":"UG301","name":"Adjumani"},{"code":"UG322","name":"Agago"},{"code":"UG323","name":"Alebtong"},{"code":"UG315","name":"Amolatar"},{"code":"UG324","name":"Amudat"},{"code":"UG216","name":"Amuria"},{"code":"UG316","name":"Amuru"},{"code":"UG302","name":"Apac"},{"code":"UG303","name":"Arua"},{"code":"UG217","name":"Budaka"},{"code":"UG218","name":"Bududa"},{"code":"UG201","name":"Bugiri"},{"code":"UG235","name":"Bugweri"},{"code":"UG420","name":"Buhweju"},{"code":"UG117","name":"Buikwe"},{"code":"UG219","name":"Bukedea"},{"code":"UG118","name":"Bukomansimbi"},{"code":"UG220","name":"Bukwa"},{"code":"UG225","name":"Bulambuli"},{"code":"UG416","name":"Buliisa"},{"code":"UG401","name":"Bundibugyo"},{"code":"UG430","name":"Bunyangabu"},{"code":"UG402","name":"Bushenyi"},{"code":"UG202","name":"Busia"},{"code":"UG221","name":"Butaleja"},{"code":"UG119","name":"Butambala"},{"code":"UG233","name":"Butebo"},{"code":"UG120","name":"Buvuma"},{"code":"UG226","name":"Buyende"},{"code":"UG317","name":"Dokolo"},{"code":"UG121","name":"Gomba"},{"code":"UG304","name":"Gulu"},{"code":"UG403","name":"Hoima"},{"code":"UG417","name":"Ibanda"},{"code":"UG203","name":"Iganga"},{"code":"UG418","name":"Isingiro"},{"code":"UG204","name":"Jinja"},{"code":"UG318","name":"Kaabong"},{"code":"UG404","name":"Kabale"},{"code":"UG405","name":"Kabarole"},{"code":"UG213","name":"Kaberamaido"},{"code":"UG427","name":"Kagadi"},{"code":"UG428","name":"Kakumiro"},{"code":"UG101","name":"Kalangala"},{"code":"UG222","name":"Kaliro"},{"code":"UG122","name":"Kalungu"},{"code":"UG102","name":"Kampala"},{"code":"UG205","name":"Kamuli"},{"code":"UG413","name":"Kamwenge"},{"code":"UG414","name":"Kanungu"},{"code":"UG206","name":"Kapchorwa"},{"code":"UG236","name":"Kapelebyong"},{"code":"UG126","name":"Kasanda"},{"code":"UG406","name":"Kasese"},{"code":"UG207","name":"Katakwi"},{"code":"UG112","name":"Kayunga"},{"code":"UG407","name":"Kibaale"},{"code":"UG103","name":"Kiboga"},{"code":"UG227","name":"Kibuku"},{"code":"UG432","name":"Kikuube"},{"code":"UG419","name":"Kiruhura"},{"code":"UG421","name":"Kiryandongo"},{"code":"UG408","name":"Kisoro"},{"code":"UG305","name":"Kitgum"},{"code":"UG319","name":"Koboko"},{"code":"UG325","name":"Kole"},{"code":"UG306","name":"Kotido"},{"code":"UG208","name":"Kumi"},{"code":"UG333","name":"Kwania"},{"code":"UG228","name":"Kween"},{"code":"UG123","name":"Kyankwanzi"},{"code":"UG422","name":"Kyegegwa"},{"code":"UG415","name":"Kyenjojo"},{"code":"UG125","name":"Kyotera"},{"code":"UG326","name":"Lamwo"},{"code":"UG307","name":"Lira"},{"code":"UG229","name":"Luuka"},{"code":"UG104","name":"Luwero"},{"code":"UG124","name":"Lwengo"},{"code":"UG114","name":"Lyantonde"},{"code":"UG223","name":"Manafwa"},{"code":"UG320","name":"Maracha"},{"code":"UG105","name":"Masaka"},{"code":"UG409","name":"Masindi"},{"code":"UG214","name":"Mayuge"},{"code":"UG209","name":"Mbale"},{"code":"UG410","name":"Mbarara"},{"code":"UG423","name":"Mitooma"},{"code":"UG115","name":"Mityana"},{"code":"UG308","name":"Moroto"},{"code":"UG309","name":"Moyo"},{"code":"UG106","name":"Mpigi"},{"code":"UG107","name":"Mubende"},{"code":"UG108","name":"Mukono"},{"code":"UG334","name":"Nabilatuk"},{"code":"UG311","name":"Nakapiripirit"},{"code":"UG116","name":"Nakaseke"},{"code":"UG109","name":"Nakasongola"},{"code":"UG230","name":"Namayingo"},{"code":"UG234","name":"Namisindwa"},{"code":"UG224","name":"Namutumba"},{"code":"UG327","name":"Napak"},{"code":"UG310","name":"Nebbi"},{"code":"UG231","name":"Ngora"},{"code":"UG424","name":"Ntoroko"},{"code":"UG411","name":"Ntungamo"},{"code":"UG328","name":"Nwoya"},{"code":"UG331","name":"Omoro"},{"code":"UG329","name":"Otuke"},{"code":"UG321","name":"Oyam"},{"code":"UG312","name":"Pader"},{"code":"UG332","name":"Pakwach"},{"code":"UG210","name":"Pallisa"},{"code":"UG110","name":"Rakai"},{"code":"UG429","name":"Rubanda"},{"code":"UG425","name":"Rubirizi"},{"code":"UG431","name":"Rukiga"},{"code":"UG412","name":"Rukungiri"},{"code":"UG111","name":"Sembabule"},{"code":"UG232","name":"Serere"},{"code":"UG426","name":"Sheema"},{"code":"UG215","name":"Sironko"},{"code":"UG211","name":"Soroti"},{"code":"UG212","name":"Tororo"},{"code":"UG113","name":"Wakiso"},{"code":"UG313","name":"Yumbe"},{"code":"UG330","name":"Zombo"}]},{"code":"UA","name":"Ukraine","states":[{"code":"VN","name":"Vinnytsia Oblast"},{"code":"VL","name":"Volyn Oblast"},{"code":"DP","name":"Dnipropetrovsk Oblast"},{"code":"DT","name":"Donetsk Oblast"},{"code":"ZT","name":"Zhytomyr Oblast"},{"code":"ZK","name":"Zakarpattia Oblast"},{"code":"ZP","name":"Zaporizhzhia Oblast"},{"code":"IF","name":"Ivano-Frankivsk Oblast"},{"code":"KV","name":"Kyiv Oblast"},{"code":"KH","name":"Kirovohrad Oblast"},{"code":"LH","name":"Luhansk Oblast"},{"code":"LV","name":"Lviv Oblast"},{"code":"MY","name":"Mykolaiv Oblast"},{"code":"OD","name":"Odessa Oblast"},{"code":"PL","name":"Poltava Oblast"},{"code":"RV","name":"Rivne Oblast"},{"code":"SM","name":"Sumy Oblast"},{"code":"TP","name":"Ternopil Oblast"},{"code":"KK","name":"Kharkiv Oblast"},{"code":"KS","name":"Kherson Oblast"},{"code":"KM","name":"Khmelnytskyi Oblast"},{"code":"CK","name":"Cherkasy Oblast"},{"code":"CH","name":"Chernihiv Oblast"},{"code":"CV","name":"Chernivtsi Oblast"}]},{"code":"AE","name":"United Arab Emirates","states":[]},{"code":"GB","name":"United Kingdom (UK)","states":[]},{"code":"US","name":"United States (US)","states":[{"code":"AL","name":"Alabama"},{"code":"AK","name":"Alaska"},{"code":"AZ","name":"Arizona"},{"code":"AR","name":"Arkansas"},{"code":"CA","name":"California"},{"code":"CO","name":"Colorado"},{"code":"CT","name":"Connecticut"},{"code":"DE","name":"Delaware"},{"code":"DC","name":"District Of Columbia"},{"code":"FL","name":"Florida"},{"code":"GA","name":"Georgia"},{"code":"HI","name":"Hawaii"},{"code":"ID","name":"Idaho"},{"code":"IL","name":"Illinois"},{"code":"IN","name":"Indiana"},{"code":"IA","name":"Iowa"},{"code":"KS","name":"Kansas"},{"code":"KY","name":"Kentucky"},{"code":"LA","name":"Louisiana"},{"code":"ME","name":"Maine"},{"code":"MD","name":"Maryland"},{"code":"MA","name":"Massachusetts"},{"code":"MI","name":"Michigan"},{"code":"MN","name":"Minnesota"},{"code":"MS","name":"Mississippi"},{"code":"MO","name":"Missouri"},{"code":"MT","name":"Montana"},{"code":"NE","name":"Nebraska"},{"code":"NV","name":"Nevada"},{"code":"NH","name":"New Hampshire"},{"code":"NJ","name":"New Jersey"},{"code":"NM","name":"New Mexico"},{"code":"NY","name":"New York"},{"code":"NC","name":"North Carolina"},{"code":"ND","name":"North Dakota"},{"code":"OH","name":"Ohio"},{"code":"OK","name":"Oklahoma"},{"code":"OR","name":"Oregon"},{"code":"PA","name":"Pennsylvania"},{"code":"RI","name":"Rhode Island"},{"code":"SC","name":"South Carolina"},{"code":"SD","name":"South Dakota"},{"code":"TN","name":"Tennessee"},{"code":"TX","name":"Texas"},{"code":"UT","name":"Utah"},{"code":"VT","name":"Vermont"},{"code":"VA","name":"Virginia"},{"code":"WA","name":"Washington"},{"code":"WV","name":"West Virginia"},{"code":"WI","name":"Wisconsin"},{"code":"WY","name":"Wyoming"},{"code":"AA","name":"Armed Forces (AA)"},{"code":"AE","name":"Armed Forces (AE)"},{"code":"AP","name":"Armed Forces (AP)"}]},{"code":"UM","name":"United States (US) Minor Outlying Islands","states":[{"code":81,"name":"Baker Island"},{"code":84,"name":"Howland Island"},{"code":86,"name":"Jarvis Island"},{"code":67,"name":"Johnston Atoll"},{"code":89,"name":"Kingman Reef"},{"code":71,"name":"Midway Atoll"},{"code":76,"name":"Navassa Island"},{"code":95,"name":"Palmyra Atoll"},{"code":79,"name":"Wake Island"}]},{"code":"UY","name":"Uruguay","states":[{"code":"UY-AR","name":"Artigas"},{"code":"UY-CA","name":"Canelones"},{"code":"UY-CL","name":"Cerro Largo"},{"code":"UY-CO","name":"Colonia"},{"code":"UY-DU","name":"Durazno"},{"code":"UY-FS","name":"Flores"},{"code":"UY-FD","name":"Florida"},{"code":"UY-LA","name":"Lavalleja"},{"code":"UY-MA","name":"Maldonado"},{"code":"UY-MO","name":"Montevideo"},{"code":"UY-PA","name":"Paysandú"},{"code":"UY-RN","name":"Río Negro"},{"code":"UY-RV","name":"Rivera"},{"code":"UY-RO","name":"Rocha"},{"code":"UY-SA","name":"Salto"},{"code":"UY-SJ","name":"San José"},{"code":"UY-SO","name":"Soriano"},{"code":"UY-TA","name":"Tacuarembó"},{"code":"UY-TT","name":"Treinta y Tres"}]},{"code":"UZ","name":"Uzbekistan","states":[]},{"code":"VU","name":"Vanuatu","states":[]},{"code":"VA","name":"Vatican","states":[]},{"code":"VN","name":"Vietnam","states":[]},{"code":"VG","name":"Virgin Islands (British)","states":[]},{"code":"VI","name":"Virgin Islands (US)","states":[]},{"code":"WF","name":"Wallis and Futuna","states":[]},{"code":"EH","name":"Western Sahara","states":[]},{"code":"ZM","name":"Zambia","states":[{"code":"ZM-01","name":"Western"},{"code":"ZM-02","name":"Central"},{"code":"ZM-03","name":"Eastern"},{"code":"ZM-04","name":"Luapula"},{"code":"ZM-05","name":"Northern"},{"code":"ZM-06","name":"North-Western"},{"code":"ZM-07","name":"Southern"},{"code":"ZM-08","name":"Copperbelt"},{"code":"ZM-09","name":"Lusaka"},{"code":"ZM-10","name":"Muchinga"}]}]');

/***/ }),

/***/ "./src/OnboardingSPA/pages/Steps/Ecommerce/currencies.json":
/*!*****************************************************************!*\
  !*** ./src/OnboardingSPA/pages/Steps/Ecommerce/currencies.json ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"AED":"United Arab Emirates dirham (AED) (&#x62f;.&#x625;)","AFN":"Afghan afghani (AFN) (&#x60b;)","ALL":"Albanian lek (ALL) (L)","AMD":"Armenian dram (AMD) (AMD)","ANG":"Netherlands Antillean guilder (ANG) (&fnof;)","AOA":"Angolan kwanza (AOA) (Kz)","ARS":"Argentine peso (ARS) (&#36;)","AUD":"Australian dollar (AUD) (&#36;)","AWG":"Aruban florin (AWG) (Afl.)","AZN":"Azerbaijani manat (AZN) (AZN)","BAM":"Bosnia and Herzegovina convertible mark (BAM) (KM)","BBD":"Barbadian dollar (BBD) (&#36;)","BDT":"Bangladeshi taka (BDT) (&#2547;&nbsp;)","BGN":"Bulgarian lev (BGN) (&#1083;&#1074;.)","BHD":"Bahraini dinar (BHD) (.&#x62f;.&#x628;)","BIF":"Burundian franc (BIF) (Fr)","BMD":"Bermudian dollar (BMD) (&#36;)","BND":"Brunei dollar (BND) (&#36;)","BOB":"Bolivian boliviano (BOB) (Bs.)","BRL":"Brazilian real (BRL) (&#82;&#36;)","BSD":"Bahamian dollar (BSD) (&#36;)","BTC":"Bitcoin (BTC) (&#3647;)","BTN":"Bhutanese ngultrum (BTN) (Nu.)","BWP":"Botswana pula (BWP) (P)","BYR":"Belarusian ruble (old) (BYR) (Br)","BYN":"Belarusian ruble (BYN) (Br)","BZD":"Belize dollar (BZD) (&#36;)","CAD":"Canadian dollar (CAD) (&#36;)","CDF":"Congolese franc (CDF) (Fr)","CHF":"Swiss franc (CHF) (&#67;&#72;&#70;)","CLP":"Chilean peso (CLP) (&#36;)","CNY":"Chinese yuan (CNY) (&yen;)","COP":"Colombian peso (COP) (&#36;)","CRC":"Costa Rican col&oacute;n (CRC) (&#x20a1;)","CUC":"Cuban convertible peso (CUC) (&#36;)","CUP":"Cuban peso (CUP) (&#36;)","CVE":"Cape Verdean escudo (CVE) (&#36;)","CZK":"Czech koruna (CZK) (&#75;&#269;)","DJF":"Djiboutian franc (DJF) (Fr)","DKK":"Danish krone (DKK) (kr.)","DOP":"Dominican peso (DOP) (RD&#36;)","DZD":"Algerian dinar (DZD) (&#x62f;.&#x62c;)","EGP":"Egyptian pound (EGP) (EGP)","ERN":"Eritrean nakfa (ERN) (Nfk)","ETB":"Ethiopian birr (ETB) (Br)","EUR":"Euro (EUR) (&euro;)","FJD":"Fijian dollar (FJD) (&#36;)","FKP":"Falkland Islands pound (FKP) (&pound;)","GBP":"Pound sterling (GBP) (&pound;)","GEL":"Georgian lari (GEL) (&#x20be;)","GGP":"Guernsey pound (GGP) (&pound;)","GHS":"Ghana cedi (GHS) (&#x20b5;)","GIP":"Gibraltar pound (GIP) (&pound;)","GMD":"Gambian dalasi (GMD) (D)","GNF":"Guinean franc (GNF) (Fr)","GTQ":"Guatemalan quetzal (GTQ) (Q)","GYD":"Guyanese dollar (GYD) (&#36;)","HKD":"Hong Kong dollar (HKD) (&#36;)","HNL":"Honduran lempira (HNL) (L)","HRK":"Croatian kuna (HRK) (kn)","HTG":"Haitian gourde (HTG) (G)","HUF":"Hungarian forint (HUF) (&#70;&#116;)","IDR":"Indonesian rupiah (IDR) (Rp)","ILS":"Israeli new shekel (ILS) (&#8362;)","IMP":"Manx pound (IMP) (&pound;)","INR":"Indian rupee (INR) (&#8377;)","IQD":"Iraqi dinar (IQD) (&#x62f;.&#x639;)","IRR":"Iranian rial (IRR) (&#xfdfc;)","IRT":"Iranian toman (IRT) (&#x062A;&#x0648;&#x0645;&#x0627;&#x0646;)","ISK":"Icelandic kr&oacute;na (ISK) (kr.)","JEP":"Jersey pound (JEP) (&pound;)","JMD":"Jamaican dollar (JMD) (&#36;)","JOD":"Jordanian dinar (JOD) (&#x62f;.&#x627;)","JPY":"Japanese yen (JPY) (&yen;)","KES":"Kenyan shilling (KES) (KSh)","KGS":"Kyrgyzstani som (KGS) (&#x441;&#x43e;&#x43c;)","KHR":"Cambodian riel (KHR) (&#x17db;)","KMF":"Comorian franc (KMF) (Fr)","KPW":"North Korean won (KPW) (&#x20a9;)","KRW":"South Korean won (KRW) (&#8361;)","KWD":"Kuwaiti dinar (KWD) (&#x62f;.&#x643;)","KYD":"Cayman Islands dollar (KYD) (&#36;)","KZT":"Kazakhstani tenge (KZT) (&#8376;)","LAK":"Lao kip (LAK) (&#8365;)","LBP":"Lebanese pound (LBP) (&#x644;.&#x644;)","LKR":"Sri Lankan rupee (LKR) (&#xdbb;&#xdd4;)","LRD":"Liberian dollar (LRD) (&#36;)","LSL":"Lesotho loti (LSL) (L)","LYD":"Libyan dinar (LYD) (&#x644;.&#x62f;)","MAD":"Moroccan dirham (MAD) (&#x62f;.&#x645;.)","MDL":"Moldovan leu (MDL) (MDL)","MGA":"Malagasy ariary (MGA) (Ar)","MKD":"Macedonian denar (MKD) (&#x434;&#x435;&#x43d;)","MMK":"Burmese kyat (MMK) (Ks)","MNT":"Mongolian t&ouml;gr&ouml;g (MNT) (&#x20ae;)","MOP":"Macanese pataca (MOP) (P)","MRU":"Mauritanian ouguiya (MRU) (UM)","MUR":"Mauritian rupee (MUR) (&#x20a8;)","MVR":"Maldivian rufiyaa (MVR) (.&#x783;)","MWK":"Malawian kwacha (MWK) (MK)","MXN":"Mexican peso (MXN) (&#36;)","MYR":"Malaysian ringgit (MYR) (&#82;&#77;)","MZN":"Mozambican metical (MZN) (MT)","NAD":"Namibian dollar (NAD) (N&#36;)","NGN":"Nigerian naira (NGN) (&#8358;)","NIO":"Nicaraguan c&oacute;rdoba (NIO) (C&#36;)","NOK":"Norwegian krone (NOK) (&#107;&#114;)","NPR":"Nepalese rupee (NPR) (&#8360;)","NZD":"New Zealand dollar (NZD) (&#36;)","OMR":"Omani rial (OMR) (&#x631;.&#x639;.)","PAB":"Panamanian balboa (PAB) (B/.)","PEN":"Sol (PEN) (S/)","PGK":"Papua New Guinean kina (PGK) (K)","PHP":"Philippine peso (PHP) (&#8369;)","PKR":"Pakistani rupee (PKR) (&#8360;)","PLN":"Polish z&#x142;oty (PLN) (&#122;&#322;)","PRB":"Transnistrian ruble (PRB) (&#x440;.)","PYG":"Paraguayan guaran&iacute; (PYG) (&#8370;)","QAR":"Qatari riyal (QAR) (&#x631;.&#x642;)","RON":"Romanian leu (RON) (lei)","RSD":"Serbian dinar (RSD) (&#1088;&#1089;&#1076;)","RUB":"Russian ruble (RUB) (&#8381;)","RWF":"Rwandan franc (RWF) (Fr)","SAR":"Saudi riyal (SAR) (&#x631;.&#x633;)","SBD":"Solomon Islands dollar (SBD) (&#36;)","SCR":"Seychellois rupee (SCR) (&#x20a8;)","SDG":"Sudanese pound (SDG) (&#x62c;.&#x633;.)","SEK":"Swedish krona (SEK) (&#107;&#114;)","SGD":"Singapore dollar (SGD) (&#36;)","SHP":"Saint Helena pound (SHP) (&pound;)","SLL":"Sierra Leonean leone (SLL) (Le)","SOS":"Somali shilling (SOS) (Sh)","SRD":"Surinamese dollar (SRD) (&#36;)","SSP":"South Sudanese pound (SSP) (&pound;)","STN":"S&atilde;o Tom&eacute; and Pr&iacute;ncipe dobra (STN) (Db)","SYP":"Syrian pound (SYP) (&#x644;.&#x633;)","SZL":"Swazi lilangeni (SZL) (E)","THB":"Thai baht (THB) (&#3647;)","TJS":"Tajikistani somoni (TJS) (&#x405;&#x41c;)","TMT":"Turkmenistan manat (TMT) (m)","TND":"Tunisian dinar (TND) (&#x62f;.&#x62a;)","TOP":"Tongan pa&#x2bb;anga (TOP) (T&#36;)","TRY":"Turkish lira (TRY) (&#8378;)","TTD":"Trinidad and Tobago dollar (TTD) (&#36;)","TWD":"New Taiwan dollar (TWD) (&#78;&#84;&#36;)","TZS":"Tanzanian shilling (TZS) (Sh)","UAH":"Ukrainian hryvnia (UAH) (&#8372;)","UGX":"Ugandan shilling (UGX) (UGX)","USD":"United States (US) dollar (USD) (&#36;)","UYU":"Uruguayan peso (UYU) (&#36;)","UZS":"Uzbekistani som (UZS) (UZS)","VEF":"Venezuelan bol&iacute;var (VEF) (Bs F)","VES":"Bol&iacute;var soberano (VES) (Bs.S)","VND":"Vietnamese &#x111;&#x1ed3;ng (VND) (&#8363;)","VUV":"Vanuatu vatu (VUV) (Vt)","WST":"Samoan t&#x101;l&#x101; (WST) (T)","XAF":"Central African CFA franc (XAF) (CFA)","XCD":"East Caribbean dollar (XCD) (&#36;)","XOF":"West African CFA franc (XOF) (CFA)","XPF":"CFP franc (XPF) (Fr)","YER":"Yemeni rial (YER) (&#xfdfc;)","ZAR":"South African rand (ZAR) (&#82;)","ZMW":"Zambian kwacha (ZMW) (ZK)"}');

/***/ })

}]);
//# sourceMappingURL=src_OnboardingSPA_pages_Steps_Ecommerce_StepAddress_index_js.js.map