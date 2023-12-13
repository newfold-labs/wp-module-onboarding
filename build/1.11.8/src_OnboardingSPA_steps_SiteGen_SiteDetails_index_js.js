"use strict";
(globalThis["webpackChunknewfold_Onboarding"] = globalThis["webpackChunknewfold_Onboarding"] || []).push([["src_OnboardingSPA_steps_SiteGen_SiteDetails_index_js"],{

/***/ "./src/OnboardingSPA/components/Button/ButtonWhite/SiteGen/index.js":
/*!**************************************************************************!*\
  !*** ./src/OnboardingSPA/components/Button/ButtonWhite/SiteGen/index.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);




const ButtonSiteGen = _ref => {
  let {
    className,
    value,
    text,
    onClick
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className),
    value: value,
    onClick: typeof onClick === 'function' && onClick
  }, text);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ButtonSiteGen);

/***/ }),

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

/***/ "./src/OnboardingSPA/components/TextInput/TextInputSiteGen/index.js":
/*!**************************************************************************!*\
  !*** ./src/OnboardingSPA/components/TextInput/TextInputSiteGen/index.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);




const TextInputSiteGen = _ref => {
  let {
    hint,
    height,
    placeholder,
    customerInput,
    setCustomerInput
  } = _ref;
  const textareaRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const [inputText, setInputText] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('nfd-sg-input-box__field');
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    textareaRef.current.style.height = height;
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + 'px';
  }, [customerInput]);

  const calculateDetail = num => {
    const selectedButton = 'nfd-sg-input-box__info-icon--selected';

    switch (num) {
      case 1:
        if ((customerInput === null || customerInput === void 0 ? void 0 : customerInput.length) > 30) return selectedButton;
        break;

      case 2:
        if ((customerInput === null || customerInput === void 0 ? void 0 : customerInput.length) > 60) return selectedButton;
        break;

      case 3:
        if ((customerInput === null || customerInput === void 0 ? void 0 : customerInput.length) > 100) return selectedButton;
    }
  };

  const onTextChange = e => {
    e.preventDefault();
    setCustomerInput(e.target.value);
    setInputText('nfd-sg-input-box__field');
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'nfd-sg-input'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: inputText
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'nfd-sg-input-box'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("textarea", {
    type: "text",
    className: inputText,
    ref: textareaRef,
    style: {
      height: '47px'
    },
    placeholder: placeholder,
    value: customerInput,
    onChange: e => onTextChange(e)
  })), customerInput ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'nfd-sg-input-box__info'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'nfd-sg-input-box__info-text'
  }, "Detail"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('nfd-sg-input-box__info-icon', calculateDetail(1))
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('nfd-sg-input-box__info-icon', calculateDetail(2))
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('nfd-sg-input-box__info-icon', calculateDetail(3))
  })) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: 'nfd-sg-input-box__hint'
  }, hint)));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(TextInputSiteGen));

/***/ }),

/***/ "./src/OnboardingSPA/components/TextInput/TextInputSiteGen/simple/index.js":
/*!*********************************************************************************!*\
  !*** ./src/OnboardingSPA/components/TextInput/TextInputSiteGen/simple/index.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);



const TextInputSiteGenSimple = _ref => {
  let {
    type,
    labelText,
    placeholder,
    customerInput,
    callback = null
  } = _ref;
  const textareaRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: labelText
  }, labelText), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, type === 'textarea' ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("textarea", {
    type: "text",
    ref: textareaRef,
    placeholder: placeholder,
    value: customerInput,
    onChange: e => {
      if (callback && typeof callback === 'function') {
        callback(e);
      }
    }
  }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    placeholder: placeholder,
    value: customerInput,
    onChange: e => {
      if (callback && typeof callback === 'function') {
        callback(e);
      }
    }
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(TextInputSiteGenSimple));

/***/ }),

/***/ "./src/OnboardingSPA/steps/SiteGen/SiteDetails/contents.js":
/*!*****************************************************************!*\
  !*** ./src/OnboardingSPA/steps/SiteGen/SiteDetails/contents.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);


const getContents = () => {
  return {
    heading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Tell me some details about the site you want created?', 'wp-module-onboarding'),
    inputPlaceholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('I want a site for my company that sells…', 'wp-module-onboarding'),
    inputHint: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('The more detail the better', 'wp-module-onboarding'),
    buttonText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Next', 'wp-module-onboarding'),
    walkThroughText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Not sure what to say? We can walk you through it.', 'wp-module-onboarding'),
    writeStyleOption1: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('We craft awesome goodies!', 'wp-module-onboarding'),
    writeStyleOption2: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('We manufacture quality products', 'wp-module-onboarding')
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getContents);

/***/ }),

