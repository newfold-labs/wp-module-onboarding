import classNames from 'classnames';

const Skeleton = ( {
	className,
	...props
} ) => {
	return (
		<div className={ classNames(
			'nfd-onboarding-skeleton nfd-w-full nfd-h-full nfd-bg-slate-100 nfd-animate-pulse',
			className,
		) } { ...props }></div>
	);
};

export default Skeleton;
