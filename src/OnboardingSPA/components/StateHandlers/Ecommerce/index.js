import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { StepLoader } from '../../Loaders';

import { store as nfdOnboardingStore } from '../../../store';
import { getPluginStatus } from '../../../utils/api/plugins';
import {
	PLUGIN_STATUS_INIT,
	PLUGIN_STATUS_INSTALLING,
	PLUGIN_STATUS_NOT_ACTIVE,
	PLUGIN_STATUS_ACTIVE,
	ECOMMERCE_STEPS_PLUGIN,
	PLUGIN_INSTALL_WAIT_TIMEOUT,
} from '../../../../constants';
import { getPreviewSettings } from '../../../utils/api/settings';
import { StepErrorState } from '../../ErrorState';

const EcommerceStateHandler = ( { children } ) => {
	const { storedPluginStatus } = useSelect( ( select ) => {
		return {
			storedPluginStatus: select( nfdOnboardingStore ).getPluginStatus(),
		};
	}, [] );

	const { updatePluginStatus, updatePreviewSettings } =
		useDispatch( nfdOnboardingStore );

	const checkPluginStatus = async () => {
		const pluginStatus = await getPluginStatus( ECOMMERCE_STEPS_PLUGIN );
		return pluginStatus.body.status;
	};

	const loadPreviewSettings = async () => {
		const previewSettings = await getPreviewSettings();
		updatePreviewSettings( previewSettings.body );
	};

	const waitForInstall = () => {
		setTimeout( async () => {
			const pluginStatus = await checkPluginStatus();
			if ( pluginStatus !== PLUGIN_STATUS_ACTIVE ) {
				return updatePluginStatus( PLUGIN_STATUS_NOT_ACTIVE );
			}
			updatePluginStatus( pluginStatus );
			await loadPreviewSettings();
		}, PLUGIN_INSTALL_WAIT_TIMEOUT );
	};

	useEffect( async () => {
		if ( storedPluginStatus === PLUGIN_STATUS_INIT ) {
			const pluginStatus = await checkPluginStatus();
			switch ( pluginStatus ) {
				case PLUGIN_STATUS_INSTALLING:
					waitForInstall();
					break;
				case PLUGIN_STATUS_ACTIVE:
					await loadPreviewSettings();
					updatePluginStatus( pluginStatus );
					break;
				default:
					updatePluginStatus( pluginStatus );
			}
		}
	}, [ storedPluginStatus ] );

	const handleRender = () => {
		switch ( storedPluginStatus ) {
			case PLUGIN_STATUS_NOT_ACTIVE:
				return (
					<StepErrorState
						title={ __('Making the keys to your Bluehost Online Store', 'wp-module-onboarding') }
						subtitle={
							__('We’re installing WooCommerce for you to fill with your amazing products & services!', 'wp-module-onboarding')
						}
						error={
							__('Uh-oh, something went wrong. Please contact support.', 'wp-module-onboarding')
						}
					/>
				);
			case PLUGIN_STATUS_ACTIVE:
				return children;
			default:
				return (
					<StepLoader
						title={ __('Making the keys to your Bluehost Online Store', 'wp-module-onboarding') }
						subtitle={
                            __('We’re installing WooCommerce for you to fill with your amazing products & services!', 'wp-module-onboarding')
						}
					/>
				);
		}
	};

	return <>{ handleRender() }</>;
};

export default EcommerceStateHandler;