/***/ "./src/OnboardingSPA/steps/SiteGen/SiteDetails/index.js":
/*!**************************************************************!*\
  !*** ./src/OnboardingSPA/steps/SiteGen/SiteDetails/index.js ***!
  \**************************************************************/
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
/* harmony import */ var _contents__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contents */ "./src/OnboardingSPA/steps/SiteGen/SiteDetails/contents.js");
/* harmony import */ var _components_Animate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/Animate */ "./src/OnboardingSPA/components/Animate/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _components_Heading_AIHeading__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/Heading/AIHeading */ "./src/OnboardingSPA/components/Heading/AIHeading/index.js");
/* harmony import */ var _components_Layouts_Common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../components/Layouts/Common */ "./src/OnboardingSPA/components/Layouts/Common.js");
/* harmony import */ var _components_TextInput_TextInputSiteGen__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../components/TextInput/TextInputSiteGen */ "./src/OnboardingSPA/components/TextInput/TextInputSiteGen/index.js");
/* harmony import */ var _components_Button_NextButtonSiteGen__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../components/Button/NextButtonSiteGen */ "./src/OnboardingSPA/components/Button/NextButtonSiteGen/index.js");
/* harmony import */ var _SiteDetails_walkthrough__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../SiteDetails/walkthrough */ "./src/OnboardingSPA/steps/SiteGen/SiteDetails/walkthrough/index.js");














const SiteGenSiteDetails = () => {
  const content = (0,_contents__WEBPACK_IMPORTED_MODULE_3__["default"])();
  const isLargeViewport = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__.useViewportMatch)('small');
  const [customerInput, setCustomerInput] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const [isWalkthrough, setIsWalkthrough] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
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
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    var _currentData$sitegen$;

    setIsHeaderEnabled(true);
    setSidebarActiveView(false);
    setHeaderActiveView(_constants__WEBPACK_IMPORTED_MODULE_5__.HEADER_SITEGEN);
    setDrawerActiveView(false);

    if (((_currentData$sitegen$ = currentData.sitegen.siteDetails) === null || _currentData$sitegen$ === void 0 ? void 0 : _currentData$sitegen$.prompt) !== '') {
      setCustomerInput(currentData.sitegen.siteDetails.prompt);
    }

    setFooterNavEnabled(false);
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setFooterNavEnabled(customerInput !== '');
    currentData.sitegen.siteDetails.prompt = customerInput;
    currentData.sitegen.siteDetails.mode = 'simple';
    setCurrentOnboardingData(currentData);
  }, [customerInput]);

  const handleClickWalkThrough = () => {
    setIsWalkthrough(true);
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Layouts_Common__WEBPACK_IMPORTED_MODULE_8__["default"], {
    isCentered: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Animate__WEBPACK_IMPORTED_MODULE_4__["default"], {
    type: 'fade-in'
  }, isWalkthrough ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SiteDetails_walkthrough__WEBPACK_IMPORTED_MODULE_11__["default"], null) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'nfd-sg-site-details'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Heading_AIHeading__WEBPACK_IMPORTED_MODULE_7__["default"], {
    title: content.heading
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_TextInput_TextInputSiteGen__WEBPACK_IMPORTED_MODULE_9__["default"], {
    placeholder: content.inputPlaceholder,
    hint: content.inputHint,
    height: '40px',
    customerInput: customerInput,
    setCustomerInput: setCustomerInput
  }), isLargeViewport ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'nfd-sg-site-details-endrow'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Button_NextButtonSiteGen__WEBPACK_IMPORTED_MODULE_10__["default"], {
    className: 'nfd-sg-site-details--next-btn',
    text: content.buttonText,
    disabled: customerInput === undefined || customerInput === ''
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'nfd-sg-site-details-walkThrough'
  }, content.walkThroughText, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    onClick: handleClickWalkThrough,
    onKeyDown: handleClickWalkThrough,
    role: "button",
    tabIndex: "0"
  }, "click here"))) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'nfd-sg-site-details-walkThrough'
  }, content.walkThroughText, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    onClick: handleClickWalkThrough,
    onKeyDown: handleClickWalkThrough,
    role: "button",
    tabIndex: "0"
  }, "click here")))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SiteGenSiteDetails);

/***/ }),

