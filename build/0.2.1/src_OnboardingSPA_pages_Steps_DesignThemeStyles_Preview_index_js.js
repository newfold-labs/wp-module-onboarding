"use strict";
(self["webpackChunknewfold_Onboarding"] = self["webpackChunknewfold_Onboarding"] || []).push([["src_OnboardingSPA_pages_Steps_DesignThemeStyles_Preview_index_js"],{

/***/ "./src/OnboardingSPA/components/ErrorState/Step/index.js":
/*!***************************************************************!*\
  !*** ./src/OnboardingSPA/components/ErrorState/Step/index.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Layouts_Common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Layouts/Common */ "./src/OnboardingSPA/components/Layouts/Common.js");
/* harmony import */ var _HeadingWithSubHeading__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../HeadingWithSubHeading */ "./src/OnboardingSPA/components/HeadingWithSubHeading/index.js");
/* harmony import */ var _NeedHelpTag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../NeedHelpTag */ "./src/OnboardingSPA/components/NeedHelpTag/index.js");





const StepErrorState = _ref => {
  let {
    title,
    subtitle,
    error
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Layouts_Common__WEBPACK_IMPORTED_MODULE_1__["default"], {
    className: "step-error-state",
    isVerticallyCentered: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_HeadingWithSubHeading__WEBPACK_IMPORTED_MODULE_2__["default"], {
    title: title,
    subtitle: subtitle
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "step-error-state__logo"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "step-error-state__error"
  }, error), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_NeedHelpTag__WEBPACK_IMPORTED_MODULE_3__["default"], null));
};

/* harmony default export */ __webpack_exports__["default"] = (StepErrorState);

/***/ }),

/***/ "./src/OnboardingSPA/components/ErrorState/index.js":
/*!**********************************************************!*\
  !*** ./src/OnboardingSPA/components/ErrorState/index.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StepErrorState": function() { return /* reexport safe */ _Step__WEBPACK_IMPORTED_MODULE_0__["default"]; }
/* harmony export */ });
/* harmony import */ var _Step__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Step */ "./src/OnboardingSPA/components/ErrorState/Step/index.js");


/***/ }),

/***/ "./src/OnboardingSPA/components/HeadingWithSubHeading/index.js":
/*!*********************************************************************!*\
  !*** ./src/OnboardingSPA/components/HeadingWithSubHeading/index.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);


/**
 * Interface Cards with standard design.
 *
 * @returns
 */

const HeadingWithSubHeading = _ref => {
  let {
    title,
    subtitle
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-main-heading"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "nfd-main-heading__title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(title, "wp-module-onboarding")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "nfd-main-heading__subtitle"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(subtitle, "wp-module-onboarding")));
};

/* harmony default export */ __webpack_exports__["default"] = (HeadingWithSubHeading);

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

/***/ "./src/OnboardingSPA/components/Loaders/ImageUpload/index.js":
/*!*******************************************************************!*\
  !*** ./src/OnboardingSPA/components/Loaders/ImageUpload/index.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


const ImageUploadLoader = () => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "image-upload-loader--loading-box"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "image-upload-loader--loading-box__loader"
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (ImageUploadLoader);

/***/ }),

/***/ "./src/OnboardingSPA/components/Loaders/Step/index.js":
/*!************************************************************!*\
  !*** ./src/OnboardingSPA/components/Loaders/Step/index.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Layouts_Common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Layouts/Common */ "./src/OnboardingSPA/components/Layouts/Common.js");
/* harmony import */ var _HeadingWithSubHeading__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../HeadingWithSubHeading */ "./src/OnboardingSPA/components/HeadingWithSubHeading/index.js");
/* harmony import */ var _NeedHelpTag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../NeedHelpTag */ "./src/OnboardingSPA/components/NeedHelpTag/index.js");





