import { __ } from '@wordpress/i18n';
import { useRef, useEffect, useState, memo } from '@wordpress/element';

/**
 * Interface Text Inputs with standard design.
 *
 * @param  root0
 * @param  root0.title
 * @param  root0.hint
 * @param  root0.placeholder
 * @param  root0.height
 * @param  root0.maxCharacters
 * @param  root0.textValue
 * @param  root0.textValueSetter
 * @return
 */
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

		e.target.value.length == maxCharacters
			? setInputText( 'nfd-input__field nfd-input__field_error' )
			: setInputText( 'nfd-input__field' );
	};

	return (
		<div className="nfd-input">
			<label>
				<div className="nfd-input__label">
					<p className="nfd-input__label_title">
						{ __( title, 'wp-module-onboarding' ) }
					</p>
					<p className="nfd-input__label_maxChar">{ `(${
						maxCharacters - textValue?.length
					} characters left)` }</p>
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
				<p className="nfd-input__hint">
					{ __( hint, 'wp-module-onboarding' ) }
				</p>
			</label>
		</div>
	);
};

const TextInputMemo = memo( TextInput );
export default TextInputMemo;