/***/ "./src/OnboardingSPA/steps/SiteGen/SiteDetails/walkthrough/index.js":
/*!**************************************************************************!*\
  !*** ./src/OnboardingSPA/steps/SiteGen/SiteDetails/walkthrough/index.js ***!
  \**************************************************************************/
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
/* harmony import */ var _contents__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../contents */ "./src/OnboardingSPA/steps/SiteGen/SiteDetails/contents.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _components_Heading_AIHeading__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/Heading/AIHeading */ "./src/OnboardingSPA/components/Heading/AIHeading/index.js");
/* harmony import */ var _components_TextInput_TextInputSiteGen_simple__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/TextInput/TextInputSiteGen/simple */ "./src/OnboardingSPA/components/TextInput/TextInputSiteGen/simple/index.js");
/* harmony import */ var _components_Button_NextButtonSiteGen__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/Button/NextButtonSiteGen */ "./src/OnboardingSPA/components/Button/NextButtonSiteGen/index.js");
/* harmony import */ var _components_Button_ButtonWhite_SiteGen__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/Button/ButtonWhite/SiteGen */ "./src/OnboardingSPA/components/Button/ButtonWhite/SiteGen/index.js");
/* harmony import */ var _utils_api_siteGen__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../utils/api/siteGen */ "./src/OnboardingSPA/utils/api/siteGen.js");












