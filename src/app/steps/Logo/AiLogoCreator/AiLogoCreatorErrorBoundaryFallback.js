import { Title, Button } from '@newfold/ui-component-library';
import { ReactComponent as LogoGenErrorFigure } from '@/assets/logogen-err-figure.svg';

const AiLogoCreatorErrorBoundaryFallback = ( { error, resetErrorBoundary } ) => {
	// eslint-disable-next-line no-console
	console.error( error );

	return (
		<div className="nfd-onboarding-logogen-error-boundary nfd-flex nfd-flex-col nfd-items-center nfd-h-full nfd-w-full">
			<div className="nfd-onboarding-logogen-error-boundary-content nfd-flex nfd-flex-col nfd-items-center nfd-justify-center nfd-gap-8 nfd-w-[390px] nfd-h-full nfd-py-12 mobile:nfd-max-w-[325px]">
				<LogoGenErrorFigure className="nfd-w-[160px] nfd-h-auto" />
				<div className="nfd-flex nfd-flex-col nfd-items-center nfd-justify-center nfd-gap-3 nfd-text-center">
					<Title as="h2" className="nfd-text-2xl nfd-text-content-default">
						{ __( 'Uh oh! Something went wrong.', 'wp-module-onboarding' ) }
					</Title>
					<p className="nfd-text-content-default nfd-text-tiny">
						{ __( 'Our AI logo creator encountered an error. Please close this window and try again.','wp-module-onboarding' ) }
					</p>
					<Button
						className="nfd-mt-4 nfd-button--enhanced"
						onClick={ resetErrorBoundary }
					>
						{ __( 'Close', 'wp-module-onboarding' ) }
					</Button>
				</div>
			</div>
		</div>
	);
};

export default AiLogoCreatorErrorBoundaryFallback;