const StepLoader = _ref => {
  let {
    title,
    subtitle
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Layouts_Common__WEBPACK_IMPORTED_MODULE_1__["default"], {
    className: "step-loader",
    isVerticallyCentered: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_HeadingWithSubHeading__WEBPACK_IMPORTED_MODULE_2__["default"], {
    title: title,
    subtitle: subtitle
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "step-loader__logo-container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "step-loader__logo"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_NeedHelpTag__WEBPACK_IMPORTED_MODULE_3__["default"], null));
};

/* harmony default export */ __webpack_exports__["default"] = (StepLoader);

/***/ }),

/***/ "./src/OnboardingSPA/components/Loaders/index.js":
/*!*******************************************************!*\
  !*** ./src/OnboardingSPA/components/Loaders/index.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageUploadLoader": function() { return /* reexport safe */ _ImageUpload__WEBPACK_IMPORTED_MODULE_1__["default"]; },
/* harmony export */   "StepLoader": function() { return /* reexport safe */ _Step__WEBPACK_IMPORTED_MODULE_0__["default"]; }
/* harmony export */ });
/* harmony import */ var _Step__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Step */ "./src/OnboardingSPA/components/Loaders/Step/index.js");
/* harmony import */ var _ImageUpload__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ImageUpload */ "./src/OnboardingSPA/components/Loaders/ImageUpload/index.js");



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

/***/ "./src/OnboardingSPA/components/StateHandlers/Design/index.js":
/*!********************************************************************!*\
  !*** ./src/OnboardingSPA/components/StateHandlers/Design/index.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Loaders__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Loaders */ "./src/OnboardingSPA/components/Loaders/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _utils_api_themes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils/api/themes */ "./src/OnboardingSPA/utils/api/themes.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.js");
/* harmony import */ var _utils_api_settings__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../utils/api/settings */ "./src/OnboardingSPA/utils/api/settings.js");
/* harmony import */ var _ErrorState__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../ErrorState */ "./src/OnboardingSPA/components/ErrorState/index.js");











const DesignStateHandler = _ref => {
  let {
    children
  } = _ref;
  const {
    storedThemeStatus
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    return {
      storedThemeStatus: select(_store__WEBPACK_IMPORTED_MODULE_4__.store).getThemeStatus()
    };
  }, []);
  const {
    updateThemeStatus,
    updatePreviewSettings
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_4__.store);

  const checkThemeStatus = async () => {
    const themeStatus = await (0,_utils_api_themes__WEBPACK_IMPORTED_MODULE_5__.getThemeStatus)(_constants__WEBPACK_IMPORTED_MODULE_6__.DESIGN_STEPS_THEME);

    if (themeStatus !== null && themeStatus !== void 0 && themeStatus.error) {
      return _constants__WEBPACK_IMPORTED_MODULE_6__.THEME_STATUS_NOT_ACTIVE;
    }

    return themeStatus.body.status;
  };

  const loadPreviewSettings = async () => {
    const previewSettings = await (0,_utils_api_settings__WEBPACK_IMPORTED_MODULE_7__.getPreviewSettings)();

    if (previewSettings !== null && previewSettings !== void 0 && previewSettings.body) {
      updatePreviewSettings(previewSettings.body);
    }
  };

  const waitForInstall = () => {
    setTimeout(async () => {
      const themeStatus = await checkThemeStatus();

      if (themeStatus !== _constants__WEBPACK_IMPORTED_MODULE_6__.THEME_STATUS_ACTIVE) {
        return updateThemeStatus(_constants__WEBPACK_IMPORTED_MODULE_6__.THEME_STATUS_NOT_ACTIVE);
      }

      updateThemeStatus(themeStatus);
      await loadPreviewSettings();
    }, _constants__WEBPACK_IMPORTED_MODULE_6__.THEME_INSTALL_WAIT_TIMEOUT);
  };

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(async () => {
    if (storedThemeStatus === _constants__WEBPACK_IMPORTED_MODULE_6__.THEME_STATUS_INIT) {
      const themeStatus = await checkThemeStatus();

      switch (themeStatus) {
        case _constants__WEBPACK_IMPORTED_MODULE_6__.THEME_STATUS_INSTALLING:
          waitForInstall();
          break;

        case _constants__WEBPACK_IMPORTED_MODULE_6__.THEME_STATUS_ACTIVE:
          await loadPreviewSettings();
          updateThemeStatus(themeStatus);
          break;

        default:
          updateThemeStatus(themeStatus);
      }
    }
  }, [storedThemeStatus]);

  const handleRender = () => {
    switch (storedThemeStatus) {
      case _constants__WEBPACK_IMPORTED_MODULE_6__.THEME_STATUS_NOT_ACTIVE:
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ErrorState__WEBPACK_IMPORTED_MODULE_8__.StepErrorState, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Preparing your Bluehost design studio', 'wp-module-onboarding'),
          subtitle: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Hang tight while we show you some of the best WordPress has to offer!', 'wp-module-onboarding'),
          error: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Uh-oh, something went wrong. Please contact support.', 'wp-module-onboarding')
        });

      case _constants__WEBPACK_IMPORTED_MODULE_6__.THEME_STATUS_ACTIVE:
        return children;

      default:
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Loaders__WEBPACK_IMPORTED_MODULE_3__.StepLoader, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Preparing your Bluehost design studio', 'wp-module-onboarding'),
          subtitle: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Hang tight while we show you some of the best WordPress has to offer!', 'wp-module-onboarding')
        });
    }
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, handleRender());
};

