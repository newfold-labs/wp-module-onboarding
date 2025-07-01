import classNames from 'classnames';
import { forwardRef } from '@wordpress/element';

const Iframe = forwardRef( ( {
	title,
	src,
	width = 400,
	height = 400,
	viewportScale = 1,
	viewportWidth = 1440,
	viewportHeight = 1000,
	className,
	...props
}, ref ) => {
	return (
		<div
			className={ classNames(
				'nfd-onboarding-iframe nfd-relative nfd-flex nfd-flex-col nfd-overflow-hidden',
			) }
			style={ {
				minWidth: width,
				maxWidth: width,
				minHeight: height,
				maxHeight: height,
			} }
		>
			<iframe
				title={ title }
				src={ src }
				className={ classNames(
					className,
				) }
				width={ viewportWidth }
				height={ viewportHeight }
				style={ {
					transform: `scale(${ viewportScale })`,
				} }
				{ ...props }
				ref={ ref }
			/>
		</div>
	);
} );

export default Iframe;
