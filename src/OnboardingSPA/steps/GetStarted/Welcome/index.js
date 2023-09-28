import { store as nfdOnboardingStore } from '../../../store';
import { useLocation } from 'react-router-dom';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { chevronRight, external } from '@wordpress/icons';

import CommonLayout from '../../../components/Layouts/Common';
import NewfoldLargeCard from '../../../components/NewfoldLargeCard';
import CardHeader from '../../../components/CardHeader';
import NavCardButton from '../../../components/Button/NavCardButton';
import Tab from '../../../components/Tab';
import TabPanelHover from '../../../components/TabPanelHover';
import {
	VIEW_NAV_GET_STARTED,
	SIDEBAR_LEARN_MORE,
} from '../../../../constants';
import getContents from './contents';
import ButtonWhite from '../../../components/Button/ButtonWhite';

const StepWelcome = () => {
	const location = useLocation();
	const { brandName, migrationUrl } = useSelect(
		( select ) => {
			return {
				brandName: select( nfdOnboardingStore ).getNewfoldBrandName(),
				migrationUrl: select( nfdOnboardingStore ).getMigrationUrl(),
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
					<div className="nfd-onboarding-overview__buttons">
						{ migrationUrl && (
							<ButtonWhite
								className="nfd-onboarding-overview__buttons--white"
								text={ content.migrateButtonText }
								icon={ external }
								onClick={ () =>
									window.open( migrationUrl, '_blank' )
								}
							/>
						) }
						<NavCardButton
							className="nfd-onboarding-overview__buttons--background"
							text={ content.startButtonText }
							icon={ chevronRight }
						></NavCardButton>
					</div>
				</div>
			</NewfoldLargeCard>
		</CommonLayout>
	);
};

export default StepWelcome;
