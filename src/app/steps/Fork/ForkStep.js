import { Container, Title } from '@newfold/ui-component-library';
import { OnboardingEvent, sendOnboardingEvent } from '@/utils/analytics/hiive';
import { ACTION_ONBOARDING_STARTED } from '@/utils/analytics/hiive/constants';
import { disableComingSoon } from '@/utils/api';
import { fetchBlueprints } from '@/utils/blueprints';
import ForkOptions from './ForkOptions';
import ForkLinks from './ForkLinks';

const ForkStep = () => {
	useEffect( () => {
		// Analytics: Onboarding started event
		sendOnboardingEvent( new OnboardingEvent( ACTION_ONBOARDING_STARTED ) );

		// Proactively fetch the blueprints.
		fetchBlueprints();

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

	/**
	 * Component styles override.
	 */
	const getCustomStyles = () => {
		return (
			<style>
				{ `
					.nfd-onboarding-body {
						padding-top: 2rem !important;
						padding-bottom: 0 !important
					}
				` }
			</style>
		);
	};

	return (
		<Container className="nfd-onboarding-step-container nfd-onboarding-step-intro nfd-min-w-[1200px] desktop-md:nfd-max-w-[1440px] nfd-max-w-[1200px] small:nfd-min-w-[90%] small:nfd-max-w-[90%] nfd-flex nfd-flex-col nfd-h-full nfd-justify-between nfd-gap-[32px]">
			{ getCustomStyles() }
			<Container.Header className="nfd-flex-shrink-0">
				<div className="nfd-flex nfd-flex-col nfd-gap-3">
					<Title as="h1" className="nfd-text-2xl nfd-text-content-default nfd-text-center">
						{ __( 'Choose how you want to create your site', 'wp-module-onboarding' ) }
					</Title>
				</div>
			</Container.Header>

			<Container.Block className="nfd-p-0 nfd-flex-1 nfd-flex nfd-items-center nfd-justify-center">
				<div className="nfd-flex nfd-flex-col nfd-gap-14 nfd-w-full">
					<ForkOptions />
				</div>
			</Container.Block>

			<Container.Block className="nfd-p-0 nfd-flex-shrink-0">
				<div className="nfd-flex nfd-flex-col nfd-gap-14">
					<ForkLinks />
				</div>
			</Container.Block>
		</Container>
	);
};

export default ForkStep;
