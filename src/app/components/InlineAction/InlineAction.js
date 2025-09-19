import classNames from 'classnames';

/**
 * ActionContent is a component that displays the action title and icon.
 * @param {Object}             props             - The props for the ActionContent component.
 * @param {string}             [props.title]     - The title of the action.
 * @param {React.ReactElement} [props.icon]      - The icon of the action.
 * @param {string}             [props.className] - The class name of the action.
 * @return {React.ReactElement} The ActionContent component.
 */
const ActionContent = ( {
	title,
	icon,
	className,
} ) => {
	return (
		<div className={ classNames(
			'nfd-onboarding-inline-action-content nfd-flex nfd-items-center nfd-gap-2 nfd-text-[15px] nfd-font-medium',
			className,
		) }>
			{ icon && (
				icon
			) }
			{ title && (
				<span>{ title }</span>
			) }
		</div>
	);
};

/**
 * InlineAction is a component that displays an inline action.
 * @param {Object}             props                    - The props for the InlineAction component.
 * @param {string}             [props.title]            - The title of the action.
 * @param {React.ReactElement} [props.icon]             - The icon of the action.
 * @param {string}             [props.className]        - The class name of the action.
 * @param {string}             [props.contentClassName] - The class name of the action content.
 * @param {Function}           [props.onClick]          - The function to call when the action is clicked.
 * @param {React.ReactNode}    [props.children]         - The children of the action.
 * @param {string}             [props.ariaLabel]        - The aria label of the action.
 * @return {React.ReactElement} The InlineAction component.
 */
const InlineAction = ( {
	title,
	icon,
	ariaLabel,
	className,
	contentClassName,
	onClick,
	children,
	...props
} ) => {
	return (
		<button
			type="button"
			title={ title }
			aria-label={ ariaLabel || title }
			className={ classNames(
				'nfd-onboarding-inline-action nfd-rounded-sm hover:nfd-text-primary focus:nfd-text-primary focus:nfd-outline-none focus:nfd-ring-2 focus:nfd-ring-primary focus:nfd-ring-offset-2',
				className,
			) }
			onClick={ onClick }
			{ ...props }
		>
			{
				children || (
					<ActionContent
						title={ title }
						icon={ icon }
						className={ contentClassName }
					/>
				)
			}
		</button>
	);
};

export default InlineAction;
