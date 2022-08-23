import Header from '../Header';
import Content from '../Content';
import Drawer from '../Drawer';
import Sidebar from '../Sidebar';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
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
		flowData,
		socialData,
		firstStep
	} = useSelect((select) => {
		return {
			isDrawerOpen: select(nfdOnboardingStore).isDrawerOpened(),
			newfoldBrand: select(nfdOnboardingStore).getNewfoldBrand(),
			onboardingFlow: select(nfdOnboardingStore).getOnboardingFlow(),
			flowData: select(nfdOnboardingStore).getCurrentOnboardingFlowData(),
			socialData: select(nfdOnboardingStore).getCurrentOnboardingSocialData(),
			firstStep: select(nfdOnboardingStore).getFirstStep(),
		};
	}, []);

	const [didVisitEcommerce, setDidVisitEcommerce] = useState(false);
	const { setActiveStep, setActiveFlow } = useDispatch(nfdOnboardingStore);
	
	async function syncStoreDetails() {
		let { address, tax } = flowData?.storeDetails;
		let payload = {};
		if (address !== undefined) {
			delete address.country;
			delete address.state;
			payload = address;
		}
		if (tax !== undefined) {
			let option = tax.option;
			let isStoreDetailsFilled = tax.isStoreDetailsFilled;
			delete tax.option;
			delete tax.isStoreDetailsFilled;
			// No Auto-calculate taxes for MMP
			// if (option === "1") {
			// 	if (isStoreDetailsFilled) {
			// 		payload = { ...payload, ...tax };
			// 	}
			// } else {
			// 	payload = { ...payload, ...tax };
			// }
			payload = { ...payload, ...tax };
		}
		if (!isEmpty(payload)) {
			await updateWPSettings(payload);
		}
		delete flowData?.storeDetails?.address;
		delete flowData?.storeDetails?.tax;
		setDidVisitEcommerce(false);
	}

	async function syncStoreToDB() {
		if ( currentData ){
			if (didVisitEcommerce) {
				await syncStoreDetails();
			}
		}

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
