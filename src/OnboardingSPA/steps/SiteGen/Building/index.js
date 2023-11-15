import CommonLayout from '../../../components/Layouts/Common';

import { useEffect } from '@wordpress/element';

import { useDispatch } from '@wordpress/data';
import { store as nfdOnboardingStore } from '../../../store';
import { HEADER_SITEGEN } from '../../../../constants';

import SiteGenLoader from '../../../components/Loaders/SiteGenLoader';

const SiteGenBuilding = () => {
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
	return (
		<CommonLayout
			isCentered
			className="nfd-onboarding-step--site-gen__building"
		>
			<div className="site-gen__building_skimmer">
				<div className="site-gen__building_skimmer--header"></div>
				<div className="site-gen__building_skimmer--body"></div>
				<div className="site-gen__building_skimmer--footer">
					<div className="site-gen__building_skimmer--footer_left"></div>
					<div className="site-gen__building_skimmer--footer_right"></div>
				</div>
			</div>
			<div className="site-gen__building_loader__overlay">
				<SiteGenLoader />
			</div>
		</CommonLayout>
	);
};

export default SiteGenBuilding;
