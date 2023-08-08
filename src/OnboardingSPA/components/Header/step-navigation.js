import { useSelect } from '@wordpress/data';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, ButtonGroup } from '@wordpress/components';
import { Icon, chevronLeft, chevronRight } from '@wordpress/icons';

import { __ } from '@wordpress/i18n';
import { setFlow } from '../../utils/api/flow';
import { store as nfdOnboardingStore } from '../../store';
import { wpAdminPage, pluginDashboardPage } from '../../../constants';
import { activateInitialPlugins } from '../../utils/api/plugins';
import {
	OnboardingEvent,
	sendOnboardingEvent,
} from '../../utils/analytics/hiive';
import { ACTION_ONBOARDING_COMPLETE } from '../../utils/analytics/hiive/constants';

/**
 * Back step Navigation button.
 *
 * @param {*} param0
 *
 * @return {WPComponent} Back Component
 */
const Back = ( { path } ) => {
	const navigate = useNavigate();
	const navigateBack = () =>
		navigate( path, { state: { origin: 'header' } } );
	return (
		<Button
			className="navigation-buttons navigation-buttons_back"
			onClick={ navigateBack }
			variant="secondary"
		>
			<Icon icon={ chevronLeft } />
			{ __( 'Back', 'wp-module-onboarding' ) }
		</Button>
	);
};

/**
 * Next step naigation button
 *
 * @param {*} param0
 *
 * @return {WPComponent} Next Component
 */
const Next = ( { path } ) => {
	/* [TODO]: some sense of isStepComplete to enable/disable */
	const navigate = useNavigate();
	const navigateNext = () =>
		navigate( path, { state: { origin: 'header' } } );
	return (
		<Button
			onClick={ navigateNext }
			variant="primary"
			className="navigation-buttons navigation-buttons_next"
		>
			{ __( 'Next', 'wp-module-onboarding' ) }
			<Icon icon={ chevronRight } />
		</Button>
	);
};

async function saveDataAndExit( currentData ) {
	if ( currentData ) {
		currentData.isComplete = new Date().getTime();
		setFlow( currentData );
	}
	//Redirect to Admin Page for normal customers
	// and Bluehost Dashboard for ecommerce customers
	const exitLink = exitToWordpressForEcommerce()
		? pluginDashboardPage
		: wpAdminPage;
	activateInitialPlugins();
	sendOnboardingEvent( new OnboardingEvent( ACTION_ONBOARDING_COMPLETE ) );
	window.location.replace( exitLink );
}

/**
 * Finish step navigation button.
 *
 * @param {*} param0
 *
 * @return {WPComponent} Finish Component
 */
const Finish = ( { currentData, saveDataAndExitFunc } ) => (
	<Button
		onClick={ () => saveDataAndExitFunc( currentData ) }
		className="navigation-buttons navigation-buttons_finish"
		variant="primary"
	>
		{ __( 'Finish', 'wp-module-onboarding' ) }
		<Icon icon={ chevronRight } />
	</Button>
);

/**
 * Step buttons presented in Header.
 *
 * @return {WPComponent} StepNavigation Component
 */
const StepNavigation = () => {
	const location = useLocation();
	const { previousStep, nextStep, currentData } = useSelect(
		( select ) => {
			return {
				nextStep: select( nfdOnboardingStore ).getNextStep(),
				previousStep: select( nfdOnboardingStore ).getPreviousStep(),
				currentData:
					select( nfdOnboardingStore ).getCurrentOnboardingData(),
			};
		},
		[ location.pathname ]
	);
	const isFirstStep = null === previousStep || false === previousStep;
	const isLastStep = null === nextStep || false === nextStep;
	return (
		<div className="nfd-onboarding-header__step-navigation">
			<ButtonGroup style={ { display: 'flex', columnGap: '0.5rem' } }>
				{ isFirstStep || isLastStep ? null : (
					<Back path={ previousStep.path } />
				) }
				{ isLastStep ? (
					<Finish
						currentData={ currentData }
						saveDataAndExitFunc={ saveDataAndExit }
					/>
				) : (
					<Next path={ nextStep.path } />
				) }
			</ButtonGroup>
		</div>
	);
};

/*
 * check if this is the last step
 */
const exitToWordpressForEcommerce = () => {
	if ( window.nfdOnboarding.currentFlow === 'ecommerce' ) {
		return true;
	}
	return false;
};
export default StepNavigation;