/* harmony default export */ __webpack_exports__["default"] = (DesignStateHandler);

/***/ }),

/***/ "./src/OnboardingSPA/components/StateHandlers/Ecommerce/index.js":
/*!***********************************************************************!*\
  !*** ./src/OnboardingSPA/components/StateHandlers/Ecommerce/index.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Loaders__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Loaders */ "./src/OnboardingSPA/components/Loaders/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _utils_api_plugins__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils/api/plugins */ "./src/OnboardingSPA/utils/api/plugins.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.js");
/* harmony import */ var _utils_api_settings__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../utils/api/settings */ "./src/OnboardingSPA/utils/api/settings.js");
/* harmony import */ var _ErrorState__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../ErrorState */ "./src/OnboardingSPA/components/ErrorState/index.js");











const EcommerceStateHandler = _ref => {
  let {
    children
  } = _ref;
  const [woocommerceStatus, setWoocommerceStatus] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(_constants__WEBPACK_IMPORTED_MODULE_6__.PLUGIN_STATUS_INSTALLING);
  const {
    storedPluginsStatus
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    return {
      storedPluginsStatus: select(_store__WEBPACK_IMPORTED_MODULE_4__.store).getPluginsStatus()
    };
  }, []);
  const {
    updatePluginsStatus,
    updatePreviewSettings
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_4__.store);

  const checkPluginStatus = async () => {
    const pluginStatus = await (0,_utils_api_plugins__WEBPACK_IMPORTED_MODULE_5__.getPluginStatus)(_constants__WEBPACK_IMPORTED_MODULE_6__.ECOMMERCE_STEPS_PLUGIN);

    if (pluginStatus !== null && pluginStatus !== void 0 && pluginStatus.error) {
      return _constants__WEBPACK_IMPORTED_MODULE_6__.PLUGIN_STATUS_NOT_ACTIVE;
    }

    return pluginStatus.body.status;
  };

  const loadPreviewSettings = async () => {
    const previewSettings = await (0,_utils_api_settings__WEBPACK_IMPORTED_MODULE_7__.getPreviewSettings)();

    if (previewSettings !== null && previewSettings !== void 0 && previewSettings.body) {
      updatePreviewSettings(previewSettings.body);
    }
  };

  const waitForInstall = () => {
    setTimeout(async () => {
      const pluginStatus = await checkPluginStatus();

      if (pluginStatus !== _constants__WEBPACK_IMPORTED_MODULE_6__.PLUGIN_STATUS_ACTIVE) {
        storedPluginsStatus[_constants__WEBPACK_IMPORTED_MODULE_6__.ECOMMERCE_STEPS_PLUGIN] = _constants__WEBPACK_IMPORTED_MODULE_6__.PLUGIN_STATUS_NOT_ACTIVE;
        setWoocommerceStatus(_constants__WEBPACK_IMPORTED_MODULE_6__.PLUGIN_STATUS_NOT_ACTIVE);
        return updatePluginsStatus(storedPluginsStatus);
      }

      storedPluginsStatus[_constants__WEBPACK_IMPORTED_MODULE_6__.ECOMMERCE_STEPS_PLUGIN] = pluginStatus;
      setWoocommerceStatus(pluginStatus);
      updatePluginsStatus(storedPluginsStatus);
      await loadPreviewSettings();
    }, _constants__WEBPACK_IMPORTED_MODULE_6__.PLUGIN_INSTALL_WAIT_TIMEOUT);
  };

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(async () => {
    setWoocommerceStatus(storedPluginsStatus[_constants__WEBPACK_IMPORTED_MODULE_6__.ECOMMERCE_STEPS_PLUGIN]);

    if (storedPluginsStatus[_constants__WEBPACK_IMPORTED_MODULE_6__.ECOMMERCE_STEPS_PLUGIN] === _constants__WEBPACK_IMPORTED_MODULE_6__.PLUGIN_STATUS_INIT) {
      const pluginStatus = await checkPluginStatus();

      switch (pluginStatus) {
        case _constants__WEBPACK_IMPORTED_MODULE_6__.PLUGIN_STATUS_INSTALLING:
          waitForInstall();
          break;

        case _constants__WEBPACK_IMPORTED_MODULE_6__.PLUGIN_STATUS_ACTIVE:
          await loadPreviewSettings();
          storedPluginsStatus[_constants__WEBPACK_IMPORTED_MODULE_6__.ECOMMERCE_STEPS_PLUGIN] = pluginStatus;
          setWoocommerceStatus(pluginStatus);
          updatePluginsStatus(storedPluginsStatus);
          break;

        default:
          storedPluginsStatus[_constants__WEBPACK_IMPORTED_MODULE_6__.ECOMMERCE_STEPS_PLUGIN] = pluginStatus;
          setWoocommerceStatus(pluginStatus);
          updatePluginsStatus(storedPluginsStatus);
      }
    }
  }, [storedPluginsStatus]);

  const handleRender = () => {
    switch (woocommerceStatus) {
      case _constants__WEBPACK_IMPORTED_MODULE_6__.PLUGIN_STATUS_NOT_ACTIVE:
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ErrorState__WEBPACK_IMPORTED_MODULE_8__.StepErrorState, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Making the keys to your Bluehost Online Store', 'wp-module-onboarding'),
          subtitle: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('We’re installing WooCommerce for you to fill with your amazing products & services!', 'wp-module-onboarding'),
          error: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Uh-oh, something went wrong. Please contact support.', 'wp-module-onboarding')
        });

      case _constants__WEBPACK_IMPORTED_MODULE_6__.PLUGIN_STATUS_ACTIVE:
        return children;

      default:
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Loaders__WEBPACK_IMPORTED_MODULE_3__.StepLoader, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Making the keys to your Bluehost Online Store', 'wp-module-onboarding'),
          subtitle: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('We’re installing WooCommerce for you to fill with your amazing products & services!', 'wp-module-onboarding')
        });
    }
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, handleRender());
};

