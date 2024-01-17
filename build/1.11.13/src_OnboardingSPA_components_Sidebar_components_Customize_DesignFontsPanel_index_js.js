"use strict";
(globalThis["webpackChunknewfold_Onboarding"] = globalThis["webpackChunknewfold_Onboarding"] || []).push([["src_OnboardingSPA_components_Sidebar_components_Customize_DesignFontsPanel_index_js"],{

/***/ "./src/OnboardingSPA/components/Sidebar/components/Customize/DesignFontsPanel/index.js":
/*!*********************************************************************************************!*\
  !*** ./src/OnboardingSPA/components/Sidebar/components/Customize/DesignFontsPanel/index.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _stylesheet_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stylesheet.scss */ "./src/OnboardingSPA/components/Sidebar/components/Customize/DesignFontsPanel/stylesheet.scss");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);








const FontGroup = _ref => {
  let {
    baseClassName,
    group,
    selectedGroup,
    handleGroupSelect
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${baseClassName}__font-group__container`,
    key: group.id
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${baseClassName}__font-group__container__button`,
    role: "presentation",
    onClick: () => handleGroupSelect(group.id)
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Dashicon, {
    className: `${baseClassName}__font-group__container__button__icon`,
    icon: 'yes-alt',
    size: 30,
    style: {
      color: selectedGroup === group.id ? 'var(--nfd-onboarding-sitegen-customize-icon-selected)' : 'var(--nfd-onboarding-sitegen-customize-grey-1)'
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${baseClassName}__font-group__container__button__font-name__container`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: `${baseClassName}__font-group__container__button__font-name__container__heading`,
    style: {
      fontFamily: group.headings
    }
  }, group.headings), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: `${baseClassName}__font-group__container__button__font-name__container__body`,
    style: {
      fontFamily: group.body
    }
  }, group.body)), group.id === 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "default"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Default', 'wp-module-onboarding'))));
};

const CustomFontsForm = _ref2 => {
  let {
    baseClassName,
    customFont,
    setCustomFont,
    handleCancelCustomFonts,
    handleApplyCustomFonts,
    renderFontOptions
  } = _ref2;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${baseClassName}__fonts-form__container`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", {
    className: `${baseClassName}__heading`
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('CUSTOM FONTS', 'wp-module-onboarding')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    htmlFor: "headings"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Headings', 'wp-module-onboarding')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    id: "headings",
    value: customFont.headings,
    onChange: e => setCustomFont({ ...customFont,
      headings: e.target.value
    })
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", null, "select"), renderFontOptions())), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    htmlFor: "body"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Body', 'wp-module-onboarding')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    id: "body",
    value: customFont.body,
    onChange: e => setCustomFont({ ...customFont,
      body: e.target.value
    })
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('select', 'wp-module-onboarding')), renderFontOptions()))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${baseClassName}__fonts-form__container__button__container`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    className: "cancel",
    onClick: () => handleCancelCustomFonts()
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Cancel', 'wp-module-onboarding')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    className: "apply",
    onClick: handleApplyCustomFonts,
    variant: "primary"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Apply', 'wp-module-onboarding')))));
};

const CustomFontsDisplay = _ref3 => {
  let {
    baseClassName,
    selectedGroup,
    selectedCustomFont,
    handleGroupSelect,
    handleEditCustomFont
  } = _ref3;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${baseClassName}__custom-fonts__container`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${baseClassName}__custom-fonts__container__header`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", {
    className: `${baseClassName}__heading`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('CUSTOM FONTS', 'wp-module-onboarding'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => handleEditCustomFont()
  }, "Edit fonts")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${baseClassName}__font-group__container`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${baseClassName}__font-group__container__button`,
    role: "presentation",
    onClick: () => handleGroupSelect('custom')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Dashicon, {
    className: `${baseClassName}__font-group__container__button__icon`,
    icon: 'yes-alt',
    size: 30,
    style: {
      color: selectedGroup === 'custom' ? 'var(--nfd-onboarding-sitegen-customize-icon-selected)' : 'var(--nfd-onboarding-sitegen-customize-grey-1)'
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${baseClassName}__font-group__container__button__font-name__container`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: `${baseClassName}__font-group__container__button__font-name__container__heading`,
    style: {
      fontFamily: selectedCustomFont.headings
    }
  }, selectedCustomFont.headings), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: `${baseClassName}__font-group__container__button__font-name__container__body`,
    style: {
      fontFamily: selectedCustomFont.body
    }
  }, selectedCustomFont.body)))));
};

