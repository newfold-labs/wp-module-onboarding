import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { useNavigate } from 'react-router-dom';
import { Icon, chevronRight } from '@wordpress/icons';

import { store as nfdOnboardingStore } from '../../../../store';
import CardHeader from '../../../CardHeader';
import CommonLayout from '../../../Layouts/Common';
import NewfoldLargeCard from '../../../NewfoldLargeCard';
import getContents from './contents';
import ButtonBlue from '../../../Button/ButtonBlue';
import ButtonWhite from '../../../Button/ButtonWhite';
import { activateInitialPlugins } from '../../../../utils/api/plugins';
import {
	OnboardingEvent,
	sendOnboardingEvent,
} from '../../../../utils/analytics/hiive';
import { pluginDashboardPage, wpAdminPage } from '../../../../../constants';
import { setFlow } from '../../../../utils/api/flow';
import { ACTION_ONBOARDING_COMPLETE } from '../../../../utils/analytics/hiive/constants';
import { ECOMMERCE_FLOW } from '../../../../data/flows/constants';

const ChapterInterstitialLoader = () => {
	let [ countdown, setCountdown ] = useState( 15 );
	const [ countdownInterval, setCountdownInterval ] = useState();
	const navigate = useNavigate();
	const { setIsDrawerSuppressed, setSidebarActiveView } =
		useDispatch( nfdOnboardingStore );

	async function saveDataAndExit() {
		if ( currentData ) {
			currentData.isComplete = new Date().getTime();
			setFlow( currentData );
		}
		//Redirect to Admin Page for normal customers
		// and Bluehost Dashboard for ecommerce customers
		const exitLink = exitToWordpressForEcommerce()
			? pluginDashboardPage
			: wpAdminPage;
		activateInitialPlugins();
		sendOnboardingEvent(
			new OnboardingEvent( ACTION_ONBOARDING_COMPLETE )
		);
		window.location.replace( exitLink );
	}

	const exitToWordpressForEcommerce = () => {
		if ( window.nfdOnboarding.currentFlow === ECOMMERCE_FLOW ) {
			return true;
		}
		return false;
	};

	useEffect( () => {
		if ( 0 === countdown ) {
			clearInterval( countdownInterval );
			saveDataAndExit();
		}
	}, [ countdown ] );

	useEffect( () => {
		const interval = setInterval( () => {
			countdown -= 1;
			setCountdown( countdown );
		}, 1000 );
		setCountdownInterval( interval );
		setIsDrawerSuppressed( true );
		setSidebarActiveView( false );
	}, [] );
	const { brandName, nextStep, currentData } = useSelect( ( select ) => {
		return {
			brandName: select( nfdOnboardingStore ).getNewfoldBrandName(),
			nextStep: select( nfdOnboardingStore ).getNextStep(),
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	} );
	const content = getContents( brandName );
	return (
		<CommonLayout isBgPrimary isCentered>
			<NewfoldLargeCard className="chapter-interstitial">
				<CardHeader
					heading={ content.heading }
					subHeading={ content.subheading }
				/>
				<div className="chapter-interstitial__content">
					<div className="chapter-interstitial__content__column-left">
						<h2 className="chapter-interstitial__content__column-left__heading">
							{ content.content.heading }
						</h2>
						<p className="chapter-interstitial__content__column-left__question1">
							{ content.content.question1 }
						</p>
						<p className="chapter-interstitial__content__column-left__question2">
							{ content.content.question2 }
						</p>
						<h2 className="chapter-interstitial__content__column-left__heading">
							{ content.content.redirectMessage }
							<br /> { countdown }
						</h2>
					</div>
					<div className="chapter-interstitial__content__column-right"></div>
				</div>
				<div className="chapter-interstitial__buttons">
					<ButtonBlue
						onClick={ () => saveDataAndExit() }
						text={ content.buttons.button1.text }
						className={ 'chapter-interstitial__buttons--blue' }
					/>
					<ButtonWhite
						onClick={ () => navigate( nextStep.path ) }
						text={
							<>
								<b className="chapter-interstitial__buttons--white__text">
									{ content.buttons.button2.text }
								</b>
								<Icon
									className="chapter-interstitial__buttons--white__icon"
									icon={ chevronRight }
								/>
							</>
						}
						className={ 'chapter-interstitial__buttons--white' }
					/>
				</div>
			</NewfoldLargeCard>
		</CommonLayout>
	);
};

export default ChapterInterstitialLoader;
