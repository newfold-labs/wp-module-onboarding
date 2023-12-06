import { Fill, PanelBody, PanelHeader, Button } from '@wordpress/components';
import { Fragment, memo, Suspense } from '@wordpress/element';
import { closeSmall } from '@wordpress/icons';
import { useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import { store as nfdOnboardingStore } from '../../../../store';
import {
	SIDEBAR_SITEGEN_EDITOR_PATTERNS,
	SIDEBAR_SLOTFILL_PREFIX,
} from '../../../../../constants';

const SitegenEditorPatternsSidebar = () => {
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
		<Fill name={ `${ SIDEBAR_SLOTFILL_PREFIX }/${ SIDEBAR_SITEGEN_EDITOR_PATTERNS }` }>
			<PanelBody
				className="nfd-onboarding-sidebar--sitegen-editor-patterns"
				initialOpen={ true }
			>
				<Suspense fallback={ <></>}>
					<PanelHeader
						label={ __( 'Learn More', 'wp-module-onboarding' ) }
					>
						<div className="nfd-onboarding-sidebar--sitegen-editor-patterns__header">
							<Button
								className="nfd-onboarding-sidebar--sitegen-editor-patterns__header__icon"
								onClick={ closeSideBar }
								icon={ closeSmall }
							></Button>
						</div>
					</PanelHeader>
					{ currentStep?.sidebars?.LearnMore &&
						currentStep?.sidebars?.LearnMore.SidebarComponents.map(
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
		</Fill>
	);
};

export default memo( SitegenEditorPatternsSidebar );
