import classNames from 'classnames';
import { __ } from '@wordpress/i18n';
import { useRef, useEffect, useState, memo } from '@wordpress/element';
import getContents from './contents';

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
	const [ analysisScore, setAnalysisScore ] = useState( 0 );
	const [ inputText, setInputText ] = useState( 'nfd-sg-input-box__field' );
	const [ remainingCharacterCount, setRemainingCharacterCount ] =
		useState( 0 );
	const content = getContents( remainingCharacterCount );

	useEffect( () => {
		textareaRef.current.style.height = height;
		const scrollHeight = textareaRef.current.scrollHeight;
		textareaRef.current.style.height = scrollHeight + 'px';
		const analysisResult = calculateAnalysisScore( customerInput?.trim() );
		setAnalysisScore( analysisResult );
		setCustomerInputStrength( analysisResult );
		setRemainingCharacterCount(
			Math.max( 200 - ( customerInput?.trim()?.length ?? 0 ), 0 )
		);
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

	const renderDetails = () => {
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
				{ remainingCharacterCount > 0 && (
					<p className={ 'nfd-sg-input-box__count' }>
						{ content.characterCount }
					</p>
				) }
				<div className={ 'nfd-sg-input-box_bottom' }>
					{ customerInput ? (
						<div className={ 'nfd-sg-input-box__info' }>
							<div className={ 'nfd-sg-input-box__info-text' }>
								{ __( 'Detail', 'wp-module-onboarding' ) }
							</div>
							{ renderDetails() }
						</div>
					) : (
						<p className={ 'nfd-sg-input-box__hint' }>{ hint }</p>
					) }
					{ customChildren && children }
				</div>
			</label>
		</div>
	);
};

export default memo( TextInputSiteGen );
