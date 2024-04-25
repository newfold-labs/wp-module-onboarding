// WordPress
import { Fragment, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

// Classes and functions
import {
	OnboardingEvent,
	trackOnboardingEvent,
} from '../../../utils/analytics/hiive';

// Components
import SiteGenStepErrorState from '../../ErrorState/Step/SiteGen';
import SiteGenMigrationError from '../../ErrorState/Step/SiteGen/Migration';

// Misc
import { store as nfdOnboardingStore } from '../../../store';
import { ACTION_SITEGEN_ERROR_STATE_TRIGGERED } from '../../../utils/analytics/hiive/constants';
import { SITEGEN_FLOW } from '../../../data/flows/constants';

import { stepSiteGenMigration } from '../../../steps/SiteGen/Migration/step';

const SiteGenStateHandler = ( { children } ) => {
	const { siteGenErrorStatus, currentStep, currentRoute } = useSelect(
		( select ) => {
			return {
				currentStep: select( nfdOnboardingStore ).getCurrentStep(),
				currentRoute: select( nfdOnboardingStore ).getCurrentStepPath(),
				siteGenErrorStatus:
					select( nfdOnboardingStore ).getSiteGenErrorStatus(),
			};
		}
	);

	useEffect( () => {
		if ( true === siteGenErrorStatus ) {
			trackOnboardingEvent(
				new OnboardingEvent(
					ACTION_SITEGEN_ERROR_STATE_TRIGGERED,
					undefined,
					{
						source: SITEGEN_FLOW,
					}
				)
			);
		}
	}, [ siteGenErrorStatus ] );
	const isMigrationStep =
		currentStep === stepSiteGenMigration ||
		currentRoute === stepSiteGenMigration.path;
	const handleRender = () => {
		if ( siteGenErrorStatus ) {
			return isMigrationStep ? (
				<SiteGenMigrationError />
			) : (
				<SiteGenStepErrorState />
			);
		}

		return children;
	};
	return <Fragment>{ handleRender() }</Fragment>;
};

export default SiteGenStateHandler;
