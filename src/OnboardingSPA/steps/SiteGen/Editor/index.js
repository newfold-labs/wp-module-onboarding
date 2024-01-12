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
	const [ activeHomepage, setActiveHomepage ] = useState();
	const [ colorPalette, setColorPalette ] = useState();
	const [ globalStyles, setGlobalStyles ] = useState( [] );
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
		const homepage = cloneDeep( currentData.sitegen.homepages.active );
		setActiveHomepage( homepage );
		const globalStylesResponse = await getGlobalStyles();
		setGlobalStyles( globalStylesResponse.body );
		setColorPalette( homepage.color.palette );
	};

	useEffect( () => {
		loadData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [] );

	useEffect( () => {
		if ( currentData?.sitegen?.homepages?.active ) {
			setActiveHomepage(
				cloneDeep( currentData.sitegen.homepages.active )
			);
		}
	}, [ currentData ] );

	const buildPreview = () => {
		const newPreviewSettings = cloneDeep( globalStyles[ 0 ] );
		newPreviewSettings.settings.color.palette =
			activeHomepage.color.palette;

		if ( activeHomepage && activeHomepage.styles ) {
			if (
				activeHomepage.styles.blocks &&
				activeHomepage.styles.blocks.length > 0
			) {
				const firstBlock = activeHomepage.styles.blocks[ 0 ];
				if ( firstBlock[ 'core/heading' ] ) {
					newPreviewSettings.styles.blocks[
						'core/heading'
					].typography.fontFamily =
						firstBlock[ 'core/heading' ].typography.fontFamily;
				}
				if ( firstBlock[ 'core/body' ] ) {
					newPreviewSettings.styles.typography.fontFamily =
						firstBlock[ 'core/body' ].typography.fontFamily;
				}
			}
		}

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
					buildPreview() }
			</div>
		</CommonLayout>
	);
};

export default StepSiteGenEditor;
