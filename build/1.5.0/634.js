"use strict";(globalThis.webpackChunknewfold_Onboarding=globalThis.webpackChunknewfold_Onboarding||[]).push([[634],{4316:(e,t,n)=>{n.d(t,{Z:()=>i});var a=n(9307);const i=e=>{let{title:t,subtitle:n,children:i}=e;return(0,a.createElement)("div",{className:"nfd-main-heading"},(0,a.createElement)("h2",{className:"nfd-main-heading__title"},t),n&&(0,a.createElement)("h3",{className:"nfd-main-heading__subtitle"},n),i)}},5791:(e,t,n)=>{n.d(t,{Z:()=>h});var a=n(9307),i=n(4184),r=n.n(i),s=n(5158),o=n(6974),c=n(2200),l=n(6989),d=n.n(l),u=n(4704);const m=e=>{let{className:t="nfd-onboarding-layout__base",children:n}=e;const i=(0,o.TH)(),l=document.querySelector(".nfd-onboard-content");return(0,a.useEffect)((()=>{null==l||l.focus({preventScroll:!0}),function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Showing new Onboarding Page";(0,s.speak)(t,"assertive")}(i,"Override"),new class{constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.eventSlug=e,this.eventData=t}send(){d()({url:(0,u.F)("events"),method:"POST",data:{slug:this.eventSlug,data:this.eventData}}).catch((e=>{console.error(e)}))}}(`${c.Db}-pageview`,{stepID:i.pathname,previousStepID:window.nfdOnboarding.previousStepID}).send(),window.nfdOnboarding.previousStepID=i.pathname}),[i.pathname]),(0,a.createElement)("div",{className:r()("nfd-onboarding-layout",t)},n)};var p=n(682);const g=e=>{let{children:t}=e;return(0,a.createElement)("section",{className:"is-contained"},t)},h=e=>{let{className:t="",children:n,isBgPrimary:i=!1,isCentered:s=!1,isVerticallyCentered:o=!1,isContained:c=!1,isPadded:l=!1,isFadeIn:d=!0}=e;const u=c?g:a.Fragment;return(0,a.createElement)(p.Z,{type:d&&"fade-in",duration:"233ms",timingFunction:"ease-in-out"},(0,a.createElement)(m,{className:r()("nfd-onboarding-layout__common",t,{"is-bg-primary":i},{"is-centered":s},{"is-vertically-centered":o},{"is-padded":l})},(0,a.createElement)(u,null,n)))}},676:(e,t,n)=>{n.d(t,{Z:()=>m});var a=n(9307),i=n(5736),r=n(5609),s=n(9818),o=n(6974),c=n(7533),l=n(4106),d=n(8395),u=n(2200);const m=(0,a.memo)((()=>{const e=(0,o.s0)(),t=(0,o.TH)(),{nextStep:n,currentData:m,socialData:p}=(0,s.useSelect)((e=>({nextStep:e(l.h).getNextStep(),currentData:e(l.h).getCurrentOnboardingData(),socialData:e(l.h).getOnboardingSocialData()})),[]),g=null===n||!1===n,{setOnboardingSocialData:h}=(0,s.useDispatch)(l.h);async function b(e){if(m){if(m.isComplete=(new Date).getTime(),null!=e&&e.includes("basic-info")){const e=await async function(){const e=await(0,d.Gw)(),t=await(0,d.I2)(p);return null!==(null==t?void 0:t.error)?null==e?void 0:e.body:null==t?void 0:t.body}();e&&h(e)}(0,c.kB)(m)}const t="ecommerce"===window.nfdOnboarding.currentFlow?u.br:u.hF;window.location.replace(t)}return g?(0,a.createElement)(r.Button,{className:"skip-button",onClick:()=>b(t.pathname)},(0,i.__)("Skip this Step","wp-module-onboarding")):(0,a.createElement)(r.Button,{className:"skip-button",onClick:()=>e(n.path)},(0,i.__)("Skip this Step","wp-module-onboarding"))}))},3634:(e,t,n)=>{n.r(t),n.d(t,{default:()=>f});var a=n(9307),i=n(5736),r=n(6974),s=n(4333),o=n(9818),c=n(2200),l=n(676),d=n(4106),u=n(5791),m=n(4316),p=n(1984),g=n(8184),h=n(5609);const b=e=>{let{id:t,path:n,title:r,desc:s,isSelected:o,onSelectedChange:c}=e;return(0,a.createElement)(h.Card,{className:`nfd-card ${o&&"nfd-selected-card-box"}`,onClick:e=>c(t)},(0,a.createElement)("div",{className:"nfd-card__top_row"},(0,a.createElement)("div",{className:"nfd-card__icon"},(0,a.createElement)("div",{className:o?"nfd-card__icon_box nfd-card__icon_box-selected":"nfd-card__icon_box",style:{backgroundImage:`var(${n})`}})),(0,a.createElement)("div",{className:o?"nfd-card__icon_selected":"nfd-card__icon_unselected"},(0,a.createElement)(p.Z,{className:"nfd-card__icon_selected_path",icon:g.Z,size:64}))),(0,a.createElement)("div",{className:`nfd-card__body ${o&&"nfd-selected-card"}`},(0,a.createElement)("h2",{className:"nfd-card__body_title"},(0,i.__)(r,"wp-module-onboarding")),(0,a.createElement)("p",{className:"nfd-card__body_description"},(0,i.__)(s,"wp-module-onboarding"))))},_=e=>{let{contents:t,selected:n,onSelectedChange:i}=e;const r=t.map(((e,t)=>(0,a.createElement)(b,{id:t,key:t,path:e.icon,title:e.title,desc:e.desc,onSelectedChange:i,isSelected:t===n})));return(0,a.createElement)("div",{className:"selectable_cards"},r)},f=e=>{const t={0:"publishing",1:"selling",2:"designing"},[n,p]=((0,r.s0)(),(0,a.useState)(0)),[g,h]=(0,a.useState)(!1),b=(0,s.useViewportMatch)("medium"),{setDrawerActiveView:f,setIsDrawerOpened:v,setSidebarActiveView:w,setCurrentOnboardingData:S,setIsDrawerSuppressed:E,setIsHeaderNavigationEnabled:y}=(0,o.useDispatch)(d.h),{currentStep:D,currentData:N}=(0,o.useSelect)((e=>({currentStep:e(d.h).getCurrentStep(),currentData:e(d.h).getCurrentOnboardingData()})),[]);return(0,a.useEffect)((()=>{b&&v(!0),w(c.Jq),E(!1),f(c.tM),y(!0)}),[]),(0,a.useEffect)((()=>{g||async function(){if(N){const e=await(null==N?void 0:N.data.topPriority.priority1);""!=e?p(parseInt(((e,t)=>null==Object?void 0:Object.keys(e).find((n=>e[n]===t)))(t,e))):(N.data.topPriority.priority1=t[n],S(N))}h(!0)}()}),[g]),(0,a.useEffect)((()=>{g&&(N.data.topPriority.priority1=t[n],S(N))}),[n]),(0,a.createElement)(u.Z,{isVerticallyCentered:!0},(0,a.createElement)(m.Z,{title:null==D?void 0:D.heading,subtitle:null==D?void 0:D.subheading}),(0,a.createElement)(_,{contents:[{icon:"--nfd-publish-icon",title:"Publishing",desc:"From blogs, to newsletters, to podcasts and videos, we help the web find your content."},{icon:"--nfd-selling-icon",title:"Selling",desc:"Startup or seasoned business, drop-shipping or downloads, we've got ecommerce covered."},{icon:"--nfd-design-icon",title:"Designing",desc:"With smart style presets and powerful options, we help your site look and feel polished."}],selected:n,onSelectedChange:p}),(0,a.createElement)("div",{className:"center"},(0,a.createElement)("p",{className:"info-top-priority"},(0,i.__)("Where would you like to start? We'll start ","wp-module-onboarding"),(0,a.createElement)("br",null),(0,i.__)("there and then move into next steps.","wp-module-onboarding")),(0,a.createElement)(l.Z,null)))}}}]);