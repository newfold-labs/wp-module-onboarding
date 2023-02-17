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
import content from './content.json';
import { RadioControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import Animate from '../../../../components/Animate';

/**
 * Get Started: WordPress Experience Comfort Level.
 *
 * @return
 */

const GetStartedExperience = () => {
	const [ wpComfortLevel, setWpComfortLevel ] = useState( '0' );

	const { currentData, currentStep } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
			currentStep: select( nfdOnboardingStore ).getCurrentStep(),
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

	useEffect( () => {
		async function getFlowData() {
			setWpComfortLevel( currentData.data.wpComfortLevel );
		}
		getFlowData();
	}, [ ] );

	const saveData = ( value ) => {
		setWpComfortLevel( value );
		const currentDataCopy = currentData;
		currentDataCopy.data.wpComfortLevel = value || '0';
		setCurrentOnboardingData( currentDataCopy );
	};

	return (
		<CommonLayout isBgPrimary isCentered>
			<NewfoldLargeCard>
				<div className="nfd-onboarding-experience-step">
					<div className="nfd-card-heading center">
						<CardHeader
							heading={ currentStep.heading }
							subHeading={ __(
								content.aboutYouTag,
								'wp-module-onboarding'
							) }
							question={ currentStep.subheading }
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
									label: __(
										option.content,
										'wp-module-onboarding'
									),
									value: __(
										option.value,
										'wp-module-onboarding'
									),
								};
							} ) }
							onChange={ ( value ) => saveData( value ) }
						/>
					</Animate>
					<NavCardButton
						text={ __(
							content.buttonText,
							'wp-module-onboarding'
						) }
						disabled={ wpComfortLevel == '0' }
					/>
					<NeedHelpTag />
				</div>
			</NewfoldLargeCard>
		</CommonLayout>
	);
};

export default GetStartedExperience;
