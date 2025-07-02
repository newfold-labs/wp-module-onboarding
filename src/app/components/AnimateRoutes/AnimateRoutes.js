import { AnimatePresence } from 'motion/react';
import { useAnimateRouteDirection } from '@/utils/hooks';

/**
 * Wraps children components with animation context and handles route transition animations.
 * @param {ReactNode} children
 * @return {JSX.Element} Animated route wrapper component
 */
const AnimateRoutes = ( { children } ) => {
	return (
		<AnimatePresence
			mode="wait"
			initial={ false }
			custom={ useAnimateRouteDirection() }
		>
			{ children }
		</AnimatePresence>
	);
};

export default AnimateRoutes;
