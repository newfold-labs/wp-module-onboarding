/**
 * WordPress dependencies
 */
import { Navigator } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/editor';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { brush } from '@wordpress/icons';
import { store as interfaceStore } from '@wordpress/interface';

/**
 * Internal dependencies
 */
import { useEditorControls } from '../hooks/useEditorControls';
import { enableZoomOut } from '../utils/editor-utils';
import { removeGlobalStyles } from '../utils/styles-utils';
import { setDefaultCanvasMode, shouldApplyCustomizations } from '../utils/url-utils';
import ScreenColors from './Screens/ScreenColors';
import ScreenLogo from './Screens/ScreenLogo';
import ScreenRoot from './Screens/ScreenRoot';
import ScreenTypography from './Screens/ScreenTypography';
import DashboardButton from './DashboardButton/DashboardButton';

/**
 * Main component that applies all customizations
 */
const OnboardingDesignStudio = () => {
	const { setShowTemplate } = useEditorControls();
	const [ templateLocked, setTemplateLocked ] = useState( false );
	const { enableComplementaryArea } = useDispatch( interfaceStore );

	useEffect( () => {
		if ( shouldApplyCustomizations() ) {
			setDefaultCanvasMode();
			removeGlobalStyles();

			const success = setShowTemplate();

			if ( success ) {
				setTemplateLocked( true );
			} else {
				setTemplateLocked( true );
			}
		}
	}, [ setShowTemplate ] );

	// Effect for zoom button click - runs after template is locked
	useEffect( () => {
		if ( templateLocked ) {
			enableZoomOut();
			enableComplementaryArea( 'core', 'nfd-design-studio' );
		}
	}, [ templateLocked, enableComplementaryArea ] );

	return (
		<>
			<PluginSidebarMoreMenuItem target="nfd-design-studio-sidebar" icon={ brush }>
				{ __( 'Design Studio', 'wp-module-onboarding' ) }
			</PluginSidebarMoreMenuItem>

			<PluginSidebar
				identifier="nfd-design-studio"
				name="nfd-design-studio-sidebar"
				title={ __( 'Design Studio', 'wp-module-onboarding' ) }
				icon={ brush }
				className="nfd-design-studio-sidebar"
			>
				<div className="nfd-design-studio-sidebar__inner">
					<Navigator initialPath="/">
						<Navigator.Screen path="/">
							<ScreenRoot />
						</Navigator.Screen>

						<Navigator.Screen path="/typography">
							<ScreenTypography />
						</Navigator.Screen>

						<Navigator.Screen path="/colors">
							<ScreenColors />
						</Navigator.Screen>

						<Navigator.Screen path="/logo">
							<ScreenLogo />
						</Navigator.Screen>
					</Navigator>
				</div>
			</PluginSidebar>

			<DashboardButton />
		</>
	);
};

export default OnboardingDesignStudio;
