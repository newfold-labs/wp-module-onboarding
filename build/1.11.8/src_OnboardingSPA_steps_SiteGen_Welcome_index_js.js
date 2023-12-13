"use strict";
(globalThis["webpackChunknewfold_Onboarding"] = globalThis["webpackChunknewfold_Onboarding"] || []).push([["src_OnboardingSPA_steps_SiteGen_Welcome_index_js"],{

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

/***/ "./src/OnboardingSPA/steps/SiteGen/Welcome/contents.js":
/*!*************************************************************!*\
  !*** ./src/OnboardingSPA/steps/SiteGen/Welcome/contents.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);


const getContents = () => {
  return {
    heading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Website Creator for WordPress', 'wp-module-onboarding'),
    subHeading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Tell our AI engine what kind of site you want to make and let it handle the content and design for you.', 'wp-module-onboarding'),
    buttonText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Get Started', 'wp-module-onboarding')
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getContents);

/***/ }),

/***/ "./src/OnboardingSPA/steps/SiteGen/Welcome/index.js":
/*!**********************************************************!*\
  !*** ./src/OnboardingSPA/steps/SiteGen/Welcome/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Layouts_Common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/Layouts/Common */ "./src/OnboardingSPA/components/Layouts/Common.js");
/* harmony import */ var _components_Button_NextButtonSiteGen__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/Button/NextButtonSiteGen */ "./src/OnboardingSPA/components/Button/NextButtonSiteGen/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.js");
/* harmony import */ var _contents__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./contents */ "./src/OnboardingSPA/steps/SiteGen/Welcome/contents.js");









const SiteGenWelcome = () => {
  const {
    setIsHeaderEnabled,
    setSidebarActiveView,
    setHeaderActiveView,
    setDrawerActiveView,
    setIsHeaderNavigationEnabled
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_4__.store);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setIsHeaderEnabled(true);
    setSidebarActiveView(false);
    setHeaderActiveView(_constants__WEBPACK_IMPORTED_MODULE_5__.HEADER_SITEGEN);
    setIsHeaderNavigationEnabled(true);
    setDrawerActiveView(false);
  });
  const content = (0,_contents__WEBPACK_IMPORTED_MODULE_6__["default"])();
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Layouts_Common__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: "nfd-onboarding-step--site-gen__welcome"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-step--site-gen__welcome__container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-step--site-gen__welcome__container__animation"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-step--site-gen__welcome__container__heading"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-step--site-gen__welcome__container__heading__image"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "nfd-onboarding-step--site-gen__welcome__container__heading__text"
  }, content.heading)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-step--site-gen__welcome__container__sub-heading"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "nfd-onboarding-step--site-gen__welcome__container__sub-heading__text"
  }, content.subHeading)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Button_NextButtonSiteGen__WEBPACK_IMPORTED_MODULE_3__["default"], {
    text: content.buttonText
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SiteGenWelcome);

/***/ })

}]);
//# sourceMappingURL=src_OnboardingSPA_steps_SiteGen_Welcome_index_js.js.map