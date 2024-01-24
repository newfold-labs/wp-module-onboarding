import { Icon, chevronDown, reusableBlock, settings } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { useViewportMatch } from '@wordpress/compose';
import { useRef } from '@wordpress/element';
import { ReactComponent as FavoriteIconStroked } from '../../../../static/icons/sitegen/heart-stroked.svg';
import { ReactComponent as FavoriteFilled } from '../../../../static/icons/sitegen/heart-filled.svg';
import { Dropdown, MenuGroup, MenuItem } from '@wordpress/components';

const StepEditorHeaderCenter = ( {
	handleFavorite,
	handleRename,
	handleViewAll,
	handleRegenerate,
	handleCustomize,
	handleIsRenaming,
	isRenaming,
	homepageTitle,
	isFavorite,
} ) => {
	const isLargeViewport = useViewportMatch( 'medium' );
	const inputRef = useRef( null );

	const onRegenerate = () => {
		if ( typeof handleRegenerate === 'function' ) {
			return handleRegenerate();
		}
	};

	const onFavorite = () => {
		if ( typeof onFavorite === 'function' ) {
			return handleFavorite();
		}
	};

	const onCustomize = () => {
		if ( typeof handleCustomize === 'function' ) {
			return handleCustomize();
		}
	};

	const onViewAll = () => {
		if ( typeof handleViewAll === 'function' ) {
			return handleViewAll();
		}
	};

	const onRenameItemSelect = () => {
		if ( typeof handleIsRenaming === 'function' ) {
			handleIsRenaming( true );
			return inputRef.current.focus();
		}
	};

	const onRename = () => {
		if ( typeof handleRename === 'function' ) {
			handleRename( inputRef.current.value );
		}
	};

	const onTitleInputBlur = () => {
		if ( typeof handleIsRenaming === 'function' ) {
			return handleIsRenaming( false );
		}
	};

	if ( isRenaming ) {
		inputRef.current.focus();
	}

	const DropDownMenu = () => {
		return (
			<MenuGroup className="nfd-onboarding-header__version_dropdown-menu">
				{ ! isLargeViewport && (
					<>
						<MenuItem
							onClick={ onRegenerate }
						>
							<Icon icon={ reusableBlock } />
							{ __( 'Regenerate', 'wp-module-onboarding' ) }
						</MenuItem>
						<MenuItem
							onClick={ onCustomize }
						>
							<Icon icon={ settings } />
							{ __( 'Customize', 'wp-module-onboarding' ) }
						</MenuItem>
					</>
				) }

				<MenuItem onClick={ onRenameItemSelect }>
					{ __( 'Rename', 'wp-module-onboarding' ) }
				</MenuItem>
				<MenuItem onClick={ onViewAll }>
					{ __( 'View All', 'wp-module-onboarding' ) }
				</MenuItem>
			</MenuGroup>
		);
	};

	const TitleContent = () => {
		return (
			<Dropdown
				renderToggle={ ( { isOpen, onToggle } ) => (
					<div
						role="button"
						tabIndex="0"
						aria-expanded={ isOpen }
						aria-label={ __( 'Regenerate', 'wp-module-onboarding' ) }
						className="navigation-buttons-editor"
					>
						<div
							className="navigation-buttons-editor__favorite"
							role="button"
							tabIndex={ 0 }
							onKeyDown={ onFavorite }
							onClick={ onFavorite }
						>
							{ isFavorite ? (
								<FavoriteFilled />
							) : (
								<FavoriteIconStroked />
							) }
						</div>
						<input
							ref={ inputRef }
							className="nfd-onboarding-header__center-input"
							disabled={ ! isRenaming }
							type="text"
							value={ homepageTitle }
							onBlur={ onTitleInputBlur }
							onChange={ onRename }
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
				renderContent={ DropDownMenu }
			/>
		);
	};

	return (
		<div className="nfd-onboarding-header__step-navigation">
			<TitleContent />
		</div>
	);
};

export default StepEditorHeaderCenter;
