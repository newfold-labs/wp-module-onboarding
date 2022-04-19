import classNames from 'classnames';
/**
 * Shows an open/closed accordion using native <details>.
 *
 * `sumamry` is a string or children to show inside the accordion next to the collapse.
 * `classname` is passed to the top-level details element.
 * `children` is put inside the accordion.
 * `isOpen` is a boolean to set the default state for the accordion.
 *
 * @param {object} props
 * @returns WPComponent
 */
const Accordion = ({ summary, className, children, isOpen = false }) => {
	return (
		<details
			className={classNames('nfd-onboarding-accordion', className)}
			open={isOpen}
		>
			<summary className="nfd-onboarding-accordion__summary">
				{summary}
			</summary>
			<div className="nfd-onboarding-accordion__content">{children}</div>
		</details>
	);
};

export default Accordion;
