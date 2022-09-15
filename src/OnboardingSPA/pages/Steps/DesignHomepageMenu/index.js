import { check, Icon } from '@wordpress/icons';
import { useViewportMatch } from '@wordpress/compose';
import { useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

import { getPatterns } from '../../../utils/api/patterns';
import LivePreview from '../../../components/LivePreview';
import { store as nfdOnboardingStore } from '../../../store';
import CommonLayout from '../../../components/Layouts/Common';
import { VIEW_DESIGN_HOMEPAGE_MENU } from '../../../../constants';
import HeadingWithSubHeading from '../../../components/HeadingWithSubHeading';

const StepDesignHomepageMenu = () => {

    const [isLoaded, setisLoaded] = useState(false);
    const [homepagePattern, setHomepagePattern] = useState();
    const [selectedHomepage, setSelectedHomepage] = useState(0);

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
        useDispatch(nfdOnboardingStore);

    useEffect(() => {
        if (isLargeViewport) {
            setIsDrawerOpened(true);
        }
        setIsSidebarOpened(false);
        setIsDrawerSuppressed(false);
        setDrawerActiveView(VIEW_DESIGN_HOMEPAGE_MENU);
    }, []);

    async function getHomepagePatterns() {
        var homepagePatternData = await getPatterns('homepage');
        setHomepagePattern(homepagePatternData?.body);
        setisLoaded(true);
    }

    useEffect(() => {
        if (!isLoaded)
            getHomepagePatterns();
    }, [isLoaded]);

    function buildHomepagePreviews() {
        var homepageList = [];
        if (homepagePattern) {
            homepagePattern?.forEach((homepage, idx) => {
                homepageList.push(
                    <div
                        className='homepage_preview_list__item'
                        onClick={() => setSelectedHomepage(idx)}>
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
