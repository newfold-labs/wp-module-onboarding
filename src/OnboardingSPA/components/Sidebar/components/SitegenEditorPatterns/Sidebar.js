import { Fill, PanelBody, PanelHeader, Button } from '@wordpress/components';
import {
	Fragment,
	memo,
	Suspense,
	useState,
	useEffect,
} from '@wordpress/element';
import { closeSmall } from '@wordpress/icons';
import { useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import { store as nfdOnboardingStore } from '../../../../store';
import {
	SIDEBAR_SITEGEN_EDITOR_PATTERNS,
	SIDEBAR_SLOTFILL_PREFIX,
} from '../../../../../constants';
import TabPanelHover from '../../../TabPanelHover';

import { isEmpty } from 'lodash';
import { getHomepages } from '../../../../data/sitegen/homepages/homepages';
import { getColorPalettes } from '../../../../data/sitegen/sitemeta/siteMeta';
import { getGlobalStyles } from '../../../../utils/api/themes';
import { LivePreview } from '../../../LivePreview';

import { cloneDeep } from 'lodash';

const SitegenEditorPatternsSidebar = () => {
	const [ homepages, setHomepages ] = useState();
	const [ activeHomepage, setActiveHomepage ] = useState();
	const [ globalStyles, setGlobalStyles ] = useState( [] );
	const [ activeTab, setActiveTab ] = useState();
	const { currentStep, currentData } = useSelect( ( select ) => {
		return {
			currentStep: select( nfdOnboardingStore ).getCurrentStep(),
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	} );

	const { setIsSidebarOpened, setCurrentOnboardingData } =
		useDispatch( nfdOnboardingStore );

	const closeSideBar = () => {
		setIsSidebarOpened( false );
	};

	const handlePreview = ( slug ) => {
		if ( ! ( slug in homepages ) ) {
			return false;
		}
		const homepagesCopy = { ...homepages };
		homepagesCopy[ slug ].active = ! homepagesCopy[ slug ].active;
		currentData.sitegen.homepages.active = homepagesCopy[ slug ];
		setActiveHomepage( homepagesCopy[ slug ] );
		setHomepages( homepagesCopy );
		setCurrentOnboardingData( currentData );
	};

	const handleFavorite = ( slug ) => {
		if ( ! ( slug in homepages ) ) {
			return false;
		}

		const homepagesCopy = { ...homepages };

		homepagesCopy[ slug ].favorite = ! homepagesCopy[ slug ].favorite;
		setHomepages( homepagesCopy );
		currentData.sitegen.homepages.data = homepagesCopy;
		setCurrentOnboardingData( currentData );
	};

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
		const globalStyles = await getGlobalStyles();
		setGlobalStyles( globalStyles.body );
		setHomepages( homepagesObject );
		setActiveHomepage( currentData.sitegen.homepages.active );
	};

	useEffect( () => {
		loadData();
	}, [] );

	useEffect( () => {
		setActiveTab( {
			name: 'All Versions',
			title: (
				<div className="nfd-onboarding-sidebar--sitegen-editor-patterns__header__tab-panel__versions-tab">
					<p>All Versions</p>
				</div>
			),
			content:
				activeTab &&
				homepages &&
				activeHomepage &&
				Object.keys( homepages ).map( ( homepage ) => {
					const data = homepages[ homepage ];
					const newPreviewSettings = cloneDeep( globalStyles[ 0 ] );
					newPreviewSettings.settings.color.palette =
						data.color.palette;
					return (
						<div
							className={ `nfd-onboarding-sidebar--sitegen-editor-patterns__header__tab-panel__versions-tab__preview-container` }
							onClick={ () => handlePreview( data.slug ) }
						>
							<LivePreview
								styling={
									data.slug !== activeHomepage.slug
										? 'custom'
										: 'custom__highlighted'
								}
								blockGrammer={ data.content }
								viewportWidth={ 1300 }
								previewSettings={ newPreviewSettings }
								skeletonLoadingTime={ 0 }
							/>
							<div className="nfd-onboarding-sidebar--sitegen-editor-patterns__header__tab-panel__versions-tab__preview-container__context">
								<div
									className={ `nfd-onboarding-sidebar--sitegen-editor-patterns__header__tab-panel__versions-tab__preview-container__context__icon ${
										data.favorite &&
										'nfd-onboarding-sidebar--sitegen-editor-patterns__header__tab-panel__versions-tab__preview-container__context__icon__fill'
									}` }
									onClick={ () =>
										handleFavorite( data.slug )
									}
								></div>
								<p className="nfd-onboarding-sidebar--sitegen-editor-patterns__header__tab-panel__versions-tab__preview-container__context__title">
									{ data.title }
								</p>
							</div>
						</div>
					);
				} ),
		} );
	}, [ homepages, activeHomepage ] );

	return (
		<Fill
			name={ `${ SIDEBAR_SLOTFILL_PREFIX }/${ SIDEBAR_SITEGEN_EDITOR_PATTERNS }` }
		>
			<PanelBody
				className="nfd-onboarding-sidebar--sitegen-editor-patterns"
				initialOpen={ true }
			>
				<Suspense fallback={ <></> }>
					<PanelHeader>
						<div className="nfd-onboarding-sidebar--sitegen-editor-patterns__header">
							<TabPanelHover
								className={
									'nfd-onboarding-sidebar--sitegen-editor-patterns__header__tab-panel'
								}
								tabs={ [
									{
										name: 'All Versions',
										title: (
											<div className="nfd-onboarding-sidebar--sitegen-editor-patterns__header__tab-panel__versions-tab">
												<p>All Versions</p>
											</div>
										),
										content:
											activeTab &&
											homepages &&
											activeHomepage &&
											Object.keys( homepages ).map(
												( homepage ) => {
													const data =
														homepages[ homepage ];
													const newPreviewSettings =
														cloneDeep(
															globalStyles[ 0 ]
														);
													newPreviewSettings.settings.color.palette =
														data.color.palette;
													return (
														<div
															className={ `nfd-onboarding-sidebar--sitegen-editor-patterns__header__tab-panel__versions-tab__preview-container` }
															onClick={ () =>
																handlePreview(
																	data.slug
																)
															}
														>
															<LivePreview
																styling={
																	data.slug !==
																	activeHomepage.slug
																		? 'custom'
																		: 'custom__highlighted'
																}
																blockGrammer={
																	data.content
																}
																viewportWidth={
																	1300
																}
																previewSettings={
																	newPreviewSettings
																}
																skeletonLoadingTime={
																	0
																}
															/>
															<div className="nfd-onboarding-sidebar--sitegen-editor-patterns__header__tab-panel__versions-tab__preview-container__context">
																<div
																	className={ `nfd-onboarding-sidebar--sitegen-editor-patterns__header__tab-panel__versions-tab__preview-container__context__icon ${
																		data.favorite &&
																		'nfd-onboarding-sidebar--sitegen-editor-patterns__header__tab-panel__versions-tab__preview-container__context__icon__fill'
																	}` }
																	onClick={ () =>
																		handleFavorite(
																			data.slug
																		)
																	}
																></div>
																<p className="nfd-onboarding-sidebar--sitegen-editor-patterns__header__tab-panel__versions-tab__preview-container__context__title">
																	{
																		data.title
																	}
																</p>
															</div>
														</div>
													);
												}
											),
									},
									{
										name: 'Favorites',
										title: (
											<div className="nfd-onboarding-sidebar--sitegen-editor-patterns__header__tab-panel__favorites-tab">
												<div className="nfd-onboarding-sidebar--sitegen-editor-patterns__header__tab-panel__favorites-tab__icon"></div>
												<p className="nfd-onboarding-sidebar--sitegen-editor-patterns__header__tab-panel__favorites-tab__text">
													Favorites
												</p>
												<Button
													className="nfd-onboarding-sidebar--sitegen-editor-patterns__header__icon"
													onClick={ closeSideBar }
													icon={ closeSmall }
												></Button>
											</div>
										),
										content:
											activeTab &&
											homepages &&
											activeHomepage &&
											Object.keys( homepages ).map(
												( homepage ) => {
													const data =
														homepages[ homepage ];
													if ( ! data.favorite ) {
														return;
													}
													const newPreviewSettings =
														cloneDeep(
															globalStyles[ 0 ]
														);
													newPreviewSettings.settings.color.palette =
														data.color.palette;
													return (
														<div
															className={ `nfd-onboarding-sidebar--sitegen-editor-patterns__header__tab-panel__versions-tab__preview-container` }
															onClick={ () =>
																handlePreview(
																	data.slug
																)
															}
														>
															<LivePreview
																styling={
																	data.slug !==
																	activeHomepage.slug
																		? 'custom'
																		: 'custom__highlighted'
																}
																blockGrammer={
																	data.content
																}
																viewportWidth={
																	1300
																}
																previewSettings={
																	newPreviewSettings
																}
																skeletonLoadingTime={
																	0
																}
															/>
															<p className="nfd-onboarding-sidebar--sitegen-editor-patterns__header__tab-panel__versions-tab__preview-container__context__title">
																{ data.title }
															</p>
														</div>
													);
												}
											),
									},
								] }
								callback={ setActiveTab }
							></TabPanelHover>
						</div>
					</PanelHeader>
					{ activeTab &&
						homepages &&
						activeHomepage &&
						activeTab.content }
				</Suspense>
			</PanelBody>
		</Fill>
	);
};

export default memo( SitegenEditorPatternsSidebar );
