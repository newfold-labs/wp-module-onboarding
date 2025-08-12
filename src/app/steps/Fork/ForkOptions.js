import { FeaturesSelect } from '@newfold/ui-component-library';
import blueprintsImgUrl from '@/assets/blueprints-fork.png';
import sitegenImgUrl from '@/assets/sitegen-fork.png';

const options = [
	{
		img: blueprintsImgUrl,
		title: __( 'Build faster with a Starter Template', 'wp-module-onboarding' ),
		description: __( 'Kickstart your store with one of our beautifully designed templates, crafted just for you. Then jump into WordPress and make it truly yours with a few easy customizations.', 'wp-module-onboarding' ),
		value: 'blueprints',
	},
	{
		img: sitegenImgUrl,
		title: __( 'Launch our AI-driven step-by-step flow', 'wp-module-onboarding' ),
		description: __( 'Let our AI-powered wizard build your website for you with intelligent design suggestions — the perfect choice for beginners who want a guided, hassle-free setup experience.', 'wp-module-onboarding' ),
		value: 'sitegen',
	},
];

const ForkOptions = ( { onChange } ) => {
	/**
	 * Styles for parts that are not exposed by the FeaturesSelect component.
	 */
	const getCustomStyles = () => {
		return (
			<style>
				{ `
					.nfd-onboarding-fork-options .nfd-label {
						box-shadow: 0px 4px 9.6px 10px #85BCF214 !important;
					}

					.nfd-onboarding-fork-options .nfd-features-select__feature-check {
						background-color: #FFF !important;
						border-radius: 999px !important;
						height: 28px !important;
						width: 28px !important;
						top: 4px !important;
						right: 4px !important;
					}

					.nfd-onboarding-fork-options .nfd-features-select__feature-content {
						padding: 0 !important;
						border-color: #BBB !important;
						width: 100% !important;
						border-radius: 12px !important;
						overflow: hidden !important;
					}

					.nfd-onboarding-fork-options .nfd-features-select__feature .nfd-features-select__feature-input:checked + .nfd-label .nfd-features-select__feature-content {
						border-color: #196CDF !important;
						background-color: #EAF4FB !important;
					}

					.nfd-onboarding-fork-options .nfd-features-select__feature .nfd-features-select__feature-input:checked + .nfd-label .nfd-features-select__feature-content h3 {
						color: #0258D0 !important;
					}
				` }
			</style>
		);
	};

	const handleChange = ( e ) => {
		onChange( e.target.value );
	};

	return (
		<div className="nfd-onboarding-fork-options">
			{ getCustomStyles() }
			<FeaturesSelect
				behavior="radio"
				className="nfd-flex nfd-gap-8"
				onChange={ handleChange }
			>
				{ options.map( ( option ) => (
					<FeaturesSelect.Feature
						key={ option.value }
						className="nfd-flex-1 nfd-flex-grow [&>label]:nfd-h-full [&>label]:nfd-flex mobile:nfd-w-full"
						id={ option.value }
						name="fork-option"
						value={ option.value }
						screenReaderLabel={ option.title }
					>
						<img
							src={ option.img }
							alt={ option.title }
							className="nfd-w-full nfd-h-auto nfd-bg-slate-300 nfd-aspect-[380/156.5]"
						/>
						<div className="nfd-py-7 nfd-px-6 nfd-self-stretch">
							<h3 className="nfd-mb-3 nfd-text-base nfd-text-content-default">{ option.title }</h3>
							<p className="nfd-text-[12px] nfd-text-content-default nfd-leading-normal">{ option.description }</p>
						</div>
					</FeaturesSelect.Feature>
				) ) }
			</FeaturesSelect>
		</div>
	);
};

export default ForkOptions;
