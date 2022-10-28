"use strict";
(self["webpackChunknewfold_Onboarding"] = self["webpackChunknewfold_Onboarding"] || []).push([["src_OnboardingSPA_components_Sidebar_components_LearnMore_InfoPanel_index_js"],{

/***/ "./src/OnboardingSPA/components/Sidebar/components/LearnMore/HeadingWithDescription/index.js":
/*!***************************************************************************************************!*\
  !*** ./src/OnboardingSPA/components/Sidebar/components/LearnMore/HeadingWithDescription/index.js ***!
  \***************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);



const HeadingWithDescription = _ref => {
  let {
    heading,
    description,
    baseClassName = 'nfd-onboarding-sidebar-learn-more--heading-with-description'
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: `${baseClassName}__heading`
  }, heading), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: `${baseClassName}__description`
  }, description));
};

/* harmony default export */ __webpack_exports__["default"] = (HeadingWithDescription);

/***/ }),

/***/ "./src/OnboardingSPA/components/Sidebar/components/LearnMore/InfoPanel/index.js":
/*!**************************************************************************************!*\
  !*** ./src/OnboardingSPA/components/Sidebar/components/LearnMore/InfoPanel/index.js ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _HeadingWithDescription__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../HeadingWithDescription */ "./src/OnboardingSPA/components/Sidebar/components/LearnMore/HeadingWithDescription/index.js");




const InfoPanel = _ref => {
  let {
    baseClassName = 'nfd-onboarding-sidebar-learn-more--info-panel',
    headingWithDescriptions
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    className: baseClassName,
    initialOpen: true
  }, headingWithDescriptions.map((headingWithDescription, idx) => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_HeadingWithDescription__WEBPACK_IMPORTED_MODULE_2__["default"], {
      key: idx,
      heading: headingWithDescription === null || headingWithDescription === void 0 ? void 0 : headingWithDescription.heading,
      description: headingWithDescription === null || headingWithDescription === void 0 ? void 0 : headingWithDescription.description
    });
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (InfoPanel);

/***/ })

}]);
//# sourceMappingURL=src_OnboardingSPA_components_Sidebar_components_LearnMore_InfoPanel_index_js.js.map