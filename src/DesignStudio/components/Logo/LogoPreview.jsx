/* eslint-disable @wordpress/no-unsafe-wp-apis */
/**
 * WordPress dependencies
 */
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import {
	Button,
	__experimentalHStack as HStack,
	Spinner,
	__experimentalTruncate as Truncate,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function LogoPreview( {
	imgSrc,
	alt,
	isTransient,
	canUserEdit,
	siteLogoId,
	onSelectLogo,
	onRemoveLogo,
	logoMediaDetails,
	mediaItemData,
} ) {
	const { width: naturalWidth, height: naturalHeight } = logoMediaDetails?.sizes?.full || {};

	return (
		<div className="nfd-design-studio-logo-wrapper">
			<div className="nfd-design-studio-logo-container">
				<img
					src={ imgSrc }
					alt={ alt || __( 'Site Logo', 'nfd-onboarding' ) }
					className="nfd-design-studio-logo-preview"
				/>
				{ isTransient && (
					<div className="nfd-design-studio-logo-loading">
						<Spinner />
					</div>
				) }

				{ canUserEdit && (
					<MediaUploadCheck>
						<div className="nfd-design-studio-logo-overlay">
							<MediaUpload
								onSelect={ onSelectLogo }
								allowedTypes={ [ 'image' ] }
								value={ siteLogoId }
								render={ ( { open } ) => (
									<Button
										variant="primary"
										onClick={ open }
										label={ __( 'Replace logo', 'nfd-onboarding' ) }
										className="nfd-design-studio-logo-replace-button"
									>
										{ __( 'Replace', 'nfd-onboarding' ) }
									</Button>
								) }
							/>
						</div>
					</MediaUploadCheck>
				) }
			</div>

			<HStack justify="space-between" className="nfd-design-studio-logo-info">
				<div className="nfd-design-studio-logo-details">
					<Truncate numberOfLines={ 1 }>
						{ logoMediaDetails?.sizes?.full?.file ||
							mediaItemData?.filename ||
							__( 'Current logo', 'nfd-onboarding' ) }
					</Truncate>
					{ naturalWidth && naturalHeight && (
						<span className="nfd-design-studio-logo-dimensions">
							{ naturalWidth } × { naturalHeight }
						</span>
					) }
				</div>

				{ canUserEdit && siteLogoId && (
					<Button
						variant="tertiary"
						onClick={ onRemoveLogo }
						isDestructive
						className="nfd-design-studio-logo-remove"
					>
						{ __( 'Remove', 'nfd-onboarding' ) }
					</Button>
				) }
			</HStack>
		</div>
	);
}
