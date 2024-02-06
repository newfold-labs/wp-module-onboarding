"use strict";(globalThis.webpackChunknewfold_Onboarding=globalThis.webpackChunknewfold_Onboarding||[]).push([[386],{4386:(e,a,r)=>{r.r(a),r.d(a,{default:()=>k});var n=r(9196),t=r(9307),l=r(5736),o=r(1984),s=r(444);const c=(0,n.createElement)(s.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"-2 -2 24 24"},(0,n.createElement)(s.Path,{d:"M20 10c0-5.51-4.49-10-10-10C4.48 0 0 4.49 0 10c0 5.52 4.48 10 10 10 5.51 0 10-4.48 10-10zM7.78 15.37L4.37 6.22c.55-.02 1.17-.08 1.17-.08.5-.06.44-1.13-.06-1.11 0 0-1.45.11-2.37.11-.18 0-.37 0-.58-.01C4.12 2.69 6.87 1.11 10 1.11c2.33 0 4.45.87 6.05 2.34-.68-.11-1.65.39-1.65 1.58 0 .74.45 1.36.9 2.1.35.61.55 1.36.55 2.46 0 1.49-1.4 5-1.4 5l-3.03-8.37c.54-.02.82-.17.82-.17.5-.05.44-1.25-.06-1.22 0 0-1.44.12-2.38.12-.87 0-2.33-.12-2.33-.12-.5-.03-.56 1.2-.06 1.22l.92.08 1.26 3.41zM17.41 10c.24-.64.74-1.87.43-4.25.7 1.29 1.05 2.71 1.05 4.25 0 3.29-1.73 6.24-4.4 7.78.97-2.59 1.94-5.2 2.92-7.78zM6.1 18.09C3.12 16.65 1.11 13.53 1.11 10c0-1.3.23-2.48.72-3.59C3.25 10.3 4.67 14.2 6.1 18.09zm4.03-6.63l2.58 6.98c-.86.29-1.76.45-2.71.45-.79 0-1.57-.11-2.29-.33.81-2.38 1.62-4.74 2.42-7.1z"}));var i=r(9818),d=r(4403);const m=()=>{const{currentUserInfo:e}=(0,i.useSelect)((e=>({currentUserInfo:e(d.h).getCurrentUserDetails()})),[]);return e?(0,n.createElement)("div",{className:"nfd-onboarding-header__admin-bar"},(0,n.createElement)("div",{className:"nfd-onboarding-header__admin-bar__wplogo"},(0,n.createElement)(o.Z,{icon:c}),(0,n.createElement)("span",null,(0,l.__)("WordPress","wp-module-onboarding"))),(0,n.createElement)("div",{className:"nfd-onboarding-header__admin-bar__profile"},(0,n.createElement)("span",{className:"nfd-onboarding-header__admin-bar__profile__greeting"},(0,n.createElement)("span",null,(0,l.__)("Howdy! ","wp-module-onboarding"),e.displayName)),(0,n.createElement)("div",{className:"nfd-onboarding-header__admin-bar__profile__avatar"},(0,n.createElement)("img",{src:e.avatarUrl,alt:e.displayName})))):null},g=({progress:e=20})=>(0,n.createElement)("div",{className:"nfd-onboarding-header__progress-bar"},(0,n.createElement)("div",{style:{width:`${e}%`},className:"nfd-onboarding-header__progress-bar__progress"}));var h=r(5609),p=r(2200),u=r(9250),_=r(3762),E=r(3967),b=r.n(E);const v=({children:e,onClick:a})=>(0,n.createElement)(h.Button,{onClick:()=>a(),className:b()("nfd-onboarding-button--dark")},e);var w=r(4138),f=r(2779);const S=({path:e,showErrorDialog:a})=>{const{setNavErrorContinuePath:r}=(0,i.useDispatch)(d.h),t=(0,u.s0)();return(0,n.createElement)(v,{onClick:()=>{!1!==a?r(e):t(e,{state:{origin:"header"}})},variant:"secondary"},(0,n.createElement)(o.Z,{icon:_.Z}),(0,l.__)("Back","wp-module-onboarding"))},N=()=>{const{previousStep:e,currentStep:a,showErrorDialog:r}=(0,i.useSelect)((e=>({previousStep:e(d.h).getPreviousStep(),currentStep:e(d.h).getCurrentStep(),showErrorDialog:e(d.h).getShowErrorDialog()})),[]),t=null===e||!1===e,l=a.path===w.r.path;return(0,n.createElement)("div",{className:"nfd-onboarding-header--sitegen__step-navigation"},t?null:(0,n.createElement)(S,{path:l?f.C.path:e.path,showErrorDialog:r}))};var C=r(2819);const k=(0,t.memo)((()=>{const{isHeaderNavigationEnabled:e,currentStep:a,allSteps:r}=(0,i.useSelect)((e=>({currentStep:e(d.h).getCurrentStep(),isHeaderNavigationEnabled:e(d.h).isHeaderNavigationEnabled(),allSteps:e(d.h).getAllSteps()}))),t=(0,C.findIndex)(r,{path:a?.path}),l=Math.abs((t-1)/(r.length-1)*100);return(0,n.createElement)(n.Fragment,null,(0,n.createElement)(h.Fill,{name:`${p.G5}/${p.Hv}`},(0,n.createElement)(n.Fragment,null,(0,n.createElement)(m,null),e&&(0,n.createElement)(g,{progress:l}))),(0,n.createElement)(h.Fill,{name:`${p.G5}/${p.ZN}`},(0,n.createElement)(n.Fragment,null,e&&(0,n.createElement)(N,null))),a?.header&&(0,n.createElement)(a.header,null))}))}}]);