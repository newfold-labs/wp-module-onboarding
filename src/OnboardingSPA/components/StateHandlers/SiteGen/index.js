// WordPress
import { Fragment } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

// Classes and functions

// Components
import SiteGenStepErrorState from '../../ErrorState/Step/SiteGen';

// Misc
import { store as nfdOnboardingStore } from '../../../store';

const SiteGenStateHandler = ( { children } ) => {
	const { siteGenErrorStatus } = useSelect( ( select ) => {
		return {
			currentStepPath: select( nfdOnboardingStore ).getCurrentStepPath(),
			siteGenErrorStatus:
				select( nfdOnboardingStore ).getSiteGenErrorStatus(),
		};
	} );

	const handleRender = () => {
		if ( siteGenErrorStatus ) {
			return <SiteGenStepErrorState />;
		}

		return children;
	};
	return <Fragment>{ handleRender() }</Fragment>;
};

export default SiteGenStateHandler;
