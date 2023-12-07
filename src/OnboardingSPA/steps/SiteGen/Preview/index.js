import CommonLayout from '../../../components/Layouts/Common';

import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from '@wordpress/element';

import { useDispatch, useSelect } from '@wordpress/data';
import { store as nfdOnboardingStore } from '../../../store';
import { HEADER_SITEGEN } from '../../../../constants';

import LivePreviewSiteGenCard from '../../../components/LivePreview/SiteGenCard';

import getContents from './contents';
import {
	getHomepages,
	getRandom,
} from '../../../data/sitegen/homepages/homepages';
import { getColorPalettes } from '../../../data/sitegen/sitemeta/siteMeta';
import { getGlobalStyles } from '../../../utils/api/themes';

// eslint-disable-next-line import/no-extraneous-dependencies
import { isEmpty, cloneDeep } from 'lodash';
import Grid from '../../../components/Grid';

const SiteGenPreview = () => {
	const navigate = useNavigate();
	const [ homepages, setHomepages ] = useState();
	const [ globalStyles, setGlobalStyles ] = useState( [] );
	const {
		setIsHeaderEnabled,
		setSidebarActiveView,
		setHeaderActiveView,
		setDrawerActiveView,
		setCurrentOnboardingData,
	} = useDispatch( nfdOnboardingStore );

	const { currentData, nextStep } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
			nextStep: select( nfdOnboardingStore ).getNextStep(),
		};
	} );

	const loadData = async () => {
		let homepagesObject = {};
		if ( isEmpty( currentData.sitegen.homepages.data ) ) {
			const homepagesResponse = getHomepages();
			const colorsResponse = getColorPalettes();
			homepagesResponse.forEach( ( homepage, index ) => {
				if ( ! homepage?.color ) {
					const paletteKeys = Object.keys( colorsResponse );
					const paletteIndex =
						paletteKeys[ index % paletteKeys.length ];
					homepage.color = {
						slug: paletteIndex,
						palette: colorsResponse[ paletteIndex ],
					};
				}
			} );
			currentData.sitegen.homepages.data = homepagesResponse;
			setCurrentOnboardingData( currentData );
			homepagesResponse.forEach( ( homepage ) => {
				homepagesObject[ homepage.slug ] = homepage;
			} );
		} else {
			homepagesObject = currentData.sitegen.homepages.data;
		}
		const globalStylesResponse = await getGlobalStyles();
		setGlobalStyles( globalStylesResponse.body );

		setHomepages( homepagesObject );
	};

	useEffect( () => {
		setIsHeaderEnabled( true );
		setSidebarActiveView( false );
		setHeaderActiveView( HEADER_SITEGEN );
		setDrawerActiveView( false );
		loadData();
	}, [] );

	const handleFavorite = ( slug ) => {
		if ( ! ( slug in homepages ) ) {
			return false;
		}
		homepages[ slug ].favorite = ! homepages[ slug ].favorite;
		currentData.sitegen.homepages.data = homepages;
		setCurrentOnboardingData( currentData );
	};

	const handlePreview = ( slug ) => {
		if ( ! ( slug in homepages ) ) {
			return false;
		}
		homepages[ slug ].active = ! homepages[ slug ].active;
		currentData.sitegen.homepages.active = homepages[ slug ];
		setCurrentOnboardingData( currentData );
		navigate( nextStep.path );
	};

	const handleRegenerate = ( slug ) => {
		if ( ! ( slug in homepages ) ) {
			return false;
		}
		const page = { ...homepages };
		const newPage = getRandom( { ...page[ slug ] } );
		page[ newPage.slug ] = newPage;
		setHomepages( page );
		currentData.sitegen.homepages.data = page;
		setCurrentOnboardingData( currentData );
	};

	const content = getContents();

	const buildPreviews = () => {
		return Object.keys( homepages ).map( ( homepage ) => {
			const data = homepages[ homepage ];
			const newPreviewSettings = cloneDeep( globalStyles[ 0 ] );
			newPreviewSettings.settings.color.palette = data.color.palette;
			return (
				<LivePreviewSiteGenCard
					key={ homepage }
					viewportWidth={ 1300 }
					slug={ homepage }
					title={ data.title }
					isFavorite={ data.favorite }
					skeletonLoadingTime={ 2500 }
					previewSettings={ newPreviewSettings }
					styling={ 'custom' }
					blockGrammer={ data.content }
					onFavorite={ handleFavorite }
					onPreview={ handlePreview }
					onRegenerate={ handleRegenerate }
				/>
			);
		} );
	};

	return (
		<CommonLayout
			isCentered
			className="nfd-onboarding-step--site-gen__preview"
		>
			<div className="nfd-onboarding-step--site-gen__preview__context">
				<p className="nfd-onboarding-step--site-gen__preview__context__heading">
					{ content.heading }
				</p>
				<div className="nfd-onboarding-step--site-gen__preview__context__subheading">
					{ content.subheading }
				</div>
			</div>
			<div className="nfd-onboarding-step--site-gen__preview__live_previews">
				{ homepages && globalStyles && (
					<Grid size={ 3 }>{ buildPreviews() }</Grid>
				) }
			</div>
			<div className="nfd-onboarding-step--site-gen__preview__favorite-info">
				<div className="nfd-onboarding-step--site-gen__preview__favorite-info__icon"></div>
				<p className="nfd-onboarding-step--site-gen__preview__favorite-info__text">
					{ content.favoriteInfo }
				</p>
			</div>
		</CommonLayout>
	);
};

export default SiteGenPreview;
