import { __ } from '@wordpress/i18n';
import { addThemeSuffix } from '../../../utils/helper';
import { Icon, chevronRight } from '@wordpress/icons';

const NextButton = () => {
	return (
		<div className={ addThemeSuffix( 'nfd-sg-next-btn' ) }>
			{ __( 'Next', 'wp-module-onboarding' ) }
			<Icon
				className={ addThemeSuffix( 'nfd-sg-next-btn--icon' ) }
				icon={ chevronRight }
			/>
		</div>
	);
};

export default NextButton;
