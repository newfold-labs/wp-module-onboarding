"use strict";
(globalThis["webpackChunknewfold_Onboarding"] = globalThis["webpackChunknewfold_Onboarding"] || []).push([["src_OnboardingSPA_steps_SitePages_index_js"],{

/***/ "./src/OnboardingSPA/components/ErrorState/Step/index.js":
/*!***************************************************************!*\
  !*** ./src/OnboardingSPA/components/ErrorState/Step/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Layouts_Common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Layouts/Common */ "./src/OnboardingSPA/components/Layouts/Common.js");
/* harmony import */ var _Heading_HeadingWithSubHeading__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Heading/HeadingWithSubHeading */ "./src/OnboardingSPA/components/Heading/HeadingWithSubHeading/index.js");
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
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Heading_HeadingWithSubHeading__WEBPACK_IMPORTED_MODULE_2__["default"], {
    title: title,
    subtitle: subtitle
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "step-error-state__logo"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "step-error-state__error"
  }, error), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_NeedHelpTag__WEBPACK_IMPORTED_MODULE_3__["default"], null));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StepErrorState);

/***/ }),

/***/ "./src/OnboardingSPA/components/ErrorState/index.js":
/*!**********************************************************!*\
  !*** ./src/OnboardingSPA/components/ErrorState/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StepErrorState": () => (/* reexport safe */ _Step__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _Step__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Step */ "./src/OnboardingSPA/components/ErrorState/Step/index.js");


/***/ }),

/***/ "./src/OnboardingSPA/components/ExitToWordPress/index.js":
/*!***************************************************************!*\
  !*** ./src/OnboardingSPA/components/ExitToWordPress/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/chevron-left.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _newfold_labs_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @newfold-labs/js-utility-ui-analytics */ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/index.js");
/* harmony import */ var _utils_api_flow__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/api/flow */ "./src/OnboardingSPA/utils/api/flow.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _utils_api_settings__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/api/settings */ "./src/OnboardingSPA/utils/api/settings.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../constants */ "./src/constants.js");
/* harmony import */ var _utils_analytics_hiive__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../utils/analytics/hiive */ "./src/OnboardingSPA/utils/analytics/hiive/index.js");
/* harmony import */ var _utils_analytics_hiive_constants__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../utils/analytics/hiive/constants */ "./src/OnboardingSPA/utils/analytics/hiive/constants.js");
/* harmony import */ var _utils_api_plugins__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../utils/api/plugins */ "./src/OnboardingSPA/utils/api/plugins.js");
/* harmony import */ var _utils_api_comingSoon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../utils/api/comingSoon */ "./src/OnboardingSPA/utils/api/comingSoon.js");

















/**
 * Self-contained button and confirmation modal for exiting Onboarding page.
 *
 * @param {*} param0
 *
 * @return {WPComponent} ExitToWordPress Component
 */

