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
				'nfd-onboarding-header nfd-top-0 nfd-z-20',
				isCanvasStep && 'nfd-border-b nfd-bg-white'
			) }
		>
			<div className="nfd-onboarding-header-container nfd-flex nfd-justify-between nfd-items-center nfd-min-h-16 nfd-px-6">
				<BluehostLogo id="nfd-onboarding-header-logo" />
				{ isCanvasStep && <CanvasStepHeaderActions /> }
			</div>
		</header>
	);
};

export default Header;
