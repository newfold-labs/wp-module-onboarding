import { Icon, chevronDown, reusableBlock, settings } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import { useViewportMatch } from '@wordpress/compose';
import { ReactComponent as FavouriteIcon } from '../../../../static/icons/sitegen/heart-stroked.svg';
import { Dropdown, MenuGroup, MenuItem } from '@wordpress/components';

/**
 * Centre Step buttons presented in Header.
 *
 * @return {WPComponent} StepNavigation Component
 */
const StepNavigationCenter = () => {
	const isLargeViewport = useViewportMatch( 'medium' );

	/**
	 * Version step Navigation button.
	 *
	 * @return {WPComponent} VersionButton Component
	 */
	const VersionDropDownMenuItems = () => {
		return (
			<MenuGroup className="nfd-onboarding-header__version_dropdown-menu">
				{ ! isLargeViewport && (
					<>
						<MenuItem onClick={ () => {} }>
							<Icon icon={ reusableBlock } />
							{ __( 'Regenrate', 'wp-module-onboarding' ) }
						</MenuItem>
						<MenuItem onClick={ () => {} }>
							<Icon icon={ settings } />
							{ __( 'Customize', 'wp-module-onboarding' ) }
						</MenuItem>
					</>
				) }

				<MenuItem onClick={ () => {} }>
					{ __( 'Rename', 'wp-module-onboarding' ) }
				</MenuItem>
				<MenuItem onClick={ () => {} }>
					{ __( 'View All', 'wp-module-onboarding' ) }
				</MenuItem>
			</MenuGroup>
		);
	};

	/**
	 * Version step Navigation button.
	 *
	 * @param  root0
	 * @param  root0.isInputDisabled
	 * @return {WPComponent} VersionButton Component
	 */

	const VersionButton = () => {
		return (
			<Dropdown
				renderToggle={ ( { isOpen, onToggle } ) => (
					<div
						role="button"
						tabIndex="0"
						aria-expanded={ isOpen }
						aria-label="Regenerate"
						className="navigation-buttons-editor"
						onClick={ onToggle }
						onKeyDown={ ( event ) => {
							if ( event.key === 'Enter' ) {
								onToggle();
							}
						} }
					>
						<FavouriteIcon />
						<span className="navigation-buttons-editor__version__name">
							{ __( 'Version 1', 'wp-module-onboarding' ) }
						</span>
						<Icon icon={ chevronDown } />
					</div>
				) }
				renderContent={ VersionDropDownMenuItems }
				paddingSize="none"
			/>
		);
	};

	return (
		<div className="nfd-onboarding-header__step-navigation">
			<VersionButton />
		</div>
	);
};

export default StepNavigationCenter;
