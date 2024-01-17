import { Slot } from '@wordpress/components';
import { Fragment, Suspense } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import classNames from 'classnames';

import { store as nfdOnboardingStore } from '../../store';
import {
	HEADER_CENTER,
	HEADER_END,
	HEADER_START,
	HEADER_TOP,
} from '../../../constants';
import { stepSiteGenEditor } from '../../steps/SiteGen/Editor/step';
import { SITEGEN_FLOW } from '../../data/flows/constants';
import ExitToWordPress from '../ExitToWordPress';

const Header = () => {
	const { headers, headerActiveView, isHeaderEnabled, currentStep } =
		useSelect( ( select ) => {
			return {
				currentStep: select( nfdOnboardingStore ).getCurrentStep(),
				headers: select( nfdOnboardingStore ).getHeaders(),
				headerActiveView:
					select( nfdOnboardingStore ).getHeaderActiveView(),
				isHeaderEnabled: select( nfdOnboardingStore ).isHeaderEnabled(),
			};
		} );

	const isEditorStep = currentStep === stepSiteGenEditor;
	const isSitegenFlow = window.nfdOnboarding.currentFlow === SITEGEN_FLOW;

	return (
		<>
			<Suspense fallback={ <Fragment /> }>
				{ headers.map( ( header ) => {
					return (
						<Fragment key={ header.id }>
							<header.header />
						</Fragment>
					);
				} ) }
			</Suspense>
			<Slot name={ `${ headerActiveView }/${ HEADER_TOP }` } />
			{ isHeaderEnabled && (
				<div
					className={ classNames(
						'nfd-onboarding-header',
						{
							'nfd-onboarding-header--dark': isEditorStep,
						},
						{
							'nfd-onboarding-header--sitegen': isSitegenFlow,
						}
					) }
				>
					<div className="nfd-onboarding-header__start">
						<Slot
							name={ `${ headerActiveView }/${ HEADER_START }` }
						/>
					</div>
					<div className="nfd-onboarding-header__center">
						<Slot
							name={ `${ headerActiveView }/${ HEADER_CENTER }` }
						/>
					</div>
					<div className="nfd-onboarding-header__end">
						<Slot
							name={ `${ headerActiveView }/${ HEADER_END }` }
						/>
					</div>
				</div>
			) }
		</>
	);
};

export default Header;
