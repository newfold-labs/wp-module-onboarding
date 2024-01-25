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

// eslint-disable-next-line import/no-extraneous-dependencies
import { cloneDeep, isEmpty } from 'lodash';
import { getHomepages } from '../../../../data/sitegen/homepages/homepages';
import { getColorPalettes } from '../../../../data/sitegen/sitemeta/siteMeta';
import { getGlobalStyles } from '../../../../utils/api/themes';
import { LivePreview } from '../../../LivePreview';

const SitegenEditorPatternsSidebar = () => {
	const [ homepages, setHomepages ] = useState();
	const [ activeHomepage, setActiveHomepage ] = useState();
	const [ globalStyles, setGlobalStyles ] = useState( [] );
	const [ activeTab, setActiveTab ] = useState();
	const { currentData, isSidebarOpened, sideBarView } = useSelect(
		( select ) => {
			return {
				currentData:
					select( nfdOnboardingStore ).getCurrentOnboardingData(),
				isSidebarOpened: select( nfdOnboardingStore ).isSidebarOpened(),
				sideBarView: select( nfdOnboardingStore ).getSidebarView(),
			};
		}
	);

	const { setIsSidebarOpened, setCurrentOnboardingData } =
		useDispatch( nfdOnboardingStore );

	const closeSideBar = () => {
		setIsSidebarOpened( false );
	};

	const handlePreview = ( slug ) => {
		const index = homepages.findIndex(
			( homepage ) => homepage.slug === slug
		);

		if ( index === -1 ) {
			return false;
		}

		const homepagesCopy = [ ...homepages ];
		homepagesCopy[ index ].active = ! homepagesCopy[ index ].active;
		currentData.sitegen.homepages.active = homepagesCopy[ index ];

		setActiveHomepage( homepagesCopy[ index ] );
		setHomepages( homepagesCopy );
		setCurrentOnboardingData( currentData );
	};

	const handleFavorite = ( slug ) => {
		const index = homepages.findIndex(
			( homepage ) => homepage.slug === slug
		);
		if ( index === -1 ) {
			return false;
		}

		const homepagesCopy = [ ...homepages ];

		homepagesCopy[ index ].isFavourited =
			! homepagesCopy[ index ].isFavourited;

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
			homepagesResponse.forEach( ( homepage ) => {
				homepagesObject[ homepage.slug ] = homepage;
			} );
			currentData.sitegen.homepages.data = homepagesObject;
			setCurrentOnboardingData( currentData );
		} else {
			homepagesObject = currentData.sitegen.homepages.data;
		}
		const globalStylesResponse = await getGlobalStyles();
		setGlobalStyles( globalStylesResponse.body );
		setHomepages( homepagesObject );
		setActiveHomepage( currentData.sitegen.homepages.active );
	};

	useEffect( () => {
		if (
			SIDEBAR_SITEGEN_EDITOR_PATTERNS === sideBarView &&
			isSidebarOpened
		) {
			loadData();
		}
	}, [ sideBarView, isSidebarOpened ] );

	useEffect( () => {
		setActiveTab( {
			name: __( 'All Versions', 'wp-module-onboarding' ),
			title: (
				<div className="nfd-onboarding-sidebar--sitegen-editor-patterns__header__tab-panel__versions-tab">
					<p>{ __( 'All Versions', 'wp-module-onboarding' ) }</p>
				</div>
			),
			content:
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
							key={ data.slug }
						>
							<div
								className="nfd-onboarding-sidebar--sitegen-editor-patterns__header__tab-panel__versions-tab__preview-container__previews"
								onClick={ () => handlePreview( data.slug ) }
								role="button"
								tabIndex={ 0 }
								onKeyDown={ () => handlePreview( data.slug ) }
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
							</div>

							<div className="nfd-onboarding-sidebar--sitegen-editor-patterns__header__tab-panel__versions-tab__preview-container__context">
								<div
									className={ `nfd-onboarding-sidebar--sitegen-editor-patterns__header__tab-panel__versions-tab__preview-container__context__icon ${
										data.isFavourited &&
										'nfd-onboarding-sidebar--sitegen-editor-patterns__header__tab-panel__versions-tab__preview-container__context__icon__fill'
									}` }
									role="button"
									tabIndex={ 0 }
									onClick={ () =>
										handleFavorite( data.slug )
									}
									onKeyDown={ () =>
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
				<Suspense fallback={ <Fragment></Fragment> }>
					<PanelHeader>
						<div className="nfd-onboarding-sidebar--sitegen-editor-patterns__header">
							<TabPanelHover
								className={
									'nfd-onboarding-sidebar--sitegen-editor-patterns__header__tab-panel'
								}
								tabs={ [
									{
										name: __(
											'All Versions',
											'wp-module-onboarding'
										),
										title: (
											<div className="nfd-onboarding-sidebar--sitegen-editor-patterns__header__tab-panel__versions-tab">
												<p>
													{ __(
														'All Versions',
														'wp-module-onboarding'
													) }
												</p>
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
															key={ data.slug }
															role="button"
															tabIndex={ 0 }
															onKeyDown={ () =>
																handlePreview(
																	data.slug
																)
															}
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
																		data.isFavourited &&
																		'nfd-onboarding-sidebar--sitegen-editor-patterns__header__tab-panel__versions-tab__preview-container__context__icon__fill'
																	}` }
																	role="button"
																	tabIndex={
																		0
																	}
																	onKeyDown={ () =>
																		handleFavorite(
																			data.slug
																		)
																	}
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
													{ __(
														'Favorites',
														'wp-module-onboarding'
													) }
												</p>
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
													if ( ! data.isFavourited ) {
														return false;
													}
													const newPreviewSettings =
														cloneDeep(
															globalStyles[ 0 ]
														);
													newPreviewSettings.settings.color.palette =
														data.color.palette;
													return (
														<div
															key={ data.slug }
															className={ `nfd-onboarding-sidebar--sitegen-editor-patterns__header__tab-panel__versions-tab__preview-container` }
															role="button"
															tabIndex={ 0 }
															onKeyDown={ () =>
																handlePreview(
																	data.slug
																)
															}
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
								triggerEvent="click"
							></TabPanelHover>
						</div>

						<Button
							className="nfd-onboarding-sidebar--sitegen-editor-patterns__header__icon"
							onClick={ closeSideBar }
							icon={ closeSmall }
						></Button>
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
