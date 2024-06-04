// WordPress
import { useDispatch, useSelect } from '@wordpress/data';
import { memo, useEffect, useState } from '@wordpress/element';
import { useViewportMatch } from '@wordpress/compose';

// Third-party
import { useNavigate } from 'react-router-dom';
import { FacebookConnectButton } from '@newfold-labs/wp-module-facebook';

// Classes and functions
import getContents from './contents';
import {
	OnboardingEvent,
	trackOnboardingEvent,
} from '../../../utils/analytics/hiive';

// Components
import CommonLayout from '../../../components/Layouts/Common';
import AIHeading from '../../../components/Heading/AIHeading';
import NextButtonSiteGen from '../../../components/Button/NextButtonSiteGen';
import SkipButton from '../../../components/SkipButton';
import { SiteGenStateHandler } from '../../../components/StateHandlers';

// Misc
import { store as nfdOnboardingStore } from '../../../store';
import { HEADER_SITEGEN } from '../../../../constants';
import {
	ACTION_SITEGEN_SOCIAL_CONNECTED,
	ACTION_SITEGEN_SOCIAL_CONNECT_SKIPPED,
} from '../../../utils/analytics/hiive/constants';
import { SITEGEN_FLOW } from '../../../data/flows/constants';

const SiteGenSiteSocialMedia = () => {
	const [ connected, setConnected ] = useState( false );
	const [ interacted, setInteracted ] = useState( false );

	const isLargeViewport = useViewportMatch( 'small' );
	const navigate = useNavigate();

	const { nextStep } = useSelect( ( select ) => {
		return {
			nextStep: select( nfdOnboardingStore ).getNextStep(),
		};
	} );

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

	useEffect( () => {
		setIsFooterNavAllowed( connected );
		if ( interacted && connected ) {
			navigate( nextStep.path );
		}
	}, [ interacted, connected ] );

	const handleConnect = () => {
		trackOnboardingEvent(
			new OnboardingEvent( ACTION_SITEGEN_SOCIAL_CONNECTED, 'facebook', {
				source: SITEGEN_FLOW,
			} )
		);

		setConnected( true );
	};

	const handleFailure = ( error ) => {
		// This happens when a call is made to retrieve the facebook details when the button first renders.
		if ( 404 === error?.data?.status ) {
			return;
		}
		updateSiteGenErrorStatus( true );
	};

	const trackSkipEvent = () => {
		trackOnboardingEvent(
			new OnboardingEvent(
				ACTION_SITEGEN_SOCIAL_CONNECT_SKIPPED,
				undefined,
				{
					source: SITEGEN_FLOW,
				}
			)
		);
	};

	const content = getContents();

	return (
		<SiteGenStateHandler>
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
		</SiteGenStateHandler>
	);
};

export default memo( SiteGenSiteSocialMedia );
