import CommonLayout from '../../../components/Layouts/Common';

import { useEffect, useState } from '@wordpress/element';

import { useDispatch, useSelect } from '@wordpress/data';
import { store as nfdOnboardingStore } from '../../../store';
import { HEADER_SITEGEN } from '../../../../constants';

import { LivePreview } from '../../../components/LivePreview';
import { getGlobalStyles } from '../../../utils/api/themes';

// eslint-disable-next-line import/no-extraneous-dependencies
import { cloneDeep } from 'lodash';

const StepSiteGenEditor = () => {
	const [ homepage, setHomepage ] = useState( false );
	const [ globalStyles, setGlobalStyles ] = useState( false );
	const { setIsHeaderEnabled, setHeaderActiveView, setDrawerActiveView } =
		useDispatch( nfdOnboardingStore );

	const { currentData } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	} );

	const loadData = async () => {
		const activeHomepage = currentData.sitegen.homepages.active;
		setHomepage( activeHomepage );
		const globalStylesResponse = await getGlobalStyles();
		setGlobalStyles( globalStylesResponse.body );
	};

	useEffect( () => {
		setIsHeaderEnabled( true );
		setHeaderActiveView( HEADER_SITEGEN );
		setDrawerActiveView( false );
		loadData();
	}, [] );

	useEffect( () => {
		if ( currentData?.sitegen?.homepages?.active ) {
			setHomepage( currentData.sitegen.homepages.active );
		}
	}, [ currentData ] );

	const populateFontsInPreviewSettings = ( previewSettings ) => {
		const firstBlock = homepage.styles.blocks[ 0 ];
		if ( firstBlock[ 'core/heading' ] ) {
			previewSettings.styles.blocks[
				'core/heading'
			].typography.fontFamily =
				firstBlock[ 'core/heading' ].typography.fontFamily;
		}
		if ( firstBlock[ 'core/body' ] ) {
			previewSettings.styles.typography.fontFamily =
				firstBlock[ 'core/body' ].typography.fontFamily;
		}

		return previewSettings;
	};

	const buildPreview = () => {
		if ( ! ( homepage && globalStyles ) ) {
			return <></>;
		}

		let newPreviewSettings = cloneDeep( globalStyles[ 0 ] );
		newPreviewSettings.settings.color.palette =
			homepage.color.palette;
		if ( homepage?.styles?.blocks?.length > 0 ) {
			newPreviewSettings = populateFontsInPreviewSettings( newPreviewSettings );
		}

		return (
			<LivePreview
				blockGrammer={ homepage.content }
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
				{
					buildPreview() }
			</div>
		</CommonLayout>
	);
};

export default StepSiteGenEditor;
