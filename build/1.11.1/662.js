"use strict";(globalThis.webpackChunknewfold_Onboarding=globalThis.webpackChunknewfold_Onboarding||[]).push([[662],{4401:(e,t,a)=>{a.d(t,{V:()=>i});var n=a(9307),r=a(5634),o=a(1526),l=a(950);const i=e=>{let{title:t,subtitle:a,error:i}=e;return(0,n.createElement)(r.Z,{className:"step-error-state",isVerticallyCentered:!0},(0,n.createElement)(o.Z,{title:t,subtitle:a}),(0,n.createElement)("div",{className:"step-error-state__logo"}),(0,n.createElement)("h3",{className:"step-error-state__error"},i),(0,n.createElement)(l.Z,null))}},1760:(e,t,a)=>{a.d(t,{Z:()=>l});var n=a(9307),r=a(4184),o=a.n(r);const l=e=>{let{className:t="",size:a,colGap:r=0,children:l}=e;return(0,n.createElement)("div",{className:o()("nfd-onboarding-grid",t),style:{gridTemplateColumns:`repeat(${a}, 1fr)`,gridColumnGap:`${r}px`}},l)}},9291:(e,t,a)=>{a.d(t,{L:()=>l,Y:()=>n.Z});var n=a(35),r=a(9307),o=a(682);const l=()=>(0,r.createElement)("div",{className:"image-upload-loader--loading-box"},(0,r.createElement)(o.Z,{type:"load",className:"image-upload-loader--loading-box__loader"}))},3124:(e,t,a)=>{a.d(t,{U:()=>N});var n=a(9307),r=a(9818),o=a(4333),l=a(5736),i=a(9291),s=a(2503),u=a(7625),d=a(2200),c=a(4401);var m=a(9250),g=a(4310),h=a(5609),p=a(4184),w=a.n(p),b=a(7207),_=a(7533),v=a(8395),f=a(8297),E=a(6342),y=a(3421);const S=e=>{let{buttonText:t=(0,l.__)("Exit to WordPress","wp-module-onboarding"),showButtonIcon:a=!0,showButton:o=!0,buttonVariant:i="secondary",buttonClassName:u=!1,isModalOpen:c=!1,modalTitle:p=(0,l.__)("Exit without finishing?","wp-module-onboarding"),modalText:S=!1,modalPrimaryCloseButtonText:N=(0,l.__)("Continue","wp-module-onboarding"),modalOnClose:C=!1,modalExitButtonText:D=(0,l.__)("Exit","wp-module-onboarding")}=e;const[T,k]=(0,n.useState)(c),x=()=>{"function"==typeof C&&C(),k(!1)},P=(0,m.TH)(),{currentData:V,brandName:Z,socialData:B,currentStep:O}=(0,r.useSelect)((e=>({currentData:e(s.h).getCurrentOnboardingData(),brandName:e(s.h).getNewfoldBrandName(),socialData:e(s.h).getOnboardingSocialData(),currentStep:e(s.h).getCurrentStep()})),[]),{setOnboardingSocialData:G}=(0,r.useDispatch)(s.h);return S||(S=(0,l.sprintf)(
/* translators: %s: Brand */
(0,l.__)("You can restart onboarding from your %s Settings page.","wp-module-onboarding"),Z)),(0,n.createElement)(n.Fragment,null,o&&(0,n.createElement)(h.Button,{icon:!!a&&g.Z,variant:i,onClick:()=>k(!0),className:w()("nfd-onboarding-etw__trigger",u)},t),T&&(0,n.createElement)(h.Modal,{title:p,onRequestClose:()=>x()},(0,n.createElement)("p",null,S),(0,n.createElement)(h.ButtonGroup,{className:"nfd-onboarding-etw__buttons"},(0,n.createElement)(h.Button,{variant:"secondary",onClick:()=>x()},N),(0,n.createElement)(h.Button,{variant:"primary",onClick:()=>async function(e){if(V){if(V.hasExited=(new Date).getTime(),null!=e&&e.includes("basic-info")){const e=await async function(){const e=await(0,v.Gw)(),t=await(0,v.I2)(B);return null!==(null==t?void 0:t.error)?null==e?void 0:e.body:null==t?void 0:t.body}();e&&G(e)}(0,_.kB)(V)}(0,y.jd)(),(0,f.tH)(new f.Z_(E._C,O.title)),await b.v.dispatchEvents(E.En),window.location.replace(d.br)}(P.pathname)},D))))},N=e=>{let{children:t,navigationStateCallback:a=!1,refresh:m=!0}=e;const g=(0,o.useViewportMatch)("medium"),{storedThemeStatus:h,brandName:p}=(0,r.useSelect)((e=>({storedThemeStatus:e(s.h).getThemeStatus(),brandName:e(s.h).getNewfoldBrandName()})),[]),w=(e=>({loader:{title:(0,l.sprintf)(
/* translators: %s: Brand */
(0,l.__)("Preparing your %s design studio","wp-module-onboarding"),e),subtitle:(0,l.__)("Hang tight while we show you some of the best WordPress has to offer!","wp-module-onboarding")},errorState:{title:(0,l.sprintf)(
/* translators: %s: Brand */
(0,l.__)("Preparing your %s design studio","wp-module-onboarding"),e),subtitle:(0,l.__)("Hang tight while we show you some of the best WordPress has to offer!","wp-module-onboarding"),error:(0,l.__)("Uh-oh, something went wrong. Please contact support.","wp-module-onboarding")}}))(p),{updateThemeStatus:b,setIsDrawerOpened:_,setIsDrawerSuppressed:v,setIsHeaderNavigationEnabled:f}=(0,r.useDispatch)(s.h),E=()=>{switch(h){case d.Rq:case d.GV:return(()=>{if("function"==typeof a)return a();g&&_(!0),v(!1),f(!0)})();default:_(!1),v(!0),f(!1)}};(0,n.useEffect)((()=>{E(),h===d.a0&&(async()=>{const e=await(async()=>{const e=await(0,u.YL)(d.DY);return null!=e&&e.error?d.vv:e.body.status})();switch(e){case d.Zh:(async()=>{(await(0,u.sN)(d.DY)).error||!0!==m?y():window.location.reload()})();break;case d.GV:!0===m&&window.location.reload();break;default:b(e)}})()}),[h]);const y=async()=>{if(b(d.Zh),(await(0,u.N9)(d.DY,!0,!1)).error)return b(d.Rq);!0===m&&window.location.reload()};return(0,n.createElement)(n.Fragment,null,(()=>{switch(h){case d.vv:return(0,n.createElement)(S,{showButton:!1,isModalOpen:!0,modalTitle:(0,l.__)("It looks like you may have an existing website","wp-module-onboarding"),modalText:(0,l.__)("Going through this setup will change your active theme, WordPress settings, add content – would you like to continue?","wp-module-onboarding"),modalOnClose:y,modalExitButtonText:(0,l.__)("Exit to WordPress","wp-module-onboarding")});case d.Rq:return(0,n.createElement)(c.V,{title:w.errorState.title,subtitle:w.errorState.subtitle,error:w.errorState.error});case d.GV:return t;default:return(0,n.createElement)(i.Y,{title:w.loader.title,subtitle:w.loader.subtitle})}})())}},2662:(e,t,a)=>{a.r(t),a.d(t,{default:()=>b});var n=a(9307),r=a(9250),o=a(9818),l=a(6138),i=a(2503),s=a(5634),u=a(2200),d=a(1526),c=a(3124),m=a(6332),g=a(8297),h=a(5736);var p=a(6342),w=a(1760);const b=()=>{var e;const t=(0,r.TH)(),[a,b]=(0,n.useState)(),[_,v]=(0,n.useState)([]),[f,E]=(0,n.useState)(0),{currentStep:y,currentData:S,themeStatus:N,themeVariations:C}=(0,o.useSelect)((e=>({currentStep:e(i.h).getStepFromPath(t.pathname),currentData:e(i.h).getCurrentOnboardingData(),themeStatus:e(i.h).getThemeStatus(),themeVariations:e(i.h).getStepPreviewData()})),[]),{setDrawerActiveView:D,setSidebarActiveView:T,setCurrentOnboardingData:k,updateThemeStatus:x}=(0,o.useDispatch)(i.h);(0,n.useEffect)((()=>{T(u.Jq),D(u.Yl)}),[]),(0,n.useEffect)((()=>{N===u.GV&&async function(){var e;const t=await(0,l.C)(null==y||null===(e=y.data)||void 0===e?void 0:e.patternId);if(null!=t&&t.error)return x(u.a0);b(function(e){const t=[];return e.forEach((e=>{t.push(e.content),_.push(e.slug)})),v(_),t}(null==t?void 0:t.body)),""!==(null==S?void 0:S.data.sitePages.homepage)?E(null==_?void 0:_.indexOf(null==S?void 0:S.data.sitePages.homepage)):(S.data.sitePages={...S.data.sitePages,homepage:_[0]},k(S))}()}),[N]);const P={heading:(0,h.__)("There’s no place like a great home page","wp-module-onboarding"),subheading:(0,h.__)("Pick a starter layout you can refine and remix with your content","wp-module-onboarding")};return(0,n.createElement)(c.U,null,(0,n.createElement)(m.V3,null,(0,n.createElement)(s.Z,null,(0,n.createElement)("div",{className:"homepage_preview"},(0,n.createElement)(d.Z,{title:P.heading,subtitle:P.subheading}),(0,n.createElement)("div",{className:"homepage_preview__list"},(0,n.createElement)(w.Z,{size:3,colGap:50},(0,n.createElement)(m.r9,{watch:a,count:null===(e=C[null==y?void 0:y.patternId])||void 0===e?void 0:e.previewCount,callback:function(){return null==a?void 0:a.map(((e,t)=>e?(0,n.createElement)(m.H,{key:t,className:"homepage_preview__list__item",selected:t===f,blockGrammer:e,viewportWidth:1200,styling:"custom",overlay:!1,onClick:()=>function(e){E(e);const t=_[e];S.data.sitePages={...S.data.sitePages,homepage:t},k(S),(0,g.tH)(new g.Z_(p.El,t))}(t)}):null))},className:"homepage_preview__list__item",viewportWidth:1200})))))))}}}]);