import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { Container, Title } from '@newfold/ui-component-library';
import { nfdOnboardingStore } from '@/data/store';
import bluehostLogoUrl from '@/assets/bluehost-logo.svg';
import { OnboardingEvent, sendOnboardingEvent } from '@/utils/analytics/hiive';
import { ACTION_ONBOARDING_STARTED, ACTION_SITEGEN_FORK_AI_EXPERIMENT } from '@/utils/analytics/hiive/constants';
import { disableComingSoon } from '@/utils/api';
import { fetchBlueprints } from '@/utils/blueprints';
import SiteCreatorCard from './SiteCreatorCard';
import MigrationCard from './MigrationCard';
import ForkOptions from './ForkOptions';
import ForkLinks from './ForkLinks';
import '@/styles/ForkStep.css';

/**
 * Get the A/B test variant for the fork step based on Hiive capability.
 * If hasForkABExperiment capability exists and is true, show variant B.
 * Otherwise, default to variant A.
 */
const getVariant = () => {
	const hasForkABExperiment = window.NewfoldRuntime?.capabilities?.hasForkABExperiment;
	return hasForkABExperiment ? 'B' : 'A';
};

const ForkStep = () => {
	const { canMigrateSite, migrationFallbackUrl } = useSelect(
		( select ) => {
			return {
				canMigrateSite: select( nfdOnboardingStore ).canMigrateSite(),
				migrationFallbackUrl: select( nfdOnboardingStore ).getMigrationFallbackUrl(),
			};
		}
	);

	// A/B test variant selection based on Hiive capability
	const variant = getVariant();

	// Proactively fetch the blueprints.
	fetchBlueprints();

	useEffect( () => {
		// Analytics: Track which variant the user was assigned
		sendOnboardingEvent(
			new OnboardingEvent( ACTION_SITEGEN_FORK_AI_EXPERIMENT, variant )
		);

		// Analytics: Onboarding started event
		sendOnboardingEvent(
			new OnboardingEvent( ACTION_ONBOARDING_STARTED )
		);

		/**
		 * Before unmounting: Disable the site coming soon page.
		 * This is necessary for the Screenshot Service to be able to load the sitegen previews.
		 * As a side effect (intentionally), this will also send the 'site_launched' event.
		 * See coming soon module for more details.
		 *
		 * Analytics: Site launched event.
		 */
		return () => {
			disableComingSoon();
		};
	}, [ variant ] );

	// Render Variant A (current layout with 2 cards)
	if ( variant === 'A' ) {
		return (
			<Container className="nfd-onboarding-step-container nfd-onboarding-step-intro">
				<Container.Block className="nfd-text-center nfd-p-0">
					<style>
						{ `
						#nfd-onboarding-header-logo {
							display: none;
						}
						` }
					</style>
					<Title className="nfd-text-3xl mobile:nfd-text-2xl">
						{ __( 'Welcome to WordPress', 'wp-module-onboarding' ) }
					</Title>
					<div className="nfd-flex nfd-items-center nfd-justify-center nfd-gap-2 nfd-mt-3.5 mobile:nfd-mt-2">
						<span className="nfd-text-xl nfd-text-content-primary mobile:nfd-text-base">
							{ __( 'Powered by', 'wp-module-onboarding' ) }
						</span>
						<img
							src={ bluehostLogoUrl }
							alt="Bluehost"
							className="nfd-w-[90px] nfd-h-auto mobile:nfd-w-[70px]"
						/>
					</div>

					<Title
						as="h3"
						className="nfd-text-2xl nfd-mt-14 nfd-mb-10 mobile:nfd-text-xl mobile:nfd-mt-10 mobile:nfd-mb-6"
					>
						{ __( 'How would you like to start?', 'wp-module-onboarding' ) }
					</Title>

					<div className="nfd-flex nfd-flex-col nfd-gap-6">
						<SiteCreatorCard initialFocus={ true } />

						{ ( canMigrateSite || migrationFallbackUrl ) && (
							<>
								<span className="!nfd-text-lg nfd-text-content-primary nfd-font-medium">
									{ __( 'Or', 'wp-module-onboarding' ) }
								</span>
								<MigrationCard
									canMigrateSite={ canMigrateSite }
									migrationFallbackUrl={ migrationFallbackUrl }
								/>
							</>
						) }
					</div>
				</Container.Block>
			</Container>
		);
	}

	// Render Variant B (template layout with 3 options)
	return (
		<Container className="nfd-onboarding-step-container nfd-onboarding-step-intro nfd-max-w-[1200px] nfd-w-full nfd-px-4">
			<Container.Header>
				<div className="nfd-flex nfd-flex-col nfd-gap-3">
					<Title
						as="h1"
						className="nfd-text-2xl nfd-text-content-default nfd-text-center"
					>
						{ __( 'Choose how you want to create your site', 'wp-module-onboarding' ) }
					</Title>
				</div>
			</Container.Header>

			<Container.Block className="nfd-p-0">
				<div className="nfd-flex nfd-flex-col nfd-gap-14">
					<ForkOptions />
					<ForkLinks variant={ variant } />
				</div>
			</Container.Block>
		</Container>
	);
};

export default ForkStep;
