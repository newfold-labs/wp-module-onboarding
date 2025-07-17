import { forwardRef } from 'react';

/**
 * ActionCardOverlay component
 * An overlay layer to sit on top of the ActionCard to provide consistent onClick behavior
 *
 * @return {JSX.Element} The ActionCardOverlay component
 */
const ActionCardOverlay = () => {
	return (
		<div className="nfd-onboarding-action-card-overlay nfd-absolute nfd-inset-0 nfd-z-20 nfd-cursor-pointer nfd-pointer-events-none"></div>
	);
};

/**
 * ActionCard component
 * A card component that can be used to display content in an actionable card format
 *
 * @param {Object}          props           - The props for the ActionCard component
 * @param {Function}        props.onClick   - The function to call when the card is clicked
 * @param {Function}        props.onKeyDown - The function to call when the card is keyed down
 * @param {React.ReactNode} props.children  - The children to render inside the card
 * @param {Object}          ref             - The ref for the card
 *
 * @return {JSX.Element} The ActionCard component
 */
const ActionCard = forwardRef( ( {
	onClick,
	onKeyDown,
	children,
	...props
}, ref ) => {
	const handleKeyDown = ( e ) => {
		if ( onKeyDown ) {
			return onKeyDown( e );
		}
		if ( e.key === 'Enter' || e.key === ' ' ) {
			e.preventDefault();
			onClick();
		}
	};

	return (
		<div
			className="nfd-onboarding-action-card nfd-relative nfd-p-6 nfd-rounded-lg nfd-overflow-hidden nfd-bg-[#E7EFF8] hover:nfd-bg-[#E0EBF6] nfd-transition-colors nfd-duration-200 focus:nfd-outline-none focus:nfd-ring-2 focus:nfd-ring-primary"
			onClick={ onClick }
			onKeyDown={ handleKeyDown }
			role="button"
			tabIndex={ 0 }
			ref={ ref }
			{ ...props }
		>
			<ActionCardOverlay />
			{ children }
		</div>
	);
} );

ActionCard.displayName = 'ActionCard';

export default ActionCard;
