import { memo } from '@wordpress/element';
import { chevronLeft, chevronRight, reusableBlock, settings,lock } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import ActionButton from './ActionButton';

const Header = () => {
	return (
		<div className="nfd-sitegen-header">
			<div className="nfd-sitegen-header__step-navigation">
				<div className="navigation-section-left">
					<ActionButton icon = { chevronLeft } title = 'Back' />
					<ActionButton icon = { reusableBlock } title = 'Regenerate' />
				</div>
				<div className="navigation-section-center">
					<ActionButton icon = { lock } title = 'Back' />
				</div>
				<div className="navigation-section-right">
					<ActionButton icon = { settings } title = 'Customize' />
					<ActionButton icon = { chevronRight } title = 'Save & Continue' />
				</div>
			</div>
		</div>
	);
};

export default memo( Header );