"use strict";
(globalThis["webpackChunknewfold_Onboarding"] = globalThis["webpackChunknewfold_Onboarding"] || []).push([["src_OnboardingSPA_steps_TheFork_index_js"],{

/***/ "./src/OnboardingSPA/components/HeadingWithSubHeading/SiteGen/index.js":
/*!*****************************************************************************!*\
  !*** ./src/OnboardingSPA/components/HeadingWithSubHeading/SiteGen/index.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Interface Cards with standard design.
 *
 * @param {Object} root0
 * @param {string} root0.title
 * @param {string} root0.subtitle
 */
const HeadingWithSubHeading = _ref => {
  let {
    title,
    subtitle
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-step__heading"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "nfd-onboarding-step__heading__title"
  }, title), subtitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-step__heading__subtitle"
  }, subtitle, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-step__heading__icon"
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HeadingWithSubHeading);

/***/ }),

/***/ "./src/OnboardingSPA/components/StartOptions/index.js":
/*!************************************************************!*\
  !*** ./src/OnboardingSPA/components/StartOptions/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _data_flows_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../data/flows/constants */ "./src/OnboardingSPA/data/flows/constants.js");
/* harmony import */ var _data_flows__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../data/flows */ "./src/OnboardingSPA/data/flows/index.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _data_flows_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../data/flows/utils */ "./src/OnboardingSPA/data/flows/utils.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store */ "./src/OnboardingSPA/store/index.js");








const StartOptions = _ref => {
  let {
    questionnaire,
    oldFlow,
    options
  } = _ref;
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_6__.useNavigate)();
  const {
    brandConfig,
    migrationUrl
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    return {
      brandConfig: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getNewfoldBrandConfig(),
      migrationUrl: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getMigrationUrl()
    };
  });
  const {
    updateAllSteps,
    updateTopSteps,
    updateRoutes,
    updateDesignRoutes,
    updateInitialize
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_5__.store);

  const switchFlow = newFlow => {
    if (!(0,_data_flows_utils__WEBPACK_IMPORTED_MODULE_4__.validateFlow)(brandConfig, newFlow)) {
      return false;
    }

    const currentFlow = window.nfdOnboarding.currentFlow;
    const getData = (0,_data_flows__WEBPACK_IMPORTED_MODULE_2__.resolveGetDataForFlow)(newFlow);
    const data = getData();
    updateAllSteps(data.steps);
    updateTopSteps(data === null || data === void 0 ? void 0 : data.topSteps);
    updateRoutes(data.routes);
    updateDesignRoutes(data === null || data === void 0 ? void 0 : data.designRoutes);

    if (_data_flows_constants__WEBPACK_IMPORTED_MODULE_1__.SITEGEN_FLOW !== currentFlow) {
      window.nfdOnboarding.oldFlow = currentFlow;
    }

    window.nfdOnboarding.currentFlow = newFlow;
    updateInitialize(true);
    navigate(data.steps[1].path);
  };

  const selectFlow = flow => {
    switch (flow) {
      case 'onboarding':
        return switchFlow(oldFlow);

      case 'ai':
        return switchFlow(_data_flows_constants__WEBPACK_IMPORTED_MODULE_1__.SITEGEN_FLOW);

      case 'migration':
        return window.open(migrationUrl, '_blank');
    }
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: ""
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "nfd-onboarding-sitegen-options__questionnaire"
  }, questionnaire), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-sitegen-options__container"
  }, options.map((tab, idx) => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "nfd-onboarding-sitegen-options__container__options",
      key: idx,
      role: "button",
      tabIndex: 0,
      onClick: () => {
        selectFlow(tab.flow);
      },
      onKeyDown: () => {
        {
          selectFlow(tab.flow);
        }
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
      className: "nfd-onboarding-sitegen-options__container__heading__title"
    }, tab.span && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "nfd-onboarding-sitegen-options__container__options__span"
    }, tab.span), tab.title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "nfd-onboarding-sitegen-options__container__heading__subtitle"
    }, tab.subtitle));
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StartOptions);

/***/ }),

