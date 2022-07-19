import {
	Fill,
	PanelBody,
	PanelRow,
	PanelHeader,
	Button,
} from '@wordpress/components';
import { Fragment, Suspense } from '@wordpress/element';
import { Icon, closeSmall } from '@wordpress/icons';
import { useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import { store as nfdOnboardingStore } from '../../../../store';
import {
	SIDEBAR_LEARN_MORE,
	SIDEBAR_SLOTFILL_PREFIX,
} from '../../../../../constants';

const LearnMoreSidebar = () => {
	const { currentStep } = useSelect( ( select ) => {
		return {
			currentStep: select( nfdOnboardingStore ).getCurrentStep(),
		};
	} );

	const { setIsSidebarOpened } = useDispatch( nfdOnboardingStore );

	const closeSideBar = () => {
		setIsSidebarOpened( false );
	};
	return (
		<Fill name={ `${ SIDEBAR_SLOTFILL_PREFIX }/${ SIDEBAR_LEARN_MORE }` }>
			<PanelHeader label={ __( 'Learn More', 'wp-module-onboarding' ) }>
				<Button onClick={ closeSideBar } icon={ closeSmall }></Button>
			</PanelHeader>
			<PanelBody initialOpen={ true }>
				<PanelRow>
					<div className="nfd-onboarding-sidebar-learn-more__container">
						<div className="nfd-onboarding-sidebar-learn-more__icon">
							<Icon icon={ currentStep.Icon } />
						</div>
						<div className="nfd-onboarding-sidebar-learn-more__text">
							<p className="nfd-onboarding-sidebar-learn-more__text-heading">
								<strong>{ currentStep.heading }</strong>
							</p>
							<p className="nfd-onboarding-sidebar-learn-more__text-subheading">
								{ currentStep.description }
							</p>
						</div>
					</div>
				</PanelRow>
			</PanelBody>
			{ currentStep?.SidebarComponents?.LearnMore && (
				<PanelBody initialOpen={ true }>
					<Suspense fallback={ <Fragment /> }>
						{ currentStep.SidebarComponents.LearnMore.map(
							( SidebarComponent, index ) => {
								return (
									<Fragment key={ index }>
										<SidebarComponent />
									</Fragment>
								);
							}
						) }
					</Suspense>
				</PanelBody>
			) }
		</Fill>
	);
};

export default LearnMoreSidebar;
