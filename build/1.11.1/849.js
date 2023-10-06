"use strict";(globalThis.webpackChunknewfold_Onboarding=globalThis.webpackChunknewfold_Onboarding||[]).push([[849],{4401:(e,t,a)=>{a.d(t,{V:()=>s});var r=a(9307),o=a(5634),n=a(1526),l=a(950);const s=e=>{let{title:t,subtitle:a,error:s}=e;return(0,r.createElement)(o.Z,{className:"step-error-state",isVerticallyCentered:!0},(0,r.createElement)(n.Z,{title:t,subtitle:a}),(0,r.createElement)("div",{className:"step-error-state__logo"}),(0,r.createElement)("h3",{className:"step-error-state__error"},s),(0,r.createElement)(l.Z,null))}},9291:(e,t,a)=>{a.d(t,{L:()=>l,Y:()=>r.Z});var r=a(35),o=a(9307),n=a(682);const l=()=>(0,o.createElement)("div",{className:"image-upload-loader--loading-box"},(0,o.createElement)(n.Z,{type:"load",className:"image-upload-loader--loading-box__loader"}))},3124:(e,t,a)=>{a.d(t,{U:()=>N});var r=a(9307),o=a(9818),n=a(4333),l=a(5736),s=a(9291),i=a(2503),d=a(7625),u=a(2200),c=a(4401);var m=a(9250),w=a(4310),h=a(5609),p=a(4184),b=a.n(p),g=a(7207),_=a(7533),v=a(8395),E=a(8297),f=a(6342),y=a(3421);const S=e=>{let{buttonText:t=(0,l.__)("Exit to WordPress","wp-module-onboarding"),showButtonIcon:a=!0,showButton:n=!0,buttonVariant:s="secondary",buttonClassName:d=!1,isModalOpen:c=!1,modalTitle:p=(0,l.__)("Exit without finishing?","wp-module-onboarding"),modalText:S=!1,modalPrimaryCloseButtonText:N=(0,l.__)("Continue","wp-module-onboarding"),modalOnClose:T=!1,modalExitButtonText:C=(0,l.__)("Exit","wp-module-onboarding")}=e;const[D,x]=(0,r.useState)(c),k=()=>{"function"==typeof T&&T(),x(!1)},B=(0,m.TH)(),{currentData:V,brandName:O,socialData:P,currentStep:Z}=(0,o.useSelect)((e=>({currentData:e(i.h).getCurrentOnboardingData(),brandName:e(i.h).getNewfoldBrandName(),socialData:e(i.h).getOnboardingSocialData(),currentStep:e(i.h).getCurrentStep()})),[]),{setOnboardingSocialData:G}=(0,o.useDispatch)(i.h);return S||(S=(0,l.sprintf)(
/* translators: %s: Brand */
(0,l.__)("You can restart onboarding from your %s Settings page.","wp-module-onboarding"),O)),(0,r.createElement)(r.Fragment,null,n&&(0,r.createElement)(h.Button,{icon:!!a&&w.Z,variant:s,onClick:()=>x(!0),className:b()("nfd-onboarding-etw__trigger",d)},t),D&&(0,r.createElement)(h.Modal,{title:p,onRequestClose:()=>k()},(0,r.createElement)("p",null,S),(0,r.createElement)(h.ButtonGroup,{className:"nfd-onboarding-etw__buttons"},(0,r.createElement)(h.Button,{variant:"secondary",onClick:()=>k()},N),(0,r.createElement)(h.Button,{variant:"primary",onClick:()=>async function(e){if(V){if(V.hasExited=(new Date).getTime(),null!=e&&e.includes("basic-info")){const e=await async function(){const e=await(0,v.Gw)(),t=await(0,v.I2)(P);return null!==(null==t?void 0:t.error)?null==e?void 0:e.body:null==t?void 0:t.body}();e&&G(e)}(0,_.kB)(V)}(0,y.jd)(),(0,E.tH)(new E.Z_(f._C,Z.title)),await g.v.dispatchEvents(f.En),window.location.replace(u.br)}(B.pathname)},C))))},N=e=>{let{children:t,navigationStateCallback:a=!1,refresh:m=!0}=e;const w=(0,n.useViewportMatch)("medium"),{storedThemeStatus:h,brandName:p}=(0,o.useSelect)((e=>({storedThemeStatus:e(i.h).getThemeStatus(),brandName:e(i.h).getNewfoldBrandName()})),[]),b=(e=>({loader:{title:(0,l.sprintf)(
/* translators: %s: Brand */
(0,l.__)("Preparing your %s design studio","wp-module-onboarding"),e),subtitle:(0,l.__)("Hang tight while we show you some of the best WordPress has to offer!","wp-module-onboarding")},errorState:{title:(0,l.sprintf)(
/* translators: %s: Brand */
(0,l.__)("Preparing your %s design studio","wp-module-onboarding"),e),subtitle:(0,l.__)("Hang tight while we show you some of the best WordPress has to offer!","wp-module-onboarding"),error:(0,l.__)("Uh-oh, something went wrong. Please contact support.","wp-module-onboarding")}}))(p),{updateThemeStatus:g,setIsDrawerOpened:_,setIsDrawerSuppressed:v,setIsHeaderNavigationEnabled:E}=(0,o.useDispatch)(i.h),f=()=>{switch(h){case u.Rq:case u.GV:return(()=>{if("function"==typeof a)return a();w&&_(!0),v(!1),E(!0)})();default:_(!1),v(!0),E(!1)}};(0,r.useEffect)((()=>{f(),h===u.a0&&(async()=>{const e=await(async()=>{const e=await(0,d.YL)(u.DY);return null!=e&&e.error?u.vv:e.body.status})();switch(e){case u.Zh:(async()=>{(await(0,d.sN)(u.DY)).error||!0!==m?y():window.location.reload()})();break;case u.GV:!0===m&&window.location.reload();break;default:g(e)}})()}),[h]);const y=async()=>{if(g(u.Zh),(await(0,d.N9)(u.DY,!0,!1)).error)return g(u.Rq);!0===m&&window.location.reload()};return(0,r.createElement)(r.Fragment,null,(()=>{switch(h){case u.vv:return(0,r.createElement)(S,{showButton:!1,isModalOpen:!0,modalTitle:(0,l.__)("It looks like you may have an existing website","wp-module-onboarding"),modalText:(0,l.__)("Going through this setup will change your active theme, WordPress settings, add content – would you like to continue?","wp-module-onboarding"),modalOnClose:y,modalExitButtonText:(0,l.__)("Exit to WordPress","wp-module-onboarding")});case u.Rq:return(0,r.createElement)(c.V,{title:b.errorState.title,subtitle:b.errorState.subtitle,error:b.errorState.error});case u.GV:return t;default:return(0,r.createElement)(s.Y,{title:b.loader.title,subtitle:b.loader.subtitle})}})())}},1849:(e,t,a)=>{a.r(t),a.d(t,{default:()=>w});var r=a(9307),o=a(9250),n=a(9818),l=a(6138),s=a(2503),i=a(5634),d=a(3124),u=a(6332),c=a(2200),m=a(8548);const w=()=>{const e=(0,o.TH)(),[t,a]=(0,r.useState)(),{currentStep:w,themeStatus:h}=(0,n.useSelect)((t=>({currentStep:t(s.h).getStepFromPath(e.pathname),themeStatus:t(s.h).getThemeStatus()})),[]),{setDrawerActiveView:p,setSidebarActiveView:b,updateThemeStatus:g}=(0,n.useDispatch)(s.h);return(0,r.useEffect)((()=>{b(c.Jq),p(c.qR)}),[]),(0,r.useEffect)((()=>{c.GV===h&&(async()=>{var e,t,r;const o=await(0,l.C)(null!==(e=null==w||null===(t=w.data)||void 0===t?void 0:t.patternId)&&void 0!==e?e:null===(r=m.Ub[0])||void 0===r?void 0:r.data.patternId,!0);if(null!=o&&o.error)return g(c.a0);a(null==o?void 0:o.body)})()}),[h]),(0,r.createElement)(d.U,null,(0,r.createElement)(u.V3,null,(0,r.createElement)(i.Z,{className:"theme-colors-preview"},(0,r.createElement)("div",{className:"theme-colors-preview__title-bar"},(0,r.createElement)("div",{className:"theme-colors-preview__title-bar__browser"},(0,r.createElement)("span",{className:"theme-colors-preview__title-bar__browser__dot"}),(0,r.createElement)("span",{className:"theme-colors-preview__title-bar__browser__dot"}),(0,r.createElement)("span",{className:"theme-colors-preview__title-bar__browser__dot"}))),!t&&(0,r.createElement)(u.i5,{styling:"large",viewportWidth:1300}),t&&(0,r.createElement)(u.i5,{blockGrammer:t,styling:"large",viewportWidth:1300}))))}}}]);