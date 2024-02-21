import { useViewportMatch } from '@wordpress/compose';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';

import getContents from './contents';
import Animate from '../../../components/Animate';
import { HEADER_SITEGEN } from '../../../../constants';
import { store as nfdOnboardingStore } from '../../../store';
import AIHeading from '../../../components/Heading/AIHeading';
import CommonLayout from '../../../components/Layouts/Common';
import TextInputSiteGen from '../../../components/TextInput/TextInputSiteGen';
import NextButtonSiteGen from '../../../components/Button/NextButtonSiteGen';
import SitegenAiStateHandler from '../../../components/StateHandlers/SitegenAi';

const SiteGenSiteDetails = () => {
	const content = getContents();
	const isLargeViewport = useViewportMatch( 'small' );
	const [ customerInput, setCustomerInput ] = useState();
	const [ isValidInput, setIsValidInput ] = useState( false );
	const { currentData } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	} );

	const {
		setIsFooterNavAllowed,
		setIsHeaderEnabled,
		setSidebarActiveView,
		setHeaderActiveView,
		setDrawerActiveView,
		setHideFooterNav,
		setCurrentOnboardingData,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setHideFooterNav( false );
		setIsHeaderEnabled( true );
		setSidebarActiveView( false );
		setHeaderActiveView( HEADER_SITEGEN );
		setDrawerActiveView( false );
		if ( currentData.sitegen.siteDetails?.prompt !== '' ) {
			setIsValidInput( true );
			setIsFooterNavAllowed( true );
			return setCustomerInput( currentData.sitegen.siteDetails.prompt );
		}
		setIsFooterNavAllowed( false );
	}, [] );

	useEffect( () => {
		if (
			customerInput !== undefined &&
			customerInput !== '' &&
			customerInput !== currentData.sitegen.siteDetails.prompt
		) {
			currentData.sitegen.siteDetails.prompt = customerInput?.trim();
			currentData.sitegen.siteDetails.mode = 'simple';
			currentData.sitegen.skipCache = true;
			currentData.sitegen.sitemapPagesGenerated = false;
			currentData.sitegen.homepages.active = {};
			currentData.sitegen.homepages.data = {};
			setCurrentOnboardingData( currentData );
		}
		setIsFooterNavAllowed( isValidInput );
	}, [ customerInput ] );

	return (
		<SitegenAiStateHandler>
			<CommonLayout isCentered>
				<Animate type={ 'fade-in' }>
					<div className={ 'nfd-sg-site-details' }>
						<AIHeading title={ content.heading } />
						<TextInputSiteGen
							placeholder={ content.inputPlaceholder }
							hint={ content.inputHint }
							height={ '40px' }
							customerInput={ customerInput }
							setIsValidInput={ setIsValidInput }
							setCustomerInput={ setCustomerInput }
							customChildren={ true }
						>
							{ isLargeViewport && (
								<div className={ 'nfd-sg-site-details-endrow' }>
									<NextButtonSiteGen
										className={
											'nfd-sg-site-details--next-btn'
										}
										text={ content.buttonText }
										disabled={ ! isValidInput }
									/>
								</div>
							) }
						</TextInputSiteGen>
					</div>
				</Animate>
			</CommonLayout>
		</SitegenAiStateHandler>
	);
};

export default SiteGenSiteDetails;
