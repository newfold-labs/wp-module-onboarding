import { Icon, chevronDown, reusableBlock, settings } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import { useViewportMatch } from '@wordpress/compose';
import { useState } from '@wordpress/element';
import { ReactComponent as FavouriteIcon } from '../../../../static/icons/sitegen/heart-stroked.svg';
import { ReactComponent as FavouriteFilled } from '../../../../static/icons/sitegen/heart-filled.svg';
import { Dropdown, MenuGroup, MenuItem } from '@wordpress/components';
import TextInputVersion from './TextInput';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as nfdOnboardingStore } from '../../../../store';

/**
 * Centre Step buttons presented in Header.
 *
 * @param  root0
 * @param  root0.handleFavorite
 * @param  root0.handleViewAll
 * @param  root0.handleRegenerate
 * @param  root0.handleCustomize
 * @return {WPComponent} StepNavigation Component
 */
const StepNavigationCenter = ( {
	handleFavorite,
	handleViewAll,
	handleRegenerate,
	handleCustomize,
} ) => {
	const { currentData, activeHomepage } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
			activeHomepage: select( nfdOnboardingStore ).getActiveHomepage(),
		};
	} );
	const { setCurrentOnboardingData } = useDispatch( nfdOnboardingStore );
	const [ isInputDisabled, setIsInputDisabled ] = useState( true );
	const [ versionName, setVersionName ] = useState( activeHomepage?.title );
	const isLargeViewport = useViewportMatch( 'medium' );

	const handleRenameClick = () => {
		setIsInputDisabled( false );
	};

	const handleVersionRename = ( e ) => {
		setVersionName( e.target.value );
	};

	const handleRenameOnBlur = ( newVersionName ) => {
		activeHomepage.title = newVersionName;
		currentData.sitegen.homepages.data[ activeHomepage.slug ] =
			activeHomepage;
		setCurrentOnboardingData( currentData );
	};

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
						<MenuItem
							onClick={ () => {
								handleRegenerate();
							} }
						>
							<Icon icon={ reusableBlock } />
							{ __( 'Regenrate', 'wp-module-onboarding' ) }
						</MenuItem>
						<MenuItem
							onClick={ () => {
								handleCustomize();
							} }
						>
							<Icon icon={ settings } />
							{ __( 'Customize', 'wp-module-onboarding' ) }
						</MenuItem>
					</>
				) }

				<MenuItem onClick={ handleRenameClick }>
					{ __( 'Rename', 'wp-module-onboarding' ) }
				</MenuItem>
				<MenuItem onClick={ handleViewAll }>
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
					>
						<div
							className="navigation-buttons-editor__favourite"
							role="button"
							tabIndex={ 0 }
							onKeyDown={ () => {
								handleFavorite();
							} }
							onClick={ () => {
								handleFavorite();
							} }
						>
							{ activeHomepage?.isFavourited ? (
								<FavouriteFilled />
							) : (
								<FavouriteIcon />
							) }
						</div>
						<TextInputVersion
							versionName={ versionName }
							isInputDisabled={ isInputDisabled }
							handleVersionRename={ handleVersionRename }
							handleRenameOnBlur={ handleRenameOnBlur }
						/>
						<Icon
							icon={ chevronDown }
							onClick={ onToggle }
							onKeyDown={ ( event ) => {
								if ( event.key === 'Enter' ) {
									onToggle();
								}
							} }
						/>
					</div>
				) }
				renderContent={ VersionDropDownMenuItems }
				paddingSize="none"
			/>
		);
	};

	return (
		<div className="nfd-onboarding-header__step-navigation">
			<VersionButton isInputDisabled={ isInputDisabled } />
		</div>
	);
};

export default StepNavigationCenter;
