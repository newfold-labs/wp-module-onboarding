import { FullscreenMode, InterfaceSkeleton } from '@wordpress/interface';
import { useDispatch, useSelect } from '@wordpress/data';

import Content from '../Content';
import Drawer from '../Drawer';
import { Fragment } from '@wordpress/element';
import Header from '../Header';
import classNames from 'classnames';
import { kebabCase } from 'lodash';
import { store as nfdOnboardingStore } from '../../store';
import { useEffect } from '@wordpress/element';
import { useLocation } from 'react-router-dom';
import { useViewportMatch } from '@wordpress/compose';

/**
 * Primary app that renders the <InterfaceSkeleton />.
 *
 * Is a child of the hash router and error boundary.
 *
 * @returns WPComponent
 */
const App = () => {
	const location = useLocation();
	const isLargeViewport = useViewportMatch('medium');
	const pathname = kebabCase(location.pathname);

	const { isDrawerOpen, newfoldBrand } = useSelect((select) => {
		return {
			isDrawerOpen: select(nfdOnboardingStore).isDrawerOpened(),
			newfoldBrand: select(nfdOnboardingStore).getNewfoldBrand(),
		};
	}, []);

	const { setActiveStep } = useDispatch(nfdOnboardingStore);

	useEffect(() => {
		document.body.classList.add(`nfd-brand-${newfoldBrand}`);
	}, [newfoldBrand]);

	useEffect(() => {
		if (location.pathname.includes('/step')) {
			setActiveStep(location.pathname);
		}
	}, [location.pathname]);

	return (
		<Fragment>
			<FullscreenMode isActive={true} />
			<InterfaceSkeleton
				className={classNames(
					'nfd-onboarding-skeleton',
					`brand-${newfoldBrand}`,
					`path-${pathname}`,
					{ 'is-drawer-open': isDrawerOpen },
					{ 'is-large-viewport': isLargeViewport },
					{ 'is-small-viewport': !isLargeViewport }
				)}
				header={<Header />}
				drawer={<Drawer />}
				content={<Content />}
			/>
		</Fragment>
	);
};

export default App;
