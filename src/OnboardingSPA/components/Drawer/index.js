import { Fragment, useEffect } from '@wordpress/element';

import DrawerPanel from './DrawerPanel';
import DrawerToggle from './DrawerToggle';
import { store as nfdOnboardingStore } from '../../store';
import { useDispatch } from '@wordpress/data';
import { useViewportMatch } from '@wordpress/compose';

/**
 * Off-canvas drawer to left of viewport.
 * @param {*} param0
 * @returns
 */
const Drawer = ({ isDefaultOpen = false }) => {
	const isDesktopViewport = useViewportMatch('medium');
	const { setIsDrawerOpened } = useDispatch(nfdOnboardingStore);

	useEffect(() => {
		setIsDrawerOpened(isDefaultOpen && isDesktopViewport);
	}, [isDefaultOpen, isDesktopViewport, setIsDrawerOpened]);

	return (
		<Fragment>
			<DrawerToggle />
			<DrawerPanel />
		</Fragment>
	);
};

export default Drawer;
