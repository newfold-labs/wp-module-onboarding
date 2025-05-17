import { ImageImport, Label } from '@newfold/ui-component-library';

const LogoUploadInput = () => {
	return (
		<div className="nfd-onboarding-logo-upload nfd-flex nfd-flex-col nfd-gap-2">
			<Label htmlFor="nfd-onboarding-logo-input">
				{ __( 'Site logo', 'wp-module-onboarding' ) }
			</Label>
			<ImageImport
				id="nfd-onboarding-logo-input"
				name="nfd-onboarding-logo-input"
				imageInputVariant="rounded"
				dropLabel={ __( 'accepted file types: .png, .jpg, .gif', 'wp-module-onboarding' ) }
				buttonText={ __( 'Browse', 'wp-module-onboarding' ) }
			/>
		</div>
	);
};

export default LogoUploadInput;
