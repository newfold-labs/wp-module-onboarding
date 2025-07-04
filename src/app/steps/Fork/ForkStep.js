import { useSelect } from '@wordpress/data';
import { Container, Title } from '@newfold/ui-component-library';
import bluehostLogoUrl from '@/assets/bluehost-logo.svg';
import { nfdOnboardingStore } from '@/data/store';
import SiteCreatorCard from './SiteCreatorCard';
import MigrationCard from './MigrationCard';
import { OnboardingEvent, trackOnboardingEvent } from '@/utils/analytics/hiive';
import { ACTION_ONBOARDING_STARTED } from '@/utils/analytics/hiive/constants';
import { disableComingSoon } from '@/utils/api';

const ForkStep = () => {
	const { canMigrateSite, migrationFallbackUrl } = useSelect(
		( select ) => {
			return {
				canMigrateSite: select( nfdOnboardingStore ).canMigrateSite(),
				migrationFallbackUrl: select( nfdOnboardingStore ).getMigrationFallbackUrl(),
			};
		}
	);

	useEffect( () => {
		// Analytics: Onboarding started event
		trackOnboardingEvent(
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
	}, [] );

	return (
		<Container className="nfd-onboarding-step-container nfd-onboarding-step-intro nfd-px-4 sm:nfd-px-6 md:nfd-px-10 nfd-max-w-screen-md nfd-mx-auto nfd-overflow-x-hidden">
			<Container.Block className="nfd-text-center nfd-p-0">
				<style>
					{ `
				#nfd-onboarding-header-logo {
					display: none;
				}
				` }
				</style>

				<Title className="nfd-text-base sm:nfd-text-lg md:nfd-text-xl lg:nfd-text-2xl nfd-font-semibold nfd-text-content-primary">
					{ __( 'Welcome to WordPress', 'wp-module-onboarding' ) }
				</Title>

				<div className="nfd-flex nfd-flex-col sm:nfd-flex-row nfd-items-center nfd-justify-center nfd-gap-2 nfd-mt-4">
					<span className="nfd-text-xs sm:nfd-text-sm md:nfd-text-base nfd-text-content-primary">
						{ __( 'Powered by', 'wp-module-onboarding' ) }
					</span>
					<img
						src={ bluehostLogoUrl }
						alt="Bluehost"
						className="nfd-w-20 sm:nfd-w-24 md:nfd-w-[90px] nfd-h-auto"
					/>
				</div>

				<Title
					as="h3"
					className="nfd-text-sm sm:nfd-text-base md:nfd-text-lg lg:nfd-text-xl nfd-mt-10 sm:nfd-mt-14 nfd-mb-6 sm:nfd-mb-10 nfd-font-medium"
				>
					{ __( 'How would you like to start?', 'wp-module-onboarding' ) }
				</Title>

				<div className="nfd-flex nfd-flex-col nfd-gap-6 nfd-w-full">
					<SiteCreatorCard initialFocus={ true } />

					{ ( canMigrateSite || migrationFallbackUrl ) && (
						<>
							<span className="nfd-text-xs sm:nfd-text-sm md:nfd-text-base nfd-text-content-primary nfd-font-medium nfd-text-center">
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
};

export default ForkStep;
