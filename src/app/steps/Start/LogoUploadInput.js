import { ImageImport, Label } from '@newfold/ui-component-library';

const LogoUploadInput = () => {
	return (
		<div className="nfd-onboarding-logo-upload nfd-flex nfd-flex-col nfd-gap-2">
			<Label htmlFor="nfd-onboarding-logo-input">
				{ __( 'Upload your logo' ) }
			</Label>
			<ImageImport
				id="nfd-onboarding-logo-input"
				name="nfd-onboarding-logo-input"
				buttonText={ __( 'Select Image' ) }
			/>
		</div>
	);
};

export default LogoUploadInput;
