/* eslint no-console: ["error", { allow: ["error"] }] */
import { MAX_RETRIES_API_QUEUER } from '../../../constants';

// This Executer is responsible to execute API requests in a sequence
const apiQueueExecutor = async ( requests ) => {
	const items = requests;

	const dequeue = async ( retryCount = 1 ) => {
		// Queue Empty
		if ( ! items[ 0 ] ) return;

		await items[ 0 ][ 1 ]()
			.then( ( e ) => {
				if ( e.error && retryCount < MAX_RETRIES_API_QUEUER ) {
					dequeue( retryCount + 1 );
				}
			} )
			.then( () => items.shift() )
			.then( dequeue );
	};
	await dequeue();
	return items;
};

export default apiQueueExecutor;
