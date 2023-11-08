import CommonLayout from '../../../components/Layouts/Common';

import { useEffect } from '@wordpress/element';

import { useDispatch } from '@wordpress/data';
import { store as nfdOnboardingStore } from '../../../store';
import { HEADER_SITEGEN } from '../../../../constants';

import SiteGenPlaceholder from '../../../components/SiteGenPlaceholder';

const SiteGenPreview = () => {
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
			className="nfd-onboarding-step--site-gen__preview"
		>
			<SiteGenPlaceholder heading={ 'Previews' } />
		</CommonLayout>
	);
};

export default SiteGenPreview;
