"use strict";
(globalThis["webpackChunknewfold_Onboarding"] = globalThis["webpackChunknewfold_Onboarding"] || []).push([["src_OnboardingSPA_steps_SiteGen_SiteLogo_index_js"],{

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

/***/ "./src/OnboardingSPA/components/Heading/AIHeading/index.js":
/*!*****************************************************************!*\
  !*** ./src/OnboardingSPA/components/Heading/AIHeading/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


const AIHeading = _ref => {
  let {
    title
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'ai-heading'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'ai-heading--icon'
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'ai-heading--title'
  }, title));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AIHeading);

/***/ }),

/***/ "./src/OnboardingSPA/components/ImageUploader/components/ImageUploaderWithText/index.js":
/*!**********************************************************************************************!*\
  !*** ./src/OnboardingSPA/components/ImageUploader/components/ImageUploaderWithText/index.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_api_uploader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../utils/api/uploader */ "./src/OnboardingSPA/utils/api/uploader.js");
/* harmony import */ var _Loaders_Spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Loaders/Spinner */ "./src/OnboardingSPA/components/Loaders/Spinner/index.js");
/* harmony import */ var _ThemeContextProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../ThemeContextProvider */ "./src/OnboardingSPA/components/ThemeContextProvider/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../constants */ "./src/constants.js");
/* harmony import */ var bytes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! bytes */ "./node_modules/bytes/index.js");
/* harmony import */ var bytes__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(bytes__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/close-small.js");











const ImageUploaderWithText = _ref => {
  let {
    image,
    imageSetter
  } = _ref;
  const inputRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const {
    theme
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_ThemeContextProvider__WEBPACK_IMPORTED_MODULE_4__.ThemeContext);
  const [isUploading, setIsUploading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [onDragActive, setOnDragActive] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);

  async function updateItem(fileData) {
    if (fileData) {
      var _res$body, _res$body2;

      setIsUploading(true);
      const res = await (0,_utils_api_uploader__WEBPACK_IMPORTED_MODULE_2__.uploadImage)(fileData);

      if (!(res !== null && res !== void 0 && res.body)) {
        return setIsUploading(false);
      }

      const id = (_res$body = res.body) === null || _res$body === void 0 ? void 0 : _res$body.id;
      const url = (_res$body2 = res.body) === null || _res$body2 === void 0 ? void 0 : _res$body2.source_url;
      imageSetter({
        id,
        url,
        fileName: fileData === null || fileData === void 0 ? void 0 : fileData.name,
        fileSize: fileData === null || fileData === void 0 ? void 0 : fileData.size
      });
    }

    setIsUploading(false);
  }

  const handleClick = () => {
    inputRef === null || inputRef === void 0 ? void 0 : inputRef.current.click();
  };

  const handleDragEnter = e => {
    e.preventDefault();
    e.stopPropagation();
    setOnDragActive(true);
  };

  const handleDragLeave = e => {
    e.preventDefault();
    e.stopPropagation();
    setOnDragActive(false);
  };

  const handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
    setOnDragActive(true);
  };

  const removeSelectedImage = () => {
    var _inputRef$current;

    imageSetter({
      id: 0,
      url: ''
    });

    if ((inputRef === null || inputRef === void 0 ? void 0 : (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.files.length) > 0) {
      inputRef.current.value = '';
    }
  };

  const imageChange = e => {
    var _e$target, _e$target2;

    if (e !== null && e !== void 0 && (_e$target = e.target) !== null && _e$target !== void 0 && _e$target.files && (e === null || e === void 0 ? void 0 : (_e$target2 = e.target) === null || _e$target2 === void 0 ? void 0 : _e$target2.files.length) > 0) {
      var _e$target3;

      updateItem(e === null || e === void 0 ? void 0 : (_e$target3 = e.target) === null || _e$target3 === void 0 ? void 0 : _e$target3.files[0]);
    }
  };

  const handleDrop = e => {
    var _e$dataTransfer, _e$dataTransfer2;

    e.preventDefault();
    e.stopPropagation();
    setOnDragActive(false);

    if (e !== null && e !== void 0 && (_e$dataTransfer = e.dataTransfer) !== null && _e$dataTransfer !== void 0 && _e$dataTransfer.files && (e === null || e === void 0 ? void 0 : (_e$dataTransfer2 = e.dataTransfer) === null || _e$dataTransfer2 === void 0 ? void 0 : _e$dataTransfer2.files.length) > 0) {
      var _e$dataTransfer3, _e$dataTransfer3$file;

      if ((e === null || e === void 0 ? void 0 : (_e$dataTransfer3 = e.dataTransfer) === null || _e$dataTransfer3 === void 0 ? void 0 : (_e$dataTransfer3$file = _e$dataTransfer3.files[0]) === null || _e$dataTransfer3$file === void 0 ? void 0 : _e$dataTransfer3$file.type.split('/')[0]) === 'image') {
        var _e$dataTransfer4;

        updateItem(e === null || e === void 0 ? void 0 : (_e$dataTransfer4 = e.dataTransfer) === null || _e$dataTransfer4 === void 0 ? void 0 : _e$dataTransfer4.files[0]);
      }
    }
  };

  const isImageUploaded = !isUploading && (image === null || image === void 0 ? void 0 : image.id) !== 0 && (image === null || image === void 0 ? void 0 : image.id) !== undefined;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `nfd-onboarding-image-uploader--with-text ${onDragActive && 'nfd-onboarding-image-uploader--with-text--on-drag'} ${isImageUploaded && 'nfd-onboarding-image-uploader--with-text--not-dashed'}`,
    onDrop: e => handleDrop(e),
    onDragOver: e => handleDragOver(e),
    onDragEnter: e => handleDragEnter(e),
    onDragLeave: e => handleDragLeave(e)
  }, isUploading ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Loaders_Spinner__WEBPACK_IMPORTED_MODULE_3__["default"], null) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, !isImageUploaded && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-image-uploader--with-text__heading"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_5___default()('nfd-onboarding-image-uploader--with-text__heading__icon', theme === _constants__WEBPACK_IMPORTED_MODULE_6__.THEME_LIGHT ? 'nfd-onboarding-image-uploader--with-text__heading__icon--light' : null)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "nfd-onboarding-image-uploader--with-text__heading__text"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "nfd-onboarding-image-uploader--with-text__heading__text__drop"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Drop your logo here, or ', 'wp-module-onboarding')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: handleClick,
    className: "nfd-onboarding-image-uploader--with-text__heading__text__modal"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('browse', 'wp-module-onboarding')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    className: "nfd-onboarding-image-uploader--with-text__heading__text__input",
    accept: "image/*",
    type: "file",
    ref: inputRef,
    onChange: imageChange
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-image-uploader--with-text__subheading"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "nfd-onboarding-image-uploader--with-text__subheading__text"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('supports .jpg, .png, .gif', 'wp-module-onboarding')))), isImageUploaded && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-image-uploader--with-text__site_logo__preview"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    className: "nfd-onboarding-image-uploader--with-text__site_logo__preview__image",
    src: image.url,
    alt: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Site Logo Preview', 'wp-module-onboarding')
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-image-uploader--with-text__site_logo__preview__details"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "nfd-onboarding-image-uploader--with-text__site_logo__preview__details__filename"
  }, image.fileName), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "nfd-onboarding-image-uploader--with-text__site_logo__preview__details__filesize"
  }, bytes__WEBPACK_IMPORTED_MODULE_7___default()(image.fileSize))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-image-uploader--with-text__site_logo__preview__reset"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "nfd-onboarding-image-uploader--with-text__site_logo__preview__reset__button",
    onClick: removeSelectedImage
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_8__["default"], {
    className: "nfd-onboarding-image-uploader--with-text__site_logo__preview__reset__button__icon",
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__["default"]
  }))))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(ImageUploaderWithText));

