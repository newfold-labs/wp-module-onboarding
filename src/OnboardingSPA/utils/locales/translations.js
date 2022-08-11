import { translationMap } from '../../data/translations';

/**
 * Translation component according to the OnboardingFlow
 * Pass any word and/or context which we want to swap and display on the UI
 *
 * @return translationMap word
 */
export const translations = ( word, context='noun' ) => {
     const flow = window?.nfdOnboarding?.currentFlow || 'wp-setup';
     const translated_word =  translationMap[flow][word.toLowerCase()][context];
     return (word==word.toUpperCase())? translated_word.toUpperCase() : 
               (word[0] == word[0].toUpperCase())? translated_word[0].toUpperCase()+translated_word.substring(1) : 
                         translated_word;   
}