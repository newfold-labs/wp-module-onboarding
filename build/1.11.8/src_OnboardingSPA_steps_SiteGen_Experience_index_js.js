"use strict";
(globalThis["webpackChunknewfold_Onboarding"] = globalThis["webpackChunknewfold_Onboarding"] || []).push([["src_OnboardingSPA_steps_SiteGen_Experience_index_js"],{

/***/ "./src/OnboardingSPA/components/CardWithOptions/index.js":
/*!***************************************************************!*\
  !*** ./src/OnboardingSPA/components/CardWithOptions/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/chevron-right.js");



const CardWithOptions = _ref => {
  let {
    title,
    options,
    skip,
    callback
  } = _ref;

  const buildOptions = () => {
    return options.map((data, idx) => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        key: idx,
        role: "button",
        tabIndex: 0,
        className: 'nfd-sg-card__data__option',
        onClick: () => {
          if (callback && typeof callback === 'function') {
            callback(idx + 1);
          }
        },
        onKeyDown: () => {
          if (callback && typeof callback === 'function') {
            callback(idx + 1);
          }
        }
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: 'nfd-sg-card__data__option__left'
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: 'nfd-sg-card__data__option__left_top'
      }, data.title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: 'nfd-sg-card__data__option__left_bottom'
      }, data.desc)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_1__["default"], {
        className: 'nfd-sg-card__data__option__right',
        icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__["default"]
      }));
    });
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'nfd-sg-card'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'nfd-sg-card__title'
  }, title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'nfd-sg-card__data'
  }, buildOptions()), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    role: "button",
    tabIndex: 0,
    className: 'nfd-sg-card__skip',
    onClick: () => {
      if (callback && typeof callback === 'function') {
        callback(-1);
      }
    },
    onKeyDown: () => {
      if (callback && typeof callback === 'function') {
        callback(-1);
      }
    }
  }, skip));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CardWithOptions);

/***/ }),

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

/***/ "./src/OnboardingSPA/steps/SiteGen/Experience/contents.js":
/*!****************************************************************!*\
  !*** ./src/OnboardingSPA/steps/SiteGen/Experience/contents.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);


const getContents = () => {
  return {
    heading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('How familiar are you with using WordPress?', 'wp-module-onboarding'),
    options: [{
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Beginner', 'wp-module-onboarding'),
      desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('First time here, where am I?', 'wp-module-onboarding')
    }, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Used it some', 'wp-module-onboarding'),
      desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("I'll ask for help when I need it", 'wp-module-onboarding')
    }, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Expert', 'wp-module-onboarding'),
      desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Stay out of my way, I know what I'm doing", 'wp-module-onboarding')
    }],
    skip: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Skip', 'wp-module-onboarding')
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getContents);

/***/ }),

/***/ "./src/OnboardingSPA/steps/SiteGen/Experience/index.js":
/*!*************************************************************!*\
  !*** ./src/OnboardingSPA/steps/SiteGen/Experience/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _contents__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./contents */ "./src/OnboardingSPA/steps/SiteGen/Experience/contents.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _components_Layouts_Common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/Layouts/Common */ "./src/OnboardingSPA/components/Layouts/Common.js");
/* harmony import */ var _components_CardWithOptions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/CardWithOptions */ "./src/OnboardingSPA/components/CardWithOptions/index.js");
/* harmony import */ var _components_Loaders_SiteGenLoader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/Loaders/SiteGenLoader */ "./src/OnboardingSPA/components/Loaders/SiteGenLoader/index.js");











const SiteGenExperience = () => {
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_8__.useNavigate)();
  const content = (0,_contents__WEBPACK_IMPORTED_MODULE_2__["default"])(); // Index of the selection user makes

  /* eslint-disable no-unused-vars */

  const [selection, setSelection] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const {
    currentData,
    nextStep
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    return {
      currentData: select(_store__WEBPACK_IMPORTED_MODULE_4__.store).getCurrentOnboardingData(),
      nextStep: select(_store__WEBPACK_IMPORTED_MODULE_4__.store).getNextStep()
    };
  });
  const {
    setIsHeaderEnabled,
    setSidebarActiveView,
    setHeaderActiveView,
    setDrawerActiveView,
    setCurrentOnboardingData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_4__.store);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    var _currentData$sitegen$;

    setIsHeaderEnabled(true);
    setSidebarActiveView(false);
    setHeaderActiveView(_constants__WEBPACK_IMPORTED_MODULE_3__.HEADER_SITEGEN);
    setDrawerActiveView(false);

    if ((_currentData$sitegen$ = currentData.sitegen.experience) !== null && _currentData$sitegen$ !== void 0 && _currentData$sitegen$.level) {
      setSelection(currentData.sitegen.experience.level);
    }
  });

  const checkAndNavigate = idx => {
    // 0 - Not Selected
    // 1-2 Options
    // -1 Skip
    setSelection(idx);
    currentData.sitegen.experience.level = idx;
    setCurrentOnboardingData(currentData);

    if (nextStep) {
      navigate(nextStep.path);
    }
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Layouts_Common__WEBPACK_IMPORTED_MODULE_5__["default"], {
    isCentered: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'nfd-sg-experience-level'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Loaders_SiteGenLoader__WEBPACK_IMPORTED_MODULE_7__["default"], null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_CardWithOptions__WEBPACK_IMPORTED_MODULE_6__["default"], {
    title: content.heading,
    options: content.options,
    skip: content.skip,
    callback: checkAndNavigate
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SiteGenExperience);

/***/ })

}]);
//# sourceMappingURL=src_OnboardingSPA_steps_SiteGen_Experience_index_js.js.map