import { VIEW_NAV_PRIMARY } from '../../../../constants';
import { store as nfdOnboardingStore } from '../../../store';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { useViewportMatch } from '@wordpress/compose';
import { useNavigate } from 'react-router-dom';

import { StepLoader } from '../../../components/Loaders';
import { generateChildTheme } from '../../../utils/api/themes';
import { StepErrorState } from '../../../components/ErrorState';

const StepChildTheme = () => {
	const { setIsDrawerOpened, setDrawerActiveView, setIsSidebarOpened, setIsDrawerSuppressed, setIsHeaderNavigationEnabled, setHeaderSidebarMenus } =
		useDispatch( nfdOnboardingStore );

	const navigate = useNavigate();
	
	const [ isGenerated, setIsGenerated ] = useState( false );
	const [ error, setError ] = useState( false );

	const { currentStep, nextStep } = useSelect(
		(select) => {
			return {
				currentStep: select(nfdOnboardingStore).getCurrentStep(),
				nextStep: select( nfdOnboardingStore ).getNextStep()
			};
		},
		[]
	);

	useEffect( async () => {
		setIsDrawerOpened( false );
		setIsSidebarOpened( false );
		setIsHeaderNavigationEnabled( false );
		setIsDrawerSuppressed( true );
		setIsHeaderNavigationEnabled( false );
		setDrawerActiveView( VIEW_NAV_PRIMARY );

		const response = await generateChildTheme();
		if ( response?.error ) {
			return setError(true);
		}
		navigate( nextStep.path );

	}, [] );
	return (
		<>
		{ ! error ?  <StepLoader title={ `Hang tight we're building your Bluehost store.` } subtitle={`We're building your unique design and installing useful tools.`} />: <StepErrorState title={`Hello`} subtitle={`World`} error={`some errror`} /> }
		</>
            
	);
};

export default StepChildTheme;
