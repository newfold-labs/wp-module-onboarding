import { Route, Routes } from 'react-router-dom';
import { Fragment, memo, Suspense, useCallback } from '@wordpress/element';

import { store as nfdOnboardingStore } from '../../store';
import { useSelect } from '@wordpress/data';
import FlowStateHandler from '../StateHandlers/Flow';

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

	const getMappedPages = useCallback( () => {
		return routes?.map( ( route ) => (
			<Route
				key={ route.path }
				path={ route.path }
				end
				element={ <route.Component /> }
			/>
		) );
	}, [ routes ] );

	return (
		<main className="nfd-onboard-content">
			<Suspense fallback={ <Fragment /> }>
				<FlowStateHandler>
					<Routes>{ getMappedPages( routes ) }</Routes>
				</FlowStateHandler>
			</Suspense>
		</main>
	);
};

const ContentMemo = memo( Content );
export default ContentMemo;
