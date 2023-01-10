"use strict";
(self["webpackChunknewfold_Onboarding"] = self["webpackChunknewfold_Onboarding"] || []).push([["src_OnboardingSPA_pages_Steps_BasicInfo_index_js"],{

/***/ "./src/OnboardingSPA/components/HeadingWithSubHeading/index.js":
/*!*********************************************************************!*\
  !*** ./src/OnboardingSPA/components/HeadingWithSubHeading/index.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);


/**
 * Interface Cards with standard design.
 *
 * @returns
 */

const HeadingWithSubHeading = _ref => {
  let {
    title,
    subtitle
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-main-heading"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "nfd-main-heading__title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(title, "wp-module-onboarding")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "nfd-main-heading__subtitle"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(subtitle, "wp-module-onboarding")));
};

/* harmony default export */ __webpack_exports__["default"] = (HeadingWithSubHeading);

/***/ }),

/***/ "./src/OnboardingSPA/components/ImageUploader/index.js":
/*!*************************************************************!*\
  !*** ./src/OnboardingSPA/components/ImageUploader/index.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Loaders__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Loaders */ "./src/OnboardingSPA/components/Loaders/index.js");
/* harmony import */ var _utils_api_uploader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/api/uploader */ "./src/OnboardingSPA/utils/api/uploader.js");





/*
* Image Uploader
*
*/

const ImageUploader = _ref => {
  let {
    icon,
    iconSetter
  } = _ref;
  const inputRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const [isUploading, setIsUploading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);

  async function updateItem(fileData) {
    if (fileData) {
      setIsUploading(true);
      const res = await (0,_utils_api_uploader__WEBPACK_IMPORTED_MODULE_3__.uploadImage)(fileData);

      if (res) {
        var _res$body, _res$body2;

        const id = res === null || res === void 0 ? void 0 : (_res$body = res.body) === null || _res$body === void 0 ? void 0 : _res$body.id;
        const url = res === null || res === void 0 ? void 0 : (_res$body2 = res.body) === null || _res$body2 === void 0 ? void 0 : _res$body2.source_url;
        iconSetter({
          id,
          url
        });
      } else console.error('Image Upload Failed');
    } else console.error('No File Attached');

    setIsUploading(false);
  }

  const handleClick = () => {
    inputRef === null || inputRef === void 0 ? void 0 : inputRef.current.click();
  };

  const imageChange = e => {
    var _e$target, _e$target2;

    if (e !== null && e !== void 0 && (_e$target = e.target) !== null && _e$target !== void 0 && _e$target.files && (e === null || e === void 0 ? void 0 : (_e$target2 = e.target) === null || _e$target2 === void 0 ? void 0 : _e$target2.files.length) > 0) {
      var _e$target3;

      updateItem(e === null || e === void 0 ? void 0 : (_e$target3 = e.target) === null || _e$target3 === void 0 ? void 0 : _e$target3.files[0]);
    }
  };

  const removeSelectedImage = () => {
    var _inputRef$current;

    iconSetter(0);

    if ((inputRef === null || inputRef === void 0 ? void 0 : (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.files.length) > 0) {
      inputRef.current.value = "";
    }
  };

  function loader() {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "image-uploader_window"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Loaders__WEBPACK_IMPORTED_MODULE_2__.ImageUploadLoader, null));
  }

  function getImageUploadWindow() {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "image-uploader_window"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "image-uploader_window-empty"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "image-uploader_window-logo"
    }, (icon == 0 || icon == undefined) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "image-uploader_window-logo-icon-empty"
    }), icon != 0 && icon != undefined && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      className: "image-uploader_window-logo-icon-selected",
      src: icon.url,
      alt: "Thumb"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "image-uploader_window-reset"
    }, icon != 0 && icon != undefined && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      className: "image-uploader_window-reset-btn",
      onClick: removeSelectedImage
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("RESET", 'wp-module-onboarding')), (icon == 0 || icon == undefined) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      className: "image-uploader_window-reset-btn",
      onClick: handleClick
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("UPLOAD", 'wp-module-onboarding')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      className: "image-uploader_window-select-btn",
      accept: "image/*",
      type: "file",
      ref: inputRef,
      onChange: imageChange
    })));
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "image-uploader"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "image-uploader_heading"
  }, "Logo"), isUploading ? loader() : getImageUploadWindow());
};

/* harmony default export */ __webpack_exports__["default"] = (ImageUploader);

/***/ }),

/***/ "./src/OnboardingSPA/components/Layouts/Base.js":
/*!******************************************************!*\
  !*** ./src/OnboardingSPA/components/Layouts/Base.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_a11y__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/a11y */ "@wordpress/a11y");
/* harmony import */ var _wordpress_a11y__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_a11y__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../constants */ "./src/constants.js");
/* harmony import */ var _utils_api_events__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/api/events */ "./src/OnboardingSPA/utils/api/events.js");







/**
 * The Base Layout has no prescribed styles, only shared functionality like focus-management and analytics.
 *
 * @param {object} props
 * @returns
 */

const BaseLayout = _ref => {
  let {
    className = 'nfd-onboarding-layout__base',
    children
  } = _ref;
  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_5__.useLocation)();
  const mainContainer = document.querySelector('.nfd-onboard-content');

  const speakRouteTitle = function (location) {
    let title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Showing new Onboarding Page';
    // [TODO]: Determine if some routes should not speak the title
    (0,_wordpress_a11y__WEBPACK_IMPORTED_MODULE_2__.speak)(title, 'assertive');
  };

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    mainContainer === null || mainContainer === void 0 ? void 0 : mainContainer.focus({
      preventScroll: true
    });
    speakRouteTitle(location, 'Override');
    new _utils_api_events__WEBPACK_IMPORTED_MODULE_4__["default"](`${_constants__WEBPACK_IMPORTED_MODULE_3__.NFD_ONBOARDING_EVENT_PREFIX}-pageview`, {
      stepID: location.pathname,
      previousStepID: window.nfdOnboarding.previousStepID
    }).send();
    window.nfdOnboarding.previousStepID = location.pathname;
  }, [location.pathname]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('nfd-onboarding-layout', className)
  }, children);
};

