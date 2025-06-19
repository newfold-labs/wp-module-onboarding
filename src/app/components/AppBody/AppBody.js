import { Routes, Route, useLocation } from 'react-router-dom';
import { ErrorBoundary } from '@newfold/ui-component-library';
import { STEPS } from '@/steps';
import { AnimateRoutes, ErrorBoundaryFallback } from '@/components';
import { OnboardingEvent, sendOnboardingEvent } from '@/utils/analytics/hiive';
import { ACTION_PAGEVIEW } from '@/utils/analytics/hiive/constants';

const AppBody = () => {
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

	// Analytics: Track pageview events.
	const location = useLocation();
	useEffect( () => {
		sendOnboardingEvent( new OnboardingEvent( ACTION_PAGEVIEW ) );
	}, [ location ] );

	return (
		<div className="nfd-onboarding-body nfd-flex nfd-justify-center nfd-py-20">
			<div className="nfd-onboarding-body-container">
				<ErrorBoundary FallbackComponent={ ErrorBoundaryFallback }>
					<AnimateRoutes>
						<Routes>
							{ getRoutes() }
						</Routes>
					</AnimateRoutes>
				</ErrorBoundary>
			</div>
		</div>
	);
};

export default AppBody;
