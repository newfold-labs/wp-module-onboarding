import { useSelect, useDispatch } from '@wordpress/data';
import { useNavigate } from 'react-router-dom';
import { Icon, chevronLeft, reusableBlock } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { useViewportMatch } from '@wordpress/compose';

import { store as nfdOnboardingStore } from '../../../../store';

/**
 * Step buttons presented in Header.
 *
 * @return {WPComponent} StepNavigation Component
 */
const StepNavigationLeft = () => {
	const { previousStep, showErrorDialog } = useSelect( ( select ) => {
		return {
			previousStep: select( nfdOnboardingStore ).getPreviousStep(),
			showErrorDialog: select( nfdOnboardingStore ).getShowErrorDialog(),
		};
	}, [] );

	const isLargeViewport = useViewportMatch( 'medium' );

	/**
	 * Back step Navigation button.
	 *
	 * @param {*} param0
	 *
	 * @return {WPComponent} Back Component
	 */
	const Back = ( { path, showErrorDialog } ) => {
		const { setNavErrorContinuePath } = useDispatch( nfdOnboardingStore );
		const navigate = useNavigate();
		const navigateBack = () => {
			if ( showErrorDialog !== false ) {
				setNavErrorContinuePath( path );
			} else {
				navigate( path, { state: { origin: 'header' } } );
			}
		};
		return (
			<div
				role="button"
				tabIndex="0"
				onClick={ navigateBack }
				onKeyDown={ ( event ) => {
					if ( event.key === 'Enter' ) {
						navigateBack();
					}
				} }
				aria-label="Back"
				className="navigation-buttons-editor"
			>
				<Icon icon={ chevronLeft } />
				{ __( 'Back', 'wp-module-onboarding' ) }
			</div>
		);
	};

	const Regenerate = () => {
		const regenerate = () => {
			alert( 'regenerate' );
		};
		return (
			<div
				role="button"
				tabIndex="0"
				onClick={ regenerate }
				onKeyDown={ ( event ) => {
					if ( event.key === 'Enter' ) {
						regenerate();
					}
				} }
				aria-label="Regenerate"
				className="navigation-buttons-editor"
			>
				<Icon icon={ reusableBlock } />
				{ __( 'Regenerate', 'wp-module-onboarding' ) }
			</div>
		);
	};

	return (
		<div className="nfd-onboarding-header__step-navigation">
			<Back
				path={ previousStep.path }
				showErrorDialog={ showErrorDialog }
			/>
			{ isLargeViewport ? <Regenerate /> : '' }
		</div>
	);
};

export default StepNavigationLeft;
