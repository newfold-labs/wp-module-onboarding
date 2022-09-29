import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
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
	const [ woocommerceStatus, setWoocommerceStatus ] = useState(
		PLUGIN_STATUS_INSTALLING
	);

	const { storedPluginsStatus } = useSelect( ( select ) => {
		return {
			storedPluginsStatus:
				select( nfdOnboardingStore ).getPluginsStatus(),
		};
	}, [] );

	const { updatePluginsStatus, updatePreviewSettings } =
		useDispatch( nfdOnboardingStore );

	const checkPluginStatus = async () => {
		const pluginStatus = await getPluginStatus( ECOMMERCE_STEPS_PLUGIN );
		if ( pluginStatus?.error ) {
			return PLUGIN_STATUS_NOT_ACTIVE;
		}
		return pluginStatus.body.status;
	};

	const loadPreviewSettings = async () => {
		const previewSettings = await getPreviewSettings();
		if ( previewSettings?.body ) {
			updatePreviewSettings( previewSettings.body );
		}
	};

	const waitForInstall = () => {
		setTimeout( async () => {
			const pluginStatus = await checkPluginStatus();
			if ( pluginStatus !== PLUGIN_STATUS_ACTIVE ) {
				storedPluginsStatus[ ECOMMERCE_STEPS_PLUGIN ] =
					PLUGIN_STATUS_NOT_ACTIVE;
				setWoocommerceStatus( PLUGIN_STATUS_NOT_ACTIVE );
				return updatePluginsStatus( storedPluginsStatus );
			}
			storedPluginsStatus[ ECOMMERCE_STEPS_PLUGIN ] = pluginStatus;
			setWoocommerceStatus( pluginStatus );
			updatePluginsStatus( storedPluginsStatus );
			await loadPreviewSettings();
		}, PLUGIN_INSTALL_WAIT_TIMEOUT );
	};

	useEffect( async () => {
		setWoocommerceStatus( storedPluginsStatus[ ECOMMERCE_STEPS_PLUGIN ] );
		if (
			storedPluginsStatus[ ECOMMERCE_STEPS_PLUGIN ] === PLUGIN_STATUS_INIT
		) {
			const pluginStatus = await checkPluginStatus();
			switch ( pluginStatus ) {
				case PLUGIN_STATUS_INSTALLING:
					waitForInstall();
					break;
				case PLUGIN_STATUS_ACTIVE:
					await loadPreviewSettings();
					storedPluginsStatus[ ECOMMERCE_STEPS_PLUGIN ] =
						pluginStatus;
					setWoocommerceStatus( pluginStatus );
					updatePluginsStatus( storedPluginsStatus );
					break;
				default:
					storedPluginsStatus[ ECOMMERCE_STEPS_PLUGIN ] =
						pluginStatus;
					setWoocommerceStatus( pluginStatus );
					updatePluginsStatus( storedPluginsStatus );
			}
		}
	}, [ storedPluginsStatus ] );

	const handleRender = () => {
		switch ( woocommerceStatus ) {
			case PLUGIN_STATUS_NOT_ACTIVE:
				return (
					<StepErrorState
						title={ __(
							'Making the keys to your Bluehost Online Store',
							'wp-module-onboarding'
						) }
						subtitle={ __(
							'We’re installing WooCommerce for you to fill with your amazing products & services!',
							'wp-module-onboarding'
						) }
						error={ __(
							'Uh-oh, something went wrong. Please contact support.',
							'wp-module-onboarding'
						) }
					/>
				);
			case PLUGIN_STATUS_ACTIVE:
				return children;
			default:
				return (
					<StepLoader
						title={ __(
							'Making the keys to your Bluehost Online Store',
							'wp-module-onboarding'
						) }
						subtitle={ __(
							'We’re installing WooCommerce for you to fill with your amazing products & services!',
							'wp-module-onboarding'
						) }
					/>
				);
		}
	};

	return <>{ handleRender() }</>;
};

export default EcommerceStateHandler;
