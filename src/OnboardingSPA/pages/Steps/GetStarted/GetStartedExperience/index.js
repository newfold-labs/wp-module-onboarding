import CommonLayout from '../../../../components/Layouts/Common';
import NewfoldLargeCard from '../../../../components/NewfoldLargeCard';
import CardHeader from '../../../../components/CardHeader';
import NavCardButton from '../../../../components/Button/NavCardButton';
import NeedHelpTag from '../../../../components/NeedHelpTag';
import {
	SIDEBAR_LEARN_MORE,
	VIEW_NAV_GET_STARTED,
} from '../../../../../constants';
import { store as nfdOnboardingStore } from '../../../../store';
import { RadioControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import Animate from '../../../../components/Animate';
import getContents from './contents';
import { trackHiiveEvent } from '../../../../utils/analytics';

const GetStartedExperience = () => {
	const [ wpComfortLevel, setWpComfortLevel ] = useState( '0' );

	const { currentData } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	}, [] );

	const {
		setDrawerActiveView,
		setCurrentOnboardingData,
		setSidebarActiveView,
		setIsDrawerSuppressed,
		setIsHeaderNavigationEnabled,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setSidebarActiveView( SIDEBAR_LEARN_MORE );
		setIsDrawerSuppressed( true );
		setDrawerActiveView( VIEW_NAV_GET_STARTED );
		setIsHeaderNavigationEnabled( true );
	}, [] );

	async function getFlowData() {
		setWpComfortLevel( currentData.data.wpComfortLevel );
	}

	useEffect( () => {
		getFlowData();
	}, [] );

	const saveData = ( value ) => {
		setWpComfortLevel( value );
		const currentDataCopy = currentData;
		currentDataCopy.data.wpComfortLevel = value || '0';
		setCurrentOnboardingData( currentDataCopy );
		sendEvent( value );
	};

	const content = getContents();

	const sendEvent = ( expLevel ) => {
		const level = content.options.filter( ( option ) => {
			return option.value === expLevel;
		} )[ 0 ].label;

		trackHiiveEvent( 'experience_level_set', {
			label_key: 'experience_level',
			experience_level: level,
			page: window.location.href,
		} );
	};

	return (
		<CommonLayout isBgPrimary isCentered>
			<NewfoldLargeCard>
				<div className="nfd-onboarding-experience-step">
					<div className="nfd-card-heading center">
						<CardHeader
							heading={ content.heading }
							subHeading={ content.subheading }
							question={ content.question }
						/>
					</div>
					<Animate
						type={ 'fade-in-disabled' }
						after={ wpComfortLevel }
					>
						<RadioControl
							className={
								'nfd-onboarding-experience-step-tabs components-radio-control__input radio-control-main'
							}
							selected={ wpComfortLevel }
							options={ content.options.map( ( option ) => {
								return {
									label: option.label,
									value: option.value,
								};
							} ) }
							onChange={ ( value ) => saveData( value ) }
						/>
					</Animate>
					<NavCardButton
						text={ content.buttonText }
						disabled={ wpComfortLevel === '0' }
					/>
					<NeedHelpTag />
				</div>
			</NewfoldLargeCard>
		</CommonLayout>
	);
};

export default GetStartedExperience;
