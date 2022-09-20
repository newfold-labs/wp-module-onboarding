import { check, Icon } from '@wordpress/icons';
import { useViewportMatch } from '@wordpress/compose';
import { useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

import { getPatterns } from '../../../utils/api/patterns';
import { getGlobalStyles } from '../../../utils/api/themes';
import { store as nfdOnboardingStore } from '../../../store';
import CommonLayout from '../../../components/Layouts/Common';
import { VIEW_DESIGN_HOMEPAGE_MENU } from '../../../../constants';
import { LivePreviewSelectableCard } from '../../../components/LivePreview';
import HeadingWithSubHeading from '../../../components/HeadingWithSubHeading';

const StepDesignHomepageMenu = () => {
    const MAX_PREVIEWS_PER_ROW = 3;

    const [isLoaded, setisLoaded] = useState(false);
    const [homepagePattern, setHomepagePattern] = useState();
    const [globalStyle, setGlobalStyle] = useState();
    const [selectedHomepage, setSelectedHomepage] = useState(0);
    const [homepagePatternList, sethomepagePatternList] = useState();

    const isLargeViewport = useViewportMatch('medium');

    const { currentStep, currentData, storedPreviewSettings } = useSelect(
        (select) => {
            return {
                currentStep: select(nfdOnboardingStore).getCurrentStep(),
                currentData: select(nfdOnboardingStore).getCurrentOnboardingData(),
                storedPreviewSettings: select(nfdOnboardingStore).getPreviewSettings()
            };
        },
        []
    );

    const { setDrawerActiveView, setIsDrawerOpened, setIsSidebarOpened, setIsDrawerSuppressed, setCurrentOnboardingData } =
        useDispatch(nfdOnboardingStore);

    useEffect(() => {
        if (isLargeViewport) {
            setIsDrawerOpened(true);
        }
        setIsSidebarOpened(false);
        setIsDrawerSuppressed(false);
        setDrawerActiveView(VIEW_DESIGN_HOMEPAGE_MENU);
    }, []);

    async function getHomepagePatternsData() {
        var homepagePatternData = await getPatterns('homepage-styles');
        const globalStyleTemp = await getGlobalStyles();
        if (storedPreviewSettings)
            setGlobalStyle(storedPreviewSettings);
        else
            setGlobalStyle(globalStyleTemp?.body[0]);
        setHomepagePattern(homepagePatternData?.body);
        setisLoaded(true);

        var homepagePatternTempList = [];
        await homepagePatternData?.body?.forEach((homepage) => {
            homepagePatternTempList.push(homepage?.title);
        })
        
        sethomepagePatternList(homepagePatternTempList);

        if(currentData?.data['sitePages'].length !== 0)
            setSelectedHomepage(homepagePatternTempList?.indexOf(currentData?.data['sitePages']['homepage']));
        else{
            currentData.data['sitePages'] = {
                ...currentData.data['sitePages'],
                'homepage': homepagePatternTempList[0]
            };
            setCurrentOnboardingData(currentData);
        }
    }

    function saveDataForHomepage(idx) {
        setSelectedHomepage(idx);
        currentData.data['sitePages'] = {
            ...currentData.data['sitePages'],
            'homepage': homepagePatternList[idx]
        };
        setCurrentOnboardingData(currentData);
    }

    useEffect(() => {
        if (!isLoaded)
            getHomepagePatternsData();
    }, [isLoaded]);

    function buildHomepagePreviews() {

        var homepageList = [];
        if (homepagePattern) {
            homepagePattern?.forEach((homepage, idx) => {
                homepageList.push(
                    <div
                        className='homepage_preview__list'
                    >
                        <LivePreviewSelectableCard
                            className={'homepage_preview__list__item'}
                            selected={idx == selectedHomepage}
                            blockGrammer={homepage?.content}
                            viewportWidth={1200}
                            styling={'custom'}
                            previewSettings={globalStyle}
                            overlay={false}
                            onClick={() => saveDataForHomepage(idx)}
                        />
                    </div>
                );
            });
        }
        return homepageList;
    }

    return (
        <CommonLayout >
            <div className='homepage_preview'>
                <HeadingWithSubHeading title={currentStep?.heading} subtitle={currentStep?.subheading} />
                <div className="theme-styles-menu__list">
                    {globalStyle &&
                        buildHomepagePreviews().slice(0, MAX_PREVIEWS_PER_ROW)}
                </div>
            </div>
        </CommonLayout>
    );
};

export default StepDesignHomepageMenu;
