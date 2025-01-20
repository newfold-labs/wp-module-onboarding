import { Routes, Route } from 'react-router-dom';
import { STEPS } from '@/steps';
import { AnimateRoutes } from '@/components';

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

	return (
		<div className="nfd-onboarding-body nfd-flex nfd-justify-center nfd-py-20">
			<div className="nfd-onboarding-body-container">
				<AnimateRoutes>
					<Routes>
						{ getRoutes() }
					</Routes>
				</AnimateRoutes>
			</div>
		</div>
	);
};

export default AppBody;
