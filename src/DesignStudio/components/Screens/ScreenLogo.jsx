/* eslint-disable @wordpress/no-unsafe-wp-apis */
/**
 * WordPress dependencies
 */
import { isBlobURL } from '@wordpress/blob';
import { PanelBody, Placeholder, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import useLogoManagement from '../../hooks/useLogoManagement';
import LogoPreview from '../Logo/LogoPreview';
import LogoUploader from '../Logo/LogoUploader';
import ScreenHeader from '../ScreenHeader';

export default function ScreenLogo() {
	const {
		siteLogoId,
		canUserEdit,
		mediaItemData,
		isRequestingMediaItem,
		temporaryURL,
		logoUrl,
		logoMediaDetails,
		alt,
		onSelectLogo,
		onRemoveLogo,
	} = useLogoManagement();

	// Determine what to display for the logo
	let logoContent;
	const isLoading = siteLogoId === undefined || isRequestingMediaItem;

	if ( isLoading ) {
		logoContent = (
			<Placeholder className="site-logo_placeholder" withIllustration>
				<span className="components-placeholder__preview">
					<Spinner />
				</span>
			</Placeholder>
		);
	} else if ( logoUrl || temporaryURL ) {
		// Display the logo
		const imgSrc = temporaryURL || logoUrl;
		const isTransient = !! temporaryURL && isBlobURL( temporaryURL );

		logoContent = (
			<LogoPreview
				imgSrc={ imgSrc }
				alt={ alt }
				isTransient={ isTransient }
				canUserEdit={ canUserEdit }
				siteLogoId={ siteLogoId }
				onSelectLogo={ onSelectLogo }
				onRemoveLogo={ onRemoveLogo }
				logoMediaDetails={ logoMediaDetails }
				mediaItemData={ mediaItemData }
			/>
		);
	} else {
		logoContent = <LogoUploader onSelect={ onSelectLogo } canUserEdit={ canUserEdit } />;
	}

	return (
		<div className="nfd-design-studio-screen-logo">
			<ScreenHeader
				title={ __( 'Logo' ) }
				description={ __(
					'Your logo will appear in your site header. For best results, upload an image with a transparent background in PNG format.',
					'wp-module-onboarding'
				) }
			/>

			<div className="nfd-design-studio-sidebar__content">
				<PanelBody initialOpen={ true }>{ logoContent }</PanelBody>
			</div>
		</div>
	);
}
