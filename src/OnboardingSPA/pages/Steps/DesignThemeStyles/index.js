import CommonLayout from '../../../components/Layouts/Common';
import { VIEW_DESIGN_THEME_STYLES } from '../../../../constants';
import { store as nfdOnboardingStore } from '../../../store';
import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import LivePreview from '../../../components/LivePreview';

import { check, Icon } from '@wordpress/icons';
import { useViewportMatch } from '@wordpress/compose';
import { getPatterns } from '../../../utils/api/patterns';
import { getGlobalStyles } from '../../../utils/api/themes';

import HeadingWithSubHeading from '../../../components/HeadingWithSubHeading';

const StepDesignThemeStyle = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [pattern, setPattern]   = useState();
    const [previews, setPreviews] = useState();
    const [globalStyles, setGlobalStyles] = useState();
    const [selectedStyle, setSelectedStyle] = useState(0);

    const isLargeViewport = useViewportMatch('medium');
    const { currentStep } = useSelect(
        (select) => {
            return {
                currentStep: select(nfdOnboardingStore).getCurrentStep()
            };
        },
        []
    );

	const { setDrawerActiveView, setIsDrawerOpened, setIsSidebarOpened, setIsDrawerSuppressed } =
		useDispatch( nfdOnboardingStore );
    
	useEffect( () => {
        if (isLargeViewport) {
            setIsDrawerOpened(true);
        }
        setIsSidebarOpened(false);
        setIsDrawerSuppressed(false);
		setDrawerActiveView( VIEW_DESIGN_THEME_STYLES );
	}, [] );

    const getStylesAndPatterns = async () => {
        const pattern = await getPatterns('theme-styles', true);
        const globalStyles = await getGlobalStyles();
        setPattern( pattern?.body );
        setGlobalStyles( globalStyles?.body );
        setIsLoaded(true);
    }

    useEffect(() => {
        if (!isLoaded)
        getStylesAndPatterns();
    }, [isLoaded]);

    const buildPreviews = ( start ) => {
        let previews = []
        globalStyles?.forEach(( globalStyle, idx ) => {
            previews.push(
                <div 
                className = 'homepage_preview_list__item'
                onClick = {() => setSelectedStyle(idx)}>
                <div className='homepage_preview_list__title_bar'>
                    <div className="homepage_preview_list__title_bar_browser">
                        <span className="homepage_preview_list__title_bar_browser-dot" style={{ background: '#989EA7' }}></span>
                        <span className="homepage_preview_list__title_bar_browser-dot" style={{ background: '#989EA7' }}></span>
                        <span className="homepage_preview_list__title_bar_browser-dot" style={{ background: '#989EA7' }}></span>
                    </div>
                    <div className={`${idx == selectedStyle ? 'homepage_preview_list__title_bar_selected' : 'homepage_preview_list__title_bar_unselected'}`}>
                        <Icon
                            className="homepage_preview_list__title_bar_selected_path"
                            icon={check}
                            size={64}
                        />
                    </div>
                </div>
                <LivePreview
                    blockGrammer = { pattern }
                    viewportWidth= { 1200 }
                    styling = { 'custom' }
                    previewSettings = { globalStyle }
                />
            </div>
            )
        }) 
        return previews
    }

	return (
        <CommonLayout>
            <div className='homepage_preview'>
                <HeadingWithSubHeading title={currentStep?.heading} subtitle={currentStep?.subheading} />
                <div className='homepage_preview_list'>
                    {globalStyles ? buildPreviews().slice(0, 3) : ''}
                </div>
                <div className='homepage_preview_list'>
                    {globalStyles ? buildPreviews().slice(3, globalStyles.length) : ''}
                </div>
            </div>
        </CommonLayout>
	);
};

export default StepDesignThemeStyle;
