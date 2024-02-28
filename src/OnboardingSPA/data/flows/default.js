// eslint-disable-next-line import/no-extraneous-dependencies
import { filter } from 'lodash';
import { demographic } from '../../chapters/demographic';
import { design } from '../../chapters/design';
import { layoutContent } from '../../chapters/layoutContent';
import { features } from '../../chapters/features';
import { stepWelcome } from '../../steps/GetStarted/Welcome/step';
import { stepComplete } from '../../steps/Complete/step';
import { stepWhatNext } from '../../steps/WhatNext/step';
import { errorPage } from '../../pages/ErrorPage/page';
import { PseudoStep } from '../models/PseudoStep';
import { indexPage } from '../../pages/IndexPage/page';
import { brush } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { stepTheFork } from '../../steps/TheFork/step';
import { validateFlow } from '../../data/flows/utils';
import { SITEGEN_FLOW } from '../../data/flows/constants';

export const pages = [ indexPage, errorPage ];

export const initialChapters = [ demographic, design, layoutContent, features ];

export const getSteps = ( chapters = initialChapters ) => {
	let steps = [];
	if (
		validateFlow( window.nfdOnboarding.currentBrand.config, SITEGEN_FLOW )
	) {
		steps.push( stepTheFork );
	}
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
	if (
		validateFlow( window.nfdOnboarding.currentBrand.config, SITEGEN_FLOW )
	) {
		routes.push( stepTheFork );
	}
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

const getPseudoStepForGetStarted = ( firstGetStartedStep ) => {
	const firstGetStartedStepObject = { ...firstGetStartedStep };
	firstGetStartedStepObject.title = __(
		'Get Started',
		'wp-module-onboarding'
	);
	firstGetStartedStepObject.data.tooltipText = __(
		'Get Started',
		'wp-module-onboarding'
	);
	firstGetStartedStepObject.data.primaryDrawerActiveLinkIncludes =
		'/wp-setup/step/get-started/';
	return new PseudoStep( firstGetStartedStepObject );
};

const getPseudoStepForDesign = ( firstDesignStep ) => {
	const firstDesignStepObject = { ...firstDesignStep };
	firstDesignStepObject.title = __( 'Design', 'wp-module-onboarding' );
	firstDesignStepObject.icon = brush;
	firstDesignStepObject.data.primaryDrawerActiveLinkIncludes =
		'/wp-setup/step/design/';
	return new PseudoStep( firstDesignStepObject );
};

export const getTopSteps = ( steps ) => {
	const topSteps = [ ...steps ];
	const firstGetStartedStepIndex = topSteps.findIndex( ( step ) =>
		step.path.includes( '/step/get-started' )
	);
	if ( -1 !== firstGetStartedStepIndex ) {
		topSteps[ firstGetStartedStepIndex ] = getPseudoStepForGetStarted(
			steps[ firstGetStartedStepIndex ]
		);
	}

	const firstDesignStepIndex = topSteps.findIndex( ( step ) =>
		step.path.includes( '/step/design' )
	);
	if ( -1 !== firstDesignStepIndex ) {
		topSteps[ firstDesignStepIndex ] = getPseudoStepForDesign(
			topSteps[ firstDesignStepIndex ]
		);
	}

	return filter( topSteps, ( step ) => {
		return (
			step instanceof PseudoStep ||
			( ! step.path.includes( '/step/get-started' ) &&
				! step.path.includes( '/step/design' ) &&
				! step.path.includes( '/step/complete' ) &&
				! step.path.includes( '/step/interstitial' ) )
		);
	} );
};

export const getDesignRoutes = ( routes ) => {
	const designRoutes = [ ...routes ];
	return filter( designRoutes, ( route ) => {
		return (
			route.path.includes( '/step/design/' ) &&
			! route.path.includes( '/theme-styles/preview' )
		);
	} );
};

export const getData = (
	chapters = initialChapters,
	onlyChapterSteps = false
) => {
	let steps = getSteps( chapters );
	let routes = getRoutes( chapters );
	if ( onlyChapterSteps ) {
		steps = steps.filter( ( step ) => {
			return ! step.path.includes( '/interstitial' );
		} );
		routes = routes.filter( ( route ) => {
			return ! route.path.includes( '/interstitial' );
		} );
	}
	return {
		steps,
		routes,
		topSteps: getTopSteps( steps ),
		designRoutes: getDesignRoutes( routes ),
	};
};
