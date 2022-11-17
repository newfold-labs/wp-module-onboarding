import { useSelect, useDispatch } from '@wordpress/data'; 
import { useState, useEffect } from '@wordpress/element'; 

import { store as nfdOnboardingStore } from '../../store';
import { getGlobalStyles, setGlobalStyles } from '../../utils/api/themes';
import { useGlobalStylesOutput } from '../../utils/global-styles/use-global-styles-output';

/**
 * Global Style Parent Component
 * The Fetching of Global Style Object from either store or API is 
 * common to a lot many places and this component does the trick import { useState, useEffect } from '@wordpress/element';for us.
 *
 * @returns Global Style Parent
 */

const GlobalStyleProvider = ({ children }) => {

    const [isLoaded, setIsLoaded] = useState(false);

    const {
        currentData,
        storedPreviewSettings,
    } = useSelect((select) => {
        return {
            currentData:
                select(nfdOnboardingStore).getCurrentOnboardingData(),
            storedPreviewSettings:
                select(nfdOnboardingStore).getPreviewSettings(),
        };
    }, []);

    const { updateThemeStatus, updatePreviewSettings } =
        useDispatch(nfdOnboardingStore);

    const getStylesAndPatterns = async () => {
        const globalStyles = await getGlobalStyles();
        if (globalStyles?.error) {
            return updateThemeStatus(THEME_STATUS_NOT_ACTIVE);
        }
        let selectedGlobalStyle;
        if (storedPreviewSettings?.title && storedPreviewSettings?.settings)
            selectedGlobalStyle = storedPreviewSettings;
        else if (currentData.data.theme.variation) {
            selectedGlobalStyle = globalStyles.body.filter(
                (globalStyle) =>
                    globalStyle.title === currentData.data.theme.variation
            )[0];
        } else {
            selectedGlobalStyle = globalStyles.body[0];
        }
        
        if(selectedGlobalStyle)
            setGlobalStyles({
                ...selectedGlobalStyle,
                'title': currentData.data.theme.variation,
                'version': 2
            });

        updatePreviewSettings(
            useGlobalStylesOutput(selectedGlobalStyle, storedPreviewSettings)
        );
        setIsLoaded(true);
    };

    useEffect(() => {
        if (!isLoaded) getStylesAndPatterns();
    }, [isLoaded]);

    return (
        children
    );
};

export default GlobalStyleProvider;
