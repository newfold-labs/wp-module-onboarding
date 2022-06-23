import { useRef, useEffect, useState } from '@wordpress/element';

/**
 * Interface Text Inputs with standard design.
 *
 * @returns
 */
const TextInput = ({ title, hint, placeholder, height, maxCharacters, textValue, textValueSetter }) => {

    const textareaRef = useRef(null);
    const [inputText, setInputText] = useState("nfd-input__field");

    useEffect(() => {
        textareaRef.current.style.height = height;
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = scrollHeight + "px";
    }, [textValue]);

    const onTextChange = (e) => {
        e.preventDefault();
        textValueSetter(e.target.value);
        
        e.target.value.length == maxCharacters ? 
            setInputText("nfd-input__field nfd-input__field_error") : 
            setInputText("nfd-input__field")
    }

    return (
        <div className='nfd-input'>
            <label>
                <div className='nfd-input__label'>
                    <p className='nfd-input__label_title'>{title}</p>
                    <p className='nfd-input__label_maxChar'>{`(${maxCharacters - textValue.length} characters left)`}</p>
                </div>
                <textarea
                    type="text"
                    class={inputText}
                    ref={textareaRef}
                    style={{height: height}}
                    placeholder={placeholder}
                    value={textValue}
                    maxLength={maxCharacters}
                    onChange={(e) => onTextChange(e)}
                />
                <p className='nfd-input__hint'>{hint}</p>
            </label>
        </div>
    );
};

export default TextInput;
