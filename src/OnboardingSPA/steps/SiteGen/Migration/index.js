import CommonLayout from '../../../components/Layouts/Common';

import { useEffect } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';

import { store as nfdOnboardingStore } from '../../../store';
import { FOOTER_SITEGEN, HEADER_SITEGEN } from '../../../../constants';
import {
	OnboardingEvent,
	trackOnboardingEvent,
} from '../../../utils/analytics/hiive';

import getContents from './contents';
import HeadingWithSubHeading from '../../../components/HeadingWithSubHeading/SiteGen';
import { getSiteMigrateUrl } from '../../../utils/api/siteGen';
import { SiteGenStateHandler } from '../../../components/StateHandlers';
import { injectMigrationStep } from '../../../data/flows/utils';
import { stepTheFork } from '../../TheFork/step';
import { stepSiteGenMigration } from './step';
import { SITEGEN_FLOW } from '../../../data/flows/constants';
import { stepWelcome } from '../../GetStarted/Welcome/step';
import { ACTION_MIGRATION_INITIATED } from '../../../utils/analytics/hiive/constants';

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
	} = useDispatch( nfdOnboardingStore );

	const { siteGenErrorStatus, allSteps } = useSelect( ( select ) => {
		return {
			siteGenErrorStatus:
				select( nfdOnboardingStore ).getSiteGenErrorStatus(),
			allSteps: select( nfdOnboardingStore ).getAllSteps(),
		};
	} );

	const loadData = async () => {
		try {
			const response = await getSiteMigrateUrl();
			const migrateUrl = response?.body?.data?.redirect_url;
			if ( migrateUrl ) {
				window.open( migrateUrl, '_self' );
				trackOnboardingEvent(
					new OnboardingEvent(
						ACTION_MIGRATION_INITIATED,
						migrateUrl
					)
				);
			} else {
				updateSiteGenErrorStatus( true );
			}
		} catch ( error ) {
			// eslint-disable-next-line no-console
			console.error( 'Failed to fetch migration URL:', error );
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

	const content = getContents();
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
