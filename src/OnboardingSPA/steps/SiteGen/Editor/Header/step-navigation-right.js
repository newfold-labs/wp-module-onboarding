import { useSelect, useDispatch } from '@wordpress/data';
import { Icon, chevronRight, settings } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { useViewportMatch } from '@wordpress/compose';

import { store as nfdOnboardingStore } from '../../../../store';

/**
 * Step buttons presented in Header.
 *
 * @return {WPComponent} StepNavigation Component
 */
const StepNavigationRight = () => {
	// eslint-disable-next-line no-unused-vars
	const { previousStep, showErrorDialog } = useSelect( ( select ) => {
		return {
			previousStep: select( nfdOnboardingStore ).getPreviousStep(),
			showErrorDialog: select( nfdOnboardingStore ).getShowErrorDialog(),
		};
	}, [] );

	const isLargeViewport = useViewportMatch( 'medium' );

	const Customize = () => {
		const { isSidebarOpened, sideBarView } = useSelect( ( select ) => {
			return {
				isSidebarOpened: select( nfdOnboardingStore ).isSidebarOpened(),
				sideBarView: select( nfdOnboardingStore ).getSidebarView(),
			};
		} );

		const { setIsSidebarOpened, setSidebarActiveView } =
			useDispatch( nfdOnboardingStore );
		const customize = () => {
			const isSidebarOpenedNew =
				sideBarView === 'Customize'
					? ! isSidebarOpened
					: isSidebarOpened;
			setSidebarActiveView( 'Customize' );
			setIsSidebarOpened( isSidebarOpenedNew );
		};
		return (
			<div
				role="button"
				tabIndex="0"
				onClick={ customize }
				onKeyDown={ ( event ) => {
					if ( event.key === 'Enter' ) {
						customize();
					}
				} }
				aria-label="Customize"
				className="navigation-buttons-editor"
			>
				<Icon icon={ settings } />
				{ __( 'Customize', 'wp-module-onboarding' ) }
			</div>
		);
	};

	const Save = () => {
		const save = () => {
			//	alert( 'save' );
		};
		return (
			<div
				role="button"
				tabIndex="0"
				onClick={ save }
				onKeyDown={ ( event ) => {
					if ( event.key === 'Enter' ) {
						save();
					}
				} }
				aria-label="Save"
				className="navigation-buttons-editor"
			>
				{ isLargeViewport
					? __( 'Save & Continue', 'wp-module-onboarding' )
					: __( 'Next', 'wp-module-onboarding' ) }
				<Icon icon={ chevronRight } />
			</div>
		);
	};

	return (
		<div className="nfd-onboarding-header__step-navigation">
			{ isLargeViewport ? <Customize /> : '' }
			<Save />
		</div>
	);
};

export default StepNavigationRight;
