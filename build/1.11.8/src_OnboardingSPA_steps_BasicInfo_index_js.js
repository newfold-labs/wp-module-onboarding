"use strict";
(globalThis["webpackChunknewfold_Onboarding"] = globalThis["webpackChunknewfold_Onboarding"] || []).push([["src_OnboardingSPA_steps_BasicInfo_index_js"],{

/***/ "./src/OnboardingSPA/components/ErrorModal/ErrorModal.js":
/*!***************************************************************!*\
  !*** ./src/OnboardingSPA/components/ErrorModal/ErrorModal.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store */ "./src/OnboardingSPA/store/index.js");








const ErrorModal = _ref => {
  let {
    showModal,
    setShowModal,
    modalTitle,
    modalText
  } = _ref;
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_5__.useNavigate)();
  const {
    navErrorModalPath
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    return {
      navErrorModalPath: select(_store__WEBPACK_IMPORTED_MODULE_4__.store).getNavErrorPath()
    };
  }, []);
  const {
    showNavErrorDialog,
    resetNavError
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_4__.store);

  const closeModal = () => {
    resetNavError(); // If the user closes the modal, it indicates that the error still exists.
    // The user has closed the modal to address the error. Until the error is resolved
    // or the user chooses to proceed anyway, the error message should remain visible.

    showNavErrorDialog(true);
    setShowModal(false);
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, showModal && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Modal, {
    title: modalTitle,
    onRequestClose: () => closeModal()
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, modalText), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ButtonGroup, {
    className: "nfd-onboarding-etw__buttons"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    variant: "secondary",
    onClick: () => closeModal()
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Edit URLs', 'wp-module-onboarding')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    variant: "primary",
    onClick: () => {
      // Since the user is overriding and proceeding anyway, there's no need to display a dialog anymore.
      resetNavError();
      navigate(navErrorModalPath);
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Proceed Anyways', 'wp-module-onboarding')))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ErrorModal);

/***/ }),

/***/ "./src/OnboardingSPA/components/ImageUploader/components/ImageUploaderWithIcon/index.js":
/*!**********************************************************************************************!*\
  !*** ./src/OnboardingSPA/components/ImageUploader/components/ImageUploaderWithIcon/index.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Loaders__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Loaders */ "./src/OnboardingSPA/components/Loaders/index.js");
/* harmony import */ var _utils_api_uploader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../utils/api/uploader */ "./src/OnboardingSPA/utils/api/uploader.js");





/*
 * Image Uploader
 *
 */

const ImageUploaderWithIcon = _ref => {
  let {
    icon,
    iconSetter
  } = _ref;
  const inputRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const [isUploading, setIsUploading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [onDragActive, setOnDragActive] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);

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
      }
    }

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

    iconSetter({
      id: 0,
      url: ''
    });

    if ((inputRef === null || inputRef === void 0 ? void 0 : (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.files.length) > 0) {
      inputRef.current.value = '';
    }
  };

  function loader() {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "image-uploader_window"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Loaders__WEBPACK_IMPORTED_MODULE_2__.ImageUploadLoader, null));
  }

  const handleDragEnter = e => {
    e.preventDefault();
    e.stopPropagation();
    setOnDragActive(true);
  };

  const handleDragLeave = e => {
    e.preventDefault();
    e.stopPropagation();
    setOnDragActive(false);
  };

  const handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
    setOnDragActive(true);
  };

  const handleDrop = e => {
    var _e$dataTransfer, _e$dataTransfer2;

    e.preventDefault();
    e.stopPropagation();
    setOnDragActive(false);

    if (e !== null && e !== void 0 && (_e$dataTransfer = e.dataTransfer) !== null && _e$dataTransfer !== void 0 && _e$dataTransfer.files && (e === null || e === void 0 ? void 0 : (_e$dataTransfer2 = e.dataTransfer) === null || _e$dataTransfer2 === void 0 ? void 0 : _e$dataTransfer2.files.length) > 0) {
      var _e$dataTransfer3, _e$dataTransfer3$file;

      if ((e === null || e === void 0 ? void 0 : (_e$dataTransfer3 = e.dataTransfer) === null || _e$dataTransfer3 === void 0 ? void 0 : (_e$dataTransfer3$file = _e$dataTransfer3.files[0]) === null || _e$dataTransfer3$file === void 0 ? void 0 : _e$dataTransfer3$file.type.split('/')[0]) === 'image') {
        var _e$dataTransfer4;

        updateItem(e === null || e === void 0 ? void 0 : (_e$dataTransfer4 = e.dataTransfer) === null || _e$dataTransfer4 === void 0 ? void 0 : _e$dataTransfer4.files[0]);
      }
    }
  };

  function getImageUploadWindow() {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: `image-uploader_window ${onDragActive && 'image-uploader_window--on-drag'}`,
      onDrop: e => handleDrop(e),
      onDragOver: e => handleDragOver(e),
      onDragEnter: e => handleDragEnter(e),
      onDragLeave: e => handleDragLeave(e)
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "image-uploader_window-empty"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "image-uploader_window-logo"
    }, (icon === undefined || (icon === null || icon === void 0 ? void 0 : icon.id) === 0) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "image-uploader_window-logo-icon-empty"
    }), (icon === null || icon === void 0 ? void 0 : icon.id) !== 0 && (icon === null || icon === void 0 ? void 0 : icon.id) !== undefined && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      className: "image-uploader_window-logo-icon-selected",
      src: icon === null || icon === void 0 ? void 0 : icon.url,
      alt: "Thumb"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "image-uploader_window-reset"
    }, icon !== undefined && (icon === null || icon === void 0 ? void 0 : icon.id) !== 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      className: "image-uploader_window-reset-btn",
      onClick: removeSelectedImage
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('RESET', 'wp-module-onboarding')), (icon === undefined || (icon === null || icon === void 0 ? void 0 : icon.id) === 0) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      className: "image-uploader_window-reset-btn",
      onClick: handleClick
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('UPLOAD', 'wp-module-onboarding')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
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
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Logo', 'wp-module-onboarding')), isUploading ? loader() : getImageUploadWindow());
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(ImageUploaderWithIcon));

