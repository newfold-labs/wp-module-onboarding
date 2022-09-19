import { Fragment, Suspense } from '@wordpress/element';
import { Route, Routes } from 'react-router-dom';

import { store as nfdOnboardingStore } from '../../store';
import { useSelect } from '@wordpress/data';

/**
 * Primary content area within the <InterfaceSkeleton />.
 *
 * @return WPComponent
 */

const Content = () => {
	const { routes } = useSelect( ( select ) => {
		return {
			routes: select( nfdOnboardingStore ).getRoutes(),
		};
	} );

	const getMappedPages = ( routes ) => {
		return routes?.map( ( route ) => (
			<Route
				key={ route.path }
				path={ route.path }
				end
				element={ <route.Component /> }
			/>
		) );
	};

	return (
		<main className="nfd-onboard-content">
			<Suspense fallback={ <Fragment /> }>
				<Routes>{ getMappedPages( routes ) }</Routes>
			</Suspense>
		</main>
	);
};

export default Content;
