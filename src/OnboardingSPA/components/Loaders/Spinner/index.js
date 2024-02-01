import classNames from 'classnames';

const Spinner = ( { className } ) => {
	return (
		<div
			className={ classNames(
				'nfd-onboarding-loader--spinner',
				className
			) }
		></div>
	);
};

export default Spinner;
