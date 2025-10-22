import classNames from 'classnames';
import { Title } from '@newfold/ui-component-library';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { ArrowLongRightIcon, FireIcon } from '@heroicons/react/24/solid';
import blueprintsForkImageUrl from '@/assets/blueprints-fork.svg';
import sitegenForkImageUrl from '@/assets/sitegen-fork.svg';
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

		// Analytics: Fork option selected event
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
				'nfd-group nfd-flex nfd-items-center nfd-gap-2.5 nfd-w-[60%] nfd-h-11 nfd-max-h-11 nfd-py-3 nfd-px-4 nfd-text-base nfd-font-semibold tablet:nfd-w-[90%] nfd-bg-black hover:nfd-bg-[#3858E9] nfd-transition-colors nfd-duration-300',
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
			'nfd-onboarding-fork-option nfd-flex-1 nfd-flex nfd-flex-col nfd-justify-between nfd-text-center',
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
				className="nfd-flex nfd-flex-col nfd-items-center nfd-gap-3 nfd-min-h-[190px] tablet:nfd-min-h-[180px] mobile:nfd-min-h-[150px]"
				data-block="fork-option-sitegen-header"
			>
				<img
					src={ sitegenForkImageUrl }
					alt="AI Builder"
					className="nfd-w-auto nfd-h-[128px] tablet:nfd-h-[96px] mobile:nfd-h-[80px]"
				/>
				{ renderPopularBadge() }
			</div>

			<div
				className="nfd-flex nfd-flex-col nfd-items-center nfd-gap-2.5"
				data-block="fork-option-sitegen-content"
			>
				<div className="nfd-w-full tablet:nfd-w-[90%] nfd-flex nfd-justify-center">
					<div className="nfd-relative">
						<Title as="h3" className="nfd-text-5xl nfd-font-semibold nfd-text-content-default tablet:nfd-text-3xl">
							{ __( 'With AI Builder', 'wp-module-onboarding' ) }
						</Title>
						<SparklesIcon className="nfd-w-9 nfd-h-9 nfd-stroke-[1px] nfd-text-[#0F172A] nfd-absolute -nfd-top-0.5 -nfd-right-9 mobile:nfd-w-8 mobile:nfd-h-8 mobile:-nfd-top-2 mobile:-nfd-right-[28px]" />
					</div>
				</div>
				<p className="nfd-text-lg nfd-text-[#333333] tablet:nfd-text-tiny nfd-w-full tablet:nfd-w-[90%] nfd-min-h-[72px] tablet:nfd-min-h-[60px] nfd-px-[30px]">
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
		<div className="nfd-w-px nfd-h-full nfd-bg-[#D8D8D8] nfd-absolute nfd-left-1/2 nfd-top-0 nfd-transform nfd-translate-x-[-50%]" />
	);
};

const BlueprintsOption = () => {
	return (
		<ForkOption className="nfd-onboarding-fork-option-blueprints">
			<div
				className="nfd-flex nfd-flex-col nfd-items-center nfd-gap-7 nfd-min-h-[190px] tablet:nfd-min-h-[180px] mobile:nfd-min-h-[150px]"
				data-block="fork-option-blueprints-header">
				<img
					src={ blueprintsForkImageUrl }
					alt="Templates"
					className="nfd-w-auto nfd-h-[128px] tablet:nfd-h-[96px] mobile:nfd-h-[80px]"
				/>
			</div>

			<div
				className="nfd-flex nfd-flex-col nfd-items-center nfd-gap-2.5"
				data-block="fork-option-blueprints-content"
			>
				<Title as="h3" className="nfd-text-5xl nfd-font-semibold nfd-text-content-default tablet:nfd-text-3xl nfd-w-full tablet:nfd-w-[90%]">
					{ __( 'With a Template', 'wp-module-onboarding' ) }
				</Title>
				<p className="nfd-text-lg nfd-text-[#333333] tablet:nfd-text-tiny nfd-w-full tablet:nfd-w-[90%] nfd-min-h-[72px] tablet:nfd-min-h-[60px] nfd-px-[30px]">
					{ __( 'Pick a customizable template that best fits your needs and jump straight into your WordPress dashboard.', 'wp-module-onboarding' ) }
				</p>

				<div
					className="nfd-flex nfd-flex-col nfd-items-center nfd-gap-4 nfd-w-full nfd-mt-7 mobile:nfd-mt-4"
					data-block="fork-option-blueprints-content-action">
					<ForkOptionButton
						label={ __( 'Select Template', 'wp-module-onboarding' ) }
						toRoute="/blueprints"
						value="blueprints"
					/>
				</div>
			</div>
		</ForkOption>
	);
};

const ForkOptions = () => {
	return (
		<div className="nfd-onboarding-fork-options">
			<div className="nfd-flex nfd-justify-between nfd-gap-8 nfd-h-full nfd-pb-3 nfd-relative">
				<SiteGenOption />
				<OptionDivider />
				<BlueprintsOption />
			</div>
		</div>
	);
};

export default ForkOptions;
