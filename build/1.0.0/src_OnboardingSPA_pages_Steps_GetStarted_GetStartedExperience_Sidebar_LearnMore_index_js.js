"use strict";
(self["webpackChunknewfold_Onboarding"] = self["webpackChunknewfold_Onboarding"] || []).push([["src_OnboardingSPA_pages_Steps_GetStarted_GetStartedExperience_Sidebar_LearnMore_index_js"],{

/***/ "./src/OnboardingSPA/pages/Steps/GetStarted/GetStartedExperience/Sidebar/LearnMore/contents.js":
/*!*****************************************************************************************************!*\
  !*** ./src/OnboardingSPA/pages/Steps/GetStarted/GetStartedExperience/Sidebar/LearnMore/contents.js ***!
  \*****************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_locales_translations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../utils/locales/translations */ "./src/OnboardingSPA/utils/locales/translations.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/home.js");




const getContents = (techSupportLink, fullServiceCreativeTeamLink) => {
  return {
    introduction: {
      heading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('WordPress Experience', 'wp-module-onboarding'),
      subheading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(
      /* translators: %s: site */
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)(`We can provide the best experience if you tell us a little about your %s and your needs.`, 'wp-module-onboarding'), (0,_utils_locales_translations__WEBPACK_IMPORTED_MODULE_1__.translations)('site')),
      icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__["default"]
    },
    illustration: {
      icon: 'nfd-onboarding-sidebar-learn-more-get-started-wp-experience-illustration'
    },
    information: {
      headingWithDescriptions: [{
        heading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Why we ask', 'wp-module-onboarding'),
        description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)(`We use this to help offer the best WordPress setup, features and suggestions for your site.`, 'wp-module-onboarding')
      }]
    },
    help: {
      fullService: {
        text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Hire Our Full-Service Creative Studio', 'wp-module-onboarding'),
        link: fullServiceCreativeTeamLink
      },
      support: {
        text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Technical Support', 'wp-module-onboarding'),
        link: techSupportLink
      }
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (getContents);

/***/ }),

/***/ "./src/OnboardingSPA/pages/Steps/GetStarted/GetStartedExperience/Sidebar/LearnMore/index.js":
/*!**************************************************************************************************!*\
  !*** ./src/OnboardingSPA/pages/Steps/GetStarted/GetStartedExperience/Sidebar/LearnMore/index.js ***!
  \**************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../store */ "./src/OnboardingSPA/store/index.js");
/* harmony import */ var _contents__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contents */ "./src/OnboardingSPA/pages/Steps/GetStarted/GetStartedExperience/Sidebar/LearnMore/contents.js");





const IllustrationPanel = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_components_Sidebar_components_LearnMore_IllustrationPanel_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../../../../../components/Sidebar/components/LearnMore/IllustrationPanel */ "./src/OnboardingSPA/components/Sidebar/components/LearnMore/IllustrationPanel/index.js")));
const InfoPanel = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_components_Sidebar_components_LearnMore_InfoPanel_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../../../../../components/Sidebar/components/LearnMore/InfoPanel */ "./src/OnboardingSPA/components/Sidebar/components/LearnMore/InfoPanel/index.js")));
const HelpPanel = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_components_Sidebar_components_LearnMore_HelpPanel_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../../../../../components/Sidebar/components/LearnMore/HelpPanel */ "./src/OnboardingSPA/components/Sidebar/components/LearnMore/HelpPanel/index.js")));
const ButtonWhite = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_components_Button_ButtonWhite_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../../../../../components/Button/ButtonWhite */ "./src/OnboardingSPA/components/Button/ButtonWhite/index.js")));
const SupportLink = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_components_Sidebar_components_LearnMore_SupportLink_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../../../../../components/Sidebar/components/LearnMore/SupportLink */ "./src/OnboardingSPA/components/Sidebar/components/LearnMore/SupportLink/index.js")));
const StepIntroPanel = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "src_OnboardingSPA_components_Sidebar_components_LearnMore_StepIntroPanel_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../../../../../components/Sidebar/components/LearnMore/StepIntroPanel */ "./src/OnboardingSPA/components/Sidebar/components/LearnMore/StepIntroPanel/index.js")));

const LearnMore = () => {
  const {
    techSupportLink,
    fullServiceCreativeTeamLink
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    return {
      techSupportLink: select(_store__WEBPACK_IMPORTED_MODULE_2__.store).getTechSupportUrl(),
      fullServiceCreativeTeamLink: select(_store__WEBPACK_IMPORTED_MODULE_2__.store).getfullServiceCreativeTeamUrl()
    };
  });
  const content = (0,_contents__WEBPACK_IMPORTED_MODULE_3__["default"])(techSupportLink, fullServiceCreativeTeamLink);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-onboarding-sidebar-learn-more__get-started-wp-experience"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(StepIntroPanel, {
    heading: content.introduction.heading,
    subheading: content.introduction.subheading,
    icon: content.introduction.icon
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(IllustrationPanel, {
    cssIcon: content.illustration.icon
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InfoPanel, {
    headingWithDescriptions: content.information.headingWithDescriptions
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(HelpPanel, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ButtonWhite, {
    text: content.help.fullService.text,
    onClick: () => window.open(content.help.fullService.link, '_blank')
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SupportLink, {
    text: content.help.support.text,
    link: content.help.support.link
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (LearnMore);

/***/ })

}]);
//# sourceMappingURL=src_OnboardingSPA_pages_Steps_GetStarted_GetStartedExperience_Sidebar_LearnMore_index_js.js.map