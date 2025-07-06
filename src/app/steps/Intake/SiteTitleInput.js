import { TextField } from '@newfold/ui-component-library';

const SiteTitleInput = ( { value, onChange } ) => {
	return (
		<div className="nfd-w-[60%] mobile:nfd-w-full">
			<TextField
				label={ __( 'Site Title', 'wp-module-onboarding' ) }
				id="nfd-onboarding-site-title"
				placeholder={ __( 'Bean There Café', 'wp-module-onboarding' ) }
				onChange={ ( e ) => onChange( e.target.value ) }
				value={ value }
			/>
		</div>
	);
};

export default SiteTitleInput;
