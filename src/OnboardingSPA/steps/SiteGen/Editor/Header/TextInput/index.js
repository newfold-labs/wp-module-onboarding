import { useRef, useEffect } from '@wordpress/element';

const TextInputVersion = ( {
	isInputDisabled,
	versionName,
	setVersionName,
} ) => {
	const inputRef = useRef( null );

	useEffect( () => {
		if ( ! isInputDisabled && inputRef.current ) {
			inputRef.current.focus();
		}
	}, [ isInputDisabled ] );

	const handleTextChange = ( e ) => {
		setVersionName( e.target.value );
	};

	return (
		<input
			ref={ inputRef }
			className="nfd-onboarding-header__center-input"
			disabled={ isInputDisabled }
			type="text"
			value={ versionName }
			onChange={ handleTextChange }
		/>
	);
};

export default TextInputVersion;
