import CommonLayout from '../../../components/Layouts/Common';

import { useEffect } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';

import { store as nfdOnboardingStore } from '../../../store';
import { FOOTER_SITEGEN, HEADER_SITEGEN } from '../../../../constants';

import getContents from './contents';
import HeadingWithSubHeading from '../../../components/HeadingWithSubHeading/SiteGen';
import { getSiteMigrateUrl } from '../../../utils/api/siteGen';
import SitegenAiStateHandler from '../../../components/StateHandlers/SitegenAi';

const Migrate = () => {
	const {
		setIsHeaderEnabled,
		setSidebarActiveView,
		setHeaderActiveView,
		setDrawerActiveView,
		setIsHeaderNavigationEnabled,
		setFooterActiveView,
		setHideFooterNav,
		updateSiteGenErrorStatus,
	} = useDispatch( nfdOnboardingStore );

	const { siteGenErrorStatus } = useSelect( ( select ) => {
		return {
			siteGenErrorStatus:
				select( nfdOnboardingStore ).getSiteGenErrorStatus(),
		};
	} );

	const loadData = async () => {
		const migrateUrl = await getSiteMigrateUrl();
		if ( migrateUrl?.body ) {
			window.open( migrateUrl?.body?.data?.redirect_url, '_self' );
		} else {
			updateSiteGenErrorStatus( true );
		}
	};

	useEffect( () => {
		setHideFooterNav( true );
		setIsHeaderEnabled( false );
		setSidebarActiveView( false );
		setIsHeaderNavigationEnabled( false );
		setHeaderActiveView( HEADER_SITEGEN );
		setDrawerActiveView( false );
		setFooterActiveView( FOOTER_SITEGEN );
	}, [] );

	useEffect( () => {
		if ( ! siteGenErrorStatus ) {
			loadData();
		}
	}, [ siteGenErrorStatus ] );

	const content = getContents();
	return (
		<SitegenAiStateHandler>
			<CommonLayout
				isVerticallyCentered
				className="nfd-onboarding-step--site-gen__migration"
			>
				<HeadingWithSubHeading title={ content?.heading } />
				<div className="nfd-onboarding-step--site-gen__migration--container">
					<div className="nfd-onboarding-step--site-gen__migration--container__loader"></div>
					<p className="nfd-onboarding-step--site-gen__migration--container__importtext">
						{ content?.importtext }
					</p>
				</div>
				<p className="nfd-onboarding-step--site-gen__migration__description">
					{ content?.description }
				</p>
			</CommonLayout>
		</SitegenAiStateHandler>
	);
};

export default Migrate;
