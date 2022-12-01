import { store as nfdOnboardingStore } from '../../../store';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { useNavigate } from 'react-router-dom';

import { StepLoader } from '../../../components/Loaders';
import { completeFlow } from '../../../utils/api/flow';
import { StepErrorState } from '../../../components/ErrorState';
import getContents from './contents';

const StepComplete = () => {
	const { setIsDrawerSuppressed, setIsHeaderNavigationEnabled } =
		useDispatch( nfdOnboardingStore );

	const navigate = useNavigate();
	const [ isCompleted, setIsCompleted ] = useState( false );

	const { nextStep, brandName } = useSelect( ( select ) => {
		return {
			nextStep: select( nfdOnboardingStore ).getNextStep(),
			brandName: select( nfdOnboardingStore ).getNewfoldBrandName(),
		};
	}, [] );

	const contents = getContents( brandName );

	useEffect( async () => {
		setIsHeaderNavigationEnabled( false );
		setIsDrawerSuppressed( true );

		const flowCompletionResponse = await completeFlow();
		if ( flowCompletionResponse?.error ) {
			return setIsCompleted( false );
		}
		navigate( nextStep.path );
	}, [] );
	return (
		<>
			{ isCompleted ? (
				<StepErrorState
					title={ contents.errorState.title }
					subtitle={ contents.errorState.subtitle }
					error={ contents.errorState.error }
				/>
			) : (
				<StepLoader
					title={ contents.loader.title }
					subtitle={ contents.loader.subtitle }
				/>
			) }
		</>
	);
};

export default StepComplete;