/* harmony default export */ __webpack_exports__["default"] = (BaseLayout);

/***/ }),

/***/ "./src/OnboardingSPA/components/Layouts/Common.js":
/*!********************************************************!*\
  !*** ./src/OnboardingSPA/components/Layouts/Common.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Base */ "./src/OnboardingSPA/components/Layouts/Base.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);





/**
 *
 * @param {*} param0
 * @returns
 */

const InnerContainer = _ref => {
  let {
    children
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: "is-contained"
  }, children);
};
/**
 * The Common Layout extends the Base Layout and applies structural styles and animations.
 *
 * @param {object} props
 * @returns
 */


const CommonLayout = _ref2 => {
  let {
    className = '',
    children,
    isBgPrimary = false,
    isCentered = false,
    isVerticallyCentered = false,
    isContained = false,
    isPadded = false,
    isFadeIn = true
  } = _ref2;
  const Container = isContained ? InnerContainer : _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Base__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()('nfd-onboarding-layout__common', className, {
      'is-layout-fade-in': isFadeIn
    }, {
      'is-bg-primary': isBgPrimary
    }, {
      'is-centered': isCentered
    }, {
      'is-vertically-centered': isVerticallyCentered
    }, {
      'is-padded': isPadded
    })
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Container, null, children));
};

/* harmony default export */ __webpack_exports__["default"] = (CommonLayout);

/***/ }),

/***/ "./src/OnboardingSPA/components/Loaders/ImageUpload/index.js":
/*!*******************************************************************!*\
  !*** ./src/OnboardingSPA/components/Loaders/ImageUpload/index.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


const ImageUploadLoader = () => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "image-upload-loader--loading-box"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "image-upload-loader--loading-box__loader"
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (ImageUploadLoader);

/***/ }),

/***/ "./src/OnboardingSPA/components/Loaders/Step/index.js":
/*!************************************************************!*\
  !*** ./src/OnboardingSPA/components/Loaders/Step/index.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Layouts_Common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Layouts/Common */ "./src/OnboardingSPA/components/Layouts/Common.js");
/* harmony import */ var _HeadingWithSubHeading__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../HeadingWithSubHeading */ "./src/OnboardingSPA/components/HeadingWithSubHeading/index.js");
/* harmony import */ var _NeedHelpTag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../NeedHelpTag */ "./src/OnboardingSPA/components/NeedHelpTag/index.js");





const StepLoader = _ref => {
  let {
    title,
    subtitle
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Layouts_Common__WEBPACK_IMPORTED_MODULE_1__["default"], {
    className: "step-loader",
    isVerticallyCentered: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_HeadingWithSubHeading__WEBPACK_IMPORTED_MODULE_2__["default"], {
    title: title,
    subtitle: subtitle
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "step-loader__logo-container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "step-loader__logo"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_NeedHelpTag__WEBPACK_IMPORTED_MODULE_3__["default"], null));
};

/* harmony default export */ __webpack_exports__["default"] = (StepLoader);

/***/ }),

/***/ "./src/OnboardingSPA/components/Loaders/index.js":
/*!*******************************************************!*\
  !*** ./src/OnboardingSPA/components/Loaders/index.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageUploadLoader": function() { return /* reexport safe */ _ImageUpload__WEBPACK_IMPORTED_MODULE_1__["default"]; },
/* harmony export */   "StepLoader": function() { return /* reexport safe */ _Step__WEBPACK_IMPORTED_MODULE_0__["default"]; }
/* harmony export */ });
/* harmony import */ var _Step__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Step */ "./src/OnboardingSPA/components/Loaders/Step/index.js");
/* harmony import */ var _ImageUpload__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ImageUpload */ "./src/OnboardingSPA/components/Loaders/ImageUpload/index.js");



/***/ }),

/***/ "./src/OnboardingSPA/components/MiniPreview/index.js":
/*!***********************************************************!*\
  !*** ./src/OnboardingSPA/components/MiniPreview/index.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _miniPreview_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./miniPreview.json */ "./src/OnboardingSPA/components/MiniPreview/miniPreview.json");
/* harmony import */ var _utils_locales_translations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/locales/translations */ "./src/OnboardingSPA/utils/locales/translations.js");





/**
 * A Mini Preview Section.
 *
 * @returns
 */

