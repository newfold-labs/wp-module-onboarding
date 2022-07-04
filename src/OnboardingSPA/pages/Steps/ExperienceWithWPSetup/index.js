import CommonLayout from '../../../components/Layouts/Common';
import ExperienceWithWP from '../../../components/ExperienceWithWP';
import { useEffect } from '@wordpress/element';
import { useLocation } from 'react-router-dom';
import NewfoldLargeCard from '../../../components/NewfoldLargeCard';


const ExperienceWithWPSetup = () => {
	const location = useLocation();

	useEffect(() => {}, [location]);

	return (
		<CommonLayout isBgPrimary isCentered>
			<NewfoldLargeCard children={<ExperienceWithWP/>}/>
		</CommonLayout>
	);
};

export default ExperienceWithWPSetup;
