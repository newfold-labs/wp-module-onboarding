import Header from '../Header';
import Content from '../Content';
import Drawer from '../Drawer';
import Sidebar from '../Sidebar';
import { store as nfdOnboardingStore } from '../../store';
import { setFlow } from '../../utils/api/flow';
import { kebabCase } from 'lodash';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { useEffect, Fragment } from '@wordpress/element';
import { useViewportMatch } from '@wordpress/compose';
import { useDispatch, useSelect } from '@wordpress/data';
import { FullscreenMode, InterfaceSkeleton } from '@wordpress/interface';
import { SlotFillProvider } from '@wordpress/components';

/**
 * Primary app that renders the <InterfaceSkeleton />.
 *
 * Is a child of the hash router and error boundary.
 *
 * @return WPComponent
 */
const App = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const isLargeViewport = useViewportMatch('medium');
	const pathname = kebabCase(location.pathname);

	const {
		isDrawerOpen,
		newfoldBrand,
		onboardingFlow,
		currentData,
	} = useSelect((select) => {
		return {
			isDrawerOpen: select(nfdOnboardingStore).isDrawerOpened(),
			newfoldBrand: select(nfdOnboardingStore).getNewfoldBrand(),
			onboardingFlow: select(nfdOnboardingStore).getOnboardingFlow(),
			currentData: select(nfdOnboardingStore).getCurrentOnboardingData(),
		};
	}, []);

	const { setActiveStep, setActiveFlow } = useDispatch(nfdOnboardingStore);

	async function syncStoreToDB() {
		const result = await setFlow(currentData);
		if (result.error != null) {
			console.error('Unable to Save data!');
		}
	}

	useEffect(() => {
		document.body.classList.add(`nfd-brand-${newfoldBrand}`);
	}, [newfoldBrand]);

	useEffect(() => {
		if (location.pathname.includes('/step')) {
			setActiveFlow(onboardingFlow);

			if (location.pathname.includes(onboardingFlow))
				setActiveStep(location.pathname);
			else {
				const [first, ...rest] = location.pathname
					.substring(1)
					.split('/');
				setActiveStep(`/${onboardingFlow}/${rest.join('/')}`);
				navigate(`/${onboardingFlow}/${rest.join('/')}`);
			}
		}
		syncStoreToDB();
	}, [location.pathname, onboardingFlow]);

	return (
		<Fragment>
			<FullscreenMode isActive={true} />\
			<SlotFillProvider>
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
					sidebar={<Sidebar />}
				/>
			</SlotFillProvider>
		</Fragment>
	);
};

export default App;
