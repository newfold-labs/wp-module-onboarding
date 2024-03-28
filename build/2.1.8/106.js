"use strict";(globalThis.webpackChunknewfold_Onboarding=globalThis.webpackChunknewfold_Onboarding||[]).push([[106],{3106:(e,n,t)=>{t.r(n),t.d(n,{default:()=>E});var o=t(1609),i=t(3988),a=t(8468),r=t(7143),s=t(7675),d=t(8969),l=t(8744),g=t(6942),_=t.n(g),u=t(9269);const c=({title:e,subtitle:n})=>{const t=(0,a.useContext)(u.D),i=t?.theme||!1;return(0,o.createElement)("div",{className:"nfd-onboarding-step__heading"},(0,o.createElement)("h2",{className:"nfd-onboarding-step__heading__title"},e),n&&(0,o.createElement)("div",{className:"nfd-onboarding-step__heading__subtitle"},n,(0,o.createElement)("div",{className:_()("nfd-onboarding-step__heading__icon",i===d.Vw?"nfd-onboarding-step__heading__icon--light":null)})))};var p=t(7835),b=t(2940),w=t(148),m=t(1056),f=t(2202);const h=(0,a.memo)((({questionnaire:e,oldFlow:n,options:t})=>{const i=(0,w.Zp)(),{brandConfig:a,hireProUrl:d,currentData:g}=(0,r.useSelect)((e=>({brandConfig:e(s.M).getNewfoldBrandConfig(),hireProUrl:e(s.M).getfullServiceCreativeTeamUrl(),currentData:e(s.M).getCurrentOnboardingData()}))),{updateAllSteps:_,updateTopSteps:u,updateRoutes:c,updateDesignRoutes:h,updateInitialize:v,setCurrentOnboardingData:E}=(0,r.useDispatch)(s.M),C=e=>{if(!(0,b.nC)(a,e))return!1;const n=window.nfdOnboarding.currentFlow,t=(0,p.Sg)(e)();_(t.steps),u(t?.topSteps),c(t.routes),h(t?.designRoutes),l.d0!==n&&(window.nfdOnboarding.oldFlow=n),window.nfdOnboarding.currentFlow=e,g.activeFlow=e,g.continueWithoutAi=!1,E(g),l.d0!==e&&v(!0),i(t.steps[1].path)},k=e=>{let t=!1;switch(e){case"sitebuild":t="DIY",C(n);break;case"sitegen":t="AI",C(l.d0);break;case"hirepro":t="PRO",window.open(d,"_blank")}t&&(0,m.v)(new m.iC(f.Qh,t))};return(0,o.createElement)("div",{className:""},(0,o.createElement)("p",{className:"nfd-onboarding-sitegen-options__questionnaire"},e),(0,o.createElement)("div",{className:"nfd-onboarding-sitegen-options__container"},t.map(((e,n)=>!(e.flow===l.d0&&!(0,b.nC)(a,e.flow))&&(0,o.createElement)("div",{className:"nfd-onboarding-sitegen-options__container__options",key:n,role:"button",tabIndex:0,onClick:()=>{k(e.flow)},onKeyDown:()=>{k(e.flow)}},(0,o.createElement)("h3",{className:"nfd-onboarding-sitegen-options__container__heading__title"},e.span&&(0,o.createElement)("span",{className:"nfd-onboarding-sitegen-options__container__options__span"},e.span),e.title),(0,o.createElement)("p",{className:"nfd-onboarding-sitegen-options__container__heading__subtitle"},e.subtitle))))))}));var v=t(7723);const E=()=>{const{migrationUrl:e}=(0,r.useSelect)((e=>({migrationUrl:e(s.M).getMigrationUrl()}))),{setIsHeaderEnabled:n,setSidebarActiveView:t,setHeaderActiveView:g,setDrawerActiveView:_,setIsHeaderNavigationEnabled:u,setFooterActiveView:p,setHideFooterNav:b}=(0,r.useDispatch)(s.M);(0,a.useEffect)((()=>{b(!0),n(!1),t(!1),u(!1),g(d.Ix),_(!1),p(d.Sr)}));const w=window.nfdOnboarding?.oldFlow?window.nfdOnboarding.oldFlow:l.rA,E=()=>{(0,m.SV)(new m.iC(f.Qh,"TUTORIAL")),window.location.replace(d.R0)},C={heading:(0,v.__)("Welcome to WordPress","wp-module-onboarding"),subheading:(0,v.__)("powered by ","wp-module-onboarding"),questionnaire:(0,v.__)("Where would you like to start?","wp-module-onboarding"),options:[{title:(0,v.__)("Guided Configuration","wp-module-onboarding"),subtitle:(0,v.__)("A few questions & settings to get you a jumpstart.","wp-module-onboarding"),flow:"sitebuild"},{title:(0,v.__)(" Website Creator","wp-module-onboarding"),subtitle:(0,v.__)("Unique AI generated content & design curated for you.","wp-module-onboarding"),span:(0,v.__)("AI","wp-module-onboarding"),flow:"sitegen"},{title:(0,v.__)("Hire a Pro","wp-module-onboarding"),subtitle:(0,v.__)("Leave it to our WordPress experts.","wp-module-onboarding"),flow:"hirepro"}],importtext:(0,v.__)("Already have a WordPress site you want to import?","wp-module-onboarding"),importlink:(0,v.__)("https://my.bluehost.com/cgi/services/migration","wp-module-onboarding"),exitToWordPress:(0,v.__)("I’m following a tutorial","wp-module-onboarding")};return(0,o.createElement)(i.A,{isCentered:!0,className:"nfd-onboarding-step--site-gen__fork"},(0,o.createElement)(c,{title:C.heading,subtitle:C.subheading}),(0,o.createElement)(h,{questionnaire:C.questionnaire,oldFlow:w,options:C.options}),(0,o.createElement)("br",null),(0,o.createElement)("br",null),e&&(0,o.createElement)("a",{className:"nfd-onboarding-step--site-gen__fork__importsite",href:e,target:"_blank",rel:"noreferrer",onClick:()=>(0,m.v)(new m.iC(f.Qh,"MIGRATE"))},C.importtext),(0,o.createElement)("span",{role:"button",tabIndex:0,className:"nfd-onboarding-step--site-gen__fork__exit",onClick:()=>E(),onKeyDown:()=>E()},C.exitToWordPress))}}}]);