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
import { RadioCtrlStateHandler } from '../../../../components/RadioControl';

/**
 * Get Started: WordPress Experience Comfort Level.
 *
 * @return
 */

const GetStartedExperience = () => {
	const [ isLoaded, setisLoaded ] = useState( false );
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
							subHeading={ __(
								content.aboutYouTag,
								'wp-module-onboarding'
							) }
							question={ currentStep.subheading }
						/>
					</div>
					<RadioCtrlStateHandler
						watch={ wpComfortLevel }
						data={ content.options }
					>
						<RadioControl
							className={
								'nfd-onboarding-experience-step-tabs components-radio-control__input radio-control-main'
							}
							selected={ wpComfortLevel }
							options={ content.options.map(
								( option ) => {
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
								}
							)}
							onChange={( value ) => setWpComfortLevel( value )}
						/>
					</RadioCtrlStateHandler>
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
