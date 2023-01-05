import { Slot } from '@wordpress/components';
import classNames from 'classnames';
import { Fragment, Suspense } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

import { store as nfdOnboardingStore } from '../../store';
import { SIDEBAR_SLOTFILL_PREFIX } from '../../../constants';

const Sidebar = () => {
	const { isSidebarOpened, sideBarView, sidebars } = useSelect(
		( select ) => {
			return {
				isSidebarOpened: select( nfdOnboardingStore ).isSidebarOpened(),
				sideBarView: select( nfdOnboardingStore ).getSidebarView(),
				sidebars: select( nfdOnboardingStore ).getSidebars(),
			};
		}
	);

	return (
		<>
			<Suspense fallback={ <Fragment /> }>
				{ sidebars.map( ( sidebar ) => {
					return (
						<Fragment key={ sidebar.id }>
							<sidebar.sidebar />
							<sidebar.menu />
						</Fragment>
					);
				} ) }
			</Suspense>
			<div
				className={ classNames( 'nfd-onboarding-sidebar__panel', {
					'is-open': isSidebarOpened && sideBarView,
				} ) }
			>
				<div className="nfd-onboarding-sidebar__panel-inner">
					{ isSidebarOpened && sideBarView && (
						<Slot
							name={ `${ SIDEBAR_SLOTFILL_PREFIX }/${ sideBarView }` }
						/>
					) }
				</div>
			</div>
		</>
	);
};

export default Sidebar;