/***/ }),

/***/ "./src/OnboardingSPA/components/Loaders/ImageUpload/index.js":
/*!*******************************************************************!*\
  !*** ./src/OnboardingSPA/components/Loaders/ImageUpload/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Animate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Animate */ "./src/OnboardingSPA/components/Animate/index.js");



const ImageUploadLoader = () => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "image-upload-loader--loading-box"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Animate__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: 'load',
    className: "image-upload-loader--loading-box__loader"
  }));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ImageUploadLoader);

/***/ }),

/***/ "./src/OnboardingSPA/components/Loaders/index.js":
/*!*******************************************************!*\
  !*** ./src/OnboardingSPA/components/Loaders/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageUploadLoader": () => (/* reexport safe */ _ImageUpload__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "StepLoader": () => (/* reexport safe */ _Step__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _Step__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Step */ "./src/OnboardingSPA/components/Loaders/Step/index.js");
/* harmony import */ var _ImageUpload__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ImageUpload */ "./src/OnboardingSPA/components/Loaders/ImageUpload/index.js");



/***/ }),

/***/ "./src/OnboardingSPA/components/MiniPreview/contents.js":
/*!**************************************************************!*\
  !*** ./src/OnboardingSPA/components/MiniPreview/contents.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_locales_translations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/locales/translations */ "./src/OnboardingSPA/utils/locales/translations.js");



const getContents = function () {
  let brandUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return {
    heading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Preview', 'wp-module-onboarding'),
    defaultTitle: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(
    /* translators: %s: Site or Store */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('WordPress %s', 'wp-module-onboarding'), (0,_utils_locales_translations__WEBPACK_IMPORTED_MODULE_1__.translations)('Site')),
    defaultDesc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(
    /* translators: %s: Site */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Just another WordPress %s', 'wp-module-onboarding'), (0,_utils_locales_translations__WEBPACK_IMPORTED_MODULE_1__.translations)('Site')),
    defaultUrl: brandUrl
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getContents);

/***/ }),

/***/ "./src/OnboardingSPA/components/MiniPreview/index.js":
/*!***********************************************************!*\
  !*** ./src/OnboardingSPA/components/MiniPreview/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _contents__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contents */ "./src/OnboardingSPA/components/MiniPreview/contents.js");






const MiniPreview = _ref => {
  let {
    title,
    desc,
    icon,
    isSocialFormOpen,
    setIsSocialFormOpen
  } = _ref;
  const {
    socialDataStore,
    brandUrl
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    return {
      socialDataStore: select(_store__WEBPACK_IMPORTED_MODULE_2__.store).getOnboardingSocialData(),
      brandUrl: select(_store__WEBPACK_IMPORTED_MODULE_2__.store).getNewfoldBrandUrl()
    };
  }, []);
  const content = (0,_contents__WEBPACK_IMPORTED_MODULE_3__["default"])(brandUrl);
  const titlePreview = title === '' ? content.defaultTitle : title;
  const descPreview = desc === '' ? content.defaultDesc : desc;
  const urlPreview = title === '' ? content.defaultUrl : titleToUrl();
  const [facebook, setFacebook] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [twitter, setTwitter] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [instagram, setInstagram] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [youtube, setYouTube] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [linkedin, setLinkedIn] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [yelp, setYelp] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [tiktok, setTikTok] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    var _socialDataStore$face, _socialDataStore$twit, _socialDataStore$inst, _socialDataStore$yout, _socialDataStore$link;

    setFacebook((_socialDataStore$face = socialDataStore === null || socialDataStore === void 0 ? void 0 : socialDataStore.facebook_site) !== null && _socialDataStore$face !== void 0 ? _socialDataStore$face : '');
    setTwitter((_socialDataStore$twit = socialDataStore === null || socialDataStore === void 0 ? void 0 : socialDataStore.twitter_site) !== null && _socialDataStore$twit !== void 0 ? _socialDataStore$twit : '');
    setInstagram((_socialDataStore$inst = socialDataStore === null || socialDataStore === void 0 ? void 0 : socialDataStore.instagram_url) !== null && _socialDataStore$inst !== void 0 ? _socialDataStore$inst : '');
    setYouTube((_socialDataStore$yout = socialDataStore === null || socialDataStore === void 0 ? void 0 : socialDataStore.youtube_url) !== null && _socialDataStore$yout !== void 0 ? _socialDataStore$yout : '');
    setLinkedIn((_socialDataStore$link = socialDataStore === null || socialDataStore === void 0 ? void 0 : socialDataStore.linkedin_url) !== null && _socialDataStore$link !== void 0 ? _socialDataStore$link : '');

    if (socialDataStore && Object.keys(socialDataStore).includes('other_social_urls')) {
      const otherURLS = socialDataStore.other_social_urls;

      if (Object.keys(otherURLS).includes('yelp_url')) {
        var _otherURLS$yelp_url;

        setYelp((_otherURLS$yelp_url = otherURLS.yelp_url) !== null && _otherURLS$yelp_url !== void 0 ? _otherURLS$yelp_url : '');
      }

      if (Object.keys(otherURLS).includes('tiktok_url')) {
        var _otherURLS$tiktok_url;

        setTikTok((_otherURLS$tiktok_url = otherURLS.tiktok_url) !== null && _otherURLS$tiktok_url !== void 0 ? _otherURLS$tiktok_url : '');
      }
    }
  }, [socialDataStore]);

  const isValidUrl = urlString => {
    let url;

    try {
      url = new URL(urlString);
    } catch (e) {
      return false;
    }

    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return false;
    }

    return true;
  };

  const socialDataset = [{
    url: facebook,
    image: 'var(--facebook-icon)'
  }, {
    url: twitter,
    image: 'var(--twitter-icon)'
  }, {
    url: instagram,
    image: 'var(--instagram-icon)'
  }, {
    url: youtube,
    image: 'var(--youtube-icon)'
  }, {
    url: linkedin,
    image: 'var(--linkedin-icon)'
  }, {
    url: yelp,
    image: 'var(--yelp-icon)'
  }, {
    url: tiktok,
    image: 'var(--tiktok-icon)'
  }];

  function titleToUrl() {
    return `https://${title === null || title === void 0 ? void 0 : title.toLowerCase().replace(/\s/g, '').replace(/\W/g, '')}.com`;
  }

  function socialIconList() {
    return socialDataset.map((socialInfo, idx) => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        key: socialInfo.image,
        tabIndex: idx + 1,
        role: "button",
        onClick: () => setIsSocialFormOpen(!isSocialFormOpen),
        onKeyDown: () => setIsSocialFormOpen(!isSocialFormOpen),
        className: `browser-content_social_icon ${socialInfo.url ? isValidUrl(socialInfo.url) || '--invalid-url' : '--no-url'}`,
        style: {
          backgroundImage: socialInfo.image
        }
      });
    });
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "mini-preview"
  }, content.heading), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
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
  }, (icon === undefined || (icon === null || icon === void 0 ? void 0 : icon.id) === 0) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "browser-icon-title",
    style: {
      content: 'var(--default-logo-icon)'
    }
  }), icon !== undefined && (icon === null || icon === void 0 ? void 0 : icon.id) !== 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    className: "browser-icon-title",
    src: icon === null || icon === void 0 ? void 0 : icon.url,
    alt: "Thumb"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "browser-row-title_bar_main-text"
  }, titlePreview === null || titlePreview === void 0 ? void 0 : titlePreview.substring(0, 20)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
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
    onChange: () => {},
    value: urlPreview
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
  }, titlePreview), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "browser-content_top-row-link"
  }, urlPreview)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", {
    className: "browser-content_desc"
  }, descPreview), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "browser-content_social"
  }, socialIconList()))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(MiniPreview));

