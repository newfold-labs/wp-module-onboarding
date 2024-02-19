import { useViewportMatch } from '@wordpress/compose';
import { useEffect, useState } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

import getContents from './contents';
import { HEADER_SITEGEN } from '../../../../constants';
import SkipButton from '../../../components/SkipButton';
import { store as nfdOnboardingStore } from '../../../store';
import AIHeading from '../../../components/Heading/AIHeading';
import CommonLayout from '../../../components/Layouts/Common';
import NextButtonSiteGen from '../../../components/Button/NextButtonSiteGen';
import ImageUploaderWithText from '../../../components/ImageUploader/components/ImageUploaderWithText';
import SitegenAiStateHandler from '../../../components/StateHandlers/SitegenAi';

const SiteGenSiteLogo = () => {
	const [ siteLogo, setSiteLogo ] = useState();
	const isLargeViewport = useViewportMatch( 'small' );

	const { currentData } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	} );

	const { editEntityRecord } = useDispatch( coreStore );

	const { getEditedEntityRecord } = useSelect( ( select ) => {
		return select( coreStore );
	}, [] );

	const {
		setIsFooterNavAllowed,
		setIsHeaderEnabled,
		setSidebarActiveView,
		setHeaderActiveView,
		setDrawerActiveView,
		setHideFooterNav,
		setCurrentOnboardingData,
		setIsHeaderNavigationEnabled,
	} = useDispatch( nfdOnboardingStore );

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
	};

	useEffect( () => {
		setHideFooterNav( false );
		setIsHeaderEnabled( true );
		setSidebarActiveView( false );
		setIsHeaderNavigationEnabled( true );
		setHeaderActiveView( HEADER_SITEGEN );
		setDrawerActiveView( false );
		if ( currentData.data.siteLogo?.id !== 0 ) {
			return setSiteLogo( currentData.data.siteLogo );
		}
		setIsFooterNavAllowed( false );
		getEditedEntityRecord( 'root', 'site' );
	}, [] );

	const handleSiteLogo = ( siteLogoNew ) => {
		const currentDataCopy = { ...currentData };
		currentDataCopy.data.siteLogo.id = siteLogoNew.id;
		currentDataCopy.data.siteLogo.url = siteLogoNew.url;
		currentDataCopy.data.siteLogo.fileName = siteLogoNew.fileName;
		currentDataCopy.data.siteLogo.fileSize = siteLogoNew.fileSize;
		setCurrentOnboardingData( currentDataCopy );
		setIsFooterNavAllowed( siteLogoNew.id !== 0 );
		editEntityRecord( 'root', 'site', undefined, {
			site_logo: siteLogoNew.id,
		} );
		setSiteLogo( siteLogoNew );
	};

	const content = getContents();
	return (
		<SitegenAiStateHandler>
			<CommonLayout
				isCentered
				className="nfd-onboarding-step--site-gen__site-logo"
			>
				<div className="nfd-onboarding-step--site-gen__site-logo__container">
					<AIHeading title={ content.heading } />
					<ImageUploaderWithText
						image={ siteLogo }
						imageSetter={ handleSiteLogo }
					/>
					<div className="nfd-onboarding-step--site-gen__site-logo__container__buttons">
						<SkipButton
							callback={ () => resetSiteLogo() }
							className="nfd-onboarding-step--site-gen__site-logo__container__buttons__skip"
							text={ content.buttons.skip }
						/>
						{ isLargeViewport && (
							<NextButtonSiteGen
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
		</SitegenAiStateHandler>
	);
};

export default SiteGenSiteLogo;
