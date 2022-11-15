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
import { conditionalSteps } from '../../data/routes/';

import { kebabCase, orderBy, filter } from 'lodash';
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
		firstStep,
		routes,
		designSteps,
		allSteps,
	} = useSelect((select) => {
		return {
			isDrawerOpen: select(nfdOnboardingStore).isDrawerOpened(),
			newfoldBrand: select(nfdOnboardingStore).getNewfoldBrand(),
			onboardingFlow: select(nfdOnboardingStore).getOnboardingFlow(),
			currentData: select(nfdOnboardingStore).getCurrentOnboardingData(),
			firstStep: select(nfdOnboardingStore).getFirstStep(),
			routes: select(nfdOnboardingStore).getRoutes(),
			allSteps: select(nfdOnboardingStore).getAllSteps(),
			designSteps: select(nfdOnboardingStore).getDesignSteps(),
		};
	}, []);

	const [isRequestPlaced, setIsRequestPlaced] = useState(false);
	const [didVisitBasicInfo, setDidVisitBasicInfo] = useState(false);
	const [didVisitEcommerce, setDidVisitEcommerce] = useState(false);
	const { setActiveStep, 
			setActiveFlow, 
			updateRoutes,
			updateDesignSteps,
			updateAllSteps,
			setCurrentOnboardingData,
		} = useDispatch(nfdOnboardingStore);

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

	const addColorAndTypographyRoutes = () => {
		const updates = removeColorAndTypographyRoutes();
		const steps = [
			conditionalSteps.designColors,
			conditionalSteps.designTypography,
		];
		return {
			routes: orderBy(
				updates.routes.concat(steps),
				['priority'],
				['asc']
			),
			allSteps: orderBy(
				updates.allSteps.concat(steps),
				['priority'],
				['asc']
			),
			designSteps: orderBy(
				updates.designSteps.concat(steps),
				['priority'],
				['asc']
			),
		};
	};

	const removeColorAndTypographyRoutes = () => {
		return {
			routes: filter(
				routes,
				(route) =>
					!route.path.includes(
						conditionalSteps.designColors.path
					) &&
					!route.path.includes(
						conditionalSteps.designTypography.path
					)
			),
			allSteps: filter(
				allSteps,
				(allStep) =>
					!allStep.path.includes(
						conditionalSteps.designColors.path
					) &&
					!allStep.path.includes(
						conditionalSteps.designTypography.path
					)
			),
			designSteps: filter(
				designSteps,
				(designStep) =>
					!designStep.path.includes(
						conditionalSteps.designColors.path
					) &&
					!designStep.path.includes(
						conditionalSteps.designTypography.path
					)
			),
		};
	};

	function handleColorsAndTypographyRoutes() {
		if (location?.pathname.includes('colors') || location?.pathname.includes('typography')){
			let updates;
			updates = currentData?.data?.customDesign ? addColorAndTypographyRoutes() : removeColorAndTypographyRoutes();
			
			updateRoutes(updates.routes);
			updateDesignSteps(updates.designSteps);
			updateAllSteps(updates.allSteps);
		}
	}

	useEffect(() => {
		document.body.classList.add(`nfd-brand-${newfoldBrand}`);
	}, [newfoldBrand]);

	useEffect( () => {
		syncStoreToDB();
		handleColorsAndTypographyRoutes();
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
