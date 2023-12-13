"use strict";(globalThis.webpackChunknewfold_Onboarding=globalThis.webpackChunknewfold_Onboarding||[]).push([[696],{4401:(e,t,a)=>{a.d(t,{V:()=>i});var n=a(9307),o=a(5634),r=a(6653),l=a(950);const i=e=>{let{title:t,subtitle:a,error:i}=e;return(0,n.createElement)(o.Z,{className:"step-error-state",isVerticallyCentered:!0},(0,n.createElement)(r.Z,{title:t,subtitle:a}),(0,n.createElement)("div",{className:"step-error-state__logo"}),(0,n.createElement)("h3",{className:"step-error-state__error"},i),(0,n.createElement)(l.Z,null))}},1760:(e,t,a)=>{a.d(t,{Z:()=>l});var n=a(9307),o=a(4184),r=a.n(o);const l=e=>{let{className:t="",size:a,colGap:o=0,children:l}=e;return(0,n.createElement)("div",{className:r()("nfd-onboarding-grid",t),style:{gridTemplateColumns:`repeat(${a}, 1fr)`,gridColumnGap:`${o}px`}},l)}},9291:(e,t,a)=>{a.d(t,{L:()=>l,Y:()=>n.Z});var n=a(35),o=a(9307),r=a(682);const l=()=>(0,o.createElement)("div",{className:"image-upload-loader--loading-box"},(0,o.createElement)(r.Z,{type:"load",className:"image-upload-loader--loading-box__loader"}))},3124:(e,t,a)=>{a.d(t,{U:()=>C});var n=a(9307),o=a(9818),r=a(4333),l=a(5736),i=a(9291),s=a(4403),d=a(7625),u=a(2200),c=a(4401);var m=a(9250),g=a(3762),h=a(5609),p=a(4184),w=a.n(p),b=a(7207),v=a(7533),_=a(8395),f=a(8297),E=a(6342),y=a(3421),S=a(3568);const N=e=>{let{buttonText:t=(0,l.__)("Exit to WordPress","wp-module-onboarding"),showButtonIcon:a=!0,showButton:r=!0,buttonVariant:i="secondary",buttonClassName:d=!1,isModalOpen:c=!1,modalTitle:p=(0,l.__)("Exit without finishing?","wp-module-onboarding"),modalText:N=!1,modalPrimaryCloseButtonText:C=(0,l.__)("Continue","wp-module-onboarding"),modalOnClose:D=!1,modalExitButtonText:T=(0,l.__)("Exit","wp-module-onboarding")}=e;const[k,x]=(0,n.useState)(c),P=()=>{"function"==typeof D&&D(),x(!1)},B=(0,m.TH)(),{currentData:V,brandName:Z,socialData:O,currentStep:G}=(0,o.useSelect)((e=>({currentData:e(s.h).getCurrentOnboardingData(),brandName:e(s.h).getNewfoldBrandName(),socialData:e(s.h).getOnboardingSocialData(),currentStep:e(s.h).getCurrentStep()})),[]),{setOnboardingSocialData:Y}=(0,o.useDispatch)(s.h);return N||(N=(0,l.sprintf)(
/* translators: %s: Brand */
(0,l.__)("You can restart onboarding from your %s Settings page.","wp-module-onboarding"),Z)),(0,n.createElement)(n.Fragment,null,r&&(0,n.createElement)(h.Button,{icon:!!a&&g.Z,variant:i,onClick:()=>x(!0),className:w()("nfd-onboarding-etw__trigger",d)},t),k&&(0,n.createElement)(h.Modal,{title:p,onRequestClose:()=>P()},(0,n.createElement)("p",null,N),(0,n.createElement)(h.ButtonGroup,{className:"nfd-onboarding-etw__buttons"},(0,n.createElement)(h.Button,{variant:"secondary",onClick:()=>P()},C),(0,n.createElement)(h.Button,{variant:"primary",onClick:()=>async function(e){if(V){var t;if(V.hasExited=(new Date).getTime(),null!=e&&e.includes("basic-info")){const e=await async function(){const e=await(0,_.Gw)(),t=await(0,_.I2)(O);return null!==(null==t?void 0:t.error)?null==e?void 0:e.body:null==t?void 0:t.body}();e&&Y(e)}(0,v.kB)(V),(0,S.a)(null==V||null===(t=V.data)||void 0===t?void 0:t.comingSoon)}(0,y.jd)(),(0,f.tH)(new f.Z_(E._C,G.title)),await b.v.dispatchEvents(E.En),window.location.replace(u.br)}(B.pathname)},T))))},C=e=>{let{children:t,navigationStateCallback:a=!1,refresh:m=!0}=e;const g=(0,r.useViewportMatch)("medium"),{storedThemeStatus:h,brandName:p}=(0,o.useSelect)((e=>({storedThemeStatus:e(s.h).getThemeStatus(),brandName:e(s.h).getNewfoldBrandName()})),[]),w=(e=>({loader:{title:(0,l.sprintf)(
/* translators: %s: Brand */
(0,l.__)("Preparing your %s design studio","wp-module-onboarding"),e),subtitle:(0,l.__)("Hang tight while we show you some of the best WordPress has to offer!","wp-module-onboarding")},errorState:{title:(0,l.sprintf)(
/* translators: %s: Brand */
(0,l.__)("Preparing your %s design studio","wp-module-onboarding"),e),subtitle:(0,l.__)("Hang tight while we show you some of the best WordPress has to offer!","wp-module-onboarding"),error:(0,l.__)("Uh-oh, something went wrong. Please contact support.","wp-module-onboarding")}}))(p),{updateThemeStatus:b,setIsDrawerOpened:v,setIsDrawerSuppressed:_,setIsHeaderNavigationEnabled:f}=(0,o.useDispatch)(s.h),E=()=>{switch(h){case u.Rq:case u.GV:return(()=>{if("function"==typeof a)return a();g&&v(!0),_(!1),f(!0)})();default:v(!1),_(!0),f(!1)}};(0,n.useEffect)((()=>{E(),h===u.a0&&(async()=>{const e=await(async()=>{const e=await(0,d.YL)(u.DY);return null!=e&&e.error?u.vv:e.body.status})();switch(e){case u.Zh:(async()=>{(await(0,d.sN)(u.DY)).error||!0!==m?y():window.location.reload()})();break;case u.GV:!0===m&&window.location.reload();break;default:b(e)}})()}),[h]);const y=async()=>{if(b(u.Zh),(await(0,d.N9)(u.DY,!0,!1)).error)return b(u.Rq);!0===m&&window.location.reload()};return(0,n.createElement)(n.Fragment,null,(()=>{switch(h){case u.vv:return(0,n.createElement)(N,{showButton:!1,isModalOpen:!0,modalTitle:(0,l.__)("It looks like you may have an existing website","wp-module-onboarding"),modalText:(0,l.__)("Going through this setup will change your active theme, WordPress settings, add content – would you like to continue?","wp-module-onboarding"),modalOnClose:y,modalExitButtonText:(0,l.__)("Exit to WordPress","wp-module-onboarding")});case u.Rq:return(0,n.createElement)(c.V,{title:w.errorState.title,subtitle:w.errorState.subtitle,error:w.errorState.error});case u.GV:return t;default:return(0,n.createElement)(i.Y,{title:w.loader.title,subtitle:w.loader.subtitle})}})())}},696:(e,t,a)=>{a.r(t),a.d(t,{default:()=>w});var n=a(9307),o=a(9818),r=a(9250),l=a(4403),i=a(5634),s=a(6653),d=a(6138),u=a(2200),c=a(3124),m=a(8797),g=a(1054),h=a(5736);var p=a(1760);const w=()=>{var e,t;const a=(0,r.TH)(),[w,b]=(0,n.useState)(),[v,_]=(0,n.useState)([]),{currentStep:f,currentData:E,themeStatus:y,themeVariations:S}=(0,o.useSelect)((e=>({currentStep:e(l.h).getStepFromPath(a.pathname),currentData:e(l.h).getCurrentOnboardingData(),themeStatus:e(l.h).getThemeStatus(),themeVariations:e(l.h).getStepPreviewData()})),[]),{setDrawerActiveView:N,setSidebarActiveView:C,updateThemeStatus:D,setCurrentOnboardingData:T}=(0,o.useDispatch)(l.h);(0,n.useEffect)((()=>{C(u.Jq),N(u.Yl)}),[]);const k=(e,t)=>!1!==t?null==t?void 0:t.reduce(((t,a)=>e.includes(a.slug)?t.concat({slug:a.slug,title:a.title}):t),[]):void 0,x=function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];_(e),E.data.sitePages.other=0!==e.length&&k(e,t),T(E)},P=(e,t)=>{!0!==e||v.includes(t)?!1===e&&x(v.filter((e=>e!==t)),w):x(v.concat(t),w)};(0,n.useEffect)((()=>{y===u.GV&&(async()=>{var e;const t=await(0,d.C)(null==f||null===(e=f.data)||void 0===e?void 0:e.patternId);if(null!=t&&t.error)return D(u.a0);if(null!=t&&t.body){var a;if(null!==(a=E.data.sitePages)&&void 0!==a&&a.other)if(!1===E.data.sitePages.other)_([]);else if(0!==E.data.sitePages.other.length)_(E.data.sitePages.other.map((e=>e.slug)));else{const e=t.body.reduce(((e,t)=>null!=t&&t.selected?e.concat(t.slug):e),[]);x(e,t.body)}b(t.body)}})()}),[y]);const B={heading:(0,h.__)("You have ideas, we have page templates","wp-module-onboarding"),subheading:(0,h.__)("Begin closer to the finish line than a blank canvas.","wp-module-onboarding")};return(0,n.createElement)(c.U,null,(0,n.createElement)(m.V3,null,(0,n.createElement)(i.Z,null,(0,n.createElement)("div",{className:"site-pages"},(0,n.createElement)(s.Z,{title:B.heading,subtitle:B.subheading}),(0,n.createElement)("div",{className:"site-pages__list"},(0,n.createElement)(p.Z,{size:2},(0,n.createElement)(g.Z,{className:"site-pages__list__item",count:null===(e=S[null==f||null===(t=f.data)||void 0===t?void 0:t.patternId])||void 0===e?void 0:e.previewCount,watch:w,isWithCard:!0,callback:()=>v&&(null==w?void 0:w.map(((e,t)=>(0,n.createElement)(m.T9,{key:t,className:"site-pages__list__item",blockGrammer:e.content,viewportWidth:1200,styling:"custom",overlay:!0,title:null==e?void 0:e.title,slug:e.slug,selected:v.includes(e.slug),onClick:P,description:null==e?void 0:e.description})))),viewportWidth:1200})))))))}}}]);