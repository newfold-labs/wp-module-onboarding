// Wordpress
import { useEffect } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';

// Classes and fucntions
import getContents from './contents';
import { getSiteMigrateUrl } from '../../../utils/api/siteGen';

//Components
import CommonLayout from '../../../components/Layouts/Common';
import HeadingWithSubHeading from '../../../components/HeadingWithSubHeading/SiteGen';
import { SiteGenStateHandler } from '../../../components/StateHandlers';
import { stepTheFork } from '../../TheFork/step';
import { stepSiteGenMigration } from './step';
import { stepWelcome } from '../../GetStarted/Welcome/step';

//Misc.
import { injectMigrationStep } from '../../../data/flows/utils';
import { store as nfdOnboardingStore } from '../../../store';
import { FOOTER_SITEGEN, HEADER_SITEGEN } from '../../../../constants';
import {
	OnboardingEvent,
	trackOnboardingEvent,
} from '../../../utils/analytics/hiive';
import { SITEGEN_FLOW } from '../../../data/flows/constants';
import { ACTION_SITEGEN_ERROR_STATE_TRIGGERED } from '../../../utils/analytics/hiive/constants';

const StepSiteGenMigration = () => {
	const {
		setIsHeaderEnabled,
		setSidebarActiveView,
		setHeaderActiveView,
		setDrawerActiveView,
		setIsHeaderNavigationEnabled,
		setFooterActiveView,
		setHideFooterNav,
		updateSiteGenErrorStatus,
		updateAllSteps,
		setInstaWpMigrationUrl,
	} = useDispatch( nfdOnboardingStore );

	const { siteGenErrorStatus, allSteps, canMigrateSite, currentBrandName } =
		useSelect( ( select ) => {
			return {
				siteGenErrorStatus:
					select( nfdOnboardingStore ).getSiteGenErrorStatus(),
				allSteps: select( nfdOnboardingStore ).getAllSteps(),
				canMigrateSite: select( nfdOnboardingStore ).canMigrateSite(),
				currentBrandName:
					select( nfdOnboardingStore ).getNewfoldBrandName(),
			};
		} );

	const loadData = async () => {
		try {
			if ( canMigrateSite ) {
				const response = await getSiteMigrateUrl();
				const migrateUrl = response?.body?.data?.redirect_url;
				if ( migrateUrl ) {
					setInstaWpMigrationUrl( migrateUrl );
					setTimeout( () => {
						window.open( migrateUrl, '_self' );
					}, 3000 );
				} else {
					trackOnboardingEvent(
						new OnboardingEvent(
							ACTION_SITEGEN_ERROR_STATE_TRIGGERED,
							'migration',
							{
								source: SITEGEN_FLOW,
							}
						)
					);
					updateSiteGenErrorStatus( true );
				}
			} else {
				trackOnboardingEvent(
					new OnboardingEvent(
						ACTION_SITEGEN_ERROR_STATE_TRIGGERED,
						'migration',
						{
							source: SITEGEN_FLOW,
						}
					)
				);
				updateSiteGenErrorStatus( true );
			}
		} catch ( error ) {
			// eslint-disable-next-line no-console
			console.error( 'Failed to fetch migration URL:', error );
			trackOnboardingEvent(
				new OnboardingEvent(
					ACTION_SITEGEN_ERROR_STATE_TRIGGERED,
					'migration',
					{
						source: SITEGEN_FLOW,
					}
				)
			);
			updateSiteGenErrorStatus( true );
		}
	};

	useEffect( () => {
		const hasMigrateStep = allSteps.filter(
			( step ) => step === stepSiteGenMigration
		);
		if ( hasMigrateStep?.length === 0 ) {
			let updates;
			if ( window.nfdOnboarding.currentFlow === SITEGEN_FLOW ) {
				updates = injectMigrationStep( allSteps, stepTheFork );
			} else {
				updates = injectMigrationStep( allSteps, stepWelcome );
			}
			updateAllSteps( updates.allSteps );
		}

		setHideFooterNav( true );
		setIsHeaderEnabled( false );
		setSidebarActiveView( false );
		setIsHeaderNavigationEnabled( false );
		setHeaderActiveView( HEADER_SITEGEN );
		setDrawerActiveView( false );
		setFooterActiveView( FOOTER_SITEGEN );
	}, [] );

	useEffect( () => {
		if ( siteGenErrorStatus === false ) {
			loadData();
		}
	}, [ siteGenErrorStatus ] );

	const content = getContents( currentBrandName );
	return (
		<SiteGenStateHandler>
			<CommonLayout
				isVerticallyCentered
				className="nfd-onboarding-step--site-gen__migration"
			>
				<HeadingWithSubHeading title={ content.heading } />
				<div className="nfd-onboarding-step--site-gen__migration--container">
					<div className="nfd-onboarding-step--site-gen__migration--container__loader"></div>
					<p className="nfd-onboarding-step--site-gen__migration--container__importtext">
						{ content?.importText }
					</p>
				</div>
				<p className="nfd-onboarding-step--site-gen__migration__description">
					{ content?.description }
				</p>
			</CommonLayout>
		</SiteGenStateHandler>
	);
};

export default StepSiteGenMigration;
