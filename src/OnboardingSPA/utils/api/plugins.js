import { apiBase } from '../../../constants';

import apiFetch from '@wordpress/api-fetch';

export const init = () => {
     apiFetch({
          url: `${window.location.protocol}//${window.location.host}/index.php${apiBase}plugins/initialize`,
          method: 'POST',
          headers: {
               'X-NFD-ONBOARDING': window.nfdOnboarding.pluginInstallHash
          }
     }).catch((error) => {
          console.error(error)
     })
}
