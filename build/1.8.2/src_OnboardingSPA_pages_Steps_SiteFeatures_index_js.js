"use strict";
(globalThis["webpackChunknewfold_Onboarding"] = globalThis["webpackChunknewfold_Onboarding"] || []).push([["src_OnboardingSPA_pages_Steps_SiteFeatures_index_js"],{

/***/ "./src/OnboardingSPA/components/CheckboxTemplate/CheckboxItem/index.js":
/*!*****************************************************************************!*\
  !*** ./src/OnboardingSPA/components/CheckboxTemplate/CheckboxItem/index.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/help.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Animate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Animate */ "./src/OnboardingSPA/components/Animate/index.js");





/**
 * Checkbox Item Component
 * This returns a Single Element with a toggable description
 *
 * @param {string} icon     - The icon name of the Item
 * @param {string} title    - The Main Title of the Item
 * @param {string} subtitle - The Sub Title of the Item
 * @param {string} desc     - The Description of the Item
 *
 * @return CheckboxItem
 */

const CheckboxItem = _ref => {
  let {
    name,
    icon,
    title,
    desc,
    subtitle,
    callback,
    tabIndex = 0,
    isSelectedDefault,
    className = 'checkbox-item'
  } = _ref;
  const [showDescription, setShowDescription] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [isSelected, setIsSelected] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(isSelectedDefault);

  const handleCheck = () => {
    setIsSelected(!isSelected);
    callback(name, !isSelected);
  };

  const handleShowDesc = () => {
    setShowDescription(!showDescription);
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${className} ${isSelected && `${className}--selected`} ${showDescription && `${className}--shown`}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${className}-container`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CheckboxControl, {
    checked: isSelected,
    onChange: handleCheck,
    className: `${className}-checkbox`
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${className}__contents`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${className}__contents-icon
                                     ${isSelected && `${className}__contents-icon--selected`}
                                     ${showDescription && `${className}__contents-icon--shown`}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      width: '35px',
      height: '35px',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundImage: `var(${icon})`,
      filter: isSelected ? 'invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%)' : 'none'
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${className}__contents-text`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${className}__contents-text-title ${isSelected && `${className}__contents-text-title--selected`}`
  }, title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${className}__contents-text-subtitle`
  }, subtitle)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${className}__contents-help ${showDescription ? 'highlighted' : ''}`,
    onClick: handleShowDesc,
    role: "button",
    onKeyDown: handleShowDesc,
    tabIndex: tabIndex
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_3__["default"], {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__["default"],
    style: {
      width: '30px',
      height: '30px'
    }
  }))))), showDescription && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Animate__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: ` ${className}__dropdown `,
    type: 'dropdown'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${className}__desc`
  }, desc)));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CheckboxItem);

/***/ }),

/***/ "./src/OnboardingSPA/components/CheckboxTemplate/CheckboxList/index.js":
/*!*****************************************************************************!*\
  !*** ./src/OnboardingSPA/components/CheckboxTemplate/CheckboxList/index.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../index */ "./src/OnboardingSPA/components/CheckboxTemplate/index.js");


/**
 * Checkbox List Component
 * This returns a List of Checkbox Items to be placed dynamically on screen
 *
 * @param          customItemsList.callback
 * @param {Object} customItemsList                   - The List to be shown with a Title, Subtitle and a Description
 *
 * @param          customItemsList.selectedItems
 * @param          customItemsList.customItemsList
 * @return CheckboxList
 */

const CheckboxList = _ref => {
  let {
    callback,
    selectedItems,
    customItemsList
  } = _ref;
  const length = Object.keys(customItemsList).length;

  const buildCheckboxItems = () => {
    var customItems = [];

    for (const key in customItemsList) {
      var item = customItemsList[key];
      const isSelectedDefault = selectedItems[item.slug];
      customItems.push((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_index__WEBPACK_IMPORTED_MODULE_1__.CheckboxItem, {
        name: item.slug,
        icon: item.icon,
        title: item.title,
        subtitle: item.subtitle,
        desc: item.desc,
        callback: callback,
        isSelectedDefault: isSelectedDefault !== null && isSelectedDefault !== void 0 ? isSelectedDefault : false
      }));
    }

    return customItems;
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "checkbox-list"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "checkbox-list-col"
  }, buildCheckboxItems().slice(0, Math.floor(length / 2))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "checkbox-list-col"
  }, buildCheckboxItems().slice(Math.floor(length / 2), length)));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CheckboxList);

/***/ }),

/***/ "./src/OnboardingSPA/components/CheckboxTemplate/CheckboxListSkeleton/index.js":
/*!*************************************************************************************!*\
  !*** ./src/OnboardingSPA/components/CheckboxTemplate/CheckboxListSkeleton/index.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Animate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Animate */ "./src/OnboardingSPA/components/Animate/index.js");


/**
 * Checkbox List Skeleton Component
 * This returns a List of Checkbox Items Skeletons to imitate loading
 *
 * @param  customItemsList.count
 * @param  customItemsList.count.count
 * @return CheckboxList
 */

const CheckboxListSkeleton = _ref => {
  let {
    count
  } = _ref;

  const buildCheckboxSkeletonItems = () => {
    const customItems = [];

    for (let idx = 0; idx < count; idx++) customItems.push((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Animate__WEBPACK_IMPORTED_MODULE_1__["default"], {
      type: 'shine-placeholder',
      className: "checkbox-skeleton-item"
    }));

    return customItems;
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "checkbox-list"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "checkbox-list-col"
  }, buildCheckboxSkeletonItems().slice(0, Math.floor(count / 2))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "checkbox-list-col"
  }, buildCheckboxSkeletonItems().slice(Math.floor(count / 2), count)));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CheckboxListSkeleton);

/***/ }),

/***/ "./src/OnboardingSPA/components/CheckboxTemplate/index.js":
/*!****************************************************************!*\
  !*** ./src/OnboardingSPA/components/CheckboxTemplate/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CheckboxItem": () => (/* reexport safe */ _CheckboxItem__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "CheckboxList": () => (/* reexport safe */ _CheckboxList__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "CheckboxListSkeleton": () => (/* reexport safe */ _CheckboxListSkeleton__WEBPACK_IMPORTED_MODULE_2__["default"])
/* harmony export */ });
/* harmony import */ var _CheckboxItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CheckboxItem */ "./src/OnboardingSPA/components/CheckboxTemplate/CheckboxItem/index.js");
/* harmony import */ var _CheckboxList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CheckboxList */ "./src/OnboardingSPA/components/CheckboxTemplate/CheckboxList/index.js");
/* harmony import */ var _CheckboxListSkeleton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CheckboxListSkeleton */ "./src/OnboardingSPA/components/CheckboxTemplate/CheckboxListSkeleton/index.js");




/***/ }),

/***/ "./src/OnboardingSPA/pages/Steps/SiteFeatures/index.js":
/*!*************************************************************!*\
  !*** ./src/OnboardingSPA/pages/Steps/SiteFeatures/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.js");
/* harmony import */ var _components_Layouts_Common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/Layouts/Common */ "./src/OnboardingSPA/components/Layouts/Common.js");
/* harmony import */ var _utils_api_plugins__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../utils/api/plugins */ "./src/OnboardingSPA/utils/api/plugins.js");
/* harmony import */ var _components_HeadingWithSubHeading__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../components/HeadingWithSubHeading */ "./src/OnboardingSPA/components/HeadingWithSubHeading/index.js");
/* harmony import */ var _components_CheckboxTemplate_CheckboxList__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../components/CheckboxTemplate/CheckboxList */ "./src/OnboardingSPA/components/CheckboxTemplate/CheckboxList/index.js");
/* harmony import */ var _components_CheckboxTemplate__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../components/CheckboxTemplate */ "./src/OnboardingSPA/components/CheckboxTemplate/index.js");













const StepSiteFeatures = () => {
  var _themeVariations$curr;

  const isLargeViewport = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.useViewportMatch)('medium');
  const [selectedPlugins, setSelectedPlugins] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const [customPluginsList, setCustomPluginsList] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const {
    setIsDrawerOpened,
    setDrawerActiveView,
    setSidebarActiveView,
    setCurrentOnboardingData,
    setIsDrawerSuppressed,
    setIsHeaderNavigationEnabled
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_4__.store);
  const {
    currentStep,
    currentData,
    themeVariations
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    return {
      currentStep: select(_store__WEBPACK_IMPORTED_MODULE_4__.store).getCurrentStep(),
      currentData: select(_store__WEBPACK_IMPORTED_MODULE_4__.store).getCurrentOnboardingData(),
      themeVariations: select(_store__WEBPACK_IMPORTED_MODULE_4__.store).getStepPreviewData()
    };
  }, []);

  async function selectPlugin(slug, choice) {
    const selectedPluginsCopy = { ...selectedPlugins
    };
    selectedPluginsCopy[slug] = choice;
    setSelectedPlugins(selectedPluginsCopy);
    currentData.data.siteFeatures = { ...selectedPluginsCopy
    };
    setCurrentOnboardingData(currentData);
  }

  async function changeToStoreSchema(customPluginsList) {
    let saveToStore = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    const selectedPlugins = {};

    for (const key in customPluginsList) {
      const plugin = customPluginsList[key];
      selectedPlugins[plugin.slug] = plugin.selected;
    }

    setSelectedPlugins(selectedPlugins);

    if (saveToStore) {
      currentData.data.siteFeatures = { ...selectedPlugins
      };
      setCurrentOnboardingData(currentData);
    }
  }

  async function getCustomPlugins() {
    var _currentData$data, _currentData$data2;

    const customPluginsList = await (0,_utils_api_plugins__WEBPACK_IMPORTED_MODULE_7__.getSiteFeatures)();
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(currentData === null || currentData === void 0 ? void 0 : (_currentData$data = currentData.data) === null || _currentData$data === void 0 ? void 0 : _currentData$data.siteFeatures)) changeToStoreSchema(customPluginsList.body, true);else setSelectedPlugins({ ...(currentData === null || currentData === void 0 ? void 0 : (_currentData$data2 = currentData.data) === null || _currentData$data2 === void 0 ? void 0 : _currentData$data2.siteFeatures)
    });
    setCustomPluginsList(customPluginsList.body);
  }

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isLargeViewport) {
      setIsDrawerOpened(false);
    }

    setSidebarActiveView(_constants__WEBPACK_IMPORTED_MODULE_5__.SIDEBAR_LEARN_MORE);
    setIsDrawerSuppressed(false);
    setDrawerActiveView(_constants__WEBPACK_IMPORTED_MODULE_5__.VIEW_NAV_PRIMARY);
    setIsHeaderNavigationEnabled(true);
    getCustomPlugins();
  }, []);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Layouts_Common__WEBPACK_IMPORTED_MODULE_6__["default"], null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      margin: '100px'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_HeadingWithSubHeading__WEBPACK_IMPORTED_MODULE_8__["default"], {
    title: currentStep === null || currentStep === void 0 ? void 0 : currentStep.heading,
    subtitle: currentStep === null || currentStep === void 0 ? void 0 : currentStep.subheading
  })), !customPluginsList && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_CheckboxTemplate__WEBPACK_IMPORTED_MODULE_10__.CheckboxListSkeleton, {
    count: (_themeVariations$curr = themeVariations[currentStep === null || currentStep === void 0 ? void 0 : currentStep.patternId]) === null || _themeVariations$curr === void 0 ? void 0 : _themeVariations$curr.previewCount
  }), customPluginsList && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_CheckboxTemplate_CheckboxList__WEBPACK_IMPORTED_MODULE_9__["default"], {
    callback: selectPlugin,
    selectedItems: selectedPlugins,
    customItemsList: customPluginsList
  }));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StepSiteFeatures);

/***/ })

}]);
//# sourceMappingURL=src_OnboardingSPA_pages_Steps_SiteFeatures_index_js.js.map