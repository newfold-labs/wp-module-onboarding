import { TextField } from '@newfold/ui-component-library';

const SiteTitleInput = () => {
	return (
		<div className="nfd-w-[60%]">
			<TextField
				label={ __( 'Site Title', 'wp-module-onboarding' ) }
				id="nfd-onboarding-site-title"
				placeholder={ __( 'Bean There Café', 'wp-module-onboarding' ) }
				onChange={ () => {} }
			/>
		</div>
	);
};

export default SiteTitleInput;