const DesignFontsPanel = _ref4 => {
  var _design$style, _design$style2, _designStyles$, _designStyles$2, _designStyles$3, _designStyles$4, _designStyles$5, _designStyles$6;

  let {
    baseClassName = 'nfd-onboarding-sidebar--customize__design-fonts-panel'
  } = _ref4;
  const {
    customizeSidebarData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    return {
      customizeSidebarData: select(_store__WEBPACK_IMPORTED_MODULE_4__.store).getCustomizeSidebarData()
    };
  }, []);
  const {
    currentData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    return {
      currentData: select(_store__WEBPACK_IMPORTED_MODULE_4__.store).getCurrentOnboardingData()
    };
  });
  const design = customizeSidebarData === null || customizeSidebarData === void 0 ? void 0 : customizeSidebarData.design;
  const designStyles = customizeSidebarData === null || customizeSidebarData === void 0 ? void 0 : customizeSidebarData.designStyles;
  const {
    setCurrentOnboardingData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_4__.store);
  const fontGroups = [{
    id: 0,
    headings: design === null || design === void 0 ? void 0 : (_design$style = design.style) === null || _design$style === void 0 ? void 0 : _design$style.fonts_heading,
    body: design === null || design === void 0 ? void 0 : (_design$style2 = design.style) === null || _design$style2 === void 0 ? void 0 : _design$style2.fonts_content
  }, {
    id: 1,
    headings: (_designStyles$ = designStyles[1]) === null || _designStyles$ === void 0 ? void 0 : _designStyles$.fonts_heading,
    body: (_designStyles$2 = designStyles[1]) === null || _designStyles$2 === void 0 ? void 0 : _designStyles$2.fonts_content
  }, {
    id: 2,
    headings: (_designStyles$3 = designStyles[2]) === null || _designStyles$3 === void 0 ? void 0 : _designStyles$3.fonts_heading,
    body: (_designStyles$4 = designStyles[2]) === null || _designStyles$4 === void 0 ? void 0 : _designStyles$4.fonts_content
  }, {
    id: 3,
    headings: (_designStyles$5 = designStyles[3]) === null || _designStyles$5 === void 0 ? void 0 : _designStyles$5.fonts_heading,
    body: (_designStyles$6 = designStyles[3]) === null || _designStyles$6 === void 0 ? void 0 : _designStyles$6.fonts_content
  }];
  const [selectedGroup, setSelectedGroup] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [showCustomFonts, setShowCustomFonts] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [customFont, setCustomFont] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
    headings: '',
    body: ''
  });
  const [selectedCustomFont, setSelectedCustomFont] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [isEditingCustomFont, setIsEditingCustomFont] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const fontsHeading = designStyles === null || designStyles === void 0 ? void 0 : designStyles.map(style => style.fonts_heading);
  const fontsContent = designStyles === null || designStyles === void 0 ? void 0 : designStyles.map(style => style.fonts_content);

  const handleUpdatePreviewSettings = () => {
    var _currentData$sitegen, _currentData$sitegen$, _currentData$sitegen$2;

    let headings;
    let body;

    if (selectedGroup === 'custom') {
      headings = customFont.headings;
      body = customFont.body;
    } else {
      headings = fontGroups[selectedGroup].headings;
      body = fontGroups[selectedGroup].body;
    }

    const slug = (_currentData$sitegen = currentData.sitegen) === null || _currentData$sitegen === void 0 ? void 0 : (_currentData$sitegen$ = _currentData$sitegen.homepages) === null || _currentData$sitegen$ === void 0 ? void 0 : (_currentData$sitegen$2 = _currentData$sitegen$.active) === null || _currentData$sitegen$2 === void 0 ? void 0 : _currentData$sitegen$2.slug;

    if (slug) {
      currentData.sitegen.homepages.data[slug] = { ...currentData.sitegen.homepages.data[slug],
        styles: {
          blocks: [{
            'core/heading': {
              typography: {
                fontFamily: headings
              }
            },
            'core/body': {
              typography: {
                fontFamily: body
              }
            }
          }]
        }
      };
      currentData.sitegen.homepages.active = { ...currentData.sitegen.homepages.active,
        styles: {
          blocks: [{
            'core/heading': {
              typography: {
                fontFamily: headings
              }
            },
            'core/body': {
              typography: {
                fontFamily: body
              }
            }
          }]
        }
      };
      setCurrentOnboardingData(currentData);
    }
  };

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (selectedGroup !== null && selectedGroup !== undefined) {
      handleUpdatePreviewSettings();
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [selectedGroup, customFont]);
  const fontOptions = [...new Set([...fontsHeading, ...fontsContent])];

  const handleGroupSelect = groupId => {
    if (groupId !== 'custom' && selectedCustomFont) {
      setShowCustomFonts(false);
    }

    setSelectedGroup(groupId);
  };

  const handleSelectYourOwnFonts = () => {
    setShowCustomFonts(true);

    if (!selectedCustomFont) {
      setIsEditingCustomFont(true);
    }
  };

  const handleEditCustomFont = () => {
    setIsEditingCustomFont(true);
  };

  const handleCancelCustomFonts = () => {
    if (!selectedCustomFont) {
      setShowCustomFonts(false);
    } else {
      setIsEditingCustomFont(false);
    }
  };

  const handleApplyCustomFonts = () => {
    setSelectedGroup(null);
    setSelectedCustomFont(customFont);
    setIsEditingCustomFont(false);
    setSelectedGroup('custom');
  };

  const renderFontOptions = () => {
    return fontOptions.map(font => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      key: font,
      value: font
    }, font));
  };

  const renderFontGroups = () => {
    return fontGroups.map(group => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(FontGroup, {
      baseClassName: baseClassName,
      key: group.id,
      group: group,
      selectedGroup: selectedGroup,
      handleGroupSelect: handleGroupSelect
    }));
  };

  const renderCustomFontsForm = () => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CustomFontsForm, {
      baseClassName: baseClassName,
      customFont: customFont,
      setCustomFont: setCustomFont,
      handleCancelCustomFonts: handleCancelCustomFonts,
      handleApplyCustomFonts: handleApplyCustomFonts,
      renderFontOptions: renderFontOptions
    });
  };

  const renderCustomFontsDisplay = () => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CustomFontsDisplay, {
      baseClassName: baseClassName,
      selectedGroup: selectedGroup,
      selectedCustomFont: selectedCustomFont,
      handleGroupSelect: handleGroupSelect,
      handleEditCustomFont: handleEditCustomFont
    });
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    className: baseClassName,
    initialOpen: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${baseClassName}__container`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${baseClassName}__container__text`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: `${baseClassName}__container__text__heading`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Fonts', 'wp-module-onboarding')))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, renderFontGroups()))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, !showCustomFonts && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${baseClassName}__container`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    onClick: () => {
      handleSelectYourOwnFonts();
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Select your own fonts', 'wp-module-onboarding'))), showCustomFonts && isEditingCustomFont && renderCustomFontsForm(), showCustomFonts && !isEditingCustomFont && renderCustomFontsDisplay()));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DesignFontsPanel);

/***/ }),

/***/ "./src/OnboardingSPA/components/Sidebar/components/Customize/DesignFontsPanel/stylesheet.scss":
/*!****************************************************************************************************!*\
  !*** ./src/OnboardingSPA/components/Sidebar/components/Customize/DesignFontsPanel/stylesheet.scss ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

}]);
//# sourceMappingURL=src_OnboardingSPA_components_Sidebar_components_Customize_DesignFontsPanel_index_js.js.map