import classNames from 'classnames';

const NewfoldLargeCard = ( { className = '', children } ) => {
	return (
		<div className={ classNames( 'nfd-onboarding-large-card', className ) }>
			<div className={ `nfd-onboarding-large-card__logo` }></div>
			{ children }
		</div>
	);
};

export default NewfoldLargeCard;
