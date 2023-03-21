import { API_REQUEST } from '../../../constants';
import { completeFlow, setFlow } from '../api/flow';

// This Function is responsible to execute requests in a sequence
const apiQueueExecuter = ( onboardingStore, requests ) => {
	const newQueue = [];

	requests.forEach( ( request ) => {
		switch ( request ) {
			case API_REQUEST.SET_FLOW:
				setFlow( onboardingStore?.data?.flowData );
				break;
			case API_REQUEST.COMPLETE_FLOW:
				completeFlow();
				break;
		}
	} );

	return newQueue;
};

export default apiQueueExecuter;
