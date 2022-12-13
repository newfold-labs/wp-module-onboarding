import CommonLayout from '../../../components/Layouts/Common';
import StepOverview from '../../../components/StepOverview';
import { store as nfdOnboardingStore } from '../../../store';
import { useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import NewfoldLargeCard from '../../../components/NewfoldLargeCard';
import { __ } from '@wordpress/i18n';
import {translations} from '../../../utils/locales/translations';

import CardHeader from '../../../components/CardHeader';
import NavCardButton from '../../../components/Button/NavCardButton';

import Tab from '../../../components/Tab';
import tabContent from './tabContent.json';
import TabPanelHover from '../../../components/TabPanelHover';

const StepWhatNext = () => {
	const { setIsDrawerOpened, setIsSidebarOpened, setIsHeaderNavigationEnabled } =
		useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setIsDrawerOpened( false );
		setIsSidebarOpened( false );
		setIsHeaderNavigationEnabled( true );
	}, [] );

	return (
		<CommonLayout isCentered isBgPrimary>
						<NewfoldLargeCard>
				<div className='whatnext-card'>
					<CardHeader
						heading = { 'Nice work: Your site is ready 🎉' }
						subHeading={ 'Move-in day begins! Let us know if you\'d like a hand.' } >
					</CardHeader>
					<TabPanelHover
						className="nfd-onboarding-overview__tab-panel"
						tabs={tabContent.tabs.map( ( tab ) => {
							return {
								name: __( tab.name , 'wp-module-onboarding'),
								title: __( tab.title , 'wp-module-onboarding'),
								content: <Tab
									title={ __(tab.subtitle, 'wp-module-onboarding')}
									text={ sprintf( __(tab.text, 'wp-module-onboarding'), translations('site'))}
									imgType={tab.imgType}
									className="tab-data" />
							};
						} )}
					>
						{( tab ) => <div>{tab.content}</div>}

					</TabPanelHover>
					<NavCardButton text={ __("Complete Setup", 'wp-module-onboarding') } ></NavCardButton>
				</div>
			</NewfoldLargeCard>

		</CommonLayout>
	);
};

export default StepWhatNext;
