import { sitegen } from '../../chapters/sitegen';
import { errorPage } from '../../pages/ErrorPage/page';
import { indexPage } from '../../pages/IndexPage/page';
import { stepTheFork } from '../../steps/TheFork/step';

export const pages = [ indexPage, errorPage ];

export const initialChapters = [ sitegen ];

export const getSteps = ( chapters = initialChapters ) => {
	let steps = [];
	steps.push( stepTheFork );
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
	routes.push( stepTheFork );
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
