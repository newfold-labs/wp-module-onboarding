import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { useViewportMatch } from '@wordpress/compose';

import { store as nfdOnboardingStore } from '../../../store';
import CommonLayout from '../../../components/Layouts/Common';
import HeadingWithSubHeading from '../../../components/HeadingWithSubHeading';
import SelectableCardList from '../../../components/SelectableCardList/selectable-card-list';

const StepTopPriority = (props) => {

	const priorityTypes = {
		"0": "publishing",
		"1": "selling",
		"2": "designing"
	};

	const priorities = [{
		icon: '--nfd-publish-icon', 
		title: "Publishing",
		desc: "From blogs, to newsletters, to\npodcasts and videos, we help the web\nfind your content."
	}, {
		icon: '--nfd-selling-icon', 
		title: "Selling",
		desc: "Startup or seasoned business, \ndrop-shipping or downloads,\nwe've got ecommerce covered."
	}, {  
		icon: '--nfd-design-icon', 
		title: "Designing",
		desc: "With smart style presets and\npowerful options, we help your site\nlook and feel polished."
	}];

	const [selected, setSelected] = useState(0);
	const [isLoaded, setisLoaded] = useState(false);
	const isLargeViewport = useViewportMatch('medium');

	const { setIsDrawerOpened } = useDispatch(nfdOnboardingStore);
	const { setCurrentOnboardingData } = useDispatch(nfdOnboardingStore);

	const { currentData } = useSelect((select) => {
		return {
			currentData: select(nfdOnboardingStore).getCurrentOnboardingData()
		};
	}, []);

	Object.prototype.getKey = function (value) {
		var object = this;
		if(object)
			return Object?.keys(object).find(key => object[key] === value);
		else
			return 0;
	};

	useEffect( () => {
		if ( isLargeViewport ) {
			setIsDrawerOpened( true );
		}
		setIsSidebarOpened( false );
	}, [] );

	useEffect(() => {
		async function setInitialData() {
			if(currentData){
				const val = await currentData?.data["topPriority"]["priority1"];
				if (val != "")
					setSelected(parseInt(priorityTypes.getKey(val)));
				else{
					currentData.data["topPriority"]["priority1"] = priorityTypes[selected];
					setCurrentOnboardingData(currentData);
				}
			}
			setisLoaded(true);
		}
		if (!isLoaded)
			setInitialData();

	}, [isLoaded]);


	useEffect(() => {
		if (isLoaded){
			currentData.data["topPriority"]["priority1"] = priorityTypes[selected];
			setCurrentOnboardingData(currentData);
		}
	}, [selected]);

	return (
		<CommonLayout isVerticallyCentered>
			<HeadingWithSubHeading title="Tell us your top priority" subtitle="We’ll prioritize getting you there." isColoredSubheading="false" />
			<SelectableCardList
				contents={priorities}
				selected={selected}
				onSelectedChange={setSelected}>
			</SelectableCardList>
			<a style={{padding: '15px'}}>Skip this Step</a>
		</CommonLayout>
	);
};

export default StepTopPriority;
