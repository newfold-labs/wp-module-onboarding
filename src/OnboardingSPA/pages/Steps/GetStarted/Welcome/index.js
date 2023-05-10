import { store as nfdOnboardingStore } from '../../../../store';
import { useLocation } from 'react-router-dom';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

import CommonLayout from '../../../../components/Layouts/Common';
import NewfoldLargeCard from '../../../../components/NewfoldLargeCard';
import CardHeader from '../../../../components/CardHeader';
import NavCardButton from '../../../../components/Button/NavCardButton';
import Tab from '../../../../components/Tab';
import TabPanelHover from '../../../../components/TabPanelHover';
import {
	VIEW_NAV_GET_STARTED,
	SIDEBAR_LEARN_MORE,
} from '../../../../../constants';
import getContents from './contents';

const StepWelcome = () => {
	const location = useLocation();
	const { brandName } = useSelect(
		( select ) => {
			return {
				brandName: select( nfdOnboardingStore ).getNewfoldBrandName(),
			};
		},
		[ location.pathname ]
	);
	const {
		setDrawerActiveView,
		setSidebarActiveView,
		setIsDrawerSuppressed,
		setIsHeaderNavigationEnabled,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setSidebarActiveView( SIDEBAR_LEARN_MORE );
		setIsHeaderNavigationEnabled( true );
		setIsDrawerSuppressed( true );
		setDrawerActiveView( VIEW_NAV_GET_STARTED );
	}, [] );

	const content = getContents( brandName );

	return (
		<CommonLayout isBgPrimary isCentered>
			<NewfoldLargeCard>
				<div className="welcome-card">
					<CardHeader
						heading={ content.heading }
						subHeading={ content.subheading }
					></CardHeader>
					<TabPanelHover
						className="nfd-onboarding-overview__tab-panel"
						tabs={ content.tabs.map( ( tab ) => {
							return {
								name: tab.name,
								title: tab.title,
								content: (
									<Tab
										title={ tab.subtitle }
										text={ tab.text }
										imgType={ tab.imgType }
										animationName={ tab.animationName }
										className="tab-data"
									/>
								),
							};
						} ) }
					>
						{ ( tab ) => <div>{ tab.content }</div> }
					</TabPanelHover>
					<NavCardButton text={ content.buttonText }></NavCardButton>
				</div>
			</NewfoldLargeCard>
		</CommonLayout>
	);
};

export default StepWelcome;