/***/ }),

/***/ "./src/OnboardingSPA/components/Loaders/Spinner/index.js":
/*!***************************************************************!*\
  !*** ./src/OnboardingSPA/components/Loaders/Spinner/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


const Spinner = () => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-loader--spinner"
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Spinner);

/***/ }),

/***/ "./src/OnboardingSPA/components/SkipButton/index.js":
/*!**********************************************************!*\
  !*** ./src/OnboardingSPA/components/SkipButton/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _newfold_labs_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @newfold-labs/js-utility-ui-analytics */ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/index.js");
/* harmony import */ var _utils_api_flow__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/api/flow */ "./src/OnboardingSPA/utils/api/flow.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _utils_api_settings__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/api/settings */ "./src/OnboardingSPA/utils/api/settings.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../constants */ "./src/constants.js");
/* harmony import */ var _utils_analytics_hiive_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utils/analytics/hiive/constants */ "./src/OnboardingSPA/utils/analytics/hiive/constants.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_10__);














const SkipButton = _ref => {
  let {
    callback = false,
    className,
    text
  } = _ref;
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_11__.useNavigate)();
  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_11__.useLocation)();
  const {
    nextStep,
    currentData,
    socialData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    return {
      nextStep: select(_store__WEBPACK_IMPORTED_MODULE_6__.store).getNextStep(),
      currentData: select(_store__WEBPACK_IMPORTED_MODULE_6__.store).getCurrentOnboardingData(),
      socialData: select(_store__WEBPACK_IMPORTED_MODULE_6__.store).getOnboardingSocialData()
    };
  }, []);
  const isLastStep = null === nextStep || false === nextStep;
  const {
    setOnboardingSocialData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_6__.store);

  async function syncSocialSettingsFinish() {
    const initialData = await (0,_utils_api_settings__WEBPACK_IMPORTED_MODULE_7__.getSettings)();
    const result = await (0,_utils_api_settings__WEBPACK_IMPORTED_MODULE_7__.setSettings)(socialData);

    if ((result === null || result === void 0 ? void 0 : result.error) !== null) {
      return initialData === null || initialData === void 0 ? void 0 : initialData.body;
    }

    return result === null || result === void 0 ? void 0 : result.body;
  }

  async function saveData(path) {
    if (currentData) {
      currentData.isComplete = new Date().getTime(); // If Social Data is changed then sync it

      if (path !== null && path !== void 0 && path.includes('basic-info')) {
        const socialDataResp = await syncSocialSettingsFinish(); // If Social Data is changed then Sync that also to the store

        if (socialDataResp) {
          setOnboardingSocialData(socialDataResp);
        }

        await _newfold_labs_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_4__.HiiveAnalytics.dispatchEvents(_utils_analytics_hiive_constants__WEBPACK_IMPORTED_MODULE_9__.CATEGORY);
      }

      (0,_utils_api_flow__WEBPACK_IMPORTED_MODULE_5__.setFlow)(currentData);
    }

    window.location.replace(_constants__WEBPACK_IMPORTED_MODULE_8__.pluginDashboardPage);
  }

  function skip() {
    if (typeof callback === 'function') {
      callback();
    }

    navigate(nextStep.path);
  }

  function skipStep() {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      className: classnames__WEBPACK_IMPORTED_MODULE_10___default()('skip-button', className),
      onClick: isLastStep ? () => saveData(location.pathname) : () => skip()
    }, text ? text : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Skip this Step', 'wp-module-onboarding'));
  }

  return skipStep();
};

