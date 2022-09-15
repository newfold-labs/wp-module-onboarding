"use strict";
(self["webpackChunknewfold_Onboarding"] = self["webpackChunknewfold_Onboarding"] || []).push([["src_OnboardingSPA_pages_Steps_TopPriority_index_js"],{

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

/***/ "./src/OnboardingSPA/components/SelectableCard/index.js":
/*!**************************************************************!*\
  !*** ./src/OnboardingSPA/components/SelectableCard/index.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/check.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);




/**
 * Interface a Card with standard design.
 *
 * @returns
 */

const SelectableCard = _ref => {
  let {
    id,
    path,
    title,
    desc,
    isSelected,
    onSelectedChange
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Card, {
    className: `nfd-card ${isSelected && 'nfd-selected-card-box'}`,
    onClick: e => onSelectedChange(id)
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-card__top_row"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-card__icon"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${isSelected ? 'nfd-card__icon_box nfd-card__icon_box-selected' : 'nfd-card__icon_box'}`,
    style: {
      backgroundImage: `var(${path})`
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${isSelected ? 'nfd-card__icon_selected' : 'nfd-card__icon_unselected'}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: "nfd-card__icon_selected_path",
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__["default"],
    size: 64
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `nfd-card__body ${isSelected && 'nfd-selected-card'}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "nfd-card__body_title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(title, "wp-module-onboarding")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "nfd-card__body_description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(desc, "wp-module-onboarding"))));
};

/* harmony default export */ __webpack_exports__["default"] = (SelectableCard);

/***/ }),

/***/ "./src/OnboardingSPA/components/SelectableCardList/selectable-card-list.js":
/*!*********************************************************************************!*\
  !*** ./src/OnboardingSPA/components/SelectableCardList/selectable-card-list.js ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SelectableCard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SelectableCard */ "./src/OnboardingSPA/components/SelectableCard/index.js");



const SelectableCardList = _ref => {
  let {
    contents,
    selected,
    onSelectedChange
  } = _ref;
  const cardList = contents.map((content, idx) => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SelectableCard__WEBPACK_IMPORTED_MODULE_1__["default"], {
      id: idx,
      key: idx,
      path: content.icon,
      title: content.title,
      desc: content.desc,
      onSelectedChange: onSelectedChange,
      isSelected: idx === selected ? true : false
    });
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "selectable_cards"
  }, cardList);
};

/* harmony default export */ __webpack_exports__["default"] = (SelectableCardList);

/***/ }),

/***/ "./src/OnboardingSPA/components/SkipButton/index.js":
/*!**********************************************************!*\
  !*** ./src/OnboardingSPA/components/SkipButton/index.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/index.js");
/* harmony import */ var _utils_api_flow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/api/flow */ "./src/OnboardingSPA/utils/api/flow.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _utils_api_settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/api/settings */ "./src/OnboardingSPA/utils/api/settings.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../constants */ "./src/constants.js");









/**
 * Interface Text Inputs with standard design.
 *
 * @returns
 */

const SkipButton = () => {
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_8__.useNavigate)();
  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_8__.useLocation)();
  const {
    previousStep,
    nextStep,
    currentData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    return {
      previousStep: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getPreviousStep(),
      nextStep: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getNextStep(),
      currentData: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getCurrentOnboardingData()
    };
  }, []);
  const isFirstStep = null === previousStep || false === previousStep;
  const isLastStep = null === nextStep || false === nextStep;

  async function syncSocialSettingsFinish(currentData) {
    var _currentData$data;

    const initialData = await (0,_utils_api_settings__WEBPACK_IMPORTED_MODULE_6__.getSettings)();
    const result = await (0,_utils_api_settings__WEBPACK_IMPORTED_MODULE_6__.setSettings)(currentData === null || currentData === void 0 ? void 0 : (_currentData$data = currentData.data) === null || _currentData$data === void 0 ? void 0 : _currentData$data.socialData);

    if ((result === null || result === void 0 ? void 0 : result.error) != null) {
      console.error('Unable to Save Social Data!');
      return initialData === null || initialData === void 0 ? void 0 : initialData.body;
    }

    return result === null || result === void 0 ? void 0 : result.body;
  }

  async function saveData(path, currentData) {
    if (currentData) {
      currentData.isComplete = new Date().getTime(); // If Social Data is changed then sync it

      if (path !== null && path !== void 0 && path.includes('basic-info')) {
        const socialData = await syncSocialSettingsFinish(currentData); // If Social Data is changed then Sync that also to the store

        if (socialData && currentData !== null && currentData !== void 0 && currentData.data) currentData.data.socialData = socialData;
      }

      (0,_utils_api_flow__WEBPACK_IMPORTED_MODULE_4__.setFlow)(currentData);
    } // Redirect to Admin Page for normal customers 
    // and Bluehost Dashboard for ecommerce customers


    const exitLink = exitToWordpressForEcommerce() ? _constants__WEBPACK_IMPORTED_MODULE_7__.bluehostDashboardPage : _constants__WEBPACK_IMPORTED_MODULE_7__.wpAdminPage;
    window.location.replace(exitLink);
  }

  function skipStep() {
    if (isLastStep) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
        className: "skip-button",
        onClick: e => saveData(location.pathname, currentData)
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Skip this Step', 'wp-module-onboarding'));
    } else {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
        className: "skip-button",
        onClick: e => navigate(nextStep.path)
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Skip this Step', 'wp-module-onboarding'));
    }
  }

  return skipStep();
};
/*
 * check if this is the last step 
 */


