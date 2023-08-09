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
