import { useLocation } from "react-router-dom";

/**
 * Custom hook to get the direction of the route transition.
 * @return {'forward' | 'backward'} The direction of the route transition.
 */
const useAnimateRouteDirection = () => {
	const incomingDirection = useLocation().state?.direction;
	const allowedDirections = [ 'forward', 'backward' ];

	// Check if the incoming direction is valid.
	if ( allowedDirections.includes( incomingDirection ) ) {
		return incomingDirection;
	}

	// Default direction.
	return 'forward';
};

export default useAnimateRouteDirection;
