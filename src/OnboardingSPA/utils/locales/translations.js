import { translationMap } from '../../data/translations';
import { store as nfdOnboardingStore } from '../../store';
import { useSelect } from  '@wordpress/data';

function getFlowType() {
     const { flows } = useSelect ((select) => {
          return {
               flows: select(nfdOnboardingStore).getOnboardingFlow(),
          }
     }, []);
     return flows;
}

export const translations = ( word, context='noun' ) => {
     return translationMap[getFlowType()][word][context];
}
