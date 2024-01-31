import { useViewportMatch } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import getContents from './contents';
import { HEADER_SITEGEN, pluginDashboardPage } from '../../../../constants';
import SkipButton from '../../../components/SkipButton';
import { store as nfdOnboardingStore } from '../../../store';
import CommonLayout from '../../../components/Layouts/Common';
import NextButtonSiteGen from '../../../components/Button/NextButtonSiteGen';
import OrbAnimation from '../../../components/OrbAnimation';

const SiteGenSiteError = () => {
	const {
		setIsHeaderEnabled,
		setSidebarActiveView,
		setHeaderActiveView,
		setDrawerActiveView,
		setHideFooterNav,
		setIsHeaderNavigationEnabled,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setHideFooterNav( true );
		setIsHeaderEnabled( true );
		setSidebarActiveView( false );
		setHeaderActiveView( HEADER_SITEGEN );
		setIsHeaderNavigationEnabled( true );
		setDrawerActiveView( false );
	} );
	const isLargeViewport = useViewportMatch( 'small' );

	const content = getContents();
	return (
		<CommonLayout className="nfd-onboarding-step--site-gen__error">
			<div className="nfd-onboarding-step--site-gen__error__container">
				<div className="nfd-onboarding-step--site-gen__error__container__orb">
					<OrbAnimation height={ `100px` } />
				</div>
				<div className="nfd-onboarding-step--site-gen__error__container__heading">
					<p className="nfd-onboarding-step--site-gen__error__container__heading__text">
						{ content.heading }
					</p>
				</div>
				<div className="nfd-onboarding-step--site-gen__error__container__sub-heading">
					<p className="nfd-onboarding-step--site-gen__error__container__sub-heading__text">
						{ content.subHeading }
					</p>
					<p className="nfd-onboarding-step--site-gen__error__container__sub-heading__message">
						{ content.message }
						<a
							className="nfd-onboarding-step--site-gen__error__container__sub-heading__exit"
							href={ pluginDashboardPage }>
							{ content.buttonExit }
						</a>

					</p>
				</div>
				<div className="nfd-onboarding-step--site-gen__error__container__buttons">
					<SkipButton
						className="nfd-onboarding-step--site-gen__error__container__buttons__skip"
						text={ content.buttonSkip }
					/>
					{ isLargeViewport && (
						<NextButtonSiteGen
							text={ content.buttonText }
							disabled={ false }
							showChevronRight={ false }
						/>
					) }
				</div>
			</div>
		</CommonLayout>
	);
};

export default SiteGenSiteError;
