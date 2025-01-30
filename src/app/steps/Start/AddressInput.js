import { TextareaField } from '@newfold/ui-component-library';

const AddressInput = () => {
	return (
		<TextareaField
			id="nfd-onboarding-address"
			label={ __( 'Is there an address you want to share with visitors?' ) }
		/>
	);
};

export default AddressInput;