const ExitToWordPress = _ref => {
  let {
    buttonText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Exit to WordPress', 'wp-module-onboarding'),
    showButtonIcon = true,
    showButton = true,
    buttonVariant = 'secondary',
    buttonClassName = false,
    isModalOpen = false,
    modalTitle = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Exit without finishing?', 'wp-module-onboarding'),
    modalText = false,
    modalPrimaryCloseButtonText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Continue', 'wp-module-onboarding'),
    modalOnClose = false,
    modalExitButtonText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Exit', 'wp-module-onboarding')
  } = _ref;
  const [isOpen, setIsOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(isModalOpen);

  const openModal = () => setIsOpen(true);

  const closeModal = () => {
    if (typeof modalOnClose === 'function') {
      modalOnClose();
    }

    setIsOpen(false);
  };

  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_14__.useLocation)();
  const {
    currentData,
    brandName,
    socialData,
    currentStep
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    return {
      currentData: select(_store__WEBPACK_IMPORTED_MODULE_7__.store).getCurrentOnboardingData(),
      brandName: select(_store__WEBPACK_IMPORTED_MODULE_7__.store).getNewfoldBrandName(),
      socialData: select(_store__WEBPACK_IMPORTED_MODULE_7__.store).getOnboardingSocialData(),
      currentStep: select(_store__WEBPACK_IMPORTED_MODULE_7__.store).getCurrentStep()
    };
  }, []);
  const {
    setOnboardingSocialData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_7__.store);

  if (!modalText) {
    modalText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)(
    /* translators: %s: Brand */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('You can restart onboarding from your %s Settings page.', 'wp-module-onboarding'), brandName);
  }

  async function syncSocialSettingsFinish() {
    const initialData = await (0,_utils_api_settings__WEBPACK_IMPORTED_MODULE_8__.getSettings)();
    const result = await (0,_utils_api_settings__WEBPACK_IMPORTED_MODULE_8__.setSettings)(socialData);

    if ((result === null || result === void 0 ? void 0 : result.error) !== null) {
      return initialData === null || initialData === void 0 ? void 0 : initialData.body;
    }

    return result === null || result === void 0 ? void 0 : result.body;
  }

  async function saveData(path) {
    if (currentData) {
      var _currentData$data;

      currentData.hasExited = new Date().getTime(); // If Social Data is changed then sync it

      if (path !== null && path !== void 0 && path.includes('basic-info')) {
        const socialDataResp = await syncSocialSettingsFinish(); // If Social Data is changed then Sync that also to the store

        if (socialDataResp) {
          setOnboardingSocialData(socialDataResp);
        }
      }

      (0,_utils_api_flow__WEBPACK_IMPORTED_MODULE_6__.setFlow)(currentData);
      (0,_utils_api_comingSoon__WEBPACK_IMPORTED_MODULE_13__.setComingSoon)(currentData === null || currentData === void 0 ? void 0 : (_currentData$data = currentData.data) === null || _currentData$data === void 0 ? void 0 : _currentData$data.comingSoon);
    }

    (0,_utils_api_plugins__WEBPACK_IMPORTED_MODULE_12__.activateInitialPlugins)();
    (0,_utils_analytics_hiive__WEBPACK_IMPORTED_MODULE_10__.trackOnboardingEvent)(new _utils_analytics_hiive__WEBPACK_IMPORTED_MODULE_10__.OnboardingEvent(_utils_analytics_hiive_constants__WEBPACK_IMPORTED_MODULE_11__.ACTION_ONBOARDING_EXITED, currentStep.title));
    await _newfold_labs_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_5__.HiiveAnalytics.dispatchEvents(_utils_analytics_hiive_constants__WEBPACK_IMPORTED_MODULE_11__.CATEGORY);
    window.location.replace(_constants__WEBPACK_IMPORTED_MODULE_9__.pluginDashboardPage);
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, showButton && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    icon: showButtonIcon ? _wordpress_icons__WEBPACK_IMPORTED_MODULE_15__["default"] : false,
    variant: buttonVariant,
    onClick: openModal,
    className: classnames__WEBPACK_IMPORTED_MODULE_4___default()(`nfd-onboarding-etw__trigger`, buttonClassName)
  }, buttonText), isOpen && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Modal, {
    title: modalTitle,
    onRequestClose: () => closeModal()
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, modalText), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ButtonGroup, {
    className: "nfd-onboarding-etw__buttons"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "secondary",
    onClick: () => closeModal()
  }, modalPrimaryCloseButtonText), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "primary",
    onClick: () => saveData(location.pathname)
  }, modalExitButtonText))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ExitToWordPress);

/***/ }),

/***/ "./src/OnboardingSPA/components/Grid/index.js":
/*!****************************************************!*\
  !*** ./src/OnboardingSPA/components/Grid/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);


/**
 * Grid Component
 * Shows the components in a grid view
 *
 * @param {Object} root0
 * @param {string} root0.className
 * @param {number} root0.size
 * @param {number} root0.colGap
 * @param {Object} root0.children
 * @return {WPComponent} NFDOnboarding Grid
 */

const Grid = _ref => {
  let {
    className = '',
    size,
    colGap = 0,
    children
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('nfd-onboarding-grid', className),
    style: {
      gridTemplateColumns: `repeat(${size}, 1fr)`,
      gridColumnGap: `${colGap}px`
    }
  }, children);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Grid);

/***/ }),

