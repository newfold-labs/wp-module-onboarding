import { Routes, Route, useLocation } from 'react-router-dom';
import { ErrorBoundary as AppErrorBoundary } from '@newfold/ui-component-library';
import { STEPS } from '@/steps';
import { AnimateRoutes, ErrorBoundaryFallback } from '@/components';
import { OnboardingEvent, sendOnboardingEvent } from '@/utils/analytics/hiive';
import { ACTION_PAGEVIEW } from '@/utils/analytics/hiive/constants';

const AppBody = () => {
	/**
	 * Check if any conditions prevent the onboarding from being accessed.
	 * @return {boolean} True if the onboarding can be accessed, false otherwise.
	 */
	const canAccessOnboarding = () => {
		const response = {
			result: true,
			error: null,
		};

		// Block if the onboarding has already been completed.
		if ( 'completed' === window.nfdOnboarding?.runtime?.status ) {
			response.result = false;
			response.error = 'onboarding_completed';
		}

		// Block if missing 'hasAISiteGen' capability.
		if ( ! window.NewfoldRuntime?.capabilities?.hasAISiteGen ) {
			response.result = false;
			response.error = 'no_sitegen_capability';
		}

		return response;
	};

	/**
	 * Get the routes for the onboarding steps.
	 * @return {Array} Array of <Route> components.
	 */
	const getRoutes = () => {
		return Object.entries( STEPS ).map( ( [ key, Step ] ) => {
			return (
				<Route
					key={ key }
					path={ Step.path }
					element={ <Step.Component /> }
				/>
			);
		} );
	};

	/**
	 * Boot the onboarding.
	 * @return {React.ReactNode} The onboarding routes.
	 */
	const boot = () => {
		// Check if the onboarding can be accessed.
		const canBoot = canAccessOnboarding();
		if ( ! canBoot.result ) {
			throw new Error( canBoot.error );
		}

		return (
			<AnimateRoutes>
				<Routes>
					{ getRoutes() }
				</Routes>
			</AnimateRoutes>
		);
	};

	// Analytics: Track pageview events.
	const location = useLocation();
	useEffect( () => {
		sendOnboardingEvent( new OnboardingEvent( ACTION_PAGEVIEW ) );
	}, [ location ] );

	return (
		<div className="nfd-onboarding-body nfd-flex nfd-justify-center nfd-py-0 md:nfd-py-20">
			<div className="nfd-onboarding-body-container">
				<AppErrorBoundary FallbackComponent={ ErrorBoundaryFallback }>
					{ boot() }
				</AppErrorBoundary>
			</div>
		</div>
	);
};

export default AppBody;
