import classNames from 'classnames';
import { Skeleton } from '@/components/Skeleton';
import { Button, Spinner } from '@newfold/ui-component-library';
import { LOGOGEN_STATES, getUniqueGenerationStateAnimation } from '@/utils/logogen';
import { ExclamationCircleIcon, EyeIcon as EyeIconOutline } from '@heroicons/react/24/outline';
import { CheckCircleIcon, EyeIcon as EyeIconSolid } from '@heroicons/react/24/solid';

const LoadingState = () => {
	return (
		<>
			<Skeleton className="nfd-absolute nfd-inset-0 nfd-z-10" />
			<Spinner variant="primary" className="nfd-relative nfd-z-20" />
		</>
	);
};

const FailedState = () => {
	return (
		<div className="nfd-absolute nfd-inset-0 nfd-z-10 nfd-flex nfd-items-center nfd-justify-center nfd-bg-slate-50">
			<ExclamationCircleIcon className="nfd-w-6 nfd-h-6 nfd-text-red-500" />
		</div>
	);
};

const GeneratingState = () => {
	const renderGrainyFilter = () => {
		return (
			<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="nfd-absolute nfd-inset-0 nfd-z-20">
				<filter id="noiseFilter">
					<feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
				</filter>
				<rect width="100%" height="100%" filter="url(#noiseFilter)" />
			</svg>
		);
	};

	const renderGeneratingAnimation = () => {
		return (
			<img
				src={ getUniqueGenerationStateAnimation() }
				alt={ __( 'Generating', 'nfd-module-onboarding' ) }
				className="nfd-max-w-[100px] nfd-max-h-[100px] nfd-object-contain nfd-z-10 nfd-blur-md"
			/>
		);
	};

	return (
		<>
			{ renderGrainyFilter() }
			{ renderGeneratingAnimation() }
		</>
	);
};

const StatusOverlay = ( { status = LOGOGEN_STATES.RECEIVED } ) => {
	if ( status === LOGOGEN_STATES.COMPLETED ) {
		return null;
	}

	const renderMessage = () => {
		// Only show the message for generating and failed states.
		const STATUS_THAT_REQUIRE_MESSAGE = [ LOGOGEN_STATES.GENERATING, LOGOGEN_STATES.FAILED ];
		if ( ! STATUS_THAT_REQUIRE_MESSAGE.includes( status ) ) {
			return null;
		}

		return (
			<div className="nfd-absolute nfd-bottom-1.5 nfd-left-1.5 nfd-flex nfd-items-center nfd-justify-center nfd-gap-1 nfd-bg-white nfd-rounded-md nfd-px-2 nfd-py-1  nfd-z-30 nfd-shadow-sm nfd-border nfd-border-slate-100">
				<div className={ classNames(
					'nfd-w-[9px] nfd-h-[9px] nfd-rounded-full',
					status === LOGOGEN_STATES.GENERATING ? 'nfd-bg-green-600' : 'nfd-bg-red-600',
				) } />
				<p className="nfd-text-content-default nfd-text-[12px] nfd-font-medium">
					{
						status === LOGOGEN_STATES.GENERATING
							? __( 'Generating…', 'nfd-module-onboarding' )
							: __( 'Error', 'nfd-module-onboarding' )
					}
				</p>
			</div>
		);
	};

	return (
		<div className={ classNames(
			'nfd-onboarding-logogen-logo-card-status-overlay nfd-absolute nfd-inset-0 nfd-flex nfd-items-center nfd-justify-center',
		) }>
			{ status === LOGOGEN_STATES.RECEIVED && <LoadingState /> }
			{ status === LOGOGEN_STATES.GENERATING && <GeneratingState /> }
			{ status === LOGOGEN_STATES.FAILED && <FailedState /> }
			{ renderMessage( status ) }
		</div>
	);
};