const SkipButtonMemo = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(SkipButton);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SkipButtonMemo);

/***/ }),

/***/ "./src/OnboardingSPA/steps/SiteGen/SiteLogo/contents.js":
/*!**************************************************************!*\
  !*** ./src/OnboardingSPA/steps/SiteGen/SiteLogo/contents.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);


const getContents = () => {
  return {
    heading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Do you have a logo you would like to use for this site?', 'wp-module-onboarding'),
    imageUploader: {
      subHeading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('supports .jpg, .png, .svg', 'wp-module-onboarding')
    },
    buttons: {
      skip: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Skip for now', 'wp-module-onboarding'),
      next: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Next', 'wp-module-onboarding')
    }
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getContents);

/***/ }),

/***/ "./src/OnboardingSPA/steps/SiteGen/SiteLogo/index.js":
/*!***********************************************************!*\
  !*** ./src/OnboardingSPA/steps/SiteGen/SiteLogo/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _contents__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contents */ "./src/OnboardingSPA/steps/SiteGen/SiteLogo/contents.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.js");
/* harmony import */ var _components_SkipButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/SkipButton */ "./src/OnboardingSPA/components/SkipButton/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _components_Heading_AIHeading__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/Heading/AIHeading */ "./src/OnboardingSPA/components/Heading/AIHeading/index.js");
/* harmony import */ var _components_Layouts_Common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../components/Layouts/Common */ "./src/OnboardingSPA/components/Layouts/Common.js");
/* harmony import */ var _components_Button_NextButtonSiteGen__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../components/Button/NextButtonSiteGen */ "./src/OnboardingSPA/components/Button/NextButtonSiteGen/index.js");
/* harmony import */ var _components_ImageUploader_components_ImageUploaderWithText__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../components/ImageUploader/components/ImageUploaderWithText */ "./src/OnboardingSPA/components/ImageUploader/components/ImageUploaderWithText/index.js");













