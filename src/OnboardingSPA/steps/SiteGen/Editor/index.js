import CommonLayout from '../../../components/Layouts/Common';

import { useEffect, useState } from '@wordpress/element';

import { useDispatch, useSelect } from '@wordpress/data';
import { store as nfdOnboardingStore } from '../../../store';
import { HEADER_SITEGEN } from '../../../../constants';

import { LivePreview } from '../../../components/LivePreview';
import { getGlobalStyles } from '../../../utils/api/themes';

// eslint-disable-next-line import/no-extraneous-dependencies
import { cloneDeep } from 'lodash';
import { publishSitemapPages } from '../../../utils/api/siteGen';

const StepSiteGenEditor = () => {
	const [ homepage, setHomepage ] = useState( false );
	const [ globalStyles, setGlobalStyles ] = useState( false );
	const {
		setIsHeaderEnabled,
		setHeaderActiveView,
		setDrawerActiveView,
		setHideFooterNav,
		setCurrentOnboardingData,
	} = useDispatch( nfdOnboardingStore );

	const { currentData } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	} );

	const handleSitemapPagesGeneration = async () => {
		if ( false === currentData?.sitegen?.sitemapPagesGenerated ) {
			const sitemapPagesPublished = await publishSitemapPages(
				currentData.sitegen.siteDetails.prompt
			);
			if ( ! sitemapPagesPublished.error ) {
				currentData.sitegen.sitemapPagesGenerated = true;
				setCurrentOnboardingData( currentData );
			}
		}
	};

	const loadData = async () => {
		setHideFooterNav( true );
		setIsHeaderEnabled( true );
		setHeaderActiveView( HEADER_SITEGEN );
		setDrawerActiveView( false );
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
		handleSitemapPagesGeneration();
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
		newPreviewSettings.settings.color.palette = homepage.color.palette;
		if ( homepage?.styles?.blocks?.length > 0 ) {
			newPreviewSettings =
				populateFontsInPreviewSettings( newPreviewSettings );
		}

		let blockGrammar = '';
		[ 'header', 'content', 'footer' ].forEach( ( part ) => {
			if ( part in homepage ) {
				blockGrammar += homepage[ part ];
			}
		} );

		return (
			<LivePreview
				blockGrammer={ blockGrammar }
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
				{ buildPreview() }
			</div>
		</CommonLayout>
	);
};

export default StepSiteGenEditor;
