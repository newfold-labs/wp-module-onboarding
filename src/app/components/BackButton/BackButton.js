import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Navigate from '../Navigate/Navigate';

/**
 * BackButton component for header navigation.
 *
 * @param {Object}  props          - Component props
 * @param {string}  props.toRoute  - The route to navigate back to
 * @param {boolean} props.disabled - Whether the button is disabled
 * @return {JSX.Element} A back button with icon and optional text
 */
const BackButton = ( { toRoute = '/', disabled = false } ) => {
	return (
		<Navigate
			toRoute={ toRoute }
			direction="backward"
			variant="secondary"
			disabled={ disabled }
			className="!nfd-bg-transparent !nfd-border-0 !nfd-p-0 !nfd-shadow-none hover:!nfd-shadow-none !nfd-flex !nfd-items-center nfd-gap-2 !nfd-text-primary-500 hover:!nfd-text-primary-600 nfd-transition-colors"
		>
			<ArrowLeftIcon className="nfd-w-5 nfd-h-5 nfd-stroke-[2.5]" />
			<span className="mobile:nfd-hidden nfd-text-base nfd-font-semibold">
				{ __( 'Back', 'wp-module-onboarding' ) }
			</span>
		</Navigate>
	);
};

export default BackButton;

