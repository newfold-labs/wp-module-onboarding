import { useRef, memo } from '@wordpress/element';

const TextInputSiteGenSimple = ( {
	type,
	labelText,
	placeholder,
	customerInput,
	callback = null,
} ) => {
	const textareaRef = useRef( null );

	return (
		<div>
			<label htmlFor={ labelText }>{ labelText }</label>
			<div className="nfd-sg-simple-input">
				{ type === 'textarea' ? (
					<textarea
						type="text"
						ref={ textareaRef }
						placeholder={ placeholder }
						value={ customerInput }
						onChange={ ( e ) => {
							if ( callback && typeof callback === 'function' ) {
								callback( e );
							}
						} }
					/>
				) : (
					<input
						type="text"
						placeholder={ placeholder }
						value={ customerInput }
						onChange={ ( e ) => {
							if ( callback && typeof callback === 'function' ) {
								callback( e );
							}
						} }
					/>
				) }
			</div>
		</div>
	);
};

export default memo( TextInputSiteGenSimple );
