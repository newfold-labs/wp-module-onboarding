import { useEffect } from '@wordpress/element';
import { useNavigate, useLocation } from 'react-router-dom';
import { shouldRedirectToFirstStep } from '../../utils/helpers/stepValidation';

/**
 * Higher-order component that validates step data and redirects if necessary
 *
 * @param {React.Component} WrappedComponent - The step component to wrap
 * @param {string}          stepKey          - The key of the step for validation
 * @return {React.Component} - The wrapped component with validation logic
 */
export const withStepValidation = ( WrappedComponent, stepKey ) => {
	const StepValidationWrapper = ( props ) => {
		const navigate = useNavigate();
		const location = useLocation();

		useEffect( () => {
			// Check if we should redirect to the first step
			if ( shouldRedirectToFirstStep( stepKey ) ) {
				// Only redirect if we're not already on the first step
				if ( location.pathname !== '/' ) {
					navigate( '/', { replace: true } );
				}
			}
		}, [ navigate, location.pathname ] );

		// If we should redirect, don't render the component
		if ( shouldRedirectToFirstStep( stepKey ) ) {
			return null;
		}

		// Otherwise, render the wrapped component
		return <WrappedComponent { ...props } />;
	};

	// Set display name for debugging
	StepValidationWrapper.displayName = `withStepValidation(${ WrappedComponent.displayName || WrappedComponent.name || 'Component' })`;

	return StepValidationWrapper;
};
