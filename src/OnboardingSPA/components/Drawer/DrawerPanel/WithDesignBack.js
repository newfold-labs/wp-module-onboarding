import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { chevronLeft } from '@wordpress/icons';
import { useDispatch } from '@wordpress/data';

import { store as nfdOnboardingStore } from '../../../store';
import { VIEW_NAV_DESIGN } from '../../../../constants';

const WithDesignBack = ( { children } ) => {
	const { setDrawerActiveView } = useDispatch( nfdOnboardingStore );

	return (
		<div className="is-drawer-fade">
			<Button
				className="nfd-onboarding-drawer__panel-back"
				variant="tertiary"
				icon={ chevronLeft }
				onClick={ () => setDrawerActiveView( VIEW_NAV_DESIGN ) }
			>
				{ __( 'Design', 'wp-module-onboarding' ) }
			</Button>
			{ children }
		</div>
	);
};

export default WithDesignBack;
