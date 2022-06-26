import { useState } from '@wordpress/element';
import TextInput from '../../../components/TextInput';
import SocialMediaForm from '../../../components/SocialMediaForm';
import MiniPreview from '../../../components/MiniPreview';
import ImageUploader from '../../../components/ImageUploader';

/**
 * Basic Info Form.
 *
 * @returns
 */
const BasicInfoForm = () => {

    const [siteTitle, setSiteTitle] = useState("");
    const [siteDesc, setSiteDesc] = useState("");
    const [siteLogo, setSiteLogo] = useState("");
    const [isImageSelected, setisImageSelected] = useState(false);

    return (
        <div className="basic-info-form">
            <div className="basic-info-form__left">
                <TextInput title="Site Title" hint="Shown to visitors, search engine and social media posts." placeholder="Main Street Tea Co." maxCharacters="80" height="47px" textValue={siteTitle} textValueSetter={setSiteTitle} />
                <TextInput title="Site Description" hint="Tell people who you are, what you sell and why they should visit your store." placeholder="Aurelia Shop sell customized jewerly inspired to the beauty of the Sea" maxCharacters="160" height="100px" textValue={siteDesc} textValueSetter={setSiteDesc} />
                <SocialMediaForm />
            </div>
            <div className="basic-info-form__right">
                <ImageUploader icon={siteLogo} iconSetter={setSiteLogo} setisImageSelected={setisImageSelected}/>
                <MiniPreview title={siteTitle} desc={siteDesc} icon={siteLogo} isImageSelected={isImageSelected}/>
            </div>
        </div>
    );
};

export default BasicInfoForm;
