import { memo } from '@wordpress/element';
import { chevronLeft, chevronRight, reusableBlock, settings } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import LeftIconButton from './LeftIconButton';
import RightIconButton from './RightIconButton';
import VersionDropDown from './VersionDropDown';

const Header = () => {
	return (
		<div className="nfd-sitegen-header">
			<div className="nfd-sitegen-header__step-navigation">
				<div className="nfd-sitegen-header-navigation-section-left">
					<LeftIconButton icon = { chevronLeft } title = 'Back' />
					<LeftIconButton icon = { reusableBlock } title = 'Regenerate' />
				</div>
				<div className="nfd-sitegen-header-navigation-section-center">
					<VersionDropDown title = ' Version 1 ' />
				</div>
				<div className="nfd-sitegen-header-navigation-section-right">
					<LeftIconButton icon = { settings } title = 'Customize' />
					<RightIconButton icon = { chevronRight } title = 'Save & Continue' />
				</div>
			</div>
		</div>
	);
};

export default memo( Header );