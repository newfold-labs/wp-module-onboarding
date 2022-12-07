import { Fragment } from '@wordpress/element';
import { Slot } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

import StepNavigation from '../step-navigation';
import { store as nfdOnboardingStore } from '../../../store';
import { SIDEBAR_MENU_SLOTFILL_PREFIX } from '../../../../constants';

const HeaderEnd = () => {
	const { sidebars, isHeaderNavigationEnabled } = useSelect( ( select ) => {
		return {
			sidebars: select( nfdOnboardingStore ).getSidebars(),
			isHeaderNavigationEnabled:
				select( nfdOnboardingStore ).isHeaderNavigationEnabled(),
		};
	} );

	return (
		<Fragment>
			{ isHeaderNavigationEnabled && <StepNavigation /> }
			{ sidebars.map( ( sidebar ) => {
				return (
					<Slot
						key={ sidebar.id }
						name={ `${ SIDEBAR_MENU_SLOTFILL_PREFIX }/${ sidebar.id }` }
					/>
				);
			} ) }
		</Fragment>
	);
};

export default HeaderEnd;
