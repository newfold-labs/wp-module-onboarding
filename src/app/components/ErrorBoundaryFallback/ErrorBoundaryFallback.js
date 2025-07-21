import { Button, Title } from '@newfold/ui-component-library';
import { pluginDashboardPage } from '@/data/constants';
import errorImage from './nfd-err-boundary.svg';

const BootError = () => {
	return (
		<div className="nfd-onboarding-error-boot nfd-h-screen nfd-flex nfd-flex-col nfd-items-center nfd-justify-center nfd-gap-8 nfd-text-center nfd--mt-12 nfd-max-w-[425px]">
			<img src={ errorImage } alt="Error occurred" width="290" />
			<div>
				<Title className="nfd-text-[22px]">{ __( 'Whoops! Looks Like You Took a Wrong Turn' ) }</Title>
				<p className="nfd-mt-3 nfd-mb-5 nfd-text-tiny">{ __( "This page is not currently available. Let's send you back to your dashboard where all the good stuff is!" ) }</p>
				<Button
					size="large"
					onClick={ () => window.location.href = pluginDashboardPage }
				>
					{ __( 'Go to Dashboard' ) }
				</Button>
			</div>
		</div>
	);
};

const UnspecifiedError = () => {
	return (
		<div className="nfd-onboarding-error-unspecified nfd-flex nfd-flex-col nfd-items-center nfd-gap-8 nfd-text-center nfd-pt-8">
			<img src={ errorImage } alt="Error occurred" width="290" />
			<div>
				<Title>{ __( 'Oops! Something Unexpected Happened' ) }</Title>
				<p className="nfd-mt-2 nfd-mb-5">{ __( 'We encountered a temporary hiccup, please try again!' ) }</p>
				<Button onClick={ () => window.location.reload() }>{ __( 'Try Again' ) }</Button>
			</div>
		</div>
	);
};

const ErrorBoundaryFallback = ( { error } ) => {
	const getErrorComponent = () => {
		switch ( error.message ) {
			case 'onboarding_completed':
				return <BootError />;
			case 'no_sitegen_capability':
				return <BootError />;
			default:
				return <UnspecifiedError />;
		}
	};

	return (
		<div className="nfd-onboarding-error-boundary nfd-flex nfd-flex-col nfd-items-center">
			{ getErrorComponent() }
		</div>
	);
};

export default ErrorBoundaryFallback;
