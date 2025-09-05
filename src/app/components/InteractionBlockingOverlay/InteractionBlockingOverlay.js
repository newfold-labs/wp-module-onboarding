import { Spinner } from '@newfold/ui-component-library';

const InteractionBlockingOverlay = ( {
	hasLoadingSpinner = false,
	hasBackground = true,
	children,
} ) => {
	return (
		<div className="nfd-onboarding-ibo nfd-fixed nfd-inset-0 nfd-z-50 nfd-flex nfd-flex-col nfd-items-center nfd-justify-center nfd-gap-5 nfd-opacity-100 nfd-transition-opacity nfd-duration-200 nfd-ease-in-out">
			{ hasLoadingSpinner && (
				<Spinner
					variant="white"
					size="8"
					className="!nfd-w-12 !nfd-h-12 nfd-z-40"
				/>
			) }
			{ hasBackground && (
				<div className="nfd-onboarding-ibo-background nfd-absolute nfd-inset-0 nfd-bg-slate-800 nfd-bg-opacity-90" />
			) }
			{ children }
		</div>
	);
};

export default InteractionBlockingOverlay;
