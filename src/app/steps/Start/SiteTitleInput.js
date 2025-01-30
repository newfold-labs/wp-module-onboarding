import { TextField } from '@newfold/ui-component-library';

const SiteTitleInput = () => {
	return (
		<TextField
			label={ __( 'Site Title' ) }
			id="nfd-onboarding-site-title"
			onChange={ () => {} }
			required={ true }
			labelRequiredIndicator={ true }
		/>
	);
};

export default SiteTitleInput;
