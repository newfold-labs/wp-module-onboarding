import Header from '../Header';
import Content from '../Content';
import Drawer from '../Drawer';
import Sidebar from '../Sidebar';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { setFlow } from '../../utils/api/flow';
import { getSettings, setSettings } from '../../utils/api/settings';
import { isEmpty, updateWPSettings } from '../../utils/api/ecommerce';
import { store as nfdOnboardingStore } from '../../store';

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
	const [didVisitEcommerce, setDidVisitEcommerce] = useState(false);
	const { setActiveStep, setActiveFlow, setCurrentOnboardingData } = useDispatch(nfdOnboardingStore);

	async function syncSocialSettings() {
		const initialData = await getSettings();
		const result = await setSettings(currentData?.data?.socialData);
		setDidVisitBasicInfo(false);
		if (result?.error != null) {
			console.error('Unable to Save Social Data!');
			return initialData?.body;
		}
		return result?.body;
	}
	
	async function syncStoreDetails() {
		let { address, tax } = currentData.storeDetails;
		let payload = {};
		if (address !== undefined) {
			delete address.country;
			delete address.state;
			payload = address;
		}
		if (tax !== undefined) {
			let option = tax.option;
			delete tax.option;
			if (option !== "1") {
				payload = { ...payload, ...tax };
			} else if (address !== undefined) {
				payload = { ...payload, ...tax };
			}
		}
		if (!isEmpty(payload)) {
			await updateWPSettings(payload);
		}
		delete currentData.storeDetails.address;
		delete currentData.storeDetails.tax;
		setDidVisitEcommerce(false);
	}

	async function syncStoreToDB() {
		// The First Welcome Step doesn't have any Store changes
		const isFirstStep = location?.pathname === firstStep?.path;
		if (currentData && !isFirstStep){
			if(!isRequestPlaced){
				setIsRequestPlaced(true);

				if (didVisitEcommerce) {
					await syncStoreDetails();
				}

				// If Social Data is changed then sync it
				if (didVisitBasicInfo){
					const socialData = await syncSocialSettings();
					
					// If Social Data is changed then Sync that also to the store
					if (socialData && currentData?.data)
						currentData.data.socialData = socialData;
				} 

				const result = await setFlow(currentData);
				if (result?.error != null) {
					setIsRequestPlaced(false);
					console.error('Unable to Save data!');
				} else {
					setCurrentOnboardingData(result?.body);
					setIsRequestPlaced(false);
				}
				
			}
		}
		// Check if the Basic Info page was visited
		if (location?.pathname.includes('basic-info'))
			setDidVisitBasicInfo(true);
		if (location?.pathname.includes('ecommerce')) {
			setDidVisitEcommerce(true);
		}
	}

	useEffect(() => {
		document.body.classList.add(`nfd-brand-${newfoldBrand}`);
	}, [newfoldBrand]);

	useEffect( () => {
		syncStoreToDB();
		if ( location.pathname.includes( '/step' ) ) {
			setActiveFlow( onboardingFlow );
			setActiveStep( location.pathname );
		}
	}, [ location.pathname, onboardingFlow ] );

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