const SiteGenSiteDetailsWalkthrough = () => {
  const content = (0,_contents__WEBPACK_IMPORTED_MODULE_3__["default"])();
  const isLargeViewport = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__.useViewportMatch)('small');
  const [isEditing, setEditing] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [customerInputName, setCustomerInputName] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const [customerInputType, setCustomerInputType] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const [customerInputStyle, setCustomerInputStyle] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const [customerInputUnique, setCustomerInputUnique] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const [siteDetailsmeta, setSiteDetailsmeta] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const {
    currentData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    return {
      currentData: select(_store__WEBPACK_IMPORTED_MODULE_4__.store).getCurrentOnboardingData()
    };
  });
  const {
    setCurrentOnboardingData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_4__.store);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    var _currentData$sitegen$, _currentData$sitegen$2, _currentData$sitegen$3, _currentData$sitegen$4;

    if (((_currentData$sitegen$ = currentData.sitegen.siteDetails) === null || _currentData$sitegen$ === void 0 ? void 0 : _currentData$sitegen$.name) !== '') {
      setCustomerInputName(currentData.sitegen.siteDetails.name);
      setEditing(true);
    }

    if (((_currentData$sitegen$2 = currentData.sitegen.siteDetails) === null || _currentData$sitegen$2 === void 0 ? void 0 : _currentData$sitegen$2.type) !== '') {
      setCustomerInputType(currentData.sitegen.siteDetails.type);
    }

    if (((_currentData$sitegen$3 = currentData.sitegen.siteDetails) === null || _currentData$sitegen$3 === void 0 ? void 0 : _currentData$sitegen$3.style) !== '') {
      setCustomerInputStyle(currentData.sitegen.siteDetails.style);
    }

    if (((_currentData$sitegen$4 = currentData.sitegen.siteDetails) === null || _currentData$sitegen$4 === void 0 ? void 0 : _currentData$sitegen$4.uniqueAboutBusiness) !== '') {
      setCustomerInputUnique(currentData.sitegen.siteDetails.uniqueAboutBusiness);
    }

    getSiteDetails();
  }, []);

  async function getSiteDetails() {
    let siteDetailsmetas = await (0,_utils_api_siteGen__WEBPACK_IMPORTED_MODULE_9__.getSiteDetailsmeta)();
    siteDetailsmetas = siteDetailsmetas.body;
    siteDetailsmetas = JSON.parse(siteDetailsmetas).reduce((acc, item) => {
      const {
        field,
        question,
        prompt,
        placeholder
      } = item;
      acc[`${field}`] = question;
      acc[`${field}PromptText`] = prompt;
      acc[`${field}Placeholder`] = placeholder;
      return acc;
    }, {});
    setSiteDetailsmeta(siteDetailsmetas);
  }

  const handlePromptChange = (field, e) => {
    e.preventDefault();
    currentData.sitegen.siteDetails[field] = e.target.value;
    setCurrentOnboardingData(currentData);

    switch (field) {
      case 'name':
        setCustomerInputName(e.target.value);
        break;

      case 'type':
        setCustomerInputType(e.target.value);
        break;

      case 'style':
        setCustomerInputStyle(e.target.value);
        break;

      case 'uniqueAboutBusiness':
        setCustomerInputUnique(e.target.value);
        break;

      default:
        break;
    }
  };

  const concatenatePrompt = () => {
    const siteDetails = currentData.sitegen.siteDetails;
    let concatenatedString = '';

    for (const field in siteDetails) {
      if (siteDetails[field]) {
        switch (field) {
          case 'name':
            concatenatedString += `${siteDetailsmeta.businessNamePromptText} ${siteDetails[field]}.`;
            break;

          case 'type':
            concatenatedString += `${siteDetailsmeta.websiteTypePromptText} ${siteDetails[field]}.`;
            break;

          case 'style':
            concatenatedString += `${siteDetailsmeta.writeStylePromptText} "${siteDetails[field]}".`;
            break;

          case 'uniqueAboutBusiness':
            concatenatedString += `${siteDetailsmeta.uniqueBusinessPromptText} ${siteDetails[field]}.`;
            break;

          default:
            break;
        }
      }
    }

    return concatenatedString;
  };

  const selectOption = (event, classname) => {
    document.querySelectorAll(`.${classname}`).forEach(button => {
      button.classList.remove('nfd-sg-site-details-rows-button-selected');
    });
    event.target.classList.add('nfd-sg-site-details-rows-button-selected');
  };

  const checkAndNavigate = () => {
    currentData.sitegen.siteDetails.prompt = concatenatePrompt();
    currentData.sitegen.siteDetails.mode = 'detailed';
    setCurrentOnboardingData(currentData);
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'nfd-sg-site-details'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Heading_AIHeading__WEBPACK_IMPORTED_MODULE_5__["default"], {
    title: content.heading
  }), siteDetailsmeta && Object.keys(siteDetailsmeta).length > 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'nfd-sg-site-details-rows'
  }, isEditing ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_TextInput_TextInputSiteGen_simple__WEBPACK_IMPORTED_MODULE_6__["default"], {
    type: "text",
    labelText: siteDetailsmeta.businessName,
    customerInput: customerInputName,
    callback: e => handlePromptChange('name', e)
  }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "businessName"
  }, siteDetailsmeta.businessName), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Button_ButtonWhite_SiteGen__WEBPACK_IMPORTED_MODULE_8__["default"], {
    text: "Yes",
    onClick: () => setEditing(true)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Button_ButtonWhite_SiteGen__WEBPACK_IMPORTED_MODULE_8__["default"], {
    className: `nfd-sg-site-details-rows-button-site-name
										${!isEditing ? 'nfd-sg-site-details-rows-button-selected' : ''}`,
    text: "No",
    onClick: e => {
      setEditing(false);
      selectOption(e, 'nfd-sg-site-details-rows-button-site-name');
    }
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'nfd-sg-site-details-rows'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_TextInput_TextInputSiteGen_simple__WEBPACK_IMPORTED_MODULE_6__["default"], {
    type: "text",
    labelText: siteDetailsmeta.websiteType,
    placeholder: siteDetailsmeta.websiteTypePlaceholder,
    customerInput: customerInputType,
    callback: e => handlePromptChange('type', e)
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'nfd-sg-site-details-rows'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "writeStyle"
  }, siteDetailsmeta.writeStyle), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Button_ButtonWhite_SiteGen__WEBPACK_IMPORTED_MODULE_8__["default"], {
    className: `nfd-sg-site-details-rows-write-style ${customerInputStyle === content.writeStyleOption1 ? 'nfd-sg-site-details-rows-button-selected' : ''}`,
    text: content.writeStyleOption1,
    value: content.writeStyleOption1,
    onClick: e => {
      handlePromptChange('style', e);
      selectOption(e, 'nfd-sg-site-details-rows-write-style');
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Button_ButtonWhite_SiteGen__WEBPACK_IMPORTED_MODULE_8__["default"], {
    className: `nfd-sg-site-details-rows-write-style ${customerInputStyle === content.writeStyleOption2 ? 'nfd-sg-site-details-rows-button-selected' : ''}`,
    text: content.writeStyleOption2,
    value: content.writeStyleOption2,
    onClick: e => {
      handlePromptChange('style', e);
      selectOption(e, 'nfd-sg-site-details-rows-write-style');
    }
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'nfd-sg-site-details-rows'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_TextInput_TextInputSiteGen_simple__WEBPACK_IMPORTED_MODULE_6__["default"], {
    type: "textarea",
    labelText: siteDetailsmeta.uniqueBusiness,
    placeholder: siteDetailsmeta.uniqueBusinessPlaceholder,
    customerInput: customerInputUnique,
    callback: e => handlePromptChange('uniqueAboutBusiness', e)
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), isLargeViewport && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'nfd-sg-site-details-endrow'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Button_NextButtonSiteGen__WEBPACK_IMPORTED_MODULE_7__["default"], {
    className: 'nfd-sg-site-details--next-btn',
    text: content.buttonText,
    callback: checkAndNavigate
  }))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SiteGenSiteDetailsWalkthrough);

/***/ })

}]);
//# sourceMappingURL=src_OnboardingSPA_steps_SiteGen_SiteDetails_index_js.js.map