import { useRef, useEffect, useState, memo } from '@wordpress/element';

const TextInputSiteGen = ( {
	hint,
	height,
	children,
	placeholder,
	customerInput,
	setCustomerInput,
	setCustomerInputStrength,
	customChildren = false,
} ) => {
	const textareaRef = useRef( null );
	const [ inputText, setInputText ] = useState( 'nfd-sg-input-box__field' );

	useEffect( () => {
		textareaRef.current.style.height = height;
		const scrollHeight = textareaRef.current.scrollHeight;
		textareaRef.current.style.height = scrollHeight + 'px';
		const analysisResult = calculateAnalysisScore( customerInput?.trim() );
		setCustomerInputStrength( analysisResult );
	}, [ customerInput ] );

	const calculateAnalysisScore = ( input ) => {
		/* Number of Characters in the input
		 * Count < 100 => 0
		 * 100 < Count <= 150 => 1
		 * 150 < Count <= 200 => 2
		 * 200 < Count => 3
		 */
		const characterCount = input?.length;
		let characterScore = 0;
		if ( characterCount > 200 ) {
			characterScore = 3;
		} else if ( characterCount > 150 ) {
			characterScore = 2;
		} else if ( characterCount > 100 ) {
			characterScore = 1;
		}

		return characterScore;
	};

	const onTextChange = ( e ) => {
		e.preventDefault();
		setCustomerInput( e.target.value );
		setInputText( 'nfd-sg-input-box__field' );
	};

	return (
		<div className={ 'nfd-sg-input' }>
			<label htmlFor={ inputText }>
				<div className={ 'nfd-sg-input-box' }>
					<textarea
						data-wnd-ai-logo
						type="text"
						className={ inputText }
						ref={ textareaRef }
						style={ { height: '47px' } }
						placeholder={ placeholder }
						value={ customerInput }
						onChange={ ( e ) => onTextChange( e ) }
					/>
				</div>
				<div className={ 'nfd-sg-input-box_bottom' }>
					<p className={ 'nfd-sg-input-box__hint' }>{ hint }</p>
					{ customChildren && children }
				</div>
			</label>
		</div>
	);
};

export default memo( TextInputSiteGen );
