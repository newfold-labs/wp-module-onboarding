import { useNavigate } from 'react-router-dom';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';

import getContents from './contents';
import { HEADER_SITEGEN } from '../../../../constants';
import { store as nfdOnboardingStore } from '../../../store';
import CommonLayout from '../../../components/Layouts/Common';
import CardWithOptions from '../../../components/CardWithOptions';
import SiteGenLoader from '../../../components/Loaders/SiteGenLoader';

const SiteGenExperience = () => {
	const navigate = useNavigate();
	const content = getContents();
	// Index of the selection user makes
	/* eslint-disable no-unused-vars */
	const [ selection, setSelection ] = useState();

	const { currentData, nextStep } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
			nextStep: select( nfdOnboardingStore ).getNextStep(),
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
		// 1-2 Options
		// -1 Skip
		setSelection( idx );
		currentData.sitegen.experience.level = idx;
		setCurrentOnboardingData( currentData );
		if ( nextStep ) {
			navigate( nextStep.path );
		}
	};

	return (
		<CommonLayout isCentered>
			<div className={ 'nfd-sg-experience-level' }>
				<SiteGenLoader />
				<CardWithOptions
					title={ content.heading }
					options={ content.options }
					skip={ content.skip }
					callback={ checkAndNavigate }
				/>
			</div>
		</CommonLayout>
	);
};

export default SiteGenExperience;
