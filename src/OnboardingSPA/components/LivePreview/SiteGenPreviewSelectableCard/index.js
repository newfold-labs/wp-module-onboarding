import { search, Icon, reusableBlock } from '@wordpress/icons';
import { useState } from '@wordpress/element';

import { LivePreview } from '..';
import ButtonDark from '../../../components/Button/ButtonDark';
import { ReactComponent as Wishlist } from '../../../static/icons/site-features/wishlist.svg';
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
						<ButtonDark
							className={ `${ className }__live-preview-container__overlay__button` }
						>
							<Icon icon={ search } />
							Preview Version
						</ButtonDark>
					</div>
				) }
				<div
					className={ `${ className }__live-preview-container-buttons` }
				>
					<ButtonDark onClick={ onWishlistClick }>
						<Wishlist />
						{ __( 'Version 1', 'wp-module-onboarding' ) }
					</ButtonDark>
					<ButtonDark onClick={ onRegenerateClick }>
						<Icon icon={ reusableBlock } />
						{ __( 'Regenerate', 'wp-module-onboarding' ) }
					</ButtonDark>
				</div>
			</div>
		</div>
	);
};

export default SiteGenPreviewSelectableCard;
