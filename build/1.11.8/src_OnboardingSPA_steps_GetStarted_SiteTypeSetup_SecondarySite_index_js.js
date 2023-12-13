"use strict";
(globalThis["webpackChunknewfold_Onboarding"] = globalThis["webpackChunknewfold_Onboarding"] || []).push([["src_OnboardingSPA_steps_GetStarted_SiteTypeSetup_SecondarySite_index_js"],{

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

/***/ "./src/OnboardingSPA/steps/GetStarted/SiteTypeSetup/SecondarySite/index.js":
/*!*********************************************************************************!*\
  !*** ./src/OnboardingSPA/steps/GetStarted/SiteTypeSetup/SecondarySite/index.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Layouts_Common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/Layouts/Common */ "./src/OnboardingSPA/components/Layouts/Common.js");
/* harmony import */ var _components_NewfoldLargeCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/NewfoldLargeCard */ "./src/OnboardingSPA/components/NewfoldLargeCard/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../constants */ "./src/constants.js");
/* harmony import */ var _contents__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../contents */ "./src/OnboardingSPA/steps/GetStarted/SiteTypeSetup/contents.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _components_CardHeader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/CardHeader */ "./src/OnboardingSPA/components/CardHeader/index.js");
/* harmony import */ var _components_Button_NavCardButton__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/Button/NavCardButton */ "./src/OnboardingSPA/components/Button/NavCardButton/index.js");
/* harmony import */ var _components_NeedHelpTag__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/NeedHelpTag */ "./src/OnboardingSPA/components/NeedHelpTag/index.js");
/* harmony import */ var _components_Animate__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/Animate */ "./src/OnboardingSPA/components/Animate/index.js");
/* harmony import */ var _utils_api_siteClassification__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../utils/api/siteClassification */ "./src/OnboardingSPA/utils/api/siteClassification.js");
/* harmony import */ var _utils_analytics_hiive__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../utils/analytics/hiive */ "./src/OnboardingSPA/utils/analytics/hiive/index.js");
/* harmony import */ var _utils_analytics_hiive_constants__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../utils/analytics/hiive/constants */ "./src/OnboardingSPA/utils/analytics/hiive/constants.js");
















