import { Fragment, Suspense } from '@wordpress/element';
import { Route, Routes } from 'react-router-dom';

import { routes as appRoutes } from '../../data/routes';

/**
 * Primary content area within the <InterfaceSkeleton />.
 *
 * @returns WPComponent
 */
const Content = () => {
	return (
		<main className="nfd-onboard-content">
			<Suspense fallback={<Fragment />}>
				<Routes>
					{appRoutes.map((appRoute) => (
						<Route
							key={appRoute.path}
							path={appRoute.path}
							end
							element={<appRoute.Component />}
						/>
					))}
				</Routes>
			</Suspense>
		</main>
	);
};

export default Content;
