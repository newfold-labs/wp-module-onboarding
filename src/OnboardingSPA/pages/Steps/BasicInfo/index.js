import CommonLayout from '../../../components/Layouts/Common';
import HeadingWithSubHeading from '../../../components/HeadingWithSubHeading';
import BasicInfoForm from './BasicInfoForm';
import { VIEW_NAV_PRIMARY } from '../../../../constants';
import { store as nfdOnboardingStore } from '../../../store';
import { useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { useNavigate } from 'react-router-dom';

const StepBasicInfo = () => {
	const navigate = useNavigate();
	const { setDrawerActiveView } = useDispatch(nfdOnboardingStore);

	useEffect(() => {
		setDrawerActiveView(VIEW_NAV_PRIMARY);
	}, []);
	
	return (
		<CommonLayout isVerticallyCentered>
			<HeadingWithSubHeading title="Introduce us to this website" subtitle="So we can introduce it to the web" isColoredSubheading="false"/>
			<BasicInfoForm/>
			<a onClick={(e) => navigate('/wp-setup/step/design/themes')} style={{padding: '10px', cursor: 'pointer'}}>Skip this step</a>
		</CommonLayout>
	);
};

export default StepBasicInfo;
