import { __ } from '@wordpress/i18n';
import { Fill } from '@wordpress/components';
import {
	HEADER_CENTER,
	HEADER_END,
	HEADER_SITEGEN,
	HEADER_START,
	SIDEBAR_SITEGEN_EDITOR_PATTERNS,
	pluginDashboardPage,
} from '../../../../../constants';
import { Icon, chevronRight } from '@wordpress/icons';
import { store as nfdOnboardingStore } from '../../../../store';

import { useSelect, useDispatch } from '@wordpress/data';

import { useEffect, useState } from '@wordpress/element';
import { setFlow, completeFlow } from '../../../../utils/api/flow';
import Spinner from '../../../../components/Loaders/Spinner';
import { regenerateHomepage } from '../../../../utils/api/siteGen';
import StepEditorHeaderCenter from './center';
import { useViewportMatch } from '@wordpress/compose';

const StepSiteGenEditorHeader = () => {
	const [ homepage, setHomepage ] = useState();
	const [ isSaving, setIsSaving ] = useState( false );
	const [ isEditingTitle, setIsEditingTitle ] = useState( false );

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
		const homepages = currentData.sitegen.homepages.data;
		if ( ! ( homepage.slug in homepages ) ) {
			return;
		}

		const isFavorite = ! homepage.isFavorite;
		homepage.isFavorite = isFavorite;
		currentData.sitegen.homepages.data[ homepage.slug ] = homepage;
		currentData.sitegen.homepages.active = homepage;
		setCurrentOnboardingData( currentData );
	};

	const handleRegenerate = async () => {
		if ( isSaving ) {
			return;
		}

		if ( currentData.sitegen.siteDetails?.prompt === '' ) {
			return;
		}

		const homepages = currentData.sitegen.homepages.data;
		if ( ! ( homepage.slug in homepages ) ) {
			return;
		}

		const { slug, color, isFavorite } = homepage || {};
		const response = await regenerateHomepage(
			currentData.sitegen.siteDetails.prompt,
			slug,
			color,
			isFavorite
		);

		if ( response.error ) {
			return;
		}

		const regeneratedHomepage = response.body;
		homepages[ regeneratedHomepage.slug ] = regeneratedHomepage;
		currentData.sitegen.homepages.data = homepages;
		currentData.sitegen.homepages.active = regeneratedHomepage;
		setCurrentOnboardingData( currentData );
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

	const handleRename = ( title ) => {
		homepage.title = title;
		currentData.sitegen.homepages.data[ homepage.slug ] = homepage;
		currentData.sitegen.homepages.active = homepage;
		setCurrentOnboardingData( currentData );
	};

	const saveAndContinue = async () => {
		setIsSaving( true );
		await setFlow( currentData );
		await completeFlow();
		window.location.replace( pluginDashboardPage );
	};

	useEffect( () => {
		handleCustomize();
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
							onClick={ handleRegenerate }
							onKeyDown={ handleRegenerate }
						>
							<div
								className={ `nfd-onboarding-header--sitegen__editor__start__regenerate__icon` }
							></div>
							<div
								className={ `nfd-onboarding-header--sitegen__editor__start__regenerate__text` }
							>
								{ __( 'Regenerate', 'wp-module-onboarding' ) }
							</div>
						</div>
					) }
				</div>
			</Fill>
			<Fill name={ `${ HEADER_SITEGEN }/${ HEADER_CENTER }` }>
				{ homepage && (
					<div className="nfd-onboarding-header--sitegen__editor__center">
						<StepEditorHeaderCenter
							handleFavorite={ handleFavorite }
							handleViewAll={ handleViewAll }
							handleCustomize={ handleCustomize }
							handleRegenerate={ handleRegenerate }
							handleIsRenaming={ ( isRenaming ) =>
								setIsEditingTitle( isRenaming )
							}
							handleRename={ handleRename }
							homepageTitle={ homepage.title }
							isFavorite={ homepage.isFavorite }
							isRenaming={ isEditingTitle }
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
