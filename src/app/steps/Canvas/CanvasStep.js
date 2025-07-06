import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Button } from '@newfold/ui-component-library';
import { Step } from '@/components';
import { Preview, Sidebar } from './';

/**
 * Since we disable the sidebar on mobile, we need to add a button to switch between previews.
 * @return {JSX.Element} - A button that allows the user to safely navigate back to the previews step to change the preview.
 */
const MobileLayoutSwitcher = () => {
	const navigate = useNavigate();

	const handleNavigate = () => {
		navigate( '/previews', {
			state: { direction: 'backward' },
		} );
	};

	return (
		<Button
			variant="primary"
			size="large"
			className="nfd-onboarding-mobile-layout-switcher [@media(min-width:601px)]:nfd-hidden nfd-w-max nfd-fixed nfd-bottom-[6%] nfd-mx-auto nfd-left-1/2 -nfd-translate-x-1/2 nfd-z-10"
			onClick={ handleNavigate }
		>
			<ChevronLeftIcon className="nfd-w-4 nfd-h-4 nfd-mr-2" />
			{ __( 'Change Preview', 'wp-module-onboarding' ) }
			<ChevronRightIcon className="nfd-w-4 nfd-h-4 nfd-ml-2" />
		</Button>
	);
};

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
				<MobileLayoutSwitcher />
			</div>
		</Step>
	);
};

export default CanvasStep;
