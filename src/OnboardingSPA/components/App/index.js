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

	const { isDrawerOpen, newfoldBrand, onboardingFlow } = useSelect((select) => {
		return {
			isDrawerOpen: select(nfdOnboardingStore).isDrawerOpened(),
			newfoldBrand: select(nfdOnboardingStore).getNewfoldBrand(),
			onboardingFlow: select(nfdOnboardingStore).getOnbardingFlow(),
		};
	}, []);

	const { setActiveStep, setActiveFlow } = useDispatch(nfdOnboardingStore);

	useEffect(() => {
		document.body.classList.add(`nfd-brand-${newfoldBrand}`);
	}, [newfoldBrand]);

	useEffect(() => {
		if (location.pathname.includes('/step')) {
			setActiveFlow(onboardingFlow);
			
			if (location.pathname.includes(onboardingFlow))
				setActiveStep(location.pathname);
			else {
				console.log('else ran');
				const [first, ...rest] = location.pathname.split('/');
				setActiveStep(`/${onboardingFlow}/${rest.join('-')}`);
			}
		}
	}, [location.pathname, onboardingFlow]);

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
