import { useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element'; 

import CommonLayout from '../../components/Layouts/Common';
import HeadingWithSubHeading from '../../components/HeadingWithSubHeading';
import { VIEW_NAV_PRIMARY } from '../../../constants';
import { store as nfdOnboardingStore } from '../../store';

const ErrorPage = () => {
    const { setDrawerActiveView, setIsSidebarOpened } =
        useDispatch(nfdOnboardingStore);
        
    useEffect(() => {
        setIsSidebarOpened(false);
        setDrawerActiveView(VIEW_NAV_PRIMARY);
    }, []);
    
    return (
        <CommonLayout isVerticallyCentered>
            <HeadingWithSubHeading title="Error" subtitle="Wups"/>
        </CommonLayout>
    );
};

export default ErrorPage;
