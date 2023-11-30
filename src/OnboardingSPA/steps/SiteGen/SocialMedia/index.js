import CommonLayout from '../../../components/Layouts/Common';

import { useEffect } from '@wordpress/element';

import { useDispatch } from '@wordpress/data';
import { store as nfdOnboardingStore } from '../../../store';
import { HEADER_SITEGEN } from '../../../../constants';
import getContents from './contents';
import ButtonNext from '../../../components/Button/ButtonNext';
import SkipButton from '../../../components/SkipButton';
import AIHeading from '../../../components/Heading/AIHeading';

const SiteGenSiteSocialMedia = () => {
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
						{ content.facebookTitle }
						<p>{ content.facebookDesc }</p>
					</div>
					<div className="nfd-onboarding-step--site-gen__social-media__contain__containright ">
						<button className="nfd-onboarding-step--site-gen__social-media__contain__containright__button ">
							<i></i>
							{ content.facebookButton }
						</button>
					</div>
				</div>
				<div className="nfd-onboarding-step--site-gen__social-media__container__buttons">
					<SkipButton
						className="nfd-onboarding-step--site-gen__social-media__container__buttons__skip"
						text={ content.buttons.skip }
					/>
					<ButtonNext disabled={ true } />
				</div>
			</div>
		</CommonLayout>
	);
};

export default SiteGenSiteSocialMedia;
