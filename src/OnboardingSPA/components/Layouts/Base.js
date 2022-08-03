import classNames from 'classnames';
import { speak } from '@wordpress/a11y';
import { useEffect } from '@wordpress/element';
import { useLocation } from 'react-router-dom';

import { NFD_ONBOARDING_EVENT_PREFIX } from '../../../constants';
import Event from '../../utils/api/events';

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
		mainContainer?.focus({ preventScroll: true });
		speakRouteTitle(location, 'Override');
          new Event(`${NFD_ONBOARDING_EVENT_PREFIX}-pageview`, {
               stepID: location.pathname,
               previousStepID: window.nfdOnboarding.previousStepID
          }).send();
          window.nfdOnboarding.previousStepID = location.pathname
	}, [location.pathname]);

	return (
		<div className={classNames('nfd-onboarding-layout', className)}>
			{children}
		</div>
	);
};

export default BaseLayout;