const LogoCardSelector = ( { isSelected } ) => {
	return (
		<div className="nfd-absolute nfd-inset-0 nfd-z-20 nfd-transition-all nfd-duration-200 nfd-ease-in-out hover:nfd-bg-slate-500/50">
			{ isSelected && (
				<div className="nfd-absolute nfd-bottom-1.5 nfd-right-1.5 nfd-flex nfd-items-center nfd-justify-center nfd-bg-white nfd-rounded-full nfd-border nfd-border-primary">
					<CheckCircleIcon className="nfd-w-5 nfd-h-5 nfd-text-primary" />
				</div>
			) }
		</div>
	);
};

const LogoCardPreview = ( { logoReferenceId } ) => {
	const [ isHovered, setIsHovered ] = useState( false );

	const handlePreview = ( e ) => {
		// Only process if the event is click, space, or enter key.
		if ( e.type !== 'click' && e.key !== ' ' && e.key !== 'Enter' ) {
			return;
		}
		e.preventDefault();
		e.stopPropagation();
	};

	return (
		<div className="nfd-absolute nfd-top-1.5 nfd-left-1.5 nfd-z-30">
			<Button
				variant="secondary"
				size="small"
				className="nfd-pt-1 nfd-pl-1 nfd-pr-1 nfd-pb-1"
				onMouseEnter={ () => {
					setIsHovered( true );
				} }
				onMouseLeave={ () => {
					setIsHovered( false );
				} }
				onClick={ handlePreview }
				onKeyDown={ handlePreview }
			>
				{
					isHovered
						? <EyeIconSolid className="nfd-w-4 nfd-h-4" />
						: <EyeIconOutline className="nfd-w-4 nfd-h-4" />
				}
			</Button>
		</div>
	);
};

const LogoCardActions = ( { logoReferenceId, isSelected } ) => {
	return (
		<>
			<LogoCardSelector isSelected={ isSelected } />
			<LogoCardPreview logoReferenceId={ logoReferenceId } />
		</>
	);
};

const LogoCard = ( {
	status = LOGOGEN_STATES.RECEIVED,
	logoReferenceId,
	style,
	src = null,
	selectedSrc,
	isSelected,
	tabIndex = 0,
	onSelect,
	className,
	...props
} ) => {
	const handleSelect = ( e ) => {
		// Only process if the event is click, space, or enter key.
		if ( e.type !== 'click' && e.key !== ' ' && e.key !== 'Enter' ) {
			return;
		}

		e.preventDefault();
		e.stopPropagation();

		onSelect( logoReferenceId );
	};

	return (
		<div
			role="radio"
			tabIndex={ ( src && status === LOGOGEN_STATES.COMPLETED ) ? tabIndex : -1 }
			className={ classNames(
				'nfd-onboarding-logogen-logo-card nfd-w-full nfd-h-auto nfd-aspect-video nfd-relative nfd-bg-cover nfd-bg-center nfd-bg-no-repeat nfd-border nfd-border-slate nfd-rounded nfd-overflow-hidden focus:nfd-outline-none focus:nfd-ring-2 focus:nfd-ring-primary focus:nfd-ring-offset-2',
				( status === LOGOGEN_STATES.COMPLETED ) ? 'nfd-cursor-pointer' : 'nfd-cursor-default nfd-pointer-events-none',
				isSelected && 'nfd-border-slate-300 nfd-shadow-md',
				className,
			) }
			style={ {
				backgroundImage: src ? `url(${ src })` : 'none',
			} }
			onClick={ handleSelect }
			onKeyDown={ handleSelect }
			aria-checked={ isSelected }
			aria-label={ __( 'Logo Option', 'nfd-module-onboarding' ) }
			aria-roledescription={ __( 'Logo Selector', 'nfd-module-onboarding' ) }
			{ ...props }
		>
			{
				status !== LOGOGEN_STATES.COMPLETED
					? <StatusOverlay status={ status } />
					: (
						<LogoCardActions
							logoReferenceId={ logoReferenceId }
							isSelected={ isSelected }
						/>
					)
			}
		</div>
	);
};

export default LogoCard;
