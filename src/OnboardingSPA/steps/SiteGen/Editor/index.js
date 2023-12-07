import CommonLayout from '../../../components/Layouts/Common';

import { useEffect, useState } from '@wordpress/element';

import { useDispatch, useSelect } from '@wordpress/data';
import { store as nfdOnboardingStore } from '../../../store';
import {
	HEADER_SITEGEN,
	SIDEBAR_SITEGEN_EDITOR_PATTERNS,
} from '../../../../constants';

import { LivePreview } from '../../../components/LivePreview';
import { getGlobalStyles } from '../../../utils/api/themes';

// eslint-disable-next-line import/no-extraneous-dependencies
import { cloneDeep } from 'lodash';

const StepSiteGenEditor = () => {
	const [ activeHomepage, setActiveHomepage ] = useState();
	const [ colorPalette, setColorPalette ] = useState();
	const [ globalStyles, setGlobalStyles ] = useState( [] );
	const [ reRender, setReRender ] = useState( false );
	const { setIsHeaderEnabled, setHeaderActiveView, setDrawerActiveView } =
		useDispatch( nfdOnboardingStore );

	const { currentData } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	} );

	const loadData = async () => {
		setIsHeaderEnabled( true );
		setHeaderActiveView( HEADER_SITEGEN );
		setDrawerActiveView( false );
		const homepage = currentData.sitegen.homepages.active;
		setActiveHomepage( homepage );
		const globalStylesResponse = await getGlobalStyles();
		setGlobalStyles( globalStylesResponse.body );
		setColorPalette( homepage.color.palette );
	};

	useEffect( () => {
		loadData();
	}, [] );

	useEffect( () => {
		if ( currentData?.sitegen?.homepages?.active ) {
			setActiveHomepage( currentData.sitegen.homepages.active );
			setReRender( true );
		}
	}, [ currentData ] );

	const buildPreview = () => {
		const newPreviewSettings = cloneDeep( globalStyles[ 0 ] );
		newPreviewSettings.settings.color.palette =
			activeHomepage.color.palette;
		return (
			<LivePreview
				blockGrammer={ activeHomepage.content }
				styling={ 'custom' }
				previewSettings={ newPreviewSettings }
				viewportWidth={ 1300 }
				skeletonLoadingTime={ 0 }
			/>
		);
	};
	return (
		<CommonLayout
			isCentered
			className="nfd-onboarding-step--site-gen__editor"
		>
			<div className="nfd-onboarding-step--site-gen__editor__live-preview">
				{ activeHomepage &&
					colorPalette &&
					globalStyles &&
					reRender &&
					buildPreview() }
			</div>
		</CommonLayout>
	);
};

export default StepSiteGenEditor;
