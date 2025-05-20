import { useSelect } from '@wordpress/data';
import { Container, Title } from '@newfold/ui-component-library';
import bluehostLogoUrl from '@/assets/bluehost-logo.svg';
import { nfdOnboardingStore } from '@/data/store';
import SiteCreatorCard from './SiteCreatorCard';
import MigrationCard from './MigrationCard';
import { OnboardingEvent, trackOnboardingEvent } from '@/utils/analytics/hiive';
import { ACTION_ONBOARDING_STARTED } from '@/utils/analytics/hiive/constants';

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
	}, [] );

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
				<Title className="nfd-text-3xl">
					{ __( 'Welcome to WordPress', 'wp-module-onboarding' ) }
				</Title>
				<div className="nfd-flex nfd-items-center nfd-justify-center nfd-gap-2 nfd-mt-3.5">
					<span className="!nfd-text-xl">
						{ __( 'Powered by', 'wp-module-onboarding' ) }
					</span>
					<img
						src={ bluehostLogoUrl }
						alt="Bluehost"
						className="nfd-w-[90px] nfd-h-auto"
					/>
				</div>

				<Title
					as="h3"
					className="nfd-text-2xl nfd-mt-14 nfd-mb-10"
				>
					{ __( 'How would you like to start?', 'wp-module-onboarding' ) }
				</Title>

				<div className="nfd-flex nfd-flex-col nfd-gap-6">
					<SiteCreatorCard initialFocus={ true } />

					{ ( canMigrateSite || migrationFallbackUrl ) && (
						<>
							<span className="!nfd-text-lg nfd-text-black nfd-font-medium">
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
