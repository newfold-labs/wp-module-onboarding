/**
 * WordPress dependencies
 */
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, Placeholder } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { upload } from '@wordpress/icons';

const ALLOWED_MEDIA_TYPES = [ 'image' ];
const ACCEPT_MEDIA_STRING = 'image/*';

export default function LogoUploader( { onSelect, canUserEdit } ) {
	if ( ! canUserEdit ) {
		return (
			<Placeholder
				className="nfd-design-studio-logo-placeholder"
				icon="admin-appearance"
				label={ __( 'Logo', 'nfd-onboarding' ) }
				instructions={ __(
					"You don't have permission to change the site logo.",
					'nfd-onboarding'
				) }
			/>
		);
	}

	return (
		<Placeholder
			className="nfd-design-studio-logo-placeholder"
			instructions={ __( 'Upload a logo to represent your brand.', 'nfd-onboarding' ) }
			isColumnLayout
		>
			<MediaUploadCheck>
				<MediaUpload
					onSelect={ onSelect }
					allowedTypes={ ALLOWED_MEDIA_TYPES }
					accept={ ACCEPT_MEDIA_STRING }
					render={ ( { open } ) => (
						<Button variant="primary" onClick={ open } icon={ upload } __next40pxDefaultSize>
							{ __( 'Upload Logo', 'nfd-onboarding' ) }
						</Button>
					) }
				/>
			</MediaUploadCheck>
		</Placeholder>
	);
}
