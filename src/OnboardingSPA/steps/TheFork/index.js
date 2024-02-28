import CommonLayout from '../../components/Layouts/Common';

import { useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

import { store as nfdOnboardingStore } from '../../store';
import {
	FOOTER_SITEGEN,
	HEADER_SITEGEN,
	pluginDashboardPage,
} from '../../../constants';

import { DEFAULT_FLOW } from '../../data/flows/constants';
import HeadingWithSubHeading from '../../components/HeadingWithSubHeading/SiteGen/index';
import StartOptions from '../../components/StartOptions';
import getContents from './contents';
import SitegenAiStateHandler from '../../components/StateHandlers/SitegenAi';

const TheFork = () => {
	const { migrationUrl } = useSelect(
		( select ) => {
			return {
				migrationUrl: select( nfdOnboardingStore ).getMigrationUrl(),

			};
		}
	);

	const {
		setIsHeaderEnabled,
		setSidebarActiveView,
		setHeaderActiveView,
		setDrawerActiveView,
		setIsHeaderNavigationEnabled,
		setFooterActiveView,
		setHideFooterNav,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setHideFooterNav( true );
		setIsHeaderEnabled( false );
		setSidebarActiveView( false );
		setIsHeaderNavigationEnabled( false );
		setHeaderActiveView( HEADER_SITEGEN );
		setDrawerActiveView( false );
		setFooterActiveView( FOOTER_SITEGEN );
	} );

	const oldFlow = window.nfdOnboarding?.oldFlow
		? window.nfdOnboarding.oldFlow
		: DEFAULT_FLOW;

	const content = getContents();
	return (
		<SitegenAiStateHandler>
			<CommonLayout
				isCentered
				className="nfd-onboarding-step--site-gen__fork"
			>
				<HeadingWithSubHeading
					title={ content.heading }
					subtitle={ content.subheading }
				/>
				<StartOptions
					questionnaire={ content.questionnaire }
					oldFlow={ oldFlow }
					options={ content.options }
				/>
				<br />
				<br />
				{ migrationUrl && (
					<a
						className="nfd-onboarding-step--site-gen__fork__importsite"
						href={ migrationUrl }
						target={ '_blank' }
						rel={ 'noreferrer' }
					>
						{ content.importtext }
					</a>
				) }
				<a
					className="nfd-onboarding-step--site-gen__fork__exit"
					href={ pluginDashboardPage }
				>
					{ content.exitToWordPress }
				</a>
			</CommonLayout>
		</SitegenAiStateHandler>
	);
};

export default TheFork;
