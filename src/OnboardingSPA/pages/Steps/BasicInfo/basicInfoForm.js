import { __, sprintf } from '@wordpress/i18n'; 
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelect } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';

import content from './content.json';
import TextInput from '../../../components/TextInput';
import SkipButton from '../../../components/SkipButton';
import MiniPreview from '../../../components/MiniPreview';
import { getSettings } from '../../../utils/api/settings';
import { store as nfdOnboardingStore } from '../../../store';
import ImageUploader from '../../../components/ImageUploader';
import SocialMediaForm from '../../../components/SocialMediaForm';
import { translations } from '../../../utils/locales/translations';


/**
 * Basic Info Form.
 *
 * @returns
 */
const BasicInfoForm = () => {

    const navigate = useNavigate();

    const [isError, setIsError] = useState(false);
    const [flowData, setFlowData] = useState();
    const [isLoaded, setisLoaded] = useState(false);
    const [debouncedFlowData, setDebouncedFlowData] = useState();

    const [siteTitle, setSiteTitle] = useState("");
    const [siteDesc, setSiteDesc] = useState("");
    const [siteLogo, setSiteLogo] = useState(0);
    const [socialData, setSocialData] = useState("");
    const [isValidSocials, setIsValidSocials] = useState(false);
    const { setCurrentOnboardingData } = useDispatch(nfdOnboardingStore);

    const { currentData } = useSelect((select) => {
        return {
            currentData: select(nfdOnboardingStore).getCurrentOnboardingData()
        };
    }, []);

    function setDefaultData() {
        if(isLoaded) {
            setSiteLogo(flowData?.data['siteLogo']);
            setSiteTitle(flowData?.data['blogName']);
            setSiteDesc(flowData?.data['blogDescription']);
        }
    }

    function createSaveData() {
        const dataToSave = {
            "data": {
                "siteLogo": siteLogo,
                "blogName": siteTitle,
                "blogDescription": siteDesc,
                "socialData": socialData,
            }
        }
        return dataToSave;
    }

    useEffect(() => {
        async function getFlowData() {
            const socialDataAPI = await getSettings();
            setSocialData(socialDataAPI.body);
            setFlowData(currentData);
            setDebouncedFlowData(flowData);
            setisLoaded(true);
        }
        if (!isLoaded)
            getFlowData();
        setDefaultData();

    }, [isLoaded]);

    useEffect(() => {
        const timerId = setTimeout(() => {
            if (isLoaded)
                setDebouncedFlowData(createSaveData());
        }, 600);

        return () => {
            clearTimeout(timerId);
        };
    }, [siteTitle, siteDesc, siteLogo, socialData, isValidSocials]);

    useEffect(() => {
        const saveData = async () => {
            var currentDataCopy = currentData;
            currentDataCopy.data['siteLogo'] = debouncedFlowData.data['siteLogo'] ?? currentDataCopy.data['siteLogo'];
            currentDataCopy.data['blogName'] = debouncedFlowData.data['blogName'] ?? currentDataCopy.data['blogName'];
            currentDataCopy.data['blogDescription'] = debouncedFlowData.data['blogDescription'] ?? currentDataCopy.data['blogDescription']; 
            currentDataCopy.data['socialData'] = debouncedFlowData.data['socialData'] ?? currentDataCopy.data['socialData'];
            setCurrentOnboardingData(currentDataCopy);
        };
        if (debouncedFlowData) saveData();
    }, [debouncedFlowData]);

    return (
        <div className="basic-info">
            <div className={`${isError ? 'error__show' : 'error__hide'}`}>
                {__(
                    content.error["title"],
                    'wp-module-onboarding'
                )}
            </div>
            <div className="basic-info-form">
                <div className="basic-info-form__left">
                    <TextInput 
                        title={sprintf(__(content.siteTitle["title"], 'wp-module-onboarding'), translations('Site'))} 
                        hint={__(content.siteTitle["hint"], 'wp-module-onboarding')}
                        placeholder={sprintf(__(content.siteTitle["placeholder"], 'wp-module-onboarding'), translations('Site'))} 
                        maxCharacters={__(content.siteTitle["maxCharacters"], 'wp-module-onboarding')} 
                        height="47px" textValue={siteTitle} textValueSetter={setSiteTitle} />

                    <TextInput 
                        title={sprintf(__(content.siteDesc["title"], 'wp-module-onboarding'), translations('Site'))} 
                        hint={sprintf(__(content.siteDesc["hint"], 'wp-module-onboarding'), translations('site'))}
                        placeholder={sprintf(__(content.siteDesc["placeholder"], 'wp-module-onboarding'), translations('Site'))} 
                        maxCharacters={__(content.siteDesc["maxCharacters"], 'wp-module-onboarding')} 
                        height="100px" textValue={siteDesc} textValueSetter={setSiteDesc} />

                    <SocialMediaForm socialData={socialData} setSocialData={setSocialData} setIsValidSocials={setIsValidSocials}/>
                </div>
                <div className="basic-info-form__right">
                    <ImageUploader icon={siteLogo} iconSetter={setSiteLogo} />
                    <MiniPreview icon={siteLogo} title={siteTitle} desc={siteDesc} socialData={socialData} />
                </div>
            </div>
            <SkipButton/>
        </div>
    );
};

export default BasicInfoForm;
