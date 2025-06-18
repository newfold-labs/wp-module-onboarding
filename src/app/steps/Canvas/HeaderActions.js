import { nfdOnboardingStore } from '@/data/store';
import { AdjustmentsVerticalIcon, CloudArrowUpIcon, RectangleStackIcon as RectangleStackIconOutline } from '@heroicons/react/24/outline';
import { RectangleStackIcon as RectangleStackIconSolid } from '@heroicons/react/24/solid'
import { Button } from '@newfold/ui-component-library';
import { dispatch, useSelect } from '@wordpress/data';

const HeaderActions = () => {
	const { canvasSidebarIsOpen } = useSelect( ( select ) => {
		return {
			canvasSidebarIsOpen: select( nfdOnboardingStore ).getCanvasSidebarIsOpen(),
		};
	} );

	const handleCanvasSidebarToggle = () => {
		dispatch( nfdOnboardingStore ).setCanvasSidebarIsOpen( ! canvasSidebarIsOpen );
	};

	return (
		<div className="nfd-onboarding-canvas-header-actions nfd-flex nfd-gap-4">
			<button
				type="button"
				aria-label={ __( 'Close layouts sidebar', 'wp-module-onboarding' ) }
				className="nfd-onboarding-canvas-sidebar-header-close nfd-mr-2 nfd-rounded-sm hover:nfd-text-primary focus:nfd-text-primary focus:nfd-outline-none focus:nfd-ring-2 focus:nfd-ring-primary focus:nfd-ring-offset-2"
				onClick={ handleCanvasSidebarToggle }
			>
				{
					canvasSidebarIsOpen ? (
						<RectangleStackIconSolid className="nfd-w-6 nfd-h-6 nfd-text-primary nfd-transition-all nfd-duration-200 nfd-ease-in-out" />
					) : (
						<RectangleStackIconOutline className="nfd-w-6 nfd-h-6 nfd-transition-all nfd-duration-200 nfd-ease-in-out" />
					)
				}
			</button>
			<Button variant="secondary" className="nfd-font-semibold">
				<AdjustmentsVerticalIcon className="nfd-w-5 nfd-h-5 nfd-mr-2" />
				{ __( 'Select & Customize', 'wp-module-onboarding' ) }
			</Button>
			<Button variant="primary" className="nfd-font-semibold">
				<CloudArrowUpIcon className="nfd-w-5 nfd-h-5 nfd-mr-2" />
				{ __( 'Save & Publish', 'wp-module-onboarding' ) }
			</Button>
		</div>
	);
}

export default HeaderActions;
