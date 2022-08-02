import { _x } from '@wordpress/i18n';
import {}  from '../components/App';

export const translations = ( flow='wp-setup', siteType, context='noun' ) => {
     const translationMap = {          
          'wp-setup': {
               site: {
                    'noun': _x( 'site', 'noun', 'wp-module-onboarding' ),
               },
               website: {
                    'noun': _x( 'website', 'noun', 'wp-module-onboarding' ),
               } 
          },
          'ecommerce': {
               site: {
                    'noun': _x( 'store', 'noun', 'wp-module-onboarding' ),
               },
               website: {
                    'noun': _x( 'store', 'noun', 'wp-module-onboarding' )
               }
          }
     }
     return translationMap[flow][siteType][context];
}
