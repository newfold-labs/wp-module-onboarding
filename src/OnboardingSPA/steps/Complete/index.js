import { store as nfdOnboardingStore } from '../../store';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { useNavigate } from 'react-router-dom';

import getContents from './contents';
import { completeFlow } from '../../utils/api/flow';
import { StepLoader } from '../../components/Loaders';
import { StepErrorState } from '../../components/ErrorState';
import { THEME_STATUS_INIT } from '../../../constants';
import { DesignStateHandler } from '../../components/StateHandlers';

const StepComplete = () => {
	const {
		setIsDrawerSuppressed,
		setIsHeaderNavigationEnabled,
		setSidebarActiveView,
		updateThemeStatus,
		flushQueue,
	} = useDispatch( nfdOnboardingStore );

	const navigate = useNavigate();
	const [ isError, setIsError ] = useState( false );

	const { nextStep, brandName, isQueueEmpty, currentData } = useSelect(
		( select ) => {
			return {
				nextStep: select( nfdOnboardingStore ).getNextStep(),
				brandName: select( nfdOnboardingStore ).getNewfoldBrandName(),
				isQueueEmpty: select( nfdOnboardingStore ).isQueueEmpty(),
				currentData:
					select( nfdOnboardingStore ).getCurrentOnboardingData(),
			};
		},
		[]
	);

	const contents = getContents( brandName );

	const checkFlowComplete = async () => {
		if ( true === currentData?.data?.comingSoon ) {
			await window.NewfoldRuntime.comingSoon.enable();
		}
		await Promise.all( [ completeFlowRequest() ] ).then( ( values ) =>
			values.forEach( ( value ) => {
				// If any Request returns False then Show Error
				if ( ! value ) {
					setIsHeaderNavigationEnabled( true );
					return setIsError( true );
				}
			} )
		);

		navigate( nextStep.path );
		updateThemeStatus( THEME_STATUS_INIT );
	};

	async function completeFlowRequest() {
		const flowCompletionResponse = await completeFlow();
		if ( flowCompletionResponse?.error ) {
			return false;
		}
		return true;
	}

	const setNavigationState = () => {
		setIsHeaderNavigationEnabled( false );
		setIsDrawerSuppressed( true );
		setSidebarActiveView( false );
	};

	useEffect( () => {
		if ( isQueueEmpty ) {
			checkFlowComplete();
		} else {
			flushQueue();
		}
	}, [ isQueueEmpty ] );

	useEffect( () => {
		setNavigationState();
	}, [] );

	return (
		<DesignStateHandler
			navigationStateCallback={ setNavigationState }
			refresh={ false }
		>
			{ isError ? (
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
		</DesignStateHandler>
	);
};

export default StepComplete;
