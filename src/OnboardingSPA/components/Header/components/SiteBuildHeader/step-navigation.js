import { useSelect, useDispatch } from '@wordpress/data';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonGroup } from '@wordpress/components';
import { Icon, chevronLeft, chevronRight } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import { setFlow } from '../../../../utils/api/flow';
import { store as nfdOnboardingStore } from '../../../../store';
import { pluginDashboardPage } from '../../../../../constants';
import { activateInitialPlugins } from '../../../../utils/api/plugins';
import {
	OnboardingEvent,
	sendOnboardingEvent,
} from '../../../../utils/analytics/hiive';
import { ACTION_ONBOARDING_COMPLETE } from '../../../../utils/analytics/hiive/constants';
import { stepWelcome } from '../../../../steps/GetStarted/Welcome/step';

/**
 * Back step Navigation button.
 *
 * @param {*} param0
 *
 * @return {WPComponent} Back Component
 */
const Back = ( { path, showErrorDialog, disabled } ) => {
	const { setNavErrorContinuePath } = useDispatch( nfdOnboardingStore );
	const navigate = useNavigate();
	const navigateBack = () => {
		if ( showErrorDialog !== false ) {
			setNavErrorContinuePath( path );
		} else {
			navigate( path, { state: { origin: 'header' } } );
		}
	};
	return (
		<Button
			className="navigation-buttons navigation-buttons_back"
			onClick={ navigateBack }
			variant="secondary"
			disabled={ disabled }
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
const Next = ( { path, showErrorDialog } ) => {
	const { setNavErrorContinuePath } = useDispatch( nfdOnboardingStore );
	/* [TODO]: some sense of isStepComplete to enable/disable */
	const navigate = useNavigate();
	const navigateNext = () => {
		if ( showErrorDialog !== false ) {
			setNavErrorContinuePath( path );
		} else {
			navigate( path, { state: { origin: 'header' } } );
		}
	};
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

	activateInitialPlugins();
	sendOnboardingEvent( new OnboardingEvent( ACTION_ONBOARDING_COMPLETE ) );
	window.location.replace( pluginDashboardPage );
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
	const {
		currentStep,
		previousStep,
		nextStep,
		currentData,
		showErrorDialog,
	} = useSelect( ( select ) => {
		return {
			currentStep: select( nfdOnboardingStore ).getCurrentStep(),
			nextStep: select( nfdOnboardingStore ).getNextStep(),
			previousStep: select( nfdOnboardingStore ).getPreviousStep(),
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
			showErrorDialog: select( nfdOnboardingStore ).getShowErrorDialog(),
		};
	}, [] );
	const isFirstStep = null === previousStep || false === previousStep;
	const isLastStep = null === nextStep || false === nextStep;

	return (
		<div className="nfd-onboarding-header__step-navigation">
			<ButtonGroup style={ { display: 'flex', columnGap: '0.5rem' } }>
				{ isFirstStep || isLastStep ? null : (
					<Back
						path={ previousStep.path }
						showErrorDialog={ showErrorDialog }
						disabled={
							currentStep === stepWelcome
								? currentData.continueWithoutAi
								: false
						}
					/>
				) }
				{ isLastStep ? (
					<Finish
						currentData={ currentData }
						saveDataAndExitFunc={ saveDataAndExit }
					/>
				) : (
					<Next
						path={ nextStep.path }
						showErrorDialog={ showErrorDialog }
					/>
				) }
			</ButtonGroup>
		</div>
	);
};

export default StepNavigation;
