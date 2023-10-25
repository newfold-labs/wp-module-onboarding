import classNames from 'classnames';
import { useRef, useEffect, useState, memo } from '@wordpress/element';

const TextInput = ( {
	hint,
	height,
	placeholder,
	customerInput,
	setCustomerInput,
} ) => {
	const textareaRef = useRef( null );
	const [ inputText, setInputText ] = useState( 'nfd-sg-input-box__field' );

	useEffect( () => {
		textareaRef.current.style.height = height;
		const scrollHeight = textareaRef.current.scrollHeight;
		textareaRef.current.style.height = scrollHeight + 'px';
	}, [ customerInput ] );

	const calculateDetail = ( num ) => {
		switch ( num ) {
			case 1:
				if ( customerInput?.length > 10 )
					return 'nfd-sg-input-box__info-icon--selected';
				break;
			case 2:
				if ( customerInput?.length > 20 )
					return 'nfd-sg-input-box__info-icon--selected';
				break;

			case 3:
				if ( customerInput?.length > 30 )
					return 'nfd-sg-input-box__info-icon--selected';
		}
	};

	const onTextChange = ( e ) => {
		e.preventDefault();
		setCustomerInput( e.target.value );
		setInputText( 'nfd-sg-input-box__field' );
	};

	return (
		<div className="nfd-sg-input">
			<label htmlFor={ inputText }>
				<div className="nfd-sg-input-box">
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
					<div className="nfd-sg-input-box__info">
						<div className="nfd-sg-input-box__info-text">
							Detail
						</div>
						<div
							className={ classNames(
								'nfd-sg-input-box__info-icon',
								calculateDetail( 1 )
							) }
						/>
						<div
							className={ classNames(
								'nfd-sg-input-box__info-icon',
								calculateDetail( 2 )
							) }
						/>
						<div
							className={ classNames(
								'nfd-sg-input-box__info-icon',
								calculateDetail( 3 )
							) }
						/>
					</div>
				) : (
					<p className="nfd-sg-input-box__hint">{ hint }</p>
				) }
			</label>
		</div>
	);
};

const TextInputMemo = memo( TextInput );
export default TextInputMemo;
