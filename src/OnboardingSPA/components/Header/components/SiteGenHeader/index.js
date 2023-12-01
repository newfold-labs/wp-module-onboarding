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
import { store as nfdOnboardingStore } from '../../../../store';
import StepNavigation from './step-navigation';

// eslint-disable-next-line import/no-extraneous-dependencies
import { findIndex } from 'lodash';

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
	const progress = ( currentStepIndex / allSteps.length ) * 100;

	return (
		<>
			<Fill name={ `${ HEADER_SITEGEN }/${ HEADER_TOP }` }>
				<>
					<AdminBar />
					{ isHeaderNavigationEnabled && (
						<ProgressBar progress={ progress } />
					) }
				</>
			</Fill>

			{ currentStep?.header
				? isHeaderNavigationEnabled && <currentStep.header />
				: isHeaderNavigationEnabled && (
						<Fill name={ `${ HEADER_SITEGEN }/${ HEADER_START }` }>
							<StepNavigation />
						</Fill>
				  ) }
		</>
	);
};

export default memo( SiteGenHeader );
