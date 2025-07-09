import { FeaturesSelect, Label, Title } from '@newfold/ui-component-library';
import { UserIcon as UserIconOutline, BuildingOfficeIcon as BuildingOfficeIconOutline, ShoppingBagIcon as ShoppingBagIconOutline } from '@heroicons/react/24/outline';
import { UserIcon as UserIconSolid, BuildingOfficeIcon as BuildingOfficeIconSolid, ShoppingBagIcon as ShoppingBagIconSolid } from '@heroicons/react/24/solid';

const SiteTypeSelector = ( { value: selectedSiteType, onChange } ) => {
	const siteTypeOptions = [
		{
			id: 'nfd-onboarding-site-type-option__blog',
			name: 'nfd-onboarding-site-type-option-group',
			value: 'personal',
			label: __( 'Personal', 'wp-module-onboarding' ),
			description: __( 'Share your story, thoughts, and ideas.', 'wp-module-onboarding' ),
			Icon: UserIconOutline,
			IconSelected: UserIconSolid,
		},
		{
			id: 'nfd-onboarding-site-type-option__business-service',
			name: 'nfd-onboarding-site-type-option-group',
			value: 'business',
			label: __( 'Business & Service', 'wp-module-onboarding' ),
			description: __( 'Showcase your work and services.', 'wp-module-onboarding' ),
			Icon: BuildingOfficeIconOutline,
			IconSelected: BuildingOfficeIconSolid,
		},
		{
			id: 'nfd-onboarding-site-type-option__ecommerce',
			name: 'nfd-onboarding-site-type-option-group',
			value: 'ecommerce',
			label: __( 'Online Store', 'wp-module-onboarding' ),
			description: __( 'Sell your products and services online.', 'wp-module-onboarding' ),
			Icon: ShoppingBagIconOutline,
			IconSelected: ShoppingBagIconSolid,
		},
	];

	const handleChange = ( event ) => {
		const newValue = event.target.value;
		// Validate the value is one of the options.
		const allowedValues = siteTypeOptions.map( ( option ) => option.value );
		if ( allowedValues.includes( newValue ) && newValue !== selectedSiteType ) {
			onChange( newValue );
		}
	};

	/**
	 * Styles for parts that are not exposed by the FeaturesSelect component.
	 */
	const getCustomStyles = () => {
		return (
			<style>
				{ `
					.nfd-onboarding-site-type-options .nfd-features-select__feature .nfd-label {
						box-shadow: 0px 4px 9.6px 10px #85BCF209 !important;
					}

					.nfd-onboarding-site-type-options .nfd-features-select__feature-content {
						padding: 1rem !important;
						border-color: #DEE3E9 !important;
						width: 100% !important;
					}

					.nfd-onboarding-site-type-options .nfd-features-select__feature .nfd-features-select__feature-input:checked + .nfd-label .nfd-features-select__feature-content {
						background-color: #EAF4FB !important;
					}
				` }
			</style>
		);
	};

	const SiteTypeOption = ( { option } ) => {
		const Icon = option.Icon;
		const IconSelected = option.IconSelected;

		return (
			<FeaturesSelect.Feature
				key={ option.id }
				id={ option.id }
				name={ option.name }
				value={ option.value }
				checked={ selectedSiteType === option.value }
				screenReaderLabel={ option.label }
				onChange={ handleChange }
				className="nfd-w-[30%] nfd-flex-grow [&>label]:nfd-h-full [&>label]:nfd-flex mobile:nfd-w-full"
			>
				<div className="nfd-flex nfd-flex-col nfd-self-stretch nfd-gap-1 nfd-text-left">
					{ selectedSiteType === option.value ? <IconSelected className="nfd-h-6 nfd-w-6 nfd-text-primary nfd-mb-1" /> : <Icon className="nfd-h-6 nfd-w-6 nfd-text-primary nfd-mb-1" /> }
					<Title as="h4" className="nfd-text-sm nfd-font-semibold">{ option.label }</Title>
					<p className="nfd-text-sm">{ option.description }</p>
				</div>
			</FeaturesSelect.Feature>
		);
	};

	return (
		<div className="nfd-onboarding-site-type-options nfd-pb-7 nfd-border-b">
			{ getCustomStyles() }
			<Label
				label={ __( 'Site Type', 'wp-module-onboarding' ) }
				required={ true }
				requiredIndicator={ true }
				className="nfd-mb-2 nfd-block"
			/>
			<FeaturesSelect
				behavior="radio"
				className="nfd-flex mobile:nfd-flex-col"
			>
				{ siteTypeOptions.map( ( option ) => <SiteTypeOption key={ option.id } option={ option } /> ) }
			</FeaturesSelect>
		</div>
	);
};

export default SiteTypeSelector;
