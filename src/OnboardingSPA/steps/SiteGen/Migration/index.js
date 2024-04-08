import CommonLayout from '../../../components/Layouts/Common';

import { useEffect } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';

import { store as nfdOnboardingStore } from '../../../store';
import { FOOTER_SITEGEN, HEADER_SITEGEN } from '../../../../constants';

import getContents from './contents';
import HeadingWithSubHeading from '../../../components/HeadingWithSubHeading/SiteGen';
import { getSiteMigrateUrl } from '../../../utils/api/siteGen';

const Migrate = () => {
	const {
		setIsHeaderEnabled,
		setSidebarActiveView,
		setHeaderActiveView,
		setDrawerActiveView,
		setIsHeaderNavigationEnabled,
		setFooterActiveView,
		setHideFooterNav,
	} = useDispatch( nfdOnboardingStore );

	const loadData = async () => {
		const migrateUrl = await getSiteMigrateUrl();
		if ( migrateUrl?.body ) {
			window.open( migrateUrl?.body?.data?.redirect_url, '_self' );
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
		loadData();
	} );

	const content = getContents();
	return (
		<CommonLayout
			// isCentered
			className="nfd-onboarding-step--site-gen__migration"
		>
			<HeadingWithSubHeading title={ content?.heading } />
			<div className="nfd-onboarding-step--site-gen__migration__contain">
				<div className="nfd-onboarding-step--site-gen__migration__loader"></div>{ ' ' }
				<p className="importtext">{ content?.importtext }</p>
			</div>
			<p className="description">{ content?.description }</p>
		</CommonLayout>
	);
};

export default Migrate;
