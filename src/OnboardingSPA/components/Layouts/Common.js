import BaseLayout from './Base';
import { Fragment } from '@wordpress/element';
import classNames from 'classnames';
import Animate from '../Animate';

/**
 *
 * @param {*} param0
 * @return
 */
const InnerContainer = ( { children } ) => {
	return <section className="is-contained">{ children }</section>;
};

/**
 * The Common Layout extends the Base Layout and applies structural styles and animations.
 *
 * @param {Object} props
 * @param          props.className
 * @param          props.children
 * @param          props.isBgPrimary
 * @param          props.isCentered
 * @param          props.isVerticallyCentered
 * @param          props.isContained
 * @param          props.isPadded
 * @param          props.isFadeIn
 * @return
 */
const CommonLayout = ( {
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
			type={ isFadeIn && 'fade-in' }
			duration={ '233ms' }
			timingFunction={ 'ease-in-out' }
		>
			<BaseLayout
				className={ classNames(
					'nfd-onboarding-layout__common',
					className,
					{ 'is-bg-primary': isBgPrimary },
					{ 'is-centered': isCentered },
					{ 'is-vertically-centered': isVerticallyCentered },
					{ 'is-padded': isPadded }
				) }
			>
				<Container>{ children }</Container>
			</BaseLayout>
		</Animate>
	);
};

export default CommonLayout;
