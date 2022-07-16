import { useDispatch, useSelect } from '@wordpress/data';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from '@wordpress/element';

import TextInput from '../../../components/TextInput';
import SocialMediaForm from '../../../components/SocialMediaForm';
import MiniPreview from '../../../components/MiniPreview';
import ImageUploader from '../../../components/ImageUploader';
import { store as nfdOnboardingStore } from '../../../store';

import { getSettings, setSettings } from '../../../utils/api/settings';

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

    function skipThisStep() {
        navigate('/wp-setup/step/design/themes');
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

            if (isValidSocials) {
                const socialResult = await setSettings(socialData);
            }
        };
        if (debouncedFlowData) saveData();
    }, [debouncedFlowData]);

    return (
        <div className="basic-info">
            <div className={`${isError ? 'error__show' : 'error__hide'}`}>
                Error Saving Data, Try Again!
            </div>
            <div className="basic-info-form">
                <div className="basic-info-form__left">
                    <TextInput title="Site Title" hint="Shown to visitors, search engine and social media posts." placeholder="Aurelia Shop" maxCharacters="80" height="47px" textValue={siteTitle} textValueSetter={setSiteTitle} />
                    <TextInput title="Site Description" hint="Tell people who you are, what you sell and why they should visit your store." placeholder="Aurelia Shop sell customized jewerly inspired to the beauty of the Sea" maxCharacters="160" height="100px" textValue={siteDesc} textValueSetter={setSiteDesc} />
                    <SocialMediaForm socialData={socialData} setSocialData={setSocialData} setIsValidSocials={setIsValidSocials}/>
                </div>
                <div className="basic-info-form__right">
                    <ImageUploader icon={siteLogo} iconSetter={setSiteLogo} />
                    <MiniPreview icon={siteLogo} title={siteTitle} desc={siteDesc} />
                </div>
            </div>
            <a onClick={(e) => skipThisStep()} style={{ padding: '10px', cursor: 'pointer' }}>Skip this step</a>
        </div>
    );
};

export default BasicInfoForm;
