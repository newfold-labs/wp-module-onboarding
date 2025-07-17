import { forwardRef } from 'react';
import { motion } from 'motion/react';

/**
 * A wrapper component for the Framer Motion library.
 * @param {Object}          props          Component props.
 * @param {string}          props.tag      HTML tag name.
 * @param {React.ReactNode} props.children Component children.
 * @param {React.Ref}       ref            Component ref.
 * @return {React.ReactNode} Motion component.
 */
const Motion = forwardRef( ( {
	tag = 'div',
	children,
	...props
}, ref ) => {
	const Component = motion[ tag ];

	return (
		<Component
			ref={ ref }
			{ ...props }
		>
			{ children }
		</Component>
	);
} );

export default Motion;

