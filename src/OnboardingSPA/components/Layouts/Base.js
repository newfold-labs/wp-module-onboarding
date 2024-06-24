import classNames from 'classnames';
import { speak } from '@wordpress/a11y';
import { useEffect } from '@wordpress/element';
import { useLocation } from 'react-router-dom';

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
	}, [ location.pathname ] );

	return (
		<div className={ classNames( 'nfd-onboarding-layout', className ) }>
			{ children }
		</div>
	);
};

export default BaseLayout;
