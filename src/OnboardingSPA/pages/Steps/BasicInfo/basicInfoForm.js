import { __ } from '@wordpress/i18n'; 
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelect } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';

import content from './basicInfoFormData.json';
import TextInput from '../../../components/TextInput';
import MiniPreview from '../../../components/MiniPreview';
import { getSettings } from '../../../utils/api/settings';
import { store as nfdOnboardingStore } from '../../../store';
import ImageUploader from '../../../components/ImageUploader';
import SocialMediaForm from '../../../components/SocialMediaForm';


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
        };
        if (debouncedFlowData) saveData();
    }, [debouncedFlowData]);

    return (
        <div className="basic-info">
            <div className={`${isError ? 'error__show' : 'error__hide'}`}>
                {__(
                    "Error Saving Data, Try Again!",
                    'wp-module-onboarding'
                )}
            </div>
            <div className="basic-info-form">
                <div className="basic-info-form__left">
                    <TextInput title={content.siteTitle["title"]} hint={content.siteTitle["hint"]} placeholder={content.siteTitle["placeholder"]} maxCharacters={content.siteTitle["maxCharacters"] } height="47px" textValue={siteTitle} textValueSetter={setSiteTitle} />
                    <TextInput title={content.siteDesc["title"]} hint={content.siteDesc["hint"]} placeholder={content.siteDesc["placeholder"]} maxCharacters={content.siteDesc["maxCharacters"]} height="100px" textValue={siteDesc} textValueSetter={setSiteDesc} />
                    <SocialMediaForm socialData={socialData} setSocialData={setSocialData} setIsValidSocials={setIsValidSocials}/>
                </div>
                <div className="basic-info-form__right">
                    <ImageUploader icon={siteLogo} iconSetter={setSiteLogo} />
                    <MiniPreview icon={siteLogo} title={siteTitle} desc={siteDesc} />
                </div>
            </div>
            <a classname="skip-button-basic-info" onClick={(e) => skipThisStep()} >{__('Skip this Step', 'wp-module-onboarding')}</a>
        </div>
    );
};

export default BasicInfoForm;
