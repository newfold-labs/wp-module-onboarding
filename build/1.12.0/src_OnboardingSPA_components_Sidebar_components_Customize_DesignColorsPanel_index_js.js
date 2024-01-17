"use strict";
(globalThis["webpackChunknewfold_Onboarding"] = globalThis["webpackChunknewfold_Onboarding"] || []).push([["src_OnboardingSPA_components_Sidebar_components_Customize_DesignColorsPanel_index_js"],{

/***/ "./src/OnboardingSPA/components/Sidebar/components/Customize/DesignColorsPanel/ColorPaletteIcon/index.js":
/*!***************************************************************************************************************!*\
  !*** ./src/OnboardingSPA/components/Sidebar/components/Customize/DesignColorsPanel/ColorPaletteIcon/index.js ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _stylesheet_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stylesheet.scss */ "./src/OnboardingSPA/components/Sidebar/components/Customize/DesignColorsPanel/ColorPaletteIcon/stylesheet.scss");



const ColorPaletteIcon = _ref => {
  let {
    idx,
    label,
    selectedPalette,
    setSelectedPalette,
    setSelectedColor,
    colors,
    setShowCustomColors = null
  } = _ref;
  const conicGradient = `conic-gradient(${colors[idx].primary} 90deg, ${colors[idx].secondary} 90deg 150deg, ${colors[idx].tertiary} 150deg 330deg, ${colors[idx].primary} 330deg 360deg)`;
  const baseClassName = 'nfd-onboarding-sidebar--customize__color-palette-icon';

  const handleClick = () => {
    setSelectedPalette(idx);
    setSelectedColor(colors[idx]);

    if (setShowCustomColors) {
      setShowCustomColors(false);
    }
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${baseClassName}__container`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    role: "presentation",
    className: `${selectedPalette === idx ? `${baseClassName}__container__icon__selected` : `${baseClassName}__container__icon`}`,
    style: {
      background: conicGradient
    },
    onClick: handleClick
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, label));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ColorPaletteIcon);

/***/ }),

/***/ "./src/OnboardingSPA/components/Sidebar/components/Customize/DesignColorsPanel/CustomColorPalette/index.js":
/*!*****************************************************************************************************************!*\
  !*** ./src/OnboardingSPA/components/Sidebar/components/Customize/DesignColorsPanel/CustomColorPalette/index.js ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _stylesheet_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stylesheet.scss */ "./src/OnboardingSPA/components/Sidebar/components/Customize/DesignColorsPanel/CustomColorPalette/stylesheet.scss");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);






const CustomColorPalette = _ref => {
  let {
    onChange,
    paletteSecondaryColors,
    palettePrimaryColors
  } = _ref;
  const [color, setColor] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(palettePrimaryColors[0].color);
  const baseClassName = 'nfd-onboarding-sidebar--customize__custom-color-palette';
  const colors = [{
    colors: palettePrimaryColors,
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Primary colors', 'wp-module-onboarding')
  }, {
    colors: paletteSecondaryColors,
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Secondary colors', 'wp-module-onboarding')
  }];

  const handleColorChange = newColor => {
    setColor(newColor);
    onChange(newColor);
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Popover, {
    placement: "left"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${baseClassName}__container`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ColorPalette, {
    colors: colors,
    value: color,
    onChange: handleColorChange
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomColorPalette);

/***/ }),

/***/ "./src/OnboardingSPA/components/Sidebar/components/Customize/DesignColorsPanel/index.js":
/*!**********************************************************************************************!*\
  !*** ./src/OnboardingSPA/components/Sidebar/components/Customize/DesignColorsPanel/index.js ***!
  \**********************************************************************************************/
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
/* harmony import */ var _ColorPickerButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../ColorPickerButton */ "./src/OnboardingSPA/components/ColorPickerButton/index.js");
/* harmony import */ var _ColorPaletteIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ColorPaletteIcon */ "./src/OnboardingSPA/components/Sidebar/components/Customize/DesignColorsPanel/ColorPaletteIcon/index.js");
/* harmony import */ var _CustomColorPalette__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./CustomColorPalette */ "./src/OnboardingSPA/components/Sidebar/components/Customize/DesignColorsPanel/CustomColorPalette/index.js");
/* harmony import */ var _stylesheet_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./stylesheet.scss */ "./src/OnboardingSPA/components/Sidebar/components/Customize/DesignColorsPanel/stylesheet.scss");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__);











