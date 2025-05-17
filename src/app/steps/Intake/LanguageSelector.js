import { SelectField } from '@newfold/ui-component-library';
import { useSelect } from '@wordpress/data';
import { nfdOnboardingStore } from '@/data/store';

const LanguageSelector = () => {
	const [ selectedLanguage, setSelectedLanguage ] = useState( {} );

	// Get languages data.
	const { languages } = useSelect( ( select ) => {
		return {
			languages: select( nfdOnboardingStore ).getLanguages(),
		};
	} );

	// Set default language.
	const setDefaultLanguage = () => {
		const defaultLanguage = languages.find( ( language ) => language.is_default );
		setSelectedLanguage( defaultLanguage );
	};

	useEffect( () => {
		setDefaultLanguage();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [] );

	const handleLanguageChange = ( value ) => {
		setSelectedLanguage( languages.find( ( language ) => language.locale === value ) );
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
				value={ selectedLanguage.locale }
				selectedLabel={ selectedLanguage.native_name }
				onChange={ handleLanguageChange }
			>
				{ languageOptions }
			</SelectField>
		</div>
	);
};

export default LanguageSelector;
