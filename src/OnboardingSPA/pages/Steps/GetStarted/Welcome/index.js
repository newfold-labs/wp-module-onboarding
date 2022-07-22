import { Icon } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { store as nfdOnboardingStore } from '../../../../store';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelect } from '@wordpress/data';

import CommonLayout from '../../../../components/Layouts/Common';
import NewfoldLargeCard from '../../../../components/NewfoldLargeCard';
import CardHeader from '../../../../components/CardHeader';
import NavCardButton from '../../../../components/Button/NavCardButton';
import Tab from '../../../../components/Tab';
import tabContent from './tabContent.json';
import TabPanelHover from '../../../../components/TabPanelHover';


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
				brandName: select(nfdOnboardingStore).getNewfoldBrand(),
			};
		},
		[location.pathname]
	);

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
						subHeading={ __(currentStep.subheading, 'wp-module-onboarding') + brandName.replace(/\b(\w)/g, s => s.toUpperCase()) + '.'} >
					</CardHeader>
					<TabPanelHover
						className="nfd-onboarding-overview__tab-panel"
						tabs={[
							{
								name: __(tabContent.tab1.name, 'wp-module-onboarding'),
								title: __(tabContent.tab1.title, 'wp-module-onboarding'),
								content: <Tab
									title={ __(tabContent.tab1.title, 'wp-module-onboarding')}
									text={ __(tabContent.tab1.text, 'wp-module-onboarding')}
									imgType={tabContent.tab1.imgType}
									className={tabContent.tab1.className} />
							},
							{
								name: __(tabContent.tab2.name, 'wp-module-onboarding'),
								title: __(tabContent.tab2.title, 'wp-module-onboarding'),
								content: <Tab
									title={__(tabContent.tab2.title, 'wp-module-onboarding')}
									text={ __(tabContent.tab2.text, 'wp-module-onboarding') }
									imgType={tabContent.tab2.imgType}
									className={tabContent.tab2.className} />
							},
							{
								name: __(tabContent.tab3.name, 'wp-module-onboarding'),
								title: __(tabContent.tab3.title, 'wp-module-onboarding'),
								content: <Tab
									title={ __(tabContent.tab3.title, 'wp-module-onboarding') }
									text={ __(tabContent.tab3.text, 'wp-module-onboarding') }
									imgType={tabContent.tab3.imgType}
									className={tabContent.tab3.className} />
							},
						]}
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
