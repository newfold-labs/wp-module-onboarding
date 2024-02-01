import { Icon, search } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import { LivePreview } from '..';

const LivePreviewSiteGenCard = ( {
	className = 'nfd-onboarding-live-preview--sitegen-card',
	slug,
	title,
	blockGrammer,
	styling,
	isFavorite = false,
	viewportWidth,
	previewSettings,
	skeletonLoadingTime = 2500,
	onFavorite,
	onRegenerate,
	onPreview,
} ) => {
	const handleFavorite = () => {
		if ( typeof onFavorite === 'function' ) {
			return onFavorite( slug );
		}

		return false;
	};

	const handleRegenerate = () => {
		if ( typeof onRegenerate === 'function' ) {
			return onRegenerate( slug );
		}

		return false;
	};

	const handlePreview = () => {
		if ( typeof onPreview === 'function' ) {
			return onPreview( slug );
		}

		return false;
	};
	return (
		<div className={ className }>
			<div className={ `${ className }__live-preview-container` }>
				<LivePreview
					styling={ styling }
					blockGrammer={ blockGrammer }
					viewportWidth={ viewportWidth }
					previewSettings={ previewSettings }
					skeletonLoadingTime={ skeletonLoadingTime }
				/>
				<div
					className={ `${ className }__live-preview-container__overlay` }
					role="button"
					tabIndex={ 0 }
					onClick={ () => handlePreview( slug ) }
					onKeyDown={ () => handlePreview( slug ) }
				>
					<div
						className={ `${ className }__live-preview-container__overlay__preview-button` }
					>
						<Icon
							icon={ search }
							className={ `${ className }__live-preview-container__overlay__preview-button__icon` }
						></Icon>
						<p
							className={ `${ className }__live-preview-container__overlay__preview-button__text` }
						>
							{ __( 'Preview', 'wp-module-onboarding' ) }
						</p>
					</div>
				</div>
			</div>
			<div className={ `${ className }__buttons` }>
				<div className={ `${ className }__buttons__favorite` }>
					<div
						className={ `${ className }__buttons__favorite__icon ${
							isFavorite &&
							`${ className }__buttons__favorite__icon__fill`
						}` }
						role="button"
						tabIndex={ 0 }
						onClick={ () => handleFavorite() }
						onKeyDown={ () => handleFavorite() }
					/>
					<div
						className={ `${ className }__buttons__favorite__text` }
					>
						{ title }
					</div>
				</div>
				<div
					className={ `${ className }__buttons__regenerate` }
					role="button"
					tabIndex={ 0 }
					onClick={ () => handleRegenerate() }
					onKeyDown={ () => handleRegenerate() }
				>
					<div
						className={ `${ className }__buttons__regenerate__icon` }
					></div>
					<div
						className={ `${ className }__buttons__regenerate__text` }
					>
						{ __( 'Regenerate', 'wp-module-onboarding' ) }
					</div>
				</div>
			</div>
		</div>
	);
};

export default LivePreviewSiteGenCard;