/***/ }),

/***/ "./src/OnboardingSPA/components/SkipButton/index.js":
/*!**********************************************************!*\
  !*** ./src/OnboardingSPA/components/SkipButton/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _newfold_labs_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @newfold-labs/js-utility-ui-analytics */ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/index.js");
/* harmony import */ var _utils_api_flow__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/api/flow */ "./src/OnboardingSPA/utils/api/flow.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _utils_api_settings__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/api/settings */ "./src/OnboardingSPA/utils/api/settings.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../constants */ "./src/constants.js");
/* harmony import */ var _utils_analytics_hiive_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utils/analytics/hiive/constants */ "./src/OnboardingSPA/utils/analytics/hiive/constants.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_10__);














const SkipButton = _ref => {
  let {
    callback = false,
    className,
    text
  } = _ref;
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_11__.useNavigate)();
  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_11__.useLocation)();
  const {
    nextStep,
    currentData,
    socialData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    return {
      nextStep: select(_store__WEBPACK_IMPORTED_MODULE_6__.store).getNextStep(),
      currentData: select(_store__WEBPACK_IMPORTED_MODULE_6__.store).getCurrentOnboardingData(),
      socialData: select(_store__WEBPACK_IMPORTED_MODULE_6__.store).getOnboardingSocialData()
    };
  }, []);
  const isLastStep = null === nextStep || false === nextStep;
  const {
    setOnboardingSocialData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_6__.store);

  async function syncSocialSettingsFinish() {
    const initialData = await (0,_utils_api_settings__WEBPACK_IMPORTED_MODULE_7__.getSettings)();
    const result = await (0,_utils_api_settings__WEBPACK_IMPORTED_MODULE_7__.setSettings)(socialData);

    if ((result === null || result === void 0 ? void 0 : result.error) !== null) {
      return initialData === null || initialData === void 0 ? void 0 : initialData.body;
    }

    return result === null || result === void 0 ? void 0 : result.body;
  }

  async function saveData(path) {
    if (currentData) {
      currentData.isComplete = new Date().getTime(); // If Social Data is changed then sync it

      if (path !== null && path !== void 0 && path.includes('basic-info')) {
        const socialDataResp = await syncSocialSettingsFinish(); // If Social Data is changed then Sync that also to the store

        if (socialDataResp) {
          setOnboardingSocialData(socialDataResp);
        }

        await _newfold_labs_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_4__.HiiveAnalytics.dispatchEvents(_utils_analytics_hiive_constants__WEBPACK_IMPORTED_MODULE_9__.CATEGORY);
      }

      (0,_utils_api_flow__WEBPACK_IMPORTED_MODULE_5__.setFlow)(currentData);
    }

    window.location.replace(_constants__WEBPACK_IMPORTED_MODULE_8__.pluginDashboardPage);
  }

  function skip() {
    if (typeof callback === 'function') {
      callback();
    }

    navigate(nextStep.path);
  }

  function skipStep() {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      className: classnames__WEBPACK_IMPORTED_MODULE_10___default()('skip-button', className),
      onClick: isLastStep ? () => saveData(location.pathname) : () => skip()
    }, text ? text : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Skip this Step', 'wp-module-onboarding'));
  }

  return skipStep();
};

const SkipButtonMemo = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(SkipButton);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SkipButtonMemo);

/***/ }),

/***/ "./src/OnboardingSPA/components/SocialMediaForm/contents.js":
/*!******************************************************************!*\
  !*** ./src/OnboardingSPA/components/SocialMediaForm/contents.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);


const getContents = () => {
  return {
    heading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Social Media', 'wp-module-onboarding'),
    modals: {
      shortUrl: {
        modalTitle: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("It looks like you're using a URL shortener!", 'wp-module-onboarding'),
        modalText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("That's smart, but we encourage you to enter the standard URL for your social profiles to help search engines know this website is associated with your profile using Yoast's Open Graph support. You can always change the URLs used within your site to trackable in the future.", 'wp-module-onboarding')
      },
      invalidUrl: {
        modalTitle: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("One of those URLs doesn't look like a social media URL.", 'wp-module-onboarding'),
        modalText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("We recommend using your official social URL to help search engines know this website is associated with your profile using Yoast's Open Graph support. You can always change the URLs used within your site in the future.", 'wp-module-onboarding')
      }
    },
    errorText: {
      adLinkErrorText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("That's clever! Short URLs are a great way to track clicks. However, To help build your social graph, we need the full URLs to your social profiles. You can go into your menus and change your social icon links after setup.", 'wp-module-onboarding'),
      invalidLinkErrorText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('To help build your social graph, we need the full URLs to your social profiles. Please check your URLs for typos and try copy & paste with the official URL if you continue to see this error.', 'wp-module-onboarding')
    }
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getContents);

/***/ }),

