import { __ } from '@wordpress/i18n'; 
import { memo, useRef, useState } from '@wordpress/element';

import { ImageUploadLoader } from '../Loaders';
import { uploadImage } from '../../utils/api/uploader';

 /*
 * Image Uploader
 *
 */
const ImageUploader = ({ icon, iconSetter }) => {

    const inputRef = useRef(null);
    const [isUploading, setIsUploading] = useState(false);

    async function updateItem(fileData) {
        if(fileData){
            setIsUploading(true);
            const res = await uploadImage(fileData);
            if (res) {
                const id = res?.body?.id;
                const url = res?.body?.source_url;
                iconSetter({
                    id,
                    url
                });
            }
            else console.error('Image Upload Failed');
        }
        else console.error('No File Attached');

        setIsUploading(false);
    }

    const handleClick = () => {
        inputRef?.current.click();
    };

    const imageChange = (e) => {
        if (e?.target?.files && e?.target?.files.length > 0) {
            updateItem(e?.target?.files[0]);
        }
    };

    const removeSelectedImage = () => {
        iconSetter(0);
        if (inputRef?.current?.files.length > 0){
            inputRef.current.value = "";
        }
    };
    function loader(){
        return (
        <div className="image-uploader_window">
                <ImageUploadLoader />
        </div>);
    }
    function getImageUploadWindow() {
        return (
        <div className="image-uploader_window">
            <div className="image-uploader_window-empty"></div>
            <div className="image-uploader_window-logo">
                {(icon == 0 || icon == undefined) && (
                    <div className="image-uploader_window-logo-icon-empty"></div>)
                }
                {(icon != 0 && icon != undefined) && (
                    <img
                        className="image-uploader_window-logo-icon-selected"
                        src={icon.url}
                        alt="Thumb"
                    />
                )}
            </div>
            <div className="image-uploader_window-reset">
                {(icon != 0 && icon != undefined) && (<button className="image-uploader_window-reset-btn"
                    onClick={removeSelectedImage}>
                    {__(
                        "RESET",
                        'wp-module-onboarding'
                    )}
                </button>)}
                {(icon == 0 || icon == undefined) && (<button className="image-uploader_window-reset-btn"
                    onClick={handleClick}>
                    {__(
                        "UPLOAD",
                        'wp-module-onboarding'
                    )}
                </button>)}
                <input
                    className="image-uploader_window-select-btn"
                    accept="image/*"
                    type="file"
                    ref={inputRef}
                    onChange={imageChange}
                />
            </div>
        </div>);
    }

    return (
        <div className="image-uploader">
            <h4 className="image-uploader_heading">Logo</h4>
            { isUploading ? loader() : getImageUploadWindow() }
        </div>
    );
};

export default memo(ImageUploader);
