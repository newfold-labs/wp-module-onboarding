import { setFlow } from '../api/flow';
import { setSettings } from '../api/settings';
import { FLOW_SYNC, SETTINGS_SYNC } from './constants';

// This Function is responsible to execute requests in a sequence
export async function apiExecuter(storeData, requests) {

    requests.forEach(request => {
        switch (request) {
            case FLOW_SYNC: setFlow(storeData);
                break;
            case SETTINGS_SYNC: setSettings(storeData?.data?.socialData);
                break;
            default:
                break;
        }
    });
}
