import { useDispatch, useSelect } from '@wordpress/data';
import { memo, useEffect, useState } from '@wordpress/element';
import { useViewportMatch } from '@wordpress/compose';

import getContents from './contents';
import { HEADER_SITEGEN } from '../../../../constants';
import SkipButton from '../../../components/SkipButton';
import { store as nfdOnboardingStore } from '../../../store';
import CommonLayout from '../../../components/Layouts/Common';
import AIHeading from '../../../components/Heading/AIHeading';
import NextButtonSiteGen from '../../../components/Button/NextButtonSiteGen';
import { FacebookConnectButton } from '@newfold-labs/wp-module-facebook';
import { useNavigate } from 'react-router-dom';
import SitegenAiStateHandler from '../../../components/StateHandlers/SitegenAi';
import {
	OnboardingEvent,
	trackOnboardingEvent,
} from '../../../utils/analytics/hiive';
import {
	ACTION_SITEGEN_SOCIAL_CONNECTED,
	ACTION_SITEGEN_SOCIAL_CONNECT_SKIPPED,
} from '../../../utils/analytics/hiive/constants';
import { SITEGEN_FLOW } from '../../../data/flows/constants';

const SiteGenSiteSocialMedia = () => {
	const isLargeViewport = useViewportMatch( 'small' );
	const navigate = useNavigate();
	const [ connected, setConnected ] = useState( false );
	const [ interacted, setInteracted ] = useState( false );

	const {
		setIsHeaderEnabled,
		setSidebarActiveView,
		setHeaderActiveView,
		setDrawerActiveView,
		setIsFooterNavAllowed,
		updateSiteGenErrorStatus,
		setIsHeaderNavigationEnabled,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setIsHeaderEnabled( true );
		setSidebarActiveView( false );
		setHeaderActiveView( HEADER_SITEGEN );
		setDrawerActiveView( false );
		setIsHeaderNavigationEnabled( true );
	} );

	const { nextStep } = useSelect( ( select ) => {
		return {
			nextStep: select( nfdOnboardingStore ).getNextStep(),
		};
	} );

	const handleConnect = () => {
		trackOnboardingEvent(
			new OnboardingEvent( ACTION_SITEGEN_SOCIAL_CONNECTED, 'facebook', {
				source: SITEGEN_FLOW,
			} )
		);

		setConnected( true );
	};

	const handleFailure = () => {
		updateSiteGenErrorStatus( true );
	};

	const trackSkipEvent = () => {
		trackOnboardingEvent(
			new OnboardingEvent( ACTION_SITEGEN_SOCIAL_CONNECT_SKIPPED, {
				source: SITEGEN_FLOW,
			} )
		);
	};

	useEffect( () => {
		setIsFooterNavAllowed( connected );
		if ( interacted && connected ) {
			navigate( nextStep.path );
		}
	}, [ interacted, connected ] );

	const content = getContents();
	return (
		<SitegenAiStateHandler>
			<CommonLayout
				isCentered
				className="nfd-onboarding-step--site-gen__social-media"
			>
				<div className="nfd-onboarding-step--site-gen__social-media__container">
					<AIHeading title={ content.heading } />
					<div className="nfd-onboarding-step--site-gen__social-media__contain ">
						<div className="nfd-onboarding-step--site-gen__social-media__contain__containleft ">
							<span>{ content.facebookTitle }</span>
							<p>{ content.facebookDesc }</p>
						</div>
						<div className="nfd-onboarding-step--site-gen__social-media__contain__containright ">
							<FacebookConnectButton
								className="nfd-onboarding-step--site-gen__social-media__contain__containright__button"
								onConnect={ handleConnect }
								onClick={ () => setInteracted( true ) }
								onFailure={ handleFailure }
							>
								<i className="nfd-onboarding-step--site-gen__social-media__contain__containright__button__icon"></i>
							</FacebookConnectButton>
						</div>
					</div>
					<div className="nfd-onboarding-step--site-gen__social-media__container__buttons">
						<SkipButton
							callback={ trackSkipEvent }
							className="nfd-onboarding-step--site-gen__social-media__container__buttons__skip"
							text={ content.buttons.skip }
						/>
						{ isLargeViewport && (
							<NextButtonSiteGen
								text={ content.buttons.next }
								disabled={ ! connected }
							/>
						) }
					</div>
				</div>
			</CommonLayout>
		</SitegenAiStateHandler>
	);
};

export default memo( SiteGenSiteSocialMedia );
