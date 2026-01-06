import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { HeaderActions as CanvasStepHeaderActions } from '@/steps/Canvas';
import { HeaderActions as BlueprintCanvasStepHeaderActions } from '@/steps/BlueprintCanvas';
import { BackButton } from '@/components';
import { BrandLogo } from '../BrandLogo';

// Map of routes that should show a back button in the header
const BACK_NAVIGATION_MAP = {
	'/intake': '/',
	'/logo': '/intake',
	'/generating': '/logo',
	'/previews': '/logo',
	'/blueprints': '/',
};

const Header = () => {
	const [ isCanvasStep, setIsCanvasStep ] = useState( false );
	const [ isBlueprintCanvasStep, setIsBlueprintCanvasStep ] = useState( false );
	const location = useLocation();

	// Show Canvas Step Header Actions on Canvas Step
	useEffect( () => {
		if ( location.pathname.includes( '/canvas' ) ) {
			setIsCanvasStep( true );
			setIsBlueprintCanvasStep( false );
		} else if ( location.pathname.includes( '/blueprints-canvas' ) ) {
			setIsBlueprintCanvasStep( true );
			setIsCanvasStep( false );
		} else {
			setIsCanvasStep( false );
			setIsBlueprintCanvasStep( false );
		}
	}, [ location ] );

	// Determine if the current route should show a back button
	const backRoute = BACK_NAVIGATION_MAP[ location.pathname ];
	const showBackButton = !! backRoute;

	return (
		<header
			className={ classNames(
				'nfd-onboarding-header nfd-top-0 nfd-z-20',
				( isCanvasStep || isBlueprintCanvasStep ) && 'nfd-border-b nfd-bg-white'
			) }
		>
			<div className="nfd-onboarding-header-container nfd-flex nfd-justify-between nfd-items-center nfd-min-h-16 nfd-px-6 mobile:nfd-px-0 mobile:nfd-max-w-[90%] mobile:nfd-mx-auto">
				{ showBackButton ? (
					<BackButton toRoute={ backRoute } />
				) : (
					<BrandLogo id="nfd-onboarding-header-logo"
						className={ classNames(
							( isCanvasStep || isBlueprintCanvasStep ) && 'mobile:nfd-hidden'
						) } />
				) }
				{ isCanvasStep && <CanvasStepHeaderActions /> }
				{ isBlueprintCanvasStep && <BlueprintCanvasStepHeaderActions /> }
			</div>
		</header>
	);
};

export default Header;
