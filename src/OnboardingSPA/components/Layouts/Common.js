import { Animate } from '@wordpress/components';
import BaseLayout from './Base';
import { Fragment } from '@wordpress/element';
import classNames from 'classnames';

/**
 *
 * @param {*} param0
 * @returns
 */
const InnerContainer = ({ children }) => {
	return <section className="is-contained">{children}</section>;
};

/**
 * The Common Layout extends the Base Layout and applies structural styles and animations.
 *
 * @param {object} props
 * @returns
 */
const CommonLayout = ({
	className = '',
	children,
	isBgPrimary = false,
	isCentered = false,
	isVerticallyCentered = false,
	isContained = false,
	isPadded = false,
	isFadeIn = true,
}) => {
	const Container = isContained ? InnerContainer : Fragment;
	return (
		<BaseLayout
			className={classNames(
				'nfd-onboarding-layout__common',
				className,
				{ 'is-layout-fade-in': isFadeIn },
				{ 'is-bg-primary': isBgPrimary },
				{ 'is-centered': isCentered },
				{ 'is-vertically-centered': isVerticallyCentered },
				{ 'is-padded': isPadded }
			)}
		>
			<Container>{children}</Container>
		</BaseLayout>
	);
};

export default CommonLayout;
