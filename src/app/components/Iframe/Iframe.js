import classNames from 'classnames';

const Iframe = ( {
	title,
	src,
	width = 400,
	height = 400,
	viewportScale = 1,
	viewportWidth = 1440,
	viewportHeight = 1000,
	interactive = false,
	className,
	...props
} ) => {
	return (
		<div
			className={ classNames(
				'nfd-onboarding-iframe nfd-relative nfd-flex nfd-flex-col nfd-overflow-hidden',
				width && `nfd-min-w-[${ width }] nfd-max-w-[${ width }]`,
				height && `nfd-min-h-[${ height }] nfd-max-h-[${ height }]`,
			) }
		>
			<iframe
				title={ title }
				src={ src }
				className={ classNames(
					className,
					! interactive && 'nfd-pointer-events-none',
				) }
				width={ viewportWidth }
				height={ viewportHeight }
				style={ {
					transform: `scale(${ viewportScale })`,
				} }
				{ ...props }
			/>
		</div>
	);
};

export default Iframe;
