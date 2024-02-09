import { useSelect } from '@wordpress/data';
import { BlockEditorProvider } from '@wordpress/block-editor';
import { parse } from '@wordpress/blocks';
import { useEffect, useState, memo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import AutoHeightBlockPreview from './auto';
import { useGlobalStylesOutput } from '../../../utils/global-styles/use-global-styles-output';
import { store as nfdOnboardingStore } from '../../../store';
import Animate from '../../Animate';

const BlockPreview = ( {
	slug = '',
	blockGrammer,
	viewportWidth = 1300,
	styling = 'large',
	setIsLoadingParent = false,
	previewSettings = false,
	skeletonLoadingTime = 2500,
	skeletonType = 'default',
	skeletonShouldWait = false,
} ) => {
	const [ blocks, setBlocks ] = useState();
	const [ settings, setSettings ] = useState();
	const [ loading, setIsLoading ] = useState( true );

	useEffect( () => {
		if ( skeletonLoadingTime ) {
			const timer = setTimeout( () => {
				setIsLoading( false );
				if ( setIsLoadingParent ) {
					setIsLoadingParent( false );
				}
			}, skeletonLoadingTime );
			return () => clearTimeout( timer );
		}
		setIsLoading( false );
		if ( setIsLoadingParent ) {
			setIsLoadingParent( false );
		}
	}, [ skeletonLoadingTime ] );

	const { currentData, storedPreviewSettings } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
			storedPreviewSettings:
				select( nfdOnboardingStore ).getPreviewSettings(),
		};
	}, [] );

	useEffect( () => {
		if ( previewSettings ) {
			setSettings(
				// eslint-disable-next-line react-hooks/rules-of-hooks
				useGlobalStylesOutput( previewSettings, storedPreviewSettings )
			);
		} else {
			setSettings( storedPreviewSettings );
		}
	}, [ previewSettings, storedPreviewSettings ] );

	useEffect( () => {
		if ( blockGrammer ) {
			setBlocks( parse( blockGrammer ) );
		}
	}, [ blockGrammer ] );

	useEffect( () => {
		if ( ! previewSettings ) {
			setSettings( storedPreviewSettings );
		}
	}, [ storedPreviewSettings, currentData ] );

	const SkeletonLivePreviewDefault = memo( () => {
		return (
			<div className="live-preview__container--is-skeleton">
				<div className="live-preview__container--is-skeleton--box live-preview__container--is-skeleton--box-header">
					<Animate
						type={ 'shine' }
						className="live-preview__container--is-skeleton--shimmer"
					></Animate>
				</div>
				<div className="live-preview__container--is-skeleton--box live-preview__container--is-skeleton--box-body-1" />
				<div className="live-preview__container--is-skeleton--box live-preview__container--is-skeleton--box-body-2" />
				<div className="live-preview__container--is-skeleton--box live-preview__container--is-skeleton--box-footer" />
			</div>
		);
	} );

	const SkeletonLivePreviewSitegen = memo( () => {
		return (
			<div className="regenerating-site-card-wrap regenerating-site-card-skeleton">
				<div className="regenerating-site-card">
					<p className="regenerating-site-card__title">
						<p className="regenerating-site-card__title">
							{ skeletonShouldWait
								? __(
										'Regenerating Site',
										'wp-module-onboarding'
								  )
								: __(
										'Generating Site',
										'wp-module-onboarding'
								  ) }
						</p>
					</p>
					<div className="regenerating-site-card__progress-bar">
						<div className="regenerating-site-card__progress-bar__fill"></div>
					</div>
				</div>
			</div>
		);
	} );

	const getSkeleton = () => {
		switch ( skeletonType ) {
			case 'sitegen':
				return <SkeletonLivePreviewSitegen />;
			default:
				return <SkeletonLivePreviewDefault />;
		}
	};

	return (
		<div
			data-slug={ `nfd-onboarding-block-preview-${ slug }` }
			className={ `live-preview__container-${ styling }` }
		>
			{ loading && getSkeleton() }
			{ blocks && settings && (
				<BlockEditorProvider
					value={ blocks }
					settings={ settings.settings }
				>
					<AutoHeightBlockPreview
						viewportWidth={ viewportWidth }
						settings={ settings.settings }
					/>
				</BlockEditorProvider>
			) }
		</div>
	);
};

export default memo( BlockPreview );
