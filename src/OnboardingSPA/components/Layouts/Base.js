import classNames from 'classnames';
import { speak } from '@wordpress/a11y';
import { useEffect } from '@wordpress/element';
import { useLocation } from 'react-router-dom';

/**
 * The Base Layout has no prescribed styles, only shared functionality like focus-management and analytics.
 *
 * @param {object} props
 * @returns
 */
const BaseLayout = ({
	className = 'nfd-onboarding-layout__base',
	children,
}) => {
	const location = useLocation();
	const mainContainer = document.querySelector('.nfd-onboard-content');

	const speakRouteTitle = (
		location,
		title = 'Showing new Onboarding Page'
	) => {
		// [TODO]: Determine if some routes should not speak the title
		speak(title, 'assertive');
	};

	useEffect(() => {
		mainContainer.focus({ preventScroll: true });
		speakRouteTitle(location, 'Override');
		// [TODO]: Analytics
	}, [location.pathname]);

	return (
		<div className={classNames('nfd-onboarding-layout', className)}>
			{children}
		</div>
	);
};

export default BaseLayout;