/***/ "./src/OnboardingSPA/components/SocialMediaForm/index.js":
/*!***************************************************************!*\
  !*** ./src/OnboardingSPA/components/SocialMediaForm/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Tooltip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../Tooltip */ "./src/OnboardingSPA/components/Tooltip/index.js");
/* harmony import */ var _contents__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contents */ "./src/OnboardingSPA/components/SocialMediaForm/contents.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ "./src/OnboardingSPA/components/SocialMediaForm/utils.js");
/* harmony import */ var _urlValidator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./urlValidator */ "./src/OnboardingSPA/components/SocialMediaForm/urlValidator.js");
/* harmony import */ var _ErrorModal_ErrorModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../ErrorModal/ErrorModal */ "./src/OnboardingSPA/components/ErrorModal/ErrorModal.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__);











const SocialMediaForm = _ref => {
  let {
    socialData,
    setSocialData,
    isSocialFormOpen,
    setIsSocialFormOpen
  } = _ref;
  const content = (0,_contents__WEBPACK_IMPORTED_MODULE_3__["default"])();
  const [facebook, setFacebook] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [twitter, setTwitter] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [instagram, setInstagram] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [youtube, setYouTube] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [linkedin, setLinkedIn] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [yelp, setYelp] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [tiktok, setTikTok] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [showModal, setShowModal] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [activeError, setActiveError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [activeErrorTypes, setActiveErrorTypes] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(Object);
  const {
    showNavErrorDialog,
    setOnboardingSocialData,
    resetNavError
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_7__.store);
  const {
    navErrorModalPath
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    return {
      navErrorModalPath: select(_store__WEBPACK_IMPORTED_MODULE_7__.store).getNavErrorPath()
    };
  }, []);
  const SocialMedia = {
    FACEBOOK: {
      id: 'facebook',
      value: facebook,
      name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Facebook', 'wp-module-onboarding')
    },
    TWITTER: {
      id: 'twitter',
      value: twitter,
      name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Twitter', 'wp-module-onboarding')
    },
    INSTAGRAM: {
      id: 'instagram',
      value: instagram,
      name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Instagram', 'wp-module-onboarding')
    },
    YOUTUBE: {
      id: 'youtube',
      value: youtube,
      name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Youtube', 'wp-module-onboarding')
    },
    LINKEDIN: {
      id: 'linkedin',
      value: linkedin,
      name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Linkedin', 'wp-module-onboarding')
    },
    YELP: {
      id: 'yelp',
      value: yelp,
      name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Yelp', 'wp-module-onboarding')
    },
    TIKTOK: {
      id: 'tiktok',
      value: tiktok,
      name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__.__)('Tiktok', 'wp-module-onboarding')
    }
  };
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (navErrorModalPath !== '') {
      setShowModal(true);
    }
  }, [navErrorModalPath]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    var _socialData$facebook_, _socialData$twitter_s, _socialData$instagram, _socialData$youtube_u, _socialData$linkedin_;

    setFacebook((_socialData$facebook_ = socialData === null || socialData === void 0 ? void 0 : socialData.facebook_site) !== null && _socialData$facebook_ !== void 0 ? _socialData$facebook_ : '');
    setTwitter((_socialData$twitter_s = socialData === null || socialData === void 0 ? void 0 : socialData.twitter_site) !== null && _socialData$twitter_s !== void 0 ? _socialData$twitter_s : '');
    setInstagram((_socialData$instagram = socialData === null || socialData === void 0 ? void 0 : socialData.instagram_url) !== null && _socialData$instagram !== void 0 ? _socialData$instagram : '');
    setYouTube((_socialData$youtube_u = socialData === null || socialData === void 0 ? void 0 : socialData.youtube_url) !== null && _socialData$youtube_u !== void 0 ? _socialData$youtube_u : '');
    setLinkedIn((_socialData$linkedin_ = socialData === null || socialData === void 0 ? void 0 : socialData.linkedin_url) !== null && _socialData$linkedin_ !== void 0 ? _socialData$linkedin_ : '');

    if (socialData && Object.keys(socialData).includes('other_social_urls')) {
      const otherURLS = socialData.other_social_urls;

      if (Object.keys(otherURLS).includes('yelp_url')) {
        var _otherURLS$yelp_url;

        setYelp((_otherURLS$yelp_url = otherURLS.yelp_url) !== null && _otherURLS$yelp_url !== void 0 ? _otherURLS$yelp_url : '');
      }

      if (Object.keys(otherURLS).includes('tiktok_url')) {
        var _otherURLS$tiktok_url;

        setTikTok((_otherURLS$tiktok_url = otherURLS.tiktok_url) !== null && _otherURLS$tiktok_url !== void 0 ? _otherURLS$tiktok_url : '');
      }
    }
  }, [socialData]); // Save the Social Media data into the store

  const saveData = (value, triggerID) => {
    switch (triggerID) {
      case SocialMedia.FACEBOOK.id:
        setFacebook(value);
        socialData.facebook_site = value;
        break;

      case SocialMedia.TWITTER.id:
        setTwitter(value);
        socialData.twitter_site = value;
        break;

      case SocialMedia.INSTAGRAM.id:
        setInstagram(value);
        socialData.instagram_url = value;
        break;

      case SocialMedia.YOUTUBE.id:
        setYouTube(value);
        socialData.youtube_url = value;
        break;

      case SocialMedia.LINKEDIN.id:
        setLinkedIn(value);
        socialData.linkedin_url = value;
        break;

      case SocialMedia.YELP.id:
        setYelp(value);
        socialData.other_social_urls = { ...socialData.other_social_urls
        };
        socialData.other_social_urls.yelp_url = value;
        break;

      case SocialMedia.TIKTOK.id:
        setTikTok(value);
        socialData.other_social_urls = { ...socialData.other_social_urls
        };
        socialData.other_social_urls.tiktok_url = value;
        break;
    }

    setOnboardingSocialData(socialData);
    setSocialData(socialData);
  }; // Find the current latest error in the data


  const getErrorType = () => {
    let error = _utils__WEBPACK_IMPORTED_MODULE_4__.ERROR_TYPES.NONE;

    for (const key in activeErrorTypes) {
      if (activeErrorTypes[key] !== _utils__WEBPACK_IMPORTED_MODULE_4__.ERROR_TYPES.NONE) {
        error = activeErrorTypes[key];
      }
    }

    return error;
  }; // Adds error to a certain message.


  const displayErrors = (categ, isError) => {
    if (isError) {
      if (!activeError.includes(categ)) {
        setActiveError([...activeError, categ]);
      }
    } else {
      const errorsFiltered = activeError.filter(function (ele) {
        return ele !== categ;
      });
      setActiveError(errorsFiltered);
    }
  }; // Handle urlValidation when user goes out of focus


  const handleOnBlur = e => {
    const value = e.target.value;
    const triggerID = e.target.id;
    const res = (0,_urlValidator__WEBPACK_IMPORTED_MODULE_5__["default"])(triggerID, value);
    activeErrorTypes[triggerID] = res.error;
    setActiveErrorTypes(activeErrorTypes);
    displayErrors(triggerID, res.error !== _utils__WEBPACK_IMPORTED_MODULE_4__.ERROR_TYPES.NONE);

    if (getErrorType() !== _utils__WEBPACK_IMPORTED_MODULE_4__.ERROR_TYPES.NONE) {
      showNavErrorDialog(true);
    } else {
      resetNavError();
    }

    saveData(res.url, triggerID);
  }; // Change data while user types


  const handleChange = e => {
    const value = e.target.value;
    const triggerID = e.target.id;
    saveData(value, triggerID);
  }; // Decide Error Modal to be shown according to error


  const handleErrorModals = () => {
    switch (getErrorType()) {
      case _utils__WEBPACK_IMPORTED_MODULE_4__.ERROR_TYPES.AD_LINK_ERROR:
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ErrorModal_ErrorModal__WEBPACK_IMPORTED_MODULE_6__["default"], {
          showModal: showModal,
          setShowModal: setShowModal,
          modalTitle: content.modals.shortUrl.modalTitle,
          modalText: content.modals.shortUrl.modalText
        });

      case _utils__WEBPACK_IMPORTED_MODULE_4__.ERROR_TYPES.INVALID_LINK_ERROR:
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ErrorModal_ErrorModal__WEBPACK_IMPORTED_MODULE_6__["default"], {
          showModal: showModal,
          setShowModal: setShowModal,
          modalTitle: content.modals.invalidUrl.modalTitle,
          modalText: content.modals.invalidUrl.modalText
        });

      default:
        return null;
    }
  }; // Tool tip error message to be shown


  const showErrorMessage = socialMediaSite => {
    return activeErrorTypes[socialMediaSite] === 'ad-link-error' ? content.errorText.adLinkErrorText : content.errorText.invalidLinkErrorText;
  }; // Render Input Fields


  function buildSocialBoxes() {
    return Object.keys(SocialMedia).map(social => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        key: SocialMedia[social].id
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
        htmlFor: SocialMedia[social].id,
        className: `social-form__label social-form__label-${SocialMedia[social].id}`
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "social-form__label_icon",
        style: {
          backgroundImage: `var(--${SocialMedia[social].id}-icon)`
        }
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "social-form__label_name"
      }, SocialMedia[social].name)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Tooltip__WEBPACK_IMPORTED_MODULE_2__["default"], {
        content: activeError.includes(SocialMedia[social].id) ? showErrorMessage(SocialMedia[social].id) : 'hide',
        direction: SocialMedia[social].id === SocialMedia.TIKTOK.id ? 'top' : 'bottom'
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
        className: `${activeError.includes(SocialMedia[social].id) ? 'social-form__box-error' : 'social-form__box'}`,
        type: "url",
        id: `${SocialMedia[social].id}`,
        value: SocialMedia[social].value,
        onChange: value => {
          handleChange(value);
        },
        onBlur: e => handleOnBlur(e)
      })));
    });
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "social-form"
  }, showModal && handleErrorModals(), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    role: "button",
    tabIndex: 0,
    onKeyDown: () => setIsSocialFormOpen(!isSocialFormOpen),
    className: "social-form__top-row",
    onClick: () => setIsSocialFormOpen(!isSocialFormOpen)
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "social-form__top-row_heading"
  }, content.heading), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `social-form__top-row_icon ${isSocialFormOpen ? 'social-form__top-row_icon_opened' : ''}`
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", {
    className: isSocialFormOpen ? 'social-form__main-active' : 'social-form__main-hidden'
  }, buildSocialBoxes()));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SocialMediaForm);