/***/ "./src/OnboardingSPA/components/Loaders/ImageUpload/index.js":
/*!*******************************************************************!*\
  !*** ./src/OnboardingSPA/components/Loaders/ImageUpload/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Animate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Animate */ "./src/OnboardingSPA/components/Animate/index.js");



const ImageUploadLoader = () => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "image-upload-loader--loading-box"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Animate__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: 'load',
    className: "image-upload-loader--loading-box__loader"
  }));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ImageUploadLoader);

/***/ }),

/***/ "./src/OnboardingSPA/components/Loaders/index.js":
/*!*******************************************************!*\
  !*** ./src/OnboardingSPA/components/Loaders/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageUploadLoader": () => (/* reexport safe */ _ImageUpload__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "StepLoader": () => (/* reexport safe */ _Step__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _Step__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Step */ "./src/OnboardingSPA/components/Loaders/Step/index.js");
/* harmony import */ var _ImageUpload__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ImageUpload */ "./src/OnboardingSPA/components/Loaders/ImageUpload/index.js");



/***/ }),

/***/ "./src/OnboardingSPA/components/StateHandlers/Design/contents.js":
/*!***********************************************************************!*\
  !*** ./src/OnboardingSPA/components/StateHandlers/Design/contents.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);


const getContents = brandName => {
  return {
    loader: {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(
      /* translators: %s: Brand */
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Preparing your %s design studio', 'wp-module-onboarding'), brandName),
      subtitle: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Hang tight while we show you some of the best WordPress has to offer!', 'wp-module-onboarding')
    },
    errorState: {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(
      /* translators: %s: Brand */
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Preparing your %s design studio', 'wp-module-onboarding'), brandName),
      subtitle: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Hang tight while we show you some of the best WordPress has to offer!', 'wp-module-onboarding'),
      error: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Uh-oh, something went wrong. Please contact support.', 'wp-module-onboarding')
    }
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getContents);

/***/ }),

/***/ "./src/OnboardingSPA/components/StateHandlers/Design/index.js":
/*!********************************************************************!*\
  !*** ./src/OnboardingSPA/components/StateHandlers/Design/index.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Loaders__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Loaders */ "./src/OnboardingSPA/components/Loaders/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _utils_api_themes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../utils/api/themes */ "./src/OnboardingSPA/utils/api/themes.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.js");
/* harmony import */ var _ErrorState__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../ErrorState */ "./src/OnboardingSPA/components/ErrorState/index.js");
/* harmony import */ var _contents__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./contents */ "./src/OnboardingSPA/components/StateHandlers/Design/contents.js");
/* harmony import */ var _ExitToWordPress__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../ExitToWordPress */ "./src/OnboardingSPA/components/ExitToWordPress/index.js");













