import { memo, useEffect } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';

import CommonLayout from '../../../components/Layouts/Common';
import NextButtonSiteGen from '../../../components/Button/NextButtonSiteGen';
import { store as nfdOnboardingStore } from '../../../store';
import { HEADER_SITEGEN } from '../../../../constants';
import getContents from './contents';

const SiteGenWelcome = () => {
	const {
		setIsHeaderEnabled,
		setSidebarActiveView,
		setHeaderActiveView,
		setDrawerActiveView,
		setIsHeaderNavigationEnabled,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setIsHeaderEnabled( true );
		setSidebarActiveView( false );
		setHeaderActiveView( HEADER_SITEGEN );
		setIsHeaderNavigationEnabled( true );
		setDrawerActiveView( false );
	} );

	const content = getContents();
	return (
		<CommonLayout className="nfd-onboarding-step--site-gen__welcome">
			<div className="nfd-onboarding-step--site-gen__welcome__container">
				<div className="nfd-onboarding-step--site-gen__welcome__container__animation"></div>
				<div className="nfd-onboarding-step--site-gen__welcome__container__heading">
					<div className="nfd-onboarding-step--site-gen__welcome__container__heading__image"></div>
					<p className="nfd-onboarding-step--site-gen__welcome__container__heading__text">
						{ content.heading }
					</p>
				</div>
				<div className="nfd-onboarding-step--site-gen__welcome__container__sub-heading">
					<p className="nfd-onboarding-step--site-gen__welcome__container__sub-heading__text">
						{ content.subHeading }
					</p>
				</div>
				<NextButtonSiteGen text={ content.buttonText } />
			</div>
		</CommonLayout>
	);
};

export default memo( SiteGenWelcome );