const StepSecondaryStep = () => {
  var _siteClassification$t2, _siteClassification$t3;

  const {
    setDrawerActiveView,
    setSidebarActiveView,
    setIsDrawerSuppressed,
    setIsHeaderNavigationEnabled,
    setCurrentOnboardingData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_5__.store);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setSidebarActiveView(_constants__WEBPACK_IMPORTED_MODULE_3__.SIDEBAR_LEARN_MORE);
    setIsDrawerSuppressed(true);
    setDrawerActiveView(_constants__WEBPACK_IMPORTED_MODULE_3__.VIEW_NAV_GET_STARTED);
    setIsHeaderNavigationEnabled(true);
    getSiteClassificationData();
  }, []);
  const content = (0,_contents__WEBPACK_IMPORTED_MODULE_4__["default"])();
  const [custom, setCustom] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [siteClassification, setSiteClassification] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const [primaryTypesList, setPrimaryTypeList] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const [primaryCategory, setPrimaryCategory] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const [secondaryCategory, setSecondaryCategory] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(''); // Timeout after which a custom input analytics event will be sent.

  const [typingTimeout, setTypingTimeout] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const {
    currentData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.useSelect)(select => {
    return {
      currentData: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getCurrentOnboardingData()
    };
  }, []);
  /**
   * Function which fetches the Site Classifications
   *
   */

  const getSiteClassificationData = async () => {
    var _siteClassificationDa, _siteClassificationDa2, _currentData$data, _currentData$data$sit, _currentData$data3, _currentData$data3$si, _currentData$data$sit2, _currentData$data5, _currentData$data5$si, _currentData$data5$si2, _currentData$data6, _currentData$data6$si, _currentData$data6$si2, _currentData$data10, _currentData$data10$s, _currentData$data10$s2;

    const siteClassificationData = await (0,_utils_api_siteClassification__WEBPACK_IMPORTED_MODULE_11__.getSiteClassification)(); // First Key from the Data is the default Primary value

    const defaultPrimaryType = Object.keys(siteClassificationData === null || siteClassificationData === void 0 ? void 0 : (_siteClassificationDa = siteClassificationData.body) === null || _siteClassificationDa === void 0 ? void 0 : _siteClassificationDa.types)[0];
    setPrimaryCategory(defaultPrimaryType);
    setSiteClassification(siteClassificationData === null || siteClassificationData === void 0 ? void 0 : siteClassificationData.body);
    const primaryTypeList = Object.keys(siteClassificationData === null || siteClassificationData === void 0 ? void 0 : (_siteClassificationDa2 = siteClassificationData.body) === null || _siteClassificationDa2 === void 0 ? void 0 : _siteClassificationDa2.types);
    setPrimaryTypeList(primaryTypeList); // Incase old user comes again with data, we need to save it

    if (typeof (currentData === null || currentData === void 0 ? void 0 : (_currentData$data = currentData.data) === null || _currentData$data === void 0 ? void 0 : (_currentData$data$sit = _currentData$data.siteType) === null || _currentData$data$sit === void 0 ? void 0 : _currentData$data$sit.primary) === 'string') {
      var _currentData$data2, _currentData$data2$si;

      const primaryValue = currentData === null || currentData === void 0 ? void 0 : (_currentData$data2 = currentData.data) === null || _currentData$data2 === void 0 ? void 0 : (_currentData$data2$si = _currentData$data2.siteType) === null || _currentData$data2$si === void 0 ? void 0 : _currentData$data2$si.primary;
      currentData.data.siteType.primary = {
        refers: 'custom',
        value: primaryValue
      };
      setCurrentOnboardingData(currentData);
    }

    if (typeof (currentData === null || currentData === void 0 ? void 0 : (_currentData$data3 = currentData.data) === null || _currentData$data3 === void 0 ? void 0 : (_currentData$data3$si = _currentData$data3.siteType) === null || _currentData$data3$si === void 0 ? void 0 : _currentData$data3$si.secondary) === 'string') {
      var _currentData$data4, _currentData$data4$si;

      const secondaryValue = currentData === null || currentData === void 0 ? void 0 : (_currentData$data4 = currentData.data) === null || _currentData$data4 === void 0 ? void 0 : (_currentData$data4$si = _currentData$data4.siteType) === null || _currentData$data4$si === void 0 ? void 0 : _currentData$data4$si.secondary;
      currentData.data.siteType.secondary = {
        refers: 'custom',
        value: secondaryValue
      };
      setCurrentOnboardingData(currentData);
    }

    setSecondaryCategory((_currentData$data$sit2 = currentData === null || currentData === void 0 ? void 0 : (_currentData$data5 = currentData.data) === null || _currentData$data5 === void 0 ? void 0 : (_currentData$data5$si = _currentData$data5.siteType) === null || _currentData$data5$si === void 0 ? void 0 : (_currentData$data5$si2 = _currentData$data5$si.secondary) === null || _currentData$data5$si2 === void 0 ? void 0 : _currentData$data5$si2.value) !== null && _currentData$data$sit2 !== void 0 ? _currentData$data$sit2 : '');

    if ((currentData === null || currentData === void 0 ? void 0 : (_currentData$data6 = currentData.data) === null || _currentData$data6 === void 0 ? void 0 : (_currentData$data6$si = _currentData$data6.siteType) === null || _currentData$data6$si === void 0 ? void 0 : (_currentData$data6$si2 = _currentData$data6$si.primary) === null || _currentData$data6$si2 === void 0 ? void 0 : _currentData$data6$si2.value) !== '') {
      var _currentData$data7, _currentData$data7$si, _currentData$data7$si2;

      // Determining if primary is Custom
      const isNotPrimaryCustom = (currentData === null || currentData === void 0 ? void 0 : (_currentData$data7 = currentData.data) === null || _currentData$data7 === void 0 ? void 0 : (_currentData$data7$si = _currentData$data7.siteType) === null || _currentData$data7$si === void 0 ? void 0 : (_currentData$data7$si2 = _currentData$data7$si.primary) === null || _currentData$data7$si2 === void 0 ? void 0 : _currentData$data7$si2.refers) !== 'custom';

      if (isNotPrimaryCustom) {
        var _currentData$data8, _currentData$data8$si, _currentData$data8$si2;

        setPrimaryCategory(currentData === null || currentData === void 0 ? void 0 : (_currentData$data8 = currentData.data) === null || _currentData$data8 === void 0 ? void 0 : (_currentData$data8$si = _currentData$data8.siteType) === null || _currentData$data8$si === void 0 ? void 0 : (_currentData$data8$si2 = _currentData$data8$si.primary) === null || _currentData$data8$si2 === void 0 ? void 0 : _currentData$data8$si2.value);
      } else {
        var _currentData$data9, _currentData$data9$si, _currentData$data9$si2;

        setPrimaryCategory(defaultPrimaryType);
        categoryInput(currentData === null || currentData === void 0 ? void 0 : (_currentData$data9 = currentData.data) === null || _currentData$data9 === void 0 ? void 0 : (_currentData$data9$si = _currentData$data9.siteType) === null || _currentData$data9$si === void 0 ? void 0 : (_currentData$data9$si2 = _currentData$data9$si.secondary) === null || _currentData$data9$si2 === void 0 ? void 0 : _currentData$data9$si2.value);
      }
    } // Primary is valid and secondary is custom


    if ((currentData === null || currentData === void 0 ? void 0 : (_currentData$data10 = currentData.data) === null || _currentData$data10 === void 0 ? void 0 : (_currentData$data10$s = _currentData$data10.siteType) === null || _currentData$data10$s === void 0 ? void 0 : (_currentData$data10$s2 = _currentData$data10$s.secondary) === null || _currentData$data10$s2 === void 0 ? void 0 : _currentData$data10$s2.refers) === 'custom') {
      var _currentData$data11, _currentData$data11$s, _currentData$data11$s2;

      categoryInput(currentData === null || currentData === void 0 ? void 0 : (_currentData$data11 = currentData.data) === null || _currentData$data11 === void 0 ? void 0 : (_currentData$data11$s = _currentData$data11.siteType) === null || _currentData$data11$s === void 0 ? void 0 : (_currentData$data11$s2 = _currentData$data11$s.secondary) === null || _currentData$data11$s2 === void 0 ? void 0 : _currentData$data11$s2.value);
    }
  };
  /**
   * Function which saves data in redux when category name is put-in via input box
   *
   * @param {string} value
   */


  const categoryInput = value => {
    setCustom(true);
    currentData.data.siteType.secondary.refers = 'custom';
    currentData.data.siteType.secondary.value = value;
    setCurrentOnboardingData(currentData);

    if ('' !== secondaryCategory && secondaryCategory !== value) {
      clearTimeout(typingTimeout);
      setTypingTimeout(setTimeout(() => {
        (0,_utils_analytics_hiive__WEBPACK_IMPORTED_MODULE_12__.trackOnboardingEvent)(new _utils_analytics_hiive__WEBPACK_IMPORTED_MODULE_12__.OnboardingEvent(_utils_analytics_hiive_constants__WEBPACK_IMPORTED_MODULE_13__.ACTION_SECONDARY_TYPE_SET, value));
      }, 1000));
    }

    setSecondaryCategory(value);
  };
  /**
   * Function which saves data in redux when category name is chosen via categories displayed
   *
   * @param {string} secType
   */


  const handleCategoryClick = secType => {
    if (secondaryCategory === secType && currentData.data.siteType.primary.value === primaryCategory) {
      return true;
    }

    setCustom(false);
    setSecondaryCategory(secType);
    currentData.data.siteType.secondary.refers = 'slug';

    if (currentData.data.siteType.primary.value !== primaryCategory) {
      currentData.data.siteType.primary.refers = 'slug';
      currentData.data.siteType.primary.value = primaryCategory;
      (0,_utils_analytics_hiive__WEBPACK_IMPORTED_MODULE_12__.trackOnboardingEvent)(new _utils_analytics_hiive__WEBPACK_IMPORTED_MODULE_12__.OnboardingEvent(_utils_analytics_hiive_constants__WEBPACK_IMPORTED_MODULE_13__.ACTION_PRIMARY_TYPE_SET, primaryCategory));
    }

    currentData.data.siteType.secondary.value = secType;
    setCurrentOnboardingData(currentData);
    (0,_utils_analytics_hiive__WEBPACK_IMPORTED_MODULE_12__.trackOnboardingEvent)(new _utils_analytics_hiive__WEBPACK_IMPORTED_MODULE_12__.OnboardingEvent(_utils_analytics_hiive_constants__WEBPACK_IMPORTED_MODULE_13__.ACTION_SECONDARY_TYPE_SET, secType));
  };

  const changePrimaryType = direction => {
    const idx = primaryTypesList.findIndex(val => primaryCategory === val);
    let primaryType;

    switch (direction) {
      case 'back':
        // idx = ( (idx - 1 + N) % N )
        primaryType = primaryTypesList[(idx - 1 + primaryTypesList.length) % primaryTypesList.length];
        setPrimaryCategory(primaryType);
        break;

      case 'next':
        // idx = ( (idx + 1 ) % N )
        primaryType = primaryTypesList[(idx + 1) % primaryTypesList.length];
        setPrimaryCategory(primaryType);
        break;
    }

    (0,_utils_analytics_hiive__WEBPACK_IMPORTED_MODULE_12__.trackOnboardingEvent)(new _utils_analytics_hiive__WEBPACK_IMPORTED_MODULE_12__.OnboardingEvent(_utils_analytics_hiive_constants__WEBPACK_IMPORTED_MODULE_13__.ACTION_PRIMARY_TYPE_SET, primaryType));
  };

  const secondarySiteTypeChips = () => {
    var _siteClassification$t;

    const types = siteClassification === null || siteClassification === void 0 ? void 0 : (_siteClassification$t = siteClassification.types[primaryCategory]) === null || _siteClassification$t === void 0 ? void 0 : _siteClassification$t.secondaryTypes;
    return Object.keys(types).map((type, idx) => {
      var _types$type, _types$type2, _types$type3;

      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        key: (_types$type = types[type]) === null || _types$type === void 0 ? void 0 : _types$type.slug,
        "data-slug": (_types$type2 = types[type]) === null || _types$type2 === void 0 ? void 0 : _types$type2.slug,
        role: "button",
        tabIndex: idx + 1,
        className: `${types[type].slug === secondaryCategory && !custom ? 'chosenSecondaryCategory ' : ''}nfd-card-sec-category`,
        onClick: () => handleCategoryClick(types[type].slug),
        onKeyDown: () => handleCategoryClick(types[type].slug)
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        className: "categName"
      }, (_types$type3 = types[type]) === null || _types$type3 === void 0 ? void 0 : _types$type3.label));
    });
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Layouts_Common__WEBPACK_IMPORTED_MODULE_1__["default"], {
    isBgPrimary: true,
    isCentered: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_NewfoldLargeCard__WEBPACK_IMPORTED_MODULE_2__["default"], null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-card-heading center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_CardHeader__WEBPACK_IMPORTED_MODULE_7__["default"], {
    heading: content.heading,
    subHeading: content.subheading,
    question: content.question
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Animate__WEBPACK_IMPORTED_MODULE_10__["default"], {
    type: "fade-in-disabled",
    after: siteClassification
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-setup-secondary-categories"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-card-sec-category-wrapper"
  }, siteClassification && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "category-scrolling-wrapper"
  }, primaryTypesList && primaryTypesList.length > 1 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "category-scrolling-wrapper__left-btn"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "category-scrolling-wrapper__left-btn-icon",
    onClick: () => changePrimaryType('back'),
    onKeyUp: () => changePrimaryType('back'),
    role: "button",
    tabIndex: 0,
    style: {
      backgroundImage: 'var(--chevron-left-icon)'
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "category-scrolling-wrapper__type"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "category-scrolling-wrapper__type-icon",
    style: {
      backgroundImage: `url(${siteClassification === null || siteClassification === void 0 ? void 0 : (_siteClassification$t2 = siteClassification.types[primaryCategory]) === null || _siteClassification$t2 === void 0 ? void 0 : _siteClassification$t2.icon})`
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "category-scrolling-wrapper__type-text"
  }, ` ${siteClassification === null || siteClassification === void 0 ? void 0 : (_siteClassification$t3 = siteClassification.types[primaryCategory]) === null || _siteClassification$t3 === void 0 ? void 0 : _siteClassification$t3.label}`)), primaryTypesList && primaryTypesList.length > 1 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "category-scrolling-wrapper__right-btn"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "category-scrolling-wrapper__right-btn-icon",
    onClick: () => changePrimaryType('next'),
    onKeyUp: () => changePrimaryType('next'),
    role: "button",
    tabIndex: 0,
    style: {
      backgroundImage: 'var(--chevron-right-icon)'
    }
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "subCategoriesSection"
  }, siteClassification && secondarySiteTypeChips()), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-setup-primary-custom"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-setup-primary-custom__tellus-text"
  }, content.customInputLabel), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "search",
    onChange: e => {
      var _e$target;

      return categoryInput(e === null || e === void 0 ? void 0 : (_e$target = e.target) === null || _e$target === void 0 ? void 0 : _e$target.value);
    },
    className: "nfd-setup-primary-custom__tellus-input",
    placeholder: content.customInputPlaceholderText,
    value: custom ? secondaryCategory : ''
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Button_NavCardButton__WEBPACK_IMPORTED_MODULE_8__["default"], {
    text: content.buttonText
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_NeedHelpTag__WEBPACK_IMPORTED_MODULE_9__["default"], null)));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StepSecondaryStep);

