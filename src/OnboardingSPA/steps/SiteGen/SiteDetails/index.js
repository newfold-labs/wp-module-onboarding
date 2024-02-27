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
import {
	OnboardingEvent,
	trackOnboardingEvent,
} from '../../../utils/analytics/hiive';
import { ACTION_SITEGEN_SITE_DETAILS_PROMPT_SET } from '../../../utils/analytics/hiive/constants';
import { SITEGEN_FLOW } from '../../../data/flows/constants';

const SiteGenSiteDetails = () => {
	const content = getContents();
	const isLargeViewport = useViewportMatch( 'small' );
	const [ customerInput, setCustomerInput ] = useState();
	const [ customerInputStrength, setCustomerInputStrength ] = useState( 0 );
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
		setIsHeaderNavigationEnabled,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setHideFooterNav( false );
		setIsHeaderEnabled( true );
		setSidebarActiveView( false );
		setHeaderActiveView( HEADER_SITEGEN );
		setIsHeaderNavigationEnabled( true );
		setDrawerActiveView( false );
		if ( currentData.sitegen.siteDetails?.prompt !== '' ) {
			setIsValidInput( true );
			setIsFooterNavAllowed( true );
			return setCustomerInput( currentData.sitegen.siteDetails.prompt );
		}
		setIsFooterNavAllowed( false );
	}, [] );

	const trackPromptSetEvent = () => {
		let customerInputStrengthForEvent = false;
		switch ( customerInputStrength ) {
			case 2:
				customerInputStrengthForEvent = 'MEDIUM';
				break;
			case 3:
				customerInputStrengthForEvent = 'HIGH';
				break;
		}

		if ( customerInputStrengthForEvent ) {
			trackOnboardingEvent(
				new OnboardingEvent(
					ACTION_SITEGEN_SITE_DETAILS_PROMPT_SET,
					customerInput,
					{
						strength: customerInputStrengthForEvent,
						source: SITEGEN_FLOW,
					}
				)
			);
		}
	};

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
							setCustomerInputStrength={
								setCustomerInputStrength
							}
							customChildren={ true }
						>
							{ isLargeViewport && (
								<div className={ 'nfd-sg-site-details-endrow' }>
									<NextButtonSiteGen
										className={
											'nfd-sg-site-details--next-btn'
										}
										callback={ () => {
											trackPromptSetEvent();
										} }
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
