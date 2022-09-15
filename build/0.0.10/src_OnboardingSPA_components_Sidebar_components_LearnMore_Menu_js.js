"use strict";
(self["webpackChunknewfold_Onboarding"] = self["webpackChunknewfold_Onboarding"] || []).push([["src_OnboardingSPA_components_Sidebar_components_LearnMore_Menu_js"],{

/***/ "./src/OnboardingSPA/components/Sidebar/components/LearnMore/Menu.js":
/*!***************************************************************************!*\
  !*** ./src/OnboardingSPA/components/Sidebar/components/LearnMore/Menu.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/info.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../constants */ "./src/constants.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);








const LearnMoreMenu = () => {
  const {
    isSidebarOpened,
    sideBarView,
    currentStep
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    return {
      isSidebarOpened: select(_store__WEBPACK_IMPORTED_MODULE_3__.store).isSidebarOpened(),
      sideBarView: select(_store__WEBPACK_IMPORTED_MODULE_3__.store).getSidebarView(),
      currentStep: select(_store__WEBPACK_IMPORTED_MODULE_3__.store).getCurrentStep()
    };
  });
  const {
    setIsSidebarOpened,
    setSidebarActiveView
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_3__.store);

  const toggleSidebar = () => {
    setSidebarActiveView(_constants__WEBPACK_IMPORTED_MODULE_4__.SIDEBAR_LEARN_MORE);
    setIsSidebarOpened(sideBarView === _constants__WEBPACK_IMPORTED_MODULE_4__.SIDEBAR_LEARN_MORE ? !isSidebarOpened : isSidebarOpened);
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Fill, {
    name: `${_constants__WEBPACK_IMPORTED_MODULE_4__.SIDEBAR_MENU_SLOTFILL_PREFIX}/${_constants__WEBPACK_IMPORTED_MODULE_4__.SIDEBAR_LEARN_MORE}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    className: classnames__WEBPACK_IMPORTED_MODULE_5___default()('nfd-onboarding-sidebar-learn-more__menu-button', {
      'is-pressed': isSidebarOpened && sideBarView === _constants__WEBPACK_IMPORTED_MODULE_4__.SIDEBAR_LEARN_MORE
    }),
    disabled: !currentStep,
    onClick: toggleSidebar,
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__["default"]
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (LearnMoreMenu);

/***/ })

}]);
//# sourceMappingURL=src_OnboardingSPA_components_Sidebar_components_LearnMore_Menu_js.js.map