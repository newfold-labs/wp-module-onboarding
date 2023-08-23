import { useLocation } from 'react-router-dom';
import { chevronLeft } from '@wordpress/icons';
import { Fragment, useState } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { Button, ButtonGroup, Modal } from '@wordpress/components';

import { __, sprintf } from '@wordpress/i18n';
import classNames from 'classnames';
import { setFlow } from '../../utils/api/flow';
import { store as nfdOnboardingStore } from '../../store';
import { getSettings, setSettings } from '../../utils/api/settings';
import { wpAdminPage, pluginDashboardPage } from '../../../constants';
import { HiiveAnalytics } from '@newfold-labs/js-utility-ui-analytics';
import {
	OnboardingEvent,
	trackOnboardingEvent,
} from '../../utils/analytics/hiive';
import {
	ACTION_ONBOARDING_EXITED,
	CATEGORY,
} from '../../utils/analytics/hiive/constants';
import { activateInitialPlugins } from '../../utils/api/plugins';

/**
 * Self-contained button and confirmation modal for exiting Onboarding page.
 *
 * @param {*} param0
 *
 * @return {WPComponent} ExitToWordPress Component
 */
const ExitToWordPress = ( {
	buttonText = __( 'Exit to WordPress', 'wp-module-onboarding' ),
	showButtonIcon = true,
	showButton = true,
	buttonVariant = 'secondary',
	buttonClassName = false,
	isModalOpen = false,
	modalTitle = __( 'Exit without finishing?', 'wp-module-onboarding' ),
	modalText = false,
	modalPrimaryCloseButtonText = __( 'Continue', 'wp-module-onboarding' ),
	modalOnClose = false,
	modalExitButtonText = __( 'Exit', 'wp-module-onboarding' ),
} ) => {
	const [ isOpen, setIsOpen ] = useState( isModalOpen );
	const openModal = () => setIsOpen( true );
	const closeModal = () => {
		if ( typeof modalOnClose === 'function' ) {
			modalOnClose();
		}
		setIsOpen( false );
	};

	const location = useLocation();
	const { currentData, brandName, socialData, currentStep } = useSelect(
		( select ) => {
			return {
				currentData:
					select( nfdOnboardingStore ).getCurrentOnboardingData(),
				brandName: select( nfdOnboardingStore ).getNewfoldBrandName(),
				socialData:
					select( nfdOnboardingStore ).getOnboardingSocialData(),
				currentStep: select( nfdOnboardingStore ).getCurrentStep(),
			};
		},
		[ location.pathname ]
	);

	const { setOnboardingSocialData } = useDispatch( nfdOnboardingStore );

	if ( ! modalText ) {
		modalText = sprintf(
			/* translators: %s: Brand */
			__(
				'You can restart onboarding from your %s Settings page.',
				'wp-module-onboarding'
			),
			brandName
		);
	}

	async function syncSocialSettingsFinish() {
		const initialData = await getSettings();
		const result = await setSettings( socialData );
		if ( result?.error !== null ) {
			return initialData?.body;
		}
		return result?.body;
	}

	async function saveData( path ) {
		if ( currentData ) {
			currentData.hasExited = new Date().getTime();

			// If Social Data is changed then sync it
			if ( path?.includes( 'basic-info' ) ) {
				const socialDataResp = await syncSocialSettingsFinish();

				// If Social Data is changed then Sync that also to the store
				if ( socialDataResp ) {
					setOnboardingSocialData( socialDataResp );
				}
			}
			setFlow( currentData );
		}
		activateInitialPlugins();
		trackOnboardingEvent(
			new OnboardingEvent( ACTION_ONBOARDING_EXITED, currentStep.title )
		);
		await HiiveAnalytics.dispatchEvents( CATEGORY );
		//Redirect to Admin Page for normal customers
		// and Bluehost Dashboard for ecommerce customers
		const exitLink = exitToWordpressForEcommerce()
			? pluginDashboardPage
			: wpAdminPage;
		window.location.replace( exitLink );
	}

	return (
		<Fragment>
			{ showButton && (
				<Button
					icon={ showButtonIcon ? chevronLeft : false }
					variant={ buttonVariant }
					onClick={ openModal }
					className={ classNames(
						`nfd-onboarding-etw__trigger`,
						buttonClassName
					) }
				>
					{ buttonText }
				</Button>
			) }
			{ isOpen && (
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
							{ modalPrimaryCloseButtonText }
						</Button>
						<Button
							variant="primary"
							onClick={ () => saveData( location.pathname ) }
						>
							{ modalExitButtonText }
						</Button>
					</ButtonGroup>
				</Modal>
			) }
		</Fragment>
	);
};

/*
 * check if this is the last step
 */
const exitToWordpressForEcommerce = () => {
	if ( window.nfdOnboarding.currentFlow === 'ecommerce' ) {
		return true;
	}
	return false;
};
export default ExitToWordPress;
