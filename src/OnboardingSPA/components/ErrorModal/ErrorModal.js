import { __ } from '@wordpress/i18n';
import { useNavigate } from 'react-router-dom';
import { Fragment } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { Button, ButtonGroup, Modal } from '@wordpress/components';

import { store as nfdOnboardingStore } from '../../store';

const ErrorModal = ( { showModal, setShowModal, modalTitle, modalText } ) => {
	const navigate = useNavigate();
	const { navErrorModalPath } = useSelect( ( select ) => {
		return {
			navErrorModalPath: select( nfdOnboardingStore ).getNavErrorPath(),
		};
	}, [] );

	const { showNavErrorDialog, resetNavError } =
		useDispatch( nfdOnboardingStore );

	const closeModal = () => {
		resetNavError();
		// If the user closes the modal, it indicates that the error still exists.
		// The user has closed the modal to address the error. Until the error is resolved
		// or the user chooses to proceed anyway, the error message should remain visible.
		showNavErrorDialog( true );
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
								// Since the user is overriding and proceeding anyway, there's no need to display a dialog anymore.
								resetNavError();
								navigate( navErrorModalPath );
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

export default ErrorModal;
