"use strict";
(self["webpackChunknewfold_Onboarding"] = self["webpackChunknewfold_Onboarding"] || []).push([["src_OnboardingSPA_components_Sidebar_components_LearnMore_Sidebar_js"],{

/***/ "./src/OnboardingSPA/components/Sidebar/components/LearnMore/Sidebar.js":
/*!******************************************************************************!*\
  !*** ./src/OnboardingSPA/components/Sidebar/components/LearnMore/Sidebar.js ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/close-small.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../constants */ "./src/constants.js");









const LearnMoreSidebar = () => {
  var _currentStep$SidebarC;

  const {
    currentStep
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    return {
      currentStep: select(_store__WEBPACK_IMPORTED_MODULE_4__.store).getCurrentStep()
    };
  });
  const {
    setIsSidebarOpened
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_4__.store);

  const closeSideBar = () => {
    setIsSidebarOpened(false);
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Fill, {
    name: `${_constants__WEBPACK_IMPORTED_MODULE_5__.SIDEBAR_SLOTFILL_PREFIX}/${_constants__WEBPACK_IMPORTED_MODULE_5__.SIDEBAR_LEARN_MORE}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelHeader, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Learn More', 'wp-module-onboarding')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    onClick: closeSideBar,
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__["default"]
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    initialOpen: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-sidebar-learn-more__container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-sidebar-learn-more__icon"
  }, (currentStep === null || currentStep === void 0 ? void 0 : currentStep.Icon) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_7__["default"], {
    icon: currentStep.Icon
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-sidebar-learn-more__text"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "nfd-onboarding-sidebar-learn-more__text-heading"
  }, (currentStep === null || currentStep === void 0 ? void 0 : currentStep.heading) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, currentStep.heading)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "nfd-onboarding-sidebar-learn-more__text-subheading"
  }, currentStep === null || currentStep === void 0 ? void 0 : currentStep.description))))), (currentStep === null || currentStep === void 0 ? void 0 : (_currentStep$SidebarC = currentStep.SidebarComponents) === null || _currentStep$SidebarC === void 0 ? void 0 : _currentStep$SidebarC.LearnMore) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    initialOpen: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
    fallback: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null)
  }, currentStep.SidebarComponents.LearnMore.map((SidebarComponent, index) => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      key: index
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SidebarComponent, null));
  }))));
};

/* harmony default export */ __webpack_exports__["default"] = (LearnMoreSidebar);

/***/ })

}]);
//# sourceMappingURL=src_OnboardingSPA_components_Sidebar_components_LearnMore_Sidebar_js.js.map