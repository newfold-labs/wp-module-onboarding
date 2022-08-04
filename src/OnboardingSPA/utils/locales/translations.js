import { translationMap } from '../../data/translations';

/**
 * Translation component according to the OnboardingFlow
 * Pass any word and/or context which we want to swap and display on the UI
 *
 * @return translationMap word
 */
export const translations = ( word, context='noun' ) => {
     const flow = window?.nfdOnboarding?.currentFlow || 'wp-setup';
     return translationMap[flow][word][context];
}