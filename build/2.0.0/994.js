"use strict";(globalThis.webpackChunknewfold_Onboarding=globalThis.webpackChunknewfold_Onboarding||[]).push([[994],{2076:(e,a,t)=>{t.d(a,{Z:()=>b});var s=t(9196),r=t(9250),n=t(9818),i=t(4403),l=t(8449),c=t(7533),o=t(2200),u=t(8297),p=t(6342),d=t(3421),y=t(3967),m=t.n(y),g=t(1984);const b=({text:e,disabled:a,className:t,icon:y})=>{const b=(0,r.s0)(),{nextStep:T,currentData:h}=(0,n.useSelect)((e=>({nextStep:e(i.h).getNextStep(),currentData:e(i.h).getCurrentOnboardingData()})),[]),v=null===T||!1===T;return(0,s.createElement)(l.Z,{className:m()("nfd-nav-card-button",t),handleClick:()=>v?async function(){h&&(h.isComplete=(new Date).getTime(),(0,c.kB)(h)),(0,d.jd)(),(0,u.uW)(new u.Z_(p.pd)),window.location.replace(o.br)}():b(T.path),disabled:a},(0,s.createElement)(s.Fragment,null,(0,s.createElement)("span",{className:`${t}__text`},e),y&&(0,s.createElement)(g.Z,{className:`${t}__icon`,icon:y})))}},1994:(e,a,t)=>{t.r(a),t.d(a,{default:()=>h});var s=t(9196),r=t(5634),n=t(349),i=t(2200),l=t(7560),c=t(4403),o=t(9818),u=t(9307),p=t(9519),d=t(2076),y=t(950),m=t(682),g=t(6557),b=t(8297),T=t(6342);const h=()=>{const{setDrawerActiveView:e,setSidebarActiveView:a,setIsDrawerSuppressed:t,setIsHeaderNavigationEnabled:h,setCurrentOnboardingData:v}=(0,o.useDispatch)(c.h);(0,u.useEffect)((()=>{a(i.Jq),t(!0),e(i.mz),h(!0),R()}),[]);const f=(0,l.Z)(),[_,w]=(0,u.useState)(!1),[E,N]=(0,u.useState)(),[k,C]=(0,u.useState)(),[x,S]=(0,u.useState)(),[I,Z]=(0,u.useState)(""),[D,O]=(0,u.useState)(),{currentData:H}=(0,o.useSelect)((e=>({currentData:e(c.h).getCurrentOnboardingData()})),[]),R=async()=>{var e;const a=await(0,g.P)(),t=Object.keys(a?.body?.types)[0];S(t),N(a?.body);const s=Object.keys(a?.body?.types);if(C(s),"string"==typeof H?.data?.siteType?.primary){const e=H?.data?.siteType?.primary;H.data.siteType.primary={refers:"custom",value:e},v(H)}if("string"==typeof H?.data?.siteType?.secondary){const e=H?.data?.siteType?.secondary;H.data.siteType.secondary={refers:"custom",value:e},v(H)}Z(null!==(e=H?.data?.siteType?.secondary?.value)&&void 0!==e?e:""),""!==H?.data?.siteType?.primary?.value&&("custom"!==H?.data?.siteType?.primary?.refers?S(H?.data?.siteType?.primary?.value):(S(t),A(H?.data?.siteType?.secondary?.value))),"custom"===H?.data?.siteType?.secondary?.refers&&A(H?.data?.siteType?.secondary?.value)},A=e=>{w(!0),H.data.siteType.secondary.refers="custom",H.data.siteType.secondary.value=e,v(H),""!==I&&I!==e&&(clearTimeout(D),O(setTimeout((()=>{(0,b.tH)(new b.Z_(T.GX,e))}),1e3))),Z(e)},P=e=>{if(I===e&&H.data.siteType.primary.value===x)return!0;w(!1),Z(e),H.data.siteType.secondary.refers="slug",H.data.siteType.primary.value!==x&&(H.data.siteType.primary.refers="slug",H.data.siteType.primary.value=x,(0,b.tH)(new b.Z_(T.xp,x))),H.data.siteType.secondary.value=e,v(H),(0,b.tH)(new b.Z_(T.GX,e))},j=e=>{const a=k.findIndex((e=>x===e));let t;switch(e){case"back":t=k[(a-1+k.length)%k.length],S(t);break;case"next":t=k[(a+1)%k.length],S(t)}(0,b.tH)(new b.Z_(T.xp,t))};return(0,s.createElement)(r.Z,{isBgPrimary:!0,isCentered:!0},(0,s.createElement)(n.Z,null,(0,s.createElement)("div",{className:"nfd-card-heading center"},(0,s.createElement)(p.Z,{heading:f.heading,subHeading:f.subheading,question:f.question})),(0,s.createElement)(m.Z,{type:"fade-in-disabled",after:E},(0,s.createElement)("div",{className:"nfd-setup-secondary-categories"},(0,s.createElement)("div",{className:"nfd-card-sec-category-wrapper"},E&&(0,s.createElement)("div",{className:"category-scrolling-wrapper"},k&&k.length>1&&(0,s.createElement)("div",{className:"category-scrolling-wrapper__left-btn"},(0,s.createElement)("span",{className:"category-scrolling-wrapper__left-btn-icon",onClick:()=>j("back"),onKeyUp:()=>j("back"),role:"button",tabIndex:0,style:{backgroundImage:"var(--chevron-left-icon)"}})),(0,s.createElement)("div",{className:"category-scrolling-wrapper__type"},(0,s.createElement)("span",{className:"category-scrolling-wrapper__type-icon",style:{backgroundImage:`url(${E?.types[x]?.icon})`}}),(0,s.createElement)("p",{className:"category-scrolling-wrapper__type-text"},` ${E?.types[x]?.label}`)),k&&k.length>1&&(0,s.createElement)("div",{className:"category-scrolling-wrapper__right-btn"},(0,s.createElement)("span",{className:"category-scrolling-wrapper__right-btn-icon",onClick:()=>j("next"),onKeyUp:()=>j("next"),role:"button",tabIndex:0,style:{backgroundImage:"var(--chevron-right-icon)"}})))),(0,s.createElement)("div",{className:"subCategoriesSection"},E&&(()=>{const e=E?.types[x]?.secondaryTypes;return Object.keys(e).map(((a,t)=>(0,s.createElement)("div",{key:e[a]?.slug,"data-slug":e[a]?.slug,role:"button",tabIndex:t+1,className:(e[a].slug!==I||_?"":"chosenSecondaryCategory ")+"nfd-card-sec-category",onClick:()=>P(e[a].slug),onKeyDown:()=>P(e[a].slug)},(0,s.createElement)("span",{className:"categName"},e[a]?.label))))})()),(0,s.createElement)("div",{className:"nfd-setup-primary-custom"},(0,s.createElement)("div",{className:"nfd-setup-primary-custom__tellus-text"},f.customInputLabel),(0,s.createElement)("input",{type:"search",onChange:e=>A(e?.target?.value),className:"nfd-setup-primary-custom__tellus-input",placeholder:f.customInputPlaceholderText,value:_?I:""})))),(0,s.createElement)(d.Z,{text:f.buttonText}),(0,s.createElement)(y.Z,null)))}},7560:(e,a,t)=>{t.d(a,{Z:()=>n});var s=t(5736),r=t(1392);const n=()=>({heading:(0,s.sprintf)(/* translators: %s: website or store */ /* translators: %s: website or store */
(0,s.__)("Help us tailor this setup to your %s","wp-module-onboarding"),(0,r.I)("site")),subheading:(0,s.sprintf)(/* translators: %s: SITE or STORE */ /* translators: %s: SITE or STORE */
(0,s.__)("ABOUT YOUR %s","wp-module-onboarding"),(0,r.I)("SITE")),question:(0,s.sprintf)(/* translators: %s: site or store */ /* translators: %s: site or store */
(0,s.__)("What type of %s is it?","wp-module-onboarding"),(0,r.I)("site")),buttonText:(0,s.__)("Continue Setup","wp-module-onboarding"),customInputPlaceholderText:(0,s.sprintf)(/* translators: %s: site or store */ /* translators: %s: site or store */
(0,s.__)("Enter to search your %s type","wp-module-onboarding"),(0,r.I)("site")),customInputLabel:(0,s.__)("or tell us here:","wp-module-onboarding")})},6557:(e,a,t)=>{t.d(a,{P:()=>c});var s=t(6329),r=t(4704);const n=JSON.parse('{"body":{"types":{"business":{"slug":"business","label":"Business","icon":"https://cdn.hiive.space/site-classification/business.svg","emoji":"💼","schema":"Corporation","secondaryTypes":{"agency-consulting":{"primaryType":"business","slug":"agency-consulting","label":"Agency & Consulting"},"arts-crafts":{"primaryType":"business","slug":"arts-crafts","label":"Arts & Crafts"},"autos-repair":{"primaryType":"business","slug":"autos-repair","label":"Autos & Repair"},"child-care":{"primaryType":"business","slug":"child-care","label":"Child Care"},"events":{"primaryType":"business","slug":"events","label":"Events"},"finance":{"primaryType":"business","slug":"finance","label":"Finance"},"garden-florist":{"primaryType":"business","slug":"garden-florist","label":"Florist & Garden Center"},"hr-recruiting":{"primaryType":"business","slug":"hr-recruiting","label":"HR & Recruiting"},"insurance":{"primaryType":"business","slug":"insurance","label":"Insurance"},"legal":{"primaryType":"business","slug":"legal","label":"Legal"},"marketing":{"primaryType":"business","slug":"marketing","label":"Marketing"},"outdoors":{"primaryType":"business","slug":"outdoors","label":"Outdoors"},"pr-communications":{"primaryType":"business","slug":"pr-communications","label":"PR & Communications"},"real-estate-management":{"primaryType":"business","slug":"real-estate-management","label":"Real Estate & Management"},"shopping-retail":{"primaryType":"business","slug":"shopping-retail","label":"Shopping & Retail"},"trades-repair-services":{"primaryType":"business","slug":"trades-repair-services","label":"Trades & Repair Services"},"weddings":{"primaryType":"business","slug":"weddings","label":"Weddings"}}}}}}');var i=t(6989),l=t.n(i);async function c(){const e=await(0,s.D)(l()({url:(0,r.FZ)("site-classification")}));return 0===e.body.length?n:e}}}]);