import {
	Button,
	Icon,
	__unstableMotion as motion,
} from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';

import { __ } from '@wordpress/i18n';
import classNames from 'classnames';
import { store as nfdOnboardingStore } from '../../../store';
import { wordpress } from '@wordpress/icons';

const DrawerToggle = ({ isOpen }) => {
	const { isDrawerOpen, isDrawerSuppressed } = useSelect((select) => {
		return {
			isDrawerOpen: select(nfdOnboardingStore).isDrawerOpened(),
			isDrawerSuppressed: select(nfdOnboardingStore).isDrawerSuppressed(),
		};
	}, []);

	const { setIsDrawerOpened } = useDispatch(nfdOnboardingStore);

	const drawerToggleRef = useRef();

	useEffect(() => {
		if (!isDrawerOpen) {
			drawerToggleRef.current.focus();
		}
	}, [isDrawerOpen]);

	const toggleDrawer = () => {
		if (!isDrawerSuppressed) setIsDrawerOpened(!isDrawerOpen)
	}

	return (
		<motion.div
			className={classNames('nfd-onboarding-drawer__toggle', {
				'is-open': isDrawerOpen,
			})}
			whileHover="expand"
		>
			<Button
				className="nfd-onboarding-drawer__toggle-button has-icon"
				label={__('Toggle Navigation', 'wp-module-onboarding')}
				ref={drawerToggleRef}
				aria-pressed={isOpen}
				onClick={toggleDrawer}
			>
				<div
					style={{
						width: '36px',
						height: '36px',
						backgroundImage: 'var(--nfd-onboarding-icon)',
						backgroundSize: 'contain',
					}}
				/>
			</Button>
		</motion.div>
	);
};

export default DrawerToggle;
