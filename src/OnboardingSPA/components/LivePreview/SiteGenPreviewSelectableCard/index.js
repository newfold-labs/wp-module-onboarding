/* eslint-disable jsx-a11y/no-static-element-interactions */
import { search, Icon, reusableBlock } from '@wordpress/icons';
import { useState } from '@wordpress/element';
import { LivePreview } from '..';
import Button from '../../../components/Button';
import { ReactComponent as FavouriteIconStroked } from '../../../static/icons/sitegen/heart-stroked.svg';
import { ReactComponent as FavouriteIconFilled } from '../../../static/icons/sitegen/heart-filled.svg';
import { __ } from '@wordpress/i18n';

const SiteGenPreviewSelectableCard = ( {
	className = 'live-preview-sitegen--selectable-card',
	blockGrammar,
	viewportWidth = 1500,
	styling = 'large',
	previewSettings,
	overlay = false,
	skeletonLoadingTime = 2500,
	slug,
	title,
	isFavorite,
	palette,
	handleFavorite,
	handlePreview,
	handleRegenerate,
	isRegenerating,
} ) => {
	const [ loadingParent, setIsLoadingParent ] = useState( true );

	const onPreview = () => {
		if ( typeof handlePreview === 'function' ) {
			return handlePreview( slug );
		}
	};

	const onRegenerate = () => {
		if ( typeof handleRegenerate === 'function' ) {
			return handleRegenerate( slug, palette, isFavorite );
		}
	};

	const onFavorite = () => {
		if ( typeof handleFavorite === 'function' ) {
			return handleFavorite( slug );
		}
	};

	return (
		<div
			className={ `${ className }` }
			role="button"
			tabIndex={ 0 }
		>
			<div className={ `${ className }__live-preview-container` }>
				<LivePreview
					styling={ styling }
					blockGrammer={ blockGrammar }
					viewportWidth={ viewportWidth }
					previewSettings={ previewSettings }
					setIsLoadingParent={ setIsLoadingParent }
					skeletonLoadingTime={ skeletonLoadingTime }
					skeletonShouldWait={ isRegenerating }
					skeletonType="sitegen"
				/>
				{ overlay && ! loadingParent && (
					<div
						className={ `${ className }__live-preview-container__overlay` }
						onClick={ onPreview }
						onKeyDown={ ( event ) => {
							if ( event.key === 'Enter' ) {
								onPreview();
							}
						} }
					>
						<Button
							className={ `${ className }__live-preview-container__overlay__button` }
							onClick={ () => onPreview() }
						>
							<Icon icon={ search } />
							{ __( 'Preview Version', 'wp-module-onboarding' ) }
						</Button>
					</div>
				) }
				<div
					className={ `${ className }__live-preview-container-buttons ${
						isRegenerating ? 'disabled' : ''
					}` }
				>
					<div
						role="button"
						tabIndex="0"
						onClick={ () => onFavorite( slug ) }
						onKeyDown={ ( event ) => {
							if ( event.key === 'Enter' ) {
								onFavorite( slug );
							}
						} }
						aria-label="Add to Wishlist"
						className={ `${ className }__live-preview-container-buttons__button` }
					>
						<span>
							{ isFavorite ? (
								<FavouriteIconFilled />
							) : (
								<FavouriteIconStroked />
							) }
						</span>
						<span>{ title }</span>
					</div>
					<div
						role="button"
						tabIndex="0"
						onClick={ onRegenerate }
						onKeyDown={ ( event ) => {
							if ( event.key === 'Enter' ) {
								onRegenerate();
							}
						} }
						aria-label={ __(
							'Regenerate Content',
							'wp-module-onboarding'
						) }
						className={ `${ className }__live-preview-container-buttons__button` }
					>
						<Icon icon={ reusableBlock } />
						{ __( 'Regenerate', 'wp-module-onboarding' ) }
					</div>
				</div>
			</div>
		</div>
	);
};

export default SiteGenPreviewSelectableCard;
