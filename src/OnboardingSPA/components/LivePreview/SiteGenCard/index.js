import { Icon, search } from '@wordpress/icons';
import { LivePreview } from '..';
import favorite from '../../../static/icons/sitegen/favorite.svg';

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
	const handleFavorite = ( slug ) => {
		if ( typeof onFavorite === 'function' ) {
			return onFavorite( slug );
		}

		return false;
	};

	const handleRegenerate = ( slug ) => {
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
					onClick={ () => handlePreview( slug ) }
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
							Preview
						</p>
					</div>
				</div>
			</div>
			<div className={ `${ className }__buttons` }>
				<div className={ `${ className }__buttons__favorite` }>
					<img
						src={ favorite }
						className={ `${ className }__buttons__favorite__icon ${
							isFavorite &&
							`${ className }__buttons__favorite__icon__fill`
						}` }
						onClick={ () => handleFavorite( slug ) }
					/>
					<div
						className={ `${ className }__buttons__favorite__text` }
					>
						{ title }
					</div>
				</div>
				<div className={ `${ className }__buttons__regenerate` }>
					<div
						className={ `${ className }__buttons__regenerate__icon` }
						onClick={ () => handleRegenerate( slug ) }
					></div>
					<div
						className={ `${ className }__buttons__regenerate__text` }
					>
						Regenerate
					</div>
				</div>
			</div>
		</div>
	);
};

export default LivePreviewSiteGenCard;
