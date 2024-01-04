import classNames from 'classnames';
import { useRef, useEffect, useState, memo } from '@wordpress/element';

const TextInputSiteGen = ( {
	hint,
	height,
	placeholder,
	customerInput,
	setIsValidInput,
	setCustomerInput,
} ) => {
	const textareaRef = useRef( null );
	const [ analysisScore, setAnalysisScore ] = useState( 0 );
	const [ inputText, setInputText ] = useState( 'nfd-sg-input-box__field' );

	useEffect( () => {
		textareaRef.current.style.height = height;
		const scrollHeight = textareaRef.current.scrollHeight;
		textareaRef.current.style.height = scrollHeight + 'px';
		const analysisResult = calculateAnalysisScore( customerInput );
		setAnalysisScore( analysisResult );
		setIsValidInput( analysisResult >= 2 );
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

	const addInputScoreSyling = ( num ) => {
		const selectedButton = 'nfd-sg-input-box__info-icon--selected';
		if ( num <= analysisScore ) {
			return selectedButton;
		}
	};

	const onTextChange = ( e ) => {
		e.preventDefault();
		setCustomerInput( e.target.value );
		setInputText( 'nfd-sg-input-box__field' );
	};

	const renderDetails = ( ) => {
		const buttons = [];
		for ( let i = 1; i <= 3; i++ ) {
			buttons.push(
				<div
					className={ classNames(
						'nfd-sg-input-box__info-icon',
						addInputScoreSyling( i )
					) }
				/>
			);
		}
		return buttons;
	};

	return (
		<div className={ 'nfd-sg-input' }>
			<label htmlFor={ inputText }>
				<div className={ 'nfd-sg-input-box' }>
					<textarea
						type="text"
						className={ inputText }
						ref={ textareaRef }
						style={ { height: '47px' } }
						placeholder={ placeholder }
						value={ customerInput }
						onChange={ ( e ) => onTextChange( e ) }
					/>
				</div>
				{ customerInput ? (
					<div className={ 'nfd-sg-input-box__info' }>
						<div className={ 'nfd-sg-input-box__info-text' }>
							Detail
						</div>
						{ renderDetails() }
					</div>
				) : (
					<p className={ 'nfd-sg-input-box__hint' }>{ hint }</p>
				) }
			</label>
		</div>
	);
};

export default memo( TextInputSiteGen );
