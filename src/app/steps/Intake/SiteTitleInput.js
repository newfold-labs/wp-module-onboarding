import { TextField } from '@newfold/ui-component-library';

const SiteTitleInput = ( { value, onChange } ) => {
	return (
		<div className="nfd-w-full">
			<TextField
				id="nfd-onboarding-site-title"
				label={ __( 'Site Title', 'wp-module-onboarding' ) }
				labelRequiredIndicator={ true }
				required
				placeholder={ __( 'Bean There Café', 'wp-module-onboarding' ) }
				onChange={ ( e ) => onChange( e.target.value ) }
				value={ value }
			/>
		</div>
	);
};

export default SiteTitleInput;
