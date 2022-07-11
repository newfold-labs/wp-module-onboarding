import { Icon } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { store as nfdOnboardingStore } from '../../../../store';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelect } from '@wordpress/data';
import { TabPanel } from '@wordpress/components';

import CommonLayout from '../../../../components/Layouts/Common';
import NewfoldLargeCard from '../../../../components/NewfoldLargeCard';
import CardHeader from '../../../../components/CardHeader';
import Button from '../../../../components/Button';
import Tab from '../../../../components/Tab';
import tabContent from './tabContent.json';


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
					<CardHeader heading={currentStep.heading} subHeading={currentStep.subheading + brandName.replace(/\b(\w)/g, s => s.toUpperCase())} ></CardHeader>
					<TabPanel
						className="nfd-onboarding-overview__tab-panel"
						tabs={[
							{
								name: tabContent.tab1.name,
								title: tabContent.tab1.title,
								className: tabContent.tab1.className,
								content: <Tab
									title={tabContent.tab1.title}
									text={tabContent.tab1.text}
									imgType={tabContent.tab1.imgType}
									className={tabContent.tab1.className} />
							},
							{
								name: tabContent.tab2.name,
								title: tabContent.tab2.title,
								className: tabContent.tab2.className,
								content: <Tab
									title={tabContent.tab2.title}
									text={tabContent.tab2.text}
									imgType={tabContent.tab2.imgType}
									className={tabContent.tab2.className} />
							},
							{
								name: tabContent.tab3.name,
								title: tabContent.tab3.title,
								className: tabContent.tab3.className,
								content: <Tab
									title={tabContent.tab3.title}
									text={tabContent.tab3.text}
									imgType={tabContent.tab3.imgType}
									className={tabContent.tab3.className} />
							},
						]}
					>
						{( tab ) => <div>{tab.content}</div>}

					</TabPanel>
					<Button text={"Start Setup"} handleClick={handleClick}></Button>
				</div>
			</NewfoldLargeCard>
		</CommonLayout>
	);
};

export default StepWelcome;