const MiniPreview = _ref => {
  let {
    title,
    desc,
    icon,
    socialData,
    isSocialFormOpen,
    setIsSocialFormOpen
  } = _ref;
  var iconPreview = icon == "" || icon == undefined ? _miniPreview_json__WEBPACK_IMPORTED_MODULE_2__.icon : icon;
  var titlePreview = title == "" ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(_miniPreview_json__WEBPACK_IMPORTED_MODULE_2__.title, 'wp-module-onboarding'), (0,_utils_locales_translations__WEBPACK_IMPORTED_MODULE_3__.translations)('Site')) : title;
  var descPreview = desc == "" ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(_miniPreview_json__WEBPACK_IMPORTED_MODULE_2__.desc, 'wp-module-onboarding'), (0,_utils_locales_translations__WEBPACK_IMPORTED_MODULE_3__.translations)('Site')) : desc;
  var urlPreview = title == "" ? _miniPreview_json__WEBPACK_IMPORTED_MODULE_2__.url : titleToUrl(title);
  const [facebook, setFacebook] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const [twitter, setTwitter] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const [instagram, setInstagram] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const [youtube, setYouTube] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const [linkedin, setLinkedIn] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const [yelp, setYelp] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const [tiktok, setTikTok] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    var _socialData$facebook_, _socialData$twitter_s, _socialData$instagram, _socialData$youtube_u, _socialData$linkedin_;

    setFacebook((_socialData$facebook_ = socialData === null || socialData === void 0 ? void 0 : socialData.facebook_site) !== null && _socialData$facebook_ !== void 0 ? _socialData$facebook_ : "");
    setTwitter((_socialData$twitter_s = socialData === null || socialData === void 0 ? void 0 : socialData.twitter_site) !== null && _socialData$twitter_s !== void 0 ? _socialData$twitter_s : "");
    setInstagram((_socialData$instagram = socialData === null || socialData === void 0 ? void 0 : socialData.instagram_url) !== null && _socialData$instagram !== void 0 ? _socialData$instagram : "");
    setYouTube((_socialData$youtube_u = socialData === null || socialData === void 0 ? void 0 : socialData.youtube_url) !== null && _socialData$youtube_u !== void 0 ? _socialData$youtube_u : "");
    setLinkedIn((_socialData$linkedin_ = socialData === null || socialData === void 0 ? void 0 : socialData.linkedin_url) !== null && _socialData$linkedin_ !== void 0 ? _socialData$linkedin_ : "");

    if (Object.keys(socialData).includes("other_social_urls")) {
      var _otherURLS$yelp_url, _otherURLS$tiktok_url;

      const otherURLS = socialData.other_social_urls;
      if (Object.keys(otherURLS).includes("yelp_url")) setYelp((_otherURLS$yelp_url = otherURLS["yelp_url"]) !== null && _otherURLS$yelp_url !== void 0 ? _otherURLS$yelp_url : "");
      if (Object.keys(otherURLS).includes("tiktok_url")) setTikTok((_otherURLS$tiktok_url = otherURLS["tiktok_url"]) !== null && _otherURLS$tiktok_url !== void 0 ? _otherURLS$tiktok_url : "");
    }
  }, [socialData]);

  const isValidUrl = urlString => {
    let url;

    try {
      url = new URL(urlString);
    } catch (e) {
      return false;
    }

    if (url.protocol !== "http:" && url.protocol !== "https:") return false;
    return true;
  };

  var socialDataset = [{
    url: facebook,
    image: 'var(--facebook-colored-icon)'
  }, {
    url: twitter,
    image: 'var(--twitter-colored-icon)'
  }, {
    url: instagram,
    image: 'var(--instagram-colored-icon)'
  }, {
    url: youtube,
    image: 'var(--youtube-colored-icon)'
  }, {
    url: linkedin,
    image: 'var(--linkedin-colored-icon)'
  }, {
    url: yelp,
    image: 'var(--yelp-colored-icon)'
  }, {
    url: tiktok,
    image: 'var(--tiktok-colored-icon)'
  }];

  function titleToUrl(title) {
    return `https://${title === null || title === void 0 ? void 0 : title.toLowerCase().replace(/\s/g, '').replace(/\W/g, '')}.com`;
  }

  function socialIconList() {
    return socialDataset.map(socialInfo => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        key: socialInfo.image,
        onClick: e => setIsSocialFormOpen(!isSocialFormOpen),
        className: `browser-content_social_icon ${socialInfo.url ? isValidUrl(socialInfo.url) || '--invalid-url' : '--no-url'}`,
        style: {
          backgroundImage: socialInfo.image
        }
      });
    });
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "mini-preview"
  }, "Preview"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "browser-container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "browser-row-title"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "browser-row-title_main"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "browser-row-title_buttons"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "browser-dot",
    style: {
      background: '#ED594A'
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "browser-dot",
    style: {
      background: '#FDD800'
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "browser-dot",
    style: {
      background: '#5AC05A'
    }
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "browser-row-title_bar"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "browser-row-title_bar_before"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "browser-row-title_bar_before-curve"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "browser-row-title_bar_main"
  }, (icon == 0 || icon == undefined) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "browser-icon-title",
    style: {
      content: 'var(--default-logo-icon)'
    }
  }), icon != 0 && icon != undefined && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    className: "browser-icon-title",
    src: iconPreview.url,
    alt: "Thumb"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "browser-row-title_bar_main-text"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(titlePreview === null || titlePreview === void 0 ? void 0 : titlePreview.substring(0, 20), 'wp-module-onboarding')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "browser-row-title_bar_main-cross"
  }, "x")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "browser-row-title_bar_after"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "browser-row-title_bar_after-curve"
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "browser-row-search"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "browser-row-search__icons"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "browser-icon",
    style: {
      backgroundImage: 'var(--back-icon)'
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "browser-icon",
    style: {
      backgroundImage: 'var(--forward-icon)'
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "browser-icon",
    style: {
      backgroundImage: 'var(--reload-icon)'
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "browser-row-search__search-box"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    className: "browser-row-search__search-box_input",
    type: "text",
    onChange: e => {},
    value: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(urlPreview, 'wp-module-onboarding')
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "browser-row-search__more"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "browser-icon",
    style: {
      backgroundImage: 'var(--more-icon)'
    }
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "browser-content"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "browser-content_top-row"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "browser-content_top-row-name"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(titlePreview, 'wp-module-onboarding')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: "browser-content_top-row-link"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(urlPreview, 'wp-module-onboarding'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", {
    className: "browser-content_desc"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(descPreview, 'wp-module-onboarding')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "browser-content_social"
  }, socialIconList()))));
};

/* harmony default export */ __webpack_exports__["default"] = (MiniPreview);

/***/ }),

/***/ "./src/OnboardingSPA/components/NeedHelpTag/index.js":
/*!***********************************************************!*\
  !*** ./src/OnboardingSPA/components/NeedHelpTag/index.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);




/**
 * Need Help Label and URL rendering component for most of the onboarding steps
 * Pass any Label and URL redirect which we want as is to display on the UI
 *
 * @param  content
 * @return NeedHelpTag
 */

