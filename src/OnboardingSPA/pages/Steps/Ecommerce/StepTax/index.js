import CommonLayout from '../../../../components/Layouts/Common';
import { useEffect } from '@wordpress/element';
import NewfoldLargeCard from '../../../../components/NewfoldLargeCard';
import { store as nfdOnboardingStore } from '../../../../store';
import { useDispatch } from '@wordpress/data';

import { VIEW_NAV_ECOMMERCE_STORE_INFO } from '../../../../../constants';

const StepTax = () => {
	const { setDrawerActiveView, setIsDrawerOpened, setIsSidebarOpened } =
		useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setIsSidebarOpened( false );
		setIsDrawerOpened( true );
		setDrawerActiveView( VIEW_NAV_ECOMMERCE_STORE_INFO );
	}, [] );

	return (
		<CommonLayout isBgPrimary isCentered>
			<NewfoldLargeCard />
		</CommonLayout>
	);
};

export default StepTax;
