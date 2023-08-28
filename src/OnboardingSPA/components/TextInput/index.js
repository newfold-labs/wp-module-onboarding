import { useRef, useEffect, useState, memo } from '@wordpress/element';
import getContents from './contents';

const TextInput = ( {
	title,
	hint,
	placeholder,
	height,
	maxCharacters,
	textValue,
	textValueSetter,
} ) => {
	const textareaRef = useRef( null );
	const [ inputText, setInputText ] = useState( 'nfd-input__field' );

	useEffect( () => {
		textareaRef.current.style.height = height;
		const scrollHeight = textareaRef.current.scrollHeight;
		textareaRef.current.style.height = scrollHeight + 'px';
	}, [ textValue ] );

	const onTextChange = ( e ) => {
		e.preventDefault();
		textValueSetter( e.target.value );

		if ( e.target.value.length === maxCharacters ) {
			setInputText( 'nfd-input__field nfd-input__field_error' );
		} else {
			setInputText( 'nfd-input__field' );
		}
	};

	return (
		<div className="nfd-input">
			<label htmlFor={ inputText }>
				<div className="nfd-input__label">
					<p className="nfd-input__label_title">{ title }</p>
					<p className="nfd-input__label_maxChar">
						{
							getContents( maxCharacters - textValue?.length )
								.charactersLeftPrompt.text
						}
					</p>
				</div>
				<textarea
					type="text"
					className={ inputText }
					ref={ textareaRef }
					style={ { height } }
					placeholder={ placeholder }
					value={ textValue }
					maxLength={ maxCharacters }
					onChange={ ( e ) => onTextChange( e ) }
				/>
				<p className="nfd-input__hint">{ hint }</p>
			</label>
		</div>
	);
};

const TextInputMemo = memo( TextInput );
export default TextInputMemo;