const NeedHelpTag = _ref => {
  let {
    question = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Need Help?', 'wp-module-onboarding'),
    urlLabel = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Hire our Experts', 'wp-module-onboarding')
  } = _ref;
  const hireExpertsUrl = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.select)(_store__WEBPACK_IMPORTED_MODULE_1__.store).getHireExpertsUrl();
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-card-need-help-tag"
  }, question, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: hireExpertsUrl,
    target: '_blank'
  }, urlLabel));
};

/* harmony default export */ __webpack_exports__["default"] = (NeedHelpTag);

/***/ }),

/***/ "./src/OnboardingSPA/components/SkipButton/index.js":
/*!**********************************************************!*\
  !*** ./src/OnboardingSPA/components/SkipButton/index.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/index.js");
/* harmony import */ var _utils_api_flow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/api/flow */ "./src/OnboardingSPA/utils/api/flow.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _utils_api_settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/api/settings */ "./src/OnboardingSPA/utils/api/settings.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../constants */ "./src/constants.js");









/**
 * Interface Text Inputs with standard design.
 *
 * @returns
 */

const SkipButton = () => {
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_8__.useNavigate)();
  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_8__.useLocation)();
  const {
    previousStep,
    nextStep,
    currentData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    return {
      previousStep: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getPreviousStep(),
      nextStep: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getNextStep(),
      currentData: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getCurrentOnboardingData()
    };
  }, []);
  const isFirstStep = null === previousStep || false === previousStep;
  const isLastStep = null === nextStep || false === nextStep;

  async function syncSocialSettingsFinish(currentData) {
    var _currentData$data;

    const initialData = await (0,_utils_api_settings__WEBPACK_IMPORTED_MODULE_6__.getSettings)();
    const result = await (0,_utils_api_settings__WEBPACK_IMPORTED_MODULE_6__.setSettings)(currentData === null || currentData === void 0 ? void 0 : (_currentData$data = currentData.data) === null || _currentData$data === void 0 ? void 0 : _currentData$data.socialData);

    if ((result === null || result === void 0 ? void 0 : result.error) != null) {
      console.error('Unable to Save Social Data!');
      return initialData === null || initialData === void 0 ? void 0 : initialData.body;
    }

    return result === null || result === void 0 ? void 0 : result.body;
  }

  async function saveData(path, currentData) {
    if (currentData) {
      currentData.isComplete = new Date().getTime(); // If Social Data is changed then sync it

      if (path !== null && path !== void 0 && path.includes('basic-info')) {
        const socialData = await syncSocialSettingsFinish(currentData); // If Social Data is changed then Sync that also to the store

        if (socialData && currentData !== null && currentData !== void 0 && currentData.data) currentData.data.socialData = socialData;
      }

      (0,_utils_api_flow__WEBPACK_IMPORTED_MODULE_4__.setFlow)(currentData);
    } // Redirect to Admin Page for normal customers 
    // and Bluehost Dashboard for ecommerce customers


    const exitLink = exitToWordpressForEcommerce() ? _constants__WEBPACK_IMPORTED_MODULE_7__.bluehostDashboardPage : _constants__WEBPACK_IMPORTED_MODULE_7__.wpAdminPage;
    window.location.replace(exitLink);
  }

  function skipStep() {
    if (isLastStep) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
        className: "skip-button",
        onClick: e => saveData(location.pathname, currentData)
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Skip this Step', 'wp-module-onboarding'));
    } else {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
        className: "skip-button",
        onClick: e => navigate(nextStep.path)
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Skip this Step', 'wp-module-onboarding'));
    }
  }

  return skipStep();
};
/*
 * check if this is the last step 
 */


const exitToWordpressForEcommerce = () => {
  if (window.nfdOnboarding.currentFlow == 'ecommerce') {
    return true;
  }

  return false;
};

/* harmony default export */ __webpack_exports__["default"] = (SkipButton);

/***/ }),

/***/ "./src/OnboardingSPA/components/SocialMediaForm/index.js":
/*!***************************************************************!*\
  !*** ./src/OnboardingSPA/components/SocialMediaForm/index.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Tooltip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../Tooltip */ "./src/OnboardingSPA/components/Tooltip/index.js");






