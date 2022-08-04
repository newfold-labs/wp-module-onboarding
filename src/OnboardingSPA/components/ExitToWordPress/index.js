import { Button, ButtonGroup, Modal, Tooltip } from '@wordpress/components';
import { Fragment, useState } from '@wordpress/element';

import { __ } from '@wordpress/i18n';
import { chevronLeft } from '@wordpress/icons';
import classNames from 'classnames';

/**
 * Self-contained button and confirmation modal for exiting Onboarding page.
 *
 * @param {*} param0
 * @returns
 */
const ExitToWordPress = ({
	text = __('Exit to WordPress', 'wp-module-onboarding'),
	showIcon = true,
	showButton = true,
	variant = 'secondary',
	className = false,
	origin,
	...props
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const openModal = () => setIsOpen(true);
	const closeModal = () => setIsOpen(false);
	const exitToWordpressLink = window.nfdOnboarding.currentFlow == 'ecommerce' ? 'index.php?page=bluehost' : 'index.php';
	const label = __(
		'You can restart onboarding from your Bluehost Settings page.',
		'wp-module-onboarding'
	);

	return (
		<Fragment>
			<Button
				icon={showIcon ? chevronLeft : false}
				variant={variant}
				onClick={openModal}
				className={classNames(`nfd-onboarding-etw__trigger`, className)}
			>
				{text}
			</Button>
			{isOpen && (
				<Modal
					title={__('Exit without finishing?', 'wp-module-onboarding')}
					onRequestClose={closeModal}
				>
					<p>{label}</p>
					<ButtonGroup className="nfd-onboarding-etw__buttons">
						<Button variant="secondary" onClick={closeModal}>
							{__('Continue', 'wp-module-onboarding')}
						</Button>
						<Button variant="primary" href={exitToWordpressLink}>
							{__('Exit', 'wp-module-onboarding')}
						</Button>
					</ButtonGroup>
				</Modal>
			)}
		</Fragment>
	);
};

export default ExitToWordPress;
