import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

import CommonLayout from '../../../components/Layouts/Common';
import NewfoldLargeCard from '../../../components/NewfoldLargeCard';
import CardHeader from '../../../components/CardHeader';
import NavCardButton from '../../../components/Button/NavCardButton';
import Tab from '../../../components/Tab';
import TabPanelHover from '../../../components/TabPanelHover';
import { store as nfdOnboardingStore } from '../../../store';

import { SIDEBAR_LEARN_MORE } from '../../../../constants';
import getContents from './contents';

const StepWhatNext = () => {
	const {
		setIsDrawerOpened,
		setSidebarActiveView,
		setIsHeaderNavigationEnabled,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setIsDrawerOpened( false );
		setSidebarActiveView( SIDEBAR_LEARN_MORE );
		setIsHeaderNavigationEnabled( true );
	}, [] );

	const { brandName } = useSelect( ( select ) => {
		return {
			brandName: select( nfdOnboardingStore ).getNewfoldBrandName(),
		};
	} );

	const content = getContents( brandName );

	return (
		<CommonLayout isCentered isBgPrimary>
			<NewfoldLargeCard>
				<div className="whatnext-card">
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

export default StepWhatNext;
