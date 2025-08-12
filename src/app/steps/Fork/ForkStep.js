import { dispatch, select } from '@wordpress/data';
import { Container, Title } from '@newfold/ui-component-library';
import { nfdOnboardingStore } from '@/data/store';
import { Navigate } from '@/components';
import { OnboardingEvent, trackOnboardingEvent } from '@/utils/analytics/hiive';
import { ACTION_FORK_OPTION_SELECTED, ACTION_ONBOARDING_STARTED } from '@/utils/analytics/hiive/constants';
import { disableComingSoon, getBlueprints } from '@/utils/api';
import ForkOptions from './ForkOptions';
import ForkLinks from './ForkLinks';

/**
 * Fetch the blueprints.
 */
const fetchBlueprints = async () => {
	// If the blueprints are already fetched, return.
	const blueprints = select( nfdOnboardingStore ).getBlueprints();
	if ( blueprints.length > 0 ) {
		return;
	}

	// Fetch the blueprints.
	getBlueprints().then( ( response ) => {
		if ( ! response || response.error || ! Array.isArray( response.body ) ) {
			// eslint-disable-next-line no-console
			console.error( response.error );
		} else {
			dispatch( nfdOnboardingStore ).setBlueprints( response.body );
		}
	} );
};

const ForkStep = () => {
	const [ selectedForkOption, setSelectedForkOption ] = useState( null );

	useEffect( () => {
		// Analytics: Onboarding started event
		trackOnboardingEvent(
			new OnboardingEvent( ACTION_ONBOARDING_STARTED )
		);

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
	 * Handle the next button click.
	 * This will track the fork option selected event.
	 */
	const handleNext = () => {
		let forkEventLabel = '';
		if ( selectedForkOption === 'sitegen' ) {
			forkEventLabel = 'AI';
		} else if ( selectedForkOption === 'blueprints' ) {
			forkEventLabel = 'BLUEPRINTS';
		}

		// Analytics: Fork option selected event.
		trackOnboardingEvent(
			new OnboardingEvent(
				ACTION_FORK_OPTION_SELECTED,
				forkEventLabel
			)
		);
	};

	/**
	 * Component styles override.
	 */
	const getCustomStyles = () => {
		return (
			<style>
				{ `
					.nfd-onboarding-body {
						padding-top: 3rem !important;
					}
				` }
			</style>
		);
	};

	return (
		<Container className="nfd-onboarding-step-container nfd-onboarding-step-intro nfd-min-w-[780px] nfd-max-w-[780px] tablet:nfd-min-w-[90%] tablet:nfd-max-w-[90%]">
			{ getCustomStyles() }
			<Container.Header>
				<div className="nfd-flex nfd-flex-col nfd-gap-3">
					<Title
						as="h3"
						className="nfd-text-lg mobile:nfd-text-lg nfd-text-[#66A3D2] nfd-font-serif nfd-italic"
					>
						{ __( "Let's start!", 'wp-module-onboarding' ) }
					</Title>
					<Title
						as="h1"
						className="nfd-text-3xl nfd-text-content-default mobile:nfd-text-2xl"
					>
						{ __( 'What would you like to do?', 'wp-module-onboarding' ) }
					</Title>
					<p className="nfd-text-tiny nfd-text-content-default">
						{ __( 'Choose whether you want to select one of the available themes and quickly access the WordPress dashboard to customize your site, or continue with our AI-driven step-by-step flow.', 'wp-module-onboarding' ) }
					</p>
				</div>
			</Container.Header>

			<Container.Block className="nfd-p-0">
				<div className="nfd-flex nfd-flex-col nfd-gap-9">
					<ForkOptions onChange={ setSelectedForkOption } />
					<ForkLinks />
				</div>
			</Container.Block>

			<Container.Footer className="nfd-p-0">
				<div className="nfd-flex nfd-justify-end nfd-border-t nfd-pt-8">
					<Navigate
						toRoute={ selectedForkOption === 'sitegen' ? '/intake' : '/blueprints' }
						direction="forward"
						disabled={ ! selectedForkOption }
						callback={ handleNext }
					>
						{ __( 'Next', 'wp-module-onboarding' ) }
					</Navigate>
				</div>
			</Container.Footer>
		</Container>
	);
};

export default ForkStep;
