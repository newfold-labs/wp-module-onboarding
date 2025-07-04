import { motion } from 'motion/react';
import { useAnimateRouteDirection } from '@/utils/hooks';

const slideVariant = {
	enter: ( direction ) => {
		return {
			x: direction === 'forward' ? 300 : -300,
			opacity: 0,
		};
	},
	center: {
		x: 0,
		opacity: 1,
	},
	exit: ( direction ) => {
		return {
			x: direction === 'forward' ? -300 : 300,
			opacity: 0,
		};
	},
};

/**
 * Step component for onboarding steps (Animatable).
 * @param {ReactNode} children
 * @return {JSX.Element} Step component
 */
const Step = ( { children } ) => {
	const direction = useAnimateRouteDirection();

	return (
		<motion.div
			className="nfd-onboarding-step"
			variants={ slideVariant }
			initial="enter"
			animate="center"
			exit="exit"
			custom={ direction }
			transition={ {
				x: { type: 'tween', duration: 0.25 },
				ease: 'easeInOut',
			} }
		>
			{ children }
		</motion.div>
	);
};

/**
 * Actions container for the step component.
 * @param {ReactNode} children
 * @return {JSX.Element} Actions component
 */
const Actions = ( { children } ) => {
	return (
		<div className="nfd-w-full nfd-flex nfd-flex-row-reverse nfd-items-center nfd-flex-wrap nfd-gap-3 sm:nfd-justify-between nfd-justify-center">
			{ children }
		</div>
	);
};

Step.Actions = Actions;

export default Step;
