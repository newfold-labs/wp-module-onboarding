import { lazy } from '@wordpress/element';
import { Step } from '../../data/models/Step';

const StepComplete = lazy( () => import( './index' ) );

export const stepComplete = new Step( {
	slug: 'complete',
	path: '/wp-setup/step/complete',
	Component: StepComplete,
} );
