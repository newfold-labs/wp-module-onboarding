import { Fragment, Suspense } from '@wordpress/element';
import { Route, Routes } from 'react-router-dom';

import { routes as appRoutes } from '../../data/routes/index';

/**
 * Primary content area within the <InterfaceSkeleton />.
 *
 * @returns WPComponent
 */

function getMappedPages() {
	var routes = [];
	appRoutes.map((appRoute) => 
		routes.push(
			<Route
				key={appRoute.path}
				path={appRoute.path}
				end
				element={<appRoute.Component />}
			/>
		)
	)
	return routes;
}

const Content = () => {
	return (
		<main className="nfd-onboard-content">
			<Suspense fallback={<Fragment />}>
				<Routes>
					{getMappedPages()}
				</Routes>
			</Suspense>
		</main>
	);
};

export default Content;
