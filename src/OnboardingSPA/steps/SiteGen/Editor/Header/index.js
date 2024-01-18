import { __ } from '@wordpress/i18n';
import { Fill } from '@wordpress/components';
import {
	HEADER_CENTER,
	HEADER_END,
	HEADER_SITEGEN,
	HEADER_START,
	wpEditorPage,
	SIDEBAR_SITEGEN_EDITOR_PATTERNS,
} from '../../../../../constants';
import { Icon, chevronRight } from '@wordpress/icons';
import { store as nfdOnboardingStore } from '../../../../store';

import { useSelect, useDispatch } from '@wordpress/data';

import { useEffect, useState } from '@wordpress/element';
import { setFlow, completeFlow } from '../../../../utils/api/flow';
import Spinner from '../../../../components/Loaders/Spinner';
import { getRegeneratedHomePagePreviews } from '../../../../utils/api/siteGen';
import StepNavigationCenter from './step-navigation-center';
import { useViewportMatch } from '@wordpress/compose';

const StepSiteGenEditorHeader = () => {
	const [ homepage, setHomepage ] = useState();
	const [ isSaving, setIsSaving ] = useState( false );
	const [ isRegenerating, setIsRegenerating ] = useState( false );

	const isLargeViewport = useViewportMatch( 'medium' );

	const {
		setCurrentOnboardingData,
		setSidebarActiveView,
		setIsSidebarOpened,
	} = useDispatch( nfdOnboardingStore );
	const { currentData, sideBarView, isSidebarOpened } = useSelect(
		( select ) => {
			return {
				currentData:
					select( nfdOnboardingStore ).getCurrentOnboardingData(),
				sideBarView: select( nfdOnboardingStore ).getSidebarView(),
				isSidebarOpened: select( nfdOnboardingStore ).isSidebarOpened(),
			};
		}
	);

	const handleFavorite = () => {
		if ( isSaving ) {
			return;
		}
		homepage.isFavourited = ! homepage.isFavourited;
		currentData.sitegen.homepages.data[ homepage.slug ] = homepage;
		setCurrentOnboardingData( currentData );
	};

	const handleRegenerate = async () => {
		setIsRegenerating( true );
		if ( isSaving ) {
			return;
		}
		const { slug, colorPalattes, isFavourited } =
			currentData?.sitegen?.homepages?.active || {};
		try {
			const response = await getRegeneratedHomePagePreviews(
				currentData.sitegen.siteDetails.prompt,
				true,
				slug,
				colorPalattes,
				isFavourited
			);

			if ( response && response.body && response.body.length > 0 ) {
				const regeneratedPage = response.body.find(
					( page ) =>
						! currentData.sitegen.homepages.data.some(
							( existingPage ) => existingPage.slug === page.slug
						)
				);
				setHomepage( regeneratedPage );
				currentData.sitegen.homepages.data[ regeneratedPage.slug ] =
					regeneratedPage;
				currentData.sitegen.homepages.active = regeneratedPage;
				setCurrentOnboardingData( currentData );
				setIsRegenerating( false );
			} else if ( response && response.error ) {
				setIsRegenerating( false );
			} else {
				setIsRegenerating( false );
			}
		} catch ( error ) {
			setIsRegenerating( false );
		}
	};

	const saveAndContinue = async () => {
		setIsSaving( true );
		await setFlow( currentData );
		await completeFlow();
		window.location.replace( wpEditorPage );
	};
	const handleViewAll = () => {
		setSidebarActiveView( SIDEBAR_SITEGEN_EDITOR_PATTERNS );
		setIsSidebarOpened( true );
	};

	const handleCustomize = () => {
		const isSidebarOpenedNew =
			sideBarView === 'Customize' ? ! isSidebarOpened : isSidebarOpened;
		setSidebarActiveView( 'Customize' );
		setIsSidebarOpened( isSidebarOpenedNew );
	};

	useEffect( () => {
		handleCustomize();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [] );

	useEffect( () => {
		if ( currentData?.sitegen?.homepages?.active ) {
			setHomepage( currentData.sitegen.homepages.active );
		}
	}, [ currentData ] );
	return (
		<>
			<Fill name={ `${ HEADER_SITEGEN }/${ HEADER_START }` }>
				<div className="nfd-onboarding-header--sitegen__editor__start">
					{ isLargeViewport && (
						<div
							className={ `nfd-onboarding-header--sitegen__editor__start__regenerate ${
								isSaving &&
								'nfd-onboarding-header--sitegen__editor__start__regenerate__disabled'
							}` }
							role="button"
							tabIndex={ 0 }
							onClick={ () => handleRegenerate() }
							onKeyDown={ () => handleRegenerate() }
						>
							<div
								className={ `nfd-onboarding-header--sitegen__editor__start__regenerate__icon` }
							></div>
							<div
								className={ `nfd-onboarding-header--sitegen__editor__start__regenerate__text` }
							>
								{ __( 'Regenerate', 'wp-module-onboarding' ) }
							</div>
							{ isRegenerating && (
								<Spinner
									className={
										'nfd-onboarding-header--sitegen__editor__start__regenerate__spinner'
									}
								/>
							) }
						</div>
					) }
				</div>
			</Fill>
			<Fill name={ `${ HEADER_SITEGEN }/${ HEADER_CENTER }` }>
				{ homepage && (
					<div className="nfd-onboarding-header--sitegen__editor__center">
						<StepNavigationCenter
							handleFavorite={ handleFavorite }
							handleViewAll={ handleViewAll }
							handleCustomize={ handleCustomize }
							handleRegenerate={ handleRegenerate }
						/>
					</div>
				) }
			</Fill>
			<Fill name={ `${ HEADER_SITEGEN }/${ HEADER_END }` }>
				<div className="nfd-onboarding-header--sitegen__editor__end">
					{ isLargeViewport && (
						<div
							className={ `nfd-onboarding-header--sitegen__editor__end__customize-button ${
								isSaving &&
								'nfd-onboarding-header--sitegen__editor__end__customize-button__disabled'
							}` }
							onClick={ handleCustomize }
							onKeyDown={ handleCustomize }
							role="presentation"
						>
							<div className="nfd-onboarding-header--sitegen__editor__end__customize-button__icon"></div>
							<div className="nfd-onboarding-header--sitegen__editor__end__customize-button__text">
								{ __( 'Customize', 'wp-module-onboarding' ) }
							</div>
						</div>
					) }
					<div className="nfd-onboarding-header--sitegen__editor__end__save-button">
						<div
							className="nfd-onboarding-header--sitegen__editor__end__save-button__text"
							onClick={ saveAndContinue }
							role="button"
							tabIndex={ 0 }
							onKeyDown={ saveAndContinue }
						>
							{ isLargeViewport
								? __(
										'Save & Continue',
										'wp-module-onboarding'
								  )
								: __( 'Next', 'wp-module-onboarding' ) }
						</div>
						{ isSaving ? (
							<Spinner
								className={
									'nfd-onboarding-header--sitegen__editor__end__save-button__spinner'
								}
							/>
						) : (
							<Icon
								icon={ chevronRight }
								className="nfd-onboarding-header--sitegen__editor__end__save-button__text"
							></Icon>
						) }
					</div>
				</div>
			</Fill>
		</>
	);
};

export default StepSiteGenEditorHeader;
