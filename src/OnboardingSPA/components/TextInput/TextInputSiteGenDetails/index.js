import { memo } from '@wordpress/element';

const TextInputSiteGenDetails = ( {
	labelText,
	placeholder,
	customerInput,
	callback = null,
} ) => {
	return (
		<div>
			<label htmlFor={ labelText }>{ labelText }</label>
			<div className="nfd-sg-simple-input">
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
			</div>
		</div>
	);
};

export default memo( TextInputSiteGenDetails );
