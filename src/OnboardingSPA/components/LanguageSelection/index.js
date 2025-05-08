import { memo } from '@wordpress/element';

const LanguageSelection = ( {
	labgeageSelectionLabel,
	languageList,
	selectedLocale,
	setSelectedLocale,
} ) => {
	return <div className={ 'nfd-sg-language' }>
		<label htmlFor={ 'nfd-site-output__languages' } className={ 'nfd-sg-language__label' }>{ labgeageSelectionLabel }</label>
		<select
			className={ 'nfd-sg-language__select' } id={ 'nfd-site-output__languages' }
			onChange={ ( event ) => {
				setSelectedLocale( event.target.value );
			} }>
			<option selected>Choose a language</option>
			{ languageList.map( ( [ language, value ] ) => {
				return <option
					selected={ selectedLocale === value }
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
