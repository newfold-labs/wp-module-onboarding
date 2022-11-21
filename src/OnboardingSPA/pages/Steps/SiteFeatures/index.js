import { useEffect } from '@wordpress/element';
import { useViewportMatch } from '@wordpress/compose';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as nfdOnboardingStore } from '../../../store';

import { VIEW_NAV_PRIMARY } from '../../../../constants';
import CommonLayout from '../../../components/Layouts/Common';
import HeadingWithSubHeading from '../../../components/HeadingWithSubHeading';
import CheckboxList from '../../../components/CheckboxTemplate/CheckboxList';

const StepSiteFeatures = () => {
	const isLargeViewport = useViewportMatch('medium');
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

	useEffect(() => {
		if (isLargeViewport) {
			setIsDrawerOpened(true);
		}
		setIsSidebarOpened(false);
		setIsDrawerSuppressed(false);
		setDrawerActiveView(VIEW_NAV_PRIMARY);
	}, []);

	const data = [
		{
			'title': 'Security, Speed & Growth',
			'subtitle': 'Powered by Jetpack',
			'desc': 'Jetpack'
		},
		{
			'title': 'Forms',
			'subtitle': 'Powered by WP Forms',
			'desc': 'WP Forms'
		},
		{
			'title': 'Site Traffic',
			'subtitle': 'Powered by MonsterInsights',
			'desc': 'MonsterInsights'
		},
		{
			'title': 'Search Engine Optimization',
			'subtitle': 'Powered by Yoast',
			'desc': 'Yoast'
		},
		{
			'title': 'Email Newsletters',
			'subtitle': 'Powered by Creative Email',
			'desc': 'Creative Email'
		},
		{
			'title': 'Enhanced Product Search',
			'subtitle': 'Powered by YITH',
			'desc': 'YITH'
		},
		{
			'title': 'Enhanced Product Filters',
			'subtitle': 'Powered by YITH',
			'desc': 'YITH'
		},
		{
			'title': 'Bookings & Appointments',
			'subtitle': 'Powered by YITH',
			'desc': 'YITH'
		},
		{
			'title': 'Product Wishlists',
			'subtitle': 'Powered by YITH',
			'desc': 'YITH'
		},
		{
			'title': 'Lead Generation',
			'subtitle': 'Powered by Optin Monster',
			'desc': 'Optin Monster'
		}
	]

	return (
		<CommonLayout isVerticallyCentered>
			<HeadingWithSubHeading title={currentStep?.heading} subtitle={currentStep?.subheading} />
			<CheckboxList data={data}/>
		</CommonLayout>
	);
};

export default StepSiteFeatures;
