(globalThis.webpackChunknewfold_Onboarding=globalThis.webpackChunknewfold_Onboarding||[]).push([[377],{5706:(e,t)=>{(()=>{var e={537:(e,t)=>{!function(){"use strict";var e={d:function(t,n){for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r:function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},n={};e.r(n),e.d(n,{NewfoldRuntime:function(){return a}});var o=window.wp.url;const a={hasCapability:e=>!0===window.NewfoldRuntime?.capabilities[e],adminUrl:e=>window.NewfoldRuntime?.admin_url+e,createApiUrl:(e,t={})=>(0,o.addQueryArgs)(window.NewfoldRuntime?.base_url,{rest_route:e,...t}),get siteDetails(){return window.NewfoldRuntime?.site},get sdk(){return window.NewfoldRuntime?.sdk},get isWoo(){return window.NewfoldRuntime?.isWoocommerceActive},get ecommerce(){return window.NewfoldRuntime?.ecommerce},get plugin(){return window.NewfoldRuntime?.plugin},get wpversion(){return window.NewfoldRuntime?.wpversion},get siteTitle(){return window.NewfoldRuntime?.siteTitle}};var r=t;for(var i in n)r[i]=n[i];n.__esModule&&Object.defineProperty(r,"__esModule",{value:!0})}()},967:(e,t)=>{var n;!function(){"use strict";var o={}.hasOwnProperty;function a(){for(var e="",t=0;t<arguments.length;t++){var n=arguments[t];n&&(e=i(e,r(n)))}return e}function r(e){if("string"==typeof e||"number"==typeof e)return e;if("object"!=typeof e)return"";if(Array.isArray(e))return a.apply(null,e);if(e.toString!==Object.prototype.toString&&!e.toString.toString().includes("[native code]"))return e.toString();var t="";for(var n in e)o.call(e,n)&&e[n]&&(t=i(t,n));return t}function i(e,t){return t?e?e+" "+t:e+t:e}e.exports?(a.default=a,e.exports=a):void 0===(n=function(){return a}.apply(t,[]))||(e.exports=n)}()}},n={};function o(t){var a=n[t];if(void 0!==a)return a.exports;var r=n[t]={exports:{}};return e[t](r,r.exports,o),r.exports}o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var a={};(()=>{"use strict";o.r(a),o.d(a,{FacebookConnectButton:()=>_,FacebookConnectPluginView:()=>p,facebookConnectHelper:()=>g,getFacebookUserProfileDetails:()=>s});const e=window.React,t=window.wp.components,n=window.wp.apiFetch;var r=o.n(n),i=o(537);const c={facebook_module:{base_url:"https://graph.facebook.com/v18.0",debug_token:"/debug_token",token_phrase:"secret_token_phrase"},wordpress:{access:i.NewfoldRuntime.createApiUrl("/newfold-facebook/v1/facebook/hiive"),fb_token:i.NewfoldRuntime.createApiUrl("/newfold-facebook/v1/facebook/fb_token"),facebook_details:i.NewfoldRuntime.createApiUrl("/newfold-facebook/v1/facebook/details"),facebook_logout:i.NewfoldRuntime.createApiUrl("/newfold-facebook/v1/facebook/logout")},cf_worker:{login_screen:"https://hiive.cloud/workers/facebook-connect/",get_token:"https://hiive.cloud/workers/facebook-connect/get/token?hiive_token=",delete_token:"https://hiive.cloud/workers/facebook-connect/delete/token?hiive_token="}},s=()=>r()({url:c.wordpress.facebook_details}).then((e=>{if(e?.details?.error)throw{message:"failed to load the data",error:e?.details?.error};return e?.details})).catch((e=>{throw{message:"failed to load the data",errorMsg:e}})),l=window.wp.i18n;var d=o(967),u=o.n(d);const _=({className:n,children:o,showData:a,onConnect:i,onDisconnect:d,onFailure:_,onClick:p})=>{const[g,m]=(0,e.useState)(""),[f,w]=(0,e.useState)(!1),[b,h]=(0,e.useState)([]),[v,k]=(0,e.useState)(!1);function E(e){var t;e.origin.search("https://hiive.cloud")<0||(k(!0),window.removeEventListener("message",E),(t=e.data,r()({url:`${c.wordpress.fb_token}`,data:t,method:"POST"})).then((e=>{y()})).catch((()=>k(!1))))}const y=()=>{s().then((e=>{"token not found!"!==e&&(w(!0),h(e),k(!1),"function"==typeof i&&i(e))})).catch((()=>r()({url:c.wordpress.access}).then((e=>{s().then((e=>{"token not found!"!==e&&(w(!0),h(e),"function"==typeof i&&i(e)),k(!1)})).catch((e=>{k(!1),"function"==typeof _&&_(e),console.error(e)})),m(e.token)})).catch((e=>{k(!1),"function"==typeof _&&_(e),console.error(e)}))))};return(0,e.useEffect)((()=>{!g&&r()({url:c.wordpress.access}).then((e=>{e.token&&m(e.token)})),y()}),[]),(0,e.createElement)("div",null,f?(0,e.createElement)("div",null,(0,e.createElement)(t.Button,{className:u()("nfd-facebook-button--connected",`${n}--connected`)},(0,l.__)("Connected","wp-module-facebook")),a&&(0,e.createElement)("div",null,b?.map((t=>(0,e.createElement)(e.Fragment,null,(0,e.createElement)("ul",{style:{paddingTop:"20px"}},(0,e.createElement)("li",null,(0,e.createElement)("p",null,"Facebook ID: ",t?.User?.profile?.id)),(0,e.createElement)("li",null,(0,e.createElement)("p",null,"User Name: ",t?.User?.profile?.name)),(0,e.createElement)("li",null,(0,e.createElement)("p",null,"User Email: ",t?.User?.profile?.email)),(0,e.createElement)("li",null,(0,e.createElement)("p",null,"Profile pic:",t?.User?.profile?.picture?.data?.url))),(0,e.createElement)("img",{src:`https://graph.facebook.com/${t?.id}/picture?type=small`,height:t?.picture?.height,width:t?.picture?.width})))))):(0,e.createElement)(t.Button,{type:"submit",disabled:v,className:u()("nfd-facebook-button--connect",`${n}--connect`),onClick:()=>(window.open(`${c.cf_worker.login_screen}?token_hiive=${g}&redirect=${window.location.href}`,"ModalPopUp",`toolbar=no,scrollbars=no,location=no,width=${window.innerWidth/2+200},height=${window.innerHeight/2+200},top=200,left=200`),window.addEventListener("message",E,!1),void("function"==typeof p&&p()))},o,(0,l.__)("Connect Facebook","wp-module-facebook"),v&&(0,e.createElement)(t.Spinner,null)))},p=({fbLogin:n,loginInfo:o,getFbDetails:a})=>{const[i,s]=(0,e.useState)(!1);return(0,e.useEffect)((()=>s(!1)),[]),n&&(0,e.createElement)("div",{style:{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingTop:"20px"}},(0,e.createElement)("div",{style:{display:"flex",flexDirection:"row",alignItems:"center"}},(0,e.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",height:"30px",width:"30px",fill:"#405795",viewBox:"0 0 24 24",style:{marginRight:"10px"}},(0,e.createElement)("path",{d:"M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"})),(0,e.createElement)("p",{style:{fontSize:"0.9rem",fontWeight:"600",paddingLeft:"15px"}},"Facebook -",(0,e.createElement)("span",{style:{fontWeight:"normal"}},o?.user?.profile?.email))),i?(0,e.createElement)(t.Spinner,null):(0,e.createElement)("button",{style:{color:"#286BDE"},onClick:()=>(async()=>{s(!0),await r()({url:c.wordpress.facebook_logout}).then((e=>e)).catch((e=>{throw{message:"failed to load the data",errorMsg:e}})).then((()=>{a()})),s(!1)})()},"Disconnect"))},g=async e=>{let t="",n=null,o=[];const a=()=>r()({url:c.wordpress.access}).then((e=>{r()({url:`${c.wordpress.fb_token}`,headers:{method:"GET","content-type":"application/json","Accept-Encoding":"gzip, deflate, br","Access-Control-Allow-Origin":"*"}}).then((e=>{var t;e.token&&(t=e.token,r()({url:c.wordpress.settings,method:"post",data:{fb_token:t}}).then((e=>e)).catch((e=>{console.error(e)})),n=e.token)})).catch((e=>{console.error(e)})),t=e.token})).catch((e=>{console.error(e)}));await a(),await r()({url:c.wordpress.fb_token}).then((async r=>{if(r?.fb_token)await s().then((e=>(n=r.fb_token,o=[e],o)));else{const n=window.open(`${c.cf_worker.login_screen}?token_hiive=${t}&redirect=${window.location.href}`,"ModalPopUp",`toolbar=no,scrollbars=no,location=no,width=${window.innerWidth/2+200},height=${window.innerHeight/2+200},top=200,left=200`),o=setInterval((async function(){n?.closed&&(clearInterval(o),await a(),e())}),1e3)}}))}})();var r=t;for(var i in a)r[i]=a[i];a.__esModule&&Object.defineProperty(r,"__esModule",{value:!0})})()},6999:(e,t,n)=>{"use strict";n.d(t,{A:()=>_});var o=n(1609),a=n(6942),r=n.n(a),i=n(148),c=n(7143),s=n(6427),l=n(7677),d=n(6655),u=n(7675);const _=({text:e,className:t,callback:n=null,disabled:a=!1,showChevronRight:_=!0})=>{const p=(0,i.Zp)(),{nextStep:g}=(0,c.useSelect)((e=>({nextStep:e(u.M).getNextStep()})));return(0,o.createElement)(s.Button,{className:r()("nfd-onboarding-button--site-gen-next",{"nfd-onboarding-button--site-gen-next--disabled":a},t),onClick:()=>{a||(n&&"function"==typeof n&&n(),g&&p(g.path))}},(0,o.createElement)("p",{className:"nfd-onboarding-button--site-gen-next--text"},e),_&&(0,o.createElement)(l.A,{className:"nfd-onboarding-button--site-gen-next--icon",icon:d.A}))}},513:(e,t,n)=>{"use strict";n.d(t,{A:()=>i});var o=n(1609),a=n(8468),r=n(7673);const i=(0,a.memo)((({title:e})=>(0,o.createElement)("div",{className:"ai-heading"},(0,o.createElement)(r.A,{height:"40px"}),(0,o.createElement)("div",{className:"ai-heading--title"},e))))},7673:(e,t,n)=>{"use strict";n.d(t,{A:()=>r});var o=n(1609),a=n(8468);const r=({height:e="80px"})=>{const t={"--wnd-ai-logo-size":e,height:`var(--wnd-ai-logo-size, ${e})`};return(0,a.useEffect)((()=>{document.querySelectorAll("[data-wnd-ai-logo]").forEach((function(e){let t=!1,n=null;const o=()=>{t?document.body.classList.add("wnd-ai-logo-keydown"):document.body.classList.remove("wnd-ai-logo-keydown"),n=null};e.addEventListener("keydown",(function(){t||(t=!0,n||(n=window.requestAnimationFrame(o)))})),e.addEventListener("keyup",(function(){t=!1,n||(n=window.requestAnimationFrame(o))}))}))}),[]),(0,o.createElement)("span",{className:"wnd-ai-logo",style:t},(0,o.createElement)("span",{className:"wnd-ai-logo__circle wnd-ai-logo__circle--bg"}),(0,o.createElement)("span",{className:"wnd-ai-logo__circle wnd-ai-logo__circle--1"}),(0,o.createElement)("span",{className:"wnd-ai-logo__circle wnd-ai-logo__circle--2"}),(0,o.createElement)("span",{className:"wnd-ai-logo__circle wnd-ai-logo__circle--3"}),(0,o.createElement)("span",{className:"wnd-ai-logo__circle wnd-ai-logo__circle--4"}),(0,o.createElement)("span",{className:"wnd-ai-logo__circle wnd-ai-logo__circle--5"}),(0,o.createElement)("span",{className:"wnd-ai-logo__circle wnd-ai-logo__circle--6"}),(0,o.createElement)("span",{className:"wnd-ai-logo__spinner"}))}},2607:(e,t,n)=>{"use strict";n.d(t,{A:()=>w});var o=n(1609),a=n(7723),r=n(8468),i=n(6427),c=n(7143),s=n(148),l=n(4371),d=n(6079),u=n(7675),_=n(2014),p=n(8969),g=n(2202),m=n(6942),f=n.n(m);const w=(0,r.memo)((({callback:e=!1,className:t,text:n})=>{const r=(0,s.Zp)(),m=(0,s.zy)(),{nextStep:w,currentData:b,socialData:h}=(0,c.useSelect)((e=>({nextStep:e(u.M).getNextStep(),currentData:e(u.M).getCurrentOnboardingData(),socialData:e(u.M).getOnboardingSocialData()})),[]),v=null===w||!1===w,{setOnboardingSocialData:k}=(0,c.useDispatch)(u.M);return(0,o.createElement)(i.Button,{className:f()("skip-button",t),onClick:v?()=>async function(e){if(b){if(b.isComplete=(new Date).getTime(),e?.includes("basic-info")){const e=await async function(){const e=await(0,_.mt)(),t=await(0,_.oc)(h);return null!==t?.error?e?.body:t?.body}();e&&k(e),await l.y.dispatchEvents(g.XJ)}(0,d.V1)(b)}window.location.replace(p.R0)}(m.pathname):()=>("function"==typeof e&&e(),void r(w.path))},n||(0,a.__)("Skip this Step","wp-module-onboarding"))}))},8844:(e,t,n)=>{"use strict";n.d(t,{A:()=>b});var o=n(1609),a=n(8468),r=n(9491),i=n(7143),c=n(7723);var s=n(6427),l=n(7675),d=n(3988),u=n(7673),_=n(8744),p=n(2940),g=n(7835),m=n(148),f=n(8969);const w=()=>{const e=(0,m.Zp)(),{setIsHeaderEnabled:t,setSidebarActiveView:n,setHeaderActiveView:w,setDrawerActiveView:b,setHideFooterNav:h,setIsHeaderNavigationEnabled:v,updateAllSteps:k,updateTopSteps:E,updateRoutes:y,updateDesignRoutes:N,updateInitialize:S,setCurrentOnboardingData:x,updateSiteGenErrorStatus:A,setContinueWithoutAi:C}=(0,i.useDispatch)(l.M);(0,a.useEffect)((()=>{h(!0),t(!0),n(!1),w(f.Ix),v(!0),b(!1)}));const{brandConfig:D,currentData:F}=(0,i.useSelect)((e=>({brandConfig:e(l.M).getNewfoldBrandConfig(),currentData:e(l.M).getCurrentOnboardingData()}))),O=(0,r.useViewportMatch)("small"),M={heading:(0,c.__)("Sorry, we're having trouble communicating with our AI service.","wp-module-onboarding"),subHeading:(0,c.__)("Do you keep getting this error?","wp-module-onboarding"),message:(0,c.__)("If you continue to get this error, you may either continue creating your site without using our AI assistant, or you can ","wp-module-onboarding"),buttonText:(0,c.__)("Try again","wp-module-onboarding"),buttonSkip:(0,c.__)("Continue without AI","wp-module-onboarding"),buttonExit:(0,c.__)("exit to WordPress","wp-module-onboarding")},R=window.nfdOnboarding?.oldFlow?window.nfdOnboarding.oldFlow:_.rA,T=()=>{A(!1)};return(0,o.createElement)(d.A,{className:"nfd-onboarding-step--site-gen__error"},(0,o.createElement)("div",{className:"nfd-onboarding-step--site-gen__error__container"},(0,o.createElement)("div",{className:"nfd-onboarding-step--site-gen__error__container__orb"},(0,o.createElement)(u.A,{height:"100px"})),(0,o.createElement)("div",{className:"nfd-onboarding-step--site-gen__error__container__heading"},(0,o.createElement)("p",{className:"nfd-onboarding-step--site-gen__error__container__heading__text"},M.heading)),(0,o.createElement)("div",{className:"nfd-onboarding-step--site-gen__error__container__sub-heading"},(0,o.createElement)("p",{className:"nfd-onboarding-step--site-gen__error__container__sub-heading__text"},M.subHeading),(0,o.createElement)("p",{className:"nfd-onboarding-step--site-gen__error__container__sub-heading__message"},M.message,(0,o.createElement)("a",{className:"nfd-onboarding-step--site-gen__error__container__sub-heading__exit",href:f.R0},M.buttonExit))),(0,o.createElement)("div",{className:"nfd-onboarding-step--site-gen__error__container__buttons"},(0,o.createElement)(s.Button,{className:"nfd-onboarding-step--site-gen__error__container__buttons__skip",onClick:()=>{(t=>{if(!(0,p.nC)(D,t))return!1;const n=window.nfdOnboarding.currentFlow,o=(0,g.Sg)(t)();k(o.steps),E(o?.topSteps),y(o.routes),N(o?.designRoutes),_.d0!==n&&(window.nfdOnboarding.oldFlow=n),window.nfdOnboarding.currentFlow=t,F.activeFlow=t,F.continueWithoutAi=!0,C(!0),x(F),A(!1),_.d0!==t&&S(!0),e(o.steps[1].path)})(R)}},M.buttonSkip),O?(0,o.createElement)(s.Button,{className:"nfd-onboarding-step--site-gen__error__container__buttons__retry",onClick:()=>{T()}},(0,o.createElement)("p",{className:"nfd-onboarding-button--site-gen-next--text"},M.buttonText)):(0,o.createElement)(s.Fill,{name:`${f.Sr}/${f.gb}`},(0,o.createElement)(s.Button,{className:"nfd-onboarding-step--site-gen__error__container__buttons__retry",onClick:()=>{T()}},(0,o.createElement)("p",{className:"nfd-onboarding-button--site-gen-next--text"},M.buttonText))))))},b=({children:e})=>{const{siteGenErrorStatus:t}=(0,i.useSelect)((e=>({siteGenErrorStatus:e(l.M).getSiteGenErrorStatus()})));return(0,o.createElement)(a.Fragment,null,t?(0,o.createElement)(w,null):e)}},5377:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>v});var o=n(1609),a=n(7143),r=n(8468),i=n(9491),c=n(7723);var s=n(8969),l=n(2607),d=n(7675),u=n(3988),_=n(513),p=n(6999),g=n(5706),m=n(148),f=n(8844),w=n(1056),b=n(2202),h=n(8744);const v=(0,r.memo)((()=>{const e=(0,i.useViewportMatch)("small"),t=(0,m.Zp)(),[n,v]=(0,r.useState)(!1),[k,E]=(0,r.useState)(!1),{setIsHeaderEnabled:y,setSidebarActiveView:N,setHeaderActiveView:S,setDrawerActiveView:x,setIsFooterNavAllowed:A,updateSiteGenErrorStatus:C,setIsHeaderNavigationEnabled:D}=(0,a.useDispatch)(d.M);(0,r.useEffect)((()=>{y(!0),N(!1),S(s.Ix),x(!1),D(!0)}));const{nextStep:F}=(0,a.useSelect)((e=>({nextStep:e(d.M).getNextStep()})));(0,r.useEffect)((()=>{A(n),k&&n&&t(F.path)}),[k,n]);const O={heading:(0,c.__)("Do you want to include any content from Facebook?","wp-module-onboarding"),facebookTitle:(0,c.__)("Connect a Facebook Account","wp-module-onboarding"),facebookDesc:(0,c.__)("By connecting a Facebook profile, we can fetch relevant data to increase the accuracy of your AI generated site.","wp-module-onboarding"),facebookButton:(0,c.__)("Connect Facebook","wp-module-onboarding"),buttons:{skip:(0,c.__)("Skip for now","wp-module-onboarding"),next:(0,c.__)("Next","wp-module-onboarding")}};return(0,o.createElement)(f.A,null,(0,o.createElement)(u.A,{isCentered:!0,className:"nfd-onboarding-step--site-gen__social-media"},(0,o.createElement)("div",{className:"nfd-onboarding-step--site-gen__social-media__container"},(0,o.createElement)(_.A,{title:O.heading}),(0,o.createElement)("div",{className:"nfd-onboarding-step--site-gen__social-media__contain "},(0,o.createElement)("div",{className:"nfd-onboarding-step--site-gen__social-media__contain__containleft "},(0,o.createElement)("span",null,O.facebookTitle),(0,o.createElement)("p",null,O.facebookDesc)),(0,o.createElement)("div",{className:"nfd-onboarding-step--site-gen__social-media__contain__containright "},(0,o.createElement)(g.FacebookConnectButton,{className:"nfd-onboarding-step--site-gen__social-media__contain__containright__button",onConnect:()=>{(0,w.v)(new w.iC(b.$2,"facebook",{source:h.d0})),v(!0)},onClick:()=>E(!0),onFailure:()=>{C(!0)}},(0,o.createElement)("i",{className:"nfd-onboarding-step--site-gen__social-media__contain__containright__button__icon"})))),(0,o.createElement)("div",{className:"nfd-onboarding-step--site-gen__social-media__container__buttons"},(0,o.createElement)(l.A,{callback:()=>{(0,w.v)(new w.iC(b.$x,void 0,{source:h.d0}))},className:"nfd-onboarding-step--site-gen__social-media__container__buttons__skip",text:O.buttons.skip}),e&&(0,o.createElement)(p.A,{text:O.buttons.next,disabled:!n})))))}))}}]);