import CommonLayout from '../../components/Layouts/Common';

import { useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

import { store as nfdOnboardingStore } from '../../store';
import { HEADER_SITEGEN } from '../../../constants';

import HeadingWithSubHeading from '../../components/HeadingWithSubHeading/SiteGen/index';
import StartOptions from '../../components/StartOptions';
import getContents from './contents';

const TheFork = () => {
	const {
		setIsHeaderEnabled,
		setSidebarActiveView,
		setHeaderActiveView,
		setDrawerActiveView,
		setIsHeaderNavigationEnabled,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setIsHeaderEnabled( false );
		setSidebarActiveView( false );
		setIsHeaderNavigationEnabled( false );
		setHeaderActiveView( HEADER_SITEGEN );
		setDrawerActiveView( false );
	} );

	const oldFlow = window.nfdOnboarding?.oldFlow
		? window.nfdOnboarding.oldFlow
		: window.nfdOnboarding.currentFlow;

	const { brandName } = useSelect( ( select ) => {
		return {
			brandName: select( nfdOnboardingStore ).getNewfoldBrandName(),
		};
	} );
	const content = getContents();
	return (
		<CommonLayout
			isCentered
			className="nfd-onboarding-step--site-gen__fork"
		>
			<HeadingWithSubHeading
				title={ content.heading }
				subtitle={ content.subheading }
				brandName={ brandName }
			/>
			<StartOptions
				questionnaire={ content.questionnaire }
				oldFlow={ oldFlow }
			/>
			<br />
			<br />
			<a
				className="nfd-onboarding-step--site-gen__fork__importsite"
				href={ content.importlink }
			>
				{ content.importtext }
			</a>
		</CommonLayout>
	);
};

export default TheFork;
