import { SelectField } from '@newfold/ui-component-library';
import { useSelect } from '@wordpress/data';
import { nfdOnboardingStore } from '@/data/store';

const LanguageSelector = ( { value, onChange } ) => {
	const [ selectedLanguage, setSelectedLanguage ] = useState( null );
	// Get languages data.
	const { languages } = useSelect( ( select ) => {
		return {
			languages: select( nfdOnboardingStore ).getLanguages(),
		};
	} );

	// Get the initial language.
	const getInitialLanguage = () => {
		let initialLanguage = null;
		if ( value ) {
			initialLanguage = languages.find( ( language ) => language.locale === value );
		}
		if ( ! initialLanguage ) {
			initialLanguage = languages.find( ( language ) => language.is_default );
			onChange( initialLanguage.locale );
		}
		return initialLanguage;
	};

	const handleLanguageChange = ( updatedValue ) => {
		const updatedLanguage = languages.find( ( language ) => language.locale === updatedValue );
		setSelectedLanguage( updatedLanguage );
		onChange( updatedLanguage.locale );
	};

	const languageOptions = languages.map( ( language ) => {
		return (
			<SelectField.Option
				key={ language.locale }
				value={ language.locale }
				label={ language.native_name }
			/>
		);
	} );

	return (
		<div className="nfd-w-[40%]">
			<SelectField
				id="nfd-onboarding-language-selector"
				label={ __( 'Language', 'wp-module-onboarding' ) }
				value={ selectedLanguage ? selectedLanguage.locale : getInitialLanguage().locale }
				selectedLabel={ selectedLanguage ? selectedLanguage.native_name : getInitialLanguage().native_name }
				onChange={ handleLanguageChange }
			>
				{ languageOptions }
			</SelectField>
		</div>
	);
};

export default LanguageSelector;
