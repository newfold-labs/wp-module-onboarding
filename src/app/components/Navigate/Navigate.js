import { useNavigate } from "react-router-dom";
import { Button, Link } from "@newfold/ui-component-library";
import classNames from "classnames";

/**
 * Navigate component.
 *
 * Router navigation component that can handle routing within the app.
 * @param {string}                  [toRoute='/']         - The path to navigate to when the component is clicked.
 * @param {'forward' | 'backward'}  [direction='forward'] - The animation direction of the navigation.
 * @param {'button' | 'link'}       [as='button']         - Determines whether to render as a Button or a Link.
 * @param {'primary' | 'secondary'} [variant='primary']   - The variant style of the Button component.
 * @param {ReactNode}               children              - The child elements or text to be displayed inside the component.
 * @param {Object}                  props                 - Additional props to be passed to the
 * @return {JSX.Element} A Button or Link component that navigates to the specified route on click.
 */
const Navigate = ( {
	toRoute = '/',
	direction = 'forward',
	as = 'button',
	variant = 'primary',
	children,
	...props
} ) => {
	const navigate = useNavigate(); // Router navigate.

	const handleOnClick = () => {
		navigate( toRoute, {
			state: { direction },
			replace: false,
		} );
	};

	if ( 'link' === as ) {
		return (
			<Link
				as="button"
				onClick={ handleOnClick }
				{ ...props }
			>
				{ children }
			</Link>
		);
	}

	return (
		<Button
			variant={ variant }
			onClick={ handleOnClick }
			className={ classNames(
				variant === 'primary' && 'nfd-py-[11px] nfd-px-[35px]',
				variant === 'secondary' && 'nfd-bg-transparent nfd-text-primary-500 nfd-border-primary-500 nfd-py-[11px] nfd-px-[16px]',
			) }
			{ ...props }
		>
			{ children }
		</Button>
	);
};

export default Navigate;