const SiteGenSiteLogo = () => {
  const [siteLogo, setSiteLogo] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const isLargeViewport = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__.useViewportMatch)('small');
  const {
    currentData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    return {
      currentData: select(_store__WEBPACK_IMPORTED_MODULE_6__.store).getCurrentOnboardingData()
    };
  });
  const {
    setFooterNavEnabled,
    setIsHeaderEnabled,
    setSidebarActiveView,
    setHeaderActiveView,
    setDrawerActiveView,
    setCurrentOnboardingData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_6__.store);

  const resetSiteLogo = () => {
    const currentDataCopy = { ...currentData
    };
    currentDataCopy.sitegen.siteLogo = {
      id: 0,
      url: '',
      fileName: '',
      fileSize: 0
    };
    setCurrentOnboardingData(currentDataCopy);
    setSiteLogo(undefined);
    setFooterNavEnabled(false);
  };

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    var _currentData$sitegen$;

    setIsHeaderEnabled(true);
    setSidebarActiveView(false);
    setHeaderActiveView(_constants__WEBPACK_IMPORTED_MODULE_4__.HEADER_SITEGEN);
    setDrawerActiveView(false);

    if (((_currentData$sitegen$ = currentData.sitegen.siteLogo) === null || _currentData$sitegen$ === void 0 ? void 0 : _currentData$sitegen$.id) !== 0) {
      return setSiteLogo(currentData.sitegen.siteLogo);
    }

    setFooterNavEnabled(false);
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (undefined !== siteLogo) {
      const currentDataCopy = { ...currentData
      };
      currentDataCopy.sitegen.siteLogo.id = siteLogo.id;
      currentDataCopy.sitegen.siteLogo.url = siteLogo.url;
      currentDataCopy.sitegen.siteLogo.fileName = siteLogo.fileName;
      currentDataCopy.sitegen.siteLogo.fileSize = siteLogo.fileSize;
      setCurrentOnboardingData(currentDataCopy);
      setFooterNavEnabled(siteLogo.id !== 0);
    }
  }, [siteLogo]);
  const content = (0,_contents__WEBPACK_IMPORTED_MODULE_3__["default"])();
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Layouts_Common__WEBPACK_IMPORTED_MODULE_8__["default"], {
    isCentered: true,
    className: "nfd-onboarding-step--site-gen__site-logo"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-step--site-gen__site-logo__container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Heading_AIHeading__WEBPACK_IMPORTED_MODULE_7__["default"], {
    title: content.heading
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_ImageUploader_components_ImageUploaderWithText__WEBPACK_IMPORTED_MODULE_10__["default"], {
    image: siteLogo,
    imageSetter: setSiteLogo
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-step--site-gen__site-logo__container__buttons"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_SkipButton__WEBPACK_IMPORTED_MODULE_5__["default"], {
    callback: () => resetSiteLogo(),
    className: "nfd-onboarding-step--site-gen__site-logo__container__buttons__skip",
    text: content.buttons.skip
  }), isLargeViewport && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Button_NextButtonSiteGen__WEBPACK_IMPORTED_MODULE_9__["default"], {
    text: content.buttons.next,
    disabled: siteLogo === undefined || (siteLogo === null || siteLogo === void 0 ? void 0 : siteLogo.id) === 0 ? true : false
  }))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SiteGenSiteLogo);

/***/ }),

/***/ "./src/OnboardingSPA/utils/api/uploader.js":
/*!*************************************************!*\
  !*** ./src/OnboardingSPA/utils/api/uploader.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "uploadImage": () => (/* binding */ uploadImage)
/* harmony export */ });
/* harmony import */ var _resolve__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./resolve */ "./src/OnboardingSPA/utils/api/resolve.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common */ "./src/OnboardingSPA/utils/api/common.js");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);




function readFileDataAsBase64(file) {
  return new Promise((resolve, reject) => {
    // Create file reader
    const reader = new FileReader(); // Register event listeners

    reader.addEventListener('loadend', e => resolve(e.target.result));
    reader.addEventListener('error', reject); // Read file

    reader.readAsArrayBuffer(file);
  });
}

async function uploadImage(file) {
  const data = await readFileDataAsBase64(file);
  const headers = {};
  headers['Content-Type'] = 'image/png';
  headers['Content-Disposition'] = 'attachment; filename=' + file.name;
  return await (0,_resolve__WEBPACK_IMPORTED_MODULE_0__.resolve)(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
    url: (0,_common__WEBPACK_IMPORTED_MODULE_1__.wpRestURL)('media'),
    method: 'POST',
    headers,
    body: data
  }));
}