/* harmony default export */ __webpack_exports__["default"] = (EcommerceStateHandler);

/***/ }),

/***/ "./src/OnboardingSPA/components/StateHandlers/index.js":
/*!*************************************************************!*\
  !*** ./src/OnboardingSPA/components/StateHandlers/index.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DesignStateHandler": function() { return /* reexport safe */ _Design__WEBPACK_IMPORTED_MODULE_0__["default"]; },
/* harmony export */   "EcommerceStateHandler": function() { return /* reexport safe */ _Ecommerce__WEBPACK_IMPORTED_MODULE_1__["default"]; }
/* harmony export */ });
/* harmony import */ var _Design__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Design */ "./src/OnboardingSPA/components/StateHandlers/Design/index.js");
/* harmony import */ var _Ecommerce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ecommerce */ "./src/OnboardingSPA/components/StateHandlers/Ecommerce/index.js");



/***/ }),

/***/ "./src/OnboardingSPA/pages/Steps/DesignThemeStyles/Preview/index.js":
/*!**************************************************************************!*\
  !*** ./src/OnboardingSPA/pages/Steps/DesignThemeStyles/Preview/index.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_LivePreview__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/LivePreview */ "./src/OnboardingSPA/components/LivePreview/index.js");
/* harmony import */ var _components_Layouts_Common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/Layouts/Common */ "./src/OnboardingSPA/components/Layouts/Common.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../constants */ "./src/constants.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _utils_api_patterns__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../utils/api/patterns */ "./src/OnboardingSPA/utils/api/patterns.js");
/* harmony import */ var _utils_api_themes__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../utils/api/themes */ "./src/OnboardingSPA/utils/api/themes.js");
/* harmony import */ var _utils_global_styles_use_global_styles_output__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../utils/global-styles/use-global-styles-output */ "./src/OnboardingSPA/utils/global-styles/use-global-styles-output.js");
/* harmony import */ var _data_routes___WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../data/routes/ */ "./src/OnboardingSPA/data/routes/index.js");
/* harmony import */ var _components_StateHandlers__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/StateHandlers */ "./src/OnboardingSPA/components/StateHandlers/index.js");


















