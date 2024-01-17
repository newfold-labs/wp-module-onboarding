"use strict";
(globalThis["webpackChunknewfold_Onboarding"] = globalThis["webpackChunknewfold_Onboarding"] || []).push([["src_OnboardingSPA_components_Sidebar_components_Customize_Sidebar_js"],{

/***/ "./src/OnboardingSPA/components/Sidebar/components/Customize/Sidebar.js":
/*!******************************************************************************!*\
  !*** ./src/OnboardingSPA/components/Sidebar/components/Customize/Sidebar.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/close-small.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../constants */ "./src/constants.js");
/* harmony import */ var _Skeleton_SidebarSkeleton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Skeleton/SidebarSkeleton */ "./src/OnboardingSPA/components/Sidebar/components/Customize/Skeleton/SidebarSkeleton.js");










const CustomizeSidebar = () => {
  var _currentStep$sidebars, _currentStep$sidebars2;

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
    name: `${_constants__WEBPACK_IMPORTED_MODULE_5__.SIDEBAR_SLOTFILL_PREFIX}/Customize`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    className: "nfd-onboarding-sidebar-learn-more",
    initialOpen: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
    fallback: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Skeleton_SidebarSkeleton__WEBPACK_IMPORTED_MODULE_6__["default"], null)
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelHeader, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Customize Website', 'wp-module-onboarding')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-sidebar-learn-more__header"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    className: "nfd-onboarding-sidebar-learn-more__header__icon",
    onClick: closeSideBar,
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__["default"]
  }))), (currentStep === null || currentStep === void 0 ? void 0 : (_currentStep$sidebars = currentStep.sidebars) === null || _currentStep$sidebars === void 0 ? void 0 : _currentStep$sidebars.Customize) && (currentStep === null || currentStep === void 0 ? void 0 : (_currentStep$sidebars2 = currentStep.sidebars) === null || _currentStep$sidebars2 === void 0 ? void 0 : _currentStep$sidebars2.Customize.SidebarComponents.map((SidebarComponent, index) => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      key: index
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SidebarComponent, null));
  })))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(CustomizeSidebar));

/***/ }),

/***/ "./src/OnboardingSPA/components/Sidebar/components/Customize/Skeleton/SidebarSkeleton.js":
/*!***********************************************************************************************!*\
  !*** ./src/OnboardingSPA/components/Sidebar/components/Customize/Skeleton/SidebarSkeleton.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Animate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../Animate */ "./src/OnboardingSPA/components/Animate/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../store */ "./src/OnboardingSPA/store/index.js");





/** Skeleton Structure for the SideBar */

const SidebarSkeleton = () => {
  var _brandConfig$views, _brandConfig$views$si, _brandConfig$views$si2, _brandConfig$views2, _brandConfig$views2$s, _brandConfig$views2$s2, _brandConfig$views3, _brandConfig$views3$s, _brandConfig$views3$s2;

  const {
    brandConfig
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    return {
      brandConfig: select(_store__WEBPACK_IMPORTED_MODULE_3__.store).getNewfoldBrandConfig()
    };
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "sidebar-skeleton"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "sidebar-skeleton-header"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "sidebar-skeleton-header-top"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Animate__WEBPACK_IMPORTED_MODULE_2__["default"], {
    type: 'shine-placeholder',
    className: "shimmer sidebar-skeleton-header-top-profile"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Animate__WEBPACK_IMPORTED_MODULE_2__["default"], {
    type: 'shine-placeholder',
    className: "shimmer sidebar-skeleton-header-top-header"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "sidebar-skeleton-header-below"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Animate__WEBPACK_IMPORTED_MODULE_2__["default"], {
    type: 'shine-placeholder',
    className: "shimmer sidebar-skeleton-header-below-subheading-1"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Animate__WEBPACK_IMPORTED_MODULE_2__["default"], {
    type: 'shine-placeholder',
    className: "shimmer sidebar-skeleton-header-below-subheading-2"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "sidebar-skeleton-divider"
  }), (brandConfig === null || brandConfig === void 0 ? void 0 : (_brandConfig$views = brandConfig.views) === null || _brandConfig$views === void 0 ? void 0 : (_brandConfig$views$si = _brandConfig$views.sidebar) === null || _brandConfig$views$si === void 0 ? void 0 : (_brandConfig$views$si2 = _brandConfig$views$si.illustration) === null || _brandConfig$views$si2 === void 0 ? void 0 : _brandConfig$views$si2.shown) !== false && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "sidebar-skeleton-body"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Animate__WEBPACK_IMPORTED_MODULE_2__["default"], {
    type: 'shine-placeholder',
    className: "shimmer sidebar-skeleton-body-image"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "sidebar-skeleton-divider"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "sidebar-skeleton-footer"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Animate__WEBPACK_IMPORTED_MODULE_2__["default"], {
    type: 'shine-placeholder',
    className: "shimmer sidebar-skeleton-footer-line-1"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Animate__WEBPACK_IMPORTED_MODULE_2__["default"], {
    type: 'shine-placeholder',
    className: "shimmer sidebar-skeleton-footer-line-2"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Animate__WEBPACK_IMPORTED_MODULE_2__["default"], {
    type: 'shine-placeholder',
    className: "shimmer sidebar-skeleton-footer-line-3"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Animate__WEBPACK_IMPORTED_MODULE_2__["default"], {
    type: 'shine-placeholder',
    className: "shimmer sidebar-skeleton-footer-line-4"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Animate__WEBPACK_IMPORTED_MODULE_2__["default"], {
    type: 'shine-placeholder',
    className: "shimmer sidebar-skeleton-footer-line-5"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "sidebar-skeleton-footer-buttons"
  }, ((brandConfig === null || brandConfig === void 0 ? void 0 : (_brandConfig$views2 = brandConfig.views) === null || _brandConfig$views2 === void 0 ? void 0 : (_brandConfig$views2$s = _brandConfig$views2.sidebar) === null || _brandConfig$views2$s === void 0 ? void 0 : (_brandConfig$views2$s2 = _brandConfig$views2$s.fullService) === null || _brandConfig$views2$s2 === void 0 ? void 0 : _brandConfig$views2$s2.shown) !== false || (brandConfig === null || brandConfig === void 0 ? void 0 : (_brandConfig$views3 = brandConfig.views) === null || _brandConfig$views3 === void 0 ? void 0 : (_brandConfig$views3$s = _brandConfig$views3.sidebar) === null || _brandConfig$views3$s === void 0 ? void 0 : (_brandConfig$views3$s2 = _brandConfig$views3$s.experts) === null || _brandConfig$views3$s2 === void 0 ? void 0 : _brandConfig$views3$s2.shown) !== false) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "sidebar-skeleton-footer-buttons-button-1"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Animate__WEBPACK_IMPORTED_MODULE_2__["default"], {
    type: 'shine-placeholder',
    className: "shimmer-1 sidebar-skeleton-footer-buttons-button-2"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Animate__WEBPACK_IMPORTED_MODULE_2__["default"], {
    type: 'shine-placeholder',
    className: "shimmer-1 sidebar-skeleton-footer-buttons-button-3"
  }))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SidebarSkeleton);

/***/ })

}]);
//# sourceMappingURL=src_OnboardingSPA_components_Sidebar_components_Customize_Sidebar_js.js.map