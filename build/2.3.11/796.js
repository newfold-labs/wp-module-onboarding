"use strict";(globalThis.webpackChunknewfold_Onboarding=globalThis.webpackChunknewfold_Onboarding||[]).push([[796],{5796:(e,t,a)=>{a.r(t),a.d(t,{default:()=>k});var n=a(1609),r=a(8468),o=a(6427),i=a(148),l=a(7143),s=a(7677),c=a(1607),u=a(6655),d=a(7723),m=a(6079),g=a(7675),p=a(8969),E=a(8559),h=a(1056),b=a(2202),v=a(67);const w=({path:e,showErrorDialog:t,disabled:a})=>{const{setNavErrorContinuePath:r}=(0,l.useDispatch)(g.M),u=(0,i.Zp)();return(0,n.createElement)(o.Button,{className:"navigation-buttons navigation-buttons_back",onClick:()=>{!1!==t?r(e):u(e,{state:{origin:"header"}})},variant:"secondary",disabled:a},(0,n.createElement)(s.A,{icon:c.A}),(0,d.__)("Back","wp-module-onboarding"))},D=({path:e,showErrorDialog:t})=>{const{setNavErrorContinuePath:a}=(0,l.useDispatch)(g.M),r=(0,i.Zp)();return(0,n.createElement)(o.Button,{onClick:()=>{!1!==t?a(e):r(e,{state:{origin:"header"}})},variant:"primary",className:"navigation-buttons navigation-buttons_next"},(0,d.__)("Next","wp-module-onboarding"),(0,n.createElement)(s.A,{icon:u.A}))};async function S(e){e&&(e.isComplete=(new Date).getTime(),e.data.siteOverrideConsent=!1,(0,m.V1)(e)),(0,E.YR)(),(0,h.SV)(new h.iC(b.Vg)),window.location.replace(p.R0)}const _=({currentData:e,saveDataAndExitFunc:t})=>(0,n.createElement)(o.Button,{onClick:()=>t(e),className:"navigation-buttons navigation-buttons_finish",variant:"primary"},(0,d.__)("Finish","wp-module-onboarding"),(0,n.createElement)(s.A,{icon:u.A})),C=()=>{const{currentStep:e,previousStep:t,nextStep:a,currentData:r,showErrorDialog:i}=(0,l.useSelect)((e=>({currentStep:e(g.M).getCurrentStep(),nextStep:e(g.M).getNextStep(),previousStep:e(g.M).getPreviousStep(),currentData:e(g.M).getCurrentOnboardingData(),showErrorDialog:e(g.M).getShowErrorDialog()})),[]),s=null===t||!1===t,c=null===a||!1===a;return(0,n.createElement)("div",{className:"nfd-onboarding-header__step-navigation"},(0,n.createElement)(o.ButtonGroup,{style:{display:"flex",columnGap:"0.5rem"}},s||c?null:(0,n.createElement)(w,{path:t.path,showErrorDialog:i,disabled:e===v.H&&r.continueWithoutAi}),c?(0,n.createElement)(_,{currentData:r,saveDataAndExitFunc:S}):(0,n.createElement)(D,{path:a.path,showErrorDialog:i})))},M=()=>{const{sidebars:e,isHeaderNavigationEnabled:t}=(0,l.useSelect)((e=>({sidebars:e(g.M).getSidebars(),isHeaderNavigationEnabled:e(g.M).isHeaderNavigationEnabled()})));return(0,n.createElement)(r.Fragment,null,t&&(0,n.createElement)(C,null),e.map((e=>(0,n.createElement)(o.Slot,{key:e.id,name:`${p.Qs}/${e.id}`}))))};var N=a(5748);const k=(0,r.memo)((()=>{const e=(0,i.zy)(),t=v.H.path===e?.pathname;return(0,n.createElement)(n.Fragment,null,(0,n.createElement)(o.Fill,{name:`${p.Mw}/${p.nK}`},t?(0,n.createElement)(N.A,{origin:"header-first-step"}):null),(0,n.createElement)(o.Fill,{name:`${p.Mw}/${p.KZ}`},(0,n.createElement)(M,null)))}))}}]);