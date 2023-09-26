import { commerce } from '../../chapters/commerce';
import { demographic } from '../../chapters/demographic';
import { design } from '../../chapters/design';
import { features } from '../../chapters/features';
import { stepComplete } from '../../steps/Complete/step';
import { stepWhatNext } from '../../steps/WhatNext/step';
import { errorPage } from '../../pages/ErrorPage/page';
import { PseudoStep } from '../models/PseudoStep';
import { stepWelcome } from '../../steps/GetStarted/Welcome/step';
import { indexPage } from '../../pages/IndexPage/page';

import {
	getTopSteps as defaultTopSteps,
	getDesignRoutes as defaultDesignRoutes,
} from './default';
import { layoutContent } from '../../chapters/layoutContent';
// eslint-disable-next-line import/no-extraneous-dependencies
import { filter } from 'lodash';
import { store } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

export const pages = [ indexPage, errorPage ];

export const initialChapters = [
	demographic,
	commerce,
	design,
	layoutContent,
	features,
];

export const getSteps = ( chapters = initialChapters ) => {
	let steps = [];
	steps.push( stepWelcome );
	chapters.forEach( ( chapter ) => {
		steps = steps.concat( [
			...chapter.steps,
			// ...chapter.interstitialSteps,
		] );
	} );
	steps = steps.concat( [ stepComplete, stepWhatNext ] );
	return steps;
};

export const getRoutes = ( chapters = initialChapters ) => {
	let routes = [ ...pages ];
	routes.push( stepWelcome );
	chapters.forEach( ( chapter ) => {
		routes = routes.concat( [
			...chapter.steps,
			...chapter.conditionalSteps,
			// ...chapter.interstitialSteps,
		] );
	} );
	routes = routes.concat( [ stepComplete, stepWhatNext ] );
	return routes;
};

const getPseudoStepForEcommerce = ( firstEcommerceStep ) => {
	const firstEcommerceStepObject = { ...firstEcommerceStep };
	firstEcommerceStepObject.title = __( 'Store Info', 'wp-module-onboarding' );
	firstEcommerceStepObject.icon = store;
	firstEcommerceStepObject.data.primaryDrawerActiveLinkIncludes =
		'/ecommerce/step/';
	return new PseudoStep( firstEcommerceStepObject );
};

export const getTopSteps = ( steps ) => {
	steps = defaultTopSteps( steps );
	const firstEcommerceStepIndex = steps.findIndex( ( step ) =>
		step.path.includes( '/ecommerce/step' )
	);
	if ( -1 !== firstEcommerceStepIndex ) {
		steps[ firstEcommerceStepIndex ] = getPseudoStepForEcommerce(
			steps[ firstEcommerceStepIndex ]
		);
	}

	return filter( steps, ( step ) => {
		return (
			step instanceof PseudoStep ||
			! step.path.includes( '/ecommerce/step' )
		);
	} );
};

export const getData = ( chapters = initialChapters ) => {
	const steps = getSteps( chapters );
	const routes = getRoutes( chapters );
	return {
		steps,
		routes,
		topSteps: getTopSteps( steps ),
		designRoutes: defaultDesignRoutes( routes ),
	};
};
