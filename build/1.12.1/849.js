"use strict";(globalThis.webpackChunknewfold_Onboarding=globalThis.webpackChunknewfold_Onboarding||[]).push([[849],{4401:(e,t,r)=>{r.d(t,{V:()=>n});var a=r(9196),o=r(5634),s=r(1526),l=r(950);const n=({title:e,subtitle:t,error:r})=>(0,a.createElement)(o.Z,{className:"step-error-state",isVerticallyCentered:!0},(0,a.createElement)(s.Z,{title:e,subtitle:t}),(0,a.createElement)("div",{className:"step-error-state__logo"}),(0,a.createElement)("h3",{className:"step-error-state__error"},r),(0,a.createElement)(l.Z,null))},9291:(e,t,r)=>{r.d(t,{L:()=>l,Y:()=>a.Z});var a=r(35),o=r(9196),s=r(682);const l=()=>(0,o.createElement)("div",{className:"image-upload-loader--loading-box"},(0,o.createElement)(s.Z,{type:"load",className:"image-upload-loader--loading-box__loader"}))},8707:(e,t,r)=>{r.d(t,{U:()=>w});var a=r(9196),o=r(9818),s=r(9307),l=r(4333),n=r(5736),i=r(9291),d=r(2503),c=r(7625),u=r(2200),m=r(4401);var h=r(1589);const w=({children:e,navigationStateCallback:t=!1,refresh:r=!0})=>{const w=(0,l.useViewportMatch)("medium"),{storedThemeStatus:p,brandName:_}=(0,o.useSelect)((e=>({storedThemeStatus:e(d.h).getThemeStatus(),brandName:e(d.h).getNewfoldBrandName()})),[]),b=(e=>({loader:{title:(0,n.sprintf)(/* translators: %s: Brand */ /* translators: %s: Brand */
(0,n.__)("Preparing your %s design studio","wp-module-onboarding"),e),subtitle:(0,n.__)("Hang tight while we show you some of the best WordPress has to offer!","wp-module-onboarding")},errorState:{title:(0,n.sprintf)(/* translators: %s: Brand */ /* translators: %s: Brand */
(0,n.__)("Preparing your %s design studio","wp-module-onboarding"),e),subtitle:(0,n.__)("Hang tight while we show you some of the best WordPress has to offer!","wp-module-onboarding"),error:(0,n.__)("Uh-oh, something went wrong. Please contact support.","wp-module-onboarding")}}))(_),{updateThemeStatus:g,setIsDrawerOpened:v,setIsDrawerSuppressed:f,setIsHeaderNavigationEnabled:E}=(0,o.useDispatch)(d.h),S=()=>{switch(p){case u.Rq:case u.GV:return(()=>{if("function"==typeof t)return t();w&&v(!0),f(!1),E(!0)})();default:v(!1),f(!0),E(!1)}};(0,s.useEffect)((()=>{S(),p===u.a0&&(async()=>{const e=await(async()=>{const e=await(0,c.YL)(u.DY);return e?.error?u.vv:e.body.status})();switch(e){case u.Zh:(async()=>{(await(0,c.sN)(u.DY)).error||!0!==r?y():window.location.reload()})();break;case u.GV:!0===r&&window.location.reload();break;default:g(e)}})()}),[p]);const y=async()=>{if(g(u.Zh),(await(0,c.N9)(u.DY,!0,!1)).error)return g(u.Rq);!0===r&&window.location.reload()};return(0,a.createElement)(s.Fragment,null,(()=>{switch(p){case u.vv:return(0,a.createElement)(h.Z,{showButton:!1,isModalOpen:!0,modalTitle:(0,n.__)("It looks like you may have an existing website","wp-module-onboarding"),modalText:(0,n.__)("Going through this setup will change your active theme, WordPress settings, add content – would you like to continue?","wp-module-onboarding"),modalOnClose:y,modalExitButtonText:(0,n.__)("Exit to WordPress","wp-module-onboarding")});case u.Rq:return(0,a.createElement)(m.V,{title:b.errorState.title,subtitle:b.errorState.subtitle,error:b.errorState.error});case u.GV:return e;default:return(0,a.createElement)(i.Y,{title:b.loader.title,subtitle:b.loader.subtitle})}})())}},1849:(e,t,r)=>{r.r(t),r.d(t,{default:()=>w});var a=r(9196),o=r(9250),s=r(9307),l=r(9818),n=r(6138),i=r(2503),d=r(5634),c=r(8707),u=r(6332),m=r(2200),h=r(8548);const w=()=>{const e=(0,o.TH)(),[t,r]=(0,s.useState)(),{currentStep:w,themeStatus:p}=(0,l.useSelect)((t=>({currentStep:t(i.h).getStepFromPath(e.pathname),themeStatus:t(i.h).getThemeStatus()})),[]),{setDrawerActiveView:_,setSidebarActiveView:b,updateThemeStatus:g}=(0,l.useDispatch)(i.h);return(0,s.useEffect)((()=>{b(m.Jq),_(m.qR)}),[]),(0,s.useEffect)((()=>{m.GV===p&&(async()=>{var e;const t=await(0,n.C)(null!==(e=w?.data?.patternId)&&void 0!==e?e:h.Ub[0]?.data.patternId,!0);if(t?.error)return g(m.a0);r(t?.body)})()}),[p]),(0,a.createElement)(c.U,null,(0,a.createElement)(u.V3,null,(0,a.createElement)(d.Z,{className:"theme-colors-preview"},(0,a.createElement)("div",{className:"theme-colors-preview__title-bar"},(0,a.createElement)("div",{className:"theme-colors-preview__title-bar__browser"},(0,a.createElement)("span",{className:"theme-colors-preview__title-bar__browser__dot"}),(0,a.createElement)("span",{className:"theme-colors-preview__title-bar__browser__dot"}),(0,a.createElement)("span",{className:"theme-colors-preview__title-bar__browser__dot"}))),!t&&(0,a.createElement)(u.i5,{styling:"large",viewportWidth:1300}),t&&(0,a.createElement)(u.i5,{blockGrammer:t,styling:"large",viewportWidth:1300}))))}}}]);