const SocialMediaForm = _ref => {
  let {
    socialData,
    setSocialData,
    setIsValidSocials,
    isSocialFormOpen,
    setIsSocialFormOpen
  } = _ref;
  const [facebook, setFacebook] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const [twitter, setTwitter] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const [instagram, setInstagram] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const [youtube, setYouTube] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const [linkedin, setLinkedIn] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const [yelp, setYelp] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const [tiktok, setTikTok] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const [activeError, setActiveError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const SocialMediaSites = {
    FACEBOOK: 'facebook',
    TWITTER: 'twitter',
    INSTAGRAM: 'instagram',
    YOUTUBE: 'youtube',
    LINKEDIN: 'linkedin',
    YELP: 'yelp',
    TIKTOK: 'tiktok'
  };
  const SocialMediaStates = {
    FACEBOOK: facebook,
    TWITTER: twitter,
    INSTAGRAM: instagram,
    YOUTUBE: youtube,
    LINKEDIN: linkedin,
    YELP: yelp,
    TIKTOK: tiktok
  };
  var socialMediaDB = {
    "facebook_site": facebook,
    "twitter_site": twitter,
    "instagram_url": instagram,
    "youtube_url": youtube,
    "linkedin_url": linkedin,
    "other_social_urls": {
      "yelp_url": yelp,
      "tiktok_url": tiktok
    }
  };
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    var _socialData$facebook_, _socialData$twitter_s, _socialData$instagram, _socialData$youtube_u, _socialData$linkedin_;

    setFacebook((_socialData$facebook_ = socialData === null || socialData === void 0 ? void 0 : socialData.facebook_site) !== null && _socialData$facebook_ !== void 0 ? _socialData$facebook_ : "");
    setTwitter((_socialData$twitter_s = socialData === null || socialData === void 0 ? void 0 : socialData.twitter_site) !== null && _socialData$twitter_s !== void 0 ? _socialData$twitter_s : "");
    setInstagram((_socialData$instagram = socialData === null || socialData === void 0 ? void 0 : socialData.instagram_url) !== null && _socialData$instagram !== void 0 ? _socialData$instagram : "");
    setYouTube((_socialData$youtube_u = socialData === null || socialData === void 0 ? void 0 : socialData.youtube_url) !== null && _socialData$youtube_u !== void 0 ? _socialData$youtube_u : "");
    setLinkedIn((_socialData$linkedin_ = socialData === null || socialData === void 0 ? void 0 : socialData.linkedin_url) !== null && _socialData$linkedin_ !== void 0 ? _socialData$linkedin_ : "");

    if (Object.keys(socialData).includes("other_social_urls")) {
      var _otherURLS$yelp_url, _otherURLS$tiktok_url;

      const otherURLS = socialData.other_social_urls;
      if (Object.keys(otherURLS).includes("yelp_url")) setYelp((_otherURLS$yelp_url = otherURLS["yelp_url"]) !== null && _otherURLS$yelp_url !== void 0 ? _otherURLS$yelp_url : "");
      if (Object.keys(otherURLS).includes("tiktok_url")) setTikTok((_otherURLS$tiktok_url = otherURLS["tiktok_url"]) !== null && _otherURLS$tiktok_url !== void 0 ? _otherURLS$tiktok_url : "");
    }
  }, [socialData]);

  const isValidUrl = urlString => {
    let url;

    try {
      url = new URL(urlString);
    } catch (e) {
      return false;
    }

    return url.protocol !== "http:" && url.protocol !== "https:" ? false : true;
  };

  const checkValidUrl = function (socialInput, data) {
    let errorResolved = false;

    switch (socialInput) {
      case SocialMediaSites.TWITTER:
        data = data.substring(data.indexOf('@') + 1);

        if (isValidTwitterHandle(data) || isValidTwitterUrl(data)) {
          // check for @handle and twitter url
          errorResolved = true;
        }

        break;

      default:
        if (isValidUrl(data)) {
          errorResolved = true;
        }

        break;
    }

    if (errorResolved) {
      var activeErrorFiltered = activeError.filter(function (item) {
        return item !== socialInput;
      });
      setActiveError(activeErrorFiltered);
    } else {
      if (!activeError.includes(socialInput)) {
        setActiveError([...activeError, socialInput]);
      }
    }

    setDataAndActiveErrorState(data, socialInput, activeError);
  };

  const setDataAndActiveErrorState = (data, socialInput, activeError) => {
    if (!data) {
      var activeErrorFiltered = activeError.filter(function (item) {
        return item !== socialInput;
      });
      setActiveError(activeErrorFiltered);
    }

    activeError.length == 0 ? setIsValidSocials(true) : setIsValidSocials(false);
  };

  const isValidTwitterHandle = handle => {
    return handle.match(`^[A-Za-z0-9_]{1,25}$`) ? true : false;
  };

  const isValidTwitterUrl = url => {
    return url.match(`^http(?:s)?:\/\/(?:www\.)?twitter\.com\/([A-Za-z0-9_]{1,25})\/?$`) ? true : false;
  };

  const checkValidUrlDebounce = lodash__WEBPACK_IMPORTED_MODULE_1___default().debounce(checkValidUrl, 1000);

  const handleAccordion = e => {
    setIsSocialFormOpen(!isSocialFormOpen);
  };

  const handleChange = e => {
    const value = e.target.value;
    const triggerID = e.target.id;

    switch (triggerID) {
      case SocialMediaSites.FACEBOOK:
        checkValidUrlDebounce(SocialMediaSites.FACEBOOK, value);
        setFacebook(value);
        socialMediaDB.facebook_site = value;
        break;

      case SocialMediaSites.TWITTER:
        checkValidUrlDebounce(SocialMediaSites.TWITTER, value);
        setTwitter(value);
        socialMediaDB.twitter_site = value;
        break;

      case SocialMediaSites.INSTAGRAM:
        checkValidUrlDebounce(SocialMediaSites.INSTAGRAM, value);
        setInstagram(value);
        socialMediaDB.instagram_url = value;
        break;

      case SocialMediaSites.YOUTUBE:
        checkValidUrlDebounce(SocialMediaSites.YOUTUBE, value);
        setYouTube(value);
        socialMediaDB.youtube_url = value;
        break;

      case SocialMediaSites.LINKEDIN:
        checkValidUrlDebounce(SocialMediaSites.LINKEDIN, value);
        setLinkedIn(value);
        socialMediaDB.linkedin_url = value;
        break;

      case SocialMediaSites.YELP:
        checkValidUrlDebounce(SocialMediaSites.YELP, value);
        setYelp(value);
        socialMediaDB.other_social_urls["yelp_url"] = value;
        break;

      case SocialMediaSites.TIKTOK:
        checkValidUrlDebounce(SocialMediaSites.TIKTOK, value);
        setTikTok(value);
        socialMediaDB.other_social_urls["tiktok_url"] = value;
        break;
    }

    setSocialData(socialMediaDB);
  };

  const showErrorMessage = socialMediaSite => {
    switch (socialMediaSite) {
      case SocialMediaSites.TWITTER:
        return `Please enter a valid ${socialMediaSite} URL / username`;

      default:
        return `Please enter a valid ${socialMediaSite} URL`;
    }
  };

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  function buildSocialBoxes() {
    var socialBoxes = [];

    for (var social in SocialMediaSites) {
      socialBoxes.push((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        key: SocialMediaSites[social]
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
        className: `social-form__label social-form__label-${SocialMediaSites[social]}`
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "social-form__label_icon",
        style: {
          backgroundImage: `var(--${SocialMediaSites[social]}-icon)`
        }
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "social-form__label_name"
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)(toTitleCase(SocialMediaSites[social]), 'wp-module-onboarding'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Tooltip__WEBPACK_IMPORTED_MODULE_3__["default"], {
        content: activeError.includes(SocialMediaSites[social]) ? showErrorMessage(SocialMediaSites[social]) : 'hide',
        direction: "top"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
        className: `${activeError.includes(SocialMediaSites[social]) ? "social-form__box-error" : "social-form__box"}`,
        type: "url",
        id: `${SocialMediaSites[social]}`,
        value: SocialMediaStates[social],
        onChange: value => {
          handleChange(value);
        }
      }))));
    }

    return socialBoxes;
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "social-form"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "social-form__top-row",
    onClick: e => {
      handleAccordion(e);
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "social-form__top-row_heading"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Social Media", 'wp-module-onboarding')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `social-form__top-row_icon ${isSocialFormOpen ? 'social-form__top-row_icon_opened' : ''}`
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", {
    className: isSocialFormOpen ? 'social-form__main-active' : 'social-form__main-hidden',
    onSubmit: e => {
      handleSubmit(e);
    }
  }, buildSocialBoxes()));
};