/***/ "./src/OnboardingSPA/steps/TheFork/contents.js":
/*!*****************************************************!*\
  !*** ./src/OnboardingSPA/steps/TheFork/contents.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);


const getContents = () => {
  return {
    heading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Welcome to WordPress', 'wp-module-onboarding'),
    subheading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('powered by ', 'wp-module-onboarding'),
    questionnaire: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Where would you like to start?', 'wp-module-onboarding'),
    options: [{
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Build it myself', 'wp-module-onboarding'),
      subtitle: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("We'll stay out of your way.", 'wp-module-onboarding'),
      flow: 'onboarding'
    }, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)(' Website Creator', 'wp-module-onboarding'),
      subtitle: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Custom Al generated content & design.', 'wp-module-onboarding'),
      span: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('AI', 'wp-module-onboarding'),
      flow: 'ai'
    }, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Hire a Pro', 'wp-module-onboarding'),
      subtitle: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Leave it to our WordPress experts.', 'wp-module-onboarding'),
      flow: 'migration'
    }],
    importtext: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Already have a WordPress site you want to import?', 'wp-module-onboarding'),
    importlink: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('https://my.bluehost.com/cgi/services/migration', 'wp-module-onboarding')
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getContents);

/***/ }),

/***/ "./src/OnboardingSPA/steps/TheFork/index.js":
/*!**************************************************!*\
  !*** ./src/OnboardingSPA/steps/TheFork/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Layouts_Common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Layouts/Common */ "./src/OnboardingSPA/components/Layouts/Common.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../constants */ "./src/constants.js");
/* harmony import */ var _data_flows_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../data/flows/constants */ "./src/OnboardingSPA/data/flows/constants.js");
/* harmony import */ var _components_HeadingWithSubHeading_SiteGen_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/HeadingWithSubHeading/SiteGen/index */ "./src/OnboardingSPA/components/HeadingWithSubHeading/SiteGen/index.js");
/* harmony import */ var _components_StartOptions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/StartOptions */ "./src/OnboardingSPA/components/StartOptions/index.js");
/* harmony import */ var _contents__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./contents */ "./src/OnboardingSPA/steps/TheFork/contents.js");











const TheFork = () => {
  var _window$nfdOnboarding;

  const {
    setIsHeaderEnabled,
    setSidebarActiveView,
    setHeaderActiveView,
    setDrawerActiveView,
    setIsHeaderNavigationEnabled,
    setFooterActiveView
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_3__.store);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setIsHeaderEnabled(false);
    setSidebarActiveView(false);
    setIsHeaderNavigationEnabled(false);
    setHeaderActiveView(_constants__WEBPACK_IMPORTED_MODULE_4__.HEADER_SITEGEN);
    setDrawerActiveView(false);
    setFooterActiveView(_constants__WEBPACK_IMPORTED_MODULE_4__.FOOTER_SITEGEN);
  });
  const oldFlow = (_window$nfdOnboarding = window.nfdOnboarding) !== null && _window$nfdOnboarding !== void 0 && _window$nfdOnboarding.oldFlow ? window.nfdOnboarding.oldFlow : _data_flows_constants__WEBPACK_IMPORTED_MODULE_5__.DEFAULT_FLOW;
  const content = (0,_contents__WEBPACK_IMPORTED_MODULE_8__["default"])();
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Layouts_Common__WEBPACK_IMPORTED_MODULE_1__["default"], {
    isCentered: true,
    className: "nfd-onboarding-step--site-gen__fork"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_HeadingWithSubHeading_SiteGen_index__WEBPACK_IMPORTED_MODULE_6__["default"], {
    title: content.heading,
    subtitle: content.subheading
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_StartOptions__WEBPACK_IMPORTED_MODULE_7__["default"], {
    questionnaire: content.questionnaire,
    oldFlow: oldFlow,
    options: content.options
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: "nfd-onboarding-step--site-gen__fork__importsite",
    href: content.importlink
  }, content.importtext));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TheFork);

/***/ })

}]);
//# sourceMappingURL=src_OnboardingSPA_steps_TheFork_index_js.js.map