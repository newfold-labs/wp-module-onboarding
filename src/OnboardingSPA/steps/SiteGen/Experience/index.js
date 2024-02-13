import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';

import getContents from './contents';
import { HEADER_SITEGEN } from '../../../../constants';
import { store as nfdOnboardingStore } from '../../../store';
import CommonLayout from '../../../components/Layouts/Common';
import CardWithOptions from '../../../components/CardWithOptions';
import SiteGenLoader from '../../../components/Loaders/SiteGenLoader';
import SitegenAiStateHandler from '../../../components/StateHandlers/SitegenAi';

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
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setHideFooterNav( true );
		setIsHeaderEnabled( true );
		setSidebarActiveView( false );
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
	};

	return (
		<SitegenAiStateHandler>
			<CommonLayout isCentered>
				<div className={ 'nfd-sg-experience-level' }>
					<SiteGenLoader
						watcher={ selection !== 0 ? true : false }
						autoNavigate={ true }
					/>
					<CardWithOptions
						title={ content.heading }
						options={ content.options }
						skip={ content.skip }
						selection={ selection }
						callback={ checkAndNavigate }
					/>
				</div>
			</CommonLayout>
		</SitegenAiStateHandler>
	);
};

export default SiteGenExperience;
