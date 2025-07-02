import { Step } from '@/components';
import { Preview, Sidebar } from './';

const CanvasStep = () => {
	const [ canvasHeight, setCanvasHeight ] = useState( '100dvh' );

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

	// On mount: calculate the appropriate canvas height.
	useEffect( () => {
		const appHeaderHeight = document.querySelector( '.nfd-onboarding-header' )?.offsetHeight + 1 || 0;
		setCanvasHeight( `calc(100dvh - ${ appHeaderHeight }px)` );
	}, [] );

	return (
		<Step>
			<style>{ getCustomStyles() }</style>
			<div
				className="nfd-onboarding-canvas-step nfd-flex nfd-w-screen nfd-overflow-hidden"
				style={ {
					height: canvasHeight,
				} }
			>
				<Preview />
				<Sidebar />
			</div>
		</Step>
	);
};

export default CanvasStep;
