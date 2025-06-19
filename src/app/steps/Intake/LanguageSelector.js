import { SelectField } from '@newfold/ui-component-library';
import { useSelect } from '@wordpress/data';
import { useState, useMemo } from '@wordpress/element';
import { nfdOnboardingStore } from '@/data/store';

const LanguageSelector = ( { value, onChange } ) => {
	const [ selectedLanguage, setSelectedLanguage ] = useState( null );
	// Get languages data.
	const languages = useSelect( ( select ) => {
		return select( nfdOnboardingStore ).getLanguages();
	}, [] );

	const initialLanguage = useMemo( () => {
		let lang = null;
		if ( value ) {
			lang = languages.find( ( language ) => language.locale === value );
		}
		if ( ! lang ) {
			lang = languages.find( ( language ) => language.is_default );
		}
		return lang;
	}, [ languages, value ] );

	const handleLanguageChange = ( updatedValue ) => {
		const updatedLanguage = languages.find( ( language ) => language.locale === updatedValue );
		setSelectedLanguage( updatedLanguage );
		onChange( updatedLanguage.locale );
	};

	const languageOptions = useMemo( () => {
		return languages.map( ( language ) => {
			return (
				<SelectField.Option
					key={ language.locale }
					value={ language.locale }
					label={ language.native_name }
				/>
			);
		} );
	}, [ languages ] );

	return (
		<div className="nfd-w-[40%]">
			<SelectField
				id="nfd-onboarding-language-selector"
				name="nfd-onboarding-language-selector"
				label={ __( 'Language', 'wp-module-onboarding' ) }
				value={ selectedLanguage ? selectedLanguage.locale : initialLanguage.locale }
				selectedLabel={ selectedLanguage ? selectedLanguage.native_name : initialLanguage.native_name }
				onChange={ handleLanguageChange }
			>
				{ languageOptions }
			</SelectField>
		</div>
	);
};

export default LanguageSelector;
