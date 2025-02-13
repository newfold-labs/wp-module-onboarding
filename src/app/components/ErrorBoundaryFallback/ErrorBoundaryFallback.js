import { Button, Title } from '@newfold/ui-component-library';
import errorImage from './nfd-err-boundary.png';

const ErrorBoundaryFallback = ( { error } ) => {
	return (
		<div className="nfd-onboarding-error-boundary nfd-flex nfd-flex-col nfd-items-center nfd-gap-8 nfd-text-center nfd-pt-8">
			<img src={ errorImage } alt="Error occurred" width="325" />
			<div>
				<Title>{ __( 'Oops! Something Unexpected Happened' ) }</Title>
				<p className="nfd-mt-2 nfd-mb-5">{ __( 'We encountered a temporary hiccup, please try again!' ) }</p>
				<Button onClick={ () => window.location.reload() }>{ __( 'Try Again' ) }</Button>
			</div>
		</div>
	);
};

export default ErrorBoundaryFallback;
