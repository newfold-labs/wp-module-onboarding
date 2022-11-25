import { isEmpty } from 'lodash';
import { useViewportMatch } from '@wordpress/compose';
import { useEffect, useState } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as nfdOnboardingStore } from '../../../store';

import { VIEW_NAV_PRIMARY } from '../../../../constants';
import CommonLayout from '../../../components/Layouts/Common';
import { getCustomPluginsList } from '../../../utils/api/plugins';
import HeadingWithSubHeading from '../../../components/HeadingWithSubHeading';
import CheckboxList from '../../../components/CheckboxTemplate/CheckboxList';

const StepSiteFeatures = () => {
	const isLargeViewport = useViewportMatch('medium');

	const [isLoaded, setisLoaded] = useState(false);
	const [selectedPlugins, setSelectedPlugins] = useState();
	const [customPluginsList, setCustomPluginsList] = useState();

	const { setIsDrawerOpened, setDrawerActiveView, setIsSidebarOpened, setCurrentOnboardingData, setIsDrawerSuppressed } =
		useDispatch(nfdOnboardingStore);

	const { currentStep, currentData } = useSelect(
		(select) => {
			return {
				currentStep: select(nfdOnboardingStore).getCurrentStep(),
				currentData: select(nfdOnboardingStore).getCurrentOnboardingData(),
			};
		},
		[]
	);

	async function selectPlugin(slug, choice) {
		let selectedPluginsCopy = {...selectedPlugins};
		if(choice)
			selectedPluginsCopy[slug] = true;
		else
			selectedPluginsCopy[slug] = false;

		currentData.data.siteFeatures = {...selectedPluginsCopy};
		setCurrentOnboardingData(currentData);
		setSelectedPlugins(selectedPluginsCopy);
	}

	async function changeToStoreSchema( customPluginsList, saveToStore = false ) {
		let selectedPlugins = {};

		customPluginsList.forEach(plugin => {
			selectedPlugins[plugin.slug] = plugin.selected;
		});
		setSelectedPlugins(selectedPlugins);

		if (saveToStore) {
			currentData.data.siteFeatures = { ...selectedPlugins };
			setCurrentOnboardingData(currentData);
		}
	}

	async function getCustomPlugins() {
		const customPluginsList = await getCustomPluginsList();
		if (isEmpty(currentData?.data?.siteFeatures))
			changeToStoreSchema(customPluginsList.body, true);
		else
			setSelectedPlugins({ ...currentData?.data?.siteFeatures });
		
		setCustomPluginsList(customPluginsList.body);
		setisLoaded(true);
	}

	useEffect(() => {
		if (!isLoaded) {
			getCustomPlugins();
		}
	}, [isLoaded]);

	useEffect(() => {
		if (isLargeViewport) {
			setIsDrawerOpened(false);
		}
		setIsSidebarOpened(false);
		setIsDrawerSuppressed(false);
		setDrawerActiveView(VIEW_NAV_PRIMARY);
	}, []);

	return (
		<CommonLayout isVerticallyCentered>
			<HeadingWithSubHeading title={currentStep?.heading} subtitle={currentStep?.subheading} />
			{customPluginsList && 
				<CheckboxList 
					callback={selectPlugin}
					selectedPlugins={selectedPlugins} 
					customPluginsList={customPluginsList} />}
		</CommonLayout>
	);
};

export default StepSiteFeatures;
