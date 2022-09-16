import { check, Icon } from '@wordpress/icons';
import { useViewportMatch } from '@wordpress/compose';
import { useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

import LivePreview from '../../../components/LivePreview';
import { getHomepagePatterns } from '../../../utils/api/patterns';
import { store as nfdOnboardingStore } from '../../../store';
import CommonLayout from '../../../components/Layouts/Common';
import { VIEW_DESIGN_HOMEPAGE_MENU } from '../../../../constants';
import HeadingWithSubHeading from '../../../components/HeadingWithSubHeading';

const StepDesignHomepageMenu = () => {

    const [isLoaded, setisLoaded] = useState(false);
    const [homepagePattern, setHomepagePattern] = useState();
    const [selectedHomepage, setSelectedHomepage] = useState(0);
    const [homepagePatternList, sethomepagePatternList] = useState();

    const isLargeViewport = useViewportMatch('medium');

    const { currentStep, currentData } = useSelect(
        (select) => {
            return {
                currentStep: select(nfdOnboardingStore).getCurrentStep(),
                currentData: select(nfdOnboardingStore).getCurrentOnboardingData()
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
        var homepagePatternData = await getHomepagePatterns('homepage');
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
                        className='homepage_preview_list__item'
                        onClick={() => saveDataForHomepage(idx)}>
                        <div className='homepage_preview_list__title_bar'>
                            <div className="homepage_preview_list__title_bar_browser">
                                <span className="homepage_preview_list__title_bar_browser-dot" style={{ background: '#989EA7' }}></span>
                                <span className="homepage_preview_list__title_bar_browser-dot" style={{ background: '#989EA7' }}></span>
                                <span className="homepage_preview_list__title_bar_browser-dot" style={{ background: '#989EA7' }}></span>
                            </div>
                            <div className={`${idx == selectedHomepage ? 'homepage_preview_list__title_bar_selected' : 'homepage_preview_list__title_bar_unselected'}`}>
                                <Icon
                                    className="homepage_preview_list__title_bar_selected_path"
                                    icon={check}
                                    size={64}
                                />
                            </div>
                        </div>
                        <LivePreview
                            className='homepage_preview_list__main'
                            blockGrammer={homepage?.content}
                            viewportWidth={1200}
                            styling={'custom'}
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
                <div className='homepage_preview_list'>
                    {buildHomepagePreviews()}
                </div>
            </div>
        </CommonLayout>
    );
};

export default StepDesignHomepageMenu;
