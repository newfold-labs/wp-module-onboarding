import { Button, Spinner } from '@newfold/ui-component-library';
import classNames from 'classnames';
import { Iframe } from '@/components';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const SiteGenPreviewCard = ( {
	screenshot,
	frameName,
	frameSrc,
	onFrameLoad = () => {},
	width = '300px',
	height = '360px',
	viewportScale = 0.2,
	viewportWidth = 1500,
	viewportHeight = 2500,
	overlay = false,
	isLoading = true,
	isError = false,
	tabIndex = 0,
	onPreview,
	className,
	...props
} ) => {
	const handleOnPreview = () => {
		if ( isLoading || isError ) {
			return;
		}

		return onPreview( frameName );
	};

	const StatusOverlay = () => {
		return (
			<div className="nfd-absolute nfd-inset-0 nfd-flex nfd-justify-center nfd-items-center nfd-w-full nfd-h-full nfd-bg-slate-100 nfd-z-30">
				{ isError && (
					<div className="nfd-flex nfd-flex-col nfd-items-center nfd-gap-2 nfd-max-w-[80%] nfd-text-center">
						<ExclamationTriangleIcon className="nfd-w-8 nfd-h-8 nfd-text-red-500" />
						<span className="nfd-text-[12px]">
							{ __( 'Failed to generate preview', 'wp-module-onboarding' ) }
						</span>
					</div>
				) }
				{ isLoading && (
					<Spinner
						variant="primary"
						size="8"
					/>
				) }
			</div>
		);
	};

	const ActionOverlay = () => {
		const [ isHovered, setIsHovered ] = useState( false );

		return (
			<div
				className="nfd-absolute nfd-inset-0 nfd-flex nfd-justify-center nfd-items-center nfd-z-20 nfd-transition-colors hover:nfd-bg-black/30"
				onMouseEnter={ () => setIsHovered( true ) }
				onMouseLeave={ () => setIsHovered( false ) }
			>
				<Button
					variant="primary"
					className={ classNames(
						'nfd-z-20 nfd-transition-opacity',
						isHovered ? 'nfd-opacity-100' : 'nfd-opacity-0',
					) }
					tabIndex="-1"
				>
					{ __( 'Preview', 'wp-module-onboarding' ) }
				</Button>
			</div>
		);
	};

	return (
		<div
			className={ classNames(
				'nfd-onboarding-sitegen-preview-card nfd-relative nfd-bg-cover nfd-bg-top nfd-bg-no-repeat nfd-border nfd-border-slate-30 nfd-rounded nfd-overflow-hidden focus:nfd-outline-none focus:nfd-ring-2 focus:nfd-ring-primary focus:nfd-ring-offset-2 hover:nfd-bg-bottom nfd-transition-[background-position] nfd-duration-[1500ms] hover:nfd-duration-[5000ms]',
				! isLoading && ! isError && 'nfd-cursor-pointer',
				( isLoading || isError ) && 'nfd-cursor-default',
				className,
			) }
			style={ {
				backgroundImage: screenshot ? `url(${ screenshot })` : 'none',
				minWidth: width,
				maxWidth: width,
				minHeight: height,
				maxHeight: height,
			} }
			onClick={ handleOnPreview }
			onKeyDown={ ( event ) => {
				if ( event.key === 'Enter' ) {
					handleOnPreview();
				}
			} }
			role="button"
			tabIndex={ tabIndex }
			{ ...props }
		>
			{ ( isLoading || isError ) && <StatusOverlay /> }
			{ overlay && ! isLoading && ! isError && <ActionOverlay /> }
			{ ! screenshot && frameSrc && (
				<Iframe
					title={ frameName }
					name={ `nfd-onboarding-${ frameName }` }
					src={ frameSrc }
					width={ width }
					height={ height }
					viewportWidth={ viewportWidth }
					viewportHeight={ viewportHeight }
					viewportScale={ viewportScale }
					className="nfd-basis-full nfd-absolute nfd-origin-top-left nfd-z-10"
					onLoad={ onFrameLoad }
					tabIndex="-1"
					inert
				/>
			) }
		</div>
	);
};

export default SiteGenPreviewCard;
