// WordPress
import { useViewportMatch } from '@wordpress/compose';
import { useEffect, useState } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

// Classes and functions
import getContents from './contents';
import {
	OnboardingEvent,
	trackOnboardingEvent,
} from '../../../utils/analytics/hiive';

// Components
import SkipButton from '../../../components/SkipButton';
import AIHeading from '../../../components/Heading/AIHeading';
import CommonLayout from '../../../components/Layouts/Common';
import NextButtonSiteGen from '../../../components/Button/NextButtonSiteGen';
import ImageUploaderWithText from '../../../components/ImageUploader/components/ImageUploaderWithText';

// Misc
import { store as nfdOnboardingStore } from '../../../store';
import { HEADER_SITEGEN } from '../../../../constants';
import {
	ACTION_LOGO_ADDED,
	ACTION_SITEGEN_LOGO_SKIPPED,
} from '../../../utils/analytics/hiive/constants';
import { SITEGEN_FLOW } from '../../../data/flows/constants';

const SiteGenSiteLogo = () => {
	const [ siteLogo, setSiteLogo ] = useState();

	const isLargeViewport = useViewportMatch( 'small' );

	const { currentData } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	} );

	const { getEditedEntityRecord } = useSelect( ( select ) => {
		return select( coreStore );
	}, [] );

	const { editEntityRecord } = useDispatch( coreStore );

	const {
		setIsFooterNavAllowed,
		setIsHeaderEnabled,
		setSidebarActiveView,
		setHeaderActiveView,
		setDrawerActiveView,
		setHideFooterNav,
		setCurrentOnboardingData,
		setIsHeaderNavigationEnabled,
		updateSiteGenErrorStatus,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setHideFooterNav( false );
		setIsHeaderEnabled( true );
		setSidebarActiveView( false );
		setIsHeaderNavigationEnabled( true );
		setHeaderActiveView( HEADER_SITEGEN );
		setDrawerActiveView( false );
		if ( currentData.sitegen.siteLogo?.id !== 0 ) {
			setIsFooterNavAllowed( true );
			return setSiteLogo( currentData.sitegen.siteLogo );
		}
		setIsFooterNavAllowed( false );
		getEditedEntityRecord( 'root', 'site' );
	}, [] );

	const resetSiteLogo = () => {
		const currentDataCopy = { ...currentData };
		currentDataCopy.sitegen.siteLogo = {
			id: 0,
			url: '',
			fileName: '',
			fileSize: 0,
		};
		setCurrentOnboardingData( currentDataCopy );
		setSiteLogo( undefined );
		setIsFooterNavAllowed( false );
		trackOnboardingEvent(
			new OnboardingEvent( ACTION_SITEGEN_LOGO_SKIPPED, undefined, {
				source: SITEGEN_FLOW,
			} )
		);
	};

	const handleSiteLogo = ( siteLogoNew ) => {
		const currentDataCopy = { ...currentData };
		currentDataCopy.sitegen.siteLogo.id = siteLogoNew.id;
		currentDataCopy.sitegen.siteLogo.url = siteLogoNew.url;
		currentDataCopy.sitegen.siteLogo.fileName = siteLogoNew.fileName;
		currentDataCopy.sitegen.siteLogo.fileSize = siteLogoNew.fileSize;
		setCurrentOnboardingData( currentDataCopy );
		setIsFooterNavAllowed( siteLogoNew.id !== 0 );
		editEntityRecord( 'root', 'site', undefined, {
			site_logo: siteLogoNew.id,
		} );
		setSiteLogo( siteLogoNew );
	};

	const handleFailure = () => {
		updateSiteGenErrorStatus( true );
	};

	const content = getContents();

	return (
		<CommonLayout
			isCentered
			className="nfd-onboarding-step--site-gen__site-logo"
		>
			<div className="nfd-onboarding-step--site-gen__site-logo__container">
				<AIHeading title={ content.heading } />
				<ImageUploaderWithText
					image={ siteLogo }
					imageSetter={ handleSiteLogo }
					onFailure={ handleFailure }
				/>
				<div className="nfd-onboarding-step--site-gen__site-logo__container__buttons">
					<SkipButton
						callback={ () => resetSiteLogo() }
						className="nfd-onboarding-step--site-gen__site-logo__container__buttons__skip"
						text={ content.buttons.skip }
					/>
					{ isLargeViewport && (
						<NextButtonSiteGen
							callback={ () => {
								if ( siteLogo ) {
									trackOnboardingEvent(
										new OnboardingEvent(
											ACTION_LOGO_ADDED
										),
										{
											source: SITEGEN_FLOW,
										}
									);
								}
							} }
							text={ content.buttons.next }
							disabled={
								siteLogo === undefined || siteLogo?.id === 0
									? true
									: false
							}
						/>
					) }
				</div>
			</div>
		</CommonLayout>
	);
};

export default SiteGenSiteLogo;
