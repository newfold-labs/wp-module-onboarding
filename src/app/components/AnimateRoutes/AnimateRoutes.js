import { AnimatePresence, useMotionValue } from 'motion/react';
import { createContext, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Context to provide the direction of the route animation.
 */
export const AnimateRoutesDirection = createContext();

/**
 * Wraps child components with animation context and handles route transition animations.
 * @param {import('react').ReactNode} children
 * @return {JSX.Element} Animated route wrapper component
 */
const AnimateRoutes = ( { children } ) => {
	const location = useLocation();
	const direction = useMotionValue( 'backward' ); // Direction state: 'forward' or 'backward'.

	// Get the incoming direction from the router.
	const incomingDirection = useMemo( () => {
		return location.state?.direction || 'backward';
	}, [ location.state ] );

	useEffect( () => {
		// Only update the direction if the incoming direction is different.
		if ( incomingDirection !== direction.get() ) {
			direction.set( incomingDirection );
		}
	}, [ incomingDirection, direction ] );

	return (
		<AnimateRoutesDirection.Provider value={ direction }>
			<AnimatePresence
				mode="wait"
				initial={ false }
				custom={ direction }
			>
				{ children }
			</AnimatePresence>
		</AnimateRoutesDirection.Provider>
	);
};

export default AnimateRoutes;
