import { __ } from '@wordpress/i18n';
import classNames from 'classnames';

const NewfoldLargeCard = ({ className = '', children }) => {
	return (
		<div className={classNames('nfd-onboarding-large-card', className)}>
			{children}
		</div>
	);
};

export default NewfoldLargeCard;
