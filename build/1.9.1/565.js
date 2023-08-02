"use strict";(globalThis.webpackChunknewfold_Onboarding=globalThis.webpackChunknewfold_Onboarding||[]).push([[565],{676:(e,t,n)=>{n.d(t,{Z:()=>m});var o=n(9307),a=n(5736),i=n(5609),d=n(9818),r=n(9250),c=n(7533),l=n(6831),s=n(8395),p=n(2200),u=n(7207);const m=(0,o.memo)((e=>{let{callback:t=!1}=e;const n=(0,r.s0)(),m=(0,r.TH)(),{nextStep:_,currentData:b,socialData:g}=(0,d.useSelect)((e=>({nextStep:e(l.h).getNextStep(),currentData:e(l.h).getCurrentOnboardingData(),socialData:e(l.h).getOnboardingSocialData()})),[]),w=null===_||!1===_,{setOnboardingSocialData:f}=(0,d.useDispatch)(l.h);async function h(e){if(b){if(b.isComplete=(new Date).getTime(),null!=e&&e.includes("basic-info")){const e=await async function(){const e=await(0,s.Gw)(),t=await(0,s.I2)(g);return null!==(null==t?void 0:t.error)?null==e?void 0:e.body:null==t?void 0:t.body}();e&&f(e),await u.v.dispatchEvents(p.cV)}(0,c.kB)(b)}const t="ecommerce"===window.nfdOnboarding.currentFlow?p.br:p.hF;window.location.replace(t)}return w?(0,o.createElement)(i.Button,{className:"skip-button",onClick:()=>h(m.pathname)},(0,a.__)("Skip this Step","wp-module-onboarding")):(0,o.createElement)(i.Button,{className:"skip-button",onClick:()=>("function"==typeof t&&t(),void n(_.path))},(0,a.__)("Skip this Step","wp-module-onboarding"))}))},7565:(e,t,n)=>{n.r(t),n.d(t,{default:()=>f});var o=n(9307),a=n(5736),i=n(4333),d=n(9818),r=n(2200),c=n(676),l=n(6831),s=n(5634),p=n(4316),u=n(1984),m=n(8184),_=n(5609);const b=e=>{let{id:t,path:n,title:i,desc:d,isSelected:r,onSelectedChange:c}=e;return(0,o.createElement)(_.Card,{className:`nfd-card ${r&&"nfd-selected-card-box"}`,onClick:e=>c(t)},(0,o.createElement)("div",{className:"nfd-card__top_row"},(0,o.createElement)("div",{className:"nfd-card__icon"},(0,o.createElement)("div",{className:r?"nfd-card__icon_box nfd-card__icon_box-selected":"nfd-card__icon_box",style:{backgroundImage:`var(${n})`}})),(0,o.createElement)("div",{className:r?"nfd-card__icon_selected":"nfd-card__icon_unselected"},(0,o.createElement)(u.Z,{className:"nfd-card__icon_selected_path",icon:m.Z,size:64}))),(0,o.createElement)("div",{className:`nfd-card__body ${r&&"nfd-selected-card"}`},(0,o.createElement)("h2",{className:"nfd-card__body_title"},(0,a.__)(i,"wp-module-onboarding")),(0,o.createElement)("p",{className:"nfd-card__body_description"},(0,a.__)(d,"wp-module-onboarding"))))},g=e=>{let{contents:t,selected:n,onSelectedChange:a}=e;const i=t.map(((e,t)=>(0,o.createElement)(b,{id:t,key:t,path:e.icon,title:e.title,desc:e.desc,onSelectedChange:a,isSelected:t===n})));return(0,o.createElement)("div",{className:"selectable_cards"},i)};var w=n(6202);const f=()=>{const e={0:"publishing",1:"selling",2:"designing"},[t,n]=(0,o.useState)(0),[u,m]=(0,o.useState)(!1),_=(0,i.useViewportMatch)("medium"),{setDrawerActiveView:b,setIsDrawerOpened:f,setSidebarActiveView:h,setCurrentOnboardingData:y,setIsDrawerSuppressed:v,setIsHeaderNavigationEnabled:E}=(0,d.useDispatch)(l.h),{currentData:S}=(0,d.useSelect)((e=>({currentData:e(l.h).getCurrentOnboardingData()})),[]);(0,o.useEffect)((()=>{_&&f(!0),h(!1),v(!1),b(r.tM),E(!0)}),[]),(0,o.useEffect)((()=>{u||async function(){if(S){const a=await(null==S?void 0:S.data.topPriority.priority1);""!==a?n(parseInt((o=a,null==Object?void 0:Object.keys(e).find((t=>e[t]===o))))):(S.data.topPriority.priority1=e[t],y(S))}var o;m(!0)}()}),[u]),(0,o.useEffect)((()=>{const n=e[t];S.data.topPriority.priority1=n,y(S),(0,w._)("top-priority",e[t]),"selling"===n?"ecommerce"!==window.nfdOnboarding.currentFlow&&(window.nfdOnboarding.newFlow="ecommerce"):window.nfdOnboarding.newFlow=void 0}),[t]);const k={heading:(0,a.__)("Tell us your top priority","wp-module-onboarding"),subheading:(0,a.__)("We'll prioritize getting you there.","wp-module-onboarding"),options:[{icon:"--nfd-publish-icon",title:(0,a.__)("Publishing","wp-module-onboarding"),desc:(0,a.__)("From blogs, to newsletters, to podcasts and videos, we help the web find your content.","wp-module-onboarding")},{icon:"--nfd-selling-icon",title:(0,a.__)("Selling","wp-module-onboarding"),desc:(0,a.__)("Startup or seasoned business, drop-shipping or downloads, we've got ecommerce covered.","wp-module-onboarding")},{icon:"--nfd-design-icon",title:(0,a.__)("Designing","wp-module-onboarding"),desc:(0,a.__)("With smart style presets and powerful options, we help your site look and feel polished.","wp-module-onboarding")}]};return(0,o.createElement)(s.Z,{isVerticallyCentered:!0},(0,o.createElement)(p.Z,{title:k.heading,subtitle:k.subheading}),(0,o.createElement)(g,{contents:k.options,selected:t,onSelectedChange:n}),(0,o.createElement)("div",{className:"center"},(0,o.createElement)("p",{className:"info-top-priority"},(0,a.__)("Where would you like to start? We'll start ","wp-module-onboarding"),(0,a.__)("there and then move into next steps.","wp-module-onboarding")),(0,o.createElement)(c.Z,{callback:()=>{window.nfdOnboarding.newFlow=void 0,S.data.topPriority.priority1=e[0],y(S),(0,w._)("top-priority-skipped",e[0])}})))}}}]);