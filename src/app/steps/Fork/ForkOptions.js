import aiBuilderAnimation from '@/assets/ai-builder-animation.json';
import { ReactComponent as BlueprintsForkFigure } from '@/assets/blueprints-fork-figure.svg';
import { Navigate } from '@/components';
import { OnboardingEvent, sendOnboardingEvent } from '@/utils/analytics/hiive';
import { ACTION_FORK_OPTION_SELECTED } from '@/utils/analytics/hiive/constants';
import { canAccessBlueprints } from '@/utils/helpers';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { ArrowLongRightIcon, FireIcon } from '@heroicons/react/24/solid';
import { Title } from '@newfold/ui-component-library';
import { useRef } from '@wordpress/element';
import classNames from 'classnames';
import Lottie from 'lottie-react';
import { DashboardLink } from '@/utils/helpers/brandHelpers';

const ForkOptionButton = ( { label, toRoute, value, className, ...props } ) => {
	const handleNext = ( selectedForkOption ) => {
		let forkEventLabel = '';
		if ( selectedForkOption === 'sitegen' ) {
			forkEventLabel = 'AI';
		} else if ( selectedForkOption === 'blueprints' ) {
			forkEventLabel = 'BLUEPRINTS';
		}

		// Analytics: Fork option selected event
		sendOnboardingEvent( new OnboardingEvent( ACTION_FORK_OPTION_SELECTED, forkEventLabel ) );
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
			<span className="nfd-w-6 nfd-h-6"></span>
			<span>{ label }</span>
			<ArrowLongRightIcon className="nfd-w-6 nfd-h-6 nfd-translate-x-4 nfd-opacity-0 group-hover:nfd-translate-x-0 group-hover:nfd-opacity-100 nfd-transition-all nfd-duration-300 nfd-ease-in-out" />
		</Navigate>
	);
};

const ForkOption = ( { className, children } ) => {
	return (
		<div
			className={ classNames(
				'nfd-onboarding-fork-option nfd-flex-1 nfd-flex nfd-flex-col nfd-justify-end nfd-text-center',
				className
			) }
		>
			{ children }
		</div>
	);
};

const SiteGenOption = () => {
	const lottieRef = useRef();

	const renderPopularBadge = () => {
		return (
			<div className="nfd-flex nfd-items-center nfd-gap-[5px] nfd-text-[#3239CB] nfd-bg-[#E8E9FF] nfd-px-[15px] nfd-py-1.5 nfd-rounded-full nfd-width-fit">
				<FireIcon className="nfd-w-4 nfd-h-4" />
				<span className="nfd-text-tiny nfd-font-semibold">Most Popular</span>
			</div>
		);
	};

	const handleEnterFrame = ( event ) => {
		if ( event.currentTime >= 35 ) {
			lottieRef.current?.pause();
		}
	};

	return (
		<ForkOption className="nfd-onboarding-fork-option-sitegen">
			<div
				className="nfd-flex nfd-flex-col nfd-items-center nfd-gap-7 nfd-mb-6"
				data-block="fork-option-sitegen-header"
			>
				{ renderPopularBadge() }
				<Lottie
					lottieRef={ lottieRef }
					animationData={ aiBuilderAnimation }
					className="nfd-w-auto nfd-h-[110px] desktop-md:nfd-h-[140px] desktop-xl:nfd-h-[164px] tablet:nfd-h-[70px]"
					loop={ false }
					autoplay={ true }
					onEnterFrame={ handleEnterFrame }
				/>
			</div>

			<div
				className="nfd-flex nfd-flex-col nfd-items-center nfd-gap-2.5"
				data-block="fork-option-sitegen-content"
			>
				<div className="nfd-relative">
					<Title
						as="h3"
						className="desktop-xl:nfd-text-[80px] desktop-md:nfd-text-[60px] nfd-text-[50px] nfd-font-semibold nfd-text-content-default tablet:nfd-text-3xl"
					>
						{ __( 'With AI Builder', 'wp-module-onboarding' ) }
					</Title>
					<SparklesIcon className="nfd-w-9 nfd-h-9 nfd-stroke-[1px] nfd-text-[#0F172A] nfd-absolute -nfd-top-0.5 -nfd-right-9 mobile:nfd-w-8 mobile:nfd-h-8 mobile:-nfd-top-2 mobile:-nfd-right-[28px]" />
				</div>
				<p className="nfd-text-balance desktop-xl:nfd-text-[21px] desktop-md:nfd-text-[18px] nfd-text-[16px] nfd-mt-4 nfd-text-[#333333] tablet:nfd-text-tiny">
					{ __(
						'Answer a few quick questions and let our AI Builder create a beautiful, customizable site for you in minutes.',
						'wp-module-onboarding'
					) }
				</p>

				<div
					className="nfd-flex nfd-flex-col nfd-items-center nfd-gap-4 nfd-w-full nfd-mt-7 mobile:nfd-mt-4"
					data-block="fork-option-sitegen-content-action"
				>
					<ForkOptionButton
						label={ __( 'Generate Website', 'wp-module-onboarding' ) }
						toRoute="/intake"
						value="sitegen"
						className="nfd-bg-black hover:nfd-bg-[#196bde]"
					/>
				</div>
			</div>
		</ForkOption>
	);
};

const BlueprintsOption = () => {
	return (
		<ForkOption className="nfd-onboarding-fork-option-blueprints">
			<div
				className="nfd-flex nfd-flex-col nfd-items-center nfd-gap-7 nfd-mb-6"
				data-block="fork-option-blueprints-header"
			>
				<BlueprintsForkFigure className="nfd-w-auto nfd-h-[90px] nfd-stroke-[2px] desktop-md:nfd-h-[120px] desktop-xl:nfd-h-[144px] tablet:nfd-h-[70px]" />
			</div>

			<div
				className="nfd-flex nfd-flex-col nfd-items-center nfd-gap-2.5"
				data-block="fork-option-blueprints-content"
			>
				<Title
					as="h3"
					className="desktop-xl:nfd-text-[80px] desktop-md:nfd-text-[60px] nfd-text-[50px] nfd-font-semibold nfd-text-content-default tablet:nfd-text-3xl"
				>
					{ __( 'With a Template', 'wp-module-onboarding' ) }
				</Title>
				<p className="nfd-text-balance desktop-xl:nfd-text-[21px] desktop-md:nfd-text-[18px] nfd-text-[16px] nfd-mt-4 nfd-text-[#333333] tablet:nfd-text-tiny">
					{ __(
						'Pick a customizable template that best fits your needs and jump straight into your WordPress dashboard.',
						'wp-module-onboarding'
					) }
				</p>

				<div
					className="nfd-flex nfd-flex-col nfd-items-center nfd-gap-4 nfd-w-full nfd-mt-7 mobile:nfd-mt-4"
					data-block="fork-option-blueprints-content-action"
				>
					<ForkOptionButton
						label={ __( 'Select Template', 'wp-module-onboarding' ) }
						toRoute="/blueprints"
						value="blueprints"
						className="nfd-bg-black hover:nfd-bg-[#196bde]"
					/>
				</div>
			</div>
		</ForkOption>
	);
};

const ForkOptions = () => {
	return (
		<div className="nfd-onboarding-fork-options">
			<div className="nfd-flex nfd-justify-between nfd-gap-16 nfd-h-full nfd-relative mobile:nfd-flex-col mobile:nfd-pt-4">
				<SiteGenOption />
				{ canAccessBlueprints() && <BlueprintsOption /> }
			</div>
			<DashboardLink />
		</div>
	);
};

export default ForkOptions;
