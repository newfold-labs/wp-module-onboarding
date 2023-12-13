"use strict";
(globalThis["webpackChunknewfold_Onboarding"] = globalThis["webpackChunknewfold_Onboarding"] || []).push([["src_OnboardingSPA_components_Footer_components_SiteGenFooter_index_js"],{

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

/***/ "./src/OnboardingSPA/components/Footer/components/SiteGenFooter/index.js":
/*!*******************************************************************************!*\
  !*** ./src/OnboardingSPA/components/Footer/components/SiteGenFooter/index.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ToggleDarkMode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../ToggleDarkMode */ "./src/OnboardingSPA/components/ToggleDarkMode/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../constants */ "./src/constants.js");
/* harmony import */ var _Button_NextButtonSiteGen__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../Button/NextButtonSiteGen */ "./src/OnboardingSPA/components/Button/NextButtonSiteGen/index.js");










const SiteGenFooter = () => {
  const isLargeViewport = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_4__.useViewportMatch)('small');
  const {
    footerNavEnabled
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    return {
      footerNavEnabled: select(_store__WEBPACK_IMPORTED_MODULE_6__.store).getFooterNavEnabled()
    };
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Fill, {
    name: `${_constants__WEBPACK_IMPORTED_MODULE_7__.FOOTER_SITEGEN}/${_constants__WEBPACK_IMPORTED_MODULE_7__.FOOTER_START}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ToggleDarkMode__WEBPACK_IMPORTED_MODULE_5__["default"], null)), !isLargeViewport && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Fill, {
    name: `${_constants__WEBPACK_IMPORTED_MODULE_7__.FOOTER_SITEGEN}/${_constants__WEBPACK_IMPORTED_MODULE_7__.FOOTER_END}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Button_NextButtonSiteGen__WEBPACK_IMPORTED_MODULE_8__["default"], {
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Next', 'wp-module-onboarding'),
    disabled: !footerNavEnabled
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SiteGenFooter);

/***/ }),

/***/ "./src/OnboardingSPA/components/ToggleDarkMode/index.js":
/*!**************************************************************!*\
  !*** ./src/OnboardingSPA/components/ToggleDarkMode/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ThemeContextProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ThemeContextProvider */ "./src/OnboardingSPA/components/ThemeContextProvider/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../constants */ "./src/constants.js");
/* harmony import */ var _Animate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Animate */ "./src/OnboardingSPA/components/Animate/index.js");







const ToggleDarkMode = () => {
  const {
    theme,
    toggleTheme
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_ThemeContextProvider__WEBPACK_IMPORTED_MODULE_1__.ThemeContext);
  const isDarkMode = theme === _constants__WEBPACK_IMPORTED_MODULE_3__.THEME_DARK;

  const onChange = () => {
    toggleTheme();
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Animate__WEBPACK_IMPORTED_MODULE_4__["default"], {
    type: 'fade-in',
    duration: "200ms",
    key: isDarkMode,
    timingFunction: "ease-in-out"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-toggle__theme"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('nfd-onboarding-toggle__theme__button', {
      'nfd-onboarding-toggle__theme__button__light': !isDarkMode,
      'nfd-onboarding-toggle__theme__button__dark': isDarkMode
    }),
    onClick: () => onChange(),
    role: "button",
    onKeyDown: event => {
      if (event.key === 'Enter') {
        onChange();
      }
    },
    tabIndex: "0"
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ToggleDarkMode);

/***/ })

}]);
//# sourceMappingURL=src_OnboardingSPA_components_Footer_components_SiteGenFooter_index_js.js.map