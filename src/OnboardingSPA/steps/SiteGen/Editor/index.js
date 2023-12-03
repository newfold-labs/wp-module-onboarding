import CommonLayout from '../../../components/Layouts/Common';

import { useEffect, useState } from '@wordpress/element';

import { useDispatch, useSelect } from '@wordpress/data';
import { store as nfdOnboardingStore } from '../../../store';
import { HEADER_SITEGEN } from '../../../../constants';

import { LivePreview } from '../../../components/LivePreview';

const StepSiteGenEditor = () => {
	const [ pattern, setPattern ] = useState();
	const {
		setIsHeaderEnabled,
		setSidebarActiveView,
		setHeaderActiveView,
		setDrawerActiveView,
	} = useDispatch( nfdOnboardingStore );

	const { currentData } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	} );

	useEffect( () => {
		setIsHeaderEnabled( true );
		setSidebarActiveView( false );
		setHeaderActiveView( HEADER_SITEGEN );
		setDrawerActiveView( false );
		const homepage = currentData.sitegen.homepages.active;
		setPattern( homepage.content );
	}, [] );
	return (
		<CommonLayout
			isCentered
			className="nfd-onboarding-step--site-gen__editor"
		>
			<div className="nfd-onboarding-step--site-gen__editor__live-preview">
				{ pattern && (
					<LivePreview
						blockGrammer={ pattern }
						styling={ 'custom' }
						viewportWidth={ 1300 }
						skeletonLoadingTime={ 0 }
					/>
				) }
			</div>
		</CommonLayout>
	);
};

export default StepSiteGenEditor;
