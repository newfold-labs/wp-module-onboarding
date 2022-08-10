import { _x } from '@wordpress/i18n';

export const translationMap = 
    { 'wp-setup': {
        site: {
             'noun': _x( 'site', 'noun', 'wp-module-onboarding' ),
             'proper_noun': _x('Site', 'proper_noun', 'wp-module-onboarding'),
        },
        website: {
             'noun': _x( 'website', 'noun', 'wp-module-onboarding' ),
        } 
   },
   'ecommerce': {
        site: {
             'noun': _x( 'store', 'noun', 'wp-module-onboarding' ),
             'proper_noun': _x('Store', 'proper_noun', 'wp-module-onboarding'),
        },
        website: {
             'noun': _x( 'store', 'noun', 'wp-module-onboarding' )
        }
   }
}