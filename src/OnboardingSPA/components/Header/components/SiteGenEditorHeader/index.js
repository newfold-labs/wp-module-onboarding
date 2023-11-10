import { memo } from '@wordpress/element';
import AdminBar from '../../../AdminBar';
import ProgressBar from '../../../ProgressBar';

import { Fill } from '@wordpress/components';
import {
	HEADER_CENTER,
	HEADER_SITEGEN,
	HEADER_START,
	HEADER_END,
	HEADER_TOP,
} from '../../../../../constants';

import { useSelect } from '@wordpress/data';
import { store as nfdOnboardingStore } from '../../../../store';
import StepNavigationLeft from './step-navigation-left';
import StepNavigationCenter from './step-navigation-center';
import StepNavigationRight from './step-navigation-right';

// eslint-disable-next-line import/no-extraneous-dependencies
import { findIndex } from 'lodash';

/**
 * Interface header rendered into header render prop in <InterfaceSkeleton />.
 *
 * @return {WPComponent} Header
 */
const SiteGenEditorHeader = () => {
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
		path: currentStep.path,
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
			<Fill name={ `${ HEADER_SITEGEN }/${ HEADER_START }` }>
				<>{ isHeaderNavigationEnabled && <StepNavigationLeft /> }</>
			</Fill>
			<Fill name={ `${ HEADER_SITEGEN }/${ HEADER_CENTER }` }>
				<>{ isHeaderNavigationEnabled && <StepNavigationCenter /> }</>
			</Fill>
			<Fill name={ `${ HEADER_SITEGEN }/${ HEADER_END }` }>
				<>{ isHeaderNavigationEnabled && <StepNavigationRight /> }</>
			</Fill>
			{ currentStep?.header && <currentStep.header /> }
		</>
	);
};

export default memo( SiteGenEditorHeader );