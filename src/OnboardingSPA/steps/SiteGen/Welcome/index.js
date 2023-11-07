import CommonLayout from '../../../components/Layouts/Common';

import { useEffect } from '@wordpress/element';

import { useDispatch } from '@wordpress/data';
import { store as nfdOnboardingStore } from '../../../store';
import { HEADER_SITEGEN } from '../../../../constants';

import SiteGenPlaceholder from '../../../components/SiteGenPlaceholder';

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
	return (
		<CommonLayout
			isCentered
			className="nfd-onboarding-step--site-gen__welcome"
		>
			<SiteGenPlaceholder heading={ 'Welcome' } />
		</CommonLayout>
	);
};

export default SiteGenWelcome;
