import { useSelect } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
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

/**
 * Get or set the A/B test variant for the fork step.
 * Stores in localStorage to persist across onboarding restarts.
 */
const getOrSetVariant = () => {
	const STORAGE_KEY = 'nfd_fork_ab_variant';
	const existingVariant = window.localStorage.getItem( STORAGE_KEY );

	if ( existingVariant === 'A' || existingVariant === 'B' ) {
		return existingVariant;
	}

	// Random 90/10 selection for new users
	const newVariant = Math.random() < 0.90 ? 'A' : 'B';
	window.localStorage.setItem( STORAGE_KEY, newVariant );
	return newVariant;
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

	// A/B test variant selection - persists across onboarding restarts
	const [ variant ] = useState( () => getOrSetVariant() );

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
						<SiteCreatorCard initialFocus={ true } variant={ variant } />

						{ ( canMigrateSite || migrationFallbackUrl ) && (
							<>
								<span className="!nfd-text-lg nfd-text-content-primary nfd-font-medium">
									{ __( 'Or', 'wp-module-onboarding' ) }
								</span>
								<MigrationCard
									canMigrateSite={ canMigrateSite }
									migrationFallbackUrl={ migrationFallbackUrl }
									variant={ variant }
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
			<style>
				{ `
				.nfd-onboarding-body {
					padding-top: 2rem !important;
				}
				/* Responsive scaling for 900px - 1200px */
				@media (min-width: 900px) and (max-width: 1200px) {
					.nfd-onboarding-step-intro {
						max-width: 95%;
					}
				}
				/* Mobile layout below 900px */
				@media (max-width: 899px) {
					.nfd-onboarding-fork-options > div {
						flex-direction: column !important;
						gap: 2rem !important;
						padding-top: 2rem !important;
					}
					.nfd-onboarding-fork-option {
						max-width: 100% !important;
					}
					.nfd-onboarding-fork-options .nfd-w-px {
						display: none !important;
					}
				}
				` }
			</style>
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
					<ForkOptions variant={ variant } />
					<ForkLinks variant={ variant } />
				</div>
			</Container.Block>
		</Container>
	);
};

export default ForkStep;