const DesignColorsPanel = _ref => {
  let {
    baseClassName = 'nfd-onboarding-sidebar--customize__design-colors-panel',
    heading
  } = _ref;
  const {
    customizeSidebarData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    return {
      customizeSidebarData: select(_store__WEBPACK_IMPORTED_MODULE_7__.store).getCustomizeSidebarData()
    };
  }, []);
  const {
    currentData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    return {
      currentData: select(_store__WEBPACK_IMPORTED_MODULE_7__.store).getCurrentOnboardingData()
    };
  });
  const design = customizeSidebarData === null || customizeSidebarData === void 0 ? void 0 : customizeSidebarData.design;
  const colorPalettes = customizeSidebarData === null || customizeSidebarData === void 0 ? void 0 : customizeSidebarData.colorPalettes;
  const palettePrimaryColors = Object.entries(design === null || design === void 0 ? void 0 : design.color_palette).map(_ref2 => {
    let [, color] = _ref2;
    return {
      name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Custom', 'wp-module-onboarding'),
      color
    };
  });
  const defaultColors = {
    primary: design === null || design === void 0 ? void 0 : design.color_palette.primary,
    secondary: (design === null || design === void 0 ? void 0 : design.color_palette.secondary) || (design === null || design === void 0 ? void 0 : design.color_palette.primary),
    tertiary: (design === null || design === void 0 ? void 0 : design.color_palette.tertiary) || (design === null || design === void 0 ? void 0 : design.color_palette.primary)
  };
  const palettes = [];
  colorPalettes.slice(1, 5).forEach(palette => {
    palettes.push({
      primary: palette === null || palette === void 0 ? void 0 : palette.primary,
      secondary: (palette === null || palette === void 0 ? void 0 : palette.secondary) || (palette === null || palette === void 0 ? void 0 : palette.primary),
      tertiary: (palette === null || palette === void 0 ? void 0 : palette.tertiary) || (palette === null || palette === void 0 ? void 0 : palette.primary)
    });
  });
  const [colors] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([defaultColors, ...palettes]);
  const [selectedColor, setSelectedColor] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [showCustomColors, setShowCustomColors] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [isEditingCustomColors, setIsEditingCustomColors] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [selectedCustomColors, setSelectedCustomColors] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [selectedPalette, setSelectedPalette] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [colorPickerCalledBy, setColorPickerCalledBy] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [showColorPicker, setShowColorPicker] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const customPaletteId = colors.length - 1;
  const paletteSecondaryColors = Object.entries(colorPalettes[1]).map(_ref3 => {
    let [name, color] = _ref3;

    if (name !== 'name') {
      return {
        name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Custom', 'wp-module-onboarding'),
        color
      };
    }

    return null;
  }).filter(Boolean);

  const handleApplyCustomColors = () => {
    setSelectedCustomColors(true);
    setIsEditingCustomColors(false);
    setSelectedPalette(customPaletteId);
    colors[selectedPalette] = selectedColor;
  };

  const handleEditCustomColors = () => {
    setSelectedPalette(customPaletteId);
    setSelectedColor(colors[customPaletteId]);
    setIsEditingCustomColors(true);
  };

  const handleColorPickerButton = colorType => {
    setShowColorPicker(!showColorPicker);
    setColorPickerCalledBy(!showColorPicker ? colorType : '');
  };

  const handleColorPicker = color => {
    const updatedColor = { ...selectedColor
    };
    updatedColor[colorPickerCalledBy] = color;
    setSelectedColor(updatedColor);
  };

  const {
    setCurrentOnboardingData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_7__.store);

  const convertColorSchema = inputObject => {
    const outputArray = [];

    for (const key in inputObject) {
      if (Object.prototype.hasOwnProperty.call(inputObject, key)) {
        const slug = key.replace(/_/g, '-');
        const color = inputObject[key];
        const name = key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        outputArray.push({
          slug,
          color,
          name
        });
      }
    }

    return outputArray;
  };

  const handleUpdatePreviewSettings = () => {
    var _currentData$sitegen, _currentData$sitegen$, _currentData$sitegen$2;

    colorPalettes[selectedPalette].primary = selectedColor.primary;
    colorPalettes[selectedPalette].secondary = selectedColor.secondary;
    colorPalettes[selectedPalette].tertiary = selectedColor.tertiary;
    const slug = (_currentData$sitegen = currentData.sitegen) === null || _currentData$sitegen === void 0 ? void 0 : (_currentData$sitegen$ = _currentData$sitegen.homepages) === null || _currentData$sitegen$ === void 0 ? void 0 : (_currentData$sitegen$2 = _currentData$sitegen$.active) === null || _currentData$sitegen$2 === void 0 ? void 0 : _currentData$sitegen$2.slug;

    if (slug) {
      currentData.sitegen.homepages.data[slug].color.palette = convertColorSchema(colorPalettes[selectedPalette]);
      currentData.sitegen.homepages.active.color.palette = convertColorSchema(colorPalettes[selectedPalette]);
      setCurrentOnboardingData(currentData);
    }
  };

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (selectedColor && selectedPalette) {
      handleUpdatePreviewSettings();
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [selectedColor, selectedPalette]);

  const renderCustomColorsPalette = () => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: `${baseClassName}__custom-color-palette__container`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: `${baseClassName}__custom-color-palette__container__header`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", {
      className: `${baseClassName}__heading`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('CUSTOM COLORS', 'wp-module-onboarding'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      onClick: () => handleEditCustomColors()
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Edit colors', 'wp-module-onboarding'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        marginLeft: '5px'
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ColorPaletteIcon__WEBPACK_IMPORTED_MODULE_4__["default"], {
      key: customPaletteId,
      idx: customPaletteId,
      selectedPalette: selectedPalette,
      setSelectedPalette: setSelectedPalette,
      setSelectedColor: setSelectedColor,
      colors: colors
    })));
  };

  const renderCustomColorPicker = () => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: `${baseClassName}__custom__colors__container`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", {
      className: `${baseClassName}__heading`
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('CUSTOM COLORS', 'wp-module-onboarding')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, ['primary', 'secondary', 'tertiary'].map((colorType, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ColorPickerButton__WEBPACK_IMPORTED_MODULE_3__["default"], {
      key: index,
      isColorSelected: selectedColor,
      color: selectedColor[colorType],
      slug: colorType,
      name: colorType.charAt(0).toUpperCase() + colorType.slice(1),
      callback: handleColorPickerButton
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: `${baseClassName}__custom__colors__container__buttons`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      onClick: () => handleCancelCustomColors(),
      className: 'cancel'
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Cancel', 'wp-module-onboarding')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      onClick: handleApplyCustomColors,
      variant: "primary"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Apply', 'wp-module-onboarding'))), showColorPicker && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_CustomColorPalette__WEBPACK_IMPORTED_MODULE_5__["default"], {
      onChange: handleColorPicker,
      palettePrimaryColors: palettePrimaryColors,
      paletteSecondaryColors: paletteSecondaryColors
    }));
  };

  const handlePickYourOwnColors = () => {
    setSelectedPalette(customPaletteId);
    setSelectedColor(colors[customPaletteId]);
    setShowCustomColors(true);

    if (!selectedCustomColors) {
      setIsEditingCustomColors(true);
    }
  };

  const handleCancelCustomColors = () => {
    if (!selectedCustomColors) {
      setShowCustomColors(false);
    } else {
      setIsEditingCustomColors(false);
    }
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
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, heading)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${baseClassName}__container__color__palette__icon`
  }, colors.slice(0, 4).map((elem, idx) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ColorPaletteIcon__WEBPACK_IMPORTED_MODULE_4__["default"], {
    key: idx,
    idx: idx,
    label: idx === 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Default', 'wp-module-onboarding') : '',
    selectedPalette: selectedPalette,
    setSelectedPalette: setSelectedPalette,
    setSelectedColor: setSelectedColor,
    colors: colors,
    setShowCustomColors: setShowCustomColors
  })))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, !showCustomColors && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${baseClassName}__custom__colors__button__container`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    onClick: () => handlePickYourOwnColors()
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Pick your own colors', 'wp-module-onboarding'))), showCustomColors && isEditingCustomColors && renderCustomColorPicker(), showCustomColors && !isEditingCustomColors && renderCustomColorsPalette()));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DesignColorsPanel);

/***/ }),

/***/ "./src/OnboardingSPA/components/Sidebar/components/Customize/DesignColorsPanel/ColorPaletteIcon/stylesheet.scss":
/*!**********************************************************************************************************************!*\
  !*** ./src/OnboardingSPA/components/Sidebar/components/Customize/DesignColorsPanel/ColorPaletteIcon/stylesheet.scss ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/OnboardingSPA/components/Sidebar/components/Customize/DesignColorsPanel/CustomColorPalette/stylesheet.scss":
/*!************************************************************************************************************************!*\
  !*** ./src/OnboardingSPA/components/Sidebar/components/Customize/DesignColorsPanel/CustomColorPalette/stylesheet.scss ***!
  \************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/OnboardingSPA/components/Sidebar/components/Customize/DesignColorsPanel/stylesheet.scss":
/*!*****************************************************************************************************!*\
  !*** ./src/OnboardingSPA/components/Sidebar/components/Customize/DesignColorsPanel/stylesheet.scss ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

}]);
//# sourceMappingURL=src_OnboardingSPA_components_Sidebar_components_Customize_DesignColorsPanel_index_js.js.map