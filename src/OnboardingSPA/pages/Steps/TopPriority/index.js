import { store as nfdOnboardingStore } from '../../../store';
import { useDispatch } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { useViewportMatch } from '@wordpress/compose';

import CommonLayout from '../../../components/Layouts/Common';
import HeadingWithSubHeading from '../../../components/HeadingWithSubHeading';
import SelectableCardList from '../../../components/SelectableCardList/selectable-card-list';

const StepTopPriority = (props) => {
	var priorities = [{
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
	const isLargeViewport = useViewportMatch('medium');
	const { setIsDrawerOpened } = useDispatch(nfdOnboardingStore);

	useEffect(() => {
		if (isLargeViewport) {
			setIsDrawerOpened(true);
		}
	}, []);

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
