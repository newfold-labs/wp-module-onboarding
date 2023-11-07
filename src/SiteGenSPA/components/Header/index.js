import { memo } from '@wordpress/element';
import { chevronLeft, chevronRight, reusableBlock, settings } from '@wordpress/icons';
import LeftIconButton from './LeftIconButton';
import RightIconButton from './RightIconButton';
import VersionDropDown from './VersionDropDown';
import { addThemeSuffix } from '../../utils/helper';

const Header = () => {
	return (
		<div className={ addThemeSuffix( 'nfd-sitegen-header' ) } >
			<div className={ addThemeSuffix( 'nfd-sitegen-header__step-navigation' ) } >
				<div className={ addThemeSuffix( 'nfd-sitegen-header-navigation-section-left' ) } >
					<LeftIconButton icon = { chevronLeft } title = 'Back' />
					<LeftIconButton icon = { reusableBlock } title = 'Regenerate' />
				</div>
				<div className={ addThemeSuffix( 'nfd-sitegen-header-navigation-section-center' ) } >
					<VersionDropDown title = ' Version 1 ' />
				</div>
				<div className={ addThemeSuffix( 'nfd-sitegen-header-navigation-section-right' ) } >
					<LeftIconButton icon = { settings } title = 'Customize' />
					<RightIconButton icon = { chevronRight } title = 'Save & Continue' />
				</div>
			</div>
		</div>
	);
};

export default memo( Header );