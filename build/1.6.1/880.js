"use strict";(globalThis.webpackChunknewfold_Onboarding=globalThis.webpackChunknewfold_Onboarding||[]).push([[880],{5791:(e,n,t)=>{t.d(n,{Z:()=>p});var a=t(9307),s=t(4184),r=t.n(s),i=t(5158),o=t(9250),d=t(2200),c=t(6989),l=t.n(c),u=t(4704);const g=e=>{let{className:n="nfd-onboarding-layout__base",children:t}=e;const s=(0,o.TH)(),c=document.querySelector(".nfd-onboard-content");return(0,a.useEffect)((()=>{null==c||c.focus({preventScroll:!0}),function(e){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Showing new Onboarding Page";(0,i.speak)(n,"assertive")}(s,"Override"),new class{constructor(e){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.eventSlug=e,this.eventData=n}send(){l()({url:(0,u.F)("events"),method:"POST",data:{slug:this.eventSlug,data:this.eventData}}).catch((e=>{console.error(e)}))}}(`${d.Db}-pageview`,{stepID:s.pathname,previousStepID:window.nfdOnboarding.previousStepID}).send(),window.nfdOnboarding.previousStepID=s.pathname}),[s.pathname]),(0,a.createElement)("div",{className:r()("nfd-onboarding-layout",n)},t)};var m=t(682);const h=e=>{let{children:n}=e;return(0,a.createElement)("section",{className:"is-contained"},n)},p=e=>{let{className:n="",children:t,isBgPrimary:s=!1,isCentered:i=!1,isVerticallyCentered:o=!1,isContained:d=!1,isPadded:c=!1,isFadeIn:l=!0}=e;const u=d?h:a.Fragment;return(0,a.createElement)(m.Z,{type:l&&"fade-in",duration:"233ms",timingFunction:"ease-in-out"},(0,a.createElement)(g,{className:r()("nfd-onboarding-layout__common",n,{"is-bg-primary":s},{"is-centered":i},{"is-vertically-centered":o},{"is-padded":c})},(0,a.createElement)(u,null,t)))}},4880:(e,n,t)=>{t.r(n),t.d(n,{default:()=>c});var a=t(9307),s=t(5791),r=t(2200),i=t(4106),o=t(9818),d=t(5736);const c=()=>{const{setIsDrawerOpened:e,setSidebarActiveView:n}=(0,o.useDispatch)(i.h);return(0,a.useEffect)((()=>{n(r.Jq),e(!0),setDrawerActiveView(r.BP)}),[]),(0,a.createElement)(s.Z,{isPadded:!0},(0,d.__)("Resources Page.","wp-module-onboarding"))}}}]);