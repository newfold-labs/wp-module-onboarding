import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { ReactComponent as BluehostLogo } from '@/assets/bluehost-logo.svg';
import { HeaderActions as CanvasStepHeaderActions } from '@/steps/Canvas';

const Header = () => {
	const [ isCanvasStep, setIsCanvasStep ] = useState( false );
	const location = useLocation();

	// Show Canvas Step Header Actions on Canvas Step
	useEffect( () => {
		if ( location.pathname.includes( '/canvas' ) ) {
			setIsCanvasStep( true );
		} else {
			setIsCanvasStep( false );
		}
	}, [ location ] );

	return (
		<header
			className={ classNames(
				'nfd-onboarding-header nfd-top-0 nfd-z-20 nfd-w-full',
				isCanvasStep && 'nfd-border-b nfd-bg-white'
			) }
		>
			<div className="nfd-onboarding-header-container nfd-flex nfd-flex-col sm:nfd-flex-row nfd-justify-between sm:nfd-items-center nfd-gap-2 nfd-px-4 nfd-py-3 sm:nfd-px-6 sm:nfd-py-0 nfd-min-h-16">
				<BluehostLogo id="nfd-onboarding-header-logo" className="nfd-h-6 nfd-w-auto" />

				{ isCanvasStep && (
					<div className="nfd-w-full sm:nfd-w-auto sm:nfd-ml-4">
						<CanvasStepHeaderActions />
					</div>
				) }
			</div>
		</header>
	);
};

export default Header;
