// eslint-disable-next-line import/no-extraneous-dependencies
import { useRef } from 'react';
import { Fill, PanelBody, PanelHeader, Button } from '@wordpress/components';
import { Fragment, memo, Suspense } from '@wordpress/element';
import { closeSmall } from '@wordpress/icons';
import { useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import { store as nfdOnboardingStore } from '../../../../store';
import { SIDEBAR_SLOTFILL_PREFIX } from '../../../../../constants';
import SidebarSkeleton from './Skeleton/SidebarSkeleton';

const CustomizeSidebar = () => {
	const sidebarRef = useRef();
	const { currentStep } = useSelect( ( select ) => {
		return {
			currentStep: select( nfdOnboardingStore ).getCurrentStep(),
		};
	} );

	const { setIsSidebarOpened } = useDispatch( nfdOnboardingStore );

	const closeSideBar = () => {
		setIsSidebarOpened( false );
	};

	const resetCustomization = () => {
		sidebarRef.current.resetCustomizationCallback();
	};

	return (
		<Fill name={ `${ SIDEBAR_SLOTFILL_PREFIX }/Customize` }>
			<PanelBody
				className="nfd-onboarding-sidebar-learn-more"
				initialOpen={ true }
			>
				<Suspense fallback={ <SidebarSkeleton /> }>
					<PanelHeader
						label={ __(
							'Customize Website',
							'wp-module-onboarding'
						) }
					>
						<Button onClick={ resetCustomization }>Reset</Button>
						<div className="nfd-onboarding-sidebar-learn-more__header">
							<Button
								className="nfd-onboarding-sidebar-learn-more__header__icon"
								onClick={ closeSideBar }
								icon={ closeSmall }
							></Button>
						</div>
					</PanelHeader>
					{ currentStep?.sidebars?.Customize &&
						currentStep?.sidebars?.Customize.SidebarComponents.map(
							( SidebarComponent, index ) => {
								return (
									<Fragment key={ index }>
										<SidebarComponent ref={ sidebarRef } />
									</Fragment>
								);
							}
						) }
				</Suspense>
			</PanelBody>
		</Fill>
	);
};

export default memo( CustomizeSidebar );
