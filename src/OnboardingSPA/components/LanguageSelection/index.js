import { memo } from '@wordpress/element';

const LanguageSelection = ( {
	languageSelectionLabel,
	languageList,
	selectedLocale,
	setSelectedLocale,
} ) => {
	return <div className={ 'nfd-sg-language' }>
		<label htmlFor={ 'nfd-site-output__languages' } className={ 'nfd-sg-language__label' }>{ languageSelectionLabel }</label>
		<select
			className={ 'nfd-sg-language__select' } id={ 'nfd-site-output__languages' }
			onChange={ ( event ) => {
				setSelectedLocale( event.target.value );
			} }
			value={ selectedLocale || '' }>
			<option value="">Choose a language</option>
			{ languageList.map( ( [ language, value ] ) => {
				return <option
					key={ value }
					value={ value }
				>
					{ language }
				</option>;
			} ) }
		</select>
	</div>;
};

export default memo( LanguageSelection );
