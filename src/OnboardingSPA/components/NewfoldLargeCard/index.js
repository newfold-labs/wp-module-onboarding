import classNames from 'classnames';

const NewfoldLargeCard = ( { className = '', children } ) => {
	const finalClassName = classNames( 'nfd-onboarding-large-card', className );

	return (
		<div className={ finalClassName }>
			<div className={ `${ finalClassName }__logo` }></div>
			{ children }
		</div>
	);
};

export default NewfoldLargeCard;