/***/ }),

/***/ "./src/OnboardingSPA/components/SocialMediaForm/urlValidator.js":
/*!**********************************************************************!*\
  !*** ./src/OnboardingSPA/components/SocialMediaForm/urlValidator.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/OnboardingSPA/components/SocialMediaForm/utils.js");

const SocialMediaSites = {
  FACEBOOK: 'facebook',
  TWITTER: 'twitter',
  INSTAGRAM: 'instagram',
  YOUTUBE: 'youtube',
  LINKEDIN: 'linkedin',
  YELP: 'yelp',
  TIKTOK: 'tiktok'
}; // Don't do standard validation for them

const validationExemption = new Set(['twitter', 'instagram', 'youtube']); // Common Validation for all links

const handleCommonValidation = (url, result) => {
  const wwwExp = /.*www\./gi;
  const protocolExp = /https?:\/\//gi; // This checks for short ad-links

  const adLinks = /goo\.gl.*|bit\.ly.*|buff\.ly.*|tinyurl\.com.*|bl\.ink.*|short\.io.*|ow\.ly.*|is\.gd.*|adf\.ly.*|bit\.do.*|t\.co.*|clk\.sh.*|gplinks\.in.*|tiny\.cc.*|wp\.me.*/gi; // This is a basic complete url check

  const urlExp = /((https?:\/\/(?:www\.|(?!www)))?[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  const adRegex = new RegExp(adLinks);
  const wwwRegex = new RegExp(wwwExp);
  const protocolRegex = new RegExp(protocolExp);
  const urlRegex = new RegExp(urlExp); // Check if it is a Shortend URL

  if (url.match(adRegex)) {
    // If it is short url add the protocol prefix to save the data
    const iswwwValid = url.match(wwwRegex);
    const isProtocolValid = url.match(protocolRegex);

    if (!iswwwValid && !isProtocolValid) {
      url = 'https://www.' + url;
    }

    result.error = _utils__WEBPACK_IMPORTED_MODULE_0__.ERROR_TYPES.AD_LINK_ERROR;
    result.url = url;
    return result;
  } // Check if it is a Valid URL


  const urlExtract = url.match(urlRegex);

  if (!urlExtract) {
    result.error = _utils__WEBPACK_IMPORTED_MODULE_0__.ERROR_TYPES.INVALID_LINK_ERROR;
    result.url = url;
    return result;
  }

  let finalUrl = urlExtract[0]; // Check if the link has the 'www.' prefix in it

  const iswwwValid = urlExtract[0].match(wwwRegex); // Check if the link has the 'https://' prefix in it

  const isProtocolValid = urlExtract[0].match(protocolRegex); // Check if the URL is https secure

  if (finalUrl.match(new RegExp(/http:/gi))) finalUrl = finalUrl.replace(/http:/gi, 'https:'); // Check if the URL has valid prefixes

  if (!iswwwValid && !isProtocolValid) {
    finalUrl = 'https://www.' + finalUrl;
  } else if (!iswwwValid && isProtocolValid) {
    finalUrl = finalUrl.replace(/https?:\/\//gi, 'https://www.');
  } else if (iswwwValid && !isProtocolValid) {
    finalUrl = 'https://' + finalUrl;
  }

  result.url = finalUrl;
  result.error = _utils__WEBPACK_IMPORTED_MODULE_0__.ERROR_TYPES.NONE;
  return result;
}; // Specific Site based Validation


const isValidHandle = handle => {
  return handle.match(`^@?[A-Za-z0-9_]{1,25}$`) ? true : false;
};

const handleTwitterValidation = (url, result) => {
  if (isValidHandle(url)) {
    // Strips the @ and adds the prefix link
    if (url.charAt(0) === '@') url = url.substr(1);
    result.url = 'https://www.twitter.com/' + url;
    return result;
  } // If the user provides a link and not the handle


  return handleCommonValidation(url, result);
};

const handleInstagramValidation = (url, result) => {
  if (isValidHandle(url)) {
    // Strips the @ and adds the prefix link
    if (url.charAt(0) === '@') url = url.substr(1);
    result.url = 'https://www.instagram.com/' + url;
    return result;
  }

  return handleCommonValidation(url, result);
};

const handleYouTubeValidation = (url, result) => {
  if (isValidHandle(url)) {
    result.url = 'https://www.youtube.com/' + url;
    return result;
  }

  return handleCommonValidation(url, result);
};

const urlValidator = (categ, url) => {
  const result = {
    url,
    error: _utils__WEBPACK_IMPORTED_MODULE_0__.ERROR_TYPES.NONE
  };
  if (url === '') return result; // Skip urlValidation for some sites with specific checks

  if (!validationExemption.has(categ)) return handleCommonValidation(url, result);

  switch (categ) {
    case SocialMediaSites.TWITTER:
      return handleTwitterValidation(url, result);

    case SocialMediaSites.INSTAGRAM:
      return handleInstagramValidation(url, result);

    case SocialMediaSites.YOUTUBE:
      return handleYouTubeValidation(url, result);
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (urlValidator);

/***/ }),

/***/ "./src/OnboardingSPA/components/TextInput/TextInputSiteBuild/contents.js":
/*!*******************************************************************************!*\
  !*** ./src/OnboardingSPA/components/TextInput/TextInputSiteBuild/contents.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);


const getContents = charactersLeft => {
  return {
    charactersLeftPrompt: {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(
      /* translators: %d: Character count */
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('(%d characters left)', 'wp-module-onboarding'), charactersLeft)
    }
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getContents);

