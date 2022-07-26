import { Icon } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { store as nfdOnboardingStore } from '../../../../store';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';

import CommonLayout from '../../../../components/Layouts/Common';
import NewfoldLargeCard from '../../../../components/NewfoldLargeCard';
import CardHeader from '../../../../components/CardHeader';
import NavCardButton from '../../../../components/Button/NavCardButton';
import Tab from '../../../../components/Tab';
import tabContent from './tabContent.json';
import TabPanelHover from '../../../../components/TabPanelHover';
import { VIEW_NAV_GET_STARTED } from '../../../../../constants';


/**
 * component for rendering welcome step details.
 *
 * @returns
 */
const StepWelcome = () => {
	const location = useLocation();
	const { currentStep, nextStep, brandName } = useSelect(
		(select) => {
			return {
				currentStep: select(nfdOnboardingStore).getCurrentStep(),
				nextStep: select(nfdOnboardingStore).getNextStep(),
				brandName: select(nfdOnboardingStore).getNewfoldBrandName(),
			};
		},
		[location.pathname]
	);

	const {
		setDrawerActiveView,
		setIsDrawerOpened,
		setIsSidebarOpened,
		setIsDrawerSuppressed,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setIsDrawerOpened( false );
		setIsSidebarOpened( false );
		setIsDrawerSuppressed( true );
		setDrawerActiveView( VIEW_NAV_GET_STARTED );
	}, [] );

	const navigate = useNavigate();
	const handleClick = () => {
		navigate(nextStep.path);
	}
	return (
		<CommonLayout isBgPrimary isCentered>
			<NewfoldLargeCard>
				<div className='welcome-card'>
					<CardHeader
						heading={ __(currentStep.heading, 'wp-module-onboarding') }
						subHeading={ __(currentStep.subheading, 'wp-module-onboarding') + brandName + '.'} >
					</CardHeader>
					<TabPanelHover
						className="nfd-onboarding-overview__tab-panel"
						tabs={tabContent.tabs.map( ( tab ) => {
							return {
								name: __( tab.name , 'wp-module-onboarding'),
								title: __( tab.title , 'wp-module-onboarding'),
								content: <Tab
									title={ __(tab.title, 'wp-module-onboarding')}
									text={ __(tab.text, 'wp-module-onboarding')}
									imgType={tab.imgType}
									className="tab-data" />
							};
						} )}
					>
						{( tab ) => <div>{tab.content}</div>}

					</TabPanelHover>
					<NavCardButton text={ __("Start Setup", 'wp-module-onboarding') } handleClick={handleClick}></NavCardButton>
				</div>
			</NewfoldLargeCard>
		</CommonLayout>
	);
};

export default StepWelcome;