const DesignStateHandler = _ref => {
  let {
    children,
    navigationStateCallback = false,
    refresh = true
  } = _ref;
  const isLargeViewport = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.useViewportMatch)('medium');
  const {
    storedThemeStatus,
    brandName
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    return {
      storedThemeStatus: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getThemeStatus(),
      brandName: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getNewfoldBrandName()
    };
  }, []);
  const contents = (0,_contents__WEBPACK_IMPORTED_MODULE_9__["default"])(brandName);
  const {
    updateThemeStatus,
    setIsDrawerOpened,
    setIsDrawerSuppressed,
    setIsHeaderNavigationEnabled
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_5__.store);

  const checkThemeStatus = async () => {
    const themeStatus = await (0,_utils_api_themes__WEBPACK_IMPORTED_MODULE_6__.getThemeStatus)(_constants__WEBPACK_IMPORTED_MODULE_7__.DESIGN_STEPS_THEME);

    if (themeStatus !== null && themeStatus !== void 0 && themeStatus.error) {
      return _constants__WEBPACK_IMPORTED_MODULE_7__.THEME_STATUS_NOT_ACTIVE;
    }

    return themeStatus.body.status;
  };

  const expediteInstall = async () => {
    const status = await (0,_utils_api_themes__WEBPACK_IMPORTED_MODULE_6__.expedite)(_constants__WEBPACK_IMPORTED_MODULE_7__.DESIGN_STEPS_THEME);

    if (!status.error && true === refresh) {
      window.location.reload();
      return;
    }

    installThemeManually();
  };

  const enableNavigation = () => {
    if (isLargeViewport) {
      setIsDrawerOpened(true);
    }

    setIsDrawerSuppressed(false);
    setIsHeaderNavigationEnabled(true);
  };

  const disableNavigation = () => {
    setIsDrawerOpened(false);
    setIsDrawerSuppressed(true);
    setIsHeaderNavigationEnabled(false);
  };

  const handleNavigationStateCallback = () => {
    if (typeof navigationStateCallback === 'function') {
      return navigationStateCallback();
    }

    enableNavigation();
  };

  const handleNavigationState = () => {
    switch (storedThemeStatus) {
      case _constants__WEBPACK_IMPORTED_MODULE_7__.THEME_STATUS_FAILURE:
      case _constants__WEBPACK_IMPORTED_MODULE_7__.THEME_STATUS_ACTIVE:
        return handleNavigationStateCallback();

      default:
        disableNavigation();
    }
  };

  const handleThemeStatus = async () => {
    const themeStatus = await checkThemeStatus();

    switch (themeStatus) {
      case _constants__WEBPACK_IMPORTED_MODULE_7__.THEME_STATUS_INSTALLING:
        expediteInstall();
        break;

      case _constants__WEBPACK_IMPORTED_MODULE_7__.THEME_STATUS_ACTIVE:
        if (true === refresh) {
          window.location.reload();
        }

        break;

      default:
        updateThemeStatus(themeStatus);
    }
  };

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    handleNavigationState();

    if (storedThemeStatus === _constants__WEBPACK_IMPORTED_MODULE_7__.THEME_STATUS_INIT) {
      handleThemeStatus(storedThemeStatus);
    }
  }, [storedThemeStatus]);

  const installThemeManually = async () => {
    updateThemeStatus(_constants__WEBPACK_IMPORTED_MODULE_7__.THEME_STATUS_INSTALLING);
    const themeInstallStatus = await (0,_utils_api_themes__WEBPACK_IMPORTED_MODULE_6__.install)(_constants__WEBPACK_IMPORTED_MODULE_7__.DESIGN_STEPS_THEME, true, false);

    if (themeInstallStatus.error) {
      return updateThemeStatus(_constants__WEBPACK_IMPORTED_MODULE_7__.THEME_STATUS_FAILURE);
    }

    if (true === refresh) {
      window.location.reload();
    }
  };

  const handleRender = () => {
    switch (storedThemeStatus) {
      case _constants__WEBPACK_IMPORTED_MODULE_7__.THEME_STATUS_NOT_ACTIVE:
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ExitToWordPress__WEBPACK_IMPORTED_MODULE_10__["default"], {
          showButton: false,
          isModalOpen: true,
          modalTitle: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('It looks like you may have an existing website', 'wp-module-onboarding'),
          modalText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Going through this setup will change your active theme, WordPress settings, add content – would you like to continue?', 'wp-module-onboarding'),
          modalOnClose: installThemeManually,
          modalExitButtonText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Exit to WordPress', 'wp-module-onboarding')
        });

      case _constants__WEBPACK_IMPORTED_MODULE_7__.THEME_STATUS_FAILURE:
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ErrorState__WEBPACK_IMPORTED_MODULE_8__.StepErrorState, {
          title: contents.errorState.title,
          subtitle: contents.errorState.subtitle,
          error: contents.errorState.error
        });

      case _constants__WEBPACK_IMPORTED_MODULE_7__.THEME_STATUS_ACTIVE:
        return children;

      default:
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Loaders__WEBPACK_IMPORTED_MODULE_4__.StepLoader, {
          title: contents.loader.title,
          subtitle: contents.loader.subtitle
        });
    }
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, handleRender());
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DesignStateHandler);

/***/ }),

/***/ "./src/OnboardingSPA/components/StateHandlers/index.js":
/*!*************************************************************!*\
  !*** ./src/OnboardingSPA/components/StateHandlers/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DesignStateHandler": () => (/* reexport safe */ _Design__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _Design__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Design */ "./src/OnboardingSPA/components/StateHandlers/Design/index.js");