/***/ }),

/***/ "./src/OnboardingSPA/components/TextInput/TextInputSiteBuild/index.js":
/*!****************************************************************************!*\
  !*** ./src/OnboardingSPA/components/TextInput/TextInputSiteBuild/index.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _contents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contents */ "./src/OnboardingSPA/components/TextInput/TextInputSiteBuild/contents.js");




const TextInputSiteBuild = _ref => {
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
  const [inputText, setInputText] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('nfd-input__field');
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    textareaRef.current.style.height = height;
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + 'px';
  }, [textValue]);

  const onTextChange = e => {
    e.preventDefault();
    textValueSetter(e.target.value);

    if (e.target.value.length === maxCharacters) {
      setInputText('nfd-input__field nfd-input__field_error');
    } else {
      setInputText('nfd-input__field');
    }
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-input"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: inputText
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-input__label"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "nfd-input__label_title"
  }, title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "nfd-input__label_maxChar"
  }, (0,_contents__WEBPACK_IMPORTED_MODULE_1__["default"])(maxCharacters - (textValue === null || textValue === void 0 ? void 0 : textValue.length)).charactersLeftPrompt.text)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("textarea", {
    type: "text",
    className: inputText,
    ref: textareaRef,
    style: {
      height
    },
    placeholder: placeholder,
    value: textValue,
    maxLength: maxCharacters,
    onChange: e => onTextChange(e)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "nfd-input__hint"
  }, hint)));
};

const TextInputSiteBuildMemo = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(TextInputSiteBuild);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TextInputSiteBuildMemo);

/***/ }),

