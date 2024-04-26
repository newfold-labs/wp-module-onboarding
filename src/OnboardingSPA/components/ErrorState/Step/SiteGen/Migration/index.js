import { useEffect } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import getContents from './contents';
import { Button } from '@wordpress/components';
import { store as nfdOnboardingStore } from '../../../../../store';
import CommonLayout from '../../../../Layouts/Common';
import OrbAnimation from '../../../../OrbAnimation';
import { useNavigate } from 'react-router-dom';
import { HEADER_SITEGEN } from '../../../../../../constants';
import { stepTheFork } from '../../../../../steps/TheFork/step';

const SiteGenMigrationError = () => {
	const navigate = useNavigate();
	const {
		setIsHeaderEnabled,
		setSidebarActiveView,
		setHeaderActiveView,
		setDrawerActiveView,
		setHideFooterNav,
		setIsHeaderNavigationEnabled,
		updateSiteGenErrorStatus,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setHideFooterNav( true );
		setIsHeaderEnabled( true );
		setSidebarActiveView( false );
		setHeaderActiveView( HEADER_SITEGEN );
		setIsHeaderNavigationEnabled( true );
		setDrawerActiveView( false );
	} );

	const content = getContents();

	const handleRetry = () => {
		updateSiteGenErrorStatus( false );
	};
	const handleGoBack = () => {
		updateSiteGenErrorStatus( false );
		navigate( stepTheFork.path );
	};
	return (
		<CommonLayout className="nfd-onboarding-step--site-gen__error nfd-onboarding-step--site-gen__migrationerror">
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
					</p>
				</div>
				<div className="nfd-onboarding-step--site-gen__error__container__buttons">
					<Button
						className="nfd-onboarding-step--site-gen__error__container__buttons__skip"
						onClick={ () => {
							handleGoBack();
						} }
					>
						{ content.buttonExit }
					</Button>
					<Button
						className="nfd-onboarding-step--site-gen__error__container__buttons__retry"
						onClick={ () => {
							handleRetry();
						} }
					>
						<p className="nfd-onboarding-button--site-gen-next--text">
							{ content.buttonText }
						</p>
					</Button>
				</div>
			</div>
		</CommonLayout>
	);
};

export default SiteGenMigrationError;
