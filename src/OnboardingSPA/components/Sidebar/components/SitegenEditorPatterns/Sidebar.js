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
import { cloneDeep } from 'lodash';
import { getGlobalStyles } from '../../../../utils/api/themes';
import { LivePreview } from '../../../LivePreview';

const SitegenEditorPatternsSidebar = () => {
	const [ homepages, setHomepages ] = useState();
	const [ activeHomepage, setActiveHomepage ] = useState();
	const [ globalStyles, setGlobalStyles ] = useState();
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
		if ( ! ( slug in homepages ) ) {
			return false;
		}
		currentData.sitegen.homepages.active = homepages[ slug ];

		setActiveHomepage( homepages[ slug ] );
		setCurrentOnboardingData( currentData );
	};

	const handleFavorite = ( slug ) => {
		if ( ! ( slug in homepages ) ) {
			return;
		}
		const isFavorite = ! homepages[ slug ].isFavorite;
		const homepagesCopy = cloneDeep( homepages );
		homepagesCopy[ slug ].isFavorite = isFavorite;
		currentData.sitegen.homepages.data = homepagesCopy;
		if ( currentData.sitegen.homepages.active.slug === slug ) {
			currentData.sitegen.homepages.active = homepagesCopy[ slug ];
		}

		setHomepages( homepagesCopy );
		setCurrentOnboardingData( currentData );
	};

	const loadData = async () => {
		const globalStylesResponse = await getGlobalStyles();
		setGlobalStyles( globalStylesResponse.body );
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
		if ( currentData?.sitegen?.homepages ) {
			const newHomepages = cloneDeep( currentData.sitegen.homepages );
			setHomepages( newHomepages.data );
			setActiveHomepage( newHomepages.active );
		}
	}, [ currentData ] );

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
				globalStyles &&
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
										data.isFavorite &&
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
	}, [ homepages, activeHomepage, globalStyles ] );

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
											globalStyles &&
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
																		data.isFavorite &&
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
											globalStyles &&
											Object.keys( homepages ).map(
												( homepage ) => {
													const data =
														homepages[ homepage ];
													if ( ! data.isFavorite ) {
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