/***/ "./src/OnboardingSPA/components/Tooltip/index.js":
/*!*******************************************************!*\
  !*** ./src/OnboardingSPA/components/Tooltip/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tooltip);

/***/ }),

/***/ "./src/OnboardingSPA/steps/BasicInfo/basicInfoForm.js":
/*!************************************************************!*\
  !*** ./src/OnboardingSPA/steps/BasicInfo/basicInfoForm.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _contents__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contents */ "./src/OnboardingSPA/steps/BasicInfo/contents.js");
/* harmony import */ var _components_TextInput_TextInputSiteBuild__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/TextInput/TextInputSiteBuild */ "./src/OnboardingSPA/components/TextInput/TextInputSiteBuild/index.js");
/* harmony import */ var _components_SkipButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/SkipButton */ "./src/OnboardingSPA/components/SkipButton/index.js");
/* harmony import */ var _components_MiniPreview__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/MiniPreview */ "./src/OnboardingSPA/components/MiniPreview/index.js");
/* harmony import */ var _components_Animate__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/Animate */ "./src/OnboardingSPA/components/Animate/index.js");
/* harmony import */ var _utils_api_settings__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/api/settings */ "./src/OnboardingSPA/utils/api/settings.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _components_ImageUploader_components_ImageUploaderWithIcon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../components/ImageUploader/components/ImageUploaderWithIcon */ "./src/OnboardingSPA/components/ImageUploader/components/ImageUploaderWithIcon/index.js");
/* harmony import */ var _components_SocialMediaForm__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../components/SocialMediaForm */ "./src/OnboardingSPA/components/SocialMediaForm/index.js");













/**
 * Basic Info Form.
 *
 * @return {WPComponent} BasicInfoForm Component
 */

const BasicInfoForm = () => {
  const socialMediaRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const [flowData, setFlowData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const [isLoaded, setisLoaded] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [debouncedFlowData, setDebouncedFlowData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const [siteTitle, setSiteTitle] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [siteDesc, setSiteDesc] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [siteLogo, setSiteLogo] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const [socialData, setSocialData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const [isSocialFormOpen, setIsSocialFormOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const {
    setOnboardingSocialData,
    setCurrentOnboardingData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_9__.store);
  const {
    editEntityRecord
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_2__.store);
  const {
    getEditedEntityRecord
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    return select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_2__.store);
  }, []);
  const {
    currentData
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    return {
      currentData: select(_store__WEBPACK_IMPORTED_MODULE_9__.store).getCurrentOnboardingData()
    };
  }, []);
  const content = (0,_contents__WEBPACK_IMPORTED_MODULE_3__["default"])();

  function setDefaultData() {
    if (isLoaded) {
      var _flowData$data, _flowData$data$blogNa, _flowData$data2, _flowData$data$blogDe, _flowData$data3;

      setSiteLogo(flowData === null || flowData === void 0 ? void 0 : (_flowData$data = flowData.data) === null || _flowData$data === void 0 ? void 0 : _flowData$data.siteLogo);
      setSiteTitle((_flowData$data$blogNa = flowData === null || flowData === void 0 ? void 0 : (_flowData$data2 = flowData.data) === null || _flowData$data2 === void 0 ? void 0 : _flowData$data2.blogName) !== null && _flowData$data$blogNa !== void 0 ? _flowData$data$blogNa : '');
      setSiteDesc((_flowData$data$blogDe = flowData === null || flowData === void 0 ? void 0 : (_flowData$data3 = flowData.data) === null || _flowData$data3 === void 0 ? void 0 : _flowData$data3.blogDescription) !== null && _flowData$data$blogDe !== void 0 ? _flowData$data$blogDe : '');
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
    if (isSocialFormOpen) {
      socialMediaRef.current.scrollIntoView();
    }
  }, [isSocialFormOpen]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    async function getFlowData() {
      const socialDataAPI = await (0,_utils_api_settings__WEBPACK_IMPORTED_MODULE_8__.getSettings)();
      setSocialData(socialDataAPI === null || socialDataAPI === void 0 ? void 0 : socialDataAPI.body);
      setFlowData(currentData);
      setDebouncedFlowData(flowData);
      setisLoaded(true);
      setOnboardingSocialData(socialDataAPI === null || socialDataAPI === void 0 ? void 0 : socialDataAPI.body);
    }

    if (!isLoaded) {
      getFlowData();
    }

    getEditedEntityRecord('root', 'site');
    setDefaultData();
  }, [isLoaded]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const timerId = setTimeout(() => {
      if (isLoaded) {
        setDebouncedFlowData(createSaveData());
      }
    }, 600);
    return () => {
      clearTimeout(timerId);
    };
  }, [siteTitle, siteDesc, siteLogo, socialData]);

  const updateCoreStore = (siteLogoTemp, siteTitleTemp, siteDescTemp) => {
    editEntityRecord('root', 'site', undefined, {
      site_logo: siteLogoTemp !== null && siteLogoTemp !== void 0 && siteLogoTemp.id ? siteLogoTemp.id : null,
      description: siteDescTemp,
      title: siteTitleTemp
    });
  };

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const saveData = async () => {
      var _debouncedFlowData$da, _debouncedFlowData$da2, _debouncedFlowData$da3;

      const currentDataCopy = currentData;
      currentDataCopy.data.siteLogo = (_debouncedFlowData$da = debouncedFlowData.data.siteLogo) !== null && _debouncedFlowData$da !== void 0 ? _debouncedFlowData$da : currentDataCopy.data.siteLogo;
      currentDataCopy.data.blogName = (_debouncedFlowData$da2 = debouncedFlowData.data.blogName) !== null && _debouncedFlowData$da2 !== void 0 ? _debouncedFlowData$da2 : currentDataCopy.data.blogName;
      currentDataCopy.data.blogDescription = (_debouncedFlowData$da3 = debouncedFlowData.data.blogDescription) !== null && _debouncedFlowData$da3 !== void 0 ? _debouncedFlowData$da3 : currentDataCopy.data.blogDescription;
      updateCoreStore(currentDataCopy.data.siteLogo, currentDataCopy.data.blogName, currentDataCopy.data.blogDescription);
      setCurrentOnboardingData(currentDataCopy);
    };

    if (debouncedFlowData) {
      saveData();
    }
  }, [debouncedFlowData]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Animate__WEBPACK_IMPORTED_MODULE_7__["default"], {
    type: 'fade-in-disabled',
    after: typeof flowData === 'object' && typeof socialData === 'object'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'basic-info'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "basic-info-form"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "basic-info-form__left"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_TextInput_TextInputSiteBuild__WEBPACK_IMPORTED_MODULE_4__["default"], {
    title: content.siteTitle.title,
    hint: content.siteTitle.hint,
    placeholder: content.siteTitle.placeholder,
    maxCharacters: content.siteTitle.maxCharacters,
    height: "47px",
    textValue: siteTitle,
    textValueSetter: setSiteTitle
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_TextInput_TextInputSiteBuild__WEBPACK_IMPORTED_MODULE_4__["default"], {
    title: content.siteDesc.title,
    hint: content.siteDesc.hint,
    placeholder: content.siteDesc.placeholder,
    maxCharacters: content.siteDesc.maxCharacters,
    height: "100px",
    textValue: siteDesc,
    textValueSetter: setSiteDesc
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: socialMediaRef
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_SocialMediaForm__WEBPACK_IMPORTED_MODULE_11__["default"], {
    socialData: socialData,
    setSocialData: setSocialData,
    isSocialFormOpen: isSocialFormOpen,
    setIsSocialFormOpen: setIsSocialFormOpen
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "basic-info-form__right"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_ImageUploader_components_ImageUploaderWithIcon__WEBPACK_IMPORTED_MODULE_10__["default"], {
    icon: siteLogo,
    iconSetter: setSiteLogo
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_MiniPreview__WEBPACK_IMPORTED_MODULE_6__["default"], {
    icon: siteLogo,
    title: siteTitle,
    desc: siteDesc,
    isSocialFormOpen: isSocialFormOpen,
    setIsSocialFormOpen: setIsSocialFormOpen
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_SkipButton__WEBPACK_IMPORTED_MODULE_5__["default"], null)));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BasicInfoForm);

/***/ }),

