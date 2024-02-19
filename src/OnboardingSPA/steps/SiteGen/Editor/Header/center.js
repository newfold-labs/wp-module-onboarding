import { Icon, chevronDown, reusableBlock } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { useViewportMatch } from '@wordpress/compose';
import { useRef, useState, useEffect, memo } from '@wordpress/element';
import { ReactComponent as FavoriteIconStroked } from '../../../../static/icons/sitegen/heart-stroked.svg';
import { ReactComponent as FavoriteFilled } from '../../../../static/icons/sitegen/heart-filled.svg';
import { Dropdown, MenuGroup, MenuItem } from '@wordpress/components';

const DropDownMenu = memo(
	( {
		onRegenerate,
		onCustomize,
		onRenameItemSelect,
		onViewAll,
		isLargeViewport,
		onToggle,
	} ) => {
		const onMenuItemClick = ( action ) => () => {
			action();
			onToggle();
		};
		return (
			<MenuGroup className="nfd-onboarding-header__version_dropdown-menu">
				{ ! isLargeViewport && (
					<>
						<MenuItem onClick={ onMenuItemClick( onRegenerate ) }>
							<Icon icon={ reusableBlock } />
							{ __( 'Regenerate', 'wp-module-onboarding' ) }
						</MenuItem>
						<MenuItem onClick={ onMenuItemClick( onCustomize ) }>
							<div className="nfd-onboarding-header__version_dropdown-menu__customize-button__icon"></div>
							{ __( 'Customize', 'wp-module-onboarding' ) }
						</MenuItem>
					</>
				) }

				<MenuItem onClick={ onMenuItemClick( onRenameItemSelect ) }>
					{ __( 'Rename', 'wp-module-onboarding' ) }
				</MenuItem>
				<MenuItem onClick={ onMenuItemClick( onViewAll ) }>
					{ __( 'View All', 'wp-module-onboarding' ) }
				</MenuItem>
			</MenuGroup>
		);
	}
);

const TitleContent = memo(
	( {
		isFavorite,
		homepageTitle,
		onFavorite,
		onRename,
		inputRef,
		onRegenerate,
		onCustomize,
		onRenameItemSelect,
		onViewAll,
		isLargeViewport,
		isInputEnabled,
		enableInput,
	} ) => {
		const [ renameInputValue, setRenameInputValue ] =
			useState( homepageTitle );

		const handleOnChange = () => {
			setRenameInputValue( inputRef.current.value );
		};

		const onTitleInputBlur = () => {
			const newTitleValue = inputRef.current.value.trim();
			if ( newTitleValue && newTitleValue !== homepageTitle ) {
				onRename( newTitleValue );
			}
			enableInput( false );
		};

		useEffect( () => {
			if ( isInputEnabled ) {
				inputRef.current?.focus();
			}
		}, [ isInputEnabled, inputRef ] );

		useEffect( () => {
			setRenameInputValue( homepageTitle );
		}, [ homepageTitle ] );

		return (
			<Dropdown
				renderToggle={ ( { isOpen, onToggle } ) => (
					<div
						role="button"
						tabIndex="0"
						aria-expanded={ isOpen }
						aria-label={ __(
							'Regenerate',
							'wp-module-onboarding'
						) }
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
							disabled={ ! isInputEnabled }
							className="nfd-onboarding-header__center-input"
							type="text"
							value={ renameInputValue }
							onBlur={ onTitleInputBlur }
							onChange={ handleOnChange }
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
				renderContent={ ( { onToggle } ) => (
					<DropDownMenu
						onRegenerate={ onRegenerate }
						onCustomize={ onCustomize }
						onRenameItemSelect={ onRenameItemSelect }
						onViewAll={ onViewAll }
						isLargeViewport={ isLargeViewport }
						onToggle={ onToggle }
					/>
				) }
			/>
		);
	}
);

const StepEditorHeaderCenter = ( {
	handleFavorite,
	handleRename,
	handleViewAll,
	handleRegenerate,
	handleCustomize,
	homepageTitle,
	isFavorite,
} ) => {
	const isLargeViewport = useViewportMatch( 'medium' );
	const inputRef = useRef( null );
	const [ isInputEnabled, setInputEnabled ] = useState( false );
	const enableInput = ( isEnabled ) => {
		setInputEnabled( isEnabled );
		if ( isEnabled ) {
			inputRef.current?.focus();
		}
	};

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
		enableInput( true );
	};

	const onRename = ( newTitleValue ) => {
		if ( typeof handleRename === 'function' ) {
			handleRename( newTitleValue );
		}
	};

	return (
		<div className="nfd-onboarding-header__step-navigation">
			<TitleContent
				isFavorite={ isFavorite }
				homepageTitle={ homepageTitle }
				onFavorite={ onFavorite }
				onRename={ onRename }
				inputRef={ inputRef }
				onRegenerate={ onRegenerate }
				onCustomize={ onCustomize }
				onRenameItemSelect={ onRenameItemSelect }
				onViewAll={ onViewAll }
				isLargeViewport={ isLargeViewport }
				isInputEnabled={ isInputEnabled }
				enableInput={ enableInput }
			/>
		</div>
	);
};

export default StepEditorHeaderCenter;
