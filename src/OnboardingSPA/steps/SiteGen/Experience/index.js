import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';

import getContents from './contents';
import { HEADER_SITEGEN } from '../../../../constants';
import { store as nfdOnboardingStore } from '../../../store';
import CommonLayout from '../../../components/Layouts/Common';
import CardWithOptions from '../../../components/CardWithOptions';
import SiteGenLoader from '../../../components/Loaders/SiteGenLoader';
import SitegenAiStateHandler from '../../../components/StateHandlers/SitegenAi';
import {
	OnboardingEvent,
	trackOnboardingEvent,
} from '../../../utils/analytics/hiive';
import { ACTION_EXPERIENCE_LEVEL_SET } from '../../../utils/analytics/hiive/constants';
import { SITEGEN_FLOW } from '../../../data/flows/constants';

const SiteGenExperience = () => {
	const content = getContents();
	// Index of the selection user makes
	const [ selection, setSelection ] = useState( 0 );

	const { currentData } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	} );

	const {
		setIsHeaderEnabled,
		setSidebarActiveView,
		setHeaderActiveView,
		setDrawerActiveView,
		setHideFooterNav,
		setCurrentOnboardingData,
		setIsHeaderNavigationEnabled,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setHideFooterNav( true );
		setIsHeaderEnabled( true );
		setSidebarActiveView( false );
		setIsHeaderNavigationEnabled( false );
		setHeaderActiveView( HEADER_SITEGEN );
		setDrawerActiveView( false );

		if ( currentData.sitegen.experience?.level ) {
			setSelection( currentData.sitegen.experience.level );
		}
	} );

	const checkAndNavigate = ( idx ) => {
		// 0 - Not Selected
		// 1-3 Options
		// -1 Skip
		setSelection( idx );
		currentData.sitegen.experience.level = idx;
		setCurrentOnboardingData( currentData );
		let experienceForEvent = false;
		switch ( idx ) {
			case 1:
				experienceForEvent = 'novice';
				break;
			case 2:
				experienceForEvent = 'intermediate';
				break;
			case 3:
				experienceForEvent = 'expert';
				break;
		}

		if ( experienceForEvent ) {
			trackOnboardingEvent(
				new OnboardingEvent(
					ACTION_EXPERIENCE_LEVEL_SET,
					experienceForEvent,
					{
						source: SITEGEN_FLOW,
					}
				)
			);
		}
	};

	return (
		<SitegenAiStateHandler>
			<CommonLayout isCentered>
				<div className={ 'nfd-sg-experience-level' }>
					<SiteGenLoader
						watcher={ selection !== 0 ? true : false }
						customNavPercentage={ 100 }
					/>
					<CardWithOptions
						title={ content.heading }
						options={ content.options }
						selection={ selection }
						callback={ checkAndNavigate }
					/>
				</div>
			</CommonLayout>
		</SitegenAiStateHandler>
	);
};

export default SiteGenExperience;