/* harmony default export */ __webpack_exports__["default"] = (SocialMediaForm);

/***/ }),

/***/ "./src/OnboardingSPA/components/TextInput/index.js":
/*!*********************************************************!*\
  !*** ./src/OnboardingSPA/components/TextInput/index.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);



/**
 * Interface Text Inputs with standard design.
 *
 * @returns
 */

const TextInput = _ref => {
  let {
    title,
    hint,
    placeholder,
    height,
    maxCharacters,
    textValue,
    textValueSetter
  } = _ref;
  const textareaRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const [inputText, setInputText] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)("nfd-input__field");
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    textareaRef.current.style.height = height;
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + "px";
  }, [textValue]);

  const onTextChange = e => {
    e.preventDefault();
    textValueSetter(e.target.value);
    e.target.value.length == maxCharacters ? setInputText("nfd-input__field nfd-input__field_error") : setInputText("nfd-input__field");
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-input"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-input__label"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "nfd-input__label_title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(title, 'wp-module-onboarding')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "nfd-input__label_maxChar"
  }, `(${maxCharacters - (textValue === null || textValue === void 0 ? void 0 : textValue.length)} characters left)`)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("textarea", {
    type: "text",
    className: inputText,
    ref: textareaRef,
    style: {
      height: height
    },
    placeholder: placeholder,
    value: textValue,
    maxLength: maxCharacters,
    onChange: e => onTextChange(e)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "nfd-input__hint"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(hint, 'wp-module-onboarding'))));
};

/* harmony default export */ __webpack_exports__["default"] = (TextInput);

/***/ }),

/***/ "./src/OnboardingSPA/components/Tooltip/index.js":
/*!*******************************************************!*\
  !*** ./src/OnboardingSPA/components/Tooltip/index.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);



const Tooltip = props => {
  let timeout;
  const [active, setActive] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, props.delay || 400);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  if (props.content == 'hide') return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, props.children);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "Tooltip-Wrapper" // When to show the tooltip
    ,
    onMouseEnter: showTip,
    onMouseLeave: hideTip
  }, props.children, active && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `Tooltip-Tip ${props.direction || "top"}`
  }, props.content));
};

/* harmony default export */ __webpack_exports__["default"] = (Tooltip);

/***/ }),

/***/ "./src/OnboardingSPA/pages/Steps/BasicInfo/basicInfoForm.js":
/*!******************************************************************!*\
  !*** ./src/OnboardingSPA/pages/Steps/BasicInfo/basicInfoForm.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _content_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./content.json */ "./src/OnboardingSPA/pages/Steps/BasicInfo/content.json");
/* harmony import */ var _components_TextInput__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/TextInput */ "./src/OnboardingSPA/components/TextInput/index.js");
/* harmony import */ var _components_SkipButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/SkipButton */ "./src/OnboardingSPA/components/SkipButton/index.js");
/* harmony import */ var _components_MiniPreview__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/MiniPreview */ "./src/OnboardingSPA/components/MiniPreview/index.js");
/* harmony import */ var _utils_api_settings__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../utils/api/settings */ "./src/OnboardingSPA/utils/api/settings.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _components_ImageUploader__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../components/ImageUploader */ "./src/OnboardingSPA/components/ImageUploader/index.js");
/* harmony import */ var _components_SocialMediaForm__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../components/SocialMediaForm */ "./src/OnboardingSPA/components/SocialMediaForm/index.js");
/* harmony import */ var _utils_locales_translations__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../utils/locales/translations */ "./src/OnboardingSPA/utils/locales/translations.js");














/**
 * Basic Info Form.
 *
 * @return
 */

