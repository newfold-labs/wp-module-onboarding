import CommonLayout from '../../../components/Layouts/Common';

import { useEffect } from '@wordpress/element';

import { useDispatch, useSelect } from '@wordpress/data';
import { store as nfdOnboardingStore } from '../../../store';
import { HEADER_SITEGEN } from '../../../../constants';

// import SiteGenPlaceholder from '../../../components/SiteGenPlaceholder';
import { LivePreview } from '../../../components/LivePreview';

const StepSiteGenEditor = () => {
	const {
		setIsHeaderEnabled,
		setSidebarActiveView,
		setHeaderActiveView,
		setDrawerActiveView,
	} = useDispatch( nfdOnboardingStore );

	const homepages = useSelect(
		( select ) => select( nfdOnboardingStore ).getHomepagesData(),
		[]
	);
	const activeHomepage = useSelect(
		( select ) => select( nfdOnboardingStore ).getActiveHomepage(),
		[]
	);
	const allHomepages = useSelect(
		( select ) => select( nfdOnboardingStore ).getAllHomepages(),
		[]
	);

	useEffect( () => {
		setIsHeaderEnabled( true );
		setSidebarActiveView( false );
		setHeaderActiveView( HEADER_SITEGEN );
		setDrawerActiveView( false );
	} );
	return (
		<CommonLayout
			isCentered
			className="nfd-onboarding-step--site-gen__editor"
		>
			{ /* <SiteGenPlaceholder heading={ 'Editing Previews' } /> */ }
			<LivePreview
				blockGrammer={ activeHomepage?.content }
				styling={ 'full' }
				viewportWidth={ 1300 }
			/>
		</CommonLayout>
	);
};

export default StepSiteGenEditor;
