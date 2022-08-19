import CommonLayout from '../../../../components/Layouts/Common';
import NewfoldLargeCard from '../../../../components/NewfoldLargeCard';
import CardHeader from '../../../../components/CardHeader';
import NavCardButton from '../../../../components/Button/NavCardButton';
import NeedHelpTag from '../../../../components/NeedHelpTag';
import { VIEW_NAV_GET_STARTED } from '../../../../../constants';
import { store as nfdOnboardingStore } from '../../../../store';
import content from './content.json';
import { FLOW_SYNC } from '../../../../utils/api-queuer/constants';

import { RadioControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Get Started: WordPress Experience Comfort Level.
 *
 * @return
 */

const GetStartedExperience = () => {
	const [ isLoaded, setisLoaded ] = useState( false );
	const [ wpComfortLevel, setWpComfortLevel ] = useState( '0' );

	const { enqueueRequest, flushQueue, setCurrentOnboardingData } = useDispatch( nfdOnboardingStore );

	const { currentData, currentStep } = useSelect( ( select ) => {
		return {
			currentData: select(nfdOnboardingStore).getCurrentOnboardingData(),
			currentStep: select(nfdOnboardingStore).getCurrentStep(),
		};
	}, [] );

	const {
		setDrawerActiveView,
		setIsSidebarOpened,
		setIsDrawerSuppressed,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		flushQueue(currentData);
		enqueueRequest(FLOW_SYNC);
		setIsSidebarOpened( false );
		setIsDrawerSuppressed( true );
		setDrawerActiveView( VIEW_NAV_GET_STARTED );
	}, [] );

	useEffect( () => {
		async function getFlowData() {
			setWpComfortLevel( currentData.data.wpComfortLevel );
			setisLoaded( true );
		}
		if ( ! isLoaded ) {
			getFlowData();
		}
	}, [ isLoaded ] );

	useEffect( () => {
		const saveData = async () => {
			const currentDataCopy = currentData;
			currentDataCopy.data.wpComfortLevel = wpComfortLevel || '0';
			setCurrentOnboardingData( currentDataCopy );
		};
		if ( isLoaded ) saveData();
	}, [ wpComfortLevel ] );

	return (
		<CommonLayout isBgPrimary isCentered>
			<NewfoldLargeCard>
				<div className="nfd-onboarding-experience-step">
					<div className="nfd-card-heading center">
						<CardHeader
							heading={ currentStep.heading }
							subHeading={ __(content.aboutYouTag, 'wp-module-onboarding') }
							question={ currentStep.subheading }
						/>
					</div>
					<RadioControl
						className="nfd-onboarding-experience-step-tabs components-radio-control__input"
						selected={ wpComfortLevel }
						options={ content.options.map( ( option ) => {
							return {
								label: __(option.content, 'wp-module-onboarding' ),
								value: __(option.value, 'wp-module-onboarding' ),
							};
						} ) }
						onChange={ ( value ) => setWpComfortLevel( value ) }
					/>
					<div>
						<NavCardButton
							text={__(content.buttonText, 'wp-module-onboarding')}
							disabled={wpComfortLevel == '0'}
						/>
						<NeedHelpTag />
					</div>
				</div>
			</NewfoldLargeCard>
		</CommonLayout>
	);
};

export default GetStartedExperience;