const StepDesignThemeStylesPreview = () => {
  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_15__.useLocation)();
  const [isLoaded, setIsLoaded] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [pattern, setPattern] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const [customize, setCustomize] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const isLargeViewport = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__.useViewportMatch)('medium');
  const {
    currentStep,
    currentData,
    storedPreviewSettings,
    routes,
    designSteps,
    allSteps,
    themeStatus
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    return {
      currentStep: select(_store__WEBPACK_IMPORTED_MODULE_9__.store).getStepFromPath(location.pathname),
      currentData: select(_store__WEBPACK_IMPORTED_MODULE_9__.store).getCurrentOnboardingData(),
      storedPreviewSettings: select(_store__WEBPACK_IMPORTED_MODULE_9__.store).getPreviewSettings(),
      routes: select(_store__WEBPACK_IMPORTED_MODULE_9__.store).getRoutes(),
      allSteps: select(_store__WEBPACK_IMPORTED_MODULE_9__.store).getAllSteps(),
      designSteps: select(_store__WEBPACK_IMPORTED_MODULE_9__.store).getDesignSteps(),
      themeStatus: select(_store__WEBPACK_IMPORTED_MODULE_9__.store).getThemeStatus()
    };
  }, []);
  const {
    setDrawerActiveView,
    setIsDrawerOpened,
    setIsSidebarOpened,
    setIsDrawerSuppressed,
    updatePreviewSettings,
    updateRoutes,
    updateDesignSteps,
    updateAllSteps,
    setCurrentOnboardingData,
    updateThemeStatus
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_9__.store);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isLargeViewport) {
      setIsDrawerOpened(true);
    }

    setIsSidebarOpened(false);
    setIsDrawerSuppressed(false);
    setDrawerActiveView(_constants__WEBPACK_IMPORTED_MODULE_8__.VIEW_DESIGN_THEME_STYLES_PREVIEW);
    handleCheckbox(currentData.data.customDesign, false);
  }, []);

  const getStylesAndPatterns = async () => {
    const patternsResponse = await (0,_utils_api_patterns__WEBPACK_IMPORTED_MODULE_10__.getPatterns)(currentStep.patternId, true);

    if (patternsResponse !== null && patternsResponse !== void 0 && patternsResponse.error) {
      return updateThemeStatus(_constants__WEBPACK_IMPORTED_MODULE_8__.THEME_STATUS_NOT_ACTIVE);
    }

    const globalStylesResponse = await (0,_utils_api_themes__WEBPACK_IMPORTED_MODULE_11__.getGlobalStyles)();

    if (globalStylesResponse !== null && globalStylesResponse !== void 0 && globalStylesResponse.error) {
      return updateThemeStatus(_constants__WEBPACK_IMPORTED_MODULE_8__.THEME_STATUS_NOT_ACTIVE);
    }

    let selectedGlobalStyle;

    if (currentData.data.theme.variation) {
      selectedGlobalStyle = globalStylesResponse.body.filter(globalStyle => globalStyle.title === currentData.data.theme.variation)[0];
    } else {
      selectedGlobalStyle = globalStylesResponse.body[0];
    }

    updatePreviewSettings((0,_utils_global_styles_use_global_styles_output__WEBPACK_IMPORTED_MODULE_12__.useGlobalStylesOutput)(selectedGlobalStyle, storedPreviewSettings));
    setPattern(patternsResponse === null || patternsResponse === void 0 ? void 0 : patternsResponse.body);
    setIsLoaded(true);
  };

  const addColorAndTypographyRoutes = () => {
    const updates = removeColorAndTypographyRoutes();
    const steps = [_data_routes___WEBPACK_IMPORTED_MODULE_13__.conditionalSteps.designColors, _data_routes___WEBPACK_IMPORTED_MODULE_13__.conditionalSteps.designTypography];
    return {
      routes: (0,lodash__WEBPACK_IMPORTED_MODULE_5__.orderBy)(updates.routes.concat(steps), ['priority'], ['asc']),
      allSteps: (0,lodash__WEBPACK_IMPORTED_MODULE_5__.orderBy)(updates.allSteps.concat(steps), ['priority'], ['asc']),
      designSteps: (0,lodash__WEBPACK_IMPORTED_MODULE_5__.orderBy)(updates.designSteps.concat(steps), ['priority'], ['asc'])
    };
  };

  const removeColorAndTypographyRoutes = () => {
    return {
      routes: (0,lodash__WEBPACK_IMPORTED_MODULE_5__.filter)(routes, route => !route.path.includes(_data_routes___WEBPACK_IMPORTED_MODULE_13__.conditionalSteps.designColors.path) && !route.path.includes(_data_routes___WEBPACK_IMPORTED_MODULE_13__.conditionalSteps.designTypography.path)),
      allSteps: (0,lodash__WEBPACK_IMPORTED_MODULE_5__.filter)(allSteps, allStep => !allStep.path.includes(_data_routes___WEBPACK_IMPORTED_MODULE_13__.conditionalSteps.designColors.path) && !allStep.path.includes(_data_routes___WEBPACK_IMPORTED_MODULE_13__.conditionalSteps.designTypography.path)),
      designSteps: (0,lodash__WEBPACK_IMPORTED_MODULE_5__.filter)(designSteps, designStep => !designStep.path.includes(_data_routes___WEBPACK_IMPORTED_MODULE_13__.conditionalSteps.designColors.path) && !designStep.path.includes(_data_routes___WEBPACK_IMPORTED_MODULE_13__.conditionalSteps.designTypography.path))
    };
  };

  const handleCheckbox = function (customize) {
    let updateOnboardingData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    let updates;

    if (customize) {
      updates = addColorAndTypographyRoutes();
    } else {
      updates = removeColorAndTypographyRoutes();
    }

    updateRoutes(updates.routes);
    updateDesignSteps(updates.designSteps);
    updateAllSteps(updates.allSteps);
    setCustomize(customize);

    if (updateOnboardingData) {
      currentData.data.customDesign = customize;
      setCurrentOnboardingData(currentData);
    }
  };

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!isLoaded && themeStatus === _constants__WEBPACK_IMPORTED_MODULE_8__.THEME_STATUS_ACTIVE) getStylesAndPatterns();
  }, [isLoaded, themeStatus]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_StateHandlers__WEBPACK_IMPORTED_MODULE_14__.DesignStateHandler, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Layouts_Common__WEBPACK_IMPORTED_MODULE_7__["default"], {
    className: "theme-styles-preview"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "theme-styles-preview__checkbox"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.CheckboxControl, {
    label: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "theme-styles-preview__checkbox__label"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "theme-styles-preview__checkbox__label__question"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Customize Colors & Fonts?', 'wp-module-onboarding'), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "theme-styles-preview__checkbox__label__hint"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Check to customize in the next few steps (or leave empty and use the Site Editor later)', 'wp-module-onboarding')))),
    checked: customize,
    onChange: () => handleCheckbox(!customize)
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "theme-styles-preview__title-bar"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "theme-styles-preview__title-bar__browser"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "theme-styles-preview__title-bar__browser__dot"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "theme-styles-preview__title-bar__browser__dot"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "theme-styles-preview__title-bar__browser__dot"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "theme-styles-preview__live-preview-container"
  }, pattern && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_LivePreview__WEBPACK_IMPORTED_MODULE_6__.LivePreview, {
    blockGrammer: pattern,
    styling: 'custom',
    viewportWidth: 1300
  }))));
};

/* harmony default export */ __webpack_exports__["default"] = (StepDesignThemeStylesPreview);

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

/***/ })

}]);
//# sourceMappingURL=src_OnboardingSPA_pages_Steps_DesignThemeStyles_Preview_index_js.js.map