/***/ "./src/OnboardingSPA/steps/BasicInfo/contents.js":
/*!*******************************************************!*\
  !*** ./src/OnboardingSPA/steps/BasicInfo/contents.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_locales_translations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/locales/translations */ "./src/OnboardingSPA/utils/locales/translations.js");



const getContents = () => {
  return {
    heading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(
    /* translators: %s: website or store */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Introduce us to this %s', 'wp-module-onboarding'), (0,_utils_locales_translations__WEBPACK_IMPORTED_MODULE_1__.translations)('website')),
    subheading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('So we can introduce it to the web', 'wp-module-onboarding'),
    siteTitle: {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(
      /* translators: %s: Site */
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('%s Title', 'wp-module-onboarding'), (0,_utils_locales_translations__WEBPACK_IMPORTED_MODULE_1__.translations)('Site')),
      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(
      /* translators: %s: Site or Store */
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('WordPress %s', 'wp-module-onboarding'), (0,_utils_locales_translations__WEBPACK_IMPORTED_MODULE_1__.translations)('Site')),
      hint: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Shown to visitors, search engine and social media posts.', 'wp-module-onboarding'),
      maxCharacters: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('80', 'wp-module-onboarding')
    },
    siteDesc: {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(
      /* translators: %s: Site or Store */
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('%s Description', 'wp-module-onboarding'), (0,_utils_locales_translations__WEBPACK_IMPORTED_MODULE_1__.translations)('Site')),
      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(
      /* translators: %s: Site or Store */
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Just another WordPress %s.', 'wp-module-onboarding'), (0,_utils_locales_translations__WEBPACK_IMPORTED_MODULE_1__.translations)('Site')),
      hint: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(
      /* translators: %s: site or store */
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Tell people who you are, what you sell and why they should visit your %s.', 'wp-module-onboarding'), (0,_utils_locales_translations__WEBPACK_IMPORTED_MODULE_1__.translations)('site')),
      maxCharacters: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('160', 'wp-module-onboarding')
    },
    error: {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Error Saving Data, Try Again!', 'wp-module-onboarding')
    }
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getContents);

/***/ }),

/***/ "./src/OnboardingSPA/steps/BasicInfo/index.js":
/*!****************************************************!*\
  !*** ./src/OnboardingSPA/steps/BasicInfo/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Layouts_Common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Layouts/Common */ "./src/OnboardingSPA/components/Layouts/Common.js");
/* harmony import */ var _components_Heading_HeadingWithSubHeading__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Heading/HeadingWithSubHeading */ "./src/OnboardingSPA/components/Heading/HeadingWithSubHeading/index.js");
/* harmony import */ var _basicInfoForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./basicInfoForm */ "./src/OnboardingSPA/steps/BasicInfo/basicInfoForm.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../constants */ "./src/constants.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _contents__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./contents */ "./src/OnboardingSPA/steps/BasicInfo/contents.js");











const StepBasicInfo = () => {
  const isLargeViewport = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_7__.useViewportMatch)('medium');
  const {
    setIsDrawerOpened,
    setDrawerActiveView,
    setSidebarActiveView,
    setIsDrawerSuppressed,
    setIsHeaderNavigationEnabled
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_5__.store);
  const content = (0,_contents__WEBPACK_IMPORTED_MODULE_8__["default"])();
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
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Heading_HeadingWithSubHeading__WEBPACK_IMPORTED_MODULE_2__["default"], {
    title: content.heading,
    subtitle: content.subheading
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_basicInfoForm__WEBPACK_IMPORTED_MODULE_3__["default"], null));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StepBasicInfo);

/***/ }),

/***/ "./src/OnboardingSPA/utils/api/uploader.js":
/*!*************************************************!*\
  !*** ./src/OnboardingSPA/utils/api/uploader.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "uploadImage": () => (/* binding */ uploadImage)
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

/***/ })

}]);
//# sourceMappingURL=src_OnboardingSPA_steps_BasicInfo_index_js.js.map