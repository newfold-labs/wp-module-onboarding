import { useState, useRef } from '@wordpress/element';

/**
 * Image Uploader
 *
 * @returns
 */
const ImageUploader = ({ icon, iconSetter, setisImageSelected }) => {

    const inputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState();

    const handleClick = () => {
        inputRef.current.click();
    };

    const imageChange = (e) => {
        console.log('File: ', e.target.files);
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
            iconSetter(e.target.files[0]);
            setisImageSelected(true);
        }
    };

    const removeSelectedImage = () => {
        iconSetter(null);
        setSelectedImage(null);
        setisImageSelected(false);
    };

    return (
        <div className="image-uploader">
            <h4 className="image-uploader_heading">Logo</h4>
            <div className="image-uploader_window">
                <div className="image-uploader_window-empty"></div>
                <div className="image-uploader_window-logo">
                    { selectedImage && (
                        <img
                            className="image-uploader_window-logo-icon"
                            src={URL.createObjectURL(selectedImage)}
                            style={{width: '80%', height: '90%'}}
                            alt="Thumb"
                        />
                    )}
                </div>
                <div className="image-uploader_window-reset">
                    { selectedImage && (<button className="image-uploader_window-reset-btn" 
                            onClick={removeSelectedImage}>
                                RESET
                    </button>)}
                    { !selectedImage && (<button className="image-uploader_window-reset-btn" 
                            onClick={handleClick}>
                                UPLOAD
                    </button>)}
                    <input
                        className="image-uploader_window-select-btn"
                        accept="image/*"
                        type="file"
                        ref={inputRef}
                        onChange={imageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default ImageUploader;
