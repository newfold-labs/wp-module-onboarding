import CommonLayout from '../../../components/Layouts/Common';

import { useEffect, useState } from '@wordpress/element';

import { useDispatch, useSelect } from '@wordpress/data';
import { store as nfdOnboardingStore } from '../../../store';
import { HEADER_SITEGEN, THEME_STATUS_ACTIVE } from '../../../../constants';

import { LivePreview } from '../../../components/LivePreview';
import { getGlobalStyles } from '../../../utils/api/themes';

// eslint-disable-next-line import/no-extraneous-dependencies
import { cloneDeep } from 'lodash';
import { publishSitemapPages } from '../../../utils/api/siteGen';
import { DesignStateHandler } from '../../../components/StateHandlers';

const StepSiteGenEditor = () => {
	const [ homepage, setHomepage ] = useState( false );
	const [ globalStyles, setGlobalStyles ] = useState( false );
	const {
		setIsHeaderEnabled,
		setHeaderActiveView,
		setDrawerActiveView,
		setHideFooterNav,
		setCurrentOnboardingData,
		setIsHeaderNavigationEnabled,
	} = useDispatch( nfdOnboardingStore );

	const { currentData, themeStatus } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
			themeStatus: select( nfdOnboardingStore ).getThemeStatus(),
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
		setIsHeaderNavigationEnabled( false );
		const activeHomepage = currentData.sitegen.homepages.active;
		setHomepage( activeHomepage );
		const globalStylesResponse = await getGlobalStyles();
		setGlobalStyles( globalStylesResponse.body );
	};

	useEffect( () => {
		if ( THEME_STATUS_ACTIVE === themeStatus ) {
			setIsHeaderEnabled( true );
			setHeaderActiveView( HEADER_SITEGEN );
			setDrawerActiveView( false );
			loadData();
			handleSitemapPagesGeneration();
		}
	}, [ themeStatus ] );

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
		<DesignStateHandler render={ false }>
			<CommonLayout
				isCentered
				className="nfd-onboarding-step--site-gen__editor"
			>
				<div className="nfd-onboarding-step--site-gen__editor__live-preview">
					{ buildPreview() }
				</div>
				<div className="nfd-onboarding-screenshot-container"></div>
			</CommonLayout>
		</DesignStateHandler>
	);
};

export default StepSiteGenEditor;