/***/ }),

/***/ "./src/OnboardingSPA/steps/GetStarted/SiteTypeSetup/contents.js":
/*!**********************************************************************!*\
  !*** ./src/OnboardingSPA/steps/GetStarted/SiteTypeSetup/contents.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_locales_translations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/locales/translations */ "./src/OnboardingSPA/utils/locales/translations.js");



const getContents = () => {
  return {
    heading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(
    /* translators: %s: website or store */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Help us tailor this setup to your %s', 'wp-module-onboarding'), (0,_utils_locales_translations__WEBPACK_IMPORTED_MODULE_1__.translations)('site')),
    subheading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(
    /* translators: %s: SITE or STORE */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('ABOUT YOUR %s', 'wp-module-onboarding'), (0,_utils_locales_translations__WEBPACK_IMPORTED_MODULE_1__.translations)('SITE')),
    question: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(
    /* translators: %s: site or store */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('What type of %s is it?', 'wp-module-onboarding'), (0,_utils_locales_translations__WEBPACK_IMPORTED_MODULE_1__.translations)('site')),
    buttonText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Continue Setup', 'wp-module-onboarding'),
    customInputPlaceholderText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(
    /* translators: %s: site or store */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Enter to search your %s type', 'wp-module-onboarding'), (0,_utils_locales_translations__WEBPACK_IMPORTED_MODULE_1__.translations)('site')),
    customInputLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('or tell us here:', 'wp-module-onboarding')
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getContents);

/***/ }),

/***/ "./src/OnboardingSPA/utils/api/siteClassification.js":
/*!***********************************************************!*\
  !*** ./src/OnboardingSPA/utils/api/siteClassification.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getSiteClassification": () => (/* binding */ getSiteClassification)