/***/ }),

/***/ "./src/OnboardingSPA/steps/SitePages/contents.js":
/*!*******************************************************!*\
  !*** ./src/OnboardingSPA/steps/SitePages/contents.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);


const getContents = () => {
  return {
    heading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('You have ideas, we have page templates', 'wp-module-onboarding'),
    subheading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Begin closer to the finish line than a blank canvas.', 'wp-module-onboarding')
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getContents);

/***/ }),

/***/ "./src/OnboardingSPA/steps/SitePages/index.js":
/*!****************************************************!*\
  !*** ./src/OnboardingSPA/steps/SitePages/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _components_Layouts_Common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Layouts/Common */ "./src/OnboardingSPA/components/Layouts/Common.js");
/* harmony import */ var _components_Heading_HeadingWithSubHeading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/Heading/HeadingWithSubHeading */ "./src/OnboardingSPA/components/Heading/HeadingWithSubHeading/index.js");
/* harmony import */ var _utils_api_patterns__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/api/patterns */ "./src/OnboardingSPA/utils/api/patterns.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../constants */ "./src/constants.js");
/* harmony import */ var _components_StateHandlers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/StateHandlers */ "./src/OnboardingSPA/components/StateHandlers/index.js");
/* harmony import */ var _components_LivePreview__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/LivePreview */ "./src/OnboardingSPA/components/LivePreview/index.js");
/* harmony import */ var _components_LivePreview_LivePreviewSkeleton__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../components/LivePreview/LivePreviewSkeleton */ "./src/OnboardingSPA/components/LivePreview/LivePreviewSkeleton/index.js");
/* harmony import */ var _contents__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./contents */ "./src/OnboardingSPA/steps/SitePages/contents.js");
/* harmony import */ var _components_Grid__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../components/Grid */ "./src/OnboardingSPA/components/Grid/index.js");















