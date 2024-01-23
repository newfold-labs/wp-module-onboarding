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
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setIsHeaderEnabled( true );
		setSidebarActiveView( false );
		setHeaderActiveView( HEADER_SITEGEN );
		setDrawerActiveView( false );
	} );

	const { nextStep } = useSelect( ( select ) => {
		return {
			nextStep: select( nfdOnboardingStore ).getNextStep(),
		};
	} );

	const handleConnect = () => {
		setConnected( true );
	};

	useEffect( () => {
		if ( interacted && connected ) {
			navigate( nextStep.path );
		}
	}, [ interacted, connected ] );

	const content = getContents();
	return (
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
						>
							<i className="nfd-onboarding-step--site-gen__social-media__contain__containright__button__icon"></i>
						</FacebookConnectButton>
					</div>
				</div>
				<div className="nfd-onboarding-step--site-gen__social-media__container__buttons">
					<SkipButton
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
	);
};

export default memo( SiteGenSiteSocialMedia );
