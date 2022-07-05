import { useState, useEffect } from '@wordpress/element';
import TextInput from '../../../components/TextInput';
import SocialMediaForm from '../../../components/SocialMediaForm';
import MiniPreview from '../../../components/MiniPreview';
import ImageUploader from '../../../components/ImageUploader';

import { getFlow, setFlow } from '../../../utils/api/flow';
import { getSettings, setSettings } from '../../../utils/api/settings';

/**
 * Basic Info Form.
 *
 * @returns
 */
const BasicInfoForm = () => {

    const [isError, setIsError] = useState(false);
    const [flowData, setFlowData] = useState();
    const [isLoaded, setisLoaded] = useState(false);
    const [debouncedFlowData, setDebouncedFlowData] = useState();

    const [siteTitle, setSiteTitle] = useState("");
    const [siteDesc, setSiteDesc] = useState("");
    const [siteLogo, setSiteLogo] = useState(0);
    const [socialData, setSocialData] = useState("");

    function setDefaultData() {
        if(isLoaded) {
            setSiteLogo(flowData?.body?.data['siteLogo']);
            setSiteTitle(flowData?.body?.data['blogName']);
            setSiteDesc(flowData?.body?.data['blogDescription']);
        }
    }

    useEffect(() => {
        async function getFlowData(){
            const data = await getFlow();
            const socialDataAPI = await getSettings();
            setSocialData(socialDataAPI.body);
            setFlowData(data);
            setDebouncedFlowData(flowData);
            setisLoaded(true);
        }
        if(!isLoaded) 
            getFlowData();
        setDefaultData();

    }, [isLoaded]);

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
        const timerId = setTimeout(() => {
            setDebouncedFlowData(createSaveData());
        }, 1000);

        return () => {
            clearTimeout(timerId);
        };
    }, [siteTitle, siteDesc, siteLogo, socialData]);

    useEffect(() => {
        const saveData = async () => {
            const result = await setFlow(debouncedFlowData);
            // const socialResult = await setSettings(socialData);
            if (result.error != null)
                setIsError(true);
            else {
                setFlowData(result);
                setIsError(false);
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
                    <SocialMediaForm socialData={socialData} setSocialData={setSocialData} />
                </div>
                <div className="basic-info-form__right">
                    <ImageUploader icon={siteLogo} iconSetter={setSiteLogo} />
                    <MiniPreview icon={siteLogo} title={siteTitle} desc={siteDesc} />
                </div>
            </div>
        </div>
    );
};

export default BasicInfoForm;
