import { search, Icon, reusableBlock } from '@wordpress/icons';
import { useState } from '@wordpress/element';

import { LivePreview } from '..';
import Button from '../../../components/Button';
import { ReactComponent as FavouriteIconStroked } from '../../../static/icons/sitegen/heart-stroked.svg';
import { ReactComponent as FavouriteIconFilled } from '../../../static/icons/sitegen/heart-filled.svg';
import { __ } from '@wordpress/i18n';

const SiteGenPreviewSelectableCard = ( {
	className = 'live-preview-sitegen--selectable-card',
	blockGrammer,
	viewportWidth = 1500,
	styling = 'large',
	previewSettings,
	overlay = false,
	onClick = false,
	onWishlistClick = false,
	isFavourite,
	onRegenerateClick = false,
	skeletonLoadingTime = 2500,
} ) => {
	const [ loadingParent, setIsLoadingParent ] = useState( true );

	return (
		<div
			className={ `${ className }` }
			role="button"
			tabIndex={ 0 }
			onClick={ () => {
				if ( ! loadingParent && typeof onClick === 'function' ) {
					onClick();
				}
			} }
			onKeyDown={ () => {
				if ( ! loadingParent && typeof onClick === 'function' ) {
					onClick();
				}
			} }
		>
			<div className={ `${ className }__live-preview-container` }>
				<LivePreview
					styling={ styling }
					blockGrammer={ blockGrammer }
					viewportWidth={ viewportWidth }
					previewSettings={ previewSettings }
					setIsLoadingParent={ setIsLoadingParent }
					skeletonLoadingTime={ skeletonLoadingTime }
				/>
				{ overlay && ! loadingParent && (
					<div
						className={ `${ className }__live-preview-container__overlay` }
					>
						<Button
							className={ `${ className }__live-preview-container__overlay__button` }
						>
							<Icon icon={ search } />
							Preview Version
						</Button>
					</div>
				) }
				<div
					className={ `${ className }__live-preview-container-buttons` }
				>
					<div
						role="button"
						tabIndex="0"
						onClick={ onWishlistClick }
						onKeyDown={ ( event ) => {
							if ( event.key === 'Enter' ) {
								onWishlistClick();
							}
						} }
						aria-label="Add to Wishlist"
						className={ `${ className }__live-preview-container-buttons__button` }
					>
						{ isFavourite ? (
							<FavouriteIconFilled />
						) : (
							<FavouriteIconStroked />
						) }
						{ __( 'Version 1', 'wp-module-onboarding' ) }
					</div>
					<div
						role="button"
						tabIndex="0"
						onClick={ onRegenerateClick }
						onKeyDown={ ( event ) => {
							if ( event.key === 'Enter' ) {
								onRegenerateClick();
							}
						} }
						aria-label="Regenerate Content"
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
