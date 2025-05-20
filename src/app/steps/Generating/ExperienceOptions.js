import { FeaturesSelect, Title } from '@newfold/ui-component-library';
import classNames from 'classnames';

const ExperienceOptions = () => {
	const experienceOptions = [
		{
			id: 'nfd-onboarding-experience-option-beginner',
			name: 'nfd-onboarding-experience-option-group',
			value: 'beginner',
			level: 1,
			label: __( 'Beginner', 'wp-module-onboarding' ),
			description: __( 'First time using WordPress, help me as much as possible.', 'wp-module-onboarding' ),
		},
		{
			id: 'nfd-onboarding-experience-option-intermediate',
			name: 'nfd-onboarding-experience-option-group',
			value: 'intermediate',
			level: 2,
			label: __( 'Intermediate', 'wp-module-onboarding' ),
			description: __( "I've used WordPress a few times, but I'm not really an expert.", 'wp-module-onboarding' ),
		},
		{
			id: 'nfd-onboarding-experience-option-advanced',
			name: 'nfd-onboarding-experience-option-group',
			value: 'advanced',
			level: 3,
			label: __( 'Advanced', 'wp-module-onboarding' ),
			description: __( "I'm a pro with WordPress and don't need help.", 'wp-module-onboarding' ),
		},
	];

	const OptionLevelPill = ( { slots = 3, active = 1 } ) => {
		const slotsArray = Array.from( { length: slots }, ( _, index ) => index );
		return (
			<div className="nfd-flex nfd-items-center nfd-gap-0.5 nfd-w-max nfd-p-1 nfd-rounded-full nfd-bg-[#D6E8F5]">
				{ slotsArray.map( ( index ) => {
					const isActive = index < active;
					return (
						<div
							key={ index }
							className={ classNames( 'nfd-w-2 nfd-h-1 nfd-rounded-full', {
								'nfd-bg-primary-500': isActive,
								'nfd-bg-white': ! isActive,
							} ) }
						/>
					);
				} ) }
			</div>
		);
	};

	/**
	 * Styles for parts that are not exposed by the FeaturesSelect component.
	 */
	const getCustomStyles = () => {
		return (
			<style>
				{ `
					.nfd-onboarding-experience-options .nfd-label {
						box-shadow: 0px 4px 9.6px 10px #85BCF214 !important;
						border-radius: 8px !important;
					}

					.nfd-onboarding-experience-options .nfd-features-select__feature-content {
						padding: 1rem !important;
						border-color: white !important;
					}

					.nfd-onboarding-experience-options .nfd-features-select__feature .nfd-features-select__feature-input:checked:focus + .nfd-label .nfd-features-select__feature-content {
						border-color: #196CDF !important;
						background-color: #EAF4FB !important;
					}
				` }
			</style>
		);
	};
	return (
		<div className="nfd-onboarding-experience-options">
			{ getCustomStyles() }
			<FeaturesSelect
				behavior="radio"
				className="nfd-flex"
			>
				{ experienceOptions.map( ( option ) => (
					<FeaturesSelect.Feature
						key={ option.id }
						id={ option.id }
						name={ option.name }
						value={ option.value }
						screenReaderLabel={ option.label }
						className="nfd-w-[30%] nfd-flex-grow [&>label]:nfd-h-full [&>label]:nfd-flex"
						onChange={ ( event ) => {
							console.log( event.target.value );
						} }
					>
						<div className="nfd-flex nfd-flex-col nfd-self-stretch nfd-gap-3 nfd-text-left">
							<OptionLevelPill slots={ 3 } active={ option.level } />
							<Title as="h4" className="nfd-text-sm nfd-font-semibold">{ option.label }</Title>
							<p className="nfd-text-sm">{ option.description }</p>
						</div>
					</FeaturesSelect.Feature>
				) ) }
			</FeaturesSelect>
		</div>
	);
};

export default ExperienceOptions;
