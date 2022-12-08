import { store as nfdOnboardingStore } from '../../../store';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { useNavigate } from 'react-router-dom';

import getContents from './contents';
import { completeFlow } from '../../../utils/api/flow';
import { StepLoader } from '../../../components/Loaders';
import { setSiteFeatures } from '../../../utils/api/plugins';
import { StepErrorState } from '../../../components/ErrorState';
import { DesignStateHandler } from '../../../components/StateHandlers';

const StepComplete = () => {
	const { setIsDrawerSuppressed, setIsHeaderNavigationEnabled } =
		useDispatch( nfdOnboardingStore );

	const navigate = useNavigate();
	const [ isError, setIsError ] = useState( false );

	const { nextStep, brandName, currentData, pluginInstallHash } = useSelect(
		( select ) => {
			return {
				nextStep: select( nfdOnboardingStore ).getNextStep(),
				brandName: select( nfdOnboardingStore ).getNewfoldBrandName(),
				currentData:
					select( nfdOnboardingStore ).getCurrentOnboardingData(),
				pluginInstallHash:
					select( nfdOnboardingStore ).getPluginInstallHash(),
			};
		},
		[]
	);

	const contents = getContents( brandName );

	const checkFlowComplete = async () => {
		const flowCompletionResponse = await completeFlow();
		if ( flowCompletionResponse?.error ) {
			setIsHeaderNavigationEnabled( true );
			return setIsError( true );
		}
		if ( pluginInstallHash && currentData?.data?.siteFeatures ) {
			const siteFeaturesResponse = await setSiteFeatures(
				pluginInstallHash,
				{ plugins: currentData?.data?.siteFeatures }
			);
			if ( siteFeaturesResponse?.error ) {
				setIsHeaderNavigationEnabled( true );
				return setIsError( true );
			}
		}
		navigate( nextStep.path );
	};

	useEffect( () => {
		setIsHeaderNavigationEnabled( false );
		setIsDrawerSuppressed( true );
		checkFlowComplete();
	}, [] );
	return (
		<DesignStateHandler>
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