/* harmony export */ });
/* harmony import */ var _resolve__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./resolve */ "./src/OnboardingSPA/utils/api/resolve.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common */ "./src/OnboardingSPA/utils/api/common.js");
/* harmony import */ var _siteClassification_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./siteClassification.json */ "./src/OnboardingSPA/utils/api/siteClassification.json");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__);




async function getSiteClassification() {
  const data = await (0,_resolve__WEBPACK_IMPORTED_MODULE_0__.resolve)(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
    url: (0,_common__WEBPACK_IMPORTED_MODULE_1__.onboardingRestURL)('site-classification')
  }));

  if (data.body.length === 0) {
    return _siteClassification_json__WEBPACK_IMPORTED_MODULE_2__;
  }

  return data;
}

/***/ }),

/***/ "./src/OnboardingSPA/utils/api/siteClassification.json":
/*!*************************************************************!*\
  !*** ./src/OnboardingSPA/utils/api/siteClassification.json ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"body":{"types":{"business":{"slug":"business","label":"Business","icon":"https://cdn.hiive.space/site-classification/business.svg","emoji":"💼","schema":"Corporation","secondaryTypes":{"agency-consulting":{"primaryType":"business","slug":"agency-consulting","label":"Agency & Consulting"},"arts-crafts":{"primaryType":"business","slug":"arts-crafts","label":"Arts & Crafts"},"autos-repair":{"primaryType":"business","slug":"autos-repair","label":"Autos & Repair"},"child-care":{"primaryType":"business","slug":"child-care","label":"Child Care"},"events":{"primaryType":"business","slug":"events","label":"Events"},"finance":{"primaryType":"business","slug":"finance","label":"Finance"},"garden-florist":{"primaryType":"business","slug":"garden-florist","label":"Florist & Garden Center"},"hr-recruiting":{"primaryType":"business","slug":"hr-recruiting","label":"HR & Recruiting"},"insurance":{"primaryType":"business","slug":"insurance","label":"Insurance"},"legal":{"primaryType":"business","slug":"legal","label":"Legal"},"marketing":{"primaryType":"business","slug":"marketing","label":"Marketing"},"outdoors":{"primaryType":"business","slug":"outdoors","label":"Outdoors"},"pr-communications":{"primaryType":"business","slug":"pr-communications","label":"PR & Communications"},"real-estate-management":{"primaryType":"business","slug":"real-estate-management","label":"Real Estate & Management"},"shopping-retail":{"primaryType":"business","slug":"shopping-retail","label":"Shopping & Retail"},"trades-repair-services":{"primaryType":"business","slug":"trades-repair-services","label":"Trades & Repair Services"},"weddings":{"primaryType":"business","slug":"weddings","label":"Weddings"}}}}}}');

/***/ })

}]);
//# sourceMappingURL=src_OnboardingSPA_steps_GetStarted_SiteTypeSetup_SecondarySite_index_js.js.map