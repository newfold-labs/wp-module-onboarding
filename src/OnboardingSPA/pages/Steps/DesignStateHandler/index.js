import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { StepLoader } from '../../../components/Loaders';

import { store as nfdOnboardingStore } from '../../../store';
import { getThemeStatus } from '../../../utils/api/themes';
import { THEME_STATUS_INIT, THEME_STATUS_INSTALLING, THEME_STATUS_NOT_ACTIVE, THEME_STATUS_ACTIVE, DESIGN_STEPS_THEME, THEME_INSTALL_WAIT_TIMEOUT  } from '../../../../constants';
import { getPreviewSettings } from '../../../utils/api/settings';
import { useGlobalStylesOutput } from '../../../utils/global-styles/use-global-styles-output';

const DesignStateHandler = ( { children } ) => {

    const { storedThemeStatus } = useSelect(( select ) => {
        return {
            storedThemeStatus: select(nfdOnboardingStore).getThemeStatus(),
        };
    }, []);

    const { updateThemeStatus, updatePreviewSettings } = useDispatch( nfdOnboardingStore );

    const checkThemeStatus = async () => {
        const themeStatus = await getThemeStatus( DESIGN_STEPS_THEME );
        return themeStatus.body.status;
    }

    const loadPreviewSettings = async () => {
        const previewSettings = await getPreviewSettings();
        console.log(previewSettings.body);
        // const settings = useGlobalStylesOutput( previewSettings.body, previewSettings.body );
        updatePreviewSettings( previewSettings.body )
    }

    const waitForInstall = () => {
        setTimeout( async () => {
            const themeStatus = await checkThemeStatus();
            if ( themeStatus !== THEME_STATUS_ACTIVE) {
                return updateThemeStatus( THEME_STATUS_NOT_ACTIVE )
            }
            updateThemeStatus( themeStatus )
            await loadPreviewSettings();
        }, THEME_INSTALL_WAIT_TIMEOUT )
    }


    useEffect(async () => {
        if ( storedThemeStatus === THEME_STATUS_INIT ) {
            const themeStatus = await checkThemeStatus();
            console.log(themeStatus)
            switch( themeStatus ) {
                case THEME_STATUS_INSTALLING:
                    waitForInstall();
                    break;
                case THEME_STATUS_ACTIVE:
                    await loadPreviewSettings();
                default:
                    updateThemeStatus( themeStatus )
            }
        }

    }, [storedThemeStatus] )

    const handleRender = ( children ) => {
        switch( storedThemeStatus ) {
            case THEME_STATUS_NOT_ACTIVE :
                return <p>Error</p>
            case  THEME_STATUS_ACTIVE:
                return children
            default:
                return <StepLoader />
        }
    }

    return (
        <>
        { handleRender( children ) }
        </>
    );
}

export default DesignStateHandler;