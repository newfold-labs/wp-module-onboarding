import { useRef, useEffect } from '@wordpress/element';

const TextInputVersion = ( {
	isInputDisabled,
	versionName,
	handleVersionRename,
	handleRenameOnBlur,
} ) => {
	const inputRef = useRef( null );

	useEffect( () => {
		if ( ! isInputDisabled && inputRef.current ) {
			inputRef.current.focus();
		}
	}, [ isInputDisabled ] );

	const onInputBlurHandler = () => {
		if ( handleRenameOnBlur ) {
			handleRenameOnBlur( inputRef.current.value );
		}
	};

	return (
		<input
			ref={ inputRef }
			className="nfd-onboarding-header__center-input"
			disabled={ isInputDisabled }
			type="text"
			value={ versionName }
			onChange={ handleVersionRename }
			onBlur={ onInputBlurHandler }
		/>
	);
};

export default TextInputVersion;
