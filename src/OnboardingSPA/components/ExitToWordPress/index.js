import { useSelect } from '@wordpress/data';
import { useLocation } from 'react-router-dom'; 
import { chevronLeft } from '@wordpress/icons';
import { Fragment, useState } from '@wordpress/element';
import { Button, ButtonGroup, Modal, Tooltip } from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import classNames from 'classnames';
import { setFlow } from '../../utils/api/flow';
import { store as nfdOnboardingStore } from '../../store';
import { getSettings, setSettings } from '../../utils/api/settings';
import { wpAdminPage, bluehostDashboardPage } from '../../../constants';

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

	const location = useLocation();
	const { currentData } = useSelect(
		(select) => {
			return {
				currentData: select(nfdOnboardingStore).getCurrentOnboardingData(),
			};
		},
		[location.pathname]
	);

	const label = __(
		'You can restart onboarding from your Bluehost Settings page.',
		'wp-module-onboarding'
	);

	async function syncSocialSettingsFinish(currentData) {
		const initialData = await getSettings();
		const result = await setSettings(currentData?.data?.socialData);
		if (result?.error != null) {
			console.error('Unable to Save Social Data!');
			return initialData?.body;
		}
		return result?.body;
	}

	async function saveData(path, currentData) {

		if (currentData) {

			// If Social Data is changed then sync it
			if (path?.includes('basic-info')) {
				const socialData = await syncSocialSettingsFinish(currentData);

				// If Social Data is changed then Sync that also to the store
				if (socialData && currentData?.data)
					currentData.data.socialData = socialData;
			}
			setFlow(currentData);
		}
		//Redirect to Admin Page for normal customers 
		// and Bluehost Dashboard for ecommerce customers
		const exitLink = exitToWordpressForEcommerce() ? bluehostDashboardPage : wpAdminPage;
		window.location.replace(exitLink);
	}

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
						<Button
							variant="primary"
							onClick={(e) => saveData(location.pathname, currentData)} >
							{__('Exit', 'wp-module-onboarding')}
						</Button>
					</ButtonGroup>
				</Modal>
			)}
		</Fragment>
	);
};

/*
 * check if this is the last step 
 */
const exitToWordpressForEcommerce = () => {
	if (window.nfdOnboarding.currentFlow == 'ecommerce') {
		return true;
	}
	return false;
}
export default ExitToWordPress;
