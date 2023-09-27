import { DEFAULT_FLOW } from '../../data/flows/constants';
import { translationMap } from '../../data/translations';

export const translations = ( word, context = 'noun' ) => {
	const flow = window?.nfdOnboarding?.currentFlow || DEFAULT_FLOW;
	const translatedWord =
		translationMap[ flow ][ word.toLowerCase() ][ context ];
	if ( word === word.toUpperCase() ) {
		return translatedWord.toUpperCase();
	}

	if ( word[ 0 ] === word[ 0 ].toUpperCase() ) {
		return (
			translatedWord[ 0 ].toUpperCase() + translatedWord.substring( 1 )
		);
	}

	return translatedWord;
};
