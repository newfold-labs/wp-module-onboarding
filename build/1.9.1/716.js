"use strict";(globalThis.webpackChunknewfold_Onboarding=globalThis.webpackChunknewfold_Onboarding||[]).push([[716],{6716:(e,t,a)=>{a.r(t),a.d(t,{default:()=>k});var n=a(9307),s=a(2819),c=a(4333),l=a(9818),o=a(6831),i=a(2200),r=a(5634),d=a(3421),u=a(4316),m=a(1984),h=a(6058),b=a(5609),v=a(682);const g=e=>{let{name:t,icon:a,title:s,desc:c,subtitle:l,callback:o,tabIndex:i=0,isSelectedDefault:r,className:d="checkbox-item"}=e;const[u,g]=(0,n.useState)(!1),[p,E]=(0,n.useState)(r),_=()=>{g(!u)};return(0,n.createElement)("div",null,(0,n.createElement)("div",{className:`${d} ${p&&`${d}--selected`} ${u&&`${d}--shown`}`},(0,n.createElement)("div",{className:`${d}-container`},(0,n.createElement)(b.CheckboxControl,{checked:p,onChange:()=>{E(!p),o(t,!p)},className:`${d}-checkbox`}),(0,n.createElement)("div",{className:`${d}__contents`},(0,n.createElement)("div",{className:`${d}__contents-icon\n                                     ${p&&`${d}__contents-icon--selected`}\n                                     ${u&&`${d}__contents-icon--shown`}`},(0,n.createElement)("div",{style:{width:"35px",height:"35px",backgroundPosition:"center",backgroundRepeat:"no-repeat",backgroundImage:`var(${a})`,filter:p?"invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%)":"none"}})),(0,n.createElement)("div",{className:`${d}__contents-text`},(0,n.createElement)("div",{className:`${d}__contents-text-title ${p&&`${d}__contents-text-title--selected`}`},s),(0,n.createElement)("div",{className:`${d}__contents-text-subtitle`},l)),(0,n.createElement)("div",{className:`${d}__contents-help ${u?"highlighted":""}`,onClick:_,role:"button",onKeyDown:_,tabIndex:i},(0,n.createElement)(m.Z,{icon:h.Z,style:{width:"30px",height:"30px"}}))))),u&&(0,n.createElement)(v.Z,{className:` ${d}__dropdown `,type:"dropdown"},(0,n.createElement)("div",{className:`${d}__desc`},c)))},p=e=>{let{count:t}=e;const a=()=>{const e=[];for(let a=0;a<t;a++)e.push((0,n.createElement)(v.Z,{type:"shine-placeholder",className:"checkbox-skeleton-item"}));return e};return(0,n.createElement)("div",{className:"checkbox-list"},(0,n.createElement)("div",{className:"checkbox-list-col"},a().slice(0,Math.floor(t/2))),(0,n.createElement)("div",{className:"checkbox-list-col"},a().slice(Math.floor(t/2),t)))},E=e=>{let{callback:t,selectedItems:a,customItemsList:s}=e;const c=Object.keys(s).length,l=()=>{var e=[];for(const l in s){var c=s[l];const o=a[c.slug];e.push((0,n.createElement)(g,{name:c.slug,icon:c.icon,title:c.title,subtitle:c.subtitle,desc:c.desc,callback:t,isSelectedDefault:null!=o&&o}))}return e};return(0,n.createElement)("div",{className:"checkbox-list"},(0,n.createElement)("div",{className:"checkbox-list-col"},l().slice(0,Math.floor(c/2))),(0,n.createElement)("div",{className:"checkbox-list-col"},l().slice(Math.floor(c/2),c)))};var _=a(5736);const k=()=>{var e;const t=(0,c.useViewportMatch)("medium"),[a,m]=(0,n.useState)(),[h,b]=(0,n.useState)(),{setIsDrawerOpened:v,setDrawerActiveView:g,setSidebarActiveView:k,setCurrentOnboardingData:x,setIsDrawerSuppressed:$,setIsHeaderNavigationEnabled:w}=(0,l.useDispatch)(o.h),{currentStep:f,currentData:N,themeVariations:y}=(0,l.useSelect)((e=>({currentStep:e(o.h).getCurrentStep(),currentData:e(o.h).getCurrentOnboardingData(),themeVariations:e(o.h).getStepPreviewData()})),[]);(0,n.useEffect)((()=>{t&&v(!1),k(i.Jq),$(!1),g(i.tM),w(!0),async function(){var e,t;const a=await(0,d.yn)();(0,s.isEmpty)(null==N||null===(e=N.data)||void 0===e?void 0:e.siteFeatures)?async function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];const a={};for(const t in e){const n=e[t];a[n.slug]=n.selected}m(a),t&&(N.data.siteFeatures={...a},x(N))}(a.body,!0):m({...null==N||null===(t=N.data)||void 0===t?void 0:t.siteFeatures}),b(a.body)}()}),[]);const S={heading:(0,_.__)("Key features to supercharge your site","wp-module-onboarding"),subheading:(0,_.__)("Our toolbox of Plugins & Services is your toolbox.","wp-module-onboarding")};return(0,n.createElement)(r.Z,null,(0,n.createElement)("div",{style:{margin:"100px"}},(0,n.createElement)(u.Z,{title:S.heading,subtitle:S.subheading})),!h&&(0,n.createElement)(p,{count:null===(e=y[null==f?void 0:f.patternId])||void 0===e?void 0:e.previewCount}),h&&(0,n.createElement)(E,{callback:async function(e,t){const n={...a};n[e]=t,m(n),N.data.siteFeatures={...n},x(N)},selectedItems:a,customItemsList:h}))}}}]);