import classNames from 'classnames';
import { useRef, useEffect, useState, memo } from '@wordpress/element';
import { calculateAnalysisScore } from '../../../steps/SiteGen/SiteDetails/analyser';

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

	const addInputScoreSyling = ( num ) => {
		const selectedButton = 'nfd-sg-input-box__info-icon--selected';
		switch ( num ) {
			case 1:
				if ( num <= analysisScore ) {
					return selectedButton;
				}
				break;
			case 2:
				if ( num <= analysisScore ) {
					return selectedButton;
				}
				break;
			case 3:
				if ( num <= analysisScore ) {
					return selectedButton;
				}
		}
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
						<div
							className={ classNames(
								'nfd-sg-input-box__info-icon',
								addInputScoreSyling( 1 )
							) }
						/>
						<div
							className={ classNames(
								'nfd-sg-input-box__info-icon',
								addInputScoreSyling( 2 )
							) }
						/>
						<div
							className={ classNames(
								'nfd-sg-input-box__info-icon',
								addInputScoreSyling( 3 )
							) }
						/>
					</div>
				) : (
					<p className={ 'nfd-sg-input-box__hint' }>{ hint }</p>
				) }
			</label>
		</div>
	);
};

export default memo( TextInputSiteGen );
