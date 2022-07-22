import Header from '../Header';
import Content from '../Content';
import Drawer from '../Drawer';
import Sidebar from '../Sidebar';
import classNames from 'classnames';
import { setFlow } from '../../utils/api/flow';
import { setSettings } from '../../utils/api/settings';
import { store as nfdOnboardingStore } from '../../store';
import { useLocation, useNavigate } from 'react-router-dom';

import { kebabCase } from 'lodash';
import { useViewportMatch } from '@wordpress/compose';
import { useDispatch, useSelect } from '@wordpress/data';
import { SlotFillProvider } from '@wordpress/components';
import { useEffect, Fragment, useState } from '@wordpress/element';
import { FullscreenMode, InterfaceSkeleton } from '@wordpress/interface';

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
		firstStep
	} = useSelect((select) => {
		return {
			isDrawerOpen: select(nfdOnboardingStore).isDrawerOpened(),
			newfoldBrand: select(nfdOnboardingStore).getNewfoldBrand(),
			onboardingFlow: select(nfdOnboardingStore).getOnboardingFlow(),
			currentData: select(nfdOnboardingStore).getCurrentOnboardingData(),
			firstStep: select(nfdOnboardingStore).getFirstStep(),
		};
	}, []);

	const [isRequestPlaced, setIsRequestPlaced] = useState(false);
	const [didVisitBasicInfo, setDidVisitBasicInfo] = useState(false);
	const { setActiveStep, setActiveFlow, setCurrentOnboardingData } = useDispatch(nfdOnboardingStore);

	async function syncSocialSettings() {
		const result = await setSettings(currentData?.data?.socialData);
		if (result?.error != null) {
			console.error('Unable to Save Social Data!');
		}
		setDidVisitBasicInfo(false);
	}

	async function syncStoreToDB() {
		// The First Welcome Step doesn't have any Store changes
		const isFirstStep = location?.pathname === firstStep?.path;
		if (currentData && !isFirstStep){
			if(!isRequestPlaced){
				setIsRequestPlaced(true);
				const result = await setFlow(currentData);
				if (result?.error != null) {
					setIsRequestPlaced(false);
					console.error('Unable to Save data!');
				} else {
					setCurrentOnboardingData(result?.body);
					setIsRequestPlaced(false);
				}
				if (didVisitBasicInfo) syncSocialSettings();
			}
		}
		// Check if the Basic Info page was visited
		if (location?.pathname.includes('basic-info'))
			setDidVisitBasicInfo(true);
	}

	useEffect(() => {
		document.body.classList.add(`nfd-brand-${newfoldBrand}`);
	}, [newfoldBrand]);

	useEffect(() => {
		syncStoreToDB();
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
