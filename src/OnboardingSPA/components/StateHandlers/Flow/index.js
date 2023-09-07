import { useEffect } from '@wordpress/element';
import { useLocation } from 'react-router-dom';
import { useSelect, useDispatch } from '@wordpress/data';

import { store as nfdOnboardingStore } from '../../../store';
import { switchFlow } from '../../../utils/api/flow';
import { MAX_RETRIES_FLOW_SWITCH } from '../../../../constants';
import {
	getChapterFromId,
	getChaptersFromTopPriorityAndExperienceLevel,
	stateToStore,
} from '../../../chapters/utils';
import { resolveGetDataForFlow, getInitialChapters } from '../../../data/flows';
import {
	OnboardingEvent,
	trackOnboardingEvent,
} from '../../../utils/analytics/hiive';
import {
	ACTION_ONBOARDING_CHAPTER_COMPLETE,
	ACTION_ONBOARDING_CHAPTER_STARTED,
	ACTION_ONBOARDING_STARTED,
} from '../../../utils/analytics/hiive/constants';
import { ECOMMERCE_FLOW } from '../../../data/flows/constants';
import { getQueryParam } from '../../../utils';

const FlowStateHandler = ( { children } ) => {
	const location = useLocation();

	const {
		brandConfig,
		experienceLevel,
		topPriority,
		currentData,
		currentStep,
		lastChapter,
		firstStep,
	} = useSelect( ( select ) => {
		return {
			brandName: select( nfdOnboardingStore ).getNewfoldBrandName(),
			brandConfig: select( nfdOnboardingStore ).getNewfoldBrandConfig(),
			experienceLevel: select( nfdOnboardingStore ).getExperienceLevel(),
			topPriority: select( nfdOnboardingStore ).getTopPriority(),
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
			lastChapter: select( nfdOnboardingStore ).getCurrentChapter(),
			currentStep: select( nfdOnboardingStore ).getCurrentStep(),
			firstStep: select( nfdOnboardingStore ).getFirstStep(),
		};
	}, [] );

	const {
		updateAllSteps,
		updateRoutes,
		updateTopSteps,
		updateDesignRoutes,
		setCurrentOnboardingData,
		setActiveChapter,
	} = useDispatch( nfdOnboardingStore );

	const handleCommerceFlow = async ( flow, retries = 0 ) => {
		if ( retries >= MAX_RETRIES_FLOW_SWITCH ) {
			return;
		}
		const response = switchFlow( flow );
		if ( response?.error ) {
			retries = retries + 1;
			return handleCommerceFlow( flow, retries );
		}
	};

	const switchToNewFlow = async ( flow ) => {
		const enabledFlows = brandConfig?.enabled_flows ?? {};
		if ( ! ( flow in enabledFlows ) || enabledFlows[ flow ] !== true ) {
			return;
		}

		switch ( flow ) {
			case ECOMMERCE_FLOW:
				handleCommerceFlow( flow );
				break;
		}
	};

	const prioritizeFlow = () => {
		const currentFlow = window.nfdOnboarding.currentFlow;
		const initialChapters = getInitialChapters( currentFlow );
		const chapterQueryArg = getQueryParam( 'chapter' );

		let chapters;
		if ( chapterQueryArg ) {
			chapters = getChapterFromId( chapterQueryArg );
		} else {
			chapters = getChaptersFromTopPriorityAndExperienceLevel(
				initialChapters,
				topPriority,
				experienceLevel
			);
		}

		const getData = resolveGetDataForFlow( currentFlow );
		const data = getData( chapters, chapterQueryArg );

		currentData.data.chapters = stateToStore(
			initialChapters,
			currentData.data.chapters,
			currentStep
		);

		setCurrentOnboardingData( currentData );
		updateAllSteps( data.steps );
		updateTopSteps( data.topSteps );
		updateRoutes( data.routes );
		updateDesignRoutes( data.designRoutes );
	};

	const trackChapters = () => {
		if ( location.pathname === firstStep.path ) {
			trackOnboardingEvent(
				new OnboardingEvent( ACTION_ONBOARDING_STARTED )
			);
		}

		const currentChapter = currentStep?.chapter;

		if ( lastChapter !== currentChapter ) {
			if ( lastChapter ) {
				currentData.data.chapters[ lastChapter ].completed = true;
				trackOnboardingEvent(
					new OnboardingEvent(
						ACTION_ONBOARDING_CHAPTER_COMPLETE,
						currentChapter
					)
				);
			}

			if ( currentChapter ) {
				currentData.data.chapters[ currentChapter ].completed = false;
				trackOnboardingEvent(
					new OnboardingEvent(
						ACTION_ONBOARDING_CHAPTER_STARTED,
						currentChapter
					)
				);
			}

			setActiveChapter( currentChapter );
		}

		if ( currentChapter ) {
			currentData.data.chapters[ currentChapter ].lastStep =
				currentStep?.path ?? '';
		}
	}

	useEffect( () => {
		prioritizeFlow();
	}, [ experienceLevel, topPriority ] );

	useEffect( () => {
		trackChapters();
	}, [ currentStep ] );

	useEffect( () => {
		if ( window.nfdOnboarding?.newFlow ) {
			const flow = window.nfdOnboarding.newFlow;
			switchToNewFlow( flow );
			window.nfdOnboarding.newFlow = undefined;
		}
	}, [ location.pathname ] );

	return <>{ children }</>;
};

export default FlowStateHandler;