const BasicInfoForm = () => {
  const socialMediaRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const [isError, setIsError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [flowData, setFlowData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const [isLoaded, setisLoaded] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [debouncedFlowData, setDebouncedFlowData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const [siteTitle, setSiteTitle] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [siteDesc, setSiteDesc] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [siteLogo, setSiteLogo] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [socialData, setSocialData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [isValidSocials, setIsValidSocials] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [isSocialFormOpen, setIsSocialFormOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const {
    setCurrentOnboardingData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_9__.store);
  const {
    editEntityRecord
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__.store);
  const {
    getEditedEntityRecord
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    return select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__.store);
  }, []);
  const {
    currentData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    return {
      currentData: select(_store__WEBPACK_IMPORTED_MODULE_9__.store).getCurrentOnboardingData()
    };
  }, []);

  function setDefaultData() {
    if (isLoaded) {
      setSiteLogo(flowData === null || flowData === void 0 ? void 0 : flowData.data.siteLogo);
      setSiteTitle(flowData === null || flowData === void 0 ? void 0 : flowData.data.blogName);
      setSiteDesc(flowData === null || flowData === void 0 ? void 0 : flowData.data.blogDescription);
    }
  }

  function createSaveData() {
    const dataToSave = {
      data: {
        siteLogo,
        blogName: siteTitle,
        blogDescription: siteDesc,
        socialData
      }
    };
    return dataToSave;
  }

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isSocialFormOpen) socialMediaRef.current.scrollIntoView();
  }, [isSocialFormOpen]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    async function getFlowData() {
      const socialDataAPI = await (0,_utils_api_settings__WEBPACK_IMPORTED_MODULE_8__.getSettings)();
      setSocialData(socialDataAPI.body);
      setFlowData(currentData);
      setDebouncedFlowData(flowData);
      setisLoaded(true);
    }

    if (!isLoaded) getFlowData();
    getEditedEntityRecord('root', 'site');
    setDefaultData();
  }, [isLoaded]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const timerId = setTimeout(() => {
      if (isLoaded) setDebouncedFlowData(createSaveData());
    }, 600);
    return () => {
      clearTimeout(timerId);
    };
  }, [siteTitle, siteDesc, siteLogo, socialData, isValidSocials]);

  const updateCoreStore = (siteLogo, siteTitle, siteDesc) => {
    editEntityRecord('root', 'site', undefined, {
      site_logo: siteLogo !== null && siteLogo !== void 0 && siteLogo.id ? siteLogo.id : null,
      description: siteDesc,
      title: siteTitle
    });
  };

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const saveData = async () => {
      var _debouncedFlowData$da, _debouncedFlowData$da2, _debouncedFlowData$da3, _debouncedFlowData$da4;

      const currentDataCopy = currentData;
      currentDataCopy.data.siteLogo = (_debouncedFlowData$da = debouncedFlowData.data.siteLogo) !== null && _debouncedFlowData$da !== void 0 ? _debouncedFlowData$da : currentDataCopy.data.siteLogo;
      currentDataCopy.data.blogName = (_debouncedFlowData$da2 = debouncedFlowData.data.blogName) !== null && _debouncedFlowData$da2 !== void 0 ? _debouncedFlowData$da2 : currentDataCopy.data.blogName;
      currentDataCopy.data.blogDescription = (_debouncedFlowData$da3 = debouncedFlowData.data.blogDescription) !== null && _debouncedFlowData$da3 !== void 0 ? _debouncedFlowData$da3 : currentDataCopy.data.blogDescription;
      currentDataCopy.data.socialData = (_debouncedFlowData$da4 = debouncedFlowData.data.socialData) !== null && _debouncedFlowData$da4 !== void 0 ? _debouncedFlowData$da4 : currentDataCopy.data.socialData;
      updateCoreStore(currentDataCopy.data.siteLogo, currentDataCopy.data.blogName, currentDataCopy.data.blogDescription);
      setCurrentOnboardingData(currentDataCopy);
    };

    if (debouncedFlowData) saveData();
  }, [debouncedFlowData]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "basic-info"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${isError ? 'error__show' : 'error__hide'}`
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(_content_json__WEBPACK_IMPORTED_MODULE_4__.error.title, 'wp-module-onboarding')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "basic-info-form"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "basic-info-form__left"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_TextInput__WEBPACK_IMPORTED_MODULE_5__["default"], {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(_content_json__WEBPACK_IMPORTED_MODULE_4__.siteTitle.title, 'wp-module-onboarding'), (0,_utils_locales_translations__WEBPACK_IMPORTED_MODULE_12__.translations)('Site')),
    hint: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(_content_json__WEBPACK_IMPORTED_MODULE_4__.siteTitle.hint, 'wp-module-onboarding'),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(_content_json__WEBPACK_IMPORTED_MODULE_4__.siteTitle.placeholder, 'wp-module-onboarding'), (0,_utils_locales_translations__WEBPACK_IMPORTED_MODULE_12__.translations)('Site')),
    maxCharacters: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(_content_json__WEBPACK_IMPORTED_MODULE_4__.siteTitle.maxCharacters, 'wp-module-onboarding'),
    height: "47px",
    textValue: siteTitle,
    textValueSetter: setSiteTitle
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_TextInput__WEBPACK_IMPORTED_MODULE_5__["default"], {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(_content_json__WEBPACK_IMPORTED_MODULE_4__.siteDesc.title, 'wp-module-onboarding'), (0,_utils_locales_translations__WEBPACK_IMPORTED_MODULE_12__.translations)('Site')),
    hint: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(_content_json__WEBPACK_IMPORTED_MODULE_4__.siteDesc.hint, 'wp-module-onboarding'), (0,_utils_locales_translations__WEBPACK_IMPORTED_MODULE_12__.translations)('site')),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(_content_json__WEBPACK_IMPORTED_MODULE_4__.siteDesc.placeholder, 'wp-module-onboarding'), (0,_utils_locales_translations__WEBPACK_IMPORTED_MODULE_12__.translations)('Site')),
    maxCharacters: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(_content_json__WEBPACK_IMPORTED_MODULE_4__.siteDesc.maxCharacters, 'wp-module-onboarding'),
    height: "100px",
    textValue: siteDesc,
    textValueSetter: setSiteDesc
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: socialMediaRef
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_SocialMediaForm__WEBPACK_IMPORTED_MODULE_11__["default"], {
    socialData: socialData,
    setSocialData: setSocialData,
    isSocialFormOpen: isSocialFormOpen,
    setIsValidSocials: setIsValidSocials,
    setIsSocialFormOpen: setIsSocialFormOpen
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "basic-info-form__right"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_ImageUploader__WEBPACK_IMPORTED_MODULE_10__["default"], {
    icon: siteLogo,
    iconSetter: setSiteLogo
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_MiniPreview__WEBPACK_IMPORTED_MODULE_7__["default"], {
    icon: siteLogo,
    title: siteTitle,
    desc: siteDesc,
    socialData: socialData,
    isSocialFormOpen: isSocialFormOpen,
    setIsSocialFormOpen: setIsSocialFormOpen
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_SkipButton__WEBPACK_IMPORTED_MODULE_6__["default"], null));
};

/* harmony default export */ __webpack_exports__["default"] = (BasicInfoForm);

/***/ }),

/***/ "./src/OnboardingSPA/pages/Steps/BasicInfo/index.js":
/*!**********************************************************!*\
  !*** ./src/OnboardingSPA/pages/Steps/BasicInfo/index.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Layouts_Common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/Layouts/Common */ "./src/OnboardingSPA/components/Layouts/Common.js");
/* harmony import */ var _components_HeadingWithSubHeading__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/HeadingWithSubHeading */ "./src/OnboardingSPA/components/HeadingWithSubHeading/index.js");
/* harmony import */ var _basicInfoForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./basicInfoForm */ "./src/OnboardingSPA/pages/Steps/BasicInfo/basicInfoForm.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_7__);










const StepBasicInfo = () => {
  const isLargeViewport = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_7__.useViewportMatch)('medium');
  const {
    setIsDrawerOpened,
    setDrawerActiveView,
    setSidebarActiveView,
    setIsDrawerSuppressed,
    setIsHeaderNavigationEnabled
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_5__.store);
  const {
    currentStep
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.useSelect)(select => {
    return {
      currentStep: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getCurrentStep()
    };
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isLargeViewport) {
      setIsDrawerOpened(true);
    }

    setSidebarActiveView(_constants__WEBPACK_IMPORTED_MODULE_4__.SIDEBAR_LEARN_MORE);
    setIsDrawerSuppressed(false);
    setDrawerActiveView(_constants__WEBPACK_IMPORTED_MODULE_4__.VIEW_NAV_PRIMARY);
    setIsHeaderNavigationEnabled(true);
  }, []);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Layouts_Common__WEBPACK_IMPORTED_MODULE_1__["default"], {
    isVerticallyCentered: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_HeadingWithSubHeading__WEBPACK_IMPORTED_MODULE_2__["default"], {
    title: currentStep === null || currentStep === void 0 ? void 0 : currentStep.heading,
    subtitle: currentStep === null || currentStep === void 0 ? void 0 : currentStep.subheading
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_basicInfoForm__WEBPACK_IMPORTED_MODULE_3__["default"], null));
};

/* harmony default export */ __webpack_exports__["default"] = (StepBasicInfo);

/***/ }),

/***/ "./src/OnboardingSPA/utils/api/events.js":
/*!***********************************************!*\
  !*** ./src/OnboardingSPA/utils/api/events.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common */ "./src/OnboardingSPA/utils/api/common.js");



class Event {
  constructor(eventSlug) {
    let eventData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.eventSlug = eventSlug;
    this.eventData = eventData;
  }

  send() {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
      url: (0,_common__WEBPACK_IMPORTED_MODULE_1__.onboardingRestURL)('events'),
      method: 'POST',
      data: {
        slug: this.eventSlug,
        data: this.eventData
      }
    }).catch(error => {
      console.error(error);
    });
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Event);

/***/ }),

/***/ "./src/OnboardingSPA/utils/api/uploader.js":
/*!*************************************************!*\
  !*** ./src/OnboardingSPA/utils/api/uploader.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "uploadImage": function() { return /* binding */ uploadImage; }
/* harmony export */ });
/* harmony import */ var _resolve__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./resolve */ "./src/OnboardingSPA/utils/api/resolve.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common */ "./src/OnboardingSPA/utils/api/common.js");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);




function readFileDataAsBase64(file) {
  return new Promise((resolve, reject) => {
    // Create file reader
    const reader = new FileReader(); // Register event listeners

    reader.addEventListener('loadend', e => resolve(e.target.result));
    reader.addEventListener('error', reject); // Read file

    reader.readAsArrayBuffer(file);
  });
}

async function uploadImage(file) {
  const data = await readFileDataAsBase64(file);
  const headers = {};
  headers['Content-Type'] = 'image/png';
  headers['Content-Disposition'] = 'attachment; filename=' + file.name;
  return await (0,_resolve__WEBPACK_IMPORTED_MODULE_0__.resolve)(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
    url: (0,_common__WEBPACK_IMPORTED_MODULE_1__.wpRestURL)('media'),
    method: 'POST',
    headers,
    body: data
  }));
}

/***/ }),

/***/ "./src/OnboardingSPA/components/MiniPreview/miniPreview.json":
/*!*******************************************************************!*\
  !*** ./src/OnboardingSPA/components/MiniPreview/miniPreview.json ***!
  \*******************************************************************/
/***/ (function(module) {

module.exports = JSON.parse('{"icon":"--default-logo-icon","title":"WordPress %s","desc":"Just another WordPress %s","url":"https://bluehost.com"}');

/***/ }),

/***/ "./src/OnboardingSPA/pages/Steps/BasicInfo/content.json":
/*!**************************************************************!*\
  !*** ./src/OnboardingSPA/pages/Steps/BasicInfo/content.json ***!
  \**************************************************************/
/***/ (function(module) {

module.exports = JSON.parse('{"siteTitle":{"title":"%s Title","placeholder":"WordPress %s","hint":"Shown to visitors, search engine and social media posts.","maxCharacters":"80"},"siteDesc":{"title":"%s Description","placeholder":"Just another WordPress %s.","hint":"Tell people who you are, what you sell and why they should visit your %s.","maxCharacters":"160"},"error":{"title":"Error Saving Data, Try Again!"}}');

/***/ })

}]);
//# sourceMappingURL=src_OnboardingSPA_pages_Steps_BasicInfo_index_js.js.map