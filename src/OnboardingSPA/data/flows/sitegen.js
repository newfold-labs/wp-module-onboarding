import { siteGenDesign } from '../../chapters/siteGen/design';
import { siteGenFeatures } from '../../chapters/siteGen/features';
import { siteGenCore } from '../../chapters/siteGen/core';
import { errorPage } from '../../pages/ErrorPage/page';
import { indexPage } from '../../pages/IndexPage/page';
import { stepSiteGenWelcome } from '../../steps/SiteGen/Welcome/step';
import { stepTheFork } from '../../steps/TheFork/step';
import { stepSiteGenMigration } from '../../steps/SiteGen/Migration/step';

export const pages = [ indexPage, errorPage ];

export const initialChapters = [ siteGenCore, siteGenFeatures, siteGenDesign ];

export const getSteps = ( chapters = initialChapters ) => {
	let steps = [];
	steps.push( stepTheFork, stepSiteGenWelcome );
	chapters.forEach( ( chapter ) => {
		steps = steps.concat( [
			...chapter.steps,
			// ...chapter.interstitialSteps,
		] );
	} );
	return steps;
};

export const getRoutes = ( chapters = initialChapters ) => {
	let routes = [ ...pages ];
	routes.push( stepTheFork, stepSiteGenMigration, stepSiteGenWelcome );
	chapters.forEach( ( chapter ) => {
		routes = routes.concat( [
			...chapter.steps,
			...chapter.conditionalSteps,
			// ...chapter.interstitialSteps,
		] );
	} );
	return routes;
};

export const getData = () => {
	return {
		steps: getSteps(),
		routes: getRoutes(),
	};
};

export const getTopSteps = () => {
	return [];
};

export const getDesignRoutes = () => {
	return [];
};
