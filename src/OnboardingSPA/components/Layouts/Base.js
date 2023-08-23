import classNames from 'classnames';
import { speak } from '@wordpress/a11y';
import { useEffect } from '@wordpress/element';
import { useLocation } from 'react-router-dom';

import {
	OnboardingEvent,
	sendOnboardingEvent,
} from '../../utils/analytics/hiive';
import { ACTION_PAGEVIEW } from '../../utils/analytics/hiive/constants';

const BaseLayout = ( {
	className = 'nfd-onboarding-layout__base',
	children,
} ) => {
	const location = useLocation();
	const mainContainer = document.querySelector( '.nfd-onboard-content' );

	const speakRouteTitle = ( title = 'Showing new Onboarding Page' ) => {
		// [TODO]: Determine if some routes should not speak the title
		speak( title, 'assertive' );
	};

	useEffect( () => {
		mainContainer?.focus( { preventScroll: true } );
		speakRouteTitle( 'Override' );
		sendOnboardingEvent( new OnboardingEvent( ACTION_PAGEVIEW ) );
	}, [ location.pathname ] );

	return (
		<div className={ classNames( 'nfd-onboarding-layout', className ) }>
			{ children }
		</div>
	);
};

export default BaseLayout;
