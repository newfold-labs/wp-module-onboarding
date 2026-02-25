import { useEffect } from '@wordpress/element';
import { useSelect, dispatch } from '@wordpress/data';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ErrorBoundary as AppErrorBoundary } from '@newfold/ui-component-library';
import { STEPS } from '@/steps';
import { AnimateRoutes, ErrorBoundaryFallback } from '@/components';
import { nfdOnboardingStore } from '@/data/store';
import { OnboardingEvent, sendOnboardingEvent } from '@/utils/analytics/hiive';
import { ACTION_PAGEVIEW } from '@/utils/analytics/hiive/constants';
import { disableComingSoon } from '@/utils/api';

const AppBody = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const hasOriginPrompt = useSelect(
		( select ) => select( nfdOnboardingStore ).getHasOriginPrompt(),
		[]
	);
	/**
	 * Check if any conditions prevent the onboarding from being accessed.
	 *
	 * @return {boolean} True if the onboarding can be accessed, false otherwise.
	 */
	const canAccessOnboarding = () => {
		const response = {
			result: true,
			error: null,
		};

		// Block if the onboarding has already been completed.
		if ( 'completed' === window.nfdOnboarding?.runtime?.status ) {
			response.result = false;
			response.error = 'onboarding_completed';
		}

		// Block if missing 'hasAISiteGen' capability.
		if ( ! window.NewfoldRuntime?.capabilities?.hasAISiteGen ) {
			response.result = false;
			response.error = 'no_sitegen_capability';
		}

		return response;
	};

	/**
	 * Get the routes for the onboarding steps.
	 *
	 * @return {Array} Array of <Route> components.
	 */
	const getRoutes = () => {
		return Object.entries( STEPS ).map( ( [ key, Step ] ) => {
			return <Route key={ key } path={ Step.path } element={ <Step.Component /> } />;
		} );
	};

	/**
	 * Boot the onboarding.
	 *
	 * @return {React.ReactNode} The onboarding routes.
	 */
	const boot = () => {
		// Check if the onboarding can be accessed.
		const canBoot = canAccessOnboarding();
		if ( ! canBoot.result ) {
			throw new Error( canBoot.error );
		}

		return (
			<AnimateRoutes>
				<Routes>{ getRoutes() }</Routes>
			</AnimateRoutes>
		);
	};

	// Origin-prompt alternate flow: skip Fork (prompt, logo, previews) and go straight to generating.
	useEffect( () => {
		if ( ! hasOriginPrompt ) {
			return;
		}
		if ( location.pathname === '/' ) {
			// Disable coming soon so sitegen previews can load (same as ForkStep cleanup).
			disableComingSoon();
			navigate( '/generating', { state: { direction: 'forward' }, replace: true } );
			return;
		}
		// If we landed on /intake after a failed generation (retry flow), redirect back to generating
		// so the user can retry without re-entering info they never entered in the origin flow.
		if ( location.pathname === '/intake' ) {
			dispatch( nfdOnboardingStore ).setRetryMode( false );
			navigate( '/generating', { state: { direction: 'forward' }, replace: true } );
		}
	}, [ hasOriginPrompt, location.pathname, navigate ] );

	// Analytics: Track pageview events.
	useEffect( () => {
		sendOnboardingEvent( new OnboardingEvent( ACTION_PAGEVIEW ) );
	}, [ location ] );

	return (
		<div className="nfd-onboarding-body nfd-flex nfd-justify-center nfd-py-10 mobile:nfd-py-10">
			<div className="nfd-onboarding-body-container nfd-w-full">
				<AppErrorBoundary FallbackComponent={ ErrorBoundaryFallback }>{ boot() }</AppErrorBoundary>
			</div>
		</div>
	);
};

export default AppBody;
