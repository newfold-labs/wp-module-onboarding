import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { chevronLeft } from '@wordpress/icons';
import { useDispatch } from '@wordpress/data';

import { store as nfdOnboardingStore } from '../../../store';
import { VIEW_NAV_DESIGN } from '../../../../constants';
import Animate from '../../Animate';

const WithDesignBack = ( { children } ) => {
	const { setDrawerActiveView } = useDispatch( nfdOnboardingStore );

	return (
		<Animate type={ 'fade-in' } duration="100ms" timingFunction="ease-in">
			<Button
				className="nfd-onboarding-drawer__panel-back"
				variant="tertiary"
				icon={ chevronLeft }
				onClick={ () => setDrawerActiveView( VIEW_NAV_DESIGN ) }
			>
				{ __( 'Design', 'wp-module-onboarding' ) }
			</Button>
			{ children }
		</Animate>
	);
};

export default WithDesignBack;
