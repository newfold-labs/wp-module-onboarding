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
	const [customPluginsList, setCustomPluginsList] = useState();

	const { setIsDrawerOpened, setDrawerActiveView, setIsSidebarOpened, setIsDrawerSuppressed } =
		useDispatch(nfdOnboardingStore);

	const { currentStep } = useSelect(
		(select) => {
			return {
				currentStep: select(nfdOnboardingStore).getCurrentStep()
			};
		},
		[]
	);

	async function getCustomPlugins() {
		const customPluginsList = await getCustomPluginsList();
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
			{ customPluginsList && <CheckboxList customPluginsList={customPluginsList} />}
		</CommonLayout>
	);
};

export default StepSiteFeatures;
