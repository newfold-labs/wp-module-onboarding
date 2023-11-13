import { SITEGEN_FLOW } from '../../data/flows/constants';
import { resolveGetDataForFlow } from '../../data/flows';
import { useSelect, useDispatch } from '@wordpress/data';
import { validateFlow } from '../../data/flows/utils';
import { useNavigate } from 'react-router-dom';
import { store as nfdOnboardingStore } from '../../store';

const StartOptions = ( { questionnaire, options, oldFlow } ) => {
	const navigate = useNavigate();
	const { brandConfig, migrationUrl } = useSelect( ( select ) => {
		return {
			brandConfig: select( nfdOnboardingStore ).getNewfoldBrandConfig(),
			migrationUrl: select( nfdOnboardingStore ).getMigrationUrl(),
		};
	} );
	const {
		updateAllSteps,
		updateTopSteps,
		updateRoutes,
		updateDesignRoutes,
		updateInitialize,
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
		updateInitialize( true );
		navigate( data.steps[ 1 ].path );
	};
	return (
		<div className="">
			<p className="nfd-onboarding-step--site-gen__fork__questionnaire">{ questionnaire }</p>
			<div className="nfd-onboarding-step--site-gen__fork__container">
				<div
					className="nfd-onboarding-step--site-gen__fork__container__options"
					role="button"
					tabIndex={ 0 }
					onClick={ () => switchFlow( oldFlow ) }
					onKeyDown={ () => switchFlow( oldFlow ) }
				>
					<h3 className="nfd-onboarding-step--site-gen__fork__heading__subtitle">
						Build it myself
					</h3>
					<p>We'll stay out of your way.</p>
				</div>
				<div
					className="nfd-onboarding-step--site-gen__fork__container__options"
					role="button"
					tabIndex={ 0 }
					onClick={ () => switchFlow( SITEGEN_FLOW ) }
					onKeyDown={ () => switchFlow( SITEGEN_FLOW ) }
				>
					<h3 className="nfd-onboarding-step--site-gen__fork__heading__subtitle">
						<span className="nfd-onboarding-step--site-gen__fork__container__options__span">
							AI
						</span>
						 Website Creator
					</h3>
					<p>Custom Al generated content & design.</p>
				</div>
				<div
					className="nfd-onboarding-step--site-gen__fork__container__options"
					role="button"
					tabIndex={ 0 }
					onClick={ () => window.open( migrationUrl, '_blank' ) }
					onKeyDown={ () => window.open( migrationUrl, '_blank' ) }
				>
					<h3 className="nfd-onboarding-step--site-gen__fork__heading__subtitle">
						Hire a Pro
					</h3>
					<p>Leave it to our WordPress experts.</p>
				</div>
			</div>
		</div>

	);
};

export default StartOptions;