/***/ }),

/***/ "./node_modules/bytes/index.js":
/*!*************************************!*\
  !*** ./node_modules/bytes/index.js ***!
  \*************************************/
/***/ ((module) => {

/*!
 * bytes
 * Copyright(c) 2012-2014 TJ Holowaychuk
 * Copyright(c) 2015 Jed Watson
 * MIT Licensed
 */



/**
 * Module exports.
 * @public
 */

module.exports = bytes;
module.exports.format = format;
module.exports.parse = parse;

/**
 * Module variables.
 * @private
 */

var formatThousandsRegExp = /\B(?=(\d{3})+(?!\d))/g;

var formatDecimalsRegExp = /(?:\.0*|(\.[^0]+)0+)$/;

var map = {
  b:  1,
  kb: 1 << 10,
  mb: 1 << 20,
  gb: 1 << 30,
  tb: ((1 << 30) * 1024)
};

var parseRegExp = /^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb)$/i;

/**
 * Convert the given value in bytes into a string or parse to string to an integer in bytes.
 *
 * @param {string|number} value
 * @param {{
 *  case: [string],
 *  decimalPlaces: [number]
 *  fixedDecimals: [boolean]
 *  thousandsSeparator: [string]
 *  unitSeparator: [string]
 *  }} [options] bytes options.
 *
 * @returns {string|number|null}
 */

function bytes(value, options) {
  if (typeof value === 'string') {
    return parse(value);
  }

  if (typeof value === 'number') {
    return format(value, options);
  }

  return null;
}

/**
 * Format the given value in bytes into a string.
 *
 * If the value is negative, it is kept as such. If it is a float,
 * it is rounded.
 *
 * @param {number} value
 * @param {object} [options]
 * @param {number} [options.decimalPlaces=2]
 * @param {number} [options.fixedDecimals=false]
 * @param {string} [options.thousandsSeparator=]
 * @param {string} [options.unit=]
 * @param {string} [options.unitSeparator=]
 *
 * @returns {string|null}
 * @public
 */

function format(value, options) {
  if (!Number.isFinite(value)) {
    return null;
  }

  var mag = Math.abs(value);
  var thousandsSeparator = (options && options.thousandsSeparator) || '';
  var unitSeparator = (options && options.unitSeparator) || '';
  var decimalPlaces = (options && options.decimalPlaces !== undefined) ? options.decimalPlaces : 2;
  var fixedDecimals = Boolean(options && options.fixedDecimals);
  var unit = (options && options.unit) || '';

  if (!unit || !map[unit.toLowerCase()]) {
    if (mag >= map.tb) {
      unit = 'TB';
    } else if (mag >= map.gb) {
      unit = 'GB';
    } else if (mag >= map.mb) {
      unit = 'MB';
    } else if (mag >= map.kb) {
      unit = 'KB';
    } else {
      unit = 'B';
    }
  }

  var val = value / map[unit.toLowerCase()];
  var str = val.toFixed(decimalPlaces);

  if (!fixedDecimals) {
    str = str.replace(formatDecimalsRegExp, '$1');
  }

  if (thousandsSeparator) {
    str = str.replace(formatThousandsRegExp, thousandsSeparator);
  }

  return str + unitSeparator + unit;
}

/**
 * Parse the string value into an integer in bytes.
 *
 * If no unit is given, it is assumed the value is in bytes.
 *
 * @param {number|string} val
 *
 * @returns {number|null}
 * @public
 */

function parse(val) {
  if (typeof val === 'number' && !isNaN(val)) {
    return val;
  }

  if (typeof val !== 'string') {
    return null;
  }

  // Test if the string passed is valid
  var results = parseRegExp.exec(val);
  var floatValue;
  var unit = 'b';

  if (!results) {
    // Nothing could be extracted from the given string
    floatValue = parseInt(val, 10);
    unit = 'b'
  } else {
    // Retrieve the value and the unit
    floatValue = parseFloat(results[1]);
    unit = results[4].toLowerCase();
  }

  return Math.floor(map[unit] * floatValue);
}


/***/ })

}]);
//# sourceMappingURL=src_OnboardingSPA_steps_SiteGen_SiteLogo_index_js.js.map