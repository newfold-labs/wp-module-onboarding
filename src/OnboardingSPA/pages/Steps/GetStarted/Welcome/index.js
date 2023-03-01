import { __, sprintf } from '@wordpress/i18n';
import { store as nfdOnboardingStore } from '../../../../store';
import { useLocation } from 'react-router-dom';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import {translations} from '../../../../utils/locales/translations';

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
	const { currentStep, flowData, brandName } = useSelect(
		(select) => {
			return {
				currentStep: select(nfdOnboardingStore).getCurrentStep(),
				flowData: select(nfdOnboardingStore).getOnboardingFlowData(),
				brandName: select(nfdOnboardingStore).getNewfoldBrandName(),
			};
		},
		[location.pathname]
	);
	const {
		flushQueue,
		setDrawerActiveView,
		setIsSidebarOpened,
		setIsDrawerSuppressed,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		flushQueue(flowData);
		setIsSidebarOpened( false );
		setIsDrawerSuppressed( true );
		setDrawerActiveView( VIEW_NAV_GET_STARTED );
	}, [] );

	return (
		<CommonLayout isBgPrimary isCentered>
			<NewfoldLargeCard>
				<div className='welcome-card'>
					<CardHeader
						heading = { currentStep?.heading }
						subHeading={ currentStep?.subheading + brandName + '.'} >
					</CardHeader>
					<TabPanelHover
						className="nfd-onboarding-overview__tab-panel"
						tabs={tabContent.tabs.map( ( tab ) => {
							return {
								name: __( tab.name , 'wp-module-onboarding'),
								title: __( tab.title , 'wp-module-onboarding'),
								content: <Tab
									title={ __(tab.title, 'wp-module-onboarding')}
									text={ sprintf( __(tab.text, 'wp-module-onboarding'), translations('site'))}
									imgType={tab.imgType}
									className="tab-data" />
							};
						} )}
					>
						{( tab ) => <div>{tab.content}</div>}

					</TabPanelHover>
					<NavCardButton text={ __("Start Setup", 'wp-module-onboarding') } ></NavCardButton>
				</div>
			</NewfoldLargeCard>
		</CommonLayout>
	);
};

export default StepWelcome;
