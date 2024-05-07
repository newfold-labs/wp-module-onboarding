import { memo } from '@wordpress/element';
import AdminBar from '../../../AdminBar';
import ProgressBar from '../../../ProgressBar';

import { Fill } from '@wordpress/components';
import {
	HEADER_SITEGEN,
	HEADER_START,
	HEADER_TOP,
} from '../../../../../constants';

import { useSelect } from '@wordpress/data';
import { stepTheFork } from '../../../../steps/TheFork/step';
import { store as nfdOnboardingStore } from '../../../../store';
import StepNavigation from './step-navigation';

// eslint-disable-next-line import/no-extraneous-dependencies
import { findIndex } from 'lodash';
import { stepSiteGenMigration } from '../../../../steps/SiteGen/Migration/step';

/**
 * Interface header rendered into header render prop in <InterfaceSkeleton />.
 *
 * @return {WPComponent} Header
 */
const SiteGenHeader = () => {
	const { isHeaderNavigationEnabled, currentStep, allSteps } = useSelect(
		( select ) => {
			return {
				currentStep: select( nfdOnboardingStore ).getCurrentStep(),
				isHeaderNavigationEnabled:
					select( nfdOnboardingStore ).isHeaderNavigationEnabled(),
				allSteps: select( nfdOnboardingStore ).getAllSteps(),
			};
		}
	);

	const currentStepIndex = findIndex( allSteps, {
		path: currentStep?.path,
	} );
	const progress = Math.abs(
		( ( currentStepIndex - 1 ) / ( allSteps.length - 1 ) ) * 100
	);
	return (
		<>
			<Fill name={ `${ HEADER_SITEGEN }/${ HEADER_TOP }` }>
				<>
					<AdminBar />
					{ currentStep !== stepTheFork &&
						currentStep !== stepSiteGenMigration && (
							<ProgressBar progress={ progress } />
						) }
				</>
			</Fill>
			<Fill name={ `${ HEADER_SITEGEN }/${ HEADER_START }` }>
				<>{ isHeaderNavigationEnabled && <StepNavigation /> }</>
			</Fill>
			{ currentStep?.header && <currentStep.header /> }
		</>
	);
};

export default memo( SiteGenHeader );
