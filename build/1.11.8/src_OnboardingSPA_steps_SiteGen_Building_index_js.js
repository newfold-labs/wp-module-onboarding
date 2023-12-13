"use strict";
(globalThis["webpackChunknewfold_Onboarding"] = globalThis["webpackChunknewfold_Onboarding"] || []).push([["src_OnboardingSPA_steps_SiteGen_Building_index_js"],{

/***/ "./src/OnboardingSPA/components/Loaders/SiteGenLoader/contents.js":
/*!************************************************************************!*\
  !*** ./src/OnboardingSPA/components/Loaders/SiteGenLoader/contents.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);


const getContents = () => {
  return {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Building Website', 'wp-module-onboarding'),
    status: [{
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Generating Website', 'wp-module-onboarding')
    }, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Finding Font Pairings', 'wp-module-onboarding')
    }, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Building Custom Color Palettes', 'wp-module-onboarding')
    }, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Populating Images', 'wp-module-onboarding')
    }, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Finalizing Previews', 'wp-module-onboarding')
    }, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Packaging Website', 'wp-module-onboarding')
    }]
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getContents);

/***/ }),

/***/ "./src/OnboardingSPA/components/Loaders/SiteGenLoader/index.js":
/*!*********************************************************************!*\
  !*** ./src/OnboardingSPA/components/Loaders/SiteGenLoader/index.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _contents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contents */ "./src/OnboardingSPA/components/Loaders/SiteGenLoader/contents.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../store */ "./src/OnboardingSPA/store/index.js");







const SiteGenLoader = _ref => {
  let {
    autoNavigate = false
  } = _ref;
  let statusIdx = 0;
  const content = (0,_contents__WEBPACK_IMPORTED_MODULE_1__["default"])();
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_4__.useNavigate)();
  const [percentage, setPercentage] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [status, setStatus] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(content.status[statusIdx].title);
  const {
    currentData,
    nextStep
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    return {
      currentData: select(_store__WEBPACK_IMPORTED_MODULE_3__.store).getCurrentOnboardingData(),
      nextStep: select(_store__WEBPACK_IMPORTED_MODULE_3__.store).getNextStep()
    };
  });
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const statusTimer = setInterval(() => {
      statusIdx += 1;
      if (statusIdx === content.status.length) statusIdx = 0;
      setStatus(content.status[statusIdx].title);
    }, 3000);
    return () => {
      clearInterval(statusTimer);
    };
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const percentageValue = currentData.sitegen.siteGenMetaStatus.currentStatus / currentData.sitegen.siteGenMetaStatus.totalCount * 100;
    setPercentage(percentageValue);
  }, [currentData.sitegen.siteGenMetaStatus.currentStatus]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (percentage === 100) {
      if (nextStep && autoNavigate) {
        navigate(nextStep.path);
      }
    }
  }, [percentage]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'nfd-sg-loader'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'nfd-sg-loader__title'
  }, content.title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'nfd-sg-loader__progress'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'nfd-sg-loader__progress_bars'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'nfd-sg-loader__progress_bars_bg'
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'nfd-sg-loader__progress_bars_bar',
    style: {
      width: `${percentage}%`
    }
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'nfd-sg-loader__status'
  }, `${status}...`));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SiteGenLoader);

/***/ }),

/***/ "./src/OnboardingSPA/steps/SiteGen/Building/index.js":
/*!***********************************************************!*\
  !*** ./src/OnboardingSPA/steps/SiteGen/Building/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Layouts_Common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/Layouts/Common */ "./src/OnboardingSPA/components/Layouts/Common.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.js");
/* harmony import */ var _components_Loaders_SiteGenLoader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/Loaders/SiteGenLoader */ "./src/OnboardingSPA/components/Loaders/SiteGenLoader/index.js");








const SiteGenBuilding = () => {
  const {
    setIsHeaderEnabled,
    setSidebarActiveView,
    setHeaderActiveView,
    setDrawerActiveView
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_3__.store);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setIsHeaderEnabled(true);
    setSidebarActiveView(false);
    setHeaderActiveView(_constants__WEBPACK_IMPORTED_MODULE_4__.HEADER_SITEGEN);
    setDrawerActiveView(false);
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Layouts_Common__WEBPACK_IMPORTED_MODULE_1__["default"], {
    isCentered: true,
    className: "nfd-onboarding-step--site-gen__building"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "site-gen__building_skimmer"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "site-gen__building_skimmer--main site-gen__building_skimmer--header"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "site-gen__building_skimmer--main site-gen__building_skimmer--body"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "site-gen__building_skimmer--footer"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "site-gen__building_skimmer--main site-gen__building_skimmer--footer_left"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "site-gen__building_skimmer--main site-gen__building_skimmer--footer_right"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "site-gen__building_loader__overlay"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Loaders_SiteGenLoader__WEBPACK_IMPORTED_MODULE_5__["default"], {
    autoNavigate: true
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SiteGenBuilding);

/***/ })

}]);
//# sourceMappingURL=src_OnboardingSPA_steps_SiteGen_Building_index_js.js.map