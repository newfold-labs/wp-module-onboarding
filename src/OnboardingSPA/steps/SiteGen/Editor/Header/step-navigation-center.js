import { Icon, chevronDown } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import { useViewportMatch } from '@wordpress/compose';
import { ReactComponent as FavouriteIcon } from '../../../../static/icons/sitegen/heart-stroked.svg';
import { Button, Dropdown } from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Centre Step buttons presented in Header.
 *
 * @return {WPComponent} StepNavigation Component
 */
const StepNavigationCenter = () => {
	const [isInputDisabled, setIsInputDisabled] = useState(true);
	
	const isLargeViewport = useViewportMatch( 'medium' );

	const onTextChange = ( e ) => {
		e.preventDefault();
		setCustomerInput( e.target.value );
	};


	const TextInput = ( { customerInput, isDisabled } ) => {
		return (
			<input
				className='nfd-onboarding-header__center-input'
				disabled = { isDisabled }
				type="text"
				value = { customerInput }
				onChange={ ( e ) => onTextChange( e ) }
			/>
		);
	};

	/**
	 * Version step Navigation button.
	 *
	 * @return {WPComponent} VersionButton Component
	 */
	const VersionDropDown = ( ) => {
		return (
			<div className='nfd-onboarding-header__center-dropdown-item'>
				{ !isLargeViewport ? <><Button>Regenerate</Button><Button>Customize</Button></>: '' }
				<Button>Rename</Button>
				<Button>View All</Button>
			</div>
		);
	};

	/**
	 * Version step Navigation button.
	 *
	 * @return {WPComponent} VersionButton Component
	 */
	const VersionButton = ( {isInputDisabled} ) => {
		return (
			<Dropdown
				popoverProps={ { placement: 'bottom-start' } }
				renderToggle={ ( { isOpen, onToggle } ) => (
					<div
						role="button"
						tabIndex="0"
						aria-expanded={ isOpen }
						aria-label="Regenerate"
						className='navigation-buttons-editor'
					>
						<FavouriteIcon />
						<TextInput customerInput={  __( 'Version 1', 'wp-module-onboarding' ) } disabled={isInputDisabled} />
						<Icon icon={ chevronDown } 
							onClick={ onToggle } 
							onKeyDown={ ( event ) => {
								if ( event.key === 'Enter' ) {
									onToggle();
								}
							} }
						/>
					</div>
				) }
				renderContent={ () => <VersionDropDown />
				}
			/>
		);
	};

	return (
		<div className="nfd-onboarding-header__step-navigation">
			<VersionButton isInputDisabled={isInputDisabled}/>
		</div>
	);
};

export default StepNavigationCenter;