import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { Button, ButtonGroup, Modal } from '@wordpress/components';

const SocialMediaModal = ( {
	showModal,
	setShowModal,
	modalTitle,
	modalText,
	modalSecondaryButtonFunc,
} ) => {
	const closeModal = () => {
		setShowModal( false );
	};

	return (
		<Fragment>
			{ showModal && (
				<Modal
					title={ modalTitle }
					onRequestClose={ () => closeModal() }
				>
					<p>{ modalText }</p>
					<ButtonGroup className="nfd-onboarding-etw__buttons">
						<Button
							variant="secondary"
							onClick={ () => closeModal() }
						>
							{ __( 'Edit URLs', 'wp-module-onboarding' ) }
						</Button>
						<Button
							variant="primary"
							onClick={ () => {
								if (
									typeof modalSecondaryButtonFunc ===
									'function'
								)
									modalSecondaryButtonFunc();
							} }
						>
							{ __( 'Proceed Anyways', 'wp-module-onboarding' ) }
						</Button>
					</ButtonGroup>
				</Modal>
			) }
		</Fragment>
	);
};

export default SocialMediaModal;
