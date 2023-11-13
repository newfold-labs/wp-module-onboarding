import CommonLayout from '../../components/Layouts/Common';

import { useEffect } from '@wordpress/element';

import { useSelect, useDispatch } from '@wordpress/data';
import { store as nfdOnboardingStore } from '../../store';
import { HEADER_SITEGEN } from '../../../constants';

import { useNavigate } from 'react-router-dom';

import { Button } from '@wordpress/components';
import { SITEGEN_FLOW } from '../../data/flows/constants';

import { resolveGetDataForFlow } from '../../data/flows';
import { validateFlow } from '../../data/flows/utils';

import HeadingWithSubHeading from './headingwithsubheading';
import StartOptions from './startoptions';
import ImportSite from './importsite';
import getContents from './contents';

const TheFork = () => {
	

	const {
		setIsHeaderEnabled,
		setSidebarActiveView,
		setHeaderActiveView,
		setDrawerActiveView,
		setIsHeaderNavigationEnabled,
		updateAllSteps,
		updateTopSteps,
		updateRoutes,
		updateDesignRoutes,
		updateInitialize,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setIsHeaderEnabled( false );
		setSidebarActiveView( false );
		setIsHeaderNavigationEnabled( false );
		setHeaderActiveView( HEADER_SITEGEN );
		setDrawerActiveView( false );
	} );

	const oldFlow = window.nfdOnboarding?.oldFlow
		? window.nfdOnboarding.oldFlow
		: window.nfdOnboarding.currentFlow;

	const content = getContents();
	return (
		<CommonLayout
			isCentered
			className="nfd-onboarding-step--site-gen__fork"
		>
			<HeadingWithSubHeading
				title={ content.heading }
				subtitle={ content.subheading }
			/>
			<StartOptions
				questionnaire={ content.questionnaire }
				options={ content.options }
				oldFlow={ oldFlow }
			/>
			<ImportSite
				importtext={ content.importtext }
				importlink={ content.importlink }
			/>
			
			
		</CommonLayout>
	);
};

export default TheFork;
