import { Button, __unstableMotion as motion } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useEffect, useRef } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';

import classNames from 'classnames';
import { store as nfdOnboardingStore } from '../../../store';

const DrawerToggle = ( { isOpen } ) => {
	const { isDrawerOpen, isDrawerSuppressed } = useSelect( ( select ) => {
		return {
			isDrawerOpen: select( nfdOnboardingStore ).isDrawerOpened(),
			isDrawerSuppressed:
				select( nfdOnboardingStore ).isDrawerSuppressed(),
		};
	}, [] );

	const { setIsDrawerOpened } = useDispatch( nfdOnboardingStore );

	const drawerToggleRef = useRef();

	useEffect( () => {
		if ( ! isDrawerOpen ) {
			drawerToggleRef.current.focus();
		}
	}, [ isDrawerOpen ] );

	const toggleDrawer = () => {
		isDrawerSuppressed || setIsDrawerOpened( ! isDrawerOpen );
	};

	return (
		<motion.div
			className={ classNames( 'nfd-onboarding-drawer__toggle', {
				'is-open': isDrawerOpen,
			} ) }
			whileHover="expand"
		>
			<Button
				className={ `nfd-onboarding-drawer__toggle-button has-icon ${
					! isDrawerSuppressed || 'is-suppressed'
				}` }
				label={ __( 'Toggle Navigation', 'wp-module-onboarding' ) }
				ref={ drawerToggleRef }
				aria-pressed={ isOpen }
				onClick={ toggleDrawer }
			>
				<div
					style={ {
						width: '36px',
						height: '36px',
						backgroundImage: 'var(--nfd-onboarding-icon)',
						backgroundSize: 'contain',
					} }
				/>
			</Button>
		</motion.div>
	);
};

export default DrawerToggle;
