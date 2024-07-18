// WordPress
import { memo } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

// Classes and functions
import { useNavigate } from 'react-router-dom';
import { validateFlow, injectMigrationStep } from '../../data/flows/utils';
import { resolveGetDataForFlow } from '../../data/flows';

//Components
import { stepSiteGenMigration } from '../../steps/SiteGen/Migration/step';
import { stepTheFork } from '../../steps/TheFork/step';

// Misc
import {
	OnboardingEvent,
	trackOnboardingEvent,
} from '../../utils/analytics/hiive';
import { SITEGEN_FLOW } from '../../data/flows/constants';
import { store as nfdOnboardingStore } from '../../store';
import { ACTION_SITEGEN_FORK_OPTION_SELECTED } from '../../utils/analytics/hiive/constants';
import OrbAnimation from '../OrbAnimation';

const StartOptions = ( { questionnaire, oldFlow, largeOption, smallOptions } ) => {
	const navigate = useNavigate();
	const { brandConfig, hireProUrl, currentData, migrationUrl, canMigrateSite, allSteps } = useSelect( ( select ) => {
		return {
			brandConfig: select( nfdOnboardingStore ).getNewfoldBrandConfig(),
			hireProUrl:
				select( nfdOnboardingStore ).getfullServiceCreativeTeamUrl(),
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
			allSteps: select( nfdOnboardingStore ).getAllSteps(),
			canMigrateSite: select( nfdOnboardingStore ).canMigrateSite(),
			migrationUrl: select( nfdOnboardingStore ).getMigrationUrl(),
		};
	} );
	const {
		updateAllSteps,
		updateTopSteps,
		updateRoutes,
		updateDesignRoutes,
		updateInitialize,
		setCurrentOnboardingData,
	} = useDispatch( nfdOnboardingStore );

	const switchFlow = ( newFlow ) => {
		if ( ! validateFlow( brandConfig, newFlow ) ) {
			return false;
		}
		const currentFlow = window.nfdOnboarding.currentFlow;
		const getData = resolveGetDataForFlow( newFlow );
		const data = getData();
		updateAllSteps( data.steps );
		updateTopSteps( data?.topSteps );
		updateRoutes( data.routes );
		updateDesignRoutes( data?.designRoutes );
		if ( SITEGEN_FLOW !== currentFlow ) {
			window.nfdOnboarding.oldFlow = currentFlow;
		}

		window.nfdOnboarding.currentFlow = newFlow;
		currentData.activeFlow = newFlow;
		currentData.continueWithoutAi = false;
		setCurrentOnboardingData( currentData );
		if ( SITEGEN_FLOW !== newFlow ) {
			updateInitialize( true );
		}
		navigate( data.steps[ 1 ].path );
	};

	const handleMigration = () => {
		if ( canMigrateSite ) {
			const migrationStepExists = allSteps.some(
				( step ) => step.path === stepSiteGenMigration.path
			);

			if ( ! migrationStepExists ) {
				const updates = injectMigrationStep( allSteps, stepTheFork );
				updateAllSteps( updates.allSteps );
			}
			trackOnboardingEvent(
				new OnboardingEvent(
					ACTION_SITEGEN_FORK_OPTION_SELECTED,
					'MIGRATE'
				)
			);
			navigate( stepSiteGenMigration.path );
		} else {
			window.open( migrationUrl, '_blank' );
		}
	};

	const selectFlow = ( flow ) => {
		let flowForEvent = false;
		switch ( flow ) {
			case 'sitebuild':
				flowForEvent = 'DIY';
				switchFlow( oldFlow );
				break;
			case 'sitegen':
				flowForEvent = 'AI';
				switchFlow( SITEGEN_FLOW );
				break;
			case 'hirepro':
				flowForEvent = 'PRO';
				window.open( hireProUrl, '_blank' );
				break;
			case 'migration':
				flowForEvent = 'MIGRATION';
				handleMigration();
				break;
		}

		if ( flowForEvent ) {
			trackOnboardingEvent(
				new OnboardingEvent(
					ACTION_SITEGEN_FORK_OPTION_SELECTED,
					flowForEvent
				)
			);
		}
	};
	return (
		<>
			<p className="nfd-onboarding-sitegen-options__questionnaire">
				{ questionnaire }
			</p>
			<div className="nfd-onboarding-sitegen-options__option nfd-onboarding-sitegen-options__option--large"
				role="button"
				tabIndex={ 0 }
				onClick={ () => {
					selectFlow( largeOption.flow );
				} }
				onKeyDown={ () => {
					{
						selectFlow( largeOption.flow );
					}
				} }
				data-flow={ largeOption.flow }>
				<h3 className="nfd-onboarding-sitegen-options__option__heading__title nfd-onboarding-sitegen-options__option__heading__title--large">
					<OrbAnimation height={ `80px` } />
					{ largeOption.span && (
						<span className="nfd-onboarding-sitegen-options__option__span">
							{ largeOption.span }
						</span>
					) }
					{ largeOption.title }
				</h3>
				<p className="nfd-onboarding-sitegen-options__option__heading__subtitle nfd-onboarding-sitegen-options__option__heading__subtitle--large">
					{ largeOption.text1 }
				</p>
				<p className="nfd-onboarding-sitegen-options__option__heading__subtitle nfd-onboarding-sitegen-options__option__heading__subtitle--large">
					{ largeOption.text2 }
				</p>

			</div>
			<div className="nfd-onboarding-sitegen-options__container">

				{ smallOptions.map( ( tab, idx ) => {
					return tab.show ? (
						<div
							className="nfd-onboarding-sitegen-options__option"
							key={ idx }
							role="button"
							tabIndex={ 0 }
							onClick={ () => {
								selectFlow( tab.flow );
							} }
							onKeyDown={ () => {
								{
									selectFlow( tab.flow );
								}
							} }
							data-flow={ tab.flow }
						>
							<h3 className="nfd-onboarding-sitegen-options__option__heading__title">
								{ tab.span && (
									<span className="nfd-onboarding-sitegen-options__option__span">
										{ tab.span }
									</span>
								) }
								{ tab.title }
							</h3>
							<p className="nfd-onboarding-sitegen-options__option__heading__subtitle">
								{ tab.subtitle }
							</p>
						</div>
					) : <></>;
				} ) }
			</div>
		</>
	);
};

export default memo( StartOptions );
