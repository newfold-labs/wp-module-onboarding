import classNames from 'classnames';
import { Title } from '@newfold/ui-component-library';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { ArrowLongRightIcon, FireIcon } from '@heroicons/react/24/solid';
import { ReactComponent as SitegenForkFigure } from '@/assets/sitegen-fork-figure.svg';
import { ReactComponent as BlueprintsForkFigure } from '@/assets/blueprints-fork-figure.svg';
import { Navigate } from '@/components';
import { OnboardingEvent, sendOnboardingEvent } from '@/utils/analytics/hiive';
import { ACTION_FORK_OPTION_SELECTED } from '@/utils/analytics/hiive/constants';

const ForkOptionButton = ( {
	label,
	toRoute,
	value,
	className,
	...props
} ) => {
	const handleNext = ( selectedForkOption ) => {
		let forkEventLabel = '';
		if ( selectedForkOption === 'sitegen' ) {
			forkEventLabel = 'AI';
		} else if ( selectedForkOption === 'blueprints' ) {
			forkEventLabel = 'BLUEPRINTS';
		}

		// Analytics: Fork option selected event.
		sendOnboardingEvent(
			new OnboardingEvent(
				ACTION_FORK_OPTION_SELECTED,
				forkEventLabel
			)
		);
	};

	return (
		<Navigate
			toRoute={ toRoute }
			direction="forward"
			callback={ () => handleNext( value ) }
			className={ classNames(
				'nfd-group nfd-flex nfd-items-center nfd-gap-2.5 nfd-w-[60%] nfd-h-11 nfd-max-h-11 nfd-py-3 nfd-px-4 nfd-text-base nfd-font-semibold tablet:nfd-w-[90%]',
				className
			) }
			{ ...props }
		>
			<span>{ label }</span>
			<ArrowLongRightIcon className="nfd-w-0 nfd-h-0 nfd-scale-0 nfd-opacity-0 group-hover:nfd-w-6 group-hover:nfd-h-6 group-hover:nfd-scale-100 group-hover:nfd-opacity-100 nfd-transition-all nfd-duration-300 nfd-ease-in-out" />
		</Navigate>
	);
};

const ForkOption = ( {
	className,
	children,
} ) => {
	return (
		<div className={ classNames(
			'nfd-onboarding-fork-option nfd-flex-1 nfd-flex nfd-flex-col nfd-justify-between nfd-text-center nfd-max-w-[500px]',
			className
		) }>
			{ children }
		</div>
	);
};

const SiteGenOption = () => {
	const renderPopularBadge = () => {
		return (
			<div className="nfd-flex nfd-items-center nfd-gap-[5px] nfd-text-[#3239CB] nfd-bg-[#E8E9FF] nfd-px-[15px] nfd-py-1.5 nfd-rounded-full nfd-width-fit">
				<FireIcon className="nfd-w-4 nfd-h-4" />
				<span className="nfd-text-tiny nfd-font-semibold">Most Popular</span>
			</div>
		);
	};

	return (
		<ForkOption className="nfd-onboarding-fork-option-sitegen">
			<div
				className="nfd-flex nfd-flex-col nfd-items-center nfd-gap-7 nfd-mb-2.5"
				data-block="fork-option-sitegen-header"
			>
				<SitegenForkFigure className="nfd-w-auto nfd-h-[100px] nfd-stroke-[2px] tablet:nfd-h-[70px]" />
				{ renderPopularBadge() }
			</div>

			<div
				className="nfd-flex nfd-flex-col nfd-items-center nfd-gap-2.5"
				data-block="fork-option-sitegen-content"
			>
				<div className="nfd-relative">
					<Title as="h3" className="nfd-text-5xl nfd-font-semibold nfd-text-content-default tablet:nfd-text-3xl">
						{ __( 'With AI Builder', 'wp-module-onboarding' ) }
					</Title>
					<SparklesIcon className="nfd-w-9 nfd-h-9 nfd-stroke-[1px] nfd-text-[#0F172A] nfd-absolute -nfd-top-0.5 -nfd-right-9 mobile:nfd-w-8 mobile:nfd-h-8 mobile:-nfd-top-2 mobile:-nfd-right-[28px]" />
				</div>
				<p className="nfd-text-base nfd-text-[#333333] tablet:nfd-text-tiny">
					{ __( 'Answer a few simple questions and in just few minutes our AI Builder will create a beautiful customizable site tailored to your needs.', 'wp-module-onboarding' ) }
				</p>

				<div
					className="nfd-flex nfd-flex-col nfd-items-center nfd-gap-4 nfd-w-full nfd-mt-7 mobile:nfd-mt-4"
					data-block="fork-option-sitegen-content-action">
					<ForkOptionButton
						label={ __( 'Generate Website', 'wp-module-onboarding' ) }
						toRoute="/intake"
						value="sitegen"
					/>
				</div>
			</div>
		</ForkOption>
	);
};

const OptionDivider = () => {
	return (
		<div className="nfd-w-px nfd-h-full nfd-bg-[#D8D8D8] nfd-absolute nfd-left-1/2 nfd-top-0 nfd-transform nfd-translate-x-[-50%] mobile:nfd-hidden" />
	);
};

const BlueprintsOption = () => {
	return (
		<ForkOption className="nfd-onboarding-fork-option-blueprints">
			<div
				className="nfd-flex nfd-flex-col nfd-items-center nfd-gap-7 nfd-mb-2.5"
				data-block="fork-option-blueprints-header">
				<BlueprintsForkFigure className="nfd-w-auto nfd-h-[100px] nfd-stroke-[2px] tablet:nfd-h-[70px]" />
			</div>

			<div
				className="nfd-flex nfd-flex-col nfd-items-center nfd-gap-2.5"
				data-block="fork-option-blueprints-content"
			>
				<Title as="h3" className="nfd-text-5xl nfd-font-semibold nfd-text-content-default tablet:nfd-text-3xl">
					{ __( 'With a Template', 'wp-module-onboarding' ) }
				</Title>
				<p className="nfd-text-base nfd-text-[#333333] tablet:nfd-text-tiny">
					{ __( 'Pick a customizable template that best fits your needs and jump straight into your WordPress dashboard.', 'wp-module-onboarding' ) }
				</p>

				<div
					className="nfd-flex nfd-flex-col nfd-items-center nfd-gap-4 nfd-w-full nfd-mt-7 mobile:nfd-mt-4"
					data-block="fork-option-blueprints-content-action">
					<ForkOptionButton
						label={ __( 'Select Template', 'wp-module-onboarding' ) }
						toRoute="/blueprints"
						value="blueprints"
						className="nfd-bg-black hover:nfd-bg-black/80"
					/>
				</div>
			</div>
		</ForkOption>
	);
};

const ForkOptions = () => {
	return (
		<div className="nfd-onboarding-fork-options">
			<div className="nfd-flex nfd-justify-between nfd-gap-16 nfd-h-full nfd-pt-16 nfd-pb-3 nfd-relative mobile:nfd-flex-col mobile:nfd-pt-4">
				<SiteGenOption />
				<OptionDivider />
				<BlueprintsOption />
			</div>
		</div>
	);
};

export default ForkOptions;