const exitToWordpressForEcommerce = () => {
  if (window.nfdOnboarding.currentFlow == 'ecommerce') {
    return true;
  }

  return false;
};

/* harmony default export */ __webpack_exports__["default"] = (SkipButton);

/***/ }),

/***/ "./src/OnboardingSPA/pages/Steps/TopPriority/index.js":
/*!************************************************************!*\
  !*** ./src/OnboardingSPA/pages/Steps/TopPriority/index.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/index.js");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.js");
/* harmony import */ var _components_SkipButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/SkipButton */ "./src/OnboardingSPA/components/SkipButton/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _components_Layouts_Common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/Layouts/Common */ "./src/OnboardingSPA/components/Layouts/Common.js");
/* harmony import */ var _components_HeadingWithSubHeading__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../components/HeadingWithSubHeading */ "./src/OnboardingSPA/components/HeadingWithSubHeading/index.js");
/* harmony import */ var _components_SelectableCardList_selectable_card_list__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../components/SelectableCardList/selectable-card-list */ "./src/OnboardingSPA/components/SelectableCardList/selectable-card-list.js");













const StepTopPriority = props => {
  const priorityTypes = {
    0: 'publishing',
    1: 'selling',
    2: 'designing'
  };
  const priorities = [{
    icon: '--nfd-publish-icon',
    title: 'Publishing',
    desc: 'From blogs, to newsletters, to podcasts and videos, we help the web find your content.'
  }, {
    icon: '--nfd-selling-icon',
    title: 'Selling',
    desc: "Startup or seasoned business, drop-shipping or downloads, we've got ecommerce covered."
  }, {
    icon: '--nfd-design-icon',
    title: 'Designing',
    desc: 'With smart style presets and powerful options, we help your site look and feel polished.'
  }];
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_10__.useNavigate)();
  const [selected, setSelected] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [isLoaded, setisLoaded] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const isLargeViewport = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.useViewportMatch)('medium');
  const {
    setDrawerActiveView,
    setIsDrawerOpened,
    setIsSidebarOpened,
    setCurrentOnboardingData,
    setIsDrawerSuppressed
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_6__.store);
  const {
    currentStep,
    currentData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    return {
      currentStep: select(_store__WEBPACK_IMPORTED_MODULE_6__.store).getCurrentStep(),
      currentData: select(_store__WEBPACK_IMPORTED_MODULE_6__.store).getCurrentOnboardingData()
    };
  }, []);

  const getKey = (priorityTypes, value) => {
    return Object === null || Object === void 0 ? void 0 : Object.keys(priorityTypes).find(key => priorityTypes[key] === value);
  };

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isLargeViewport) {
      setIsDrawerOpened(true);
    }

    setIsSidebarOpened(false);
    setIsDrawerSuppressed(false);
    setDrawerActiveView(_constants__WEBPACK_IMPORTED_MODULE_4__.VIEW_NAV_PRIMARY);
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    async function setInitialData() {
      if (currentData) {
        const val = await (currentData === null || currentData === void 0 ? void 0 : currentData.data.topPriority.priority1);
        if (val != '') setSelected(parseInt(getKey(priorityTypes, val)));else {
          currentData.data.topPriority.priority1 = priorityTypes[selected];
          setCurrentOnboardingData(currentData);
        }
      }

      setisLoaded(true);
    }

    if (!isLoaded) setInitialData();
  }, [isLoaded]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isLoaded) {
      currentData.data.topPriority.priority1 = priorityTypes[selected];
      setCurrentOnboardingData(currentData);
    }
  }, [selected]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Layouts_Common__WEBPACK_IMPORTED_MODULE_7__["default"], {
    isVerticallyCentered: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_HeadingWithSubHeading__WEBPACK_IMPORTED_MODULE_8__["default"], {
    title: currentStep === null || currentStep === void 0 ? void 0 : currentStep.heading,
    subtitle: currentStep === null || currentStep === void 0 ? void 0 : currentStep.subheading
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_SelectableCardList_selectable_card_list__WEBPACK_IMPORTED_MODULE_9__["default"], {
    contents: priorities,
    selected: selected,
    onSelectedChange: setSelected
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "info-top-priority"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Where would you like to start? We'll start ", 'wp-module-onboarding'), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('there and then move into next steps.', 'wp-module-onboarding')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_SkipButton__WEBPACK_IMPORTED_MODULE_5__["default"], null)));
};

/* harmony default export */ __webpack_exports__["default"] = (StepTopPriority);

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
//# sourceMappingURL=src_OnboardingSPA_pages_Steps_TopPriority_index_js.js.map