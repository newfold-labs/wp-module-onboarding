import { useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element'; 

import CommonLayout from '../../components/Layouts/Common';
import HeadingWithSubHeading from '../../components/HeadingWithSubHeading';
import { SIDEBAR_LEARN_MORE, VIEW_NAV_PAGE } from '../../../constants';
import { store as nfdOnboardingStore } from '../../store';
import { useViewportMatch } from '@wordpress/compose';

const ErrorPage = () => {
    const isLargeViewport = useViewportMatch('medium');
    const { setIsDrawerOpened, setDrawerActiveView, setSidebarActiveView, setIsDrawerSuppressed } =
        useDispatch(nfdOnboardingStore);
    
    useEffect(() => {
        if (isLargeViewport) {
            setIsDrawerOpened(true);
        }
        setSidebarActiveView( SIDEBAR_LEARN_MORE );
        setIsDrawerSuppressed(false);
        setDrawerActiveView(VIEW_NAV_PAGE);
    }, []);

    return (
        <CommonLayout isVerticallyCentered>
            <HeadingWithSubHeading title="Error 404" subtitle="Please Check Again!"/>
        </CommonLayout>
    );
};

export default ErrorPage;
