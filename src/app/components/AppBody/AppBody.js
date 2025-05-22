import { Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from '@newfold/ui-component-library';
import { STEPS } from '@/steps';
import { AnimateRoutes, ErrorBoundaryFallback } from '@/components';
import { dispatch } from '@wordpress/data';
import { nfdOnboardingStore } from '@/data/store';

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

	dispatch( nfdOnboardingStore ).setSiteTitle( 'hello Site' );

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
