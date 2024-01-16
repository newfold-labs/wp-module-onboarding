import { SITEGEN_FLOW } from '../../data/flows/constants';
import { resolveGetDataForFlow } from '../../data/flows';
import { useSelect, useDispatch } from '@wordpress/data';
import { validateFlow } from '../../data/flows/utils';
import { useNavigate } from 'react-router-dom';
import { memo } from '@wordpress/element';
import { store as nfdOnboardingStore } from '../../store';

const StartOptions = ( { questionnaire, oldFlow, options } ) => {
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
	const selectFlow = ( flow ) => {
		switch ( flow ) {
			case 'onboarding':
				return switchFlow( oldFlow );
			case 'ai':
				return switchFlow( SITEGEN_FLOW );
			case 'migration':
				return window.open( migrationUrl, '_blank' );
		}
	};
	return (
		<div className="">
			<p className="nfd-onboarding-sitegen-options__questionnaire">
				{ questionnaire }
			</p>
			<div className="nfd-onboarding-sitegen-options__container">
				{ options.map( ( tab, idx ) => {
					return (
						<div
							className="nfd-onboarding-sitegen-options__container__options"
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
						>
							<h3 className="nfd-onboarding-sitegen-options__container__heading__title">
								{ tab.span && (
									<span className="nfd-onboarding-sitegen-options__container__options__span">
										{ tab.span }
									</span>
								) }
								{ tab.title }
							</h3>
							<p className="nfd-onboarding-sitegen-options__container__heading__subtitle">
								{ tab.subtitle }
							</p>
						</div>
					);
				} ) }
			</div>
		</div>
	);
};

export default memo( StartOptions );
