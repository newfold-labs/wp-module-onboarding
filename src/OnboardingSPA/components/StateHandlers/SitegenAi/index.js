import { Fragment } from '@wordpress/element';
import SiteGenSiteError from '../../SiteGenError';
import { useSelect } from '@wordpress/data';
import { store as nfdOnboardingStore } from '../../../store';

const SitegenAiStateHandler = ( { children } ) => {
	const { siteGenErrorStatus } = useSelect( ( select ) => {
		return {
			siteGenErrorStatus:
				select( nfdOnboardingStore ).getSiteGenErrorStatus(),
		};
	} );

	const handleRender = () => {
		if ( siteGenErrorStatus ) {
			return <SiteGenSiteError />;
		}

		return children;
	};
	return <Fragment>{ handleRender() }</Fragment>;
};

export default SitegenAiStateHandler;
