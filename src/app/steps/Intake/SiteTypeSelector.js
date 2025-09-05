import { SelectField } from '@newfold/ui-component-library';
import classNames from 'classnames';

const SiteTypeSelector = ( { value: selectedSiteType, onChange } ) => {
	const siteTypeOptions = [
		{
			value: 'personal',
			label: __( 'Personal', 'wp-module-onboarding' ),
		},
		{
			value: 'business',
			label: __( 'Business & Service', 'wp-module-onboarding' ),
		},
		{
			value: 'ecommerce',
			label: __( 'Online Store', 'wp-module-onboarding' ),
		},
	];

	const getSelectedLabel = ( value ) => {
		const option = siteTypeOptions.find( ( o ) => o.value === value );
		return option ? option.label : __( 'Select Site Type', 'wp-module-onboarding' );
	};

	const handleChange = ( newValue ) => {
		// Validate the value is one of the options.
		const allowedValues = siteTypeOptions.map( ( option ) => option.value );
		if ( allowedValues.includes( newValue ) && newValue !== selectedSiteType ) {
			onChange( newValue );
		}
	};

	return (
		<div className="nfd-onboarding-site-type-options nfd-w-1/2 mobile:nfd-w-full">
			<SelectField
				label={ __( 'Site Type', 'wp-module-onboarding' ) }
				labelProps={ {
					required: true,
					requiredIndicator: true,
				} }
				options={ siteTypeOptions }
				onChange={ handleChange }
				value={ selectedSiteType || '' }
				selectedLabel={ getSelectedLabel( selectedSiteType ) }
				className={ classNames(
					! selectedSiteType && '[&_button>span]:nfd-text-gray-500',
				) }
			/>
		</div>
	);
};

export default SiteTypeSelector;