const StepSitePages = () => {
  var _themeVariations$curr, _currentStep$data2;

  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_12__.useLocation)();
  const [sitePages, setSitePages] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const [checkedPages, setCheckedPages] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const {
    currentStep,
    currentData,
    themeStatus,
    themeVariations
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    return {
      currentStep: select(_store__WEBPACK_IMPORTED_MODULE_2__.store).getStepFromPath(location.pathname),
      currentData: select(_store__WEBPACK_IMPORTED_MODULE_2__.store).getCurrentOnboardingData(),
      themeStatus: select(_store__WEBPACK_IMPORTED_MODULE_2__.store).getThemeStatus(),
      themeVariations: select(_store__WEBPACK_IMPORTED_MODULE_2__.store).getStepPreviewData()
    };
  }, []);
  const {
    setDrawerActiveView,
    setSidebarActiveView,
    updateThemeStatus,
    setCurrentOnboardingData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_2__.store);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setSidebarActiveView(_constants__WEBPACK_IMPORTED_MODULE_6__.SIDEBAR_LEARN_MORE);
    setDrawerActiveView(_constants__WEBPACK_IMPORTED_MODULE_6__.VIEW_NAV_DESIGN);
  }, []);

  const getSitePages = async () => {
    var _currentStep$data;

    const sitePagesResponse = await (0,_utils_api_patterns__WEBPACK_IMPORTED_MODULE_5__.getPatterns)(currentStep === null || currentStep === void 0 ? void 0 : (_currentStep$data = currentStep.data) === null || _currentStep$data === void 0 ? void 0 : _currentStep$data.patternId);

    if (sitePagesResponse !== null && sitePagesResponse !== void 0 && sitePagesResponse.error) {
      return updateThemeStatus(_constants__WEBPACK_IMPORTED_MODULE_6__.THEME_STATUS_INIT);
    }

    if (sitePagesResponse !== null && sitePagesResponse !== void 0 && sitePagesResponse.body) {
      var _currentData$data$sit;

      if ((_currentData$data$sit = currentData.data.sitePages) !== null && _currentData$data$sit !== void 0 && _currentData$data$sit.other) {
        if (currentData.data.sitePages.other === false) {
          setCheckedPages([]);
        } else if (currentData.data.sitePages.other.length !== 0) {
          setCheckedPages(flowDataToState(currentData.data.sitePages.other));
        } else {
          const selectedPages = sitePagesResponse.body.reduce((pages, sitePage) => {
            return sitePage !== null && sitePage !== void 0 && sitePage.selected ? pages.concat(sitePage.slug) : pages;
          }, []);
          handleCheckedPages(selectedPages, sitePagesResponse.body);
        }
      }

      setSitePages(sitePagesResponse.body);
    }
  };

  const stateToFlowData = (selectedPages, pages) => {
    return pages !== false ? pages === null || pages === void 0 ? void 0 : pages.reduce((newSitePages, sitePage) => {
      return selectedPages.includes(sitePage.slug) ? newSitePages.concat({
        slug: sitePage.slug,
        title: sitePage.title
      }) : newSitePages;
    }, []) : undefined;
  };

  const flowDataToState = selectedPages => {
    return selectedPages.map(selectedPage => {
      return selectedPage.slug;
    });
  };

  const handleCheckedPages = function (selectedPages) {
    let pages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    setCheckedPages(selectedPages);
    currentData.data.sitePages.other = selectedPages.length !== 0 ? stateToFlowData(selectedPages, pages) : false;
    setCurrentOnboardingData(currentData);
  };

  const handleClick = (isChecked, slug) => {
    if (isChecked === true && !checkedPages.includes(slug)) {
      handleCheckedPages(checkedPages.concat(slug), sitePages);
    } else if (isChecked === false) {
      handleCheckedPages(checkedPages.filter(selectedPage => {
        return selectedPage !== slug;
      }), sitePages);
    }
  };

  const buildPreviews = () => {
    return checkedPages && (sitePages === null || sitePages === void 0 ? void 0 : sitePages.map((sitePage, idx) => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_LivePreview__WEBPACK_IMPORTED_MODULE_8__.LivePreviewSelectableCardWithInfo, {
        key: idx,
        className: 'site-pages__list__item',
        blockGrammer: sitePage.content,
        viewportWidth: 1200,
        styling: 'custom',
        overlay: true,
        title: sitePage === null || sitePage === void 0 ? void 0 : sitePage.title,
        slug: sitePage.slug,
        selected: checkedPages.includes(sitePage.slug),
        onClick: handleClick,
        description: sitePage === null || sitePage === void 0 ? void 0 : sitePage.description
      });
    }));
  };

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (themeStatus === _constants__WEBPACK_IMPORTED_MODULE_6__.THEME_STATUS_ACTIVE) {
      getSitePages();
    }
  }, [themeStatus]);
  const content = (0,_contents__WEBPACK_IMPORTED_MODULE_10__["default"])();
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_StateHandlers__WEBPACK_IMPORTED_MODULE_7__.DesignStateHandler, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_LivePreview__WEBPACK_IMPORTED_MODULE_8__.GlobalStylesProvider, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Layouts_Common__WEBPACK_IMPORTED_MODULE_3__["default"], null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "site-pages"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Heading_HeadingWithSubHeading__WEBPACK_IMPORTED_MODULE_4__["default"], {
    title: content.heading,
    subtitle: content.subheading
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "site-pages__list"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Grid__WEBPACK_IMPORTED_MODULE_11__["default"], {
    size: 2
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_LivePreview_LivePreviewSkeleton__WEBPACK_IMPORTED_MODULE_9__["default"], {
    className: 'site-pages__list__item',
    count: (_themeVariations$curr = themeVariations[currentStep === null || currentStep === void 0 ? void 0 : (_currentStep$data2 = currentStep.data) === null || _currentStep$data2 === void 0 ? void 0 : _currentStep$data2.patternId]) === null || _themeVariations$curr === void 0 ? void 0 : _themeVariations$curr.previewCount,
    watch: sitePages,
    isWithCard: true,
    callback: buildPreviews,
    viewportWidth: 1200
  })))))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StepSitePages);

/***/ })

}]);
//# sourceMappingURL=src_OnboardingSPA_steps_SitePages_index_js.js.map