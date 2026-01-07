import { Step } from '@/components';
import { Preview } from './';
import { canAccessBlueprints } from '@/utils/helpers';
import { useState, useEffect } from '@wordpress/element';
import { useNavigate } from 'react-router-dom';

const BlueprintCanvasStep = () => {
	const navigate = useNavigate();
	const [ canvasHeight, setCanvasHeight ] = useState( '100dvh' );

	// On mount: calculate the appropriate canvas height.
	useEffect( () => {
		const appHeaderHeight = document.querySelector( '.nfd-onboarding-header' )?.offsetHeight + 1 || 0;
		setCanvasHeight( `calc(100dvh - ${ appHeaderHeight }px)` );
	}, [] );

	// Redirect to fork page if brand doesn't have access to blueprints
	useEffect( () => {
		if ( ! canAccessBlueprints() ) {
			navigate( '/', { replace: true } );
		}
	}, [ navigate ] );

	const getCustomStyles = () => {
		return (
			`
				.nfd-onboarding-body {
					padding-top: 0 !important;
					padding-bottom: 0 !important;
				}
			`
		);
	};

	// Don't render anything if brand doesn't have access
	if ( ! canAccessBlueprints() ) {
		return null;
	}

	return (
		<Step>
			<style>{ getCustomStyles() }</style>
			<div
				className="nfd-onboarding-blueprint-canvas-step nfd-flex nfd-w-screen nfd-overflow-hidden"
				style={ {
					height: canvasHeight,
				} }
			>
				<Preview />
			</div>
		</Step>
	);
};

export default BlueprintCanvasStep;
