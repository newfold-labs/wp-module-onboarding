import { setFlow } from '../api/flow';
import { setSettings } from '../api/settings';
import { FLOW_SYNC, SETTINGS_SYNC } from './constants';

// This Function is responsible to execute requests in a sequence
export async function apiExecuter(data, requests) {

    requests.forEach(request => {
        switch (request) {
            case FLOW_SYNC: setFlow(data?.flowData);
                break;
            case SETTINGS_SYNC: setSettings(data?.socialData);
                break;
            default:
                break;
        }
    });
}
