import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { StepLoader } from '../../../components/Loaders';

import { store as nfdOnboardingStore } from '../../../store';
import { getThemeStatus } from '../../../utils/api/themes';

const DesignStateHandler = ( { children } ) => {
    const [ state, setState ] = useState( 'installing' );

    const { settings } = useSelect(( select ) => {
        return {
            settings: select(nfdOnboardingStore).getSettings()
        };
    }, []);

    const { updateSettings } = useDispatch( nfdOnboardingStore );

    const checkThemeStatus = async () => {
        const themeStatus = await getThemeStatus( 'nfd_slug_yith_wonder' );
        return themeStatus.body.status;
    }


    useEffect(async () => {
        if ( settings.themeStatus === 'unknown' ) {
            const themeStatus = await checkThemeStatus();
            switch( themeStatus ) {
                case 'installing':
                    setTimeout( () => {
                        updateSettings( settings ); 
                    }, 30000 )
                    break;
                default:
                    settings.themeStatus = themeStatus;
                    updateSettings( settings );
            }
        }
        setState( settings.themeStatus );
    }, [settings] )

    const handleRender = ( children ) => {
        switch( state ) {
            case 'not_active':
                return <p>Error</p>
            case 'activated':
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