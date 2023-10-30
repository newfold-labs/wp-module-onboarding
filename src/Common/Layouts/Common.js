import BaseLayout from './Base';
import { Fragment } from '@wordpress/element';
import classNames from 'classnames';
import Animate from '../Animate';

/**
 *
 * @param {*} param0
 * @return {ReturnType} Returns the inner contianer
 */
const InnerContainer = ( { children } ) => {
	return <section className="is-contained">{children}</section>;
};

/**
 * The Common Layout extends the Base Layout and applies structural styles and animations.
 *
 * @param {Object}  props
 * @param {string}  props.className
 * @param {Object}  props.children
 * @param {boolean} props.isBgPrimary
 * @param {boolean} props.isCentered
 * @param {boolean} props.isVerticallyCentered
 * @param {boolean} props.isContained
 * @param {boolean} props.isPadded
 * @param {boolean} props.isFadeIn
 * @return {ReturnType} Returns the common layout
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
} ) => {
	const Container = isContained ? InnerContainer : Fragment;
	return (
		<Animate
			type={isFadeIn && 'fade-in'}
			duration={'233ms'}
			timingFunction={'ease-in-out'}
		>
			<BaseLayout
				className={classNames(
					'nfd-onboarding-layout__common',
					className,
					{ 'is-bg-primary': isBgPrimary },
					{ 'is-centered': isCentered },
					{ 'is-vertically-centered': isVerticallyCentered },
					{ 'is-padded': isPadded }
				)}
			>
				<Container>{children}</Container>
			</BaseLayout>
		</Animate>
	);
};

export default CommonLayout;
